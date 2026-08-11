// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Artist Card                                          ┃
   ┃ File   : src/components/ArtistCard.tsx                               ┃
   ┃ Role   : Premium artist-roster card with profile and release links   ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import Card from "@/components/Card";

import type {
  Artist,
  ArtistStatus,
} from "@/data/artists";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type ArtistCardVariant =
  | "default"
  | "compact"
  | "featured";

export type ArtistCardProps = {
  artist: Artist;

  /**
   * Changes the card layout and image proportions.
   *
   * @default "default"
   */
  variant?: ArtistCardVariant;

  /**
   * Prioritizes the artist image when the card appears above the fold.
   *
   * @default false
   */
  priority?: boolean;

  /**
   * Displays the artist's newest or featured release.
   *
   * @default true
   */
  showRelease?: boolean;

  /**
   * Displays genre badges.
   *
   * @default true
   */
  showGenres?: boolean;

  /**
   * Displays the artist location when available.
   *
   * @default true
   */
  showLocation?: boolean;

  /**
   * Optional class names applied to the Card component.
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

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
    >
      <path
        d="M12 21C15.5 16.8 18 13.8 18 10.5C18 7.2 15.3 4.5 12 4.5C8.7 4.5 6 7.2 6 10.5C6 13.8 8.5 16.8 12 21Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <circle
        cx="12"
        cy="10.5"
        r="2"
        stroke="currentColor"
        strokeWidth="1.7"
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

function ProfileIcon() {
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
        cy="8"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M5.5 20C6.2 16.8 8.6 15 12 15C15.4 15 17.8 16.8 18.5 20"
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

function getArtistHref(
  artist: Artist,
): string {
  return `/artists/${artist.slug}`;
}

function getArtistStatusLabel(
  status: ArtistStatus,
): string {
  switch (status) {
    case "active":
      return "Active Roster";

    case "developing":
      return "Artist Development";

    case "alumni":
      return "Label Alumni";

    default:
      return "Money Records Artist";
  }
}

function getArtistStatusClasses(
  status: ArtistStatus,
): string {
  switch (status) {
    case "active":
      return [
        "border-emerald-300/20",
        "bg-emerald-300/[0.055]",
        "text-emerald-300",
      ].join(" ");

    case "developing":
      return [
        "border-[rgba(227,179,77,0.24)]",
        "bg-[rgba(211,154,46,0.065)]",
        "text-[var(--mr-gold-200)]",
      ].join(" ");

    case "alumni":
      return [
        "border-white/[0.09]",
        "bg-white/[0.035]",
        "text-white/48",
      ].join(" ");

    default:
      return [
        "border-white/[0.09]",
        "bg-white/[0.035]",
        "text-white/48",
      ].join(" ");
  }
}

function getFeaturedRelease(
  artist: Artist,
) {
  return (
    artist.releases.find(
      (release) =>
        release.featured,
    ) ??
    artist.releases[0]
  );
}

function formatReleaseDate(
  value:
    string | undefined,
): string | undefined {
  if (!value) {
    return undefined;
  }

  const timestamp =
    Date.parse(
      `${value}T00:00:00.000Z`,
    );

  if (
    Number.isNaN(
      timestamp,
    )
  ) {
    return undefined;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month:
        "short",

      day:
        "numeric",

      year:
        "numeric",

      timeZone:
        "UTC",
    },
  ).format(
    new Date(
      timestamp,
    ),
  );
}

/* --------------------------------------------------------------------- */
/* Status Badge                                                           */
/* --------------------------------------------------------------------- */

function ArtistStatusBadge({
  status,
}: {
  status: ArtistStatus;
}) {
  return (
    <span
      className={joinClasses(
        "inline-flex min-h-7 items-center rounded-full border px-3",
        "text-[8px] font-black uppercase tracking-[0.15em]",
        getArtistStatusClasses(
          status,
        ),
      )}
    >
      <span
        aria-hidden="true"
        className="mr-2 h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_12px_currentColor]"
      />

      {getArtistStatusLabel(
        status,
      )}
    </span>
  );
}

/* --------------------------------------------------------------------- */
/* Genre Badges                                                           */
/* --------------------------------------------------------------------- */

function ArtistGenres({
  genres,
}: {
  genres:
    readonly string[];
}) {
  if (
    genres.length ===
    0
  ) {
    return null;
  }

  return (
    <div
      aria-label="Artist genres"
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
/* Featured Release                                                       */
/* --------------------------------------------------------------------- */

function ArtistReleasePreview({
  artist,
}: {
  artist: Artist;
}) {
  const release =
    getFeaturedRelease(
      artist,
    );

  if (!release) {
    return null;
  }

  const releaseDate =
    formatReleaseDate(
      release.releaseDate,
    );

  return (
    <div className="rounded-2xl border border-white/[0.065] bg-black/20 p-4">
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 flex-[0_0_56px] overflow-hidden rounded-[16px] border border-white/[0.09] bg-white/[0.035]">
          <Image
            src={
              release.artworkSrc ??
              artist.imageSrc
            }
            alt={`${release.title} artwork`}
            fill
            sizes="56px"
            className="object-cover"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(145deg,transparent_45%,rgba(0,0,0,0.34))]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="m-0 text-[8px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)]">
            Featured Release
          </p>

          <Link
            href={release.href}
            className="mt-1 block truncate text-sm font-black text-[var(--mr-text)] transition-colors hover:text-[var(--mr-gold-100)]"
          >
            {release.title}
          </Link>

          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white/32">
            {release.type ? (
              <span>
                {release.type}
              </span>
            ) : null}

            {release.type &&
            releaseDate ? (
              <span
                aria-hidden="true"
                className="text-white/18"
              >
                •
              </span>
            ) : null}

            {releaseDate ? (
              <span>
                {releaseDate}
              </span>
            ) : null}
          </div>
        </div>

        <Link
          href={release.href}
          aria-label={`View ${release.title} by ${artist.name}`}
          className={[
            "grid h-10 w-10 flex-[0_0_40px] place-items-center rounded-full",
            "border border-[rgba(227,179,77,0.18)]",
            "bg-[rgba(211,154,46,0.045)]",
            "text-[var(--mr-gold-200)] transition",
            "hover:border-[rgba(227,179,77,0.36)]",
            "hover:bg-[rgba(211,154,46,0.09)]",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-[rgba(227,179,77,0.5)]",
          ].join(" ")}
        >
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Default and Featured Card                                              */
/* --------------------------------------------------------------------- */

function StandardArtistCard({
  artist,
  variant,
  priority,
  showRelease,
  showGenres,
  showLocation,
  className,
}: Required<
  Pick<
    ArtistCardProps,
    | "artist"
    | "variant"
    | "priority"
    | "showRelease"
    | "showGenres"
    | "showLocation"
  >
> & {
  className?:
    string;
}) {
  const artistHref =
    getArtistHref(
      artist,
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
      {/* Background glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 z-[1] h-80 w-80 rounded-full bg-[rgba(211,154,46,0.08)] blur-[110px] transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Artist image */}

      <Link
        href={artistHref}
        aria-label={`View ${artist.name} artist profile`}
        className={joinClasses(
          "relative block overflow-hidden",
          isFeatured
            ? "aspect-[16/11]"
            : "aspect-[4/3]",
        )}
      >
        <Image
          src={artist.imageSrc}
          alt={artist.imageAlt}
          fill
          priority={priority}
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          className="object-cover transition duration-700 group-hover:scale-[1.035]"
        />

        {/* Image treatments */}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_15%,rgba(0,0,0,0.18)_55%,rgba(5,5,6,0.94)_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(227,179,77,0.16),transparent_38%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.7),transparent)]"
        />

        {/* Top badges */}

        <div className="absolute inset-x-4 top-4 z-[2] flex items-start justify-between gap-3 sm:inset-x-5 sm:top-5">
          <ArtistStatusBadge
            status={artist.status}
          />

          {artist.featured ? (
            <span className="inline-flex min-h-7 items-center rounded-full border border-[rgba(227,179,77,0.24)] bg-black/50 px-3 text-[8px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)] backdrop-blur-md">
              Featured
            </span>
          ) : null}
        </div>

        {/* Image footer */}

        <div className="absolute inset-x-5 bottom-5 z-[2]">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.19em] text-[var(--mr-gold-200)]">
            {artist.eyebrow}
          </p>

          <h2
            className={joinClasses(
              "mt-2 font-black leading-none tracking-[-0.05em] text-white",
              isFeatured
                ? "text-4xl sm:text-5xl"
                : "text-3xl sm:text-4xl",
            )}
          >
            {artist.name}
          </h2>
        </div>
      </Link>

      {/* Artist information */}

      <div className="relative z-[2] flex h-full flex-col p-5 sm:p-6">
        <p className="m-0 text-base font-black leading-6 tracking-[-0.025em] text-[var(--mr-text)]">
          {artist.tagline}
        </p>

        <p className="mt-3 text-sm leading-7 text-white/46">
          {artist.shortBio}
        </p>

        {showLocation &&
        artist.location ? (
          <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-white/34">
            <span className="text-[var(--mr-gold-200)]">
              <LocationIcon />
            </span>

            <span>
              {artist.location}
            </span>
          </div>
        ) : null}

        {showGenres ? (
          <div className="mt-5">
            <ArtistGenres
              genres={artist.genres}
            />
          </div>
        ) : null}

        {showRelease ? (
          <div className="mt-5">
            <ArtistReleasePreview
              artist={artist}
            />
          </div>
        ) : null}

        {/* Metrics */}

        {artist.metrics &&
        artist.metrics.length >
          0 ? (
          <div className="mt-5 grid grid-cols-2 gap-3">
            {artist.metrics
              .slice(
                0,
                2,
              )
              .map(
                (metric) => (
                  <div
                    key={`${metric.label}-${metric.value}`}
                    className="rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4"
                  >
                    <p className="m-0 text-[8px] font-black uppercase tracking-[0.14em] text-white/32">
                      {metric.label}
                    </p>

                    <p className="mt-2 text-base font-black text-[var(--mr-text)]">
                      {metric.value}
                    </p>
                  </div>
                ),
              )}
          </div>
        ) : null}

        {/* Card actions */}

        <div className="mt-auto pt-6">
          <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.3),transparent)]" />

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href={artistHref}
              className={[
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-full",
                "border border-[rgba(227,179,77,0.32)]",
                "bg-[linear-gradient(135deg,rgba(239,202,112,0.98),rgba(190,128,35,0.96))]",
                "px-5 text-[10px] font-black uppercase tracking-[0.14em] text-black",
                "shadow-[0_14px_38px_rgba(0,0,0,0.3)] transition",
                "hover:brightness-110",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-[rgba(227,179,77,0.6)]",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              ].join(" ")}
            >
              <ProfileIcon />
              View Artist
            </Link>

            <Link
              href={
                artist.releases[0]
                  ?.href ??
                artistHref
              }
              className={[
                "inline-flex min-h-11 items-center justify-center gap-2 rounded-full",
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
              <MusicIcon />
              Music
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Compact Artist Card                                                    */
/* --------------------------------------------------------------------- */

function CompactArtistCard({
  artist,
  priority,
  showGenres,
  showLocation,
  className,
}: {
  artist:
    Artist;

  priority:
    boolean;

  showGenres:
    boolean;

  showLocation:
    boolean;

  className?:
    string;
}) {
  const artistHref =
    getArtistHref(
      artist,
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
        <Link
          href={artistHref}
          aria-label={`View ${artist.name} artist profile`}
          className={[
            "relative aspect-square w-full overflow-hidden rounded-[24px]",
            "border border-white/[0.09] bg-white/[0.03]",
            "sm:h-40 sm:w-40 sm:flex-[0_0_160px]",
          ].join(" ")}
        >
          <Image
            src={artist.imageSrc}
            alt={artist.imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, 160px"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(0,0,0,0.68))]"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="m-0 text-[8px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                {artist.eyebrow}
              </p>

              <Link
                href={artistHref}
                className="mt-2 block text-2xl font-black leading-none tracking-[-0.045em] text-[var(--mr-text)] transition-colors hover:text-[var(--mr-gold-100)]"
              >
                {artist.name}
              </Link>
            </div>

            <ArtistStatusBadge
              status={artist.status}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-white/46">
            {artist.shortBio}
          </p>

          {showLocation &&
          artist.location ? (
            <div className="mt-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-white/34">
              <span className="text-[var(--mr-gold-200)]">
                <LocationIcon />
              </span>

              {artist.location}
            </div>
          ) : null}

          {showGenres ? (
            <div className="mt-4">
              <ArtistGenres
                genres={artist.genres}
              />
            </div>
          ) : null}

          <div className="mt-auto pt-5">
            <Link
              href={artistHref}
              className={[
                "inline-flex items-center gap-2",
                "text-[9px] font-black uppercase tracking-[0.15em]",
                "text-[var(--mr-gold-200)] transition",
                "hover:text-[var(--mr-gold-100)]",
              ].join(" ")}
            >
              Explore Artist
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Artist Card                                                            */
/* --------------------------------------------------------------------- */

export default function ArtistCard({
  artist,
  variant = "default",
  priority = false,
  showRelease = true,
  showGenres = true,
  showLocation = true,
  className,
}: ArtistCardProps) {
  if (
    variant ===
    "compact"
  ) {
    return (
      <CompactArtistCard
        artist={artist}
        priority={priority}
        showGenres={showGenres}
        showLocation={showLocation}
        className={className}
      />
    );
  }

  return (
    <StandardArtistCard
      artist={artist}
      variant={variant}
      priority={priority}
      showRelease={showRelease}
      showGenres={showGenres}
      showLocation={showLocation}
      className={className}
    />
  );
}