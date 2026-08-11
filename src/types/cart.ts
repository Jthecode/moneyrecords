// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Cart Types                                            ┃
   ┃ File   : src/types/cart.ts                                            ┃
   ┃ Role   : Shared types for cart state, storage, totals, and actions     ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

/* --------------------------------------------------------------------- */
/* Core Cart Configuration                                                */
/* --------------------------------------------------------------------- */

/**
 * Current local-storage cart format.
 *
 * Increase this number only when the persisted cart structure changes.
 */
export const CART_STORAGE_VERSION = 1 as const;

export type CartStorageVersion =
  typeof CART_STORAGE_VERSION;

/**
 * Money Records currently uses USD for storefront campaign pricing.
 */
export type CartCurrency = "USD";

/**
 * Each campaign service may only appear once in the cart.
 *
 * Money Records campaigns are managed services, not physical products,
 * so quantity is intentionally fixed at one.
 */
export type CartItemQuantity = 1;

/* --------------------------------------------------------------------- */
/* Cart Item                                                              */
/* --------------------------------------------------------------------- */

/**
 * A cart-ready campaign resolved from the trusted campaign catalog.
 *
 * The browser may display this information, but checkout must always use
 * the SKU to revalidate the campaign and Stripe price on the server.
 */
export type CartItem = {
  /**
   * Stable cart-item identifier.
   *
   * Currently the trusted campaign SKU.
   */
  id: string;

  /**
   * Trusted campaign SKU.
   *
   * Example:
   * MR-SPOTIFY-100K
   */
  sku: string;

  /**
   * Internal campaign ID from src/data/campaigns.ts.
   */
  campaignId: string;

  /**
   * Campaign route slug.
   *
   * Example:
   * 100k-breakout
   */
  campaignSlug: string;

  /**
   * Full campaign details route.
   *
   * Example:
   * /services/spotify/100k-breakout
   */
  campaignHref: string;

  /**
   * Full campaign name.
   *
   * Example:
   * Spotify 100K Breakout Campaign
   */
  campaignName: string;

  /**
   * Compact campaign name used in cart summaries.
   *
   * Example:
   * 100K Breakout
   */
  campaignShortName: string;

  /**
   * Campaign target displayed to the customer.
   *
   * Example:
   * 100K
   */
  campaignTargetLabel: string;

  /**
   * Platform route slug.
   *
   * Example:
   * spotify
   */
  platformSlug: string;

  /**
   * Full platform name.
   *
   * Example:
   * Spotify Marketing
   */
  platformName: string;

  /**
   * Compact platform name.
   *
   * Example:
   * Spotify
   */
  platformShortName: string;

  /**
   * Trusted catalog price in cents.
   *
   * Example:
   * 59900 represents $599.00.
   */
  priceCents: number;

  /**
   * Campaign currency.
   */
  currency: CartCurrency;

  /**
   * Campaign services cannot be purchased in duplicate quantities.
   */
  quantity: CartItemQuantity;

  /**
   * Platform accent used by cart components.
   *
   * Example:
   * #1ed760
   */
  accent: string;

  /**
   * Soft platform accent used for backgrounds.
   *
   * Example:
   * rgba(30, 215, 96, 0.10)
   */
  accentSoft: string;

  /**
   * ISO timestamp representing when the item entered the cart.
   */
  addedAt: string;
};

/* --------------------------------------------------------------------- */
/* Add-to-Cart Input                                                      */
/* --------------------------------------------------------------------- */

/**
 * The only product identifier accepted from a client-side add-to-cart
 * action.
 *
 * The SKU must be resolved through src/data/campaigns.ts before a CartItem
 * is created. Never accept a browser-provided price.
 */
export type AddToCartInput = {
  sku: string;
};

/* --------------------------------------------------------------------- */
/* Cart State                                                             */
/* --------------------------------------------------------------------- */

/**
 * Runtime state managed by CartProvider.
 */
export type CartState = {
  items: CartItem[];

  /**
   * Prevents hydration mismatches while local-storage data is loading.
   */
  isHydrated: boolean;
};

/**
 * Default empty runtime cart state.
 */
export const EMPTY_CART_STATE: CartState = {
  items: [],
  isHydrated: false,
};

/* --------------------------------------------------------------------- */
/* Persisted Cart                                                         */
/* --------------------------------------------------------------------- */

/**
 * Data stored in the browser's localStorage.
 */
export type CartStoragePayload = {
  version: CartStorageVersion;
  items: CartItem[];
  updatedAt: string;
};

/**
 * Default local-storage payload.
 */
export const EMPTY_CART_STORAGE_PAYLOAD: CartStoragePayload = {
  version: CART_STORAGE_VERSION,
  items: [],
  updatedAt: "",
};

/* --------------------------------------------------------------------- */
/* Cart Totals                                                            */
/* --------------------------------------------------------------------- */

/**
 * Calculated values derived from the current cart.
 */
export type CartTotals = {
  /**
   * Number of selected services.
   *
   * Because each service quantity is fixed at one, this matches the
   * number of unique campaign SKUs.
   */
  itemCount: number;

  /**
   * Number of unique campaign products in the cart.
   */
  uniqueItemCount: number;

  /**
   * Cart subtotal in cents.
   */
  subtotalCents: number;

  /**
   * Currency shared by all cart items.
   */
  currency: CartCurrency;
};

/**
 * Default totals for an empty cart.
 */
export const EMPTY_CART_TOTALS: CartTotals = {
  itemCount: 0,
  uniqueItemCount: 0,
  subtotalCents: 0,
  currency: "USD",
};

/* --------------------------------------------------------------------- */
/* Cart Action Results                                                    */
/* --------------------------------------------------------------------- */

export type AddToCartStatus =
  | "added"
  | "already-in-cart"
  | "invalid-sku"
  | "not-purchasable"
  | "error";

export type AddToCartResult = {
  /**
   * Whether the requested cart action succeeded.
   */
  ok: boolean;

  /**
   * Machine-readable action result.
   */
  status: AddToCartStatus;

  /**
   * Human-readable result message.
   */
  message: string;

  /**
   * Resolved item when a valid campaign was found.
   */
  item?: CartItem;
};

export type RemoveFromCartResult = {
  ok: boolean;

  status:
    | "removed"
    | "not-found"
    | "error";

  message: string;

  sku: string;
};

/* --------------------------------------------------------------------- */
/* Cart Context                                                           */
/* --------------------------------------------------------------------- */

/**
 * Public API exposed by CartProvider.
 */
export type CartContextValue = {
  /**
   * Current campaign services selected by the customer.
   */
  items: CartItem[];

  /**
   * Total number of selected services.
   */
  itemCount: number;

  /**
   * Number of unique campaign SKUs.
   */
  uniqueItemCount: number;

  /**
   * Subtotal in cents.
   */
  subtotalCents: number;

  /**
   * Cart currency.
   */
  currency: CartCurrency;

  /**
   * True after local-storage cart data has loaded.
   */
  isHydrated: boolean;

  /**
   * True when no services are currently selected.
   */
  isEmpty: boolean;

  /**
   * Resolves a trusted SKU and adds the corresponding campaign.
   */
  addItem: (
    input: AddToCartInput,
  ) => AddToCartResult;

  /**
   * Removes a campaign using its trusted SKU.
   */
  removeItem: (
    sku: string,
  ) => RemoveFromCartResult;

  /**
   * Removes every selected campaign.
   */
  clearCart: () => void;

  /**
   * Returns true when a campaign SKU is already selected.
   */
  isInCart: (sku: string) => boolean;

  /**
   * Returns a selected campaign by SKU.
   */
  getItem: (
    sku: string,
  ) => CartItem | undefined;
};

/* --------------------------------------------------------------------- */
/* Cart Storage Validation                                               */
/* --------------------------------------------------------------------- */

/**
 * Minimal shape used while validating unknown local-storage data.
 */
export type UnknownCartStoragePayload = {
  version?: unknown;
  items?: unknown;
  updatedAt?: unknown;
};

/* --------------------------------------------------------------------- */
/* Checkout Cart Payload                                                  */
/* --------------------------------------------------------------------- */

/**
 * Safe cart payload sent to the checkout API.
 *
 * Only trusted SKUs are submitted. Prices and product details must be
 * resolved again on the server.
 */
export type CheckoutCartPayload = {
  items: Array<{
    sku: string;
  }>;
};

/**
 * Converts the current cart into a safe checkout request.
 */
export type CreateCheckoutCartPayload = (
  items: readonly CartItem[],
) => CheckoutCartPayload;