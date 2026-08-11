// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Marketing Disclaimer                                 ┃
   ┃ File   : src/app/marketing-disclaimer/page.tsx                       ┃
   ┃ Role   : Campaign disclosures, performance expectations, platform    ┃
   ┃          independence, estimates, and promotional service standards  ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                    */
/* --------------------------------------------------------------------- */

export const dynamic =
  "force-static";

/* --------------------------------------------------------------------- */
/* Constants                                                              */
/* --------------------------------------------------------------------- */

const COMPANY_NAME =
  "Money Records LLC";

const COMPANY_SHORT_NAME =
  "Money Records";

const CONTACT_EMAIL =
  "info@moneyrecords.io";

const SITE_URL =
  "https://moneyrecords.io";

const EFFECTIVE_DATE =
  "August 10, 2026";

const LAST_UPDATED =
  "August 10, 2026";

/* --------------------------------------------------------------------- */
/* Metadata                                                               */
/* --------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Marketing Disclaimer",

  description:
    "Review the Money Records LLC Marketing Disclaimer covering music promotion, campaign estimates, platform performance, playlist outreach, social media marketing, press, radio, VEVO, audience growth, and campaign results.",

  keywords: [
    "Money Records marketing disclaimer",
    "music marketing disclaimer",
    "Spotify promotion disclaimer",
    "playlist marketing disclaimer",
    "Instagram music marketing disclaimer",
    "TikTok music promotion disclaimer",
    "YouTube music marketing disclaimer",
    "VEVO disclaimer",
    "music PR disclaimer",
    "radio promotion disclaimer",
    "music campaign results",
  ],

  alternates: {
    canonical:
      "/marketing-disclaimer",
  },

  openGraph: {
    type:
      "website",

    title:
      "Marketing Disclaimer | Money Records",

    description:
      "Important disclosures about Money Records music marketing services, campaign estimates, third-party platforms, and promotional results.",

    url:
      "/marketing-disclaimer",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Marketing Disclaimer | Money Records",

    description:
      "Review important disclosures before purchasing a Money Records music-marketing campaign.",
  },
};

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type DisclaimerSectionProps = {
  number: string;
  title: string;
  children: ReactNode;
};

type DisclaimerBulletProps = {
  children: ReactNode;
};

type SummaryCardProps = {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
};

type PlatformCardProps = {
  icon: ReactNode;
  platform: string;
  description: string;
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

function ShieldIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
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
        d="M5 19V13M12 19V9M19 19V5"
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

function PlatformIcon(): ReactNode {
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

function MusicIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
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

function WarningIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <path
        d="M12 4L21 20H3L12 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M12 9V14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <circle
        cx="12"
        cy="17"
        r="0.9"
        fill="currentColor"
      />
    </svg>
  );
}

function EyeIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <path
        d="M3 12C5.3 8.5 8.2 6.8 12 6.8C15.8 6.8 18.7 8.5 21 12C18.7 15.5 15.8 17.2 12 17.2C8.2 17.2 5.3 15.5 3 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <circle
        cx="12"
        cy="12"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function DollarIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <path
        d="M16.5 8.5C15.6 7.4 14.2 6.8 12.4 6.8C10 6.8 8.5 7.9 8.5 9.6C8.5 11.3 9.9 12.1 12.4 12.6C15 13.1 16.5 13.9 16.5 15.7C16.5 17.6 14.8 18.7 12.2 18.7C10.2 18.7 8.6 18 7.5 16.7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M12 4.5V20.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
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

/* --------------------------------------------------------------------- */
/* Disclaimer Bullet                                                      */
/* --------------------------------------------------------------------- */

function DisclaimerBullet({
  children,
}: DisclaimerBulletProps) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.045)] text-[var(--mr-gold-200)]">
        <CheckIcon />
      </span>

      <span className="text-sm leading-7 text-white/46">
        {children}
      </span>
    </li>
  );
}

/* --------------------------------------------------------------------- */
/* Disclaimer Section                                                     */
/* --------------------------------------------------------------------- */

function DisclaimerSection({
  number,
  title,
  children,
}: DisclaimerSectionProps) {
  return (
    <section
      id={`marketing-section-${number}`}
      className="scroll-mt-28 border-b border-white/[0.065] py-8 last:border-b-0"
    >
      <div className="flex items-start gap-4 sm:gap-5">
        <span className="grid h-9 w-9 flex-[0_0_36px] place-items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[9px] font-black text-[var(--mr-gold-200)]">
          {number}
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-black tracking-[-0.035em] text-[var(--mr-text)] sm:text-2xl">
            {title}
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-7 text-white/46">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/* Summary Card                                                           */
/* --------------------------------------------------------------------- */

function SummaryCard({
  icon,
  eyebrow,
  title,
  description,
}: SummaryCardProps) {
  return (
    <Card
      padding="md"
      hover
      fullHeight
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[rgba(227,179,77,0.06)] blur-[85px]"
      />

      <div className="relative">
        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]">
          {icon}
        </span>

        <p className="mt-5 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)]">
          {eyebrow}
        </p>

        <h3 className="mt-2 text-base font-black tracking-[-0.025em] text-[var(--mr-text)]">
          {title}
        </h3>

        <p className="mt-3 text-xs leading-6 text-white/40">
          {description}
        </p>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Platform Card                                                          */
/* --------------------------------------------------------------------- */

function PlatformCard({
  icon,
  platform,
  description,
}: PlatformCardProps) {
  return (
    <div className="rounded-[22px] border border-white/[0.065] bg-white/[0.022] p-5">
      <div className="flex items-start gap-4">
        <span className="grid h-10 w-10 flex-[0_0_40px] place-items-center rounded-xl border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.045)] text-[var(--mr-gold-200)]">
          {icon}
        </span>

        <div>
          <h3 className="text-sm font-black text-[var(--mr-text)]">
            {platform}
          </h3>

          <p className="mt-2 text-xs leading-6 text-white/40">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Marketing Disclaimer Page                                              */
/* --------------------------------------------------------------------- */

export default function MarketingDisclaimerPage() {
  const tableOfContents = [
    ["01", "Purpose of This Disclaimer"],
    ["02", "Marketing Services"],
    ["03", "No Guaranteed Results"],
    ["04", "Campaign Estimates"],
    ["05", "Streaming Campaigns"],
    ["06", "Playlist Outreach"],
    ["07", "Social Media Marketing"],
    ["08", "YouTube & Video Marketing"],
    ["09", "VEVO Services"],
    ["10", "Press & Public Relations"],
    ["11", "Radio Promotion"],
    ["12", "Artist Branding"],
    ["13", "Third-Party Platforms"],
    ["14", "Platform Algorithms"],
    ["15", "Audience Behavior"],
    ["16", "Changes During Campaigns"],
    ["17", "Customer Materials"],
    ["18", "Campaign Eligibility"],
    ["19", "Revenue & Earnings"],
    ["20", "Previous Results"],
    ["21", "Organic & Paid Activity"],
    ["22", "Fraudulent Activity"],
    ["23", "Campaign Reporting"],
    ["24", "Refunds"],
    ["25", "Independent Platform Relationship"],
    ["26", "Updates"],
    ["27", "Contact"],
  ] as const;

  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      {/* --------------------------------------------------------------- */}
      {/* Background                                                      */}
      {/* --------------------------------------------------------------- */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[1150px] w-[1650px] max-w-[134vw] -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.05)] blur-[225px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.14] [background-image:radial-gradient(rgba(227,179,77,0.1)_0.7px,transparent_0.7px)] [background-size:28px_28px]"
      />

      <Container size="wide">
        <div className="py-8 md:py-12">
          {/* ----------------------------------------------------------- */}
          {/* Hero                                                        */}
          {/* ----------------------------------------------------------- */}

          <header className="relative overflow-hidden rounded-[34px] border border-[rgba(227,179,77,0.22)] bg-[linear-gradient(145deg,rgba(18,17,15,0.98),rgba(6,6,7,0.99))] p-6 shadow-[0_36px_140px_rgba(0,0,0,0.6)] sm:p-8 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-48 -top-56 h-[680px] w-[680px] rounded-full bg-[rgba(227,179,77,0.15)] blur-[175px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-56 -left-44 h-[500px] w-[500px] rounded-full bg-[rgba(227,179,77,0.045)] blur-[150px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.82),transparent)]"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
              {/* Hero Copy */}

              <div className="max-w-4xl">
                <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] px-4 text-[8px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                  <MegaphoneIcon />
                  Campaign & Performance Disclosure
                </span>

                <h1 className="mt-7 text-balance text-5xl font-black leading-[0.94] tracking-[-0.065em] text-[var(--mr-text)] sm:text-6xl lg:text-7xl">
                  Marketing{" "}
                  <span className="mr-text-gradient">
                    Disclaimer.
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg font-black leading-8 tracking-[-0.025em] text-white/72 sm:text-xl">
                  Money Records provides music marketing and promotional
                  services. Purchasing a campaign does not guarantee a
                  specific commercial, platform, audience, or career outcome.
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/46 sm:text-base">
                  This page explains the difference between campaign services,
                  campaign estimates, potential performance, third-party
                  platform activity, and guaranteed results.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="inline-flex min-h-9 items-center rounded-full border border-white/[0.075] bg-white/[0.025] px-4 text-[9px] font-black uppercase tracking-[0.13em] text-white/42">
                    Effective: {EFFECTIVE_DATE}
                  </span>

                  <span className="inline-flex min-h-9 items-center rounded-full border border-white/[0.075] bg-white/[0.025] px-4 text-[9px] font-black uppercase tracking-[0.13em] text-white/42">
                    Updated: {LAST_UPDATED}
                  </span>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    href="/services"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowIcon />}
                    className="w-full sm:w-auto"
                  >
                    Explore Services
                  </Button>

                  <Button
                    href="/contact"
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Ask a Question
                  </Button>
                </div>
              </div>

              {/* Disclosure Card */}

              <Card
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full bg-[rgba(227,179,77,0.09)] blur-[110px]"
                />

                <div className="relative">
                  <span className="grid h-14 w-14 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                    <WarningIcon />
                  </span>

                  <p className="mt-6 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                    Core Disclosure
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
                    Services Are Not Guaranteed Outcomes.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/44">
                    Unless expressly stated in a signed written agreement,
                    campaign purchases do not guarantee specific streams,
                    listeners, followers, views, playlist placements, press
                    articles, radio spins, sales, revenue, or other results.
                  </p>

                  <Divider
                    className="my-6"
                    variant="soft"
                  />

                  <div className="grid gap-3">
                    {[
                      "Campaign performance can vary",
                      "Platforms control their own algorithms",
                      "Audience behavior cannot be guaranteed",
                      "Campaign estimates are not promises",
                      "Third-party approvals remain outside our control",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]">
                          <CheckIcon />
                        </span>

                        <p className="text-xs leading-6 text-white/40">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </header>

          {/* ----------------------------------------------------------- */}
          {/* Quick Summary                                               */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="marketing-disclaimer-overview"
            className="py-14 md:py-20"
          >
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Before You Purchase
              </p>

              <h2
                id="marketing-disclaimer-overview"
                className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
              >
                Understand the{" "}
                <span className="mr-text-gradient">
                  Campaign.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/46 sm:text-base">
                Marketing can increase exposure and create opportunities, but
                performance depends on factors beyond the purchase of a
                promotional service.
              </p>
            </div>

            <Divider
              className="my-8"
              variant="strong"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                icon={<MegaphoneIcon />}
                eyebrow="Service"
                title="Campaign Execution"
                description="You are purchasing the selected promotional service and campaign work described for that service."
              />

              <SummaryCard
                icon={<ChartIcon />}
                eyebrow="Performance"
                title="Results Can Vary"
                description="Music, creative assets, audience response, timing, platform conditions, and campaign scope can affect performance."
              />

              <SummaryCard
                icon={<PlatformIcon />}
                eyebrow="Platforms"
                title="Third-Party Control"
                description="Streaming, social, media, radio, and video platforms control their own systems, policies, algorithms, approvals, and availability."
              />

              <SummaryCard
                icon={<DollarIcon />}
                eyebrow="Commercial Results"
                title="No Revenue Promise"
                description="Marketing campaigns do not guarantee royalties, sales, revenue, sponsorships, record deals, or other financial outcomes."
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Platform Overview                                           */}
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
                className="pointer-events-none absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full bg-[rgba(227,179,77,0.08)] blur-[145px]"
              />

              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  Platform-Specific Campaigns
                </p>

                <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                  Different Platforms.{" "}
                  <span className="mr-text-gradient">
                    Different Variables.
                  </span>
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/46 sm:text-base">
                  Each platform has different systems, algorithms, audiences,
                  policies, eligibility rules, and performance characteristics.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <PlatformCard
                    icon={<MusicIcon />}
                    platform="Spotify & Streaming"
                    description="Streaming performance can depend on listener behavior, release quality, saves, skips, repeat listening, audience targeting, editorial systems, algorithms, and other factors."
                  />

                  <PlatformCard
                    icon={<TargetIcon />}
                    platform="Instagram & TikTok"
                    description="Social performance can depend on creative quality, audience response, posting activity, platform recommendations, competition, content format, and account history."
                  />

                  <PlatformCard
                    icon={<EyeIcon />}
                    platform="YouTube & Video"
                    description="Video performance can depend on title, thumbnail, audience interest, watch behavior, retention, recommendations, channel history, and platform systems."
                  />

                  <PlatformCard
                    icon={<MegaphoneIcon />}
                    platform="Press & PR"
                    description="Media coverage remains subject to editorial discretion, publication interest, story relevance, availability, and the policies of independent media organizations."
                  />

                  <PlatformCard
                    icon={<PlatformIcon />}
                    platform="VEVO"
                    description="Any platform availability, channel eligibility, content requirements, approvals, and delivery processes remain subject to applicable platform and distribution requirements."
                  />

                  <PlatformCard
                    icon={<ChartIcon />}
                    platform="Radio"
                    description="Radio promotion does not guarantee rotation, spin counts, station adoption, chart performance, audience growth, or other station-controlled outcomes."
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Main Disclaimer                                             */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-label="Money Records Marketing Disclaimer"
            className="pb-14 md:pb-20"
          >
            <div className="grid gap-8 xl:grid-cols-[310px_minmax(0,1fr)] xl:items-start">
              {/* Contents */}

              <aside className="xl:sticky xl:top-28">
                <Card
                  padding="lg"
                  className="relative overflow-hidden"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[rgba(227,179,77,0.06)] blur-[100px]"
                  />

                  <div className="relative">
                    <p className="text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                      Marketing Disclaimer
                    </p>

                    <h2 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                      Contents
                    </h2>

                    <nav
                      aria-label="Marketing disclaimer sections"
                      className="mt-6 grid gap-1"
                    >
                      {tableOfContents.map(
                        ([number, label]) => (
                          <a
                            key={number}
                            href={`#marketing-section-${number}`}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-white/42 transition hover:bg-white/[0.03] hover:text-[var(--mr-gold-200)]"
                          >
                            <span className="text-[8px] font-black text-white/20 transition group-hover:text-[var(--mr-gold-200)]">
                              {number}
                            </span>

                            <span>
                              {label}
                            </span>
                          </a>
                        ),
                      )}
                    </nav>
                  </div>
                </Card>
              </aside>

              {/* Disclaimer Document */}

              <Card
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-40 -top-44 h-[500px] w-[500px] rounded-full bg-[rgba(227,179,77,0.06)] blur-[145px]"
                />

                <div className="relative">
                  {/* Intro */}

                  <div className="rounded-[22px] border border-[rgba(227,179,77,0.14)] bg-[rgba(211,154,46,0.03)] p-5">
                    <p className="text-sm leading-7 text-white/48">
                      This Marketing Disclaimer applies to promotional and
                      marketing services offered by{" "}
                      <strong className="text-white/70">
                        {COMPANY_NAME}
                      </strong>{" "}
                      through{" "}
                      <strong className="text-white/70">
                        {SITE_URL}
                      </strong>{" "}
                      and related Money Records communications.
                    </p>
                  </div>

                  {/* 01 */}

                  <DisclaimerSection
                    number="01"
                    title="Purpose of This Disclaimer"
                  >
                    <p>
                      The purpose of this Marketing Disclaimer is to explain
                      what customers should reasonably understand when
                      purchasing a Money Records promotional or marketing
                      service.
                    </p>

                    <p>
                      Marketing can help create exposure, awareness, traffic,
                      audience opportunities, campaign activity, and
                      promotional momentum. It cannot eliminate the
                      uncertainty inherent in music, entertainment, social
                      media, streaming, publicity, or audience behavior.
                    </p>
                  </DisclaimerSection>

                  {/* 02 */}

                  <DisclaimerSection
                    number="02"
                    title="Marketing Services"
                  >
                    <p>
                      Money Records may offer promotional services involving
                      areas such as:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <DisclaimerBullet>
                        Spotify and streaming marketing.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Apple Music campaigns.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Instagram marketing.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        TikTok promotion.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        YouTube marketing.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        SoundCloud marketing.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        VEVO-related services.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Press and public relations.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Radio promotion.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Artist branding and release strategy.
                      </DisclaimerBullet>
                    </ul>

                    <p>
                      The exact scope depends on the specific service or
                      campaign purchased.
                    </p>
                  </DisclaimerSection>

                  {/* 03 */}

                  <DisclaimerSection
                    number="03"
                    title="No Guaranteed Marketing Results"
                  >
                    <p>
                      Unless expressly stated in a separate signed written
                      agreement, Money Records does not guarantee a specific
                      result from a marketing campaign.
                    </p>

                    <p>
                      This includes any specific:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <DisclaimerBullet>
                        Number of streams.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Number of listeners.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Number of views.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Number of followers or subscribers.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Number of likes, comments, saves, or shares.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Playlist placement.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Editorial playlist placement.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Press placement.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Radio rotation.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Chart position.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Platform recommendation.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Sales, income, royalties, or revenue.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Record deal or other industry opportunity.
                      </DisclaimerBullet>
                    </ul>
                  </DisclaimerSection>

                  {/* 04 */}

                  <DisclaimerSection
                    number="04"
                    title="Campaign Estimates, Ranges, and Projections"
                  >
                    <p>
                      A campaign page or Money Records representative may
                      describe potential campaign reach, estimated activity,
                      expected ranges, target activity, previous performance,
                      or other campaign-related figures.
                    </p>

                    <p>
                      Unless specifically identified as a contractual
                      guarantee in a signed written agreement, these figures
                      should be interpreted as estimates, targets, examples, or
                      planning information rather than guaranteed outcomes.
                    </p>

                    <p>
                      Actual campaign performance may be below or above an
                      estimate.
                    </p>
                  </DisclaimerSection>

                  {/* 05 */}

                  <DisclaimerSection
                    number="05"
                    title="Streaming Campaigns"
                  >
                    <p>
                      Streaming performance depends on numerous variables that
                      can include listener interest, release quality, genre,
                      audience targeting, artist momentum, release timing,
                      saves, skips, repeat listening, platform algorithms,
                      competition, and other factors.
                    </p>

                    <p>
                      A streaming marketing service does not guarantee that a
                      particular listener will stream a song, save a song,
                      follow an artist, return to a release, purchase
                      merchandise, or become a long-term fan.
                    </p>
                  </DisclaimerSection>

                  {/* 06 */}

                  <DisclaimerSection
                    number="06"
                    title="Playlist Outreach and Placement"
                  >
                    <p>
                      Where a service involves playlist outreach, submission,
                      consideration, promotion, or related activity, playlist
                      decisions can remain subject to the independent judgment
                      of playlist owners, curators, editors, platforms, or
                      other third parties.
                    </p>

                    <p>
                      Unless a particular service expressly states otherwise
                      in a lawful written agreement, purchasing a campaign
                      should not be interpreted as purchasing guaranteed
                      editorial playlist placement.
                    </p>

                    <p>
                      Playlist availability, positioning, duration, audience
                      activity, and continued inclusion may change.
                    </p>
                  </DisclaimerSection>

                  {/* 07 */}

                  <DisclaimerSection
                    number="07"
                    title="Social Media Marketing"
                  >
                    <p>
                      Social media campaign performance can vary based on
                      content quality, account history, creative execution,
                      audience response, platform recommendations, trends,
                      timing, frequency, targeting, market competition, and
                      other factors.
                    </p>

                    <p>
                      Purchasing social media marketing does not guarantee
                      follower retention, engagement levels, viral
                      performance, conversions, sponsorship opportunities, or
                      long-term audience growth.
                    </p>

                    <p>
                      Platform metrics may also change as platforms remove
                      inactive accounts, update measurement methods, modify
                      algorithms, or enforce policies.
                    </p>
                  </DisclaimerSection>

                  {/* 08 */}

                  <DisclaimerSection
                    number="08"
                    title="YouTube and Video Marketing"
                  >
                    <p>
                      YouTube and other video-platform performance can depend
                      on factors including video quality, titles, thumbnails,
                      watch time, audience retention, traffic sources, channel
                      history, recommendations, competition, geography, and
                      viewer behavior.
                    </p>

                    <p>
                      Money Records does not guarantee that campaign viewers
                      will subscribe, watch other videos, purchase products,
                      become streaming listeners, or engage with the artist
                      elsewhere.
                    </p>
                  </DisclaimerSection>

                  {/* 09 */}

                  <DisclaimerSection
                    number="09"
                    title="VEVO Services"
                  >
                    <p>
                      VEVO-related services may be subject to eligibility,
                      content, distribution, metadata, rights, channel, and
                      platform requirements.
                    </p>

                    <p>
                      Money Records cannot guarantee a third-party platform
                      approval, channel decision, content acceptance, feature,
                      recommendation, monetization decision, or other
                      platform-controlled outcome unless such authority is
                      expressly within Money Records&apos; control and is
                      stated in writing.
                    </p>
                  </DisclaimerSection>

                  {/* 10 */}

                  <DisclaimerSection
                    number="10"
                    title="Press and Public Relations"
                  >
                    <p>
                      Press and public-relations services can involve story
                      development, outreach, media targeting, publication
                      opportunities, promotional strategy, or related campaign
                      activity.
                    </p>

                    <p>
                      Independent editors, journalists, publications, and media
                      companies may control whether a story is accepted,
                      published, edited, featured, removed, updated, or
                      promoted.
                    </p>

                    <p>
                      Purchasing PR services does not guarantee mainstream
                      media coverage, search ranking, celebrity recognition,
                      verification, reputation changes, or a specific number of
                      articles unless expressly stated in the purchased
                      service.
                    </p>
                  </DisclaimerSection>

                  {/* 11 */}

                  <DisclaimerSection
                    number="11"
                    title="Radio Promotion"
                  >
                    <p>
                      Radio campaigns may involve promotional outreach,
                      submissions, relationships, campaign coordination, or
                      other radio-focused activity.
                    </p>

                    <p>
                      Stations, programmers, DJs, networks, charts, and other
                      radio organizations may independently control decisions
                      regarding airplay, rotation, scheduling, reporting, and
                      continued support.
                    </p>

                    <p>
                      Radio promotion does not guarantee a particular spin
                      count, station count, rotation category, chart position,
                      audience size, or commercial result.
                    </p>
                  </DisclaimerSection>

                  {/* 12 */}

                  <DisclaimerSection
                    number="12"
                    title="Artist Branding and Development"
                  >
                    <p>
                      Branding, positioning, consultation, artist development,
                      strategy, design, presentation, and campaign planning are
                      professional services intended to improve the quality and
                      direction of an artist&apos;s presentation.
                    </p>

                    <p>
                      These services do not guarantee a record deal, management
                      deal, distribution deal, sponsorship, verification,
                      media recognition, fan growth, revenue, or career
                      breakthrough.
                    </p>
                  </DisclaimerSection>

                  {/* 13 */}

                  <DisclaimerSection
                    number="13"
                    title="Third-Party Platforms"
                  >
                    <p>
                      Many Money Records services relate to third-party
                      platforms and organizations that Money Records does not
                      own or control.
                    </p>

                    <p>
                      These can include streaming services, social networks,
                      video services, media companies, publications, radio
                      stations, search engines, advertising systems, payment
                      systems, and other technology providers.
                    </p>

                    <p>
                      Third parties may change their policies, systems,
                      algorithms, eligibility standards, products,
                      availability, reporting, pricing, or functionality
                      without Money Records&apos; permission.
                    </p>
                  </DisclaimerSection>

                  {/* 14 */}

                  <DisclaimerSection
                    number="14"
                    title="Platform Algorithms"
                  >
                    <p>
                      Recommendation systems, search algorithms, feeds,
                      playlists, discovery tools, ranking systems, and other
                      platform algorithms are controlled by the respective
                      platform.
                    </p>

                    <p>
                      A campaign can create promotional activity without
                      guaranteeing how a platform algorithm will respond.
                    </p>
                  </DisclaimerSection>

                  {/* 15 */}

                  <DisclaimerSection
                    number="15"
                    title="Audience Behavior"
                  >
                    <p>
                      Audience behavior is inherently variable.
                    </p>

                    <p>
                      Money Records cannot guarantee that people exposed to a
                      campaign will:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <DisclaimerBullet>
                        Like the song.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Follow the artist.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Save the release.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Stream repeatedly.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Purchase tickets or merchandise.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Share the content.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Become long-term fans.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Take any other particular action.
                      </DisclaimerBullet>
                    </ul>
                  </DisclaimerSection>

                  {/* 16 */}

                  <DisclaimerSection
                    number="16"
                    title="Changes During a Campaign"
                  >
                    <p>
                      Campaign execution may need to be adjusted in response to
                      platform changes, audience behavior, project
                      performance, technical limitations, content
                      restrictions, availability, targeting information, or
                      other operational considerations.
                    </p>

                    <p>
                      Where reasonably necessary, Money Records may adjust
                      campaign execution while attempting to preserve the
                      general purpose of the purchased service.
                    </p>
                  </DisclaimerSection>

                  {/* 17 */}

                  <DisclaimerSection
                    number="17"
                    title="Customer-Provided Materials"
                  >
                    <p>
                      Campaign performance can be affected by the quality,
                      accuracy, accessibility, and suitability of materials
                      supplied by the customer.
                    </p>

                    <p>
                      These materials may include:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <DisclaimerBullet>
                        Music.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Videos.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Artwork.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Social profiles.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Streaming links.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Artist biographies.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Campaign instructions.
                      </DisclaimerBullet>

                      <DisclaimerBullet>
                        Advertising creative.
                      </DisclaimerBullet>
                    </ul>

                    <p>
                      Broken links, unavailable content, inaccurate
                      information, weak creative assets, rights issues, or
                      delayed responses can affect campaign execution.
                    </p>
                  </DisclaimerSection>

                  {/* 18 */}

                  <DisclaimerSection
                    number="18"
                    title="Campaign Eligibility"
                  >
                    <p>
                      Money Records may determine that a project or asset is
                      not suitable for a particular service because of rights
                      concerns, platform rules, missing information,
                      inaccessible content, technical issues, content
                      restrictions, suspected fraud, or other material
                      concerns.
                    </p>

                    <p>
                      Where appropriate, Money Records may request replacement
                      materials, additional information, a different campaign
                      approach, or another reasonable resolution.
                    </p>
                  </DisclaimerSection>

                  {/* 19 */}

                  <DisclaimerSection
                    number="19"
                    title="Revenue, Royalties, and Earnings"
                  >
                    <p>
                      Money Records marketing services do not guarantee
                      royalties, ad revenue, sales, ticket sales, merchandise
                      revenue, sponsorship income, publishing revenue, label
                      advances, investment, or other financial returns.
                    </p>

                    <p>
                      Campaign costs should not be interpreted as an
                      investment product or promise that campaign spending will
                      produce a positive financial return.
                    </p>
                  </DisclaimerSection>

                  {/* 20 */}

                  <DisclaimerSection
                    number="20"
                    title="Previous Results and Examples"
                  >
                    <p>
                      Examples of previous campaigns, artists, outcomes,
                      screenshots, statistics, testimonials, or other results
                      may illustrate what happened in a particular situation.
                    </p>

                    <p>
                      Previous performance does not guarantee that another
                      artist, release, account, or campaign will achieve the
                      same outcome.
                    </p>
                  </DisclaimerSection>

                  {/* 21 */}

                  <DisclaimerSection
                    number="21"
                    title="Organic, Paid, and Promotional Activity"
                  >
                    <p>
                      Different Money Records services may use different
                      legitimate promotional approaches depending on the
                      service description, platform, campaign objective, and
                      available methods.
                    </p>

                    <p>
                      Customers should review the description of the selected
                      campaign rather than assume that every marketing service
                      uses the same traffic source, audience source, outreach
                      method, or promotional process.
                    </p>

                    <p>
                      Money Records does not authorize customers to interpret
                      a general marketing description as a promise of a
                      particular advertising channel unless that channel is
                      expressly included in the purchased service.
                    </p>
                  </DisclaimerSection>

                  {/* 22 */}

                  <DisclaimerSection
                    number="22"
                    title="Fraudulent or Prohibited Activity"
                  >
                    <p>
                      Money Records does not intend its marketing services to
                      authorize fraud, deceptive manipulation, unauthorized
                      access, fake-account creation, bot activity prohibited
                      by applicable platform rules, or other unlawful conduct.
                    </p>

                    <p>
                      Money Records may refuse or stop work where it reasonably
                      identifies material fraud, impersonation, rights
                      violations, abusive conduct, or prohibited campaign
                      activity.
                    </p>
                  </DisclaimerSection>

                  {/* 23 */}

                  <DisclaimerSection
                    number="23"
                    title="Campaign Reporting and Metrics"
                  >
                    <p>
                      Campaign reporting may rely on information from Money
                      Records systems, third-party platforms, vendors,
                      partners, public-facing metrics, or other data sources.
                    </p>

                    <p>
                      Platform metrics can change after a campaign because of
                      reporting delays, data reconciliation, account removal,
                      audience cleanup, platform corrections, measurement
                      changes, or other factors.
                    </p>

                    <p>
                      Metrics displayed by third parties remain subject to
                      those third parties&apos; measurement systems.
                    </p>
                  </DisclaimerSection>

                  {/* 24 */}

                  <DisclaimerSection
                    number="24"
                    title="Refunds and Campaign Outcomes"
                  >
                    <p>
                      Refund eligibility is governed by the Money Records{" "}
                      <Link
                        href="/refund-policy"
                        className="font-bold text-[var(--mr-gold-200)] transition hover:text-[var(--mr-gold-100)]"
                      >
                        Refund Policy
                      </Link>
                      .
                    </p>

                    <p>
                      A campaign producing a different performance level than
                      the customer hoped for does not automatically mean the
                      service was not provided.
                    </p>

                    <p>
                      Refund review may consider the purchased service, work
                      performed, campaign status, third-party costs,
                      information provided by the customer, and the applicable
                      Refund Policy.
                    </p>
                  </DisclaimerSection>

                  {/* 25 */}

                  <DisclaimerSection
                    number="25"
                    title="Independent Relationship With Third-Party Platforms"
                  >
                    <p>
                      References to Spotify, Apple Music, Instagram, TikTok,
                      YouTube, VEVO, SoundCloud, media companies, radio
                      stations, or other platforms are used to describe the
                      destination or focus of relevant services.
                    </p>

                    <p>
                      Unless expressly stated otherwise, use of a third-party
                      name does not mean that the third party owns, operates,
                      sponsors, endorses, guarantees, or controls Money Records.
                    </p>

                    <p>
                      Third-party trademarks and platform names remain the
                      property of their respective owners.
                    </p>
                  </DisclaimerSection>

                  {/* 26 */}

                  <DisclaimerSection
                    number="26"
                    title="Changes to This Disclaimer"
                  >
                    <p>
                      Money Records may update this Marketing Disclaimer as
                      services, platforms, campaign methods, business
                      operations, or applicable requirements evolve.
                    </p>

                    <p>
                      The most current version may be posted on this page with
                      an updated effective or last-updated date.
                    </p>
                  </DisclaimerSection>

                  {/* 27 */}

                  <DisclaimerSection
                    number="27"
                    title="Contact Money Records"
                  >
                    <p>
                      If you have questions about a campaign, estimate, service
                      description, platform, or expected promotional outcome,
                      contact Money Records before purchasing.
                    </p>

                    <div className="mt-5 rounded-[22px] border border-[rgba(227,179,77,0.16)] bg-[rgba(211,154,46,0.035)] p-5">
                      <p className="text-base font-black text-[var(--mr-text)]">
                        {COMPANY_NAME}
                      </p>

                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[var(--mr-gold-200)] transition hover:text-[var(--mr-gold-100)]"
                      >
                        <MailIcon />

                        {CONTACT_EMAIL}
                      </a>

                      <p className="mt-3 text-xs text-white/38">
                        Website: {SITE_URL}
                      </p>

                      <div className="mt-5">
                        <Button
                          href="/contact"
                          variant="secondary"
                          size="md"
                          rightIcon={<ArrowIcon />}
                        >
                          Contact the Team
                        </Button>
                      </div>
                    </div>
                  </DisclaimerSection>
                </div>
              </Card>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Strong Disclosure                                           */}
          {/* ----------------------------------------------------------- */}

          <section className="pb-14 md:pb-20">
            <Card
              padding="lg"
              className="relative overflow-hidden border-[rgba(227,179,77,0.18)]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-36 h-96 w-96 rounded-full bg-[rgba(227,179,77,0.075)] blur-[120px]"
              />

              <div className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start">
                <span className="grid h-14 w-14 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                  <WarningIcon />
                </span>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                    Read Before Checkout
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl">
                    Purchase the Service — Not an Assumed Outcome.
                  </h2>

                  <p className="mt-4 max-w-5xl text-sm leading-7 text-white/44">
                    When you purchase a Money Records campaign, your purchase
                    should be based on the actual service description and
                    campaign scope. Do not purchase a campaign solely because
                    you assume it will produce a specific number of streams,
                    views, followers, sales, placements, press articles, radio
                    spins, revenue, or other results that are not expressly
                    guaranteed in writing.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Related Policies                                            */}
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
                className="pointer-events-none absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full bg-[rgba(227,179,77,0.1)] blur-[145px]"
              />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_440px] lg:items-center">
                <div className="max-w-3xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Customer Protection
                  </p>

                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                    Review Everything{" "}
                    <span className="mr-text-gradient">
                      Before Checkout.
                    </span>
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-white/46 sm:text-base">
                    This Marketing Disclaimer should be read together with the
                    Money Records Terms, Privacy Policy, Refund Policy, and the
                    description of the specific service you purchase.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    href="/terms"
                    variant="primary"
                    size="lg"
                    fullWidth
                  >
                    Terms
                  </Button>

                  <Button
                    href="/refund-policy"
                    variant="secondary"
                    size="lg"
                    fullWidth
                  >
                    Refund Policy
                  </Button>

                  <Button
                    href="/privacy"
                    variant="ghost"
                    size="lg"
                    fullWidth
                  >
                    Privacy
                  </Button>

                  <Button
                    href="/services"
                    variant="ghost"
                    size="lg"
                    fullWidth
                  >
                    Services
                  </Button>
                </div>
              </div>

              <Divider
                className="my-8"
                variant="soft"
              />

              <div className="flex flex-col gap-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  © {new Date().getFullYear()} {COMPANY_NAME}
                </span>

                <span>
                  {COMPANY_SHORT_NAME} · Record Label · Distribution ·
                  Marketing
                </span>
              </div>
            </Card>
          </section>
        </div>
      </Container>
    </div>
  );
}