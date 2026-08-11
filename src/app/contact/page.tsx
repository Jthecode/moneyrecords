// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Contact Page                                         ┃
   ┃ File   : src/app/contact/page.tsx                                    ┃
   ┃ Role   : Business inquiries, marketing requests, and label contact   ┃
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
import InquiryForm from "@/components/InquiryForm";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                    */
/* --------------------------------------------------------------------- */

export const dynamic = "force-static";

/* --------------------------------------------------------------------- */
/* Constants                                                              */
/* --------------------------------------------------------------------- */

const CONTACT_EMAIL =
  "info@moneyrecords.io";

const INSTAGRAM_URL =
  "https://instagram.com/kingpharaohreal";

const INSTAGRAM_HANDLE =
  "@kingpharaohreal";

/* --------------------------------------------------------------------- */
/* Metadata                                                               */
/* --------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Contact",

  description:
    "Contact Money Records for music marketing, artist development, distribution, VEVO, press, radio, branding, business partnerships, campaign support, and general inquiries.",

  keywords: [
    "contact Money Records",
    "Money Records contact",
    "music marketing inquiry",
    "artist development inquiry",
    "music distribution inquiry",
    "Spotify marketing inquiry",
    "Apple Music promotion",
    "TikTok music marketing",
    "Instagram music marketing",
    "YouTube music marketing",
    "VEVO inquiry",
    "music PR inquiry",
    "radio promotion",
    "artist branding",
    "record label contact",
  ],

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    type: "website",

    title:
      "Contact Money Records",

    description:
      "Contact Money Records about music marketing, distribution, artist development, press, VEVO, radio, branding, partnerships, and campaign support.",

    url:
      "/contact",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Contact Money Records",

    description:
      "Send Money Records your business, marketing, distribution, or artist-development inquiry.",
  },
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

function MailIcon(): ReactNode {
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

function InstagramIcon(): ReactNode {
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
        width="16"
        height="16"
        rx="5"
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
        r="1"
        fill="currentColor"
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

function ShieldIcon(): ReactNode {
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
/* Contact Method                                                         */
/* --------------------------------------------------------------------- */

function ContactMethod({
  icon,
  eyebrow,
  title,
  description,
  href,
  actionLabel,
  external = false,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  external?: boolean;
}) {
  return (
    <Card
      as="article"
      padding="md"
      hover
      fullHeight
      className="group relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[rgba(227,179,77,0.06)] blur-[90px]"
      />

      <div className="relative flex h-full flex-col">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
          {icon}
        </span>

        <p className="mt-5 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-7 text-white/44">
          {description}
        </p>

        <div className="mt-auto pt-6">
          {external ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--mr-gold-200)] transition hover:text-[var(--mr-gold-100)]"
            >
              {actionLabel}
              <ArrowIcon />
            </a>
          ) : (
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--mr-gold-200)] transition hover:text-[var(--mr-gold-100)]"
            >
              {actionLabel}
              <ArrowIcon />
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Inquiry Type Card                                                      */
/* --------------------------------------------------------------------- */

function InquiryTypeCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/[0.065] bg-white/[0.022] p-5">
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.045)] text-[var(--mr-gold-200)]">
        {icon}
      </span>

      <h3 className="mt-4 text-base font-black tracking-[-0.025em] text-[var(--mr-text)]">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-6 text-white/40">
        {description}
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Contact Page                                                           */
/* --------------------------------------------------------------------- */

export default function ContactPage() {
  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      {/* --------------------------------------------------------------- */}
      {/* Background Atmosphere                                           */}
      {/* --------------------------------------------------------------- */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[1050px] w-[1550px] max-w-[130vw] -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.05)] blur-[210px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.15] [background-image:radial-gradient(rgba(227,179,77,0.11)_0.7px,transparent_0.7px)] [background-size:28px_28px]"
      />

      <Container size="wide">
        <div className="py-8 md:py-12">
          {/* ----------------------------------------------------------- */}
          {/* Hero                                                        */}
          {/* ----------------------------------------------------------- */}

          <header className="relative overflow-hidden rounded-[32px] border border-[rgba(227,179,77,0.22)] bg-[linear-gradient(145deg,rgba(18,17,15,0.98),rgba(6,6,7,0.99))] p-6 shadow-[0_34px_130px_rgba(0,0,0,0.58)] sm:p-8 lg:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-44 -top-52 h-[620px] w-[620px] rounded-full bg-[rgba(227,179,77,0.15)] blur-[165px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-52 -left-44 h-[480px] w-[480px] rounded-full bg-[rgba(227,179,77,0.05)] blur-[145px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.8),transparent)]"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
              <div className="max-w-4xl">
                <span className="inline-flex min-h-8 items-center rounded-full border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] px-4 text-[8px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                  Money Records Inquiries
                </span>

                <h1 className="mt-7 text-balance text-5xl font-black leading-[0.94] tracking-[-0.065em] text-[var(--mr-text)] sm:text-6xl lg:text-7xl">
                  Tell Us What You&apos;re{" "}
                  <span className="mr-text-gradient">
                    Building.
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-lg font-black leading-8 tracking-[-0.025em] text-white/72 sm:text-xl">
                  Marketing, distribution, artist development, press, VEVO,
                  radio, branding, partnerships, and general business inquiries.
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                  Give the Money Records team the details behind your project,
                  campaign, artist, release, or business opportunity and we
                  can route the inquiry appropriately.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    href="#inquiry-form"
                    variant="primary"
                    size="lg"
                    rightIcon={
                      <ArrowIcon />
                    }
                    className="w-full sm:w-auto"
                  >
                    Start an Inquiry
                  </Button>

                  <Button
                    href="/services"
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Explore Services
                  </Button>

                  <Button
                    href="/submit-music"
                    variant="ghost"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Submit Music
                  </Button>
                </div>
              </div>

              {/* Quick contact panel */}

              <Card
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[rgba(227,179,77,0.1)] blur-[100px]"
                />

                <div className="relative">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                    Direct Contact
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
                    Money Records LLC
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/44">
                    Prefer to contact us directly? Use one of the official
                    channels below.
                  </p>

                  <Divider
                    className="my-6"
                    variant="soft"
                  />

                  <div className="grid gap-3">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="group flex items-center justify-between gap-4 rounded-[20px] border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-[rgba(227,179,77,0.24)] hover:bg-[rgba(211,154,46,0.045)]"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="grid h-10 w-10 flex-[0_0_40px] place-items-center rounded-xl border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.045)] text-[var(--mr-gold-200)]">
                          <MailIcon />
                        </span>

                        <span className="min-w-0">
                          <span className="block text-[8px] font-black uppercase tracking-[0.15em] text-white/30">
                            Email
                          </span>

                          <span className="mt-1 block truncate text-sm font-black text-white/70">
                            {CONTACT_EMAIL}
                          </span>
                        </span>
                      </span>

                      <span className="text-[var(--mr-gold-200)] transition group-hover:translate-x-0.5">
                        <ArrowIcon />
                      </span>
                    </a>

                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-[20px] border border-white/[0.07] bg-white/[0.025] p-4 transition hover:border-[rgba(227,179,77,0.24)] hover:bg-[rgba(211,154,46,0.045)]"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="grid h-10 w-10 flex-[0_0_40px] place-items-center rounded-xl border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.045)] text-[var(--mr-gold-200)]">
                          <InstagramIcon />
                        </span>

                        <span className="min-w-0">
                          <span className="block text-[8px] font-black uppercase tracking-[0.15em] text-white/30">
                            Instagram
                          </span>

                          <span className="mt-1 block truncate text-sm font-black text-white/70">
                            {INSTAGRAM_HANDLE}
                          </span>
                        </span>
                      </span>

                      <span className="text-[var(--mr-gold-200)] transition group-hover:translate-x-0.5">
                        <ArrowIcon />
                      </span>
                    </a>
                  </div>

                  <div className="mt-5 flex items-start gap-3 rounded-[18px] border border-[rgba(227,179,77,0.15)] bg-[rgba(211,154,46,0.035)] p-4">
                    <span className="mt-0.5 flex-[0_0_auto] text-[var(--mr-gold-200)]">
                      <ShieldIcon />
                    </span>

                    <p className="m-0 text-xs leading-6 text-white/38">
                      Money Records will never ask you to send passwords,
                      banking credentials, or payment-card information through
                      the public contact form.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </header>

          {/* ----------------------------------------------------------- */}
          {/* Contact Methods                                             */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="contact-options-heading"
            className="py-14 md:py-20"
          >
            <div className="max-w-3xl">
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Contact Options
              </p>

              <h2
                id="contact-options-heading"
                className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
              >
                Choose the{" "}
                <span className="mr-text-gradient">
                  Right Path.
                </span>
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                Use the inquiry form for business and campaign questions, or
                use the dedicated music submission route when you want the
                team to review an artist or release.
              </p>
            </div>

            <Divider
              className="my-8"
              variant="strong"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <ContactMethod
                icon={
                  <MailIcon />
                }
                eyebrow="Business Inquiries"
                title="Contact the Team"
                description="Marketing, partnerships, service questions, distribution, billing support, and general business inquiries."
                href="#inquiry-form"
                actionLabel="Start Inquiry"
              />

              <ContactMethod
                icon={
                  <MusicIcon />
                }
                eyebrow="Artist Submissions"
                title="Submit Your Music"
                description="Send your strongest record, artist information, links, release details, and creative direction to the label."
                href="/submit-music"
                actionLabel="Submit Music"
              />

              <ContactMethod
                icon={
                  <MegaphoneIcon />
                }
                eyebrow="Campaign Services"
                title="Explore Marketing"
                description="Browse Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO, press, radio, and other campaign options."
                href="/services"
                actionLabel="View Services"
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Inquiry Categories                                          */}
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
                className="pointer-events-none absolute -right-36 -top-40 h-[480px] w-[480px] rounded-full bg-[rgba(227,179,77,0.09)] blur-[135px]"
              />

              <div className="relative">
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  What We Can Discuss
                </p>

                <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                  One Contact Point.{" "}
                  <span className="mr-text-gradient">
                    Multiple Opportunities.
                  </span>
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/47 sm:text-base">
                  The inquiry system is built to route different business,
                  label, marketing, and release-related requests through one
                  professional contact process.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <InquiryTypeCard
                    icon={
                      <MegaphoneIcon />
                    }
                    title="Music Marketing"
                    description="Platform campaigns, release strategy, audience growth, social marketing, and rollout support."
                  />

                  <InquiryTypeCard
                    icon={
                      <GlobeIcon />
                    }
                    title="Distribution"
                    description="Questions regarding music distribution, release preparation, and catalog support."
                  />

                  <InquiryTypeCard
                    icon={
                      <MusicIcon />
                    }
                    title="Label Services"
                    description="Artist development, branding, release planning, VEVO, press, radio, and creative support."
                  />

                  <InquiryTypeCard
                    icon={
                      <ShieldIcon />
                    }
                    title="Business Support"
                    description="Partnerships, billing questions, customer support, and other Money Records business matters."
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Main Inquiry Form                                            */}
          {/* ----------------------------------------------------------- */}

          <section
            id="inquiry-form"
            aria-labelledby="contact-form-heading"
            className="scroll-mt-28 pb-14 md:pb-20"
          >
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
              {/* Form */}

              <Card
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-40 -top-44 h-[500px] w-[500px] rounded-full bg-[rgba(227,179,77,0.075)] blur-[145px]"
                />

                <div className="relative">
                  <div className="sr-only">
                    <h2 id="contact-form-heading">
                      Money Records Inquiry Form
                    </h2>
                  </div>

                  <InquiryForm
                    endpoint="/api/inquiries"
                    submitLabel="Send Inquiry"
                    showHeader
                  />
                </div>
              </Card>

              {/* Sidebar */}

              <aside className="grid gap-5 xl:sticky xl:top-28">
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
                      Before You Send
                    </p>

                    <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                      Help Us Understand the Project
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/44">
                      The clearest inquiries include the project, artist,
                      platform, budget range, timeline, and desired outcome.
                    </p>

                    <div className="mt-6 grid gap-3">
                      {[
                        "Artist, brand, or company name",
                        "Release or campaign goal",
                        "Platforms you want to target",
                        "Expected timeline",
                        "Relevant music or social links",
                        "Any important campaign context",
                      ].map(
                        (item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3"
                          >
                            <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]"
                            >
                              <CheckIcon />
                            </span>

                            <p className="m-0 text-xs leading-6 text-white/43">
                              {item}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </Card>

                <Card
                  padding="lg"
                  className="relative overflow-hidden"
                >
                  <div className="relative">
                    <p className="text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                      Artist Submission?
                    </p>

                    <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                      Use the Dedicated Music Form
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/44">
                      Artists who want Money Records to review music should use
                      the dedicated submission page instead of the general
                      inquiry form.
                    </p>

                    <div className="mt-6">
                      <Button
                        href="/submit-music"
                        variant="secondary"
                        size="lg"
                        rightIcon={
                          <ArrowIcon />
                        }
                        fullWidth
                      >
                        Submit Your Music
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card
                  padding="lg"
                  className="relative overflow-hidden"
                >
                  <div className="relative">
                    <p className="text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                      Direct Contact
                    </p>

                    <div className="mt-5 grid gap-3">
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="group flex items-center justify-between gap-4 rounded-[18px] border border-white/[0.065] bg-white/[0.022] p-4 transition hover:border-[rgba(227,179,77,0.2)]"
                      >
                        <span className="min-w-0">
                          <span className="block text-[8px] font-black uppercase tracking-[0.14em] text-white/28">
                            Email
                          </span>

                          <span className="mt-1 block truncate text-xs font-black text-white/60">
                            {CONTACT_EMAIL}
                          </span>
                        </span>

                        <ArrowIcon />
                      </a>

                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-4 rounded-[18px] border border-white/[0.065] bg-white/[0.022] p-4 transition hover:border-[rgba(227,179,77,0.2)]"
                      >
                        <span className="min-w-0">
                          <span className="block text-[8px] font-black uppercase tracking-[0.14em] text-white/28">
                            Instagram
                          </span>

                          <span className="mt-1 block truncate text-xs font-black text-white/60">
                            {INSTAGRAM_HANDLE}
                          </span>
                        </span>

                        <ArrowIcon />
                      </a>
                    </div>
                  </div>
                </Card>
              </aside>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Final CTA                                                   */}
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
                className="pointer-events-none absolute -right-36 -top-40 h-[500px] w-[500px] rounded-full bg-[rgba(227,179,77,0.11)] blur-[145px]"
              />

              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Money Records
                  </p>

                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                    Build the Right{" "}
                    <span className="mr-text-gradient">
                      Next Move.
                    </span>
                  </h2>

                  <p className="mt-5 text-sm leading-7 text-white/47 sm:text-base">
                    Explore platform marketing, submit your music, or contact
                    Money Records directly about your next release, artist
                    project, or business opportunity.
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                  <Button
                    href="/services"
                    variant="primary"
                    size="lg"
                    rightIcon={
                      <ArrowIcon />
                    }
                    className="w-full lg:w-auto"
                  >
                    Explore Services
                  </Button>

                  <Button
                    href="/submit-music"
                    variant="secondary"
                    size="lg"
                    className="w-full lg:w-auto"
                  >
                    Submit Music
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