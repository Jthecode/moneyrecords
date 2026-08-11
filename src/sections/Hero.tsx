// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Hero Section                                          ┃
   ┃ File   : src/sections/Hero.tsx                                        ┃
   ┃ Role   : Premium record-label and campaign-storefront introduction    ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Image from "next/image";

import Button from "@/components/Button";
import Card from "@/components/Card";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type HeroProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;

  primaryCtaHref?: string;
  primaryCtaLabel?: string;

  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;

  /**
   * Background image rendered beneath the cinematic hero overlays.
   *
   * @default "/brand/hero-world.jpg"
   */
  backgroundImageSrc?: string;
};

type FeatureProps = {
  number: string;
  title: string;
  description: string;
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="15"
      height="15"
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
        strokeWidth="1.6"
      />

      <path
        d="M3.8 12H20.2M12 3.5C14.1 5.8 15.3 8.7 15.3 12C15.3 15.3 14.1 18.2 12 20.5C9.9 18.2 8.7 15.3 8.7 12C8.7 8.7 9.9 5.8 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
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
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M9 18V6L19 4V16"
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
        cx="16.5"
        cy="16"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M5 19V12M12 19V7M19 19V4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M3 21H21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/* Feature Row                                                            */
/* --------------------------------------------------------------------- */

function Feature({
  number,
  title,
  description,
}: FeatureProps) {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4 transition-all duration-300 hover:border-[rgba(227,179,77,0.28)] hover:bg-[rgba(211,154,46,0.05)]">
      <div className="relative grid h-11 w-11 flex-[0_0_44px] place-items-center overflow-hidden rounded-xl border border-[rgba(227,179,77,0.25)] bg-[rgba(211,154,46,0.07)] text-xs font-black text-[var(--mr-gold-100)] shadow-[0_10px_32px_rgba(0,0,0,0.32)]">
        <span
          aria-hidden="true"
          className="absolute inset-x-2 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(248,223,160,0.75),transparent)]"
        />

        {number}
      </div>

      <div className="min-w-0">
        <h3 className="m-0 text-sm font-black uppercase tracking-[0.09em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
          {title}
        </h3>

        <p className="mt-1.5 text-sm leading-6 text-white/50">
          {description}
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Hero                                                                   */
/* --------------------------------------------------------------------- */

export default function Hero({
  eyebrow = "Independent Record Label · Global Marketing",
  title = "Build the Record.\nBreak the Artist.\nMove the World.",
  subtitle = "Money Records combines artist development, global distribution, platform-specific marketing, PR, VEVO support, and complete release strategy inside one premium music ecosystem.",
  primaryCtaHref = "/services",
  primaryCtaLabel = "Explore Campaigns",
  secondaryCtaHref = "#rank",
  secondaryCtaLabel = "Discover the Label",
  backgroundImageSrc = "/brand/hero-world.jpg",
}: HeroProps) {
  return (
    <div
      id="home"
      className="mr-hero mt-6 md:mt-8"
      aria-labelledby="money-records-hero-heading"
      aria-describedby="money-records-hero-description"
    >
      {/* Background image */}

      <div
        aria-hidden="true"
        className="mr-hero-bg"
        style={{
          backgroundImage: `url("${backgroundImageSrc}")`,
        }}
      />

      {/* Grid and floating atmosphere */}

      <div aria-hidden="true" className="mr-hero-grid" />

      <div
        aria-hidden="true"
        className="mr-hero-orb mr-hero-orb-left"
      />

      <div
        aria-hidden="true"
        className="mr-hero-orb mr-hero-orb-right"
      />

      {/* Decorative map points */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
      >
        <span className="absolute left-[17%] top-[34%] h-2 w-2 rounded-full bg-[var(--mr-gold-200)] shadow-[0_0_22px_rgba(239,202,112,0.8)]" />

        <span className="absolute left-[17%] top-[34%] h-2 w-2 animate-ping rounded-full bg-[rgba(239,202,112,0.42)]" />

        <span className="absolute right-[16%] top-[29%] h-1.5 w-1.5 rounded-full bg-[var(--mr-gold-300)] shadow-[0_0_18px_rgba(227,179,77,0.68)]" />

        <span className="absolute bottom-[25%] right-[29%] h-1.5 w-1.5 rounded-full bg-[var(--mr-gold-200)] shadow-[0_0_18px_rgba(239,202,112,0.68)]" />
      </div>

      {/* Main content */}

      <div className="mr-hero-content">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-20">
          {/* ----------------------------------------------------------- */}
          {/* Left: Brand Statement                                       */}
          {/* ----------------------------------------------------------- */}

          <div className="relative max-w-4xl">
            <div className="mr-eyebrow">
              {eyebrow}
            </div>

            <h1
              id="money-records-hero-heading"
              className="mr-title mt-6 whitespace-pre-line"
            >
              {title}
            </h1>

            <p
              id="money-records-hero-description"
              className="mr-subtitle mt-7 max-w-2xl"
            >
              {subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                variant="primary"
                size="lg"
                href={primaryCtaHref}
                className="w-full sm:w-auto"
              >
                {primaryCtaLabel}
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href={secondaryCtaHref}
                className="w-full sm:w-auto"
              >
                {secondaryCtaLabel}
              </Button>
            </div>

            {/* Capability badges */}

            <div className="mt-9 flex flex-wrap gap-2.5">
              <span className="mr-badge mr-badge-featured">
                Record Label
              </span>

              <span className="mr-badge mr-badge-dark">
                Global Distribution
              </span>

              <span className="mr-badge mr-badge-dark">
                Music Marketing
              </span>

              <span className="mr-badge mr-badge-dark">
                PR · VEVO · Rollouts
              </span>
            </div>

            {/* Compact trust row */}

            <div className="mt-10 grid max-w-2xl gap-4 border-t border-white/[0.07] pt-7 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <span className="mr-icon-ring h-10 w-10 flex-[0_0_40px]">
                  <MusicIcon />
                </span>

                <div>
                  <p className="m-0 text-xs font-black uppercase tracking-[0.13em] text-white/75">
                    Label
                  </p>

                  <p className="mt-1 text-xs text-white/38">
                    Artist development
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="mr-icon-ring h-10 w-10 flex-[0_0_40px]">
                  <GlobeIcon />
                </span>

                <div>
                  <p className="m-0 text-xs font-black uppercase tracking-[0.13em] text-white/75">
                    Worldwide
                  </p>

                  <p className="mt-1 text-xs text-white/38">
                    Global delivery
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="mr-icon-ring h-10 w-10 flex-[0_0_40px]">
                  <ChartIcon />
                </span>

                <div>
                  <p className="m-0 text-xs font-black uppercase tracking-[0.13em] text-white/75">
                    Campaigns
                  </p>

                  <p className="mt-1 text-xs text-white/38">
                    Targeted execution
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Right: Money Records System                                 */}
          {/* ----------------------------------------------------------- */}

          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
            {/* Floating crest */}

            <div className="absolute -right-3 -top-5 z-20 hidden sm:block lg:-right-5 lg:-top-7">
              <div className="relative h-[74px] w-[74px] overflow-hidden rounded-full border border-[rgba(248,223,160,0.34)] bg-[rgba(5,5,6,0.82)] shadow-[0_18px_50px_rgba(0,0,0,0.55),0_0_42px_rgba(211,154,46,0.16)] backdrop-blur-xl">
                <Image
                  src="/brand/mr-crest.png"
                  alt="Money Records crest"
                  width={88}
                  height={88}
                  priority
                  sizes="88px"
                  className="h-full w-full object-contain p-2"
                />
              </div>
            </div>

            <Card
              as="article"
              variant="featured"
              padding="lg"
              topLine
              className="relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[rgba(211,154,46,0.11)] blur-[75px]"
              />

              <div className="relative">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span className="mr-badge mr-badge-featured">
                      Money Records System
                    </span>

                    <h2 className="mt-5 text-balance text-2xl font-black leading-[1.03] tracking-[-0.035em] text-[var(--mr-text)] sm:text-3xl">
                      Everything Your Release Needs to Move.
                    </h2>
                  </div>

                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[rgba(227,179,77,0.24)] bg-black/45 sm:hidden">
                    <Image
                      src="/brand/mr-crest.png"
                      alt=""
                      width={56}
                      height={56}
                      sizes="48px"
                      className="h-full w-full object-contain p-1.5"
                    />
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-white/52">
                  Choose label support, individual platform campaigns, or a
                  complete multi-platform release rollout.
                </p>

                <div className="mt-7 grid gap-3">
                  <Feature
                    number="01"
                    title="Label & Distribution"
                    description="Release planning, global delivery, catalog support, and professional positioning."
                  />

                  <Feature
                    number="02"
                    title="Platform Campaigns"
                    description="Individual Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO, press, and radio services."
                  />

                  <Feature
                    number="03"
                    title="Complete Rollouts"
                    description="Cross-platform strategy, campaign management, reporting, and artist-brand development."
                  />
                </div>

                {/* Spotify storefront preview */}

                <div className="relative mt-7 overflow-hidden rounded-2xl border border-[rgba(30,215,96,0.24)] bg-[linear-gradient(145deg,rgba(30,215,96,0.09),rgba(255,255,255,0.025)_50%,rgba(6,6,7,0.82))] p-5">
                  <div
                    aria-hidden="true"
                    className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[rgba(30,215,96,0.12)] blur-[55px]"
                  />

                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-full bg-[#1ed760] text-black shadow-[0_12px_34px_rgba(30,215,96,0.18)]">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill="currentColor"
                        >
                          <path d="M12 2.5A9.5 9.5 0 1 0 12 21.5A9.5 9.5 0 0 0 12 2.5ZM16.35 16.13a.71.71 0 0 1-.98.23c-2.69-1.64-6.08-2.01-10.07-1.1a.71.71 0 1 1-.32-1.39c4.37-1 8.12-.57 11.14 1.28.34.2.44.64.23.98Zm1.4-3.12a.89.89 0 0 1-1.23.29c-3.08-1.89-7.77-2.43-11.41-1.33a.89.89 0 1 1-.51-1.7c4.16-1.26 9.33-.65 12.86 1.52.42.25.55.8.29 1.22Zm.12-3.25C14.18 7.57 8.09 7.37 4.57 8.43a1.07 1.07 0 1 1-.62-2.05c4.05-1.22 10.79-.98 15.01 1.53a1.07 1.07 0 0 1-1.09 1.85Z" />
                        </svg>
                      </div>

                      <div>
                        <p className="m-0 text-[10px] font-black uppercase tracking-[0.18em] text-[#78eea1]">
                          Coming to the Storefront
                        </p>

                        <p className="mt-1 text-lg font-black tracking-[-0.025em] text-white">
                          Spotify Campaigns
                        </p>
                      </div>
                    </div>

                    <div className="sm:text-right">
                      <p className="m-0 text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">
                        Starting at
                      </p>

                      <p className="mt-1 text-2xl font-black tracking-[-0.04em] text-white">
                        $80
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-5 flex flex-wrap gap-2 border-t border-white/[0.07] pt-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-white/52">
                      <span className="text-[#1ed760]">
                        <CheckIcon />
                      </span>
                      7 campaign levels
                    </span>

                    <span aria-hidden="true" className="text-white/15">
                      •
                    </span>

                    <span className="inline-flex items-center gap-1.5 text-xs text-white/52">
                      <span className="text-[#1ed760]">
                        <CheckIcon />
                      </span>
                      Estimated promotional reach
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
                  <p className="m-0 text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                    Independent Artists · Global Execution
                  </p>

                  <span
                    aria-hidden="true"
                    className="text-[var(--mr-gold-200)]"
                  >
                    <ArrowIcon />
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}