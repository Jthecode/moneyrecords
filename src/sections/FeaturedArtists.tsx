// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Featured Artists                                      ┃
   ┃ File   : src/sections/FeaturedArtists.tsx                             ┃
   ┃ Role   : Premium homepage artist-roster preview                       ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Image from "next/image";
import type {
  CSSProperties,
  ReactNode,
} from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import SectionHeading from "@/components/SectionHeading";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type FeaturedArtist = {
  /**
   * Unique artist identifier.
   */
  id: string;

  /**
   * Public artist name, opportunity title, or roster position.
   */
  name: string;

  /**
   * URL-safe artist or opportunity slug.
   */
  slug: string;

  /**
   * Primary genre, artist category, or opportunity type.
   */
  genre: string;

  /**
   * Short artist or opportunity description.
   */
  description: string;

  /**
   * Optional artist image stored inside /public.
   *
   * Example:
   * "/artists/jryako.jpg"
   */
  imageSrc?: string;

  /**
   * Accessible artist-image description.
   */
  imageAlt?: string;

  /**
   * Short status displayed above the artist name.
   */
  status?: string;

  /**
   * Optional featured release or campaign name.
   */
  featuredRelease?: string;

  /**
   * Optional artist-profile or opportunity route.
   */
  profileHref?: string;

  /**
   * Optional external streaming destination.
   */
  listenHref?: string;

  /**
   * Optional external social profile.
   */
  socialHref?: string;

  /**
   * Visual accent used behind the artist artwork.
   */
  accent?: string;

  /**
   * Optional artist or opportunity highlights.
   */
  highlights?: string[];

  /**
   * Marks the card as an artist-submission or roster opportunity.
   */
  opportunity?: boolean;

  /**
   * Optional override for the primary card button.
   */
  primaryActionLabel?: string;

  /**
   * Optional override for the secondary card button.
   */
  secondaryActionLabel?: string;
};

type FeaturedArtistsProps = {
  /**
   * Optional section ID.
   */
  id?: string;

  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;

  artists?: FeaturedArtist[];

  viewAllHref?: string;
  viewAllLabel?: string;

  submissionHref?: string;
  submissionLabel?: string;
};

type ArtistStyle = CSSProperties & {
  "--artist-accent"?: string;
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

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
    >
      <path
        d="M9 7L17 12L9 17V7Z"
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
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M9 18V6L19 4V16"
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
        cx="16.5"
        cy="16"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
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
        r="0.9"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
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

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M12 3.5L14.5 8.6L20 9.4L16 13.3L16.9 18.8L12 16.2L7.1 18.8L8 13.3L4 9.4L9.5 8.6L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/* Default Artist Data                                                    */
/* --------------------------------------------------------------------- */

const DEFAULT_ARTISTS: FeaturedArtist[] = [
  {
    id: "jryako",
    name: "Jryako",
    slug: "jryako",
    genre: "Hip-Hop · New Wave",
    status: "New Release Spotlight",
    description:
      "An emerging artist bringing high-energy records, modern visuals, and release-ready momentum to the Money Records platform.",
    featuredRelease: "We Outside",
    profileHref: "/artists/jryako",
    accent: "#d39a2e",
    highlights: [
      "Current release campaign",
      "Visual rollout strategy",
      "Audience development",
    ],
    primaryActionLabel: "View Artist",
    secondaryActionLabel: "Learn More",
  },
  {
    id: "next-money-records-artist",
    name: "The Next Money Records Artist",
    slug: "next-money-records-artist",
    genre: "Open Genre Submission",
    status: "Roster Opportunity",
    description:
      "Money Records is building an elite roster of artists ready for serious development, professional releases, and long-term campaign execution.",
    featuredRelease: "Your Next Release",
    profileHref: "/#contact",
    accent: "#b87c20",
    highlights: [
      "Artist submissions open",
      "Label consideration",
      "Development opportunities",
    ],
    opportunity: true,
    primaryActionLabel: "Submit Your Music",
    secondaryActionLabel: "View Opportunity",
  },
  {
    id: "next-roster-spotlight",
    name: "Next Roster Spotlight",
    slug: "next-roster-spotlight",
    genre: "Artist Opportunity",
    status: "Future Featured Artist",
    description:
      "This spotlight is reserved for an artist with strong music, a clear identity, professional work ethic, and a serious vision for growth.",
    featuredRelease: "Future Money Records Release",
    profileHref: "/#contact",
    accent: "#efca70",
    highlights: [
      "Featured roster placement",
      "Release-rollout potential",
      "Marketing campaign access",
    ],
    opportunity: true,
    primaryActionLabel: "Get Considered",
    secondaryActionLabel: "Learn More",
  },
];

/* --------------------------------------------------------------------- */
/* Helpers                                                                */
/* --------------------------------------------------------------------- */

function getArtistInitials(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "MR";
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

/* --------------------------------------------------------------------- */
/* Artist Artwork                                                         */
/* --------------------------------------------------------------------- */

function ArtistArtwork({
  artist,
}: {
  artist: FeaturedArtist;
}) {
  const initials = getArtistInitials(artist.name);

  return (
    <div className="mr-media mr-artist-cover relative">
      {artist.imageSrc ? (
        <Image
          src={artist.imageSrc}
          alt={artist.imageAlt ?? `${artist.name} artist portrait`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover"
        />
      ) : (
        <div
          aria-label={`${artist.name} artwork placeholder`}
          className="absolute inset-0 grid place-items-center overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,color-mix(in_srgb,var(--artist-accent)_32%,transparent),transparent_43%),linear-gradient(145deg,#171719,#09090a_60%,#030304)]"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:34px_34px]"
          />

          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--artist-accent)] opacity-20 blur-[85px]"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[var(--artist-accent)] opacity-10 blur-[100px]"
          />

          <div className="relative grid h-36 w-36 place-items-center rounded-full border border-white/[0.10] bg-black/35 shadow-[0_28px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:h-40 sm:w-40">
            <div
              aria-hidden="true"
              className="absolute inset-3 rounded-full border border-[color-mix(in_srgb,var(--artist-accent)_45%,transparent)]"
            />

            {artist.opportunity ? (
              <span className="text-[var(--mr-gold-100)]">
                <StarIcon />
              </span>
            ) : (
              <span className="mr-text-gradient text-4xl font-black tracking-[-0.06em] sm:text-5xl">
                {initials}
              </span>
            )}
          </div>

          <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between gap-3">
            <span className="mr-badge mr-badge-dark">
              {artist.opportunity
                ? "Artist Opportunity"
                : "Money Records"}
            </span>

            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.12] bg-black/45 text-[var(--mr-gold-100)] backdrop-blur-xl">
              {artist.opportunity ? <StarIcon /> : <MusicIcon />}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Artist Card                                                            */
/* --------------------------------------------------------------------- */

function ArtistCard({
  artist,
}: {
  artist: FeaturedArtist;
}) {
  const profileHref =
    artist.profileHref ?? `/artists/${artist.slug}`;

  const artistStyle: ArtistStyle = {
    "--artist-accent": artist.accent ?? "#d39a2e",
  };

  const primaryActionLabel =
    artist.primaryActionLabel ??
    (artist.opportunity ? "Submit Your Music" : "View Artist");

  const secondaryActionLabel =
    artist.secondaryActionLabel ??
    (artist.opportunity ? "Learn More" : "View Profile");

  return (
    <Card
      as="article"
      variant={artist.opportunity ? "featured" : "default"}
      hover
      fullHeight
      topLine={artist.opportunity}
      className="group"
      style={artistStyle}
    >
      <div className="flex h-full flex-col">
        <ArtistArtwork artist={artist} />

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={[
                "mr-badge",
                artist.opportunity
                  ? "mr-badge-featured"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {artist.status ??
                (artist.opportunity
                  ? "Artist Opportunity"
                  : "Featured Artist")}
            </span>

            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/32">
              {artist.genre}
            </span>
          </div>

          <h3 className="mt-6 text-balance text-[1.75rem] font-black leading-[1.02] tracking-[-0.04em] text-[var(--mr-text)] transition-colors duration-200 group-hover:text-[var(--mr-gold-100)]">
            {artist.name}
          </h3>

          {artist.featuredRelease ? (
            <p className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--mr-gold-200)]">
              {artist.opportunity ? <StarIcon /> : <MusicIcon />}

              <span>{artist.featuredRelease}</span>
            </p>
          ) : null}

          <p className="mt-5 text-sm leading-7 text-white/50">
            {artist.description}
          </p>

          {artist.highlights && artist.highlights.length > 0 ? (
            <ul className="mt-6 grid list-none gap-2.5 p-0">
              {artist.highlights.slice(0, 3).map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 text-xs leading-5 text-white/52"
                >
                  <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.25)] bg-[rgba(211,154,46,0.07)] text-[var(--mr-gold-200)]">
                    <CheckIcon />
                  </span>

                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-auto pt-7">
            <Divider variant="soft" />

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button
                href={profileHref}
                variant={
                  artist.opportunity
                    ? "primary"
                    : "secondary"
                }
                size="sm"
                rightIcon={<ArrowIcon />}
                fullWidth
              >
                {primaryActionLabel}
              </Button>

              {artist.listenHref ? (
                <Button
                  href={artist.listenHref}
                  variant="primary"
                  size="sm"
                  leftIcon={<PlayIcon />}
                  external
                  fullWidth
                >
                  Listen
                </Button>
              ) : artist.socialHref ? (
                <Button
                  href={artist.socialHref}
                  variant="dark"
                  size="sm"
                  leftIcon={<InstagramIcon />}
                  external
                  fullWidth
                >
                  Follow
                </Button>
              ) : (
                <Button
                  href={
                    artist.opportunity
                      ? "/services"
                      : profileHref
                  }
                  variant="ghost"
                  size="sm"
                  rightIcon={<ArrowIcon />}
                  fullWidth
                >
                  {secondaryActionLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Featured Artists Section                                               */
/* --------------------------------------------------------------------- */

export default function FeaturedArtists({
  id,
  eyebrow = "Money Records Roster",
  title = (
    <>
      Artists Built for{" "}
      <span className="mr-text-gradient">
        the Next Level.
      </span>
    </>
  ),
  subtitle = "Discover featured talent, current releases, and opportunities to become part of the developing Money Records roster.",
  artists = DEFAULT_ARTISTS,
  viewAllHref = "/artists",
  viewAllLabel = "Explore All Artists",
  submissionHref = "/#contact",
  submissionLabel = "Submit Your Music",
}: FeaturedArtistsProps) {
  if (artists.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      aria-labelledby="featured-artists-heading"
      className="mr-section relative overflow-hidden"
    >
      {/* Decorative atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-64 top-24 -z-10 h-[560px] w-[560px] rounded-full bg-[rgba(211,154,46,0.055)] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-72 bottom-0 -z-10 h-[600px] w-[600px] rounded-full bg-[rgba(184,124,32,0.045)] blur-[150px]"
      />

      <Container size="wide">
        <SectionHeading
          headingId="featured-artists-heading"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          width="wide"
          right={
            <div className="hidden items-center gap-3 md:flex">
              <Button
                href={submissionHref}
                variant="secondary"
              >
                {submissionLabel}
              </Button>

              <Button
                href={viewAllHref}
                variant="primary"
                rightIcon={<ArrowIcon />}
              >
                {viewAllLabel}
              </Button>
            </div>
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {artists.slice(0, 6).map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
            />
          ))}
        </div>

        {/* Mobile calls to action */}

        <div className="mt-8 grid gap-3 md:hidden">
          <Button
            href={viewAllHref}
            variant="primary"
            rightIcon={<ArrowIcon />}
            fullWidth
          >
            {viewAllLabel}
          </Button>

          <Button
            href={submissionHref}
            variant="secondary"
            fullWidth
          >
            {submissionLabel}
          </Button>
        </div>

        {/* Roster CTA */}

        <Card
          as="aside"
          variant="featured"
          padding="lg"
          topLine
          className="relative mt-8 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[rgba(211,154,46,0.12)] blur-[90px]"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="mr-badge mr-badge-featured">
                Roster Opportunities
              </span>

              <h3 className="mt-5 text-balance text-2xl font-black leading-[1.05] tracking-[-0.038em] text-[var(--mr-text)] sm:text-3xl">
                Think You Belong on the Money Records Roster?
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/52">
                Submit your music, artist story, social profiles, and release
                goals for consideration. Money Records is looking for artists
                with identity, work ethic, quality music, and long-term vision.
              </p>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto lg:min-w-[410px]">
              <Button
                href={submissionHref}
                variant="primary"
                rightIcon={<ArrowIcon />}
                fullWidth
              >
                Submit Your Music
              </Button>

              <Button
                href="/services"
                variant="secondary"
                fullWidth
              >
                Market Your Release
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}