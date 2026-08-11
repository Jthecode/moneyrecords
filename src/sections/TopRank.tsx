// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Credibility Section                                   ┃
   ┃ File   : src/sections/TopRank.tsx                                     ┃
   ┃ Role   : Label positioning, capabilities, standards, and trust        ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Image from "next/image";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import SectionHeading from "@/components/SectionHeading";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type Capability = {
  title: string;
  description: string;
  icon: ReactNode;
};

type Standard = {
  number: string;
  title: string;
  description: string;
};

type TopRankProps = {
  /**
   * Optional ID for standalone use.
   *
   * The homepage already wraps this component inside #rank, so the default
   * remains undefined to prevent duplicate IDs.
   */
  id?: string;

  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;

  primaryCtaHref?: string;
  primaryCtaLabel?: string;

  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function LabelIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <path
        d="M5 5.5H15.5L19.5 9.5V18.5H5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M15.5 5.5V9.5H19.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <circle
        cx="10.5"
        cy="13"
        r="2.3"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M12.8 13V9.8L16 9.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CampaignIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
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

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
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

function ReportIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
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

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="14"
      height="14"
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

/* --------------------------------------------------------------------- */
/* Content                                                                */
/* --------------------------------------------------------------------- */

const capabilities: Capability[] = [
  {
    title: "Record-Label Infrastructure",
    description:
      "Artist development, release strategy, distribution support, catalog positioning, and long-term brand direction.",
    icon: <LabelIcon />,
  },
  {
    title: "Platform Campaigns",
    description:
      "Individual campaign options for Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO, press, and radio.",
    icon: <CampaignIcon />,
  },
  {
    title: "Global Release Execution",
    description:
      "Coordinated rollouts designed to connect streaming, social media, video, press, and audience development.",
    icon: <GlobeIcon />,
  },
  {
    title: "Transparent Reporting",
    description:
      "Clear campaign scope, defined deliverables, campaign monitoring, and performance-focused reporting.",
    icon: <ReportIcon />,
  },
];

const operatingStandards: Standard[] = [
  {
    number: "01",
    title: "Real Campaign Strategy",
    description:
      "Every service is structured around audience targeting, release goals, creative assets, and measurable campaign activity.",
  },
  {
    number: "02",
    title: "No Artificial Streaming",
    description:
      "Money Records does not use bots, click farms, fraudulent streams, or guaranteed playlist placements.",
  },
  {
    number: "03",
    title: "Built Around the Artist",
    description:
      "Campaign recommendations are based on the artist’s current stage, release timeline, catalog, audience, and budget.",
  },
];

/* --------------------------------------------------------------------- */
/* Capability Card                                                        */
/* --------------------------------------------------------------------- */

function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <Card
      as="article"
      padding="md"
      hover
      fullHeight
      className="group"
    >
      <div className="flex h-full flex-col">
        <span className="mr-icon-ring">
          {capability.icon}
        </span>

        <h3 className="mt-6 text-lg font-black tracking-[-0.025em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
          {capability.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-white/50">
          {capability.description}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-6 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)]">
          <span className="grid h-5 w-5 place-items-center rounded-full border border-[rgba(227,179,77,0.28)] bg-[rgba(211,154,46,0.07)]">
            <CheckIcon />
          </span>

          Money Records Capability
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Section                                                                */
/* --------------------------------------------------------------------- */

export default function TopRank({
  id,
  eyebrow = "Why Money Records",
  title = (
    <>
      More Than Promotion.{" "}
      <span className="mr-text-gradient">
        A Complete Music Ecosystem.
      </span>
    </>
  ),
  subtitle = "Money Records brings label development, global release execution, platform-specific campaigns, and premium artist positioning together under one brand.",
  primaryCtaHref = "/services",
  primaryCtaLabel = "Explore Campaigns",
  secondaryCtaHref = "/#contact",
  secondaryCtaLabel = "Work With the Label",
}: TopRankProps) {
  return (
    <div
      id={id}
      className="relative overflow-hidden"
      aria-labelledby="money-records-credibility-heading"
    >
      {/* Decorative atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[560px] w-[1000px] max-w-[110vw] -translate-x-1/2 rounded-full bg-[rgba(211,154,46,0.07)] blur-[145px]"
      />

      <Container size="wide">
        {/* ------------------------------------------------------------- */}
        {/* Heading                                                       */}
        {/* ------------------------------------------------------------- */}

        <SectionHeading
          headingId="money-records-credibility-heading"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align="center"
          width="wide"
          divider
        />

        {/* ------------------------------------------------------------- */}
        {/* Main Credibility Panel                                        */}
        {/* ------------------------------------------------------------- */}

        <Card
          as="article"
          variant="featured"
          padding="lg"
          topLine
          className="relative mt-12 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[rgba(211,154,46,0.11)] blur-[100px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-36 -left-32 h-96 w-96 rounded-full bg-[rgba(184,124,32,0.07)] blur-[110px]"
          />

          <div className="relative grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-14">
            {/* Crest and identity */}

            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-14 rounded-full bg-[rgba(211,154,46,0.14)] blur-[60px]"
                />

                <div
                  aria-hidden="true"
                  className="absolute -inset-5 rounded-full border border-[rgba(227,179,77,0.11)]"
                />

                <div className="relative grid h-44 w-44 place-items-center overflow-hidden rounded-full border border-[rgba(248,223,160,0.32)] bg-[radial-gradient(circle_at_35%_25%,rgba(248,223,160,0.12),rgba(8,8,9,0.94)_62%)] shadow-[0_28px_90px_rgba(0,0,0,0.58),0_0_55px_rgba(211,154,46,0.13)] sm:h-52 sm:w-52">
                  <Image
                    src="/brand/mr-crest.png"
                    alt="Money Records crest"
                    width={240}
                    height={240}
                    sizes="(max-width: 640px) 176px, 208px"
                    className="h-full w-full object-contain p-8"
                  />

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-9 top-5 h-px bg-[linear-gradient(90deg,transparent,rgba(248,223,160,0.7),transparent)]"
                  />
                </div>
              </div>

              <span className="mr-badge mr-badge-featured mt-9">
                Independent Record Label
              </span>

              <h3 className="mt-5 text-balance text-3xl font-black leading-[1.02] tracking-[-0.045em] text-[var(--mr-text)]">
                Built for Artists Ready to Move Seriously.
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/52">
                From the first release plan to a complete global campaign,
                Money Records provides the structure artists need to build,
                launch, and scale.
              </p>

              <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:w-full lg:flex-col xl:flex-row">
                <Button
                  variant="primary"
                  href={primaryCtaHref}
                  rightIcon={<ArrowIcon />}
                  className="w-full"
                >
                  {primaryCtaLabel}
                </Button>

                <Button
                  variant="secondary"
                  href={secondaryCtaHref}
                  className="w-full"
                >
                  {secondaryCtaLabel}
                </Button>
              </div>
            </div>

            {/* Capabilities */}

            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                {capabilities.map((capability) => (
                  <CapabilityCard
                    key={capability.title}
                    capability={capability}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* ------------------------------------------------------------- */}
        {/* Operating Standards                                           */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {operatingStandards.map((standard) => (
            <Card
              key={standard.number}
              as="article"
              padding="md"
              hover
              fullHeight
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between gap-5">
                  <span className="text-sm font-black tracking-[0.16em] text-[var(--mr-gold-200)]">
                    {standard.number}
                  </span>

                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-[linear-gradient(90deg,rgba(227,179,77,0.28),transparent)]"
                  />
                </div>

                <h3 className="mt-6 text-xl font-black tracking-[-0.025em] text-[var(--mr-text)]">
                  {standard.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/50">
                  {standard.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Campaign Standards Notice                                     */}
        {/* ------------------------------------------------------------- */}

        <Divider spacing="lg" variant="soft" />

        <div className="mr-notice mr-notice-gold">
          <span
            aria-hidden="true"
            className="mt-1 grid h-6 w-6 flex-[0_0_24px] place-items-center rounded-full border border-[rgba(227,179,77,0.28)] bg-[rgba(211,154,46,0.08)] text-[var(--mr-gold-200)]"
          >
            <CheckIcon />
          </span>

          <div>
            <p className="m-0 text-xs font-black uppercase tracking-[0.16em] text-[var(--mr-gold-100)]">
              Money Records Campaign Standard
            </p>

            <p className="mt-2">
              Campaign figures are presented as estimated promotional reach,
              exposure, impressions, or listener opportunities—not guaranteed
              stream totals. Results vary based on the release, targeting,
              audience response, creative assets, platform performance, and
              campaign conditions.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}