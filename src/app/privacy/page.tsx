// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Privacy Policy                                       ┃
   ┃ File   : src/app/privacy/page.tsx                                    ┃
   ┃ Role   : Privacy disclosures, data practices, rights, and contact    ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";
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
  title: "Privacy Policy",

  description:
    "Read the Money Records LLC Privacy Policy explaining how information may be collected, used, stored, shared, and protected when using Money Records websites, services, campaign forms, artist submissions, and checkout experiences.",

  keywords: [
    "Money Records privacy policy",
    "Money Records LLC privacy",
    "music marketing privacy policy",
    "artist submission privacy",
    "music distribution privacy",
    "campaign checkout privacy",
    "data privacy",
  ],

  alternates: {
    canonical:
      "/privacy",
  },

  openGraph: {
    type: "website",

    title:
      "Privacy Policy | Money Records",

    description:
      "Learn how Money Records LLC handles information submitted through its website, services, campaigns, contact forms, and artist submissions.",

    url:
      "/privacy",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Privacy Policy | Money Records",

    description:
      "Privacy information for Money Records LLC website visitors, artists, customers, and business contacts.",
  },
};

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type PolicySectionProps = {
  number: string;
  title: string;
  children: ReactNode;
};

type PolicyBulletProps = {
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

function DataIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <ellipse
        cx="12"
        cy="6"
        rx="7"
        ry="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M5 6V12C5 13.7 8.1 15 12 15C15.9 15 19 13.7 19 12V6"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M5 12V18C5 19.7 8.1 21 12 21C15.9 21 19 19.7 19 18V12"
        stroke="currentColor"
        strokeWidth="1.7"
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

function LockIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M8 10V7.5C8 5.3 9.8 3.5 12 3.5C14.2 3.5 16 5.3 16 7.5V10"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="15"
        r="1.3"
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

function CookieIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <path
        d="M13.5 4.2C13.8 6.4 15.6 8.2 17.8 8.5C17.4 11 19 13.4 21 14.2C20.1 18.1 16.6 21 12.4 21C7.2 21 3 16.8 3 11.6C3 7.2 6.1 3.5 10.3 2.7C10.7 3.6 11.7 4.2 13.5 4.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <circle
        cx="8"
        cy="10"
        r="1"
        fill="currentColor"
      />

      <circle
        cx="11"
        cy="15"
        r="1"
        fill="currentColor"
      />

      <circle
        cx="7.5"
        cy="16.5"
        r="0.8"
        fill="currentColor"
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
/* Shared Components                                                      */
/* --------------------------------------------------------------------- */

function PolicyBullet({
  children,
}: PolicyBulletProps) {
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

function PolicySection({
  number,
  title,
  children,
}: PolicySectionProps) {
  return (
    <section
      id={`privacy-section-${number}`}
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
/* Privacy Page                                                           */
/* --------------------------------------------------------------------- */

export default function PrivacyPage() {
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
              <div className="max-w-4xl">
                <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] px-4 text-[8px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                  <ShieldIcon />
                  Privacy & Data Protection
                </span>

                <h1 className="mt-7 text-balance text-5xl font-black leading-[0.94] tracking-[-0.065em] text-[var(--mr-text)] sm:text-6xl lg:text-7xl">
                  Privacy{" "}
                  <span className="mr-text-gradient">
                    Policy.
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg font-black leading-8 tracking-[-0.025em] text-white/72 sm:text-xl">
                  This policy explains how Money Records LLC may collect, use,
                  store, disclose, and protect information when you interact
                  with our website and services.
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/46 sm:text-base">
                  It applies to website visitors, customers, artists,
                  applicants, campaign purchasers, business contacts, and
                  others who submit information through Money Records.
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

              <Card
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
              >
                <div className="relative">
                  <span className="grid h-14 w-14 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                    <LockIcon />
                  </span>

                  <p className="mt-6 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                    Our Approach
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
                    Use Data Responsibly.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/44">
                    Money Records uses information to operate the website,
                    process legitimate requests and transactions, provide
                    services, communicate with users, protect the platform, and
                    improve our operations.
                  </p>

                  <Divider
                    className="my-6"
                    variant="soft"
                  />

                  <div className="grid gap-3">
                    {[
                      "Information submitted through forms",
                      "Purchase and transaction information",
                      "Artist and release submission information",
                      "Technical and usage information",
                      "Customer-support communications",
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
          {/* Privacy Snapshot                                            */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="privacy-overview-heading"
            className="py-14 md:py-20"
          >
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Privacy Overview
              </p>

              <h2
                id="privacy-overview-heading"
                className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
              >
                The Information Behind{" "}
                <span className="mr-text-gradient">
                  Your Experience.
                </span>
              </h2>
            </div>

            <Divider
              className="my-8"
              variant="strong"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                icon={<UserIcon />}
                eyebrow="You Provide"
                title="Contact & Project Information"
                description="Names, email addresses, phone numbers, artist information, campaign details, release information, and other information you choose to submit."
              />

              <SummaryCard
                icon={<DataIcon />}
                eyebrow="Operations"
                title="Service & Transaction Data"
                description="Information related to campaign orders, checkout activity, customer support, submissions, and service fulfillment."
              />

              <SummaryCard
                icon={<CookieIcon />}
                eyebrow="Technology"
                title="Technical Information"
                description="Device, browser, IP, referral, interaction, diagnostic, security, and similar information may be processed by the site or service providers."
              />

              <SummaryCard
                icon={<ShieldIcon />}
                eyebrow="Protection"
                title="Security & Fraud Prevention"
                description="Information may be used to protect Money Records, customers, artists, payment activity, forms, accounts, and infrastructure."
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Policy Content                                              */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-label="Money Records Privacy Policy"
            className="pb-14 md:pb-20"
          >
            <div className="grid gap-8 xl:grid-cols-[300px_minmax(0,1fr)] xl:items-start">
              {/* ------------------------------------------------------- */}
              {/* Table of Contents                                       */}
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
                      Privacy Policy
                    </p>

                    <h2 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                      Contents
                    </h2>

                    <nav
                      aria-label="Privacy policy sections"
                      className="mt-6 grid gap-1"
                    >
                      {[
                        ["01", "Information We Collect"],
                        ["02", "How We Collect Information"],
                        ["03", "How We Use Information"],
                        ["04", "Artist Submissions"],
                        ["05", "Payments & Transactions"],
                        ["06", "Service Providers"],
                        ["07", "Cookies & Technology"],
                        ["08", "How Information May Be Shared"],
                        ["09", "Data Retention"],
                        ["10", "Security"],
                        ["11", "Your Privacy Choices"],
                        ["12", "Marketing Communications"],
                        ["13", "Third-Party Links"],
                        ["14", "Children's Privacy"],
                        ["15", "International Visitors"],
                        ["16", "Policy Changes"],
                        ["17", "Contact"],
                      ].map(([number, label]) => (
                        <a
                          key={number}
                          href={`#privacy-section-${number}`}
                          className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs text-white/42 transition hover:bg-white/[0.03] hover:text-[var(--mr-gold-200)]"
                        >
                          <span className="text-[8px] font-black text-white/20 transition group-hover:text-[var(--mr-gold-200)]">
                            {number}
                          </span>

                          {label}
                        </a>
                      ))}
                    </nav>
                  </div>
                </Card>
              </aside>

              {/* ------------------------------------------------------- */}
              {/* Main Policy                                             */}
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
                  <div className="rounded-[22px] border border-[rgba(227,179,77,0.14)] bg-[rgba(211,154,46,0.03)] p-5">
                    <p className="text-sm leading-7 text-white/48">
                      This Privacy Policy describes the general privacy
                      practices of <strong className="text-white/70">{COMPANY_NAME}</strong>{" "}
                      in connection with <strong className="text-white/70">{SITE_URL}</strong>{" "}
                      and related Money Records services, forms, campaign
                      purchasing experiences, artist submissions, and business
                      communications.
                    </p>
                  </div>

                  {/* --------------------------------------------------- */}
                  {/* 01                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="01"
                    title="Information We Collect"
                  >
                    <p>
                      The information we collect depends on how you interact
                      with Money Records. Information may include:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <PolicyBullet>
                        <strong className="text-white/65">
                          Contact information:
                        </strong>{" "}
                        name, email address, phone number, company name,
                        artist name, and other contact details.
                      </PolicyBullet>

                      <PolicyBullet>
                        <strong className="text-white/65">
                          Artist and release information:
                        </strong>{" "}
                        artist biography, genre, music links, streaming links,
                        release titles, release dates, social profiles,
                        audience information, career goals, and creative
                        materials.
                      </PolicyBullet>

                      <PolicyBullet>
                        <strong className="text-white/65">
                          Campaign information:
                        </strong>{" "}
                        selected services, campaign packages, platforms,
                        project details, URLs, artist information, campaign
                        instructions, and related materials.
                      </PolicyBullet>

                      <PolicyBullet>
                        <strong className="text-white/65">
                          Transaction information:
                        </strong>{" "}
                        order identifiers, purchased services, transaction
                        status, amounts, dates, billing-related information,
                        and information provided by payment processors.
                      </PolicyBullet>

                      <PolicyBullet>
                        <strong className="text-white/65">
                          Communications:
                        </strong>{" "}
                        messages sent through forms, email, support requests,
                        artist submissions, and other communications with
                        Money Records.
                      </PolicyBullet>

                      <PolicyBullet>
                        <strong className="text-white/65">
                          Technical information:
                        </strong>{" "}
                        IP address, browser information, device information,
                        operating system, referral information, timestamps,
                        diagnostic information, and website interaction data.
                      </PolicyBullet>
                    </ul>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 02                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="02"
                    title="How We Collect Information"
                  >
                    <p>
                      Information may be collected directly from you, through
                      website technology, or from service providers involved
                      in operating Money Records services.
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <PolicyBullet>
                        When you contact Money Records.
                      </PolicyBullet>

                      <PolicyBullet>
                        When you submit music for review.
                      </PolicyBullet>

                      <PolicyBullet>
                        When you purchase or request a campaign.
                      </PolicyBullet>

                      <PolicyBullet>
                        When you provide artist, release, or marketing details.
                      </PolicyBullet>

                      <PolicyBullet>
                        When you communicate with customer support.
                      </PolicyBullet>

                      <PolicyBullet>
                        Automatically through website, security, analytics,
                        hosting, or similar technologies where applicable.
                      </PolicyBullet>
                    </ul>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 03                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="03"
                    title="How We Use Information"
                  >
                    <p>
                      Money Records may use information for legitimate
                      business and operational purposes, including:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <PolicyBullet>
                        Operating and maintaining the Money Records website.
                      </PolicyBullet>

                      <PolicyBullet>
                        Processing campaign purchases and service requests.
                      </PolicyBullet>

                      <PolicyBullet>
                        Reviewing music and artist submissions.
                      </PolicyBullet>

                      <PolicyBullet>
                        Communicating about orders, campaigns, submissions,
                        distribution inquiries, and business requests.
                      </PolicyBullet>

                      <PolicyBullet>
                        Providing customer support.
                      </PolicyBullet>

                      <PolicyBullet>
                        Performing campaign, marketing, distribution, or
                        artist-development services.
                      </PolicyBullet>

                      <PolicyBullet>
                        Maintaining business records.
                      </PolicyBullet>

                      <PolicyBullet>
                        Preventing fraud, abuse, automated spam, unauthorized
                        activity, and security threats.
                      </PolicyBullet>

                      <PolicyBullet>
                        Improving website functionality, services, and customer
                        experience.
                      </PolicyBullet>

                      <PolicyBullet>
                        Complying with contractual, regulatory, tax, legal, or
                        other obligations where applicable.
                      </PolicyBullet>
                    </ul>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 04                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="04"
                    title="Artist and Music Submissions"
                  >
                    <p>
                      If you submit music to Money Records, we may process the
                      information you provide so the submission can be
                      reviewed and so we can determine whether there may be a
                      relevant label, distribution, artist-development,
                      marketing, or other opportunity.
                    </p>

                    <p>
                      Submission information may include music links, artist
                      names, biographies, social links, streaming profiles,
                      release information, audience metrics, goals, contact
                      information, and additional messages.
                    </p>

                    <p>
                      Submitting material does not by itself create an artist,
                      management, distribution, publishing, marketing,
                      partnership, employment, or other contractual
                      relationship with Money Records.
                    </p>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 05                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="05"
                    title="Payments and Transactions"
                  >
                    <p>
                      Money Records may use third-party payment processors to
                      process campaign purchases and other transactions.
                    </p>

                    <p>
                      Money Records does not need to receive or store your full
                      payment-card number in order to process a transaction
                      when a payment processor handles that information
                      directly.
                    </p>

                    <p>
                      We may receive transaction-related information such as
                      payment status, order identifiers, transaction amount,
                      billing contact details, purchased services, and related
                      payment metadata necessary to administer the order.
                    </p>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 06                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="06"
                    title="Service Providers"
                  >
                    <p>
                      Money Records may use third-party companies and
                      infrastructure providers to operate portions of the
                      website and services.
                    </p>

                    <p>
                      Depending on the feature you use, these providers may
                      assist with areas such as:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <PolicyBullet>
                        Website hosting and deployment.
                      </PolicyBullet>

                      <PolicyBullet>
                        Database and backend infrastructure.
                      </PolicyBullet>

                      <PolicyBullet>
                        Payment processing.
                      </PolicyBullet>

                      <PolicyBullet>
                        Transactional email delivery.
                      </PolicyBullet>

                      <PolicyBullet>
                        Fraud and security prevention.
                      </PolicyBullet>

                      <PolicyBullet>
                        Analytics, diagnostics, and site performance.
                      </PolicyBullet>

                      <PolicyBullet>
                        Campaign fulfillment and business operations.
                      </PolicyBullet>
                    </ul>

                    <p>
                      These providers may process information only as needed
                      to provide their services or as otherwise permitted by
                      their applicable agreements and policies.
                    </p>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 07                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="07"
                    title="Cookies and Similar Technologies"
                  >
                    <p>
                      Money Records and its service providers may use cookies,
                      local storage, session storage, pixels, logs, or similar
                      technologies to operate and protect the website.
                    </p>

                    <p>
                      These technologies may be used for functions such as:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <PolicyBullet>
                        Remembering campaign-cart selections.
                      </PolicyBullet>

                      <PolicyBullet>
                        Maintaining site preferences.
                      </PolicyBullet>

                      <PolicyBullet>
                        Supporting security and fraud prevention.
                      </PolicyBullet>

                      <PolicyBullet>
                        Measuring website performance.
                      </PolicyBullet>

                      <PolicyBullet>
                        Understanding how website features are used.
                      </PolicyBullet>
                    </ul>

                    <p>
                      Browser settings may allow you to block or delete some
                      cookies or stored website information. Certain features
                      may not operate correctly if required technologies are
                      disabled.
                    </p>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 08                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="08"
                    title="How Information May Be Shared"
                  >
                    <p>
                      Money Records does not need to publicly disclose your
                      private information in order to provide most services.
                      Information may nevertheless be shared in limited
                      circumstances, including:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <PolicyBullet>
                        With service providers that help operate the website,
                        payments, databases, communication systems, or
                        services.
                      </PolicyBullet>

                      <PolicyBullet>
                        With contractors or business partners involved in
                        fulfilling a service you requested.
                      </PolicyBullet>

                      <PolicyBullet>
                        When necessary to investigate fraud, abuse, security
                        issues, chargebacks, or prohibited conduct.
                      </PolicyBullet>

                      <PolicyBullet>
                        When required to respond to valid legal process or
                        applicable legal obligations.
                      </PolicyBullet>

                      <PolicyBullet>
                        As part of a corporate transaction involving Money
                        Records, such as a merger, acquisition,
                        reorganization, financing, or sale of assets.
                      </PolicyBullet>

                      <PolicyBullet>
                        When you authorize or direct us to share information.
                      </PolicyBullet>
                    </ul>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 09                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="09"
                    title="Data Retention"
                  >
                    <p>
                      Money Records may retain information for as long as
                      reasonably necessary for the purpose it was collected,
                      including providing services, maintaining transaction or
                      business records, resolving disputes, protecting the
                      platform, enforcing agreements, or satisfying applicable
                      obligations.
                    </p>

                    <p>
                      Retention periods may vary depending on the type of
                      information, the service involved, operational needs,
                      contractual requirements, and legal requirements.
                    </p>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 10                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="10"
                    title="Security"
                  >
                    <p>
                      Money Records uses administrative, technical, and
                      operational measures intended to help protect
                      information against unauthorized access, alteration,
                      misuse, loss, or disclosure.
                    </p>

                    <p>
                      No website, database, transmission method, storage
                      system, or third-party service can be guaranteed to be
                      completely secure.
                    </p>

                    <p>
                      You should not submit passwords, full payment-card
                      numbers, Social Security numbers, banking passwords,
                      account credentials, or other highly sensitive secrets
                      through public Money Records contact or artist-submission
                      forms.
                    </p>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 11                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="11"
                    title="Your Privacy Choices"
                  >
                    <p>
                      Depending on your location and the circumstances, you
                      may have privacy-related choices or rights regarding
                      personal information.
                    </p>

                    <p>
                      You may contact Money Records to request assistance with
                      matters such as:
                    </p>

                    <ul className="grid gap-3 pl-0">
                      <PolicyBullet>
                        Updating inaccurate contact information.
                      </PolicyBullet>

                      <PolicyBullet>
                        Asking what information you previously submitted.
                      </PolicyBullet>

                      <PolicyBullet>
                        Requesting deletion of certain information where
                        appropriate.
                      </PolicyBullet>

                      <PolicyBullet>
                        Opting out of certain promotional communications.
                      </PolicyBullet>

                      <PolicyBullet>
                        Asking questions about how your information is handled.
                      </PolicyBullet>
                    </ul>

                    <p>
                      Money Records may need to verify your identity before
                      completing certain requests, and some information may
                      need to be retained where appropriate for transaction,
                      security, contractual, or legal reasons.
                    </p>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 12                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="12"
                    title="Marketing Communications"
                  >
                    <p>
                      Money Records may communicate with customers, artists,
                      applicants, or business contacts regarding services,
                      submissions, transactions, projects, opportunities, or
                      related company information.
                    </p>

                    <p>
                      Where promotional communications provide an unsubscribe
                      or opt-out method, you may use that method to stop
                      receiving those promotional messages.
                    </p>

                    <p>
                      Transactional or service-related communications may still
                      be sent when reasonably necessary to administer a
                      purchase, request, submission, support matter, or
                      business relationship.
                    </p>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 13                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="13"
                    title="Third-Party Websites and Platforms"
                  >
                    <p>
                      Money Records pages may contain links to streaming
                      platforms, social networks, payment providers, artist
                      websites, publications, external services, or other
                      third-party websites.
                    </p>

                    <p>
                      Those services operate under their own terms, privacy
                      practices, and security controls. Money Records does not
                      control the privacy practices of third-party websites
                      merely because a link appears on our website.
                    </p>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 14                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="14"
                    title="Children's Privacy"
                  >
                    <p>
                      Money Records services are not designed as child-directed
                      services. Individuals who are not legally able to enter
                      into applicable transactions or agreements should use
                      Money Records services only with appropriate involvement
                      from a parent, guardian, or other authorized adult where
                      required.
                    </p>

                    <p>
                      If you believe a child has provided personal information
                      through the website inappropriately, contact Money
                      Records so the matter can be reviewed.
                    </p>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 15                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="15"
                    title="International Visitors"
                  >
                    <p>
                      Money Records may be accessed by visitors outside the
                      United States. Information may therefore be processed in
                      the United States or in other locations where Money
                      Records or its service providers operate.
                    </p>

                    <p>
                      Privacy rules can vary by jurisdiction. If you have
                      questions about how your information is handled, contact
                      Money Records using the information below.
                    </p>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 16                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="16"
                    title="Changes to This Privacy Policy"
                  >
                    <p>
                      Money Records may update this Privacy Policy from time to
                      time as the website, services, technology, business
                      practices, or legal requirements evolve.
                    </p>

                    <p>
                      When the policy is updated, the revised version may be
                      posted on this page with a new effective or
                      last-updated date.
                    </p>

                    <p>
                      Continued use of Money Records services after a revised
                      policy is posted may be subject to the updated policy as
                      permitted by applicable requirements.
                    </p>
                  </PolicySection>

                  {/* --------------------------------------------------- */}
                  {/* 17                                                  */}
                  {/* --------------------------------------------------- */}

                  <PolicySection
                    number="17"
                    title="Contact Money Records"
                  >
                    <p>
                      Questions about this Privacy Policy or information you
                      have submitted to Money Records may be directed to:
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
                    </div>
                  </PolicySection>
                </div>
              </Card>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Important Notice                                            */}
          {/* ----------------------------------------------------------- */}

          <section className="pb-14 md:pb-20">
            <Card
              padding="lg"
              className="relative overflow-hidden"
            >
              <div className="relative flex items-start gap-4">
                <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]">
                  <ShieldIcon />
                </span>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                    Privacy Notice
                  </p>

                  <h2 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                    Protect Sensitive Information
                  </h2>

                  <p className="mt-4 max-w-4xl text-sm leading-7 text-white/44">
                    Do not place passwords, private account credentials, full
                    payment-card numbers, Social Security numbers, or banking
                    passwords inside Money Records contact, campaign, or
                    artist-submission forms.
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

              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="max-w-3xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Customer Protection
                  </p>

                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                    Review the{" "}
                    <span className="mr-text-gradient">
                      Full Policies.
                    </span>
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-white/46 sm:text-base">
                    Privacy is one part of the Money Records customer
                    protection framework. Review the terms, refund policy, and
                    marketing disclosures before purchasing a service.
                  </p>
                </div>

                <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-[420px]">
                  <Button
                    href="/terms"
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowIcon />}
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
            </Card>
          </section>
        </div>
      </Container>
    </div>
  );
}