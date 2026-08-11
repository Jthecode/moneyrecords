// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Platform Card                                         ┃
   ┃ File   : src/components/PlatformCard.tsx                              ┃
   ┃ Role   : Clickable platform block for the marketing storefront        ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Link from "next/link";
import type {
  CSSProperties,
  ReactNode,
} from "react";

import Card from "@/components/Card";
import Divider from "@/components/Divider";

import {
  formatPlatformStartingPrice,
  getPlatformStatusLabel,
  type MarketingPlatform,
  type PlatformIconKey,
} from "@/data/platforms";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type PlatformCardProps = {
  /**
   * Platform information from src/data/platforms.ts.
   */
  platform: MarketingPlatform;

  /**
   * Optional custom icon.
   *
   * When omitted, the icon is selected from platform.icon.
   */
  icon?: ReactNode;

  /**
   * Maximum number of platform highlights displayed.
   *
   * @default 3
   */
  highlightLimit?: number;

  /**
   * Displays the platform description.
   *
   * @default true
   */
  showDescription?: boolean;

  /**
   * Displays the platform campaign count.
   *
   * @default true
   */
  showCampaignCount?: boolean;

  /**
   * Displays the starting price or availability label.
   *
   * @default true
   */
  showPricing?: boolean;

  /**
   * Makes the card fill the available parent height.
   *
   * @default true
   */
  fullHeight?: boolean;

  /**
   * Uses a more compact card layout.
   *
   * @default false
   */
  compact?: boolean;

  /**
   * Optional destination override.
   */
  href?: string;

  /**
   * Optional action-label override.
   */
  actionLabel?: string;

  className?: string;
};

type PlatformStyle = CSSProperties & {
  "--platform-accent"?: string;
  "--platform-accent-soft"?: string;
};

/* --------------------------------------------------------------------- */
/* Shared Icons                                                           */
/* --------------------------------------------------------------------- */

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
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

function ClockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="14"
      height="14"
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

function SettingsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M19.2 13.4V10.6L17.1 9.9C16.9 9.4 16.7 8.9 16.4 8.5L17.4 6.5L15.5 4.6L13.5 5.6C13.1 5.3 12.6 5.1 12.1 4.9L11.4 2.8H8.6L7.9 4.9C7.4 5.1 6.9 5.3 6.5 5.6L4.5 4.6L2.6 6.5L3.6 8.5C3.3 8.9 3.1 9.4 2.9 9.9L0.8 10.6V13.4L2.9 14.1C3.1 14.6 3.3 15.1 3.6 15.5L2.6 17.5L4.5 19.4L6.5 18.4C6.9 18.7 7.4 18.9 7.9 19.1L8.6 21.2H11.4L12.1 19.1C12.6 18.9 13.1 18.7 13.5 18.4L15.5 19.4L17.4 17.5L16.4 15.5C16.7 15.1 16.9 14.6 17.1 14.1L19.2 13.4Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 0)"
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
      width="31"
      height="31"
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
      width="31"
      height="31"
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
      width="31"
      height="31"
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
      width="31"
      height="31"
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
      width="31"
      height="31"
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
      width="31"
      height="31"
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
      width="31"
      height="31"
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
      width="31"
      height="31"
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
      width="31"
      height="31"
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
      width="31"
      height="31"
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
/* Icon Resolver                                                          */
/* --------------------------------------------------------------------- */

function getPlatformIcon(icon: PlatformIconKey): ReactNode {
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

function getPriceEyebrow(
  platform: MarketingPlatform,
): string {
  switch (platform.status) {
    case "live":
      return "Starting At";

    case "custom":
      return "Pricing";

    case "coming-soon":
    default:
      return "Availability";
  }
}

function getStatusIcon(
  platform: MarketingPlatform,
): ReactNode {
  switch (platform.status) {
    case "live":
      return <CheckIcon />;

    case "custom":
      return <SettingsIcon />;

    case "coming-soon":
    default:
      return <ClockIcon />;
  }
}

function getDefaultActionLabel(
  platform: MarketingPlatform,
): string {
  if (platform.actionLabel) {
    return platform.actionLabel;
  }

  switch (platform.status) {
    case "live":
      return `Explore ${platform.shortName}`;

    case "custom":
      return `View ${platform.shortName} Services`;

    case "coming-soon":
    default:
      return `Preview ${platform.shortName}`;
  }
}

/* --------------------------------------------------------------------- */
/* Platform Card                                                          */
/* --------------------------------------------------------------------- */

export default function PlatformCard({
  platform,
  icon,
  highlightLimit = 3,
  showDescription = true,
  showCampaignCount = true,
  showPricing = true,
  fullHeight = true,
  compact = false,
  href,
  actionLabel,
  className,
}: PlatformCardProps) {
  const resolvedHref = href ?? platform.href;

  const resolvedActionLabel =
    actionLabel ?? getDefaultActionLabel(platform);

  const headingId = `${platform.id}-platform-heading`;

  const platformStyle: PlatformStyle = {
    "--platform-accent": platform.accent,
    "--platform-accent-soft": platform.accentSoft,
  };

  const displayedHighlights = platform.highlights.slice(
    0,
    Math.max(0, highlightLimit),
  );

  return (
    <Link
      href={resolvedHref}
      aria-labelledby={headingId}
      className="group block h-full rounded-[var(--mr-radius)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--platform-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
      style={platformStyle}
    >
      <Card
        as="article"
        variant={platform.featured ? "featured" : "platform"}
        padding={compact ? "md" : "lg"}
        hover
        fullHeight={fullHeight}
        topLine={platform.featured}
        className={joinClasses(
          "relative overflow-hidden",
          compact ? "min-h-[360px]" : "min-h-[455px]",
          className,
        )}
        style={platformStyle}
      >
        {/* Accent atmosphere */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--platform-accent)] opacity-[0.07] blur-[90px] transition-opacity duration-300 group-hover:opacity-[0.16]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-[var(--platform-accent)] opacity-[0.035] blur-[95px]"
        />

        <div className="relative flex h-full flex-col">
          {/* ----------------------------------------------------------- */}
          {/* Header                                                      */}
          {/* ----------------------------------------------------------- */}

          <div className="flex items-start justify-between gap-5">
            <span
              className={joinClasses(
                "relative grid flex-none place-items-center overflow-hidden",
                "border bg-[var(--platform-accent-soft)]",
                "text-[var(--platform-accent)]",
                "shadow-[0_18px_48px_rgba(0,0,0,0.32)]",
                compact
                  ? "h-14 w-14 rounded-[18px]"
                  : "h-16 w-16 rounded-[20px]",
              )}
              style={{
                borderColor:
                  "color-mix(in srgb, var(--platform-accent) 38%, transparent)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-3 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--platform-accent)_75%,white),transparent)]"
              />

              {icon ?? getPlatformIcon(platform.icon)}
            </span>

            <div className="flex flex-col items-end gap-2">
              <span className={getStatusBadgeClass(platform)}>
                {getPlatformStatusLabel(platform.status)}
              </span>

              {platform.featured ? (
                <span className="text-[9px] font-black uppercase tracking-[0.14em] text-white/30">
                  Featured Platform
                </span>
              ) : null}
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Identity                                                    */}
          {/* ----------------------------------------------------------- */}

          <div className={compact ? "mt-6" : "mt-7"}>
            <p
              className="m-0 text-[10px] font-black uppercase tracking-[0.18em]"
              style={{
                color:
                  "color-mix(in srgb, var(--platform-accent) 72%, white)",
              }}
            >
              {platform.eyebrow}
            </p>

            <h3
              id={headingId}
              className={joinClasses(
                "text-balance font-black leading-[1.05]",
                "tracking-[-0.04em] text-[var(--mr-text)]",
                "transition-colors duration-200",
                "group-hover:text-[var(--mr-gold-100)]",
                compact
                  ? "mt-2.5 text-[1.4rem]"
                  : "mt-3 text-[1.65rem]",
              )}
            >
              {platform.name}
            </h3>

            {showDescription ? (
              <p
                className={joinClasses(
                  "text-sm text-white/50",
                  compact
                    ? "mt-3 line-clamp-3 leading-6"
                    : "mt-4 leading-7",
                )}
              >
                {platform.description}
              </p>
            ) : null}
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Highlights                                                  */}
          {/* ----------------------------------------------------------- */}

          {displayedHighlights.length > 0 ? (
            <ul
              className={joinClasses(
                "grid list-none p-0",
                compact
                  ? "mt-5 gap-2"
                  : "mt-6 gap-2.5",
              )}
            >
              {displayedHighlights.map((highlight) => (
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
          ) : null}

          {/* ----------------------------------------------------------- */}
          {/* Pricing and Availability                                    */}
          {/* ----------------------------------------------------------- */}

          <div className="mt-auto pt-7">
            <Divider variant="soft" />

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {showPricing ? (
                <div className="rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4">
                  <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
                    {getPriceEyebrow(platform)}
                  </p>

                  <p
                    className={joinClasses(
                      "mt-2 font-black tracking-[-0.04em]",
                      "text-[var(--mr-text)]",
                      compact
                        ? "text-lg"
                        : "text-xl sm:text-2xl",
                    )}
                  >
                    {formatPlatformStartingPrice(platform)}
                  </p>
                </div>
              ) : null}

              {showCampaignCount ? (
                <div className="rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4">
                  <div className="flex items-center gap-2 text-[var(--platform-accent)]">
                    {getStatusIcon(platform)}

                    <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
                      Services
                    </p>
                  </div>

                  <p
                    className={joinClasses(
                      "mt-2 font-black leading-5",
                      "tracking-[-0.02em] text-[var(--mr-text)]",
                      compact
                        ? "text-sm"
                        : "text-base",
                    )}
                  >
                    {platform.campaignCountLabel}
                  </p>
                </div>
              ) : null}
            </div>

            {/* --------------------------------------------------------- */}
            {/* Full-card Action                                         */}
            {/* --------------------------------------------------------- */}

            <div
              className={joinClasses(
                "mt-5 flex min-h-12 items-center justify-between gap-4",
                "rounded-full border px-5",
                "bg-[var(--platform-accent-soft)]",
                "font-black uppercase",
                "text-[var(--platform-accent)]",
                "transition-all duration-300",
                "group-hover:-translate-y-0.5",
                "group-hover:bg-[color-mix(in_srgb,var(--platform-accent)_14%,transparent)]",
                compact
                  ? "text-[9px] tracking-[0.12em]"
                  : "text-[10px] tracking-[0.14em]",
              )}
              style={{
                borderColor:
                  "color-mix(in srgb, var(--platform-accent) 28%, transparent)",
              }}
            >
              <span>{resolvedActionLabel}</span>

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <ArrowIcon />
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}