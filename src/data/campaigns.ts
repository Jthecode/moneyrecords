// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Marketing Campaigns                                   ┃
   ┃ File   : src/data/campaigns.ts                                        ┃
   ┃ Role   : Central product data for platform campaign storefronts       ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import { STREAMING_PLATFORM_DISCLAIMER } from "@/data/platforms";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type CampaignStatus =
  | "live"
  | "coming-soon"
  | "paused"
  | "custom";

export type CampaignTier =
  | "starter"
  | "momentum"
  | "growth"
  | "breakout"
  | "scale"
  | "major"
  | "global";

export type CampaignProductType =
  | "platform-campaign"
  | "custom-campaign";

export type CampaignMetric =
  | "promotional-reach"
  | "impressions"
  | "exposure"
  | "listener-opportunities";

export type MarketingCampaign = {
  /**
   * Stable internal identifier.
   */
  id: string;

  /**
   * Internal inventory and checkout identifier.
   */
  sku: string;

  /**
   * Product classification used by cart and checkout logic.
   */
  productType: CampaignProductType;

  /**
   * Platform identifier matching src/data/platforms.ts.
   */
  platformId: string;

  /**
   * Platform route segment.
   *
   * Example:
   * /services/spotify
   */
  platformSlug: string;

  /**
   * URL-safe campaign route segment.
   *
   * Example:
   * /services/spotify/10k-starter
   */
  slug: string;

  /**
   * Full customer-facing product name.
   */
  name: string;

  /**
   * Compact campaign title for cart and checkout.
   */
  shortName: string;

  /**
   * Small label displayed above the campaign title.
   */
  eyebrow: string;

  /**
   * Campaign level.
   */
  tier: CampaignTier;

  /**
   * Availability state.
   */
  status: CampaignStatus;

  /**
   * Determines whether the campaign can be added to the cart.
   */
  purchasable: boolean;

  /**
   * Campaign price in cents.
   */
  priceCents: number;

  /**
   * ISO currency code.
   */
  currency: "USD";

  /**
   * Customer-facing price label.
   */
  priceLabel: string;

  /**
   * Numeric promotional campaign target.
   *
   * This is not a guaranteed stream total.
   */
  campaignTarget: number;

  /**
   * Compact target label.
   *
   * Example:
   * "10K"
   */
  campaignTargetLabel: string;

  /**
   * Primary metric associated with the campaign target.
   */
  metric: CampaignMetric;

  /**
   * Customer-facing metric label.
   */
  metricLabel: string;

  /**
   * Brief statement describing how the campaign number should be understood.
   */
  reachStatement: string;

  /**
   * Short card description.
   */
  description: string;

  /**
   * Full campaign-page description.
   */
  longDescription: string;

  /**
   * Estimated fulfillment window.
   *
   * These are planning estimates and should be adjusted to match the
   * campaign team's actual fulfillment process before public launch.
   */
  estimatedDuration: string;

  /**
   * Key campaign deliverables.
   */
  deliverables: readonly string[];

  /**
   * Campaign-management features.
   */
  features: readonly string[];

  /**
   * Artists and release situations suited to the campaign.
   */
  bestFor: readonly string[];

  /**
   * Customer assets required before fulfillment begins.
   */
  requiredAssets: readonly string[];

  /**
   * Services and outcomes that are explicitly excluded.
   */
  notIncluded: readonly string[];

  /**
   * Optional storefront badge.
   */
  badge?: string;

  /**
   * Marks the campaign for priority display.
   */
  featured: boolean;

  /**
   * Sort order inside its platform page.
   */
  order: number;

  /**
   * Full campaign route.
   */
  href: string;

  /**
   * Customer-facing add-to-cart label.
   */
  addToCartLabel: string;

  /**
   * Customer-facing product-detail label.
   */
  detailsLabel: string;

  /**
   * Compact cart description.
   */
  cartDescription: string;

  /**
   * Search-engine page title.
   */
  seoTitle: string;

  /**
   * Search-engine page description.
   */
  seoDescription: string;

  /**
   * Campaign-specific legal and performance disclaimer.
   */
  disclaimer: string;
};

export type PlatformCampaignSummary = {
  platformSlug: string;
  campaignCount: number;
  lowestPriceCents: number | null;
  highestPriceCents: number | null;
  lowestPriceLabel: string;
  highestPriceLabel: string;
};

/* --------------------------------------------------------------------- */
/* Shared Product Standards                                               */
/* --------------------------------------------------------------------- */

export const CAMPAIGN_NOT_INCLUDED = [
  "Guaranteed Spotify streams or listener totals",
  "Guaranteed editorial or independent playlist placement",
  "Bots, artificial streaming, click farms, or fraudulent engagement",
  "Guaranteed chart positions, revenue, followers, or viral results",
] as const;

export const SPOTIFY_REQUIRED_ASSETS = [
  "Public Spotify track, album, or artist link",
  "Artist name and release title",
  "Approved cover artwork",
  "Primary genre and similar artists",
  "Preferred audience locations or target markets",
  "Release date and campaign goals",
] as const;

export const STANDARD_CAMPAIGN_FEATURES = [
  "Campaign intake and release review",
  "Audience and market targeting",
  "Campaign setup and management",
  "Campaign pacing and monitoring",
  "Completion summary and reporting",
] as const;

export const SPOTIFY_CAMPAIGN_DISCLAIMER =
  `${STREAMING_PLATFORM_DISCLAIMER} Campaign timing and results may vary based on release quality, genre, audience availability, target markets, creative assets, platform activity, and listener response.`;

/* --------------------------------------------------------------------- */
/* Spotify Campaign Data                                                  */
/* --------------------------------------------------------------------- */

export const SPOTIFY_CAMPAIGNS: readonly MarketingCampaign[] = [
  {
    id: "spotify-10k-starter",
    sku: "MR-SPOTIFY-10K",
    productType: "platform-campaign",
    platformId: "spotify",
    platformSlug: "spotify",
    slug: "10k-starter",
    name: "10K Starter Campaign",
    shortName: "Spotify 10K Starter",
    eyebrow: "Spotify Starter Campaign",
    tier: "starter",
    status: "live",
    purchasable: true,
    priceCents: 8000,
    currency: "USD",
    priceLabel: "$80",
    campaignTarget: 10_000,
    campaignTargetLabel: "10K",
    metric: "promotional-reach",
    metricLabel: "Estimated Promotional Reach",
    reachStatement:
      "Structured around up to 10,000 estimated promotional impressions, exposure opportunities, or listener opportunities.",
    description:
      "An accessible entry-level Spotify campaign for artists introducing a new release or testing a focused promotional strategy.",
    longDescription:
      "The 10K Starter Campaign is designed for developing artists, new releases, and smaller promotional budgets. Money Records reviews the release, organizes basic audience targeting, launches the campaign, monitors activity, and provides a completion summary. The campaign target represents estimated promotional reach and listener opportunities—not guaranteed Spotify streams.",
    estimatedDuration: "Estimated 7–10 business days",
    deliverables: [
      "Spotify release review",
      "Basic genre and audience targeting",
      "Campaign setup and launch",
      "Campaign monitoring",
      "Completion summary",
    ],
    features: STANDARD_CAMPAIGN_FEATURES,
    bestFor: [
      "First-time campaigns",
      "New independent artists",
      "Release testing",
      "Small catalog campaigns",
    ],
    requiredAssets: SPOTIFY_REQUIRED_ASSETS,
    notIncluded: CAMPAIGN_NOT_INCLUDED,
    badge: "Starting Campaign",
    featured: false,
    order: 1,
    href: "/services/spotify/10k-starter",
    addToCartLabel: "Add 10K Campaign",
    detailsLabel: "View Campaign",
    cartDescription:
      "Spotify Starter Campaign with a 10K estimated promotional-reach target.",
    seoTitle: "Spotify 10K Starter Campaign",
    seoDescription:
      "Start a Money Records Spotify promotional campaign with a 10K estimated-reach target for $80.",
    disclaimer: SPOTIFY_CAMPAIGN_DISCLAIMER,
  },
  {
    id: "spotify-25k-momentum",
    sku: "MR-SPOTIFY-25K",
    productType: "platform-campaign",
    platformId: "spotify",
    platformSlug: "spotify",
    slug: "25k-momentum",
    name: "25K Momentum Campaign",
    shortName: "Spotify 25K Momentum",
    eyebrow: "Spotify Momentum Campaign",
    tier: "momentum",
    status: "live",
    purchasable: true,
    priceCents: 17_900,
    currency: "USD",
    priceLabel: "$179",
    campaignTarget: 25_000,
    campaignTargetLabel: "25K",
    metric: "promotional-reach",
    metricLabel: "Estimated Promotional Reach",
    reachStatement:
      "Structured around up to 25,000 estimated promotional impressions, exposure opportunities, or listener opportunities.",
    description:
      "A stronger Spotify campaign for artists looking to build early momentum around a new or priority release.",
    longDescription:
      "The 25K Momentum Campaign expands beyond the starter level with broader audience targeting and a larger estimated promotional-reach target. It is designed for artists who already have release assets prepared and want to create stronger initial awareness around a song or catalog record.",
    estimatedDuration: "Estimated 10–14 business days",
    deliverables: [
      "Spotify release and profile review",
      "Genre and audience-targeting setup",
      "Expanded promotional campaign",
      "Campaign pacing and monitoring",
      "Completion report",
    ],
    features: STANDARD_CAMPAIGN_FEATURES,
    bestFor: [
      "New singles",
      "Developing artists",
      "Early release momentum",
      "Catalog reactivation",
    ],
    requiredAssets: SPOTIFY_REQUIRED_ASSETS,
    notIncluded: CAMPAIGN_NOT_INCLUDED,
    badge: "Momentum Builder",
    featured: false,
    order: 2,
    href: "/services/spotify/25k-momentum",
    addToCartLabel: "Add 25K Campaign",
    detailsLabel: "View Campaign",
    cartDescription:
      "Spotify Momentum Campaign with a 25K estimated promotional-reach target.",
    seoTitle: "Spotify 25K Momentum Campaign",
    seoDescription:
      "Build release momentum with a Money Records Spotify campaign featuring a 25K estimated-reach target for $179.",
    disclaimer: SPOTIFY_CAMPAIGN_DISCLAIMER,
  },
  {
    id: "spotify-50k-growth",
    sku: "MR-SPOTIFY-50K",
    productType: "platform-campaign",
    platformId: "spotify",
    platformSlug: "spotify",
    slug: "50k-growth",
    name: "50K Growth Campaign",
    shortName: "Spotify 50K Growth",
    eyebrow: "Spotify Growth Campaign",
    tier: "growth",
    status: "live",
    purchasable: true,
    priceCents: 32_900,
    currency: "USD",
    priceLabel: "$329",
    campaignTarget: 50_000,
    campaignTargetLabel: "50K",
    metric: "promotional-reach",
    metricLabel: "Estimated Promotional Reach",
    reachStatement:
      "Structured around up to 50,000 estimated promotional impressions, exposure opportunities, or listener opportunities.",
    description:
      "A mid-level Spotify campaign built for releases that need broader targeting and sustained promotional activity.",
    longDescription:
      "The 50K Growth Campaign is intended for artists ready to move beyond an introductory promotion. The campaign provides broader audience planning, additional campaign scale, active monitoring, and a larger estimated promotional-reach target around a selected Spotify release.",
    estimatedDuration: "Estimated 14–21 business days",
    deliverables: [
      "Detailed release review",
      "Expanded genre and market targeting",
      "Sustained Spotify promotional campaign",
      "Campaign optimization and monitoring",
      "Final campaign report",
    ],
    features: [
      ...STANDARD_CAMPAIGN_FEATURES,
      "Expanded audience segmentation",
    ],
    bestFor: [
      "Priority singles",
      "Artists with existing listeners",
      "Growing independent catalogs",
      "Release-momentum campaigns",
    ],
    requiredAssets: SPOTIFY_REQUIRED_ASSETS,
    notIncluded: CAMPAIGN_NOT_INCLUDED,
    badge: "Growth Level",
    featured: false,
    order: 3,
    href: "/services/spotify/50k-growth",
    addToCartLabel: "Add 50K Campaign",
    detailsLabel: "View Campaign",
    cartDescription:
      "Spotify Growth Campaign with a 50K estimated promotional-reach target.",
    seoTitle: "Spotify 50K Growth Campaign",
    seoDescription:
      "Promote a priority release with a Money Records Spotify campaign featuring a 50K estimated-reach target for $329.",
    disclaimer: SPOTIFY_CAMPAIGN_DISCLAIMER,
  },
  {
    id: "spotify-100k-breakout",
    sku: "MR-SPOTIFY-100K",
    productType: "platform-campaign",
    platformId: "spotify",
    platformSlug: "spotify",
    slug: "100k-breakout",
    name: "100K Breakout Campaign",
    shortName: "Spotify 100K Breakout",
    eyebrow: "Spotify Breakout Campaign",
    tier: "breakout",
    status: "live",
    purchasable: true,
    priceCents: 59_900,
    currency: "USD",
    priceLabel: "$599",
    campaignTarget: 100_000,
    campaignTargetLabel: "100K",
    metric: "promotional-reach",
    metricLabel: "Estimated Promotional Reach",
    reachStatement:
      "Structured around up to 100,000 estimated promotional impressions, exposure opportunities, or listener opportunities.",
    description:
      "A high-impact Spotify campaign designed for priority releases that need broader audience exposure and stronger campaign management.",
    longDescription:
      "The 100K Breakout Campaign is the featured Spotify campaign level for artists and labels pursuing a more substantial promotional rollout. It combines expanded audience targeting, broader campaign scale, active campaign management, optimization, and a detailed completion report.",
    estimatedDuration: "Estimated 21–30 business days",
    deliverables: [
      "Priority release review",
      "Expanded audience and market targeting",
      "Large-scale Spotify promotional campaign",
      "Campaign optimization and monitoring",
      "Detailed completion report",
    ],
    features: [
      ...STANDARD_CAMPAIGN_FEATURES,
      "Expanded audience segmentation",
      "Priority campaign review",
    ],
    bestFor: [
      "Priority releases",
      "Artists with established content",
      "Independent labels",
      "Release campaigns requiring more scale",
    ],
    requiredAssets: SPOTIFY_REQUIRED_ASSETS,
    notIncluded: CAMPAIGN_NOT_INCLUDED,
    badge: "Most Popular",
    featured: true,
    order: 4,
    href: "/services/spotify/100k-breakout",
    addToCartLabel: "Add 100K Campaign",
    detailsLabel: "View Campaign",
    cartDescription:
      "Featured Spotify Breakout Campaign with a 100K estimated promotional-reach target.",
    seoTitle: "Spotify 100K Breakout Campaign",
    seoDescription:
      "Launch a larger Money Records Spotify promotion with a 100K estimated-reach target for $599.",
    disclaimer: SPOTIFY_CAMPAIGN_DISCLAIMER,
  },
  {
    id: "spotify-250k-scale",
    sku: "MR-SPOTIFY-250K",
    productType: "platform-campaign",
    platformId: "spotify",
    platformSlug: "spotify",
    slug: "250k-scale",
    name: "250K Scale Campaign",
    shortName: "Spotify 250K Scale",
    eyebrow: "Spotify Scale Campaign",
    tier: "scale",
    status: "live",
    purchasable: true,
    priceCents: 139_900,
    currency: "USD",
    priceLabel: "$1,399",
    campaignTarget: 250_000,
    campaignTargetLabel: "250K",
    metric: "promotional-reach",
    metricLabel: "Estimated Promotional Reach",
    reachStatement:
      "Structured around up to 250,000 estimated promotional impressions, exposure opportunities, or listener opportunities.",
    description:
      "A premium Spotify campaign for artists and labels ready to scale a priority release across broader audience segments.",
    longDescription:
      "The 250K Scale Campaign is designed for serious release campaigns that require stronger planning, broader audience segmentation, extended campaign management, and a substantial estimated promotional-reach target. This level is suited to releases supported by professional artwork, content, and an organized rollout.",
    estimatedDuration: "Estimated 30–45 business days",
    deliverables: [
      "Priority release and profile review",
      "Advanced audience and market segmentation",
      "Extended Spotify promotional campaign",
      "Ongoing campaign optimization",
      "Detailed completion and performance summary",
    ],
    features: [
      ...STANDARD_CAMPAIGN_FEATURES,
      "Advanced audience segmentation",
      "Extended campaign window",
      "Priority campaign support",
    ],
    bestFor: [
      "Serious release campaigns",
      "Established independent artists",
      "Record labels",
      "Professionally supported singles",
    ],
    requiredAssets: SPOTIFY_REQUIRED_ASSETS,
    notIncluded: CAMPAIGN_NOT_INCLUDED,
    badge: "Premium Scale",
    featured: false,
    order: 5,
    href: "/services/spotify/250k-scale",
    addToCartLabel: "Add 250K Campaign",
    detailsLabel: "View Campaign",
    cartDescription:
      "Premium Spotify Scale Campaign with a 250K estimated promotional-reach target.",
    seoTitle: "Spotify 250K Scale Campaign",
    seoDescription:
      "Scale a priority release with a Money Records Spotify campaign featuring a 250K estimated-reach target for $1,399.",
    disclaimer: SPOTIFY_CAMPAIGN_DISCLAIMER,
  },
  {
    id: "spotify-500k-major",
    sku: "MR-SPOTIFY-500K",
    productType: "platform-campaign",
    platformId: "spotify",
    platformSlug: "spotify",
    slug: "500k-major",
    name: "500K Major Campaign",
    shortName: "Spotify 500K Major",
    eyebrow: "Spotify Major Campaign",
    tier: "major",
    status: "live",
    purchasable: true,
    priceCents: 259_900,
    currency: "USD",
    priceLabel: "$2,599",
    campaignTarget: 500_000,
    campaignTargetLabel: "500K",
    metric: "promotional-reach",
    metricLabel: "Estimated Promotional Reach",
    reachStatement:
      "Structured around up to 500,000 estimated promotional impressions, exposure opportunities, or listener opportunities.",
    description:
      "A major Spotify campaign level for high-priority releases requiring extended scale, broader targeting, and dedicated oversight.",
    longDescription:
      "The 500K Major Campaign provides a larger promotional framework for artists, management teams, and labels supporting an important release. It includes advanced campaign planning, broader audience targeting, an extended campaign window, ongoing optimization, and priority reporting.",
    estimatedDuration: "Estimated 45–60 business days",
    deliverables: [
      "Priority campaign intake",
      "Advanced multi-market targeting",
      "Extended high-volume Spotify campaign",
      "Ongoing optimization and monitoring",
      "Priority completion report",
    ],
    features: [
      ...STANDARD_CAMPAIGN_FEATURES,
      "Advanced multi-market segmentation",
      "Extended campaign management",
      "Priority support",
      "Campaign strategy review",
    ],
    bestFor: [
      "Major independent releases",
      "Established artists",
      "Management companies",
      "Record-label campaigns",
    ],
    requiredAssets: SPOTIFY_REQUIRED_ASSETS,
    notIncluded: CAMPAIGN_NOT_INCLUDED,
    badge: "Major Campaign",
    featured: false,
    order: 6,
    href: "/services/spotify/500k-major",
    addToCartLabel: "Add 500K Campaign",
    detailsLabel: "View Campaign",
    cartDescription:
      "Major Spotify campaign with a 500K estimated promotional-reach target.",
    seoTitle: "Spotify 500K Major Campaign",
    seoDescription:
      "Support a major priority release with a Money Records Spotify campaign featuring a 500K estimated-reach target for $2,599.",
    disclaimer: SPOTIFY_CAMPAIGN_DISCLAIMER,
  },
  {
    id: "spotify-1-million-global",
    sku: "MR-SPOTIFY-1M",
    productType: "platform-campaign",
    platformId: "spotify",
    platformSlug: "spotify",
    slug: "1-million-global",
    name: "1 Million Global Campaign",
    shortName: "Spotify 1 Million Global",
    eyebrow: "Spotify Global Campaign",
    tier: "global",
    status: "live",
    purchasable: true,
    priceCents: 479_900,
    currency: "USD",
    priceLabel: "$4,799",
    campaignTarget: 1_000_000,
    campaignTargetLabel: "1 Million",
    metric: "promotional-reach",
    metricLabel: "Estimated Promotional Reach",
    reachStatement:
      "Structured around up to 1,000,000 estimated promotional impressions, exposure opportunities, or listener opportunities.",
    description:
      "The largest Spotify campaign level for artists and labels pursuing an extended, high-priority promotional rollout.",
    longDescription:
      "The 1 Million Global Campaign is the highest Spotify campaign level currently offered by Money Records. It is designed for priority releases backed by professional assets, organized content, and a serious rollout strategy. The campaign includes expanded market planning, extended management, ongoing optimization, priority communication, and a detailed final campaign report.",
    estimatedDuration: "Estimated 60–90 business days",
    deliverables: [
      "Executive campaign intake and release review",
      "Advanced multi-market audience planning",
      "Extended high-volume Spotify campaign",
      "Ongoing campaign optimization and oversight",
      "Priority reporting and completion review",
    ],
    features: [
      ...STANDARD_CAMPAIGN_FEATURES,
      "Advanced multi-market segmentation",
      "Extended campaign management",
      "Priority campaign support",
      "Campaign strategy review",
      "Final performance consultation",
    ],
    bestFor: [
      "High-priority releases",
      "Established artists and labels",
      "Management teams",
      "Professionally funded campaigns",
    ],
    requiredAssets: SPOTIFY_REQUIRED_ASSETS,
    notIncluded: CAMPAIGN_NOT_INCLUDED,
    badge: "Largest Campaign",
    featured: false,
    order: 7,
    href: "/services/spotify/1-million-global",
    addToCartLabel: "Add 1 Million Campaign",
    detailsLabel: "View Campaign",
    cartDescription:
      "Money Records' largest Spotify campaign with a 1 million estimated promotional-reach target.",
    seoTitle: "Spotify 1 Million Global Campaign",
    seoDescription:
      "Explore the Money Records Spotify 1 Million Global Campaign, priced at $4,799 and built for high-priority releases.",
    disclaimer: SPOTIFY_CAMPAIGN_DISCLAIMER,
  },
] as const;

/* --------------------------------------------------------------------- */
/* Complete Campaign Collection                                           */
/* --------------------------------------------------------------------- */

/**
 * Add future Apple Music, Instagram, TikTok, YouTube, VEVO, press, radio,
 * SoundCloud, and artist-branding campaigns to this collection.
 */
export const MARKETING_CAMPAIGNS: readonly MarketingCampaign[] = [
  ...SPOTIFY_CAMPAIGNS,
];

/* --------------------------------------------------------------------- */
/* Campaign Helpers                                                       */
/* --------------------------------------------------------------------- */

/**
 * Returns all campaigns in storefront order.
 */
export function getAllCampaigns(): MarketingCampaign[] {
  return [...MARKETING_CAMPAIGNS].sort((a, b) => {
    if (a.platformSlug !== b.platformSlug) {
      return a.platformSlug.localeCompare(b.platformSlug);
    }

    return a.order - b.order;
  });
}

/**
 * Returns all campaigns belonging to one platform.
 */
export function getCampaignsByPlatform(
  platformSlug: string,
): MarketingCampaign[] {
  const normalizedPlatformSlug = platformSlug
    .trim()
    .toLowerCase();

  return MARKETING_CAMPAIGNS
    .filter(
      (campaign) =>
        campaign.platformSlug === normalizedPlatformSlug,
    )
    .sort((a, b) => a.order - b.order);
}

/**
 * Returns live campaigns belonging to one platform.
 */
export function getLiveCampaignsByPlatform(
  platformSlug: string,
): MarketingCampaign[] {
  return getCampaignsByPlatform(platformSlug).filter(
    (campaign) =>
      campaign.status === "live" &&
      campaign.purchasable,
  );
}

/**
 * Returns every currently purchasable campaign.
 */
export function getPurchasableCampaigns(): MarketingCampaign[] {
  return getAllCampaigns().filter(
    (campaign) =>
      campaign.status === "live" &&
      campaign.purchasable,
  );
}

/**
 * Returns featured campaigns.
 */
export function getFeaturedCampaigns(): MarketingCampaign[] {
  return getPurchasableCampaigns().filter(
    (campaign) => campaign.featured,
  );
}

/**
 * Returns one campaign by its stable internal ID.
 */
export function getCampaignById(
  id: string,
): MarketingCampaign | undefined {
  const normalizedId = id.trim().toLowerCase();

  return MARKETING_CAMPAIGNS.find(
    (campaign) =>
      campaign.id.toLowerCase() === normalizedId,
  );
}

/**
 * Returns one campaign by its inventory SKU.
 */
export function getCampaignBySku(
  sku: string,
): MarketingCampaign | undefined {
  const normalizedSku = sku.trim().toUpperCase();

  return MARKETING_CAMPAIGNS.find(
    (campaign) =>
      campaign.sku.toUpperCase() === normalizedSku,
  );
}

/**
 * Returns one campaign by platform and campaign route slugs.
 */
export function getCampaignBySlug(
  platformSlug: string,
  campaignSlug: string,
): MarketingCampaign | undefined {
  const normalizedPlatformSlug = platformSlug
    .trim()
    .toLowerCase();

  const normalizedCampaignSlug = campaignSlug
    .trim()
    .toLowerCase();

  return MARKETING_CAMPAIGNS.find(
    (campaign) =>
      campaign.platformSlug === normalizedPlatformSlug &&
      campaign.slug === normalizedCampaignSlug,
  );
}

/**
 * Returns true when a matching campaign route exists.
 */
export function isCampaignSlug(
  platformSlug: string,
  campaignSlug: string,
): boolean {
  return Boolean(
    getCampaignBySlug(
      platformSlug,
      campaignSlug,
    ),
  );
}

/**
 * Returns route parameters for static page generation.
 */
export function getCampaignStaticParams(): Array<{
  platform: string;
  campaign: string;
}> {
  return MARKETING_CAMPAIGNS.map((campaign) => ({
    platform: campaign.platformSlug,
    campaign: campaign.slug,
  }));
}

/**
 * Returns campaign slugs belonging to one platform.
 */
export function getCampaignSlugsByPlatform(
  platformSlug: string,
): string[] {
  return getCampaignsByPlatform(platformSlug).map(
    (campaign) => campaign.slug,
  );
}

/**
 * Formats a campaign price using en-US currency formatting.
 */
export function formatCampaignPrice(
  priceCents: number,
  currency: "USD" = "USD",
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits:
      priceCents % 100 === 0 ? 0 : 2,
  }).format(priceCents / 100);
}

/**
 * Formats one campaign's stored price.
 */
export function getCampaignPriceLabel(
  campaign: MarketingCampaign,
): string {
  return formatCampaignPrice(
    campaign.priceCents,
    campaign.currency,
  );
}

/**
 * Returns campaign-count and price information for one platform.
 */
export function getPlatformCampaignSummary(
  platformSlug: string,
): PlatformCampaignSummary {
  const campaigns =
    getLiveCampaignsByPlatform(platformSlug);

  if (campaigns.length === 0) {
    return {
      platformSlug,
      campaignCount: 0,
      lowestPriceCents: null,
      highestPriceCents: null,
      lowestPriceLabel: "Coming Soon",
      highestPriceLabel: "Coming Soon",
    };
  }

  const prices = campaigns.map(
    (campaign) => campaign.priceCents,
  );

  const lowestPriceCents = Math.min(...prices);
  const highestPriceCents = Math.max(...prices);

  return {
    platformSlug,
    campaignCount: campaigns.length,
    lowestPriceCents,
    highestPriceCents,
    lowestPriceLabel:
      formatCampaignPrice(lowestPriceCents),
    highestPriceLabel:
      formatCampaignPrice(highestPriceCents),
  };
}

/**
 * Returns the next larger campaign inside the same platform.
 */
export function getNextCampaign(
  campaign: MarketingCampaign,
): MarketingCampaign | undefined {
  const platformCampaigns =
    getCampaignsByPlatform(
      campaign.platformSlug,
    );

  const currentIndex =
    platformCampaigns.findIndex(
      (item) => item.id === campaign.id,
    );

  if (
    currentIndex === -1 ||
    currentIndex === platformCampaigns.length - 1
  ) {
    return undefined;
  }

  return platformCampaigns[currentIndex + 1];
}

/**
 * Returns the previous smaller campaign inside the same platform.
 */
export function getPreviousCampaign(
  campaign: MarketingCampaign,
): MarketingCampaign | undefined {
  const platformCampaigns =
    getCampaignsByPlatform(
      campaign.platformSlug,
    );

  const currentIndex =
    platformCampaigns.findIndex(
      (item) => item.id === campaign.id,
    );

  if (currentIndex <= 0) {
    return undefined;
  }

  return platformCampaigns[currentIndex - 1];
}