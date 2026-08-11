import "server-only";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Stripe Webhook API                                   ┃
   ┃ File   : src/app/api/stripe/webhook/route.ts                         ┃
   ┃ Role   : Verify Stripe events and persist payment/order status       ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  randomUUID,
} from "node:crypto";

import type Stripe from "stripe";

import {
  NextResponse,
} from "next/server";

import {
  getOrderById,
  markOrderCheckoutExpired,
  markOrderPaid,
  markOrderPaymentFailed,
  markOrderPaymentProcessing,
  markOrderRefunded,
  OrderStoreError,
} from "@/lib/order-store";

import {
  constructStripeWebhookEvent,
  getStripe,
  getStripeEnvironment,
  getStripeErrorDetails,
  retrieveStripeCheckoutSession,
  StripeConfigurationError,
} from "@/lib/stripe";

import type {
  OrderRow,
} from "@/types/database";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                   */
/* --------------------------------------------------------------------- */

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

export const maxDuration =
  30;

/* --------------------------------------------------------------------- */
/* Configuration                                                         */
/* --------------------------------------------------------------------- */

/**
 * Protect the route from unexpectedly large webhook requests.
 */
const MAX_WEBHOOK_BODY_BYTES =
  1_000_000;

/**
 * Identifies Stripe resources created by the Money Records checkout route.
 */
const MONEY_RECORDS_SOURCE =
  "money-records-web";

/* --------------------------------------------------------------------- */
/* Types                                                                 */
/* --------------------------------------------------------------------- */

type WebhookProcessingStatus =
  | "processed"
  | "deferred"
  | "ignored";

type WebhookProcessingResult = {
  status:
    WebhookProcessingStatus;

  message:
    string;

  orderId?:
    string;

  orderNumber?:
    string;
};

type OrderReference = {
  orderId:
    string;

  orderNumber:
    string;
};

type StoredOrderReference =
  OrderReference & {
    order:
      OrderRow;
  };

type LinkedStripeResources = {
  checkoutSessionId?:
    string;

  paymentIntentId?:
    string;

  customerId?:
    string;
};

type CheckoutLineItemSnapshot = {
  id:
    string;

  description:
    string;

  quantity:
    number;

  amountTotalCents:
    number;

  currency:
    string;

  stripePriceId?:
    string;
};

/* --------------------------------------------------------------------- */
/* Response Helpers                                                      */
/* --------------------------------------------------------------------- */

function getResponseHeaders(
  requestId: string,
): HeadersInit {
  return {
    "Cache-Control":
      "no-store, no-cache, must-revalidate",

    "X-Content-Type-Options":
      "nosniff",

    "Referrer-Policy":
      "no-referrer",

    "X-Request-Id":
      requestId,
  };
}

function successResponse(
  requestId:
    string,

  event:
    Stripe.Event,

  result:
    WebhookProcessingResult,
) {
  return NextResponse.json(
    {
      received:
        true,

      eventId:
        event.id,

      eventType:
        event.type,

      status:
        result.status,

      message:
        result.message,
    },
    {
      status:
        200,

      headers:
        getResponseHeaders(
          requestId,
        ),
    },
  );
}

function errorResponse(
  requestId:
    string,

  message:
    string,

  status:
    number,
) {
  return NextResponse.json(
    {
      received:
        false,

      message,
    },
    {
      status,

      headers:
        getResponseHeaders(
          requestId,
        ),
    },
  );
}

/* --------------------------------------------------------------------- */
/* Metadata Helpers                                                      */
/* --------------------------------------------------------------------- */

function getMetadataValue(
  metadata:
    | Record<string, string>
    | null
    | undefined,

  key:
    string,
): string | undefined {
  const value =
    metadata?.[key]?.trim();

  return value ||
    undefined;
}

function getOrderReference(
  metadata:
    | Record<string, string>
    | null
    | undefined,
): OrderReference | null {
  const source =
    getMetadataValue(
      metadata,
      "source",
    );

  if (
    source !==
    MONEY_RECORDS_SOURCE
  ) {
    return null;
  }

  const orderId =
    getMetadataValue(
      metadata,
      "order_id",
    );

  const orderNumber =
    getMetadataValue(
      metadata,
      "order_number",
    );

  if (
    !orderId ||
    !orderNumber
  ) {
    return null;
  }

  return {
    orderId,
    orderNumber,
  };
}

function getMetadataInteger(
  metadata:
    | Record<string, string>
    | null
    | undefined,

  key:
    string,
): number | undefined {
  const value =
    getMetadataValue(
      metadata,
      key,
    );

  if (!value) {
    return undefined;
  }

  const numberValue =
    Number(value);

  if (
    !Number.isSafeInteger(
      numberValue,
    ) ||
    numberValue < 0
  ) {
    return undefined;
  }

  return numberValue;
}

function splitMetadataList(
  value:
    string | undefined,
): string[] {
  if (!value) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .split(",")
        .map(
          (item) =>
            item
              .trim()
              .toUpperCase(),
        )
        .filter(Boolean),
    ),
  );
}

/* --------------------------------------------------------------------- */
/* Stripe Object Helpers                                                 */
/* --------------------------------------------------------------------- */

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

function getEventCreatedAt(
  event:
    Stripe.Event,
): string {
  return new Date(
    event.created *
      1_000,
  ).toISOString();
}

function normalizeCurrency(
  currency:
    string | null | undefined,
): string | undefined {
  const normalized =
    currency
      ?.trim()
      .toUpperCase();

  if (
    !normalized ||
    !/^[A-Z]{3}$/.test(
      normalized,
    )
  ) {
    return undefined;
  }

  return normalized;
}

function getReceiptUrlFromPaymentIntent(
  paymentIntent:
    | string
    | Stripe.PaymentIntent
    | null,
): string | undefined {
  if (
    !paymentIntent ||
    typeof paymentIntent ===
      "string"
  ) {
    return undefined;
  }

  const latestCharge =
    paymentIntent.latest_charge;

  if (
    !latestCharge ||
    typeof latestCharge ===
      "string"
  ) {
    return undefined;
  }

  return latestCharge.receipt_url ??
    undefined;
}

/* --------------------------------------------------------------------- */
/* Event Mode Validation                                                 */
/* --------------------------------------------------------------------- */

function eventMatchesStripeMode(
  event:
    Stripe.Event,
): boolean {
  const environment =
    getStripeEnvironment();

  if (
    environment ===
    "live"
  ) {
    return event.livemode;
  }

  if (
    environment ===
    "test"
  ) {
    return !event.livemode;
  }

  return true;
}

/* --------------------------------------------------------------------- */
/* Order Conflict Helpers                                                */
/* --------------------------------------------------------------------- */

function createOrderConflictError(
  message:
    string,

  reference:
    OrderReference,
): OrderStoreError {
  return new OrderStoreError(
    "order-conflict",
    message,
    {
      orderId:
        reference.orderId,

      orderNumber:
        reference.orderNumber,
    },
  );
}

/**
 * Resolves Stripe metadata to an existing Money Records database order.
 *
 * Events without the Money Records source marker are ignored. Events that
 * claim to belong to Money Records but reference a missing or conflicting
 * order throw an error so Stripe can retry delivery.
 */
async function resolveStoredOrderReference(
  metadata:
    | Record<string, string>
    | null
    | undefined,

  event:
    Stripe.Event,

  linkedResources:
    LinkedStripeResources = {},
): Promise<StoredOrderReference | null> {
  const reference =
    getOrderReference(
      metadata,
    );

  if (!reference) {
    return null;
  }

  const order =
    await getOrderById(
      reference.orderId,
    );

  if (!order) {
    throw new OrderStoreError(
      "order-not-found",
      "The Money Records order referenced by Stripe could not be found.",
      {
        orderId:
          reference.orderId,

        orderNumber:
          reference.orderNumber,
      },
    );
  }

  if (
    order.order_number !==
    reference.orderNumber
  ) {
    throw createOrderConflictError(
      "The Stripe order number does not match the stored Money Records order.",
      reference,
    );
  }

  if (
    order.source !==
    MONEY_RECORDS_SOURCE
  ) {
    throw createOrderConflictError(
      "The stored order was not created by the Money Records storefront.",
      reference,
    );
  }

  if (
    order.livemode !==
    event.livemode
  ) {
    throw createOrderConflictError(
      "The Stripe event mode does not match the stored order mode.",
      reference,
    );
  }

  if (
    linkedResources
      .checkoutSessionId &&
    order
      .stripe_checkout_session_id &&
    order
      .stripe_checkout_session_id !==
      linkedResources
        .checkoutSessionId
  ) {
    throw createOrderConflictError(
      "The Stripe Checkout Session does not match the stored order.",
      reference,
    );
  }

  if (
    linkedResources
      .paymentIntentId &&
    order
      .stripe_payment_intent_id &&
    order
      .stripe_payment_intent_id !==
      linkedResources
        .paymentIntentId
  ) {
    throw createOrderConflictError(
      "The Stripe PaymentIntent does not match the stored order.",
      reference,
    );
  }

  if (
    linkedResources
      .customerId &&
    order
      .stripe_customer_id &&
    order
      .stripe_customer_id !==
      linkedResources
        .customerId
  ) {
    throw createOrderConflictError(
      "The Stripe customer does not match the stored order.",
      reference,
    );
  }

  return {
    ...reference,
    order,
  };
}

/* --------------------------------------------------------------------- */
/* Stored Order Validation                                               */
/* --------------------------------------------------------------------- */

function assertOrderAmountMatches(
  stored:
    StoredOrderReference,

  amountCents:
    number | null | undefined,

  currency:
    string | null | undefined,
): void {
  if (
    amountCents !==
      null &&
    amountCents !==
      undefined &&
    amountCents !==
      stored.order.total_cents
  ) {
    throw createOrderConflictError(
      "The Stripe payment amount does not match the stored Money Records order total.",
      stored,
    );
  }

  const normalizedCurrency =
    normalizeCurrency(
      currency,
    );

  if (
    normalizedCurrency &&
    normalizedCurrency !==
      stored
        .order
        .currency
        .toUpperCase()
  ) {
    throw createOrderConflictError(
      "The Stripe payment currency does not match the stored Money Records order.",
      stored,
    );
  }
}

function isRefundedPaymentStatus(
  paymentStatus:
    string,
): boolean {
  return (
    paymentStatus ===
      "refunded" ||
    paymentStatus ===
      "partially-refunded"
  );
}

function isProtectedFromFailure(
  paymentStatus:
    string,
): boolean {
  return (
    paymentStatus ===
      "paid" ||
    isRefundedPaymentStatus(
      paymentStatus,
    )
  );
}

function isFinalBeforeProcessing(
  paymentStatus:
    string,
): boolean {
  return (
    paymentStatus ===
      "paid" ||
    paymentStatus ===
      "failed" ||
    paymentStatus ===
      "cancelled" ||
    isRefundedPaymentStatus(
      paymentStatus,
    )
  );
}

function isProtectedFromExpiration(
  paymentStatus:
    string,
): boolean {
  return (
    paymentStatus ===
      "paid" ||
    paymentStatus ===
      "failed" ||
    isRefundedPaymentStatus(
      paymentStatus,
    )
  );
}

/* --------------------------------------------------------------------- */
/* Campaign Metadata                                                     */
/* --------------------------------------------------------------------- */

function getCampaignSkus(
  metadata:
    | Record<string, string>
    | null
    | undefined,
): string[] {
  return splitMetadataList(
    getMetadataValue(
      metadata,
      "campaign_skus",
    ),
  );
}

function getCampaignCount(
  metadata:
    | Record<string, string>
    | null
    | undefined,

  fallback:
    number,
): number {
  return (
    getMetadataInteger(
      metadata,
      "campaign_count",
    ) ??
    fallback
  );
}

/* --------------------------------------------------------------------- */
/* Checkout Line Items                                                   */
/* --------------------------------------------------------------------- */

function createLineItemSnapshots(
  session:
    Stripe.Checkout.Session,
): CheckoutLineItemSnapshot[] {
  const lineItems =
    session
      .line_items
      ?.data ??
    [];

  return lineItems.map(
    (lineItem) => ({
      id:
        lineItem.id,

      description:
        lineItem.description ||
        "Money Records Campaign",

      quantity:
        lineItem.quantity ??
        1,

      amountTotalCents:
        lineItem.amount_total,

      currency:
        lineItem.currency
          .toUpperCase(),

      stripePriceId:
        lineItem.price?.id,
    }),
  );
}

/* --------------------------------------------------------------------- */
/* Paid or Processing Checkout                                           */
/* --------------------------------------------------------------------- */

/**
 * Retrieves the authoritative Checkout Session and applies either a paid
 * or processing state to the stored Money Records order.
 */
async function processCompletedCheckoutSession(
  sessionId:
    string,

  event:
    Stripe.Event,
): Promise<WebhookProcessingResult> {
  const session =
    await retrieveStripeCheckoutSession(
      sessionId,
      [
        "line_items",
        "payment_intent",
        "payment_intent.latest_charge",
        "customer",
      ],
    );

  const paymentIntentId =
    getExpandableId(
      session.payment_intent,
    );

  const customerId =
    getExpandableId(
      session.customer,
    );

  const stored =
    await resolveStoredOrderReference(
      session.metadata,
      event,
      {
        checkoutSessionId:
          session.id,

        paymentIntentId,

        customerId,
      },
    );

  if (!stored) {
    return {
      status:
        "ignored",

      message:
        "The Checkout Session was not created by the Money Records storefront.",
    };
  }

  if (
    session
      .client_reference_id &&
    session
      .client_reference_id !==
      stored.orderId
  ) {
    throw createOrderConflictError(
      "The Stripe client reference does not match the stored order.",
      stored,
    );
  }

  if (
    session.mode !==
    "payment"
  ) {
    return {
      status:
        "ignored",

      message:
        "The Checkout Session is not a one-time campaign payment.",

      orderId:
        stored.orderId,

      orderNumber:
        stored.orderNumber,
    };
  }

  assertOrderAmountMatches(
    stored,
    session.amount_total,
    session.currency,
  );

  const campaignSkus =
    getCampaignSkus(
      session.metadata,
    );

  const lineItems =
    createLineItemSnapshots(
      session,
    );

  const campaignCount =
    getCampaignCount(
      session.metadata,
      lineItems.reduce(
        (
          total,
          lineItem,
        ) =>
          total +
          lineItem.quantity,
        0,
      ),
    );

  const amountTotalCents =
    session.amount_total ??
    stored.order.total_cents;

  const currency =
    normalizeCurrency(
      session.currency,
    ) ??
    stored.order.currency;

  const eventCreatedAt =
    getEventCreatedAt(
      event,
    );

  const paymentCompleted =
    session.payment_status ===
      "paid" ||
    session.payment_status ===
      "no_payment_required";

  if (paymentCompleted) {
    /**
     * A late payment event must never roll a refunded order back to paid.
     */
    if (
      isRefundedPaymentStatus(
        stored
          .order
          .payment_status,
      )
    ) {
      return {
        status:
          "ignored",

        message:
          "The payment event was ignored because the order has already been refunded.",

        orderId:
          stored.orderId,

        orderNumber:
          stored.orderNumber,
      };
    }

    await markOrderPaid({
      orderId:
        stored.orderId,

      orderNumber:
        stored.orderNumber,

      providerEventId:
        event.id,

      providerEventType:
        event.type,

      checkoutSessionId:
        session.id,

      paymentIntentId,

      customerId,

      amountTotalCents,

      currency,

      campaignCount,

      campaignSkus,

      receiptUrl:
        getReceiptUrlFromPaymentIntent(
          session.payment_intent,
        ),

      livemode:
        event.livemode,

      paidAt:
        eventCreatedAt,
    });

    console.info(
      "[Money Records Stripe Webhook] Paid checkout processed",
      {
        eventId:
          event.id,

        eventType:
          event.type,

        orderId:
          stored.orderId,

        orderNumber:
          stored.orderNumber,

        checkoutSessionId:
          session.id,

        paymentIntentId,

        amountTotalCents,

        currency,

        campaignCount,

        lineItems,
      },
    );

    return {
      status:
        "processed",

      message:
        "The paid Money Records Checkout Session was saved.",

      orderId:
        stored.orderId,

      orderNumber:
        stored.orderNumber,
    };
  }

  /**
   * checkout.session.completed can arrive before a delayed payment method
   * has finished processing.
   */
  if (
    isFinalBeforeProcessing(
      stored
        .order
        .payment_status,
    )
  ) {
    return {
      status:
        "ignored",

      message:
        "The processing event was ignored because the order already has a final payment state.",

      orderId:
        stored.orderId,

      orderNumber:
        stored.orderNumber,
    };
  }

  await markOrderPaymentProcessing({
    orderId:
      stored.orderId,

    orderNumber:
      stored.orderNumber,

    providerEventId:
      event.id,

    providerEventType:
      event.type,

    checkoutSessionId:
      session.id,

    paymentIntentId,

    customerId,

    amountTotalCents,

    currency,

    campaignCount,

    campaignSkus,

    livemode:
      event.livemode,

    occurredAt:
      eventCreatedAt,
  });

  return {
    status:
      "deferred",

    message:
      "The Checkout Session completed, but payment is still processing.",

    orderId:
      stored.orderId,

    orderNumber:
      stored.orderNumber,
  };
}

/* --------------------------------------------------------------------- */
/* Checkout Asynchronous Payment Failure                                 */
/* --------------------------------------------------------------------- */

async function processCheckoutPaymentFailure(
  session:
    Stripe.Checkout.Session,

  event:
    Stripe.Event,
): Promise<WebhookProcessingResult> {
  const paymentIntentId =
    getExpandableId(
      session.payment_intent,
    );

  const customerId =
    getExpandableId(
      session.customer,
    );

  const stored =
    await resolveStoredOrderReference(
      session.metadata,
      event,
      {
        checkoutSessionId:
          session.id,

        paymentIntentId,

        customerId,
      },
    );

  if (!stored) {
    return {
      status:
        "ignored",

      message:
        "The failed Checkout Session was not created by Money Records.",
    };
  }

  if (
    isProtectedFromFailure(
      stored
        .order
        .payment_status,
    )
  ) {
    return {
      status:
        "ignored",

      message:
        "The failed payment event was ignored because the order is already paid or refunded.",

      orderId:
        stored.orderId,

      orderNumber:
        stored.orderNumber,
    };
  }

  assertOrderAmountMatches(
    stored,
    session.amount_total,
    session.currency,
  );

  await markOrderPaymentFailed({
    orderId:
      stored.orderId,

    orderNumber:
      stored.orderNumber,

    providerEventId:
      event.id,

    providerEventType:
      event.type,

    checkoutSessionId:
      session.id,

    paymentIntentId,

    customerId,

    amountTotalCents:
      session.amount_total ??
      stored.order.total_cents,

    currency:
      normalizeCurrency(
        session.currency,
      ) ??
      stored.order.currency,

    campaignCount:
      getCampaignCount(
        session.metadata,
        stored.order.item_count,
      ),

    campaignSkus:
      getCampaignSkus(
        session.metadata,
      ),

    message:
      "The delayed campaign payment could not be completed. Please retry checkout or use another payment method.",

    livemode:
      event.livemode,

    occurredAt:
      getEventCreatedAt(
        event,
      ),
  });

  return {
    status:
      "processed",

    message:
      "The failed Checkout payment was saved.",

    orderId:
      stored.orderId,

    orderNumber:
      stored.orderNumber,
  };
}

/* --------------------------------------------------------------------- */
/* Checkout Expiration                                                   */
/* --------------------------------------------------------------------- */

async function processExpiredCheckout(
  session:
    Stripe.Checkout.Session,

  event:
    Stripe.Event,
): Promise<WebhookProcessingResult> {
  const paymentIntentId =
    getExpandableId(
      session.payment_intent,
    );

  const customerId =
    getExpandableId(
      session.customer,
    );

  const stored =
    await resolveStoredOrderReference(
      session.metadata,
      event,
      {
        checkoutSessionId:
          session.id,

        paymentIntentId,

        customerId,
      },
    );

  if (!stored) {
    return {
      status:
        "ignored",

      message:
        "The expired Checkout Session was not created by Money Records.",
    };
  }

  if (
    isProtectedFromExpiration(
      stored
        .order
        .payment_status,
    )
  ) {
    return {
      status:
        "ignored",

      message:
        "The expiration event was ignored because the order already has a completed payment result.",

      orderId:
        stored.orderId,

      orderNumber:
        stored.orderNumber,
    };
  }

  assertOrderAmountMatches(
    stored,
    session.amount_total,
    session.currency,
  );

  await markOrderCheckoutExpired({
    orderId:
      stored.orderId,

    orderNumber:
      stored.orderNumber,

    providerEventId:
      event.id,

    providerEventType:
      event.type,

    checkoutSessionId:
      session.id,

    paymentIntentId,

    customerId,

    amountTotalCents:
      session.amount_total ??
      stored.order.total_cents,

    currency:
      normalizeCurrency(
        session.currency,
      ) ??
      stored.order.currency,

    campaignCount:
      getCampaignCount(
        session.metadata,
        stored.order.item_count,
      ),

    campaignSkus:
      getCampaignSkus(
        session.metadata,
      ),

    livemode:
      event.livemode,

    expiredAt:
      getEventCreatedAt(
        event,
      ),
  });

  return {
    status:
      "processed",

    message:
      "The expired Checkout Session was saved.",

    orderId:
      stored.orderId,

    orderNumber:
      stored.orderNumber,
  };
}

/* --------------------------------------------------------------------- */
/* PaymentIntent Failure                                                 */
/* --------------------------------------------------------------------- */

async function processPaymentIntentFailure(
  paymentIntent:
    Stripe.PaymentIntent,

  event:
    Stripe.Event,
): Promise<WebhookProcessingResult> {
  const customerId =
    getExpandableId(
      paymentIntent.customer,
    );

  const stored =
    await resolveStoredOrderReference(
      paymentIntent.metadata,
      event,
      {
        paymentIntentId:
          paymentIntent.id,

        customerId,
      },
    );

  if (!stored) {
    return {
      status:
        "ignored",

      message:
        "The failed PaymentIntent was not created by Money Records.",
    };
  }

  if (
    isProtectedFromFailure(
      stored
        .order
        .payment_status,
    )
  ) {
    return {
      status:
        "ignored",

      message:
        "The PaymentIntent failure was ignored because the order is already paid or refunded.",

      orderId:
        stored.orderId,

      orderNumber:
        stored.orderNumber,
    };
  }

  assertOrderAmountMatches(
    stored,
    paymentIntent.amount,
    paymentIntent.currency,
  );

  const failureCode =
    paymentIntent
      .last_payment_error
      ?.code;

  console.warn(
    "[Money Records Stripe Webhook] PaymentIntent failed",
    {
      eventId:
        event.id,

      orderId:
        stored.orderId,

      orderNumber:
        stored.orderNumber,

      paymentIntentId:
        paymentIntent.id,

      failureCode,
    },
  );

  await markOrderPaymentFailed({
    orderId:
      stored.orderId,

    orderNumber:
      stored.orderNumber,

    providerEventId:
      event.id,

    providerEventType:
      event.type,

    checkoutSessionId:
      stored
        .order
        .stripe_checkout_session_id ??
      undefined,

    paymentIntentId:
      paymentIntent.id,

    customerId,

    amountTotalCents:
      paymentIntent.amount,

    currency:
      paymentIntent.currency
        .toUpperCase(),

    campaignCount:
      getCampaignCount(
        paymentIntent.metadata,
        stored.order.item_count,
      ),

    campaignSkus:
      getCampaignSkus(
        paymentIntent.metadata,
      ),

    message:
      "The campaign payment could not be completed. Please retry checkout or use another payment method.",

    livemode:
      event.livemode,

    occurredAt:
      getEventCreatedAt(
        event,
      ),
  });

  return {
    status:
      "processed",

    message:
      "The failed PaymentIntent was saved.",

    orderId:
      stored.orderId,

    orderNumber:
      stored.orderNumber,
  };
}

/* --------------------------------------------------------------------- */
/* Refund Processing                                                     */
/* --------------------------------------------------------------------- */

async function getChargePaymentIntent(
  charge:
    Stripe.Charge,
): Promise<Stripe.PaymentIntent | null> {
  const paymentIntent =
    charge.payment_intent;

  if (!paymentIntent) {
    return null;
  }

  if (
    typeof paymentIntent !==
    "string"
  ) {
    return paymentIntent;
  }

  return getStripe()
    .paymentIntents
    .retrieve(
      paymentIntent,
    );
}

async function processRefundedCharge(
  charge:
    Stripe.Charge,

  event:
    Stripe.Event,
): Promise<WebhookProcessingResult> {
  const paymentIntent =
    await getChargePaymentIntent(
      charge,
    );

  const metadata =
    paymentIntent?.metadata ??
    charge.metadata;

  const paymentIntentId =
    paymentIntent?.id ??
    getExpandableId(
      charge.payment_intent,
    );

  const customerId =
    getExpandableId(
      charge.customer,
    );

  const stored =
    await resolveStoredOrderReference(
      metadata,
      event,
      {
        paymentIntentId,

        customerId,
      },
    );

  if (!stored) {
    return {
      status:
        "ignored",

      message:
        "The refunded charge was not connected to a Money Records order.",
    };
  }

  assertOrderAmountMatches(
    stored,
    charge.amount,
    charge.currency,
  );

  const fullyRefunded =
    charge.amount_refunded >=
    charge.amount;

  await markOrderRefunded({
    orderId:
      stored.orderId,

    orderNumber:
      stored.orderNumber,

    providerEventId:
      event.id,

    providerEventType:
      event.type,

    paymentIntentId,

    customerId,

    amountTotalCents:
      charge.amount,

    refundedAmountCents:
      charge.amount_refunded,

    currency:
      charge.currency
        .toUpperCase(),

    campaignCount:
      getCampaignCount(
        metadata,
        stored.order.item_count,
      ),

    campaignSkus:
      getCampaignSkus(
        metadata,
      ),

    fullyRefunded,

    livemode:
      event.livemode,

    refundedAt:
      getEventCreatedAt(
        event,
      ),
  });

  return {
    status:
      "processed",

    message:
      fullyRefunded
        ? "The full order refund was saved."
        : "The partial order refund was saved.",

    orderId:
      stored.orderId,

    orderNumber:
      stored.orderNumber,
  };
}

/* --------------------------------------------------------------------- */
/* Stripe Event Dispatcher                                               */
/* --------------------------------------------------------------------- */

async function processStripeEvent(
  event:
    Stripe.Event,
): Promise<WebhookProcessingResult> {
  switch (event.type) {
    case "checkout.session.completed": {
      const session =
        event
          .data
          .object as
          Stripe.Checkout.Session;

      return processCompletedCheckoutSession(
        session.id,
        event,
      );
    }

    case "checkout.session.async_payment_succeeded": {
      const session =
        event
          .data
          .object as
          Stripe.Checkout.Session;

      return processCompletedCheckoutSession(
        session.id,
        event,
      );
    }

    case "checkout.session.async_payment_failed": {
      const session =
        event
          .data
          .object as
          Stripe.Checkout.Session;

      return processCheckoutPaymentFailure(
        session,
        event,
      );
    }

    case "checkout.session.expired": {
      const session =
        event
          .data
          .object as
          Stripe.Checkout.Session;

      return processExpiredCheckout(
        session,
        event,
      );
    }

    case "payment_intent.payment_failed": {
      const paymentIntent =
        event
          .data
          .object as
          Stripe.PaymentIntent;

      return processPaymentIntentFailure(
        paymentIntent,
        event,
      );
    }

    case "charge.refunded": {
      const charge =
        event
          .data
          .object as
          Stripe.Charge;

      return processRefundedCharge(
        charge,
        event,
      );
    }

    default:
      return {
        status:
          "ignored",

        message:
          `Stripe event ${event.type} does not require Money Records order processing.`,
      };
  }
}

/* --------------------------------------------------------------------- */
/* Processing Error Handler                                              */
/* --------------------------------------------------------------------- */

function handleProcessingError(
  error:
    unknown,

  requestId:
    string,

  event:
    Stripe.Event,
) {
  if (
    error instanceof
    OrderStoreError
  ) {
    console.error(
      "[Money Records Stripe Webhook] Order storage failed",
      {
        requestId,

        eventId:
          event.id,

        eventType:
          event.type,

        orderId:
          error.orderId,

        orderNumber:
          error.orderNumber,

        code:
          error.code,

        databaseCode:
          error.databaseCode,

        message:
          error.message,
      },
    );

    return errorResponse(
      requestId,
      error.code ===
        "configuration-error"
        ? "The Money Records order database is not configured correctly."
        : "The Stripe event could not be saved to the Money Records order database.",
      error.code ===
        "configuration-error"
        ? 503
        : 500,
    );
  }

  if (
    error instanceof
    StripeConfigurationError
  ) {
    console.error(
      "[Money Records Stripe Webhook] Stripe configuration failed",
      {
        requestId,

        eventId:
          event.id,

        eventType:
          event.type,

        message:
          error.message,
      },
    );

    return errorResponse(
      requestId,
      "The Stripe webhook is not configured correctly.",
      503,
    );
  }

  const details =
    getStripeErrorDetails(
      error,
    );

  console.error(
    "[Money Records Stripe Webhook] Event processing failed",
    {
      requestId,

      eventId:
        event.id,

      eventType:
        event.type,

      errorType:
        details.type,

      errorCode:
        details.code,

      stripeRequestId:
        details.requestId,

      statusCode:
        details.statusCode,

      message:
        details.message,
    },
  );

  /**
   * A server error tells Stripe that event processing did not finish and
   * allows the platform to retry delivery.
   */
  return errorResponse(
    requestId,
    "The Stripe event could not be processed.",
    500,
  );
}

/* --------------------------------------------------------------------- */
/* POST                                                                  */
/* --------------------------------------------------------------------- */

export async function POST(
  request:
    Request,
) {
  const requestId =
    randomUUID();

  /* ------------------------------------------------------------------- */
  /* Content Type                                                        */
  /* ------------------------------------------------------------------- */

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
      requestId,
      "The Stripe webhook endpoint accepts JSON requests only.",
      415,
    );
  }

  /* ------------------------------------------------------------------- */
  /* Declared Request Size                                               */
  /* ------------------------------------------------------------------- */

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
      MAX_WEBHOOK_BODY_BYTES
  ) {
    return errorResponse(
      requestId,
      "The Stripe webhook request is too large.",
      413,
    );
  }

  /* ------------------------------------------------------------------- */
  /* Stripe Signature                                                    */
  /* ------------------------------------------------------------------- */

  const signature =
    request.headers.get(
      "stripe-signature",
    );

  if (!signature) {
    return errorResponse(
      requestId,
      "The Stripe-Signature header is missing.",
      400,
    );
  }

  /* ------------------------------------------------------------------- */
  /* Exact Raw Request Body                                              */
  /* ------------------------------------------------------------------- */

  let rawBody:
    Buffer;

  try {
    const rawArrayBuffer =
      await request.arrayBuffer();

    rawBody =
      Buffer.from(
        rawArrayBuffer,
      );
  } catch {
    return errorResponse(
      requestId,
      "The Stripe webhook body could not be read.",
      400,
    );
  }

  if (
    rawBody.byteLength ===
    0
  ) {
    return errorResponse(
      requestId,
      "The Stripe webhook body is empty.",
      400,
    );
  }

  if (
    rawBody.byteLength >
    MAX_WEBHOOK_BODY_BYTES
  ) {
    return errorResponse(
      requestId,
      "The Stripe webhook request is too large.",
      413,
    );
  }

  /* ------------------------------------------------------------------- */
  /* Signature Verification                                              */
  /* ------------------------------------------------------------------- */

  let event:
    Stripe.Event;

  try {
    event =
      constructStripeWebhookEvent(
        rawBody,
        signature,
      );
  } catch (error) {
    if (
      error instanceof
      StripeConfigurationError
    ) {
      console.error(
        "[Money Records Stripe Webhook] Configuration error",
        {
          requestId,

          message:
            error.message,
        },
      );

      return errorResponse(
        requestId,
        "The Stripe webhook is not configured correctly.",
        503,
      );
    }

    console.warn(
      "[Money Records Stripe Webhook] Signature verification failed",
      {
        requestId,

        message:
          error instanceof Error
            ? error.message
            : "Unknown signature error",
      },
    );

    return errorResponse(
      requestId,
      "Stripe webhook signature verification failed.",
      400,
    );
  }

  /* ------------------------------------------------------------------- */
  /* Test and Live Mode Validation                                       */
  /* ------------------------------------------------------------------- */

  try {
    if (
      !eventMatchesStripeMode(
        event,
      )
    ) {
      console.warn(
        "[Money Records Stripe Webhook] Stripe mode mismatch",
        {
          requestId,

          eventId:
            event.id,

          eventType:
            event.type,

          eventLiveMode:
            event.livemode,
        },
      );

      return errorResponse(
        requestId,
        "The Stripe event mode does not match the configured Stripe account mode.",
        400,
      );
    }
  } catch (error) {
    if (
      error instanceof
      StripeConfigurationError
    ) {
      return errorResponse(
        requestId,
        "The Stripe webhook is not configured correctly.",
        503,
      );
    }

    throw error;
  }

  /* ------------------------------------------------------------------- */
  /* Event Processing                                                    */
  /* ------------------------------------------------------------------- */

  try {
    const result =
      await processStripeEvent(
        event,
      );

    console.info(
      "[Money Records Stripe Webhook] Event handled",
      {
        requestId,

        eventId:
          event.id,

        eventType:
          event.type,

        resultStatus:
          result.status,

        orderId:
          result.orderId,

        orderNumber:
          result.orderNumber,
      },
    );

    return successResponse(
      requestId,
      event,
      result,
    );
  } catch (error) {
    return handleProcessingError(
      error,
      requestId,
      event,
    );
  }
}