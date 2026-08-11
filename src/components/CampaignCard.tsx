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
import Divider from "@/components/Divider";

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
  campaign: MarketingCampaign;

  /**
   * Optional platform override.
   *
   * The component normally resolves the platform automatically using
   * campaign.platformSlug.
   */
  platform?: MarketingPlatform;

  /**
   * Optional campaign accent override.
   */
  accent?: string;

  /**
   * Optional soft campaign accent override.
   */
  accentSoft?: string;

  /**
   * Displays the add-to-cart action.
   *
   * @default true
   */
  showAddToCart?: boolean;

  /**
   * Displays the compact campaign-standard disclaimer.
   *
   * @default true
   */
  showDisclaimer?: boolean;

  /**
   * Displays up to this many deliverables.
   *
   * @default 4
   */
  deliverableLimit?: number;

  /**
   * Cart-page destination used when the campaign is already selected.
   *
   * @default "/cart"
   */
  cartHref?: string;

  /**
   * Optional campaign-details destination override.
   */
  detailsHref?: string;

  /**
   * Optional add-to-cart label override.
   */
  addToCartLabel?: string;

  /**
   * Optional campaign-details label override.
   */
  detailsLabel?: string;

  /**
   * Opens the global cart drawer after adding the campaign.
   *
   * @default true
   */
  openCartOnAdd?: boolean;

  /**
   * Displays add-to-cart feedback beneath the button.
   *
   * @default false
   */
  showCartMessage?: boolean;

  /**
   * Makes the campaign card fill its parent height.
   *
   * @default true
   */
  fullHeight?: boolean;

  className?: string;
};

type CampaignStyle = CSSProperties & {
  "--campaign-accent"?: string;
  "--campaign-accent-soft"?: string;
  "--campaign-border"?: string;
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

function CartIcon() {
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

function ClockIcon() {
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

function TargetIcon() {
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

function ShieldIcon() {
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

function LockIcon() {
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
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

function getCampaignStatusLabel(
  status: CampaignStatus,
  purchasable: boolean,
): string {
  if (
    status === "live" &&
    purchasable
  ) {
    return "Available";
  }

  switch (status) {
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
  campaign: MarketingCampaign,
): string {
  if (campaign.featured) {
    return "mr-badge mr-badge-featured";
  }

  if (
    campaign.status === "live" &&
    campaign.purchasable
  ) {
    return "mr-badge mr-badge-success";
  }

  return "mr-badge mr-badge-dark";
}

/* --------------------------------------------------------------------- */
/* Campaign Metric                                                        */
/* --------------------------------------------------------------------- */

type CampaignMetricProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function CampaignMetric({
  icon,
  label,
  value,
}: CampaignMetricProps) {
  return (
    <div className="rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4">
      <div className="flex items-center gap-2 text-[var(--campaign-accent)]">
        {icon}

        <p className="m-0 text-[9px] font-black uppercase tracking-[0.14em] text-white/38">
          {label}
        </p>
      </div>

      <p className="mt-3 text-sm font-black leading-5 tracking-[-0.015em] text-[var(--mr-text)]">
        {value}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Campaign Card                                                          */
/* --------------------------------------------------------------------- */

export default function CampaignCard({
  campaign,
  platform: platformOverride,
  accent,
  accentSoft,
  showAddToCart = true,
  showDisclaimer = true,
  deliverableLimit = 4,
  cartHref = "/cart",
  detailsHref,
  addToCartLabel,
  detailsLabel,
  openCartOnAdd = true,
  showCartMessage = false,
  fullHeight = true,
  className,
}: CampaignCardProps) {
  const platform =
    platformOverride ??
    getPlatformBySlug(
      campaign.platformSlug,
    );

  const resolvedAccent =
    accent ??
    platform?.accent ??
    "#d6b35a";

  const resolvedAccentSoft =
    accentSoft ??
    platform?.accentSoft ??
    "rgba(214, 179, 90, 0.12)";

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

  const isPurchasable =
    campaign.status === "live" &&
    campaign.purchasable;

  const campaignStyle: CampaignStyle = {
    "--campaign-accent":
      resolvedAccent,

    "--campaign-accent-soft":
      resolvedAccentSoft,

    "--campaign-border":
      `color-mix(in srgb, ${resolvedAccent} 28%, transparent)`,
  };

  const headingId =
    `${campaign.id}-campaign-heading`;

  const safeDeliverableLimit =
    Math.max(
      0,
      Math.floor(deliverableLimit),
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

  return (
    <Card
      as="article"
      variant={
        campaign.featured
          ? "featured"
          : "campaign"
      }
      hover
      fullHeight={fullHeight}
      topLine={campaign.featured}
      className={joinClasses(
        "group relative overflow-hidden",
        className,
      )}
      style={campaignStyle}
      aria-labelledby={headingId}
    >
      {/* Campaign accent atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--campaign-accent)] opacity-[0.07] blur-[90px] transition-opacity duration-300 group-hover:opacity-[0.14]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-[var(--campaign-accent)] opacity-[0.035] blur-[95px]"
      />

      <div className="relative flex h-full flex-col p-6 sm:p-7">
        {/* ------------------------------------------------------------- */}
        {/* Header                                                        */}
        {/* ------------------------------------------------------------- */}

        <div className="flex items-start justify-between gap-5">
          <div className="relative grid h-[72px] w-[72px] flex-[0_0_72px] place-items-center overflow-hidden rounded-[22px] border border-[var(--campaign-border)] bg-[var(--campaign-accent-soft)] shadow-[0_18px_48px_rgba(0,0,0,0.32)]">
            <span
              aria-hidden="true"
              className="absolute inset-x-3 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--campaign-accent),transparent)] opacity-70"
            />

            <div className="text-center">
              <p className="m-0 text-xl font-black leading-none tracking-[-0.045em] text-[var(--campaign-accent)]">
                {campaign.campaignTargetLabel}
              </p>

              <p className="mt-1 text-[8px] font-black uppercase tracking-[0.11em] text-white/38">
                Campaign
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span
              className={getCampaignStatusClass(
                campaign,
              )}
            >
              {campaign.featured
                ? campaign.badge ??
                  "Featured"
                : getCampaignStatusLabel(
                    campaign.status,
                    campaign.purchasable,
                  )}
            </span>

            {campaign.featured ? (
              <span className="text-[9px] font-black uppercase tracking-[0.14em] text-white/30">
                Most Popular Level
              </span>
            ) : null}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Identity                                                      */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-7">
          <p className="m-0 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--campaign-accent)]">
            {campaign.eyebrow}
          </p>

          <h3
            id={headingId}
            className="mt-3 text-balance text-[1.65rem] font-black leading-[1.04] tracking-[-0.04em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]"
          >
            {campaign.name}
          </h3>

          <p className="mt-4 text-sm leading-7 text-white/50">
            {campaign.description}
          </p>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Campaign Metrics                                              */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <CampaignMetric
            icon={<TargetIcon />}
            label="Campaign Target"
            value={
              campaign.campaignTargetLabel
            }
          />

          <CampaignMetric
            icon={<ClockIcon />}
            label="Estimated Duration"
            value={
              campaign.estimatedDuration
            }
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Promotional Reach Notice                                      */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-4 rounded-2xl border border-[var(--campaign-border)] bg-[var(--campaign-accent-soft)] p-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-[var(--campaign-accent)]">
              <ShieldIcon />
            </span>

            <div>
              <p className="m-0 text-[9px] font-black uppercase tracking-[0.14em] text-white/38">
                {campaign.metricLabel}
              </p>

              <p className="mt-2 text-xs leading-5 text-white/52">
                {campaign.reachStatement}
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Deliverables                                                  */}
        {/* ------------------------------------------------------------- */}

        {displayedDeliverables.length > 0 ? (
          <div className="mt-7">
            <p className="m-0 text-[10px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
              Campaign Deliverables
            </p>

            <ul className="mt-4 grid list-none gap-3 p-0">
              {displayedDeliverables.map(
                (deliverable) => (
                  <li
                    key={deliverable}
                    className="flex items-start gap-3 text-xs leading-5 text-white/52"
                  >
                    <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[var(--campaign-border)] bg-[var(--campaign-accent-soft)] text-[var(--campaign-accent)]">
                      <CheckIcon />
                    </span>

                    <span>
                      {deliverable}
                    </span>
                  </li>
                ),
              )}
            </ul>

            {additionalDeliverableCount >
            0 ? (
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.11em] text-white/30">
                +
                {
                  additionalDeliverableCount
                }{" "}
                additional{" "}
                {additionalDeliverableCount ===
                1
                  ? "deliverable"
                  : "deliverables"}
              </p>
            ) : null}
          </div>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Best For                                                      */}
        {/* ------------------------------------------------------------- */}

        {campaign.bestFor.length > 0 ? (
          <div className="mt-6">
            <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
              Best For
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {campaign.bestFor
                .slice(0, 3)
                .map((item) => (
                  <span
                    key={item}
                    className="inline-flex min-h-8 items-center rounded-full border border-white/[0.075] bg-white/[0.025] px-3 text-[9px] font-bold uppercase tracking-[0.1em] text-white/42"
                  >
                    {item}
                  </span>
                ))}
            </div>
          </div>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Price and Actions                                             */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-auto pt-8">
          <Divider variant="soft" />

          <div className="mt-6 flex items-end justify-between gap-5">
            <div>
              <p className="m-0 text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
                One-Time Campaign
              </p>

              <p className="mt-1 text-3xl font-black tracking-[-0.055em] text-[var(--mr-text)]">
                {getCampaignPriceLabel(
                  campaign,
                )}
              </p>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/28">
                No Subscription Required
              </p>
            </div>

            <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--campaign-border)] bg-[var(--campaign-accent-soft)] text-[var(--campaign-accent)]">
              {isPurchasable ? (
                <CartIcon />
              ) : (
                <LockIcon />
              )}
            </span>
          </div>

          <div
            className={joinClasses(
              "mt-6 grid gap-3",
              showAddToCart &&
                "sm:grid-cols-2",
            )}
          >
            <Button
              href={resolvedDetailsHref}
              variant="secondary"
              size="sm"
              rightIcon={<ArrowIcon />}
              fullWidth
            >
              {resolvedDetailsLabel}
            </Button>

            {showAddToCart ? (
              isPurchasable ? (
                <AddToCartButton
                  sku={campaign.sku}
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
                  cartHref={cartHref}
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
                  leftIcon={<LockIcon />}
                  disabled
                  fullWidth
                >
                  {getCampaignStatusLabel(
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
            <div className="mt-5 border-t border-white/[0.055] pt-4">
              <p className="m-0 text-[9px] leading-4 text-white/30">
                Campaign targets represent
                estimated promotional reach,
                exposure, impressions, or
                listener opportunities—not
                guaranteed streams, followers,
                placements, revenue, or
                results.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}