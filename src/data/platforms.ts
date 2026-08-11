// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Marketing Platforms                                   ┃
   ┃ File   : src/data/platforms.ts                                        ┃
   ┃ Role   : Central platform-category data for the marketing storefront  ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type PlatformStatus =
  | "live"
  | "coming-soon"
  | "custom";

export type PlatformIconKey =
  | "spotify"
  | "apple-music"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "vevo"
  | "press"
  | "radio"
  | "soundcloud"
  | "branding";

export type MarketingPlatform = {
  /**
   * Stable internal identifier.
   */
  id: string;

  /**
   * URL-safe route segment.
   *
   * Example:
   * /services/spotify
   */
  slug: string;

  /**
   * Public platform title.
   */
  name: string;

  /**
   * Short label used in compact UI elements.
   */
  shortName: string;

  /**
   * Small category label displayed above the platform title.
   */
  eyebrow: string;

  /**
   * Short platform description for cards and page introductions.
   */
  description: string;

  /**
   * Longer description used on the platform detail page.
   */
  longDescription: string;

  /**
   * Platform icon identifier.
   *
   * The actual SVG icon will be rendered by PlatformCard.tsx.
   */
  icon: PlatformIconKey;

  /**
   * Main platform accent color.
   */
  accent: string;

  /**
   * Softer version of the accent for gradients and backgrounds.
   */
  accentSoft: string;

  /**
   * Platform availability.
   */
  status: PlatformStatus;

  /**
   * Number of purchasable campaigns currently associated with the platform.
   */
  campaignCount: number;

  /**
   * Lowest campaign price in cents.
   *
   * Use null when pricing has not been finalized or is custom.
   */
  startingPriceCents: number | null;

  /**
   * Customer-facing starting-price label.
   */
  startingPriceLabel: string;

  /**
   * Customer-facing campaign-count label.
   */
  campaignCountLabel: string;

  /**
   * Main platform highlights.
   */
  highlights: string[];

  /**
   * Platform-page goals or capabilities.
   */
  capabilities: string[];

  /**
   * Recommended customer types.
   */
  bestFor: string[];

  /**
   * Main action label.
   */
  actionLabel: string;

  /**
   * Destination for the platform card.
   */
  href: string;

  /**
   * Determines whether the platform receives priority placement.
   */
  featured: boolean;

  /**
   * Determines whether the platform should appear in primary storefront
   * previews.
   */
  visible: boolean;

  /**
   * Optional sort order.
   */
  order: number;

  /**
   * Search-engine page title.
   */
  seoTitle: string;

  /**
   * Search-engine page description.
   */
  seoDescription: string;

  /**
   * Platform-specific campaign disclaimer.
   */
  disclaimer: string;
};

/* --------------------------------------------------------------------- */
/* Shared Campaign Standards                                              */
/* --------------------------------------------------------------------- */

export const MONEY_RECORDS_CAMPAIGN_DISCLAIMER =
  "Money Records does not use bots, artificial streaming, click farms, or guaranteed playlist placements. Campaign figures represent estimated promotional reach, exposure, impressions, or listener opportunities. Results vary by release quality, audience targeting, creative assets, platform performance, market conditions, and listener response.";

export const STREAMING_PLATFORM_DISCLAIMER =
  "Campaign numbers represent estimated promotional reach, exposure, impressions, or listener opportunities—not guaranteed stream totals. Money Records does not use bots, artificial streaming, click farms, or guaranteed playlist placements.";

/* --------------------------------------------------------------------- */
/* Platform Data                                                          */
/* --------------------------------------------------------------------- */

export const MARKETING_PLATFORMS: readonly MarketingPlatform[] = [
  {
    id: "spotify",
    slug: "spotify",
    name: "Spotify Marketing",
    shortName: "Spotify",
    eyebrow: "Streaming Campaigns",
    description:
      "Choose from seven Spotify campaign levels designed around different promotional goals, budgets, and estimated campaign reach.",
    longDescription:
      "Money Records Spotify campaigns give artists and labels a structured way to promote a priority release. Customers can select a campaign size, review its scope and estimated promotional reach, add it to their cart, and submit the release information needed to begin the campaign.",
    icon: "spotify",
    accent: "#1ed760",
    accentSoft: "rgba(30, 215, 96, 0.12)",
    status: "live",
    campaignCount: 7,
    startingPriceCents: 8000,
    startingPriceLabel: "$80",
    campaignCountLabel: "7 campaign options",
    highlights: [
      "Campaign levels from 10K to 1 million",
      "Estimated promotional reach",
      "Audience-targeting strategy",
      "Campaign monitoring",
      "Completion reporting",
    ],
    capabilities: [
      "Release-focused campaign setup",
      "Target-market planning",
      "Promotional exposure strategy",
      "Campaign pacing and monitoring",
      "Post-campaign reporting",
    ],
    bestFor: [
      "New singles",
      "Priority releases",
      "Catalog reactivation",
      "Independent artists",
      "Record labels",
    ],
    actionLabel: "Explore Spotify Campaigns",
    href: "/services/spotify",
    featured: true,
    visible: true,
    order: 1,
    seoTitle: "Spotify Marketing Campaigns",
    seoDescription:
      "Explore Money Records Spotify marketing campaigns with seven promotional levels starting at $80.",
    disclaimer: STREAMING_PLATFORM_DISCLAIMER,
  },
  {
    id: "apple-music",
    slug: "apple-music",
    name: "Apple Music Marketing",
    shortName: "Apple Music",
    eyebrow: "Streaming Campaigns",
    description:
      "Build stronger visibility around your release through Apple Music positioning, audience strategy, and promotional campaign options.",
    longDescription:
      "Money Records Apple Music services will be built for artists seeking stronger release positioning, audience discovery, catalog visibility, and coordinated promotional support around Apple Music releases.",
    icon: "apple-music",
    accent: "#f5f5f7",
    accentSoft: "rgba(245, 245, 247, 0.10)",
    status: "coming-soon",
    campaignCount: 0,
    startingPriceCents: null,
    startingPriceLabel: "Coming Soon",
    campaignCountLabel: "Campaigns in development",
    highlights: [
      "Release-positioning strategy",
      "Audience-development planning",
      "Catalog campaign options",
      "Campaign reporting",
    ],
    capabilities: [
      "Artist-profile preparation",
      "Release positioning",
      "Audience strategy",
      "Catalog visibility planning",
      "Performance reporting",
    ],
    bestFor: [
      "New releases",
      "Independent artists",
      "Catalog owners",
      "Record labels",
    ],
    actionLabel: "View Apple Music Services",
    href: "/services/apple-music",
    featured: false,
    visible: true,
    order: 2,
    seoTitle: "Apple Music Marketing Services",
    seoDescription:
      "Discover upcoming Money Records Apple Music marketing and release-positioning services.",
    disclaimer: STREAMING_PLATFORM_DISCLAIMER,
  },
  {
    id: "instagram",
    slug: "instagram",
    name: "Instagram Marketing",
    shortName: "Instagram",
    eyebrow: "Social Media Campaigns",
    description:
      "Promote your music through Reels, profile positioning, content strategy, audience campaigns, and artist-brand development.",
    longDescription:
      "Money Records Instagram marketing services are designed to help artists improve their visual positioning, build release-focused content, promote Reels, strengthen artist branding, and reach targeted audiences through structured campaigns.",
    icon: "instagram",
    accent: "#e1306c",
    accentSoft: "rgba(225, 48, 108, 0.12)",
    status: "coming-soon",
    campaignCount: 0,
    startingPriceCents: null,
    startingPriceLabel: "Coming Soon",
    campaignCountLabel: "Campaigns in development",
    highlights: [
      "Instagram Reels campaigns",
      "Artist-profile positioning",
      "Content-rollout strategy",
      "Audience-development options",
    ],
    capabilities: [
      "Profile optimization",
      "Reels campaign strategy",
      "Release content planning",
      "Audience targeting",
      "Campaign reporting",
    ],
    bestFor: [
      "Developing artists",
      "New releases",
      "Visual artists",
      "Artist brands",
    ],
    actionLabel: "View Instagram Services",
    href: "/services/instagram",
    featured: false,
    visible: true,
    order: 3,
    seoTitle: "Instagram Music Marketing",
    seoDescription:
      "Explore upcoming Instagram music-marketing services from Money Records, including Reels, content, and audience campaigns.",
    disclaimer: MONEY_RECORDS_CAMPAIGN_DISCLAIMER,
  },
  {
    id: "tiktok",
    slug: "tiktok",
    name: "TikTok Marketing",
    shortName: "TikTok",
    eyebrow: "Short-Form Campaigns",
    description:
      "Create momentum through short-form content, sound promotion, creator strategy, and targeted audience development.",
    longDescription:
      "Money Records TikTok campaigns will help artists build release momentum through short-form creative planning, sound-focused promotion, creator outreach, audience targeting, and structured campaign execution.",
    icon: "tiktok",
    accent: "#25f4ee",
    accentSoft: "rgba(37, 244, 238, 0.11)",
    status: "coming-soon",
    campaignCount: 0,
    startingPriceCents: null,
    startingPriceLabel: "Coming Soon",
    campaignCountLabel: "Campaigns in development",
    highlights: [
      "Short-form content strategy",
      "Sound-promotion campaigns",
      "Creator outreach options",
      "Audience-development planning",
    ],
    capabilities: [
      "TikTok profile preparation",
      "Content concepts",
      "Sound promotion",
      "Creator strategy",
      "Campaign reporting",
    ],
    bestFor: [
      "New singles",
      "High-energy releases",
      "Short-form creators",
      "Developing artists",
    ],
    actionLabel: "View TikTok Services",
    href: "/services/tiktok",
    featured: false,
    visible: true,
    order: 4,
    seoTitle: "TikTok Music Marketing",
    seoDescription:
      "Discover upcoming TikTok music-marketing campaigns from Money Records, including content and sound-promotion options.",
    disclaimer: MONEY_RECORDS_CAMPAIGN_DISCLAIMER,
  },
  {
    id: "youtube",
    slug: "youtube",
    name: "YouTube Marketing",
    shortName: "YouTube",
    eyebrow: "Video Campaigns",
    description:
      "Support music-video and visual-content releases through YouTube promotion, Shorts strategy, channel development, and advertising options.",
    longDescription:
      "Money Records YouTube marketing services will support music-video launches, visual-content campaigns, YouTube Shorts, channel positioning, audience development, and release-focused video promotion.",
    icon: "youtube",
    accent: "#ff0033",
    accentSoft: "rgba(255, 0, 51, 0.11)",
    status: "coming-soon",
    campaignCount: 0,
    startingPriceCents: null,
    startingPriceLabel: "Coming Soon",
    campaignCountLabel: "Campaigns in development",
    highlights: [
      "Music-video launch campaigns",
      "YouTube Shorts strategy",
      "Channel positioning",
      "Audience-development options",
    ],
    capabilities: [
      "Channel optimization",
      "Video-launch planning",
      "Shorts campaigns",
      "Audience targeting",
      "Video performance reporting",
    ],
    bestFor: [
      "Music-video releases",
      "Visual artists",
      "YouTube channels",
      "Independent labels",
    ],
    actionLabel: "View YouTube Services",
    href: "/services/youtube",
    featured: false,
    visible: true,
    order: 5,
    seoTitle: "YouTube Music Marketing",
    seoDescription:
      "Explore upcoming YouTube music-marketing services from Money Records, including video launches and Shorts campaigns.",
    disclaimer: MONEY_RECORDS_CAMPAIGN_DISCLAIMER,
  },
  {
    id: "vevo",
    slug: "vevo",
    name: "VEVO Services",
    shortName: "VEVO",
    eyebrow: "Premium Video Distribution",
    description:
      "Prepare professional music-video releases with VEVO channel support, delivery options, visual positioning, and launch strategy.",
    longDescription:
      "Money Records VEVO services are designed for artists who want a professional music-video presence supported by organized video delivery, release preparation, channel positioning, and promotional planning.",
    icon: "vevo",
    accent: "#ff4f79",
    accentSoft: "rgba(255, 79, 121, 0.11)",
    status: "custom",
    campaignCount: 0,
    startingPriceCents: null,
    startingPriceLabel: "Request Pricing",
    campaignCountLabel: "Custom service options",
    highlights: [
      "VEVO delivery options",
      "Video-release preparation",
      "Channel-positioning support",
      "Launch-strategy options",
    ],
    capabilities: [
      "Video-delivery preparation",
      "Metadata review",
      "Channel-positioning support",
      "Release coordination",
      "Promotional planning",
    ],
    bestFor: [
      "Official music videos",
      "Professional artists",
      "Independent labels",
      "Priority releases",
    ],
    actionLabel: "Explore VEVO Services",
    href: "/services/vevo",
    featured: false,
    visible: true,
    order: 6,
    seoTitle: "VEVO Services for Artists",
    seoDescription:
      "Explore Money Records VEVO services for professional music-video delivery, positioning, and release support.",
    disclaimer:
      "VEVO service availability, approval, delivery requirements, pricing, and timelines depend on the artist, video, metadata, rights documentation, and selected service.",
  },
  {
    id: "press-pr",
    slug: "press-pr",
    name: "Press & PR",
    shortName: "Press & PR",
    eyebrow: "Media Positioning",
    description:
      "Strengthen your public story through release messaging, media positioning, press outreach, and campaign narratives.",
    longDescription:
      "Money Records press and PR services help artists create stronger release narratives, organize media materials, develop campaign messaging, and pursue relevant editorial and press opportunities.",
    icon: "press",
    accent: "#e6c27a",
    accentSoft: "rgba(230, 194, 122, 0.11)",
    status: "custom",
    campaignCount: 0,
    startingPriceCents: null,
    startingPriceLabel: "Request Pricing",
    campaignCountLabel: "Custom campaign options",
    highlights: [
      "Release-story development",
      "Press-material preparation",
      "Media-positioning strategy",
      "Outreach campaign options",
    ],
    capabilities: [
      "Press-release strategy",
      "Artist biography development",
      "Campaign messaging",
      "Media-list planning",
      "Outreach reporting",
    ],
    bestFor: [
      "New releases",
      "Artist announcements",
      "Brand-building campaigns",
      "Labels and management teams",
    ],
    actionLabel: "Explore Press & PR",
    href: "/services/press-pr",
    featured: false,
    visible: true,
    order: 7,
    seoTitle: "Music Press and PR Services",
    seoDescription:
      "Explore Money Records music press and PR services for artist positioning, release messaging, and media outreach.",
    disclaimer:
      "Editorial coverage, publication acceptance, interview placement, and media response are not guaranteed. Results depend on the artist, release, story, timing, outlet requirements, and editorial decisions.",
  },
  {
    id: "radio",
    slug: "radio",
    name: "Radio Promotion",
    shortName: "Radio",
    eyebrow: "Broadcast Campaigns",
    description:
      "Create a structured radio-promotion plan around eligible releases, target markets, station formats, and campaign goals.",
    longDescription:
      "Money Records radio-promotion services will be built around release eligibility, station format, geographic targeting, campaign timing, and organized outreach to relevant broadcast opportunities.",
    icon: "radio",
    accent: "#7c8cff",
    accentSoft: "rgba(124, 140, 255, 0.11)",
    status: "coming-soon",
    campaignCount: 0,
    startingPriceCents: null,
    startingPriceLabel: "Coming Soon",
    campaignCountLabel: "Campaigns in development",
    highlights: [
      "Release eligibility review",
      "Target-format planning",
      "Market-selection strategy",
      "Campaign reporting",
    ],
    capabilities: [
      "Track review",
      "Format targeting",
      "Market planning",
      "Station outreach strategy",
      "Campaign reporting",
    ],
    bestFor: [
      "Radio-ready singles",
      "Priority releases",
      "Independent labels",
      "Established artists",
    ],
    actionLabel: "View Radio Services",
    href: "/services/radio",
    featured: false,
    visible: true,
    order: 8,
    seoTitle: "Radio Promotion for Independent Artists",
    seoDescription:
      "Discover upcoming Money Records radio-promotion services for eligible singles and priority releases.",
    disclaimer:
      "Radio airplay, rotation, station acceptance, chart position, and broadcast frequency are not guaranteed. Results depend on release eligibility, format, market, station decisions, and campaign conditions.",
  },
  {
    id: "soundcloud",
    slug: "soundcloud",
    name: "SoundCloud Marketing",
    shortName: "SoundCloud",
    eyebrow: "Independent Music Campaigns",
    description:
      "Promote music through SoundCloud-focused release positioning, audience discovery, repost strategy, and campaign options.",
    longDescription:
      "Money Records SoundCloud marketing services will support artists seeking stronger release discovery, profile positioning, community engagement, and targeted promotional activity on SoundCloud.",
    icon: "soundcloud",
    accent: "#ff6a00",
    accentSoft: "rgba(255, 106, 0, 0.11)",
    status: "coming-soon",
    campaignCount: 0,
    startingPriceCents: null,
    startingPriceLabel: "Coming Soon",
    campaignCountLabel: "Campaigns in development",
    highlights: [
      "Profile-positioning strategy",
      "Release discovery",
      "Audience-development options",
      "Campaign reporting",
    ],
    capabilities: [
      "Profile preparation",
      "Release positioning",
      "Audience strategy",
      "Promotional planning",
      "Campaign reporting",
    ],
    bestFor: [
      "Independent releases",
      "Developing artists",
      "Electronic music",
      "Hip-hop releases",
    ],
    actionLabel: "View SoundCloud Services",
    href: "/services/soundcloud",
    featured: false,
    visible: true,
    order: 9,
    seoTitle: "SoundCloud Music Marketing",
    seoDescription:
      "Explore upcoming SoundCloud music-marketing services from Money Records.",
    disclaimer: MONEY_RECORDS_CAMPAIGN_DISCLAIMER,
  },
  {
    id: "artist-branding",
    slug: "artist-branding",
    name: "Artist Branding",
    shortName: "Branding",
    eyebrow: "Artist Development",
    description:
      "Build a stronger visual identity, artist story, release presentation, social presence, and long-term brand direction.",
    longDescription:
      "Money Records artist-branding services help artists define their public identity, improve visual consistency, organize release presentation, develop stronger messaging, and build a more professional foundation for future campaigns.",
    icon: "branding",
    accent: "#d6b35a",
    accentSoft: "rgba(214, 179, 90, 0.12)",
    status: "custom",
    campaignCount: 0,
    startingPriceCents: null,
    startingPriceLabel: "Request Pricing",
    campaignCountLabel: "Custom service options",
    highlights: [
      "Artist identity strategy",
      "Visual-brand direction",
      "Release presentation",
      "Social-profile positioning",
    ],
    capabilities: [
      "Brand-positioning review",
      "Visual-direction planning",
      "Artist-story development",
      "Profile consistency",
      "Release-brand strategy",
    ],
    bestFor: [
      "Developing artists",
      "Artist rebrands",
      "New releases",
      "Independent labels",
    ],
    actionLabel: "Explore Artist Branding",
    href: "/services/artist-branding",
    featured: false,
    visible: true,
    order: 10,
    seoTitle: "Artist Branding Services",
    seoDescription:
      "Explore Money Records artist-branding services for identity, visuals, messaging, and release presentation.",
    disclaimer:
      "Branding outcomes depend on the artist’s goals, source materials, participation, selected deliverables, and campaign scope.",
  },
] as const;

/* --------------------------------------------------------------------- */
/* Platform Helpers                                                       */
/* --------------------------------------------------------------------- */

/**
 * Returns all visible platforms in storefront order.
 */
export function getVisiblePlatforms(): MarketingPlatform[] {
  return MARKETING_PLATFORMS
    .filter((platform) => platform.visible)
    .sort((a, b) => a.order - b.order);
}

/**
 * Returns platforms marked for featured placement.
 */
export function getFeaturedPlatforms(): MarketingPlatform[] {
  return MARKETING_PLATFORMS
    .filter(
      (platform) =>
        platform.visible &&
        platform.featured,
    )
    .sort((a, b) => a.order - b.order);
}

/**
 * Returns platforms that currently have live purchasable campaigns.
 */
export function getLivePlatforms(): MarketingPlatform[] {
  return MARKETING_PLATFORMS
    .filter(
      (platform) =>
        platform.visible &&
        platform.status === "live",
    )
    .sort((a, b) => a.order - b.order);
}

/**
 * Returns one platform by its URL slug.
 */
export function getPlatformBySlug(
  slug: string,
): MarketingPlatform | undefined {
  const normalizedSlug = slug
    .trim()
    .toLowerCase();

  return MARKETING_PLATFORMS.find(
    (platform) =>
      platform.slug === normalizedSlug,
  );
}

/**
 * Returns true when a valid platform exists.
 */
export function isPlatformSlug(
  slug: string,
): boolean {
  return Boolean(getPlatformBySlug(slug));
}

/**
 * Returns all platform slugs for static route generation.
 */
export function getPlatformSlugs(): string[] {
  return getVisiblePlatforms().map(
    (platform) => platform.slug,
  );
}

/**
 * Formats a platform's numeric starting price.
 */
export function formatPlatformStartingPrice(
  platform: MarketingPlatform,
): string {
  if (platform.startingPriceCents === null) {
    return platform.startingPriceLabel;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits:
      platform.startingPriceCents % 100 === 0
        ? 0
        : 2,
  }).format(
    platform.startingPriceCents / 100,
  );
}

/**
 * Returns a customer-facing platform-status label.
 */
export function getPlatformStatusLabel(
  status: PlatformStatus,
): string {
  switch (status) {
    case "live":
      return "Campaigns Available";

    case "custom":
      return "Custom Service";

    case "coming-soon":
    default:
      return "Coming Soon";
  }
}