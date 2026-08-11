// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Marketing Preview                                     ┃
   ┃ File   : src/sections/MarketingPreview.tsx                            ┃
   ┃ Role   : Homepage preview of individual platform marketing services   ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  CSSProperties,
  ReactNode,
} from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import SectionHeading from "@/components/SectionHeading";

import {
  getPlatformStatusLabel,
  getVisiblePlatforms,
  type MarketingPlatform,
  type PlatformIconKey,
} from "@/data/platforms";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type MarketingPreviewProps = {
  /**
   * Optional section ID.
   */
  id?: string;

  /**
   * Small label displayed above the section heading.
   */
  eyebrow?: ReactNode;

  /**
   * Main section title.
   */
  title?: ReactNode;

  /**
   * Supporting section description.
   */
  subtitle?: ReactNode;

  /**
   * Optional platform override.
   *
   * Defaults to every visible platform from src/data/platforms.ts.
   */
  platforms?: MarketingPlatform[];

  /**
   * Destination for the main storefront action.
   */
  servicesHref?: string;

  /**
   * Label for the main storefront action.
   */
  servicesLabel?: string;

  /**
   * Destination for artists who need help selecting a platform.
   */
  consultationHref?: string;

  /**
   * Label for the platform-help action.
   */
  consultationLabel?: string;
};

type PlatformStyle = CSSProperties & {
  "--platform-accent"?: string;
  "--platform-accent-soft"?: string;
};

/* --------------------------------------------------------------------- */
/* Spotify Campaign Preview                                               */
/* --------------------------------------------------------------------- */

const SPOTIFY_CAMPAIGN_LEVELS = [
  {
    target: "10K",
    price: "$80",
  },
  {
    target: "25K",
    price: "$179",
  },
  {
    target: "50K",
    price: "$329",
  },
  {
    target: "100K",
    price: "$599",
  },
  {
    target: "250K",
    price: "$1,399",
  },
  {
    target: "500K",
    price: "$2,599",
  },
  {
    target: "1 Million",
    price: "$4,799",
  },
] as const;

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

function HelpIcon() {
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
        d="M9.6 9.2C9.8 7.8 10.7 7 12.1 7C13.6 7 14.5 7.9 14.5 9.1C14.5 10 14 10.6 13.1 11.2C12.3 11.7 12 12.2 12 13.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <circle
        cx="12"
        cy="16.8"
        r="0.9"
        fill="currentColor"
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
      width="30"
      height="30"
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
      width="30"
      height="30"
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
      width="30"
      height="30"
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
      width="30"
      height="30"
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
      width="30"
      height="30"
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
      width="30"
      height="30"
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
      width="30"
      height="30"
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
      width="30"
      height="30"
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
      width="30"
      height="30"
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
      width="30"
      height="30"
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

function getPlatformIcon(icon: PlatformIconKey) {
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
/* Platform Helpers                                                       */
/* --------------------------------------------------------------------- */

function getPlatformBadgeClass(
  platform: MarketingPlatform,
): string {
  if (platform.featured) {
    return "mr-badge mr-badge-featured";
  }

  if (platform.status === "live") {
    return "mr-badge mr-badge-success";
  }

  return "mr-badge mr-badge-dark";
}

function getPricingEyebrow(
  platform: MarketingPlatform,
): string {
  switch (platform.status) {
    case "live":
      return "Starting at";

    case "custom":
      return "Pricing";

    case "coming-soon":
    default:
      return "Availability";
  }
}

/* --------------------------------------------------------------------- */
/* Platform Card                                                          */
/* --------------------------------------------------------------------- */

function PlatformPreviewCard({
  platform,
}: {
  platform: MarketingPlatform;
}) {
  const platformStyle: PlatformStyle = {
    "--platform-accent": platform.accent,
    "--platform-accent-soft": platform.accentSoft,
  };

  return (
    <Card
      as="article"
      variant={
        platform.featured
          ? "featured"
          : "platform"
      }
      padding="lg"
      hover
      fullHeight
      topLine={platform.featured}
      className="group relative min-h-[455px]"
      style={platformStyle}
    >
      {/* Accent glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--platform-accent)] opacity-[0.07] blur-[80px] transition-opacity duration-300 group-hover:opacity-[0.15]"
      />

      <div className="relative flex h-full flex-col">
        {/* Platform icon and status */}

        <div className="flex items-start justify-between gap-5">
          <span
            className="grid h-16 w-16 flex-[0_0_64px] place-items-center rounded-[20px] border bg-[var(--platform-accent-soft)] text-[var(--platform-accent)] shadow-[0_15px_45px_rgba(0,0,0,0.3)]"
            style={{
              borderColor:
                "color-mix(in srgb, var(--platform-accent) 38%, transparent)",
            }}
          >
            {getPlatformIcon(platform.icon)}
          </span>

          <span className={getPlatformBadgeClass(platform)}>
            {getPlatformStatusLabel(platform.status)}
          </span>
        </div>

        {/* Platform heading */}

        <p
          className="mt-7 text-[10px] font-black uppercase tracking-[0.18em]"
          style={{
            color:
              "color-mix(in srgb, var(--platform-accent) 72%, white)",
          }}
        >
          {platform.eyebrow}
        </p>

        <h3 className="mt-3 text-balance text-[1.65rem] font-black leading-[1.05] tracking-[-0.04em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
          {platform.name}
        </h3>

        <p className="mt-4 text-sm leading-7 text-white/50">
          {platform.description}
        </p>

        {/* Platform highlights */}

        <ul className="mt-6 grid list-none gap-2.5 p-0">
          {platform.highlights
            .slice(0, 3)
            .map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2.5 text-xs leading-5 text-white/52"
              >
                <span
                  className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border bg-[var(--platform-accent-soft)] text-[var(--platform-accent)]"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--platform-accent) 30%, transparent)",
                  }}
                >
                  <CheckIcon />
                </span>

                <span>{highlight}</span>
              </li>
            ))}
        </ul>

        {/* Pricing and action */}

        <div className="mt-auto pt-7">
          <Divider variant="soft" />

          <div className="mt-5 flex items-end justify-between gap-5">
            <div className="min-w-0">
              <p className="m-0 text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
                {getPricingEyebrow(platform)}
              </p>

              <p className="mt-1 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)] sm:text-2xl">
                {platform.startingPriceLabel}
              </p>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.11em] text-white/30">
                {platform.campaignCountLabel}
              </p>
            </div>

            <Button
              href={platform.href}
              variant="platform"
              platformAccent={platform.accent}
              size="sm"
              rightIcon={<ArrowIcon />}
              className="shrink-0"
            >
              Explore
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Spotify Spotlight                                                      */
/* --------------------------------------------------------------------- */

function SpotifySpotlight() {
  return (
    <Card
      as="aside"
      variant="featured"
      padding="lg"
      topLine
      className="relative mt-8 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#1ed760] opacity-[0.1] blur-[95px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#1ed760] opacity-[0.045] blur-[100px]"
      />

      <div className="relative grid gap-9 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
        {/* Spotify campaign information */}

        <div>
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 flex-[0_0_56px] place-items-center rounded-full bg-[#1ed760] text-black shadow-[0_16px_44px_rgba(30,215,96,0.2)]">
              <SpotifyIcon />
            </span>

            <div>
              <span className="mr-badge mr-badge-success">
                Campaigns Available
              </span>

              <h3 className="mt-3 text-2xl font-black tracking-[-0.035em] text-[var(--mr-text)] sm:text-3xl">
                Spotify Campaigns Starting at $80
              </h3>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/52">
            Open the Spotify platform to compare seven individual campaign
            levels. Each campaign will have its own description, scope,
            deliverables, estimated promotional-reach target, price, and
            add-to-cart action.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {SPOTIFY_CAMPAIGN_LEVELS.map((campaign) => (
              <span
                key={campaign.target}
                className="inline-flex min-h-9 items-center rounded-full border border-[#1ed760]/20 bg-[#1ed760]/[0.06] px-3 text-[10px] font-black uppercase tracking-[0.1em] text-[#78eea1]"
              >
                {campaign.target} — {campaign.price}
              </span>
            ))}
          </div>
        </div>

        {/* Spotify action */}

        <div className="grid gap-3">
          <Button
            href="/services/spotify"
            variant="platform"
            platformAccent="#1ed760"
            size="lg"
            rightIcon={<ArrowIcon />}
            fullWidth
          >
            Explore Spotify Campaigns
          </Button>

          <div className="mr-notice">
            <span
              aria-hidden="true"
              className="mt-1 grid h-6 w-6 flex-[0_0_24px] place-items-center rounded-full border border-[#1ed760]/25 bg-[#1ed760]/[0.07] text-[#78eea1]"
            >
              <CheckIcon />
            </span>

            <p className="m-0">
              Campaign numbers represent estimated promotional reach,
              exposure, impressions, or listener opportunities—not guaranteed
              Spotify streams.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Platform Help Panel                                                    */
/* --------------------------------------------------------------------- */

type PlatformHelpPanelProps = {
  platforms: MarketingPlatform[];
  servicesHref: string;
  consultationHref: string;
};

function PlatformHelpPanel({
  platforms,
  servicesHref,
  consultationHref,
}: PlatformHelpPanelProps) {
  return (
    <Card
      as="aside"
      variant="featured"
      padding="lg"
      topLine
      className="relative mt-8 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[rgba(211,154,46,0.12)] blur-[90px]"
      />

      <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="max-w-3xl">
          <span className="mr-badge mr-badge-featured">
            Platform Marketing Store
          </span>

          <h3 className="mt-5 text-balance text-2xl font-black leading-[1.05] tracking-[-0.038em] text-[var(--mr-text)] sm:text-3xl">
            Select a Platform, Then Choose the Service That Fits Your
            Release.
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/52">
            Each platform has its own page and service options. Choose Spotify,
            Apple Music, Instagram, TikTok, YouTube, VEVO, press, radio,
            SoundCloud, or artist branding based on the type of campaign your
            release needs.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <span
                key={platform.id}
                className="inline-flex min-h-8 items-center rounded-full border border-white/[0.08] bg-white/[0.025] px-3 text-[9px] font-black uppercase tracking-[0.12em] text-white/45"
              >
                {platform.shortName}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <Button
            href={servicesHref}
            variant="primary"
            size="lg"
            rightIcon={<ArrowIcon />}
            fullWidth
          >
            Explore Every Platform
          </Button>

          <Button
            href={consultationHref}
            variant="secondary"
            size="lg"
            leftIcon={<HelpIcon />}
            fullWidth
          >
            Ask About a Platform
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Section                                                                */
/* --------------------------------------------------------------------- */

export default function MarketingPreview({
  id,
  eyebrow = "Money Records Marketing",
  title = (
    <>
      Choose Your Platform.{" "}
      <span className="mr-text-gradient">
        Select Your Service.
      </span>
    </>
  ),
  subtitle = "Browse individual music-marketing services for Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO, press, radio, SoundCloud, and artist branding.",
  platforms = getVisiblePlatforms(),
  servicesHref = "/services",
  servicesLabel = "Explore All Platform Services",
  consultationHref = "/#contact",
  consultationLabel = "Ask About a Platform",
}: MarketingPreviewProps) {
  const visiblePlatforms = platforms
    .filter((platform) => platform.visible)
    .sort((a, b) => a.order - b.order);

  if (visiblePlatforms.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      aria-labelledby="marketing-preview-heading"
      className="mr-section relative overflow-hidden"
    >
      {/* Decorative atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[760px] w-[1150px] max-w-[118vw] -translate-x-1/2 rounded-full bg-[rgba(211,154,46,0.06)] blur-[165px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-25 [background-image:radial-gradient(rgba(227,179,77,0.13)_0.7px,transparent_0.7px)] [background-size:24px_24px]"
      />

      <Container size="wide">
        {/* Section heading */}

        <SectionHeading
          headingId="marketing-preview-heading"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          width="wide"
          right={
            <div className="hidden items-center gap-3 md:flex">
              <Button
                href={consultationHref}
                variant="secondary"
              >
                {consultationLabel}
              </Button>

              <Button
                href={servicesHref}
                variant="primary"
                rightIcon={<ArrowIcon />}
              >
                {servicesLabel}
              </Button>
            </div>
          }
        />

        {/* Platform storefront heading */}

        <div className="mt-12">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Individual Marketing Services
              </p>

              <h3 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                Explore Services by Platform
              </h3>
            </div>

            <p className="m-0 max-w-xl text-sm leading-6 text-white/42 sm:text-right">
              Click a platform to view its individual services, campaign
              levels, pricing, descriptions, deliverables, and purchase
              options.
            </p>
          </div>

          {/* Platform cards */}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visiblePlatforms.map((platform) => (
              <PlatformPreviewCard
                key={platform.id}
                platform={platform}
              />
            ))}
          </div>
        </div>

        {/* Spotify campaign spotlight */}

        <SpotifySpotlight />

        {/* Platform selection help */}

        <PlatformHelpPanel
          platforms={visiblePlatforms}
          servicesHref={servicesHref}
          consultationHref={consultationHref}
        />

        {/* Mobile actions */}

        <div className="mt-8 grid gap-3 md:hidden">
          <Button
            href={servicesHref}
            variant="primary"
            rightIcon={<ArrowIcon />}
            fullWidth
          >
            {servicesLabel}
          </Button>

          <Button
            href={consultationHref}
            variant="secondary"
            leftIcon={<HelpIcon />}
            fullWidth
          >
            {consultationLabel}
          </Button>
        </div>

        {/* Marketing standards */}

        <div className="mr-notice mr-notice-gold mt-8">
          <span
            aria-hidden="true"
            className="mt-1 grid h-6 w-6 flex-[0_0_24px] place-items-center rounded-full border border-[rgba(227,179,77,0.28)] bg-[rgba(211,154,46,0.08)] text-[var(--mr-gold-200)]"
          >
            <CheckIcon />
          </span>

          <div>
            <p className="m-0 text-xs font-black uppercase tracking-[0.16em] text-[var(--mr-gold-100)]">
              Money Records Marketing Standard
            </p>

            <p className="mt-2">
              Money Records does not use bots, artificial streaming, click
              farms, or guaranteed playlist placements. Campaign figures
              represent estimated promotional reach, exposure, impressions, or
              listener opportunities. Results vary by release quality,
              audience targeting, creative assets, platform performance,
              market conditions, and listener response.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}