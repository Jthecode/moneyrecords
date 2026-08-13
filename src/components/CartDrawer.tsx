"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Cart Drawer                                           ┃
   ┃ File   : src/components/CartDrawer.tsx                                ┃
   ┃ Role   : Global campaign-cart overlay, items, totals, and checkout   ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  useEffect,
  useMemo,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";

import { usePathname } from "next/navigation";

import { useUI } from "@/app/providers";

import Button from "@/components/Button";
import CartItemCard from "@/components/CartItemCard";
import CartSummary from "@/components/CartSummary";
import { useCart } from "@/components/CartProvider";
import Divider from "@/components/Divider";
import EmptyState from "@/components/EmptyState";
import SkeletonCard from "@/components/SkeletonCard";

import {
  formatCartPrice,
} from "@/lib/cart";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type CartDrawerProps = {
  /**
   * Full cart-page destination.
   *
   * @default "/cart"
   */
  cartHref?: string;

  /**
   * Checkout-page destination.
   *
   * @default "/checkout"
   */
  checkoutHref?: string;

  /**
   * Marketing storefront destination.
   *
   * @default "/services"
   */
  servicesHref?: string;

  /**
   * Displays campaign-detail buttons on each cart item.
   *
   * @default true
   */
  showItemDetails?: boolean;

  /**
   * Displays the clear-cart action in the desktop summary.
   *
   * @default true
   */
  showClearCart?: boolean;
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function CartIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
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

function CloseIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M7 7L17 17M17 7L7 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon(): ReactNode {
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

function ShieldIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
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

function LockIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="15"
      height="15"
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
    ? "service"
    : "services";
}

function getFocusableElements(
  container: HTMLElement,
): HTMLElement[] {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      selector,
    ),
  ).filter(
    (
      element,
    ) =>
      element.getAttribute(
        "aria-hidden",
      ) !==
        "true" &&
      !element.hasAttribute(
        "hidden",
      ),
  );
}

/* --------------------------------------------------------------------- */
/* Loading State                                                          */
/* --------------------------------------------------------------------- */

function CartDrawerLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading campaign cart"
      className="grid gap-3 sm:gap-4"
    >
      <SkeletonCard
        variant="compact"
        ariaLabel="Loading first cart item"
      />

      <SkeletonCard
        variant="compact"
        ariaLabel="Loading second cart item"
      />

      <span className="sr-only">
        Loading campaign cart
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Empty State                                                            */
/* --------------------------------------------------------------------- */

function EmptyCartDrawer({
  servicesHref,
}: {
  servicesHref: string;
}) {
  return (
    <div className="flex min-h-full items-center justify-center py-6 sm:py-10">
      <EmptyState
        icon={
          <CartIcon />
        }
        eyebrow="Campaign Cart"
        title={
          <>
            Your Cart Is{" "}
            <span className="mr-text-gradient">
              Empty.
            </span>
          </>
        }
        description="Choose a Money Records marketing service and add it to your campaign cart."
        primaryAction={{
          label:
            "Explore Services",

          href:
            servicesHref,
        }}
        size="md"
        panel={false}
        glow={false}
        className="w-full"
      />
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Cart Metric                                                            */
/* --------------------------------------------------------------------- */

function CartMetric({
  label,
  value,
  featured = false,
}: {
  label: string;
  value: ReactNode;
  featured?: boolean;
}) {
  return (
    <div
      className={joinClasses(
        "rounded-[18px] border p-3.5 sm:p-4",

        featured
          ? [
              "border-[rgba(227,179,77,0.2)]",
              "bg-[rgba(211,154,46,0.05)]",
            ].join(" ")
          : [
              "border-white/[0.065]",
              "bg-white/[0.022]",
            ].join(" "),
      )}
    >
      <p className="m-0 text-[8px] font-black uppercase tracking-[0.13em] text-white/30 sm:text-[9px]">
        {label}
      </p>

      <p className="mt-1.5 text-lg font-black tracking-[-0.035em] text-[var(--mr-text)] sm:mt-2 sm:text-xl">
        {value}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Mobile Checkout Bar                                                    */
/* --------------------------------------------------------------------- */

function MobileCheckoutBar({
  subtotalLabel,
  checkoutHref,
  cartHref,
  itemCount,
}: {
  subtotalLabel: string;
  checkoutHref: string;
  cartHref: string;
  itemCount: number;
}) {
  return (
    <div
      className={[
        "relative flex-[0_0_auto]",
        "border-t border-[rgba(227,179,77,0.15)]",
        "bg-[rgba(5,5,6,0.96)]",
        "px-4 pt-3",
        "pb-[max(12px,env(safe-area-inset-bottom))]",
        "shadow-[0_-22px_65px_rgba(0,0,0,0.46)]",
        "backdrop-blur-2xl",
        "sm:hidden",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[18%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.65),transparent)]"
      />

      {/* Total */}

      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <p className="m-0 text-[8px] font-black uppercase tracking-[0.15em] text-white/28">
            Campaign Total
          </p>

          <p className="mt-1 text-[10px] text-white/34">
            {itemCount} selected{" "}
            {getServiceLabel(
              itemCount,
            )}
          </p>
        </div>

        <p className="m-0 text-xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
          {subtotalLabel}
        </p>
      </div>

      {/* Checkout */}

      <Button
        href={
          checkoutHref
        }
        variant="primary"
        size="lg"
        rightIcon={
          <ArrowIcon />
        }
        fullWidth
      >
        Continue to Checkout
      </Button>

      {/* Secondary action */}

      <div className="mt-2 grid grid-cols-[1fr_auto] items-center gap-3">
        <Button
          href={
            cartHref
          }
          variant="ghost"
          size="sm"
          className="w-full"
        >
          View Full Cart
        </Button>

        <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[8px] font-black uppercase tracking-[0.1em] text-white/26">
          <LockIcon />
          Secure
        </span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Cart Drawer                                                            */
/* --------------------------------------------------------------------- */

export default function CartDrawer({
  cartHref =
    "/cart",

  checkoutHref =
    "/checkout",

  servicesHref =
    "/services",

  showItemDetails =
    true,

  showClearCart =
    true,
}: CartDrawerProps) {
  const pathname =
    usePathname();

  const {
    isCartOpen,
    closeCart,
  } =
    useUI();

  const {
    items,
    itemCount,
    subtotalCents,
    currency,
    isHydrated,
    isEmpty,
  } =
    useCart();

  const drawerRef =
    useRef<HTMLElement | null>(
      null,
    );

  const closeButtonRef =
    useRef<HTMLButtonElement | null>(
      null,
    );

  const previouslyFocusedElementRef =
    useRef<HTMLElement | null>(
      null,
    );

  const previousPathnameRef =
    useRef(
      pathname,
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

  /* ------------------------------------------------------------------- */
  /* Close After Route Navigation                                        */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    if (
      previousPathnameRef.current !==
      pathname
    ) {
      closeCart();

      previousPathnameRef.current =
        pathname;
    }
  }, [
    closeCart,
    pathname,
  ]);

  /* ------------------------------------------------------------------- */
  /* Focus Management                                                    */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    if (
      !isCartOpen
    ) {
      return;
    }

    previouslyFocusedElementRef.current =
      document.activeElement instanceof
      HTMLElement
        ? document.activeElement
        : null;

    const frame =
      window.requestAnimationFrame(
        () => {
          closeButtonRef.current?.focus();
        },
      );

    return () => {
      window.cancelAnimationFrame(
        frame,
      );

      previouslyFocusedElementRef
        .current
        ?.focus?.();

      previouslyFocusedElementRef.current =
        null;
    };
  }, [
    isCartOpen,
  ]);

  /* ------------------------------------------------------------------- */
  /* Keyboard Focus Trap                                                 */
  /* ------------------------------------------------------------------- */

  function handleDrawerKeyDown(
    event:
      ReactKeyboardEvent<HTMLElement>,
  ): void {
    if (
      event.key ===
      "Escape"
    ) {
      event.preventDefault();

      closeCart();

      return;
    }

    if (
      event.key !==
        "Tab" ||
      !drawerRef.current
    ) {
      return;
    }

    const focusableElements =
      getFocusableElements(
        drawerRef.current,
      );

    if (
      focusableElements.length ===
      0
    ) {
      event.preventDefault();

      return;
    }

    const firstElement =
      focusableElements[0];

    const lastElement =
      focusableElements[
        focusableElements.length -
          1
      ];

    const activeElement =
      document.activeElement;

    if (
      event.shiftKey &&
      activeElement ===
        firstElement
    ) {
      event.preventDefault();

      lastElement.focus();

      return;
    }

    if (
      !event.shiftKey &&
      activeElement ===
        lastElement
    ) {
      event.preventDefault();

      firstElement.focus();
    }
  }

  /* ------------------------------------------------------------------- */
  /* Closed State                                                        */
  /* ------------------------------------------------------------------- */

  if (
    !isCartOpen
  ) {
    return null;
  }

  /* ------------------------------------------------------------------- */
  /* Render                                                              */
  /* ------------------------------------------------------------------- */

  return (
    <div
      className="fixed inset-0 z-[100]"
      aria-label="Campaign cart overlay"
    >
      {/* --------------------------------------------------------------- */}
      {/* Backdrop                                                      */}
      {/* --------------------------------------------------------------- */}

      <button
        type="button"
        aria-label="Close campaign cart"
        onClick={
          closeCart
        }
        className={[
          "absolute inset-0",
          "cursor-default",
          "bg-black/82",
          "backdrop-blur-[7px]",
        ].join(" ")}
      />

      {/* --------------------------------------------------------------- */}
      {/* Drawer                                                         */}
      {/* --------------------------------------------------------------- */}

      <aside
        ref={
          drawerRef
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-heading"
        aria-describedby="cart-drawer-description"
        onKeyDown={
          handleDrawerKeyDown
        }
        className={[
          /*
           * MOBILE:
           * Full-screen cart.
           */
          "absolute inset-0",

          /*
           * TABLET/DESKTOP:
           * Premium right-side drawer.
           */
          "sm:inset-y-0",
          "sm:left-auto",
          "sm:right-0",
          "sm:w-full",
          "sm:max-w-[540px]",

          /*
           * Layout.
           */
          "flex min-h-0 flex-col",
          "overflow-hidden",

          /*
           * Appearance.
           */
          "bg-[linear-gradient(155deg,rgba(17,17,18,0.995),rgba(5,5,6,1))]",

          "sm:border-l",
          "sm:border-[rgba(227,179,77,0.18)]",
          "sm:shadow-[-30px_0_110px_rgba(0,0,0,0.68)]",
        ].join(" ")}
      >
        {/* ------------------------------------------------------------- */}
        {/* Background Atmosphere                                        */}
        {/* ------------------------------------------------------------- */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-36 h-[420px] w-[420px] rounded-full bg-[rgba(211,154,46,0.11)] blur-[130px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-36 -left-32 h-80 w-80 rounded-full bg-[rgba(184,124,32,0.045)] blur-[115px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.75),transparent)]"
        />

        {/* ------------------------------------------------------------- */}
        {/* Header                                                        */}
        {/* ------------------------------------------------------------- */}

        <header
          className={[
            "relative z-10",
            "flex flex-[0_0_auto]",
            "items-center justify-between gap-4",
            "border-b border-white/[0.065]",
            "bg-[rgba(7,7,8,0.82)]",
            "px-4",
            "pt-[max(14px,env(safe-area-inset-top))]",
            "pb-3.5",
            "backdrop-blur-xl",
            "sm:items-start",
            "sm:px-6",
            "sm:py-6",
          ].join(" ")}
        >
          <div className="flex min-w-0 items-center gap-3 sm:items-start sm:gap-4">
            <span
              className={[
                "grid h-10 w-10 flex-[0_0_40px] place-items-center",
                "rounded-[14px]",
                "border border-[rgba(227,179,77,0.22)]",
                "bg-[rgba(211,154,46,0.055)]",
                "text-[var(--mr-gold-200)]",
                "sm:h-12 sm:w-12 sm:flex-basis-[48px]",
                "sm:rounded-2xl",
              ].join(" ")}
            >
              <CartIcon />
            </span>

            <div className="min-w-0">
              <p className="m-0 hidden text-[9px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)] sm:block">
                Money Records Store
              </p>

              <h2
                id="cart-drawer-heading"
                className={[
                  "m-0 truncate",
                  "text-lg font-black",
                  "tracking-[-0.035em]",
                  "text-[var(--mr-text)]",
                  "sm:mt-1 sm:text-2xl",
                ].join(" ")}
              >
                Campaign Cart
              </h2>

              <p
                id="cart-drawer-description"
                className="mt-0.5 text-[10px] leading-5 text-white/34 sm:mt-1 sm:text-xs sm:text-white/38"
              >
                {isHydrated
                  ? `${itemCount} selected ${getServiceLabel(
                      itemCount,
                    )}`
                  : "Loading selected services"}
              </p>
            </div>
          </div>

          <button
            ref={
              closeButtonRef
            }
            type="button"
            aria-label="Close campaign cart"
            onClick={
              closeCart
            }
            className={[
              "grid h-10 w-10 flex-[0_0_40px] place-items-center",
              "rounded-full",
              "border border-white/[0.085]",
              "bg-white/[0.03]",
              "text-white/58",
              "transition duration-200",
              "hover:border-[rgba(227,179,77,0.28)]",
              "hover:bg-[rgba(211,154,46,0.065)]",
              "hover:text-[var(--mr-gold-200)]",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-[rgba(227,179,77,0.5)]",
              "sm:h-11 sm:w-11 sm:flex-basis-[44px]",
            ].join(" ")}
          >
            <CloseIcon />
          </button>
        </header>

        {/* ------------------------------------------------------------- */}
        {/* Scrollable Cart Content                                       */}
        {/* ------------------------------------------------------------- */}

        <div
          className={[
            "relative min-h-0 flex-1",
            "overflow-y-auto",
            "overscroll-contain",
            "px-3.5 py-4",
            "[scrollbar-width:thin]",
            "sm:px-5 sm:py-6",
          ].join(" ")}
        >
          {!isHydrated ? (
            <CartDrawerLoading />
          ) : isEmpty ? (
            <EmptyCartDrawer
              servicesHref={
                servicesHref
              }
            />
          ) : (
            <div className="grid gap-4 sm:gap-5">
              {/* ------------------------------------------------------- */}
              {/* Quick Metrics                                           */}
              {/* ------------------------------------------------------- */}

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <CartMetric
                  label="Services"
                  value={
                    itemCount
                  }
                />

                <CartMetric
                  label="Subtotal"
                  value={
                    subtotalLabel
                  }
                  featured
                />
              </div>

              {/* ------------------------------------------------------- */}
              {/* Selected Items                                          */}
              {/* ------------------------------------------------------- */}

              <section
                aria-labelledby="cart-drawer-items-heading"
              >
                <div className="mb-3 flex items-end justify-between gap-4 sm:mb-4">
                  <div>
                    <p className="m-0 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)] sm:text-[9px]">
                      Selected Campaigns
                    </p>

                    <h3
                      id="cart-drawer-items-heading"
                      className="mt-1 text-base font-black tracking-[-0.03em] text-[var(--mr-text)] sm:text-lg"
                    >
                      Your Services
                    </h3>
                  </div>

                  <span className="hidden min-h-8 items-center rounded-full border border-white/[0.075] bg-white/[0.025] px-3 text-[9px] font-black uppercase tracking-[0.12em] text-white/40 sm:inline-flex">
                    Quantity 1 Each
                  </span>
                </div>

                <div className="grid gap-3 sm:gap-4">
                  {items.map(
                    (
                      item,
                    ) => (
                      <CartItemCard
                        key={
                          item.sku
                        }
                        item={
                          item
                        }
                        compact
                        showDetails={
                          showItemDetails
                        }
                        showRemove
                      />
                    ),
                  )}
                </div>
              </section>

              {/* ------------------------------------------------------- */}
              {/* DESKTOP / TABLET SUMMARY                                */}
              {/* ------------------------------------------------------- */}

              <div className="hidden sm:block">
                <Divider
                  label="Order Summary"
                  variant="soft"
                  spacing="md"
                />

                <CartSummary
                  checkoutHref={
                    checkoutHref
                  }
                  checkoutLabel="Continue to Checkout"
                  continueShoppingHref={
                    servicesHref
                  }
                  continueShoppingLabel="Explore More Services"
                  showClearCart={
                    showClearCart
                  }
                  showStandards={
                    false
                  }
                  sticky={
                    false
                  }
                  title="Campaign Total"
                  subtitle="Review the selected services before secure campaign intake and payment."
                />

                <div className="mt-4">
                  <Button
                    href={
                      cartHref
                    }
                    variant="secondary"
                    size="lg"
                    rightIcon={
                      <ArrowIcon />
                    }
                    fullWidth
                  >
                    Open Full Campaign Cart
                  </Button>
                </div>

                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[rgba(227,179,77,0.16)] bg-[rgba(211,154,46,0.035)] p-4">
                  <span className="mt-0.5 flex-[0_0_auto] text-[var(--mr-gold-200)]">
                    <ShieldIcon />
                  </span>

                  <p className="m-0 text-[10px] leading-5 text-white/36">
                    Campaign availability,
                    trusted SKUs, prices,
                    currency, and checkout
                    totals are verified by
                    the server before payment.
                  </p>
                </div>
              </div>

              {/* ------------------------------------------------------- */}
              {/* Mobile breathing room                                   */}
              {/* ------------------------------------------------------- */}

              <div
                aria-hidden="true"
                className="h-1 sm:hidden"
              />
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Mobile Sticky Checkout Bar                                    */}
        {/* ------------------------------------------------------------- */}

        {isHydrated &&
        !isEmpty ? (
          <MobileCheckoutBar
            subtotalLabel={
              subtotalLabel
            }
            checkoutHref={
              checkoutHref
            }
            cartHref={
              cartHref
            }
            itemCount={
              itemCount
            }
          />
        ) : null}
      </aside>
    </div>
  );
}