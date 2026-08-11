// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Terms of Service                                     ┃
   ┃ File   : src/app/terms/page.tsx                                      ┃
   ┃ Role   : Website, campaign, submission, payment, and service terms   ┃
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
  title: "Terms of Service",

  description:
    "Read the Money Records LLC Terms of Service covering website use, music marketing services, campaign purchases, artist submissions, distribution inquiries, payments, intellectual property, refunds, and customer responsibilities.",

  keywords: [
    "Money Records terms",
    "Money Records LLC terms of service",
    "music marketing terms",
    "music distribution terms",
    "artist submission terms",
    "music promotion terms",
    "campaign terms",
    "Money Records policies",
  ],

  alternates: {
    canonical:
      "/terms",
  },

  openGraph: {
    type: "website",

    title:
      "Terms of Service | Money Records",

    description:
      "Terms governing use of Money Records websites, campaigns, submissions, distribution inquiries, purchases, and services.",

    url:
      "/terms",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Terms of Service | Money Records",

    description:
      "Review the terms governing Money Records website use, campaigns, artist submissions, payments, and services.",
  },
};

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type TermsSectionProps = {
  number: string;
  title: string;
  children: ReactNode;
};

type TermsBulletProps = {
  children: ReactNode;
};

type SummaryCardProps = {
  icon: ReactNode;
  eyebrow: string;
  title: string;
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

function ContractIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <path
        d="M7 3.5H14L18 7.5V20.5H7V3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M14 3.5V8H18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M10 12H15M10 15H15M10 18H13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PaymentIcon(): ReactNode {
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
        y="5"
        width="17"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M4 9H20"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M7 15H11"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
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

function MarketingIcon(): ReactNode {
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

function RightsIcon(): ReactNode {
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
        d="M15.5 9.5C14.8 8.5 13.7 8 12.3 8C10 8 8.5 9.6 8.5 12C8.5 14.4 10 16 12.3 16C13.7 16 14.8 15.5 15.5 14.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon(): ReactNode {
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

function AlertIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
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
/* Terms Bullet                                                           */
/* --------------------------------------------------------------------- */

function TermsBullet({
  children,
}: TermsBulletProps) {
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
/* Terms Section                                                          */
/* --------------------------------------------------------------------- */

function TermsSection({
  number,
  title,
  children,
}: TermsSectionProps) {
  return (
    <section
      id={`terms-section-${number}`}
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
/* Terms Page                                                             */
/* --------------------------------------------------------------------- */

export default function TermsPage() {
  const tableOfContents = [
    ["01", "Acceptance of Terms"],
    ["02", "Eligibility"],
    ["03", "Money Records Services"],
    ["04", "Campaign Purchases"],
    ["05", "Marketing Results"],
    ["06", "Pricing & Checkout"],
    ["07", "Payment Processing"],
    ["08", "Order Information"],
    ["09", "Campaign Timing"],
    ["10", "Refunds & Cancellations"],
    ["11", "Chargebacks & Payment Disputes"],
    ["12", "Artist Submissions"],
    ["13", "Distribution Requests"],
    ["14", "Your Content & Materials"],
    ["15", "Rights & Permissions"],
    ["16", "Money Records Intellectual Property"],
    ["17", "Third-Party Platforms"],
    ["18", "Prohibited Use"],
    ["19", "Suspension or Refusal of Service"],
    ["20", "Communications"],
    ["21", "Disclaimers"],
    ["22", "Limitation of Liability"],
    ["23", "Indemnification"],
    ["24", "Changes to Services"],
    ["25", "Changes to These Terms"],
    ["26", "Governing Rules & Disputes"],
    ["27", "Severability"],
    ["28", "Entire Agreement"],
    ["29", "Contact"],
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
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[1100px] w-[1600px] max-w-[132vw] -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.05)] blur-[220px]"
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
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.82),transparent)]"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
              {/* ------------------------------------------------------- */}
              {/* Hero Content                                            */}
              {/* ------------------------------------------------------- */}

              <div className="max-w-4xl">
                <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] px-4 text-[8px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                  <ContractIcon />
                  Customer & Service Agreement
                </span>

                <h1 className="mt-7 text-balance text-5xl font-black leading-[0.94] tracking-[-0.065em] text-[var(--mr-text)] sm:text-6xl lg:text-7xl">
                  Terms of{" "}
                  <span className="mr-text-gradient">
                    Service.
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg font-black leading-8 tracking-[-0.025em] text-white/72 sm:text-xl">
                  These Terms govern use of Money Records websites, music
                  marketing services, campaign purchases, artist submissions,
                  distribution requests, and related services.
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/46 sm:text-base">
                  Please review these Terms before purchasing a campaign,
                  submitting music, requesting distribution, or otherwise
                  using Money Records services.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="inline-flex min-h-9 items-center rounded-full border border-white/[0.075] bg-white/[0.025] px-4 text-[9px] font-black uppercase tracking-[0.13em] text-white/42">
                    Effective: {EFFECTIVE_DATE}
                  </span>

                  <span className="inline-flex min-h-9 items-center rounded-full border border-white/[0.075] bg-white/[0.025] px-4 text-[9px] font-black uppercase tracking-[0.13em] text-white/42">
                    Updated: {LAST_UPDATED}
                  </span>
                </div>
              </div>

              {/* ------------------------------------------------------- */}
              {/* Agreement Card                                          */}
              {/* ------------------------------------------------------- */}

              <Card
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full bg-[rgba(227,179,77,0.08)] blur-[110px]"
                />

                <div className="relative">
                  <span className="grid h-14 w-14 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                    <ShieldIcon />
                  </span>

                  <p className="mt-6 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                    Before You Continue
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
                    Know What You&apos;re Purchasing.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/44">
                    Money Records provides services and campaign execution.
                    Unless specifically stated in a written agreement, we do
                    not guarantee a particular number of streams, views,
                    followers, sales, placements, press articles, radio spins,
                    revenue, or other outcome.
                  </p>

                  <Divider
                    className="my-6"
                    variant="soft"
                  />

                  <div className="grid gap-3">
                    {[
                      "Review service details before checkout",
                      "Provide accurate campaign information",
                      "Submit only material you have authority to use",
                      "Review the refund policy before purchase",
                      "Do not interpret estimates as guarantees",
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
          {/* Overview Cards                                              */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="terms-overview-heading"
            className="py-14 md:py-20"
          >
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Agreement Overview
              </p>

              <h2
                id="terms-overview-heading"
                className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
              >
                Built Around{" "}
                <span className="mr-text-gradient">
                  Clear Expectations.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/46 sm:text-base">
                The terms below apply across the Money Records website and
                service ecosystem unless a separate written agreement states
                otherwise.
              </p>
            </div>

            <Divider
              className="my-8"
              variant="strong"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                icon={<MarketingIcon />}
                eyebrow="Campaigns"
                title="Services, Not Guarantees"
                description="Campaign execution and promotional services do not guarantee specific audience, platform, revenue, placement, or performance results."
              />

              <SummaryCard
                icon={<PaymentIcon />}
                eyebrow="Purchases"
                title="Review Before Checkout"
                description="Customers are responsible for reviewing the selected service, price, campaign requirements, and applicable policies before paying."
              />

              <SummaryCard
                icon={<MusicIcon />}
                eyebrow="Submissions"
                title="Rights Matter"
                description="Artists must have the rights, licenses, or authority necessary to submit music, artwork, links, and related materials."
              />

              <SummaryCard
                icon={<ShieldIcon />}
                eyebrow="Protection"
                title="Professional Use"
                description="The Money Records website and services may not be used for fraud, abuse, impersonation, infringement, or unlawful activity."
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Main Terms                                                  */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-label="Money Records Terms of Service"
            className="pb-14 md:pb-20"
          >
            <div className="grid gap-8 xl:grid-cols-[310px_minmax(0,1fr)] xl:items-start">
              {/* ------------------------------------------------------- */}
              {/* Contents                                                */}
              {/* ------------------------------------------------------- */}

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
                      Terms of Service
                    </p>

                    <h2 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                      Contents
                    </h2>

                    <nav
                      aria-label="Terms of Service sections"
                      className="mt-6 grid gap-1"
                    >
                      {tableOfContents.map(
                        ([number, label]) => (
                          <a
                            key={number}
                            href={`#terms-section-${number}`}
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

              {/* ------------------------------------------------------- */}
              {/* Terms Document                                          */}
              {/* ------------------------------------------------------- */}

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
                      These Terms of Service (&quot;Terms&quot;) form an
                      agreement between you and{" "}
                      <strong className="text-white/70">
                        {COMPANY_NAME}
                      </strong>{" "}
                      regarding your use of{" "}
                      <strong className="text-white/70">
                        {SITE_URL}
                      </strong>{" "}
                      and Money Records services.
                    </p>
                  </div>

                  {/* --------------------------------------------------- */}
                  {/* 01                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="01"
                    title="Acceptance of Terms"
                  >
                    <p>
                      By accessing the Money Records website, purchasing a
                      service, submitting music, requesting distribution,
                      sending an inquiry, or otherwise using Money Records
                      services, you acknowledge these Terms and agree to comply
                      with them to the extent applicable to your use of the
                      services.
                    </p>

                    <p>
                      If you do not agree with these Terms, do not purchase a
                      service or submit materials through the website.
                    </p>

                    <p>
                      Additional written agreements, campaign descriptions,
                      order terms, or policies may apply to particular
                      services. If a separately executed written agreement
                      expressly conflicts with these Terms, that agreement
                      controls with respect to the specific subject it covers.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 02                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="02"
                    title="Eligibility"
                  >
                    <p>
                      You may use Money Records services only if you have the
                      legal capacity and authority required to enter into the
                      applicable transaction or arrangement.
                    </p>

                    <p>
                      If you are acting for an artist, company, label, manager,
                      client, or other organization, you represent that you
                      have authority to act on that party&apos;s behalf for the
                      relevant request.
                    </p>

                    <p>
                      Individuals who are not legally able to enter into an
                      applicable transaction should use Money Records only with
                      appropriate involvement from a parent, guardian, or other
                      authorized adult where required.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 03                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="03"
                    title="Money Records Services"
                  >
                    <p>
                      Money Records may offer services involving music
                      marketing, artist development, distribution, release
                      planning, branding, press, social media, streaming
                      platforms, video platforms, radio, and other music or
                      entertainment-related activities.
                    </p>

                    <p>
                      Service availability can vary over time. A service
                      displayed on the website does not create an obligation
                      to accept every order or project.
                    </p>

                    <p>
                      Money Records may request additional information or
                      materials before beginning or completing a service.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 04                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="04"
                    title="Campaign Purchases"
                  >
                    <p>
                      When purchasing a marketing or promotional service, you
                      are responsible for reviewing the service description,
                      selected platform, scope, price, campaign requirements,
                      and other information displayed before checkout.
                    </p>

                    <p>
                      A campaign order may require information such as:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <TermsBullet>
                        Artist or brand name.
                      </TermsBullet>

                      <TermsBullet>
                        Song, release, video, profile, or campaign URL.
                      </TermsBullet>

                      <TermsBullet>
                        Release information.
                      </TermsBullet>

                      <TermsBullet>
                        Social or streaming links.
                      </TermsBullet>

                      <TermsBullet>
                        Artwork or promotional assets.
                      </TermsBullet>

                      <TermsBullet>
                        Targeting or campaign preferences.
                      </TermsBullet>

                      <TermsBullet>
                        Other information reasonably needed to perform the
                        selected service.
                      </TermsBullet>
                    </ul>

                    <p>
                      Incomplete, inaccessible, inaccurate, or late campaign
                      information can delay fulfillment.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 05                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="05"
                    title="Marketing Results and Performance"
                  >
                    <p>
                      Unless Money Records expressly agrees otherwise in a
                      signed written agreement, marketing and promotional
                      services are provided as services rather than guarantees
                      of a specific outcome.
                    </p>

                    <p>
                      Money Records does not promise or guarantee any specific:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <TermsBullet>
                        Number of streams or listeners.
                      </TermsBullet>

                      <TermsBullet>
                        Number of followers, likes, comments, views, saves,
                        shares, or subscribers.
                      </TermsBullet>

                      <TermsBullet>
                        Playlist placement.
                      </TermsBullet>

                      <TermsBullet>
                        Editorial playlist placement.
                      </TermsBullet>

                      <TermsBullet>
                        Search ranking or recommendation placement.
                      </TermsBullet>

                      <TermsBullet>
                        Press article or publication placement.
                      </TermsBullet>

                      <TermsBullet>
                        Radio spins or rotation.
                      </TermsBullet>

                      <TermsBullet>
                        VEVO or platform approval.
                      </TermsBullet>

                      <TermsBullet>
                        Sales, royalties, income, or revenue.
                      </TermsBullet>

                      <TermsBullet>
                        Record deal, distribution deal, management deal, or
                        other industry opportunity.
                      </TermsBullet>

                      <TermsBullet>
                        Viral performance or audience growth.
                      </TermsBullet>
                    </ul>

                    <p>
                      Campaign performance may be affected by the music,
                      creative materials, artist profile, audience, targeting,
                      release timing, platform systems, competing content,
                      geographic markets, campaign scope, platform changes,
                      audience behavior, and other circumstances outside Money
                      Records&apos; direct control.
                    </p>

                    <p>
                      Any examples, projections, ranges, previous results, or
                      campaign estimates should not be interpreted as a
                      promise that another campaign will produce the same
                      result.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 06                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="06"
                    title="Pricing and Checkout"
                  >
                    <p>
                      Prices displayed at checkout apply to the selected
                      service at the time the order is placed, unless otherwise
                      stated.
                    </p>

                    <p>
                      Money Records may change service pricing, packaging,
                      availability, or campaign scope for future purchases.
                    </p>

                    <p>
                      Price changes do not automatically change the amount of a
                      previously completed order unless the customer and Money
                      Records separately agree to modify that order.
                    </p>

                    <p>
                      Taxes, fees, currency conversion, bank charges, or other
                      transaction costs may apply depending on the payment
                      method or location.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 07                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="07"
                    title="Payment Processing"
                  >
                    <p>
                      Money Records may use third-party payment processors to
                      process transactions.
                    </p>

                    <p>
                      By submitting payment information to a payment processor,
                      you authorize the applicable transaction and agree that
                      the information provided is accurate and that you are
                      authorized to use the payment method.
                    </p>

                    <p>
                      The payment processor may apply its own terms, privacy
                      practices, security controls, verification procedures,
                      fraud controls, and transaction requirements.
                    </p>

                    <p>
                      Money Records may receive transaction information
                      necessary to administer an order, including transaction
                      identifiers, payment status, amounts, billing contact
                      information, and related payment metadata.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 08                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="08"
                    title="Order and Campaign Information"
                  >
                    <p>
                      You are responsible for providing accurate and usable
                      information required to perform the purchased service.
                    </p>

                    <p>
                      You should verify all submitted URLs, artist names,
                      account names, release titles, campaign instructions, and
                      other details before submitting an order.
                    </p>

                    <p>
                      Money Records is not responsible for delays or
                      misdirection caused by inaccurate information provided
                      by the customer where the service was reasonably
                      performed using that information.
                    </p>

                    <p>
                      If information changes after purchase, contact Money
                      Records as soon as possible. Changes may not always be
                      possible after campaign work has started.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 09                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="09"
                    title="Campaign and Service Timing"
                  >
                    <p>
                      Campaign and fulfillment timing may vary based on the
                      purchased service, platform, project complexity,
                      customer responsiveness, third-party review,
                      availability, and other operational factors.
                    </p>

                    <p>
                      Any estimated start date, completion date, processing
                      window, campaign duration, or turnaround time is an
                      estimate unless a signed written agreement expressly
                      guarantees a specific deadline.
                    </p>

                    <p>
                      Third-party platform delays, outages, reviews,
                      moderation, policy changes, or technical issues can
                      affect timing.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 10                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="10"
                    title="Refunds and Cancellations"
                  >
                    <p>
                      Refunds and cancellations are governed by the Money
                      Records{" "}
                      <Link
                        href="/refund-policy"
                        className="font-bold text-[var(--mr-gold-200)] transition hover:text-[var(--mr-gold-100)]"
                      >
                        Refund Policy
                      </Link>
                      .
                    </p>

                    <p>
                      Customers should review the Refund Policy before
                      purchasing a service.
                    </p>

                    <p>
                      Because certain campaign work may begin shortly after an
                      order is accepted, cancellation or refund eligibility may
                      depend on whether work has already started, resources
                      have already been committed, third-party costs have been
                      incurred, or the service has already been delivered in
                      whole or in part.
                    </p>

                    <p>
                      Nothing in these Terms eliminates any non-waivable
                      consumer right that applies to a transaction.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 11                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="11"
                    title="Chargebacks and Payment Disputes"
                  >
                    <p>
                      If you believe there is a billing problem, duplicate
                      charge, unauthorized transaction, or service issue,
                      contact Money Records promptly so the matter can be
                      reviewed.
                    </p>

                    <p>
                      Money Records may provide transaction records, order
                      information, communications, fulfillment evidence,
                      campaign records, acceptance records, and other relevant
                      information to a payment processor, financial
                      institution, or dispute-resolution provider when
                      responding to a payment dispute.
                    </p>

                    <p>
                      Fraudulent or intentionally false payment disputes may
                      result in suspension or refusal of future services,
                      subject to applicable law.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 12                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="12"
                    title="Artist and Music Submissions"
                  >
                    <p>
                      Money Records may allow artists or authorized
                      representatives to submit music for review.
                    </p>

                    <p>
                      A submission does not guarantee:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <TermsBullet>
                        Signing to Money Records.
                      </TermsBullet>

                      <TermsBullet>
                        Artist representation.
                      </TermsBullet>

                      <TermsBullet>
                        Distribution.
                      </TermsBullet>

                      <TermsBullet>
                        Marketing approval.
                      </TermsBullet>

                      <TermsBullet>
                        Funding or investment.
                      </TermsBullet>

                      <TermsBullet>
                        A meeting or response.
                      </TermsBullet>

                      <TermsBullet>
                        Any particular opportunity or commercial relationship.
                      </TermsBullet>
                    </ul>

                    <p>
                      Submitting music does not by itself create a label,
                      management, publishing, distribution, marketing,
                      employment, agency, joint venture, partnership, or
                      fiduciary relationship.
                    </p>

                    <p>
                      Artists should maintain their own copies of all submitted
                      materials.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 13                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="13"
                    title="Distribution Requests"
                  >
                    <p>
                      Requests for music distribution are subject to review,
                      rights verification, platform requirements, content
                      requirements, project eligibility, available
                      distribution arrangements, and any additional agreement
                      required for the release.
                    </p>

                    <p>
                      Submitting a release does not guarantee delivery to every
                      digital service provider or territory.
                    </p>

                    <p>
                      Money Records may decline material that presents rights,
                      fraud, impersonation, metadata, platform-policy,
                      technical, content, or other material concerns.
                    </p>

                    <p>
                      Distribution rights, royalty arrangements, accounting,
                      ownership, takedown procedures, term length, and other
                      commercial terms should be governed by the applicable
                      distribution agreement when one is entered.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 14                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="14"
                    title="Your Content and Materials"
                  >
                    <p>
                      You retain whatever ownership rights you otherwise hold
                      in music, artwork, photographs, logos, videos, artist
                      information, links, text, and other materials you submit
                      to Money Records.
                    </p>

                    <p>
                      To the extent necessary to perform a service you request,
                      you authorize Money Records and relevant service
                      providers to access, reproduce, format, transmit,
                      display, deliver, or otherwise use submitted materials
                      for the limited purpose of reviewing, administering,
                      performing, promoting, or completing the requested
                      service.
                    </p>

                    <p>
                      This service-related authorization does not transfer
                      ownership of your underlying intellectual property to
                      Money Records unless a separate written agreement
                      expressly provides otherwise.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 15                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="15"
                    title="Rights, Licenses, and Permissions"
                  >
                    <p>
                      You represent that you have the rights, permissions,
                      licenses, or authority necessary for the materials and
                      instructions you provide to Money Records.
                    </p>

                    <p>
                      This includes, where applicable:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <TermsBullet>
                        Sound recording rights.
                      </TermsBullet>

                      <TermsBullet>
                        Composition or publishing permissions.
                      </TermsBullet>

                      <TermsBullet>
                        Sample and interpolation clearances.
                      </TermsBullet>

                      <TermsBullet>
                        Beat or instrumental licenses.
                      </TermsBullet>

                      <TermsBullet>
                        Featured artist permissions.
                      </TermsBullet>

                      <TermsBullet>
                        Artwork and photography permissions.
                      </TermsBullet>

                      <TermsBullet>
                        Trademark, logo, and brand permissions.
                      </TermsBullet>

                      <TermsBullet>
                        Rights necessary to promote the artist or project.
                      </TermsBullet>
                    </ul>

                    <p>
                      Money Records may request documentation supporting your
                      rights to submitted material.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 16                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="16"
                    title="Money Records Intellectual Property"
                  >
                    <p>
                      The Money Records name, logos, branding, website design,
                      graphics, proprietary text, layout, software, campaign
                      systems, original website materials, and related
                      intellectual property are owned by or licensed to Money
                      Records unless otherwise indicated.
                    </p>

                    <p>
                      You may not copy, reproduce, impersonate, republish,
                      scrape, distribute, modify, sell, or commercially exploit
                      protected Money Records materials without authorization,
                      except where applicable law expressly permits the use.
                    </p>

                    <p>
                      References to third-party artist names, platform names,
                      logos, trademarks, or services remain subject to the
                      rights of their respective owners.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 17                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="17"
                    title="Third-Party Platforms and Services"
                  >
                    <p>
                      Money Records services may interact with or reference
                      third-party platforms such as streaming services, social
                      networks, video platforms, payment processors, media
                      outlets, radio organizations, publications, technology
                      providers, and other outside services.
                    </p>

                    <p>
                      Third-party companies control their own platforms,
                      algorithms, eligibility standards, policies, moderation,
                      availability, approval processes, and technical systems.
                    </p>

                    <p>
                      Money Records does not control a third-party platform
                      merely because a Money Records service involves or
                      references that platform.
                    </p>

                    <p>
                      Customers and artists remain responsible for complying
                      with applicable third-party account and platform rules.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 18                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="18"
                    title="Prohibited Use"
                  >
                    <p>
                      You may not use Money Records services, systems, forms,
                      checkout, submissions, or website functionality to:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <TermsBullet>
                        Commit fraud or facilitate unlawful conduct.
                      </TermsBullet>

                      <TermsBullet>
                        Impersonate another person, artist, business, or rights
                        holder.
                      </TermsBullet>

                      <TermsBullet>
                        Submit material you know you do not have authority to
                        use.
                      </TermsBullet>

                      <TermsBullet>
                        Distribute malware, malicious code, or harmful
                        technical content.
                      </TermsBullet>

                      <TermsBullet>
                        Attempt unauthorized access to accounts, servers,
                        databases, payment systems, or infrastructure.
                      </TermsBullet>

                      <TermsBullet>
                        Abuse, overload, scrape, reverse engineer, or disrupt
                        website systems in an unauthorized manner.
                      </TermsBullet>

                      <TermsBullet>
                        Submit materially false campaign or payment
                        information.
                      </TermsBullet>

                      <TermsBullet>
                        Use the services in a manner that infringes another
                        party&apos;s intellectual property or other legal
                        rights.
                      </TermsBullet>
                    </ul>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 19                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="19"
                    title="Suspension, Rejection, or Refusal of Service"
                  >
                    <p>
                      Money Records may reject, pause, cancel, or refuse a
                      project or service where reasonably necessary because of
                      suspected fraud, rights concerns, policy concerns,
                      abusive conduct, inaccurate information, unlawful
                      activity, technical limitations, platform restrictions,
                      safety concerns, non-payment, or inability to reasonably
                      perform the requested service.
                    </p>

                    <p>
                      Any refund or financial adjustment arising from a
                      cancellation will be determined under the applicable
                      agreement, payment circumstances, and{" "}
                      <Link
                        href="/refund-policy"
                        className="font-bold text-[var(--mr-gold-200)] transition hover:text-[var(--mr-gold-100)]"
                      >
                        Refund Policy
                      </Link>
                      .
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 20                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="20"
                    title="Electronic Communications"
                  >
                    <p>
                      By submitting an inquiry, artist submission, campaign
                      order, support request, or other communication, you
                      authorize Money Records to respond using the contact
                      information you provide.
                    </p>

                    <p>
                      Transactional communications may include order
                      confirmations, campaign questions, service notices,
                      submission confirmations, payment-related information,
                      support messages, and other communications reasonably
                      related to your request.
                    </p>

                    <p>
                      Promotional communications may be subject to separate
                      consent or opt-out mechanisms where applicable.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 21                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="21"
                    title="Disclaimers"
                  >
                    <p>
                      To the extent permitted by applicable law, the website
                      and services are provided on an &quot;as available&quot;
                      basis.
                    </p>

                    <p>
                      Money Records does not warrant that every website
                      feature, third-party platform, campaign system, payment
                      provider, distribution destination, or other service will
                      operate continuously or without interruption.
                    </p>

                    <p>
                      Music and marketing performance involves factors outside
                      Money Records&apos; control. No statement on the website
                      should be interpreted as a guarantee of commercial
                      success unless that guarantee is expressly contained in
                      a signed written agreement.
                    </p>

                    <p>
                      Additional campaign disclosures are provided in the{" "}
                      <Link
                        href="/marketing-disclaimer"
                        className="font-bold text-[var(--mr-gold-200)] transition hover:text-[var(--mr-gold-100)]"
                      >
                        Marketing Disclaimer
                      </Link>
                      .
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 22                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="22"
                    title="Limitation of Liability"
                  >
                    <p>
                      To the fullest extent permitted by applicable law, Money
                      Records will not be liable for indirect, incidental,
                      special, exemplary, punitive, or consequential damages
                      arising solely from use of the website or services where
                      such damages may lawfully be excluded.
                    </p>

                    <p>
                      This includes, where legally permitted, claimed losses
                      involving anticipated profits, audience growth,
                      opportunity, reputation, platform performance, or
                      business expectations that were not expressly guaranteed
                      in a written agreement.
                    </p>

                    <p>
                      Nothing in these Terms excludes or limits liability that
                      cannot lawfully be excluded or limited.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 23                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="23"
                    title="Indemnification"
                  >
                    <p>
                      To the extent permitted by applicable law, you agree to
                      be responsible for claims, losses, liabilities, or costs
                      arising from material you knowingly submit without
                      required rights or permissions, fraudulent activity,
                      intentional misuse of the services, or a material breach
                      of your representations under these Terms.
                    </p>

                    <p>
                      This provision does not require you to indemnify Money
                      Records for conduct for which indemnification cannot
                      legally be required.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 24                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="24"
                    title="Changes to Services"
                  >
                    <p>
                      Money Records may add, modify, discontinue, rename, or
                      restructure website features, services, campaign
                      packages, platforms, pricing, or fulfillment processes.
                    </p>

                    <p>
                      Changes generally apply to future use or purchases unless
                      the parties agree otherwise for an existing order.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 25                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="25"
                    title="Changes to These Terms"
                  >
                    <p>
                      Money Records may update these Terms as the company,
                      website, technology, payment systems, services, or
                      applicable requirements evolve.
                    </p>

                    <p>
                      The current version may be posted on this page with a
                      revised effective or last-updated date.
                    </p>

                    <p>
                      Material changes will apply as permitted by applicable
                      law and any existing contractual obligations.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 26                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="26"
                    title="Governing Rules and Disputes"
                  >
                    <p>
                      These Terms are governed by the laws applicable to Money
                      Records and the relevant transaction, subject to any
                      mandatory consumer protections or jurisdictional rules
                      that cannot lawfully be waived.
                    </p>

                    <p>
                      Before beginning formal proceedings, customers are
                      encouraged to contact Money Records regarding a service
                      or billing dispute so the company has an opportunity to
                      review the issue.
                    </p>

                    <p>
                      Any specific arbitration, venue, governing-law, or
                      dispute-resolution provision contained in a separately
                      executed written agreement will apply to that agreement
                      according to its terms.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 27                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="27"
                    title="Severability"
                  >
                    <p>
                      If a provision of these Terms is determined to be
                      invalid, unlawful, or unenforceable, the remaining
                      provisions will continue to apply to the extent legally
                      permitted.
                    </p>

                    <p>
                      An unenforceable provision should be interpreted or
                      limited only to the extent necessary to make it
                      enforceable where permitted.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 28                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="28"
                    title="Entire Agreement"
                  >
                    <p>
                      These Terms, together with incorporated policies,
                      service descriptions, checkout information, and any
                      applicable separately executed written agreement,
                      comprise the terms governing the relevant Money Records
                      website use or service relationship.
                    </p>

                    <p>
                      The{" "}
                      <Link
                        href="/privacy"
                        className="font-bold text-[var(--mr-gold-200)] transition hover:text-[var(--mr-gold-100)]"
                      >
                        Privacy Policy
                      </Link>
                      ,{" "}
                      <Link
                        href="/refund-policy"
                        className="font-bold text-[var(--mr-gold-200)] transition hover:text-[var(--mr-gold-100)]"
                      >
                        Refund Policy
                      </Link>
                      , and{" "}
                      <Link
                        href="/marketing-disclaimer"
                        className="font-bold text-[var(--mr-gold-200)] transition hover:text-[var(--mr-gold-100)]"
                      >
                        Marketing Disclaimer
                      </Link>{" "}
                      should be read together with these Terms where
                      applicable.
                    </p>
                  </TermsSection>

                  {/* --------------------------------------------------- */}
                  {/* 29                                                  */}
                  {/* --------------------------------------------------- */}

                  <TermsSection
                    number="29"
                    title="Contact Money Records"
                  >
                    <p>
                      Questions about these Terms, an order, campaign,
                      submission, distribution request, or other Money Records
                      service may be directed to:
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
                  </TermsSection>
                </div>
              </Card>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Marketing Notice                                            */}
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

              <div className="relative grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <span className="grid h-14 w-14 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                  <AlertIcon />
                </span>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                    Important Campaign Notice
                  </p>

                  <h2 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)] sm:text-2xl">
                    Campaign Services Do Not Equal Guaranteed Results.
                  </h2>

                  <p className="mt-4 max-w-4xl text-sm leading-7 text-white/44">
                    Buying a Money Records marketing service does not purchase
                    guaranteed streams, followers, sales, playlist placement,
                    editorial support, press, radio play, viral performance, or
                    any other specific commercial result unless a signed
                    written agreement expressly states otherwise.
                  </p>
                </div>

                <Button
                  href="/marketing-disclaimer"
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowIcon />}
                  className="w-full lg:w-auto"
                >
                  Full Disclaimer
                </Button>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Policy Network                                              */}
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
                    Know the Policies{" "}
                    <span className="mr-text-gradient">
                      Before You Purchase.
                    </span>
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-white/46 sm:text-base">
                    Money Records maintains separate policies addressing
                    privacy, refunds, campaign disclosures, and customer
                    responsibilities.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    href="/privacy"
                    variant="primary"
                    size="lg"
                    fullWidth
                  >
                    Privacy Policy
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
                    href="/marketing-disclaimer"
                    variant="ghost"
                    size="lg"
                    className="sm:col-span-2"
                    fullWidth
                  >
                    Marketing Disclaimer
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