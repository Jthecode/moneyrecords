// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Releases Page                                        ┃
   ┃ File   : src/app/releases/page.tsx                                   ┃
   ┃ Role   : Public music catalog, featured releases, and streaming hub  ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import ReleaseCard from "@/components/ReleaseCard";
import StreamingLinks from "@/components/StreamingLinks";

import {
  formatReleaseDate,
  getAllReleases,
  getFeaturedReleases,
  getPrimaryReleaseLink,
  getReleaseArtists,
  getReleaseGenres,
  getReleasedReleases,
  getReleaseStatusLabel,
  getReleaseTypeLabel,
  getUpcomingReleases,
  type Release,
} from "@/data/releases";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                    */
/* --------------------------------------------------------------------- */

export const dynamic = "force-static";

/* --------------------------------------------------------------------- */
/* Metadata                                                               */
/* --------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Releases",

  description:
    "Explore official Money Records singles, albums, upcoming releases, featured music, streaming links, and artist catalogs.",

  keywords: [
    "Money Records releases",
    "Money Records music",
    "new music releases",
    "independent music",
    "independent hip-hop",
    "Money Records artists",
    "Jryako",
    "We Outside",
    "record label catalog",
    "music streaming",
  ],

  alternates: {
    canonical: "/releases",
  },

  openGraph: {
    type: "website",
    title: "Money Records Releases",
    description:
      "Explore official releases, featured music, and streaming destinations from Money Records.",
    url: "/releases",
  },

  twitter: {
    card: "summary_large_image",
    title: "Money Records Releases",
    description:
      "Explore official releases, featured music, and streaming destinations from Money Records.",
  },
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function ArrowIcon(): ReactNode {
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

function PlayIcon(): ReactNode {
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

function MusicIcon(): ReactNode {
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

function ArtistIcon(): ReactNode {
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

function CalendarIcon(): ReactNode {
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

function GlobeIcon(): ReactNode {
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

function ShieldIcon(): ReactNode {
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

function CheckIcon(): ReactNode {
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
/* Utilities                                                              */
/* --------------------------------------------------------------------- */

function getReleaseLabel(count: number): string {
  return count === 1
    ? "Release"
    : "Releases";
}

function getArtistLabel(count: number): string {
  return count === 1
    ? "Artist"
    : "Artists";
}

function getGenreLabel(count: number): string {
  return count === 1
    ? "Genre"
    : "Genres";
}

/* --------------------------------------------------------------------- */
/* Catalog Metric                                                         */
/* --------------------------------------------------------------------- */

function CatalogMetric({
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
        <span className="grid h-11 w-11 flex-[0_0_44px] place-items-center rounded-xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
            {label}
          </p>

          <p className="mt-2 break-words text-xl font-black leading-6 tracking-[-0.04em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
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
/* Featured Release Hero                                                  */
/* --------------------------------------------------------------------- */

function FeaturedReleaseHero({
  release,
}: {
  release: Release;
}) {
  const primaryLink =
    getPrimaryReleaseLink(
      release,
    );

  return (
    <header className="relative overflow-hidden rounded-[32px] border border-[rgba(227,179,77,0.22)] bg-[linear-gradient(145deg,rgba(18,17,15,0.97),rgba(6,6,7,0.99))] shadow-[0_32px_120px_rgba(0,0,0,0.58)]">
      <Image
        src={release.heroImageSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover opacity-30"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,4,5,0.99)_0%,rgba(4,4,5,0.92)_47%,rgba(4,4,5,0.68)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-44 h-[580px] w-[580px] rounded-full bg-[rgba(227,179,77,0.15)] blur-[155px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-40 h-[460px] w-[460px] rounded-full bg-[rgba(227,179,77,0.055)] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.8),transparent)]"
      />

      <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.14fr_0.86fr] lg:items-center lg:p-12">
        {/* Release information */}

        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/[0.06] px-4 text-[8px] font-black uppercase tracking-[0.16em] text-emerald-300">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]"
              />

              {getReleaseStatusLabel(
                release,
              )}
            </span>

            <span className="inline-flex min-h-8 items-center rounded-full border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] px-4 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)]">
              Featured Release
            </span>
          </div>

          <p className="mt-8 text-[10px] font-black uppercase tracking-[0.21em] text-[var(--mr-gold-200)]">
            {release.eyebrow}
          </p>

          <h1 className="mt-3 text-balance text-5xl font-black leading-[0.92] tracking-[-0.065em] text-[var(--mr-text)] sm:text-6xl lg:text-7xl">
            {release.title}
          </h1>

          <Link
            href={`/artists/${release.artistSlug}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.15em] text-white/58 transition hover:text-[var(--mr-gold-200)]"
          >
            By {release.artistName}
            <ArrowIcon />
          </Link>

          <p className="mt-6 max-w-3xl text-lg font-black leading-8 tracking-[-0.025em] text-white/76 sm:text-xl">
            {release.tagline}
          </p>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/48 sm:text-base">
            {release.shortDescription}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <span className="mr-badge">
              {getReleaseTypeLabel(
                release.type,
              )}
            </span>

            <span className="mr-badge">
              {formatReleaseDate(
                release.releaseDate,
              )}
            </span>

            {release.genres.map(
              (genre) => (
                <span
                  key={genre}
                  className="mr-badge"
                >
                  {genre}
                </span>
              ),
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {primaryLink ? (
              <Button
                href={primaryLink.href}
                variant="primary"
                size="lg"
                leftIcon={
                  <PlayIcon />
                }
                rightIcon={
                  <ArrowIcon />
                }
                external
                className="w-full sm:w-auto"
              >
                {primaryLink.actionLabel ??
                  "Listen Now"}
              </Button>
            ) : null}

            <Button
              href={release.href}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              View Release Details
            </Button>

            <Button
              href={`/artists/${release.artistSlug}`}
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto"
            >
              View Artist Profile
            </Button>
          </div>
        </div>

        {/* Release artwork */}

        <div className="mx-auto w-full max-w-[470px] lg:mx-0 lg:ml-auto">
          <div className="relative aspect-square overflow-hidden rounded-[30px] border border-[rgba(227,179,77,0.24)] bg-black/35 shadow-[0_32px_110px_rgba(0,0,0,0.64)]">
            <Image
              src={release.coverSrc}
              alt={release.coverAlt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(145deg,transparent_48%,rgba(0,0,0,0.38))]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_78%_8%,rgba(227,179,77,0.18),transparent_38%)]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.75),transparent)]"
            />

            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
              <div>
                <p className="m-0 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)]">
                  Official Release
                </p>

                <p className="mt-2 text-lg font-black text-white">
                  {release.artistName}
                </p>
              </div>

              <span className="inline-flex min-h-8 items-center rounded-full border border-black/30 bg-[var(--mr-gold-300)] px-4 text-[8px] font-black uppercase tracking-[0.15em] text-black">
                {release.badge ??
                  getReleaseStatusLabel(
                    release,
                  )}
              </span>
            </div>
          </div>

          {release.links.length > 0 ? (
            <div className="mt-5 rounded-[24px] border border-white/[0.075] bg-black/30 p-4 backdrop-blur-md">
              <StreamingLinks
                links={release.links}
                variant="compact"
                showHeader={false}
                limit={4}
              />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

/* --------------------------------------------------------------------- */
/* Empty Catalog                                                          */
/* --------------------------------------------------------------------- */

function EmptyReleaseCatalog() {
  return (
    <Card
      as="section"
      variant="featured"
      padding="lg"
      topLine
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.08)] blur-[110px]"
      />

      <div className="relative mx-auto max-w-2xl py-12 text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-[24px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
          <MusicIcon />
        </span>

        <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
          Money Records Catalog
        </p>

        <h1 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[var(--mr-text)] sm:text-4xl">
          New Releases Are Coming
        </h1>

        <p className="mt-5 text-sm leading-7 text-white/48 sm:text-base">
          Official releases, artwork, streaming links, artist information,
          and release details will appear here as the Money Records catalog
          continues to expand.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            href="/artists"
            variant="primary"
            size="lg"
            rightIcon={
              <ArrowIcon />
            }
            className="w-full sm:w-auto"
          >
            Explore Our Artists
          </Button>

          <Button
            href="/submit-music"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Submit Your Music
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Release Standards                                                     */
/* --------------------------------------------------------------------- */

function ReleaseStandards() {
  const standards = [
    {
      title:
        "Official Release Pages",

      description:
        "Each release receives a dedicated public destination with artwork, artist information, and official links.",
    },
    {
      title:
        "Streaming Destinations",

      description:
        "Verified smart links and platform destinations help listeners reach the release from one clean page.",
    },
    {
      title:
        "Artist Connection",

      description:
        "Every catalog entry connects directly to the artist's official Money Records profile.",
    },
    {
      title:
        "Campaign Support",

      description:
        "Money Records platform services can support release visibility, positioning, and audience growth.",
    },
  ];

  return (
    <section
      aria-labelledby="release-standard-heading"
      className="pb-14 md:pb-20"
    >
      <Card
        variant="featured"
        padding="lg"
        topLine
        className="relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-40 h-[470px] w-[470px] rounded-full bg-[rgba(227,179,77,0.09)] blur-[135px]"
        />

        <div className="relative">
          <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
            Catalog Standard
          </p>

          <h2
            id="release-standard-heading"
            className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
          >
            Every Release Deserves a{" "}
            <span className="mr-text-gradient">
              Premium Presentation.
            </span>
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/48 sm:text-base">
            The Money Records catalog connects official music, artist
            identities, streaming destinations, and marketing opportunities
            inside one professional release ecosystem.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {standards.map(
              (
                standard,
                index,
              ) => (
                <div
                  key={standard.title}
                  className="rounded-[22px] border border-white/[0.065] bg-white/[0.025] p-5"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[9px] font-black text-[var(--mr-gold-200)]">
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <h3 className="mt-5 text-base font-black tracking-[-0.025em] text-[var(--mr-text)]">
                    {standard.title}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-white/43">
                    {standard.description}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </Card>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/* Releases Page                                                          */
/* --------------------------------------------------------------------- */

export default function ReleasesPage() {
  const allReleases =
    getAllReleases();

  const releasedReleases =
    getReleasedReleases();

  const upcomingReleases =
    getUpcomingReleases();

  const featuredRelease =
    getFeaturedReleases(1)[0] ??
    releasedReleases[0] ??
    allReleases[0];

  const releaseArtists =
    getReleaseArtists();

  const releaseGenres =
    getReleaseGenres();

  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      {/* Page atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[1000px] w-[1500px] max-w-[130vw] -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.05)] blur-[210px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.16] [background-image:radial-gradient(rgba(227,179,77,0.11)_0.7px,transparent_0.7px)] [background-size:28px_28px]"
      />

      <Container size="wide">
        <div className="py-8 md:py-12">
          {/* ----------------------------------------------------------- */}
          {/* Featured Release Hero                                       */}
          {/* ----------------------------------------------------------- */}

          {featuredRelease ? (
            <FeaturedReleaseHero
              release={featuredRelease}
            />
          ) : (
            <EmptyReleaseCatalog />
          )}

          {/* ----------------------------------------------------------- */}
          {/* Catalog Overview                                            */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-label="Money Records catalog overview"
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <CatalogMetric
              icon={
                <MusicIcon />
              }
              label="Public Catalog"
              value={`${allReleases.length} ${getReleaseLabel(
                allReleases.length,
              )}`}
              description="Official releases currently included in the public Money Records catalog."
            />

            <CatalogMetric
              icon={
                <ArtistIcon />
              }
              label="Catalog Artists"
              value={`${releaseArtists.length} ${getArtistLabel(
                releaseArtists.length,
              )}`}
              description="Artists represented across current public Money Records releases."
            />

            <CatalogMetric
              icon={
                <GlobeIcon />
              }
              label="Creative Range"
              value={`${releaseGenres.length} ${getGenreLabel(
                releaseGenres.length,
              )}`}
              description="Genres represented across the active Money Records release catalog."
            />

            <CatalogMetric
              icon={
                <CalendarIcon />
              }
              label="Upcoming Music"
              value={`${upcomingReleases.length} ${getReleaseLabel(
                upcomingReleases.length,
              )}`}
              description="Upcoming releases currently announced through the Money Records catalog."
            />
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Full Release Catalog                                        */}
          {/* ----------------------------------------------------------- */}

          <section
            id="release-catalog"
            aria-labelledby="release-catalog-heading"
            className="scroll-mt-28 py-14 md:py-20"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  Official Catalog
                </p>

                <h2
                  id="release-catalog-heading"
                  className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl lg:text-5xl"
                >
                  Money Records{" "}
                  <span className="mr-text-gradient">
                    Releases.
                  </span>
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/48 sm:text-base">
                  Explore official singles, albums, artist pages, artwork,
                  release details, and verified streaming destinations.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                <Button
                  href="/artists"
                  variant="secondary"
                  size="lg"
                  className="w-full md:w-auto"
                >
                  Explore Artists
                </Button>

                <Button
                  href="/services"
                  variant="primary"
                  size="lg"
                  rightIcon={
                    <ArrowIcon />
                  }
                  className="w-full md:w-auto"
                >
                  Promote a Release
                </Button>
              </div>
            </div>

            <Divider
              className="my-8"
              variant="strong"
            />

            {allReleases.length > 0 ? (
              <div
                className={
                  allReleases.length === 1
                    ? "grid gap-6"
                    : "grid gap-6 md:grid-cols-2 xl:grid-cols-3"
                }
              >
                {allReleases.map(
                  (
                    release,
                    index,
                  ) => (
                    <ReleaseCard
                      key={release.id}
                      release={release}
                      variant={
                        allReleases.length === 1 ||
                        (
                          index === 0 &&
                          allReleases.length > 2
                        )
                          ? "featured"
                          : "default"
                      }
                      priority={
                        index < 2
                      }
                      showArtist
                      showDescription
                      showGenres
                      showStreamingLink
                      className={
                        allReleases.length === 1
                          ? "mx-auto w-full max-w-5xl"
                          : index === 0 &&
                              allReleases.length > 2
                            ? "md:col-span-2 xl:col-span-2"
                            : undefined
                      }
                    />
                  ),
                )}
              </div>
            ) : (
              <EmptyReleaseCatalog />
            )}
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Upcoming Releases                                           */}
          {/* ----------------------------------------------------------- */}

          {upcomingReleases.length > 0 ? (
            <section
              aria-labelledby="upcoming-releases-heading"
              className="pb-14 md:pb-20"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl">
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Coming Soon
                  </p>

                  <h2
                    id="upcoming-releases-heading"
                    className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
                  >
                    Upcoming Releases
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/48 sm:text-base">
                    Discover upcoming music, release dates, official artwork,
                    and pre-release destinations.
                  </p>
                </div>

                <Button
                  href="/submit-music"
                  variant="secondary"
                  size="lg"
                  rightIcon={
                    <ArrowIcon />
                  }
                  className="w-full md:w-auto"
                >
                  Submit Your Music
                </Button>
              </div>

              <Divider
                className="my-8"
                variant="strong"
              />

              <div className="grid gap-6 lg:grid-cols-2">
                {upcomingReleases.map(
                  (
                    release,
                    index,
                  ) => (
                    <ReleaseCard
                      key={release.id}
                      release={release}
                      variant="compact"
                      priority={
                        index < 2
                      }
                      showArtist
                      showDescription
                      showGenres
                      showStreamingLink
                    />
                  ),
                )}
              </div>
            </section>
          ) : null}

          {/* ----------------------------------------------------------- */}
          {/* Catalog Standards                                           */}
          {/* ----------------------------------------------------------- */}

          <ReleaseStandards />

          {/* ----------------------------------------------------------- */}
          {/* Final Conversion Section                                    */}
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
                className="pointer-events-none absolute -right-36 -top-40 h-[500px] w-[500px] rounded-full bg-[rgba(227,179,77,0.11)] blur-[145px]"
              />

              <div className="relative grid gap-10 lg:grid-cols-[1fr_0.76fr] lg:items-center">
                <div>
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Release With Purpose
                  </p>

                  <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                    Ready to Build Your{" "}
                    <span className="mr-text-gradient">
                      Next Release?
                    </span>
                  </h2>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-white/48 sm:text-base">
                    Submit your music for consideration or explore individual
                    platform services for Spotify, Apple Music, Instagram,
                    TikTok, YouTube, VEVO, press, radio, SoundCloud, and artist
                    branding.
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {[
                      "Official artist and release positioning",
                      "Platform-specific marketing services",
                      "Distribution and release preparation",
                      "Press, visual, and audience-growth support",
                    ].map(
                      (item) => (
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
                      ),
                    )}
                  </div>
                </div>

                <div className="rounded-[26px] border border-[rgba(227,179,77,0.2)] bg-black/25 p-6 sm:p-8">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                      <ShieldIcon />
                    </span>

                    <div>
                      <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                        Money Records
                      </p>

                      <h3 className="mt-1 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                        Artist and Campaign Support
                      </h3>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-white/46">
                    Introduce your music to the label or build a platform
                    campaign around an existing release.
                  </p>

                  <div className="mt-6 grid gap-3">
                    <Button
                      href="/submit-music"
                      variant="primary"
                      size="lg"
                      rightIcon={
                        <ArrowIcon />
                      }
                      fullWidth
                    >
                      Submit Your Music
                    </Button>

                    <Button
                      href="/services"
                      variant="secondary"
                      size="lg"
                      fullWidth
                    >
                      Explore Platform Services
                    </Button>

                    <Button
                      href="/contact"
                      variant="ghost"
                      size="sm"
                      fullWidth
                    >
                      Contact Money Records
                    </Button>
                  </div>

                  <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.13em] text-white/27">
                    Submission does not guarantee signing, representation,
                    distribution, or campaign acceptance.
                  </p>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </Container>
    </div>
  );
}