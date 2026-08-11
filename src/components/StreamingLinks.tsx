// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Streaming Links                                      ┃
   ┃ File   : src/components/StreamingLinks.tsx                           ┃
   ┃ Role   : Premium streaming-platform links for release pages/cards    ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { ReactNode } from "react";

import {
  type StreamingLink,
  type StreamingPlatform,
} from "@/data/releases";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type StreamingLinksVariant =
  | "grid"
  | "stack"
  | "compact";

export type StreamingLinksProps = {
  /**
   * Official release streaming destinations.
   */
  links: readonly StreamingLink[];

  /**
   * Controls the link layout.
   *
   * grid:
   * Responsive platform-card grid.
   *
   * stack:
   * Full-width vertical platform list.
   *
   * compact:
   * Small platform buttons suitable for sidebars.
   *
   * @default "grid"
   */
  variant?: StreamingLinksVariant;

  /**
   * Displays the section heading.
   *
   * @default true
   */
  showHeader?: boolean;

  eyebrow?: string;

  title?: ReactNode;

  description?: string;

  /**
   * Limits how many streaming links are displayed.
   */
  limit?: number;

  /**
   * Message displayed when no valid streaming destinations exist.
   */
  emptyMessage?: string;

  /**
   * Accessible section label.
   */
  ariaLabel?: string;

  className?: string;
};

type PlatformDefinition = {
  name: string;
  shortName: string;
  description: string;
};

/* --------------------------------------------------------------------- */
/* Platform Definitions                                                   */
/* --------------------------------------------------------------------- */

const PLATFORM_DEFINITIONS: Record<
  StreamingPlatform,
  PlatformDefinition
> = {
  "smart-link": {
    name: "All Streaming Platforms",
    shortName: "All Platforms",
    description:
      "Open the official release page and choose your preferred music platform.",
  },

  spotify: {
    name: "Spotify",
    shortName: "Spotify",
    description:
      "Listen to the release on Spotify.",
  },

  "apple-music": {
    name: "Apple Music",
    shortName: "Apple Music",
    description:
      "Listen to the release on Apple Music.",
  },

  youtube: {
    name: "YouTube",
    shortName: "YouTube",
    description:
      "Watch or listen to the official release on YouTube.",
  },

  "youtube-music": {
    name: "YouTube Music",
    shortName: "YouTube Music",
    description:
      "Listen to the release through YouTube Music.",
  },

  soundcloud: {
    name: "SoundCloud",
    shortName: "SoundCloud",
    description:
      "Stream the release on SoundCloud.",
  },

  "amazon-music": {
    name: "Amazon Music",
    shortName: "Amazon Music",
    description:
      "Listen to the release through Amazon Music.",
  },

  tidal: {
    name: "TIDAL",
    shortName: "TIDAL",
    description:
      "Stream the release on TIDAL.",
  },

  deezer: {
    name: "Deezer",
    shortName: "Deezer",
    description:
      "Listen to the release on Deezer.",
  },

  audiomack: {
    name: "Audiomack",
    shortName: "Audiomack",
    description:
      "Stream the release on Audiomack.",
  },

  pandora: {
    name: "Pandora",
    shortName: "Pandora",
    description:
      "Listen to the release through Pandora.",
  },

  bandcamp: {
    name: "Bandcamp",
    shortName: "Bandcamp",
    description:
      "Listen to or support the release through Bandcamp.",
  },
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

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
    >
      <path
        d="M13 5H19V11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M19 5L11 13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M17 13V18C17 18.6 16.6 19 16 19H6C5.4 19 5 18.6 5 18V8C5 7.4 5.4 7 6 7H11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
    >
      <path
        d="M9 7.5L17 12L9 16.5V7.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
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
        d="M3.8 12H20.2M12 3.5C14.3 5.9 15.5 8.7 15.5 12C15.5 15.3 14.3 18.1 12 20.5C9.7 18.1 8.5 15.3 8.5 12C8.5 8.7 9.7 5.9 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M7.2 9.2C10.5 8.2 14.5 8.5 17.4 10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M7.8 12.3C10.6 11.5 14 11.8 16.5 13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M8.5 15.2C10.8 14.6 13.5 14.9 15.5 15.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <path
        d="M15.4 4.2C14.8 5.8 13.5 6.8 12.1 6.7C12.1 5.3 12.9 4 14.1 3.3C14.6 3 15.1 2.9 15.5 2.8C15.6 3.2 15.6 3.7 15.4 4.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M17.8 12.1C17.8 9.9 19.6 8.8 19.7 8.8C18.7 7.3 17.1 7.1 16.6 7.1C15.3 7 14 7.9 13.3 7.9C12.6 7.9 11.5 7.1 10.3 7.1C8.8 7.1 7.3 8 6.5 9.4C4.8 12.2 6.1 16.4 7.7 18.7C8.5 19.8 9.4 21 10.6 20.9C11.8 20.9 12.2 20.2 13.7 20.2C15.1 20.2 15.6 20.9 16.8 20.9C18.1 20.9 18.9 19.8 19.7 18.6C20.6 17.3 21 16 21 15.9C20.9 15.9 17.8 14.7 17.8 12.1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <path
        d="M20 8.4C19.8 7.3 19 6.5 17.9 6.3C16.3 6 14.2 6 12 6C9.8 6 7.7 6 6.1 6.3C5 6.5 4.2 7.3 4 8.4C3.7 9.5 3.7 10.8 3.7 12C3.7 13.2 3.7 14.5 4 15.6C4.2 16.7 5 17.5 6.1 17.7C7.7 18 9.8 18 12 18C14.2 18 16.3 18 17.9 17.7C19 17.5 19.8 16.7 20 15.6C20.3 14.5 20.3 13.2 20.3 12C20.3 10.8 20.3 9.5 20 8.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      <path
        d="M10.5 9.5L15 12L10.5 14.5V9.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SoundCloudIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="23"
      height="23"
      fill="none"
    >
      <path
        d="M4 14V17M7 12V17M10 10V17M13 8V17"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M13 17H18C19.7 17 21 15.7 21 14C21 12.3 19.7 11 18 11C17.7 11 17.4 11 17.1 11.1C16.5 9.3 14.9 8 13 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AmazonMusicIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <path
        d="M8.2 15.5L11.3 7H13.3L16.5 15.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M9.3 12.7H15.3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M6.5 18C9.8 20.2 14.4 20.3 18 18.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M16.7 17.8L18.5 18.1L18.1 19.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TidalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <path
        d="M6 5L9 8L6 11L3 8L6 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M12 5L15 8L12 11L9 8L12 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M18 5L21 8L18 11L15 8L18 5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M12 11L15 14L12 17L9 14L12 11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DeezerIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="23"
      height="23"
      fill="none"
    >
      <path
        d="M4 16H7M4 13H7M8.5 16H11.5M8.5 11H11.5M13 16H16M13 9H16M17.5 16H20.5M17.5 7H20.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AudiomackIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="23"
      height="23"
      fill="none"
    >
      <path
        d="M3.5 15.5C5 15.5 5.6 12 7 12C8.4 12 8.8 17 10.3 17C11.8 17 12.2 7 13.8 7C15.4 7 15.7 14.5 17.2 14.5C18.7 14.5 19 11 20.5 11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PandoraIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <path
        d="M8 19V5H13.2C16.4 5 18.4 6.9 18.4 9.7C18.4 12.6 16.3 14.5 13.1 14.5H8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M8 10.5H13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BandcampIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <path
        d="M8 7H21L16 17H3L8 7Z"
        stroke="currentColor"
        strokeWidth="1.7"
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

function isValidStreamingUrl(
  href: string,
): boolean {
  try {
    const url =
      new URL(href);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
}

function getPlatformDefinition(
  platform: StreamingPlatform,
): PlatformDefinition {
  return PLATFORM_DEFINITIONS[
    platform
  ];
}

function getPlatformIcon(
  platform: StreamingPlatform,
): ReactNode {
  switch (platform) {
    case "smart-link":
      return <GlobeIcon />;

    case "spotify":
      return <SpotifyIcon />;

    case "apple-music":
      return <AppleIcon />;

    case "youtube":
    case "youtube-music":
      return <YouTubeIcon />;

    case "soundcloud":
      return <SoundCloudIcon />;

    case "amazon-music":
      return <AmazonMusicIcon />;

    case "tidal":
      return <TidalIcon />;

    case "deezer":
      return <DeezerIcon />;

    case "audiomack":
      return <AudiomackIcon />;

    case "pandora":
      return <PandoraIcon />;

    case "bandcamp":
      return <BandcampIcon />;

    default:
      return <MusicIcon />;
  }
}

function compareStreamingLinks(
  left: StreamingLink,
  right: StreamingLink,
): number {
  const primaryDifference =
    Number(Boolean(right.primary)) -
    Number(Boolean(left.primary));

  if (
    primaryDifference !==
    0
  ) {
    return primaryDifference;
  }

  return getPlatformDefinition(
    left.platform,
  ).name.localeCompare(
    getPlatformDefinition(
      right.platform,
    ).name,
    "en",
    {
      sensitivity:
        "base",
    },
  );
}

function prepareStreamingLinks(
  links: readonly StreamingLink[],
  limit?: number,
): StreamingLink[] {
  const validLinks =
    links
      .filter(
        (link) =>
          isValidStreamingUrl(
            link.href,
          ),
      )
      .sort(
        compareStreamingLinks,
      );

  if (
    typeof limit !== "number" ||
    !Number.isSafeInteger(limit) ||
    limit < 0
  ) {
    return validLinks;
  }

  return validLinks.slice(
    0,
    limit,
  );
}

/* --------------------------------------------------------------------- */
/* Grid Platform Link                                                     */
/* --------------------------------------------------------------------- */

function GridStreamingLink({
  link,
}: {
  link: StreamingLink;
}) {
  const platform =
    getPlatformDefinition(
      link.platform,
    );

  const actionLabel =
    link.actionLabel ??
    (
      link.platform ===
      "smart-link"
        ? "Choose Platform"
        : "Listen Now"
    );

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${actionLabel} — ${platform.name}`}
      className={joinClasses(
        "group relative flex min-h-[154px] flex-col overflow-hidden rounded-[24px]",
        "border p-5 transition duration-300",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[rgba(227,179,77,0.55)]",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-black",

        link.primary
          ? [
              "border-[rgba(227,179,77,0.3)]",
              "bg-[linear-gradient(145deg,rgba(211,154,46,0.11),rgba(255,255,255,0.025))]",
              "shadow-[0_24px_80px_rgba(0,0,0,0.34)]",
              "hover:border-[rgba(227,179,77,0.48)]",
              "hover:bg-[linear-gradient(145deg,rgba(211,154,46,0.16),rgba(255,255,255,0.04))]",
            ].join(" ")
          : [
              "border-white/[0.075]",
              "bg-white/[0.025]",
              "hover:border-[rgba(227,179,77,0.27)]",
              "hover:bg-[rgba(211,154,46,0.055)]",
            ].join(" "),
      )}
    >
      <div
        aria-hidden="true"
        className={joinClasses(
          "pointer-events-none absolute -right-16 -top-20 h-48 w-48",
          "rounded-full blur-[75px] transition-opacity duration-300",

          link.primary
            ? "bg-[rgba(227,179,77,0.12)]"
            : "bg-[rgba(227,179,77,0.06)] opacity-50 group-hover:opacity-100",
        )}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span
          className={joinClasses(
            "grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl",
            "border transition duration-300",

            link.primary
              ? [
                  "border-[rgba(227,179,77,0.3)]",
                  "bg-[rgba(211,154,46,0.09)]",
                  "text-[var(--mr-gold-100)]",
                ].join(" ")
              : [
                  "border-white/[0.085]",
                  "bg-white/[0.035]",
                  "text-white/62",
                  "group-hover:border-[rgba(227,179,77,0.26)]",
                  "group-hover:text-[var(--mr-gold-200)]",
                ].join(" "),
          )}
        >
          {getPlatformIcon(
            link.platform,
          )}
        </span>

        {link.primary ? (
          <span className="inline-flex min-h-7 items-center rounded-full border border-[rgba(227,179,77,0.26)] bg-[rgba(211,154,46,0.075)] px-3 text-[8px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)]">
            Primary Link
          </span>
        ) : (
          <span className="text-white/25 transition duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--mr-gold-200)]">
            <ExternalLinkIcon />
          </span>
        )}
      </div>

      <div className="relative mt-5">
        <p className="m-0 text-[9px] font-black uppercase tracking-[0.16em] text-white/30">
          Stream On
        </p>

        <h3 className="mt-2 text-lg font-black tracking-[-0.03em] text-[var(--mr-text)] transition-colors group-hover:text-[var(--mr-gold-100)]">
          {platform.name}
        </h3>
      </div>

      <div className="relative mt-auto flex items-center justify-between gap-4 pt-5">
        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)]">
          {actionLabel}
        </span>

        <span className="text-[var(--mr-gold-200)] transition-transform duration-300 group-hover:translate-x-1">
          <ArrowIcon />
        </span>
      </div>
    </a>
  );
}

/* --------------------------------------------------------------------- */
/* Stack Platform Link                                                    */
/* --------------------------------------------------------------------- */

function StackStreamingLink({
  link,
}: {
  link: StreamingLink;
}) {
  const platform =
    getPlatformDefinition(
      link.platform,
    );

  const actionLabel =
    link.actionLabel ??
    (
      link.platform ===
      "smart-link"
        ? "Choose Platform"
        : "Listen Now"
    );

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${actionLabel} — ${platform.name}`}
      className={joinClasses(
        "group relative flex min-h-[88px] items-center justify-between gap-5",
        "overflow-hidden rounded-[22px] border px-4 py-4 transition duration-300",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[rgba(227,179,77,0.55)]",

        link.primary
          ? [
              "border-[rgba(227,179,77,0.3)]",
              "bg-[linear-gradient(135deg,rgba(211,154,46,0.1),rgba(255,255,255,0.025))]",
              "hover:border-[rgba(227,179,77,0.48)]",
            ].join(" ")
          : [
              "border-white/[0.075]",
              "bg-white/[0.025]",
              "hover:border-[rgba(227,179,77,0.27)]",
              "hover:bg-[rgba(211,154,46,0.055)]",
            ].join(" "),
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[rgba(227,179,77,0.075)] blur-[75px]"
      />

      <span className="relative flex min-w-0 items-center gap-4">
        <span
          className={joinClasses(
            "grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border",
            "transition duration-300",

            link.primary
              ? [
                  "border-[rgba(227,179,77,0.3)]",
                  "bg-[rgba(211,154,46,0.09)]",
                  "text-[var(--mr-gold-100)]",
                ].join(" ")
              : [
                  "border-white/[0.085]",
                  "bg-white/[0.035]",
                  "text-white/60",
                  "group-hover:text-[var(--mr-gold-200)]",
                ].join(" "),
          )}
        >
          {getPlatformIcon(
            link.platform,
          )}
        </span>

        <span className="min-w-0">
          <span className="block text-[8px] font-black uppercase tracking-[0.16em] text-white/30">
            {link.primary
              ? "Official Release Link"
              : "Streaming Platform"}
          </span>

          <span className="mt-1 block truncate text-base font-black text-[var(--mr-text)] transition group-hover:text-[var(--mr-gold-100)]">
            {platform.name}
          </span>

          <span className="mt-1 hidden text-[10px] leading-5 text-white/36 sm:block">
            {platform.description}
          </span>
        </span>
      </span>

      <span className="relative flex flex-[0_0_auto] items-center gap-3">
        <span className="hidden text-[9px] font-black uppercase tracking-[0.14em] text-[var(--mr-gold-200)] sm:block">
          {actionLabel}
        </span>

        <span className="grid h-10 w-10 place-items-center rounded-full border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)] transition duration-300 group-hover:translate-x-0.5 group-hover:bg-[rgba(211,154,46,0.1)]">
          <ArrowIcon />
        </span>
      </span>
    </a>
  );
}

/* --------------------------------------------------------------------- */
/* Compact Platform Link                                                  */
/* --------------------------------------------------------------------- */

function CompactStreamingLink({
  link,
}: {
  link: StreamingLink;
}) {
  const platform =
    getPlatformDefinition(
      link.platform,
    );

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Listen on ${platform.name}`}
      title={`Listen on ${platform.name}`}
      className={joinClasses(
        "group inline-flex min-h-11 items-center gap-2.5 rounded-full border",
        "px-4 text-[9px] font-black uppercase tracking-[0.13em]",
        "transition duration-200",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[rgba(227,179,77,0.5)]",

        link.primary
          ? [
              "border-[rgba(227,179,77,0.34)]",
              "bg-[linear-gradient(135deg,rgba(239,202,112,0.98),rgba(190,128,35,0.96))]",
              "text-black",
              "shadow-[0_12px_34px_rgba(0,0,0,0.3)]",
              "hover:brightness-110",
            ].join(" ")
          : [
              "border-white/[0.085]",
              "bg-white/[0.035]",
              "text-white/62",
              "hover:border-[rgba(227,179,77,0.28)]",
              "hover:bg-[rgba(211,154,46,0.06)]",
              "hover:text-[var(--mr-gold-100)]",
            ].join(" "),
      )}
    >
      <span className="grid h-6 w-6 place-items-center">
        {getPlatformIcon(
          link.platform,
        )}
      </span>

      <span>
        {platform.shortName}
      </span>

      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        {link.primary ? (
          <PlayIcon />
        ) : (
          <ExternalLinkIcon />
        )}
      </span>
    </a>
  );
}

/* --------------------------------------------------------------------- */
/* Empty State                                                            */
/* --------------------------------------------------------------------- */

function StreamingLinksEmptyState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-white/[0.075] bg-white/[0.025] p-6 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.07)] blur-[90px]"
      />

      <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-[18px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
        <MusicIcon />
      </span>

      <p className="relative mt-5 text-sm leading-7 text-white/45">
        {message}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Streaming Links                                                        */
/* --------------------------------------------------------------------- */

export default function StreamingLinks({
  links,

  variant = "grid",

  showHeader = true,

  eyebrow = "Listen Now",

  title = (
    <>
      Choose Your{" "}
      <span className="mr-text-gradient">
        Platform.
      </span>
    </>
  ),

  description =
    "Open an official destination below to stream, watch, or save this Money Records release.",

  limit,

  emptyMessage =
    "Official streaming links are being prepared and will be added when they become available.",

  ariaLabel =
    "Official streaming destinations",

  className,
}: StreamingLinksProps) {
  const visibleLinks =
    prepareStreamingLinks(
      links,
      limit,
    );

  return (
    <section
      aria-label={ariaLabel}
      className={className}
    >
      {showHeader ? (
        <div className="mb-7">
          <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
            {eyebrow}
          </p>

          <h2 className="mt-3 text-2xl font-black leading-tight tracking-[-0.045em] text-[var(--mr-text)] sm:text-3xl">
            {title}
          </h2>

          {description ? (
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/46">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      {visibleLinks.length === 0 ? (
        <StreamingLinksEmptyState
          message={emptyMessage}
        />
      ) : variant === "compact" ? (
        <div className="flex flex-wrap gap-3">
          {visibleLinks.map(
            (link) => (
              <CompactStreamingLink
                key={`${link.platform}-${link.href}`}
                link={link}
              />
            ),
          )}
        </div>
      ) : variant === "stack" ? (
        <div className="grid gap-3">
          {visibleLinks.map(
            (link) => (
              <StackStreamingLink
                key={`${link.platform}-${link.href}`}
                link={link}
              />
            ),
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleLinks.map(
            (link) => (
              <GridStreamingLink
                key={`${link.platform}-${link.href}`}
                link={link}
              />
            ),
          )}
        </div>
      )}
    </section>
  );
}