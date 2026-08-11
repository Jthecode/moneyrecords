// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Not Found Page                                        ┃
   ┃ File   : src/app/not-found.tsx                                        ┃
   ┃ Role   : Premium global 404 page with recovery navigation             ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Link from "next/link";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function HomeIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M4 10.5L12 4L20 10.5V20H14.5V14H9.5V20H4V10.5Z"
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
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M5 18V11M12 18V6M19 18V3"
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

function MailIcon(): ReactNode {
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

/* --------------------------------------------------------------------- */
/* Helpful Links                                                          */
/* --------------------------------------------------------------------- */

const recoveryLinks = [
  {
    label: "Money Records Home",
    description: "Return to the main Money Records website.",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Marketing Campaigns",
    description: "Explore platform-specific promotion options.",
    href: "/services",
    icon: <CampaignIcon />,
  },
  {
    label: "Contact Money Records",
    description: "Get help choosing your next campaign.",
    href: "/#contact",
    icon: <MailIcon />,
  },
];

/* --------------------------------------------------------------------- */
/* Page                                                                   */
/* --------------------------------------------------------------------- */

export default function NotFoundPage() {
  return (
    <div className="mr-page relative overflow-hidden">
      {/* Decorative background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-220px] -z-10 h-[620px] w-[900px] max-w-[110vw] -translate-x-1/2 rounded-full bg-[rgba(211,154,46,0.10)] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_15%,rgba(227,179,77,0.065),transparent_38%)]"
      />

      <Container
        as="section"
        size="wide"
        aria-labelledby="not-found-heading"
        className="flex min-h-[calc(100vh-var(--mr-header-height))] items-center py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          {/* Main error card */}

          <Card
            as="article"
            variant="featured"
            padding="lg"
            topLine
            className="relative flex min-h-[500px] flex-col justify-center overflow-hidden sm:min-h-[560px]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[rgba(227,179,77,0.09)]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[rgba(227,179,77,0.14)]"
            />

            <div className="relative">
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="mr-badge mr-badge-featured">
                  Page Not Found
                </span>

                <span className="mr-badge mr-badge-dark">
                  Error 404
                </span>
              </div>

              <p
                aria-hidden="true"
                className="m-0 bg-[linear-gradient(115deg,var(--mr-gold-50),var(--mr-gold-300),var(--mr-gold-500))] bg-clip-text text-[clamp(5.5rem,16vw,11rem)] font-black leading-[0.76] tracking-[-0.09em] text-transparent opacity-95"
              >
                404
              </p>

              <h1
                id="not-found-heading"
                className="mt-10 max-w-3xl text-balance text-[clamp(2.25rem,5vw,4.7rem)] font-black leading-[0.96] tracking-[-0.052em] text-[var(--mr-text)]"
              >
                This Page Missed the Release Date.
              </h1>

              <p className="mr-subtitle mt-6 max-w-2xl">
                The page may have moved, the link may be outdated, or the
                requested campaign has not launched yet. Return home or explore
                the Money Records marketing storefront.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  href="/"
                  variant="primary"
                  size="lg"
                  leftIcon={<HomeIcon />}
                  className="w-full sm:w-auto"
                >
                  Return Home
                </Button>

                <Button
                  href="/services"
                  variant="secondary"
                  size="lg"
                  rightIcon={<ArrowIcon />}
                  className="w-full sm:w-auto"
                >
                  Explore Campaigns
                </Button>
              </div>
            </div>
          </Card>

          {/* Recovery options */}

          <Card
            as="aside"
            padding="lg"
            className="flex h-full flex-col"
            aria-labelledby="recovery-links-heading"
          >
            <div>
              <p className="mr-eyebrow">Keep Moving</p>

              <h2
                id="recovery-links-heading"
                className="mr-card-title mt-4 text-2xl sm:text-3xl"
              >
                Choose Your Next Destination
              </h2>

              <p className="mt-4 text-sm leading-7 text-white/55">
                Use one of the paths below to continue exploring Money Records.
              </p>
            </div>

            <Divider spacing="md" variant="soft" />

            <nav aria-label="404 recovery navigation">
              <ul className="m-0 grid list-none gap-3 p-0">
                {recoveryLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(227,179,77,0.30)] hover:bg-[rgba(211,154,46,0.055)]"
                    >
                      <span className="mr-icon-ring h-11 w-11 flex-[0_0_44px] transition-transform duration-300 group-hover:scale-105">
                        {item.icon}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-extrabold tracking-[-0.01em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
                          {item.label}
                        </span>

                        <span className="mt-1 block text-xs leading-5 text-white/45">
                          {item.description}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className="shrink-0 text-white/25 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--mr-gold-200)]"
                      >
                        <ArrowIcon />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto pt-8">
              <Divider variant="soft" />

              <div className="mt-7 rounded-2xl border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.045)] p-5">
                <p className="m-0 text-xs font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                  Need Direct Assistance?
                </p>

                <p className="mt-3 text-sm leading-6 text-white/50">
                  Contact the Money Records team for campaign, distribution, or
                  artist-service support.
                </p>

                <a
                  href="mailto:info@moneyrecords.io"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--mr-gold-100)] transition-colors duration-200 hover:text-white"
                >
                  info@moneyrecords.io

                  <ArrowIcon />
                </a>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}