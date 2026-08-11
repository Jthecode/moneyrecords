"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Cart Drawer                                           ┃
   ┃ File   : src/components/CartDrawer.tsx                                ┃
   ┃ Role   : Global campaign-cart overlay, items, totals, and navigation  ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  useEffect,
  useMemo,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { usePathname } from "next/navigation";

import { useUI } from "@/app/providers";
import Button from "@/components/Button";
import CartItemCard from "@/components/CartItemCard";
import CartSummary from "@/components/CartSummary";
import { useCart } from "@/components/CartProvider";
import Divider from "@/components/Divider";

import { formatCartPrice } from "@/lib/cart";

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
   * Displays the clear-cart action in the summary.
   *
   * @default true
   */
  showClearCart?: boolean;
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function CartIcon() {
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

function CloseIcon() {
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

function ShieldIcon() {
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

/* --------------------------------------------------------------------- */
/* Helpers                                                                */
/* --------------------------------------------------------------------- */

function getServiceLabel(count: number): string {
  return count === 1 ? "service" : "services";
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (element) =>
      element.getAttribute("aria-hidden") !== "true" &&
      !element.hasAttribute("hidden"),
  );
}

/* --------------------------------------------------------------------- */
/* Loading State                                                          */
/* --------------------------------------------------------------------- */

function CartDrawerLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading campaign cart"
      className="grid gap-4"
    >
      {[1, 2].map((placeholder) => (
        <div
          key={placeholder}
          className="rounded-[24px] border border-white/[0.065] bg-white/[0.025] p-5"
        >
          <div className="animate-pulse">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 flex-[0_0_56px] rounded-[18px] bg-white/[0.065]" />

              <div className="min-w-0 flex-1">
                <div className="h-3 w-20 rounded-full bg-white/[0.065]" />
                <div className="mt-4 h-6 w-4/5 rounded-lg bg-white/[0.065]" />
                <div className="mt-3 h-3 w-28 rounded-full bg-white/[0.04]" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="h-16 rounded-2xl bg-white/[0.04]" />
              <div className="h-16 rounded-2xl bg-white/[0.04]" />
            </div>
          </div>
        </div>
      ))}
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
    <div className="flex min-h-[55vh] items-center justify-center px-2 py-10">
      <div className="mx-auto max-w-sm text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-[24px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <CartIcon />
        </span>

        <p className="mt-7 text-[10px] font-black uppercase tracking-[0.19em] text-[var(--mr-gold-200)]">
          Campaign Cart
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
          Your Cart Is Empty
        </h2>

        <p className="mt-4 text-sm leading-7 text-white/46">
          Explore the Money Records marketing storefront and choose the
          platform campaign that fits your release.
        </p>

        <Button
          href={servicesHref}
          variant="primary"
          size="lg"
          rightIcon={<ArrowIcon />}
          className="mt-7"
          fullWidth
        >
          Explore Marketing Services
        </Button>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Cart Drawer                                                            */
/* --------------------------------------------------------------------- */

export default function CartDrawer({
  cartHref = "/cart",
  checkoutHref = "/checkout",
  servicesHref = "/services",
  showItemDetails = true,
  showClearCart = true,
}: CartDrawerProps) {
  const pathname = usePathname();

  const {
    isCartOpen,
    closeCart,
  } = useUI();

  const {
    items,
    itemCount,
    subtotalCents,
    currency,
    isHydrated,
    isEmpty,
  } = useCart();

  const drawerRef =
    useRef<HTMLElement | null>(null);

  const closeButtonRef =
    useRef<HTMLButtonElement | null>(null);

  const previouslyFocusedElementRef =
    useRef<HTMLElement | null>(null);

  const previousPathnameRef =
    useRef(pathname);

  const subtotalLabel = useMemo(
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
    if (!isCartOpen) {
      return;
    }

    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const frame =
      window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });

    return () => {
      window.cancelAnimationFrame(frame);

      previouslyFocusedElementRef.current?.focus?.();
      previouslyFocusedElementRef.current = null;
    };
  }, [isCartOpen]);

  /* ------------------------------------------------------------------- */
  /* Keyboard Focus Trap                                                 */
  /* ------------------------------------------------------------------- */

  function handleDrawerKeyDown(
    event: ReactKeyboardEvent<HTMLElement>,
  ): void {
    if (
      event.key !== "Tab" ||
      !drawerRef.current
    ) {
      return;
    }

    const focusableElements =
      getFocusableElements(
        drawerRef.current,
      );

    if (
      focusableElements.length === 0
    ) {
      event.preventDefault();
      return;
    }

    const firstElement =
      focusableElements[0];

    const lastElement =
      focusableElements[
        focusableElements.length - 1
      ];

    const activeElement =
      document.activeElement;

    if (
      event.shiftKey &&
      activeElement === firstElement
    ) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (
      !event.shiftKey &&
      activeElement === lastElement
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  /* ------------------------------------------------------------------- */
  /* Closed State                                                        */
  /* ------------------------------------------------------------------- */

  if (!isCartOpen) {
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
      {/* Backdrop */}

      <button
        type="button"
        aria-label="Close campaign cart"
        onClick={closeCart}
        className="absolute inset-0 cursor-default bg-black/78 backdrop-blur-[6px]"
      />

      {/* Drawer */}

      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-heading"
        aria-describedby="cart-drawer-description"
        onKeyDown={handleDrawerKeyDown}
        className={[
          "absolute bottom-0 right-0 top-0",
          "flex w-full max-w-[540px] flex-col",
          "overflow-hidden",
          "border-l border-[rgba(227,179,77,0.18)]",
          "bg-[linear-gradient(155deg,rgba(17,17,18,0.99),rgba(5,5,6,1))]",
          "shadow-[-30px_0_110px_rgba(0,0,0,0.68)]",
        ].join(" ")}
      >
        {/* Gold atmosphere */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-36 h-[420px] w-[420px] rounded-full bg-[rgba(211,154,46,0.12)] blur-[130px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-36 -left-32 h-80 w-80 rounded-full bg-[rgba(184,124,32,0.05)] blur-[115px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.75),transparent)]"
        />

        {/* ------------------------------------------------------------- */}
        {/* Header                                                        */}
        {/* ------------------------------------------------------------- */}

        <header className="relative flex flex-[0_0_auto] items-start justify-between gap-5 border-b border-white/[0.065] px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex min-w-0 items-start gap-4">
            <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
              <CartIcon />
            </span>

            <div className="min-w-0">
              <p className="m-0 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                Money Records Store
              </p>

              <h2
                id="cart-drawer-heading"
                className="mt-1 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)] sm:text-2xl"
              >
                Campaign Cart
              </h2>

              <p
                id="cart-drawer-description"
                className="mt-1 text-xs leading-5 text-white/38"
              >
                {isHydrated
                  ? `${itemCount} selected ${getServiceLabel(itemCount)}`
                  : "Loading selected services"}
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close campaign cart"
            onClick={closeCart}
            className={[
              "grid h-11 w-11 flex-[0_0_44px] place-items-center rounded-full",
              "border border-white/[0.09] bg-white/[0.035]",
              "text-white/60 transition",
              "hover:border-[rgba(227,179,77,0.28)]",
              "hover:bg-[rgba(211,154,46,0.065)]",
              "hover:text-[var(--mr-gold-200)]",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-[rgba(227,179,77,0.5)]",
            ].join(" ")}
          >
            <CloseIcon />
          </button>
        </header>

        {/* ------------------------------------------------------------- */}
        {/* Cart Content                                                  */}
        {/* ------------------------------------------------------------- */}

        <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-5 sm:py-6">
          {!isHydrated ? (
            <CartDrawerLoading />
          ) : isEmpty ? (
            <EmptyCartDrawer
              servicesHref={servicesHref}
            />
          ) : (
            <div className="grid gap-5">
              {/* Compact totals */}

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <p className="m-0 text-[9px] font-black uppercase tracking-[0.14em] text-white/35">
                    Selected Services
                  </p>

                  <p className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                    {itemCount}
                  </p>
                </div>

                <div className="rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] p-4">
                  <p className="m-0 text-[9px] font-black uppercase tracking-[0.14em] text-white/35">
                    Subtotal
                  </p>

                  <p className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                    {subtotalLabel}
                  </p>
                </div>
              </div>

              {/* Selected items */}

              <section
                aria-labelledby="cart-drawer-items-heading"
              >
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                      Selected Campaigns
                    </p>

                    <h3
                      id="cart-drawer-items-heading"
                      className="mt-1 text-lg font-black tracking-[-0.03em] text-[var(--mr-text)]"
                    >
                      Your Services
                    </h3>
                  </div>

                  <span className="inline-flex min-h-8 items-center rounded-full border border-white/[0.075] bg-white/[0.025] px-3 text-[9px] font-black uppercase tracking-[0.12em] text-white/40">
                    Quantity 1 Each
                  </span>
                </div>

                <div className="grid gap-4">
                  {items.map((item) => (
                    <CartItemCard
                      key={item.sku}
                      item={item}
                      compact
                      showDetails={
                        showItemDetails
                      }
                      showRemove
                    />
                  ))}
                </div>
              </section>

              <Divider
                label="Order Summary"
                variant="soft"
                spacing="md"
              />

              {/* Existing trusted cart summary */}

              <CartSummary
                checkoutHref={checkoutHref}
                checkoutLabel="Continue to Checkout"
                continueShoppingHref={servicesHref}
                continueShoppingLabel="Explore More Services"
                showClearCart={showClearCart}
                showStandards={false}
                sticky={false}
                title="Campaign Total"
                subtitle="Review the selected services before secure campaign intake and payment."
              />

              <Button
                href={cartHref}
                variant="secondary"
                size="lg"
                rightIcon={<ArrowIcon />}
                fullWidth
              >
                Open Full Campaign Cart
              </Button>

              <div className="flex items-start gap-3 rounded-2xl border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.04)] p-4">
                <span className="mt-0.5 flex-[0_0_auto] text-[var(--mr-gold-200)]">
                  <ShieldIcon />
                </span>

                <p className="m-0 text-[10px] leading-5 text-white/38">
                  Campaign availability, trusted SKUs, prices, currency, and
                  checkout totals will be verified again by the server before
                  payment.
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}