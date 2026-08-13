"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Mobile Bottom Navigation                             ┃
   ┃ File   : src/components/MobileBottomBar.tsx                          ┃
   ┃ Role   : Mobile services, submissions, and campaign-cart navigation  ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  useMemo,
  type ReactNode,
} from "react";

import { useUI } from "@/app/providers";
import { useCart } from "@/components/CartProvider";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type MobileBottomBarItem = {
  label: string;

  href: string;

  icon: ReactNode;

  /**
   * When true, this route and any nested route beneath it are considered
   * active.
   */
  matchPrefix?: boolean;
};

/* --------------------------------------------------------------------- */
/* Constants                                                              */
/* --------------------------------------------------------------------- */

/**
 * Routes where the mobile bottom navigation should not appear.
 *
 * These experiences need the full mobile viewport and/or have their own
 * checkout controls.
 */
const HIDDEN_ROUTES = [
  "/cart",
  "/checkout",
] as const;

/**
 * Some pages can benefit from the bottom bar but should not show it while
 * rendered inside API or special framework paths.
 */
const HIDDEN_PREFIXES = [
  "/api/",
] as const;

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function CampaignIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <path
        d="M4 11V14C4 15.1 4.9 16 6 16H8L17 20V5L8 9H6C4.9 9 4 9.9 4 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M8 16L9.5 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M20 9V16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SubmitIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <path
        d="M9 18V7L18 5V16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="6.5"
        cy="18"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="15.5"
        cy="16"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CartIcon(): ReactNode {
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

function normalizePathname(
  pathname: string,
): string {
  if (
    pathname.length > 1 &&
    pathname.endsWith("/")
  ) {
    return pathname.replace(
      /\/+$/,
      "",
    );
  }

  return pathname || "/";
}

function isRouteActive(
  pathname: string,
  item: MobileBottomBarItem,
): boolean {
  const normalizedPathname =
    normalizePathname(
      pathname,
    );

  const normalizedHref =
    normalizePathname(
      item.href,
    );

  if (
    item.matchPrefix
  ) {
    return (
      normalizedPathname ===
        normalizedHref ||
      normalizedPathname.startsWith(
        `${normalizedHref}/`,
      )
    );
  }

  return normalizedPathname ===
    normalizedHref;
}

function shouldHideBottomBar(
  pathname: string,
): boolean {
  const normalizedPathname =
    normalizePathname(
      pathname,
    );

  const hiddenExactOrNested =
    HIDDEN_ROUTES.some(
      (route) =>
        normalizedPathname ===
          route ||
        normalizedPathname.startsWith(
          `${route}/`,
        ),
    );

  if (
    hiddenExactOrNested
  ) {
    return true;
  }

  return HIDDEN_PREFIXES.some(
    (prefix) =>
      normalizedPathname.startsWith(
        prefix,
      ),
  );
}

function getVisibleCartCount(
  itemCount: number,
  isHydrated: boolean,
): number {
  if (
    !isHydrated ||
    !Number.isFinite(
      itemCount,
    ) ||
    itemCount <= 0
  ) {
    return 0;
  }

  return Math.floor(
    itemCount,
  );
}

function getCartCountLabel(
  itemCount: number,
): string {
  if (
    itemCount > 99
  ) {
    return "99+";
  }

  return String(
    itemCount,
  );
}

/* --------------------------------------------------------------------- */
/* Mobile Link                                                            */
/* --------------------------------------------------------------------- */

function MobileNavLink({
  item,
  active,
}: {
  item: MobileBottomBarItem;
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      aria-current={
        active
          ? "page"
          : undefined
      }
      className={joinClasses(
        "group relative flex min-w-0 flex-1 flex-col items-center justify-center",
        "gap-1.5 rounded-[18px] px-2 py-2.5",
        "transition duration-200",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[rgba(227,179,77,0.5)]",

        active
          ? [
              "bg-[rgba(211,154,46,0.075)]",
              "text-[var(--mr-gold-100)]",
            ].join(" ")
          : [
              "text-white/46",
              "hover:bg-white/[0.03]",
              "hover:text-[var(--mr-gold-200)]",
            ].join(" "),
      )}
    >
      {active ? (
        <span
          aria-hidden="true"
          className={[
            "absolute left-1/2 top-0",
            "h-[2px] w-7",
            "-translate-x-1/2",
            "rounded-full",
            "bg-[var(--mr-gold-300)]",
            "shadow-[0_0_14px_rgba(227,179,77,0.55)]",
          ].join(" ")}
        />
      ) : null}

      <span
        className={joinClasses(
          "grid h-7 w-7 place-items-center",
          "transition duration-200",

          active
            ? "text-[var(--mr-gold-200)]"
            : "text-white/42 group-hover:text-[var(--mr-gold-200)]",
        )}
      >
        {item.icon}
      </span>

      <span
        className={joinClasses(
          "truncate text-[8px] font-black uppercase tracking-[0.12em]",

          active
            ? "text-[var(--mr-gold-100)]"
            : "text-white/42",
        )}
      >
        {item.label}
      </span>
    </Link>
  );
}

/* --------------------------------------------------------------------- */
/* Cart Button                                                            */
/* --------------------------------------------------------------------- */

function MobileCartButton({
  itemCount,
  isHydrated,
  isOpen,
  onClick,
}: {
  itemCount: number;
  isHydrated: boolean;
  isOpen: boolean;
  onClick: () => void;
}) {
  const visibleCount =
    getVisibleCartCount(
      itemCount,
      isHydrated,
    );

  const hasItems =
    visibleCount > 0;

  const countLabel =
    getCartCountLabel(
      visibleCount,
    );

  return (
    <button
      type="button"
      aria-label={
        isOpen
          ? "Close campaign cart"
          : hasItems
            ? `Open campaign cart with ${visibleCount} selected ${
                visibleCount === 1
                  ? "service"
                  : "services"
              }`
            : "Open campaign cart"
      }
      aria-expanded={
        isOpen
      }
      aria-haspopup="dialog"
      onClick={onClick}
      className={joinClasses(
        "group relative flex min-w-0 flex-1 flex-col items-center justify-center",
        "gap-1.5 rounded-[18px] px-2 py-2.5",
        "transition duration-200",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[rgba(227,179,77,0.5)]",

        isOpen
          ? [
              "bg-[rgba(211,154,46,0.075)]",
              "text-[var(--mr-gold-100)]",
            ].join(" ")
          : [
              "text-white/46",
              "hover:bg-white/[0.03]",
              "hover:text-[var(--mr-gold-200)]",
            ].join(" "),
      )}
    >
      {isOpen ? (
        <span
          aria-hidden="true"
          className={[
            "absolute left-1/2 top-0",
            "h-[2px] w-7",
            "-translate-x-1/2",
            "rounded-full",
            "bg-[var(--mr-gold-300)]",
            "shadow-[0_0_14px_rgba(227,179,77,0.55)]",
          ].join(" ")}
        />
      ) : null}

      <span className="relative grid h-7 w-7 place-items-center">
        <span
          className={joinClasses(
            "transition duration-200",

            isOpen
              ? "text-[var(--mr-gold-200)]"
              : "text-white/42 group-hover:text-[var(--mr-gold-200)]",
          )}
        >
          <CartIcon />
        </span>

        {hasItems ? (
          <span
            aria-hidden="true"
            className={[
              "absolute -right-3 -top-2",
              "grid min-h-5 min-w-5 place-items-center",
              "rounded-full",
              "border border-black/70",
              "bg-[var(--mr-gold-300)]",
              "px-1",
              "text-[7px] font-black leading-none text-black",
              "shadow-[0_4px_16px_rgba(0,0,0,0.45)]",
            ].join(" ")}
          >
            {countLabel}
          </span>
        ) : null}
      </span>

      <span
        className={joinClasses(
          "truncate text-[8px] font-black uppercase tracking-[0.12em]",

          isOpen
            ? "text-[var(--mr-gold-100)]"
            : "text-white/42",
        )}
      >
        Cart
      </span>
    </button>
  );
}

/* --------------------------------------------------------------------- */
/* Component                                                              */
/* --------------------------------------------------------------------- */

export default function MobileBottomBar() {
  const pathname =
    usePathname();

  const {
    isCartOpen,
    toggleCart,
  } =
    useUI();

  const {
    itemCount,
    isHydrated,
  } =
    useCart();

  const items =
    useMemo<
      readonly MobileBottomBarItem[]
    >(
      () => [
        {
          label:
            "Services",

          href:
            "/services",

          icon:
            <CampaignIcon />,

          matchPrefix:
            true,
        },

        {
          label:
            "Submit Music",

          href:
            "/submit-music",

          icon:
            <SubmitIcon />,

          matchPrefix:
            true,
        },
      ],
      [],
    );

  const hidden =
    shouldHideBottomBar(
      pathname,
    );

  if (
    hidden
  ) {
    return null;
  }

  return (
    <>
      {/* --------------------------------------------------------------- */}
      {/* Content Spacer                                                  */}
      {/* --------------------------------------------------------------- */}

      {/*
       * Keeps normal page content from being hidden behind the fixed
       * navigation bar.
       *
       * Desktop receives no spacer because the bar disappears at md.
       */}
      <div
        aria-hidden="true"
        className="h-[calc(var(--mr-mobile-bottom-height,76px)+env(safe-area-inset-bottom))] md:hidden"
      />

      {/* --------------------------------------------------------------- */}
      {/* Fixed Mobile Navigation                                         */}
      {/* --------------------------------------------------------------- */}

      <nav
        aria-label="Mobile quick navigation"
        className={[
          "fixed inset-x-0 bottom-0 z-[70]",
          "md:hidden",
          "border-t border-[rgba(227,179,77,0.14)]",
          "bg-[rgba(5,5,6,0.92)]",
          "shadow-[0_-18px_60px_rgba(0,0,0,0.48)]",
          "backdrop-blur-2xl",
          "supports-[backdrop-filter]:bg-[rgba(5,5,6,0.82)]",
        ].join(" ")}
      >
        {/* ------------------------------------------------------------- */}
        {/* Gold Top Highlight                                            */}
        {/* ------------------------------------------------------------- */}

        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-x-[15%] top-0",
            "h-px",
            "bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.55),transparent)]",
          ].join(" ")}
        />

        {/* ------------------------------------------------------------- */}
        {/* Background Glow                                               */}
        {/* ------------------------------------------------------------- */}

        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute bottom-[-80px] left-1/2",
            "h-40 w-[80%]",
            "-translate-x-1/2",
            "rounded-full",
            "bg-[rgba(211,154,46,0.055)]",
            "blur-[60px]",
          ].join(" ")}
        />

        {/* ------------------------------------------------------------- */}
        {/* Navigation Content                                            */}
        {/* ------------------------------------------------------------- */}

        <div
          className={[
            "relative mx-auto",
            "w-full max-w-lg",
            "px-3 pt-2",
            "pb-[max(8px,env(safe-area-inset-bottom))]",
          ].join(" ")}
        >
          <div className="grid grid-cols-3 gap-1 rounded-[22px] border border-white/[0.055] bg-white/[0.018] p-1">
            {/* Services */}

            <MobileNavLink
              item={
                items[0]
              }
              active={
                isRouteActive(
                  pathname,
                  items[0],
                )
              }
            />

            {/* Submit Music */}

            <MobileNavLink
              item={
                items[1]
              }
              active={
                isRouteActive(
                  pathname,
                  items[1],
                )
              }
            />

            {/* Cart */}

            <MobileCartButton
              itemCount={
                itemCount
              }
              isHydrated={
                isHydrated
              }
              isOpen={
                isCartOpen
              }
              onClick={
                toggleCart
              }
            />
          </div>
        </div>
      </nav>
    </>
  );
}