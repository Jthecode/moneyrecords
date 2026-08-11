"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Checkout Page                                         ┃
   ┃ File   : src/app/checkout/page.tsx                                    ┃
   ┃ Role   : Campaign intake, order review, and Stripe Checkout launch    ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import Button from "@/components/Button";
import CampaignIntakeForm from "@/components/CampaignIntakeForm";
import Card from "@/components/Card";
import { useCart } from "@/components/CartProvider";
import Container from "@/components/Container";
import Divider from "@/components/Divider";

import {
  createCheckoutCartPayload,
  formatCartPrice,
} from "@/lib/cart";

import type { CartItem } from "@/types/cart";

import {
  ORDER_SCHEMA_VERSION,
  type CampaignIntake,
  type CampaignIntakeFormValues,
  type CreateCheckoutOrderRequest,
  type CreateCheckoutSessionResponse,
} from "@/types/order";

/* --------------------------------------------------------------------- */
/* Configuration                                                         */
/* --------------------------------------------------------------------- */

const CHECKOUT_ENDPOINT =
  "/api/stripe/checkout";

const CHECKOUT_REQUEST_TIMEOUT_MS =
  30_000;

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
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

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
    >
      <path
        d="M19 12H5M10 7L5 12L10 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <path
        d="M4 5H6L8.1 14.2H17.7L20 8H7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="9"
        cy="18.5"
        r="1.3"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="17"
        cy="18.5"
        r="1.3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function CheckIcon() {
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

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M8 10V7.5C8 5.3 9.8 3.5 12 3.5C14.2 3.5 16 5.3 16 7.5V10"
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

function TargetIcon() {
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
        strokeWidth="1.6"
      />

      <circle
        cx="12"
        cy="12"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="12"
        cy="12"
        r="1.2"
        fill="currentColor"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
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
/* Utilities                                                              */
/* --------------------------------------------------------------------- */

function joinClasses(
  ...classes: Array<
    string |
    false |
    null |
    undefined
  >
): string {
  return classes
    .filter(Boolean)
    .join(" ");
}

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isCheckoutResponse(
  value: unknown,
): value is CreateCheckoutSessionResponse {
  if (
    !isRecord(value) ||
    typeof value.ok !== "boolean"
  ) {
    return false;
  }

  if (value.ok) {
    return (
      typeof value.orderId === "string" &&
      typeof value.orderNumber === "string" &&
      typeof value.checkoutSessionId === "string" &&
      typeof value.checkoutUrl === "string"
    );
  }

  return (
    typeof value.code === "string" &&
    typeof value.message === "string"
  );
}

function getSafeCheckoutUrl(
  rawUrl: string,
): string | null {
  try {
    const url = new URL(
      rawUrl,
      window.location.origin,
    );

    const isSameOrigin =
      url.origin ===
      window.location.origin;

    const isSecureExternalUrl =
      url.protocol === "https:";

    if (
      !isSameOrigin &&
      !isSecureExternalUrl
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function getServiceLabel(
  count: number,
): string {
  return count === 1
    ? "Service"
    : "Services";
}

function getCheckoutErrorMessage(
  error: unknown,
): string {
  if (
    error instanceof DOMException &&
    error.name === "AbortError"
  ) {
    return "Checkout took too long to respond. Please try again.";
  }

  if (
    error instanceof Error &&
    error.message.trim()
  ) {
    return error.message;
  }

  return "Secure checkout could not be started. Please try again.";
}

/* --------------------------------------------------------------------- */
/* Checkout API                                                           */
/* --------------------------------------------------------------------- */

async function createCheckoutSession(
  request: CreateCheckoutOrderRequest,
): Promise<CreateCheckoutSessionResponse> {
  const controller =
    new AbortController();

  const timeout =
    window.setTimeout(() => {
      controller.abort();
    }, CHECKOUT_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(
      CHECKOUT_ENDPOINT,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
          Accept:
            "application/json",
        },

        credentials:
          "same-origin",

        cache:
          "no-store",

        signal:
          controller.signal,

        body:
          JSON.stringify(request),
      },
    );

    let payload: unknown;

    try {
      payload =
        await response.json();
    } catch {
      throw new Error(
        response.ok
          ? "The checkout server returned an invalid response."
          : "Checkout is not available yet. Please try again shortly.",
      );
    }

    if (
      !isCheckoutResponse(payload)
    ) {
      throw new Error(
        "The checkout server returned an invalid response.",
      );
    }

    if (
      !response.ok &&
      payload.ok
    ) {
      throw new Error(
        "Checkout could not be created.",
      );
    }

    return payload;
  } finally {
    window.clearTimeout(timeout);
  }
}

/* --------------------------------------------------------------------- */
/* Checkout Metric                                                        */
/* --------------------------------------------------------------------- */

function CheckoutMetric({
  icon,
  label,
  value,
  description,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <Card
      as="article"
      padding="md"
      hover
      fullHeight
      className="group"
    >
      <div className="flex h-full items-start gap-4">
        <span className="grid h-11 w-11 flex-[0_0_44px] place-items-center rounded-xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
            {label}
          </p>

          <p className="mt-2 text-lg font-black leading-6 tracking-[-0.03em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
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
/* Selected Service Row                                                   */
/* --------------------------------------------------------------------- */

function SelectedServiceRow({
  item,
}: {
  item: CartItem;
}) {
  const priceLabel =
    formatCartPrice(
      item.priceCents,
      item.currency,
    );

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4"
      style={{
        borderColor:
          `color-mix(in srgb, ${item.accent} 24%, transparent)`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-[0.08] blur-[38px]"
        style={{
          background:
            item.accent,
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span
            className="inline-flex rounded-full border px-3 py-1 text-[8px] font-black uppercase tracking-[0.12em]"
            style={{
              color:
                item.accent,

              borderColor:
                `color-mix(in srgb, ${item.accent} 30%, transparent)`,

              background:
                item.accentSoft,
            }}
          >
            {item.platformShortName}
          </span>

          <p className="mt-3 text-sm font-black leading-5 text-[var(--mr-text)]">
            {item.campaignShortName}
          </p>

          <p className="mt-1 text-[10px] uppercase tracking-[0.11em] text-white/35">
            Target{" "}
            {item.campaignTargetLabel}
          </p>
        </div>

        <span className="flex-[0_0_auto] text-sm font-black text-[var(--mr-text)]">
          {priceLabel}
        </span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Checkout Sidebar                                                       */
/* --------------------------------------------------------------------- */

function CheckoutSidebar({
  items,
  itemCount,
  subtotalLabel,
  isHydrated,
  isEmpty,
}: {
  items: CartItem[];
  itemCount: number;
  subtotalLabel: string;
  isHydrated: boolean;
  isEmpty: boolean;
}) {
  return (
    <div className="grid gap-5 lg:sticky lg:top-28">
      <Card
        as="aside"
        variant="featured"
        padding="lg"
        topLine
        className="relative overflow-hidden"
        aria-labelledby="checkout-order-summary-heading"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[rgba(211,154,46,0.14)] blur-[100px]"
        />

        <div className="relative">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
              <CartIcon />
            </span>

            <div>
              <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                Checkout Summary
              </p>

              <h2
                id="checkout-order-summary-heading"
                className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]"
              >
                Selected Campaigns
              </h2>
            </div>
          </div>

          <Divider
            className="my-7"
            variant="soft"
          />

          {!isHydrated ? (
            <div
              className="grid gap-3"
              aria-busy="true"
            >
              {[1, 2].map(
                (placeholder) => (
                  <div
                    key={placeholder}
                    className="h-24 animate-pulse rounded-2xl bg-white/[0.045]"
                  />
                ),
              )}
            </div>
          ) : isEmpty ? (
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-center">
              <p className="text-sm font-black text-[var(--mr-text)]">
                No campaigns selected
              </p>

              <Button
                href="/services"
                variant="secondary"
                size="sm"
                className="mt-4"
                fullWidth
              >
                Explore Services
              </Button>
            </div>
          ) : (
            <div className="grid gap-3">
              {items.map((item) => (
                <SelectedServiceRow
                  key={item.sku}
                  item={item}
                />
              ))}
            </div>
          )}

          <Divider
            className="my-7"
            variant="soft"
          />

          <div className="grid gap-4">
            <div className="flex items-center justify-between gap-5">
              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-white/38">
                Selected Services
              </span>

              <span className="text-sm font-black text-[var(--mr-text)]">
                {itemCount}
              </span>
            </div>

            <div className="flex items-end justify-between gap-5 rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] p-5">
              <div>
                <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)]">
                  Current Subtotal
                </p>

                <p className="mt-2 text-[10px] uppercase tracking-[0.11em] text-white/30">
                  One-Time Services
                </p>
              </div>

              <span className="text-2xl font-black tracking-[-0.045em] text-[var(--mr-text)]">
                {subtotalLabel}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4">
            <span className="mt-0.5 text-[var(--mr-gold-200)]">
              <LockIcon />
            </span>

            <p className="m-0 text-xs leading-5 text-white/42">
              Campaign SKUs, availability, and prices are verified by the
              server before Stripe Checkout opens.
            </p>
          </div>

          <Button
            href="/cart"
            variant="secondary"
            size="sm"
            leftIcon={<BackIcon />}
            className="mt-5"
            fullWidth
          >
            Edit Campaign Cart
          </Button>
        </div>
      </Card>

      <Card
        as="aside"
        padding="md"
      >
        <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
          Secure Checkout Process
        </p>

        <div className="mt-5 grid gap-4">
          {[
            {
              icon: <DocumentIcon />,
              title:
                "Complete Intake",
              description:
                "Submit the details needed to prepare your campaigns.",
            },
            {
              icon: <ShieldIcon />,
              title:
                "Server Verification",
              description:
                "Campaign availability and trusted pricing are checked again.",
            },
            {
              icon: <PaymentIcon />,
              title:
                "Stripe Payment",
              description:
                "You will continue to a secure hosted Stripe Checkout page.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="flex items-start gap-3"
            >
              <span className="grid h-9 w-9 flex-[0_0_36px] place-items-center rounded-xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]">
                {step.icon}
              </span>

              <div>
                <p className="m-0 text-xs font-black text-[var(--mr-text)]">
                  {step.title}
                </p>

                <p className="mt-1 text-[10px] leading-5 text-white/38">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Checkout Page                                                          */
/* --------------------------------------------------------------------- */

export default function CheckoutPage() {
  const {
    items,
    itemCount,
    uniqueItemCount,
    subtotalCents,
    currency,
    isHydrated,
    isEmpty,
  } = useCart();

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    checkoutError,
    setCheckoutError,
  ] = useState("");

  const subtotalLabel =
    useMemo(
      () =>
        formatCartPrice(
          subtotalCents,
          currency,
        ),
      [
        currency,
        subtotalCents,
      ],
    );

  const serviceLabel =
    getServiceLabel(
      itemCount,
    );

  /* ------------------------------------------------------------------- */
  /* Create Stripe Checkout Session                                      */
  /* ------------------------------------------------------------------- */

  const handleCheckoutSubmit =
    useCallback(
      async (
        intake: CampaignIntake,
        _formValues: CampaignIntakeFormValues,
      ): Promise<void> => {
        if (
          isSubmitting
        ) {
          return;
        }

        if (
          !isHydrated ||
          isEmpty ||
          items.length === 0
        ) {
          throw new Error(
            "Your campaign cart is empty. Select a service before checkout.",
          );
        }

        setCheckoutError("");
        setIsSubmitting(true);

        try {
          const request:
            CreateCheckoutOrderRequest = {
              schemaVersion:
                ORDER_SCHEMA_VERSION,

              cart:
                createCheckoutCartPayload(
                  items,
                ),

              intake,

              successPath:
                "/checkout/success?session_id={CHECKOUT_SESSION_ID}",

              cancelPath:
                "/checkout/cancelled",
            };

          const result =
            await createCheckoutSession(
              request,
            );

          if (!result.ok) {
            throw new Error(
              result.message,
            );
          }

          const checkoutUrl =
            getSafeCheckoutUrl(
              result.checkoutUrl,
            );

          if (!checkoutUrl) {
            throw new Error(
              "The checkout server returned an unsafe redirect URL.",
            );
          }

          window.location.assign(
            checkoutUrl,
          );
        } catch (error) {
          const message =
            getCheckoutErrorMessage(
              error,
            );

          setCheckoutError(
            message,
          );

          throw new Error(
            message,
          );
        } finally {
          setIsSubmitting(false);
        }
      },
      [
        isEmpty,
        isHydrated,
        isSubmitting,
        items,
      ],
    );

  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      {/* Page atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[820px] w-[1220px] max-w-[122vw] -translate-x-1/2 rounded-full bg-[rgba(211,154,46,0.055)] blur-[185px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-20 [background-image:radial-gradient(rgba(227,179,77,0.11)_0.7px,transparent_0.7px)] [background-size:26px_26px]"
      />

      <Container size="wide">
        {/* ------------------------------------------------------------- */}
        {/* Breadcrumb                                                    */}
        {/* ------------------------------------------------------------- */}

        <nav
          aria-label="Checkout breadcrumb"
          className="pt-8 md:pt-10"
        >
          <Button
            href="/cart"
            variant="ghost"
            size="sm"
            leftIcon={<BackIcon />}
          >
            Return to Campaign Cart
          </Button>
        </nav>

        {/* ------------------------------------------------------------- */}
        {/* Checkout Hero                                                 */}
        {/* ------------------------------------------------------------- */}

        <header className="relative mt-5 overflow-hidden rounded-[30px] border border-[rgba(227,179,77,0.2)] bg-[linear-gradient(145deg,rgba(18,18,20,0.95),rgba(7,7,8,0.98))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.52)] sm:p-8 lg:p-11">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-44 h-[500px] w-[500px] rounded-full bg-[rgba(211,154,46,0.18)] blur-[140px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[rgba(184,124,32,0.06)] blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.75),transparent)]"
          />

          <div className="relative grid gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 flex-[0_0_56px] place-items-center rounded-[18px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                  <LockIcon />
                </span>

                <div>
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Secure Campaign Checkout
                  </p>

                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.13em] text-white/30">
                    Intake · Verification · Payment
                  </p>
                </div>
              </div>

              <h1 className="mt-7 text-balance text-4xl font-black leading-[0.98] tracking-[-0.055em] text-[var(--mr-text)] sm:text-5xl lg:text-6xl">
                Prepare Your{" "}
                <span className="mr-text-gradient">
                  Campaign Order.
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/52 sm:text-lg">
                Submit the artist, release, audience, campaign, and creative
                information required to prepare your selected Money Records
                services before secure payment.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
                  Selected Services
                </p>

                <p className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                  {itemCount}{" "}
                  {serviceLabel}
                </p>
              </div>

              <div className="rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] p-4">
                <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
                  Current Subtotal
                </p>

                <p className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                  {subtotalLabel}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ------------------------------------------------------------- */}
        {/* Checkout Metrics                                              */}
        {/* ------------------------------------------------------------- */}

        <section
          aria-label="Checkout overview"
          className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <CheckoutMetric
            icon={<DocumentIcon />}
            label="Campaign Intake"
            value="Six Steps"
            description="Contact, artist, release, campaign, assets, and review."
          />

          <CheckoutMetric
            icon={<TargetIcon />}
            label="Selected Campaigns"
            value={`${uniqueItemCount}`}
            description="Each campaign is connected to a trusted catalog SKU."
          />

          <CheckoutMetric
            icon={<ShieldIcon />}
            label="Price Verification"
            value="Server Checked"
            description="Browser-provided prices are never trusted during payment."
          />

          <CheckoutMetric
            icon={<PaymentIcon />}
            label="Secure Payment"
            value="Stripe Checkout"
            description="Payment is completed through Stripe's hosted checkout."
          />
        </section>

        {/* ------------------------------------------------------------- */}
        {/* Checkout Error                                                */}
        {/* ------------------------------------------------------------- */}

        {checkoutError ? (
          <div
            role="alert"
            className="mt-8 flex items-start gap-3 rounded-2xl border border-red-400/25 bg-red-400/[0.055] p-5 text-red-200/85"
          >
            <span className="mt-0.5 flex-[0_0_auto]">
              <AlertIcon />
            </span>

            <div>
              <p className="m-0 text-xs font-black uppercase tracking-[0.13em]">
                Checkout Could Not Start
              </p>

              <p className="mt-2 text-xs leading-6">
                {checkoutError}
              </p>
            </div>
          </div>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Main Checkout Content                                         */}
        {/* ------------------------------------------------------------- */}

        <main className="py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
            <section
              aria-labelledby="campaign-intake-heading"
              className="min-w-0"
            >
              <div className="mb-7">
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  Campaign Intake
                </p>

                <h2
                  id="campaign-intake-heading"
                  className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl"
                >
                  Complete Your Order Details
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/46">
                  Required fields must be completed before the secure Stripe
                  Checkout session can be created.
                </p>
              </div>

              <CampaignIntakeForm
                onSubmit={
                  handleCheckoutSubmit
                }
                submitLabel="Continue to Secure Payment"
                isSubmitting={
                  isSubmitting
                }
                disabled={
                  isSubmitting
                }
                showCartSummary
              />
            </section>

            <CheckoutSidebar
              items={items}
              itemCount={itemCount}
              subtotalLabel={
                subtotalLabel
              }
              isHydrated={
                isHydrated
              }
              isEmpty={
                isEmpty
              }
            />
          </div>
        </main>

        {/* ------------------------------------------------------------- */}
        {/* Checkout Standards                                            */}
        {/* ------------------------------------------------------------- */}

        <section
          aria-label="Checkout and campaign standards"
          className="pb-16"
        >
          <Divider
            label="Secure Order Standards"
            variant="strong"
            spacing="lg"
          />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon:
                  <LockIcon />,

                title:
                  "Secure Hosted Payment",

                description:
                  "Payment details are entered on Stripe Checkout—not inside the Money Records intake form.",
              },
              {
                icon:
                  <ShieldIcon />,

                title:
                  "Trusted Product Validation",

                description:
                  "Every campaign SKU, price, currency, and availability status is resolved again on the server.",
              },
              {
                icon:
                  <DocumentIcon />,

                title:
                  "Fulfillment Review",

                description:
                  "Campaign work begins after successful payment and review of the required release information.",
              },
            ].map((standard) => (
              <Card
                key={standard.title}
                as="article"
                padding="md"
                fullHeight
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                  {standard.icon}
                </span>

                <h2 className="mt-5 text-base font-black tracking-[-0.025em] text-[var(--mr-text)]">
                  {standard.title}
                </h2>

                <p className="mt-3 text-xs leading-6 text-white/44">
                  {standard.description}
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.045)] p-5">
            <span className="mt-0.5 text-[var(--mr-gold-200)]">
              <CheckIcon />
            </span>

            <p className="m-0 text-xs leading-6 text-white/42">
              Campaign targets represent estimated promotional reach,
              exposure, impressions, or listener opportunities. Payment does
              not guarantee streams, followers, placements, chart position,
              revenue, virality, or other specific outcomes.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              href="/cart"
              variant="secondary"
              size="sm"
              leftIcon={<BackIcon />}
            >
              Return to Cart
            </Button>

            <Button
              href="/services"
              variant="ghost"
              size="sm"
              rightIcon={<ArrowIcon />}
            >
              Explore More Services
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}