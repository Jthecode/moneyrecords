// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Release Card                                         ┃
   ┃ File   : src/components/ReleaseCard.tsx                              ┃
   ┃ Role   : Premium catalog card for releases, artists, and streaming   ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Image from "next/image";
import Link from "next/link";

import Card from "@/components/Card";

import {
  formatReleaseDate,
  getPrimaryReleaseLink,
  getReleaseContentRatingLabel,
  getReleaseStatusLabel,
  getReleaseTypeLabel,
  type Release,
  type ReleaseStatus,
} from "@/data/releases";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type ReleaseCardVariant =
  | "default"
  | "featured"
  | "compact";

export type ReleaseCardProps = {
  release: Release;

  /**
   * Controls the layout and image proportions.
   *
   * @default "default"
   */
  variant?: ReleaseCardVariant;

  /**
   * Prioritizes the artwork when the card appears above the fold.
   *
   * @default false
   */
  priority?: boolean;

  /**
   * Displays the artist name and artist-profile link.
   *
   * @default true
   */
  showArtist?: boolean;

  /**
   * Displays the release description.
   *
   * @default true
   */
  showDescription?: boolean;

  /**
   * Displays genre badges.
   *
   * @default true
   */
  showGenres?: boolean;

  /**
   * Displays a direct streaming or smart-link button.
   *
   * @default true
   */
  showStreamingLink?: boolean;

  /**
   * Optional class names applied to the outer Card.
   */
  className?: string;
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

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
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

function MusicIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
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

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
    >
      <rect
        x="4"
        y="5.5"
        width="16"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M8 3.5V7.5M16 3.5V7.5M4 9.5H20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExplicitIcon() {
  return (
    <span
      aria-hidden="true"
      className="text-[9px] font-black leading-none"
    >
      E
    </span>
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

function getReleaseHref(
  release: Release,
): string {
  return release.href;
}

function getArtistHref(
  release: Release,
): string {
  return `/artists/${release.artistSlug}`;
}

function getReleaseImage(
  release: Release,
  variant: ReleaseCardVariant,
): string {
  return variant === "featured"
    ? release.heroImageSrc
    : release.coverSrc;
}

function getStatusClasses(
  status: ReleaseStatus,
): string {
  switch (status) {
    case "released":
      return [
        "border-emerald-300/20",
        "bg-emerald-300/[0.065]",
        "text-emerald-300",
      ].join(" ");

    case "upcoming":
      return [
        "border-[rgba(227,179,77,0.26)]",
        "bg-[rgba(211,154,46,0.075)]",
        "text-[var(--mr-gold-200)]",
      ].join(" ");

    case "archived":
      return [
        "border-white/[0.09]",
        "bg-white/[0.04]",
        "text-white/46",
      ].join(" ");

    default:
      return [
        "border-white/[0.09]",
        "bg-white/[0.04]",
        "text-white/46",
      ].join(" ");
  }
}

/* --------------------------------------------------------------------- */
/* Release Status Badge                                                   */
/* --------------------------------------------------------------------- */

function ReleaseStatusBadge({
  release,
}: {
  release: Release;
}) {
  return (
    <span
      className={joinClasses(
        "inline-flex min-h-7 items-center gap-2 rounded-full border px-3",
        "text-[8px] font-black uppercase tracking-[0.15em]",
        getStatusClasses(
          release.status,
        ),
      )}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_12px_currentColor]"
      />

      {getReleaseStatusLabel(
        release,
      )}
    </span>
  );
}

/* --------------------------------------------------------------------- */
/* Release Genres                                                         */
/* --------------------------------------------------------------------- */

function ReleaseGenres({
  genres,
}: {
  genres: readonly string[];
}) {
  if (
    genres.length ===
    0
  ) {
    return null;
  }

  return (
    <div
      aria-label="Release genres"
      className="flex flex-wrap gap-2"
    >
      {genres
        .slice(
          0,
          4,
        )
        .map(
          (genre) => (
            <span
              key={genre}
              className={[
                "inline-flex min-h-7 items-center rounded-full",
                "border border-white/[0.075] bg-white/[0.03]",
                "px-3 text-[8px] font-black uppercase",
                "tracking-[0.13em] text-white/46",
              ].join(" ")}
            >
              {genre}
            </span>
          ),
        )}
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Release Metadata                                                       */
/* --------------------------------------------------------------------- */

function ReleaseMetadata({
  release,
  showArtist,
}: {
  release: Release;
  showArtist: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white/34">
      <span>
        {getReleaseTypeLabel(
          release.type,
        )}
      </span>

      <span
        aria-hidden="true"
        className="text-white/18"
      >
        •
      </span>

      <span className="inline-flex items-center gap-1.5">
        <CalendarIcon />

        {formatReleaseDate(
          release.releaseDate,
          {
            short: true,
          },
        )}
      </span>

      {showArtist ? (
        <>
          <span
            aria-hidden="true"
            className="text-white/18"
          >
            •
          </span>

          <Link
            href={getArtistHref(
              release,
            )}
            className="transition hover:text-[var(--mr-gold-200)]"
          >
            {release.artistName}
          </Link>
        </>
      ) : null}

      {release.contentRating ===
      "explicit" ? (
        <>
          <span
            aria-hidden="true"
            className="text-white/18"
          >
            •
          </span>

          <span
            title={getReleaseContentRatingLabel(
              release.contentRating,
            )}
            className="grid h-5 w-5 place-items-center rounded-[4px] border border-white/15 bg-white/[0.055] text-white/52"
          >
            <ExplicitIcon />
          </span>
        </>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Streaming Action                                                       */
/* --------------------------------------------------------------------- */

function StreamingAction({
  release,
  fullWidth = false,
}: {
  release: Release;
  fullWidth?: boolean;
}) {
  const primaryLink =
    getPrimaryReleaseLink(
      release,
    );

  if (!primaryLink) {
    return (
      <Link
        href={release.href}
        className={joinClasses(
          "inline-flex min-h-11 items-center justify-center gap-2 rounded-full",
          "border border-[rgba(227,179,77,0.32)]",
          "bg-[linear-gradient(135deg,rgba(239,202,112,0.98),rgba(190,128,35,0.96))]",
          "px-5 text-[10px] font-black uppercase tracking-[0.14em] text-black",
          "shadow-[0_14px_38px_rgba(0,0,0,0.3)] transition",
          "hover:brightness-110",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-[rgba(227,179,77,0.6)]",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          fullWidth &&
            "w-full",
        )}
      >
        <MusicIcon />
        View Release
      </Link>
    );
  }

  return (
    <a
      href={primaryLink.href}
      target="_blank"
      rel="noreferrer"
      className={joinClasses(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full",
        "border border-[rgba(227,179,77,0.32)]",
        "bg-[linear-gradient(135deg,rgba(239,202,112,0.98),rgba(190,128,35,0.96))]",
        "px-5 text-[10px] font-black uppercase tracking-[0.14em] text-black",
        "shadow-[0_14px_38px_rgba(0,0,0,0.3)] transition",
        "hover:brightness-110",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[rgba(227,179,77,0.6)]",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        fullWidth &&
          "w-full",
      )}
    >
      <PlayIcon />

      {primaryLink.actionLabel ??
        "Listen Now"}
    </a>
  );
}

/* --------------------------------------------------------------------- */
/* Default and Featured Release Card                                      */
/* --------------------------------------------------------------------- */

function StandardReleaseCard({
  release,
  variant,
  priority,
  showArtist,
  showDescription,
  showGenres,
  showStreamingLink,
  className,
}: Required<
  Pick<
    ReleaseCardProps,
    | "release"
    | "variant"
    | "priority"
    | "showArtist"
    | "showDescription"
    | "showGenres"
    | "showStreamingLink"
  >
> & {
  className?: string;
}) {
  const releaseHref =
    getReleaseHref(
      release,
    );

  const isFeatured =
    variant ===
    "featured";

  return (
    <Card
      as="article"
      padding="none"
      hover
      fullHeight
      className={joinClasses(
        "group relative overflow-hidden",
        isFeatured &&
          "border-[rgba(227,179,77,0.22)]",
        className,
      )}
    >
      {/* Atmospheric glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 z-[1] h-80 w-80 rounded-full bg-[rgba(211,154,46,0.085)] blur-[115px]"
      />

      {/* Artwork */}

      <Link
        href={releaseHref}
        aria-label={`View ${release.title} by ${release.artistName}`}
        className={joinClasses(
          "relative block overflow-hidden",
          isFeatured
            ? "aspect-[16/10]"
            : "aspect-square",
        )}
      >
        <Image
          src={getReleaseImage(
            release,
            variant,
          )}
          alt={release.coverAlt}
          fill
          priority={priority}
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          className="object-cover transition duration-700 group-hover:scale-[1.035]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_12%,rgba(0,0,0,0.16)_50%,rgba(5,5,6,0.96)_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(227,179,77,0.2),transparent_38%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.72),transparent)]"
        />

        {/* Top badges */}

        <div className="absolute inset-x-4 top-4 z-[2] flex items-start justify-between gap-3 sm:inset-x-5 sm:top-5">
          <ReleaseStatusBadge
            release={release}
          />

          {release.featured ? (
            <span className="inline-flex min-h-7 items-center rounded-full border border-[rgba(227,179,77,0.24)] bg-black/55 px-3 text-[8px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)] backdrop-blur-md">
              Featured
            </span>
          ) : null}
        </div>

        {/* Artwork footer */}

        <div className="absolute inset-x-5 bottom-5 z-[2]">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
            {release.eyebrow}
          </p>

          <h2
            className={joinClasses(
              "mt-2 font-black leading-none tracking-[-0.055em] text-white",
              isFeatured
                ? "text-4xl sm:text-5xl"
                : "text-3xl sm:text-4xl",
            )}
          >
            {release.title}
          </h2>

          {showArtist ? (
            <p className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/48">
              {release.artistName}
            </p>
          ) : null}
        </div>
      </Link>

      {/* Release information */}

      <div className="relative z-[2] flex h-full flex-col p-5 sm:p-6">
        <ReleaseMetadata
          release={release}
          showArtist={showArtist}
        />

        <p className="mt-4 text-base font-black leading-6 tracking-[-0.025em] text-[var(--mr-text)]">
          {release.tagline}
        </p>

        {showDescription ? (
          <p className="mt-3 text-sm leading-7 text-white/46">
            {release.shortDescription}
          </p>
        ) : null}

        {showGenres ? (
          <div className="mt-5">
            <ReleaseGenres
              genres={release.genres}
            />
          </div>
        ) : null}

        {release.moods.length >
        0 ? (
          <div className="mt-5 rounded-2xl border border-white/[0.065] bg-black/20 p-4">
            <p className="m-0 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)]">
              Release Mood
            </p>

            <p className="mt-2 text-xs font-bold leading-6 text-white/44">
              {release.moods
                .slice(
                  0,
                  4,
                )
                .join(
                  " · ",
                )}
            </p>
          </div>
        ) : null}

        {/* Actions */}

        <div className="mt-auto pt-6">
          <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.3),transparent)]" />

          <div
            className={joinClasses(
              "mt-5 grid gap-3",
              showStreamingLink &&
                "sm:grid-cols-2",
            )}
          >
            {showStreamingLink ? (
              <StreamingAction
                release={release}
                fullWidth
              />
            ) : null}

            <Link
              href={releaseHref}
              className={[
                "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full",
                "border border-white/[0.09] bg-white/[0.035]",
                "px-5 text-[10px] font-black uppercase tracking-[0.14em] text-white/66",
                "transition",
                "hover:border-[rgba(227,179,77,0.26)]",
                "hover:bg-[rgba(211,154,46,0.06)]",
                "hover:text-[var(--mr-gold-100)]",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-[rgba(227,179,77,0.5)]",
              ].join(" ")}
            >
              Release Details
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Compact Release Card                                                   */
/* --------------------------------------------------------------------- */

function CompactReleaseCard({
  release,
  priority,
  showArtist,
  showDescription,
  showGenres,
  showStreamingLink,
  className,
}: {
  release: Release;
  priority: boolean;
  showArtist: boolean;
  showDescription: boolean;
  showGenres: boolean;
  showStreamingLink: boolean;
  className?: string;
}) {
  const releaseHref =
    getReleaseHref(
      release,
    );

  return (
    <Card
      as="article"
      padding="md"
      hover
      fullHeight
      className={joinClasses(
        "group relative overflow-hidden",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-60 w-60 rounded-full bg-[rgba(211,154,46,0.065)] blur-[90px]"
      />

      <div className="relative flex h-full flex-col gap-5 sm:flex-row">
        {/* Compact artwork */}

        <Link
          href={releaseHref}
          aria-label={`View ${release.title} by ${release.artistName}`}
          className={[
            "relative aspect-square w-full overflow-hidden rounded-[24px]",
            "border border-white/[0.09] bg-white/[0.03]",
            "sm:h-44 sm:w-44 sm:flex-[0_0_176px]",
          ].join(" ")}
        >
          <Image
            src={release.coverSrc}
            alt={release.coverAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, 176px"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.72))]"
          />

          <div className="absolute left-3 top-3">
            <ReleaseStatusBadge
              release={release}
            />
          </div>
        </Link>

        {/* Compact content */}

        <div className="flex min-w-0 flex-1 flex-col">
          <div>
            <p className="m-0 text-[8px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
              {release.eyebrow}
            </p>

            <Link
              href={releaseHref}
              className="mt-2 block text-2xl font-black leading-none tracking-[-0.05em] text-[var(--mr-text)] transition-colors hover:text-[var(--mr-gold-100)]"
            >
              {release.title}
            </Link>

            {showArtist ? (
              <Link
                href={getArtistHref(
                  release,
                )}
                className="mt-2 inline-block text-[10px] font-black uppercase tracking-[0.14em] text-white/42 transition hover:text-[var(--mr-gold-200)]"
              >
                {release.artistName}
              </Link>
            ) : null}
          </div>

          <div className="mt-4">
            <ReleaseMetadata
              release={release}
              showArtist={false}
            />
          </div>

          {showDescription ? (
            <p className="mt-4 text-sm leading-6 text-white/46">
              {release.shortDescription}
            </p>
          ) : null}

          {showGenres ? (
            <div className="mt-4">
              <ReleaseGenres
                genres={release.genres}
              />
            </div>
          ) : null}

          <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row">
            {showStreamingLink ? (
              <StreamingAction
                release={release}
              />
            ) : null}

            <Link
              href={releaseHref}
              className={[
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-full",
                "border border-white/[0.09] bg-white/[0.035]",
                "px-5 text-[10px] font-black uppercase tracking-[0.14em] text-white/66",
                "transition",
                "hover:border-[rgba(227,179,77,0.26)]",
                "hover:bg-[rgba(211,154,46,0.06)]",
                "hover:text-[var(--mr-gold-100)]",
              ].join(" ")}
            >
              Details
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Release Card                                                           */
/* --------------------------------------------------------------------- */

export default function ReleaseCard({
  release,
  variant = "default",
  priority = false,
  showArtist = true,
  showDescription = true,
  showGenres = true,
  showStreamingLink = true,
  className,
}: ReleaseCardProps) {
  if (
    variant ===
    "compact"
  ) {
    return (
      <CompactReleaseCard
        release={release}
        priority={priority}
        showArtist={showArtist}
        showDescription={showDescription}
        showGenres={showGenres}
        showStreamingLink={showStreamingLink}
        className={className}
      />
    );
  }

  return (
    <StandardReleaseCard
      release={release}
      variant={variant}
      priority={priority}
      showArtist={showArtist}
      showDescription={showDescription}
      showGenres={showGenres}
      showStreamingLink={showStreamingLink}
      className={className}
    />
  );
}