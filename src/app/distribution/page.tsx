// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Distribution Page                                    ┃
   ┃ File   : src/app/distribution/page.tsx                               ┃
   ┃ Role   : Music distribution, release preparation, and label support  ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                    */
/* --------------------------------------------------------------------- */

export const dynamic = "force-static";

/* --------------------------------------------------------------------- */
/* Constants                                                              */
/* --------------------------------------------------------------------- */

const CONTACT_EMAIL =
  "info@moneyrecords.io";

/* --------------------------------------------------------------------- */
/* Metadata                                                               */
/* --------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Music Distribution",

  description:
    "Explore Money Records music distribution and release support for independent artists, including release preparation, metadata organization, platform delivery, catalog presentation, release strategy, and marketing support.",

  keywords: [
    "Money Records distribution",
    "music distribution",
    "independent music distribution",
    "digital music distribution",
    "Spotify distribution",
    "Apple Music distribution",
    "YouTube Music distribution",
    "Amazon Music distribution",
    "independent artist distribution",
    "record label distribution",
    "release distribution",
    "music release strategy",
    "artist development",
    "music marketing",
  ],

  alternates: {
    canonical: "/distribution",
  },

  openGraph: {
    type: "website",

    title:
      "Music Distribution | Money Records",

    description:
      "Release preparation, digital distribution, catalog organization, platform delivery, and coordinated music marketing from Money Records.",

    url:
      "/distribution",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Music Distribution | Money Records",

    description:
      "Prepare, distribute, position, and support your next music release with Money Records.",
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

function MusicIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
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

function UploadIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <path
        d="M12 16V5M8 9L12 5L16 9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M5 14V18.5C5 19.3 5.7 20 6.5 20H17.5C18.3 20 19 19.3 19 18.5V14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MetadataIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M8 9H16M8 13H16M8 17H13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
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

function StrategyIcon(): ReactNode {
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
        r="8"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="12"
        r="1.2"
        fill="currentColor"
      />
    </svg>
  );
}

function ChartIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <path
        d="M5 19V12M12 19V7M19 19V4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M3.5 20H20.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArtistIcon(): ReactNode {
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

function MailIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="19"
      height="19"
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

/* --------------------------------------------------------------------- */
/* Feature Card                                                           */
/* --------------------------------------------------------------------- */

function FeatureCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card
      as="article"
      padding="md"
      hover
      fullHeight
      className="group relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[rgba(227,179,77,0.055)] blur-[90px]"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-5">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
            {icon}
          </span>

          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white/22">
            {number}
          </span>
        </div>

        <h3 className="mt-5 text-lg font-black tracking-[-0.03em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-white/43">
          {description}
        </p>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Process Step                                                           */
/* --------------------------------------------------------------------- */

function ProcessStep({
  number,
  title,
  description,
  last = false,
}: {
  number: string;
  title: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div className="relative">
      <div className="flex items-start gap-4">
        <div className="relative">
          <span className="relative z-[1] grid h-10 w-10 flex-[0_0_40px] place-items-center rounded-full border border-[rgba(227,179,77,0.28)] bg-[#0b0b0c] text-[9px] font-black text-[var(--mr-gold-200)]">
            {number}
          </span>

          {!last ? (
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-10 h-[calc(100%+30px)] w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(227,179,77,0.3),rgba(255,255,255,0.025))]"
            />
          ) : null}
        </div>

        <div className={last ? "" : "pb-10"}>
          <h3 className="text-base font-black tracking-[-0.025em] text-[var(--mr-text)]">
            {title}
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/43">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Platform Badge                                                         */
/* --------------------------------------------------------------------- */

function PlatformBadge({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/[0.075] bg-white/[0.025] px-5 text-[9px] font-black uppercase tracking-[0.13em] text-white/50">
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Distribution Page                                                     */
/* --------------------------------------------------------------------- */

export default function DistributionPage() {
  const releaseRequirements = [
    "Final mastered audio files",
    "Approved release artwork",
    "Artist and featured-artist information",
    "Release title and track information",
    "Accurate songwriting and production credits",
    "Release date and rollout timeline",
    "Clean or explicit content designation",
    "Verified contact information",
  ];

  const platforms = [
    "Spotify",
    "Apple Music",
    "YouTube Music",
    "Amazon Music",
    "TikTok",
    "Instagram / Meta",
    "Deezer",
    "TIDAL",
    "Pandora",
    "Other Supported DSPs",
  ];

  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      {/* --------------------------------------------------------------- */}
      {/* Background Atmosphere                                           */}
      {/* --------------------------------------------------------------- */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[1200px] w-[1650px] max-w-[134vw] -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.05)] blur-[225px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.15] [background-image:radial-gradient(rgba(227,179,77,0.11)_0.7px,transparent_0.7px)] [background-size:28px_28px]"
      />

      <Container size="wide">
        <div className="py-8 md:py-12">
          {/* ----------------------------------------------------------- */}
          {/* Hero                                                        */}
          {/* ----------------------------------------------------------- */}

          <header className="relative overflow-hidden rounded-[34px] border border-[rgba(227,179,77,0.22)] bg-[linear-gradient(145deg,rgba(18,17,15,0.98),rgba(6,6,7,0.99))] p-6 shadow-[0_36px_140px_rgba(0,0,0,0.6)] sm:p-8 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-48 -top-56 h-[680px] w-[680px] rounded-full bg-[rgba(227,179,77,0.16)] blur-[175px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-56 -left-44 h-[500px] w-[500px] rounded-full bg-[rgba(227,179,77,0.05)] blur-[150px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.82),transparent)]"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
              {/* Hero Content */}

              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex min-h-8 items-center rounded-full border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] px-4 text-[8px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                    Money Records Distribution
                  </span>

                  <span className="inline-flex min-h-8 items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-4 text-[8px] font-black uppercase tracking-[0.16em] text-white/45">
                    Release Infrastructure
                  </span>
                </div>

                <h1 className="mt-7 text-balance text-5xl font-black leading-[0.92] tracking-[-0.07em] text-[var(--mr-text)] sm:text-6xl lg:text-7xl">
                  Don&apos;t Just Upload.{" "}
                  <span className="mr-text-gradient">
                    Launch the Release.
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg font-black leading-8 tracking-[-0.025em] text-white/74 sm:text-xl">
                  Money Records combines release preparation, distribution,
                  metadata organization, artist positioning, and optional
                  platform marketing inside one professional release process.
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                  Distribution is only one layer of a successful release. The
                  goal is to make sure the music, artwork, metadata, artist
                  identity, release timing, streaming destinations, and
                  campaign strategy are aligned before the record goes live.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowIcon />}
                    className="w-full sm:w-auto"
                  >
                    Start a Distribution Inquiry
                  </Button>

                  <Button
                    href="/submit-music"
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Submit Your Music
                  </Button>

                  <Button
                    href="/services"
                    variant="ghost"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Explore Marketing
                  </Button>
                </div>
              </div>

              {/* Hero Side Card */}

              <Card
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full bg-[rgba(227,179,77,0.1)] blur-[110px]"
                />

                <div className="relative">
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                      <GlobeIcon />
                    </span>

                    <div>
                      <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                        Digital Release Support
                      </p>

                      <h2 className="mt-1 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                        Built for Modern DSPs
                      </h2>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-white/45">
                    Prepare your release for the major digital platforms while
                    keeping the artist, catalog, metadata, and campaign
                    presentation organized.
                  </p>

                  <Divider
                    className="my-6"
                    variant="soft"
                  />

                  <div className="grid gap-3">
                    {[
                      "Release metadata preparation",
                      "Artwork and asset review",
                      "Platform delivery coordination",
                      "Catalog organization",
                      "Release strategy support",
                      "Optional marketing services",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]">
                          <CheckIcon />
                        </span>

                        <p className="m-0 text-xs leading-6 text-white/43">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button
                      href="/contact"
                      variant="secondary"
                      size="lg"
                      rightIcon={<ArrowIcon />}
                      fullWidth
                    >
                      Discuss Your Release
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </header>

          {/* ----------------------------------------------------------- */}
          {/* Distribution Philosophy                                     */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="distribution-philosophy-heading"
            className="py-14 md:py-20"
          >
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  Our Approach
                </p>

                <h2
                  id="distribution-philosophy-heading"
                  className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl lg:text-5xl"
                >
                  Distribution Is the{" "}
                  <span className="mr-text-gradient">
                    Beginning.
                  </span>
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                  Getting music onto streaming platforms matters, but the
                  release still needs structure around it.
                </p>
              </div>

              <Card
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-36 -top-40 h-[460px] w-[460px] rounded-full bg-[rgba(227,179,77,0.08)] blur-[130px]"
                />

                <div className="relative">
                  <p className="text-lg font-black leading-8 tracking-[-0.025em] text-white/72 sm:text-xl">
                    A release should arrive with clean metadata, professional
                    artwork, accurate credits, consistent artist branding, and
                    a clear plan for how listeners are going to discover it.
                  </p>

                  <p className="mt-5 text-sm leading-7 text-white/46 sm:text-base">
                    Money Records approaches distribution as part of a larger
                    release system rather than treating the upload itself as
                    the final objective.
                  </p>

                  <p className="mt-5 text-sm leading-7 text-white/46 sm:text-base">
                    Artists can also connect distribution with platform
                    marketing, release pages, social campaigns, press, VEVO,
                    radio, and other promotional services depending on the
                    project.
                  </p>
                </div>
              </Card>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Features                                                    */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="distribution-features-heading"
            className="pb-14 md:pb-20"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  Release Infrastructure
                </p>

                <h2
                  id="distribution-features-heading"
                  className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl lg:text-5xl"
                >
                  Everything Around{" "}
                  <span className="mr-text-gradient">
                    the Upload.
                  </span>
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                  Build a cleaner release from the assets through the
                  post-launch campaign.
                </p>
              </div>

              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                rightIcon={<ArrowIcon />}
                className="w-full md:w-auto"
              >
                Ask About Distribution
              </Button>
            </div>

            <Divider
              className="my-8"
              variant="strong"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <FeatureCard
                number="01"
                icon={<UploadIcon />}
                title="Release Preparation"
                description="Organize final audio, artwork, release dates, artist information, track information, and the assets needed before delivery."
              />

              <FeatureCard
                number="02"
                icon={<MetadataIcon />}
                title="Metadata Organization"
                description="Structure release titles, artist names, credits, content classifications, track information, and other important release data."
              />

              <FeatureCard
                number="03"
                icon={<GlobeIcon />}
                title="Digital Platform Delivery"
                description="Prepare releases for delivery across supported digital streaming and music platforms."
              />

              <FeatureCard
                number="04"
                icon={<MusicIcon />}
                title="Catalog Presentation"
                description="Keep releases connected to consistent artist identities, artwork, credits, streaming links, and catalog pages."
              />

              <FeatureCard
                number="05"
                icon={<StrategyIcon />}
                title="Release Strategy"
                description="Align the release date, platform priorities, content rollout, promotional plan, and artist messaging before launch."
              />

              <FeatureCard
                number="06"
                icon={<ChartIcon />}
                title="Marketing Expansion"
                description="Connect an eligible release with Spotify, Apple Music, YouTube, TikTok, Instagram, VEVO, press, radio, and other campaign options."
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Platforms                                                   */}
          {/* ----------------------------------------------------------- */}

          <section className="pb-14 md:pb-20">
            <Card
              variant="featured"
              padding="lg"
              topLine
              className="relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full bg-[rgba(227,179,77,0.09)] blur-[145px]"
              />

              <div className="relative grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
                <div>
                  <span className="grid h-14 w-14 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                    <GlobeIcon />
                  </span>

                  <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Digital Platforms
                  </p>

                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                    Built for a{" "}
                    <span className="mr-text-gradient">
                      Global Music Market.
                    </span>
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-white/47 sm:text-base">
                    Release availability can vary by project, territory,
                    eligibility, platform requirements, and distribution
                    arrangement.
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-3">
                    {platforms.map((platform) => (
                      <PlatformBadge
                        key={platform}
                      >
                        {platform}
                      </PlatformBadge>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[22px] border border-white/[0.065] bg-white/[0.022] p-5">
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)]">
                      Platform Availability
                    </p>

                    <p className="mt-3 text-xs leading-6 text-white/40">
                      Platform names are provided as examples of digital music
                      destinations. Final delivery options depend on the
                      specific release, rights, territories, eligibility, and
                      the distribution arrangement in place.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Release Requirements                                        */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="distribution-requirements-heading"
            className="pb-14 md:pb-20"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-start">
              <div>
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  Before Distribution
                </p>

                <h2
                  id="distribution-requirements-heading"
                  className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
                >
                  Get the Release{" "}
                  <span className="mr-text-gradient">
                    Ready First.
                  </span>
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                  Accurate information at the beginning helps reduce problems
                  later in the release process.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {releaseRequirements.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-[20px] border border-white/[0.065] bg-white/[0.022] p-4"
                    >
                      <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]">
                        <CheckIcon />
                      </span>

                      <p className="m-0 text-xs leading-6 text-white/43">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Card
                padding="lg"
                className="relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[rgba(227,179,77,0.065)] blur-[100px]"
                />

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                      <ShieldIcon />
                    </span>

                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                        Rights Matter
                      </p>

                      <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                        Only Distribute Music You Control
                      </h3>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-white/44">
                    Artists must have the rights, licenses, permissions, or
                    authority required to distribute the submitted recording,
                    composition, artwork, and related materials.
                  </p>

                  <div className="mt-5 rounded-[20px] border border-[rgba(227,179,77,0.15)] bg-[rgba(211,154,46,0.035)] p-4">
                    <p className="text-xs leading-6 text-white/40">
                      Samples, beats, featured artists, collaborations,
                      artwork, and third-party material should be cleared
                      before a release is submitted for distribution.
                    </p>
                  </div>

                  <div className="mt-6">
                    <Button
                      href="/submit-music"
                      variant="secondary"
                      size="lg"
                      rightIcon={<ArrowIcon />}
                      fullWidth
                    >
                      Submit Your Release
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Process                                                     */}
          {/* ----------------------------------------------------------- */}

          <section className="pb-14 md:pb-20">
            <Card
              variant="featured"
              padding="lg"
              topLine
              className="relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full bg-[rgba(227,179,77,0.09)] blur-[145px]"
              />

              <div className="relative grid gap-10 lg:grid-cols-[0.76fr_1.24fr]">
                <div>
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Distribution Process
                  </p>

                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                    From Final Master to{" "}
                    <span className="mr-text-gradient">
                      Release Day.
                    </span>
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-white/46 sm:text-base">
                    The exact workflow can vary depending on the artist,
                    release, timeline, and distribution arrangement.
                  </p>
                </div>

                <div>
                  <ProcessStep
                    number="01"
                    title="Submit the Release"
                    description="Send the music, artist information, release details, current links, and project goals to Money Records."
                  />

                  <ProcessStep
                    number="02"
                    title="Review Assets and Rights"
                    description="Confirm the release assets, ownership information, artwork, credits, metadata, and overall readiness."
                  />

                  <ProcessStep
                    number="03"
                    title="Prepare Metadata"
                    description="Organize artist names, track titles, release information, content designation, credits, and other release data."
                  />

                  <ProcessStep
                    number="04"
                    title="Schedule Delivery"
                    description="Coordinate the release timeline and platform-delivery process based on the project and available distribution arrangement."
                  />

                  <ProcessStep
                    number="05"
                    title="Build the Rollout"
                    description="Connect the release with optional platform marketing, social content, press, video, branding, or other promotional support."
                  />

                  <ProcessStep
                    number="06"
                    title="Launch and Continue Building"
                    description="Use the release, streaming destinations, content, campaign data, and audience response to inform the artist's next move."
                    last
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Distribution + Marketing                                    */}
          {/* ----------------------------------------------------------- */}

          <section className="pb-14 md:pb-20">
            <Card
              padding="lg"
              className="relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-36 h-96 w-96 rounded-full bg-[rgba(227,179,77,0.07)] blur-[120px]"
              />

              <div className="relative grid gap-9 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                <div>
                  <span className="grid h-14 w-14 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                    <StrategyIcon />
                  </span>

                  <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Beyond Distribution
                  </p>

                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                    Distribution Gets It Live.{" "}
                    <span className="mr-text-gradient">
                      Marketing Gets It Moving.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                    Once the release infrastructure is ready, artists can
                    explore individual campaign options across the platforms
                    most relevant to their audience.
                  </p>
                </div>

                <div className="grid gap-3">
                  {[
                    "Spotify marketing",
                    "Apple Music campaigns",
                    "Instagram promotion",
                    "TikTok marketing",
                    "YouTube campaigns",
                    "VEVO support",
                    "Press and PR",
                    "Radio promotion",
                    "SoundCloud marketing",
                    "Artist branding",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-[18px] border border-white/[0.065] bg-white/[0.022] p-4"
                    >
                      <span className="grid h-6 w-6 flex-[0_0_24px] place-items-center rounded-full border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]">
                        <CheckIcon />
                      </span>

                      <p className="text-xs font-bold text-white/48">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Divider
                className="my-8"
                variant="soft"
              />

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  href="/services"
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowIcon />}
                  className="w-full sm:w-auto"
                >
                  Explore Marketing Services
                </Button>

                <Button
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Build a Release Plan
                </Button>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Who It Is For                                               */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="distribution-artists-heading"
            className="pb-14 md:pb-20"
          >
            <div className="max-w-3xl">
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Built for Independent Talent
              </p>

              <h2
                id="distribution-artists-heading"
                className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl lg:text-5xl"
              >
                Different Artists.{" "}
                <span className="mr-text-gradient">
                  Different Stages.
                </span>
              </h2>
            </div>

            <Divider
              className="my-8"
              variant="strong"
            />

            <div className="grid gap-5 md:grid-cols-3">
              <Card
                padding="lg"
                hover
                fullHeight
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                  <ArtistIcon />
                </span>

                <p className="mt-5 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                  New Artists
                </p>

                <h3 className="mt-2 text-lg font-black tracking-[-0.03em] text-[var(--mr-text)]">
                  Preparing the First Serious Release
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/43">
                  Build the release correctly from the beginning with clean
                  assets, metadata, branding, links, and a professional launch
                  structure.
                </p>
              </Card>

              <Card
                padding="lg"
                hover
                fullHeight
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                  <MusicIcon />
                </span>

                <p className="mt-5 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                  Active Artists
                </p>

                <h3 className="mt-2 text-lg font-black tracking-[-0.03em] text-[var(--mr-text)]">
                  Building a Consistent Catalog
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/43">
                  Keep artist identity, artwork, release information, streaming
                  links, and campaign strategy more consistent across multiple
                  releases.
                </p>
              </Card>

              <Card
                padding="lg"
                hover
                fullHeight
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                  <ChartIcon />
                </span>

                <p className="mt-5 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                  Growing Artists
                </p>

                <h3 className="mt-2 text-lg font-black tracking-[-0.03em] text-[var(--mr-text)]">
                  Connecting Distribution and Growth
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/43">
                  Use releases as part of a larger growth strategy involving
                  marketing, social content, platform campaigns, press,
                  branding, and audience development.
                </p>
              </Card>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Distribution Notice                                         */}
          {/* ----------------------------------------------------------- */}

          <section className="pb-14 md:pb-20">
            <Card
              padding="lg"
              className="relative overflow-hidden"
            >
              <div className="relative grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
                <div>
                  <span className="grid h-14 w-14 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                    <ShieldIcon />
                  </span>

                  <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                    Distribution Notice
                  </p>

                  <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl">
                    Every Release Is Subject to Review.
                  </h2>
                </div>

                <div>
                  <p className="text-sm leading-7 text-white/45">
                    Submitting music or requesting distribution does not
                    automatically guarantee acceptance, delivery to every
                    platform, specific release dates, editorial placement,
                    playlist placement, streaming results, revenue, marketing
                    performance, or other outcomes.
                  </p>

                  <p className="mt-4 text-sm leading-7 text-white/45">
                    Distribution options may depend on rights, release content,
                    platform requirements, territories, project eligibility,
                    available arrangements, and completion of any required
                    agreements.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Contact Strip                                               */}
          {/* ----------------------------------------------------------- */}

          <section className="pb-14 md:pb-20">
            <Card
              padding="lg"
              className="relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-36 h-96 w-96 rounded-full bg-[rgba(227,179,77,0.07)] blur-[120px]"
              />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Distribution Inquiries
                  </p>

                  <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl">
                    Have a Release Ready to Go?
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/46">
                    Send the team your release information, music link,
                    timeline, current artist profiles, and what you want to
                    accomplish.
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowIcon />}
                    className="w-full lg:w-auto"
                  >
                    Start an Inquiry
                  </Button>

                  <Button
                    href="/submit-music"
                    variant="secondary"
                    size="lg"
                    className="w-full lg:w-auto"
                  >
                    Submit Music
                  </Button>
                </div>
              </div>

              <Divider
                className="my-7"
                variant="soft"
              />

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-xs text-white/40 transition hover:text-[var(--mr-gold-200)]"
              >
                <MailIcon />
                {CONTACT_EMAIL}
              </a>
            </Card>
          </section>

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
                className="pointer-events-none absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full bg-[rgba(227,179,77,0.11)] blur-[145px]"
              />

              <div className="relative grid gap-9 lg:grid-cols-[1fr_0.82fr] lg:items-center">
                <div>
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Money Records Distribution
                  </p>

                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                    Prepare It. Distribute It.{" "}
                    <span className="mr-text-gradient">
                      Move the Release.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                    Build a release system that connects distribution,
                    presentation, artist identity, streaming destinations, and
                    platform-specific marketing.
                  </p>
                </div>

                <div className="grid gap-3">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowIcon />}
                    fullWidth
                  >
                    Discuss Distribution
                  </Button>

                  <Button
                    href="/submit-music"
                    variant="secondary"
                    size="lg"
                    fullWidth
                  >
                    Submit Your Release
                  </Button>

                  <Button
                    href="/services"
                    variant="ghost"
                    size="lg"
                    fullWidth
                  >
                    Explore Marketing
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </Container>
    </div>
  );
}