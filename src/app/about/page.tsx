// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — About Page                                           ┃
   ┃ File   : src/app/about/page.tsx                                      ┃
   ┃ Role   : Company story, mission, capabilities, and label identity    ┃
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

const INSTAGRAM_URL =
  "https://instagram.com/kingpharaohreal";

const INSTAGRAM_HANDLE =
  "@kingpharaohreal";

/* --------------------------------------------------------------------- */
/* Metadata                                                               */
/* --------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "About",

  description:
    "Learn about Money Records LLC, an independent record label and music-marketing company focused on artist development, releases, distribution, platform marketing, branding, press, VEVO, radio, and long-term artist growth.",

  keywords: [
    "Money Records",
    "Money Records LLC",
    "about Money Records",
    "independent record label",
    "music marketing company",
    "artist development",
    "music distribution",
    "record label",
    "Spotify marketing",
    "Apple Music promotion",
    "TikTok music marketing",
    "Instagram music marketing",
    "YouTube music marketing",
    "VEVO distribution",
    "music public relations",
    "radio promotion",
    "artist branding",
  ],

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    type: "website",

    title:
      "About Money Records",

    description:
      "Learn about Money Records LLC, our mission, artist-development approach, release infrastructure, and music-marketing ecosystem.",

    url:
      "/about",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "About Money Records",

    description:
      "Independent label infrastructure, artist development, releases, distribution, and platform-specific music marketing.",
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

function MegaphoneIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
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

function TargetIcon(): ReactNode {
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

function LayersIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <path
        d="M12 4L20 8L12 12L4 8L12 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M4 12L12 16L20 12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M4 16L12 20L20 16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoltIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <path
        d="M13.5 3L6 13H11L10.5 21L18 10.5H13L13.5 3Z"
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
/* Capability Card                                                        */
/* --------------------------------------------------------------------- */

function CapabilityCard({
  icon,
  number,
  title,
  description,
}: {
  icon: ReactNode;
  number: string;
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
/* Principle Card                                                         */
/* --------------------------------------------------------------------- */

function PrincipleCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/[0.065] bg-white/[0.022] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-5">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[9px] font-black text-[var(--mr-gold-200)]">
          {number}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-black tracking-[-0.03em] text-[var(--mr-text)]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-white/43">
        {description}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Timeline Item                                                          */
/* --------------------------------------------------------------------- */

function TimelineItem({
  year,
  eyebrow,
  title,
  description,
  last = false,
}: {
  year: string;
  eyebrow: string;
  title: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div className="relative grid gap-5 sm:grid-cols-[110px_minmax(0,1fr)]">
      <div className="relative">
        <span className="inline-flex min-h-9 items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] px-4 text-[9px] font-black uppercase tracking-[0.14em] text-[var(--mr-gold-200)]">
          {year}
        </span>

        {!last ? (
          <span
            aria-hidden="true"
            className="absolute left-[20px] top-12 hidden h-[calc(100%+12px)] w-px bg-[linear-gradient(to_bottom,rgba(227,179,77,0.3),rgba(255,255,255,0.04))] sm:block"
          />
        ) : null}
      </div>

      <div className={last ? "" : "pb-9"}>
        <p className="m-0 text-[9px] font-black uppercase tracking-[0.16em] text-white/30">
          {eyebrow}
        </p>

        <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
          {title}
        </h3>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-white/44">
          {description}
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* About Page                                                             */
/* --------------------------------------------------------------------- */

export default function AboutPage() {
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
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[1150px] w-[1600px] max-w-[132vw] -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.05)] blur-[220px]"
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
              {/* Hero Copy */}

              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex min-h-8 items-center rounded-full border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] px-4 text-[8px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                    About Money Records
                  </span>

                  <span className="inline-flex min-h-8 items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-4 text-[8px] font-black uppercase tracking-[0.16em] text-white/45">
                    Established 2019
                  </span>
                </div>

                <h1 className="mt-7 text-balance text-5xl font-black leading-[0.92] tracking-[-0.07em] text-[var(--mr-text)] sm:text-6xl lg:text-7xl">
                  More Than a Label.{" "}
                  <span className="mr-text-gradient">
                    An Artist Infrastructure.
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg font-black leading-8 tracking-[-0.025em] text-white/74 sm:text-xl">
                  Money Records combines music, artist development,
                  distribution, marketing, branding, and release strategy
                  under one independent music company.
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                  Our focus is simple: help artists build stronger records,
                  stronger brands, cleaner releases, and more intentional
                  campaigns across the platforms where modern music moves.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    href="/artists"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowIcon />}
                    className="w-full sm:w-auto"
                  >
                    Explore Our Artists
                  </Button>

                  <Button
                    href="/releases"
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Explore Releases
                  </Button>

                  <Button
                    href="/services"
                    variant="ghost"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Explore Services
                  </Button>
                </div>
              </div>

              {/* Hero Identity Panel */}

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
                      <MusicIcon />
                    </span>

                    <div>
                      <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                        Independent Music Company
                      </p>

                      <h2 className="mt-1 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                        Money Records LLC
                      </h2>
                    </div>
                  </div>

                  <Divider
                    className="my-6"
                    variant="soft"
                  />

                  <div className="grid gap-3">
                    {[
                      "Artist development",
                      "Official music releases",
                      "Music distribution",
                      "Platform-specific marketing",
                      "Press, VEVO, radio, and branding",
                      "Release strategy and positioning",
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

                  <div className="mt-6 rounded-[20px] border border-[rgba(227,179,77,0.16)] bg-[rgba(211,154,46,0.035)] p-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)]">
                      Our Direction
                    </p>

                    <p className="mt-2 text-xs leading-6 text-white/40">
                      Build an independent music ecosystem capable of
                      supporting artists from the first idea through release,
                      promotion, audience growth, and long-term brand
                      development.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </header>

          {/* ----------------------------------------------------------- */}
          {/* Mission                                                     */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="about-mission-heading"
            className="py-14 md:py-20"
          >
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  Our Mission
                </p>

                <h2
                  id="about-mission-heading"
                  className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl lg:text-5xl"
                >
                  Build Artists With{" "}
                  <span className="mr-text-gradient">
                    Real Infrastructure.
                  </span>
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                  Great music still needs strategy. Strong artists still need
                  positioning. A release still needs a plan for how it reaches
                  people.
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
                    Money Records was built around the idea that independent
                    artists should be able to access professional release
                    infrastructure without losing sight of their identity.
                  </p>

                  <p className="mt-5 text-sm leading-7 text-white/46 sm:text-base">
                    That means thinking beyond simply uploading music. We look
                    at the record, the artist, the brand, the audience, the
                    platform, the rollout, and the next move as parts of the
                    same system.
                  </p>

                  <p className="mt-5 text-sm leading-7 text-white/46 sm:text-base">
                    Whether an artist is working directly with the label or
                    purchasing an individual marketing service, the goal is
                    professional presentation, clear strategy, and execution
                    built around the actual project.
                  </p>
                </div>
              </Card>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Capabilities                                                */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="about-capabilities-heading"
            className="pb-14 md:pb-20"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  What We Build
                </p>

                <h2
                  id="about-capabilities-heading"
                  className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl lg:text-5xl"
                >
                  One Company.{" "}
                  <span className="mr-text-gradient">
                    Multiple Layers.
                  </span>
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                  Money Records connects the pieces artists commonly have to
                  manage separately.
                </p>
              </div>

              <Button
                href="/services"
                variant="secondary"
                size="lg"
                rightIcon={<ArrowIcon />}
                className="w-full md:w-auto"
              >
                View All Services
              </Button>
            </div>

            <Divider
              className="my-8"
              variant="strong"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <CapabilityCard
                number="01"
                icon={<ArtistIcon />}
                title="Artist Development"
                description="Positioning, brand direction, release planning, creative strategy, and long-term artist growth."
              />

              <CapabilityCard
                number="02"
                icon={<MusicIcon />}
                title="Official Releases"
                description="Professional release presentation connecting music, artwork, artist identity, credits, and streaming destinations."
              />

              <CapabilityCard
                number="03"
                icon={<GlobeIcon />}
                title="Music Distribution"
                description="Release preparation and distribution support designed to keep catalog presentation and rollout timing aligned."
              />

              <CapabilityCard
                number="04"
                icon={<MegaphoneIcon />}
                title="Platform Marketing"
                description="Campaign options across Spotify, Apple Music, Instagram, TikTok, YouTube, SoundCloud, and other major platforms."
              />

              <CapabilityCard
                number="05"
                icon={<LayersIcon />}
                title="Release Infrastructure"
                description="A coordinated system connecting distribution, marketing, artist pages, release pages, campaign strategy, and audience routing."
              />

              <CapabilityCard
                number="06"
                icon={<TargetIcon />}
                title="Brand Positioning"
                description="Artist branding, visuals, messaging, presentation, and audience positioning built around the identity of the artist."
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Company Story                                               */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="company-story-heading"
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
                className="pointer-events-none absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full bg-[rgba(227,179,77,0.09)] blur-[145px]"
              />

              <div className="relative grid gap-10 lg:grid-cols-[0.76fr_1.24fr]">
                <div>
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Our Story
                  </p>

                  <h2
                    id="company-story-heading"
                    className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
                  >
                    Built for the{" "}
                    <span className="mr-text-gradient">
                      Independent Era.
                    </span>
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-white/46 sm:text-base">
                    Money Records was founded in 2019 with an independent
                    approach to music, business, artist growth, and modern
                    release strategy.
                  </p>
                </div>

                <div>
                  <TimelineItem
                    year="2019"
                    eyebrow="Foundation"
                    title="Money Records Is Established"
                    description="The company begins as an independent music brand focused on records, artists, creative ownership, and building opportunities outside the traditional label model."
                  />

                  <TimelineItem
                    year="Growth"
                    eyebrow="Expansion"
                    title="Beyond Music Distribution"
                    description="The vision expands beyond releasing music into artist development, platform marketing, branding, visual strategy, press, audience growth, and release infrastructure."
                  />

                  <TimelineItem
                    year="Today"
                    eyebrow="Integrated Platform"
                    title="Label + Marketing + Release Ecosystem"
                    description="Money Records now brings together the label roster, official catalog, artist submissions, platform-specific services, campaign purchasing, and artist-facing release tools inside one connected brand."
                    last
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Principles                                                  */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="principles-heading"
            className="pb-14 md:pb-20"
          >
            <div className="max-w-3xl">
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                How We Think
              </p>

              <h2
                id="principles-heading"
                className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl lg:text-5xl"
              >
                The Money Records{" "}
                <span className="mr-text-gradient">
                  Standard.
                </span>
              </h2>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                The company is built around a few operating principles that
                guide how artists, releases, and campaigns are approached.
              </p>
            </div>

            <Divider
              className="my-8"
              variant="strong"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <PrincipleCard
                number="01"
                title="Artist Identity First"
                description="Marketing should amplify the artist instead of making every artist look, sound, and move the same."
              />

              <PrincipleCard
                number="02"
                title="Strategy Before Noise"
                description="A campaign should have a reason, platform, audience, sequence, and objective before money is spent."
              />

              <PrincipleCard
                number="03"
                title="Premium Presentation"
                description="Artwork, metadata, artist pages, release pages, messaging, and campaign presentation all influence how a project is perceived."
              />

              <PrincipleCard
                number="04"
                title="Build the Next Move"
                description="Every release and campaign should create information, momentum, and positioning that can support the next opportunity."
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Artist Ecosystem                                            */}
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
                className="pointer-events-none absolute -left-36 -top-36 h-[460px] w-[460px] rounded-full bg-[rgba(227,179,77,0.075)] blur-[135px]"
              />

              <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                <div>
                  <span className="grid h-14 w-14 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                    <BoltIcon />
                  </span>

                  <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Built for Artists
                  </p>

                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                    From the First Record to{" "}
                    <span className="mr-text-gradient">
                      the Next Level.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                    Artists can enter the Money Records ecosystem in different
                    ways — through the roster, a music submission, a release,
                    distribution, or an individual marketing campaign.
                  </p>
                </div>

                <div className="grid gap-3">
                  {[
                    {
                      title:
                        "Submit Music",
                      description:
                        "Introduce your music, story, links, goals, and creative direction.",
                    },
                    {
                      title:
                        "Build a Release",
                      description:
                        "Prepare the music, presentation, release information, and rollout.",
                    },
                    {
                      title:
                        "Launch a Campaign",
                      description:
                        "Select the platform and promotional service that matches the goal.",
                    },
                    {
                      title:
                        "Develop the Artist",
                      description:
                        "Use every release and campaign to strengthen the larger artist brand.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 rounded-[22px] border border-white/[0.065] bg-white/[0.022] p-4"
                    >
                      <span className="grid h-8 w-8 flex-[0_0_32px] place-items-center rounded-full border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[9px] font-black text-[var(--mr-gold-200)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h3 className="text-sm font-black text-[var(--mr-text)]">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs leading-6 text-white/40">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Trust / Company Identity                                    */}
          {/* ----------------------------------------------------------- */}

          <section className="pb-14 md:pb-20">
            <div className="grid gap-5 md:grid-cols-3">
              <Card
                padding="lg"
                hover
                fullHeight
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                  <ShieldIcon />
                </span>

                <p className="mt-5 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                  Independent
                </p>

                <h3 className="mt-2 text-lg font-black tracking-[-0.03em] text-[var(--mr-text)]">
                  Built Outside the Traditional Model
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/43">
                  Money Records operates as an independent music company with
                  flexibility to build services, releases, and artist
                  opportunities around the modern music environment.
                </p>
              </Card>

              <Card
                padding="lg"
                hover
                fullHeight
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                  <TargetIcon />
                </span>

                <p className="mt-5 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                  Focused
                </p>

                <h3 className="mt-2 text-lg font-black tracking-[-0.03em] text-[var(--mr-text)]">
                  Strategy Around the Actual Goal
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/43">
                  Different artists, releases, and platforms require different
                  approaches. The service structure is designed around that
                  reality.
                </p>
              </Card>

              <Card
                padding="lg"
                hover
                fullHeight
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                  <LayersIcon />
                </span>

                <p className="mt-5 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                  Integrated
                </p>

                <h3 className="mt-2 text-lg font-black tracking-[-0.03em] text-[var(--mr-text)]">
                  Label and Marketing Under One Brand
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/43">
                  Artist development, releases, distribution, catalog pages,
                  submissions, and marketing are connected instead of
                  operating as separate experiences.
                </p>
              </Card>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Contact                                                     */}
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
                    Connect With Money Records
                  </p>

                  <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl">
                    Have a Project, Release, or Opportunity?
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/46">
                    Contact the team about services, partnerships,
                    distribution, artist development, or other Money Records
                    opportunities.
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
                    Contact the Team
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

              <div className="flex flex-col gap-3 text-xs text-white/38 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 transition hover:text-[var(--mr-gold-200)]"
                >
                  <MailIcon />
                  {CONTACT_EMAIL}
                </a>

                <span className="hidden text-white/15 sm:inline">
                  •
                </span>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-[var(--mr-gold-200)]"
                >
                  Instagram: {INSTAGRAM_HANDLE}
                </a>
              </div>
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
                    Money Records LLC
                  </p>

                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                    Build the Record.{" "}
                    <span className="mr-text-gradient">
                      Build the Artist.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                    Explore the roster, discover official releases, purchase
                    platform-specific marketing, or introduce your own music to
                    the Money Records team.
                  </p>
                </div>

                <div className="grid gap-3">
                  <Button
                    href="/artists"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowIcon />}
                    fullWidth
                  >
                    Explore Artists
                  </Button>

                  <Button
                    href="/releases"
                    variant="secondary"
                    size="lg"
                    fullWidth
                  >
                    Explore Releases
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