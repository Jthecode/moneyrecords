import "server-only";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Stripe Product Catalog                               ┃
   ┃ File   : src/lib/stripe-products.ts                                  ┃
   ┃ Role   : Trusted SKU resolution, Stripe pricing, and line-item setup ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type Stripe from "stripe";

import {
  getCampaignBySku,
  type MarketingCampaign,
} from "@/data/campaigns";

import {
  createStripeMetadata,
  getStripe,
} from "@/lib/stripe";

/* --------------------------------------------------------------------- */
/* Configuration                                                         */
/* --------------------------------------------------------------------- */

/**
 * Each campaign can optionally use a pre-created Stripe Price.
 *
 * Environment-variable format:
 *
 * Campaign SKU:
 * MR-SPOTIFY-100K
 *
 * Environment variable:
 * STRIPE_PRICE_MR_SPOTIFY_100K
 */
export const STRIPE_PRICE_ENV_PREFIX =
  "STRIPE_PRICE_";

/**
 * When true, every purchasable campaign must have a configured Stripe
 * Price ID. Inline price_data fallback will be disabled.
 */
export const STRIPE_REQUIRE_PRICE_IDS_ENV =
  "STRIPE_REQUIRE_PRICE_IDS";

/**
 * When true, configured Stripe Prices are retrieved and checked against
 * the trusted Money Records catalog before a Checkout Session is created.
 */
export const STRIPE_VERIFY_PRICE_IDS_ENV =
  "STRIPE_VERIFY_PRICE_IDS";

/**
 * Prevent excessively large or manipulated checkout requests.
 *
 * Money Records campaign quantities are fixed at one service per SKU.
 */
export const MAX_STRIPE_CHECKOUT_ITEMS =
  50;

/* --------------------------------------------------------------------- */
/* Types                                                                 */
/* --------------------------------------------------------------------- */

export type StripePriceSource =
  | "stored-price"
  | "inline-price";

export type StripeProductErrorCode =
  | "invalid-sku"
  | "campaign-not-found"
  | "campaign-unavailable"
  | "invalid-price"
  | "invalid-currency"
  | "missing-price-id"
  | "invalid-price-id"
  | "duplicate-sku"
  | "too-many-items"
  | "empty-cart"
  | "stripe-price-inactive"
  | "stripe-product-inactive"
  | "stripe-product-deleted"
  | "stripe-price-recurring"
  | "stripe-price-currency-mismatch"
  | "stripe-price-amount-mismatch"
  | "stripe-price-sku-mismatch";

export type StripeCampaignProduct = {
  /**
   * Trusted Money Records campaign SKU.
   */
  sku: string;

  /**
   * Trusted campaign catalog record.
   */
  campaign: MarketingCampaign;

  /**
   * Stripe Price ID environment-variable name.
   */
  priceEnvironmentName: string;

  /**
   * Configured Stripe Price ID when present.
   */
  stripePriceId?: string;

  /**
   * Whether Checkout uses a saved Stripe Price or inline price_data.
   */
  priceSource: StripePriceSource;

  /**
   * Checkout Session line item.
   */
  lineItem: Stripe.Checkout.SessionCreateParams.LineItem;

  /**
   * One-time amount in cents.
   */
  unitAmountCents: number;

  /**
   * ISO currency code stored in the Money Records catalog.
   */
  currency: string;
};

export type StripeCheckoutCatalog = {
  /**
   * Validated Stripe campaign products.
   */
  products: StripeCampaignProduct[];

  /**
   * Checkout-ready Stripe line items.
   */
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];

  /**
   * Unique campaign-service count.
   */
  itemCount: number;

  /**
   * Trusted cart subtotal.
   */
  subtotalCents: number;

  /**
   * Shared order currency.
   */
  currency: string;
};

export type CreateStripeCheckoutCatalogOptions = {
  /**
   * Require a saved Stripe Price ID for every campaign.
   *
   * Defaults to STRIPE_REQUIRE_PRICE_IDS.
   */
  requireStoredPrice?: boolean;

  /**
   * Retrieve and validate each configured Stripe Price.
   *
   * Defaults to STRIPE_VERIFY_PRICE_IDS.
   */
  verifyStoredPrices?: boolean;
};

/* --------------------------------------------------------------------- */
/* Error                                                                 */
/* --------------------------------------------------------------------- */

export class StripeProductConfigurationError extends Error {
  readonly code: StripeProductErrorCode;
  readonly sku?: string;
  readonly environmentName?: string;

  constructor(
    code: StripeProductErrorCode,
    message: string,
    options: {
      sku?: string;
      environmentName?: string;
      cause?: unknown;
    } = {},
  ) {
    super(message, {
      cause: options.cause,
    });

    this.name =
      "StripeProductConfigurationError";

    this.code = code;
    this.sku = options.sku;
    this.environmentName =
      options.environmentName;
  }
}

/* --------------------------------------------------------------------- */
/* General Utilities                                                     */
/* --------------------------------------------------------------------- */

function readBooleanEnvironmentVariable(
  name: string,
  fallback: boolean,
): boolean {
  const rawValue =
    process.env[name]?.trim().toLowerCase();

  if (!rawValue) {
    return fallback;
  }

  if (
    rawValue === "true" ||
    rawValue === "1" ||
    rawValue === "yes" ||
    rawValue === "on"
  ) {
    return true;
  }

  if (
    rawValue === "false" ||
    rawValue === "0" ||
    rawValue === "no" ||
    rawValue === "off"
  ) {
    return false;
  }

  return fallback;
}

function normalizeCurrency(
  currency: string,
): string {
  return currency
    .trim()
    .toUpperCase();
}

function normalizeStripeCurrency(
  currency: string,
): string {
  return normalizeCurrency(
    currency,
  ).toLowerCase();
}

function normalizeProductName(
  value: string,
): string {
  const normalized =
    value.trim();

  return (
    normalized ||
    "Money Records Campaign"
  ).slice(0, 250);
}

function normalizeProductDescription(
  value: string | undefined,
): string | undefined {
  const normalized =
    value?.trim();

  if (!normalized) {
    return undefined;
  }

  return normalized.slice(0, 500);
}

/* --------------------------------------------------------------------- */
/* Environment Options                                                   */
/* --------------------------------------------------------------------- */

/**
 * Returns whether configured Stripe Price IDs are required.
 */
export function shouldRequireStripePriceIds(): boolean {
  return readBooleanEnvironmentVariable(
    STRIPE_REQUIRE_PRICE_IDS_ENV,
    false,
  );
}

/**
 * Returns whether configured Stripe Prices should be verified through the
 * Stripe API before creating Checkout.
 */
export function shouldVerifyStripePriceIds(): boolean {
  return readBooleanEnvironmentVariable(
    STRIPE_VERIFY_PRICE_IDS_ENV,
    true,
  );
}

/* --------------------------------------------------------------------- */
/* SKU Utilities                                                         */
/* --------------------------------------------------------------------- */

/**
 * Normalizes a campaign SKU before catalog lookup.
 */
export function normalizeStripeProductSku(
  sku: string,
): string {
  return sku
    .trim()
    .toUpperCase();
}

/**
 * Converts a campaign SKU into its Stripe Price environment-variable name.
 *
 * MR-SPOTIFY-100K becomes:
 * STRIPE_PRICE_MR_SPOTIFY_100K
 */
export function getStripePriceEnvironmentName(
  rawSku: string,
): string {
  const sku =
    normalizeStripeProductSku(
      rawSku,
    );

  const safeSku =
    sku.replace(
      /[^A-Z0-9]+/g,
      "_",
    );

  return `${STRIPE_PRICE_ENV_PREFIX}${safeSku}`;
}

/**
 * Returns true when a value resembles a Stripe Price ID.
 */
export function isStripePriceId(
  value: string,
): boolean {
  return /^price_[A-Za-z0-9_]+$/.test(
    value.trim(),
  );
}

/**
 * Reads the saved Stripe Price ID configured for a campaign SKU.
 */
export function getConfiguredStripePriceId(
  rawSku: string,
): string | undefined {
  const sku =
    normalizeStripeProductSku(
      rawSku,
    );

  const environmentName =
    getStripePriceEnvironmentName(
      sku,
    );

  const priceId =
    process.env[
      environmentName
    ]?.trim();

  if (!priceId) {
    return undefined;
  }

  if (!isStripePriceId(priceId)) {
    throw new StripeProductConfigurationError(
      "invalid-price-id",
      `${environmentName} does not contain a valid Stripe Price ID.`,
      {
        sku,
        environmentName,
      },
    );
  }

  return priceId;
}

/* --------------------------------------------------------------------- */
/* Trusted Campaign Resolution                                           */
/* --------------------------------------------------------------------- */

/**
 * Confirms that a campaign is eligible for Stripe Checkout.
 */
export function isStripePurchasableCampaign(
  campaign: MarketingCampaign,
): boolean {
  const currency =
    normalizeCurrency(
      campaign.currency,
    );

  return (
    campaign.status === "live" &&
    campaign.purchasable === true &&
    Number.isInteger(
      campaign.priceCents,
    ) &&
    campaign.priceCents > 0 &&
    /^[A-Z]{3}$/.test(currency)
  );
}

/**
 * Resolves a browser-submitted SKU against the trusted campaign catalog.
 */
export function resolveStripeCampaignBySku(
  rawSku: string,
): MarketingCampaign {
  const sku =
    normalizeStripeProductSku(
      rawSku,
    );

  if (!sku) {
    throw new StripeProductConfigurationError(
      "invalid-sku",
      "A valid campaign SKU is required.",
    );
  }

  const campaign =
    getCampaignBySku(sku);

  if (!campaign) {
    throw new StripeProductConfigurationError(
      "campaign-not-found",
      `The campaign ${sku} could not be found.`,
      {
        sku,
      },
    );
  }

  if (
    campaign.status !== "live" ||
    !campaign.purchasable
  ) {
    throw new StripeProductConfigurationError(
      "campaign-unavailable",
      `${campaign.name} is not currently available for purchase.`,
      {
        sku,
      },
    );
  }

  if (
    !Number.isInteger(
      campaign.priceCents,
    ) ||
    campaign.priceCents <= 0
  ) {
    throw new StripeProductConfigurationError(
      "invalid-price",
      `${campaign.name} does not have a valid one-time price.`,
      {
        sku,
      },
    );
  }

  const currency =
    normalizeCurrency(
      campaign.currency,
    );

  if (
    !/^[A-Z]{3}$/.test(
      currency,
    )
  ) {
    throw new StripeProductConfigurationError(
      "invalid-currency",
      `${campaign.name} does not have a valid three-letter currency code.`,
      {
        sku,
      },
    );
  }

  return campaign;
}

/* --------------------------------------------------------------------- */
/* Stripe Line-Item Creation                                             */
/* --------------------------------------------------------------------- */

/**
 * Builds a Stripe Checkout line item using a pre-created Stripe Price ID.
 */
function createStoredPriceLineItem(
  priceId: string,
): Stripe.Checkout.SessionCreateParams.LineItem {
  return {
    price: priceId,
    quantity: 1,
  };
}

/**
 * Builds a Stripe Checkout line item from the trusted Money Records
 * campaign catalog.
 *
 * Browser-provided names, prices, descriptions, and currencies are never
 * used.
 */
function createInlinePriceLineItem(
  campaign: MarketingCampaign,
): Stripe.Checkout.SessionCreateParams.LineItem {
  const description =
    normalizeProductDescription(
      campaign.description,
    );

  const productData:
    Stripe.Checkout.SessionCreateParams.LineItem.PriceData.ProductData = {
      name:
        normalizeProductName(
          campaign.name,
        ),

      metadata:
        createStripeMetadata({
          sku:
            campaign.sku,

          campaign_id:
            campaign.id,

          campaign_slug:
            campaign.slug,

          platform_slug:
            campaign.platformSlug,

          campaign_target:
            campaign.campaignTargetLabel,

          product_type:
            "marketing-campaign",
        }),
    };

  if (description) {
    productData.description =
      description;
  }

  return {
    quantity: 1,

    price_data: {
      currency:
        normalizeStripeCurrency(
          campaign.currency,
        ),

      unit_amount:
        campaign.priceCents,

      product_data:
        productData,
    },
  };
}

/**
 * Resolves one trusted campaign into a Stripe Checkout product.
 */
export function resolveStripeCampaignProduct(
  rawSku: string,
  options: Pick<
    CreateStripeCheckoutCatalogOptions,
    "requireStoredPrice"
  > = {},
): StripeCampaignProduct {
  const campaign =
    resolveStripeCampaignBySku(
      rawSku,
    );

  const sku =
    normalizeStripeProductSku(
      campaign.sku,
    );

  const priceEnvironmentName =
    getStripePriceEnvironmentName(
      sku,
    );

  const stripePriceId =
    getConfiguredStripePriceId(
      sku,
    );

  const requireStoredPrice =
    options.requireStoredPrice ??
    shouldRequireStripePriceIds();

  if (
    requireStoredPrice &&
    !stripePriceId
  ) {
    throw new StripeProductConfigurationError(
      "missing-price-id",
      `${priceEnvironmentName} must be configured before ${campaign.name} can be purchased.`,
      {
        sku,
        environmentName:
          priceEnvironmentName,
      },
    );
  }

  if (stripePriceId) {
    return {
      sku,
      campaign,
      priceEnvironmentName,
      stripePriceId,
      priceSource:
        "stored-price",
      lineItem:
        createStoredPriceLineItem(
          stripePriceId,
        ),
      unitAmountCents:
        campaign.priceCents,
      currency:
        normalizeCurrency(
          campaign.currency,
        ),
    };
  }

  return {
    sku,
    campaign,
    priceEnvironmentName,
    priceSource:
      "inline-price",
    lineItem:
      createInlinePriceLineItem(
        campaign,
      ),
    unitAmountCents:
      campaign.priceCents,
    currency:
      normalizeCurrency(
        campaign.currency,
      ),
  };
}

/* --------------------------------------------------------------------- */
/* Stripe Price Verification                                             */
/* --------------------------------------------------------------------- */

function getMetadataSku(
  metadata: Stripe.Metadata,
): string | undefined {
  const value =
    metadata.sku ??
    metadata.campaign_sku;

  return value
    ? normalizeStripeProductSku(
        value,
      )
    : undefined;
}

/**
 * Retrieves a configured Stripe Price and verifies it against the trusted
 * Money Records campaign catalog.
 */
export async function verifyStripePriceForCampaign(
  campaign: MarketingCampaign,
  priceId: string,
): Promise<Stripe.Price> {
  const sku =
    normalizeStripeProductSku(
      campaign.sku,
    );

  const stripe =
    getStripe();

  const price =
    await stripe.prices.retrieve(
      priceId,
      {
        expand: [
          "product",
        ],
      },
    );

  if (!price.active) {
    throw new StripeProductConfigurationError(
      "stripe-price-inactive",
      `The Stripe Price configured for ${campaign.name} is inactive.`,
      {
        sku,
      },
    );
  }

  if (
    price.type !== "one_time" ||
    price.recurring
  ) {
    throw new StripeProductConfigurationError(
      "stripe-price-recurring",
      `The Stripe Price configured for ${campaign.name} must be a one-time price.`,
      {
        sku,
      },
    );
  }

  const stripeCurrency =
    normalizeCurrency(
      price.currency,
    );

  const campaignCurrency =
    normalizeCurrency(
      campaign.currency,
    );

  if (
    stripeCurrency !==
    campaignCurrency
  ) {
    throw new StripeProductConfigurationError(
      "stripe-price-currency-mismatch",
      `The Stripe Price currency for ${campaign.name} does not match the Money Records catalog.`,
      {
        sku,
      },
    );
  }

  if (
    price.unit_amount !==
    campaign.priceCents
  ) {
    throw new StripeProductConfigurationError(
      "stripe-price-amount-mismatch",
      `The Stripe Price amount for ${campaign.name} does not match the Money Records catalog.`,
      {
        sku,
      },
    );
  }

  const priceMetadataSku =
    getMetadataSku(
      price.metadata,
    );

  if (
    priceMetadataSku &&
    priceMetadataSku !== sku
  ) {
    throw new StripeProductConfigurationError(
      "stripe-price-sku-mismatch",
      `The Stripe Price metadata SKU for ${campaign.name} does not match ${sku}.`,
      {
        sku,
      },
    );
  }

  const product =
    price.product;

  if (
    typeof product !==
    "string"
  ) {
    if (
      "deleted" in product &&
      product.deleted
    ) {
      throw new StripeProductConfigurationError(
        "stripe-product-deleted",
        `The Stripe Product connected to ${campaign.name} has been deleted.`,
        {
          sku,
        },
      );
    }

    const activeProduct =
      product as Stripe.Product;

    if (!activeProduct.active) {
      throw new StripeProductConfigurationError(
        "stripe-product-inactive",
        `The Stripe Product connected to ${campaign.name} is inactive.`,
        {
          sku,
        },
      );
    }

    const productMetadataSku =
      getMetadataSku(
        activeProduct.metadata,
      );

    if (
      productMetadataSku &&
      productMetadataSku !==
        sku
    ) {
      throw new StripeProductConfigurationError(
        "stripe-price-sku-mismatch",
        `The Stripe Product metadata SKU for ${campaign.name} does not match ${sku}.`,
        {
          sku,
        },
      );
    }
  }

  return price;
}

/**
 * Verifies a resolved Stripe campaign product when it uses a saved Price
 * ID.
 */
export async function verifyStripeCampaignProduct(
  product: StripeCampaignProduct,
): Promise<void> {
  if (
    product.priceSource !==
      "stored-price" ||
    !product.stripePriceId
  ) {
    return;
  }

  await verifyStripePriceForCampaign(
    product.campaign,
    product.stripePriceId,
  );
}

/* --------------------------------------------------------------------- */
/* Checkout Catalog Resolution                                           */
/* --------------------------------------------------------------------- */

/**
 * Converts browser-submitted SKUs into trusted Stripe Checkout products.
 *
 * This function:
 * - Rejects empty carts
 * - Rejects duplicate SKUs
 * - Rejects unavailable campaigns
 * - Resolves prices from the server catalog
 * - Optionally validates configured Stripe Prices
 * - Enforces one shared currency
 */
export async function createStripeCheckoutCatalog(
  rawSkus: readonly string[],
  options: CreateStripeCheckoutCatalogOptions = {},
): Promise<StripeCheckoutCatalog> {
  if (
    !Array.isArray(rawSkus) ||
    rawSkus.length === 0
  ) {
    throw new StripeProductConfigurationError(
      "empty-cart",
      "At least one campaign is required for checkout.",
    );
  }

  if (
    rawSkus.length >
    MAX_STRIPE_CHECKOUT_ITEMS
  ) {
    throw new StripeProductConfigurationError(
      "too-many-items",
      `A checkout may contain no more than ${MAX_STRIPE_CHECKOUT_ITEMS} campaign services.`,
    );
  }

  const requireStoredPrice =
    options.requireStoredPrice ??
    shouldRequireStripePriceIds();

  const verifyStoredPrices =
    options.verifyStoredPrices ??
    shouldVerifyStripePriceIds();

  const seenSkus =
    new Set<string>();

  const products:
    StripeCampaignProduct[] = [];

  let subtotalCents = 0;
  let checkoutCurrency:
    string | undefined;

  for (const rawSku of rawSkus) {
    const sku =
      normalizeStripeProductSku(
        rawSku,
      );

    if (!sku) {
      throw new StripeProductConfigurationError(
        "invalid-sku",
        "Every checkout item must contain a valid campaign SKU.",
      );
    }

    if (
      seenSkus.has(sku)
    ) {
      throw new StripeProductConfigurationError(
        "duplicate-sku",
        `${sku} appears more than once in the checkout request.`,
        {
          sku,
        },
      );
    }

    seenSkus.add(sku);

    const product =
      resolveStripeCampaignProduct(
        sku,
        {
          requireStoredPrice,
        },
      );

    if (
      checkoutCurrency &&
      checkoutCurrency !==
        product.currency
    ) {
      throw new StripeProductConfigurationError(
        "invalid-currency",
        "All campaign services in one checkout must use the same currency.",
        {
          sku,
        },
      );
    }

    checkoutCurrency =
      product.currency;

    if (
      verifyStoredPrices &&
      product.priceSource ===
        "stored-price"
    ) {
      await verifyStripeCampaignProduct(
        product,
      );
    }

    subtotalCents +=
      product.unitAmountCents;

    products.push(product);
  }

  return {
    products,

    lineItems:
      products.map(
        (product) =>
          product.lineItem,
      ),

    itemCount:
      products.length,

    subtotalCents,

    currency:
      checkoutCurrency ??
      "USD",
  };
}

/* --------------------------------------------------------------------- */
/* Convenience Functions                                                 */
/* --------------------------------------------------------------------- */

/**
 * Returns only the Stripe Checkout line items for a collection of SKUs.
 */
export async function createStripeCheckoutLineItems(
  skus: readonly string[],
  options: CreateStripeCheckoutCatalogOptions = {},
): Promise<
  Stripe.Checkout.SessionCreateParams.LineItem[]
> {
  const catalog =
    await createStripeCheckoutCatalog(
      skus,
      options,
    );

  return catalog.lineItems;
}

/**
 * Returns a list of required Stripe Price environment variables for a
 * collection of campaign SKUs.
 */
export function getStripePriceEnvironmentNames(
  skus: readonly string[],
): string[] {
  return Array.from(
    new Set(
      skus.map(
        getStripePriceEnvironmentName,
      ),
    ),
  );
}

/**
 * Returns a safe public snapshot for internal logging or order creation.
 *
 * Stripe secret values are not included.
 */
export function createStripeProductSnapshot(
  product: StripeCampaignProduct,
) {
  return {
    sku:
      product.sku,

    campaignId:
      product.campaign.id,

    campaignSlug:
      product.campaign.slug,

    campaignName:
      product.campaign.name,

    campaignShortName:
      product.campaign.shortName,

    campaignHref:
      product.campaign.href,

    campaignTargetLabel:
      product.campaign
        .campaignTargetLabel,

    platformSlug:
      product.campaign
        .platformSlug,

    unitAmountCents:
      product.unitAmountCents,

    quantity:
      1 as const,

    totalAmountCents:
      product.unitAmountCents,

    currency:
      product.currency,

    stripePriceId:
      product.stripePriceId,

    priceSource:
      product.priceSource,
  };
}