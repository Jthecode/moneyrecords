// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Campaign Card                                         ┃
   ┃ File   : src/components/CampaignCard.tsx                              ┃
   ┃ Role   : Individual platform campaign product card                    ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  CSSProperties,
  ReactNode,
} from "react";

import AddToCartButton from "@/components/AddToCartButton";
import Button from "@/components/Button";
import Card from "@/components/Card";

import {
  getCampaignPriceLabel,
  type CampaignStatus,
  type MarketingCampaign,
} from "@/data/campaigns";

import {
  getPlatformBySlug,
  type MarketingPlatform,
} from "@/data/platforms";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type CampaignCardProps = {
  /**
   * Campaign product rendered by the card.
   */
  campaign:
    MarketingCampaign;

  /**
   * Optional platform override.
   *
   * Normally resolved automatically from campaign.platformSlug.
   */
  platform?:
    MarketingPlatform;

  /**
   * Optional campaign accent override.
   */
  accent?:
    string;

  /**
   * Optional soft campaign accent override.
   */
  accentSoft?:
    string;

  /**
   * Displays the add-to-cart action.
   *
   * @default true
   */
  showAddToCart?:
    boolean;

  /**
   * Displays the campaign-standard disclaimer.
   *
   * @default true
   */
  showDisclaimer?:
    boolean;

  /**
   * Maximum number of deliverables displayed.
   *
   * Mobile automatically hides deliverables beyond the first three.
   *
   * @default 4
   */
  deliverableLimit?:
    number;

  /**
   * Uses the shorter storefront / horizontal-scroller layout.
   *
   * @default false
   */
  compact?:
    boolean;

  /**
   * Cart-page destination used when the campaign is already selected.
   *
   * @default "/cart"
   */
  cartHref?:
    string;

  /**
   * Optional campaign-details destination override.
   */
  detailsHref?:
    string;

  /**
   * Optional add-to-cart label override.
   */
  addToCartLabel?:
    string;

  /**
   * Optional campaign-details label override.
   */
  detailsLabel?:
    string;

  /**
   * Opens the global cart drawer after adding the campaign.
   *
   * @default true
   */
  openCartOnAdd?:
    boolean;

  /**
   * Displays AddToCartButton feedback beneath the button.
   *
   * @default false
   */
  showCartMessage?:
    boolean;

  /**
   * Makes the card fill the available parent height.
   *
   * @default true
   */
  fullHeight?:
    boolean;

  /**
   * Optional additional wrapper classes.
   */
  className?:
    string;
};

type CampaignStyle =
  CSSProperties & {
    "--campaign-accent"?:
      string;

    "--campaign-accent-soft"?:
      string;

    "--campaign-border"?:
      string;
  };

type CampaignMetricProps = {
  icon:
    ReactNode;

  label:
    string;

  value:
    string;

  accent?:
    boolean;

  compact?:
    boolean;
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function ArrowIcon():
  ReactNode {
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

function CartIcon():
  ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
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

function CheckIcon():
  ReactNode {
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

function ClockIcon():
  ReactNode {
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

function TargetIcon():
  ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
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

function ShieldIcon():
  ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="15"
      height="15"
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

function LockIcon():
  ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
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

function sanitizeDeliverableLimit(
  value:
    number,

  compact:
    boolean,
): number {
  if (
    !Number.isFinite(
      value,
    )
  ) {
    return compact
      ? 2
      : 4;
  }

  const safeValue =
    Math.max(
      0,
      Math.floor(
        value,
      ),
    );

  if (
    compact
  ) {
    return Math.min(
      safeValue,
      2,
    );
  }

  return safeValue;
}

function getCampaignStatusLabel(
  status:
    CampaignStatus,

  purchasable:
    boolean,
): string {
  if (
    status ===
      "live" &&
    purchasable
  ) {
    return "Available";
  }

  switch (
    status
  ) {
    case "coming-soon":
      return "Coming Soon";

    case "paused":
      return "Temporarily Paused";

    case "custom":
      return "Custom Campaign";

    case "live":
    default:
      return "Unavailable";
  }
}

function getCampaignStatusClass(
  campaign:
    MarketingCampaign,
): string {
  if (
    campaign.featured
  ) {
    return "mr-badge mr-badge-featured";
  }

  if (
    campaign.status ===
      "live" &&
    campaign.purchasable
  ) {
    return "mr-badge mr-badge-success";
  }

  return "mr-badge mr-badge-dark";
}

/* --------------------------------------------------------------------- */
/* Campaign Target Mark                                                   */
/* --------------------------------------------------------------------- */

function CampaignTargetMark({
  target,
  compact,
}: {
  target:
    string;

  compact:
    boolean;
}) {
  return (
    <div
      className={joinClasses(
        "relative grid flex-[0_0_auto] place-items-center",
        "overflow-hidden border",
        "border-[var(--campaign-border)]",
        "bg-[var(--campaign-accent-soft)]",
        "shadow-[0_14px_40px_rgba(0,0,0,0.3)]",

        compact
          ? [
              "h-12",
              "min-w-12",
              "rounded-[15px]",
              "px-2",
            ].join(" ")
          : [
              "h-14",
              "min-w-14",
              "rounded-[18px]",
              "px-2.5",
              "sm:h-16",
              "sm:min-w-16",
            ].join(" "),
      )}
    >
      <span
        aria-hidden="true"
        className={[
          "absolute inset-x-2 top-0 h-px",
          "bg-[linear-gradient(90deg,transparent,var(--campaign-accent),transparent)]",
          "opacity-70",
        ].join(" ")}
      />

      <div className="relative text-center">
        <p
          className={joinClasses(
            "m-0 font-black leading-none",
            "tracking-[-0.04em]",
            "text-[var(--campaign-accent)]",

            compact
              ? "text-sm"
              : "text-base sm:text-lg",
          )}
        >
          {target}
        </p>

        {!compact ? (
          <p className="mt-1 text-[7px] font-black uppercase tracking-[0.1em] text-white/30">
            Target
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Campaign Metric                                                        */
/* --------------------------------------------------------------------- */

function CampaignMetric({
  icon,
  label,
  value,
  accent =
    false,
  compact =
    false,
}: CampaignMetricProps) {
  return (
    <div
      className={joinClasses(
        "min-w-0 rounded-[16px] border",

        compact
          ? "px-3 py-2.5"
          : "p-3 sm:p-3.5",

        accent
          ? [
              "border-[var(--campaign-border)]",
              "bg-[var(--campaign-accent-soft)]",
            ].join(" ")
          : [
              "border-white/[0.06]",
              "bg-white/[0.02]",
            ].join(" "),
      )}
    >
      <div
        className={joinClasses(
          "flex items-center gap-1.5",

          accent
            ? "text-[var(--campaign-accent)]"
            : "text-white/30",
        )}
      >
        {icon}

        <p className="m-0 truncate text-[7px] font-black uppercase tracking-[0.11em] text-white/28 sm:text-[8px]">
          {label}
        </p>
      </div>

      <p
        className={joinClasses(
          "truncate font-black tracking-[-0.02em]",
          "text-[var(--mr-text)]",

          compact
            ? "mt-1.5 text-xs"
            : "mt-2 text-sm",
        )}
      >
        {value}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Deliverable                                                            */
/* --------------------------------------------------------------------- */

function CampaignDeliverable({
  children,
  hiddenOnMobile =
    false,
}: {
  children:
    ReactNode;

  hiddenOnMobile?:
    boolean;
}) {
  return (
    <li
      className={joinClasses(
        "min-w-0 items-start gap-2.5",
        "text-[11px] leading-5 text-white/46",
        "sm:text-xs",

        hiddenOnMobile
          ? "hidden sm:flex"
          : "flex",
      )}
    >
      <span
        className={[
          "mt-0.5 grid h-[18px] w-[18px] flex-[0_0_18px]",
          "place-items-center rounded-full",
          "border border-[var(--campaign-border)]",
          "bg-[var(--campaign-accent-soft)]",
          "text-[var(--campaign-accent)]",
        ].join(" ")}
      >
        <CheckIcon />
      </span>

      <span className="min-w-0">
        {children}
      </span>
    </li>
  );
}

/* --------------------------------------------------------------------- */
/* Compact Disclaimer                                                     */
/* --------------------------------------------------------------------- */

function CampaignDisclaimer({
  compact,
}: {
  compact:
    boolean;
}) {
  return (
    <div
      className={joinClasses(
        "border-t border-white/[0.05]",

        compact
          ? "mt-3 pt-3"
          : "mt-4 pt-3.5",
      )}
    >
      <p
        className={joinClasses(
          "m-0 text-white/27",

          compact
            ? "text-[8px] leading-4"
            : "text-[9px] leading-4",
        )}
      >
        Campaign targets are estimated promotional reach or
        exposure—not guaranteed streams, followers, placements,
        revenue, or results.
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Campaign Card                                                          */
/* --------------------------------------------------------------------- */

export default function CampaignCard({
  campaign,

  platform:
    platformOverride,

  accent,

  accentSoft,

  showAddToCart =
    true,

  showDisclaimer =
    true,

  deliverableLimit =
    4,

  compact =
    false,

  cartHref =
    "/cart",

  detailsHref,

  addToCartLabel,

  detailsLabel,

  openCartOnAdd =
    true,

  showCartMessage =
    false,

  fullHeight =
    true,

  className,
}: CampaignCardProps) {
  /* ------------------------------------------------------------------- */
  /* Platform                                                            */
  /* ------------------------------------------------------------------- */

  const platform =
    platformOverride ??
    getPlatformBySlug(
      campaign.platformSlug,
    );

  /* ------------------------------------------------------------------- */
  /* Styling                                                             */
  /* ------------------------------------------------------------------- */

  const resolvedAccent =
    accent ??
    platform?.accent ??
    "#d6b35a";

  const resolvedAccentSoft =
    accentSoft ??
    platform?.accentSoft ??
    "rgba(214, 179, 90, 0.12)";

  const campaignStyle:
    CampaignStyle = {
      "--campaign-accent":
        resolvedAccent,

      "--campaign-accent-soft":
        resolvedAccentSoft,

      "--campaign-border":
        `color-mix(in srgb, ${resolvedAccent} 28%, transparent)`,
    };

  /* ------------------------------------------------------------------- */
  /* Destinations / Labels                                               */
  /* ------------------------------------------------------------------- */

  const resolvedDetailsHref =
    detailsHref ??
    campaign.href;

  const resolvedAddToCartLabel =
    addToCartLabel ??
    campaign.addToCartLabel ??
    "Add to Cart";

  const resolvedDetailsLabel =
    detailsLabel ??
    campaign.detailsLabel ??
    "View Campaign";

  /* ------------------------------------------------------------------- */
  /* State / Derived Data                                                */
  /* ------------------------------------------------------------------- */

  const isPurchasable =
    campaign.status ===
      "live" &&
    campaign.purchasable;

  const headingId =
    `${campaign.id}-campaign-heading`;

  const safeDeliverableLimit =
    sanitizeDeliverableLimit(
      deliverableLimit,
      compact,
    );

  const displayedDeliverables =
    campaign.deliverables.slice(
      0,
      safeDeliverableLimit,
    );

  const additionalDeliverableCount =
    Math.max(
      0,
      campaign.deliverables.length -
        displayedDeliverables.length,
    );

  const priceLabel =
    getCampaignPriceLabel(
      campaign,
    );

  const statusLabel =
    campaign.featured
      ? campaign.badge ??
        "Featured"
      : getCampaignStatusLabel(
          campaign.status,
          campaign.purchasable,
        );

  /* ------------------------------------------------------------------- */
  /* Render                                                              */
  /* ------------------------------------------------------------------- */

  return (
    <Card
      as="article"
      variant={
        campaign.featured
          ? "featured"
          : "campaign"
      }
      padding="none"
      hover
      fullHeight={
        fullHeight
      }
      topLine={
        campaign.featured
      }
      className={joinClasses(
        "group relative overflow-hidden",

        /*
         * Avoid giant mobile cards while maintaining enough structure
         * for equal-height service grids.
         */
        compact
          ? [
              "min-h-[390px]",
              "sm:min-h-[410px]",
            ].join(" ")
          : [
              "min-h-[470px]",
              "sm:min-h-[500px]",
              "lg:min-h-[520px]",
            ].join(" "),

        className,
      )}
      style={
        campaignStyle
      }
      aria-labelledby={
        headingId
      }
    >
      {/* --------------------------------------------------------------- */}
      {/* Campaign Accent Atmosphere                                      */}
      {/* --------------------------------------------------------------- */}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -right-20 -top-20",
          "h-56 w-56 rounded-full",
          "bg-[var(--campaign-accent)]",
          "opacity-[0.055]",
          "blur-[80px]",
          "transition-opacity duration-300",
          "group-hover:opacity-[0.11]",
        ].join(" ")}
      />

      {!compact ? (
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute -bottom-24 -left-20",
            "h-52 w-52 rounded-full",
            "bg-[var(--campaign-accent)]",
            "opacity-[0.025]",
            "blur-[85px]",
          ].join(" ")}
        />
      ) : null}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-8 top-0 h-px",
          "bg-[linear-gradient(90deg,transparent,var(--campaign-accent),transparent)]",
          campaign.featured
            ? "opacity-75"
            : "opacity-30",
        ].join(" ")}
      />

      {/* --------------------------------------------------------------- */}
      {/* Main Content                                                    */}
      {/* --------------------------------------------------------------- */}

      <div
        className={joinClasses(
          "relative flex h-full flex-col",

          compact
            ? "p-4 sm:p-5"
            : "p-5 sm:p-6",
        )}
      >
        {/* ------------------------------------------------------------- */}
        {/* Header                                                        */}
        {/* ------------------------------------------------------------- */}

        <div className="flex items-start justify-between gap-3">
          <CampaignTargetMark
            target={
              campaign.campaignTargetLabel
            }
            compact={
              compact
            }
          />

          <div className="flex min-w-0 flex-col items-end gap-1.5">
            <span
              className={joinClasses(
                getCampaignStatusClass(
                  campaign,
                ),

                "max-w-[145px] truncate",
              )}
            >
              {statusLabel}
            </span>

            {campaign.featured &&
            !compact ? (
              <span className="text-[7px] font-black uppercase tracking-[0.12em] text-white/22 sm:text-[8px]">
                Most Popular
              </span>
            ) : null}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Identity                                                      */}
        {/* ------------------------------------------------------------- */}

        <div
          className={
            compact
              ? "mt-4"
              : "mt-5"
          }
        >
          <p className="m-0 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--campaign-accent)] sm:text-[9px]">
            {campaign.eyebrow}
          </p>

          <h3
            id={
              headingId
            }
            className={joinClasses(
              "text-balance font-black leading-[1.06]",
              "tracking-[-0.038em]",
              "text-[var(--mr-text)]",
              "transition-colors duration-200",
              "group-hover:text-[var(--mr-gold-100)]",

              compact
                ? [
                    "mt-2",
                    "text-xl",
                    "sm:text-[1.35rem]",
                  ].join(" ")
                : [
                    "mt-2",
                    "text-[1.4rem]",
                    "sm:text-[1.55rem]",
                  ].join(" "),
            )}
          >
            {campaign.name}
          </h3>

          <p
            className={joinClasses(
              "mt-2.5 text-xs leading-5 text-white/43",
              "sm:text-sm sm:leading-6",

              compact
                ? "line-clamp-2"
                : "line-clamp-3",
            )}
          >
            {campaign.description}
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Price + Metrics                                               */}
        {/* ------------------------------------------------------------- */}

        <div
          className={joinClasses(
            "grid gap-2",

            compact
              ? "mt-4 grid-cols-2"
              : "mt-5 grid-cols-2",
          )}
        >
          <CampaignMetric
            icon={
              <TargetIcon />
            }
            label="Target"
            value={
              campaign.campaignTargetLabel
            }
            accent
            compact={
              compact
            }
          />

          <CampaignMetric
            icon={
              <ClockIcon />
            }
            label="Duration"
            value={
              campaign.estimatedDuration
            }
            compact={
              compact
            }
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Promotional Reach Notice                                      */}
        {/* ------------------------------------------------------------- */}

        {!compact ? (
          <div className="mt-3 rounded-[16px] border border-[var(--campaign-border)] bg-[var(--campaign-accent-soft)] px-3.5 py-3">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex-[0_0_auto] text-[var(--campaign-accent)]">
                <ShieldIcon />
              </span>

              <div className="min-w-0">
                <p className="m-0 text-[8px] font-black uppercase tracking-[0.12em] text-white/30">
                  {campaign.metricLabel}
                </p>

                <p className="mt-1.5 line-clamp-2 text-[10px] leading-5 text-white/43 sm:text-[11px]">
                  {campaign.reachStatement}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Deliverables                                                  */}
        {/* ------------------------------------------------------------- */}

        {displayedDeliverables.length >
        0 ? (
          <div
            className={
              compact
                ? "mt-4"
                : "mt-5"
            }
          >
            <div className="flex items-center justify-between gap-3">
              <p className="m-0 text-[8px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)] sm:text-[9px]">
                Included
              </p>

              {additionalDeliverableCount >
              0 ? (
                <span className="text-[7px] font-black uppercase tracking-[0.1em] text-white/24 sm:text-[8px]">
                  +
                  {
                    additionalDeliverableCount
                  }{" "}
                  More
                </span>
              ) : null}
            </div>

            <ul
              className={joinClasses(
                "grid list-none p-0",

                compact
                  ? "mt-2.5 gap-1.5"
                  : "mt-3 gap-2",
              )}
            >
              {displayedDeliverables.map(
                (
                  deliverable,
                  index,
                ) => (
                  <CampaignDeliverable
                    key={
                      deliverable
                    }
                    hiddenOnMobile={
                      !compact &&
                      index >= 3
                    }
                  >
                    {deliverable}
                  </CampaignDeliverable>
                ),
              )}
            </ul>
          </div>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Best For — Desktop / Full Cards Only                          */}
        {/* ------------------------------------------------------------- */}

        {!compact &&
        campaign.bestFor.length >
          0 ? (
          <div className="mt-4 hidden sm:block">
            <p className="m-0 text-[8px] font-black uppercase tracking-[0.13em] text-white/28">
              Best For
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {campaign.bestFor
                .slice(
                  0,
                  3,
                )
                .map(
                  (
                    item,
                  ) => (
                    <span
                      key={
                        item
                      }
                      className={[
                        "inline-flex min-h-7 items-center",
                        "rounded-full",
                        "border border-white/[0.065]",
                        "bg-white/[0.02]",
                        "px-2.5",
                        "text-[7px] font-bold uppercase",
                        "tracking-[0.09em]",
                        "text-white/35",
                      ].join(" ")}
                    >
                      {item}
                    </span>
                  ),
                )}
            </div>
          </div>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Price + Actions                                               */}
        {/* ------------------------------------------------------------- */}

        <div
          className={joinClasses(
            "mt-auto",

            compact
              ? "pt-4"
              : "pt-5",
          )}
        >
          {/* Divider */}

          <div className="h-px bg-white/[0.055]" />

          {/* Price */}

          <div
            className={joinClasses(
              "flex items-end justify-between gap-4",

              compact
                ? "mt-3"
                : "mt-4",
            )}
          >
            <div className="min-w-0">
              <p className="m-0 text-[7px] font-black uppercase tracking-[0.13em] text-white/28 sm:text-[8px]">
                One-Time Campaign
              </p>

              <p
                className={joinClasses(
                  "mt-1 font-black tracking-[-0.05em]",
                  "text-[var(--mr-text)]",

                  compact
                    ? "text-2xl"
                    : "text-[1.7rem] sm:text-3xl",
                )}
              >
                {priceLabel}
              </p>

              {!compact ? (
                <p className="mt-1 text-[7px] font-bold uppercase tracking-[0.1em] text-white/20 sm:text-[8px]">
                  No Subscription Required
                </p>
              ) : null}
            </div>

            <span
              className={joinClasses(
                "grid place-items-center rounded-full",
                "border border-[var(--campaign-border)]",
                "bg-[var(--campaign-accent-soft)]",
                "text-[var(--campaign-accent)]",

                compact
                  ? "h-9 w-9"
                  : "h-10 w-10",
              )}
            >
              {isPurchasable
                ? <CartIcon />
                : <LockIcon />}
            </span>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Actions                                                     */}
          {/* ----------------------------------------------------------- */}

          <div
            className={joinClasses(
              "grid gap-2.5",

              compact
                ? [
                    "mt-3",
                    showAddToCart
                      ? "grid-cols-[0.8fr_1.2fr]"
                      : "grid-cols-1",
                  ].join(" ")
                : [
                    "mt-4",
                    showAddToCart
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1",
                  ].join(" "),
            )}
          >
            <Button
              href={
                resolvedDetailsHref
              }
              variant="secondary"
              size="sm"
              rightIcon={
                compact
                  ? undefined
                  : <ArrowIcon />
              }
              fullWidth
            >
              {compact
                ? "Details"
                : resolvedDetailsLabel}
            </Button>

            {showAddToCart ? (
              isPurchasable ? (
                <AddToCartButton
                  sku={
                    campaign.sku
                  }
                  label={
                    resolvedAddToCartLabel
                  }
                  variant={
                    campaign.featured
                      ? "primary"
                      : "platform"
                  }
                  platformAccent={
                    campaign.featured
                      ? undefined
                      : resolvedAccent
                  }
                  size="sm"
                  fullWidth
                  cartHref={
                    cartHref
                  }
                  openCartOnAdd={
                    openCartOnAdd
                  }
                  navigateToCartWhenSelected
                  showMessage={
                    showCartMessage
                  }
                />
              ) : (
                <Button
                  variant="dark"
                  size="sm"
                  leftIcon={
                    <LockIcon />
                  }
                  disabled
                  fullWidth
                >
                  {compact
                    ? "Unavailable"
                    : getCampaignStatusLabel(
                        campaign.status,
                        campaign.purchasable,
                      )}
                </Button>
              )
            ) : null}
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Campaign Standard                                           */}
          {/* ----------------------------------------------------------- */}

          {showDisclaimer ? (
            <CampaignDisclaimer
              compact={
                compact
              }
            />
          ) : null}
        </div>
      </div>
    </Card>
  );
}