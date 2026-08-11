// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Release Data                                         ┃
   ┃ File   : src/data/releases.ts                                        ┃
   ┃ Role   : Typed music catalog, streaming links, and lookup helpers    ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

/* --------------------------------------------------------------------- */
/* Release Types                                                          */
/* --------------------------------------------------------------------- */

export const RELEASE_TYPES = [
  "single",
  "ep",
  "album",
  "mixtape",
  "compilation",
] as const;

export type ReleaseType =
  (typeof RELEASE_TYPES)[number];

/* --------------------------------------------------------------------- */
/* Release Statuses                                                       */
/* --------------------------------------------------------------------- */

export const RELEASE_STATUSES = [
  "upcoming",
  "released",
  "archived",
] as const;

export type ReleaseStatus =
  (typeof RELEASE_STATUSES)[number];

/* --------------------------------------------------------------------- */
/* Content Ratings                                                        */
/* --------------------------------------------------------------------- */

export const RELEASE_CONTENT_RATINGS = [
  "clean",
  "explicit",
  "not-rated",
] as const;

export type ReleaseContentRating =
  (typeof RELEASE_CONTENT_RATINGS)[number];

/* --------------------------------------------------------------------- */
/* Streaming Platforms                                                    */
/* --------------------------------------------------------------------- */

export const STREAMING_PLATFORMS = [
  "smart-link",
  "spotify",
  "apple-music",
  "youtube",
  "youtube-music",
  "soundcloud",
  "amazon-music",
  "tidal",
  "deezer",
  "audiomack",
  "pandora",
  "bandcamp",
] as const;

export type StreamingPlatform =
  (typeof STREAMING_PLATFORMS)[number];

/* --------------------------------------------------------------------- */
/* Streaming Link                                                        */
/* --------------------------------------------------------------------- */

export type StreamingLink = {
  /**
   * Platform identifier used by StreamingLinks.tsx.
   */
  platform: StreamingPlatform;

  /**
   * Public platform name.
   */
  label: string;

  /**
   * Complete external URL.
   */
  href: string;

  /**
   * Optional call-to-action label.
   *
   * Example:
   * Listen Now
   */
  actionLabel?: string;

  /**
   * Primary links appear first and receive stronger styling.
   */
  primary?: boolean;
};

/* --------------------------------------------------------------------- */
/* Release Credits                                                        */
/* --------------------------------------------------------------------- */

export type ReleaseCredit = {
  role: string;
  name: string;
};

/* --------------------------------------------------------------------- */
/* Release Campaign Information                                           */
/* --------------------------------------------------------------------- */

export type ReleaseCampaign = {
  /**
   * Marketing-services route.
   */
  href: string;

  /**
   * Campaign call-to-action.
   */
  label: string;

  /**
   * Optional short campaign description.
   */
  description?: string;
};

/* --------------------------------------------------------------------- */
/* Release Type                                                           */
/* --------------------------------------------------------------------- */

export type Release = {
  /**
   * Stable internal release identifier.
   *
   * Example:
   * release_we_outside
   */
  id: string;

  /**
   * Public route slug.
   *
   * Example:
   * /releases/we-outside
   */
  slug: string;

  /**
   * Public release title.
   */
  title: string;

  /**
   * Artist name displayed publicly.
   */
  artistName: string;

  /**
   * Artist profile route slug.
   */
  artistSlug: string;

  /**
   * Text displayed above the release title.
   */
  eyebrow: string;

  /**
   * Short positioning statement.
   */
  tagline: string;

  /**
   * Compact description used on release cards.
   */
  shortDescription: string;

  /**
   * Full release-description paragraphs.
   */
  description: readonly string[];

  type: ReleaseType;

  status: ReleaseStatus;

  contentRating: ReleaseContentRating;

  /**
   * ISO release date formatted as YYYY-MM-DD.
   */
  releaseDate: string;

  genres: readonly string[];

  moods: readonly string[];

  /**
   * Square release artwork.
   */
  coverSrc: string;

  /**
   * Wide image used on the release-profile hero.
   */
  heroImageSrc: string;

  coverAlt: string;

  /**
   * Canonical internal release route.
   */
  href: string;

  /**
   * Controls homepage and featured-release placement.
   */
  featured: boolean;

  /**
   * Lower values appear first when releases share the same date.
   */
  sortOrder: number;

  /**
   * Optional promotional badge.
   *
   * Example:
   * Out Now
   */
  badge?: string;

  /**
   * Official streaming and smart-link destinations.
   */
  links: readonly StreamingLink[];

  /**
   * Optional public release credits.
   */
  credits?: readonly ReleaseCredit[];

  /**
   * Optional copyright text.
   */
  copyrightLine?: string;

  /**
   * Optional platform-marketing campaign CTA.
   */
  campaign?: ReleaseCampaign;

  /**
   * Optional SEO title override.
   */
  seoTitle?: string;

  /**
   * Optional SEO description override.
   */
  seoDescription?: string;
};

/* --------------------------------------------------------------------- */
/* Release Catalog                                                        */
/* --------------------------------------------------------------------- */

/**
 * Official Money Records release catalog.
 *
 * Only confirmed and approved public releases should be added here.
 * Supa Jhittt is intentionally not included.
 *
 * The Money Records crest is currently used as a safe temporary artwork
 * fallback until the final We Outside cover is added to /public/releases.
 */
export const releases = [
  {
    id:
      "release_we_outside",

    slug:
      "we-outside",

    title:
      "We Outside",

    artistName:
      "Jryako",

    artistSlug:
      "jryako",

    eyebrow:
      "Money Records Release",

    tagline:
      "High-energy music built for movement, nightlife, and summer momentum.",

    shortDescription:
      "We Outside is a high-energy release from Jryako created for summer playlists, nightlife, social content, and audiences ready to move.",

    description: [
      "We Outside captures Jryako's high-energy delivery through a record designed for movement, nightlife, and summer momentum.",

      "The release combines memorable energy with a direct, audience-ready approach that translates across streaming platforms, short-form content, parties, and live environments.",

      "Supported by Money Records, the release rollout focuses on professional positioning, visual presentation, platform-specific marketing, and long-term artist development.",
    ],

    type:
      "single",

    status:
      "released",

    contentRating:
      "explicit",

    releaseDate:
      "2026-07-09",

    genres: [
      "Hip-Hop",
      "Rap",
    ],

    moods: [
      "Energetic",
      "Confident",
      "Nightlife",
      "Summer",
    ],

    coverSrc:
      "/brand/mr-crest.png",

    heroImageSrc:
      "/brand/hero-world.jpg",

    coverAlt:
      "We Outside by Jryako — Money Records release artwork",

    href:
      "/releases/we-outside",

    featured:
      true,

    sortOrder:
      10,

    badge:
      "Out Now",

    links: [
      {
        platform:
          "smart-link",

        label:
          "All Streaming Platforms",

        href:
          "https://vyd.co/JryakoWeOutside",

        actionLabel:
          "Listen Now",

        primary:
          true,
      },
    ],

    credits: [
      {
        role:
          "Primary Artist",

        name:
          "Jryako",
      },
      {
        role:
          "Record Label",

        name:
          "Money Records LLC",
      },
    ],

    copyrightLine:
      "℗ 2026 Money Records LLC",

    campaign: {
      href:
        "/services",

      label:
        "Promote Your Release",

      description:
        "Explore Money Records platform-specific marketing services for your next release.",
    },

    seoTitle:
      "We Outside by Jryako",

    seoDescription:
      "Listen to We Outside by Jryako, an official Money Records release launched July 9, 2026.",
  },
] as const satisfies readonly Release[];

/**
 * Uppercase alias for components that prefer constant-style imports.
 */
export const RELEASES:
  readonly Release[] =
    releases;

/* --------------------------------------------------------------------- */
/* Sorting                                                                */
/* --------------------------------------------------------------------- */

function getReleaseTimestamp(
  release: Release,
): number {
  const timestamp =
    Date.parse(
      `${release.releaseDate}T00:00:00.000Z`,
    );

  return Number.isNaN(timestamp)
    ? 0
    : timestamp;
}

function compareReleases(
  left: Release,
  right: Release,
): number {
  const dateDifference =
    getReleaseTimestamp(right) -
    getReleaseTimestamp(left);

  if (dateDifference !== 0) {
    return dateDifference;
  }

  if (
    left.sortOrder !==
    right.sortOrder
  ) {
    return (
      left.sortOrder -
      right.sortOrder
    );
  }

  return left.title.localeCompare(
    right.title,
    "en",
    {
      sensitivity:
        "base",
    },
  );
}

/* --------------------------------------------------------------------- */
/* Release Getters                                                        */
/* --------------------------------------------------------------------- */

/**
 * Returns the entire release catalog in newest-first display order.
 */
export function getAllReleases():
  readonly Release[] {
  return [
    ...releases,
  ].sort(
    compareReleases,
  );
}

/**
 * Returns publicly released music only.
 */
export function getReleasedReleases():
  readonly Release[] {
  return getAllReleases().filter(
    (release) =>
      release.status ===
      "released",
  );
}

/**
 * Returns upcoming releases in nearest-date-first order.
 */
export function getUpcomingReleases():
  readonly Release[] {
  return getAllReleases()
    .filter(
      (release) =>
        release.status ===
        "upcoming",
    )
    .sort(
      (
        left,
        right,
      ) =>
        getReleaseTimestamp(left) -
        getReleaseTimestamp(right),
    );
}

/**
 * Returns releases selected for homepage or featured placement.
 */
export function getFeaturedReleases(
  limit?: number,
): readonly Release[] {
  const featuredReleases =
    getAllReleases().filter(
      (release) =>
        release.featured &&
        release.status !==
          "archived",
    );

  if (
    typeof limit !==
      "number" ||
    !Number.isSafeInteger(
      limit,
    ) ||
    limit < 0
  ) {
    return featuredReleases;
  }

  return featuredReleases.slice(
    0,
    limit,
  );
}

/**
 * Returns the newest public releases.
 */
export function getLatestReleases(
  limit = 6,
): readonly Release[] {
  const releasedCatalog =
    getReleasedReleases();

  if (
    !Number.isSafeInteger(limit) ||
    limit < 0
  ) {
    return releasedCatalog;
  }

  return releasedCatalog.slice(
    0,
    limit,
  );
}

/**
 * Returns one release using a case-insensitive route slug.
 */
export function getReleaseBySlug(
  slug: string,
): Release | undefined {
  const normalizedSlug =
    slug
      .trim()
      .toLowerCase();

  if (!normalizedSlug) {
    return undefined;
  }

  return releases.find(
    (release) =>
      release.slug ===
      normalizedSlug,
  );
}

/**
 * Returns one release using its stable internal ID.
 */
export function getReleaseById(
  id: string,
): Release | undefined {
  const normalizedId =
    id.trim();

  if (!normalizedId) {
    return undefined;
  }

  return releases.find(
    (release) =>
      release.id ===
      normalizedId,
  );
}

/**
 * Returns releases connected to an artist-profile slug.
 */
export function getReleasesByArtistSlug(
  artistSlug: string,
): readonly Release[] {
  const normalizedArtistSlug =
    artistSlug
      .trim()
      .toLowerCase();

  if (!normalizedArtistSlug) {
    return [];
  }

  return getAllReleases().filter(
    (release) =>
      release.artistSlug ===
      normalizedArtistSlug,
  );
}

/**
 * Returns releases connected to an artist name.
 */
export function getReleasesByArtistName(
  artistName: string,
): readonly Release[] {
  const normalizedArtistName =
    artistName
      .trim()
      .toLowerCase();

  if (!normalizedArtistName) {
    return [];
  }

  return getAllReleases().filter(
    (release) =>
      release.artistName
        .toLowerCase() ===
      normalizedArtistName,
  );
}

/**
 * Returns releases containing a particular genre.
 */
export function getReleasesByGenre(
  genre: string,
): readonly Release[] {
  const normalizedGenre =
    genre
      .trim()
      .toLowerCase();

  if (!normalizedGenre) {
    return [];
  }

  return getAllReleases().filter(
    (release) =>
      release.genres.some(
        (releaseGenre) =>
          releaseGenre
            .toLowerCase() ===
          normalizedGenre,
      ),
  );
}

/**
 * Returns all release slugs.
 */
export function getReleaseSlugs():
  readonly string[] {
  return releases.map(
    (release) =>
      release.slug,
  );
}

/**
 * Returns parameters used by generateStaticParams().
 *
 * Used by:
 * src/app/releases/[slug]/page.tsx
 */
export function getReleaseStaticParams():
  Array<{
    slug: string;
  }> {
  return getReleaseSlugs().map(
    (slug) => ({
      slug,
    }),
  );
}

/**
 * Checks whether a value matches a public release route.
 */
export function isReleaseSlug(
  value: string,
): boolean {
  return Boolean(
    getReleaseBySlug(value),
  );
}

/* --------------------------------------------------------------------- */
/* Streaming Link Helpers                                                 */
/* --------------------------------------------------------------------- */

/**
 * Returns all streaming destinations for a release.
 */
export function getReleaseStreamingLinks(
  releaseOrSlug:
    | Release
    | string,
): readonly StreamingLink[] {
  const release =
    typeof releaseOrSlug ===
      "string"
      ? getReleaseBySlug(
          releaseOrSlug,
        )
      : releaseOrSlug;

  if (!release) {
    return [];
  }

  return [
    ...release.links,
  ].sort(
    (
      left,
      right,
    ) =>
      Number(
        Boolean(
          right.primary,
        ),
      ) -
      Number(
        Boolean(
          left.primary,
        ),
      ),
  );
}

/**
 * Returns a release's preferred primary destination.
 */
export function getPrimaryReleaseLink(
  releaseOrSlug:
    | Release
    | string,
): StreamingLink | undefined {
  const links =
    getReleaseStreamingLinks(
      releaseOrSlug,
    );

  return (
    links.find(
      (link) =>
        link.primary,
    ) ??
    links[0]
  );
}

/**
 * Returns a release link for a particular platform.
 */
export function getReleasePlatformLink(
  releaseOrSlug:
    | Release
    | string,

  platform:
    StreamingPlatform,
): StreamingLink | undefined {
  return getReleaseStreamingLinks(
    releaseOrSlug,
  ).find(
    (link) =>
      link.platform ===
      platform,
  );
}

/* --------------------------------------------------------------------- */
/* Formatting Helpers                                                     */
/* --------------------------------------------------------------------- */

/**
 * Converts an ISO release date into a public display date.
 */
export function formatReleaseDate(
  value: string,
  options: {
    short?: boolean;
  } = {},
): string {
  const timestamp =
    Date.parse(
      `${value}T00:00:00.000Z`,
    );

  if (Number.isNaN(timestamp)) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month:
        options.short
          ? "short"
          : "long",

      day:
        "numeric",

      year:
        "numeric",

      timeZone:
        "UTC",
    },
  ).format(
    new Date(timestamp),
  );
}

/**
 * Returns a public release-type label.
 */
export function getReleaseTypeLabel(
  type: ReleaseType,
): string {
  switch (type) {
    case "single":
      return "Single";

    case "ep":
      return "EP";

    case "album":
      return "Album";

    case "mixtape":
      return "Mixtape";

    case "compilation":
      return "Compilation";

    default:
      return "Release";
  }
}

/**
 * Returns a public release-status label.
 */
export function getReleaseStatusLabel(
  release: Pick<
    Release,
    | "status"
    | "badge"
  >,
): string {
  if (release.badge) {
    return release.badge;
  }

  switch (release.status) {
    case "upcoming":
      return "Coming Soon";

    case "released":
      return "Out Now";

    case "archived":
      return "Catalog Release";

    default:
      return "Money Records Release";
  }
}

/**
 * Returns a public content-rating label.
 */
export function getReleaseContentRatingLabel(
  rating: ReleaseContentRating,
): string {
  switch (rating) {
    case "clean":
      return "Clean";

    case "explicit":
      return "Explicit";

    case "not-rated":
    default:
      return "Not Rated";
  }
}

/* --------------------------------------------------------------------- */
/* Related Releases                                                       */
/* --------------------------------------------------------------------- */

/**
 * Returns related releases using artist and genre similarity.
 */
export function getRelatedReleases(
  releaseOrSlug:
    | Release
    | string,

  limit = 3,
): readonly Release[] {
  const release =
    typeof releaseOrSlug ===
      "string"
      ? getReleaseBySlug(
          releaseOrSlug,
        )
      : releaseOrSlug;

  if (!release) {
    return [];
  }

  const related =
    getAllReleases()
      .filter(
        (candidate) =>
          candidate.id !==
            release.id &&
          candidate.status !==
            "archived",
      )
      .sort(
        (
          left,
          right,
        ) => {
          const leftSameArtist =
            left.artistSlug ===
            release.artistSlug
              ? 1
              : 0;

          const rightSameArtist =
            right.artistSlug ===
            release.artistSlug
              ? 1
              : 0;

          if (
            leftSameArtist !==
            rightSameArtist
          ) {
            return (
              rightSameArtist -
              leftSameArtist
            );
          }

          const leftSharedGenres =
            left.genres.filter(
              (genre) =>
                release.genres.includes(
                  genre,
                ),
            ).length;

          const rightSharedGenres =
            right.genres.filter(
              (genre) =>
                release.genres.includes(
                  genre,
                ),
            ).length;

          if (
            leftSharedGenres !==
            rightSharedGenres
          ) {
            return (
              rightSharedGenres -
              leftSharedGenres
            );
          }

          return compareReleases(
            left,
            right,
          );
        },
      );

  if (
    !Number.isSafeInteger(limit) ||
    limit < 0
  ) {
    return related;
  }

  return related.slice(
    0,
    limit,
  );
}

/* --------------------------------------------------------------------- */
/* Catalog Statistics                                                     */
/* --------------------------------------------------------------------- */

/**
 * Returns the number of public releases in the catalog.
 */
export function getReleaseCount():
  number {
  return releases.length;
}

/**
 * Returns all unique public catalog genres.
 */
export function getReleaseGenres():
  readonly string[] {
  return Array.from(
    new Set(
      releases.flatMap(
        (release) =>
          release.genres,
      ),
    ),
  ).sort(
    (
      left,
      right,
    ) =>
      left.localeCompare(
        right,
        "en",
        {
          sensitivity:
            "base",
        },
      ),
  );
}

/**
 * Returns every artist represented in the release catalog.
 */
export function getReleaseArtists():
  ReadonlyArray<{
    name: string;
    slug: string;
  }> {
  const artistMap =
    new Map<
      string,
      {
        name: string;
        slug: string;
      }
    >();

  for (const release of releases) {
    if (
      !artistMap.has(
        release.artistSlug,
      )
    ) {
      artistMap.set(
        release.artistSlug,
        {
          name:
            release.artistName,

          slug:
            release.artistSlug,
        },
      );
    }
  }

  return Array.from(
    artistMap.values(),
  ).sort(
    (
      left,
      right,
    ) =>
      left.name.localeCompare(
        right.name,
        "en",
        {
          sensitivity:
            "base",
        },
      ),
  );
}

/* --------------------------------------------------------------------- */
/* Development Validation                                                 */
/* --------------------------------------------------------------------- */

function isValidSlug(
  value: string,
): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
    value,
  );
}

function isValidIsoDate(
  value: string,
): boolean {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(
      value,
    )
  ) {
    return false;
  }

  const timestamp =
    Date.parse(
      `${value}T00:00:00.000Z`,
    );

  if (Number.isNaN(timestamp)) {
    return false;
  }

  return (
    new Date(timestamp)
      .toISOString()
      .slice(0, 10) ===
    value
  );
}

function isValidExternalUrl(
  value: string,
): boolean {
  try {
    const url =
      new URL(value);

    return (
      url.protocol ===
        "https:" ||
      url.protocol ===
        "http:"
    );
  } catch {
    return false;
  }
}

/**
 * Development-only catalog validation.
 */
function validateReleaseCatalog(
  catalog:
    readonly Release[],
): void {
  const ids =
    new Set<string>();

  const slugs =
    new Set<string>();

  for (const release of catalog) {
    if (
      ids.has(
        release.id,
      )
    ) {
      throw new Error(
        `Duplicate Money Records release ID: ${release.id}`,
      );
    }

    if (
      slugs.has(
        release.slug,
      )
    ) {
      throw new Error(
        `Duplicate Money Records release slug: ${release.slug}`,
      );
    }

    if (
      !isValidSlug(
        release.slug,
      )
    ) {
      throw new Error(
        `Release slug contains unsupported characters: ${release.slug}`,
      );
    }

    if (
      !isValidSlug(
        release.artistSlug,
      )
    ) {
      throw new Error(
        `Artist slug contains unsupported characters on ${release.slug}: ${release.artistSlug}`,
      );
    }

    if (
      release.href !==
      `/releases/${release.slug}`
    ) {
      throw new Error(
        `Release href does not match its slug: ${release.slug}`,
      );
    }

    if (
      !isValidIsoDate(
        release.releaseDate,
      )
    ) {
      throw new Error(
        `Release date must use YYYY-MM-DD: ${release.slug}`,
      );
    }

    if (
      release.genres.length ===
      0
    ) {
      throw new Error(
        `Release must contain at least one genre: ${release.slug}`,
      );
    }

    if (
      release.description.length ===
      0
    ) {
      throw new Error(
        `Release must contain at least one description paragraph: ${release.slug}`,
      );
    }

    for (const link of release.links) {
      if (
        !isValidExternalUrl(
          link.href,
        )
      ) {
        throw new Error(
          `Release contains an invalid streaming URL: ${release.slug} — ${link.label}`,
        );
      }
    }

    ids.add(
      release.id,
    );

    slugs.add(
      release.slug,
    );
  }
}

if (
  process.env.NODE_ENV !==
  "production"
) {
  validateReleaseCatalog(
    releases,
  );
}