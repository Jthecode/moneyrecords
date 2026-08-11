import "server-only";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Stripe Checkout API                                  ┃
   ┃ File   : src/app/api/stripe/checkout/route.ts                        ┃
   ┃ Role   : Validate, persist, and create secure Stripe Checkout        ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  createHash,
  randomUUID,
} from "node:crypto";

import type Stripe from "stripe";

import {
  NextResponse,
} from "next/server";

import {
  attachStripeCheckoutSession,
  createPendingOrder,
  OrderStoreError,
  type OrderIdentityInput,
} from "@/lib/order-store";

import {
  validateCheckoutOrderRequest,
  type ValidatedCheckoutOrderRequest,
} from "@/lib/order-validation";

import {
  createStripeCheckoutCatalog,
  StripeProductConfigurationError,
  type StripeCheckoutCatalog,
} from "@/lib/stripe-products";

import {
  createStripeCheckoutRedirects,
  createStripeIdempotencyKey,
  createStripeMetadata,
  getStripe,
  getStripeCheckoutSessionUrl,
  getStripeEnvironment,
  getStripeErrorDetails,
  getStripeErrorMessage,
  StripeConfigurationError,
} from "@/lib/stripe";

import {
  ORDER_SCHEMA_VERSION,
  type CampaignIntakeErrors,
  type CreateCheckoutSessionError,
  type CreateCheckoutSessionErrorCode,
  type CreateCheckoutSessionResponse,
} from "@/types/order";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                    */
/* --------------------------------------------------------------------- */

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

export const maxDuration =
  30;

/* --------------------------------------------------------------------- */
/* Request and Checkout Limits                                            */
/* --------------------------------------------------------------------- */

/**
 * The checkout request contains JSON and URLs—not uploaded files.
 */
const MAX_CHECKOUT_BODY_BYTES =
  128_000;

/**
 * Stripe requires Checkout Sessions to expire at least 30 minutes after
 * creation. This route uses 31 minutes.
 */
const CHECKOUT_EXPIRATION_SECONDS =
  31 * 60;

/**
 * Identical validated requests submitted within this window use the same
 * order identity and Stripe idempotency key.
 */
const IDEMPOTENCY_WINDOW_MS =
  10 * 60 * 1_000;

const MONEY_RECORDS_SOURCE =
  "money-records-web";

/* --------------------------------------------------------------------- */
/* Internal Types                                                         */
/* --------------------------------------------------------------------- */

type CheckoutStage =
  | "request"
  | "validation"
  | "catalog"
  | "identity"
  | "order-persistence"
  | "stripe-session"
  | "session-persistence"
  | "completed";

type MappedOrderStoreError = {
  status: number;
  message: string;
};

type MappedStripeProductError = {
  code:
    CreateCheckoutSessionErrorCode;

  status:
    number;

  message:
    string;
};

/* --------------------------------------------------------------------- */
/* Response Helpers                                                       */
/* --------------------------------------------------------------------- */

function createResponseHeaders(
  requestId: string,
): HeadersInit {
  return {
    "Cache-Control":
      "no-store, no-cache, must-revalidate",

    "X-Content-Type-Options":
      "nosniff",

    "Referrer-Policy":
      "same-origin",

    "X-Request-Id":
      requestId,
  };
}

function jsonResponse(
  payload:
    CreateCheckoutSessionResponse,

  status:
    number,

  requestId:
    string,
) {
  return NextResponse.json(
    payload,
    {
      status,

      headers:
        createResponseHeaders(
          requestId,
        ),
    },
  );
}

function errorResponse(
  code:
    CreateCheckoutSessionErrorCode,

  message:
    string,

  status:
    number,

  requestId:
    string,

  fieldErrors?:
    CampaignIntakeErrors,
) {
  const payload:
    CreateCheckoutSessionError = {
      ok:
        false,

      code,

      message,

      ...(fieldErrors &&
      Object.keys(
        fieldErrors,
      ).length > 0
        ? {
            fieldErrors,
          }
        : {}),
    };

  return jsonResponse(
    payload,
    status,
    requestId,
  );
}

/* --------------------------------------------------------------------- */
/* General Helpers                                                        */
/* --------------------------------------------------------------------- */

function normalizeMetadataValue(
  value: string,
  maximumLength = 500,
): string {
  return value
    .trim()
    .slice(
      0,
      maximumLength,
    );
}

function getExpandableId(
  value:
    | string
    | {
        id: string;
      }
    | null
    | undefined,
): string | undefined {
  if (
    typeof value ===
    "string"
  ) {
    return value;
  }

  if (
    value &&
    typeof value.id ===
      "string"
  ) {
    return value.id;
  }

  return undefined;
}

function getCheckoutExpirationDate(
  expiresAt:
    number | null | undefined,
): string | undefined {
  if (
    !expiresAt ||
    !Number.isFinite(
      expiresAt,
    )
  ) {
    return undefined;
  }

  return new Date(
    expiresAt * 1_000,
  ).toISOString();
}

/* --------------------------------------------------------------------- */
/* Request Origin Protection                                              */
/* --------------------------------------------------------------------- */

/**
 * Rejects obvious cross-site browser requests.
 *
 * Requests without an Origin header remain allowed so server-side testing
 * and supported non-browser clients can still call the route.
 */
function isAllowedRequestOrigin(
  request: Request,
): boolean {
  const fetchSite =
    request.headers.get(
      "sec-fetch-site",
    );

  if (
    fetchSite ===
    "cross-site"
  ) {
    return false;
  }

  const originHeader =
    request.headers.get(
      "origin",
    );

  if (!originHeader) {
    return true;
  }

  try {
    const requestOrigin =
      new URL(
        request.url,
      ).origin;

    const submittedOrigin =
      new URL(
        originHeader,
      ).origin;

    return (
      requestOrigin ===
      submittedOrigin
    );
  } catch {
    return false;
  }
}

/* --------------------------------------------------------------------- */
/* Canonical Request Hashing                                              */
/* --------------------------------------------------------------------- */

/**
 * Recursively sorts object keys before hashing.
 *
 * This keeps the same trusted checkout request stable even when object
 * properties arrive in a different order.
 */
function canonicalizeValue(
  value: unknown,
): unknown {
  if (
    Array.isArray(value)
  ) {
    return value.map(
      canonicalizeValue,
    );
  }

  if (
    typeof value ===
      "object" &&
    value !== null
  ) {
    const record =
      value as Record<
        string,
        unknown
      >;

    const entries =
      Object.entries(record)
        .filter(
          (
            [, entryValue],
          ) =>
            entryValue !==
            undefined,
        )
        .sort(
          (
            [leftKey],
            [rightKey],
          ) =>
            leftKey.localeCompare(
              rightKey,
            ),
        );

    return Object.fromEntries(
      entries.map(
        (
          [key, entryValue],
        ) => [
          key,
          canonicalizeValue(
            entryValue,
          ),
        ],
      ),
    );
  }

  return value;
}

function createSha256Hash(
  value: string,
): string {
  return createHash(
    "sha256",
  )
    .update(value)
    .digest("hex");
}

/**
 * Builds the trusted snapshot used for internal order identity.
 *
 * Browser-submitted names, prices, totals, and currencies from the cart
 * are intentionally excluded. Pricing comes from the trusted campaign
 * catalog.
 */
function createOrderIdentitySnapshot(
  validatedRequest:
    ValidatedCheckoutOrderRequest,

  catalog:
    StripeCheckoutCatalog,
) {
  const normalizedCampaignItems =
    [
      ...validatedRequest
        .intake
        .campaignItems,
    ].sort(
      (
        left,
        right,
      ) =>
        left.sku.localeCompare(
          right.sku,
        ),
    );

  const normalizedProducts =
    [
      ...catalog.products,
    ]
      .sort(
        (
          left,
          right,
        ) =>
          left.sku.localeCompare(
            right.sku,
          ),
      )
      .map(
        (product) => ({
          sku:
            product.sku,

          unitAmountCents:
            product.unitAmountCents,

          currency:
            product.currency,

          priceSource:
            product.priceSource,

          stripePriceId:
            product.stripePriceId ??
            null,
        }),
      );

  return {
    schemaVersion:
      ORDER_SCHEMA_VERSION,

    skus:
      normalizedProducts.map(
        (product) =>
          product.sku,
      ),

    intake: {
      ...validatedRequest.intake,

      campaignItems:
        normalizedCampaignItems,
    },

    pricing: {
      currency:
        catalog.currency,

      itemCount:
        catalog.itemCount,

      subtotalCents:
        catalog.subtotalCents,

      products:
        normalizedProducts,
    },

    redirects: {
      successPath:
        validatedRequest
          .successPath ??
        null,

      cancelPath:
        validatedRequest
          .cancelPath ??
        null,
    },
  };
}

/* --------------------------------------------------------------------- */
/* Order Identity                                                         */
/* --------------------------------------------------------------------- */

/**
 * Creates stable order and idempotency identifiers.
 *
 * requestHash:
 * A hash of the trusted normalized checkout data.
 *
 * instanceHash:
 * A hash of the request plus the current idempotency time window.
 */
function createOrderIdentity(
  validatedRequest:
    ValidatedCheckoutOrderRequest,

  catalog:
    StripeCheckoutCatalog,

  now:
    Date,
): OrderIdentityInput {
  const identitySnapshot =
    createOrderIdentitySnapshot(
      validatedRequest,
      catalog,
    );

  const canonicalSnapshot =
    canonicalizeValue(
      identitySnapshot,
    );

  const serializedSnapshot =
    JSON.stringify(
      canonicalSnapshot,
    );

  const requestHash =
    createSha256Hash(
      serializedSnapshot,
    );

  const timeBucket =
    Math.floor(
      now.getTime() /
        IDEMPOTENCY_WINDOW_MS,
    );

  const instanceHash =
    createSha256Hash(
      `${timeBucket}:${requestHash}`,
    );

  const datePart =
    now
      .toISOString()
      .slice(
        0,
        10,
      )
      .replaceAll(
        "-",
        "",
      );

  const orderId =
    `ord_${instanceHash.slice(
      0,
      28,
    )}`;

  const orderNumber =
    `MR-${datePart}-${instanceHash
      .slice(
        0,
        8,
      )
      .toUpperCase()}`;

  const idempotencyKey =
    createStripeIdempotencyKey(
      "checkout",
      `${timeBucket}-${instanceHash}`,
    );

  return {
    orderId,
    orderNumber,
    requestHash,
    idempotencyKey,
  };
}

/* --------------------------------------------------------------------- */
/* Stored Order State                                                     */
/* --------------------------------------------------------------------- */

function isCompletedPaymentState(
  paymentStatus: string,
): boolean {
  return (
    paymentStatus ===
      "paid" ||
    paymentStatus ===
      "refunded" ||
    paymentStatus ===
      "partially-refunded"
  );
}

/* --------------------------------------------------------------------- */
/* Stripe Product Error Mapping                                           */
/* --------------------------------------------------------------------- */

function mapStripeProductError(
  error:
    StripeProductConfigurationError,
): MappedStripeProductError {
  switch (error.code) {
    case "empty-cart":
      return {
        code:
          "empty-cart",

        status:
          400,

        message:
          error.message,
      };

    case "invalid-sku":
    case "campaign-not-found":
    case "duplicate-sku":
    case "too-many-items":
      return {
        code:
          "invalid-campaign",

        status:
          400,

        message:
          error.message,
      };

    case "campaign-unavailable":
      return {
        code:
          "campaign-unavailable",

        status:
          409,

        message:
          error.message,
      };

    case "invalid-price":
    case "invalid-currency":
    case "missing-price-id":
    case "invalid-price-id":
    case "stripe-price-inactive":
    case "stripe-product-inactive":
    case "stripe-product-deleted":
    case "stripe-price-recurring":
    case "stripe-price-currency-mismatch":
    case "stripe-price-amount-mismatch":
    case "stripe-price-sku-mismatch":
      return {
        code:
          "price-unavailable",

        status:
          503,

        message:
          "One or more campaign prices are temporarily unavailable. Please contact Money Records or try again shortly.",
      };

    default:
      return {
        code:
          "server-error",

        status:
          500,

        message:
          "The campaign catalog could not be prepared for checkout.",
      };
  }
}

/* --------------------------------------------------------------------- */
/* Order Store Error Mapping                                              */
/* --------------------------------------------------------------------- */

function mapOrderStoreError(
  error:
    OrderStoreError,
): MappedOrderStoreError {
  switch (error.code) {
    case "configuration-error":
      return {
        status:
          503,

        message:
          "Secure order storage is not configured correctly. Please contact Money Records support.",
      };

    case "order-conflict":
      return {
        status:
          409,

        message:
          "A conflicting campaign order already exists. Refresh the checkout page and try again.",
      };

    case "order-not-found":
      return {
        status:
          500,

        message:
          "The campaign order could not be found after checkout creation.",
      };

    case "order-create-failed":
    case "order-items-create-failed":
    case "order-intake-create-failed":
    case "order-event-create-failed":
    case "order-update-failed":
    case "order-query-failed":
    case "order-event-query-failed":
    case "order-delete-failed":
    case "order-cleanup-failed":
      return {
        status:
          503,

        message:
          "The campaign order could not be saved securely. No new checkout should be submitted until you try again.",
      };

    default:
      return {
        status:
          500,

        message:
          "The campaign order could not be prepared.",
      };
  }
}

/* --------------------------------------------------------------------- */
/* Stripe Checkout Parameters                                             */
/* --------------------------------------------------------------------- */

function createCheckoutSessionParams({
  validatedRequest,
  catalog,
  identity,
}: {
  validatedRequest:
    ValidatedCheckoutOrderRequest;

  catalog:
    StripeCheckoutCatalog;

  identity:
    OrderIdentityInput;
}): Stripe.Checkout.SessionCreateParams {
  const redirects =
    createStripeCheckoutRedirects(
      validatedRequest
        .successPath,

      validatedRequest
        .cancelPath,
    );

  const campaignSkuMetadata =
    normalizeMetadataValue(
      validatedRequest
        .skus
        .join(","),
    );

  const metadata =
    createStripeMetadata({
      order_id:
        identity.orderId,

      order_number:
        identity.orderNumber,

      request_hash:
        identity.requestHash.slice(
          0,
          32,
        ),

      schema_version:
        ORDER_SCHEMA_VERSION,

      order_status:
        "pending-payment",

      intake_status:
        "submitted",

      fulfillment_status:
        "awaiting-review",

      campaign_count:
        catalog.itemCount,

      campaign_skus:
        campaignSkuMetadata,

      subtotal_cents:
        catalog.subtotalCents,

      currency:
        catalog.currency,

      source:
        MONEY_RECORDS_SOURCE,
    });

  const description =
    `Money Records campaign order ${identity.orderNumber}`;

  return {
    mode:
      "payment",

    line_items:
      catalog.lineItems,

    success_url:
      redirects.successUrl,

    cancel_url:
      redirects.cancelUrl,

    client_reference_id:
      identity.orderId,

    customer_email:
      validatedRequest
        .customerEmail,

    customer_creation:
      "always",

    billing_address_collection:
      "auto",

    phone_number_collection: {
      enabled:
        true,
    },

    locale:
      "auto",

    submit_type:
      "pay",

    expires_at:
      Math.floor(
        Date.now() /
          1_000,
      ) +
      CHECKOUT_EXPIRATION_SECONDS,

    metadata,

    payment_intent_data: {
      description,

      receipt_email:
        validatedRequest
          .customerEmail,

      metadata,
    },

    custom_text: {
      submit: {
        message:
          "Campaign fulfillment begins after successful payment and review of the submitted release information.",
      },
    },
  };
}

/* --------------------------------------------------------------------- */
/* POST                                                                   */
/* --------------------------------------------------------------------- */

export async function POST(
  request: Request,
) {
  const requestId =
    randomUUID();

  let stage:
    CheckoutStage =
      "request";

  let activeIdentity:
    OrderIdentityInput | undefined;

  try {
    /* ----------------------------------------------------------------- */
    /* Content Type                                                      */
    /* ----------------------------------------------------------------- */

    const contentType =
      request.headers.get(
        "content-type",
      ) ?? "";

    if (
      !contentType
        .toLowerCase()
        .includes(
          "application/json",
        )
    ) {
      return errorResponse(
        "invalid-request",
        "The checkout endpoint accepts JSON requests only.",
        415,
        requestId,
      );
    }

    /* ----------------------------------------------------------------- */
    /* Same-Origin Protection                                            */
    /* ----------------------------------------------------------------- */

    if (
      !isAllowedRequestOrigin(
        request,
      )
    ) {
      return errorResponse(
        "invalid-request",
        "The checkout request origin is not allowed.",
        403,
        requestId,
      );
    }

    /* ----------------------------------------------------------------- */
    /* Content Length                                                    */
    /* ----------------------------------------------------------------- */

    const contentLengthHeader =
      request.headers.get(
        "content-length",
      );

    const contentLength =
      contentLengthHeader
        ? Number(
            contentLengthHeader,
          )
        : 0;

    if (
      Number.isFinite(
        contentLength,
      ) &&
      contentLength >
        MAX_CHECKOUT_BODY_BYTES
    ) {
      return errorResponse(
        "invalid-request",
        "The checkout request is too large.",
        413,
        requestId,
      );
    }

    /* ----------------------------------------------------------------- */
    /* Parse Request Body                                                */
    /* ----------------------------------------------------------------- */

    let payload: unknown;

    try {
      payload =
        await request.json();
    } catch {
      return errorResponse(
        "invalid-request",
        "The checkout request contains invalid JSON.",
        400,
        requestId,
      );
    }

    const serializedPayload =
      JSON.stringify(
        payload,
      );

    if (
      Buffer.byteLength(
        serializedPayload,
        "utf8",
      ) >
      MAX_CHECKOUT_BODY_BYTES
    ) {
      return errorResponse(
        "invalid-request",
        "The checkout request is too large.",
        413,
        requestId,
      );
    }

    /* ----------------------------------------------------------------- */
    /* Validate Cart and Campaign Intake                                 */
    /* ----------------------------------------------------------------- */

    stage =
      "validation";

    const validation =
      validateCheckoutOrderRequest(
        payload,
      );

    if (!validation.ok) {
      return errorResponse(
        validation.code,
        validation.message,
        validation.status,
        requestId,
        validation.fieldErrors,
      );
    }

    const validatedRequest =
      validation.data;

    /* ----------------------------------------------------------------- */
    /* Resolve Trusted Campaign Catalog                                  */
    /* ----------------------------------------------------------------- */

    stage =
      "catalog";

    const catalog =
      await createStripeCheckoutCatalog(
        validatedRequest.skus,
      );

    /* ----------------------------------------------------------------- */
    /* Validate Stripe Configuration Before Saving the Order             */
    /* ----------------------------------------------------------------- */

    const stripeEnvironment =
      getStripeEnvironment();

    const configuredLiveMode =
      stripeEnvironment ===
      "live";

    /* ----------------------------------------------------------------- */
    /* Create Stable Order Identity                                      */
    /* ----------------------------------------------------------------- */

    stage =
      "identity";

    const orderCreatedAt =
      new Date();

    const identity =
      createOrderIdentity(
        validatedRequest,
        catalog,
        orderCreatedAt,
      );

    activeIdentity =
      identity;

    /* ----------------------------------------------------------------- */
    /* Save Order, Items, and Full Campaign Intake                       */
    /* ----------------------------------------------------------------- */

    stage =
      "order-persistence";

    const pendingOrder =
      await createPendingOrder({
        identity,

        intake:
          validatedRequest
            .intake,

        catalog,

        livemode:
          configuredLiveMode,

        source:
          MONEY_RECORDS_SOURCE,

        createdAt:
          orderCreatedAt
            .toISOString(),
      });

    if (
      isCompletedPaymentState(
        pendingOrder
          .order
          .payment_status,
      )
    ) {
      return errorResponse(
        "invalid-request",
        "This campaign order has already been paid or refunded. Do not submit another payment for the same order.",
        409,
        requestId,
      );
    }

    /* ----------------------------------------------------------------- */
    /* Create Stripe Checkout Session                                    */
    /* ----------------------------------------------------------------- */

    stage =
      "stripe-session";

    const sessionParams =
      createCheckoutSessionParams({
        validatedRequest,
        catalog,
        identity,
      });

    const stripe =
      getStripe();

    const session =
      await stripe
        .checkout
        .sessions
        .create(
          sessionParams,
          {
            idempotencyKey:
              identity
                .idempotencyKey,
          },
        );

    /* ----------------------------------------------------------------- */
    /* Attach Stripe References to Stored Order                          */
    /* ----------------------------------------------------------------- */

    stage =
      "session-persistence";

    await attachStripeCheckoutSession({
      orderId:
        identity.orderId,

      orderNumber:
        identity.orderNumber,

      checkoutSessionId:
        session.id,

      paymentIntentId:
        getExpandableId(
          session.payment_intent,
        ),

      customerId:
        getExpandableId(
          session.customer,
        ),

      expiresAt:
        getCheckoutExpirationDate(
          session.expires_at,
        ),

      livemode:
        session.livemode,
    });

    /* ----------------------------------------------------------------- */
    /* Validate Hosted Stripe URL                                        */
    /* ----------------------------------------------------------------- */

    const checkoutUrl =
      getStripeCheckoutSessionUrl(
        session,
      );

    stage =
      "completed";

    console.info(
      "[Money Records Checkout] Checkout Session created",
      {
        requestId,

        orderId:
          identity.orderId,

        orderNumber:
          identity.orderNumber,

        checkoutSessionId:
          session.id,

        livemode:
          session.livemode,

        itemCount:
          catalog.itemCount,

        subtotalCents:
          catalog.subtotalCents,

        currency:
          catalog.currency,

        orderAlreadyExisted:
          pendingOrder
            .alreadyExisted,
      },
    );

    return jsonResponse(
      {
        ok:
          true,

        orderId:
          identity.orderId,

        orderNumber:
          identity.orderNumber,

        checkoutSessionId:
          session.id,

        checkoutUrl,
      },
      200,
      requestId,
    );
  } catch (error) {
    /* ----------------------------------------------------------------- */
    /* Checkout Catalog Errors                                           */
    /* ----------------------------------------------------------------- */

    if (
      error instanceof
      StripeProductConfigurationError
    ) {
      const mappedError =
        mapStripeProductError(
          error,
        );

      console.error(
        "[Money Records Checkout] Campaign catalog error",
        {
          requestId,
          stage,

          orderId:
            activeIdentity
              ?.orderId,

          orderNumber:
            activeIdentity
              ?.orderNumber,

          code:
            error.code,

          sku:
            error.sku,

          environmentName:
            error.environmentName,
        },
      );

      return errorResponse(
        mappedError.code,
        mappedError.message,
        mappedError.status,
        requestId,
      );
    }

    /* ----------------------------------------------------------------- */
    /* Order Database Errors                                             */
    /* ----------------------------------------------------------------- */

    if (
      error instanceof
      OrderStoreError
    ) {
      const mappedError =
        mapOrderStoreError(
          error,
        );

      console.error(
        "[Money Records Checkout] Order persistence error",
        {
          requestId,
          stage,

          orderId:
            error.orderId ??
            activeIdentity
              ?.orderId,

          orderNumber:
            error.orderNumber ??
            activeIdentity
              ?.orderNumber,

          code:
            error.code,

          databaseCode:
            error.databaseCode,
        },
      );

      return errorResponse(
        "server-error",
        mappedError.message,
        mappedError.status,
        requestId,
      );
    }

    /* ----------------------------------------------------------------- */
    /* Stripe Configuration Errors                                       */
    /* ----------------------------------------------------------------- */

    if (
      error instanceof
      StripeConfigurationError
    ) {
      console.error(
        "[Money Records Checkout] Stripe configuration error",
        {
          requestId,
          stage,

          orderId:
            activeIdentity
              ?.orderId,

          orderNumber:
            activeIdentity
              ?.orderNumber,

          message:
            error.message,
        },
      );

      return errorResponse(
        "server-error",
        "Secure checkout is not configured correctly. Please contact Money Records support.",
        503,
        requestId,
      );
    }

    /* ----------------------------------------------------------------- */
    /* Stripe, Network, and Unexpected Errors                            */
    /* ----------------------------------------------------------------- */

    const stripeError =
      getStripeErrorDetails(
        error,
      );

    const isLikelyStripeError =
      Boolean(
        stripeError.type ||
        stripeError.code ||
        stripeError.requestId ||
        stripeError.statusCode,
      );

    console.error(
      "[Money Records Checkout] Checkout creation failed",
      {
        requestId,
        stage,

        orderId:
          activeIdentity
            ?.orderId,

        orderNumber:
          activeIdentity
            ?.orderNumber,

        errorType:
          stripeError.type,

        errorCode:
          stripeError.code,

        declineCode:
          stripeError.declineCode,

        stripeRequestId:
          stripeError.requestId,

        statusCode:
          stripeError.statusCode,

        message:
          stripeError.message,
      },
    );

    if (
      isLikelyStripeError
    ) {
      return errorResponse(
        "stripe-error",
        getStripeErrorMessage(
          error,
        ),
        502,
        requestId,
      );
    }

    return errorResponse(
      "server-error",
      "Secure checkout could not be created. Please try again or contact Money Records support.",
      500,
      requestId,
    );
  }
}