// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Dynamic Campaign Page                                 ┃
   ┃ File   : src/app/services/[platform]/[campaign]/page.tsx              ┃
   ┃ Role   : Elite campaign details, scope, requirements, and purchase    ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type {
  CSSProperties,
  ReactNode,
} from "react";

import AddToCartButton from "@/components/AddToCartButton";
import Button from "@/components/Button";
import CampaignDisclaimer from "@/components/CampaignDisclaimer";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import SectionHeading from "@/components/SectionHeading";

import {
  getCampaignBySlug,
  getCampaignPriceLabel,
  getCampaignStaticParams,
  getNextCampaign,
  getPreviousCampaign,
  type MarketingCampaign,
} from "@/data/campaigns";

import {
  getPlatformBySlug,
  type MarketingPlatform,
} from "@/data/platforms";

/* --------------------------------------------------------------------- */
/* Route Types                                                            */
/* --------------------------------------------------------------------- */

type CampaignPageProps = {
  params: Promise<{
    platform: string;
    campaign: string;
  }>;
};

type CampaignPageStyle = CSSProperties & {
  "--campaign-accent"?: string;
  "--campaign-accent-soft"?: string;
  "--campaign-border"?: string;
};

/* --------------------------------------------------------------------- */
/* Site Configuration                                                     */
/* --------------------------------------------------------------------- */

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://moneyrecords.io"
).replace(/\/+$/, "");

/* --------------------------------------------------------------------- */
/* Static Route Generation                                                */
/* --------------------------------------------------------------------- */

export function generateStaticParams(): Array<{
  platform: string;
  campaign: string;
}> {
  return getCampaignStaticParams();
}

/* --------------------------------------------------------------------- */
/* Dynamic Metadata                                                       */
/* --------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: CampaignPageProps): Promise<Metadata> {
  const {
    platform: platformSlug,
    campaign: campaignSlug,
  } = await params;

  const platform =
    getPlatformBySlug(platformSlug);

  const campaign =
    getCampaignBySlug(
      platformSlug,
      campaignSlug,
    );

  if (!platform || !campaign) {
    return {
      title: "Campaign Not Found",
      description:
        "The requested Money Records campaign could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: campaign.seoTitle,
    description: campaign.seoDescription,

    alternates: {
      canonical: campaign.href,
    },

    openGraph: {
      type: "website",
      url: campaign.href,
      siteName: "Money Records LLC",
      title: `${campaign.seoTitle} | Money Records`,
      description: campaign.seoDescription,
    },

    twitter: {
      card: "summary_large_image",
      title: `${campaign.seoTitle} | Money Records`,
      description: campaign.seoDescription,
    },
  };
}

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

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
    >
      <path
        d="M7 7L17 17M17 7L7 17"
        stroke="currentColor"
        strokeWidth="2"
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

function MusicIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M9 18V6L19 4V16"
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
        cx="16.5"
        cy="16"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="30"
      height="30"
      fill="currentColor"
    >
      <path d="M12 2.5A9.5 9.5 0 1 0 12 21.5A9.5 9.5 0 0 0 12 2.5ZM16.35 16.13a.71.71 0 0 1-.98.23c-2.69-1.64-6.08-2.01-10.07-1.1a.71.71 0 1 1-.32-1.39c4.37-1 8.12-.57 11.14 1.28.34.2.44.64.23.98Zm1.4-3.12a.89.89 0 0 1-1.23.29c-3.08-1.89-7.77-2.43-11.41-1.33a.89.89 0 1 1-.51-1.7c4.16-1.26 9.33-.65 12.86 1.52.42.25.55.8.29 1.22Zm.12-3.25C14.18 7.57 8.09 7.37 4.57 8.43a1.07 1.07 0 1 1-.62-2.05c4.05-1.22 10.79-.98 15.01 1.53a1.07 1.07 0 0 1-1.09 1.85Z" />
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

function isCampaignPurchasable(
  campaign: MarketingCampaign,
): boolean {
  return (
    campaign.status === "live" &&
    campaign.purchasable
  );
}

function getCampaignStatusLabel(
  campaign: MarketingCampaign,
): string {
  if (
    isCampaignPurchasable(campaign)
  ) {
    return "Available Now";
  }

  switch (campaign.status) {
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

function getCampaignBadgeClass(
  campaign: MarketingCampaign,
): string {
  if (campaign.featured) {
    return "mr-badge mr-badge-featured";
  }

  if (
    isCampaignPurchasable(campaign)
  ) {
    return "mr-badge mr-badge-success";
  }

  return "mr-badge mr-badge-dark";
}

/* --------------------------------------------------------------------- */
/* Campaign Mark                                                          */
/* --------------------------------------------------------------------- */

function CampaignMark({
  campaign,
  platform,
}: {
  campaign: MarketingCampaign;
  platform: MarketingPlatform;
}) {
  return (
    <div className="relative grid h-20 w-20 flex-[0_0_80px] place-items-center overflow-hidden rounded-[24px] border border-[var(--campaign-border)] bg-[var(--campaign-accent-soft)] shadow-[0_22px_60px_rgba(0,0,0,0.42)] sm:h-24 sm:w-24 sm:flex-[0_0_96px]">
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--campaign-accent)] opacity-20 blur-[38px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--campaign-accent),transparent)] opacity-70"
      />

      <div className="relative text-center">
        {platform.slug === "spotify" ? (
          <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-[var(--campaign-accent)] text-black">
            <SpotifyIcon />
          </span>
        ) : (
          <span className="mx-auto grid h-9 w-9 place-items-center rounded-full border border-[var(--campaign-border)] text-[var(--campaign-accent)]">
            <MusicIcon />
          </span>
        )}

        <p className="mt-2 text-lg font-black leading-none tracking-[-0.05em] text-[var(--campaign-accent)] sm:text-xl">
          {campaign.campaignTargetLabel}
        </p>
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
        <span className="grid h-11 w-11 flex-[0_0_44px] place-items-center rounded-xl border border-[var(--campaign-border)] bg-[var(--campaign-accent-soft)] text-[var(--campaign-accent)]">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
            {label}
          </p>

          <p className="mt-2 text-lg font-black leading-6 tracking-[-0.03em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--campaign-accent)]">
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
/* Detail List Card                                                       */
/* --------------------------------------------------------------------- */

type DetailListCardProps = {
  eyebrow: string;
  title: string;
  description?: string;
  items: readonly string[];
  icon: ReactNode;
  tone?:
    | "accent"
    | "neutral"
    | "negative";
};

function DetailListCard({
  eyebrow,
  title,
  description,
  items,
  icon,
  tone = "accent",
}: DetailListCardProps) {
  const negative =
    tone === "negative";

  const neutral =
    tone === "neutral";

  return (
    <Card
      as="article"
      padding="lg"
      fullHeight
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className={joinClasses(
          "pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-[85px]",
          negative
            ? "bg-red-500 opacity-[0.04]"
            : neutral
              ? "bg-white opacity-[0.025]"
              : "bg-[var(--campaign-accent)] opacity-[0.055]",
        )}
      />

      <div className="relative">
        <div className="flex items-start gap-4">
          <span
            className={joinClasses(
              "grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border",
              negative
                ? "border-red-400/20 bg-red-400/[0.055] text-red-300"
                : neutral
                  ? "border-white/[0.09] bg-white/[0.035] text-white/65"
                  : "border-[var(--campaign-border)] bg-[var(--campaign-accent-soft)] text-[var(--campaign-accent)]",
            )}
          >
            {icon}
          </span>

          <div>
            <p
              className={joinClasses(
                "m-0 text-[9px] font-black uppercase tracking-[0.17em]",
                negative
                  ? "text-red-300/80"
                  : neutral
                    ? "text-white/40"
                    : "text-[var(--campaign-accent)]",
              )}
            >
              {eyebrow}
            </p>

            <h3 className="mt-2 text-xl font-black tracking-[-0.03em] text-[var(--mr-text)]">
              {title}
            </h3>
          </div>
        </div>

        {description ? (
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/48">
            {description}
          </p>
        ) : null}

        <ul className="mt-6 grid list-none gap-3 p-0">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm leading-6 text-white/52"
            >
              <span
                className={joinClasses(
                  "mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border",
                  negative
                    ? "border-red-400/20 bg-red-400/[0.055] text-red-300"
                    : neutral
                      ? "border-white/[0.09] bg-white/[0.035] text-white/60"
                      : "border-[var(--campaign-border)] bg-[var(--campaign-accent-soft)] text-[var(--campaign-accent)]",
                )}
              >
                {negative ? (
                  <CloseIcon />
                ) : (
                  <CheckIcon />
                )}
              </span>

              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Order Summary                                                          */
/* --------------------------------------------------------------------- */

function OrderSummary({
  campaign,
  platform,
}: {
  campaign: MarketingCampaign;
  platform: MarketingPlatform;
}) {
  const purchasable =
    isCampaignPurchasable(
      campaign,
    );

  const rows = [
    {
      label: "Platform",
      value: platform.shortName,
    },
    {
      label: "Campaign",
      value: campaign.shortName,
    },
    {
      label: "Target",
      value:
        campaign.campaignTargetLabel,
      accent: true,
    },
    {
      label: "Estimated Timing",
      value:
        campaign.estimatedDuration,
    },
  ];

  return (
    <Card
      as="aside"
      variant="campaign"
      padding="lg"
      topLine={campaign.featured}
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[var(--campaign-accent)] opacity-[0.1] blur-[95px]"
      />

      <div className="relative">
        <div className="flex items-center gap-4">
          <CampaignMark
            campaign={campaign}
            platform={platform}
          />

          <div className="min-w-0">
            <span
              className={getCampaignBadgeClass(
                campaign,
              )}
            >
              {campaign.featured
                ? campaign.badge ??
                  "Featured"
                : getCampaignStatusLabel(
                    campaign,
                  )}
            </span>

            <p className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-white/35">
              One-Time Campaign
            </p>
          </div>
        </div>

        <div className="mt-7 rounded-[22px] border border-[var(--campaign-border)] bg-[var(--campaign-accent-soft)] p-5">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.16em] text-white/38">
            Campaign Price
          </p>

          <p className="mt-2 text-4xl font-black tracking-[-0.06em] text-[var(--mr-text)] sm:text-5xl">
            {getCampaignPriceLabel(
              campaign,
            )}
          </p>

          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/30">
            No Recurring Subscription
          </p>
        </div>

        <div className="mt-6 grid gap-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-5 border-b border-white/[0.055] pb-3 last:border-b-0 last:pb-0"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.13em] text-white/35">
                {row.label}
              </span>

              <span
                className={joinClasses(
                  "max-w-[210px] text-right text-sm font-black leading-5",
                  row.accent
                    ? "text-[var(--campaign-accent)]"
                    : "text-[var(--mr-text)]",
                )}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-7 grid gap-3">
          {purchasable ? (
            <AddToCartButton
              sku={campaign.sku}
              label={
                campaign.addToCartLabel
              }
              variant={
                campaign.featured
                  ? "primary"
                  : "platform"
              }
              platformAccent={
                campaign.featured
                  ? undefined
                  : platform.accent
              }
              size="lg"
              fullWidth
              cartHref="/cart"
              openCartOnAdd={false}
              navigateToCartWhenSelected
              showMessage
            />
          ) : (
            <Button
              variant="dark"
              size="lg"
              disabled
              fullWidth
            >
              {getCampaignStatusLabel(
                campaign,
              )}
            </Button>
          )}

          <Button
            href={platform.href}
            variant="secondary"
            size="sm"
            leftIcon={<BackIcon />}
            fullWidth
          >
            Compare{" "}
            {platform.shortName}{" "}
            Campaigns
          </Button>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
          <span className="mt-0.5 text-[var(--campaign-accent)]">
            <ShieldIcon />
          </span>

          <p className="m-0 text-xs leading-5 text-white/43">
            Your selected service and
            price are verified through the
            trusted campaign catalog
            before checkout.
          </p>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Final Action                                                           */
/* --------------------------------------------------------------------- */

function FinalAction({
  campaign,
  platform,
}: {
  campaign: MarketingCampaign;
  platform: MarketingPlatform;
}) {
  const purchasable =
    isCampaignPurchasable(
      campaign,
    );

  return (
    <Card
      as="aside"
      variant="featured"
      padding="lg"
      topLine
      className="relative mt-16 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[var(--campaign-accent)] opacity-[0.1] blur-[110px]"
      />

      <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <span className="mr-badge mr-badge-featured">
            Ready to Begin?
          </span>

          <h2 className="mt-5 text-balance text-2xl font-black leading-[1.06] tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl">
            Select the{" "}
            {campaign.name}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/50">
            Continue with the{" "}
            <strong className="font-black text-[var(--mr-text)]">
              {getCampaignPriceLabel(
                campaign,
              )}
            </strong>{" "}
            one-time service or compare
            the other available{" "}
            {platform.shortName} campaign
            levels.
          </p>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto lg:min-w-[430px]">
          {purchasable ? (
            <AddToCartButton
              sku={campaign.sku}
              label="Add Campaign"
              variant="platform"
              platformAccent={
                platform.accent
              }
              size="lg"
              fullWidth
              cartHref="/cart"
              openCartOnAdd={false}
              navigateToCartWhenSelected
              showMessage
            />
          ) : (
            <Button
              variant="dark"
              size="lg"
              disabled
              fullWidth
            >
              {getCampaignStatusLabel(
                campaign,
              )}
            </Button>
          )}

          <Button
            href={platform.href}
            variant="secondary"
            size="lg"
            fullWidth
          >
            Compare Campaigns
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Campaign Navigation                                                    */
/* --------------------------------------------------------------------- */

function CampaignNavigationCard({
  campaign,
  direction,
}: {
  campaign: MarketingCampaign;
  direction:
    | "previous"
    | "next";
}) {
  const isPrevious =
    direction === "previous";

  return (
    <Button
      href={campaign.href}
      variant="secondary"
      size="lg"
      leftIcon={
        isPrevious
          ? <BackIcon />
          : undefined
      }
      rightIcon={
        isPrevious
          ? undefined
          : <ArrowIcon />
      }
      className="h-auto min-h-20 justify-between rounded-2xl px-5 py-4 text-left"
      fullWidth
    >
      <span
        className={joinClasses(
          "flex min-w-0 flex-col",
          !isPrevious &&
            "items-end text-right",
        )}
      >
        <span className="text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
          {isPrevious
            ? "Previous Campaign"
            : "Next Campaign"}
        </span>

        <span className="mt-1 text-sm font-black normal-case tracking-normal text-[var(--mr-text)]">
          {campaign.name}
        </span>

        <span className="mt-1 text-xs font-bold normal-case tracking-normal text-[var(--campaign-accent)]">
          {getCampaignPriceLabel(
            campaign,
          )}
        </span>
      </span>
    </Button>
  );
}

/* --------------------------------------------------------------------- */
/* Structured Data                                                       */
/* --------------------------------------------------------------------- */

function CampaignStructuredData({
  campaign,
  platform,
}: {
  campaign: MarketingCampaign;
  platform: MarketingPlatform;
}) {
  const purchasable =
    isCampaignPurchasable(
      campaign,
    );

  const productStructuredData = {
    "@context":
      "https://schema.org",

    "@type": "Product",

    name: campaign.name,
    sku: campaign.sku,

    description:
      campaign.longDescription,

    category:
      `${platform.name} Campaign`,

    brand: {
      "@type": "Brand",
      name: "Money Records",
    },

    url:
      `${siteUrl}${campaign.href}`,

    offers: {
      "@type": "Offer",

      url:
        `${siteUrl}${campaign.href}`,

      priceCurrency:
        campaign.currency,

      price: (
        campaign.priceCents / 100
      ).toFixed(2),

      availability:
        purchasable
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",

      itemCondition:
        "https://schema.org/NewCondition",

      seller: {
        "@type": "Organization",
        name:
          "Money Records LLC",
      },
    },
  };

  const breadcrumbStructuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "BreadcrumbList",

    itemListElement: [
      {
        "@type":
          "ListItem",

        position: 1,

        name: "Home",

        item: siteUrl,
      },
      {
        "@type":
          "ListItem",

        position: 2,

        name: "Services",

        item:
          `${siteUrl}/services`,
      },
      {
        "@type":
          "ListItem",

        position: 3,

        name:
          platform.name,

        item:
          `${siteUrl}${platform.href}`,
      },
      {
        "@type":
          "ListItem",

        position: 4,

        name:
          campaign.name,

        item:
          `${siteUrl}${campaign.href}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              productStructuredData,
            ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbStructuredData,
            ),
        }}
      />
    </>
  );
}

/* --------------------------------------------------------------------- */
/* Campaign Page                                                          */
/* --------------------------------------------------------------------- */

export default async function CampaignPage({
  params,
}: CampaignPageProps) {
  const {
    platform: platformSlug,
    campaign: campaignSlug,
  } = await params;

  const platform =
    getPlatformBySlug(
      platformSlug,
    );

  const campaign =
    getCampaignBySlug(
      platformSlug,
      campaignSlug,
    );

  if (
    !platform ||
    !platform.visible ||
    !campaign
  ) {
    notFound();
  }

  const previousCampaign =
    getPreviousCampaign(
      campaign,
    );

  const nextCampaign =
    getNextCampaign(
      campaign,
    );

  const purchasable =
    isCampaignPurchasable(
      campaign,
    );

  const campaignStyle:
    CampaignPageStyle = {
      "--campaign-accent":
        platform.accent,

      "--campaign-accent-soft":
        platform.accentSoft,

      "--campaign-border":
        `color-mix(in srgb, ${platform.accent} 28%, transparent)`,
    };

  return (
    <div
      id="top"
      className="mr-page relative overflow-hidden"
      style={campaignStyle}
    >
      <CampaignStructuredData
        campaign={campaign}
        platform={platform}
      />

      {/* Background atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[760px] w-[1180px] max-w-[120vw] -translate-x-1/2 rounded-full bg-[var(--campaign-accent)] opacity-[0.05] blur-[180px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-20 [background-image:radial-gradient(rgba(227,179,77,0.11)_0.7px,transparent_0.7px)] [background-size:26px_26px]"
      />

      <Container size="wide">
        {/* Breadcrumb */}

        <nav
          aria-label="Campaign breadcrumb"
          className="flex flex-wrap items-center gap-2 pt-8 text-[10px] font-black uppercase tracking-[0.13em] text-white/35 md:pt-10"
        >
          <Button
            href="/services"
            variant="ghost"
            size="sm"
            leftIcon={<BackIcon />}
          >
            Services
          </Button>

          <span aria-hidden="true">
            /
          </span>

          <Button
            href={platform.href}
            variant="ghost"
            size="sm"
          >
            {platform.shortName}
          </Button>

          <span aria-hidden="true">
            /
          </span>

          <span className="text-[var(--campaign-accent)]">
            {
              campaign.campaignTargetLabel
            }
          </span>
        </nav>

        {/* Campaign hero */}

        <section
          aria-labelledby="campaign-page-heading"
          className="relative mt-5 overflow-hidden rounded-[30px] border border-[var(--campaign-border)] bg-[linear-gradient(145deg,rgba(18,18,20,0.95),rgba(7,7,8,0.98))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.52)] sm:p-8 lg:p-11"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-44 h-[500px] w-[500px] rounded-full bg-[var(--campaign-accent)] opacity-[0.12] blur-[140px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[var(--campaign-accent)] opacity-[0.035] blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--campaign-accent),transparent)] opacity-70"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
            {/* Campaign introduction */}

            <div className="lg:py-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={getCampaignBadgeClass(
                    campaign,
                  )}
                >
                  {campaign.featured
                    ? campaign.badge ??
                      "Featured Campaign"
                    : getCampaignStatusLabel(
                        campaign,
                      )}
                </span>

                <span className="mr-badge mr-badge-dark">
                  {
                    platform.shortName
                  }
                </span>

                <span className="mr-badge mr-badge-dark">
                  One-Time Service
                </span>
              </div>

              <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--campaign-accent)]">
                {campaign.eyebrow}
              </p>

              <h1
                id="campaign-page-heading"
                className="mt-4 max-w-4xl text-balance text-4xl font-black leading-[0.98] tracking-[-0.055em] text-[var(--mr-text)] sm:text-5xl lg:text-6xl"
              >
                {campaign.name}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/55 sm:text-lg">
                {
                  campaign.longDescription
                }
              </p>

              <div className="mt-8 rounded-[22px] border border-[var(--campaign-border)] bg-[var(--campaign-accent-soft)] p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-10 w-10 flex-[0_0_40px] place-items-center rounded-xl border border-[var(--campaign-border)] text-[var(--campaign-accent)]">
                    <TargetIcon />
                  </span>

                  <div>
                    <p className="m-0 text-[9px] font-black uppercase tracking-[0.16em] text-white/38">
                      {
                        campaign.metricLabel
                      }
                    </p>

                    <p className="mt-2 text-sm leading-7 text-white/55">
                      {
                        campaign.reachStatement
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {purchasable ? (
                  <div className="w-full sm:w-auto">
                    <AddToCartButton
                      sku={
                        campaign.sku
                      }
                      label={
                        campaign.addToCartLabel
                      }
                      variant="platform"
                      platformAccent={
                        platform.accent
                      }
                      size="lg"
                      fullWidth
                      cartHref="/cart"
                      openCartOnAdd={
                        false
                      }
                      navigateToCartWhenSelected
                    />
                  </div>
                ) : (
                  <Button
                    variant="dark"
                    size="lg"
                    disabled
                    className="w-full sm:w-auto"
                  >
                    {getCampaignStatusLabel(
                      campaign,
                    )}
                  </Button>
                )}

                <Button
                  href={platform.href}
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Compare Campaigns
                </Button>
              </div>
            </div>

            {/* Order summary */}

            <OrderSummary
              campaign={campaign}
              platform={platform}
            />
          </div>
        </section>

        {/* Campaign overview */}

        <section
          aria-label={`${campaign.name} campaign overview`}
          className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <CampaignMetric
            icon={<TargetIcon />}
            label="Campaign Target"
            value={
              campaign.campaignTargetLabel
            }
            description={
              campaign.metricLabel
            }
          />

          <CampaignMetric
            icon={<PaymentIcon />}
            label="One-Time Price"
            value={getCampaignPriceLabel(
              campaign,
            )}
            description="No recurring subscription is required."
          />

          <CampaignMetric
            icon={<ClockIcon />}
            label="Estimated Timing"
            value={
              campaign.estimatedDuration
            }
            description="Timing begins after the order and intake review."
          />

          <CampaignMetric
            icon={<ShieldIcon />}
            label="Campaign Standard"
            value="Managed Service"
            description="Scope and pricing are verified before checkout."
          />
        </section>

        {/* Included */}

        <section
          aria-labelledby="campaign-included-heading"
          className="mt-16"
        >
          <SectionHeading
            headingId="campaign-included-heading"
            eyebrow="Campaign Scope"
            title={
              <>
                Everything Included in{" "}
                <span className="mr-text-gradient">
                  Your Campaign.
                </span>
              </>
            }
            subtitle="Review the deliverables and campaign-management features included with this service."
            width="wide"
          />

          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            <DetailListCard
              eyebrow="Deliverables"
              title="Campaign Deliverables"
              description="The primary promotional activities included with this campaign level."
              items={
                campaign.deliverables
              }
              icon={<CheckIcon />}
            />

            <DetailListCard
              eyebrow="Campaign Management"
              title="Service Features"
              description="The process used to prepare, manage, monitor, and complete the campaign."
              items={
                campaign.features
              }
              icon={<ShieldIcon />}
            />
          </div>
        </section>

        {/* Before purchase */}

        <section
          aria-labelledby="campaign-requirements-heading"
          className="mt-16"
        >
          <SectionHeading
            headingId="campaign-requirements-heading"
            eyebrow="Before You Purchase"
            title={
              <>
                Make Sure the Campaign{" "}
                <span className="mr-text-gradient">
                  Fits Your Release.
                </span>
              </>
            }
            subtitle="Review who this service is designed for and prepare the information needed for campaign intake."
            width="wide"
          />

          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            <DetailListCard
              eyebrow="Recommended Use"
              title="Best Suited For"
              description="Artists, releases, and promotional situations that may benefit from this campaign level."
              items={campaign.bestFor}
              icon={<MusicIcon />}
              tone="neutral"
            />

            <DetailListCard
              eyebrow="Campaign Intake"
              title="Required Release Assets"
              description="Prepare these details before campaign fulfillment begins."
              items={
                campaign.requiredAssets
              }
              icon={<DocumentIcon />}
              tone="neutral"
            />
          </div>
        </section>

        {/* Exclusions */}

        <section
          aria-labelledby="campaign-exclusions-heading"
          className="mt-16"
        >
          <SectionHeading
            headingId="campaign-exclusions-heading"
            eyebrow="Campaign Boundaries"
            title={
              <>
                Important{" "}
                <span className="mr-text-gradient">
                  Exclusions.
                </span>
              </>
            }
            subtitle="The following services and outcomes are not included or guaranteed."
            width="wide"
          />

          <div className="mt-9">
            <DetailListCard
              eyebrow="Not Included"
              title="Campaign Exclusions"
              items={
                campaign.notIncluded
              }
              icon={<CloseIcon />}
              tone="negative"
            />
          </div>
        </section>

        {/* Final purchase action */}

        <FinalAction
          campaign={campaign}
          platform={platform}
        />

        {/* Campaign disclaimer */}

        <Divider
          label={`${platform.shortName} Campaign Standard`}
          variant="strong"
          spacing="lg"
        />

        <CampaignDisclaimer
          variant="platform"
          size="lg"
          accent={platform.accent}
          accentSoft={
            platform.accentSoft
          }
          platformName={
            platform.shortName
          }
          description={
            campaign.disclaimer
          }
          includeIntegrityStatement
          points={[
            "Campaign targets represent estimated promotional reach, exposure, impressions, or listener opportunities—not guaranteed stream totals.",
            "Performance varies based on the release, audience, supplied assets, target markets, platform activity, market conditions, and listener response.",
            "Purchasing this service does not guarantee playlist placement, followers, revenue, chart position, virality, or label signing.",
          ]}
        />

        {/* Previous and next campaigns */}

        {previousCampaign ||
        nextCampaign ? (
          <section
            aria-label="Other campaign levels"
            className="py-14"
          >
            <p className="mb-5 text-center text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
              Compare Other{" "}
              {platform.shortName}{" "}
              Campaigns
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {previousCampaign ? (
                <CampaignNavigationCard
                  campaign={
                    previousCampaign
                  }
                  direction="previous"
                />
              ) : (
                <div className="hidden md:block" />
              )}

              {nextCampaign ? (
                <CampaignNavigationCard
                  campaign={
                    nextCampaign
                  }
                  direction="next"
                />
              ) : null}
            </div>
          </section>
        ) : (
          <div className="py-8" />
        )}
      </Container>
    </div>
  );
}