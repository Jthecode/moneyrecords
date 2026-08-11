// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Services Platforms                                    ┃
   ┃ File   : src/sections/ServicesPlatforms.tsx                           ┃
   ┃ Role   : Individual platform-service storefront grid                  ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { ReactNode } from "react";

import Button from "@/components/Button";
import CampaignDisclaimer from "@/components/CampaignDisclaimer";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import PlatformCard from "@/components/PlatformCard";
import SectionHeading from "@/components/SectionHeading";

import {
  getVisiblePlatforms,
  type MarketingPlatform,
} from "@/data/platforms";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type ServicesPlatformsProps = {
  /**
   * Section anchor used by the Services Hero.
   *
   * @default "platforms"
   */
  id?: string;

  /**
   * Small section label.
   */
  eyebrow?: ReactNode;

  /**
   * Main section heading.
   */
  title?: ReactNode;

  /**
   * Supporting section description.
   */
  subtitle?: ReactNode;

  /**
   * Optional platform-data override.
   *
   * Defaults to all visible platforms from src/data/platforms.ts.
   */
  platforms?: MarketingPlatform[];

  /**
   * Number of highlights shown inside each platform card.
   *
   * @default 3
   */
  highlightLimit?: number;

  /**
   * Contact destination for platform questions.
   */
  consultationHref?: string;

  /**
   * Contact-button label.
   */
  consultationLabel?: string;

  /**
   * Spotify platform destination.
   */
  spotifyHref?: string;

  /**
   * Spotify button label.
   */
  spotifyLabel?: string;
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

function HelpIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
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
        d="M9.6 9.2C9.8 7.8 10.7 7 12.1 7C13.6 7 14.5 7.9 14.5 9.1C14.5 10 14 10.6 13.1 11.2C12.3 11.7 12 12.2 12 13.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <circle
        cx="12"
        cy="16.8"
        r="0.9"
        fill="currentColor"
      />
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

function CampaignIcon() {
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

/* --------------------------------------------------------------------- */
/* Summary Stat                                                           */
/* --------------------------------------------------------------------- */

type SummaryStatProps = {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
};

function SummaryStat({
  icon,
  label,
  value,
  description,
}: SummaryStatProps) {
  return (
    <Card
      as="article"
      padding="md"
      hover
      fullHeight
      className="group"
    >
      <div className="flex h-full items-start gap-4">
        <span className="mr-icon-ring h-11 w-11 flex-[0_0_44px]">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
            {label}
          </p>

          <p className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
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
/* Platform Status Summary                                                */
/* --------------------------------------------------------------------- */

function getPlatformTotals(platforms: MarketingPlatform[]) {
  return platforms.reduce(
    (totals, platform) => {
      totals.total += 1;

      if (platform.status === "live") {
        totals.live += 1;
      }

      if (platform.status === "custom") {
        totals.custom += 1;
      }

      if (platform.status === "coming-soon") {
        totals.comingSoon += 1;
      }

      return totals;
    },
    {
      total: 0,
      live: 0,
      custom: 0,
      comingSoon: 0,
    },
  );
}

/* --------------------------------------------------------------------- */
/* Services Platforms                                                     */
/* --------------------------------------------------------------------- */

export default function ServicesPlatforms({
  id = "platforms",
  eyebrow = "Individual Platform Services",
  title = (
    <>
      Choose the Platform That{" "}
      <span className="mr-text-gradient">
        Fits Your Release.
      </span>
    </>
  ),
  subtitle = "Open a platform to review its individual marketing services, campaign levels, pricing, estimated timing, required assets, deliverables, and purchasing options.",
  platforms = getVisiblePlatforms(),
  highlightLimit = 3,
  consultationHref = "/#contact",
  consultationLabel = "Ask About a Platform",
  spotifyHref = "/services/spotify",
  spotifyLabel = "View Spotify Campaigns",
}: ServicesPlatformsProps) {
  const visiblePlatforms = platforms
    .filter((platform) => platform.visible)
    .sort((a, b) => a.order - b.order);

  const totals = getPlatformTotals(visiblePlatforms);

  if (visiblePlatforms.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      aria-labelledby="services-platforms-heading"
      className="mr-section relative scroll-mt-28 overflow-hidden"
    >
      {/* Decorative atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 -z-10 h-[780px] w-[1180px] max-w-[120vw] -translate-x-1/2 rounded-full bg-[rgba(211,154,46,0.06)] blur-[170px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-25 [background-image:radial-gradient(rgba(227,179,77,0.13)_0.7px,transparent_0.7px)] [background-size:24px_24px]"
      />

      <Container size="wide">
        {/* ------------------------------------------------------------- */}
        {/* Heading                                                       */}
        {/* ------------------------------------------------------------- */}

        <SectionHeading
          headingId="services-platforms-heading"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          width="wide"
          right={
            <div className="hidden items-center gap-3 md:flex">
              <Button
                href={consultationHref}
                variant="secondary"
                leftIcon={<HelpIcon />}
              >
                {consultationLabel}
              </Button>

              <Button
                href={spotifyHref}
                variant="platform"
                platformAccent="#1ed760"
                rightIcon={<ArrowIcon />}
              >
                {spotifyLabel}
              </Button>
            </div>
          }
        />

        {/* ------------------------------------------------------------- */}
        {/* Storefront Summary                                            */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryStat
            icon={<PlatformIcon />}
            label="Platform Categories"
            value={`${totals.total}`}
            description="Individual marketing and artist-service categories."
          />

          <SummaryStat
            icon={<CampaignIcon />}
            label="Live Storefront"
            value={`${totals.live}`}
            description="Spotify is currently the first live campaign storefront."
          />

          <SummaryStat
            icon={<ShieldIcon />}
            label="Custom Services"
            value={`${totals.custom}`}
            description="Services requiring review, consultation, or custom pricing."
          />

          <SummaryStat
            icon={<CheckIcon />}
            label="In Development"
            value={`${totals.comingSoon}`}
            description="Additional platform campaigns being prepared for launch."
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Platform Grid                                                 */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-12">
          <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Marketing Storefront
              </p>

              <h3 className="mt-2 text-2xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                Explore Services by Platform
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="mr-badge mr-badge-success">
                Live Campaigns
              </span>

              <span className="mr-badge mr-badge-dark">
                Custom Services
              </span>

              <span className="mr-badge mr-badge-dark">
                Coming Soon
              </span>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visiblePlatforms.map((platform) => (
              <PlatformCard
                key={platform.id}
                platform={platform}
                highlightLimit={highlightLimit}
              />
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Spotify Storefront Spotlight                                  */}
        {/* ------------------------------------------------------------- */}

        <Card
          as="aside"
          variant="featured"
          padding="lg"
          topLine
          className="relative mt-8 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[#1ed760] opacity-[0.1] blur-[110px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#1ed760] opacity-[0.035] blur-[110px]"
          />

          <div className="relative grid gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-3xl">
              <span className="mr-badge mr-badge-success">
                First Live Platform
              </span>

              <h3 className="mt-5 text-balance text-2xl font-black leading-[1.05] tracking-[-0.038em] text-[var(--mr-text)] sm:text-3xl">
                Spotify Includes Seven Individual Campaign Levels.
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/52">
                Open the Spotify storefront to compare campaign targets,
                descriptions, estimated timing, deliverables, requirements,
                pricing, and campaign standards before selecting a service.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "10K — $80",
                  "25K — $179",
                  "50K — $329",
                  "100K — $599",
                  "250K — $1,399",
                  "500K — $2,599",
                  "1 Million — $4,799",
                ].map((campaign) => (
                  <span
                    key={campaign}
                    className="inline-flex min-h-9 items-center rounded-full border border-[#1ed760]/20 bg-[#1ed760]/[0.06] px-3 text-[10px] font-black uppercase tracking-[0.1em] text-[#78eea1]"
                  >
                    {campaign}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <Button
                href={spotifyHref}
                variant="platform"
                platformAccent="#1ed760"
                size="lg"
                rightIcon={<ArrowIcon />}
                fullWidth
              >
                {spotifyLabel}
              </Button>

              <Button
                href={consultationHref}
                variant="secondary"
                size="lg"
                leftIcon={<HelpIcon />}
                fullWidth
              >
                Need Help Choosing?
              </Button>
            </div>
          </div>
        </Card>

        {/* ------------------------------------------------------------- */}
        {/* Mobile Actions                                                */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-8 grid gap-3 md:hidden">
          <Button
            href={spotifyHref}
            variant="platform"
            platformAccent="#1ed760"
            rightIcon={<ArrowIcon />}
            fullWidth
          >
            {spotifyLabel}
          </Button>

          <Button
            href={consultationHref}
            variant="secondary"
            leftIcon={<HelpIcon />}
            fullWidth
          >
            {consultationLabel}
          </Button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Storefront Standards                                          */}
        {/* ------------------------------------------------------------- */}

        <Divider
          label="Campaign Standards"
          variant="strong"
          spacing="lg"
        />

        <CampaignDisclaimer
          variant="gold"
          size="lg"
          includeIntegrityStatement
          points={[
            "Platform-service pricing and availability may differ by campaign.",
            "Campaign numbers are estimated promotional targets—not guaranteed results.",
            "Each platform page explains its deliverables, requirements, timing, and exclusions.",
          ]}
        />
      </Container>
    </section>
  );
}