"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Cart Item Card                                       ┃
   ┃ File   : src/components/CartItemCard.tsx                             ┃
   ┃ Role   : Displays and removes a selected campaign from the cart      ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  CSSProperties,
  ReactNode,
} from "react";

import {
  useMemo,
  useState,
} from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { useCart } from "@/components/CartProvider";

import {
  formatCartPrice,
} from "@/lib/cart";

import type {
  CartItem,
} from "@/types/cart";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type CartItemCardProps = {
  /**
   * Trusted campaign item from CartProvider.
   */
  item: CartItem;

  /**
   * Displays the campaign-details button.
   *
   * @default true
   */
  showDetails?: boolean;

  /**
   * Displays the remove button.
   *
   * @default true
   */
  showRemove?: boolean;

  /**
   * Uses the compact cart-drawer layout.
   *
   * Compact mode is intentionally much shorter on phones.
   *
   * @default false
   */
  compact?: boolean;

  /**
   * Optional callback after the item is successfully removed.
   */
  onRemoved?: (
    item: CartItem,
  ) => void;

  /**
   * Optional wrapper classes.
   */
  className?: string;
};

type CartItemStyle =
  CSSProperties & {
    "--cart-item-accent"?: string;
    "--cart-item-accent-soft"?: string;
    "--cart-item-border"?: string;
  };

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

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

function TrashIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
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

function TargetIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="15"
      height="15"
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

function CheckIcon(): ReactNode {
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

function LockIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="14"
      height="14"
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

function AlertIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="15"
      height="15"
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

function getPlatformInitials(
  platformName: string,
): string {
  const words =
    platformName
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  if (
    words.length ===
    0
  ) {
    return "MR";
  }

  return words
    .slice(
      0,
      2,
    )
    .map(
      (
        word,
      ) =>
        word[0],
    )
    .join("")
    .toUpperCase();
}

function formatAddedDate(
  addedAt: string,
): string {
  const timestamp =
    Date.parse(
      addedAt,
    );

  if (
    Number.isNaN(
      timestamp,
    )
  ) {
    return "Recently";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month:
        "short",

      day:
        "numeric",
    },
  ).format(
    new Date(
      timestamp,
    ),
  );
}

/* --------------------------------------------------------------------- */
/* Platform Mark                                                          */
/* --------------------------------------------------------------------- */

function PlatformMark({
  initials,
  compact,
}: {
  initials: string;
  compact: boolean;
}) {
  return (
    <div
      className={joinClasses(
        "relative grid place-items-center overflow-hidden",
        "border border-[var(--cart-item-border)]",
        "bg-[var(--cart-item-accent-soft)]",
        "shadow-[0_12px_34px_rgba(0,0,0,0.3)]",

        compact
          ? [
              "h-11 w-11",
              "flex-[0_0_44px]",
              "rounded-[14px]",
            ].join(" ")
          : [
              "h-16 w-16",
              "flex-[0_0_64px]",
              "rounded-[20px]",
              "sm:h-[72px]",
              "sm:w-[72px]",
              "sm:flex-[0_0_72px]",
            ].join(" "),
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[var(--cart-item-accent)] opacity-20 blur-[28px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-2 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--cart-item-accent),transparent)] opacity-70"
      />

      <span
        className={joinClasses(
          "relative font-black tracking-[-0.05em]",
          "text-[var(--cart-item-accent)]",

          compact
            ? "text-base"
            : "text-xl sm:text-2xl",
        )}
      >
        {initials}
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Compact Meta Pill                                                      */
/* --------------------------------------------------------------------- */

function CompactMetaPill({
  icon,
  children,
  accent = false,
}: {
  icon?: ReactNode;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <span
      className={joinClasses(
        "inline-flex min-h-7 items-center gap-1.5",
        "rounded-full border px-2.5",
        "text-[8px] font-black uppercase tracking-[0.1em]",

        accent
          ? [
              "border-[var(--cart-item-border)]",
              "bg-[var(--cart-item-accent-soft)]",
              "text-[var(--cart-item-accent)]",
            ].join(" ")
          : [
              "border-white/[0.065]",
              "bg-white/[0.02]",
              "text-white/35",
            ].join(" "),
      )}
    >
      {icon ? (
        <span
          aria-hidden="true"
          className="flex-[0_0_auto]"
        >
          {icon}
        </span>
      ) : null}

      {children}
    </span>
  );
}

/* --------------------------------------------------------------------- */
/* Remove Button                                                          */
/* --------------------------------------------------------------------- */

function CompactRemoveButton({
  isRemoving,
  removeFailed,
  onClick,
  campaignName,
}: {
  isRemoving: boolean;
  removeFailed: boolean;
  onClick: () => void;
  campaignName: string;
}) {
  return (
    <button
      type="button"
      disabled={
        isRemoving
      }
      aria-busy={
        isRemoving
      }
      aria-label={`Remove ${campaignName} from campaign cart`}
      onClick={
        onClick
      }
      className={[
        "inline-flex min-h-10 items-center justify-center gap-2",
        "rounded-full",
        "border border-red-400/15",
        "bg-red-400/[0.025]",
        "px-3.5",
        "text-[8px] font-black uppercase tracking-[0.11em]",
        "text-red-200/70",
        "transition duration-200",
        "hover:border-red-400/30",
        "hover:bg-red-400/[0.06]",
        "hover:text-red-200",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-red-300/30",
      ].join(" ")}
    >
      {removeFailed
        ? <AlertIcon />
        : <TrashIcon />}

      <span>
        {isRemoving
          ? "Removing"
          : removeFailed
            ? "Try Again"
            : "Remove"}
      </span>
    </button>
  );
}

/* --------------------------------------------------------------------- */
/* Compact Cart Item                                                      */
/* --------------------------------------------------------------------- */

function CompactCartItem({
  item,
  platformInitials,
  priceLabel,
  addedDateLabel,
  showDetails,
  showRemove,
  isRemoving,
  removeFailed,
  feedbackMessage,
  onRemove,
}: {
  item: CartItem;
  platformInitials: string;
  priceLabel: string;
  addedDateLabel: string;
  showDetails: boolean;
  showRemove: boolean;
  isRemoving: boolean;
  removeFailed: boolean;
  feedbackMessage: string;
  onRemove: () => void;
}) {
  return (
    <div className="relative p-3.5 sm:p-4">
      {/* --------------------------------------------------------------- */}
      {/* Identity                                                        */}
      {/* --------------------------------------------------------------- */}

      <div className="flex items-start gap-3">
        <PlatformMark
          initials={
            platformInitials
          }
          compact
        />

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="m-0 truncate text-[8px] font-black uppercase tracking-[0.12em] text-[var(--cart-item-accent)]">
                {item.platformShortName}
              </p>

              <h2
                id={`${item.id}-cart-item-heading`}
                className={[
                  "mt-1.5 line-clamp-2",
                  "text-sm font-black leading-[1.2]",
                  "tracking-[-0.025em]",
                  "text-[var(--mr-text)]",
                  "sm:text-base",
                ].join(" ")}
              >
                {item.campaignName}
              </h2>
            </div>

            <div className="flex-[0_0_auto] text-right">
              <p className="m-0 text-base font-black tracking-[-0.035em] text-[var(--mr-text)]">
                {priceLabel}
              </p>

              <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.1em] text-white/24">
                One-Time
              </p>
            </div>
          </div>

          {/* Meta */}

          <div className="mt-3 flex flex-wrap gap-1.5">
            <CompactMetaPill
              icon={
                <TargetIcon />
              }
              accent
            >
              {item.campaignTargetLabel}
            </CompactMetaPill>

            <CompactMetaPill
              icon={
                <CheckIcon />
              }
            >
              Selected
            </CompactMetaPill>

            <CompactMetaPill>
              Added {addedDateLabel}
            </CompactMetaPill>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* Actions                                                         */}
      {/* --------------------------------------------------------------- */}

      {showDetails ||
      showRemove ? (
        <div
          className={joinClasses(
            "mt-3.5 grid gap-2",

            showDetails &&
            showRemove
              ? "grid-cols-2"
              : "grid-cols-1",
          )}
        >
          {showDetails ? (
            <Button
              href={
                item.campaignHref
              }
              variant="secondary"
              size="sm"
              rightIcon={
                <ArrowIcon />
              }
              fullWidth
            >
              Details
            </Button>
          ) : null}

          {showRemove ? (
            <CompactRemoveButton
              isRemoving={
                isRemoving
              }
              removeFailed={
                removeFailed
              }
              onClick={
                onRemove
              }
              campaignName={
                item.campaignName
              }
            />
          ) : null}
        </div>
      ) : null}

      {/* --------------------------------------------------------------- */}
      {/* Feedback                                                        */}
      {/* --------------------------------------------------------------- */}

      <p
        aria-live="polite"
        aria-atomic="true"
        className={
          feedbackMessage
            ? joinClasses(
                "mt-2.5 text-[10px] leading-5",

                removeFailed
                  ? "text-red-300/75"
                  : "text-white/38",
              )
            : "sr-only"
        }
      >
        {feedbackMessage}
      </p>

      {/* --------------------------------------------------------------- */}
      {/* Compact Trust Line                                              */}
      {/* --------------------------------------------------------------- */}

      <div className="mt-3 flex items-center gap-2 border-t border-white/[0.05] pt-3 text-[8px] font-bold uppercase tracking-[0.09em] text-white/22">
        <span className="text-[var(--cart-item-accent)]">
          <LockIcon />
        </span>

        Price verified again at checkout
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Full Cart Item                                                         */
/* --------------------------------------------------------------------- */

function FullCartItem({
  item,
  platformInitials,
  priceLabel,
  addedDateLabel,
  showDetails,
  showRemove,
  isRemoving,
  removeFailed,
  feedbackMessage,
  onRemove,
}: {
  item: CartItem;
  platformInitials: string;
  priceLabel: string;
  addedDateLabel: string;
  showDetails: boolean;
  showRemove: boolean;
  isRemoving: boolean;
  removeFailed: boolean;
  feedbackMessage: string;
  onRemove: () => void;
}) {
  return (
    <div className="relative p-5 sm:p-6 lg:p-7">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_190px] lg:items-start">
        {/* ------------------------------------------------------------- */}
        {/* Campaign Information                                          */}
        {/* ------------------------------------------------------------- */}

        <div className="min-w-0">
          <div className="flex items-start gap-4 sm:gap-5">
            <PlatformMark
              initials={
                platformInitials
              }
              compact={
                false
              }
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex min-h-7 items-center rounded-full border border-[var(--cart-item-border)] bg-[var(--cart-item-accent-soft)] px-3 text-[8px] font-black uppercase tracking-[0.13em] text-[var(--cart-item-accent)]">
                  {item.platformShortName}
                </span>

                <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full border border-white/[0.075] bg-white/[0.025] px-3 text-[8px] font-black uppercase tracking-[0.13em] text-white/40">
                  <CheckIcon />

                  Selected
                </span>
              </div>

              <h2
                id={`${item.id}-cart-item-heading`}
                className="mt-3 text-balance text-xl font-black leading-[1.08] tracking-[-0.035em] text-[var(--mr-text)] sm:text-2xl"
              >
                {item.campaignName}
              </h2>

              <p className="mt-2 text-xs leading-5 text-white/38">
                Added {addedDateLabel}
              </p>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Campaign Metadata                                           */}
          {/* ----------------------------------------------------------- */}

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {/* Target */}

            <div className="rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4">
              <div className="flex items-center gap-2 text-[var(--cart-item-accent)]">
                <TargetIcon />

                <p className="m-0 text-[9px] font-black uppercase tracking-[0.14em] text-white/35">
                  Campaign Target
                </p>
              </div>

              <p className="mt-3 text-base font-black text-[var(--mr-text)]">
                {item.campaignTargetLabel}
              </p>
            </div>

            {/* Type */}

            <div className="rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4">
              <div className="flex items-center gap-2 text-[var(--cart-item-accent)]">
                <LockIcon />

                <p className="m-0 text-[9px] font-black uppercase tracking-[0.14em] text-white/35">
                  Service Type
                </p>
              </div>

              <p className="mt-3 text-base font-black text-[var(--mr-text)]">
                One-Time
              </p>
            </div>

            {/* Price */}

            <div className="rounded-2xl border border-[var(--cart-item-border)] bg-[var(--cart-item-accent-soft)] p-4">
              <p className="m-0 text-[9px] font-black uppercase tracking-[0.14em] text-white/35">
                Campaign Price
              </p>

              <p className="mt-2 text-xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
                {priceLabel}
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Price / Actions                                               */}
        {/* ------------------------------------------------------------- */}

        <div className="border-t border-white/[0.06] pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.16em] text-white/32">
            Item Total
          </p>

          <p className="mt-2 text-3xl font-black tracking-[-0.055em] text-[var(--mr-text)]">
            {priceLabel}
          </p>

          <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.11em] text-white/25">
            Quantity Fixed at One
          </p>

          <div className="mt-5 grid gap-2.5">
            {showDetails ? (
              <Button
                href={
                  item.campaignHref
                }
                variant="secondary"
                size="sm"
                rightIcon={
                  <ArrowIcon />
                }
                fullWidth
              >
                View Campaign
              </Button>
            ) : null}

            {showRemove ? (
              <Button
                type="button"
                variant="dark"
                size="sm"
                leftIcon={
                  removeFailed
                    ? <AlertIcon />
                    : <TrashIcon />
                }
                disabled={
                  isRemoving
                }
                aria-busy={
                  isRemoving
                }
                onClick={
                  onRemove
                }
                fullWidth
                className={[
                  "border-red-400/15",
                  "text-red-200/75",
                  "hover:border-red-400/30",
                  "hover:bg-red-400/[0.06]",
                ].join(" ")}
              >
                {isRemoving
                  ? "Removing..."
                  : removeFailed
                    ? "Try Again"
                    : "Remove"}
              </Button>
            ) : null}
          </div>

          <p
            aria-live="polite"
            aria-atomic="true"
            className={
              feedbackMessage
                ? joinClasses(
                    "mt-3 text-xs leading-5",

                    removeFailed
                      ? "text-red-300/75"
                      : "text-white/42",
                  )
                : "sr-only"
            }
          >
            {feedbackMessage}
          </p>
        </div>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* Trusted Catalog Notice                                          */}
      {/* --------------------------------------------------------------- */}

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
        <span className="mt-0.5 flex-[0_0_auto] text-[var(--cart-item-accent)]">
          <LockIcon />
        </span>

        <p className="m-0 text-[10px] leading-5 text-white/35">
          This campaign is connected to a trusted Money Records catalog
          item. Its current availability and price will be verified again
          before checkout.
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Cart Item Card                                                         */
/* --------------------------------------------------------------------- */

export default function CartItemCard({
  item,

  showDetails =
    true,

  showRemove =
    true,

  compact =
    false,

  onRemoved,

  className,
}: CartItemCardProps) {
  const {
    removeItem,
  } =
    useCart();

  const [
    isRemoving,
    setIsRemoving,
  ] =
    useState(
      false,
    );

  const [
    feedbackMessage,
    setFeedbackMessage,
  ] =
    useState(
      "",
    );

  const [
    removeFailed,
    setRemoveFailed,
  ] =
    useState(
      false,
    );

  /* ------------------------------------------------------------------- */
  /* Styling                                                             */
  /* ------------------------------------------------------------------- */

  const style =
    useMemo<CartItemStyle>(
      () => ({
        "--cart-item-accent":
          item.accent,

        "--cart-item-accent-soft":
          item.accentSoft,

        "--cart-item-border":
          `color-mix(in srgb, ${item.accent} 28%, transparent)`,
      }),
      [
        item.accent,
        item.accentSoft,
      ],
    );

  /* ------------------------------------------------------------------- */
  /* Derived Data                                                        */
  /* ------------------------------------------------------------------- */

  const platformInitials =
    useMemo(
      () =>
        getPlatformInitials(
          item.platformShortName,
        ),
      [
        item.platformShortName,
      ],
    );

  const priceLabel =
    useMemo(
      () =>
        formatCartPrice(
          item.priceCents,
          item.currency,
        ),
      [
        item.currency,
        item.priceCents,
      ],
    );

  const addedDateLabel =
    useMemo(
      () =>
        formatAddedDate(
          item.addedAt,
        ),
      [
        item.addedAt,
      ],
    );

  /* ------------------------------------------------------------------- */
  /* Remove Item                                                         */
  /* ------------------------------------------------------------------- */

  function handleRemove(): void {
    if (
      isRemoving
    ) {
      return;
    }

    setIsRemoving(
      true,
    );

    setRemoveFailed(
      false,
    );

    setFeedbackMessage(
      "",
    );

    try {
      const result =
        removeItem(
          item.sku,
        );

      setFeedbackMessage(
        result.message,
      );

      if (
        result.ok
      ) {
        onRemoved?.(
          item,
        );

        return;
      }

      setRemoveFailed(
        true,
      );
    } catch {
      setRemoveFailed(
        true,
      );

      setFeedbackMessage(
        "The campaign could not be removed. Please try again.",
      );
    } finally {
      setIsRemoving(
        false,
      );
    }
  }

  /* ------------------------------------------------------------------- */
  /* Render                                                              */
  /* ------------------------------------------------------------------- */

  return (
    <Card
      as="article"
      variant="campaign"
      padding="none"
      className={joinClasses(
        "group relative overflow-hidden",

        /*
         * Compact cards stay intentionally restrained because they are
         * primarily used inside the mobile cart drawer.
         */
        compact &&
          "rounded-[20px]",

        className,
      )}
      style={
        style
      }
      aria-labelledby={`${item.id}-cart-item-heading`}
    >
      {/* --------------------------------------------------------------- */}
      {/* Platform Atmosphere                                             */}
      {/* --------------------------------------------------------------- */}

      <div
        aria-hidden="true"
        className={joinClasses(
          "pointer-events-none absolute",
          "rounded-full",
          "bg-[var(--cart-item-accent)]",
          "transition-opacity duration-300",
          "group-hover:opacity-[0.11]",

          compact
            ? [
                "-right-20",
                "-top-20",
                "h-48",
                "w-48",
                "opacity-[0.055]",
                "blur-[70px]",
              ].join(" ")
            : [
                "-right-24",
                "-top-24",
                "h-72",
                "w-72",
                "opacity-[0.075]",
                "blur-[90px]",
              ].join(" "),
        )}
      />

      {!compact ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-[var(--cart-item-accent)] opacity-[0.03] blur-[85px]"
        />
      ) : null}

      <div
        aria-hidden="true"
        className={joinClasses(
          "pointer-events-none absolute top-0 h-px",
          "bg-[linear-gradient(90deg,transparent,var(--cart-item-accent),transparent)]",

          compact
            ? "inset-x-6 opacity-45"
            : "inset-x-8 opacity-60",
        )}
      />

      {/* --------------------------------------------------------------- */}
      {/* Layout                                                          */}
      {/* --------------------------------------------------------------- */}

      {compact ? (
        <CompactCartItem
          item={
            item
          }
          platformInitials={
            platformInitials
          }
          priceLabel={
            priceLabel
          }
          addedDateLabel={
            addedDateLabel
          }
          showDetails={
            showDetails
          }
          showRemove={
            showRemove
          }
          isRemoving={
            isRemoving
          }
          removeFailed={
            removeFailed
          }
          feedbackMessage={
            feedbackMessage
          }
          onRemove={
            handleRemove
          }
        />
      ) : (
        <FullCartItem
          item={
            item
          }
          platformInitials={
            platformInitials
          }
          priceLabel={
            priceLabel
          }
          addedDateLabel={
            addedDateLabel
          }
          showDetails={
            showDetails
          }
          showRemove={
            showRemove
          }
          isRemoving={
            isRemoving
          }
          removeFailed={
            removeFailed
          }
          feedbackMessage={
            feedbackMessage
          }
          onRemove={
            handleRemove
          }
        />
      )}
    </Card>
  );
}