// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Home Page                                            ┃
   ┃ File   : src/app/page.tsx                                            ┃
   ┃ Role   : Record-label homepage, artist roster, and release storefront┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";
import type { ReactNode } from "react";

import ArtistCard from "@/components/ArtistCard";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";

import {
  getFeaturedArtists,
  type Artist,
} from "@/data/artists";

import {
  getFeaturedReleases,
  getLatestReleases,
  type Release,
} from "@/data/releases";

import CTA from "@/sections/CTA";
import Hero from "@/sections/Hero";
import LatestReleases from "@/sections/LatestReleases";
import MarketingPreview from "@/sections/MarketingPreview";
import TopRank from "@/sections/TopRank";
import WhyChoose from "@/sections/WhyChoose";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                    */
/* --------------------------------------------------------------------- */

export const dynamic =
  "force-static";

/* --------------------------------------------------------------------- */
/* Metadata                                                               */
/* --------------------------------------------------------------------- */

export const metadata: Metadata = {
  title:
    "Record Label & Music Marketing",

  description:
    "Money Records is an independent record label and premium music-marketing platform offering artist development, music distribution, Spotify campaigns, Apple Music promotion, Instagram marketing, TikTok promotion, YouTube support, VEVO services, press, radio, SoundCloud promotion, and artist branding.",

  keywords: [
    "Money Records",
    "Money Records LLC",
    "independent record label",
    "music marketing",
    "artist development",
    "music distribution",
    "Spotify marketing",
    "Apple Music promotion",
    "Instagram music marketing",
    "TikTok music promotion",
    "YouTube music marketing",
    "VEVO services",
    "music public relations",
    "radio promotion",
    "SoundCloud promotion",
    "artist branding",
    "independent artists",
    "new music releases",
  ],

  alternates: {
    canonical:
      "/",
  },

  openGraph: {
    type:
      "website",

    title:
      "Money Records | Record Label & Music Marketing",

    description:
      "Artist development, official releases, global distribution, platform-specific promotion, release strategy, PR, VEVO support, and premium music marketing.",

    url:
      "/",

    images: [
      {
        url:
          "/brand/hero-world.jpg",

        alt:
          "Money Records — independent record label and global music marketing",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Money Records | Record Label & Music Marketing",

    description:
      "Artist development, official releases, global distribution, platform promotion, release strategy, PR, VEVO support, and premium music marketing.",

    images: [
      "/brand/hero-world.jpg",
    ],
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

function MusicIcon(): ReactNode {
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
/* Homepage Data Helpers                                                  */
/* --------------------------------------------------------------------- */

/**
 * Uses specifically featured releases first.
 *
 * When no release is marked as featured, the homepage falls back to the
 * newest public releases instead of displaying an empty catalog.
 */
function getHomepageReleases(
  limit = 3,
): readonly Release[] {
  const featuredReleases =
    getFeaturedReleases(
      limit,
    );

  if (
    featuredReleases.length >
    0
  ) {
    return featuredReleases;
  }

  return getLatestReleases(
    limit,
  );
}

/* --------------------------------------------------------------------- */
/* Featured Artist Section                                                */
/* --------------------------------------------------------------------- */

function HomepageArtistRoster({
  artists,
}: {
  artists:
    readonly Artist[];
}) {
  return (
    <section
      id="artists"
      aria-labelledby="homepage-artists-heading"
      className="scroll-mt-28 py-14 md:py-20"
    >
      <Container size="wide">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
              Money Records Roster
            </p>

            <h2
              id="homepage-artists-heading"
              className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl lg:text-5xl"
            >
              Artists Built for{" "}
              <span className="mr-text-gradient">
                the Next Level.
              </span>
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/48 sm:text-base">
              Discover the artists developing their sound, audience, catalog,
              brand, and global presence with Money Records.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <Button
              href="/artists"
              variant="primary"
              size="lg"
              rightIcon={
                <ArrowIcon />
              }
              className="w-full md:w-auto"
            >
              Explore All Artists
            </Button>

            <Button
              href="/submit-music"
              variant="secondary"
              size="lg"
              className="w-full md:w-auto"
            >
              Submit Your Music
            </Button>
          </div>
        </div>

        <Divider
          className="my-8"
          variant="strong"
        />

        {artists.length > 0 ? (
          <div
            className={
              artists.length === 1
                ? "grid gap-6"
                : "grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            }
          >
            {artists.map(
              (
                artist,
                index,
              ) => {
                const isFeaturedCard =
                  artists.length === 1 ||
                  (
                    index === 0 &&
                    artists.length > 2
                  );

                return (
                  <ArtistCard
                    key={
                      artist.id
                    }
                    artist={
                      artist
                    }
                    variant={
                      isFeaturedCard
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
                      artists.length === 1
                        ? "mx-auto w-full max-w-5xl"
                        : isFeaturedCard
                          ? "md:col-span-2 xl:col-span-2"
                          : undefined
                    }
                  />
                );
              },
            )}
          </div>
        ) : (
          <EmptyArtistRoster />
        )}
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/* Empty Artist Roster                                                    */
/* --------------------------------------------------------------------- */

function EmptyArtistRoster() {
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

      <div className="relative mx-auto max-w-2xl py-10 text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-[24px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
          <ArtistIcon />
        </span>

        <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
          Money Records Roster
        </p>

        <h3 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[var(--mr-text)]">
          New Artist Profiles Are Coming
        </h3>

        <p className="mt-5 text-sm leading-7 text-white/48 sm:text-base">
          Money Records is developing an elite roster of independent talent.
          Artists can submit music, release information, artist links, and
          their creative direction for consideration.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            href="/submit-music"
            variant="primary"
            size="lg"
            rightIcon={
              <ArrowIcon />
            }
            className="w-full sm:w-auto"
          >
            Submit Your Music
          </Button>

          <Button
            href="/artists"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Explore the Roster
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Label Operating Strip                                                  */
/* --------------------------------------------------------------------- */

function LabelOperatingStrip() {
  const standards = [
    {
      label:
        "Artist Development",

      icon:
        <ArtistIcon />,
    },
    {
      label:
        "Official Releases",

      icon:
        <MusicIcon />,
    },
    {
      label:
        "Global Distribution",

      icon:
        <GlobeIcon />,
    },
    {
      label:
        "Platform Marketing",

      icon:
        <CheckIcon />,
    },
  ];

  return (
    <section
      aria-label="Money Records label capabilities"
      className="mt-6"
    >
      <Container size="wide">
        <Card
          padding="md"
          className="relative overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[rgba(227,179,77,0.065)] blur-[90px]"
          />

          <div className="relative grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {standards.map(
              (
                standard,
                index,
              ) => (
                <div
                  key={
                    standard.label
                  }
                  className={[
                    "flex min-h-12 items-center gap-3 px-2 py-2",
                    index > 0
                      ? "xl:border-l xl:border-white/[0.065] xl:pl-6"
                      : "",
                  ].join(" ")}
                >
                  <span className="grid h-8 w-8 flex-[0_0_32px] place-items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                    {standard.icon}
                  </span>

                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/55">
                    {standard.label}
                  </span>
                </div>
              ),
            )}
          </div>
        </Card>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/* Home Page                                                              */
/* --------------------------------------------------------------------- */

export default function HomePage() {
  const featuredArtists =
    getFeaturedArtists(
      3,
    );

  const homepageReleases =
    getHomepageReleases(
      3,
    );

  return (
    <div
      id="top"
      className="mr-page relative overflow-hidden"
    >
      {/* Global homepage atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[1050px] w-[1500px] max-w-[130vw] -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.045)] blur-[210px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.14] [background-image:radial-gradient(rgba(227,179,77,0.11)_0.7px,transparent_0.7px)] [background-size:28px_28px]"
      />

      {/* --------------------------------------------------------------- */}
      {/* Hero                                                            */}
      {/* --------------------------------------------------------------- */}

      <section
        aria-label="Money Records introduction"
        className="scroll-mt-28 pt-2 md:pt-4"
      >
        <Container size="wide">
          <Hero
            eyebrow="Independent Record Label · Platform Marketing"
            title={
              "Build the Record.\nDevelop the Artist.\nMove the Release."
            }
            subtitle="Money Records combines artist development, official release support, music distribution, Spotify marketing, Apple Music promotion, Instagram campaigns, TikTok marketing, YouTube support, VEVO services, press, radio, SoundCloud promotion, and artist branding inside one premium music ecosystem."
            primaryCtaHref="/services"
            primaryCtaLabel="Explore Platform Services"
            secondaryCtaHref="/releases"
            secondaryCtaLabel="Explore Our Releases"
          />
        </Container>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Label Capabilities Strip                                        */}
      {/* --------------------------------------------------------------- */}

      <LabelOperatingStrip />

      {/* --------------------------------------------------------------- */}
      {/* Latest Releases                                                 */}
      {/* --------------------------------------------------------------- */}

      <LatestReleases
        id="releases"
        eyebrow="Money Records Releases"
        title={
          <>
            New Music.{" "}
            <span className="mr-text-gradient">
              Built to Move.
            </span>
          </>
        }
        subtitle="Explore official releases, artist pages, artwork, release details, and verified streaming destinations supported by the Money Records label and platform-marketing system."
        releases={
          homepageReleases
        }
        limit={3}
        viewAllHref="/releases"
        viewAllLabel="Explore All Releases"
        campaignHref="/services"
        campaignLabel="Promote Your Release"
        submissionHref="/submit-music"
        submissionLabel="Submit Your Music"
        showInfrastructurePanel
      />

      {/* --------------------------------------------------------------- */}
      {/* Featured Artists                                                */}
      {/* --------------------------------------------------------------- */}

      <HomepageArtistRoster
        artists={
          featuredArtists
        }
      />

      {/* --------------------------------------------------------------- */}
      {/* Label and Service Capabilities                                  */}
      {/* --------------------------------------------------------------- */}

      <section
        id="services"
        aria-label="Money Records label and service capabilities"
        className="scroll-mt-28"
      >
        <WhyChoose
          eyebrow="Money Records Services"
          title={
            <>
              Label Support and{" "}
              <span className="mr-text-gradient">
                Platform Marketing.
              </span>
            </>
          }
          subtitle="Work with Money Records for artist development, music distribution, release support, or individual promotional services across the platforms that matter most."
          ctaHref="/services"
          ctaLabel="Explore Platform Services"
          secondaryCtaHref="/submit-music"
          secondaryCtaLabel="Submit Your Music"
        />
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Platform Marketing Storefront                                   */}
      {/* --------------------------------------------------------------- */}

      <MarketingPreview
        id="marketing"
        eyebrow="Money Records Marketing"
        title={
          <>
            Choose Your Platform.{" "}
            <span className="mr-text-gradient">
              Select Your Service.
            </span>
          </>
        }
        subtitle="Browse individual marketing services for Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO, press, radio, SoundCloud, and artist branding."
        servicesHref="/services"
        servicesLabel="Explore All Platform Services"
        consultationHref="/contact"
        consultationLabel="Ask About a Platform"
      />

      {/* --------------------------------------------------------------- */}
      {/* Credibility and Operating Standards                             */}
      {/* --------------------------------------------------------------- */}

      <section
        id="rank"
        aria-label="Why artists choose Money Records"
        className="scroll-mt-28 py-12 md:py-16"
      >
        <TopRank
          eyebrow="Why Money Records"
          title={
            <>
              Label Infrastructure.{" "}
              <span className="mr-text-gradient">
                Platform-Specific Execution.
              </span>
            </>
          }
          subtitle="Money Records connects artist development, release preparation, distribution, official catalog pages, and individual platform-marketing services under one professional music brand."
          primaryCtaHref="/services"
          primaryCtaLabel="Explore Platform Services"
          secondaryCtaHref="/submit-music"
          secondaryCtaLabel="Work With the Label"
        />
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Final Conversion Section                                        */}
      {/* --------------------------------------------------------------- */}

      <section
        id="contact"
        aria-label="Purchase a platform service or submit music"
        className="scroll-mt-28"
      >
        <CTA
          eyebrow="Your Next Move Starts Here"
          title={
            <>
              Choose a Platform or{" "}
              <span className="mr-text-gradient">
                Submit Your Music.
              </span>
            </>
          }
          subtitle="Purchase an individual marketing service for your release or introduce your music, artist brand, release information, and creative direction to the Money Records team."
          servicesHref="/services"
          servicesLabel="View Platform Services"
          email="info@moneyrecords.io"
          instagramHref="https://instagram.com/kingpharaohreal"
          instagramHandle="@kingpharaohreal"
        />
      </section>
    </div>
  );
}