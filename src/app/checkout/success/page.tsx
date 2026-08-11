import "server-only";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Checkout Success Page                               ┃
   ┃ File   : src/app/checkout/success/page.tsx                          ┃
   ┃ Role   : Verify Stripe payment and persisted campaign order         ┃
   ┃ Status : Production Ready                                           ┃
   ┃ License: Proprietary — Money Records LLC                            ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import type Stripe from "stripe";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";

import { CART_STORAGE_KEY } from "@/lib/cart";

import {
  getPublicOrderByCheckoutSessionId,
  OrderStoreError,
} from "@/lib/order-store";

import {
  getStripeErrorDetails,
  retrieveStripeCheckoutSession,
} from "@/lib/stripe";

import type {
  DatabaseFulfillmentStatus,
  DatabaseIntakeStatus,
  DatabaseOrderStatus,
  DatabasePaymentStatus,
  OrderItemRow,
  PublicOrderRecord,
} from "@/types/database";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                   */
/* --------------------------------------------------------------------- */

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

export const revalidate =
  0;

/* --------------------------------------------------------------------- */
/* Metadata                                                              */
/* --------------------------------------------------------------------- */

export const metadata: Metadata = {
  title:
    "Payment Confirmed",

  description:
    "Your Money Records campaign order has been received and confirmed.",

  robots: {
    index:
      false,

    follow:
      false,

    nocache:
      true,
  },
};

/* --------------------------------------------------------------------- */
/* Types                                                                 */
/* --------------------------------------------------------------------- */

type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    session_id?:
      | string
      | string[];
  }>;
};

type OrderReference = {
  orderId:
    string;

  orderNumber:
    string;
};

type DisplayOrderItem = {
  id:
    string;

  name:
    string;

  shortName:
    string;

  platformName?:
    string;

  targetLabel?:
    string;

  quantity:
    number;

  amountTotalCents:
    number;

  currency:
    string;

  priceId?:
    string;
};

type SuccessMetricProps = {
  icon:
    ReactNode;

  label:
    string;

  value:
    string;

  description:
    string;
};

type StoredOrderVerificationResult =
  | {
      ok: true;
      order: PublicOrderRecord;
    }
  | {
      ok: false;
      title: string;
      description: string;
    };

/* --------------------------------------------------------------------- */
/* Constants                                                             */
/* --------------------------------------------------------------------- */

const MONEY_RECORDS_SOURCE =
  "money-records-web";

const SUPPORT_EMAIL =
  "info@moneyrecords.io";

/* --------------------------------------------------------------------- */
/* Icons                                                                 */
/* --------------------------------------------------------------------- */

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
    >
      <path
        d="M5 12H19M14 7L19 12L14 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <path
        d="M5.5 12.5L9.5 16.5L18.5 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmallCheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
    >
      <path
        d="M6 12.5L10 16.5L18 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M12 7.5V12L15.5 14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <rect
        x="3.5"
        y="6"
        width="17"
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M3.5 10H20.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M7 14.5H10.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M12 3.5L19 6.2V11.4C19 15.6 16.4 18.8 12 20.5C7.6 18.8 5 15.6 5 11.4V6.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M8.8 12L11 14.2L15.5 9.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M6 4.5H15L18 7.5V19.5H6V4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M15 4.5V8H18M9 11H15M9 14.5H15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M5 8L12 13L19 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="23"
      height="23"
      fill="none"
    >
      <path
        d="M12 4L21 20H3L12 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M12 9V14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <circle
        cx="12"
        cy="17.2"
        r="0.9"
        fill="currentColor"
      />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/* Stripe Metadata Helpers                                               */
/* --------------------------------------------------------------------- */

function getMetadataValue(
  metadata:
    | Stripe.Metadata
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
  session:
    Stripe.Checkout.Session,
): OrderReference | null {
  const source =
    getMetadataValue(
      session.metadata,
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
      session.metadata,
      "order_id",
    );

  const orderNumber =
    getMetadataValue(
      session.metadata,
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

/* --------------------------------------------------------------------- */
/* Session Helpers                                                       */
/* --------------------------------------------------------------------- */

function getSessionId(
  value:
    | string
    | string[]
    | undefined,
): string | null {
  const sessionId =
    Array.isArray(value)
      ? value[0]
      : value;

  const normalizedSessionId =
    sessionId?.trim();

  if (
    !normalizedSessionId ||
    !/^cs_(test_|live_)?[A-Za-z0-9_]+$/.test(
      normalizedSessionId,
    )
  ) {
    return null;
  }

  return normalizedSessionId;
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

function getPaymentIntentReceiptUrl(
  value:
    | string
    | Stripe.PaymentIntent
    | null,
): string | undefined {
  if (
    !value ||
    typeof value ===
      "string"
  ) {
    return undefined;
  }

  const latestCharge =
    value.latest_charge;

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
/* Formatting Helpers                                                    */
/* --------------------------------------------------------------------- */

function normalizeCurrency(
  currency:
    string | null | undefined,
): string {
  const normalized =
    currency
      ?.trim()
      .toUpperCase();

  return normalized &&
    /^[A-Z]{3}$/.test(
      normalized,
    )
    ? normalized
    : "USD";
}

function formatCurrency(
  amountCents:
    | number
    | null
    | undefined,

  currency:
    | string
    | null
    | undefined,
): string {
  const safeAmount =
    typeof amountCents ===
      "number" &&
    Number.isFinite(
      amountCents,
    )
      ? Math.max(
          0,
          amountCents,
        )
      : 0;

  const safeCurrency =
    normalizeCurrency(
      currency,
    );

  try {
    return new Intl.NumberFormat(
      "en-US",
      {
        style:
          "currency",

        currency:
          safeCurrency,

        minimumFractionDigits:
          safeAmount % 100 === 0
            ? 0
            : 2,

        maximumFractionDigits:
          2,
      },
    ).format(
      safeAmount /
        100,
    );
  } catch {
    return `$${(
      safeAmount /
      100
    ).toFixed(2)}`;
  }
}

function formatUnixDate(
  unixTimestamp:
    number,
): string {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      month:
        "long",

      day:
        "numeric",

      year:
        "numeric",

      hour:
        "numeric",

      minute:
        "2-digit",
    },
  ).format(
    new Date(
      unixTimestamp *
        1_000,
    ),
  );
}

function formatIsoDate(
  value:
    string | null,
): string {
  if (!value) {
    return "Pending";
  }

  const timestamp =
    Date.parse(value);

  if (
    Number.isNaN(
      timestamp,
    )
  ) {
    return "Pending";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month:
        "long",

      day:
        "numeric",

      year:
        "numeric",

      hour:
        "numeric",

      minute:
        "2-digit",
    },
  ).format(
    new Date(
      timestamp,
    ),
  );
}

/* --------------------------------------------------------------------- */
/* Status Helpers                                                        */
/* --------------------------------------------------------------------- */

function isStripePaymentComplete(
  session:
    Stripe.Checkout.Session,
): boolean {
  return (
    session.payment_status ===
      "paid" ||
    session.payment_status ===
      "no_payment_required"
  );
}

function isStoredPaymentConfirmed(
  status:
    DatabasePaymentStatus,
): boolean {
  return (
    status ===
    "paid"
  );
}

function isStoredOrderSyncing(
  status:
    DatabasePaymentStatus,
): boolean {
  return (
    status ===
      "unpaid" ||
    status ===
      "pending" ||
    status ===
      "processing"
  );
}

function isStoredOrderRefunded(
  status:
    DatabasePaymentStatus,
): boolean {
  return (
    status ===
      "refunded" ||
    status ===
      "partially-refunded"
  );
}

function getStripePaymentStatusLabel(
  paymentStatus:
    Stripe.Checkout.Session.PaymentStatus,
): string {
  switch (paymentStatus) {
    case "paid":
      return "Payment Confirmed";

    case "no_payment_required":
      return "Order Confirmed";

    case "unpaid":
    default:
      return "Payment Pending";
  }
}

function getCheckoutStatusLabel(
  status:
    | Stripe.Checkout.Session.Status
    | null,
): string {
  switch (status) {
    case "complete":
      return "Checkout Complete";

    case "expired":
      return "Checkout Expired";

    case "open":
      return "Checkout Open";

    default:
      return "Status Pending";
  }
}

function getDatabasePaymentStatusLabel(
  status:
    DatabasePaymentStatus,
): string {
  switch (status) {
    case "unpaid":
      return "Unpaid";

    case "pending":
      return "Payment Pending";

    case "processing":
      return "Payment Processing";

    case "paid":
      return "Payment Confirmed";

    case "failed":
      return "Payment Failed";

    case "cancelled":
      return "Payment Cancelled";

    case "refunded":
      return "Fully Refunded";

    case "partially-refunded":
      return "Partially Refunded";

    default:
      return "Status Pending";
  }
}

function getOrderStatusLabel(
  status:
    DatabaseOrderStatus,
): string {
  switch (status) {
    case "draft":
      return "Draft";

    case "pending-payment":
      return "Pending Payment";

    case "paid":
      return "Payment Received";

    case "under-review":
      return "Under Review";

    case "intake-required":
      return "Intake Required";

    case "approved":
      return "Approved";

    case "in-progress":
      return "Campaign in Progress";

    case "completed":
      return "Completed";

    case "cancelled":
      return "Cancelled";

    case "refunded":
      return "Refunded";

    case "partially-refunded":
      return "Partially Refunded";

    case "failed":
      return "Failed";

    default:
      return "Status Pending";
  }
}

function getIntakeStatusLabel(
  status:
    DatabaseIntakeStatus,
): string {
  switch (status) {
    case "not-started":
      return "Not Started";

    case "incomplete":
      return "Incomplete";

    case "submitted":
      return "Intake Submitted";

    case "under-review":
      return "Intake Under Review";

    case "changes-requested":
      return "Changes Requested";

    case "approved":
      return "Intake Approved";

    default:
      return "Status Pending";
  }
}

function getFulfillmentStatusLabel(
  status:
    DatabaseFulfillmentStatus,
): string {
  switch (status) {
    case "not-started":
      return "Not Started";

    case "awaiting-intake":
      return "Awaiting Intake";

    case "awaiting-review":
      return "Awaiting Review";

    case "scheduled":
      return "Campaign Scheduled";

    case "in-progress":
      return "Campaign in Progress";

    case "paused":
      return "Campaign Paused";

    case "completed":
      return "Campaign Completed";

    case "cancelled":
      return "Campaign Cancelled";

    default:
      return "Status Pending";
  }
}

function getNextStatusLabel(
  order:
    PublicOrderRecord,
): string {
  if (
    isStoredOrderSyncing(
      order.payment_status,
    )
  ) {
    return "Order Syncing";
  }

  switch (
    order.intake_status
  ) {
    case "submitted":
      return "Intake Review";

    case "under-review":
      return "Under Review";

    case "changes-requested":
      return "Changes Required";

    case "approved":
      return getFulfillmentStatusLabel(
        order.fulfillment_status,
      );

    default:
      return getFulfillmentStatusLabel(
        order.fulfillment_status,
      );
  }
}

/* --------------------------------------------------------------------- */
/* Order Item Helpers                                                    */
/* --------------------------------------------------------------------- */

function createStoredOrderItems(
  items:
    OrderItemRow[],
): DisplayOrderItem[] {
  return items.map(
    (item) => ({
      id:
        item.id,

      name:
        item.campaign_name,

      shortName:
        item.campaign_short_name,

      platformName:
        item.platform_name,

      targetLabel:
        item.campaign_target_label,

      quantity:
        item.quantity,

      amountTotalCents:
        item.total_amount_cents,

      currency:
        item.currency,

      priceId:
        item.stripe_price_id ??
        undefined,
    }),
  );
}

function createStripeOrderItems(
  session:
    Stripe.Checkout.Session,
): DisplayOrderItem[] {
  return (
    session.line_items
      ?.data ??
    []
  ).map(
    (lineItem) => ({
      id:
        lineItem.id,

      name:
        lineItem.description ||
        "Money Records Campaign",

      shortName:
        lineItem.description ||
        "Campaign Service",

      quantity:
        lineItem.quantity ??
        1,

      amountTotalCents:
        lineItem.amount_total,

      currency:
        lineItem.currency
          .toUpperCase(),

      priceId:
        lineItem.price?.id,
    }),
  );
}

function getDisplayOrderItems(
  order:
    PublicOrderRecord,

  session:
    Stripe.Checkout.Session,
): DisplayOrderItem[] {
  if (
    order.order_items.length >
    0
  ) {
    return createStoredOrderItems(
      order.order_items,
    );
  }

  return createStripeOrderItems(
    session,
  );
}

/* --------------------------------------------------------------------- */
/* Persisted Order Verification                                          */
/* --------------------------------------------------------------------- */

function verifyStoredOrder({
  session,
  orderReference,
  order,
}: {
  session:
    Stripe.Checkout.Session;

  orderReference:
    OrderReference;

  order:
    PublicOrderRecord;
}): StoredOrderVerificationResult {
  if (
    order.id !==
    orderReference.orderId
  ) {
    return {
      ok:
        false,

      title:
        "Order Identifier Mismatch",

      description:
        "The stored Money Records order does not match the order identifier returned by Stripe.",
    };
  }

  if (
    order.order_number !==
    orderReference.orderNumber
  ) {
    return {
      ok:
        false,

      title:
        "Order Number Mismatch",

      description:
        "The stored order number does not match the Stripe Checkout Session.",
    };
  }

  if (
    order.source !==
    MONEY_RECORDS_SOURCE
  ) {
    return {
      ok:
        false,

      title:
        "Unsupported Order Source",

      description:
        "This order was not created by the Money Records campaign storefront.",
    };
  }

  if (
    order.stripe_checkout_session_id !==
    session.id
  ) {
    return {
      ok:
        false,

      title:
        "Checkout Session Mismatch",

      description:
        "The Stripe Checkout Session does not match the session stored with this campaign order.",
    };
  }

  if (
    session.client_reference_id &&
    session.client_reference_id !==
      order.id
  ) {
    return {
      ok:
        false,

      title:
        "Checkout Reference Mismatch",

      description:
        "The Stripe client reference does not match the stored Money Records order.",
    };
  }

  if (
    session.livemode !==
    order.livemode
  ) {
    return {
      ok:
        false,

      title:
        "Payment Mode Mismatch",

      description:
        "The Stripe payment mode does not match the stored Money Records order mode.",
    };
  }

  if (
    session.amount_total !==
      null &&
    session.amount_total !==
      order.total_cents
  ) {
    return {
      ok:
        false,

      title:
        "Order Total Mismatch",

      description:
        "The amount confirmed by Stripe does not match the stored Money Records order total.",
    };
  }

  if (
    session.amount_subtotal !==
      null &&
    session.amount_subtotal !==
      order.subtotal_cents
  ) {
    return {
      ok:
        false,

      title:
        "Order Subtotal Mismatch",

      description:
        "The Stripe subtotal does not match the stored campaign-order subtotal.",
    };
  }

  const stripeCurrency =
    normalizeCurrency(
      session.currency,
    );

  const storedCurrency =
    normalizeCurrency(
      order.currency,
    );

  if (
    stripeCurrency !==
    storedCurrency
  ) {
    return {
      ok:
        false,

      title:
        "Order Currency Mismatch",

      description:
        "The Stripe payment currency does not match the stored Money Records order currency.",
    };
  }

  const stripePaymentIntentId =
    getExpandableId(
      session.payment_intent,
    );

  if (
    stripePaymentIntentId &&
    order.stripe_payment_intent_id &&
    stripePaymentIntentId !==
      order.stripe_payment_intent_id
  ) {
    return {
      ok:
        false,

      title:
        "Payment Reference Mismatch",

      description:
        "The Stripe PaymentIntent does not match the payment reference stored with this order.",
    };
  }

  const stripeCustomerId =
    getExpandableId(
      session.customer,
    );

  if (
    stripeCustomerId &&
    order.stripe_customer_id &&
    stripeCustomerId !==
      order.stripe_customer_id
  ) {
    return {
      ok:
        false,

      title:
        "Customer Reference Mismatch",

      description:
        "The Stripe customer reference does not match the customer stored with this order.",
    };
  }

  const stripeItemCount =
    (
      session.line_items
        ?.data ??
      []
    ).reduce(
      (
        total,
        lineItem,
      ) =>
        total +
        (
          lineItem.quantity ??
          1
        ),
      0,
    );

  if (
    stripeItemCount > 0 &&
    stripeItemCount !==
      order.item_count
  ) {
    return {
      ok:
        false,

      title:
        "Campaign Item Mismatch",

      description:
        "The number of campaign services returned by Stripe does not match the stored Money Records order.",
    };
  }

  return {
    ok:
      true,

    order,
  };
}

/* --------------------------------------------------------------------- */
/* Clear Completed Cart                                                  */
/* --------------------------------------------------------------------- */

function ClearCompletedCartScript() {
  return (
    <Script
      id="clear-money-records-cart-after-payment"
      strategy="afterInteractive"
    >
      {`
        try {
          var cartKey = ${JSON.stringify(
            CART_STORAGE_KEY,
          )};

          window.localStorage.removeItem(
            cartKey
          );

          try {
            window.dispatchEvent(
              new StorageEvent(
                "storage",
                {
                  key: cartKey,
                  oldValue: null,
                  newValue: null,
                  storageArea:
                    window.localStorage,
                  url:
                    window.location.href
                }
              )
            );
          } catch (
            storageEventError
          ) {
            window.dispatchEvent(
              new Event(
                "storage"
              )
            );
          }
        } catch (
          cartCleanupError
        ) {
          // Cart cleanup must never block order confirmation.
        }
      `}
    </Script>
  );
}

/* --------------------------------------------------------------------- */
/* Success Metric                                                        */
/* --------------------------------------------------------------------- */

function SuccessMetric({
  icon,
  label,
  value,
  description,
}: SuccessMetricProps) {
  return (
    <Card
      as="article"
      padding="md"
      hover
      fullHeight
      className="group"
    >
      <div className="flex h-full items-start gap-4">
        <span className="grid h-11 w-11 flex-[0_0_44px] place-items-center rounded-xl border border-emerald-300/20 bg-emerald-300/[0.055] text-emerald-300">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
            {label}
          </p>

          <p className="mt-2 break-words text-lg font-black leading-6 tracking-[-0.03em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-emerald-200">
            {value}
          </p>

          <p className="mt-2 text-xs leading-5 text-white/42">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Order Detail Row                                                      */
/* --------------------------------------------------------------------- */

function OrderDetailRow({
  label,
  value,
  accent = false,
}: {
  label:
    string;

  value:
    ReactNode;

  accent?:
    boolean;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-white/[0.055] py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/35">
        {label}
      </span>

      <span
        className={
          accent
            ? "break-all text-sm font-black text-emerald-300 sm:max-w-[65%] sm:text-right"
            : "break-all text-sm font-black text-[var(--mr-text)] sm:max-w-[65%] sm:text-right"
        }
      >
        {value}
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Invalid or Unverified State                                           */
/* --------------------------------------------------------------------- */

function InvalidSessionState({
  title,
  description,
  errorReference,
  clearCompletedCart = false,
}: {
  title:
    string;

  description:
    string;

  errorReference?:
    string;

  clearCompletedCart?:
    boolean;
}) {
  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      {clearCompletedCart ? (
        <ClearCompletedCartScript />
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 -z-10 h-[700px] w-[1100px] max-w-[120vw] -translate-x-1/2 rounded-full bg-red-400/[0.045] blur-[170px]"
      />

      <Container size="wide">
        <main className="flex min-h-[78vh] items-center justify-center py-16">
          <Card
            as="section"
            variant="featured"
            padding="lg"
            topLine
            className="relative w-full max-w-3xl overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-red-400/[0.065] blur-[110px]"
            />

            <div className="relative mx-auto max-w-xl py-8 text-center">
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-[24px] border border-red-300/20 bg-red-300/[0.055] text-red-200">
                <AlertIcon />
              </span>

              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-red-200/80">
                Checkout Verification
              </p>

              <h1 className="mt-3 text-balance text-3xl font-black leading-[1.04] tracking-[-0.045em] text-[var(--mr-text)] sm:text-4xl">
                {title}
              </h1>

              <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/48 sm:text-base">
                {description}
              </p>

              {errorReference ? (
                <p className="mt-4 text-[10px] uppercase tracking-[0.12em] text-white/25">
                  Reference:{" "}
                  {errorReference}
                </p>
              ) : null}

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  href={`mailto:${SUPPORT_EMAIL}`}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Contact Campaign Support
                </Button>

                <Button
                  href="/"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Return to Money Records
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </Container>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Pending Payment State                                                 */
/* --------------------------------------------------------------------- */

function PendingPaymentState({
  session,
  order,
}: {
  session:
    Stripe.Checkout.Session;

  order:
    PublicOrderRecord;
}) {
  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 -z-10 h-[720px] w-[1140px] max-w-[120vw] -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.055)] blur-[175px]"
      />

      <Container size="wide">
        <main className="flex min-h-[78vh] items-center justify-center py-16">
          <Card
            as="section"
            variant="featured"
            padding="lg"
            topLine
            className="relative w-full max-w-3xl overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.09)] blur-[110px]"
            />

            <div className="relative mx-auto max-w-xl py-8 text-center">
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-[24px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                <ClockIcon />
              </span>

              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Payment Processing
              </p>

              <h1 className="mt-3 text-balance text-3xl font-black leading-[1.04] tracking-[-0.045em] text-[var(--mr-text)] sm:text-4xl">
                Your Payment Is Still Processing.
              </h1>

              <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/48 sm:text-base">
                Your order has been saved, but Stripe has not marked the
                payment as complete. A confirmation will be sent to{" "}
                <strong className="font-black text-[var(--mr-text)]">
                  {order.customer_email}
                </strong>{" "}
                after payment succeeds.
              </p>

              <div className="mt-7 rounded-2xl border border-white/[0.075] bg-white/[0.025] p-5 text-left">
                <OrderDetailRow
                  label="Order Number"
                  value={
                    order.order_number
                  }
                  accent
                />

                <OrderDetailRow
                  label="Stripe Status"
                  value={getStripePaymentStatusLabel(
                    session.payment_status,
                  )}
                />

                <OrderDetailRow
                  label="Stored Status"
                  value={getDatabasePaymentStatusLabel(
                    order.payment_status,
                  )}
                />

                <OrderDetailRow
                  label="Total"
                  value={formatCurrency(
                    order.total_cents,
                    order.currency,
                  )}
                />
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  href="/"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Return Home
                </Button>

                <Button
                  href={`mailto:${SUPPORT_EMAIL}`}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </Container>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Refunded or Adjusted Order State                                      */
/* --------------------------------------------------------------------- */

function AdjustedOrderState({
  order,
}: {
  order:
    PublicOrderRecord;
}) {
  const fullyRefunded =
    order.payment_status ===
    "refunded";

  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      <ClearCompletedCartScript />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 -z-10 h-[720px] w-[1140px] max-w-[120vw] -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.055)] blur-[175px]"
      />

      <Container size="wide">
        <main className="flex min-h-[78vh] items-center justify-center py-16">
          <Card
            as="section"
            variant="featured"
            padding="lg"
            topLine
            className="relative w-full max-w-3xl overflow-hidden"
          >
            <div className="relative mx-auto max-w-xl py-8 text-center">
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-[24px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                <PaymentIcon />
              </span>

              <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Order Payment Updated
              </p>

              <h1 className="mt-3 text-balance text-3xl font-black leading-[1.04] tracking-[-0.045em] text-[var(--mr-text)] sm:text-4xl">
                {fullyRefunded
                  ? "This Order Was Refunded."
                  : "A Partial Refund Was Applied."}
              </h1>

              <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/48 sm:text-base">
                The payment status for campaign order{" "}
                <strong className="font-black text-[var(--mr-text)]">
                  {order.order_number}
                </strong>{" "}
                has changed since the original checkout confirmation.
              </p>

              <div className="mt-7 rounded-2xl border border-white/[0.075] bg-white/[0.025] p-5 text-left">
                <OrderDetailRow
                  label="Order Number"
                  value={
                    order.order_number
                  }
                  accent
                />

                <OrderDetailRow
                  label="Payment Status"
                  value={getDatabasePaymentStatusLabel(
                    order.payment_status,
                  )}
                />

                <OrderDetailRow
                  label="Order Status"
                  value={getOrderStatusLabel(
                    order.status,
                  )}
                />

                <OrderDetailRow
                  label="Original Total"
                  value={formatCurrency(
                    order.total_cents,
                    order.currency,
                  )}
                />
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  href={`mailto:${SUPPORT_EMAIL}`}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Contact Campaign Support
                </Button>

                <Button
                  href="/"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Return Home
                </Button>
              </div>
            </div>
          </Card>
        </main>
      </Container>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Checkout Success Page                                                 */
/* --------------------------------------------------------------------- */

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const resolvedSearchParams =
    await searchParams;

  const sessionId =
    getSessionId(
      resolvedSearchParams
        .session_id,
    );

  if (!sessionId) {
    return (
      <InvalidSessionState
        title="Checkout Session Missing"
        description="This confirmation page requires a valid Stripe Checkout Session. Return to your cart and restart secure checkout."
      />
    );
  }

  /* ------------------------------------------------------------------- */
  /* Retrieve Authoritative Stripe Session                               */
  /* ------------------------------------------------------------------- */

  let session:
    Stripe.Checkout.Session;

  try {
    session =
      await retrieveStripeCheckoutSession(
        sessionId,
        [
          "line_items",
          "payment_intent",
          "payment_intent.latest_charge",
          "customer",
        ],
      );
  } catch (error) {
    const details =
      getStripeErrorDetails(
        error,
      );

    console.error(
      "[Money Records Checkout Success] Stripe session retrieval failed",
      {
        sessionId,

        errorType:
          details.type,

        errorCode:
          details.code,

        stripeRequestId:
          details.requestId,

        statusCode:
          details.statusCode,
      },
    );

    return (
      <InvalidSessionState
        title="Order Could Not Be Verified"
        description="The Stripe Checkout Session could not be verified. Your payment may still have completed, so do not submit another payment until you confirm the charge or contact Money Records."
        errorReference={
          details.requestId
        }
      />
    );
  }

  const orderReference =
    getOrderReference(
      session,
    );

  if (!orderReference) {
    return (
      <InvalidSessionState
        title="Order Reference Not Found"
        description="The verified Stripe Checkout Session was not connected to a valid Money Records campaign order."
        clearCompletedCart={isStripePaymentComplete(
          session,
        )}
      />
    );
  }

  if (
    session.mode !==
    "payment"
  ) {
    return (
      <InvalidSessionState
        title="Unsupported Checkout Type"
        description="This confirmation page only supports Money Records one-time campaign payments."
      />
    );
  }

  /* ------------------------------------------------------------------- */
  /* Retrieve Persisted Money Records Order                              */
  /* ------------------------------------------------------------------- */

  let storedOrder:
    PublicOrderRecord | null;

  try {
    storedOrder =
      await getPublicOrderByCheckoutSessionId(
        session.id,
      );
  } catch (error) {
    if (
      error instanceof
      OrderStoreError
    ) {
      console.error(
        "[Money Records Checkout Success] Stored order retrieval failed",
        {
          sessionId:
            session.id,

          orderId:
            orderReference.orderId,

          orderNumber:
            orderReference.orderNumber,

          code:
            error.code,

          databaseCode:
            error.databaseCode,

          message:
            error.message,
        },
      );

      return (
        <InvalidSessionState
          title="Payment Received — Order Sync Issue"
          description="Stripe returned this checkout successfully, but the stored campaign order could not be loaded. Do not submit another payment. Contact Money Records with the order number shown by Stripe."
          errorReference={
            orderReference.orderNumber
          }
          clearCompletedCart={isStripePaymentComplete(
            session,
          )}
        />
      );
    }

    throw error;
  }

  if (!storedOrder) {
    return (
      <InvalidSessionState
        title="Stored Campaign Order Not Found"
        description="The Stripe Checkout Session was verified, but the matching Money Records campaign order could not be found. Do not submit another payment. Contact support with the order number below."
        errorReference={
          orderReference.orderNumber
        }
        clearCompletedCart={isStripePaymentComplete(
          session,
        )}
      />
    );
  }

  /* ------------------------------------------------------------------- */
  /* Cross-Check Stripe and Supabase                                     */
  /* ------------------------------------------------------------------- */

  const orderVerification =
    verifyStoredOrder({
      session,

      orderReference,

      order:
        storedOrder,
    });

  if (
    !orderVerification.ok
  ) {
    console.error(
      "[Money Records Checkout Success] Order verification conflict",
      {
        sessionId:
          session.id,

        orderId:
          orderReference.orderId,

        orderNumber:
          orderReference.orderNumber,

        title:
          orderVerification.title,

        description:
          orderVerification.description,
      },
    );

    return (
      <InvalidSessionState
        title={
          orderVerification.title
        }
        description={`${orderVerification.description} Do not submit another payment. Contact Money Records support for review.`}
        errorReference={
          orderReference.orderNumber
        }
        clearCompletedCart={isStripePaymentComplete(
          session,
        )}
      />
    );
  }

  const order =
    orderVerification.order;

  /* ------------------------------------------------------------------- */
  /* Pending Stripe Payment                                              */
  /* ------------------------------------------------------------------- */

  if (
    !isStripePaymentComplete(
      session,
    )
  ) {
    return (
      <PendingPaymentState
        session={
          session
        }
        order={
          order
        }
      />
    );
  }

  /* ------------------------------------------------------------------- */
  /* Refunded Order                                                       */
  /* ------------------------------------------------------------------- */

  if (
    isStoredOrderRefunded(
      order.payment_status,
    )
  ) {
    return (
      <AdjustedOrderState
        order={
          order
        }
      />
    );
  }

  /* ------------------------------------------------------------------- */
  /* Invalid Stored Final State                                          */
  /* ------------------------------------------------------------------- */

  if (
    order.payment_status ===
      "failed" ||
    order.payment_status ===
      "cancelled"
  ) {
    return (
      <InvalidSessionState
        title="Order Status Requires Review"
        description="Stripe shows a completed payment, but the stored Money Records order has a conflicting payment status. Do not submit another payment. Contact campaign support for review."
        errorReference={
          order.order_number
        }
        clearCompletedCart
      />
    );
  }

  /* ------------------------------------------------------------------- */
  /* Confirmed Order Data                                                */
  /* ------------------------------------------------------------------- */

  const orderItems =
    getDisplayOrderItems(
      order,
      session,
    );

  const customerName =
    `${order.customer_first_name} ${order.customer_last_name}`.trim() ||
    session.customer_details
      ?.name ||
    "Money Records Client";

  const customerEmail =
    order.customer_email ||
    session.customer_details
      ?.email ||
    session.customer_email ||
    "Email unavailable";

  const paymentIntentId =
    order.stripe_payment_intent_id ??
    getExpandableId(
      session.payment_intent,
    );

  const customerId =
    order.stripe_customer_id ??
    getExpandableId(
      session.customer,
    );

  const receiptUrl =
    order.receipt_url ??
    getPaymentIntentReceiptUrl(
      session.payment_intent,
    );

  const campaignCount =
    order.item_count ||
    orderItems.reduce(
      (
        total,
        item,
      ) =>
        total +
        item.quantity,
      0,
    );

  const totalLabel =
    formatCurrency(
      order.total_cents,
      order.currency,
    );

  const subtotalLabel =
    formatCurrency(
      order.subtotal_cents,
      order.currency,
    );

  const checkoutDate =
    formatUnixDate(
      session.created,
    );

  const paidDate =
    formatIsoDate(
      order.paid_at,
    );

  const isOrderSyncing =
    isStoredOrderSyncing(
      order.payment_status,
    );

  const paymentStatusLabel =
    isStoredPaymentConfirmed(
      order.payment_status,
    )
      ? getDatabasePaymentStatusLabel(
          order.payment_status,
        )
      : getStripePaymentStatusLabel(
          session.payment_status,
        );

  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      <ClearCompletedCartScript />

      {/* Page atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[850px] w-[1240px] max-w-[122vw] -translate-x-1/2 rounded-full bg-emerald-300/[0.045] blur-[190px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-20 [background-image:radial-gradient(rgba(110,231,183,0.1)_0.7px,transparent_0.7px)] [background-size:26px_26px]"
      />

      <Container size="wide">
        <main className="py-10 md:py-14">
          {/* ----------------------------------------------------------- */}
          {/* Confirmation Hero                                           */}
          {/* ----------------------------------------------------------- */}

          <header className="relative overflow-hidden rounded-[32px] border border-emerald-300/20 bg-[linear-gradient(145deg,rgba(17,22,20,0.97),rgba(7,8,8,0.99))] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.56)] sm:p-8 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full bg-emerald-300/[0.11] blur-[145px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-44 -left-36 h-[420px] w-[420px] rounded-full bg-[rgba(227,179,77,0.045)] blur-[130px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(110,231,183,0.78),transparent)]"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
              <div className="max-w-4xl">
                <div className="flex items-center gap-4">
                  <span className="grid h-16 w-16 flex-[0_0_64px] place-items-center rounded-[20px] border border-emerald-300/25 bg-emerald-300/[0.07] text-emerald-300 shadow-[0_18px_55px_rgba(0,0,0,0.38)]">
                    <CheckIcon />
                  </span>

                  <div>
                    <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
                      Payment Confirmed
                    </p>

                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.13em] text-white/30">
                      Verified Money Records Campaign Order
                    </p>
                  </div>
                </div>

                <h1 className="mt-8 text-balance text-4xl font-black leading-[0.98] tracking-[-0.055em] text-[var(--mr-text)] sm:text-5xl lg:text-6xl">
                  Your Campaign Order{" "}
                  <span className="text-emerald-300">
                    Is Confirmed.
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-8 text-white/52 sm:text-lg">
                  Thank you,{" "}
                  <strong className="font-black text-[var(--mr-text)]">
                    {customerName}
                  </strong>
                  . Stripe confirmed your payment and the campaign order was
                  matched to the secure Money Records order database.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-2">
                  <span className="mr-badge mr-badge-success">
                    Payment Received
                  </span>

                  <span className="mr-badge mr-badge-dark">
                    {getIntakeStatusLabel(
                      order.intake_status,
                    )}
                  </span>

                  <span className="mr-badge mr-badge-dark">
                    {isOrderSyncing
                      ? "Order Syncing"
                      : getFulfillmentStatusLabel(
                          order.fulfillment_status,
                        )}
                  </span>
                </div>

                {isOrderSyncing ? (
                  <div className="mt-6 flex max-w-3xl items-start gap-3 rounded-2xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.045)] p-4">
                    <span className="mt-0.5 text-[var(--mr-gold-200)]">
                      <ClockIcon />
                    </span>

                    <p className="m-0 text-xs leading-6 text-white/46">
                      Stripe has confirmed your payment. The database payment
                      status is still synchronizing through the secure webhook
                      and should update automatically.
                    </p>
                  </div>
                ) : null}
              </div>

              <Card
                as="aside"
                padding="lg"
                className="border-emerald-300/15 bg-black/25"
              >
                <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-emerald-300">
                  Verified Order
                </p>

                <p className="mt-3 break-all text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
                  {order.order_number}
                </p>

                <Divider
                  className="my-6"
                  variant="soft"
                />

                <div className="grid gap-4">
                  <OrderDetailRow
                    label="Payment"
                    value={
                      paymentStatusLabel
                    }
                    accent
                  />

                  <OrderDetailRow
                    label="Campaign Services"
                    value={
                      campaignCount
                    }
                  />

                  <OrderDetailRow
                    label="Order Total"
                    value={
                      totalLabel
                    }
                  />

                  <OrderDetailRow
                    label="Confirmation Email"
                    value={
                      customerEmail
                    }
                  />
                </div>
              </Card>
            </div>
          </header>

          {/* ----------------------------------------------------------- */}
          {/* Confirmation Metrics                                        */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-label="Order confirmation overview"
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <SuccessMetric
              icon={
                <PaymentIcon />
              }
              label="Payment Status"
              value={
                paymentStatusLabel
              }
              description="Stripe confirmed this one-time campaign payment."
            />

            <SuccessMetric
              icon={
                <DocumentIcon />
              }
              label="Order Number"
              value={
                order.order_number
              }
              description="Keep this number for campaign support and order questions."
            />

            <SuccessMetric
              icon={
                <EmailIcon />
              }
              label="Confirmation"
              value={
                customerEmail
              }
              description="Campaign communication and updates will use this email."
            />

            <SuccessMetric
              icon={
                <ShieldIcon />
              }
              label="Next Status"
              value={getNextStatusLabel(
                order,
              )}
              description="Money Records will review your submitted campaign information."
            />
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Order Content                                                */}
          {/* ----------------------------------------------------------- */}

          <div className="grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start md:py-16">
            {/* Selected campaign services */}

            <section
              aria-labelledby="confirmed-services-heading"
              className="min-w-0"
            >
              <div>
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-300">
                  Confirmed Services
                </p>

                <h2
                  id="confirmed-services-heading"
                  className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl"
                >
                  Your Campaign Order
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/46">
                  These one-time campaign services were verified against your
                  stored Money Records order.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="mr-badge mr-badge-dark">
                    Artist:{" "}
                    {order.artist_name}
                  </span>

                  <span className="mr-badge mr-badge-dark">
                    Release:{" "}
                    {order.release_title}
                  </span>
                </div>
              </div>

              <div className="mt-7 grid gap-4">
                {orderItems.length > 0 ? (
                  orderItems.map(
                    (
                      item,
                      index,
                    ) => (
                      <Card
                        key={
                          item.id
                        }
                        as="article"
                        padding="lg"
                        className="relative overflow-hidden"
                      >
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-300/[0.045] blur-[85px]"
                        />

                        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex min-w-0 items-start gap-4">
                            <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.055] text-xs font-black text-emerald-300">
                              {String(
                                index +
                                  1,
                              ).padStart(
                                2,
                                "0",
                              )}
                            </span>

                            <div className="min-w-0">
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/20 bg-emerald-300/[0.045] px-3 py-1 text-[8px] font-black uppercase tracking-[0.13em] text-emerald-300">
                                <SmallCheckIcon />
                                Confirmed
                              </span>

                              <h3 className="mt-3 text-lg font-black leading-6 tracking-[-0.03em] text-[var(--mr-text)]">
                                {item.name}
                              </h3>

                              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/32">
                                {item.platformName ? (
                                  <span>
                                    {
                                      item.platformName
                                    }
                                  </span>
                                ) : null}

                                <span>
                                  Quantity{" "}
                                  {
                                    item.quantity
                                  }
                                </span>

                                {item.targetLabel ? (
                                  <span>
                                    {
                                      item.targetLabel
                                    }
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-white/[0.06] pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 sm:text-right">
                            <p className="m-0 text-[9px] font-black uppercase tracking-[0.14em] text-white/35">
                              Service Total
                            </p>

                            <p className="mt-2 text-2xl font-black tracking-[-0.045em] text-[var(--mr-text)]">
                              {formatCurrency(
                                item.amountTotalCents,
                                item.currency,
                              )}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ),
                  )
                ) : (
                  <Card padding="lg">
                    <p className="text-sm leading-7 text-white/48">
                      The order payment and total were verified, but detailed
                      campaign items are still being synchronized.
                    </p>
                  </Card>
                )}
              </div>

              {/* Next steps */}

              <Card
                as="section"
                variant="featured"
                padding="lg"
                topLine
                className="relative mt-6 overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-emerald-300/[0.055] blur-[100px]"
                />

                <div className="relative">
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-300">
                    What Happens Next
                  </p>

                  <h2 className="mt-3 text-xl font-black tracking-[-0.03em] text-[var(--mr-text)] sm:text-2xl">
                    Campaign Intake Review
                  </h2>

                  <p className="mt-3 max-w-3xl text-sm leading-7 text-white/48">
                    Your artist, release, campaign, and creative information
                    will be reviewed before campaign fulfillment begins.
                  </p>

                  <div className="mt-7 grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        number:
                          "01",

                        title:
                          "Payment Confirmed",

                        description:
                          "Stripe verified your secure campaign payment.",
                      },
                      {
                        number:
                          "02",

                        title:
                          "Intake Review",

                        description:
                          "Money Records reviews your links, assets, goals, and campaign direction.",
                      },
                      {
                        number:
                          "03",

                        title:
                          "Campaign Activation",

                        description:
                          "Approved campaigns move into preparation, scheduling, and fulfillment.",
                      },
                    ].map(
                      (
                        step,
                      ) => (
                        <div
                          key={
                            step.number
                          }
                          className="rounded-2xl border border-white/[0.065] bg-white/[0.025] p-5"
                        >
                          <span className="grid h-8 w-8 place-items-center rounded-full border border-emerald-300/20 bg-emerald-300/[0.055] text-[9px] font-black text-emerald-300">
                            {
                              step.number
                            }
                          </span>

                          <h3 className="mt-4 text-sm font-black text-[var(--mr-text)]">
                            {
                              step.title
                            }
                          </h3>

                          <p className="mt-2 text-xs leading-5 text-white/42">
                            {
                              step.description
                            }
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </Card>
            </section>

            {/* Order summary */}

            <aside className="lg:sticky lg:top-28">
              <Card
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
                aria-labelledby="confirmed-order-summary-heading"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-emerald-300/[0.075] blur-[100px]"
                />

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.055] text-emerald-300">
                      <CheckIcon />
                    </span>

                    <div>
                      <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-emerald-300">
                        Verified Payment
                      </p>

                      <h2
                        id="confirmed-order-summary-heading"
                        className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]"
                      >
                        Order Summary
                      </h2>
                    </div>
                  </div>

                  <Divider
                    className="my-7"
                    variant="soft"
                  />

                  <div className="grid gap-4">
                    <OrderDetailRow
                      label="Order Number"
                      value={
                        order.order_number
                      }
                      accent
                    />

                    <OrderDetailRow
                      label="Order ID"
                      value={
                        order.id
                      }
                    />

                    <OrderDetailRow
                      label="Checkout Status"
                      value={getCheckoutStatusLabel(
                        session.status,
                      )}
                    />

                    <OrderDetailRow
                      label="Payment Status"
                      value={
                        paymentStatusLabel
                      }
                    />

                    <OrderDetailRow
                      label="Order Status"
                      value={getOrderStatusLabel(
                        order.status,
                      )}
                    />

                    <OrderDetailRow
                      label="Intake Status"
                      value={getIntakeStatusLabel(
                        order.intake_status,
                      )}
                    />

                    <OrderDetailRow
                      label="Campaign Services"
                      value={
                        campaignCount
                      }
                    />

                    <OrderDetailRow
                      label="Subtotal"
                      value={
                        subtotalLabel
                      }
                    />

                    <div className="flex items-end justify-between gap-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.05] p-5">
                      <div>
                        <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-emerald-300">
                          Amount Paid
                        </p>

                        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.11em] text-white/30">
                          One-Time Order
                        </p>
                      </div>

                      <span className="text-2xl font-black tracking-[-0.045em] text-[var(--mr-text)]">
                        {totalLabel}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4">
                    <span className="mt-0.5 text-emerald-300">
                      <EmailIcon />
                    </span>

                    <div>
                      <p className="m-0 text-[10px] font-black uppercase tracking-[0.14em] text-white/45">
                        Confirmation Email
                      </p>

                      <p className="mt-2 break-all text-xs leading-5 text-white/42">
                        {customerEmail}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    {receiptUrl ? (
                      <Button
                        href={
                          receiptUrl
                        }
                        variant="primary"
                        size="lg"
                        rightIcon={
                          <ArrowIcon />
                        }
                        external
                        fullWidth
                      >
                        View Stripe Receipt
                      </Button>
                    ) : (
                      <Button
                        href="/services"
                        variant="primary"
                        size="lg"
                        rightIcon={
                          <ArrowIcon />
                        }
                        fullWidth
                      >
                        Explore More Services
                      </Button>
                    )}

                    <Button
                      href="/"
                      variant="secondary"
                      size="sm"
                      fullWidth
                    >
                      Return to Money Records
                    </Button>

                    <Button
                      href={`mailto:${SUPPORT_EMAIL}`}
                      variant="ghost"
                      size="sm"
                      fullWidth
                    >
                      Contact Campaign Support
                    </Button>
                  </div>
                </div>
              </Card>
            </aside>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Secure Reference Details                                    */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-label="Payment and order reference details"
            className="pb-16"
          >
            <Divider
              label="Secure Order Reference"
              variant="strong"
              spacing="lg"
            />

            <div className="grid gap-4 md:grid-cols-3">
              <Card
                as="article"
                padding="md"
                fullHeight
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-emerald-300/20 bg-emerald-300/[0.055] text-emerald-300">
                  <PaymentIcon />
                </span>

                <h2 className="mt-5 text-base font-black tracking-[-0.025em] text-[var(--mr-text)]">
                  Stripe Checkout
                </h2>

                <p className="mt-3 break-all text-xs leading-6 text-white/44">
                  Session:{" "}
                  {session.id}
                </p>
              </Card>

              <Card
                as="article"
                padding="md"
                fullHeight
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-emerald-300/20 bg-emerald-300/[0.055] text-emerald-300">
                  <ShieldIcon />
                </span>

                <h2 className="mt-5 text-base font-black tracking-[-0.025em] text-[var(--mr-text)]">
                  Payment Reference
                </h2>

                <p className="mt-3 break-all text-xs leading-6 text-white/44">
                  {paymentIntentId ??
                    "Payment reference is being synchronized."}
                </p>

                {customerId ? (
                  <p className="mt-2 break-all text-[9px] leading-5 text-white/25">
                    Customer:{" "}
                    {customerId}
                  </p>
                ) : null}
              </Card>

              <Card
                as="article"
                padding="md"
                fullHeight
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-emerald-300/20 bg-emerald-300/[0.055] text-emerald-300">
                  <ClockIcon />
                </span>

                <h2 className="mt-5 text-base font-black tracking-[-0.025em] text-[var(--mr-text)]">
                  Order Timeline
                </h2>

                <p className="mt-3 text-xs leading-6 text-white/44">
                  Checkout created:{" "}
                  {checkoutDate}
                </p>

                <p className="mt-2 text-xs leading-6 text-white/44">
                  Payment recorded:{" "}
                  {paidDate}
                </p>
              </Card>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.045)] p-5">
              <span className="mt-0.5 text-[var(--mr-gold-200)]">
                <SmallCheckIcon />
              </span>

              <p className="m-0 text-xs leading-6 text-white/42">
                Campaign targets represent estimated promotional reach,
                exposure, impressions, listeners, views, or discovery
                opportunities. Payment does not guarantee streams, followers,
                playlist placement, chart position, revenue, virality, or any
                other specific result.
              </p>
            </div>
          </section>
        </main>
      </Container>
    </div>
  );
}