// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Services How It Works                                 ┃
   ┃ File   : src/sections/ServicesHowItWorks.tsx                          ┃
   ┃ Role   : Explains the platform-service purchase and campaign flow     ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { ReactNode } from "react";

import Button from "@/components/Button";
import CampaignDisclaimer from "@/components/CampaignDisclaimer";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import SectionHeading from "@/components/SectionHeading";

import {
  getPlatformCampaignSummary,
} from "@/data/campaigns";

import {
  getLivePlatforms,
  getVisiblePlatforms,
} from "@/data/platforms";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type ServiceProcessStep = {
  /**
   * Stable step identifier.
   */
  id: string;

  /**
   * Displayed step number.
   */
  number: string;

  /**
   * Small category label.
   */
  eyebrow: string;

  /**
   * Main step title.
   */
  title: string;

  /**
   * Main explanation.
   */
  description: string;

  /**
   * Additional details displayed inside the step card.
   */
  details: readonly string[];

  /**
   * Visual icon.
   */
  icon: ReactNode;
};

type ServicesHowItWorksProps = {
  /**
   * Section anchor used by the Services Hero.
   *
   * @default "how-it-works"
   */
  id?: string;

  /**
   * Small label above the section title.
   */
  eyebrow?: ReactNode;

  /**
   * Main section title.
   */
  title?: ReactNode;

  /**
   * Supporting section description.
   */
  subtitle?: ReactNode;

  /**
   * Optional process-step override.
   */
  steps?: readonly ServiceProcessStep[];

  /**
   * Main platform-store destination.
   */
  primaryCtaHref?: string;

  /**
   * Main platform-store button label.
   */
  primaryCtaLabel?: string;

  /**
   * Contact or support destination.
   */
  secondaryCtaHref?: string;

  /**
   * Contact or support button label.
   */
  secondaryCtaLabel?: string;
};

/* --------------------------------------------------------------------- */
/* Storefront Information                                                 */
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

function PlatformIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
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

function DetailsIcon() {
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

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <path
        d="M4 5H6L8.1 14.2H17.7L20 8H7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="9"
        cy="18.5"
        r="1.3"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="17"
        cy="18.5"
        r="1.3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function FormIcon() {
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
      width="22"
      height="22"
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
      width="19"
      height="19"
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
/* Default Process Steps                                                  */
/* --------------------------------------------------------------------- */

const DEFAULT_STEPS: readonly ServiceProcessStep[] = [
  {
    id: "choose-platform",
    number: "01",
    eyebrow: "Start Here",
    title: "Choose a Platform",
    description:
      "Select the platform or service category that best matches your release goals.",
    details: [
      "Spotify",
      "Apple Music",
      "Instagram and TikTok",
      "YouTube and VEVO",
      "Press, radio, SoundCloud, or branding",
    ],
    icon: <PlatformIcon />,
  },
  {
    id: "compare-campaigns",
    number: "02",
    eyebrow: "Compare Options",
    title: "Review the Services",
    description:
      "Open the platform page to compare its available campaign levels, prices, and focus.",
    details: [
      "Campaign target",
      "One-time price",
      "Estimated duration",
      "Recommended use cases",
    ],
    icon: <CompareIcon />,
  },
  {
    id: "review-details",
    number: "03",
    eyebrow: "Know the Scope",
    title: "Read the Full Details",
    description:
      "Each campaign page explains exactly what is included before you make a purchase.",
    details: [
      "Campaign description",
      "Deliverables",
      "Required release assets",
      "Exclusions and campaign standards",
    ],
    icon: <DetailsIcon />,
  },
  {
    id: "add-to-cart",
    number: "04",
    eyebrow: "Make Your Selection",
    title: "Add the Service to Your Cart",
    description:
      "Choose the campaign that fits your goals and add the trusted product SKU to your cart.",
    details: [
      "Secure product selection",
      "Trusted campaign pricing",
      "One-time service purchase",
      "Review before checkout",
    ],
    icon: <CartIcon />,
  },
  {
    id: "submit-information",
    number: "05",
    eyebrow: "Campaign Intake",
    title: "Provide Your Release Information",
    description:
      "Submit the details Money Records needs to review, prepare, and organize your campaign.",
    details: [
      "Artist and release name",
      "Public song or project link",
      "Artwork and release date",
      "Genre, audience, and target markets",
    ],
    icon: <FormIcon />,
  },
  {
    id: "complete-checkout",
    number: "06",
    eyebrow: "Secure Checkout",
    title: "Complete Payment",
    description:
      "Review your order and complete the one-time payment through the secure checkout system.",
    details: [
      "Secure hosted checkout",
      "Order confirmation",
      "Campaign information attached",
      "Money Records fulfillment review",
    ],
    icon: <PaymentIcon />,
  },
] as const;

/* --------------------------------------------------------------------- */
/* Process Step Card                                                      */
/* --------------------------------------------------------------------- */

function ProcessStepCard({
  step,
  isLast,
}: {
  step: ServiceProcessStep;
  isLast: boolean;
}) {
  return (
    <Card
      as="article"
      padding="lg"
      hover
      fullHeight
      className="group relative overflow-visible"
    >
      {/* Desktop connector */}

      {!isLast ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[calc(100%-2px)] top-12 z-20 hidden w-5 xl:block"
        >
          <div className="h-px w-full bg-[linear-gradient(90deg,rgba(227,179,77,0.42),transparent)]" />
        </div>
      ) : null}

      <div className="flex h-full flex-col">
        {/* Header */}

        <div className="flex items-start justify-between gap-5">
          <span className="relative grid h-14 w-14 flex-[0_0_56px] place-items-center overflow-hidden rounded-[18px] border border-[rgba(227,179,77,0.26)] bg-[rgba(211,154,46,0.07)] text-[var(--mr-gold-200)] shadow-[0_16px_44px_rgba(0,0,0,0.32)]">
            <span
              aria-hidden="true"
              className="absolute inset-x-3 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(248,223,160,0.7),transparent)]"
            />

            {step.icon}
          </span>

          <span className="text-sm font-black tracking-[0.18em] text-[var(--mr-gold-200)]">
            {step.number}
          </span>
        </div>

        {/* Content */}

        <div className="mt-7">
          <p className="m-0 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
            {step.eyebrow}
          </p>

          <h3 className="mt-3 text-balance text-xl font-black leading-[1.08] tracking-[-0.03em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
            {step.title}
          </h3>

          <p className="mt-4 text-sm leading-7 text-white/50">
            {step.description}
          </p>
        </div>

        {/* Details */}

        <ul className="mt-6 grid list-none gap-2.5 p-0">
          {step.details.map((detail) => (
            <li
              key={detail}
              className="flex items-start gap-2.5 text-xs leading-5 text-white/48"
            >
              <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                <CheckIcon />
              </span>

              <span>{detail}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <Divider variant="soft" />

          <p className="mt-4 text-[9px] font-black uppercase tracking-[0.15em] text-white/28">
            Money Records Process · Step {step.number}
          </p>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Storefront Summary                                                     */
/* --------------------------------------------------------------------- */

function StorefrontSummary() {
  const summaryItems = [
    {
      label: "Platform Categories",
      value: `${platformCount}`,
      description:
        "Individual services organized by the platform or campaign type.",
    },
    {
      label: "Live Platforms",
      value: `${livePlatformCount}`,
      description:
        "Spotify is currently the first platform with live fixed-price campaigns.",
    },
    {
      label: "Spotify Campaigns",
      value: `${spotifyCampaignCount}`,
      description:
        "Seven separate campaign levels are available for comparison.",
    },
    {
      label: "Starting Price",
      value: spotifyStartingPrice,
      description:
        "The Spotify 10K Starter Campaign is the first available service.",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summaryItems.map((item) => (
        <Card
          key={item.label}
          as="article"
          padding="md"
          hover
          fullHeight
          className="group"
        >
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
            {item.label}
          </p>

          <p className="mt-3 text-2xl font-black tracking-[-0.045em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
            {item.value}
          </p>

          <p className="mt-3 text-xs leading-5 text-white/42">
            {item.description}
          </p>
        </Card>
      ))}
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Section                                                                */
/* --------------------------------------------------------------------- */

export default function ServicesHowItWorks({
  id = "how-it-works",
  eyebrow = "How the Storefront Works",
  title = (
    <>
      From Platform Selection to{" "}
      <span className="mr-text-gradient">
        Campaign Checkout.
      </span>
    </>
  ),
  subtitle = "Money Records organizes every marketing service by platform so artists can compare individual campaign options, understand what is included, and choose the service that fits their release.",
  steps = DEFAULT_STEPS,
  primaryCtaHref = "/services/spotify",
  primaryCtaLabel = "Explore Spotify Campaigns",
  secondaryCtaHref = "/#contact",
  secondaryCtaLabel = "Ask About a Service",
}: ServicesHowItWorksProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      aria-labelledby="services-how-it-works-heading"
      className="mr-section relative scroll-mt-28 overflow-hidden"
    >
      {/* Decorative atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 -z-10 h-[760px] w-[1150px] max-w-[118vw] -translate-x-1/2 rounded-full bg-[rgba(211,154,46,0.06)] blur-[165px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-25 [background-image:radial-gradient(rgba(227,179,77,0.13)_0.7px,transparent_0.7px)] [background-size:24px_24px]"
      />

      <Container size="wide">
        {/* Heading */}

        <SectionHeading
          headingId="services-how-it-works-heading"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align="center"
          width="wide"
          divider
        />

        {/* Storefront summary */}

        <div className="mt-12">
          <StorefrontSummary />
        </div>

        {/* Process cards */}

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <ProcessStepCard
              key={step.id}
              step={step}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Checkout and fulfillment panel */}

        <Card
          as="aside"
          variant="featured"
          padding="lg"
          topLine
          className="relative mt-8 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[rgba(211,154,46,0.12)] blur-[105px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[rgba(184,124,32,0.07)] blur-[100px]"
          />

          <div className="relative grid gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-3xl">
              <span className="mr-badge mr-badge-featured">
                Clear Campaign Workflow
              </span>

              <h3 className="mt-5 text-balance text-2xl font-black leading-[1.05] tracking-[-0.038em] text-[var(--mr-text)] sm:text-3xl">
                Every Purchase Stays Connected to the Correct Campaign.
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/52">
                Each service uses a trusted product SKU. The website will use
                that SKU to identify the correct campaign, price, intake
                requirements, checkout product, and fulfillment workflow
                without accepting an untrusted price from the browser.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Trusted campaign SKU",
                  "Server-verified product price",
                  "Release information attached to the order",
                  "Payment confirmation before fulfillment",
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
            </div>

            <div className="grid gap-3">
              <Button
                href={primaryCtaHref}
                variant="platform"
                platformAccent="#1ed760"
                size="lg"
                rightIcon={<ArrowIcon />}
                fullWidth
              >
                {primaryCtaLabel}
              </Button>

              <Button
                href={secondaryCtaHref}
                variant="secondary"
                size="lg"
                fullWidth
              >
                {secondaryCtaLabel}
              </Button>

              <div className="flex items-start gap-3 rounded-2xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] p-4">
                <span className="mt-0.5 text-[var(--mr-gold-200)]">
                  <ShieldIcon />
                </span>

                <p className="m-0 text-xs leading-5 text-white/45">
                  Campaign fulfillment begins only after the order,
                  payment, and required release information are confirmed.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Campaign disclaimer */}

        <CampaignDisclaimer
          className="mt-8"
          variant="gold"
          size="lg"
          includeIntegrityStatement
          points={[
            "Campaign numbers are estimated promotional targets—not guaranteed streams or results.",
            "Every platform page explains its pricing, deliverables, requirements, timing, and exclusions.",
            "Campaign performance varies by the release, audience, assets, platform activity, market conditions, and listener response.",
          ]}
        />
      </Container>
    </section>
  );
}