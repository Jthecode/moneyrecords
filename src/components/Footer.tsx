// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Global Footer                                         ┃
   ┃ File   : src/components/Footer.tsx                                    ┃
   ┃ Role   : Brand, navigation, campaigns, legal, contact, and trust     ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Image from "next/image";
import Link from "next/link";

import type {
  ReactNode,
} from "react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Divider from "@/components/Divider";

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
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterGroup = {
  title: string;
  links:
    readonly FooterLink[];
};

type QuickLinkProps = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
};

type MobileAccordionProps = {
  title: string;
  children: ReactNode;
};

/* --------------------------------------------------------------------- */
/* Footer Navigation                                                      */
/* --------------------------------------------------------------------- */

const footerGroups:
  readonly FooterGroup[] = [
    {
      title:
        "Explore",

      links: [
        {
          label:
            "Home",

          href:
            "/",
        },

        {
          label:
            "Artists",

          href:
            "/artists",
        },

        {
          label:
            "Releases",

          href:
            "/releases",
        },

        {
          label:
            "About Money Records",

          href:
            "/about",
        },
      ],
    },

    {
      title:
        "Services",

      links: [
        {
          label:
            "Marketing Services",

          href:
            "/services",
        },

        {
          label:
            "Music Distribution",

          href:
            "/distribution",
        },

        {
          label:
            "Submit Music",

          href:
            "/submit-music",
        },

        {
          label:
            "Contact the Team",

          href:
            "/contact",
        },
      ],
    },

    {
      title:
        "Support",

      links: [
        {
          label:
            "General Inquiry",

          href:
            "/contact",
        },

        {
          label:
            "Refund Policy",

          href:
            "/refund-policy",
        },

        {
          label:
            "Marketing Disclaimer",

          href:
            "/marketing-disclaimer",
        },

        {
          label:
            "Email Money Records",

          href:
            `mailto:${CONTACT_EMAIL}`,

          external:
            true,
        },
      ],
    },
  ];

/* --------------------------------------------------------------------- */
/* Platform Labels                                                        */
/* --------------------------------------------------------------------- */

const platformLabels:
  readonly string[] = [
    "Spotify",
    "Apple Music",
    "Instagram",
    "TikTok",
    "YouTube",
    "VEVO",
    "SoundCloud",
    "Press & PR",
    "Radio",
    "Artist Branding",
  ];

/* --------------------------------------------------------------------- */
/* Legal Links                                                            */
/* --------------------------------------------------------------------- */

const legalLinks:
  readonly FooterLink[] = [
    {
      label:
        "Privacy",

      href:
        "/privacy",
    },

    {
      label:
        "Terms",

      href:
        "/terms",
    },

    {
      label:
        "Refund Policy",

      href:
        "/refund-policy",
    },

    {
      label:
        "Marketing Disclaimer",

      href:
        "/marketing-disclaimer",
    },
  ];

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

function ArrowUpRightIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
    >
      <path
        d="M7 17L17 7M8 7H17V16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
    >
      <path
        d="M6 9L12 15L18 9"
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

function GlobeIcon(): ReactNode {
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

function ArtistIcon(): ReactNode {
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
        d="M5.5 20C6.2 16.8 8.6 15 12 15C15.4 15 17.8 16.8 18.5 20"
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
      width="18"
      height="18"
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
      width="18"
      height="18"
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

function ShieldIcon(): ReactNode {
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

function InstagramIcon(): ReactNode {
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

/* --------------------------------------------------------------------- */
/* Helpers                                                                */
/* --------------------------------------------------------------------- */

function joinClasses(
  ...classes: Array<
    string |
    false |
    null |
    undefined
  >
): string {
  return classes
    .filter(Boolean)
    .join(" ");
}

/* --------------------------------------------------------------------- */
/* Footer Navigation Link                                                 */
/* --------------------------------------------------------------------- */

function FooterNavigationLink({
  link,
}: {
  link: FooterLink;
}) {
  const className = [
    "group inline-flex w-fit items-center gap-1.5",
    "text-sm text-white/52",
    "transition-colors duration-200",
    "hover:text-[var(--mr-gold-100)]",
    "focus-visible:outline-none",
    "focus-visible:text-[var(--mr-gold-100)]",
  ].join(" ");

  if (
    link.external
  ) {
    const isHttpLink =
      link.href.startsWith(
        "http://",
      ) ||
      link.href.startsWith(
        "https://",
      );

    return (
      <a
        className={
          className
        }
        href={
          link.href
        }
        target={
          isHttpLink
            ? "_blank"
            : undefined
        }
        rel={
          isHttpLink
            ? "noopener noreferrer"
            : undefined
        }
      >
        <span>
          {link.label}
        </span>

        <span
          aria-hidden="true"
          className={[
            "opacity-35",
            "transition-all duration-200",
            "group-hover:translate-x-0.5",
            "group-hover:-translate-y-0.5",
            "group-hover:opacity-100",
          ].join(" ")}
        >
          <ArrowUpRightIcon />
        </span>
      </a>
    );
  }

  return (
    <Link
      className={
        className
      }
      href={
        link.href
      }
    >
      <span>
        {link.label}
      </span>

      <span
        aria-hidden="true"
        className={[
          "opacity-0",
          "transition-all duration-200",
          "group-hover:translate-x-0.5",
          "group-hover:-translate-y-0.5",
          "group-hover:opacity-100",
        ].join(" ")}
      >
        <ArrowUpRightIcon />
      </span>
    </Link>
  );
}

/* --------------------------------------------------------------------- */
/* Mobile Footer Navigation Link                                          */
/* --------------------------------------------------------------------- */

function MobileFooterLink({
  link,
}: {
  link: FooterLink;
}) {
  const content = (
    <>
      <span className="truncate">
        {link.label}
      </span>

      <span
        aria-hidden="true"
        className="flex-[0_0_auto] text-white/20"
      >
        <ArrowUpRightIcon />
      </span>
    </>
  );

  const className = [
    "flex min-h-12 items-center justify-between gap-3",
    "border-b border-white/[0.05]",
    "py-2.5",
    "text-sm font-semibold text-white/50",
    "transition-colors duration-200",
    "last:border-b-0",
    "hover:text-[var(--mr-gold-200)]",
    "focus-visible:outline-none",
    "focus-visible:text-[var(--mr-gold-200)]",
  ].join(" ");

  if (
    link.external
  ) {
    const isHttpLink =
      link.href.startsWith(
        "http://",
      ) ||
      link.href.startsWith(
        "https://",
      );

    return (
      <a
        href={
          link.href
        }
        target={
          isHttpLink
            ? "_blank"
            : undefined
        }
        rel={
          isHttpLink
            ? "noopener noreferrer"
            : undefined
        }
        className={
          className
        }
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={
        link.href
      }
      className={
        className
      }
    >
      {content}
    </Link>
  );
}

/* --------------------------------------------------------------------- */
/* Quick Link                                                             */
/* --------------------------------------------------------------------- */

function QuickLink({
  href,
  eyebrow,
  title,
  description,
  icon,
}: QuickLinkProps) {
  return (
    <Link
      href={
        href
      }
      className={[
        "group relative overflow-hidden rounded-[22px]",
        "border border-white/[0.065]",
        "bg-white/[0.022]",
        "p-5",
        "transition duration-200",
        "hover:border-[rgba(227,179,77,0.23)]",
        "hover:bg-[rgba(211,154,46,0.04)]",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[rgba(227,179,77,0.42)]",
      ].join(" ")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[rgba(227,179,77,0.07)] blur-[80px]"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-10 w-10 flex-[0_0_40px] place-items-center rounded-xl border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]">
            {icon}
          </span>

          <span
            aria-hidden="true"
            className="text-white/28 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--mr-gold-200)]"
          >
            <ArrowUpRightIcon />
          </span>
        </div>

        <p className="mt-5 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)]">
          {eyebrow}
        </p>

        <h3 className="mt-2 text-sm font-black tracking-[-0.02em] text-[var(--mr-text)]">
          {title}
        </h3>

        <p className="mt-2 text-[11px] leading-5 text-white/36">
          {description}
        </p>
      </div>
    </Link>
  );
}

/* --------------------------------------------------------------------- */
/* Platform Badge                                                         */
/* --------------------------------------------------------------------- */

function PlatformBadge({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span
      className={[
        "inline-flex min-h-8 items-center",
        "rounded-full",
        "border border-white/[0.075]",
        "bg-white/[0.025]",
        "px-3",
        "text-[9px] font-bold uppercase tracking-[0.11em]",
        "text-white/45",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

/* --------------------------------------------------------------------- */
/* Mobile Accordion                                                       */
/* --------------------------------------------------------------------- */

function MobileAccordion({
  title,
  children,
}: MobileAccordionProps) {
  return (
    <details
      className={[
        "group overflow-hidden",
        "border-b border-white/[0.065]",
        "last:border-b-0",
      ].join(" ")}
    >
      <summary
        className={[
          "flex min-h-14 cursor-pointer list-none",
          "items-center justify-between gap-4",
          "py-3",
          "text-left",
          "[&::-webkit-details-marker]:hidden",
          "focus-visible:outline-none",
        ].join(" ")}
      >
        <span className="text-[10px] font-black uppercase tracking-[0.17em] text-white/55 transition-colors group-open:text-[var(--mr-gold-200)]">
          {title}
        </span>

        <span
          aria-hidden="true"
          className={[
            "grid h-8 w-8 place-items-center",
            "rounded-full",
            "border border-white/[0.065]",
            "bg-white/[0.02]",
            "text-white/30",
            "transition duration-200",
            "group-open:rotate-180",
            "group-open:border-[rgba(227,179,77,0.18)]",
            "group-open:text-[var(--mr-gold-200)]",
          ].join(" ")}
        >
          <ChevronIcon />
        </span>
      </summary>

      <div className="pb-4">
        {children}
      </div>
    </details>
  );
}

/* --------------------------------------------------------------------- */
/* Footer Brand                                                           */
/* --------------------------------------------------------------------- */

function FooterBrand() {
  return (
    <div>
      <Link
        href="/"
        aria-label="Money Records homepage"
        className="group inline-flex max-w-full items-center gap-3 sm:gap-4"
      >
        <span className="mr-brand-mark relative h-12 w-12 flex-[0_0_48px] overflow-hidden sm:h-14 sm:w-14 sm:flex-basis-[56px]">
          <Image
            src="/brand/mr-crest.png"
            alt=""
            width={64}
            height={64}
            sizes="56px"
            className={[
              "h-full w-full object-contain p-1.5",
              "transition-transform duration-500",
              "group-hover:scale-105",
            ].join(" ")}
          />
        </span>

        <span className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-black uppercase tracking-[0.16em] text-[var(--mr-text)] sm:text-base sm:tracking-[0.18em]">
            Money Records
          </span>

          <span className="mt-1.5 truncate text-[8px] font-bold uppercase tracking-[0.2em] text-white/34 sm:mt-2 sm:text-[9px] sm:tracking-[0.24em]">
            Record Label · Global Marketing
          </span>
        </span>
      </Link>

      <p className="mt-5 max-w-md text-sm leading-7 text-white/46">
        An independent record label and music company connecting
        artist development, releases, distribution, marketing,
        branding, press, video, radio, and release strategy.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.035] px-3 py-2 text-[8px] font-black uppercase tracking-[0.13em] text-emerald-300/75">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.75)]"
          />

          Artist Submissions Open
        </span>

        <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(227,179,77,0.14)] bg-[rgba(211,154,46,0.035)] px-3 py-2 text-[8px] font-black uppercase tracking-[0.13em] text-[var(--mr-gold-200)]">
          Independent Since 2019
        </span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Contact Links                                                          */
/* --------------------------------------------------------------------- */

function FooterContact() {
  return (
    <div className="grid gap-2">
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className={[
          "group flex min-h-12 items-center gap-3",
          "rounded-[16px]",
          "border border-white/[0.055]",
          "bg-white/[0.018]",
          "px-3.5",
          "text-sm text-white/58",
          "transition duration-200",
          "hover:border-[rgba(227,179,77,0.18)]",
          "hover:text-[var(--mr-gold-100)]",
        ].join(" ")}
      >
        <span className="mr-icon-ring h-9 w-9 flex-[0_0_36px]">
          <MailIcon />
        </span>

        <span className="min-w-0 truncate">
          {CONTACT_EMAIL}
        </span>
      </a>

      <a
        href={
          INSTAGRAM_URL
        }
        target="_blank"
        rel="noopener noreferrer"
        className={[
          "group flex min-h-12 items-center gap-3",
          "rounded-[16px]",
          "border border-white/[0.055]",
          "bg-white/[0.018]",
          "px-3.5",
          "text-sm text-white/58",
          "transition duration-200",
          "hover:border-[rgba(227,179,77,0.18)]",
          "hover:text-[var(--mr-gold-100)]",
        ].join(" ")}
      >
        <span className="mr-icon-ring h-9 w-9 flex-[0_0_36px]">
          <InstagramIcon />
        </span>

        <span className="min-w-0 truncate">
          {INSTAGRAM_HANDLE}
        </span>
      </a>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Footer                                                                 */
/* --------------------------------------------------------------------- */

export default function Footer() {
  const currentYear =
    new Date()
      .getFullYear();

  return (
    <footer
      aria-labelledby="money-records-footer-heading"
      className={[
        "relative overflow-hidden",
        "border-t border-white/[0.06]",
        "mt-14 sm:mt-16 lg:mt-20",
      ].join(" ")}
    >
      <h2
        id="money-records-footer-heading"
        className="sr-only"
      >
        Money Records Footer
      </h2>

      {/* --------------------------------------------------------------- */}
      {/* Background                                                      */}
      {/* --------------------------------------------------------------- */}

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 -z-10",
          "bg-[linear-gradient(180deg,rgba(211,154,46,0.035),rgba(5,5,6,0.97)_28%,#030304)]",
        ].join(" ")}
      />

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute left-1/2 top-0 -z-10",
          "h-[520px] w-[1100px] max-w-[110vw]",
          "-translate-x-1/2 rounded-full",
          "bg-[rgba(211,154,46,0.075)]",
          "blur-[145px]",
        ].join(" ")}
      />

      <Container className="relative">
        {/* ------------------------------------------------------------- */}
        {/* Conversion CTA                                                */}
        {/* ------------------------------------------------------------- */}

        <section
          aria-labelledby="footer-campaign-heading"
          className={[
            "relative -mt-px overflow-hidden",
            "rounded-b-[24px]",
            "border-x border-b",
            "border-[rgba(227,179,77,0.18)]",
            "bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(211,154,46,0.05)_38%,rgba(8,8,9,0.94))]",
            "px-5 py-8",
            "shadow-[0_24px_80px_rgba(0,0,0,0.4)]",
            "sm:rounded-b-[28px]",
            "sm:px-7 sm:py-9",
            "lg:rounded-b-[30px]",
            "lg:px-12 lg:py-12",
          ].join(" ")}
        >
          <div className="mr-card-topline" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-36 h-96 w-96 rounded-full bg-[rgba(211,154,46,0.14)] blur-[105px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[rgba(211,154,46,0.055)] blur-[110px]"
          />

          <div className="relative grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
            <div className="max-w-3xl">
              <p className="mr-eyebrow mb-3 sm:mb-4">
                Your Next Move Starts Here
              </p>

              <h2
                id="footer-campaign-heading"
                className={[
                  "m-0 text-balance",
                  "text-[1.8rem] font-black leading-[1.05]",
                  "tracking-[-0.045em]",
                  "text-[var(--mr-text)]",
                  "sm:text-4xl",
                  "lg:text-[2.65rem]",
                ].join(" ")}
              >
                Build the Record.{" "}
                <span className="mr-text-gradient">
                  Move the Release.
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/48 sm:mt-5 sm:text-base">
                Explore marketing, submit your music, or contact
                Money Records about distribution, development,
                release strategy, and opportunities.
              </p>

              <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
                {[
                  "Marketing",
                  "Distribution",
                  "Artist Development",
                  "Submissions",
                ].map(
                  (
                    label,
                  ) => (
                    <span
                      key={
                        label
                      }
                      className="inline-flex min-h-8 items-center rounded-full border border-[rgba(227,179,77,0.14)] bg-[rgba(211,154,46,0.035)] px-3 text-[8px] font-black uppercase tracking-[0.12em] text-[var(--mr-gold-200)]"
                    >
                      {label}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="grid w-full gap-2.5 sm:grid-cols-2 lg:ml-auto lg:max-w-[460px]">
              <Button
                variant="primary"
                href="/services"
                size="lg"
                className="w-full"
              >
                Explore Campaigns
              </Button>

              <Button
                variant="secondary"
                href="/submit-music"
                size="lg"
                className="w-full"
              >
                Submit Music
              </Button>

              <Button
                variant="ghost"
                href="/distribution"
                size="lg"
                className="hidden w-full sm:inline-flex"
              >
                Distribution
              </Button>

              <Button
                variant="ghost"
                href="/contact"
                size="lg"
                className="hidden w-full sm:inline-flex"
              >
                Contact the Team
              </Button>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* Desktop Quick Paths                                           */}
        {/* ------------------------------------------------------------- */}

        <section
          aria-label="Money Records quick links"
          className="hidden gap-3 py-8 md:grid md:grid-cols-2 lg:grid-cols-4"
        >
          <QuickLink
            href="/artists"
            eyebrow="The Roster"
            title="Explore Artists"
            description="Artist profiles, biographies, releases, and official links."
            icon={
              <ArtistIcon />
            }
          />

          <QuickLink
            href="/releases"
            eyebrow="The Catalog"
            title="Explore Releases"
            description="Current releases, artwork, streaming links, and catalog information."
            icon={
              <MusicIcon />
            }
          />

          <QuickLink
            href="/distribution"
            eyebrow="Release Infrastructure"
            title="Music Distribution"
            description="Prepare releases, organize metadata, and build a cleaner launch process."
            icon={
              <GlobeIcon />
            }
          />

          <QuickLink
            href="/services"
            eyebrow="Campaign Store"
            title="Music Marketing"
            description="Explore campaigns across streaming, social, video, and media."
            icon={
              <MegaphoneIcon />
            }
          />
        </section>

        <div className="hidden md:block">
          <Divider
            className="mr-divider-soft"
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MOBILE FOOTER                                                 */}
        {/* ------------------------------------------------------------- */}

        <div className="py-8 md:hidden">
          {/* Brand */}

          <FooterBrand />

          {/* Contact */}

          <div className="mt-6">
            <FooterContact />
          </div>

          {/* Accordions */}

          <div className="mt-7 overflow-hidden rounded-[22px] border border-white/[0.065] bg-white/[0.018] px-4">
            {footerGroups.map(
              (
                group,
              ) => (
                <MobileAccordion
                  key={
                    group.title
                  }
                  title={
                    group.title
                  }
                >
                  <nav
                    aria-label={`${group.title} footer navigation`}
                  >
                    {group.links.map(
                      (
                        link,
                      ) => (
                        <MobileFooterLink
                          key={`${group.title}-${link.label}`}
                          link={
                            link
                          }
                        />
                      ),
                    )}
                  </nav>
                </MobileAccordion>
              ),
            )}

            <MobileAccordion
              title="Campaign Platforms"
            >
              <p className="mb-4 text-xs leading-6 text-white/36">
                Marketing services across streaming, social,
                video, press, radio, and artist branding.
              </p>

              <div className="flex flex-wrap gap-2">
                {platformLabels.map(
                  (
                    platform,
                  ) => (
                    <PlatformBadge
                      key={
                        platform
                      }
                    >
                      {platform}
                    </PlatformBadge>
                  ),
                )}
              </div>

              <Link
                href="/services"
                className={[
                  "group mt-5 inline-flex min-h-10 items-center gap-2",
                  "text-[9px] font-black uppercase tracking-[0.14em]",
                  "text-[var(--mr-gold-200)]",
                ].join(" ")}
              >
                Explore All Services

                <ArrowIcon />
              </Link>
            </MobileAccordion>

            <MobileAccordion
              title="Customer Protection"
            >
              <nav aria-label="Customer protection">
                {legalLinks.map(
                  (
                    link,
                  ) => (
                    <MobileFooterLink
                      key={
                        link.href
                      }
                      link={
                        link
                      }
                    />
                  ),
                )}
              </nav>
            </MobileAccordion>
          </div>

          {/* Mobile campaign standard */}

          <div className="mt-6 rounded-[20px] border border-[rgba(227,179,77,0.13)] bg-[rgba(211,154,46,0.025)] p-4">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 flex-[0_0_40px] place-items-center rounded-xl border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.045)] text-[var(--mr-gold-200)]">
                <ShieldIcon />
              </span>

              <div className="min-w-0">
                <p className="m-0 text-[8px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)]">
                  Campaign Standards
                </p>

                <p className="mt-2 text-[11px] leading-5 text-white/38">
                  Marketing results can vary. Campaign estimates
                  are not guaranteed streams, views, followers,
                  placements, press, radio play, sales, or revenue.
                </p>

                <Link
                  href="/marketing-disclaimer"
                  className="mt-3 inline-flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.13em] text-[var(--mr-gold-200)]"
                >
                  Full Disclaimer

                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile bottom */}

          <div className="mt-7 border-t border-white/[0.06] pt-6">
            <p className="m-0 text-[9px] uppercase leading-5 tracking-[0.12em] text-white/30">
              © {currentYear} Money Records LLC.
              All rights reserved.
            </p>

            <p className="mt-2 text-[8px] uppercase leading-5 tracking-[0.11em] text-white/18">
              Independent Record Label · Music Distribution ·
              Global Marketing
            </p>

            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.12em] text-white/24">
                <ShieldIcon />
                Secure · Transparent
              </span>

              <a
                href="#top"
                className="inline-flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.13em] text-[var(--mr-gold-200)]"
              >
                Back to Top

                <span
                  aria-hidden="true"
                  className="rotate-[-45deg]"
                >
                  <ArrowUpRightIcon />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP FOOTER                                                */}
        {/* ------------------------------------------------------------- */}

        <div className="hidden md:block">
          {/* Main Footer */}

          <div
            className={[
              "grid gap-10 py-12",
              "md:grid-cols-2",
              "xl:grid-cols-[1.35fr_0.72fr_0.72fr_0.72fr_1.05fr]",
              "xl:gap-9 xl:py-16",
            ].join(" ")}
          >
            {/* Brand */}

            <div className="max-w-md">
              <FooterBrand />

              <div className="mt-7 max-w-sm">
                <FooterContact />
              </div>

              <div className="mt-5 inline-flex items-center gap-3 text-sm text-white/42">
                <span className="mr-icon-ring h-9 w-9 flex-[0_0_36px]">
                  <GlobeIcon />
                </span>

                <span>
                  Independent Artists · Global Execution
                </span>
              </div>
            </div>

            {/* Navigation groups */}

            {footerGroups.map(
              (
                group,
              ) => (
                <nav
                  key={
                    group.title
                  }
                  aria-label={`${group.title} footer navigation`}
                >
                  <h3 className="m-0 text-[10px] font-black uppercase tracking-[0.19em] text-[var(--mr-gold-200)]">
                    {group.title}
                  </h3>

                  <ul className="mt-6 grid list-none gap-4 p-0">
                    {group.links.map(
                      (
                        link,
                      ) => (
                        <li
                          key={`${group.title}-${link.label}`}
                        >
                          <FooterNavigationLink
                            link={
                              link
                            }
                          />
                        </li>
                      ),
                    )}
                  </ul>
                </nav>
              ),
            )}

            {/* Campaign Platforms */}

            <div>
              <h3 className="m-0 text-[10px] font-black uppercase tracking-[0.19em] text-[var(--mr-gold-200)]">
                Campaign Platforms
              </h3>

              <p className="mt-6 text-sm leading-7 text-white/42">
                Browse marketing services built around the
                platform, release, and campaign objective.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {platformLabels.map(
                  (
                    platform,
                  ) => (
                    <PlatformBadge
                      key={
                        platform
                      }
                    >
                      {platform}
                    </PlatformBadge>
                  ),
                )}
              </div>

              <Link
                href="/services"
                className={[
                  "group mt-6 inline-flex items-center gap-2",
                  "text-[9px] font-black uppercase tracking-[0.14em]",
                  "text-[var(--mr-gold-200)]",
                  "transition hover:text-[var(--mr-gold-100)]",
                ].join(" ")}
              >
                Explore All Services

                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </div>

          <Divider />

          {/* ----------------------------------------------------------- */}
          {/* Campaign Standards                                          */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="footer-standards-heading"
            className="py-7"
          >
            <div
              className={[
                "relative overflow-hidden rounded-[24px]",
                "border border-[rgba(227,179,77,0.15)]",
                "bg-[linear-gradient(135deg,rgba(211,154,46,0.045),rgba(255,255,255,0.018))]",
                "p-5 sm:p-6",
              ].join(" ")}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[rgba(227,179,77,0.07)] blur-[85px]"
              />

              <div className="relative grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]">
                  <ShieldIcon />
                </span>

                <div>
                  <p
                    id="footer-standards-heading"
                    className="m-0 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)]"
                  >
                    Money Records Campaign Standards
                  </p>

                  <p className="mt-2 max-w-4xl text-xs leading-6 text-white/42">
                    Money Records does not represent campaign
                    estimates as guaranteed streams, views,
                    followers, playlist placements, press coverage,
                    radio play, sales, revenue, or other specific
                    outcomes. Results can vary by release, audience,
                    targeting, creative assets, platform conditions,
                    campaign scope, and other factors.
                  </p>
                </div>

                <Link
                  href="/marketing-disclaimer"
                  className={[
                    "group inline-flex min-h-10 w-fit items-center gap-2",
                    "rounded-full",
                    "border border-white/[0.075]",
                    "bg-white/[0.025]",
                    "px-4",
                    "text-[8px] font-black uppercase tracking-[0.13em]",
                    "text-white/48",
                    "transition",
                    "hover:border-[rgba(227,179,77,0.22)]",
                    "hover:text-[var(--mr-gold-200)]",
                  ].join(" ")}
                >
                  Full Disclaimer

                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </section>

          <Divider
            className="mr-divider-soft"
          />

          {/* ----------------------------------------------------------- */}
          {/* Legal Navigation                                            */}
          {/* ----------------------------------------------------------- */}

          <div className="grid gap-6 py-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="text-[8px] font-black uppercase tracking-[0.16em] text-white/22">
                Customer Protection
              </span>

              {legalLinks.map(
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
                      "text-[9px] font-bold uppercase tracking-[0.12em]",
                      "text-white/38",
                      "transition-colors duration-200",
                      "hover:text-[var(--mr-gold-200)]",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>

            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.13em] text-white/24">
              <ShieldIcon />

              Secure · Transparent · Artist Focused
            </div>
          </div>

          <Divider
            className="mr-divider-soft"
          />

          {/* ----------------------------------------------------------- */}
          {/* Desktop Bottom Bar                                          */}
          {/* ----------------------------------------------------------- */}

          <div
            className={[
              "flex flex-col gap-6 py-8",
              "text-xs text-white/35",
              "lg:flex-row lg:items-center lg:justify-between",
            ].join(" ")}
          >
            <div>
              <p className="m-0 uppercase tracking-[0.14em]">
                © {currentYear} Money Records LLC.
                All rights reserved.
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-white/22">
                Independent Record Label · Music Distribution ·
                Global Marketing
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="inline-flex items-center gap-2 uppercase tracking-[0.13em]">
                <CheckIcon />
                Artist Development
              </span>

              <span
                aria-hidden="true"
                className="hidden text-white/12 sm:inline"
              >
                •
              </span>

              <span className="inline-flex items-center gap-2 uppercase tracking-[0.13em]">
                <CheckIcon />
                Music Marketing
              </span>

              <span
                aria-hidden="true"
                className="hidden text-white/12 sm:inline"
              >
                •
              </span>

              <span className="inline-flex items-center gap-2 uppercase tracking-[0.13em]">
                <CheckIcon />
                Distribution
              </span>
            </div>

            <a
              href="#top"
              className={[
                "group inline-flex w-fit items-center gap-2",
                "uppercase tracking-[0.14em]",
                "transition-colors duration-200",
                "hover:text-[var(--mr-gold-100)]",
              ].join(" ")}
            >
              Back to Top

              <span
                aria-hidden="true"
                className="rotate-[-45deg] transition-transform duration-200 group-hover:-translate-y-0.5"
              >
                <ArrowUpRightIcon />
              </span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}