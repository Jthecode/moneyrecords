// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Campaign Disclaimer                                   ┃
   ┃ File   : src/components/CampaignDisclaimer.tsx                        ┃
   ┃ Role   : Reusable campaign standards and results disclaimer           ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from "react";

import {
  MONEY_RECORDS_CAMPAIGN_DISCLAIMER,
  STREAMING_PLATFORM_DISCLAIMER,
} from "@/data/platforms";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type CampaignDisclaimerVariant =
  | "gold"
  | "platform"
  | "neutral"
  | "warning";

export type CampaignDisclaimerSize =
  | "sm"
  | "md"
  | "lg";

export type CampaignDisclaimerProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "title"
> & {
  /**
   * Optional title displayed above the disclaimer text.
   *
   * @default "Money Records Campaign Standard"
   */
  title?: ReactNode;

  /**
   * Main disclaimer content.
   *
   * When omitted, the standard Money Records campaign disclaimer is used.
   */
  children?: ReactNode;

  /**
   * Optional plain-text disclaimer override.
   */
  description?: string;

  /**
   * Optional supporting statements displayed beneath the main disclaimer.
   */
  points?: readonly string[];

  /**
   * Controls the visual style.
   *
   * @default "gold"
   */
  variant?: CampaignDisclaimerVariant;

  /**
   * Controls spacing and typography.
   *
   * @default "md"
   */
  size?: CampaignDisclaimerSize;

  /**
   * Platform accent used with the "platform" variant.
   *
   * Example:
   * "#1ed760"
   */
  accent?: string;

  /**
   * Soft platform background color.
   *
   * Example:
   * "rgba(30, 215, 96, 0.10)"
   */
  accentSoft?: string;

  /**
   * Displays the shield icon.
   *
   * @default true
   */
  showIcon?: boolean;

  /**
   * Displays the title.
   *
   * @default true
   */
  showTitle?: boolean;

  /**
   * Adds the standard no-artificial-engagement statement.
   *
   * @default false
   */
  includeIntegrityStatement?: boolean;

  /**
   * Uses the streaming-platform disclaimer as the default description.
   *
   * @default false
   */
  streaming?: boolean;

  /**
   * Optional platform name used in the heading.
   *
   * Example:
   * "Spotify"
   */
  platformName?: string;

  className?: string;
};

type DisclaimerStyle = CSSProperties & {
  "--disclaimer-accent"?: string;
  "--disclaimer-accent-soft"?: string;
  "--disclaimer-border"?: string;
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

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

function AlertIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
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

/* --------------------------------------------------------------------- */
/* Shared Content                                                         */
/* --------------------------------------------------------------------- */

const INTEGRITY_STATEMENT =
  "Money Records does not use bots, artificial streaming, click farms, fraudulent engagement, or guaranteed playlist placements.";

const DEFAULT_POINTS = [
  "Campaign numbers are promotional targets—not guaranteed results.",
  "Performance varies by release quality, audience targeting, creative assets, platform activity, and listener response.",
  "Purchasing a campaign does not guarantee streams, followers, revenue, chart placement, or editorial placement.",
] as const;

/* --------------------------------------------------------------------- */
/* Style Configuration                                                    */
/* --------------------------------------------------------------------- */

const sizeClasses: Record<
  CampaignDisclaimerSize,
  {
    wrapper: string;
    icon: string;
    title: string;
    description: string;
    point: string;
  }
> = {
  sm: {
    wrapper: "gap-3 rounded-xl p-4",
    icon: "h-9 w-9 flex-[0_0_36px]",
    title: "text-[9px] tracking-[0.14em]",
    description: "text-[11px] leading-5",
    point: "text-[10px] leading-5",
  },

  md: {
    wrapper: "gap-4 rounded-2xl p-5 sm:p-6",
    icon: "h-11 w-11 flex-[0_0_44px]",
    title: "text-[10px] tracking-[0.16em]",
    description: "text-xs leading-6",
    point: "text-[11px] leading-5",
  },

  lg: {
    wrapper: "gap-5 rounded-[22px] p-6 sm:p-7",
    icon: "h-12 w-12 flex-[0_0_48px]",
    title: "text-xs tracking-[0.17em]",
    description: "text-sm leading-7",
    point: "text-xs leading-6",
  },
};

/* --------------------------------------------------------------------- */
/* Utilities                                                              */
/* --------------------------------------------------------------------- */

function joinClasses(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

function getVariantStyles(
  variant: CampaignDisclaimerVariant,
  accent: string,
  accentSoft: string,
): DisclaimerStyle {
  switch (variant) {
    case "platform":
      return {
        "--disclaimer-accent": accent,
        "--disclaimer-accent-soft": accentSoft,
        "--disclaimer-border":
          `color-mix(in srgb, ${accent} 28%, transparent)`,
      };

    case "neutral":
      return {
        "--disclaimer-accent": "rgba(247, 244, 236, 0.72)",
        "--disclaimer-accent-soft": "rgba(255, 255, 255, 0.035)",
        "--disclaimer-border": "rgba(255, 255, 255, 0.09)",
      };

    case "warning":
      return {
        "--disclaimer-accent": "#f1c36d",
        "--disclaimer-accent-soft": "rgba(241, 195, 109, 0.07)",
        "--disclaimer-border": "rgba(241, 195, 109, 0.25)",
      };

    case "gold":
    default:
      return {
        "--disclaimer-accent": "var(--mr-gold-200, #e3b34d)",
        "--disclaimer-accent-soft": "rgba(211, 154, 46, 0.065)",
        "--disclaimer-border": "rgba(227, 179, 77, 0.24)",
      };
  }
}

/* --------------------------------------------------------------------- */
/* Component                                                              */
/* --------------------------------------------------------------------- */

export default function CampaignDisclaimer({
  title,
  children,
  description,
  points,
  variant = "gold",
  size = "md",
  accent = "#d6b35a",
  accentSoft = "rgba(214, 179, 90, 0.10)",
  showIcon = true,
  showTitle = true,
  includeIntegrityStatement = false,
  streaming = false,
  platformName,
  className,
  id,
  role = "note",
  ...rest
}: CampaignDisclaimerProps) {
  const sizing = sizeClasses[size];

  const disclaimerStyle = getVariantStyles(
    variant,
    accent,
    accentSoft,
  );

  const resolvedTitle =
    title ??
    (platformName
      ? `${platformName} Campaign Standard`
      : "Money Records Campaign Standard");

  const resolvedDescription =
    description ??
    (streaming
      ? STREAMING_PLATFORM_DISCLAIMER
      : MONEY_RECORDS_CAMPAIGN_DISCLAIMER);

  const resolvedPoints =
    points === undefined
      ? DEFAULT_POINTS
      : points;

  const icon =
    variant === "warning"
      ? <AlertIcon />
      : <ShieldIcon />;

  return (
    <div
      {...rest}
      id={id}
      role={role}
      style={disclaimerStyle}
      className={joinClasses(
        "relative overflow-hidden border",
        "border-[var(--disclaimer-border)]",
        "bg-[var(--disclaimer-accent-soft)]",
        "shadow-[0_18px_55px_rgba(0,0,0,0.24)]",
        sizing.wrapper,
        className,
      )}
    >
      {/* Decorative glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[var(--disclaimer-accent)] opacity-[0.065] blur-[70px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--disclaimer-accent),transparent)] opacity-60"
      />

      <div className="relative flex items-start">
        {/* Icon */}

        {showIcon ? (
          <span
            className={joinClasses(
              "grid place-items-center rounded-full border",
              "border-[var(--disclaimer-border)]",
              "bg-[var(--disclaimer-accent-soft)]",
              "text-[var(--disclaimer-accent)]",
              sizing.icon,
            )}
          >
            {icon}
          </span>
        ) : null}

        {/* Content */}

        <div
          className={joinClasses(
            "min-w-0 flex-1",
            showIcon && "ml-4",
          )}
        >
          {showTitle ? (
            <p
              className={joinClasses(
                "m-0 font-black uppercase",
                "text-[var(--disclaimer-accent)]",
                sizing.title,
              )}
            >
              {resolvedTitle}
            </p>
          ) : null}

          <div
            className={joinClasses(
              showTitle && "mt-3",
              "text-white/52",
              sizing.description,
            )}
          >
            {children ?? (
              <p className="m-0">
                {resolvedDescription}
              </p>
            )}

            {includeIntegrityStatement ? (
              <p className="mt-3">
                {INTEGRITY_STATEMENT}
              </p>
            ) : null}
          </div>

          {/* Supporting points */}

          {resolvedPoints.length > 0 ? (
            <ul className="mt-5 grid list-none gap-2.5 p-0">
              {resolvedPoints.map((point) => (
                <li
                  key={point}
                  className={joinClasses(
                    "flex items-start gap-2.5",
                    "text-white/45",
                    sizing.point,
                  )}
                >
                  <span
                    className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[var(--disclaimer-border)] bg-[var(--disclaimer-accent-soft)] text-[var(--disclaimer-accent)]"
                  >
                    <CheckIcon />
                  </span>

                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}