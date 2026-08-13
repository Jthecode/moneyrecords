// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Dynamic Campaign Page                                 ┃
   ┃ File   : src/app/services/[platform]/[campaign]/page.tsx              ┃
   ┃ Role   : Campaign details, scope, requirements, and secure purchase   ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

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
import SectionHeader from "@/components/SectionHeader";

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

type CampaignPageStyle =
  CSSProperties & {
    "--campaign-accent"?: string;
    "--campaign-accent-soft"?: string;
    "--campaign-border"?: string;
  };

type DetailTone =
  | "accent"
  | "neutral"
  | "negative";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                    */
/* --------------------------------------------------------------------- */

export const dynamicParams =
  false;

/* --------------------------------------------------------------------- */
/* Site Configuration                                                     */
/* --------------------------------------------------------------------- */

const DEFAULT_SITE_URL =
  "https://moneyrecords.io";

function getSiteUrl(): string {
  const configuredUrl =
    process.env
      .NEXT_PUBLIC_SITE_URL
      ?.trim();

  if (!configuredUrl) {
    return DEFAULT_SITE_URL;
  }

  try {
    const parsedUrl =
      new URL(
        configuredUrl,
      );

    if (
      parsedUrl.protocol !==
        "https:" &&
      parsedUrl.protocol !==
        "http:"
    ) {
      return DEFAULT_SITE_URL;
    }

    return parsedUrl.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

const siteUrl =
  getSiteUrl();

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
    platform:
      platformSlug,

    campaign:
      campaignSlug,
  } =
    await params;

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
    return {
      title:
        "Campaign Not Found",

      description:
        "The requested Money Records campaign could not be found.",

      robots: {
        index:
          false,

        follow:
          false,
      },
    };
  }

  return {
    title:
      campaign.seoTitle,

    description:
      campaign.seoDescription,

    alternates: {
      canonical:
        campaign.href,
    },

    openGraph: {
      type:
        "website",

      url:
        campaign.href,

      siteName:
        "Money Records LLC",

      title:
        `${campaign.seoTitle} | Money Records`,

      description:
        campaign.seoDescription,
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        `${campaign.seoTitle} | Money Records`,

      description:
        campaign.seoDescription,
    },
  };
}

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

function BackIcon():
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
        d="M19 12H5M10 7L5 12L10 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
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

function CloseIcon():
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
        d="M7 7L17 17M17 7L7 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
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
      width="19"
      height="19"
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

function ClockIcon():
  ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="19"
      height="19"
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

function PaymentIcon():
  ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="19"
      height="19"
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

function ShieldIcon():
  ReactNode {
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

function DocumentIcon():
  ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="19"
      height="19"
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

function MusicIcon():
  ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="19"
      height="19"
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

function SpotifyIcon():
  ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="currentColor"
    >
      <path d="M12 2.5A9.5 9.5 0 1 0 12 21.5A9.5 9.5 0 0 0 12 2.5ZM16.35 16.13a.71.71 0 0 1-.98.23c-2.69-1.64-6.08-2.01-10.07-1.1a.71.71 0 1 1-.32-1.39c4.37-1 8.12-.57 11.14 1.28.34.2.44.64.23.98Zm1.4-3.12a.89.89 0 0 1-1.23.29c-3.08-1.89-7.77-2.43-11.41-1.33a.89.89 0 1 1-.51-1.7c4.16-1.26 9.33-.65 12.86 1.52.42.25.55.8.29 1.22Zm.12-3.25C14.18 7.57 8.09 7.37 4.57 8.43a1.07 1.07 0 1 1-.62-2.05c4.05-1.22 10.79-.98 15.01 1.53a1.07 1.07 0 0 1-1.09 1.85Z" />
    </svg>
  );
}

function ChevronIcon():
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
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
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

function isCampaignPurchasable(
  campaign:
    MarketingCampaign,
): boolean {
  return (
    campaign.status ===
      "live" &&
    campaign.purchasable
  );
}

function getCampaignStatusLabel(
  campaign:
    MarketingCampaign,
): string {
  if (
    isCampaignPurchasable(
      campaign,
    )
  ) {
    return "Available Now";
  }

  switch (
    campaign.status
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

function getCampaignBadgeClass(
  campaign:
    MarketingCampaign,
): string {
  if (
    campaign.featured
  ) {
    return "mr-badge mr-badge-featured";
  }

  if (
    isCampaignPurchasable(
      campaign,
    )
  ) {
    return "mr-badge mr-badge-success";
  }

  return "mr-badge mr-badge-dark";
}

function serializeStructuredData(
  data:
    object,
): string {
  return JSON.stringify(
    data,
  )
    .replaceAll(
      "<",
      "\\u003c",
    )
    .replaceAll(
      "\u2028",
      "\\u2028",
    )
    .replaceAll(
      "\u2029",
      "\\u2029",
    );
}

/* --------------------------------------------------------------------- */
/* Campaign Mark                                                          */
/* --------------------------------------------------------------------- */

function CampaignMark({
  campaign,
  platform,
}: {
  campaign:
    MarketingCampaign;

  platform:
    MarketingPlatform;
}) {
  return (
    <div
      className={[
        "relative grid h-14 w-14 flex-[0_0_56px]",
        "place-items-center overflow-hidden",
        "rounded-[18px]",
        "border border-[var(--campaign-border)]",
        "bg-[var(--campaign-accent-soft)]",
        "shadow-[0_16px_45px_rgba(0,0,0,0.35)]",
        "sm:h-16 sm:w-16 sm:flex-basis-[64px]",
        "sm:rounded-[20px]",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "absolute -right-8 -top-8",
          "h-20 w-20 rounded-full",
          "bg-[var(--campaign-accent)]",
          "opacity-20 blur-[28px]",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "absolute inset-x-3 top-0 h-px",
          "bg-[linear-gradient(90deg,transparent,var(--campaign-accent),transparent)]",
          "opacity-70",
        ].join(" ")}
      />

      <div className="relative text-center">
        {platform.slug ===
        "spotify" ? (
          <span
            className={[
              "mx-auto grid h-7 w-7 place-items-center",
              "rounded-full",
              "bg-[var(--campaign-accent)]",
              "text-black",
            ].join(" ")}
          >
            <SpotifyIcon />
          </span>
        ) : (
          <span
            className={[
              "mx-auto grid h-7 w-7 place-items-center",
              "rounded-full",
              "border border-[var(--campaign-border)]",
              "text-[var(--campaign-accent)]",
            ].join(" ")}
          >
            <MusicIcon />
          </span>
        )}

        <p
          className={[
            "mt-1 text-[10px] font-black leading-none",
            "tracking-[-0.03em]",
            "text-[var(--campaign-accent)]",
          ].join(" ")}
        >
          {
            campaign
              .campaignTargetLabel
          }
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Campaign Overview Strip                                                */
/* --------------------------------------------------------------------- */

function CampaignOverview({
  campaign,
}: {
  campaign:
    MarketingCampaign;
}) {
  const metrics = [
    {
      icon:
        <TargetIcon />,

      label:
        "Target",

      value:
        campaign
          .campaignTargetLabel,

      accent:
        true,
    },

    {
      icon:
        <PaymentIcon />,

      label:
        "Price",

      value:
        getCampaignPriceLabel(
          campaign,
        ),

      accent:
        false,
    },

    {
      icon:
        <ClockIcon />,

      label:
        "Timing",

      value:
        campaign
          .estimatedDuration,

      accent:
        false,
    },

    {
      icon:
        <ShieldIcon />,

      label:
        "Service",

      value:
        "Managed",

      accent:
        false,
    },
  ] as const;

  return (
    <section
      aria-label={`${campaign.name} campaign overview`}
      className="mt-4 sm:mt-5"
    >
      <Card
        padding="sm"
        className="relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute",
            "-right-20 -top-24 h-56 w-56",
            "rounded-full",
            "bg-[var(--campaign-accent)]",
            "opacity-[0.045]",
            "blur-[80px]",
          ].join(" ")}
        />

        <div className="relative grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-0">
          {metrics.map(
            (
              metric,
              index,
            ) => (
              <div
                key={
                  metric.label
                }
                className={joinClasses(
                  "flex min-w-0 items-center gap-3",
                  "rounded-[15px]",
                  "border border-white/[0.05]",
                  "bg-white/[0.012]",
                  "p-3",

                  "lg:rounded-none",
                  "lg:border-y-0",
                  "lg:border-r-0",
                  "lg:bg-transparent",
                  "lg:px-4",

                  index >
                    0 &&
                    [
                      "lg:border-l",
                      "lg:border-white/[0.06]",
                    ].join(" "),
                )}
              >
                <span
                  className={joinClasses(
                    "grid h-9 w-9 flex-[0_0_36px]",
                    "place-items-center rounded-xl",
                    "border",

                    metric.accent
                      ? [
                          "border-[var(--campaign-border)]",
                          "bg-[var(--campaign-accent-soft)]",
                          "text-[var(--campaign-accent)]",
                        ].join(" ")
                      : [
                          "border-white/[0.06]",
                          "bg-white/[0.02]",
                          "text-white/38",
                        ].join(" "),
                  )}
                >
                  {metric.icon}
                </span>

                <div className="min-w-0">
                  <p
                    className={[
                      "m-0 truncate",
                      "text-[7px] font-black uppercase",
                      "tracking-[0.1em]",
                      "text-white/24",
                      "sm:text-[8px]",
                    ].join(" ")}
                  >
                    {metric.label}
                  </p>

                  <p
                    className={joinClasses(
                      "mt-1 truncate",
                      "text-[11px] font-black",
                      "sm:text-xs",

                      metric.accent
                        ? "text-[var(--campaign-accent)]"
                        : "text-[var(--mr-text)]",
                    )}
                  >
                    {metric.value}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </Card>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/* Desktop Detail Card                                                    */
/* --------------------------------------------------------------------- */

function DetailListCard({
  eyebrow,
  title,
  description,
  items,
  icon,
  tone =
    "accent",
}: {
  eyebrow:
    string;

  title:
    string;

  description?:
    string;

  items:
    readonly string[];

  icon:
    ReactNode;

  tone?:
    DetailTone;
}) {
  const negative =
    tone ===
    "negative";

  const neutral =
    tone ===
    "neutral";

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
          "pointer-events-none absolute",
          "-right-20 -top-20 h-56 w-56",
          "rounded-full blur-[85px]",

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
              "grid h-12 w-12 flex-[0_0_48px]",
              "place-items-center rounded-2xl border",

              negative
                ? [
                    "border-red-400/20",
                    "bg-red-400/[0.055]",
                    "text-red-300",
                  ].join(" ")
                : neutral
                  ? [
                      "border-white/[0.09]",
                      "bg-white/[0.035]",
                      "text-white/65",
                    ].join(" ")
                  : [
                      "border-[var(--campaign-border)]",
                      "bg-[var(--campaign-accent-soft)]",
                      "text-[var(--campaign-accent)]",
                    ].join(" "),
            )}
          >
            {icon}
          </span>

          <div>
            <p
              className={joinClasses(
                "m-0 text-[9px] font-black uppercase",
                "tracking-[0.17em]",

                negative
                  ? "text-red-300/80"
                  : neutral
                    ? "text-white/40"
                    : "text-[var(--campaign-accent)]",
              )}
            >
              {eyebrow}
            </p>

            <h3
              className={[
                "mt-2 text-xl font-black",
                "tracking-[-0.03em]",
                "text-[var(--mr-text)]",
              ].join(" ")}
            >
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
          {items.map(
            (
              item,
            ) => (
              <li
                key={
                  item
                }
                className="flex items-start gap-3 text-sm leading-6 text-white/52"
              >
                <span
                  className={joinClasses(
                    "mt-0.5 grid h-5 w-5",
                    "flex-[0_0_20px]",
                    "place-items-center rounded-full",
                    "border",

                    negative
                      ? [
                          "border-red-400/20",
                          "bg-red-400/[0.055]",
                          "text-red-300",
                        ].join(" ")
                      : neutral
                        ? [
                            "border-white/[0.09]",
                            "bg-white/[0.035]",
                            "text-white/60",
                          ].join(" ")
                        : [
                            "border-[var(--campaign-border)]",
                            "bg-[var(--campaign-accent-soft)]",
                            "text-[var(--campaign-accent)]",
                          ].join(" "),
                  )}
                >
                  {negative
                    ? <CloseIcon />
                    : <CheckIcon />}
                </span>

                <span>
                  {item}
                </span>
              </li>
            ),
          )}
        </ul>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Mobile Detail Accordion                                                */
/* --------------------------------------------------------------------- */

function MobileDetailAccordion({
  eyebrow,
  title,
  description,
  items,
  icon,
  tone =
    "accent",
}: {
  eyebrow:
    string;

  title:
    string;

  description?:
    string;

  items:
    readonly string[];

  icon:
    ReactNode;

  tone?:
    DetailTone;
}) {
  const negative =
    tone ===
    "negative";

  const neutral =
    tone ===
    "neutral";

  return (
    <details
      className={[
        "group overflow-hidden",
        "rounded-[20px]",
        "border border-white/[0.065]",
        "bg-white/[0.018]",
      ].join(" ")}
    >
      <summary
        className={[
          "flex min-h-16 cursor-pointer",
          "list-none items-center",
          "justify-between gap-4",
          "px-4 py-3.5",
          "[&::-webkit-details-marker]:hidden",
          "focus-visible:outline-none",
        ].join(" ")}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span
            className={joinClasses(
              "grid h-10 w-10 flex-[0_0_40px]",
              "place-items-center rounded-xl border",

              negative
                ? [
                    "border-red-400/20",
                    "bg-red-400/[0.05]",
                    "text-red-300",
                  ].join(" ")
                : neutral
                  ? [
                      "border-white/[0.08]",
                      "bg-white/[0.025]",
                      "text-white/55",
                    ].join(" ")
                  : [
                      "border-[var(--campaign-border)]",
                      "bg-[var(--campaign-accent-soft)]",
                      "text-[var(--campaign-accent)]",
                    ].join(" "),
            )}
          >
            {icon}
          </span>

          <span className="min-w-0">
            <span
              className={joinClasses(
                "block truncate",
                "text-[8px] font-black uppercase",
                "tracking-[0.13em]",

                negative
                  ? "text-red-300/70"
                  : neutral
                    ? "text-white/30"
                    : "text-[var(--campaign-accent)]",
              )}
            >
              {eyebrow}
            </span>

            <span className="mt-1 block truncate text-sm font-black text-[var(--mr-text)]">
              {title}
            </span>
          </span>
        </span>

        <span
          aria-hidden="true"
          className={[
            "grid h-8 w-8 flex-[0_0_32px]",
            "place-items-center rounded-full",
            "border border-white/[0.06]",
            "bg-white/[0.02]",
            "text-white/28",
            "transition duration-200",
            "group-open:rotate-180",
          ].join(" ")}
        >
          <ChevronIcon />
        </span>
      </summary>

      <div className="border-t border-white/[0.05] px-4 pb-4 pt-3.5">
        {description ? (
          <p className="text-xs leading-6 text-white/38">
            {description}
          </p>
        ) : null}

        <ul
          className={joinClasses(
            "grid list-none gap-2.5 p-0",

            description
              ? "mt-4"
              : "mt-0",
          )}
        >
          {items.map(
            (
              item,
            ) => (
              <li
                key={
                  item
                }
                className="flex items-start gap-2.5 text-xs leading-5 text-white/48"
              >
                <span
                  className={joinClasses(
                    "mt-0.5 grid h-[18px] w-[18px]",
                    "flex-[0_0_18px]",
                    "place-items-center rounded-full",
                    "border",

                    negative
                      ? [
                          "border-red-400/20",
                          "bg-red-400/[0.05]",
                          "text-red-300",
                        ].join(" ")
                      : neutral
                        ? [
                            "border-white/[0.08]",
                            "bg-white/[0.025]",
                            "text-white/55",
                          ].join(" ")
                        : [
                            "border-[var(--campaign-border)]",
                            "bg-[var(--campaign-accent-soft)]",
                            "text-[var(--campaign-accent)]",
                          ].join(" "),
                  )}
                >
                  {negative
                    ? <CloseIcon />
                    : <CheckIcon />}
                </span>

                <span>
                  {item}
                </span>
              </li>
            ),
          )}
        </ul>
      </div>
    </details>
  );
}

/* --------------------------------------------------------------------- */
/* Desktop Purchase Summary                                               */
/* --------------------------------------------------------------------- */

function PurchaseSummary({
  campaign,
  platform,
}: {
  campaign:
    MarketingCampaign;

  platform:
    MarketingPlatform;
}) {
  const purchasable =
    isCampaignPurchasable(
      campaign,
    );

  const rows = [
    {
      label:
        "Platform",

      value:
        platform.shortName,
    },

    {
      label:
        "Campaign",

      value:
        campaign.shortName,
    },

    {
      label:
        "Target",

      value:
        campaign
          .campaignTargetLabel,

      accent:
        true,
    },

    {
      label:
        "Estimated Timing",

      value:
        campaign
          .estimatedDuration,
    },
  ] as const;

  return (
    <Card
      as="aside"
      id="purchase"
      variant="campaign"
      padding="lg"
      topLine={
        campaign.featured
      }
      className={[
        "relative hidden overflow-hidden",
        "md:block",
        "lg:sticky",
        "lg:top-[calc(var(--mr-header-height)+24px)]",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute",
          "-right-24 -top-28 h-80 w-80",
          "rounded-full",
          "bg-[var(--campaign-accent)]",
          "opacity-[0.1]",
          "blur-[95px]",
        ].join(" ")}
      />

      <div className="relative">
        {/* Mark / status */}

        <div className="flex items-center gap-4">
          <CampaignMark
            campaign={
              campaign
            }
            platform={
              platform
            }
          />

          <div className="min-w-0">
            <span
              className={
                getCampaignBadgeClass(
                  campaign,
                )
              }
            >
              {campaign.featured
                ? campaign.badge ??
                  "Featured"
                : getCampaignStatusLabel(
                    campaign,
                  )}
            </span>

            <p
              className={[
                "mt-2 text-[9px] font-black uppercase",
                "tracking-[0.14em]",
                "text-white/30",
              ].join(" ")}
            >
              One-Time Campaign
            </p>
          </div>
        </div>

        {/* Price */}

        <div
          className={[
            "mt-6 rounded-[20px]",
            "border border-[var(--campaign-border)]",
            "bg-[var(--campaign-accent-soft)]",
            "p-5",
          ].join(" ")}
        >
          <p className="m-0 text-[8px] font-black uppercase tracking-[0.14em] text-white/35">
            Campaign Price
          </p>

          <p
            className={[
              "mt-2 text-4xl font-black",
              "tracking-[-0.06em]",
              "text-[var(--mr-text)]",
            ].join(" ")}
          >
            {getCampaignPriceLabel(
              campaign,
            )}
          </p>

          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.11em] text-white/27">
            No Recurring Subscription
          </p>
        </div>

        {/* Summary */}

        <div className="mt-5 grid gap-3">
          {rows.map(
            (
              row,
            ) => (
              <div
                key={
                  row.label
                }
                className={[
                  "flex items-start",
                  "justify-between gap-5",
                  "border-b border-white/[0.055]",
                  "pb-3",
                  "last:border-b-0",
                  "last:pb-0",
                ].join(" ")}
              >
                <span
                  className={[
                    "text-[9px] font-black uppercase",
                    "tracking-[0.11em]",
                    "text-white/30",
                  ].join(" ")}
                >
                  {row.label}
                </span>

                <span
                  className={joinClasses(
                    "max-w-[210px] text-right",
                    "text-sm font-black leading-5",

                    "accent" in
                      row &&
                    row.accent
                      ? "text-[var(--campaign-accent)]"
                      : "text-[var(--mr-text)]",
                  )}
                >
                  {row.value}
                </span>
              </div>
            ),
          )}
        </div>

        {/* Purchase */}

        <div className="mt-6 grid gap-2.5">
          {purchasable ? (
            <AddToCartButton
              sku={
                campaign.sku
              }
              label={
                campaign.addToCartLabel ??
                "Add Campaign"
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
              openCartOnAdd
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
            href={
              platform.href
            }
            variant="secondary"
            size="sm"
            leftIcon={
              <BackIcon />
            }
            fullWidth
          >
            Compare{" "}
            {platform.shortName}{" "}
            Campaigns
          </Button>
        </div>

        {/* Trust */}

        <div
          className={[
            "mt-4 flex items-start gap-2.5",
            "rounded-[16px]",
            "border border-white/[0.06]",
            "bg-white/[0.02]",
            "p-3.5",
          ].join(" ")}
        >
          <span className="mt-0.5 flex-[0_0_auto] text-[var(--campaign-accent)]">
            <ShieldIcon />
          </span>

          <p className="m-0 text-[10px] leading-5 text-white/36">
            Availability, SKU, currency, and price are
            verified through the trusted Money Records
            campaign catalog before checkout.
          </p>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Mobile Purchase Bar                                                    */
/* --------------------------------------------------------------------- */

function MobilePurchaseBar({
  campaign,
  platform,
}: {
  campaign:
    MarketingCampaign;

  platform:
    MarketingPlatform;
}) {
  const purchasable =
    isCampaignPurchasable(
      campaign,
    );

  return (
    <aside
      aria-label="Campaign purchase"
      className={[
        "fixed inset-x-3 z-[70]",
        "md:hidden",
      ].join(" ")}
      style={{
        bottom:
          "calc(var(--mr-mobile-bottom-height, 82px) + env(safe-area-inset-bottom, 0px) + 8px)",
      }}
    >
      <div
        className={[
          "relative overflow-hidden",
          "rounded-[20px]",
          "border border-[var(--campaign-border)]",
          "bg-[rgba(5,5,6,0.96)]",
          "p-3",
          "shadow-[0_20px_70px_rgba(0,0,0,0.72)]",
          "backdrop-blur-2xl",
        ].join(" ")}
      >
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute",
            "-right-16 -top-20 h-44 w-44",
            "rounded-full",
            "bg-[var(--campaign-accent)]",
            "opacity-[0.08]",
            "blur-[60px]",
          ].join(" ")}
        />

        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute",
            "inset-x-[18%] top-0 h-px",
            "bg-[linear-gradient(90deg,transparent,var(--campaign-accent),transparent)]",
          ].join(" ")}
        />

        <div className="relative">
          <div className="mb-2.5 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p
                className={[
                  "m-0 truncate",
                  "text-[7px] font-black uppercase",
                  "tracking-[0.12em]",
                  "text-white/28",
                ].join(" ")}
              >
                {platform.shortName} ·{" "}
                {
                  campaign
                    .campaignTargetLabel
                }
              </p>

              <p
                className={[
                  "mt-1 truncate",
                  "text-[11px] font-black",
                  "text-[var(--mr-text)]",
                ].join(" ")}
              >
                {campaign.shortName}
              </p>
            </div>

            <div className="flex-[0_0_auto] text-right">
              <p className="m-0 text-[7px] font-black uppercase tracking-[0.1em] text-white/25">
                One-Time
              </p>

              <p
                className={[
                  "mt-0.5 text-xl font-black",
                  "tracking-[-0.05em]",
                  "text-[var(--mr-text)]",
                ].join(" ")}
              >
                {getCampaignPriceLabel(
                  campaign,
                )}
              </p>
            </div>
          </div>

          {purchasable ? (
            <AddToCartButton
              sku={
                campaign.sku
              }
              label={
                campaign.addToCartLabel ??
                "Add Campaign"
              }
              variant="platform"
              platformAccent={
                platform.accent
              }
              size="sm"
              fullWidth
              cartHref="/cart"
              openCartOnAdd
              navigateToCartWhenSelected
              showMessage={
                false
              }
            />
          ) : (
            <Button
              variant="dark"
              size="sm"
              disabled
              fullWidth
            >
              {getCampaignStatusLabel(
                campaign,
              )}
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}

/* --------------------------------------------------------------------- */
/* Detail Section                                                         */
/* --------------------------------------------------------------------- */

function CampaignDetails({
  campaign,
}: {
  campaign:
    MarketingCampaign;
}) {
  return (
    <>
      {/* --------------------------------------------------------------- */}
      {/* Included                                                        */}
      {/* --------------------------------------------------------------- */}

      <section
        id="included"
        aria-label="Campaign scope"
        className="mt-10 scroll-mt-28 sm:mt-12 lg:mt-16"
      >
        <SectionHeader
          eyebrow="Campaign Scope"
          title={
            <>
              Everything Included in{" "}
              <span className="mr-text-gradient">
                Your Campaign.
              </span>
            </>
          }
          description="Review the primary deliverables and campaign-management features included with this service."
          align="split"
          width="lg"
        />

        {/* Mobile */}

        <div className="mt-6 grid gap-3 md:hidden">
          <MobileDetailAccordion
            eyebrow="Deliverables"
            title="Campaign Deliverables"
            description="The primary promotional activities included with this campaign level."
            items={
              campaign.deliverables
            }
            icon={
              <CheckIcon />
            }
          />

          <MobileDetailAccordion
            eyebrow="Campaign Management"
            title="Service Features"
            description="The process used to prepare, manage, monitor, and complete the campaign."
            items={
              campaign.features
            }
            icon={
              <ShieldIcon />
            }
          />
        </div>

        {/* Desktop */}

        <div className="mt-8 hidden gap-5 md:grid lg:grid-cols-2">
          <DetailListCard
            eyebrow="Deliverables"
            title="Campaign Deliverables"
            description="The primary promotional activities included with this campaign level."
            items={
              campaign.deliverables
            }
            icon={
              <CheckIcon />
            }
          />

          <DetailListCard
            eyebrow="Campaign Management"
            title="Service Features"
            description="The process used to prepare, manage, monitor, and complete the campaign."
            items={
              campaign.features
            }
            icon={
              <ShieldIcon />
            }
          />
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Before Purchase                                                 */}
      {/* --------------------------------------------------------------- */}

      <section
        id="requirements"
        aria-label="Campaign requirements"
        className="mt-10 scroll-mt-28 sm:mt-12 lg:mt-16"
      >
        <SectionHeader
          eyebrow="Before You Purchase"
          title={
            <>
              Make Sure the Campaign{" "}
              <span className="mr-text-gradient">
                Fits Your Release.
              </span>
            </>
          }
          description="Review who this service is designed for and prepare the information needed for campaign intake."
          align="split"
          width="lg"
        />

        {/* Mobile */}

        <div className="mt-6 grid gap-3 md:hidden">
          <MobileDetailAccordion
            eyebrow="Recommended Use"
            title="Best Suited For"
            description="Artists, releases, and promotional situations that may benefit from this campaign level."
            items={
              campaign.bestFor
            }
            icon={
              <MusicIcon />
            }
            tone="neutral"
          />

          <MobileDetailAccordion
            eyebrow="Campaign Intake"
            title="Required Release Assets"
            description="Prepare these details before campaign fulfillment begins."
            items={
              campaign.requiredAssets
            }
            icon={
              <DocumentIcon />
            }
            tone="neutral"
          />
        </div>

        {/* Desktop */}

        <div className="mt-8 hidden gap-5 md:grid lg:grid-cols-2">
          <DetailListCard
            eyebrow="Recommended Use"
            title="Best Suited For"
            description="Artists, releases, and promotional situations that may benefit from this campaign level."
            items={
              campaign.bestFor
            }
            icon={
              <MusicIcon />
            }
            tone="neutral"
          />

          <DetailListCard
            eyebrow="Campaign Intake"
            title="Required Release Assets"
            description="Prepare these details before campaign fulfillment begins."
            items={
              campaign.requiredAssets
            }
            icon={
              <DocumentIcon />
            }
            tone="neutral"
          />
        </div>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Exclusions                                                      */}
      {/* --------------------------------------------------------------- */}

      <section
        id="exclusions"
        aria-label="Campaign exclusions"
        className="mt-10 scroll-mt-28 sm:mt-12 lg:mt-16"
      >
        <SectionHeader
          eyebrow="Campaign Boundaries"
          title={
            <>
              Important{" "}
              <span className="mr-text-gradient">
                Exclusions.
              </span>
            </>
          }
          description="Review the services, outcomes, and guarantees that are not included with this campaign."
          align="split"
          width="lg"
        />

        {/* Mobile */}

        <div className="mt-6 md:hidden">
          <MobileDetailAccordion
            eyebrow="Not Included"
            title="Campaign Exclusions"
            items={
              campaign.notIncluded
            }
            icon={
              <CloseIcon />
            }
            tone="negative"
          />
        </div>

        {/* Desktop */}

        <div className="mt-8 hidden md:block">
          <DetailListCard
            eyebrow="Not Included"
            title="Campaign Exclusions"
            items={
              campaign.notIncluded
            }
            icon={
              <CloseIcon />
            }
            tone="negative"
          />
        </div>
      </section>
    </>
  );
}

/* --------------------------------------------------------------------- */
/* Final Desktop Action                                                   */
/* --------------------------------------------------------------------- */

function FinalAction({
  campaign,
  platform,
}: {
  campaign:
    MarketingCampaign;

  platform:
    MarketingPlatform;
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
      className="relative mt-12 hidden overflow-hidden md:block lg:mt-16"
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute",
          "-right-28 -top-32 h-96 w-96",
          "rounded-full",
          "bg-[var(--campaign-accent)]",
          "opacity-[0.1]",
          "blur-[110px]",
        ].join(" ")}
      />

      <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <span className="mr-badge mr-badge-featured">
            Ready to Begin?
          </span>

          <h2
            className={[
              "mt-4 text-balance",
              "text-2xl font-black leading-[1.06]",
              "tracking-[-0.04em]",
              "text-[var(--mr-text)]",
              "lg:text-3xl",
            ].join(" ")}
          >
            Select the{" "}
            {campaign.name}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/48">
            Continue with the{" "}
            <strong className="font-black text-[var(--mr-text)]">
              {getCampaignPriceLabel(
                campaign,
              )}
            </strong>{" "}
            one-time service or compare the other available{" "}
            {platform.shortName} campaign levels.
          </p>
        </div>

        <div className="grid w-full gap-2.5 sm:grid-cols-2 lg:w-auto lg:min-w-[430px]">
          {purchasable ? (
            <AddToCartButton
              sku={
                campaign.sku
              }
              label="Add Campaign"
              variant="platform"
              platformAccent={
                platform.accent
              }
              size="lg"
              fullWidth
              cartHref="/cart"
              openCartOnAdd
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
            href={
              platform.href
            }
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
  campaign:
    MarketingCampaign;

  direction:
    | "previous"
    | "next";
}) {
  const isPrevious =
    direction ===
    "previous";

  return (
    <Button
      href={
        campaign.href
      }
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
      className={[
        "h-auto min-h-[74px]",
        "justify-between",
        "rounded-[18px]",
        "px-4 py-3.5",
        "text-left",
        "sm:min-h-20",
        "sm:px-5 sm:py-4",
      ].join(" ")}
      fullWidth
    >
      <span
        className={joinClasses(
          "flex min-w-0 flex-col",

          !isPrevious &&
            "items-end text-right",
        )}
      >
        <span
          className={[
            "text-[8px] font-black uppercase",
            "tracking-[0.13em]",
            "text-white/30",
            "sm:text-[9px]",
          ].join(" ")}
        >
          {isPrevious
            ? "Previous Campaign"
            : "Next Campaign"}
        </span>

        <span
          className={[
            "mt-1 line-clamp-1",
            "text-xs font-black normal-case",
            "tracking-normal",
            "text-[var(--mr-text)]",
            "sm:text-sm",
          ].join(" ")}
        >
          {campaign.name}
        </span>

        <span
          className={[
            "mt-1 text-[10px] font-bold",
            "normal-case tracking-normal",
            "text-[var(--campaign-accent)]",
            "sm:text-xs",
          ].join(" ")}
        >
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
  campaign:
    MarketingCampaign;

  platform:
    MarketingPlatform;
}) {
  const purchasable =
    isCampaignPurchasable(
      campaign,
    );

  const serviceStructuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "Service",

    "@id":
      `${siteUrl}${campaign.href}#service`,

    name:
      campaign.name,

    description:
      campaign.longDescription,

    serviceType:
      `${platform.shortName} Music Marketing Campaign`,

    sku:
      campaign.sku,

    url:
      `${siteUrl}${campaign.href}`,

    provider: {
      "@type":
        "Organization",

      name:
        "Money Records LLC",

      url:
        siteUrl,
    },

    areaServed:
      "Worldwide",

    offers: {
      "@type":
        "Offer",

      url:
        `${siteUrl}${campaign.href}`,

      priceCurrency:
        campaign.currency,

      price:
        (
          campaign.priceCents /
          100
        ).toFixed(
          2,
        ),

      availability:
        purchasable
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",

      seller: {
        "@type":
          "Organization",

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

        position:
          1,

        name:
          "Home",

        item:
          siteUrl,
      },

      {
        "@type":
          "ListItem",

        position:
          2,

        name:
          "Services",

        item:
          `${siteUrl}/services`,
      },

      {
        "@type":
          "ListItem",

        position:
          3,

        name:
          platform.name,

        item:
          `${siteUrl}${platform.href}`,
      },

      {
        "@type":
          "ListItem",

        position:
          4,

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
        id={`${campaign.slug}-service-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeStructuredData(
              serviceStructuredData,
            ),
        }}
      />

      <script
        id={`${campaign.slug}-breadcrumb-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            serializeStructuredData(
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
    platform:
      platformSlug,

    campaign:
      campaignSlug,
  } =
    await params;

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
      className={[
        "mr-page relative overflow-hidden",
        /*
         * Extra mobile padding protects page content from the fixed
         * purchase control + global mobile bottom navigation.
         */
        "pb-44 md:pb-0",
      ].join(" ")}
      style={
        campaignStyle
      }
    >
      {/* --------------------------------------------------------------- */}
      {/* Structured Data                                                 */}
      {/* --------------------------------------------------------------- */}

      <CampaignStructuredData
        campaign={
          campaign
        }
        platform={
          platform
        }
      />

      {/* --------------------------------------------------------------- */}
      {/* Atmosphere                                                      */}
      {/* --------------------------------------------------------------- */}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute",
          "left-1/2 top-10 -z-10",
          "h-[760px] w-[1180px]",
          "max-w-[120vw]",
          "-translate-x-1/2",
          "rounded-full",
          "bg-[var(--campaign-accent)]",
          "opacity-[0.05]",
          "blur-[180px]",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 -z-20",
          "opacity-[0.12]",
          "[background-image:radial-gradient(rgba(227,179,77,0.11)_0.7px,transparent_0.7px)]",
          "[background-size:26px_26px]",
        ].join(" ")}
      />

      <Container size="wide">
        {/* ------------------------------------------------------------- */}
        {/* Breadcrumb                                                    */}
        {/* ------------------------------------------------------------- */}

        <nav
          aria-label="Campaign breadcrumb"
          className="flex min-w-0 items-center gap-1.5 overflow-x-auto pt-4 sm:gap-2 sm:pt-6 lg:pt-8"
        >
          <Button
            href="/services"
            variant="ghost"
            size="sm"
            leftIcon={
              <BackIcon />
            }
          >
            Services
          </Button>

          <span
            aria-hidden="true"
            className="flex-[0_0_auto] text-white/18"
          >
            /
          </span>

          <Button
            href={
              platform.href
            }
            variant="ghost"
            size="sm"
            className="flex-[0_0_auto]"
          >
            {platform.shortName}
          </Button>

          <span
            aria-hidden="true"
            className="flex-[0_0_auto] text-white/18"
          >
            /
          </span>

          <span
            className={[
              "flex-[0_0_auto]",
              "text-[8px] font-black uppercase",
              "tracking-[0.11em]",
              "text-[var(--campaign-accent)]",
              "sm:text-[9px]",
            ].join(" ")}
          >
            {
              campaign
                .campaignTargetLabel
            }
          </span>
        </nav>

        {/* ------------------------------------------------------------- */}
        {/* Campaign Hero                                                 */}
        {/* ------------------------------------------------------------- */}

        <section
          aria-labelledby="campaign-page-heading"
          className={[
            "relative mt-3 overflow-hidden",
            "rounded-[24px]",
            "border border-[var(--campaign-border)]",
            "bg-[linear-gradient(145deg,rgba(18,18,20,0.95),rgba(7,7,8,0.985))]",
            "p-5",
            "shadow-[0_25px_90px_rgba(0,0,0,0.48)]",
            "sm:mt-4 sm:rounded-[28px] sm:p-7",
            "lg:p-10",
          ].join(" ")}
        >
          {/* Glow */}

          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute",
              "-right-40 -top-44",
              "h-[500px] w-[500px]",
              "rounded-full",
              "bg-[var(--campaign-accent)]",
              "opacity-[0.11]",
              "blur-[140px]",
            ].join(" ")}
          />

          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute",
              "-bottom-40 -left-32",
              "h-96 w-96",
              "rounded-full",
              "bg-[var(--campaign-accent)]",
              "opacity-[0.03]",
              "blur-[120px]",
            ].join(" ")}
          />

          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute",
              "inset-x-10 top-0 h-px",
              "bg-[linear-gradient(90deg,transparent,var(--campaign-accent),transparent)]",
              "opacity-70",
            ].join(" ")}
          />

          <div className="relative grid gap-7 md:grid-cols-[minmax(0,1fr)_330px] lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-10">
            {/* --------------------------------------------------------- */}
            {/* Introduction                                              */}
            {/* --------------------------------------------------------- */}

            <div className="min-w-0">
              {/* Status */}

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={
                    getCampaignBadgeClass(
                      campaign,
                    )
                  }
                >
                  {campaign.featured
                    ? campaign.badge ??
                      "Featured Campaign"
                    : getCampaignStatusLabel(
                        campaign,
                      )}
                </span>

                <span className="mr-badge mr-badge-dark">
                  {platform.shortName}
                </span>

                <span className="mr-badge mr-badge-dark">
                  One-Time
                </span>
              </div>

              {/* Campaign identity */}

              <div className="mt-5 flex items-start gap-3.5 sm:mt-7 sm:gap-4">
                <CampaignMark
                  campaign={
                    campaign
                  }
                  platform={
                    platform
                  }
                />

                <div className="min-w-0">
                  <p
                    className={[
                      "m-0 text-[8px] font-black uppercase",
                      "tracking-[0.16em]",
                      "text-[var(--campaign-accent)]",
                      "sm:text-[9px]",
                    ].join(" ")}
                  >
                    {campaign.eyebrow}
                  </p>

                  <h1
                    id="campaign-page-heading"
                    className={[
                      "mt-2 max-w-4xl text-balance",
                      "text-[2rem] font-black",
                      "leading-[1]",
                      "tracking-[-0.05em]",
                      "text-[var(--mr-text)]",
                      "sm:text-4xl",
                      "lg:text-5xl",
                      "xl:text-[3.45rem]",
                    ].join(" ")}
                  >
                    {campaign.name}
                  </h1>
                </div>
              </div>

              {/* Description */}

              <p
                className={[
                  "mt-5 max-w-3xl",
                  "text-sm leading-7",
                  "text-white/50",
                  "sm:text-base sm:leading-8",
                ].join(" ")}
              >
                {campaign.longDescription}
              </p>

              {/* Reach statement */}

              <div
                className={[
                  "mt-5 rounded-[18px]",
                  "border border-[var(--campaign-border)]",
                  "bg-[var(--campaign-accent-soft)]",
                  "p-4",
                  "sm:mt-6",
                ].join(" ")}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={[
                      "grid h-9 w-9 flex-[0_0_36px]",
                      "place-items-center rounded-xl",
                      "border border-[var(--campaign-border)]",
                      "text-[var(--campaign-accent)]",
                    ].join(" ")}
                  >
                    <TargetIcon />
                  </span>

                  <div className="min-w-0">
                    <p className="m-0 text-[8px] font-black uppercase tracking-[0.13em] text-white/32">
                      {campaign.metricLabel}
                    </p>

                    <p className="mt-1.5 text-[11px] leading-5 text-white/46 sm:text-xs sm:leading-6">
                      {campaign.reachStatement}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation actions */}

              <div className="mt-5 grid gap-2.5 sm:flex sm:flex-wrap">
                <Button
                  href="#included"
                  variant="platform"
                  platformAccent={
                    platform.accent
                  }
                  size="lg"
                  rightIcon={
                    <ArrowIcon />
                  }
                  className="w-full sm:w-auto"
                >
                  Review Campaign
                </Button>

                <Button
                  href={
                    platform.href
                  }
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Compare Campaigns
                </Button>
              </div>

              {/* Mobile price summary */}

              <div
                className={[
                  "mt-5 flex items-end",
                  "justify-between gap-4",
                  "border-t border-white/[0.06]",
                  "pt-4",
                  "md:hidden",
                ].join(" ")}
              >
                <div>
                  <p className="m-0 text-[7px] font-black uppercase tracking-[0.11em] text-white/25">
                    One-Time Price
                  </p>

                  <p
                    className={[
                      "mt-1 text-2xl font-black",
                      "tracking-[-0.05em]",
                      "text-[var(--mr-text)]",
                    ].join(" ")}
                  >
                    {getCampaignPriceLabel(
                      campaign,
                    )}
                  </p>
                </div>

                <span
                  className={[
                    "inline-flex min-h-8 items-center",
                    "rounded-full",
                    "border border-[var(--campaign-border)]",
                    "bg-[var(--campaign-accent-soft)]",
                    "px-3",
                    "text-[7px] font-black uppercase",
                    "tracking-[0.1em]",
                    "text-[var(--campaign-accent)]",
                  ].join(" ")}
                >
                  {
                    campaign
                      .campaignTargetLabel
                  }{" "}
                  Target
                </span>
              </div>
            </div>

            {/* --------------------------------------------------------- */}
            {/* Desktop Purchase Summary                                  */}
            {/* --------------------------------------------------------- */}

            <PurchaseSummary
              campaign={
                campaign
              }
              platform={
                platform
              }
            />
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* Campaign Overview                                             */}
        {/* ------------------------------------------------------------- */}

        <CampaignOverview
          campaign={
            campaign
          }
        />

        {/* ------------------------------------------------------------- */}
        {/* Campaign Details                                              */}
        {/* ------------------------------------------------------------- */}

        <CampaignDetails
          campaign={
            campaign
          }
        />

        {/* ------------------------------------------------------------- */}
        {/* Desktop Final Purchase CTA                                    */}
        {/* ------------------------------------------------------------- */}

        <FinalAction
          campaign={
            campaign
          }
          platform={
            platform
          }
        />

        {/* ------------------------------------------------------------- */}
        {/* Campaign Standard                                             */}
        {/* ------------------------------------------------------------- */}

        <Divider
          label={`${platform.shortName} Campaign Standard`}
          variant="strong"
          spacing="lg"
        />

        <CampaignDisclaimer
          variant="platform"
          size="lg"
          accent={
            platform.accent
          }
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

        {/* ------------------------------------------------------------- */}
        {/* Previous / Next Campaign                                      */}
        {/* ------------------------------------------------------------- */}

        {previousCampaign ||
        nextCampaign ? (
          <section
            aria-label="Other campaign levels"
            className="py-9 sm:py-11 lg:py-14"
          >
            <p
              className={[
                "mb-4 text-center",
                "text-[8px] font-black uppercase",
                "tracking-[0.15em]",
                "text-white/30",
                "sm:mb-5 sm:text-[10px]",
              ].join(" ")}
            >
              Compare Other{" "}
              {platform.shortName}{" "}
              Campaigns
            </p>

            <div className="grid gap-2.5 sm:gap-4 md:grid-cols-2">
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
          <div className="py-6 sm:py-8" />
        )}
      </Container>

      {/* --------------------------------------------------------------- */}
      {/* Mobile Persistent Purchase                                     */}
      {/* --------------------------------------------------------------- */}

      <MobilePurchaseBar
        campaign={
          campaign
        }
        platform={
          platform
        }
      />

      {/* --------------------------------------------------------------- */}
      {/* Accessible availability hint                                   */}
      {/* --------------------------------------------------------------- */}

      {!purchasable ? (
        <span className="sr-only">
          This campaign is currently{" "}
          {getCampaignStatusLabel(
            campaign,
          ).toLowerCase()}
          .
        </span>
      ) : null}
    </div>
  );
}