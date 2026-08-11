// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Artist Profile Page                                  ┃
   ┃ File   : src/app/artists/[slug]/page.tsx                             ┃
   ┃ Role   : Dynamic artist biography, releases, links, and label CTA    ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import ArtistCard from "@/components/ArtistCard";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";

import {
  getAllArtists,
  getArtistBySlug,
  getArtistStaticParams,
  type Artist,
  type ArtistReleasePreview,
  type ArtistSocialLink,
  type ArtistStreamingLink,
} from "@/data/artists";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                    */
/* --------------------------------------------------------------------- */

export const dynamic = "force-static";

export const dynamicParams = false;

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type ArtistProfilePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ArtistLink = {
  label: string;
  href: string;
  category: "social" | "streaming";
};

type ProfileMetricProps = {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
};

/* --------------------------------------------------------------------- */
/* Static Parameters                                                      */
/* --------------------------------------------------------------------- */

export function generateStaticParams() {
  return getArtistStaticParams();
}

/* --------------------------------------------------------------------- */
/* Dynamic Metadata                                                       */
/* --------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: ArtistProfilePageProps): Promise<Metadata> {
  const { slug } = await params;

  const artist = getArtistBySlug(slug);

  if (!artist) {
    return {
      title: "Artist Not Found",

      description:
        "The requested Money Records artist profile could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/artists/${artist.slug}`;

  return {
    title: artist.name,

    description: artist.shortBio,

    keywords: [
      artist.name,
      `${artist.name} music`,
      `${artist.name} artist`,
      `${artist.name} Money Records`,
      ...artist.genres,
      "Money Records artist",
      "independent artist",
      "record label artist",
    ],

    alternates: {
      canonical: canonicalPath,
    },

    openGraph: {
      type: "profile",
      title: `${artist.name} | Money Records`,
      description: artist.shortBio,
      url: canonicalPath,

      images: [
        {
          url: artist.heroImageSrc,
          alt: artist.imageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${artist.name} | Money Records`,
      description: artist.shortBio,

      images: [
        artist.heroImageSrc,
      ],
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

function ArtistIcon() {
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

function GlobeIcon() {
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
        d="M3.8 12H20.2M12 3.5C14.3 5.9 15.5 8.7 15.5 12C15.5 15.3 14.3 18.1 12 20.5C9.7 18.1 8.5 15.3 8.5 12C8.5 8.7 9.7 5.9 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
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
      width="16"
      height="16"
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

function LinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
    >
      <path
        d="M9.5 14.5L14.5 9.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M7.5 17H6.5C4.6 17 3 15.4 3 13.5C3 12.5 3.4 11.7 4 11L7 8C8.4 6.6 10.6 6.6 12 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M16.5 7H17.5C19.4 7 21 8.6 21 10.5C21 11.5 20.6 12.3 20 13L17 16C15.6 17.4 13.4 17.4 12 16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M5 8L12 13L19 8"
        stroke="currentColor"
        strokeWidth="1.7"
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
      width="13"
      height="13"
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
/* Helpers                                                                */
/* --------------------------------------------------------------------- */

function formatReleaseDate(
  value: string | undefined,
): string | undefined {
  if (!value) {
    return undefined;
  }

  const timestamp = Date.parse(
    `${value}T00:00:00.000Z`,
  );

  if (Number.isNaN(timestamp)) {
    return undefined;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    },
  ).format(
    new Date(timestamp),
  );
}

function getArtistStatusLabel(
  artist: Artist,
): string {
  switch (artist.status) {
    case "active":
      return "Active Money Records Artist";

    case "developing":
      return "Artist Development";

    case "alumni":
      return "Money Records Alumni";

    default:
      return "Money Records Artist";
  }
}

function getArtistLinks(
  artist: Artist,
): ArtistLink[] {
  const socialLinks = artist.socialLinks.map(
    (
      link: ArtistSocialLink,
    ): ArtistLink => ({
      label: link.label,
      href: link.href,
      category: "social",
    }),
  );

  const streamingLinks =
    artist.streamingLinks.map(
      (
        link: ArtistStreamingLink,
      ): ArtistLink => ({
        label: link.label,
        href: link.href,
        category: "streaming",
      }),
    );

  return [
    ...streamingLinks,
    ...socialLinks,
  ];
}

function getRelatedArtists(
  artist: Artist,
  limit = 3,
): Artist[] {
  return getAllArtists()
    .filter(
      (candidate) =>
        candidate.id !== artist.id &&
        candidate.status !== "alumni",
    )
    .sort((left, right) => {
      const leftSharedGenres =
        left.genres.filter((genre) =>
          artist.genres.includes(genre),
        ).length;

      const rightSharedGenres =
        right.genres.filter((genre) =>
          artist.genres.includes(genre),
        ).length;

      if (
        leftSharedGenres !==
        rightSharedGenres
      ) {
        return (
          rightSharedGenres -
          leftSharedGenres
        );
      }

      return (
        left.sortOrder -
        right.sortOrder
      );
    })
    .slice(0, limit);
}

/* --------------------------------------------------------------------- */
/* Profile Metric                                                         */
/* --------------------------------------------------------------------- */

function ProfileMetric({
  icon,
  label,
  value,
  description,
}: ProfileMetricProps) {
  return (
    <Card
      as="article"
      padding="md"
      hover
      fullHeight
      className="group"
    >
      <div className="flex h-full items-start gap-4">
        <span className="grid h-11 w-11 flex-[0_0_44px] place-items-center rounded-xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
            {label}
          </p>

          <p className="mt-2 break-words text-lg font-black leading-6 tracking-[-0.03em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
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
/* Release Card                                                           */
/* --------------------------------------------------------------------- */

function ArtistReleaseCard({
  artist,
  release,
  priority = false,
}: {
  artist: Artist;
  release: ArtistReleasePreview;
  priority?: boolean;
}) {
  const releaseDate =
    formatReleaseDate(
      release.releaseDate,
    );

  return (
    <Card
      as="article"
      padding="none"
      hover
      fullHeight
      className="group relative overflow-hidden"
    >
      <Link
        href={release.href}
        aria-label={`View ${release.title} by ${artist.name}`}
        className="relative block aspect-square overflow-hidden"
      >
        <Image
          src={
            release.artworkSrc ??
            artist.imageSrc
          }
          alt={`${release.title} by ${artist.name}`}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(5,5,6,0.94)_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_78%_8%,rgba(227,179,77,0.2),transparent_38%)]"
        />

        {release.featured ? (
          <span className="absolute left-4 top-4 inline-flex min-h-7 items-center rounded-full border border-[rgba(227,179,77,0.24)] bg-black/60 px-3 text-[8px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)] backdrop-blur-md">
            Featured Release
          </span>
        ) : null}

        <div className="absolute inset-x-5 bottom-5">
          <p className="m-0 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)]">
            {release.type ??
              "Music Release"}
          </p>

          <h3 className="mt-2 text-2xl font-black leading-none tracking-[-0.045em] text-white">
            {release.title}
          </h3>
        </div>
      </Link>

      <div className="p-5">
        {release.description ? (
          <p className="text-sm leading-7 text-white/46">
            {release.description}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.065] pt-5">
          <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/32">
            {releaseDate ??
              "Release date available soon"}
          </div>

          <Link
            href={release.href}
            className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)] transition hover:text-[var(--mr-gold-100)]"
          >
            View Release
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Artist Link Card                                                       */
/* --------------------------------------------------------------------- */

function ArtistLinkCard({
  link,
}: {
  link: ArtistLink;
}) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className={[
        "group flex min-h-14 items-center justify-between gap-4 rounded-2xl",
        "border border-white/[0.075] bg-white/[0.025] px-4 py-3",
        "transition duration-200",
        "hover:border-[rgba(227,179,77,0.28)]",
        "hover:bg-[rgba(211,154,46,0.055)]",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[rgba(227,179,77,0.5)]",
      ].join(" ")}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="grid h-9 w-9 flex-[0_0_36px] place-items-center rounded-xl border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.045)] text-[var(--mr-gold-200)]">
          {link.category ===
          "streaming" ? (
            <MusicIcon />
          ) : (
            <LinkIcon />
          )}
        </span>

        <span className="truncate text-sm font-black text-[var(--mr-text)]">
          {link.label}
        </span>
      </span>

      <span className="text-white/30 transition duration-200 group-hover:translate-x-0.5 group-hover:text-[var(--mr-gold-200)]">
        <ArrowIcon />
      </span>
    </a>
  );
}

/* --------------------------------------------------------------------- */
/* Artist Profile Page                                                    */
/* --------------------------------------------------------------------- */

export default async function ArtistProfilePage({
  params,
}: ArtistProfilePageProps) {
  const { slug } = await params;

  const artist =
    getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  const artistLinks =
    getArtistLinks(artist);

  const relatedArtists =
    getRelatedArtists(artist);

  const featuredRelease =
    artist.releases.find(
      (release) =>
        release.featured,
    ) ??
    artist.releases[0];

  const primaryContactEmail =
    artist.managementEmail ??
    artist.bookingEmail ??
    "info@moneyrecords.io";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: artist.name,
    description: artist.shortBio,
    image: artist.imageSrc,
    genre: artist.genres,
    url: `/artists/${artist.slug}`,
    sameAs: artistLinks.map(
      (link) =>
        link.href,
    ),
  };

  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      {/* Page atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[950px] w-[1450px] max-w-[128vw] -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.055)] blur-[200px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-20 [background-image:radial-gradient(rgba(227,179,77,0.1)_0.7px,transparent_0.7px)] [background-size:26px_26px]"
      />

      <Container size="wide">
        <main className="py-8 md:py-12">
          {/* ----------------------------------------------------------- */}
          {/* Breadcrumb                                                  */}
          {/* ----------------------------------------------------------- */}

          <nav
            aria-label="Artist profile breadcrumb"
            className="mb-5"
          >
            <Link
              href="/artists"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/42 transition hover:text-[var(--mr-gold-200)]"
            >
              <BackIcon />
              All Artists
            </Link>
          </nav>

          {/* ----------------------------------------------------------- */}
          {/* Artist Hero                                                 */}
          {/* ----------------------------------------------------------- */}

          <header className="relative overflow-hidden rounded-[32px] border border-[rgba(227,179,77,0.2)] bg-[linear-gradient(145deg,rgba(18,17,15,0.97),rgba(6,6,7,0.99))] shadow-[0_32px_120px_rgba(0,0,0,0.56)]">
            <Image
              src={artist.heroImageSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              className="-z-10 object-cover opacity-28"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(90deg,rgba(4,4,5,0.99)_0%,rgba(4,4,5,0.9)_54%,rgba(4,4,5,0.62)_100%)]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-40 -top-44 h-[560px] w-[560px] rounded-full bg-[rgba(227,179,77,0.14)] blur-[150px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.78),transparent)]"
            />

            <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:p-12">
              {/* Artist portrait */}

              <div className="relative mx-auto w-full max-w-[470px] lg:mx-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-[rgba(227,179,77,0.2)] bg-black/30 shadow-[0_28px_90px_rgba(0,0,0,0.56)]">
                  <Image
                    src={artist.imageSrc}
                    alt={artist.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 38vw"
                    className="object-cover"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(5,5,6,0.83)_100%)]"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_80%_8%,rgba(227,179,77,0.19),transparent_37%)]"
                  />

                  <div className="absolute inset-x-5 bottom-5">
                    <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-emerald-300/20 bg-black/60 px-4 text-[8px] font-black uppercase tracking-[0.15em] text-emerald-300 backdrop-blur-md">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]"
                      />

                      {getArtistStatusLabel(
                        artist,
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Artist information */}

              <div className="max-w-4xl">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-[18px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                    <ArtistIcon />
                  </span>

                  <div>
                    <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                      {artist.eyebrow}
                    </p>

                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.13em] text-white/30">
                      Official Artist Profile
                    </p>
                  </div>
                </div>

                <h1 className="mt-8 text-balance text-5xl font-black leading-[0.92] tracking-[-0.065em] text-[var(--mr-text)] sm:text-6xl lg:text-7xl">
                  {artist.name}
                </h1>

                <p className="mt-6 max-w-3xl text-lg font-black leading-8 tracking-[-0.025em] text-white/78 sm:text-xl">
                  {artist.tagline}
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/48 sm:text-base">
                  {artist.shortBio}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {artist.genres.map(
                    (genre) => (
                      <span
                        key={genre}
                        className="mr-badge"
                      >
                        {genre}
                      </span>
                    ),
                  )}

                  {artist.location ? (
                    <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-4 text-[9px] font-black uppercase tracking-[0.13em] text-white/50">
                      <LocationIcon />
                      {artist.location}
                    </span>
                  ) : null}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {featuredRelease ? (
                    <Button
                      href={featuredRelease.href}
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowIcon />}
                      className="w-full sm:w-auto"
                    >
                      Listen to Featured Release
                    </Button>
                  ) : null}

                  <Button
                    href={`mailto:${primaryContactEmail}`}
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Contact Artist Team
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* ----------------------------------------------------------- */}
          {/* Artist Overview Metrics                                     */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-label={`${artist.name} profile overview`}
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <ProfileMetric
              icon={<ArtistIcon />}
              label="Artist Status"
              value={getArtistStatusLabel(
                artist,
              )}
              description="Current position within the public Money Records artist roster."
            />

            <ProfileMetric
              icon={<MusicIcon />}
              label="Public Catalog"
              value={`${artist.releases.length} ${
                artist.releases.length === 1
                  ? "Release"
                  : "Releases"
              }`}
              description="Music currently connected to this official artist profile."
            />

            <ProfileMetric
              icon={<GlobeIcon />}
              label="Creative Direction"
              value={
                artist.genres.join(
                  " · ",
                ) || "Independent Music"
              }
              description="The primary genres and creative lanes represented by the artist."
            />

            <ProfileMetric
              icon={<LinkIcon />}
              label="Official Links"
              value={`${artistLinks.length} ${
                artistLinks.length === 1
                  ? "Destination"
                  : "Destinations"
              }`}
              description="Verified streaming, social, and artist destinations currently listed."
            />
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Biography and Links                                         */}
          {/* ----------------------------------------------------------- */}

          <div className="grid gap-8 py-14 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start md:py-20">
            {/* Biography */}

            <section
              aria-labelledby="artist-biography-heading"
              className="min-w-0"
            >
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Artist Story
              </p>

              <h2
                id="artist-biography-heading"
                className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
              >
                About {artist.name}
              </h2>

              <Card
                as="article"
                variant="featured"
                padding="lg"
                topLine
                className="relative mt-7 overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[rgba(227,179,77,0.075)] blur-[120px]"
                />

                <div className="relative space-y-6">
                  {artist.biography.map(
                    (
                      paragraph,
                      index,
                    ) => (
                      <p
                        key={`${artist.id}-biography-${index}`}
                        className="m-0 text-sm leading-8 text-white/52 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ),
                  )}
                </div>
              </Card>

              {/* Artist development standards */}

              <Card
                as="section"
                padding="lg"
                className="relative mt-6 overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[rgba(227,179,77,0.055)] blur-[100px]"
                />

                <div className="relative">
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                    Money Records Development
                  </p>

                  <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
                    Building Beyond One Release
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/47">
                    Money Records supports artist growth through focused
                    positioning, professional presentation, platform
                    strategy, and complete release execution.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      "Artist positioning and brand development",
                      "Release planning and campaign strategy",
                      "Global distribution and platform preparation",
                      "Streaming, social, PR, and visual rollout support",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4"
                      >
                        <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                          <CheckIcon />
                        </span>

                        <p className="m-0 text-xs leading-6 text-white/47">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </section>

            {/* Artist links and contact */}

            <aside className="lg:sticky lg:top-28">
              <Card
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
                aria-labelledby="artist-links-heading"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[rgba(227,179,77,0.09)] blur-[100px]"
                />

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                      <LinkIcon />
                    </span>

                    <div>
                      <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                        Official Destinations
                      </p>

                      <h2
                        id="artist-links-heading"
                        className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]"
                      >
                        Follow and Listen
                      </h2>
                    </div>
                  </div>

                  <Divider
                    className="my-7"
                    variant="soft"
                  />

                  {artistLinks.length > 0 ? (
                    <div className="grid gap-3">
                      {artistLinks.map(
                        (link) => (
                          <ArtistLinkCard
                            key={`${link.category}-${link.label}-${link.href}`}
                            link={link}
                          />
                        ),
                      )}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-white/[0.065] bg-white/[0.025] p-5">
                      <p className="text-sm leading-7 text-white/45">
                        Official streaming and social links will be added to
                        this artist profile as they become available.
                      </p>
                    </div>
                  )}

                  <Divider
                    className="my-7"
                    variant="soft"
                  />

                  <div className="flex items-start gap-3 rounded-2xl border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.04)] p-4">
                    <span className="mt-0.5 text-[var(--mr-gold-200)]">
                      <EmailIcon />
                    </span>

                    <div className="min-w-0">
                      <p className="m-0 text-[9px] font-black uppercase tracking-[0.14em] text-white/40">
                        Artist Inquiries
                      </p>

                      <a
                        href={`mailto:${primaryContactEmail}`}
                        className="mt-2 block break-all text-sm font-black text-[var(--mr-gold-200)] hover:underline"
                      >
                        {primaryContactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3">
                    <Button
                      href={`mailto:${primaryContactEmail}`}
                      variant="primary"
                      size="lg"
                      fullWidth
                    >
                      Contact Artist Team
                    </Button>

                    <Button
                      href="/artists"
                      variant="secondary"
                      size="sm"
                      leftIcon={<BackIcon />}
                      fullWidth
                    >
                      Explore All Artists
                    </Button>
                  </div>
                </div>
              </Card>
            </aside>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Artist Releases                                             */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="artist-releases-heading"
            className="pb-14 md:pb-20"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  Artist Catalog
                </p>

                <h2
                  id="artist-releases-heading"
                  className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
                >
                  Releases by {artist.name}
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/48 sm:text-base">
                  Explore official releases connected to this Money Records
                  artist profile.
                </p>
              </div>

              <Button
                href="/releases"
                variant="secondary"
                size="lg"
                rightIcon={<ArrowIcon />}
                className="w-full md:w-auto"
              >
                Explore All Releases
              </Button>
            </div>

            <Divider
              className="my-8"
              variant="strong"
            />

            {artist.releases.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {artist.releases.map(
                  (
                    release,
                    index,
                  ) => (
                    <ArtistReleaseCard
                      key={release.slug}
                      artist={artist}
                      release={release}
                      priority={index < 2}
                    />
                  ),
                )}
              </div>
            ) : (
              <Card
                as="section"
                padding="lg"
                className="text-center"
              >
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                  <MusicIcon />
                </span>

                <h3 className="mt-6 text-2xl font-black text-[var(--mr-text)]">
                  Releases Coming Soon
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/46">
                  New music and official release information will be added to
                  this artist profile as it becomes available.
                </p>
              </Card>
            )}
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Related Artists                                             */}
          {/* ----------------------------------------------------------- */}

          {relatedArtists.length > 0 ? (
            <section
              aria-labelledby="related-artists-heading"
              className="pb-14 md:pb-20"
            >
              <div>
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  Money Records Roster
                </p>

                <h2
                  id="related-artists-heading"
                  className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
                >
                  Explore More Artists
                </h2>
              </div>

              <Divider
                className="my-8"
                variant="strong"
              />

              <div className="grid gap-6 lg:grid-cols-2">
                {relatedArtists.map(
                  (relatedArtist) => (
                    <ArtistCard
                      key={relatedArtist.id}
                      artist={relatedArtist}
                      variant="compact"
                      showRelease={false}
                      showGenres
                      showLocation
                    />
                  ),
                )}
              </div>
            </section>
          ) : null}

          {/* ----------------------------------------------------------- */}
          {/* Final CTA                                                   */}
          {/* ----------------------------------------------------------- */}

          <section className="pb-16">
            <Card
              variant="featured"
              padding="lg"
              topLine
              className="relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-36 -top-40 h-[480px] w-[480px] rounded-full bg-[rgba(227,179,77,0.1)] blur-[140px]"
              />

              <div className="relative grid gap-9 lg:grid-cols-[1fr_0.72fr] lg:items-center">
                <div>
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Build Your Campaign
                  </p>

                  <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                    Ready to Promote Your Next Release?
                  </h2>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-white/48 sm:text-base">
                    Explore Money Records platform-specific campaigns for
                    Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO,
                    press, radio, SoundCloud, and artist branding.
                  </p>
                </div>

                <div className="grid gap-3">
                  <Button
                    href="/services"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowIcon />}
                    fullWidth
                  >
                    Explore Marketing Services
                  </Button>

                  <Button
                    href="/submit-music"
                    variant="secondary"
                    size="lg"
                    fullWidth
                  >
                    Submit Your Music
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        </main>
      </Container>

      <script
        id={`${artist.slug}-artist-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            structuredData,
          ).replaceAll(
            "<",
            "\\u003c",
          ),
        }}
      />
    </div>
  );
}