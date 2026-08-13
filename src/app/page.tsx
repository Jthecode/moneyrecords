// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Home Page                                            ┃
   ┃ File   : src/app/page.tsx                                            ┃
   ┃ Role   : Record-label homepage, artist roster, and release storefront┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  Metadata,
} from "next";

import type {
  ReactNode,
} from "react";

import ArtistCard from "@/components/ArtistCard";
import Card from "@/components/Card";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import MobileSectionScroller from "@/components/MobileSectionScroller";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";

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

function MegaphoneIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M4 11V14C4 15.1 4.9 16 6 16H8L17 20V5L8 9H6C4.9 9 4 9.9 4 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M8 16L9.5 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M20 9V16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
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
 * Uses featured releases first.
 *
 * If no release is explicitly featured, the homepage falls back to the
 * newest public releases instead of displaying an empty release section.
 */
function getHomepageReleases(
  limit =
    3,
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
/* Label Operating Strip                                                  */
/* --------------------------------------------------------------------- */

function LabelOperatingStrip() {
  const standards = [
    {
      label:
        "Artist Development",

      description:
        "Build the artist, brand, catalog, and release direction.",

      icon:
        <ArtistIcon />,
    },

    {
      label:
        "Official Releases",

      description:
        "Create a cleaner home for music, artwork, and release details.",

      icon:
        <MusicIcon />,
    },

    {
      label:
        "Global Distribution",

      description:
        "Prepare releases for a professional digital distribution process.",

      icon:
        <GlobeIcon />,
    },

    {
      label:
        "Platform Marketing",

      description:
        "Choose campaigns across streaming, social, video, press, and radio.",

      icon:
        <MegaphoneIcon />,
    },
  ] as const;

  return (
    <section
      aria-label="Money Records label capabilities"
      className="mt-4 sm:mt-5"
    >
      <Container size="wide">
        <Card
          padding="sm"
          className="relative overflow-hidden"
        >
          {/* Ambient glow */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[rgba(227,179,77,0.06)] blur-[90px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[12%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.34),transparent)]"
          />

          <div className="relative grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-0">
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
                    "flex min-w-0 flex-col gap-2.5",
                    "rounded-[16px]",
                    "border border-white/[0.05]",
                    "bg-white/[0.015]",
                    "p-3",
                    "sm:flex-row",
                    "sm:items-start",
                    "sm:gap-3",
                    "sm:p-4",
                    "lg:rounded-none",
                    "lg:border-y-0",
                    "lg:border-r-0",
                    "lg:bg-transparent",

                    index > 0
                      ? "lg:border-l lg:border-white/[0.065]"
                      : "lg:border-l-0",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "grid h-9 w-9 flex-[0_0_36px]",
                      "place-items-center",
                      "rounded-xl",
                      "border border-[rgba(227,179,77,0.2)]",
                      "bg-[rgba(211,154,46,0.05)]",
                      "text-[var(--mr-gold-200)]",
                    ].join(" ")}
                  >
                    {standard.icon}
                  </span>

                  <div className="min-w-0">
                    <p className="m-0 text-[8px] font-black uppercase leading-4 tracking-[0.11em] text-white/58 sm:text-[9px]">
                      {standard.label}
                    </p>

                    <p className="mt-1.5 hidden text-[10px] leading-5 text-white/30 sm:block">
                      {standard.description}
                    </p>
                  </div>
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
      className="scroll-mt-28 py-10 sm:py-12 lg:py-16"
    >
      <Container size="wide">
        {/* ------------------------------------------------------------- */}
        {/* Section Heading                                               */}
        {/* ------------------------------------------------------------- */}

        <SectionHeader
          id="homepage-artists-heading"
          eyebrow="Money Records Roster"
          title={
            <>
              Artists Built for{" "}
              <span className="mr-text-gradient">
                the Next Level.
              </span>
            </>
          }
          description="Discover featured talent, official releases, artist stories, and the developing Money Records roster."
          align="split"
          width="lg"
          primaryAction={{
            label:
              "Explore All Artists",

            href:
              "/artists",
          }}
          secondaryAction={{
            label:
              "Submit Your Music",

            href:
              "/submit-music",
          }}
        />

        {/* ------------------------------------------------------------- */}
        {/* Artist Content                                                */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-7 sm:mt-8">
          {artists.length >
          0 ? (
            <MobileSectionScroller
              ariaLabel="Featured Money Records artists"
              itemSize="normal"
              desktopBreakpoint="lg"
              showArrows={false}
              showProgress
              trackClassName="lg:grid-cols-3"
            >
              {artists.map(
                (
                  artist,
                  index,
                ) => (
                  <ArtistCard
                    key={
                      artist.id
                    }
                    artist={
                      artist
                    }
                    variant="default"
                    priority={
                      index === 0
                    }
                    showRelease
                    showGenres
                    showLocation
                  />
                ),
              )}
            </MobileSectionScroller>
          ) : (
            <EmptyState
              icon={
                <ArtistIcon />
              }
              eyebrow="Money Records Roster"
              title={
                <>
                  New Artist Profiles Are{" "}
                  <span className="mr-text-gradient">
                    Coming.
                  </span>
                </>
              }
              description="Money Records is developing a roster of independent talent. Artists can submit music, release information, streaming links, social profiles, and creative direction for consideration."
              primaryAction={{
                label:
                  "Submit Your Music",

                href:
                  "/submit-music",
              }}
              secondaryAction={{
                label:
                  "Explore Artists",

                href:
                  "/artists",
              }}
              size="md"
            />
          )}
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/* Homepage Trust Strip                                                   */
/* --------------------------------------------------------------------- */

function HomepageTrustStrip() {
  const standards = [
    "Independent Record Label",
    "Artist-Focused Support",
    "Platform-Specific Campaigns",
    "Secure Campaign Checkout",
  ] as const;

  return (
    <section
      aria-label="Money Records operating standards"
      className="py-6 sm:py-8"
    >
      <Container size="wide">
        <div
          className={[
            "relative overflow-hidden",
            "rounded-[22px]",
            "border border-[rgba(227,179,77,0.13)]",
            "bg-[linear-gradient(135deg,rgba(211,154,46,0.035),rgba(255,255,255,0.012))]",
            "px-4 py-4",
            "sm:px-5",
          ].join(" ")}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[rgba(227,179,77,0.055)] blur-[85px]"
          />

          <div className="relative grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-4">
            {standards.map(
              (
                standard,
              ) => (
                <div
                  key={
                    standard
                  }
                  className="flex min-w-0 items-center gap-2.5"
                >
                  <span className="grid h-6 w-6 flex-[0_0_24px] place-items-center rounded-full border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.04)] text-[var(--mr-gold-200)]">
                    <CheckIcon />
                  </span>

                  <span className="text-[8px] font-black uppercase leading-4 tracking-[0.1em] text-white/38 sm:text-[9px]">
                    {standard}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
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
      {/* --------------------------------------------------------------- */}
      {/* Global Homepage Atmosphere                                      */}
      {/* --------------------------------------------------------------- */}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute",
          "left-1/2 top-0 -z-10",
          "h-[900px] w-[1400px]",
          "max-w-[130vw]",
          "-translate-x-1/2",
          "rounded-full",
          "bg-[rgba(227,179,77,0.04)]",
          "blur-[200px]",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 -z-20",
          "opacity-[0.11]",
          "[background-image:radial-gradient(rgba(227,179,77,0.11)_0.7px,transparent_0.7px)]",
          "[background-size:28px_28px]",
        ].join(" ")}
      />

      {/* --------------------------------------------------------------- */}
      {/* Hero                                                            */}
      {/* --------------------------------------------------------------- */}

      <section
        aria-label="Money Records introduction"
        className="scroll-mt-28 pt-2 sm:pt-3"
      >
        <Container size="wide">
          <PageHero
            eyebrow="Independent Record Label · Global Marketing"
            badges={[
              {
                label:
                  "Independent Since 2019",

                tone:
                  "gold",
              },

              {
                label:
                  "Artist Submissions Open",

                tone:
                  "success",
              },
            ]}
            title={
              <>
                Build the Record.{" "}
                <span className="mr-text-gradient">
                  Develop the Artist.
                </span>{" "}
                Move the Release.
              </>
            }
            subtitle="One independent music company connecting artist development, official releases, distribution, and platform-specific marketing."
            description="Explore Money Records artists and releases, submit your music, or choose individual campaigns across Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO, press, radio, SoundCloud, and artist branding."
            primaryAction={{
              label:
                "Explore Platform Services",

              href:
                "/services",
            }}
            secondaryAction={{
              label:
                "Submit Your Music",

              href:
                "/submit-music",
            }}
            footerContent={
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[8px] font-black uppercase tracking-[0.12em] text-white/28 sm:text-[9px]">
                <span>
                  Artist Development
                </span>

                <span
                  aria-hidden="true"
                  className="text-[var(--mr-gold-300)]"
                >
                  •
                </span>

                <span>
                  Distribution
                </span>

                <span
                  aria-hidden="true"
                  className="text-[var(--mr-gold-300)]"
                >
                  •
                </span>

                <span>
                  Music Marketing
                </span>

                <span
                  aria-hidden="true"
                  className="text-[var(--mr-gold-300)]"
                >
                  •
                </span>

                <span>
                  Official Releases
                </span>
              </div>
            }
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
        subtitle="Explore featured releases, artist pages, artwork, release information, and verified streaming destinations from the Money Records catalog."
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
        subtitle="Browse individual marketing services across streaming, social media, video, press, radio, SoundCloud, VEVO, and artist branding."
        servicesHref="/services"
        servicesLabel="Explore All Platform Services"
        consultationHref="/contact"
        consultationLabel="Ask About a Platform"
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
          subtitle="Work with Money Records for artist development, music distribution, release support, or individual promotional campaigns across the platforms that matter most."
          ctaHref="/services"
          ctaLabel="Explore Platform Services"
          secondaryCtaHref="/submit-music"
          secondaryCtaLabel="Submit Your Music"
        />
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Compact Trust Strip                                             */}
      {/* --------------------------------------------------------------- */}

      <HomepageTrustStrip />

      {/* --------------------------------------------------------------- */}
      {/* Credibility and Operating Standards                             */}
      {/* --------------------------------------------------------------- */}

      <section
        id="rank"
        aria-label="Why artists choose Money Records"
        className="scroll-mt-28 py-8 sm:py-10 lg:py-12"
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
          subtitle="Money Records connects artist development, release preparation, distribution, catalog presentation, and platform-specific marketing under one professional independent music brand."
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