// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Artists Page                                         ┃
   ┃ File   : src/app/artists/page.tsx                                    ┃
   ┃ Role   : Public artist roster, featured talent, and submission CTA   ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import ArtistCard from "@/components/ArtistCard";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";

import {
  getActiveArtists,
  getAllArtists,
  getFeaturedArtists,
  type Artist,
} from "@/data/artists";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                    */
/* --------------------------------------------------------------------- */

export const dynamic = "force-static";

/* --------------------------------------------------------------------- */
/* Metadata                                                               */
/* --------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Artists",

  description:
    "Explore the Money Records artist roster, featured releases, developing talent, and independent artists supported by global marketing and release strategy.",

  keywords: [
    "Money Records artists",
    "Money Records roster",
    "independent artists",
    "hip-hop artists",
    "record label artists",
    "artist development",
    "new music artists",
    "independent record label roster",
  ],

  alternates: {
    canonical: "/artists",
  },

  openGraph: {
    type: "website",
    title: "Money Records Artists",
    description:
      "Discover the artists, releases, and creative talent building with Money Records.",
    url: "/artists",
  },

  twitter: {
    card: "summary_large_image",
    title: "Money Records Artists",
    description:
      "Discover the artists and releases building with Money Records.",
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
/* Utilities                                                              */
/* --------------------------------------------------------------------- */

function getUniqueGenreCount(
  artists: readonly Artist[],
): number {
  return new Set(
    artists.flatMap((artist) =>
      artist.genres.map((genre) =>
        genre.trim().toLowerCase(),
      ),
    ),
  ).size;
}

function getReleaseCount(
  artists: readonly Artist[],
): number {
  return artists.reduce(
    (total, artist) =>
      total + artist.releases.length,
    0,
  );
}

function getArtistLabel(
  count: number,
): string {
  return count === 1
    ? "Artist"
    : "Artists";
}

function getReleaseLabel(
  count: number,
): string {
  return count === 1
    ? "Release"
    : "Releases";
}

/* --------------------------------------------------------------------- */
/* Roster Metric                                                          */
/* --------------------------------------------------------------------- */

function RosterMetric({
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

          <p className="mt-2 text-xl font-black leading-6 tracking-[-0.04em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
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
/* Featured Artist Spotlight                                              */
/* --------------------------------------------------------------------- */

function FeaturedArtistSpotlight({
  artist,
}: {
  artist: Artist;
}) {
  const artistHref =
    `/artists/${artist.slug}`;

  const featuredRelease =
    artist.releases.find(
      (release) =>
        release.featured,
    ) ??
    artist.releases[0];

  return (
    <Card
      as="aside"
      padding="none"
      className="relative overflow-hidden border-[rgba(227,179,77,0.2)]"
    >
      <div className="relative min-h-[460px]">
        <Image
          src={artist.imageSrc}
          alt={artist.imageAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="object-cover"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_10%,rgba(0,0,0,0.25)_44%,rgba(5,5,6,0.98)_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(227,179,77,0.22),transparent_40%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.76),transparent)]"
        />

        <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-3 sm:inset-x-6 sm:top-6">
          <span className="inline-flex min-h-8 items-center rounded-full border border-[rgba(227,179,77,0.28)] bg-black/55 px-4 text-[8px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)] backdrop-blur-md">
            Featured Artist
          </span>

          <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-emerald-300/20 bg-black/55 px-4 text-[8px] font-black uppercase tracking-[0.15em] text-emerald-300 backdrop-blur-md">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]"
            />

            Active Roster
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
            {artist.eyebrow}
          </p>

          <h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.055em] text-white sm:text-5xl">
            {artist.name}
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
            {artist.tagline}
          </p>

          {featuredRelease ? (
            <div className="mt-5 rounded-2xl border border-white/[0.09] bg-black/35 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between gap-5">
                <div className="min-w-0">
                  <p className="m-0 text-[8px] font-black uppercase tracking-[0.16em] text-white/35">
                    Featured Release
                  </p>

                  <Link
                    href={featuredRelease.href}
                    className="mt-2 block truncate text-base font-black text-white transition-colors hover:text-[var(--mr-gold-100)]"
                  >
                    {featuredRelease.title}
                  </Link>
                </div>

                <Link
                  href={featuredRelease.href}
                  aria-label={`View ${featuredRelease.title}`}
                  className="grid h-10 w-10 flex-[0_0_40px] place-items-center rounded-full border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.07)] text-[var(--mr-gold-200)] transition hover:bg-[rgba(211,154,46,0.13)]"
                >
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          ) : null}

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button
              href={artistHref}
              variant="primary"
              size="lg"
              rightIcon={<ArrowIcon />}
              fullWidth
            >
              View Artist Profile
            </Button>

            <Button
              href={
                featuredRelease?.href ??
                artistHref
              }
              variant="secondary"
              size="lg"
              fullWidth
            >
              Explore Music
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Empty Roster                                                           */
/* --------------------------------------------------------------------- */

function EmptyRoster() {
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

      <div className="relative mx-auto max-w-xl py-10 text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-[24px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
          <ArtistIcon />
        </span>

        <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
          Artist Roster
        </p>

        <h2 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[var(--mr-text)]">
          New Artist Profiles Are Coming
        </h2>

        <p className="mt-5 text-sm leading-7 text-white/48">
          Money Records is building an elite roster of independent talent.
          Artists interested in label services, marketing, and release support
          can submit their music for consideration.
        </p>

        <Button
          href="/submit-music"
          variant="primary"
          size="lg"
          rightIcon={<ArrowIcon />}
          className="mt-8"
        >
          Submit Your Music
        </Button>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Artists Page                                                           */
/* --------------------------------------------------------------------- */

export default function ArtistsPage() {
  const allArtists =
    getAllArtists();

  const activeArtists =
    getActiveArtists();

  const featuredArtist =
    getFeaturedArtists(1)[0] ??
    activeArtists[0] ??
    allArtists[0];

  const releaseCount =
    getReleaseCount(
      allArtists,
    );

  const genreCount =
    getUniqueGenreCount(
      allArtists,
    );

  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      {/* Page atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[900px] w-[1350px] max-w-[125vw] -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.055)] blur-[190px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-20 [background-image:radial-gradient(rgba(227,179,77,0.1)_0.7px,transparent_0.7px)] [background-size:26px_26px]"
      />

      <Container size="wide">
        <main className="py-8 md:py-12">
          {/* ----------------------------------------------------------- */}
          {/* Artists Hero                                                */}
          {/* ----------------------------------------------------------- */}

          <header className="relative overflow-hidden rounded-[32px] border border-[rgba(227,179,77,0.2)] bg-[linear-gradient(145deg,rgba(18,17,15,0.97),rgba(6,6,7,0.99))] p-6 shadow-[0_32px_120px_rgba(0,0,0,0.56)] sm:p-8 lg:p-12">
            <Image
              src="/brand/hero-world.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="-z-10 object-cover opacity-25"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(90deg,rgba(4,4,5,0.98)_0%,rgba(4,4,5,0.86)_52%,rgba(4,4,5,0.62)_100%)]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full bg-[rgba(227,179,77,0.13)] blur-[145px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.76),transparent)]"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div className="max-w-4xl">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-[18px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                    <ArtistIcon />
                  </span>

                  <div>
                    <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                      Money Records Roster
                    </p>

                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.13em] text-white/30">
                      Independent Talent · Global Execution
                    </p>
                  </div>
                </div>

                <h1 className="mt-8 text-balance text-4xl font-black leading-[0.98] tracking-[-0.055em] text-[var(--mr-text)] sm:text-5xl lg:text-6xl">
                  Artists Building{" "}
                  <span className="mr-text-gradient">
                    Their Next Chapter.
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-8 text-white/52 sm:text-lg">
                  Discover the artists developing their sound, audience, and
                  global presence with Money Records. Every release is
                  supported by focused positioning, premium presentation, and
                  platform-specific strategy.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  <span className="mr-badge">
                    Artist Development
                  </span>

                  <span className="mr-badge">
                    Global Distribution
                  </span>

                  <span className="mr-badge">
                    Platform Marketing
                  </span>

                  <span className="mr-badge">
                    Release Strategy
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    href="#artist-roster"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowIcon />}
                    className="w-full sm:w-auto"
                  >
                    Explore the Roster
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

              {featuredArtist ? (
                <FeaturedArtistSpotlight
                  artist={featuredArtist}
                />
              ) : (
                <Card
                  as="aside"
                  padding="lg"
                  className="relative overflow-hidden bg-black/30"
                >
                  <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                    <span className="grid h-20 w-20 place-items-center rounded-[24px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                      <ArtistIcon />
                    </span>

                    <h2 className="mt-6 text-2xl font-black text-[var(--mr-text)]">
                      Artist Profiles Coming Soon
                    </h2>

                    <p className="mt-3 max-w-sm text-sm leading-7 text-white/45">
                      The official Money Records roster is being prepared for
                      launch.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </header>

          {/* ----------------------------------------------------------- */}
          {/* Roster Overview                                             */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-label="Money Records roster overview"
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <RosterMetric
              icon={<ArtistIcon />}
              label="Active Roster"
              value={`${activeArtists.length} ${getArtistLabel(
                activeArtists.length,
              )}`}
              description="Artists currently represented in the public Money Records roster."
            />

            <RosterMetric
              icon={<MusicIcon />}
              label="Current Catalog"
              value={`${releaseCount} ${getReleaseLabel(
                releaseCount,
              )}`}
              description="Public releases currently connected to roster profiles."
            />

            <RosterMetric
              icon={<GlobeIcon />}
              label="Creative Range"
              value={`${genreCount} ${
                genreCount === 1
                  ? "Genre"
                  : "Genres"
              }`}
              description="Genres represented across the current Money Records roster."
            />

            <RosterMetric
              icon={<ShieldIcon />}
              label="Label Standard"
              value="Premium"
              description="Strategic releases, professional presentation, and long-term artist development."
            />
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Full Artist Roster                                          */}
          {/* ----------------------------------------------------------- */}

          <section
            id="artist-roster"
            aria-labelledby="artist-roster-heading"
            className="scroll-mt-28 py-14 md:py-20"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  Official Roster
                </p>

                <h2
                  id="artist-roster-heading"
                  className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
                >
                  Meet the Artists
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/48 sm:text-base">
                  Explore official artist profiles, biographies, genres,
                  featured releases, and streaming destinations.
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

            {allArtists.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {allArtists.map(
                  (
                    artist,
                    index,
                  ) => (
                    <ArtistCard
                      key={artist.id}
                      artist={artist}
                      variant={
                        index === 0 &&
                        allArtists.length > 2
                          ? "featured"
                          : "default"
                      }
                      priority={
                        index < 2
                      }
                      showRelease
                      showGenres
                      showLocation
                      className={
                        index === 0 &&
                        allArtists.length > 2
                          ? "md:col-span-2 xl:col-span-2"
                          : undefined
                      }
                    />
                  ),
                )}
              </div>
            ) : (
              <EmptyRoster />
            )}
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Label Development Standards                                 */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="artist-development-heading"
            className="pb-8"
          >
            <Card
              variant="featured"
              padding="lg"
              topLine
              className="relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-36 -top-40 h-[460px] w-[460px] rounded-full bg-[rgba(227,179,77,0.1)] blur-[135px]"
              />

              <div className="relative grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                <div>
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Artist Development
                  </p>

                  <h2
                    id="artist-development-heading"
                    className="mt-3 max-w-3xl text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
                  >
                    More Than a Release. Build the Artist.
                  </h2>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-white/48 sm:text-base">
                    Money Records supports independent talent with a complete
                    approach to release development, campaign planning,
                    branding, distribution, and platform-specific growth.
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {[
                      "Artist positioning and brand direction",
                      "Release strategy and rollout planning",
                      "Streaming and social-platform campaigns",
                      "PR, visual presentation, and audience growth",
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

                <div className="rounded-[26px] border border-[rgba(227,179,77,0.2)] bg-black/25 p-6 sm:p-8">
                  <p className="m-0 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                    Join the Roster
                  </p>

                  <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
                    Submit Your Music
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/46">
                    Send Money Records your strongest release, artist links,
                    creative direction, and campaign goals for consideration.
                  </p>

                  <div className="mt-6 grid gap-3">
                    <Button
                      href="/submit-music"
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowIcon />}
                      fullWidth
                    >
                      Start Artist Submission
                    </Button>

                    <Button
                      href="/contact"
                      variant="secondary"
                      size="lg"
                      fullWidth
                    >
                      Contact Money Records
                    </Button>
                  </div>

                  <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.13em] text-white/28">
                    Submission does not guarantee signing, representation, or
                    acceptance.
                  </p>
                </div>
              </div>
            </Card>
          </section>
        </main>
      </Container>
    </div>
  );
}