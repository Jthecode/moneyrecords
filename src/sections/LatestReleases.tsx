// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Latest Releases                                      ┃
   ┃ File   : src/sections/LatestReleases.tsx                              ┃
   ┃ Role   : Homepage release catalog powered by shared release data      ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { ReactNode } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import ReleaseCard from "@/components/ReleaseCard";
import SectionHeading from "@/components/SectionHeading";

import {
  getAllReleases,
  type Release,
} from "@/data/releases";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type LatestReleasesProps = {
  /**
   * Optional section anchor.
   *
   * @default "releases"
   */
  id?: string;

  eyebrow?: ReactNode;

  title?: ReactNode;

  subtitle?: ReactNode;

  /**
   * Optional release override.
   *
   * When omitted, this section loads releases from src/data/releases.ts.
   */
  releases?: readonly Release[];

  /**
   * Maximum number of release cards shown on the homepage.
   *
   * @default 6
   */
  limit?: number;

  viewAllHref?: string;

  viewAllLabel?: string;

  campaignHref?: string;

  campaignLabel?: string;

  submissionHref?: string;

  submissionLabel?: string;

  /**
   * Controls whether the release-infrastructure panel is displayed.
   *
   * @default true
   */
  showInfrastructurePanel?: boolean;
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

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

function MusicIcon() {
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

function CheckIcon() {
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

function getSafeLimit(
  value: number,
): number {
  if (
    !Number.isSafeInteger(value) ||
    value < 1
  ) {
    return 6;
  }

  return Math.min(
    value,
    12,
  );
}

/**
 * Featured releases appear first while preserving the catalog's existing
 * newest-first order inside each featured/non-featured group.
 */
function sortHomepageReleases(
  releases: readonly Release[],
): Release[] {
  return [...releases].sort(
    (
      left,
      right,
    ) => {
      const featuredDifference =
        Number(
          Boolean(
            right.featured,
          ),
        ) -
        Number(
          Boolean(
            left.featured,
          ),
        );

      if (
        featuredDifference !== 0
      ) {
        return featuredDifference;
      }

      const leftDate =
        Date.parse(
          `${left.releaseDate}T00:00:00.000Z`,
        );

      const rightDate =
        Date.parse(
          `${right.releaseDate}T00:00:00.000Z`,
        );

      const safeLeftDate =
        Number.isNaN(leftDate)
          ? 0
          : leftDate;

      const safeRightDate =
        Number.isNaN(rightDate)
          ? 0
          : rightDate;

      if (
        safeLeftDate !==
        safeRightDate
      ) {
        return (
          safeRightDate -
          safeLeftDate
        );
      }

      return (
        left.sortOrder -
        right.sortOrder
      );
    },
  );
}

function getVisibleReleases(
  releases: readonly Release[] | undefined,
  limit: number,
): readonly Release[] {
  const catalog =
    releases ??
    getAllReleases();

  return sortHomepageReleases(
    catalog.filter(
      (release) =>
        release.status !==
        "archived",
    ),
  ).slice(
    0,
    getSafeLimit(
      limit,
    ),
  );
}

function getCatalogGridClass(
  releaseCount: number,
): string {
  if (
    releaseCount <= 1
  ) {
    return "grid gap-6";
  }

  if (
    releaseCount === 2
  ) {
    return "grid gap-6 md:grid-cols-2";
  }

  return "grid gap-6 md:grid-cols-2 xl:grid-cols-3";
}

function shouldFeatureCard({
  release,
  index,
  releaseCount,
}: {
  release: Release;
  index: number;
  releaseCount: number;
}): boolean {
  if (
    releaseCount === 1
  ) {
    return true;
  }

  return (
    releaseCount > 2 &&
    index === 0 &&
    release.featured
  );
}

function getReleaseCardClass({
  featured,
  releaseCount,
}: {
  featured: boolean;
  releaseCount: number;
}): string | undefined {
  if (
    releaseCount === 1
  ) {
    return "mx-auto w-full max-w-5xl";
  }

  if (featured) {
    return "md:col-span-2 xl:col-span-2";
  }

  return undefined;
}

/* --------------------------------------------------------------------- */
/* Empty Catalog                                                          */
/* --------------------------------------------------------------------- */

function EmptyReleaseCatalog({
  campaignHref,
  submissionHref,
}: {
  campaignHref: string;
  submissionHref: string;
}) {
  return (
    <Card
      as="section"
      variant="featured"
      padding="lg"
      topLine
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[rgba(227,179,77,0.08)] blur-[110px]"
      />

      <div className="relative mx-auto max-w-2xl py-10 text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-[24px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
          <MusicIcon />
        </span>

        <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
          Money Records Catalog
        </p>

        <h3 className="mt-3 text-3xl font-black tracking-[-0.045em] text-[var(--mr-text)]">
          New Releases Are Coming
        </h3>

        <p className="mt-5 text-sm leading-7 text-white/48 sm:text-base">
          Official artwork, artist profiles, streaming destinations, and
          release details will appear here as the Money Records catalog
          expands.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            href={submissionHref}
            variant="primary"
            size="lg"
            rightIcon={
              <ArrowIcon />
            }
            className="w-full sm:w-auto"
          >
            Submit Your Music
          </Button>

          <Button
            href={campaignHref}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Explore Marketing
          </Button>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Release Infrastructure                                                */
/* --------------------------------------------------------------------- */

function ReleaseInfrastructure({
  campaignHref,
  submissionHref,
}: {
  campaignHref: string;
  submissionHref: string;
}) {
  const capabilities = [
    "Release preparation and positioning",
    "Streaming-platform campaign options",
    "Social and short-form rollout strategy",
    "Press, video, and audience development",
  ];

  return (
    <Card
      as="aside"
      variant="featured"
      padding="lg"
      topLine
      className="relative mt-8 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[rgba(211,154,46,0.11)] blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -left-28 h-80 w-80 rounded-full bg-[rgba(227,179,77,0.045)] blur-[120px]"
      />

      <div className="relative grid gap-9 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="max-w-3xl">
          <span className="mr-badge mr-badge-featured">
            Release Infrastructure
          </span>

          <h3 className="mt-5 text-balance text-2xl font-black leading-[1.05] tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl">
            Every Release Deserves More Than an Upload.
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50 sm:text-base">
            Money Records connects release preparation, artist positioning,
            platform-specific marketing, visual presentation, and post-release
            momentum inside one coordinated music ecosystem.
          </p>

          <ul className="mt-7 grid list-none gap-3 p-0 sm:grid-cols-2">
            {capabilities.map(
              (capability) => (
                <li
                  key={capability}
                  className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.022] p-4"
                >
                  <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.25)] bg-[rgba(211,154,46,0.07)] text-[var(--mr-gold-200)]">
                    <CheckIcon />
                  </span>

                  <span className="text-xs leading-6 text-white/48">
                    {capability}
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="rounded-[26px] border border-[rgba(227,179,77,0.18)] bg-black/25 p-6 sm:p-7">
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
            Build Your Next Rollout
          </p>

          <h4 className="mt-3 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
            Release and Campaign Support
          </h4>

          <p className="mt-4 text-sm leading-7 text-white/44">
            Choose a platform service for an existing release or submit your
            music to the Money Records team.
          </p>

          <div className="mt-6 grid gap-3">
            <Button
              href={campaignHref}
              variant="primary"
              size="lg"
              rightIcon={
                <ArrowIcon />
              }
              fullWidth
            >
              Build a Release Campaign
            </Button>

            <Button
              href={submissionHref}
              variant="secondary"
              size="lg"
              fullWidth
            >
              Submit Music to the Label
            </Button>
          </div>

          <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.12em] text-white/26">
            Submission does not guarantee signing, distribution, or campaign
            acceptance.
          </p>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Latest Releases Section                                                */
/* --------------------------------------------------------------------- */

export default function LatestReleases({
  id = "releases",

  eyebrow = "Money Records Catalog",

  title = (
    <>
      New Music.{" "}
      <span className="mr-text-gradient">
        Built to Move.
      </span>
    </>
  ),

  subtitle =
    "Explore current releases, upcoming music, official artist pages, and verified streaming destinations from Money Records.",

  releases,

  limit = 6,

  viewAllHref = "/releases",

  viewAllLabel = "Explore All Releases",

  campaignHref = "/services",

  campaignLabel = "Promote Your Release",

  submissionHref = "/submit-music",

  submissionLabel = "Submit Your Music",

  showInfrastructurePanel = true,
}: LatestReleasesProps) {
  const visibleReleases =
    getVisibleReleases(
      releases,
      limit,
    );

  const releaseCount =
    visibleReleases.length;

  return (
    <section
      id={id}
      aria-labelledby="latest-releases-heading"
      className="mr-section relative scroll-mt-28 overflow-hidden"
    >
      {/* Decorative atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[680px] w-[1100px] max-w-[112vw] -translate-x-1/2 rounded-full bg-[rgba(211,154,46,0.05)] blur-[165px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.18] [background-image:radial-gradient(rgba(227,179,77,0.12)_0.7px,transparent_0.7px)] [background-size:24px_24px]"
      />

      <Container size="wide">
        <SectionHeading
          headingId="latest-releases-heading"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          width="wide"
          right={
            <div className="hidden items-center gap-3 md:flex">
              <Button
                href={campaignHref}
                variant="secondary"
              >
                {campaignLabel}
              </Button>

              <Button
                href={viewAllHref}
                variant="primary"
                rightIcon={
                  <ArrowIcon />
                }
              >
                {viewAllLabel}
              </Button>
            </div>
          }
        />

        <Divider
          className="my-8"
          variant="strong"
        />

        {/* Release catalog */}

        {releaseCount > 0 ? (
          <div
            className={getCatalogGridClass(
              releaseCount,
            )}
          >
            {visibleReleases.map(
              (
                release,
                index,
              ) => {
                const featured =
                  shouldFeatureCard({
                    release,
                    index,
                    releaseCount,
                  });

                return (
                  <ReleaseCard
                    key={release.id}
                    release={release}
                    variant={
                      featured
                        ? "featured"
                        : "default"
                    }
                    priority={
                      index < 2
                    }
                    showArtist
                    showDescription
                    showGenres
                    showStreamingLink
                    className={getReleaseCardClass({
                      featured,
                      releaseCount,
                    })}
                  />
                );
              },
            )}
          </div>
        ) : (
          <EmptyReleaseCatalog
            campaignHref={campaignHref}
            submissionHref={submissionHref}
          />
        )}

        {/* Mobile actions */}

        <div className="mt-8 grid gap-3 md:hidden">
          <Button
            href={viewAllHref}
            variant="primary"
            rightIcon={
              <ArrowIcon />
            }
            fullWidth
          >
            {viewAllLabel}
          </Button>

          <Button
            href={campaignHref}
            variant="secondary"
            fullWidth
          >
            {campaignLabel}
          </Button>

          <Button
            href={submissionHref}
            variant="ghost"
            fullWidth
          >
            {submissionLabel}
          </Button>
        </div>

        {/* Release infrastructure */}

        {showInfrastructurePanel ? (
          <ReleaseInfrastructure
            campaignHref={campaignHref}
            submissionHref={submissionHref}
          />
        ) : null}
      </Container>
    </section>
  );
}