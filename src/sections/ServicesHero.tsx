// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Services Hero                                         ┃
   ┃ File   : src/sections/ServicesHero.tsx                                ┃
   ┃ Role   : Platform-marketing storefront introduction                  ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Image from "next/image";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import CampaignDisclaimer from "@/components/CampaignDisclaimer";
import Card from "@/components/Card";

import {
  getPlatformCampaignSummary,
} from "@/data/campaigns";

import {
  getVisiblePlatforms,
} from "@/data/platforms";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type ServicesHeroProps = {
  /**
   * Small text displayed above the main heading.
   */
  eyebrow?: ReactNode;

  /**
   * Main services-page heading.
   */
  title?: ReactNode;

  /**
   * Supporting hero description.
   */
  subtitle?: ReactNode;

  /**
   * Main storefront CTA.
   */
  primaryCtaHref?: string;

  /**
   * Main storefront CTA label.
   */
  primaryCtaLabel?: string;

  /**
   * Secondary information CTA.
   */
  secondaryCtaHref?: string;

  /**
   * Secondary information CTA label.
   */
  secondaryCtaLabel?: string;

  /**
   * Optional hero background image.
   *
   * @default "/brand/hero-world.jpg"
   */
  backgroundImageSrc?: string;
};

type StoreStepProps = {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
};

/* --------------------------------------------------------------------- */
/* Storefront Data                                                        */
/* --------------------------------------------------------------------- */

const visiblePlatforms = getVisiblePlatforms();

const spotifySummary =
  getPlatformCampaignSummary("spotify");

const platformCount = visiblePlatforms.length;

const spotifyCampaignCount =
  spotifySummary.campaignCount;

const spotifyStartingPrice =
  spotifySummary.lowestPriceLabel;

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
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

function PlatformIcon() {
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
        y="4"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <rect
        x="14"
        y="4"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <rect
        x="4"
        y="14"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <rect
        x="14"
        y="14"
        width="6"
        height="6"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M5 19V13M12 19V8M19 19V4"
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

function DetailsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M6 4.5H18V19.5H6V4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M9 9H15M9 12.5H15M9 16H13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="currentColor"
    >
      <path d="M12 2.5A9.5 9.5 0 1 0 12 21.5A9.5 9.5 0 0 0 12 2.5ZM16.35 16.13a.71.71 0 0 1-.98.23c-2.69-1.64-6.08-2.01-10.07-1.1a.71.71 0 1 1-.32-1.39c4.37-1 8.12-.57 11.14 1.28.34.2.44.64.23.98Zm1.4-3.12a.89.89 0 0 1-1.23.29c-3.08-1.89-7.77-2.43-11.41-1.33a.89.89 0 1 1-.51-1.7c4.16-1.26 9.33-.65 12.86 1.52.42.25.55.8.29 1.22Zm.12-3.25C14.18 7.57 8.09 7.37 4.57 8.43a1.07 1.07 0 1 1-.62-2.05c4.05-1.22 10.79-.98 15.01 1.53a1.07 1.07 0 0 1-1.09 1.85Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="12"
      height="12"
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
/* Store Step                                                             */
/* --------------------------------------------------------------------- */

function StoreStep({
  number,
  title,
  description,
  icon,
}: StoreStepProps) {
  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4 transition-all duration-300 hover:border-[rgba(227,179,77,0.27)] hover:bg-[rgba(211,154,46,0.045)]">
      <span className="relative grid h-11 w-11 flex-[0_0_44px] place-items-center overflow-hidden rounded-xl border border-[rgba(227,179,77,0.25)] bg-[rgba(211,154,46,0.07)] text-[var(--mr-gold-200)] shadow-[0_12px_34px_rgba(0,0,0,0.3)]">
        <span
          aria-hidden="true"
          className="absolute inset-x-2 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(248,223,160,0.7),transparent)]"
        />

        {icon}
      </span>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)]">
            {number}
          </span>

          <span
            aria-hidden="true"
            className="h-px w-8 bg-[linear-gradient(90deg,rgba(227,179,77,0.35),transparent)]"
          />
        </div>

        <h3 className="mt-1.5 text-sm font-black uppercase tracking-[0.07em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
          {title}
        </h3>

        <p className="mt-1.5 text-xs leading-5 text-white/45">
          {description}
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Stat                                                                   */
/* --------------------------------------------------------------------- */

function StoreStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4">
      <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
        {label}
      </p>

      <p className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
        {value}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Services Hero                                                          */
/* --------------------------------------------------------------------- */

export default function ServicesHero({
  eyebrow = "Money Records Platform Marketing",
  title = (
    <>
      Choose Your Platform.{" "}
      <span className="mr-text-gradient">
        Select Your Campaign.
      </span>
    </>
  ),
  subtitle = "Explore individual music-marketing services for Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO, press, radio, SoundCloud, and artist branding. Each platform has its own services, pricing, deliverables, and campaign details.",
  primaryCtaHref = "#platforms",
  primaryCtaLabel = "Explore Platforms",
  secondaryCtaHref = "#how-it-works",
  secondaryCtaLabel = "How It Works",
  backgroundImageSrc = "/brand/hero-world.jpg",
}: ServicesHeroProps) {
  return (
    <section
      className="mr-hero mt-6 md:mt-8"
      aria-labelledby="services-hero-heading"
      aria-describedby="services-hero-description"
    >
      {/* Background image */}

      <div
        aria-hidden="true"
        className="mr-hero-bg"
        style={{
          backgroundImage: `url("${backgroundImageSrc}")`,
        }}
      />

      {/* Decorative atmosphere */}

      <div aria-hidden="true" className="mr-hero-grid" />

      <div
        aria-hidden="true"
        className="mr-hero-orb mr-hero-orb-left"
      />

      <div
        aria-hidden="true"
        className="mr-hero-orb mr-hero-orb-right"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1100px_620px_at_50%_30%,rgba(214,179,90,0.2),transparent_62%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.24),rgba(0,0,0,0.84))]" />

        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.65),transparent)]" />
      </div>

      {/* Main content */}

      <div className="mr-hero-content">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 xl:gap-20">
          {/* ----------------------------------------------------------- */}
          {/* Left: Storefront Introduction                               */}
          {/* ----------------------------------------------------------- */}

          <div className="relative max-w-4xl">
            <p className="mr-eyebrow m-0">
              {eyebrow}
            </p>

            <h1
              id="services-hero-heading"
              className="mr-title mt-6"
            >
              {title}
            </h1>

            <p
              id="services-hero-description"
              className="mr-subtitle mt-7 max-w-2xl"
            >
              {subtitle}
            </p>

            {/* Calls to action */}

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href={primaryCtaHref}
                variant="primary"
                size="lg"
                rightIcon={<ArrowIcon />}
                className="w-full sm:w-auto"
              >
                {primaryCtaLabel}
              </Button>

              <Button
                href={secondaryCtaHref}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {secondaryCtaLabel}
              </Button>
            </div>

            {/* Platform badges */}

            <div className="mt-9 flex flex-wrap gap-2.5">
              {visiblePlatforms
                .slice(0, 6)
                .map((platform) => (
                  <span
                    key={platform.id}
                    className={[
                      "mr-badge",
                      platform.status === "live"
                        ? "mr-badge-featured"
                        : "mr-badge-dark",
                    ].join(" ")}
                  >
                    {platform.shortName}
                  </span>
                ))}

              {platformCount > 6 ? (
                <span className="mr-badge mr-badge-dark">
                  +{platformCount - 6} More
                </span>
              ) : null}
            </div>

            {/* Storefront process */}

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <StoreStep
                number="01"
                title="Choose a Platform"
                description="Select the channel that fits your release and audience."
                icon={<PlatformIcon />}
              />

              <StoreStep
                number="02"
                title="Compare Services"
                description="Review campaign levels, pricing, and estimated targets."
                icon={<CompareIcon />}
              />

              <StoreStep
                number="03"
                title="View the Details"
                description="See deliverables, requirements, timing, and standards."
                icon={<DetailsIcon />}
              />
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Right: Storefront Overview                                  */}
          {/* ----------------------------------------------------------- */}

          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
            {/* Floating crest */}

            <div className="absolute -right-3 -top-5 z-20 hidden sm:block lg:-right-5 lg:-top-7">
              <div className="relative h-[74px] w-[74px] overflow-hidden rounded-full border border-[rgba(248,223,160,0.34)] bg-[rgba(5,5,6,0.84)] shadow-[0_18px_50px_rgba(0,0,0,0.55),0_0_42px_rgba(211,154,46,0.16)] backdrop-blur-xl">
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
                {/* Card header */}

                <div className="flex items-start justify-between gap-5">
                  <div>
                    <span className="mr-badge mr-badge-featured">
                      Marketing Store
                    </span>

                    <h2 className="mt-5 text-balance text-2xl font-black leading-[1.03] tracking-[-0.035em] text-[var(--mr-text)] sm:text-3xl">
                      Platform-Specific Services for Every Release Stage.
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
                  Open a platform to view its individual campaign options.
                  Spotify is the first live storefront, with additional
                  platform services being added as pricing and deliverables
                  are finalized.
                </p>

                {/* Storefront statistics */}

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <StoreStat
                    label="Platforms"
                    value={`${platformCount}`}
                  />

                  <StoreStat
                    label="Spotify Levels"
                    value={`${spotifyCampaignCount}`}
                  />

                  <StoreStat
                    label="Starting Price"
                    value={spotifyStartingPrice}
                  />
                </div>

                {/* Spotify feature */}

                <div className="relative mt-7 overflow-hidden rounded-2xl border border-[#1ed760]/25 bg-[linear-gradient(145deg,rgba(30,215,96,0.1),rgba(255,255,255,0.025)_52%,rgba(6,6,7,0.84))] p-5">
                  <div
                    aria-hidden="true"
                    className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#1ed760] opacity-[0.12] blur-[55px]"
                  />

                  <div className="relative flex items-center gap-4">
                    <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-full bg-[#1ed760] text-black shadow-[0_12px_34px_rgba(30,215,96,0.2)]">
                      <SpotifyIcon />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="m-0 text-[10px] font-black uppercase tracking-[0.18em] text-[#78eea1]">
                        Campaigns Available
                      </p>

                      <p className="mt-1 text-lg font-black tracking-[-0.025em] text-white">
                        Spotify Marketing
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="m-0 text-[9px] font-bold uppercase tracking-[0.14em] text-white/40">
                        From
                      </p>

                      <p className="mt-1 text-2xl font-black tracking-[-0.04em] text-white">
                        {spotifyStartingPrice}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-5 grid gap-2 border-t border-white/[0.07] pt-4 sm:grid-cols-2">
                    <span className="flex items-center gap-2 text-xs text-white/52">
                      <span className="grid h-5 w-5 place-items-center rounded-full border border-[#1ed760]/25 bg-[#1ed760]/[0.07] text-[#78eea1]">
                        <CheckIcon />
                      </span>

                      {spotifyCampaignCount} campaign levels
                    </span>

                    <span className="flex items-center gap-2 text-xs text-white/52">
                      <span className="grid h-5 w-5 place-items-center rounded-full border border-[#1ed760]/25 bg-[#1ed760]/[0.07] text-[#78eea1]">
                        <CheckIcon />
                      </span>

                      One-time pricing
                    </span>
                  </div>

                  <Button
                    href="/services/spotify"
                    variant="platform"
                    platformAccent="#1ed760"
                    size="sm"
                    rightIcon={<ArrowIcon />}
                    className="relative mt-5"
                    fullWidth
                  >
                    Explore Spotify Campaigns
                  </Button>
                </div>

                {/* Compact disclaimer */}

                <CampaignDisclaimer
                  className="mt-5"
                  variant="platform"
                  size="sm"
                  accent="#1ed760"
                  accentSoft="rgba(30, 215, 96, 0.06)"
                  platformName="Spotify"
                  streaming
                  showTitle={false}
                  points={[]}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}