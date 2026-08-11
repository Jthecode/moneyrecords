// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Services CTA                                          ┃
   ┃ File   : src/sections/ServicesCTA.tsx                                 ┃
   ┃ Role   : Final platform-service conversion and contact section        ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Image from "next/image";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import CampaignDisclaimer from "@/components/CampaignDisclaimer";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import SectionHeading from "@/components/SectionHeading";

import { getPlatformCampaignSummary } from "@/data/campaigns";
import {
  getLivePlatforms,
  getVisiblePlatforms,
} from "@/data/platforms";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type ServicesCTAStep = {
  /**
   * Stable internal identifier.
   */
  id: string;

  /**
   * Displayed step number.
   */
  number: string;

  /**
   * Step title.
   */
  title: string;

  /**
   * Supporting explanation.
   */
  description: string;

  /**
   * Visual step icon.
   */
  icon: ReactNode;
};

type ServicesCTAProps = {
  /**
   * Section anchor.
   *
   * @default "contact"
   */
  id?: string;

  /**
   * Small label above the main title.
   */
  eyebrow?: ReactNode;

  /**
   * Main section heading.
   */
  title?: ReactNode;

  /**
   * Supporting section copy.
   */
  subtitle?: ReactNode;

  /**
   * Optional process-step override.
   */
  steps?: readonly ServicesCTAStep[];

  /**
   * Primary live-platform destination.
   */
  primaryHref?: string;

  /**
   * Primary action label.
   */
  primaryLabel?: string;

  /**
   * All-platform storefront destination.
   */
  platformsHref?: string;

  /**
   * All-platform action label.
   */
  platformsLabel?: string;

  /**
   * Contact-email address.
   */
  email?: string;

  /**
   * Instagram destination.
   */
  instagramHref?: string;

  /**
   * Public Instagram handle.
   */
  instagramHandle?: string;

  /**
   * Optional artist-submission destination.
   */
  submissionHref?: string;

  /**
   * Artist-submission action label.
   */
  submissionLabel?: string;
};

/* --------------------------------------------------------------------- */
/* Storefront Data                                                        */
/* --------------------------------------------------------------------- */

const visiblePlatforms = getVisiblePlatforms();
const livePlatforms = getLivePlatforms();

const spotifySummary =
  getPlatformCampaignSummary("spotify");

const platformCount = visiblePlatforms.length;

const livePlatformCount = livePlatforms.length;

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

function PlatformIcon() {
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
      width="21"
      height="21"
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

function FormIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <path
        d="M6 4.5H18V19.5H6V4.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M9 8.5H15M9 12H15M9 15.5H12.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M15.5 15.5L18.5 12.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <rect
        x="3.5"
        y="6"
        width="17"
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M3.5 10H20.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M7 14.5H10.5"
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

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M4 6.5H20V17.5H4V6.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M5 7.5L12 13L19 7.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="12"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="17.2"
        cy="6.8"
        r="0.9"
        fill="currentColor"
      />
    </svg>
  );
}

function ArtistIcon() {
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
        cy="8"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M5.5 19C6.3 15.8 8.6 14 12 14C15.4 14 17.7 15.8 18.5 19"
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

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
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
/* Default Steps                                                          */
/* --------------------------------------------------------------------- */

const DEFAULT_STEPS: readonly ServicesCTAStep[] = [
  {
    id: "choose-platform",
    number: "01",
    title: "Choose a Platform",
    description:
      "Select Spotify or another platform category based on the service your release needs.",
    icon: <PlatformIcon />,
  },
  {
    id: "compare-services",
    number: "02",
    title: "Compare Services",
    description:
      "Review campaign targets, pricing, timing, deliverables, and required assets.",
    icon: <CompareIcon />,
  },
  {
    id: "submit-details",
    number: "03",
    title: "Submit Release Details",
    description:
      "Provide your artist name, song link, artwork, release date, genre, and campaign goals.",
    icon: <FormIcon />,
  },
  {
    id: "complete-order",
    number: "04",
    title: "Complete Your Order",
    description:
      "Review the selected service and continue through the secure one-time checkout process.",
    icon: <PaymentIcon />,
  },
] as const;

/* --------------------------------------------------------------------- */
/* Process Step                                                           */
/* --------------------------------------------------------------------- */

function ProcessStep({
  step,
}: {
  step: ServicesCTAStep;
}) {
  return (
    <Card
      as="article"
      padding="md"
      hover
      fullHeight
      className="group"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="relative grid h-11 w-11 flex-[0_0_44px] place-items-center overflow-hidden rounded-xl border border-[rgba(227,179,77,0.25)] bg-[rgba(211,154,46,0.07)] text-[var(--mr-gold-200)]">
            <span
              aria-hidden="true"
              className="absolute inset-x-2 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(248,223,160,0.7),transparent)]"
            />

            {step.icon}
          </span>

          <span className="text-xs font-black tracking-[0.18em] text-[var(--mr-gold-200)]">
            {step.number}
          </span>
        </div>

        <h3 className="mt-5 text-base font-black tracking-[-0.025em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
          {step.title}
        </h3>

        <p className="mt-3 text-xs leading-6 text-white/48">
          {step.description}
        </p>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Storefront Stat                                                        */
/* --------------------------------------------------------------------- */

function StorefrontStat({
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
/* Services CTA                                                           */
/* --------------------------------------------------------------------- */

export default function ServicesCTA({
  id = "contact",
  eyebrow = "Choose Your Next Step",
  title = (
    <>
      Ready to Promote Your{" "}
      <span className="mr-text-gradient">
        Next Release?
      </span>
    </>
  ),
  subtitle = "Open the Money Records platform storefront, compare the available individual services, and select the campaign that fits your release. Artists can also contact the team for help choosing a service or submit music for label consideration.",
  steps = DEFAULT_STEPS,
  primaryHref = "/services/spotify",
  primaryLabel = "Explore Spotify Campaigns",
  platformsHref = "#platforms",
  platformsLabel = "View All Platforms",
  email = "info@moneyrecords.io",
  instagramHref = "https://instagram.com/kingpharaohreal",
  instagramHandle = "@kingpharaohreal",
  submissionHref =
    "mailto:info@moneyrecords.io?subject=Money%20Records%20Artist%20Submission",
  submissionLabel = "Submit Music to the Label",
}: ServicesCTAProps) {
  return (
    <section
      id={id}
      aria-labelledby="services-cta-heading"
      className="mr-section relative scroll-mt-28 overflow-hidden pb-20"
    >
      {/* Decorative atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 -z-10 h-[760px] w-[1150px] max-w-[118vw] -translate-x-1/2 rounded-full bg-[rgba(211,154,46,0.065)] blur-[165px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-22 [background-image:radial-gradient(rgba(227,179,77,0.13)_0.7px,transparent_0.7px)] [background-size:24px_24px]"
      />

      <Container size="wide">
        {/* ------------------------------------------------------------- */}
        {/* Section Heading                                               */}
        {/* ------------------------------------------------------------- */}

        <SectionHeading
          headingId="services-cta-heading"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align="center"
          width="wide"
          divider
        />

        {/* ------------------------------------------------------------- */}
        {/* Storefront Process                                            */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <ProcessStep
              key={step.id}
              step={step}
            />
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Main Conversion Panel                                         */}
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
            className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[rgba(211,154,46,0.13)] blur-[105px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[rgba(184,124,32,0.065)] blur-[100px]"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            {/* --------------------------------------------------------- */}
            {/* Left: Platform Storefront                                 */}
            {/* --------------------------------------------------------- */}

            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <span className="relative grid h-16 w-16 flex-[0_0_64px] place-items-center overflow-hidden rounded-full border border-[rgba(227,179,77,0.28)] bg-black/45 shadow-[0_18px_50px_rgba(0,0,0,0.46),0_0_35px_rgba(211,154,46,0.12)]">
                  <Image
                    src="/brand/mr-crest.png"
                    alt="Money Records crest"
                    width={72}
                    height={72}
                    sizes="64px"
                    className="h-full w-full object-contain p-2"
                  />
                </span>

                <div>
                  <span className="mr-badge mr-badge-featured">
                    Money Records Marketing
                  </span>

                  <h2 className="mt-3 text-xl font-black tracking-[-0.03em] text-[var(--mr-text)] sm:text-2xl">
                    Individual Services. Clear Campaign Details.
                  </h2>
                </div>
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/52">
                Every platform service is organized separately. Open a
                platform, compare its available campaigns, review the complete
                scope, and select only the service your release needs.
              </p>

              {/* Storefront statistics */}

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <StorefrontStat
                  label="Platforms"
                  value={`${platformCount}`}
                />

                <StorefrontStat
                  label="Live Storefronts"
                  value={`${livePlatformCount}`}
                />

                <StorefrontStat
                  label="Spotify From"
                  value={spotifyStartingPrice}
                />
              </div>

              {/* Key storefront standards */}

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Individual platform-service pricing",
                  "Trusted campaign SKU for each product",
                  "Campaign details shown before purchase",
                  "One-time checkout for fixed-price services",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4"
                  >
                    <span className="mt-0.5 grid h-6 w-6 flex-[0_0_24px] place-items-center rounded-full border border-[rgba(227,179,77,0.25)] bg-[rgba(211,154,46,0.07)] text-[var(--mr-gold-200)]">
                      <CheckIcon />
                    </span>

                    <span className="text-xs leading-5 text-white/52">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={platformsHref}
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowIcon />}
                  className="w-full sm:w-auto"
                >
                  {platformsLabel}
                </Button>

                <Button
                  href={submissionHref}
                  variant="secondary"
                  size="lg"
                  leftIcon={<ArtistIcon />}
                  className="w-full sm:w-auto"
                >
                  {submissionLabel}
                </Button>
              </div>
            </div>

            {/* --------------------------------------------------------- */}
            {/* Right: Spotify and Contact                                */}
            {/* --------------------------------------------------------- */}

            <div className="grid gap-4">
              {/* Spotify storefront */}

              <div className="relative overflow-hidden rounded-[22px] border border-[#1ed760]/25 bg-[linear-gradient(145deg,rgba(30,215,96,0.1),rgba(255,255,255,0.025)_52%,rgba(6,6,7,0.84))] p-5 sm:p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#1ed760] opacity-[0.12] blur-[70px]"
                />

                <div className="relative">
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 flex-[0_0_56px] place-items-center rounded-full bg-[#1ed760] text-black shadow-[0_14px_38px_rgba(30,215,96,0.2)]">
                      <SpotifyIcon />
                    </span>

                    <div className="min-w-0">
                      <span className="mr-badge mr-badge-success">
                        Campaigns Available
                      </span>

                      <h3 className="mt-3 text-xl font-black tracking-[-0.03em] text-white">
                        Spotify Marketing
                      </h3>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-white/52">
                    Compare {spotifyCampaignCount} individual Spotify
                    campaign levels starting at {spotifyStartingPrice}.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "10K",
                      "25K",
                      "50K",
                      "100K",
                      "250K",
                      "500K",
                      "1 Million",
                    ].map((level) => (
                      <span
                        key={level}
                        className="inline-flex min-h-8 items-center rounded-full border border-[#1ed760]/20 bg-[#1ed760]/[0.06] px-3 text-[9px] font-black uppercase tracking-[0.11em] text-[#78eea1]"
                      >
                        {level}
                      </span>
                    ))}
                  </div>

                  <Button
                    href={primaryHref}
                    variant="platform"
                    platformAccent="#1ed760"
                    size="lg"
                    rightIcon={<ArrowIcon />}
                    className="mt-6"
                    fullWidth
                  >
                    {primaryLabel}
                  </Button>
                </div>
              </div>

              {/* Direct contact */}

              <div className="rounded-[22px] border border-white/[0.075] bg-white/[0.025] p-5 sm:p-6">
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                  Need Help Choosing?
                </p>

                <h3 className="mt-3 text-xl font-black tracking-[-0.03em] text-[var(--mr-text)]">
                  Contact Money Records
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/48">
                  Send your release link, target platform, campaign goal, and
                  preferred budget for assistance choosing an available
                  service.
                </p>

                <div className="mt-5 grid gap-3">
                  <Button
                    href={`mailto:${email}?subject=Money%20Records%20Platform%20Service%20Inquiry`}
                    variant="secondary"
                    size="sm"
                    leftIcon={<MailIcon />}
                    fullWidth
                  >
                    Email Money Records
                  </Button>

                  <Button
                    href={instagramHref}
                    variant="dark"
                    size="sm"
                    leftIcon={<InstagramIcon />}
                    external
                    fullWidth
                  >
                    DM {instagramHandle}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Divider
            className="mt-9"
            variant="soft"
          />

          {/* Fulfillment notice */}

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] p-4">
            <span className="mt-0.5 text-[var(--mr-gold-200)]">
              <ShieldIcon />
            </span>

            <p className="m-0 text-xs leading-5 text-white/45">
              Campaign fulfillment begins after the selected service,
              payment, required release information, and supplied assets have
              been reviewed and confirmed.
            </p>
          </div>
        </Card>

        {/* ------------------------------------------------------------- */}
        {/* Campaign Disclaimer                                           */}
        {/* ------------------------------------------------------------- */}

        <CampaignDisclaimer
          className="mt-8"
          variant="gold"
          size="lg"
          includeIntegrityStatement
          points={[
            "Campaign numbers are estimated promotional targets—not guaranteed streams, followers, placements, revenue, or results.",
            "Each platform and campaign has its own price, scope, requirements, timing, and exclusions.",
            "Review the full service details before adding a campaign to your cart or completing checkout.",
          ]}
        />
      </Container>
    </section>
  );
}