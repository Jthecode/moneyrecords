// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Cart Utilities                                        ┃
   ┃ File   : src/lib/cart.ts                                              ┃
   ┃ Role   : Trusted campaign resolution, cart storage, totals, actions   ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  getCampaignBySku,
  type MarketingCampaign,
} from "@/data/campaigns";

import {
  getPlatformBySlug,
  type MarketingPlatform,
} from "@/data/platforms";

import {
  CART_STORAGE_VERSION,
  EMPTY_CART_STORAGE_PAYLOAD,
  EMPTY_CART_TOTALS,
  type AddToCartInput,
  type AddToCartResult,
  type CartCurrency,
  type CartItem,
  type CartStoragePayload,
  type CartTotals,
  type CheckoutCartPayload,
  type RemoveFromCartResult,
  type UnknownCartStoragePayload,
} from "@/types/cart";

/* --------------------------------------------------------------------- */
/* Configuration                                                         */
/* --------------------------------------------------------------------- */

/**
 * Browser storage key used for the Money Records cart.
 */
export const CART_STORAGE_KEY =
  "money-records-cart-v1";

/**
 * Money Records currently processes storefront prices in USD.
 */
export const CART_CURRENCY: CartCurrency =
  "USD";

/* --------------------------------------------------------------------- */
/* Public Action Result Types                                            */
/* --------------------------------------------------------------------- */

export type AddCartItemOutcome = {
  items: CartItem[];
  result: AddToCartResult;
};

export type RemoveCartItemOutcome = {
  items: CartItem[];
  result: RemoveFromCartResult;
};

/* --------------------------------------------------------------------- */
/* Basic Utilities                                                       */
/* --------------------------------------------------------------------- */

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isNonEmptyString(
  value: unknown,
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function isValidIsoDate(
  value: unknown,
): value is string {
  if (!isNonEmptyString(value)) {
    return false;
  }

  return !Number.isNaN(
    Date.parse(value),
  );
}

function createTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Normalizes campaign SKUs before catalog lookup.
 */
export function normalizeCartSku(
  sku: string,
): string {
  return sku.trim().toUpperCase();
}

/**
 * Returns true when browser storage APIs are available.
 */
export function canUseCartStorage(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  );
}

/* --------------------------------------------------------------------- */
/* Campaign Validation                                                   */
/* --------------------------------------------------------------------- */

/**
 * Confirms that a campaign can currently be purchased.
 */
export function isPurchasableCampaign(
  campaign: MarketingCampaign,
): boolean {
  return (
    campaign.status === "live" &&
    campaign.purchasable === true &&
    Number.isInteger(campaign.priceCents) &&
    campaign.priceCents >= 0 &&
    campaign.currency === CART_CURRENCY
  );
}

/**
 * Confirms that a platform can support a public storefront cart item.
 */
function isAvailablePlatform(
  platform: MarketingPlatform | undefined,
): platform is MarketingPlatform {
  return Boolean(
    platform &&
      platform.visible,
  );
}

/* --------------------------------------------------------------------- */
/* Trusted Cart-Item Resolution                                          */
/* --------------------------------------------------------------------- */

/**
 * Converts a trusted campaign catalog record into a CartItem.
 *
 * Prices and campaign details are resolved from the catalog instead of
 * accepting browser-provided values.
 */
export function createCartItemFromCampaign(
  campaign: MarketingCampaign,
  addedAt = createTimestamp(),
): CartItem | null {
  const platform = getPlatformBySlug(
    campaign.platformSlug,
  );

  if (
    !isPurchasableCampaign(campaign) ||
    !isAvailablePlatform(platform)
  ) {
    return null;
  }

  return {
    id: campaign.sku,
    sku: campaign.sku,

    campaignId: campaign.id,
    campaignSlug: campaign.slug,
    campaignHref: campaign.href,
    campaignName: campaign.name,
    campaignShortName: campaign.shortName,
    campaignTargetLabel:
      campaign.campaignTargetLabel,

    platformSlug: platform.slug,
    platformName: platform.name,
    platformShortName:
      platform.shortName,

    priceCents: campaign.priceCents,
    currency: CART_CURRENCY,
    quantity: 1,

    accent: platform.accent,
    accentSoft: platform.accentSoft,

    addedAt,
  };
}

/**
 * Resolves a trusted campaign SKU into a cart-ready item.
 */
export function resolveCartItemBySku(
  rawSku: string,
  addedAt?: string,
): CartItem | null {
  const sku = normalizeCartSku(rawSku);

  if (!sku) {
    return null;
  }

  const campaign =
    getCampaignBySku(sku);

  if (!campaign) {
    return null;
  }

  return createCartItemFromCampaign(
    campaign,
    addedAt,
  );
}

/* --------------------------------------------------------------------- */
/* Cart Lookup Helpers                                                   */
/* --------------------------------------------------------------------- */

/**
 * Returns a cart item by trusted campaign SKU.
 */
export function getCartItemBySku(
  items: readonly CartItem[],
  rawSku: string,
): CartItem | undefined {
  const sku = normalizeCartSku(rawSku);

  return items.find(
    (item) =>
      normalizeCartSku(item.sku) === sku,
  );
}

/**
 * Returns true when a campaign is already selected.
 */
export function isSkuInCart(
  items: readonly CartItem[],
  rawSku: string,
): boolean {
  return Boolean(
    getCartItemBySku(items, rawSku),
  );
}

/* --------------------------------------------------------------------- */
/* Cart Normalization                                                    */
/* --------------------------------------------------------------------- */

/**
 * Re-resolves every cart item against the current trusted catalogs.
 *
 * This prevents stale prices, hidden platforms, duplicate items, and
 * campaigns that are no longer purchasable from remaining in the cart.
 */
export function normalizeCartItems(
  items: readonly CartItem[],
): CartItem[] {
  const uniqueItems = new Map<
    string,
    CartItem
  >();

  for (const item of items) {
    if (!isNonEmptyString(item.sku)) {
      continue;
    }

    const sku = normalizeCartSku(
      item.sku,
    );

    if (uniqueItems.has(sku)) {
      continue;
    }

    const addedAt = isValidIsoDate(
      item.addedAt,
    )
      ? item.addedAt
      : createTimestamp();

    const resolvedItem =
      resolveCartItemBySku(
        sku,
        addedAt,
      );

    if (!resolvedItem) {
      continue;
    }

    uniqueItems.set(
      sku,
      resolvedItem,
    );
  }

  return Array.from(
    uniqueItems.values(),
  );
}

/* --------------------------------------------------------------------- */
/* Add-to-Cart                                                           */
/* --------------------------------------------------------------------- */

/**
 * Adds one trusted campaign service to the cart.
 *
 * Campaign quantities are fixed at one, so duplicate SKUs are rejected.
 */
export function addCartItem(
  currentItems: readonly CartItem[],
  input: AddToCartInput,
): AddCartItemOutcome {
  try {
    const sku = normalizeCartSku(
      input.sku,
    );

    if (!sku) {
      return {
        items: normalizeCartItems(
          currentItems,
        ),
        result: {
          ok: false,
          status: "invalid-sku",
          message:
            "A valid campaign SKU is required.",
        },
      };
    }

    const normalizedItems =
      normalizeCartItems(
        currentItems,
      );

    const existingItem =
      getCartItemBySku(
        normalizedItems,
        sku,
      );

    if (existingItem) {
      return {
        items: normalizedItems,
        result: {
          ok: false,
          status: "already-in-cart",
          message:
            `${existingItem.campaignShortName} is already in your cart.`,
          item: existingItem,
        },
      };
    }

    const campaign =
      getCampaignBySku(sku);

    if (!campaign) {
      return {
        items: normalizedItems,
        result: {
          ok: false,
          status: "invalid-sku",
          message:
            "The selected campaign could not be found.",
        },
      };
    }

    if (!isPurchasableCampaign(campaign)) {
      return {
        items: normalizedItems,
        result: {
          ok: false,
          status: "not-purchasable",
          message:
            "This campaign is not currently available for purchase.",
        },
      };
    }

    const item =
      createCartItemFromCampaign(
        campaign,
      );

    if (!item) {
      return {
        items: normalizedItems,
        result: {
          ok: false,
          status: "not-purchasable",
          message:
            "This campaign cannot currently be added to the cart.",
        },
      };
    }

    return {
      items: [
        ...normalizedItems,
        item,
      ],
      result: {
        ok: true,
        status: "added",
        message:
          `${item.campaignShortName} was added to your cart.`,
        item,
      },
    };
  } catch {
    return {
      items: normalizeCartItems(
        currentItems,
      ),
      result: {
        ok: false,
        status: "error",
        message:
          "The campaign could not be added. Please try again.",
      },
    };
  }
}

/* --------------------------------------------------------------------- */
/* Remove from Cart                                                      */
/* --------------------------------------------------------------------- */

/**
 * Removes a selected campaign by SKU.
 */
export function removeCartItem(
  currentItems: readonly CartItem[],
  rawSku: string,
): RemoveCartItemOutcome {
  try {
    const normalizedItems =
      normalizeCartItems(
        currentItems,
      );

    const sku = normalizeCartSku(
      rawSku,
    );

    const item =
      getCartItemBySku(
        normalizedItems,
        sku,
      );

    if (!item) {
      return {
        items: normalizedItems,
        result: {
          ok: false,
          status: "not-found",
          message:
            "The selected campaign was not found in your cart.",
          sku,
        },
      };
    }

    return {
      items: normalizedItems.filter(
        (cartItem) =>
          normalizeCartSku(
            cartItem.sku,
          ) !== sku,
      ),
      result: {
        ok: true,
        status: "removed",
        message:
          `${item.campaignShortName} was removed from your cart.`,
        sku,
      },
    };
  } catch {
    return {
      items: normalizeCartItems(
        currentItems,
      ),
      result: {
        ok: false,
        status: "error",
        message:
          "The campaign could not be removed. Please try again.",
        sku: normalizeCartSku(
          rawSku,
        ),
      },
    };
  }
}

/* --------------------------------------------------------------------- */
/* Cart Totals                                                           */
/* --------------------------------------------------------------------- */

/**
 * Calculates cart item count and subtotal using trusted cart records.
 */
export function calculateCartTotals(
  items: readonly CartItem[],
): CartTotals {
  const normalizedItems =
    normalizeCartItems(items);

  if (normalizedItems.length === 0) {
    return {
      ...EMPTY_CART_TOTALS,
    };
  }

  const subtotalCents =
    normalizedItems.reduce(
      (total, item) =>
        total + item.priceCents,
      0,
    );

  return {
    itemCount: normalizedItems.length,
    uniqueItemCount:
      normalizedItems.length,
    subtotalCents,
    currency: CART_CURRENCY,
  };
}

/* --------------------------------------------------------------------- */
/* Price Formatting                                                      */
/* --------------------------------------------------------------------- */

/**
 * Formats a cent-based amount for customer-facing cart displays.
 */
export function formatCartPrice(
  priceCents: number,
  currency: CartCurrency =
    CART_CURRENCY,
): string {
  const safePrice = Number.isFinite(
    priceCents,
  )
    ? Math.max(0, priceCents)
    : 0;

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency,
      minimumFractionDigits:
        safePrice % 100 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    },
  ).format(safePrice / 100);
}

/* --------------------------------------------------------------------- */
/* Storage Payload Creation                                              */
/* --------------------------------------------------------------------- */

/**
 * Creates a versioned browser-storage payload.
 */
export function createCartStoragePayload(
  items: readonly CartItem[],
): CartStoragePayload {
  return {
    version: CART_STORAGE_VERSION,
    items: normalizeCartItems(items),
    updatedAt: createTimestamp(),
  };
}

/**
 * Converts a storage payload into JSON.
 */
export function serializeCartStoragePayload(
  payload: CartStoragePayload,
): string {
  return JSON.stringify(payload);
}

/* --------------------------------------------------------------------- */
/* Unknown Storage Validation                                            */
/* --------------------------------------------------------------------- */

function getStoredItemSku(
  value: unknown,
): string | null {
  if (!isRecord(value)) {
    return null;
  }

  return isNonEmptyString(value.sku)
    ? normalizeCartSku(value.sku)
    : null;
}

function getStoredItemAddedAt(
  value: unknown,
): string | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  return isValidIsoDate(
    value.addedAt,
  )
    ? value.addedAt
    : undefined;
}

/**
 * Parses unknown browser-storage data and revalidates every campaign SKU.
 */
export function parseCartStoragePayload(
  rawValue: string | null,
): CartStoragePayload {
  if (!rawValue) {
    return {
      ...EMPTY_CART_STORAGE_PAYLOAD,
    };
  }

  try {
    const parsed: unknown =
      JSON.parse(rawValue);

    if (!isRecord(parsed)) {
      return {
        ...EMPTY_CART_STORAGE_PAYLOAD,
      };
    }

    const payload =
      parsed as UnknownCartStoragePayload;

    if (
      payload.version !==
      CART_STORAGE_VERSION
    ) {
      return {
        ...EMPTY_CART_STORAGE_PAYLOAD,
      };
    }

    if (!Array.isArray(payload.items)) {
      return {
        ...EMPTY_CART_STORAGE_PAYLOAD,
      };
    }

    const items: CartItem[] = [];
    const usedSkus = new Set<string>();

    for (const storedItem of payload.items) {
      const sku =
        getStoredItemSku(
          storedItem,
        );

      if (
        !sku ||
        usedSkus.has(sku)
      ) {
        continue;
      }

      const addedAt =
        getStoredItemAddedAt(
          storedItem,
        );

      const resolvedItem =
        resolveCartItemBySku(
          sku,
          addedAt,
        );

      if (!resolvedItem) {
        continue;
      }

      usedSkus.add(sku);
      items.push(resolvedItem);
    }

    return {
      version: CART_STORAGE_VERSION,
      items,
      updatedAt: isValidIsoDate(
        payload.updatedAt,
      )
        ? payload.updatedAt
        : createTimestamp(),
    };
  } catch {
    return {
      ...EMPTY_CART_STORAGE_PAYLOAD,
    };
  }
}

/* --------------------------------------------------------------------- */
/* Browser Storage                                                       */
/* --------------------------------------------------------------------- */

/**
 * Reads and validates the current browser cart.
 */
export function loadCartFromStorage(): CartStoragePayload {
  if (!canUseCartStorage()) {
    return {
      ...EMPTY_CART_STORAGE_PAYLOAD,
    };
  }

  try {
    const rawValue =
      window.localStorage.getItem(
        CART_STORAGE_KEY,
      );

    return parseCartStoragePayload(
      rawValue,
    );
  } catch {
    return {
      ...EMPTY_CART_STORAGE_PAYLOAD,
    };
  }
}

/**
 * Saves the trusted cart to browser storage.
 */
export function saveCartToStorage(
  items: readonly CartItem[],
): CartStoragePayload {
  const payload =
    createCartStoragePayload(items);

  if (!canUseCartStorage()) {
    return payload;
  }

  try {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      serializeCartStoragePayload(
        payload,
      ),
    );
  } catch {
    // The in-memory cart can still function when storage is unavailable.
  }

  return payload;
}

/**
 * Deletes the browser-stored cart.
 */
export function clearCartStorage(): void {
  if (!canUseCartStorage()) {
    return;
  }

  try {
    window.localStorage.removeItem(
      CART_STORAGE_KEY,
    );
  } catch {
    // Ignore storage failures so the UI can still clear its runtime state.
  }
}

/* --------------------------------------------------------------------- */
/* Safe Checkout Payload                                                 */
/* --------------------------------------------------------------------- */

/**
 * Creates the only cart data that should be sent to the checkout API.
 *
 * The API receives campaign SKUs and must resolve product names, prices,
 * Stripe Price IDs, and availability again on the server.
 */
export function createCheckoutCartPayload(
  items: readonly CartItem[],
): CheckoutCartPayload {
  const normalizedItems =
    normalizeCartItems(items);

  return {
    items: normalizedItems.map(
      (item) => ({
        sku: item.sku,
      }),
    ),
  };
}