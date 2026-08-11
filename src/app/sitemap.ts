// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — XML Sitemap                                          ┃
   ┃ File   : src/app/sitemap.ts                                          ┃
   ┃ Role   : Search-engine sitemap for public Money Records routes       ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { MetadataRoute } from "next";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                    */
/* --------------------------------------------------------------------- */

export const dynamic =
  "force-static";

/* --------------------------------------------------------------------- */
/* Site Configuration                                                     */
/* --------------------------------------------------------------------- */

const DEFAULT_SITE_URL =
  "https://moneyrecords.io";

/**
 * Safely resolves the production website origin.
 *
 * Supported:
 *
 * NEXT_PUBLIC_SITE_URL=https://moneyrecords.io
 *
 * If the environment variable is missing or malformed, the official
 * Money Records domain is used instead.
 */
function getSiteOrigin(): string {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    return DEFAULT_SITE_URL;
  }

  try {
    const url =
      new URL(configuredUrl);

    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

const SITE_ORIGIN =
  getSiteOrigin();

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type SitemapChangeFrequency =
  NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;

type SitemapRoute = {
  path: string;

  changeFrequency:
    SitemapChangeFrequency;

  priority:
    number;

  /**
   * Optional route-specific update date.
   *
   * If omitted, BUILD_DATE is used.
   */
  lastModified?: Date;
};

/* --------------------------------------------------------------------- */
/* Build Date                                                             */
/* --------------------------------------------------------------------- */

/**
 * Sitemap dates should reflect site publication/build time rather than
 * changing on every crawler request.
 *
 * VERCEL_GIT_COMMIT_SHA itself does not contain a timestamp, so we use the
 * deployment/build environment where possible and fall back to the current
 * build process date.
 */
const BUILD_DATE =
  new Date();

/* --------------------------------------------------------------------- */
/* URL Helpers                                                            */
/* --------------------------------------------------------------------- */

function normalizePath(
  path: string,
): string {
  const trimmed =
    path.trim();

  if (
    !trimmed ||
    trimmed === "/"
  ) {
    return "/";
  }

  const withLeadingSlash =
    trimmed.startsWith("/")
      ? trimmed
      : `/${trimmed}`;

  return withLeadingSlash.replace(
    /\/+$/,
    "",
  );
}

function createAbsoluteUrl(
  path: string,
): string {
  const normalizedPath =
    normalizePath(path);

  if (
    normalizedPath === "/"
  ) {
    return `${SITE_ORIGIN}/`;
  }

  return `${SITE_ORIGIN}${normalizedPath}`;
}

/* --------------------------------------------------------------------- */
/* Public Sitemap Routes                                                  */
/* --------------------------------------------------------------------- */

/**
 * Only publicly indexable, canonical pages belong here.
 *
 * Intentionally excluded:
 *
 * /cart
 * /checkout
 * /checkout/success
 * /api/*
 *
 * Those pages are transactional, temporary, or machine-facing and should
 * not be treated as primary search-result destinations.
 */
const PUBLIC_ROUTES:
  readonly SitemapRoute[] = [
    /* ----------------------------------------------------------------- */
    /* Homepage                                                          */
    /* ----------------------------------------------------------------- */

    {
      path: "/",

      changeFrequency:
        "daily",

      priority:
        1,
    },

    /* ----------------------------------------------------------------- */
    /* Marketing Store                                                   */
    /* ----------------------------------------------------------------- */

    {
      path:
        "/services",

      changeFrequency:
        "weekly",

      priority:
        0.95,
    },

    {
      path:
        "/packages",

      changeFrequency:
        "weekly",

      priority:
        0.9,
    },

    /* ----------------------------------------------------------------- */
    /* Artists                                                           */
    /* ----------------------------------------------------------------- */

    {
      path:
        "/artists",

      changeFrequency:
        "weekly",

      priority:
        0.9,
    },

    /* ----------------------------------------------------------------- */
    /* Releases                                                          */
    /* ----------------------------------------------------------------- */

    {
      path:
        "/releases",

      changeFrequency:
        "weekly",

      priority:
        0.9,
    },

    /* ----------------------------------------------------------------- */
    /* Distribution                                                      */
    /* ----------------------------------------------------------------- */

    {
      path:
        "/distribution",

      changeFrequency:
        "monthly",

      priority:
        0.85,
    },

    /* ----------------------------------------------------------------- */
    /* Artist Submission                                                 */
    /* ----------------------------------------------------------------- */

    {
      path:
        "/submit-music",

      changeFrequency:
        "monthly",

      priority:
        0.85,
    },

    /* ----------------------------------------------------------------- */
    /* Company                                                           */
    /* ----------------------------------------------------------------- */

    {
      path:
        "/about",

      changeFrequency:
        "monthly",

      priority:
        0.8,
    },

    {
      path:
        "/contact",

      changeFrequency:
        "monthly",

      priority:
        0.75,
    },

    /* ----------------------------------------------------------------- */
    /* Customer Protection                                               */
    /* ----------------------------------------------------------------- */

    {
      path:
        "/privacy",

      changeFrequency:
        "yearly",

      priority:
        0.35,
    },

    {
      path:
        "/terms",

      changeFrequency:
        "yearly",

      priority:
        0.35,
    },

    {
      path:
        "/refund-policy",

      changeFrequency:
        "yearly",

      priority:
        0.35,
    },

    {
      path:
        "/marketing-disclaimer",

      changeFrequency:
        "yearly",

      priority:
        0.35,
    },
  ] as const;

/* --------------------------------------------------------------------- */
/* Sitemap Entry Builder                                                  */
/* --------------------------------------------------------------------- */

function createSitemapEntry(
  route: SitemapRoute,
): MetadataRoute.Sitemap[number] {
  return {
    url:
      createAbsoluteUrl(
        route.path,
      ),

    lastModified:
      route.lastModified ??
      BUILD_DATE,

    changeFrequency:
      route.changeFrequency,

    priority:
      route.priority,
  };
}

/* --------------------------------------------------------------------- */
/* Duplicate Protection                                                   */
/* --------------------------------------------------------------------- */

/**
 * Protects the sitemap against duplicate URLs if a route is accidentally
 * entered more than once later.
 */
function removeDuplicateEntries(
  entries: MetadataRoute.Sitemap,
): MetadataRoute.Sitemap {
  const seen =
    new Set<string>();

  return entries.filter(
    (entry) => {
      if (
        seen.has(
          entry.url,
        )
      ) {
        return false;
      }

      seen.add(
        entry.url,
      );

      return true;
    },
  );
}

/* --------------------------------------------------------------------- */
/* Sitemap                                                                */
/* --------------------------------------------------------------------- */

export default function sitemap():
  MetadataRoute.Sitemap {
  const staticEntries =
    PUBLIC_ROUTES.map(
      createSitemapEntry,
    );

  return removeDuplicateEntries(
    staticEntries,
  );
}