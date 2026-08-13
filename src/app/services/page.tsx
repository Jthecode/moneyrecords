// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Marketing Services Page                               ┃
   ┃ File   : src/app/services/page.tsx                                    ┃
   ┃ Role   : Main platform-marketing storefront page                      ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  Metadata,
} from "next";

import Link from "next/link";

import type {
  ReactNode,
} from "react";

import Card from "@/components/Card";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";

import ServicesCTA from "@/sections/ServicesCTA";
import ServicesFAQ from "@/sections/ServicesFAQ";
import ServicesHowItWorks from "@/sections/ServicesHowItWorks";
import ServicesPlatforms from "@/sections/ServicesPlatforms";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                    */
/* --------------------------------------------------------------------- */

export const dynamic =
  "force-static";

/* --------------------------------------------------------------------- */
/* Metadata                                                               */
/* --------------------------------------------------------------------- */

export const metadata: Metadata = {
  title:
    "Music Marketing Services",

  description:
    "Explore Money Records music marketing services for Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO, Press and PR, radio, SoundCloud, and artist branding. Compare campaign options, pricing, deliverables, timing, and requirements.",

  keywords: [
    "Money Records marketing services",
    "music marketing services",
    "Spotify promotion",
    "Spotify marketing",
    "Apple Music promotion",
    "Instagram music marketing",
    "TikTok music promotion",
    "YouTube music promotion",
    "VEVO services",
    "music PR",
    "music press campaign",
    "radio promotion",
    "SoundCloud promotion",
    "artist branding",
    "independent artist marketing",
    "music promotion campaigns",
  ],

  alternates: {
    canonical:
      "/services",
  },

  openGraph: {
    type:
      "website",

    url:
      "/services",

    title:
      "Music Marketing Services | Money Records",

    description:
      "Choose a marketing platform and explore individual Money Records campaign options, pricing, deliverables, timing, requirements, and campaign standards.",

    images: [
      {
        url:
          "/brand/hero-world.jpg",

        alt:
          "Money Records music marketing services",
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Music Marketing Services | Money Records",

    description:
      "Explore platform-specific marketing campaigns across Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO, press, radio, SoundCloud, and artist branding.",

    images: [
      "/brand/hero-world.jpg",
    ],
  },
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function PlatformIcon(): ReactNode {
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

function ProcessIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <circle
        cx="6"
        cy="6"
        r="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="18"
        cy="6"
        r="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="18"
        r="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M8 6H16M7.3 7.7L10.8 16M16.7 7.7L13.2 16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function QuestionIcon(): ReactNode {
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
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M9.7 9.2C10.1 7.8 11.1 7 12.5 7C14.1 7 15.3 8 15.3 9.5C15.3 10.6 14.7 11.3 13.6 12C12.5 12.7 12 13.3 12 14.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <circle
        cx="12"
        cy="17"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

function ContactIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
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

function ArrowIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="15"
      height="15"
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
/* Quick Navigation                                                       */
/* --------------------------------------------------------------------- */

type ServicesQuickLink = {
  label: string;
  description: string;
  href: string;
  icon: ReactNode;
};

function ServicesQuickNavigation() {
  const links:
    readonly ServicesQuickLink[] = [
      {
        label:
          "Platforms",

        description:
          "Browse marketing channels",

        href:
          "#platforms",

        icon:
          <PlatformIcon />,
      },

      {
        label:
          "How It Works",

        description:
          "Understand the process",

        href:
          "#how-it-works",

        icon:
          <ProcessIcon />,
      },

      {
        label:
          "FAQ",

        description:
          "Campaign questions",

        href:
          "#faq",

        icon:
          <QuestionIcon />,
      },

      {
        label:
          "Contact",

        description:
          "Ask about a campaign",

        href:
          "#contact",

        icon:
          <ContactIcon />,
      },
    ];

  return (
    <section
      aria-label="Services page navigation"
      className="mt-4 sm:mt-5"
    >
      <Container size="wide">
        <Card
          padding="sm"
          className="relative overflow-hidden"
        >
          {/* ----------------------------------------------------------- */}
          {/* Gold atmosphere                                             */}
          {/* ----------------------------------------------------------- */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[rgba(227,179,77,0.055)] blur-[85px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[15%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.35),transparent)]"
          />

          {/* ----------------------------------------------------------- */}
          {/* Mobile Horizontal Navigation                                */}
          {/* ----------------------------------------------------------- */}

          <div
            className={[
              "relative",
              "flex gap-2",
              "overflow-x-auto",
              "overscroll-x-contain",
              "snap-x snap-mandatory",
              "scroll-smooth",
              "pb-1",
              "[scrollbar-width:none]",
              "[-ms-overflow-style:none]",
              "[&::-webkit-scrollbar]:hidden",
              "lg:grid",
              "lg:grid-cols-4",
              "lg:overflow-visible",
              "lg:snap-none",
              "lg:pb-0",
            ].join(" ")}
          >
            {links.map(
              (
                link,
              ) => (
                <Link
                  key={
                    link.href
                  }
                  href={
                    link.href
                  }
                  className={[
                    "group",
                    "flex min-w-[220px]",
                    "snap-start",
                    "items-center justify-between gap-3",
                    "rounded-[17px]",
                    "border border-white/[0.055]",
                    "bg-white/[0.016]",
                    "px-3.5 py-3",
                    "transition duration-200",
                    "hover:border-[rgba(227,179,77,0.18)]",
                    "hover:bg-[rgba(211,154,46,0.035)]",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-[rgba(227,179,77,0.45)]",
                    "sm:min-w-[240px]",
                    "lg:min-w-0",
                  ].join(" ")}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span
                      className={[
                        "grid h-9 w-9 flex-[0_0_36px]",
                        "place-items-center",
                        "rounded-xl",
                        "border border-[rgba(227,179,77,0.17)]",
                        "bg-[rgba(211,154,46,0.04)]",
                        "text-[var(--mr-gold-200)]",
                      ].join(" ")}
                    >
                      {link.icon}
                    </span>

                    <span className="min-w-0">
                      <span className="block truncate text-[9px] font-black uppercase tracking-[0.12em] text-white/58">
                        {link.label}
                      </span>

                      <span className="mt-1 block truncate text-[10px] text-white/27">
                        {link.description}
                      </span>
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={[
                      "flex-[0_0_auto]",
                      "text-white/20",
                      "transition duration-200",
                      "group-hover:translate-x-0.5",
                      "group-hover:text-[var(--mr-gold-200)]",
                    ].join(" ")}
                  >
                    <ArrowIcon />
                  </span>
                </Link>
              ),
            )}
          </div>
        </Card>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/* Services Trust Strip                                                   */
/* --------------------------------------------------------------------- */

function ServicesTrustStrip() {
  const items = [
    "Platform-Specific Campaigns",
    "One-Time Campaign Pricing",
    "Secure Campaign Checkout",
    "Transparent Campaign Standards",
  ] as const;

  return (
    <section
      aria-label="Money Records campaign standards"
      className="py-5 sm:py-7"
    >
      <Container size="wide">
        <div
          className={[
            "relative overflow-hidden",
            "rounded-[20px]",
            "border border-[rgba(227,179,77,0.12)]",
            "bg-[rgba(211,154,46,0.018)]",
            "px-4 py-4",
            "sm:px-5",
          ].join(" ")}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[rgba(227,179,77,0.05)] blur-[75px]"
          />

          <div className="relative grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-4">
            {items.map(
              (
                item,
              ) => (
                <div
                  key={
                    item
                  }
                  className="flex min-w-0 items-center gap-2.5"
                >
                  <span
                    className={[
                      "grid h-6 w-6 flex-[0_0_24px]",
                      "place-items-center",
                      "rounded-full",
                      "border border-[rgba(227,179,77,0.18)]",
                      "bg-[rgba(211,154,46,0.04)]",
                      "text-[var(--mr-gold-200)]",
                    ].join(" ")}
                  >
                    <CheckIcon />
                  </span>

                  <span className="text-[8px] font-black uppercase leading-4 tracking-[0.09em] text-white/36 sm:text-[9px]">
                    {item}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------------- */
/* Services Page                                                          */
/* --------------------------------------------------------------------- */

export default function ServicesPage() {
  return (
    <div
      id="top"
      className="mr-page relative overflow-hidden"
    >
      {/* --------------------------------------------------------------- */}
      {/* Background Atmosphere                                           */}
      {/* --------------------------------------------------------------- */}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute",
          "left-1/2 top-0 -z-10",
          "h-[900px] w-[1450px]",
          "max-w-[135vw]",
          "-translate-x-1/2",
          "rounded-full",
          "bg-[rgba(227,179,77,0.04)]",
          "blur-[200px]",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 -z-20",
          "opacity-[0.09]",
          "[background-image:radial-gradient(rgba(227,179,77,0.11)_0.7px,transparent_0.7px)]",
          "[background-size:28px_28px]",
        ].join(" ")}
      />

      {/* --------------------------------------------------------------- */}
      {/* Services Hero                                                   */}
      {/* --------------------------------------------------------------- */}

      <section
        aria-label="Money Records marketing services"
        className="scroll-mt-28 pt-2 sm:pt-3"
      >
        <Container size="wide">
          <PageHero
            eyebrow="Money Records Platform Marketing"
            badges={[
              {
                label:
                  "Multiple Platforms",

                tone:
                  "gold",
              },

              {
                label:
                  "Campaigns Available",

                tone:
                  "success",
              },
            ]}
            title={
              <>
                Choose Your Platform.{" "}
                <span className="mr-text-gradient">
                  Select Your Campaign.
                </span>
              </>
            }
            subtitle="Individual music-marketing campaigns built around the platform, release, audience, and objective."
            description="Explore Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO, Press and PR, radio, SoundCloud, and artist-branding services. Each platform has its own campaign options, pricing, deliverables, requirements, timing, and standards."
            primaryAction={{
              label:
                "Explore Platforms",

              href:
                "#platforms",
            }}
            secondaryAction={{
              label:
                "How It Works",

              href:
                "#how-it-works",
            }}
            tertiaryAction={{
              label:
                "Ask About a Campaign",

              href:
                "#contact",
            }}
            footerContent={
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[8px] font-black uppercase tracking-[0.11em] text-white/27 sm:text-[9px]">
                <span>
                  Choose a Platform
                </span>

                <span
                  aria-hidden="true"
                  className="text-[var(--mr-gold-300)]"
                >
                  •
                </span>

                <span>
                  Select a Campaign
                </span>

                <span
                  aria-hidden="true"
                  className="text-[var(--mr-gold-300)]"
                >
                  •
                </span>

                <span>
                  Add to Cart
                </span>

                <span
                  aria-hidden="true"
                  className="text-[var(--mr-gold-300)]"
                >
                  •
                </span>

                <span>
                  Secure Checkout
                </span>
              </div>
            }
          />
        </Container>
      </section>

      {/* --------------------------------------------------------------- */}
      {/* Quick Navigation                                                */}
      {/* --------------------------------------------------------------- */}

      <ServicesQuickNavigation />

      {/* --------------------------------------------------------------- */}
      {/* Platform Storefront                                             */}
      {/* --------------------------------------------------------------- */}

      <ServicesPlatforms
        id="platforms"
        consultationHref="#contact"
        consultationLabel="Ask About a Platform"
        spotifyHref="/services/spotify"
        spotifyLabel="View Spotify Campaigns"
      />

      {/* --------------------------------------------------------------- */}
      {/* Campaign Trust Strip                                            */}
      {/* --------------------------------------------------------------- */}

      <ServicesTrustStrip />

      {/* --------------------------------------------------------------- */}
      {/* Storefront Process                                              */}
      {/* --------------------------------------------------------------- */}

      <ServicesHowItWorks
        id="how-it-works"
        primaryCtaHref="/services/spotify"
        primaryCtaLabel="Explore Spotify Campaigns"
        secondaryCtaHref="#contact"
        secondaryCtaLabel="Ask About a Service"
      />

      {/* --------------------------------------------------------------- */}
      {/* Frequently Asked Questions                                      */}
      {/* --------------------------------------------------------------- */}

      <ServicesFAQ
        id="faq"
        contactHref="#contact"
        contactLabel="Ask Money Records"
        platformsHref="#platforms"
        platformsLabel="Explore All Platforms"
        spotifyHref="/services/spotify"
        spotifyLabel="View Spotify Campaigns"
      />

      {/* --------------------------------------------------------------- */}
      {/* Final Conversion Section                                        */}
      {/* --------------------------------------------------------------- */}

      <ServicesCTA
        id="contact"
        primaryHref="/services/spotify"
        primaryLabel="Explore Spotify Campaigns"
        platformsHref="#platforms"
        platformsLabel="View All Platforms"
        email="info@moneyrecords.io"
        instagramHref="https://instagram.com/kingpharaohreal"
        instagramHandle="@kingpharaohreal"
        submissionHref="/submit-music"
        submissionLabel="Submit Music to the Label"
      />
    </div>
  );
}