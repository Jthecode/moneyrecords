// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Dynamic Platform Page                                 ┃
   ┃ File   : src/app/services/[platform]/page.tsx                         ┃
   ┃ Role   : Elite platform storefront and campaign selection page        ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type {
  CSSProperties,
  ReactNode,
} from "react";

import Button from "@/components/Button";
import CampaignCard from "@/components/CampaignCard";
import CampaignDisclaimer from "@/components/CampaignDisclaimer";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import SectionHeading from "@/components/SectionHeading";

import {
  getCampaignsByPlatform,
  getPlatformCampaignSummary,
  type MarketingCampaign,
} from "@/data/campaigns";

import {
  getPlatformBySlug,
  getPlatformSlugs,
  getPlatformStatusLabel,
  type MarketingPlatform,
  type PlatformIconKey,
  type PlatformStatus,
} from "@/data/platforms";

/* --------------------------------------------------------------------- */
/* Route Types                                                            */
/* --------------------------------------------------------------------- */

type PlatformPageProps = {
  params: Promise<{
    platform: string;
  }>;
};

type PlatformPageStyle = CSSProperties & {
  "--platform-accent"?: string;
  "--platform-accent-soft"?: string;
  "--platform-border"?: string;
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
}> {
  return getPlatformSlugs().map((platform) => ({
    platform,
  }));
}

/* --------------------------------------------------------------------- */
/* Dynamic Metadata                                                       */
/* --------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: PlatformPageProps): Promise<Metadata> {
  const { platform: platformSlug } = await params;

  const platform =
    getPlatformBySlug(platformSlug);

  if (!platform || !platform.visible) {
    return {
      title: "Platform Not Found",
      description:
        "The requested Money Records marketing platform could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: platform.seoTitle,
    description: platform.seoDescription,

    alternates: {
      canonical: platform.href,
    },

    openGraph: {
      type: "website",
      url: platform.href,
      siteName: "Money Records LLC",
      title: platform.seoTitle,
      description: platform.seoDescription,
    },

    twitter: {
      card: "summary_large_image",
      title: platform.seoTitle,
      description: platform.seoDescription,
    },
  };
}

/* --------------------------------------------------------------------- */
/* Shared Icons                                                           */
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

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
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

function SettingsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="3.25"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M12 3.5V5.3M12 18.7V20.5M20.5 12H18.7M5.3 12H3.5M18 6L16.7 7.3M7.3 16.7L6 18M18 18L16.7 16.7M7.3 7.3L6 6"
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

function GridIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <rect
        x="14"
        y="4"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <rect
        x="4"
        y="14"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <rect
        x="14"
        y="14"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/* Platform Icons                                                         */
/* --------------------------------------------------------------------- */

function SpotifyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      fill="currentColor"
    >
      <path d="M12 2.5A9.5 9.5 0 1 0 12 21.5A9.5 9.5 0 0 0 12 2.5ZM16.35 16.13a.71.71 0 0 1-.98.23c-2.69-1.64-6.08-2.01-10.07-1.1a.71.71 0 1 1-.32-1.39c4.37-1 8.12-.57 11.14 1.28.34.2.44.64.23.98Zm1.4-3.12a.89.89 0 0 1-1.23.29c-3.08-1.89-7.77-2.43-11.41-1.33a.89.89 0 1 1-.51-1.7c4.16-1.26 9.33-.65 12.86 1.52.42.25.55.8.29 1.22Zm.12-3.25C14.18 7.57 8.09 7.37 4.57 8.43a1.07 1.07 0 1 1-.62-2.05c4.05-1.22 10.79-.98 15.01 1.53a1.07 1.07 0 0 1-1.09 1.85Z" />
    </svg>
  );
}

function AppleMusicIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      fill="none"
    >
      <path
        d="M9 17.5V7L18 5V15.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="6.5"
        cy="17.5"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <circle
        cx="15.5"
        cy="15.5"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="12"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="17.2"
        cy="6.8"
        r="0.9"
        fill="currentColor"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      fill="none"
    >
      <path
        d="M14 4V14.5A4.5 4.5 0 1 1 10 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M14 4C14.5 6.6 16.1 8.2 19 8.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      fill="none"
    >
      <rect
        x="3"
        y="6"
        width="18"
        height="12"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M10 9L15 12L10 15V9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VevoIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      fill="none"
    >
      <path
        d="M4 6L9.8 18L12 13.4L14.2 18L20 6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M7 6H10.5M13.5 6H17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PressIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      fill="none"
    >
      <path
        d="M5 4.5H19V19.5H5V4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M8 8H16M8 11.5H16M8 15H13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RadioIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      fill="none"
    >
      <rect
        x="4"
        y="8"
        width="16"
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M7 8L16.5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <circle
        cx="15.5"
        cy="13.5"
        r="2.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M7.5 12H11M7.5 15H10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SoundCloudIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      fill="none"
    >
      <path
        d="M3.5 14.5V17M6.5 12.5V17M9.5 10.5V17M12.5 8.8V17"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M14 17H19A2.5 2.5 0 0 0 19 12C18.6 9.7 16.7 8 14.4 8C13.7 8 13.1 8.1 12.5 8.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrandingIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="34"
      height="34"
      fill="none"
    >
      <path
        d="M12 3.5L14.1 8.2L19 9.1L15.4 12.6L16.2 17.5L12 15.2L7.8 17.5L8.6 12.6L5 9.1L9.9 8.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M5 20H19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/* Platform Icon Resolver                                                 */
/* --------------------------------------------------------------------- */

function getPlatformIcon(
  icon: PlatformIconKey,
): ReactNode {
  switch (icon) {
    case "spotify":
      return <SpotifyIcon />;

    case "apple-music":
      return <AppleMusicIcon />;

    case "instagram":
      return <InstagramIcon />;

    case "tiktok":
      return <TikTokIcon />;

    case "youtube":
      return <YouTubeIcon />;

    case "vevo":
      return <VevoIcon />;

    case "press":
      return <PressIcon />;

    case "radio":
      return <RadioIcon />;

    case "soundcloud":
      return <SoundCloudIcon />;

    case "branding":
    default:
      return <BrandingIcon />;
  }
}

/* --------------------------------------------------------------------- */
/* Helpers                                                                */
/* --------------------------------------------------------------------- */

function joinClasses(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

function getStatusBadgeClass(
  status: PlatformStatus,
): string {
  switch (status) {
    case "live":
      return "mr-badge mr-badge-success";

    case "custom":
      return "mr-badge mr-badge-featured";

    case "coming-soon":
    default:
      return "mr-badge mr-badge-dark";
  }
}

function getStatusIcon(
  status: PlatformStatus,
): ReactNode {
  switch (status) {
    case "live":
      return <CheckIcon />;

    case "custom":
      return <SettingsIcon />;

    case "coming-soon":
    default:
      return <ClockIcon />;
  }
}

function getPrimaryAction(
  platform: MarketingPlatform,
): {
  href: string;
  label: string;
} {
  switch (platform.status) {
    case "live":
      return {
        href: "#campaigns",
        label: `View ${platform.shortName} Campaigns`,
      };

    case "custom":
      return {
        href: "/services#contact",
        label: `Request ${platform.shortName} Pricing`,
      };

    case "coming-soon":
    default:
      return {
        href: "/services#contact",
        label: `Ask About ${platform.shortName}`,
      };
  }
}

function getAvailabilityHeading(
  platform: MarketingPlatform,
): string {
  switch (platform.status) {
    case "live":
      return `${platform.shortName} Campaigns Are Available`;

    case "custom":
      return `${platform.shortName} Requires a Custom Review`;

    case "coming-soon":
    default:
      return `${platform.shortName} Campaigns Are Coming Soon`;
  }
}

function getAvailabilityDescription(
  platform: MarketingPlatform,
): string {
  switch (platform.status) {
    case "live":
      return `Compare the available ${platform.shortName} services below. Each campaign has its own price, target, estimated timing, deliverables, requirements, and campaign standards.`;

    case "custom":
      return `${platform.name} currently requires a project review before pricing and fulfillment can be confirmed. Availability may depend on eligibility, project scope, supplied assets, documentation, and timing.`;

    case "coming-soon":
    default:
      return `${platform.name} is being prepared for the Money Records storefront. Fixed-price services will appear after pricing, deliverables, campaign requirements, and fulfillment standards are finalized.`;
  }
}

/* --------------------------------------------------------------------- */
/* Platform Mark                                                          */
/* --------------------------------------------------------------------- */

function PlatformMark({
  platform,
}: {
  platform: MarketingPlatform;
}) {
  return (
    <div className="relative grid h-24 w-24 flex-[0_0_96px] place-items-center overflow-hidden rounded-[28px] border border-[var(--platform-border)] bg-[var(--platform-accent-soft)] text-[var(--platform-accent)] shadow-[0_24px_70px_rgba(0,0,0,0.46)]">
      <div
        aria-hidden="true"
        className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[var(--platform-accent)] opacity-20 blur-[45px]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--platform-accent),transparent)] opacity-70"
      />

      <span className="relative">
        {getPlatformIcon(platform.icon)}
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Hero Summary                                                           */
/* --------------------------------------------------------------------- */

function PlatformSummary({
  platform,
  campaignCount,
  startingPrice,
}: {
  platform: MarketingPlatform;
  campaignCount: number;
  startingPrice: string;
}) {
  const items = [
    {
      label: "Availability",
      value: getPlatformStatusLabel(
        platform.status,
      ),
    },
    {
      label: "Campaign Options",
      value:
        campaignCount > 0
          ? `${campaignCount} Available`
          : platform.campaignCountLabel,
    },
    {
      label: "Starting Price",
      value: startingPrice,
    },
  ];

  return (
    <Card
      as="aside"
      variant="platform"
      padding="lg"
      topLine
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[var(--platform-accent)] opacity-[0.1] blur-[95px]"
      />

      <div className="relative">
        <div className="flex items-center gap-5">
          <PlatformMark platform={platform} />

          <div className="min-w-0">
            <p className="m-0 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--platform-accent)]">
              Money Records Service
            </p>

            <h2 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)] sm:text-2xl">
              {platform.shortName} Storefront
            </h2>

            <p className="mt-2 text-xs leading-5 text-white/42">
              Individual platform-specific marketing services.
            </p>
          </div>
        </div>

        <Divider
          className="my-7"
          variant="soft"
        />

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4"
            >
              <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
                {item.label}
              </p>

              <p className="mt-2 text-sm font-black leading-5 text-[var(--mr-text)]">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[var(--platform-border)] bg-[var(--platform-accent-soft)] p-4">
          <span className="mt-0.5 text-[var(--platform-accent)]">
            <ShieldIcon />
          </span>

          <p className="m-0 text-xs leading-5 text-white/45">
            Review the complete service scope, requirements, timing, and
            campaign standards before purchasing.
          </p>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Compact Metric                                                         */
/* --------------------------------------------------------------------- */

function PlatformMetric({
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
        <span className="grid h-11 w-11 flex-[0_0_44px] place-items-center rounded-xl border border-[var(--platform-border)] bg-[var(--platform-accent-soft)] text-[var(--platform-accent)]">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
            {label}
          </p>

          <p className="mt-2 text-lg font-black leading-6 tracking-[-0.03em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--platform-accent)]">
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
/* Information Panel                                                      */
/* --------------------------------------------------------------------- */

function InformationPanel({
  eyebrow,
  title,
  description,
  items,
  icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly string[];
  icon: ReactNode;
}) {
  return (
    <Card
      as="article"
      padding="lg"
      fullHeight
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[var(--platform-accent)] opacity-[0.05] blur-[85px]"
      />

      <div className="relative">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border border-[var(--platform-border)] bg-[var(--platform-accent-soft)] text-[var(--platform-accent)]">
            {icon}
          </span>

          <div>
            <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--platform-accent)]">
              {eyebrow}
            </p>

            <h3 className="mt-2 text-xl font-black tracking-[-0.03em] text-[var(--mr-text)]">
              {title}
            </h3>
          </div>
        </div>

        <p className="mt-5 max-w-xl text-sm leading-7 text-white/48">
          {description}
        </p>

        <ul className="mt-6 grid list-none gap-3 p-0">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm leading-6 text-white/52"
            >
              <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[var(--platform-border)] bg-[var(--platform-accent-soft)] text-[var(--platform-accent)]">
                <CheckIcon />
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
/* Campaign Storefront                                                    */
/* --------------------------------------------------------------------- */

function CampaignStorefront({
  platform,
  campaigns,
}: {
  platform: MarketingPlatform;
  campaigns: MarketingCampaign[];
}) {
  if (campaigns.length === 0) {
    return null;
  }

  return (
    <section
      id="campaigns"
      aria-labelledby="platform-campaigns-heading"
      className="mt-16 scroll-mt-28"
    >
      <SectionHeading
        headingId="platform-campaigns-heading"
        eyebrow={`${platform.shortName} Campaign Store`}
        title={
          <>
            Select Your{" "}
            <span className="mr-text-gradient">
              {platform.shortName} Campaign.
            </span>
          </>
        }
        subtitle={`Compare ${campaigns.length} individual ${platform.shortName} campaign levels. Open any service to review its target, price, timing, deliverables, requirements, and exclusions.`}
        width="wide"
        right={
          <Button
            href="/services#contact"
            variant="secondary"
          >
            Need Help Choosing?
          </Button>
        }
      />

      <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            platform={platform}
          />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/* Availability Panel                                                     */
/* --------------------------------------------------------------------- */

function PlatformAvailabilityPanel({
  platform,
}: {
  platform: MarketingPlatform;
}) {
  const custom =
    platform.status === "custom";

  return (
    <Card
      as="section"
      variant="featured"
      padding="lg"
      topLine
      className="relative mt-16 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[var(--platform-accent)] opacity-[0.09] blur-[110px]"
      />

      <div className="relative grid gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="max-w-3xl">
          <span className={getStatusBadgeClass(platform.status)}>
            {getStatusIcon(platform.status)}
            {getPlatformStatusLabel(platform.status)}
          </span>

          <h2 className="mt-5 text-balance text-2xl font-black leading-[1.05] tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl">
            {getAvailabilityHeading(platform)}
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/52">
            {getAvailabilityDescription(platform)}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {platform.capabilities
              .slice(0, 4)
              .map((capability) => (
                <div
                  key={capability}
                  className="flex items-start gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4"
                >
                  <span className="mt-0.5 grid h-6 w-6 flex-[0_0_24px] place-items-center rounded-full border border-[var(--platform-border)] bg-[var(--platform-accent-soft)] text-[var(--platform-accent)]">
                    <CheckIcon />
                  </span>

                  <span className="text-xs leading-5 text-white/52">
                    {capability}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="grid gap-3">
          <Button
            href="/services#contact"
            variant="platform"
            platformAccent={platform.accent}
            size="lg"
            rightIcon={<ArrowIcon />}
            fullWidth
          >
            {custom
              ? `Request ${platform.shortName} Pricing`
              : `Ask About ${platform.shortName}`}
          </Button>

          <Button
            href="/services#platforms"
            variant="secondary"
            size="lg"
            leftIcon={<BackIcon />}
            fullWidth
          >
            Explore Other Platforms
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Structured Data                                                       */
/* --------------------------------------------------------------------- */

function PlatformStructuredData({
  platform,
  campaigns,
}: {
  platform: MarketingPlatform;
  campaigns: MarketingCampaign[];
}) {
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: platform.name,
    serviceType: platform.eyebrow,
    description: platform.longDescription,
    provider: {
      "@type": "Organization",
      name: "Money Records LLC",
      url: siteUrl,
    },
    url: `${siteUrl}${platform.href}`,
    hasOfferCatalog:
      campaigns.length > 0
        ? {
            "@type": "OfferCatalog",
            name: `${platform.shortName} Campaigns`,
            itemListElement: campaigns.map(
              (campaign) => ({
                "@type": "Offer",
                name: campaign.name,
                url: `${siteUrl}${campaign.href}`,
                priceCurrency: campaign.currency,
                price: (
                  campaign.priceCents / 100
                ).toFixed(2),
                availability:
                  campaign.status === "live" &&
                  campaign.purchasable
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
              }),
            ),
          }
        : undefined,
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: platform.name,
        item: `${siteUrl}${platform.href}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceStructuredData,
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbStructuredData,
          ),
        }}
      />
    </>
  );
}

/* --------------------------------------------------------------------- */
/* Platform Page                                                          */
/* --------------------------------------------------------------------- */

export default async function PlatformPage({
  params,
}: PlatformPageProps) {
  const { platform: platformSlug } =
    await params;

  const platform =
    getPlatformBySlug(platformSlug);

  if (!platform || !platform.visible) {
    notFound();
  }

  const campaigns =
    getCampaignsByPlatform(platform.slug);

  const campaignSummary =
    getPlatformCampaignSummary(platform.slug);

  const primaryAction =
    getPrimaryAction(platform);

  const startingPrice =
    campaignSummary.campaignCount > 0
      ? campaignSummary.lowestPriceLabel
      : platform.startingPriceLabel;

  const platformStyle: PlatformPageStyle = {
    "--platform-accent":
      platform.accent,

    "--platform-accent-soft":
      platform.accentSoft,

    "--platform-border":
      `color-mix(in srgb, ${platform.accent} 28%, transparent)`,
  };

  return (
    <div
      id="top"
      className="mr-page relative overflow-hidden"
      style={platformStyle}
    >
      <PlatformStructuredData
        platform={platform}
        campaigns={campaigns}
      />

      {/* Page atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[760px] w-[1180px] max-w-[120vw] -translate-x-1/2 rounded-full bg-[var(--platform-accent)] opacity-[0.05] blur-[180px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-20 [background-image:radial-gradient(rgba(227,179,77,0.11)_0.7px,transparent_0.7px)] [background-size:26px_26px]"
      />

      <Container size="wide">
        {/* Breadcrumb */}

        <nav
          aria-label="Platform breadcrumb"
          className="pt-8 md:pt-10"
        >
          <Button
            href="/services"
            variant="ghost"
            size="sm"
            leftIcon={<BackIcon />}
          >
            All Platform Services
          </Button>
        </nav>

        {/* Platform Hero */}

        <section
          aria-labelledby="platform-page-heading"
          className="relative mt-5 overflow-hidden rounded-[30px] border border-[var(--platform-border)] bg-[linear-gradient(145deg,rgba(18,18,20,0.95),rgba(7,7,8,0.98))] p-6 shadow-[0_30px_110px_rgba(0,0,0,0.52)] sm:p-8 lg:p-11"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-44 h-[500px] w-[500px] rounded-full bg-[var(--platform-accent)] opacity-[0.12] blur-[140px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[var(--platform-accent)] opacity-[0.035] blur-[120px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--platform-accent),transparent)] opacity-70"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12">
            {/* Introduction */}

            <div className="lg:py-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={getStatusBadgeClass(
                    platform.status,
                  )}
                >
                  {getStatusIcon(platform.status)}
                  {getPlatformStatusLabel(
                    platform.status,
                  )}
                </span>

                <span className="mr-badge mr-badge-dark">
                  {platform.eyebrow}
                </span>
              </div>

              <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--platform-accent)]">
                Money Records Platform Marketing
              </p>

              <h1
                id="platform-page-heading"
                className="mt-4 max-w-4xl text-balance text-4xl font-black leading-[0.98] tracking-[-0.055em] text-[var(--mr-text)] sm:text-5xl lg:text-6xl"
              >
                {platform.name}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/55 sm:text-lg">
                {platform.longDescription}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  href={primaryAction.href}
                  variant="platform"
                  platformAccent={platform.accent}
                  size="lg"
                  rightIcon={<ArrowIcon />}
                  className="w-full sm:w-auto"
                >
                  {primaryAction.label}
                </Button>

                <Button
                  href="/services#contact"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Ask Money Records
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {platform.highlights.map(
                  (highlight) => (
                    <span
                      key={highlight}
                      className="inline-flex min-h-9 items-center rounded-full border border-[var(--platform-border)] bg-[var(--platform-accent-soft)] px-4 text-[9px] font-black uppercase tracking-[0.12em] text-[var(--platform-accent)]"
                    >
                      {highlight}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Platform summary */}

            <PlatformSummary
              platform={platform}
              campaignCount={
                campaignSummary.campaignCount
              }
              startingPrice={startingPrice}
            />
          </div>
        </section>

        {/* Platform overview */}

        <section
          aria-label={`${platform.shortName} service overview`}
          className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <PlatformMetric
            icon={<GridIcon />}
            label="Platform"
            value={platform.shortName}
            description={platform.eyebrow}
          />

          <PlatformMetric
            icon={<TargetIcon />}
            label="Available Services"
            value={
              campaignSummary.campaignCount > 0
                ? `${campaignSummary.campaignCount} Campaigns`
                : platform.campaignCountLabel
            }
            description="Each service has its own price and scope."
          />

          <PlatformMetric
            icon={<ShieldIcon />}
            label="Starting Price"
            value={startingPrice}
            description="One-time pricing for available fixed-price services."
          />

          <PlatformMetric
            icon={getStatusIcon(platform.status)}
            label="Current Status"
            value={getPlatformStatusLabel(
              platform.status,
            )}
            description="Availability is shown before service selection."
          />
        </section>

        {/* Platform details */}

        <section
          aria-labelledby="platform-details-heading"
          className="mt-16"
        >
          <SectionHeading
            headingId="platform-details-heading"
            eyebrow={`${platform.shortName} Service Details`}
            title={
              <>
                Built for the{" "}
                <span className="mr-text-gradient">
                  Platform and Release.
                </span>
              </>
            }
            subtitle={`Review the service capabilities and the artists or releases that may be best suited for ${platform.name}.`}
            width="wide"
          />

          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            <InformationPanel
              eyebrow="Service Capabilities"
              title="What Money Records Supports"
              description={`The primary areas Money Records can support through its ${platform.shortName} services.`}
              items={platform.capabilities}
              icon={<TargetIcon />}
            />

            <InformationPanel
              eyebrow="Recommended Use"
              title="Best Suited For"
              description={`The types of releases, artists, or promotional goals that may fit ${platform.shortName}.`}
              items={platform.bestFor}
              icon={<CheckIcon />}
            />
          </div>
        </section>

        {/* Campaign storefront or availability */}

        {campaigns.length > 0 ? (
          <CampaignStorefront
            platform={platform}
            campaigns={campaigns}
          />
        ) : (
          <PlatformAvailabilityPanel
            platform={platform}
          />
        )}

        {/* Campaign standards */}

        <Divider
          label={`${platform.shortName} Campaign Standard`}
          variant="strong"
          spacing="lg"
        />

        <CampaignDisclaimer
          variant="platform"
          size="lg"
          accent={platform.accent}
          accentSoft={platform.accentSoft}
          platformName={platform.shortName}
          description={platform.disclaimer}
          includeIntegrityStatement
          points={[
            "Service availability, pricing, timing, deliverables, and requirements may differ by campaign.",
            "Campaign performance depends on the release, audience, supplied assets, platform activity, market conditions, and listener response.",
            "Review the complete campaign page before adding a service to your cart or completing checkout.",
          ]}
        />

        {/* Bottom navigation */}

        <div className="flex flex-col gap-3 py-14 sm:flex-row sm:items-center sm:justify-between">
          <Button
            href="/services"
            variant="secondary"
            leftIcon={<BackIcon />}
          >
            All Platform Services
          </Button>

          <Button
            href="/services#contact"
            variant="platform"
            platformAccent={platform.accent}
            rightIcon={<ArrowIcon />}
          >
            Ask About {platform.shortName}
          </Button>
        </div>
      </Container>
    </div>
  );
}