// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Refund Policy                                        ┃
   ┃ File   : src/app/refund-policy/page.tsx                              ┃
   ┃ Role   : Refunds, cancellations, campaign disputes, and billing       ┃
   ┃          resolution for Money Records services                        ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
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
  title: "Refund Policy",

  description:
    "Review the Money Records LLC Refund Policy covering campaign cancellations, music marketing services, partial refunds, completed services, payment disputes, platform changes, and refund processing.",

  keywords: [
    "Money Records refund policy",
    "Money Records refund",
    "music marketing refund policy",
    "music promotion refund",
    "campaign cancellation",
    "Spotify campaign refund",
    "music marketing cancellation",
    "Money Records customer support",
    "Money Records campaign refund",
  ],

  alternates: {
    canonical:
      "/refund-policy",
  },

  openGraph: {
    type:
      "website",

    title:
      "Refund Policy | Money Records",

    description:
      "Review Money Records refund, cancellation, campaign, and payment-dispute policies before purchasing a service.",

    url:
      "/refund-policy",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Refund Policy | Money Records",

    description:
      "Refund and cancellation information for Money Records campaigns and services.",
  },
};

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type RefundSectionProps = {
  number: string;
  title: string;
  children: ReactNode;
};

type RefundBulletProps = {
  children: ReactNode;
};

type SummaryCardProps = {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
};

type ScenarioCardProps = {
  number: string;
  title: string;
  status: string;
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

function RefundIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <path
        d="M7.5 7H17C19.2 7 21 8.8 21 11C21 13.2 19.2 15 17 15H8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M10 4.5L7 7L10 9.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M13 19.5H7C4.8 19.5 3 17.7 3 15.5C3 13.3 4.8 11.5 7 11.5H16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M14 9L17 11.5L14 14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
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

function ClockIcon(): ReactNode {
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
        d="M12 7V12L15.5 14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CampaignIcon(): ReactNode {
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

function CheckCircleIcon(): ReactNode {
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
        d="M8.2 12L10.8 14.6L16.2 9.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
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

function DocumentIcon(): ReactNode {
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
/* Refund Bullet                                                          */
/* --------------------------------------------------------------------- */

function RefundBullet({
  children,
}: RefundBulletProps) {
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
/* Refund Section                                                         */
/* --------------------------------------------------------------------- */

function RefundSection({
  number,
  title,
  children,
}: RefundSectionProps) {
  return (
    <section
      id={`refund-section-${number}`}
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
/* Scenario Card                                                          */
/* --------------------------------------------------------------------- */

function ScenarioCard({
  number,
  title,
  status,
  description,
}: ScenarioCardProps) {
  return (
    <div className="relative rounded-[22px] border border-white/[0.065] bg-white/[0.022] p-5">
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[9px] font-black text-[var(--mr-gold-200)]">
          {number}
        </span>

        <span className="inline-flex min-h-7 items-center rounded-full border border-white/[0.07] bg-white/[0.025] px-3 text-[8px] font-black uppercase tracking-[0.12em] text-white/40">
          {status}
        </span>
      </div>

      <h3 className="mt-5 text-base font-black tracking-[-0.025em] text-[var(--mr-text)]">
        {title}
      </h3>

      <p className="mt-3 text-xs leading-6 text-white/40">
        {description}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Refund Policy Page                                                     */
/* --------------------------------------------------------------------- */

export default function RefundPolicyPage() {
  const tableOfContents = [
    ["01", "Purpose of This Policy"],
    ["02", "Scope"],
    ["03", "General Refund Principles"],
    ["04", "Cancellation Before Work Begins"],
    ["05", "After Campaign Work Begins"],
    ["06", "Completed Services"],
    ["07", "Partial Refunds"],
    ["08", "Duplicate Charges"],
    ["09", "Unauthorized Transactions"],
    ["10", "Payment or Technical Errors"],
    ["11", "Unable to Deliver a Service"],
    ["12", "Platform Rejection or Changes"],
    ["13", "Customer Delays or Missing Information"],
    ["14", "Campaign Performance"],
    ["15", "Third-Party Costs"],
    ["16", "Custom and Creative Work"],
    ["17", "Distribution-Related Services"],
    ["18", "Refund Requests"],
    ["19", "Refund Review"],
    ["20", "Approved Refunds"],
    ["21", "Refund Timing"],
    ["22", "Original Payment Method"],
    ["23", "Chargebacks and Disputes"],
    ["24", "Fraud or Abuse"],
    ["25", "Consumer Rights"],
    ["26", "Policy Updates"],
    ["27", "Contact Money Records"],
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
              {/* ------------------------------------------------------- */}
              {/* Hero Content                                            */}
              {/* ------------------------------------------------------- */}

              <div className="max-w-4xl">
                <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] px-4 text-[8px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                  <RefundIcon />
                  Customer Protection
                </span>

                <h1 className="mt-7 text-balance text-5xl font-black leading-[0.94] tracking-[-0.065em] text-[var(--mr-text)] sm:text-6xl lg:text-7xl">
                  Refund{" "}
                  <span className="mr-text-gradient">
                    Policy.
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg font-black leading-8 tracking-[-0.025em] text-white/72 sm:text-xl">
                  This policy explains how Money Records reviews
                  cancellations, refund requests, duplicate charges,
                  incomplete services, campaign disputes, and related payment
                  issues.
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/46 sm:text-base">
                  Because Money Records sells professional services rather
                  than physical products, refund eligibility can depend on
                  whether work has started, how much work has been completed,
                  and whether third-party resources have already been
                  committed.
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
                    href="/contact"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowIcon />}
                    className="w-full sm:w-auto"
                  >
                    Request Support
                  </Button>

                  <Button
                    href="/terms"
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Review Terms
                  </Button>
                </div>
              </div>

              {/* ------------------------------------------------------- */}
              {/* Core Policy                                             */}
              {/* ------------------------------------------------------- */}

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
                    <ShieldIcon />
                  </span>

                  <p className="mt-6 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                    Core Policy
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
                    Refunds Depend on Service Status.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/44">
                    Refund requests are evaluated based on the service
                    purchased, whether work has begun, work already completed,
                    committed resources, third-party costs, and the reason for
                    the request.
                  </p>

                  <Divider
                    className="my-6"
                    variant="soft"
                  />

                  <div className="grid gap-3">
                    {[
                      "Contact us as soon as a problem occurs",
                      "Unstarted work is easier to cancel",
                      "Started work may qualify for a partial refund",
                      "Completed services are reviewed differently",
                      "Duplicate and verified billing errors are investigated",
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
          {/* Refund Overview                                             */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="refund-overview-heading"
            className="py-14 md:py-20"
          >
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Refund Overview
              </p>

              <h2
                id="refund-overview-heading"
                className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
              >
                The Earlier You Contact Us,{" "}
                <span className="mr-text-gradient">
                  the More Options We Have.
                </span>
              </h2>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-white/46 sm:text-base">
                Campaigns and professional services can involve planning,
                outreach, creative work, staffing, platform preparation, and
                third-party costs. Contacting Money Records promptly allows
                the team to review what work has already occurred.
              </p>
            </div>

            <Divider
              className="my-8"
              variant="strong"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                icon={<ClockIcon />}
                eyebrow="Before Work Begins"
                title="Cancellation Review"
                description="Orders canceled before meaningful work or third-party commitments begin generally provide the greatest flexibility for a refund."
              />

              <SummaryCard
                icon={<CampaignIcon />}
                eyebrow="Campaign Started"
                title="Partial Review"
                description="Once campaign work has started, the completed work and committed costs may be considered when determining any refund."
              />

              <SummaryCard
                icon={<CheckCircleIcon />}
                eyebrow="Service Completed"
                title="Fulfilled Work"
                description="A completed service is not automatically refundable solely because the customer hoped for a different marketing result."
              />

              <SummaryCard
                icon={<PaymentIcon />}
                eyebrow="Billing Problems"
                title="Payment Review"
                description="Duplicate transactions, verified unauthorized charges, and payment-processing errors should be reported promptly for review."
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Common Scenarios                                            */}
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
                  Common Situations
                </p>

                <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                  How Different Requests{" "}
                  <span className="mr-text-gradient">
                    May Be Reviewed.
                  </span>
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/46 sm:text-base">
                  These examples are general guidelines. The actual outcome
                  depends on the specific transaction and applicable rights.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <ScenarioCard
                    number="01"
                    title="Campaign Has Not Started"
                    status="Review Available"
                    description="Contact Money Records immediately. If work and external commitments have not begun, cancellation may be easier to accommodate."
                  />

                  <ScenarioCard
                    number="02"
                    title="Campaign Is Partially Complete"
                    status="Partial Review"
                    description="Any refund may take into account work already performed, resources committed, and third-party costs already incurred."
                  />

                  <ScenarioCard
                    number="03"
                    title="Campaign Is Complete"
                    status="Limited"
                    description="Completed professional services are generally evaluated based on whether the purchased service was delivered, not solely on the customer's preferred outcome."
                  />

                  <ScenarioCard
                    number="04"
                    title="Duplicate Charge"
                    status="Investigate"
                    description="Provide the transaction information so Money Records can investigate whether the same order was accidentally charged more than once."
                  />

                  <ScenarioCard
                    number="05"
                    title="Money Records Cannot Deliver"
                    status="Resolution"
                    description="If Money Records cannot reasonably provide an accepted service, the company may offer a refund, partial refund, service credit, or mutually agreed alternative as appropriate."
                  />

                  <ScenarioCard
                    number="06"
                    title="Results Differ From Expectations"
                    status="Not Automatic"
                    description="Marketing performance alone does not automatically determine refund eligibility when the purchased promotional service was performed."
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Main Policy                                                 */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-label="Money Records Refund Policy"
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
                      Refund Policy
                    </p>

                    <h2 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                      Contents
                    </h2>

                    <nav
                      aria-label="Refund Policy sections"
                      className="mt-6 grid gap-1"
                    >
                      {tableOfContents.map(
                        ([number, label]) => (
                          <a
                            key={number}
                            href={`#refund-section-${number}`}
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
              {/* Policy Document                                         */}
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
                      This Refund Policy applies to eligible purchases made
                      directly from{" "}
                      <strong className="text-white/70">
                        {COMPANY_NAME}
                      </strong>{" "}
                      through{" "}
                      <strong className="text-white/70">
                        {SITE_URL}
                      </strong>{" "}
                      or another authorized Money Records payment process,
                      unless a separate written agreement contains different
                      refund or cancellation terms.
                    </p>
                  </div>

                  {/* --------------------------------------------------- */}
                  {/* 01                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="01"
                    title="Purpose of This Policy"
                  >
                    <p>
                      This Refund Policy explains how Money Records reviews
                      requests involving cancellations, refunds, partial
                      refunds, billing errors, campaign issues, and payment
                      disputes.
                    </p>

                    <p>
                      Money Records primarily provides professional and
                      promotional services. Unlike a physical product that can
                      simply be returned unused, a service may involve work,
                      staffing, campaign preparation, outreach, creative work,
                      research, vendor commitments, or platform activity that
                      cannot be reversed after it occurs.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 02                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="02"
                    title="Scope"
                  >
                    <p>
                      This policy may apply to Money Records services such as:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <RefundBullet>
                        Spotify and streaming marketing.
                      </RefundBullet>

                      <RefundBullet>
                        Apple Music campaigns.
                      </RefundBullet>

                      <RefundBullet>
                        Instagram marketing.
                      </RefundBullet>

                      <RefundBullet>
                        TikTok campaigns.
                      </RefundBullet>

                      <RefundBullet>
                        YouTube marketing.
                      </RefundBullet>

                      <RefundBullet>
                        SoundCloud marketing.
                      </RefundBullet>

                      <RefundBullet>
                        VEVO-related services.
                      </RefundBullet>

                      <RefundBullet>
                        Press and public-relations services.
                      </RefundBullet>

                      <RefundBullet>
                        Radio promotion.
                      </RefundBullet>

                      <RefundBullet>
                        Artist branding.
                      </RefundBullet>

                      <RefundBullet>
                        Release strategy.
                      </RefundBullet>

                      <RefundBullet>
                        Distribution-related services.
                      </RefundBullet>

                      <RefundBullet>
                        Other services purchased directly from Money Records.
                      </RefundBullet>
                    </ul>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 03                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="03"
                    title="General Refund Principles"
                  >
                    <p>
                      Refund requests are reviewed individually based on the
                      facts of the transaction.
                    </p>

                    <p>
                      Factors may include:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <RefundBullet>
                        The service purchased.
                      </RefundBullet>

                      <RefundBullet>
                        Whether Money Records accepted the order.
                      </RefundBullet>

                      <RefundBullet>
                        Whether campaign or service work has begun.
                      </RefundBullet>

                      <RefundBullet>
                        The amount of work already completed.
                      </RefundBullet>

                      <RefundBullet>
                        Whether third-party costs have been incurred.
                      </RefundBullet>

                      <RefundBullet>
                        Whether resources have already been committed.
                      </RefundBullet>

                      <RefundBullet>
                        Whether the customer provided usable campaign
                        information.
                      </RefundBullet>

                      <RefundBullet>
                        Whether Money Records was able to perform the purchased
                        service.
                      </RefundBullet>

                      <RefundBullet>
                        The reason for the refund request.
                      </RefundBullet>

                      <RefundBullet>
                        Applicable contractual or legal requirements.
                      </RefundBullet>
                    </ul>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 04                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="04"
                    title="Cancellation Before Work Begins"
                  >
                    <p>
                      If you want to cancel an order, contact Money Records as
                      soon as possible.
                    </p>

                    <p>
                      Requests received before meaningful campaign work,
                      service preparation, vendor commitments, or third-party
                      expenditures begin generally provide the greatest
                      flexibility for cancellation or refund consideration.
                    </p>

                    <p>
                      A payment being completed does not necessarily mean that
                      campaign work has already started. However, some services
                      may begin shortly after payment and required campaign
                      information are received.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 05                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="05"
                    title="Refunds After Campaign or Service Work Begins"
                  >
                    <p>
                      Once work begins, a full refund may no longer be
                      appropriate because Money Records may have already
                      performed work or committed resources.
                    </p>

                    <p>
                      Depending on the circumstances, Money Records may review
                      whether a partial refund, service credit, campaign
                      adjustment, replacement service, or another resolution
                      is appropriate.
                    </p>

                    <p>
                      Work that has already been reasonably performed is not
                      automatically reversed merely because the customer later
                      chooses to cancel the campaign.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 06                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="06"
                    title="Completed Services"
                  >
                    <p>
                      Services that have been substantially or fully completed
                      are generally reviewed based on whether the purchased
                      service was performed.
                    </p>

                    <p>
                      A completed marketing campaign is not automatically
                      refundable solely because:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <RefundBullet>
                        The song did not become viral.
                      </RefundBullet>

                      <RefundBullet>
                        The artist expected more streams.
                      </RefundBullet>

                      <RefundBullet>
                        The customer expected more views.
                      </RefundBullet>

                      <RefundBullet>
                        Audience growth was lower than hoped.
                      </RefundBullet>

                      <RefundBullet>
                        A platform algorithm did not react as expected.
                      </RefundBullet>

                      <RefundBullet>
                        A playlist, editor, publication, station, or platform
                        did not provide a desired outcome.
                      </RefundBullet>

                      <RefundBullet>
                        Revenue or sales did not increase as expected.
                      </RefundBullet>
                    </ul>

                    <p>
                      This section should be read together with the{" "}
                      <Link
                        href="/marketing-disclaimer"
                        className="font-bold text-[var(--mr-gold-200)] transition hover:text-[var(--mr-gold-100)]"
                      >
                        Marketing Disclaimer
                      </Link>
                      .
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 07                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="07"
                    title="Partial Refunds"
                  >
                    <p>
                      When appropriate, Money Records may issue a partial refund
                      rather than a full refund.
                    </p>

                    <p>
                      A partial refund may be considered when part of a service
                      has already been completed or when part of the purchased
                      service can no longer be delivered.
                    </p>

                    <p>
                      The amount of any partial refund may reflect the
                      circumstances of the order, including completed work and
                      the undelivered portion of the service.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 08                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="08"
                    title="Duplicate Charges"
                  >
                    <p>
                      If you believe the same purchase was accidentally charged
                      more than once, contact Money Records promptly.
                    </p>

                    <p>
                      Provide enough information to identify the transactions,
                      such as:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <RefundBullet>
                        Customer name.
                      </RefundBullet>

                      <RefundBullet>
                        Email address used at checkout.
                      </RefundBullet>

                      <RefundBullet>
                        Approximate purchase date.
                      </RefundBullet>

                      <RefundBullet>
                        Order or transaction reference.
                      </RefundBullet>

                      <RefundBullet>
                        Amount charged.
                      </RefundBullet>
                    </ul>

                    <p>
                      Verified duplicate billing errors may be corrected by
                      refunding the duplicate transaction where appropriate.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 09                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="09"
                    title="Unauthorized Transactions"
                  >
                    <p>
                      If you believe a payment method was used without your
                      authorization, notify Money Records and your financial
                      institution promptly.
                    </p>

                    <p>
                      Money Records may review transaction information,
                      checkout information, communications, device or security
                      information where available, campaign details, and other
                      relevant records when investigating the transaction.
                    </p>

                    <p>
                      Money Records may also cooperate with its payment
                      processor, card network, financial institution, or other
                      relevant provider as appropriate.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 10                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="10"
                    title="Payment or Technical Errors"
                  >
                    <p>
                      If a technical or payment-processing error results in an
                      incorrect charge, contact Money Records so the
                      transaction can be reviewed.
                    </p>

                    <p>
                      Examples may include:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <RefundBullet>
                        Duplicate processing.
                      </RefundBullet>

                      <RefundBullet>
                        Incorrect transaction amount.
                      </RefundBullet>

                      <RefundBullet>
                        Checkout failure followed by an unexpected charge.
                      </RefundBullet>

                      <RefundBullet>
                        Other identifiable payment-processing errors.
                      </RefundBullet>
                    </ul>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 11                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="11"
                    title="When Money Records Cannot Deliver a Service"
                  >
                    <p>
                      If Money Records accepts a paid service but later
                      determines that the service cannot reasonably be
                      delivered, Money Records may provide an appropriate
                      resolution.
                    </p>

                    <p>
                      Depending on the circumstances, a resolution may include:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <RefundBullet>
                        A full refund.
                      </RefundBullet>

                      <RefundBullet>
                        A partial refund.
                      </RefundBullet>

                      <RefundBullet>
                        An alternative service.
                      </RefundBullet>

                      <RefundBullet>
                        Campaign credit.
                      </RefundBullet>

                      <RefundBullet>
                        A revised campaign approach.
                      </RefundBullet>

                      <RefundBullet>
                        Another mutually agreed solution.
                      </RefundBullet>
                    </ul>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 12                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="12"
                    title="Third-Party Platform Rejection or Changes"
                  >
                    <p>
                      Some services depend on platforms, publishers, media
                      companies, curators, radio organizations, distribution
                      systems, or other third parties.
                    </p>

                    <p>
                      A third-party decision does not automatically mean that
                      Money Records failed to perform a service.
                    </p>

                    <p>
                      If a platform rejection or material platform change makes
                      the remaining purchased service impossible to perform,
                      Money Records may evaluate whether an alternative,
                      partial refund, credit, or other resolution is
                      appropriate.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 13                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="13"
                    title="Customer Delays, Missing Information, or Inaccessible Content"
                  >
                    <p>
                      Customers are responsible for providing reasonably
                      accurate and usable information required to perform a
                      purchased service.
                    </p>

                    <p>
                      Campaign delays or inability to perform caused by missing
                      or unusable customer information may affect refund
                      eligibility.
                    </p>

                    <p>
                      Examples include:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <RefundBullet>
                        Broken song or campaign links.
                      </RefundBullet>

                      <RefundBullet>
                        Private or inaccessible content.
                      </RefundBullet>

                      <RefundBullet>
                        Incorrect artist or account information.
                      </RefundBullet>

                      <RefundBullet>
                        Missing promotional assets.
                      </RefundBullet>

                      <RefundBullet>
                        Failure to provide required campaign information.
                      </RefundBullet>

                      <RefundBullet>
                        Significant customer delays after repeated requests for
                        necessary information.
                      </RefundBullet>
                    </ul>

                    <p>
                      Money Records may attempt to contact the customer before
                      determining how to proceed.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 14                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="14"
                    title="Campaign Performance and Customer Expectations"
                  >
                    <p>
                      Marketing performance is not fully within Money Records&apos;
                      control.
                    </p>

                    <p>
                      Campaign results can depend on factors such as:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <RefundBullet>
                        Music quality and audience fit.
                      </RefundBullet>

                      <RefundBullet>
                        Creative assets.
                      </RefundBullet>

                      <RefundBullet>
                        Release timing.
                      </RefundBullet>

                      <RefundBullet>
                        Audience behavior.
                      </RefundBullet>

                      <RefundBullet>
                        Platform algorithms.
                      </RefundBullet>

                      <RefundBullet>
                        Market competition.
                      </RefundBullet>

                      <RefundBullet>
                        Artist momentum.
                      </RefundBullet>

                      <RefundBullet>
                        Targeting.
                      </RefundBullet>

                      <RefundBullet>
                        Campaign size and duration.
                      </RefundBullet>

                      <RefundBullet>
                        Third-party platform changes.
                      </RefundBullet>
                    </ul>

                    <p>
                      Dissatisfaction with a result that was never guaranteed
                      does not by itself establish that the underlying service
                      was not provided.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 15                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="15"
                    title="Third-Party Costs and Committed Resources"
                  >
                    <p>
                      Some services may involve third-party advertising,
                      outreach, distribution, media, vendor, platform,
                      production, processing, or other external costs.
                    </p>

                    <p>
                      When evaluating a cancellation or refund request, Money
                      Records may consider external costs that have already
                      been reasonably committed or incurred in connection with
                      the customer&apos;s service, to the extent permitted by
                      applicable requirements and the applicable agreement.
                    </p>

                    <p>
                      Where Money Records is able to recover an external cost,
                      that fact may be considered when reviewing the
                      resolution.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 16                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="16"
                    title="Custom, Creative, and Strategy Work"
                  >
                    <p>
                      Custom services may include strategy, campaign planning,
                      artist branding, creative preparation, press materials,
                      consultation, research, release planning, or other work
                      created specifically for a customer.
                    </p>

                    <p>
                      Once substantial custom work has been performed, the
                      completed portion may not be refundable merely because
                      the customer later changes direction.
                    </p>

                    <p>
                      If a custom project is canceled before completion, Money
                      Records may review the completed and uncompleted portions
                      separately.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 17                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="17"
                    title="Distribution-Related Services"
                  >
                    <p>
                      Distribution-related projects can involve metadata
                      preparation, release review, asset preparation, platform
                      delivery, rights review, release scheduling, and other
                      work.
                    </p>

                    <p>
                      Refund eligibility may depend on the stage of the release
                      process and whether platform delivery or third-party
                      processing has already begun.
                    </p>

                    <p>
                      Distribution acceptance, royalties, ownership,
                      accounting, takedowns, and commercial arrangements may
                      also be governed by a separate distribution agreement.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 18                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="18"
                    title="How to Request a Refund"
                  >
                    <p>
                      Contact Money Records using the official contact page or
                      email address.
                    </p>

                    <p>
                      Include enough information for the team to identify and
                      review the transaction.
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <RefundBullet>
                        Your full name.
                      </RefundBullet>

                      <RefundBullet>
                        Email address used for the order.
                      </RefundBullet>

                      <RefundBullet>
                        Artist or company name, if applicable.
                      </RefundBullet>

                      <RefundBullet>
                        Order or transaction reference, if available.
                      </RefundBullet>

                      <RefundBullet>
                        Service purchased.
                      </RefundBullet>

                      <RefundBullet>
                        Approximate purchase date.
                      </RefundBullet>

                      <RefundBullet>
                        Amount paid.
                      </RefundBullet>

                      <RefundBullet>
                        Reason for the request.
                      </RefundBullet>

                      <RefundBullet>
                        Any relevant supporting information.
                      </RefundBullet>
                    </ul>

                    <div className="mt-5">
                      <Button
                        href="/contact"
                        variant="secondary"
                        size="md"
                        rightIcon={<ArrowIcon />}
                      >
                        Contact Support
                      </Button>
                    </div>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 19                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="19"
                    title="Refund Review"
                  >
                    <p>
                      Submission of a refund request does not automatically
                      mean that the request has been approved.
                    </p>

                    <p>
                      Money Records may review records reasonably related to
                      the transaction, including:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <RefundBullet>
                        Order information.
                      </RefundBullet>

                      <RefundBullet>
                        Payment records.
                      </RefundBullet>

                      <RefundBullet>
                        Campaign status.
                      </RefundBullet>

                      <RefundBullet>
                        Work logs.
                      </RefundBullet>

                      <RefundBullet>
                        Customer communications.
                      </RefundBullet>

                      <RefundBullet>
                        Platform or vendor activity.
                      </RefundBullet>

                      <RefundBullet>
                        Submitted campaign information.
                      </RefundBullet>

                      <RefundBullet>
                        Other relevant fulfillment records.
                      </RefundBullet>
                    </ul>

                    <p>
                      Money Records may contact you for additional information
                      before completing its review.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 20                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="20"
                    title="Approved Refunds"
                  >
                    <p>
                      If a refund is approved, Money Records may issue either a
                      full or partial refund depending on the decision.
                    </p>

                    <p>
                      The customer may receive confirmation when the refund has
                      been initiated.
                    </p>

                    <p>
                      A refund being initiated by Money Records does not mean
                      the customer&apos;s bank or payment provider will display
                      the credit immediately.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 21                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="21"
                    title="Refund Processing Time"
                  >
                    <p>
                      After Money Records initiates an approved card refund,
                      the payment processor sends the refund request to the
                      relevant card network, bank, or card issuer.
                    </p>

                    <p>
                      The time required for the credit to become visible can
                      vary by payment method, card network, bank, and issuer.
                    </p>

                    <p>
                      For card refunds processed through Stripe, a successfully
                      initiated refund will commonly appear to the customer
                      approximately five to ten business days later, depending
                      on the issuing bank. Some refunds may instead appear as a
                      reversal of the original charge.
                    </p>

                    <p>
                      If a refund has been confirmed by Money Records but has
                      not appeared after a reasonable processing period,
                      contact Money Records or the financial institution used
                      for the transaction.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 22                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="22"
                    title="Original Payment Method"
                  >
                    <p>
                      Refunds are generally returned through the original
                      payment method used for the transaction.
                    </p>

                    <p>
                      Money Records will not normally redirect a card refund to
                      an unrelated card, bank account, cryptocurrency wallet,
                      payment application, or other destination.
                    </p>

                    <p>
                      If the original payment method is no longer active,
                      processing may depend on the payment provider, card
                      issuer, or financial institution.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 23                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="23"
                    title="Chargebacks and Payment Disputes"
                  >
                    <p>
                      If you believe there is a billing or service problem,
                      Money Records encourages you to contact the company so
                      the issue can be reviewed.
                    </p>

                    <p>
                      Filing a payment dispute or chargeback does not prevent
                      Money Records from responding to the payment processor or
                      financial institution with relevant records.
                    </p>

                    <p>
                      Money Records may provide information such as:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <RefundBullet>
                        Order confirmation.
                      </RefundBullet>

                      <RefundBullet>
                        Checkout records.
                      </RefundBullet>

                      <RefundBullet>
                        Transaction information.
                      </RefundBullet>

                      <RefundBullet>
                        Customer communications.
                      </RefundBullet>

                      <RefundBullet>
                        Campaign intake information.
                      </RefundBullet>

                      <RefundBullet>
                        Fulfillment records.
                      </RefundBullet>

                      <RefundBullet>
                        Relevant policy disclosures.
                      </RefundBullet>

                      <RefundBullet>
                        Other information reasonably related to the dispute.
                      </RefundBullet>
                    </ul>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 24                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="24"
                    title="Fraudulent, Abusive, or Misleading Refund Requests"
                  >
                    <p>
                      Money Records may reject requests that are materially
                      fraudulent, abusive, intentionally misleading, or based
                      on falsified transaction information.
                    </p>

                    <p>
                      Examples may include intentionally misrepresenting whether
                      a service was received, submitting altered documentation,
                      falsely claiming a known transaction was unauthorized, or
                      attempting to receive duplicate reimbursement for the
                      same payment.
                    </p>

                    <p>
                      Money Records may suspend or refuse future service in
                      cases involving material payment fraud or abuse, subject
                      to applicable requirements.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 25                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="25"
                    title="Consumer Rights"
                  >
                    <p>
                      This Refund Policy is intended to explain Money Records&apos;
                      standard commercial practices. It does not eliminate or
                      waive consumer protections or other rights that cannot
                      lawfully be waived.
                    </p>

                    <p>
                      Where applicable law requires a refund, cancellation,
                      remedy, or other consumer protection that differs from
                      this policy, the applicable requirement controls.
                    </p>

                    <p>
                      Customers may also have rights through their card issuer
                      or financial institution in situations involving
                      qualifying billing errors or unauthorized transactions.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 26                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="26"
                    title="Changes to This Refund Policy"
                  >
                    <p>
                      Money Records may update this Refund Policy as services,
                      payment systems, campaign operations, third-party
                      platforms, business practices, or applicable
                      requirements evolve.
                    </p>

                    <p>
                      The current version may be posted on this page with an
                      updated effective or last-updated date.
                    </p>

                    <p>
                      Changes generally apply prospectively unless otherwise
                      required or agreed.
                    </p>
                  </RefundSection>

                  {/* --------------------------------------------------- */}
                  {/* 27                                                  */}
                  {/* --------------------------------------------------- */}

                  <RefundSection
                    number="27"
                    title="Contact Money Records"
                  >
                    <p>
                      Questions about a refund, duplicate transaction,
                      cancellation, campaign problem, or billing matter may be
                      directed to:
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
                  </RefundSection>
                </div>
              </Card>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Refund Flow                                                 */}
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
                className="pointer-events-none absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full bg-[rgba(227,179,77,0.09)] blur-[145px]"
              />

              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  Refund Request Process
                </p>

                <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                  From Request to{" "}
                  <span className="mr-text-gradient">
                    Resolution.
                  </span>
                </h2>

                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-[22px] border border-white/[0.065] bg-white/[0.022] p-5">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[9px] font-black text-[var(--mr-gold-200)]">
                      01
                    </span>

                    <h3 className="mt-5 text-base font-black text-[var(--mr-text)]">
                      Contact Money Records
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-white/40">
                      Send your order information and explain the issue or
                      reason for the refund request.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/[0.065] bg-white/[0.022] p-5">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[9px] font-black text-[var(--mr-gold-200)]">
                      02
                    </span>

                    <h3 className="mt-5 text-base font-black text-[var(--mr-text)]">
                      Transaction Review
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-white/40">
                      The team reviews payment records, service status,
                      fulfillment, and relevant communications.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/[0.065] bg-white/[0.022] p-5">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[9px] font-black text-[var(--mr-gold-200)]">
                      03
                    </span>

                    <h3 className="mt-5 text-base font-black text-[var(--mr-text)]">
                      Resolution
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-white/40">
                      Money Records determines the appropriate resolution based
                      on the circumstances and applicable policy.
                    </p>
                  </div>

                  <div className="rounded-[22px] border border-white/[0.065] bg-white/[0.022] p-5">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[9px] font-black text-[var(--mr-gold-200)]">
                      04
                    </span>

                    <h3 className="mt-5 text-base font-black text-[var(--mr-text)]">
                      Refund Processing
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-white/40">
                      If approved, the refund is initiated through the
                      applicable payment process and returned through the
                      supported payment method.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Campaign Results Notice                                     */}
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
                    Important Distinction
                  </p>

                  <h2 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)] sm:text-2xl">
                    Service Delivery and Campaign Results Are Different.
                  </h2>

                  <p className="mt-4 max-w-4xl text-sm leading-7 text-white/44">
                    A campaign can be properly performed without producing
                    every result a customer hoped to achieve. Refund review
                    focuses on the purchased service and circumstances, while
                    campaign performance remains subject to the disclosures in
                    the Money Records Marketing Disclaimer.
                  </p>
                </div>

                <Button
                  href="/marketing-disclaimer"
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowIcon />}
                  className="w-full lg:w-auto"
                >
                  Marketing Disclaimer
                </Button>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Payment Protection                                          */}
          {/* ----------------------------------------------------------- */}

          <section className="pb-14 md:pb-20">
            <Card
              padding="lg"
              className="relative overflow-hidden"
            >
              <div className="relative grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
                <div>
                  <span className="grid h-14 w-14 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                    <PaymentIcon />
                  </span>

                  <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                    Payment Protection
                  </p>

                  <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl">
                    Keep Your Order Information.
                  </h2>
                </div>

                <div>
                  <p className="text-sm leading-7 text-white/45">
                    Keep your payment confirmation, order details, email
                    communications, campaign information, and other records
                    related to the purchase. These records can help resolve
                    billing questions, campaign issues, or refund requests
                    more efficiently.
                  </p>

                  <p className="mt-4 text-sm leading-7 text-white/45">
                    Contact Money Records promptly when something appears
                    incorrect rather than waiting until campaign work has
                    progressed substantially.
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
                    Review the Policies{" "}
                    <span className="mr-text-gradient">
                      Before You Purchase.
                    </span>
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-white/46 sm:text-base">
                    The Refund Policy works together with the Money Records
                    Terms, Privacy Policy, Marketing Disclaimer, and the
                    description of the specific service being purchased.
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
                    href="/privacy"
                    variant="secondary"
                    size="lg"
                    fullWidth
                  >
                    Privacy
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