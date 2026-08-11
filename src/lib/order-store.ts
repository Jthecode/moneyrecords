import "server-only";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Order Store                                          ┃
   ┃ File   : src/lib/order-store.ts                                      ┃
   ┃ Role   : Secure Supabase persistence for orders, intake, and events  ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

import type {
  StripeCampaignProduct,
  StripeCheckoutCatalog,
} from "@/lib/stripe-products";

import {
  DATABASE_TABLES,
  type CampaignIntakeInsert,
  type CampaignIntakeRow,
  type Database,
  type DatabaseFulfillmentStatus,
  type DatabaseIntakeStatus,
  type DatabaseOrderEventProvider,
  type DatabaseOrderEventType,
  type DatabaseOrderStatus,
  type DatabasePaymentStatus,
  type Json,
  type OrderEventInsert,
  type OrderEventRow,
  type OrderInsert,
  type OrderItemInsert,
  type OrderItemRow,
  type OrderRow,
  type OrderUpdate,
  type OrderWithRelations,
  type PublicOrderRecord,
} from "@/types/database";

import {
  ORDER_SCHEMA_VERSION,
  type CampaignIntake,
} from "@/types/order";

/* --------------------------------------------------------------------- */
/* Environment                                                            */
/* --------------------------------------------------------------------- */

export const SUPABASE_URL_ENV =
  "NEXT_PUBLIC_SUPABASE_URL";

export const SUPABASE_SERVER_URL_ENV =
  "SUPABASE_URL";

export const SUPABASE_SECRET_KEY_ENV =
  "SUPABASE_SECRET_KEY";

export const SUPABASE_SERVICE_ROLE_KEY_ENV =
  "SUPABASE_SERVICE_ROLE_KEY";

/* --------------------------------------------------------------------- */
/* Configuration                                                          */
/* --------------------------------------------------------------------- */

const ORDER_SOURCE =
  "money-records-web";

const DEFAULT_CURRENCY =
  "USD";

const SUPABASE_CLIENT_INFO =
  "money-records-order-store/1.0.0";

/* --------------------------------------------------------------------- */
/* Error Types                                                            */
/* --------------------------------------------------------------------- */

export type OrderStoreErrorCode =
  | "configuration-error"
  | "order-not-found"
  | "order-conflict"
  | "order-create-failed"
  | "order-update-failed"
  | "order-delete-failed"
  | "order-query-failed"
  | "order-items-create-failed"
  | "order-intake-create-failed"
  | "order-event-create-failed"
  | "order-event-query-failed"
  | "order-cleanup-failed";

export class OrderStoreError extends Error {
  readonly code: OrderStoreErrorCode;
  readonly orderId?: string;
  readonly orderNumber?: string;
  readonly databaseCode?: string;
  readonly databaseDetails?: string;

  constructor(
    code: OrderStoreErrorCode,
    message: string,
    options: {
      orderId?: string;
      orderNumber?: string;
      databaseCode?: string;
      databaseDetails?: string;
      cause?: unknown;
    } = {},
  ) {
    super(message, {
      cause: options.cause,
    });

    this.name =
      "OrderStoreError";

    this.code =
      code;

    this.orderId =
      options.orderId;

    this.orderNumber =
      options.orderNumber;

    this.databaseCode =
      options.databaseCode;

    this.databaseDetails =
      options.databaseDetails;
  }
}

/* --------------------------------------------------------------------- */
/* Public Input Types                                                     */
/* --------------------------------------------------------------------- */

export type OrderIdentityInput = {
  orderId: string;
  orderNumber: string;
  requestHash: string;
  idempotencyKey: string;
};

export type CreatePendingOrderInput = {
  identity: OrderIdentityInput;
  intake: CampaignIntake;
  catalog: StripeCheckoutCatalog;

  /**
   * Whether the connected Stripe account uses live mode.
   */
  livemode?: boolean;

  /**
   * Source identifier stored with the order.
   */
  source?: string;

  /**
   * Optional order creation timestamp.
   */
  createdAt?: string;
};

export type CreatePendingOrderResult = {
  order: OrderRow;
  items: OrderItemRow[];
  intake: CampaignIntakeRow;
  alreadyExisted: boolean;
};

export type AttachStripeCheckoutInput = {
  orderId: string;
  orderNumber: string;

  checkoutSessionId: string;

  paymentIntentId?: string;
  customerId?: string;

  /**
   * ISO timestamp for Stripe Checkout expiration.
   */
  expiresAt?: string;

  livemode?: boolean;
};

export type RecordOrderEventInput = {
  orderId: string;
  orderNumber: string;

  type: DatabaseOrderEventType;

  provider?: DatabaseOrderEventProvider;

  providerEventId?: string;
  providerEventType?: string;

  checkoutSessionId?: string;
  paymentIntentId?: string;
  customerId?: string;

  paymentStatus?: string;
  checkoutStatus?: string;

  amountTotalCents?: number;
  refundedAmountCents?: number;

  currency?: string;

  campaignCount?: number;
  campaignSkus?: string[];

  livemode?: boolean;

  message: string;

  /**
   * Store only safe operational details.
   *
   * Never store card numbers, secrets, or unrestricted raw webhook data.
   */
  payload?: Json;

  processed?: boolean;
  processedAt?: string;
  createdAt?: string;
};

export type RecordOrderEventResult = {
  event: OrderEventRow;
  duplicate: boolean;
};

export type MarkOrderPaymentProcessingInput = {
  orderId: string;
  orderNumber: string;

  providerEventId: string;
  providerEventType: string;

  checkoutSessionId?: string;
  paymentIntentId?: string;
  customerId?: string;

  amountTotalCents?: number;
  currency?: string;

  campaignCount?: number;
  campaignSkus?: string[];

  livemode?: boolean;
  occurredAt?: string;
};

export type MarkOrderPaidInput = {
  orderId: string;
  orderNumber: string;

  providerEventId: string;
  providerEventType: string;

  checkoutSessionId: string;
  paymentIntentId?: string;
  customerId?: string;

  amountTotalCents: number;
  currency: string;

  campaignCount?: number;
  campaignSkus?: string[];

  receiptUrl?: string;

  livemode?: boolean;
  paidAt?: string;
};

export type MarkOrderPaymentFailedInput = {
  orderId: string;
  orderNumber: string;

  providerEventId: string;
  providerEventType: string;

  checkoutSessionId?: string;
  paymentIntentId?: string;
  customerId?: string;

  amountTotalCents?: number;
  currency?: string;

  campaignCount?: number;
  campaignSkus?: string[];

  message?: string;

  livemode?: boolean;
  occurredAt?: string;
};

export type MarkOrderExpiredInput = {
  orderId: string;
  orderNumber: string;

  providerEventId: string;
  providerEventType: string;

  checkoutSessionId: string;
  paymentIntentId?: string;
  customerId?: string;

  amountTotalCents?: number;
  currency?: string;

  campaignCount?: number;
  campaignSkus?: string[];

  livemode?: boolean;
  expiredAt?: string;
};

export type MarkOrderRefundedInput = {
  orderId: string;
  orderNumber: string;

  providerEventId: string;
  providerEventType: string;

  paymentIntentId?: string;
  customerId?: string;

  amountTotalCents: number;
  refundedAmountCents: number;
  currency: string;

  campaignCount?: number;
  campaignSkus?: string[];

  fullyRefunded: boolean;

  livemode?: boolean;
  refundedAt?: string;
};

/* --------------------------------------------------------------------- */
/* Internal Types                                                         */
/* --------------------------------------------------------------------- */

type DatabaseErrorLike = {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
};

type OrderStatusPatch = {
  status?: DatabaseOrderStatus;
  paymentStatus?: DatabasePaymentStatus;
  intakeStatus?: DatabaseIntakeStatus;
  fulfillmentStatus?: DatabaseFulfillmentStatus;
};

/* --------------------------------------------------------------------- */
/* Singleton Client                                                       */
/* --------------------------------------------------------------------- */

let orderStoreClient:
  SupabaseClient<Database> | null =
    null;

/* --------------------------------------------------------------------- */
/* General Utilities                                                      */
/* --------------------------------------------------------------------- */

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeOptionalString(
  value: string | null | undefined,
): string | null {
  const normalized =
    value?.trim();

  return normalized
    ? normalized
    : null;
}

function normalizeRequiredString(
  value: string,
  fallback: string,
): string {
  const normalized =
    value.trim();

  return normalized ||
    fallback;
}

function normalizeCurrency(
  currency: string | null | undefined,
): string {
  const normalized =
    currency
      ?.trim()
      .toUpperCase();

  return normalized &&
    /^[A-Z]{3}$/.test(normalized)
    ? normalized
    : DEFAULT_CURRENCY;
}

function normalizeInteger(
  value: number | null | undefined,
  fallback = 0,
): number {
  return Number.isSafeInteger(value)
    ? Math.max(0, value as number)
    : fallback;
}

function normalizeIsoTimestamp(
  value: string | undefined,
  fallback = new Date().toISOString(),
): string {
  if (!value) {
    return fallback;
  }

  const timestamp =
    Date.parse(value);

  return Number.isNaN(timestamp)
    ? fallback
    : new Date(timestamp).toISOString();
}

function uniqueStrings(
  values: readonly string[] | undefined,
): string[] {
  if (!values) {
    return [];
  }

  return Array.from(
    new Set(
      values
        .map((value) =>
          value.trim(),
        )
        .filter(Boolean),
    ),
  );
}

/**
 * Converts application objects into JSON-compatible database values while
 * removing properties whose value is undefined.
 */
function toJson(
  value: unknown,
): Json {
  const serialized =
    JSON.stringify(value);

  if (serialized === undefined) {
    return null;
  }

  return JSON.parse(
    serialized,
  ) as Json;
}

function getDatabaseError(
  error: unknown,
): DatabaseErrorLike {
  if (isRecord(error)) {
    return {
      message:
        typeof error.message === "string"
          ? error.message
          : undefined,

      code:
        typeof error.code === "string"
          ? error.code
          : undefined,

      details:
        typeof error.details === "string"
          ? error.details
          : undefined,

      hint:
        typeof error.hint === "string"
          ? error.hint
          : undefined,
    };
  }

  if (error instanceof Error) {
    return {
      message:
        error.message,
    };
  }

  return {};
}

function isUniqueViolation(
  error: unknown,
): boolean {
  return (
    getDatabaseError(error).code ===
    "23505"
  );
}

function createStoreError(
  code: OrderStoreErrorCode,
  fallbackMessage: string,
  error: unknown,
  options: {
    orderId?: string;
    orderNumber?: string;
  } = {},
): OrderStoreError {
  const databaseError =
    getDatabaseError(error);

  return new OrderStoreError(
    code,
    databaseError.message ||
      fallbackMessage,
    {
      orderId:
        options.orderId,

      orderNumber:
        options.orderNumber,

      databaseCode:
        databaseError.code,

      databaseDetails:
        databaseError.details,

      cause:
        error,
    },
  );
}

/* --------------------------------------------------------------------- */
/* Environment Resolution                                                 */
/* --------------------------------------------------------------------- */

function getSupabaseUrl(): string {
  const value =
    process.env[
      SUPABASE_SERVER_URL_ENV
    ]?.trim() ||
    process.env[
      SUPABASE_URL_ENV
    ]?.trim();

  if (!value) {
    throw new OrderStoreError(
      "configuration-error",
      `${SUPABASE_SERVER_URL_ENV} or ${SUPABASE_URL_ENV} must be configured.`,
    );
  }

  try {
    const url =
      new URL(value);

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      throw new Error(
        "Unsupported protocol.",
      );
    }

    return url.toString();
  } catch {
    throw new OrderStoreError(
      "configuration-error",
      "The configured Supabase URL is invalid.",
    );
  }
}

function getSupabaseServerKey(): string {
  const key =
    process.env[
      SUPABASE_SECRET_KEY_ENV
    ]?.trim() ||
    process.env[
      SUPABASE_SERVICE_ROLE_KEY_ENV
    ]?.trim();

  if (!key) {
    throw new OrderStoreError(
      "configuration-error",
      `${SUPABASE_SECRET_KEY_ENV} or ${SUPABASE_SERVICE_ROLE_KEY_ENV} must be configured.`,
    );
  }

  return key;
}

/* --------------------------------------------------------------------- */
/* Supabase Admin Client                                                  */
/* --------------------------------------------------------------------- */

/**
 * Returns a server-only Supabase client used for protected order writes.
 *
 * Never import this module into a Client Component.
 */
export function getOrderStoreClient():
  SupabaseClient<Database> {
  if (orderStoreClient) {
    return orderStoreClient;
  }

  orderStoreClient =
    createClient<Database>(
      getSupabaseUrl(),
      getSupabaseServerKey(),
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },

        global: {
          headers: {
            "X-Client-Info":
              SUPABASE_CLIENT_INFO,
          },
        },
      },
    );

  return orderStoreClient;
}

/* --------------------------------------------------------------------- */
/* Platform Display Helpers                                               */
/* --------------------------------------------------------------------- */

const PLATFORM_NAME_MAP:
  Record<string, string> = {
    spotify:
      "Spotify",

    "apple-music":
      "Apple Music",

    instagram:
      "Instagram",

    tiktok:
      "TikTok",

    youtube:
      "YouTube",

    vevo:
      "VEVO",

    "press-pr":
      "Press & PR",

    press:
      "Press & PR",

    radio:
      "Radio",

    soundcloud:
      "SoundCloud",

    "artist-branding":
      "Artist Branding",

    branding:
      "Artist Branding",
  };

function humanizeSlug(
  value: string,
): string {
  return value
    .trim()
    .split(/[-_]+/)
    .filter(Boolean)
    .map((word) =>
      word.length <= 4
        ? word.toUpperCase()
        : `${word[0]?.toUpperCase() ?? ""}${word
            .slice(1)
            .toLowerCase()}`,
    )
    .join(" ");
}

function getPlatformDisplayName(
  platformSlug: string,
): string {
  const normalizedSlug =
    platformSlug
      .trim()
      .toLowerCase();

  return (
    PLATFORM_NAME_MAP[
      normalizedSlug
    ] ||
    humanizeSlug(
      normalizedSlug,
    ) ||
    "Money Records"
  );
}

/* --------------------------------------------------------------------- */
/* Database Insert Builders                                               */
/* --------------------------------------------------------------------- */

function createOrderInsert({
  identity,
  intake,
  catalog,
  livemode = false,
  source = ORDER_SOURCE,
  createdAt,
}: CreatePendingOrderInput): OrderInsert {
  const timestamp =
    normalizeIsoTimestamp(
      createdAt,
    );

  return {
    id:
      identity.orderId,

    order_number:
      identity.orderNumber,

    schema_version:
      ORDER_SCHEMA_VERSION,

    request_hash:
      identity.requestHash,

    idempotency_key:
      identity.idempotencyKey,

    source:
      normalizeRequiredString(
        source,
        ORDER_SOURCE,
      ),

    livemode,

    status:
      "pending-payment",

    payment_status:
      "unpaid",

    intake_status:
      "submitted",

    fulfillment_status:
      "awaiting-review",

    currency:
      normalizeCurrency(
        catalog.currency,
      ),

    item_count:
      catalog.itemCount,

    subtotal_cents:
      catalog.subtotalCents,

    discount_cents:
      0,

    tax_cents:
      0,

    processing_fee_cents:
      0,

    total_cents:
      catalog.subtotalCents,

    customer_first_name:
      intake.customer.firstName.trim(),

    customer_last_name:
      intake.customer.lastName.trim(),

    customer_email:
      intake.customer.email
        .trim()
        .toLowerCase(),

    customer_phone:
      intake.customer.phone.trim(),

    customer_company_name:
      normalizeOptionalString(
        intake.customer.companyName,
      ),

    customer_country:
      intake.customer.country.trim(),

    customer_region:
      normalizeOptionalString(
        intake.customer.region,
      ),

    artist_name:
      intake.artist.artistName.trim(),

    release_title:
      intake.release.releaseTitle.trim(),

    created_at:
      timestamp,

    updated_at:
      timestamp,
  };
}

function findCampaignItemIntake(
  intake: CampaignIntake,
  sku: string,
) {
  const normalizedSku =
    sku.trim().toUpperCase();

  return intake.campaignItems.find(
    (item) =>
      item.sku
        .trim()
        .toUpperCase() ===
      normalizedSku,
  );
}

function createOrderItemInsert(
  orderId: string,
  product: StripeCampaignProduct,
  intake: CampaignIntake,
  createdAt: string,
): OrderItemInsert {
  const campaign =
    product.campaign;

  const campaignItem =
    findCampaignItemIntake(
      intake,
      product.sku,
    );

  const platformName =
    getPlatformDisplayName(
      campaign.platformSlug,
    );

  return {
    order_id:
      orderId,

    sku:
      product.sku,

    campaign_id:
      campaign.id,

    campaign_slug:
      campaign.slug,

    campaign_href:
      campaign.href,

    campaign_name:
      campaign.name,

    campaign_short_name:
      campaign.shortName,

    campaign_target_label:
      campaign.campaignTargetLabel,

    platform_slug:
      campaign.platformSlug,

    platform_name:
      platformName,

    platform_short_name:
      platformName,

    unit_amount_cents:
      product.unitAmountCents,

    quantity:
      1,

    total_amount_cents:
      product.unitAmountCents,

    currency:
      normalizeCurrency(
        product.currency,
      ),

    stripe_price_id:
      product.stripePriceId ??
      null,

    stripe_product_id:
      null,

    price_source:
      product.priceSource,

    campaign_url:
      normalizeOptionalString(
        campaignItem?.campaignUrl,
      ),

    instructions:
      normalizeOptionalString(
        campaignItem?.instructions,
      ),

    created_at:
      createdAt,

    updated_at:
      createdAt,
  };
}

function createOrderItemInserts(
  orderId: string,
  catalog: StripeCheckoutCatalog,
  intake: CampaignIntake,
  createdAt: string,
): OrderItemInsert[] {
  return catalog.products.map(
    (product) =>
      createOrderItemInsert(
        orderId,
        product,
        intake,
        createdAt,
      ),
  );
}

function createCampaignIntakeInsert(
  orderId: string,
  intake: CampaignIntake,
  createdAt: string,
): CampaignIntakeInsert {
  return {
    order_id:
      orderId,

    status:
      "submitted",

    customer:
      toJson(
        intake.customer,
      ),

    artist:
      toJson(
        intake.artist,
      ),

    release:
      toJson(
        intake.release,
      ),

    preferences:
      toJson(
        intake.preferences,
      ),

    assets:
      toJson(
        intake.assets,
      ),

    campaign_items:
      toJson(
        intake.campaignItems,
      ),

    agreements:
      toJson(
        intake.agreements,
      ),

    submitted_at:
      createdAt,

    created_at:
      createdAt,

    updated_at:
      createdAt,
  };
}

/* --------------------------------------------------------------------- */
/* Order Queries                                                          */
/* --------------------------------------------------------------------- */

export async function getOrderById(
  orderId: string,
): Promise<OrderRow | null> {
  const normalizedOrderId =
    orderId.trim();

  if (!normalizedOrderId) {
    return null;
  }

  const client =
    getOrderStoreClient();

  const {
    data,
    error,
  } =
    await client
      .from(
        DATABASE_TABLES.orders,
      )
      .select("*")
      .eq(
        "id",
        normalizedOrderId,
      )
      .maybeSingle();

  if (error) {
    throw createStoreError(
      "order-query-failed",
      "The order could not be retrieved.",
      error,
      {
        orderId:
          normalizedOrderId,
      },
    );
  }

  return data;
}

export async function getOrderByNumber(
  orderNumber: string,
): Promise<OrderRow | null> {
  const normalizedOrderNumber =
    orderNumber
      .trim()
      .toUpperCase();

  if (!normalizedOrderNumber) {
    return null;
  }

  const client =
    getOrderStoreClient();

  const {
    data,
    error,
  } =
    await client
      .from(
        DATABASE_TABLES.orders,
      )
      .select("*")
      .eq(
        "order_number",
        normalizedOrderNumber,
      )
      .maybeSingle();

  if (error) {
    throw createStoreError(
      "order-query-failed",
      "The order could not be retrieved.",
      error,
      {
        orderNumber:
          normalizedOrderNumber,
      },
    );
  }

  return data;
}

export async function getOrderByCheckoutSessionId(
  checkoutSessionId: string,
): Promise<OrderRow | null> {
  const normalizedSessionId =
    checkoutSessionId.trim();

  if (!normalizedSessionId) {
    return null;
  }

  const client =
    getOrderStoreClient();

  const {
    data,
    error,
  } =
    await client
      .from(
        DATABASE_TABLES.orders,
      )
      .select("*")
      .eq(
        "stripe_checkout_session_id",
        normalizedSessionId,
      )
      .maybeSingle();

  if (error) {
    throw createStoreError(
      "order-query-failed",
      "The order could not be retrieved using the Checkout Session.",
      error,
    );
  }

  return data;
}

export async function getOrderByPaymentIntentId(
  paymentIntentId: string,
): Promise<OrderRow | null> {
  const normalizedPaymentIntentId =
    paymentIntentId.trim();

  if (!normalizedPaymentIntentId) {
    return null;
  }

  const client =
    getOrderStoreClient();

  const {
    data,
    error,
  } =
    await client
      .from(
        DATABASE_TABLES.orders,
      )
      .select("*")
      .eq(
        "stripe_payment_intent_id",
        normalizedPaymentIntentId,
      )
      .maybeSingle();

  if (error) {
    throw createStoreError(
      "order-query-failed",
      "The order could not be retrieved using the PaymentIntent.",
      error,
    );
  }

  return data;
}

export async function getOrderByNumberAndEmail(
  orderNumber: string,
  email: string,
): Promise<OrderRow | null> {
  const normalizedOrderNumber =
    orderNumber
      .trim()
      .toUpperCase();

  const normalizedEmail =
    email
      .trim()
      .toLowerCase();

  if (
    !normalizedOrderNumber ||
    !normalizedEmail
  ) {
    return null;
  }

  const client =
    getOrderStoreClient();

  const {
    data,
    error,
  } =
    await client
      .from(
        DATABASE_TABLES.orders,
      )
      .select("*")
      .eq(
        "order_number",
        normalizedOrderNumber,
      )
      .eq(
        "customer_email",
        normalizedEmail,
      )
      .maybeSingle();

  if (error) {
    throw createStoreError(
      "order-query-failed",
      "The order lookup could not be completed.",
      error,
      {
        orderNumber:
          normalizedOrderNumber,
      },
    );
  }

  return data;
}

/* --------------------------------------------------------------------- */
/* Order Relations                                                        */
/* --------------------------------------------------------------------- */

export async function getOrderWithRelations(
  orderId: string,
): Promise<OrderWithRelations | null> {
  const order =
    await getOrderById(
      orderId,
    );

  if (!order) {
    return null;
  }

  const client =
    getOrderStoreClient();

  const [
    orderItemsResult,
    intakeResult,
    eventsResult,
  ] =
    await Promise.all([
      client
        .from(
          DATABASE_TABLES.orderItems,
        )
        .select("*")
        .eq(
          "order_id",
          order.id,
        )
        .order(
          "created_at",
          {
            ascending: true,
          },
        ),

      client
        .from(
          DATABASE_TABLES.campaignIntakes,
        )
        .select("*")
        .eq(
          "order_id",
          order.id,
        )
        .maybeSingle(),

      client
        .from(
          DATABASE_TABLES.orderEvents,
        )
        .select("*")
        .eq(
          "order_id",
          order.id,
        )
        .order(
          "created_at",
          {
            ascending: true,
          },
        ),
    ]);

  if (orderItemsResult.error) {
    throw createStoreError(
      "order-query-failed",
      "The order items could not be retrieved.",
      orderItemsResult.error,
      {
        orderId:
          order.id,
        orderNumber:
          order.order_number,
      },
    );
  }

  if (intakeResult.error) {
    throw createStoreError(
      "order-query-failed",
      "The campaign intake could not be retrieved.",
      intakeResult.error,
      {
        orderId:
          order.id,
        orderNumber:
          order.order_number,
      },
    );
  }

  if (eventsResult.error) {
    throw createStoreError(
      "order-event-query-failed",
      "The order events could not be retrieved.",
      eventsResult.error,
      {
        orderId:
          order.id,
        orderNumber:
          order.order_number,
      },
    );
  }

  return {
    ...order,

    order_items:
      orderItemsResult.data ??
      [],

    campaign_intakes:
      intakeResult.data,

    order_events:
      eventsResult.data ??
      [],
  };
}

/* --------------------------------------------------------------------- */
/* Public Order Projection                                                */
/* --------------------------------------------------------------------- */

export function createPublicOrderRecord(
  order:
    OrderWithRelations,
): PublicOrderRecord {
  const {
    internal_notes: _internalNotes,
    request_hash: _requestHash,
    idempotency_key: _idempotencyKey,
    campaign_intakes,
    order_events,
    order_items,
    ...safeOrder
  } = order;

  return {
    ...safeOrder,

    order_items,

    campaign_intake:
      campaign_intakes
        ? {
            status:
              campaign_intakes.status,

            submitted_at:
              campaign_intakes.submitted_at,

            reviewed_at:
              campaign_intakes.reviewed_at,

            changes_requested_message:
              campaign_intakes
                .changes_requested_message,

            changes_requested_at:
              campaign_intakes
                .changes_requested_at,

            approved_at:
              campaign_intakes.approved_at,
          }
        : null,

    order_events:
      order_events.map(
        (event) => ({
          id:
            event.id,

          type:
            event.type,

          message:
            event.message,

          created_at:
            event.created_at,

          processed_at:
            event.processed_at,
        }),
      ),
  };
}

export async function getPublicOrderByCheckoutSessionId(
  checkoutSessionId: string,
): Promise<PublicOrderRecord | null> {
  const order =
    await getOrderByCheckoutSessionId(
      checkoutSessionId,
    );

  if (!order) {
    return null;
  }

  const fullOrder =
    await getOrderWithRelations(
      order.id,
    );

  return fullOrder
    ? createPublicOrderRecord(
        fullOrder,
      )
    : null;
}

/* --------------------------------------------------------------------- */
/* Create Pending Order                                                   */
/* --------------------------------------------------------------------- */

export async function createPendingOrder(
  input: CreatePendingOrderInput,
): Promise<CreatePendingOrderResult> {
  const {
    identity,
    intake,
    catalog,
  } = input;

  const existingOrder =
    await getOrderById(
      identity.orderId,
    );

  if (
    existingOrder &&
    existingOrder.request_hash !==
      identity.requestHash
  ) {
    throw new OrderStoreError(
      "order-conflict",
      "An order already exists with this identifier but contains different checkout data.",
      {
        orderId:
          identity.orderId,
        orderNumber:
          identity.orderNumber,
      },
    );
  }

  const client =
    getOrderStoreClient();

  const createdAt =
    normalizeIsoTimestamp(
      input.createdAt,
    );

  const orderInsert =
    createOrderInsert({
      ...input,
      createdAt,
    });

  let order:
    OrderRow | null =
      existingOrder;

  let createdNewOrder =
    false;

  if (!order) {
    const {
      data,
      error,
    } =
      await client
        .from(
          DATABASE_TABLES.orders,
        )
        .insert(
          orderInsert,
        )
        .select("*")
        .single();

    if (error) {
      if (
        isUniqueViolation(
          error,
        )
      ) {
        order =
          await getOrderById(
            identity.orderId,
          );

        if (
          !order ||
          order.request_hash !==
            identity.requestHash
        ) {
          throw createStoreError(
            "order-conflict",
            "A conflicting order was created during checkout.",
            error,
            {
              orderId:
                identity.orderId,
              orderNumber:
                identity.orderNumber,
            },
          );
        }
      } else {
        throw createStoreError(
          "order-create-failed",
          "The pending order could not be created.",
          error,
          {
            orderId:
              identity.orderId,
            orderNumber:
              identity.orderNumber,
          },
        );
      }
    } else {
      order =
        data;

      createdNewOrder =
        true;
    }
  }

  if (!order) {
    throw new OrderStoreError(
      "order-create-failed",
      "The pending order could not be resolved after creation.",
      {
        orderId:
          identity.orderId,
        orderNumber:
          identity.orderNumber,
      },
    );
  }

  try {
    const itemInserts =
      createOrderItemInserts(
        order.id,
        catalog,
        intake,
        createdAt,
      );

    const {
      data: itemRows,
      error: itemsError,
    } =
      await client
        .from(
          DATABASE_TABLES.orderItems,
        )
        .upsert(
          itemInserts,
          {
            onConflict:
              "order_id,sku",
          },
        )
        .select("*");

    if (itemsError) {
      throw createStoreError(
        "order-items-create-failed",
        "The selected campaign services could not be saved.",
        itemsError,
        {
          orderId:
            order.id,
          orderNumber:
            order.order_number,
        },
      );
    }

    const intakeInsert =
      createCampaignIntakeInsert(
        order.id,
        intake,
        createdAt,
      );

    const {
      data: intakeRow,
      error: intakeError,
    } =
      await client
        .from(
          DATABASE_TABLES.campaignIntakes,
        )
        .upsert(
          intakeInsert,
          {
            onConflict:
              "order_id",
          },
        )
        .select("*")
        .single();

    if (intakeError) {
      throw createStoreError(
        "order-intake-create-failed",
        "The campaign intake could not be saved.",
        intakeError,
        {
          orderId:
            order.id,
          orderNumber:
            order.order_number,
        },
      );
    }

    return {
      order,

      items:
        itemRows ??
        [],

      intake:
        intakeRow,

      alreadyExisted:
        !createdNewOrder,
    };
  } catch (error) {
    if (createdNewOrder) {
      try {
        await deletePendingOrder(
          order.id,
        );
      } catch (cleanupError) {
        console.error(
          "[Money Records Order Store] Pending-order cleanup failed",
          {
            orderId:
              order.id,

            orderNumber:
              order.order_number,

            error:
              cleanupError instanceof Error
                ? cleanupError.message
                : "Unknown cleanup error",
          },
        );
      }
    }

    throw error;
  }
}

/* --------------------------------------------------------------------- */
/* Order Updates                                                          */
/* --------------------------------------------------------------------- */

export async function updateOrderById(
  orderId: string,
  update: OrderUpdate,
): Promise<OrderRow> {
  const normalizedOrderId =
    orderId.trim();

  if (!normalizedOrderId) {
    throw new OrderStoreError(
      "order-not-found",
      "A valid order ID is required.",
    );
  }

  const client =
    getOrderStoreClient();

  const updatePayload:
    OrderUpdate = {
      ...update,

      updated_at:
        new Date().toISOString(),
  };

  const {
    data,
    error,
  } =
    await client
      .from(
        DATABASE_TABLES.orders,
      )
      .update(
        updatePayload,
      )
      .eq(
        "id",
        normalizedOrderId,
      )
      .select("*")
      .maybeSingle();

  if (error) {
    throw createStoreError(
      "order-update-failed",
      "The order could not be updated.",
      error,
      {
        orderId:
          normalizedOrderId,
      },
    );
  }

  if (!data) {
    throw new OrderStoreError(
      "order-not-found",
      "The order could not be found.",
      {
        orderId:
          normalizedOrderId,
      },
    );
  }

  return data;
}

export async function updateOrderStatuses(
  orderId: string,
  statuses: OrderStatusPatch,
  additionalUpdate: OrderUpdate = {},
): Promise<OrderRow> {
  return updateOrderById(
    orderId,
    {
      ...additionalUpdate,

      ...(statuses.status
        ? {
            status:
              statuses.status,
          }
        : {}),

      ...(statuses.paymentStatus
        ? {
            payment_status:
              statuses.paymentStatus,
          }
        : {}),

      ...(statuses.intakeStatus
        ? {
            intake_status:
              statuses.intakeStatus,
          }
        : {}),

      ...(statuses.fulfillmentStatus
        ? {
            fulfillment_status:
              statuses.fulfillmentStatus,
          }
        : {}),
    },
  );
}

/* --------------------------------------------------------------------- */
/* Attach Stripe Checkout Session                                         */
/* --------------------------------------------------------------------- */

export async function attachStripeCheckoutSession(
  input: AttachStripeCheckoutInput,
): Promise<OrderRow> {
  const order =
    await updateOrderStatuses(
      input.orderId,
      {
        status:
          "pending-payment",

        paymentStatus:
          "pending",

        intakeStatus:
          "submitted",

        fulfillmentStatus:
          "awaiting-review",
      },
      {
        stripe_checkout_session_id:
          input.checkoutSessionId,

        stripe_payment_intent_id:
          normalizeOptionalString(
            input.paymentIntentId,
          ),

        stripe_customer_id:
          normalizeOptionalString(
            input.customerId,
          ),

        checkout_expires_at:
          input.expiresAt
            ? normalizeIsoTimestamp(
                input.expiresAt,
              )
            : null,

        livemode:
          input.livemode ??
          false,
      },
    );

  await recordOrderEvent({
    orderId:
      input.orderId,

    orderNumber:
      input.orderNumber,

    type:
      "checkout-created",

    provider:
      "money-records",

    providerEventType:
      "checkout.session.created",

    checkoutSessionId:
      input.checkoutSessionId,

    paymentIntentId:
      input.paymentIntentId,

    customerId:
      input.customerId,

    paymentStatus:
      "pending",

    checkoutStatus:
      "open",

    livemode:
      input.livemode,

    message:
      "A secure Stripe Checkout Session was created for this campaign order.",

    processed:
      true,
  });

  return order;
}

/* --------------------------------------------------------------------- */
/* Event Queries                                                          */
/* --------------------------------------------------------------------- */

export async function getOrderEventByProviderId(
  providerEventId: string,
): Promise<OrderEventRow | null> {
  const normalizedEventId =
    providerEventId.trim();

  if (!normalizedEventId) {
    return null;
  }

  const client =
    getOrderStoreClient();

  const {
    data,
    error,
  } =
    await client
      .from(
        DATABASE_TABLES.orderEvents,
      )
      .select("*")
      .eq(
        "provider_event_id",
        normalizedEventId,
      )
      .maybeSingle();

  if (error) {
    throw createStoreError(
      "order-event-query-failed",
      "The order event could not be retrieved.",
      error,
    );
  }

  return data;
}

/* --------------------------------------------------------------------- */
/* Record Order Event                                                     */
/* --------------------------------------------------------------------- */

export async function recordOrderEvent(
  input: RecordOrderEventInput,
): Promise<RecordOrderEventResult> {
  const providerEventId =
    normalizeOptionalString(
      input.providerEventId,
    );

  if (providerEventId) {
    const existingEvent =
      await getOrderEventByProviderId(
        providerEventId,
      );

    if (existingEvent) {
      return {
        event:
          existingEvent,

        duplicate:
          true,
      };
    }
  }

  const client =
    getOrderStoreClient();

  const createdAt =
    normalizeIsoTimestamp(
      input.createdAt,
    );

  const processed =
    input.processed ??
    true;

  const insert:
    OrderEventInsert = {
      order_id:
        input.orderId,

      order_number:
        input.orderNumber,

      type:
        input.type,

      provider:
        input.provider ??
        "stripe",

      provider_event_id:
        providerEventId,

      provider_event_type:
        normalizeOptionalString(
          input.providerEventType,
        ),

      checkout_session_id:
        normalizeOptionalString(
          input.checkoutSessionId,
        ),

      payment_intent_id:
        normalizeOptionalString(
          input.paymentIntentId,
        ),

      customer_id:
        normalizeOptionalString(
          input.customerId,
        ),

      payment_status:
        normalizeOptionalString(
          input.paymentStatus,
        ),

      checkout_status:
        normalizeOptionalString(
          input.checkoutStatus,
        ),

      amount_total_cents:
        input.amountTotalCents ===
          undefined
          ? null
          : normalizeInteger(
              input.amountTotalCents,
            ),

      refunded_amount_cents:
        input.refundedAmountCents ===
          undefined
          ? null
          : normalizeInteger(
              input.refundedAmountCents,
            ),

      currency:
        input.currency
          ? normalizeCurrency(
              input.currency,
            )
          : null,

      campaign_count:
        input.campaignCount ===
          undefined
          ? null
          : normalizeInteger(
              input.campaignCount,
            ),

      campaign_skus:
        uniqueStrings(
          input.campaignSkus,
        ),

      livemode:
        input.livemode ??
        false,

      message:
        input.message
          .trim()
          .slice(
            0,
            2_000,
          ),

      payload:
        input.payload ??
        null,

      processed,

      processed_at:
        processed
          ? normalizeIsoTimestamp(
              input.processedAt,
              createdAt,
            )
          : null,

      created_at:
        createdAt,
    };

  const {
    data,
    error,
  } =
    await client
      .from(
        DATABASE_TABLES.orderEvents,
      )
      .insert(
        insert,
      )
      .select("*")
      .single();

  if (error) {
    if (
      providerEventId &&
      isUniqueViolation(error)
    ) {
      const existingEvent =
        await getOrderEventByProviderId(
          providerEventId,
        );

      if (existingEvent) {
        return {
          event:
            existingEvent,

          duplicate:
            true,
        };
      }
    }

    throw createStoreError(
      "order-event-create-failed",
      "The order event could not be saved.",
      error,
      {
        orderId:
          input.orderId,
        orderNumber:
          input.orderNumber,
      },
    );
  }

  return {
    event:
      data,

    duplicate:
      false,
  };
}

/* --------------------------------------------------------------------- */
/* Payment Processing                                                     */
/* --------------------------------------------------------------------- */

export async function markOrderPaymentProcessing(
  input: MarkOrderPaymentProcessingInput,
): Promise<OrderRow> {
  const occurredAt =
    normalizeIsoTimestamp(
      input.occurredAt,
    );

  await recordOrderEvent({
    orderId:
      input.orderId,

    orderNumber:
      input.orderNumber,

    type:
      "payment-processing",

    providerEventId:
      input.providerEventId,

    providerEventType:
      input.providerEventType,

    checkoutSessionId:
      input.checkoutSessionId,

    paymentIntentId:
      input.paymentIntentId,

    customerId:
      input.customerId,

    paymentStatus:
      "processing",

    checkoutStatus:
      "complete",

    amountTotalCents:
      input.amountTotalCents,

    currency:
      input.currency,

    campaignCount:
      input.campaignCount,

    campaignSkus:
      input.campaignSkus,

    livemode:
      input.livemode,

    message:
      "The campaign order payment is processing.",

    createdAt:
      occurredAt,
  });

  return updateOrderStatuses(
    input.orderId,
    {
      status:
        "pending-payment",

      paymentStatus:
        "processing",

      intakeStatus:
        "submitted",

      fulfillmentStatus:
        "awaiting-review",
    },
    {
      stripe_checkout_session_id:
        normalizeOptionalString(
          input.checkoutSessionId,
        ),

      stripe_payment_intent_id:
        normalizeOptionalString(
          input.paymentIntentId,
        ),

      stripe_customer_id:
        normalizeOptionalString(
          input.customerId,
        ),

      ...(input.amountTotalCents !==
      undefined
        ? {
            total_cents:
              normalizeInteger(
                input.amountTotalCents,
              ),
          }
        : {}),

      ...(input.currency
        ? {
            currency:
              normalizeCurrency(
                input.currency,
              ),
          }
        : {}),

      livemode:
        input.livemode ??
        false,
    },
  );
}

/* --------------------------------------------------------------------- */
/* Payment Success                                                        */
/* --------------------------------------------------------------------- */

export async function markOrderPaid(
  input: MarkOrderPaidInput,
): Promise<OrderRow> {
  const paidAt =
    normalizeIsoTimestamp(
      input.paidAt,
    );

  await recordOrderEvent({
    orderId:
      input.orderId,

    orderNumber:
      input.orderNumber,

    type:
      input.providerEventType ===
      "checkout.session.completed"
        ? "checkout-completed"
        : "payment-succeeded",

    providerEventId:
      input.providerEventId,

    providerEventType:
      input.providerEventType,

    checkoutSessionId:
      input.checkoutSessionId,

    paymentIntentId:
      input.paymentIntentId,

    customerId:
      input.customerId,

    paymentStatus:
      "paid",

    checkoutStatus:
      "complete",

    amountTotalCents:
      input.amountTotalCents,

    currency:
      input.currency,

    campaignCount:
      input.campaignCount,

    campaignSkus:
      input.campaignSkus,

    livemode:
      input.livemode,

    message:
      `Payment completed for ${input.campaignCount ?? 0} campaign service${
        input.campaignCount === 1
          ? ""
          : "s"
      }.`,

    createdAt:
      paidAt,
  });

  return updateOrderStatuses(
    input.orderId,
    {
      status:
        "paid",

      paymentStatus:
        "paid",

      intakeStatus:
        "submitted",

      fulfillmentStatus:
        "awaiting-review",
    },
    {
      stripe_checkout_session_id:
        input.checkoutSessionId,

      stripe_payment_intent_id:
        normalizeOptionalString(
          input.paymentIntentId,
        ),

      stripe_customer_id:
        normalizeOptionalString(
          input.customerId,
        ),

      receipt_url:
        normalizeOptionalString(
          input.receiptUrl,
        ),

      total_cents:
        normalizeInteger(
          input.amountTotalCents,
        ),

      currency:
        normalizeCurrency(
          input.currency,
        ),

      paid_at:
        paidAt,

      checkout_expires_at:
        null,

      livemode:
        input.livemode ??
        false,
    },
  );
}

/* --------------------------------------------------------------------- */
/* Payment Failure                                                        */
/* --------------------------------------------------------------------- */

export async function markOrderPaymentFailed(
  input: MarkOrderPaymentFailedInput,
): Promise<OrderRow> {
  const occurredAt =
    normalizeIsoTimestamp(
      input.occurredAt,
    );

  const message =
    input.message?.trim() ||
    "The campaign order payment could not be completed.";

  await recordOrderEvent({
    orderId:
      input.orderId,

    orderNumber:
      input.orderNumber,

    type:
      "payment-failed",

    providerEventId:
      input.providerEventId,

    providerEventType:
      input.providerEventType,

    checkoutSessionId:
      input.checkoutSessionId,

    paymentIntentId:
      input.paymentIntentId,

    customerId:
      input.customerId,

    paymentStatus:
      "failed",

    checkoutStatus:
      "complete",

    amountTotalCents:
      input.amountTotalCents,

    currency:
      input.currency,

    campaignCount:
      input.campaignCount,

    campaignSkus:
      input.campaignSkus,

    livemode:
      input.livemode,

    message,

    createdAt:
      occurredAt,
  });

  return updateOrderStatuses(
    input.orderId,
    {
      status:
        "failed",

      paymentStatus:
        "failed",

      intakeStatus:
        "submitted",

      fulfillmentStatus:
        "not-started",
    },
    {
      stripe_checkout_session_id:
        normalizeOptionalString(
          input.checkoutSessionId,
        ),

      stripe_payment_intent_id:
        normalizeOptionalString(
          input.paymentIntentId,
        ),

      stripe_customer_id:
        normalizeOptionalString(
          input.customerId,
        ),

      customer_message:
        message,

      ...(input.amountTotalCents !==
      undefined
        ? {
            total_cents:
              normalizeInteger(
                input.amountTotalCents,
              ),
          }
        : {}),

      ...(input.currency
        ? {
            currency:
              normalizeCurrency(
                input.currency,
              ),
          }
        : {}),

      livemode:
        input.livemode ??
        false,
    },
  );
}

/* --------------------------------------------------------------------- */
/* Checkout Expiration                                                    */
/* --------------------------------------------------------------------- */

export async function markOrderCheckoutExpired(
  input: MarkOrderExpiredInput,
): Promise<OrderRow> {
  const expiredAt =
    normalizeIsoTimestamp(
      input.expiredAt,
    );

  await recordOrderEvent({
    orderId:
      input.orderId,

    orderNumber:
      input.orderNumber,

    type:
      "checkout-expired",

    providerEventId:
      input.providerEventId,

    providerEventType:
      input.providerEventType,

    checkoutSessionId:
      input.checkoutSessionId,

    paymentIntentId:
      input.paymentIntentId,

    customerId:
      input.customerId,

    paymentStatus:
      "cancelled",

    checkoutStatus:
      "expired",

    amountTotalCents:
      input.amountTotalCents,

    currency:
      input.currency,

    campaignCount:
      input.campaignCount,

    campaignSkus:
      input.campaignSkus,

    livemode:
      input.livemode,

    message:
      "The Stripe Checkout Session expired before payment was completed.",

    createdAt:
      expiredAt,
  });

  return updateOrderStatuses(
    input.orderId,
    {
      status:
        "cancelled",

      paymentStatus:
        "cancelled",

      intakeStatus:
        "submitted",

      fulfillmentStatus:
        "cancelled",
    },
    {
      stripe_checkout_session_id:
        input.checkoutSessionId,

      stripe_payment_intent_id:
        normalizeOptionalString(
          input.paymentIntentId,
        ),

      stripe_customer_id:
        normalizeOptionalString(
          input.customerId,
        ),

      cancelled_at:
        expiredAt,

      checkout_expires_at:
        null,

      customer_message:
        "Checkout expired before payment was completed.",

      livemode:
        input.livemode ??
        false,
    },
  );
}

/* --------------------------------------------------------------------- */
/* Refunds                                                                */
/* --------------------------------------------------------------------- */

export async function markOrderRefunded(
  input: MarkOrderRefundedInput,
): Promise<OrderRow> {
  const refundedAt =
    normalizeIsoTimestamp(
      input.refundedAt,
    );

  const orderStatus:
    DatabaseOrderStatus =
      input.fullyRefunded
        ? "refunded"
        : "partially-refunded";

  const paymentStatus:
    DatabasePaymentStatus =
      input.fullyRefunded
        ? "refunded"
        : "partially-refunded";

  const eventType:
    DatabaseOrderEventType =
      input.fullyRefunded
        ? "order-refunded"
        : "order-partially-refunded";

  await recordOrderEvent({
    orderId:
      input.orderId,

    orderNumber:
      input.orderNumber,

    type:
      eventType,

    providerEventId:
      input.providerEventId,

    providerEventType:
      input.providerEventType,

    paymentIntentId:
      input.paymentIntentId,

    customerId:
      input.customerId,

    paymentStatus,

    amountTotalCents:
      input.amountTotalCents,

    refundedAmountCents:
      input.refundedAmountCents,

    currency:
      input.currency,

    campaignCount:
      input.campaignCount,

    campaignSkus:
      input.campaignSkus,

    livemode:
      input.livemode,

    message:
      input.fullyRefunded
        ? "The order payment was fully refunded."
        : "The order payment was partially refunded.",

    createdAt:
      refundedAt,
  });

  return updateOrderStatuses(
    input.orderId,
    {
      status:
        orderStatus,

      paymentStatus,

      fulfillmentStatus:
        input.fullyRefunded
          ? "cancelled"
          : undefined,
    },
    {
      stripe_payment_intent_id:
        normalizeOptionalString(
          input.paymentIntentId,
        ),

      total_cents:
        normalizeInteger(
          input.amountTotalCents,
        ),

      currency:
        normalizeCurrency(
          input.currency,
        ),

      refunded_at:
        refundedAt,

      customer_message:
        input.fullyRefunded
          ? "Your order payment was refunded."
          : "A partial refund was applied to your order.",

      livemode:
        input.livemode ??
        false,
    },
  );
}

/* --------------------------------------------------------------------- */
/* Intake Status Updates                                                  */
/* --------------------------------------------------------------------- */

export async function updateCampaignIntakeStatus(
  orderId: string,
  status: DatabaseIntakeStatus,
  options: {
    reviewNotes?: string | null;
    changesRequestedMessage?: string | null;
  } = {},
): Promise<CampaignIntakeRow> {
  const client =
    getOrderStoreClient();

  const now =
    new Date().toISOString();

  const update = {
    status,

    review_notes:
      options.reviewNotes ===
        undefined
        ? undefined
        : normalizeOptionalString(
            options.reviewNotes,
          ),

    changes_requested_message:
      options.changesRequestedMessage ===
        undefined
        ? undefined
        : normalizeOptionalString(
            options.changesRequestedMessage,
          ),

    reviewed_at:
      status === "under-review" ||
      status === "changes-requested" ||
      status === "approved"
        ? now
        : undefined,

    changes_requested_at:
      status === "changes-requested"
        ? now
        : undefined,

    approved_at:
      status === "approved"
        ? now
        : undefined,

    updated_at:
      now,
  };

  const {
    data,
    error,
  } =
    await client
      .from(
        DATABASE_TABLES.campaignIntakes,
      )
      .update(update)
      .eq(
        "order_id",
        orderId,
      )
      .select("*")
      .maybeSingle();

  if (error) {
    throw createStoreError(
      "order-update-failed",
      "The campaign intake status could not be updated.",
      error,
      {
        orderId,
      },
    );
  }

  if (!data) {
    throw new OrderStoreError(
      "order-not-found",
      "The campaign intake could not be found.",
      {
        orderId,
      },
    );
  }

  await updateOrderById(
    orderId,
    {
      intake_status:
        status,
    },
  );

  return data;
}

/* --------------------------------------------------------------------- */
/* Pending Order Cleanup                                                  */
/* --------------------------------------------------------------------- */

/**
 * Deletes only an unpaid pending order.
 *
 * The database migration should configure cascading deletes for related
 * items, intake, and events.
 */
export async function deletePendingOrder(
  orderId: string,
): Promise<boolean> {
  const normalizedOrderId =
    orderId.trim();

  if (!normalizedOrderId) {
    return false;
  }

  const client =
    getOrderStoreClient();

  const {
    data,
    error,
  } =
    await client
      .from(
        DATABASE_TABLES.orders,
      )
      .delete()
      .eq(
        "id",
        normalizedOrderId,
      )
      .in(
        "payment_status",
        [
          "unpaid",
          "pending",
        ],
      )
      .select("id");

  if (error) {
    throw createStoreError(
      "order-delete-failed",
      "The pending order could not be deleted.",
      error,
      {
        orderId:
          normalizedOrderId,
      },
    );
  }

  return (
    data?.length ??
    0
  ) > 0;
}

/* --------------------------------------------------------------------- */
/* Health Check                                                           */
/* --------------------------------------------------------------------- */

/**
 * Confirms that the order database is reachable.
 */
export async function checkOrderStoreConnection(): Promise<{
  ok: boolean;
  message: string;
}> {
  try {
    const client =
      getOrderStoreClient();

    const {
      error,
    } =
      await client
        .from(
          DATABASE_TABLES.orders,
        )
        .select(
          "id",
          {
            head: true,
            count: "exact",
          },
        )
        .limit(1);

    if (error) {
      return {
        ok: false,
        message:
          error.message,
      };
    }

    return {
      ok: true,
      message:
        "Money Records order storage is connected.",
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Money Records order storage is unavailable.",
    };
  }
}