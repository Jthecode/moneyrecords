// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Services Preview                                      ┃
   ┃ File   : src/sections/WhyChoose.tsx                                   ┃
   ┃ Role   : Homepage preview of label, marketing, and release services   ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { ReactNode } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import SectionHeading from "@/components/SectionHeading";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type MoneyRecordsService = {
  number: string;
  title: string;
  description: string;
  eyebrow: string;
  icon: ReactNode;
  href: string;
  highlights: string[];
  accentClass?: string;
};

type WhyChooseProps = {
  /**
   * Optional wrapper ID.
   *
   * The homepage already places this component inside #services, so this
   * defaults to undefined to prevent duplicate IDs.
   */
  id?: string;

  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;

  ctaHref?: string;
  ctaLabel?: string;

  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;

  items?: MoneyRecordsService[];
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function LabelIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="23"
      height="23"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="12"
        cy="12"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M12 3.5V6M20.5 12H18M12 20.5V18M3.5 12H6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DistributionIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="23"
      height="23"
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

function MarketingIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="23"
      height="23"
      fill="none"
    >
      <path
        d="M4 18V13M10 18V9M16 18V5M22 18V2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M2 21H22"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SocialIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="23"
      height="23"
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="12"
        cy="12"
        r="3.4"
        stroke="currentColor"
        strokeWidth="1.6"
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

function VideoIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="23"
      height="23"
      fill="none"
    >
      <rect
        x="3.5"
        y="5"
        width="17"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="M10 9L15 12L10 15V9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PressIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="23"
      height="23"
      fill="none"
    >
      <path
        d="M5 4.5H19V19.5H5V4.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      <path
        d="M8 8H16M8 11.5H16M8 15H13"
        stroke="currentColor"
        strokeWidth="1.6"
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

/* --------------------------------------------------------------------- */
/* Default Services                                                       */
/* --------------------------------------------------------------------- */

const DEFAULT_ITEMS: MoneyRecordsService[] = [
  {
    number: "01",
    eyebrow: "The Label",
    title: "Artist Development",
    description:
      "Build a stronger artist identity with release planning, brand direction, catalog strategy, and professional positioning.",
    icon: <LabelIcon />,
    href: "/#contact",
    highlights: [
      "Release strategy",
      "Artist positioning",
      "Long-term development",
    ],
  },
  {
    number: "02",
    eyebrow: "Worldwide Release",
    title: "Music Distribution",
    description:
      "Prepare and deliver releases across major streaming and digital platforms with organized release support.",
    icon: <DistributionIcon />,
    href: "/#contact",
    highlights: [
      "Release preparation",
      "Catalog organization",
      "Global platform delivery",
    ],
  },
  {
    number: "03",
    eyebrow: "Streaming Growth",
    title: "Platform Campaigns",
    description:
      "Choose individual campaigns for Spotify, Apple Music, and other major streaming destinations.",
    icon: <MarketingIcon />,
    href: "/services",
    highlights: [
      "Spotify campaigns",
      "Apple Music campaigns",
      "Flexible campaign levels",
    ],
    accentClass: "mr-platform-spotify",
  },
  {
    number: "04",
    eyebrow: "Audience Building",
    title: "Social Media Marketing",
    description:
      "Promote releases through structured Instagram, TikTok, creator, and short-form content campaigns.",
    icon: <SocialIcon />,
    href: "/services",
    highlights: [
      "Instagram marketing",
      "TikTok promotion",
      "Content rollout strategy",
    ],
  },
  {
    number: "05",
    eyebrow: "Visual Exposure",
    title: "YouTube & VEVO",
    description:
      "Support music-video launches through channel strategy, visual campaigns, YouTube promotion, and VEVO options.",
    icon: <VideoIcon />,
    href: "/services",
    highlights: [
      "Video launch strategy",
      "YouTube campaigns",
      "VEVO support",
    ],
  },
  {
    number: "06",
    eyebrow: "Public Positioning",
    title: "Press, PR & Rollouts",
    description:
      "Create a stronger public story around your release with media positioning, press outreach, and coordinated rollout planning.",
    icon: <PressIcon />,
    href: "/services",
    highlights: [
      "Press strategy",
      "Release storytelling",
      "Cross-platform rollouts",
    ],
  },
];

/* --------------------------------------------------------------------- */
/* Service Card                                                           */
/* --------------------------------------------------------------------- */

function ServiceCard({
  item,
}: {
  item: MoneyRecordsService;
}) {
  return (
    <Card
      as="article"
      padding="lg"
      hover
      fullHeight
      className={[
        "group relative min-h-[410px]",
        item.accentClass ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex h-full flex-col">
        {/* Number and icon */}

        <div className="flex items-start justify-between gap-5">
          <span className="text-xs font-black tracking-[0.2em] text-white/28">
            {item.number}
          </span>

          <span className="mr-icon-ring transition-all duration-300 group-hover:scale-105 group-hover:border-[rgba(248,223,160,0.4)]">
            {item.icon}
          </span>
        </div>

        {/* Heading */}

        <div className="mt-8">
          <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
            {item.eyebrow}
          </p>

          <h3 className="mt-3 text-balance text-[1.55rem] font-black leading-[1.08] tracking-[-0.035em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
            {item.title}
          </h3>

          <p className="mt-4 text-sm leading-7 text-white/50">
            {item.description}
          </p>
        </div>

        {/* Feature list */}

        <ul className="mt-6 grid list-none gap-2.5 p-0">
          {item.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-2.5 text-xs leading-5 text-white/52"
            >
              <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.25)] bg-[rgba(211,154,46,0.07)] text-[var(--mr-gold-200)]">
                <CheckIcon />
              </span>

              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Card action */}

        <div className="mt-auto pt-8">
          <Divider variant="soft" />

          <Button
            href={item.href}
            variant="ghost"
            size="sm"
            rightIcon={<ArrowIcon />}
            className="mt-4 w-full justify-between px-1 hover:bg-transparent"
          >
            Explore Service
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Section                                                                */
/* --------------------------------------------------------------------- */

export default function WhyChoose({
  id,
  eyebrow = "What Money Records Does",
  title = (
    <>
      One Label.{" "}
      <span className="mr-text-gradient">
        Every Move Your Release Needs.
      </span>
    </>
  ),
  subtitle = "Work with Money Records for label development, distribution, individual marketing services, or a complete campaign built around your release.",
  ctaHref = "/services",
  ctaLabel = "Explore Marketing Services",
  secondaryCtaHref = "/#contact",
  secondaryCtaLabel = "Submit Your Music",
  items = DEFAULT_ITEMS,
}: WhyChooseProps) {
  return (
    <div
      id={id}
      className="relative overflow-hidden py-4 md:py-8"
      aria-labelledby="money-records-services-heading"
    >
      {/* Decorative atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-72 top-20 -z-10 h-[520px] w-[520px] rounded-full bg-[rgba(211,154,46,0.055)] blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-72 bottom-10 -z-10 h-[520px] w-[520px] rounded-full bg-[rgba(184,124,32,0.045)] blur-[130px]"
      />

      <Container size="wide">
        {/* Heading */}

        <SectionHeading
          headingId="money-records-services-heading"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          width="wide"
          right={
            <>
              <Button
                variant="secondary"
                href={secondaryCtaHref}
                className="hidden xl:inline-flex"
              >
                {secondaryCtaLabel}
              </Button>

              <Button
                variant="primary"
                href={ctaHref}
                rightIcon={<ArrowIcon />}
                className="hidden md:inline-flex"
              >
                {ctaLabel}
              </Button>
            </>
          }
        />

        {/* Services grid */}

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ServiceCard
              key={`${item.number}-${item.title}`}
              item={item}
            />
          ))}
        </div>

        {/* Mobile and tablet CTA */}

        <div className="mt-8 grid gap-3 md:hidden">
          <Button
            variant="primary"
            href={ctaHref}
            fullWidth
            rightIcon={<ArrowIcon />}
          >
            {ctaLabel}
          </Button>

          <Button
            variant="secondary"
            href={secondaryCtaHref}
            fullWidth
          >
            {secondaryCtaLabel}
          </Button>
        </div>

        {/* Conversion panel */}

        <Card
          as="aside"
          variant="featured"
          padding="lg"
          topLine
          className="relative mt-8 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[rgba(211,154,46,0.11)] blur-[85px]"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="mr-badge mr-badge-featured">
                Two Ways to Work With Us
              </span>

              <h3 className="mt-5 text-balance text-2xl font-black leading-[1.05] tracking-[-0.035em] text-[var(--mr-text)] sm:text-3xl">
                Build Your Own Campaign or Let Money Records Build the Full
                Rollout.
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/52">
                Select one platform-specific service, combine multiple campaign
                options, or speak with the label about a complete release
                strategy.
              </p>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto lg:min-w-[410px]">
              <Button
                variant="primary"
                href={ctaHref}
                fullWidth
                rightIcon={<ArrowIcon />}
              >
                Choose a Campaign
              </Button>

              <Button
                variant="secondary"
                href={secondaryCtaHref}
                fullWidth
              >
                Talk to the Label
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}