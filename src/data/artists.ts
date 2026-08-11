// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Artist Data                                          ┃
   ┃ File   : src/data/artists.ts                                         ┃
   ┃ Role   : Typed artist roster, profiles, links, and lookup helpers     ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

/* --------------------------------------------------------------------- */
/* Artist Status                                                          */
/* --------------------------------------------------------------------- */

export const ARTIST_STATUSES = [
  "active",
  "developing",
  "alumni",
] as const;

export type ArtistStatus =
  (typeof ARTIST_STATUSES)[number];

/* --------------------------------------------------------------------- */
/* Link Types                                                             */
/* --------------------------------------------------------------------- */

export type ArtistSocialPlatform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "x"
  | "facebook"
  | "website";

export type ArtistStreamingPlatform =
  | "spotify"
  | "apple-music"
  | "youtube-music"
  | "soundcloud"
  | "amazon-music"
  | "tidal"
  | "deezer";

export type ArtistSocialLink = {
  platform: ArtistSocialPlatform;
  label: string;
  href: string;
};

export type ArtistStreamingLink = {
  platform: ArtistStreamingPlatform;
  label: string;
  href: string;
};

/* --------------------------------------------------------------------- */
/* Artist Release Preview                                                 */
/* --------------------------------------------------------------------- */

export type ArtistReleasePreview = {
  /**
   * Release route slug.
   *
   * Example:
   * we-outside
   */
  slug: string;

  title: string;

  /**
   * Optional release subtitle or format.
   *
   * Example:
   * Single
   */
  type?: string;

  /**
   * ISO date formatted as YYYY-MM-DD.
   */
  releaseDate?: string;

  artworkSrc?: string;

  href: string;

  description?: string;

  featured?: boolean;
};

/* --------------------------------------------------------------------- */
/* Artist Metrics                                                         */
/* --------------------------------------------------------------------- */

/**
 * Optional display metrics.
 *
 * Only add values that Money Records can support and verify. These values
 * are presentation text and should not be used for financial reporting.
 */
export type ArtistDisplayMetric = {
  label: string;
  value: string;
};

/* --------------------------------------------------------------------- */
/* Artist Type                                                            */
/* --------------------------------------------------------------------- */

export type Artist = {
  /**
   * Stable internal identifier.
   */
  id: string;

  /**
   * Public route slug.
   *
   * Example:
   * /artists/jryako
   */
  slug: string;

  /**
   * Main public artist name.
   */
  name: string;

  /**
   * Optional legal, alternate, or expanded artist name.
   */
  fullName?: string;

  /**
   * Short label displayed above the artist name.
   */
  eyebrow: string;

  /**
   * Short artist positioning statement.
   */
  tagline: string;

  /**
   * Compact text used on artist cards.
   */
  shortBio: string;

  /**
   * Full biography paragraphs used on the artist profile page.
   */
  biography: readonly string[];

  genres: readonly string[];

  location?: string;

  imageSrc: string;

  heroImageSrc: string;

  imageAlt: string;

  status: ArtistStatus;

  featured: boolean;

  /**
   * Lower numbers appear first.
   */
  sortOrder: number;

  socialLinks: readonly ArtistSocialLink[];

  streamingLinks: readonly ArtistStreamingLink[];

  releases: readonly ArtistReleasePreview[];

  metrics?: readonly ArtistDisplayMetric[];

  bookingEmail?: string;

  managementEmail?: string;
};

/* --------------------------------------------------------------------- */
/* Artist Roster                                                          */
/* --------------------------------------------------------------------- */

/**
 * Money Records artist roster.
 *
 * Supa Jhittt is intentionally not included.
 *
 * The Money Records crest and world-map image are temporary safe fallbacks
 * until final artist photography and artwork are added to /public/artists.
 */
export const artists = [
  {
    id: "artist_jryako",
    slug: "jryako",
    name: "Jryako",

    eyebrow: "Money Records Artist",

    tagline:
      "Independent energy, bold delivery, and records built for movement.",

    shortBio:
      "Jryako is a rising hip-hop artist focused on high-energy records, memorable hooks, and music designed to connect with audiences worldwide.",

    biography: [
      "Jryako represents the next generation of independent artists building momentum through authentic music, focused branding, and strategic release execution.",

      "Working with Money Records, Jryako is developing a growing catalog supported by platform-specific marketing, release positioning, visual presentation, and global campaign strategy.",

      "The goal is bigger than releasing individual songs. Every rollout is designed to strengthen the artist brand, expand audience reach, and create long-term momentum across streaming and social platforms.",
    ],

    genres: [
      "Hip-Hop",
      "Rap",
    ],

    imageSrc:
      "/brand/mr-crest.png",

    heroImageSrc:
      "/brand/hero-world.jpg",

    imageAlt:
      "Jryako — Money Records artist",

    status:
      "active",

    featured:
      true,

    sortOrder:
      10,

    socialLinks: [
      {
        platform:
          "instagram",

        label:
          "Instagram",

        href:
          "https://www.instagram.com/jryako",
      },
    ],

    streamingLinks: [],

    releases: [
      {
        slug:
          "we-outside",

        title:
          "We Outside",

        type:
          "Single",

        releaseDate:
          "2026-07-09",

        artworkSrc:
          "/brand/mr-crest.png",

        href:
          "/releases/we-outside",

        description:
          "A high-energy release built for summer playlists, nightlife, and social content.",

        featured:
          true,
      },
    ],

    bookingEmail:
      "info@moneyrecords.io",

    managementEmail:
      "info@moneyrecords.io",
  },
] as const satisfies readonly Artist[];

/**
 * Uppercase alias for files that prefer constant-style imports.
 */
export const ARTISTS:
  readonly Artist[] =
    artists;

/* --------------------------------------------------------------------- */
/* Artist Sorting                                                         */
/* --------------------------------------------------------------------- */

function compareArtists(
  left: Artist,
  right: Artist,
): number {
  if (
    left.sortOrder !==
    right.sortOrder
  ) {
    return (
      left.sortOrder -
      right.sortOrder
    );
  }

  return left.name.localeCompare(
    right.name,
    "en",
    {
      sensitivity:
        "base",
    },
  );
}

/* --------------------------------------------------------------------- */
/* Public Artist Helpers                                                  */
/* --------------------------------------------------------------------- */

/**
 * Returns the full roster in display order.
 */
export function getAllArtists():
  readonly Artist[] {
  return [
    ...artists,
  ].sort(
    compareArtists,
  );
}

/**
 * Returns active artists only.
 */
export function getActiveArtists():
  readonly Artist[] {
  return getAllArtists().filter(
    (artist) =>
      artist.status ===
      "active",
  );
}

/**
 * Returns artists selected for homepage or featured-roster placement.
 */
export function getFeaturedArtists(
  limit?: number,
): readonly Artist[] {
  const featuredArtists =
    getAllArtists().filter(
      (artist) =>
        artist.featured &&
        artist.status !==
          "alumni",
    );

  if (
    typeof limit !==
      "number" ||
    !Number.isSafeInteger(
      limit,
    ) ||
    limit < 0
  ) {
    return featuredArtists;
  }

  return featuredArtists.slice(
    0,
    limit,
  );
}

/**
 * Returns a single artist using a case-insensitive route slug.
 */
export function getArtistBySlug(
  slug:
    string,
): Artist | undefined {
  const normalizedSlug =
    slug
      .trim()
      .toLowerCase();

  if (!normalizedSlug) {
    return undefined;
  }

  return artists.find(
    (artist) =>
      artist.slug ===
      normalizedSlug,
  );
}

/**
 * Returns a single artist using its stable internal ID.
 */
export function getArtistById(
  id:
    string,
): Artist | undefined {
  const normalizedId =
    id.trim();

  if (!normalizedId) {
    return undefined;
  }

  return artists.find(
    (artist) =>
      artist.id ===
      normalizedId,
  );
}

/**
 * Returns all public artist route slugs.
 *
 * Used by generateStaticParams() in:
 * src/app/artists/[slug]/page.tsx
 */
export function getArtistSlugs():
  readonly string[] {
  return artists.map(
    (artist) =>
      artist.slug,
  );
}

/**
 * Returns static route parameters for Next.js dynamic artist pages.
 */
export function getArtistStaticParams():
  Array<{
    slug: string;
  }> {
  return getArtistSlugs().map(
    (slug) => ({
      slug,
    }),
  );
}

/**
 * Checks whether a value belongs to the current public artist roster.
 */
export function isArtistSlug(
  value:
    string,
): boolean {
  return Boolean(
    getArtistBySlug(
      value,
    ),
  );
}

/**
 * Returns all releases assigned to a specific artist.
 */
export function getArtistReleases(
  slug:
    string,
): readonly ArtistReleasePreview[] {
  return (
    getArtistBySlug(
      slug,
    )?.releases ??
    []
  );
}

/* --------------------------------------------------------------------- */
/* Artist Data Validation                                                 */
/* --------------------------------------------------------------------- */

/**
 * Development-time validation for duplicated artist IDs or route slugs.
 */
function validateArtistRoster(
  roster:
    readonly Artist[],
): void {
  const ids =
    new Set<string>();

  const slugs =
    new Set<string>();

  for (const artist of roster) {
    if (ids.has(artist.id)) {
      throw new Error(
        `Duplicate Money Records artist ID: ${artist.id}`,
      );
    }

    if (slugs.has(artist.slug)) {
      throw new Error(
        `Duplicate Money Records artist slug: ${artist.slug}`,
      );
    }

    if (
      artist.slug !==
      artist.slug.toLowerCase()
    ) {
      throw new Error(
        `Artist slug must be lowercase: ${artist.slug}`,
      );
    }

    if (
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
        artist.slug,
      )
    ) {
      throw new Error(
        `Artist slug contains unsupported characters: ${artist.slug}`,
      );
    }

    ids.add(
      artist.id,
    );

    slugs.add(
      artist.slug,
    );
  }
}

if (
  process.env.NODE_ENV !==
  "production"
) {
  validateArtistRoster(
    artists,
  );
}