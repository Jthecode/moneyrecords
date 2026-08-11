"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Cart Summary                                          ┃
   ┃ File   : src/components/CartSummary.tsx                               ┃
   ┃ Role   : Cart totals, checkout action, standards, and cart controls  ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { useCart } from "@/components/CartProvider";
import Divider from "@/components/Divider";

import { formatCartPrice } from "@/lib/cart";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type CartSummaryProps = {
  /**
   * Checkout-page destination.
   *
   * @default "/checkout"
   */
  checkoutHref?: string;

  /**
   * Main checkout-button label.
   *
   * @default "Continue to Checkout"
   */
  checkoutLabel?: string;

  /**
   * Service-store destination.
   *
   * @default "/services"
   */
  continueShoppingHref?: string;

  /**
   * Continue-shopping button label.
   *
   * @default "Explore More Services"
   */
  continueShoppingLabel?: string;

  /**
   * Shows the clear-cart action.
   *
   * @default true
   */
  showClearCart?: boolean;

  /**
   * Shows campaign-standard notices.
   *
   * @default true
   */
  showStandards?: boolean;

  /**
   * Makes the summary sticky on desktop.
   *
   * @default true
   */
  sticky?: boolean;

  /**
   * Optional heading override.
   */
  title?: ReactNode;

  /**
   * Optional supporting text.
   */
  subtitle?: ReactNode;

  className?: string;
};

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
      width="20"
      height="20"
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

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="19"
      height="19"
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

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
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

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
    >
      <path
        d="M5 7H19M9 7V4.5H15V7M7.5 7L8.3 19H15.7L16.5 7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M10 11V15.5M14 11V15.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
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
/* Helpers                                                                */
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

function getServiceLabel(
  count: number,
): string {
  return count === 1
    ? "Service"
    : "Services";
}

/* --------------------------------------------------------------------- */
/* Summary Row                                                            */
/* --------------------------------------------------------------------- */

function SummaryRow({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: ReactNode;
  emphasized?: boolean;
}) {
  return (
    <div
      className={joinClasses(
        "flex items-start justify-between gap-5",
        emphasized
          ? "rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] p-5"
          : "border-b border-white/[0.055] pb-4 last:border-b-0 last:pb-0",
      )}
    >
      <span
        className={joinClasses(
          "text-[10px] font-black uppercase tracking-[0.15em]",
          emphasized
            ? "text-[var(--mr-gold-200)]"
            : "text-white/38",
        )}
      >
        {label}
      </span>

      <span
        className={joinClasses(
          "text-right font-black",
          emphasized
            ? "text-2xl tracking-[-0.045em] text-[var(--mr-text)]"
            : "text-sm text-[var(--mr-text)]",
        )}
      >
        {value}
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Empty Summary                                                          */
/* --------------------------------------------------------------------- */

function EmptyCartSummary({
  continueShoppingHref,
  continueShoppingLabel,
}: {
  continueShoppingHref: string;
  continueShoppingLabel: string;
}) {
  return (
    <div className="text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.06)] text-[var(--mr-gold-200)]">
        <CartIcon />
      </span>

      <h2 className="mt-5 text-xl font-black tracking-[-0.03em] text-[var(--mr-text)]">
        Your Cart Is Empty
      </h2>

      <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-white/46">
        Explore the Money Records platform storefront and select the campaign
        service that fits your release.
      </p>

      <Button
        href={continueShoppingHref}
        variant="primary"
        size="lg"
        rightIcon={<ArrowIcon />}
        className="mt-6"
        fullWidth
      >
        {continueShoppingLabel}
      </Button>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Cart Summary                                                           */
/* --------------------------------------------------------------------- */

export default function CartSummary({
  checkoutHref = "/checkout",
  checkoutLabel = "Continue to Checkout",
  continueShoppingHref = "/services",
  continueShoppingLabel = "Explore More Services",
  showClearCart = true,
  showStandards = true,
  sticky = true,
  title = "Order Summary",
  subtitle = "Review your selected campaign services before continuing.",
  className,
}: CartSummaryProps) {
  const {
    items,
    itemCount,
    uniqueItemCount,
    subtotalCents,
    currency,
    isHydrated,
    isEmpty,
    clearCart,
  } = useCart();

  const [
    isConfirmingClear,
    setIsConfirmingClear,
  ] = useState(false);

  const [
    feedbackMessage,
    setFeedbackMessage,
  ] = useState("");

  const confirmTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

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
    getServiceLabel(itemCount);

  /* ------------------------------------------------------------------- */
  /* Clear Confirmation Cleanup                                          */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    return () => {
      if (confirmTimerRef.current) {
        clearTimeout(
          confirmTimerRef.current,
        );
      }
    };
  }, []);

  /* ------------------------------------------------------------------- */
  /* Clear Cart                                                          */
  /* ------------------------------------------------------------------- */

  function resetClearConfirmation(): void {
    setIsConfirmingClear(false);

    if (confirmTimerRef.current) {
      clearTimeout(
        confirmTimerRef.current,
      );

      confirmTimerRef.current = null;
    }
  }

  function handleClearCart(): void {
    if (!isConfirmingClear) {
      setIsConfirmingClear(true);

      setFeedbackMessage(
        "Select clear cart again to remove every campaign.",
      );

      if (confirmTimerRef.current) {
        clearTimeout(
          confirmTimerRef.current,
        );
      }

      confirmTimerRef.current =
        setTimeout(() => {
          setIsConfirmingClear(false);
          setFeedbackMessage("");
          confirmTimerRef.current = null;
        }, 5000);

      return;
    }

    clearCart();
    resetClearConfirmation();

    setFeedbackMessage(
      "Your cart has been cleared.",
    );
  }

  /* ------------------------------------------------------------------- */
  /* Loading State                                                       */
  /* ------------------------------------------------------------------- */

  if (!isHydrated) {
    return (
      <Card
        as="aside"
        variant="featured"
        padding="lg"
        topLine
        className={joinClasses(
          sticky &&
            "lg:sticky lg:top-28",
          className,
        )}
        aria-busy="true"
      >
        <div className="animate-pulse">
          <div className="h-3 w-28 rounded-full bg-white/[0.07]" />

          <div className="mt-4 h-8 w-48 rounded-xl bg-white/[0.07]" />

          <div className="mt-3 h-4 w-full rounded-full bg-white/[0.045]" />

          <Divider
            className="my-7"
            variant="soft"
          />

          <div className="grid gap-4">
            <div className="h-12 rounded-2xl bg-white/[0.045]" />
            <div className="h-12 rounded-2xl bg-white/[0.045]" />
            <div className="h-20 rounded-2xl bg-white/[0.055]" />
          </div>

          <div className="mt-7 h-12 rounded-full bg-white/[0.07]" />
        </div>
      </Card>
    );
  }

  /* ------------------------------------------------------------------- */
  /* Empty State                                                         */
  /* ------------------------------------------------------------------- */

  if (isEmpty) {
    return (
      <Card
        as="aside"
        variant="featured"
        padding="lg"
        topLine
        className={joinClasses(
          sticky &&
            "lg:sticky lg:top-28",
          className,
        )}
      >
        <EmptyCartSummary
          continueShoppingHref={
            continueShoppingHref
          }
          continueShoppingLabel={
            continueShoppingLabel
          }
        />
      </Card>
    );
  }

  /* ------------------------------------------------------------------- */
  /* Populated Summary                                                   */
  /* ------------------------------------------------------------------- */

  return (
    <Card
      as="aside"
      variant="featured"
      padding="lg"
      topLine
      className={joinClasses(
        "relative overflow-hidden",
        sticky &&
          "lg:sticky lg:top-28",
        className,
      )}
      aria-labelledby="cart-summary-heading"
    >
      {/* Gold atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[rgba(211,154,46,0.14)] blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[rgba(184,124,32,0.06)] blur-[95px]"
      />

      <div className="relative">
        {/* ------------------------------------------------------------- */}
        {/* Heading                                                       */}
        {/* ------------------------------------------------------------- */}

        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
            <CartIcon />
          </span>

          <div>
            <p className="m-0 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
              Money Records Cart
            </p>

            <h2
              id="cart-summary-heading"
              className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)]"
            >
              {title}
            </h2>
          </div>
        </div>

        {subtitle ? (
          <p className="mt-5 text-sm leading-7 text-white/48">
            {subtitle}
          </p>
        ) : null}

        <Divider
          className="my-7"
          variant="soft"
        />

        {/* ------------------------------------------------------------- */}
        {/* Totals                                                        */}
        {/* ------------------------------------------------------------- */}

        <div className="grid gap-4">
          <SummaryRow
            label="Selected Services"
            value={`${itemCount} ${serviceLabel}`}
          />

          <SummaryRow
            label="Unique Campaigns"
            value={uniqueItemCount}
          />

          <SummaryRow
            label="Quantity"
            value="One Per Service"
          />

          <SummaryRow
            label="Subtotal"
            value={subtotalLabel}
            emphasized
          />
        </div>

        <p className="mt-4 text-[10px] leading-5 text-white/33">
          Taxes, processing fees, or other approved charges will be displayed
          before final payment when applicable.
        </p>

        {/* ------------------------------------------------------------- */}
        {/* Checkout                                                      */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-7 grid gap-3">
          <Button
            href={checkoutHref}
            variant="primary"
            size="lg"
            rightIcon={<ArrowIcon />}
            fullWidth
          >
            {checkoutLabel}
          </Button>

          <Button
            href={continueShoppingHref}
            variant="secondary"
            size="sm"
            leftIcon={<BackIcon />}
            fullWidth
          >
            {continueShoppingLabel}
          </Button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Security                                                      */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.045)] p-4">
          <span className="mt-0.5 text-[var(--mr-gold-200)]">
            <LockIcon />
          </span>

          <div>
            <p className="m-0 text-[10px] font-black uppercase tracking-[0.14em] text-white/45">
              Trusted Campaign Pricing
            </p>

            <p className="mt-2 text-xs leading-5 text-white/42">
              Each campaign SKU, price, availability, and checkout product
              will be verified again on the server before payment.
            </p>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Campaign Standards                                            */}
        {/* ------------------------------------------------------------- */}

        {showStandards ? (
          <div className="mt-6">
            <p className="m-0 text-[10px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
              Campaign Standards
            </p>

            <ul className="mt-4 grid list-none gap-3 p-0">
              {[
                "Campaign targets are estimates—not guaranteed results.",
                "Each service has its own scope, timing, and requirements.",
                "Fulfillment begins after payment and intake review.",
              ].map((standard) => (
                <li
                  key={standard}
                  className="flex items-start gap-3 text-xs leading-5 text-white/44"
                >
                  <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                    <CheckIcon />
                  </span>

                  <span>{standard}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Clear Cart                                                    */}
        {/* ------------------------------------------------------------- */}

        {showClearCart ? (
          <>
            <Divider
              className="my-6"
              variant="soft"
            />

            <Button
              type="button"
              variant="dark"
              size="sm"
              leftIcon={
                isConfirmingClear
                  ? <AlertIcon />
                  : <TrashIcon />
              }
              onClick={handleClearCart}
              fullWidth
              className={joinClasses(
                "border-red-400/15 text-red-200/70",
                "hover:border-red-400/30 hover:bg-red-400/[0.055]",
                isConfirmingClear &&
                  "border-red-400/30 bg-red-400/[0.055] text-red-200",
              )}
            >
              {isConfirmingClear
                ? "Confirm Clear Cart"
                : "Clear Cart"}
            </Button>

            <p
              aria-live="polite"
              aria-atomic="true"
              className={
                feedbackMessage
                  ? "mt-3 text-center text-xs leading-5 text-white/42"
                  : "sr-only"
              }
            >
              {feedbackMessage}
            </p>
          </>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Final Notice                                                  */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-6 flex items-start gap-3 border-t border-white/[0.055] pt-5">
          <span className="mt-0.5 text-[var(--mr-gold-200)]">
            <ShieldIcon />
          </span>

          <p className="m-0 text-[9px] leading-5 text-white/30">
            Money Records does not guarantee streams, followers, playlist
            placements, chart positions, revenue, virality, or specific
            promotional outcomes.
          </p>
        </div>
      </div>
    </Card>
  );
}