// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — CTA Section                                           ┃
   ┃ File   : src/sections/CTA.tsx                                         ┃
   ┃ Role   : Artist acquisition, campaign conversion, and direct contact  ┃
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

export type CTAPath = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  buttonLabel: string;
  variant: "primary" | "secondary";
  icon: ReactNode;
};

export type CTAStep = {
  number: string;
  title: string;
  description: string;
};

type CTAProps = {
  /**
   * Optional section ID.
   *
   * The homepage already wraps this component inside #contact, so this
   * defaults to undefined to prevent duplicate IDs.
   */
  id?: string;

  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;

  paths?: CTAPath[];
  steps?: CTAStep[];

  email?: string;
  instagramHref?: string;
  instagramHandle?: string;

  servicesHref?: string;
  servicesLabel?: string;
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function CampaignIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
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

function ArtistIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
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

/* --------------------------------------------------------------------- */
/* Default Content                                                        */
/* --------------------------------------------------------------------- */

const DEFAULT_PATHS: CTAPath[] = [
  {
    id: "marketing-campaign",
    eyebrow: "For Artists & Labels",
    title: "Market Your Next Release",
    description:
      "Choose an individual Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO, press, or radio campaign—or build a complete cross-platform rollout.",
    features: [
      "Platform-specific campaign options",
      "Flexible campaign sizes and budgets",
      "Clear deliverables and reporting",
      "Complete release-rollout packages",
    ],
    href: "/services",
    buttonLabel: "Explore Campaigns",
    variant: "primary",
    icon: <CampaignIcon />,
  },
  {
    id: "artist-submission",
    eyebrow: "For Emerging Talent",
    title: "Submit Music to Money Records",
    description:
      "Introduce your music, artist story, social profiles, release plans, and long-term goals to the Money Records team for consideration.",
    features: [
      "Artist and catalog review",
      "Label-service consideration",
      "Release strategy opportunities",
      "Marketing and development options",
    ],
    href:
      "mailto:info@moneyrecords.io?subject=Money%20Records%20Artist%20Submission",
    buttonLabel: "Submit Your Music",
    variant: "secondary",
    icon: <ArtistIcon />,
  },
];

const DEFAULT_STEPS: CTAStep[] = [
  {
    number: "01",
    title: "Choose Your Direction",
    description:
      "Select a marketing service, complete campaign package, or artist-submission path.",
  },
  {
    number: "02",
    title: "Send Your Information",
    description:
      "Provide your music links, social profiles, release date, artwork, audience goals, and campaign needs.",
  },
  {
    number: "03",
    title: "Build the Rollout",
    description:
      "Money Records reviews your goals and helps structure the right campaign, release plan, or next step.",
  },
];

/* --------------------------------------------------------------------- */
/* Path Card                                                              */
/* --------------------------------------------------------------------- */

function CTAPathCard({
  path,
}: {
  path: CTAPath;
}) {
  return (
    <Card
      as="article"
      variant={
        path.variant === "primary"
          ? "featured"
          : "default"
      }
      padding="lg"
      topLine={path.variant === "primary"}
      hover
      fullHeight
      className="group relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -right-24 -top-28",
          "h-72 w-72 rounded-full blur-[90px]",
          path.variant === "primary"
            ? "bg-[rgba(211,154,46,0.13)]"
            : "bg-[rgba(255,255,255,0.045)]",
        ].join(" ")}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-5">
          <span className="mr-icon-ring h-14 w-14 flex-[0_0_56px]">
            {path.icon}
          </span>

          <span
            className={[
              "mr-badge",
              path.variant === "primary"
                ? "mr-badge-featured"
                : "mr-badge-dark",
            ].join(" ")}
          >
            {path.eyebrow}
          </span>
        </div>

        <h3 className="mt-7 text-balance text-2xl font-black leading-[1.04] tracking-[-0.038em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)] sm:text-3xl">
          {path.title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-white/52">
          {path.description}
        </p>

        <ul className="mt-7 grid list-none gap-3 p-0">
          {path.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-sm leading-6 text-white/55"
            >
              <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.27)] bg-[rgba(211,154,46,0.075)] text-[var(--mr-gold-200)]">
                <CheckIcon />
              </span>

              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <Divider variant="soft" />

          <Button
            href={path.href}
            variant={path.variant}
            size="lg"
            rightIcon={<ArrowIcon />}
            className="mt-5"
            fullWidth
          >
            {path.buttonLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Process Step                                                           */
/* --------------------------------------------------------------------- */

function ProcessStep({
  step,
}: {
  step: CTAStep;
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
        <div className="flex items-center gap-4">
          <span className="text-sm font-black tracking-[0.18em] text-[var(--mr-gold-200)]">
            {step.number}
          </span>

          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[linear-gradient(90deg,rgba(227,179,77,0.32),transparent)]"
          />
        </div>

        <h3 className="mt-6 text-xl font-black tracking-[-0.025em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
          {step.title}
        </h3>

        <p className="mt-3 text-sm leading-7 text-white/50">
          {step.description}
        </p>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* CTA Section                                                            */
/* --------------------------------------------------------------------- */

export default function CTA({
  id,
  eyebrow = "Your Next Move Starts Here",
  title = (
    <>
      Ready to Build Something{" "}
      <span className="mr-text-gradient">
        Bigger Than a Release?
      </span>
    </>
  ),
  subtitle = "Whether you need one targeted marketing service, a complete multi-platform rollout, or an opportunity to work with the label, Money Records gives you a clear next step.",
  paths = DEFAULT_PATHS,
  steps = DEFAULT_STEPS,
  email = "info@moneyrecords.io",
  instagramHref = "https://instagram.com/kingpharaohreal",
  instagramHandle = "@kingpharaohreal",
  servicesHref = "/services",
  servicesLabel = "View Marketing Storefront",
}: CTAProps) {
  return (
    <div
      id={id}
      className="mr-section relative overflow-hidden"
      aria-labelledby="money-records-cta-heading"
    >
      {/* Decorative atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 -z-10 h-[720px] w-[1100px] max-w-[115vw] -translate-x-1/2 rounded-full bg-[rgba(211,154,46,0.075)] blur-[165px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-25 [background-image:radial-gradient(rgba(227,179,77,0.12)_0.7px,transparent_0.7px)] [background-size:24px_24px]"
      />

      <Container size="wide">
        {/* ------------------------------------------------------------- */}
        {/* Heading                                                       */}
        {/* ------------------------------------------------------------- */}

        <SectionHeading
          headingId="money-records-cta-heading"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align="center"
          width="wide"
          divider
        />

        {/* ------------------------------------------------------------- */}
        {/* Conversion Paths                                              */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {paths.map((path) => (
            <CTAPathCard
              key={path.id}
              path={path}
            />
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Process                                                       */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-16">
          <Divider
            label="How It Works"
            variant="strong"
            spacing="lg"
          />

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <ProcessStep
                key={step.number}
                step={step}
              />
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Direct Contact Panel                                          */}
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
            className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[rgba(211,154,46,0.12)] blur-[105px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[rgba(184,124,32,0.07)] blur-[100px]"
          />

          <div className="relative grid gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-3xl">
              <span className="mr-badge mr-badge-featured">
                Direct Contact
              </span>

              <h3 className="mt-5 text-balance text-2xl font-black leading-[1.05] tracking-[-0.038em] text-[var(--mr-text)] sm:text-3xl">
                Not Sure Which Service or Campaign Fits Your Release?
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/52">
                Send Money Records your song link, release date, target
                platforms, campaign goals, current audience, and preferred
                budget. The team can help identify the most suitable next
                step.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Spotify",
                  "Apple Music",
                  "Instagram",
                  "TikTok",
                  "YouTube",
                  "VEVO",
                  "Press & PR",
                  "Complete Rollouts",
                ].map((service) => (
                  <span
                    key={service}
                    className="inline-flex min-h-8 items-center rounded-full border border-white/[0.08] bg-white/[0.025] px-3 text-[9px] font-black uppercase tracking-[0.12em] text-white/45"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <Button
                href={servicesHref}
                variant="primary"
                size="lg"
                rightIcon={<ArrowIcon />}
                fullWidth
              >
                {servicesLabel}
              </Button>

              <Button
                href={`mailto:${email}?subject=Money%20Records%20Campaign%20Inquiry`}
                variant="secondary"
                size="lg"
                leftIcon={<MailIcon />}
                fullWidth
              >
                Email Money Records
              </Button>

              <Button
                href={instagramHref}
                variant="dark"
                size="lg"
                leftIcon={<InstagramIcon />}
                external
                fullWidth
              >
                DM {instagramHandle}
              </Button>
            </div>
          </div>
        </Card>

        {/* ------------------------------------------------------------- */}
        {/* Campaign Standards Notice                                     */}
        {/* ------------------------------------------------------------- */}

        <div className="mr-notice mr-notice-gold mt-8">
          <span
            aria-hidden="true"
            className="mt-1 grid h-6 w-6 flex-[0_0_24px] place-items-center rounded-full border border-[rgba(227,179,77,0.28)] bg-[rgba(211,154,46,0.08)] text-[var(--mr-gold-200)]"
          >
            <CheckIcon />
          </span>

          <div>
            <p className="m-0 text-xs font-black uppercase tracking-[0.16em] text-[var(--mr-gold-100)]">
              Transparent Campaign Standards
            </p>

            <p className="mt-2">
              Money Records does not use bots, artificial streaming, click
              farms, or guaranteed playlist placements. Campaign figures
              represent estimated promotional reach, exposure, impressions, or
              listener opportunities. Results vary by release quality,
              audience targeting, creative assets, platform performance,
              market conditions, and listener response.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}