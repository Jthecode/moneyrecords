// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Release Profile Page                                 ┃
   ┃ File   : src/app/releases/[slug]/page.tsx                            ┃
   ┃ Role   : Dynamic release details, streaming links, credits, and CTA  ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import ReleaseCard from "@/components/ReleaseCard";
import StreamingLinks from "@/components/StreamingLinks";

import {
  formatReleaseDate,
  getPrimaryReleaseLink,
  getRelatedReleases,
  getReleaseBySlug,
  getReleaseContentRatingLabel,
  getReleaseStaticParams,
  getReleaseStatusLabel,
  getReleaseTypeLabel,
  type Release,
  type ReleaseCredit,
} from "@/data/releases";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                    */
/* --------------------------------------------------------------------- */

export const dynamic = "force-static";

export const dynamicParams = false;

/* --------------------------------------------------------------------- */
/* Constants                                                              */
/* --------------------------------------------------------------------- */

const DEFAULT_SITE_URL =
  "https://moneyrecords.io";

const SUPPORT_EMAIL =
  "info@moneyrecords.io";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type ReleaseProfilePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ReleaseMetricProps = {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
};

type ReleaseDetailRowProps = {
  label: string;
  value: ReactNode;
  accent?: boolean;
};

/* --------------------------------------------------------------------- */
/* Static Parameters                                                      */
/* --------------------------------------------------------------------- */

export function generateStaticParams() {
  return getReleaseStaticParams();
}

/* --------------------------------------------------------------------- */
/* Dynamic Metadata                                                       */
/* --------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: ReleaseProfilePageProps): Promise<Metadata> {
  const { slug } = await params;

  const release =
    getReleaseBySlug(slug);

  if (!release) {
    return {
      title:
        "Release Not Found",

      description:
        "The requested Money Records release could not be found.",

      robots: {
        index:
          false,

        follow:
          false,
      },
    };
  }

  const canonicalPath =
    `/releases/${release.slug}`;

  const title =
    release.seoTitle ??
    `${release.title} by ${release.artistName}`;

  const description =
    release.seoDescription ??
    release.shortDescription;

  return {
    title,

    description,

    keywords: [
      release.title,
      release.artistName,
      `${release.title} ${release.artistName}`,
      `${release.artistName} music`,
      `${release.title} Money Records`,
      ...release.genres,
      ...release.moods,
      "Money Records release",
      "independent music",
      "new music",
      "music streaming",
    ],

    alternates: {
      canonical:
        canonicalPath,
    },

    openGraph: {
      type:
        "website",

      title:
        `${release.title} by ${release.artistName}`,

      description,

      url:
        canonicalPath,

      images: [
        {
          url:
            release.heroImageSrc,

          alt:
            release.coverAlt,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        `${release.title} by ${release.artistName}`,

      description,

      images: [
        release.heroImageSrc,
      ],
    },
  };
}

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

function BackIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
    >
      <path
        d="M19 12H5M10 7L5 12L10 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
    >
      <path
        d="M9 7.5L17 12L9 16.5V7.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
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
      width="20"
      height="20"
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

function ArtistIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
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

function CalendarIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <rect
        x="4"
        y="5.5"
        width="16"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M8 3.5V7.5M16 3.5V7.5M4 9.5H20"
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

function GlobeIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
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

function LinkIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M9.5 14.5L14.5 9.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M7.5 17H6.5C4.6 17 3 15.4 3 13.5C3 12.5 3.4 11.7 4 11L7 8C8.4 6.6 10.6 6.6 12 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M16.5 7H17.5C19.4 7 21 8.6 21 10.5C21 11.5 20.6 12.3 20 13L17 16C15.6 17.4 13.4 17.4 12 16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EmailIcon(): ReactNode {
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
/* Utilities                                                              */
/* --------------------------------------------------------------------- */

function getSiteOrigin(): string {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    return DEFAULT_SITE_URL;
  }

  try {
    return new URL(
      configuredUrl,
    ).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

function getArtistHref(
  release: Release,
): string {
  return `/artists/${release.artistSlug}`;
}

function getPrimaryActionLabel(
  release: Release,
): string {
  const primaryLink =
    getPrimaryReleaseLink(
      release,
    );

  if (
    primaryLink
      ?.actionLabel
  ) {
    return primaryLink.actionLabel;
  }

  if (
    release.status ===
    "upcoming"
  ) {
    return "Pre-Save Release";
  }

  return "Listen Now";
}

function getReleaseAvailabilityLabel(
  release: Release,
): string {
  switch (
    release.status
  ) {
    case "upcoming":
      return "Upcoming Release";

    case "released":
      return "Available Now";

    case "archived":
      return "Catalog Release";

    default:
      return "Official Release";
  }
}

function getReleaseAvailabilityDescription(
  release: Release,
): string {
  switch (
    release.status
  ) {
    case "upcoming":
      return "Official streaming and pre-save destinations will appear as they become available.";

    case "released":
      return "Use an official destination below to listen, watch, or save this release.";

    case "archived":
      return "Explore the available official destinations for this Money Records catalog release.";

    default:
      return "Explore the official destinations connected to this release.";
  }
}

/* --------------------------------------------------------------------- */
/* Release Metric                                                         */
/* --------------------------------------------------------------------- */

function ReleaseMetric({
  icon,
  label,
  value,
  description,
}: ReleaseMetricProps) {
  return (
    <Card
      as="article"
      padding="md"
      hover
      fullHeight
      className="group"
    >
      <div className="flex h-full items-start gap-4">
        <span className="grid h-11 w-11 flex-[0_0_44px] place-items-center rounded-xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
          {icon}
        </span>

        <div className="min-w-0">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
            {label}
          </p>

          <p className="mt-2 break-words text-lg font-black leading-6 tracking-[-0.03em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
            {value}
          </p>

          <p className="mt-2 text-xs leading-5 text-white/42">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Detail Row                                                             */
/* --------------------------------------------------------------------- */

function ReleaseDetailRow({
  label,
  value,
  accent = false,
}: ReleaseDetailRowProps) {
  return (
    <div className="flex flex-col gap-2 border-b border-white/[0.055] py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white/35">
        {label}
      </span>

      <span
        className={
          accent
            ? "break-words text-sm font-black text-[var(--mr-gold-200)] sm:max-w-[65%] sm:text-right"
            : "break-words text-sm font-black text-[var(--mr-text)] sm:max-w-[65%] sm:text-right"
        }
      >
        {value}
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Release Credit                                                         */
/* --------------------------------------------------------------------- */

function ReleaseCreditCard({
  credit,
  index,
}: {
  credit: ReleaseCredit;
  index: number;
}) {
  return (
    <Card
      as="article"
      padding="md"
      hover
      fullHeight
      className="group"
    >
      <div className="flex items-start gap-4">
        <span className="grid h-10 w-10 flex-[0_0_40px] place-items-center rounded-xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[9px] font-black text-[var(--mr-gold-200)]">
          {String(
            index + 1,
          ).padStart(
            2,
            "0",
          )}
        </span>

        <div className="min-w-0">
          <p className="m-0 text-[8px] font-black uppercase tracking-[0.16em] text-white/32">
            {credit.role}
          </p>

          <p className="mt-2 break-words text-base font-black text-[var(--mr-text)] transition-colors group-hover:text-[var(--mr-gold-100)]">
            {credit.name}
          </p>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Release Profile Page                                                   */
/* --------------------------------------------------------------------- */

export default async function ReleaseProfilePage({
  params,
}: ReleaseProfilePageProps) {
  const { slug } = await params;

  const release =
    getReleaseBySlug(slug);

  if (!release) {
    notFound();
  }

  const primaryLink =
    getPrimaryReleaseLink(
      release,
    );

  const relatedReleases =
    getRelatedReleases(
      release,
      3,
    );

  const artistHref =
    getArtistHref(
      release,
    );

  const siteOrigin =
    getSiteOrigin();

  const releaseUrl =
    `${siteOrigin}${release.href}`;

  const artistUrl =
    `${siteOrigin}${artistHref}`;

  const coverUrl =
    new URL(
      release.coverSrc,
      siteOrigin,
    ).toString();

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "MusicRecording",

    "@id":
      `${releaseUrl}#recording`,

    name:
      release.title,

    url:
      releaseUrl,

    description:
      release.shortDescription,

    image:
      coverUrl,

    datePublished:
      release.releaseDate,

    genre:
      release.genres,

    byArtist: {
      "@type":
        "MusicGroup",

      name:
        release.artistName,

      url:
        artistUrl,
    },

    publisher: {
      "@type":
        "Organization",

      name:
        "Money Records LLC",

      url:
        siteOrigin,
    },

    sameAs:
      release.links.map(
        (link) =>
          link.href,
      ),

    ...(release.copyrightLine
      ? {
          copyrightNotice:
            release.copyrightLine,
        }
      : {}),
  };

  return (
    <div
      id="top"
      className="mr-page relative min-h-screen overflow-hidden"
    >
      {/* Page atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[1050px] w-[1550px] max-w-[132vw] -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.05)] blur-[215px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.16] [background-image:radial-gradient(rgba(227,179,77,0.11)_0.7px,transparent_0.7px)] [background-size:28px_28px]"
      />

      <Container size="wide">
        <main className="py-8 md:py-12">
          {/* ----------------------------------------------------------- */}
          {/* Breadcrumb                                                  */}
          {/* ----------------------------------------------------------- */}

          <nav
            aria-label="Release breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/releases"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/42 transition hover:text-[var(--mr-gold-200)]"
            >
              <BackIcon />
              All Releases
            </Link>

            <span
              aria-hidden="true"
              className="text-white/18"
            >
              /
            </span>

            <Link
              href={artistHref}
              className="text-[10px] font-black uppercase tracking-[0.16em] text-white/42 transition hover:text-[var(--mr-gold-200)]"
            >
              {release.artistName}
            </Link>
          </nav>

          {/* ----------------------------------------------------------- */}
          {/* Release Hero                                                */}
          {/* ----------------------------------------------------------- */}

          <header className="relative overflow-hidden rounded-[32px] border border-[rgba(227,179,77,0.22)] bg-[linear-gradient(145deg,rgba(18,17,15,0.98),rgba(6,6,7,0.99))] shadow-[0_34px_130px_rgba(0,0,0,0.6)]">
            <Image
              src={release.heroImageSrc}
              alt=""
              fill
              priority
              sizes="100vw"
              className="-z-20 object-cover opacity-30"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,4,5,0.99)_0%,rgba(4,4,5,0.93)_54%,rgba(4,4,5,0.66)_100%)]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-44 -top-48 h-[620px] w-[620px] rounded-full bg-[rgba(227,179,77,0.16)] blur-[165px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-52 -left-40 h-[470px] w-[470px] rounded-full bg-[rgba(227,179,77,0.055)] blur-[145px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.82),transparent)]"
            />

            <div className="relative grid gap-10 p-6 sm:p-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:p-12">
              {/* Release artwork */}

              <div className="mx-auto w-full max-w-[500px] lg:mx-0">
                <div className="relative aspect-square overflow-hidden rounded-[30px] border border-[rgba(227,179,77,0.24)] bg-black/35 shadow-[0_34px_120px_rgba(0,0,0,0.68)]">
                  <Image
                    src={release.coverSrc}
                    alt={release.coverAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 42vw"
                    className="object-cover"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(145deg,transparent_45%,rgba(0,0,0,0.42))]"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_80%_8%,rgba(227,179,77,0.19),transparent_38%)]"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.76),transparent)]"
                  />

                  <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-3">
                    <span
                      className={[
                        "inline-flex min-h-8 items-center gap-2 rounded-full border px-4",
                        "text-[8px] font-black uppercase tracking-[0.16em]",
                        release.status ===
                        "released"
                          ? "border-emerald-300/20 bg-black/60 text-emerald-300"
                          : "border-[rgba(227,179,77,0.26)] bg-black/60 text-[var(--mr-gold-200)]",
                      ].join(" ")}
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_12px_currentColor]"
                      />

                      {getReleaseStatusLabel(
                        release,
                      )}
                    </span>

                    {release.contentRating ===
                    "explicit" ? (
                      <span
                        aria-label="Explicit content"
                        className="grid h-8 w-8 place-items-center rounded-[7px] border border-white/15 bg-black/60 text-[11px] font-black text-white/70"
                      >
                        E
                      </span>
                    ) : null}
                  </div>

                  <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/[0.08] bg-black/45 p-4 backdrop-blur-md">
                    <p className="m-0 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)]">
                      Official Money Records Release
                    </p>

                    <div className="mt-2 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-lg font-black text-white">
                          {release.title}
                        </p>

                        <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-white/42">
                          {release.artistName}
                        </p>
                      </div>

                      <span className="inline-flex min-h-7 items-center rounded-full border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.07)] px-3 text-[8px] font-black uppercase tracking-[0.14em] text-[var(--mr-gold-200)]">
                        {getReleaseTypeLabel(
                          release.type,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Release information */}

              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex min-h-8 items-center rounded-full border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] px-4 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)]">
                    {release.eyebrow}
                  </span>

                  {release.featured ? (
                    <span className="inline-flex min-h-8 items-center rounded-full border border-white/[0.09] bg-white/[0.035] px-4 text-[8px] font-black uppercase tracking-[0.16em] text-white/52">
                      Featured Release
                    </span>
                  ) : null}
                </div>

                <h1 className="mt-7 text-balance text-5xl font-black leading-[0.91] tracking-[-0.07em] text-[var(--mr-text)] sm:text-6xl lg:text-7xl">
                  {release.title}
                </h1>

                <Link
                  href={artistHref}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-white/60 transition hover:text-[var(--mr-gold-200)]"
                >
                  By {release.artistName}
                  <ArrowIcon />
                </Link>

                <p className="mt-7 max-w-3xl text-lg font-black leading-8 tracking-[-0.025em] text-white/78 sm:text-xl">
                  {release.tagline}
                </p>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/49 sm:text-base">
                  {release.shortDescription}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  <span className="mr-badge">
                    {getReleaseTypeLabel(
                      release.type,
                    )}
                  </span>

                  <span className="mr-badge">
                    {formatReleaseDate(
                      release.releaseDate,
                    )}
                  </span>

                  {release.genres.map(
                    (genre) => (
                      <span
                        key={genre}
                        className="mr-badge"
                      >
                        {genre}
                      </span>
                    ),
                  )}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {primaryLink ? (
                    <Button
                      href={primaryLink.href}
                      variant="primary"
                      size="lg"
                      leftIcon={
                        <PlayIcon />
                      }
                      rightIcon={
                        <ArrowIcon />
                      }
                      external
                      className="w-full sm:w-auto"
                    >
                      {getPrimaryActionLabel(
                        release,
                      )}
                    </Button>
                  ) : (
                    <Button
                      href="#streaming"
                      variant="primary"
                      size="lg"
                      leftIcon={
                        <MusicIcon />
                      }
                      className="w-full sm:w-auto"
                    >
                      View Streaming Options
                    </Button>
                  )}

                  <Button
                    href={artistHref}
                    variant="secondary"
                    size="lg"
                    leftIcon={
                      <ArtistIcon />
                    }
                    className="w-full sm:w-auto"
                  >
                    View Artist Profile
                  </Button>

                  <Button
                    href="/services"
                    variant="ghost"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Promote Your Release
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* ----------------------------------------------------------- */}
          {/* Release Overview                                            */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-label={`${release.title} release overview`}
            className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <ReleaseMetric
              icon={
                <MusicIcon />
              }
              label="Release Type"
              value={getReleaseTypeLabel(
                release.type,
              )}
              description="The official public format of this Money Records release."
            />

            <ReleaseMetric
              icon={
                <CalendarIcon />
              }
              label="Release Date"
              value={formatReleaseDate(
                release.releaseDate,
              )}
              description="The official public release date listed by Money Records."
            />

            <ReleaseMetric
              icon={
                <ArtistIcon />
              }
              label="Primary Artist"
              value={
                release.artistName
              }
              description="The artist connected to this official Money Records release."
            />

            <ReleaseMetric
              icon={
                <ShieldIcon />
              }
              label="Content Rating"
              value={getReleaseContentRatingLabel(
                release.contentRating,
              )}
              description="The content classification currently attached to this release."
            />
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Release Story and Streaming                                 */}
          {/* ----------------------------------------------------------- */}

          <div className="grid gap-8 py-14 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-start md:py-20">
            {/* Release story */}

            <section
              aria-labelledby="release-story-heading"
              className="min-w-0"
            >
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Behind the Release
              </p>

              <h2
                id="release-story-heading"
                className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
              >
                About{" "}
                {release.title}
              </h2>

              <Card
                as="article"
                variant="featured"
                padding="lg"
                topLine
                className="relative mt-7 overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[rgba(227,179,77,0.075)] blur-[120px]"
                />

                <div className="relative space-y-6">
                  {release.description.map(
                    (
                      paragraph,
                      index,
                    ) => (
                      <p
                        key={`${release.id}-description-${index}`}
                        className="m-0 text-sm leading-8 text-white/52 sm:text-base"
                      >
                        {paragraph}
                      </p>
                    ),
                  )}
                </div>
              </Card>

              {/* Mood and creative direction */}

              <Card
                as="section"
                padding="lg"
                className="relative mt-6 overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[rgba(227,179,77,0.055)] blur-[100px]"
                />

                <div className="relative">
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                    Creative Direction
                  </p>

                  <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
                    Release Identity
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/47">
                    The public genres and moods below describe the creative
                    direction connected to this release.
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-white/[0.065] bg-white/[0.025] p-5">
                      <p className="m-0 text-[9px] font-black uppercase tracking-[0.16em] text-white/34">
                        Genres
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {release.genres.map(
                          (genre) => (
                            <span
                              key={genre}
                              className="mr-badge"
                            >
                              {genre}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-white/[0.065] bg-white/[0.025] p-5">
                      <p className="m-0 text-[9px] font-black uppercase tracking-[0.16em] text-white/34">
                        Mood
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {release.moods.length >
                        0 ? (
                          release.moods.map(
                            (mood) => (
                              <span
                                key={mood}
                                className="inline-flex min-h-8 items-center rounded-full border border-white/[0.085] bg-white/[0.035] px-4 text-[9px] font-black uppercase tracking-[0.13em] text-white/52"
                              >
                                {mood}
                              </span>
                            ),
                          )
                        ) : (
                          <span className="text-sm text-white/42">
                            Creative mood information is coming soon.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Streaming sidebar */}

            <aside
              id="streaming"
              className="scroll-mt-28 lg:sticky lg:top-28"
            >
              <Card
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
                aria-labelledby="streaming-links-heading"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-[rgba(227,179,77,0.1)] blur-[105px]"
                />

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                      <GlobeIcon />
                    </span>

                    <div>
                      <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                        {getReleaseAvailabilityLabel(
                          release,
                        )}
                      </p>

                      <h2
                        id="streaming-links-heading"
                        className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]"
                      >
                        Listen and Stream
                      </h2>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-white/46">
                    {getReleaseAvailabilityDescription(
                      release,
                    )}
                  </p>

                  <Divider
                    className="my-7"
                    variant="soft"
                  />

                  <StreamingLinks
                    links={
                      release.links
                    }
                    variant="stack"
                    showHeader={false}
                    emptyMessage="Official streaming destinations are being prepared for this release."
                  />

                  <Divider
                    className="my-7"
                    variant="soft"
                  />

                  <div className="grid gap-3">
                    <Button
                      href={artistHref}
                      variant="secondary"
                      size="lg"
                      leftIcon={
                        <ArtistIcon />
                      }
                      fullWidth
                    >
                      View {release.artistName}
                    </Button>

                    <Button
                      href="/releases"
                      variant="ghost"
                      size="sm"
                      leftIcon={
                        <BackIcon />
                      }
                      fullWidth
                    >
                      Explore All Releases
                    </Button>
                  </div>

                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4">
                    <span className="mt-0.5 text-[var(--mr-gold-200)]">
                      <LinkIcon />
                    </span>

                    <p className="m-0 text-xs leading-6 text-white/42">
                      Streaming buttons open official external release
                      destinations in a new browser tab.
                    </p>
                  </div>
                </div>
              </Card>
            </aside>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Credits and Release Details                                 */}
          {/* ----------------------------------------------------------- */}

          <section
            aria-labelledby="release-details-heading"
            className="pb-14 md:pb-20"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                  Official Information
                </p>

                <h2
                  id="release-details-heading"
                  className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
                >
                  Release Details
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/48 sm:text-base">
                  Official artist, label, date, classification, and public
                  credit information connected to this release.
                </p>
              </div>

              <Button
                href={artistHref}
                variant="secondary"
                size="lg"
                rightIcon={
                  <ArrowIcon />
                }
                className="w-full md:w-auto"
              >
                View Artist Profile
              </Button>
            </div>

            <Divider
              className="my-8"
              variant="strong"
            />

            <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
              {/* Release information */}

              <Card
                as="article"
                variant="featured"
                padding="lg"
                topLine
                className="relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[rgba(227,179,77,0.08)] blur-[105px]"
                />

                <div className="relative">
                  <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                    Release Information
                  </p>

                  <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                    {release.title}
                  </h3>

                  <Divider
                    className="my-7"
                    variant="soft"
                  />

                  <ReleaseDetailRow
                    label="Artist"
                    value={
                      <Link
                        href={artistHref}
                        className="transition hover:text-[var(--mr-gold-100)]"
                      >
                        {release.artistName}
                      </Link>
                    }
                    accent
                  />

                  <ReleaseDetailRow
                    label="Release Type"
                    value={getReleaseTypeLabel(
                      release.type,
                    )}
                  />

                  <ReleaseDetailRow
                    label="Release Date"
                    value={formatReleaseDate(
                      release.releaseDate,
                    )}
                  />

                  <ReleaseDetailRow
                    label="Status"
                    value={getReleaseStatusLabel(
                      release,
                    )}
                  />

                  <ReleaseDetailRow
                    label="Content Rating"
                    value={getReleaseContentRatingLabel(
                      release.contentRating,
                    )}
                  />

                  <ReleaseDetailRow
                    label="Record Label"
                    value="Money Records LLC"
                  />

                  {release.copyrightLine ? (
                    <ReleaseDetailRow
                      label="Copyright"
                      value={
                        release.copyrightLine
                      }
                    />
                  ) : null}
                </div>
              </Card>

              {/* Credits */}

              <Card
                as="section"
                padding="lg"
                className="relative overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[rgba(227,179,77,0.055)] blur-[100px]"
                />

                <div className="relative">
                  <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                    Public Credits
                  </p>

                  <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                    Release Team
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/46">
                    Public credits currently connected to this official
                    Money Records release.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {release.credits &&
                    release.credits.length >
                      0 ? (
                      release.credits.map(
                        (
                          credit,
                          index,
                        ) => (
                          <ReleaseCreditCard
                            key={`${credit.role}-${credit.name}`}
                            credit={
                              credit
                            }
                            index={
                              index
                            }
                          />
                        ),
                      )
                    ) : (
                      <div className="sm:col-span-2 rounded-[22px] border border-white/[0.065] bg-white/[0.025] p-6 text-center">
                        <span className="mx-auto grid h-14 w-14 place-items-center rounded-[18px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                          <MusicIcon />
                        </span>

                        <p className="mt-5 text-sm leading-7 text-white/45">
                          Additional public release credits will be added as
                          they become available.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Campaign CTA                                                */}
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
                className="pointer-events-none absolute -right-36 -top-40 h-[500px] w-[500px] rounded-full bg-[rgba(227,179,77,0.11)] blur-[145px]"
              />

              <div className="relative grid gap-10 lg:grid-cols-[1fr_0.76fr] lg:items-center">
                <div>
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Release Marketing
                  </p>

                  <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl">
                    Build Momentum Around{" "}
                    <span className="mr-text-gradient">
                      Your Next Release.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-white/48 sm:text-base">
                    Money Records offers individual promotional services for
                    Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO,
                    press, radio, SoundCloud, and artist branding.
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {[
                      "Platform-specific campaign options",
                      "Release positioning and rollout support",
                      "Streaming and social visibility services",
                      "Artist branding, PR, and visual strategy",
                    ].map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4"
                        >
                          <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
                            <CheckIcon />
                          </span>

                          <p className="m-0 text-xs leading-6 text-white/47">
                            {item}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="rounded-[26px] border border-[rgba(227,179,77,0.2)] bg-black/25 p-6 sm:p-8">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
                      <GlobeIcon />
                    </span>

                    <div>
                      <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                        Money Records
                      </p>

                      <h3 className="mt-1 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                        Platform Marketing
                      </h3>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-white/46">
                    Select the platform, campaign target, and service level
                    that matches your release goals.
                  </p>

                  <div className="mt-6 grid gap-3">
                    <Button
                      href={
                        release.campaign
                          ?.href ??
                        "/services"
                      }
                      variant="primary"
                      size="lg"
                      rightIcon={
                        <ArrowIcon />
                      }
                      fullWidth
                    >
                      {release.campaign
                        ?.label ??
                        "Explore Platform Services"}
                    </Button>

                    <Button
                      href="/submit-music"
                      variant="secondary"
                      size="lg"
                      fullWidth
                    >
                      Submit Your Music
                    </Button>

                    <Button
                      href={`mailto:${SUPPORT_EMAIL}`}
                      variant="ghost"
                      size="sm"
                      leftIcon={
                        <EmailIcon />
                      }
                      fullWidth
                    >
                      Contact Money Records
                    </Button>
                  </div>

                  {release.campaign
                    ?.description ? (
                    <p className="mt-5 text-[10px] leading-5 text-white/31">
                      {
                        release
                          .campaign
                          .description
                      }
                    </p>
                  ) : null}
                </div>
              </div>
            </Card>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Related Releases                                            */}
          {/* ----------------------------------------------------------- */}

          {relatedReleases.length >
          0 ? (
            <section
              aria-labelledby="related-releases-heading"
              className="pb-14 md:pb-20"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl">
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    More Music
                  </p>

                  <h2
                    id="related-releases-heading"
                    className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--mr-text)] sm:text-4xl"
                  >
                    Related Releases
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/48 sm:text-base">
                    Explore more releases from the Money Records catalog.
                  </p>
                </div>

                <Button
                  href="/releases"
                  variant="secondary"
                  size="lg"
                  rightIcon={
                    <ArrowIcon />
                  }
                  className="w-full md:w-auto"
                >
                  Explore All Releases
                </Button>
              </div>

              <Divider
                className="my-8"
                variant="strong"
              />

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {relatedReleases.map(
                  (
                    relatedRelease,
                    index,
                  ) => (
                    <ReleaseCard
                      key={
                        relatedRelease.id
                      }
                      release={
                        relatedRelease
                      }
                      variant="default"
                      priority={
                        index < 2
                      }
                      showArtist
                      showDescription
                      showGenres
                      showStreamingLink
                    />
                  ),
                )}
              </div>
            </section>
          ) : null}

          {/* ----------------------------------------------------------- */}
          {/* Final Navigation                                            */}
          {/* ----------------------------------------------------------- */}

          <section className="pb-16">
            <Card
              padding="lg"
              className="relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[rgba(227,179,77,0.075)] blur-[120px]"
              />

              <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
                <div className="max-w-3xl">
                  <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                    Continue Exploring
                  </p>

                  <h2 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl">
                    Discover More From Money Records
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/47">
                    Explore the complete release catalog, artist roster, and
                    platform-marketing storefront.
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                  <Button
                    href="/releases"
                    variant="primary"
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    All Releases
                  </Button>

                  <Button
                    href="/artists"
                    variant="secondary"
                    size="lg"
                    className="w-full md:w-auto"
                  >
                    Artist Roster
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        </main>
      </Container>

      {/* --------------------------------------------------------------- */}
      {/* Structured Data                                                 */}
      {/* --------------------------------------------------------------- */}

      <script
        id={`${release.slug}-release-schema`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData,
            ).replaceAll(
              "<",
              "\\u003c",
            ),
        }}
      />
    </div>
  );
}