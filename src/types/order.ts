// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Order and Campaign Intake Types                       ┃
   ┃ File   : src/types/order.ts                                           ┃
   ┃ Role   : Checkout, intake, payment, order, and fulfillment contracts  ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  CartCurrency,
  CheckoutCartPayload,
} from "@/types/cart";

/* --------------------------------------------------------------------- */
/* Order Configuration                                                    */
/* --------------------------------------------------------------------- */

/**
 * Current order-data structure.
 *
 * Increase this version only when stored order or intake structures change
 * in a way that requires migration.
 */
export const ORDER_SCHEMA_VERSION = 1 as const;

export type OrderSchemaVersion =
  typeof ORDER_SCHEMA_VERSION;

/**
 * Money Records currently processes storefront orders in USD.
 */
export type OrderCurrency = CartCurrency;

/**
 * Default currency used throughout checkout.
 */
export const DEFAULT_ORDER_CURRENCY: OrderCurrency =
  "USD";

/* --------------------------------------------------------------------- */
/* Order Status                                                           */
/* --------------------------------------------------------------------- */

/**
 * Overall lifecycle of a Money Records order.
 */
export const ORDER_STATUSES = [
  "draft",
  "pending-payment",
  "paid",
  "under-review",
  "intake-required",
  "approved",
  "in-progress",
  "completed",
  "cancelled",
  "refunded",
  "partially-refunded",
  "failed",
] as const;

export type OrderStatus =
  (typeof ORDER_STATUSES)[number];

/**
 * Human-readable order status labels.
 */
export const ORDER_STATUS_LABELS: Record<
  OrderStatus,
  string
> = {
  draft: "Draft",
  "pending-payment": "Pending Payment",
  paid: "Paid",
  "under-review": "Under Review",
  "intake-required": "Intake Required",
  approved: "Approved",
  "in-progress": "Campaign in Progress",
  completed: "Completed",
  cancelled: "Cancelled",
  refunded: "Refunded",
  "partially-refunded": "Partially Refunded",
  failed: "Failed",
};

/* --------------------------------------------------------------------- */
/* Payment Status                                                         */
/* --------------------------------------------------------------------- */

/**
 * Payment lifecycle independent of campaign fulfillment.
 */
export const PAYMENT_STATUSES = [
  "unpaid",
  "pending",
  "processing",
  "paid",
  "failed",
  "cancelled",
  "refunded",
  "partially-refunded",
] as const;

export type PaymentStatus =
  (typeof PAYMENT_STATUSES)[number];

export const PAYMENT_STATUS_LABELS: Record<
  PaymentStatus,
  string
> = {
  unpaid: "Unpaid",
  pending: "Payment Pending",
  processing: "Payment Processing",
  paid: "Paid",
  failed: "Payment Failed",
  cancelled: "Payment Cancelled",
  refunded: "Refunded",
  "partially-refunded": "Partially Refunded",
};

/* --------------------------------------------------------------------- */
/* Intake Status                                                          */
/* --------------------------------------------------------------------- */

/**
 * Tracks whether the artist supplied enough campaign information.
 */
export const INTAKE_STATUSES = [
  "not-started",
  "incomplete",
  "submitted",
  "under-review",
  "changes-requested",
  "approved",
] as const;

export type IntakeStatus =
  (typeof INTAKE_STATUSES)[number];

export const INTAKE_STATUS_LABELS: Record<
  IntakeStatus,
  string
> = {
  "not-started": "Not Started",
  incomplete: "Incomplete",
  submitted: "Submitted",
  "under-review": "Under Review",
  "changes-requested": "Changes Requested",
  approved: "Approved",
};

/* --------------------------------------------------------------------- */
/* Fulfillment Status                                                     */
/* --------------------------------------------------------------------- */

/**
 * Tracks campaign delivery after payment and intake approval.
 */
export const FULFILLMENT_STATUSES = [
  "not-started",
  "awaiting-intake",
  "awaiting-review",
  "scheduled",
  "in-progress",
  "paused",
  "completed",
  "cancelled",
] as const;

export type FulfillmentStatus =
  (typeof FULFILLMENT_STATUSES)[number];

export const FULFILLMENT_STATUS_LABELS: Record<
  FulfillmentStatus,
  string
> = {
  "not-started": "Not Started",
  "awaiting-intake": "Awaiting Intake",
  "awaiting-review": "Awaiting Review",
  scheduled: "Scheduled",
  "in-progress": "In Progress",
  paused: "Paused",
  completed: "Completed",
  cancelled: "Cancelled",
};

/* --------------------------------------------------------------------- */
/* Customer Contact                                                       */
/* --------------------------------------------------------------------- */

/**
 * Customer purchasing the campaign services.
 */
export type OrderCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  /**
   * Optional business, label, management company, or agency name.
   */
  companyName?: string;

  /**
   * Customer's country or primary market.
   */
  country: string;

  /**
   * Optional state, province, or region.
   */
  region?: string;
};

/**
 * Editable customer fields used by the checkout form.
 */
export type OrderCustomerFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  country: string;
  region: string;
};

/**
 * Default empty customer form.
 */
export const EMPTY_ORDER_CUSTOMER_FORM: OrderCustomerFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  country: "",
  region: "",
};

/* --------------------------------------------------------------------- */
/* Artist Profile                                                         */
/* --------------------------------------------------------------------- */

/**
 * Artist or music brand connected to the purchased campaigns.
 */
export type ArtistProfile = {
  artistName: string;

  /**
   * Artist type allows Money Records to understand who is submitting.
   */
  artistType:
    | "solo-artist"
    | "group"
    | "producer"
    | "dj"
    | "label"
    | "manager"
    | "other";

  /**
   * Primary genre.
   */
  primaryGenre: string;

  /**
   * Optional secondary genre or style.
   */
  secondaryGenre?: string;

  /**
   * Artist's primary country or market.
   */
  artistCountry: string;

  /**
   * Optional short artist biography.
   */
  biography?: string;

  /**
   * Primary public social-media profile.
   */
  primarySocialUrl?: string;

  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  websiteUrl?: string;
};

/**
 * Editable artist-profile fields.
 */
export type ArtistProfileFormValues = {
  artistName: string;
  artistType:
    | ""
    | ArtistProfile["artistType"];
  primaryGenre: string;
  secondaryGenre: string;
  artistCountry: string;
  biography: string;
  primarySocialUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  youtubeUrl: string;
  websiteUrl: string;
};

export const EMPTY_ARTIST_PROFILE_FORM: ArtistProfileFormValues = {
  artistName: "",
  artistType: "",
  primaryGenre: "",
  secondaryGenre: "",
  artistCountry: "",
  biography: "",
  primarySocialUrl: "",
  instagramUrl: "",
  tiktokUrl: "",
  youtubeUrl: "",
  websiteUrl: "",
};

/* --------------------------------------------------------------------- */
/* Release Information                                                    */
/* --------------------------------------------------------------------- */

/**
 * Release type being promoted.
 */
export const RELEASE_TYPES = [
  "single",
  "ep",
  "album",
  "mixtape",
  "music-video",
  "catalog-release",
  "other",
] as const;

export type ReleaseType =
  (typeof RELEASE_TYPES)[number];

/**
 * Current public availability of the release.
 */
export const RELEASE_STATUSES = [
  "already-released",
  "upcoming",
  "private-link",
  "not-yet-delivered",
] as const;

export type ReleaseStatus =
  (typeof RELEASE_STATUSES)[number];

/**
 * Music release connected to the order.
 */
export type ReleaseDetails = {
  releaseTitle: string;
  releaseType: ReleaseType;
  releaseStatus: ReleaseStatus;

  /**
   * ISO date using YYYY-MM-DD where available.
   */
  releaseDate?: string;

  /**
   * Main public or private release link.
   */
  releaseUrl: string;

  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
  soundCloudUrl?: string;

  /**
   * Public artwork URL or uploaded asset URL.
   */
  artworkUrl?: string;

  /**
   * Optional clean version or alternate release link.
   */
  alternateVersionUrl?: string;

  /**
   * ISRC where available.
   */
  isrc?: string;

  /**
   * UPC or EAN where available.
   */
  upc?: string;

  /**
   * Current distributor or label.
   */
  distributorName?: string;

  /**
   * Confirms the release does not contain rights conflicts.
   */
  rightsConfirmed: boolean;
};

/**
 * Editable release fields used before checkout.
 */
export type ReleaseDetailsFormValues = {
  releaseTitle: string;
  releaseType:
    | ""
    | ReleaseType;
  releaseStatus:
    | ""
    | ReleaseStatus;
  releaseDate: string;
  releaseUrl: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  soundCloudUrl: string;
  artworkUrl: string;
  alternateVersionUrl: string;
  isrc: string;
  upc: string;
  distributorName: string;
  rightsConfirmed: boolean;
};

export const EMPTY_RELEASE_DETAILS_FORM: ReleaseDetailsFormValues = {
  releaseTitle: "",
  releaseType: "",
  releaseStatus: "",
  releaseDate: "",
  releaseUrl: "",
  spotifyUrl: "",
  appleMusicUrl: "",
  youtubeUrl: "",
  soundCloudUrl: "",
  artworkUrl: "",
  alternateVersionUrl: "",
  isrc: "",
  upc: "",
  distributorName: "",
  rightsConfirmed: false,
};

/* --------------------------------------------------------------------- */
/* Campaign Goals                                                         */
/* --------------------------------------------------------------------- */

/**
 * Primary campaign objective selected by the artist.
 */
export const CAMPAIGN_GOALS = [
  "release-awareness",
  "audience-growth",
  "listener-discovery",
  "content-visibility",
  "brand-development",
  "catalog-promotion",
  "market-expansion",
  "other",
] as const;

export type CampaignGoal =
  (typeof CAMPAIGN_GOALS)[number];

export const CAMPAIGN_GOAL_LABELS: Record<
  CampaignGoal,
  string
> = {
  "release-awareness": "Release Awareness",
  "audience-growth": "Audience Growth",
  "listener-discovery": "Listener Discovery",
  "content-visibility": "Content Visibility",
  "brand-development": "Brand Development",
  "catalog-promotion": "Catalog Promotion",
  "market-expansion": "Market Expansion",
  other: "Other",
};

/**
 * Campaign direction supplied by the purchaser.
 */
export type CampaignPreferences = {
  primaryGoal: CampaignGoal;

  /**
   * Additional explanation of the campaign objective.
   */
  goalDescription?: string;

  /**
   * Countries, cities, regions, or markets the artist wants to prioritize.
   */
  targetMarkets: string[];

  /**
   * Audience description such as age range, interests, or fan profile.
   */
  targetAudience?: string;

  /**
   * Similar artists used as audience or positioning references.
   */
  similarArtists: string[];

  /**
   * Artist's preferred campaign start date in YYYY-MM-DD format.
   */
  preferredStartDate?: string;

  /**
   * Important release or campaign deadline.
   */
  deadlineDate?: string;

  /**
   * Additional instructions for Money Records.
   */
  campaignNotes?: string;
};

export type CampaignPreferencesFormValues = {
  primaryGoal:
    | ""
    | CampaignGoal;
  goalDescription: string;
  targetMarkets: string;
  targetAudience: string;
  similarArtists: string;
  preferredStartDate: string;
  deadlineDate: string;
  campaignNotes: string;
};

export const EMPTY_CAMPAIGN_PREFERENCES_FORM: CampaignPreferencesFormValues =
  {
    primaryGoal: "",
    goalDescription: "",
    targetMarkets: "",
    targetAudience: "",
    similarArtists: "",
    preferredStartDate: "",
    deadlineDate: "",
    campaignNotes: "",
  };

/* --------------------------------------------------------------------- */
/* Campaign Content and Assets                                            */
/* --------------------------------------------------------------------- */

/**
 * Supporting promotional assets supplied by the artist.
 */
export type CampaignAssets = {
  pressPhotoUrl?: string;
  electronicPressKitUrl?: string;
  musicVideoUrl?: string;
  lyricVideoUrl?: string;
  visualizerUrl?: string;
  shortFormContentUrl?: string;
  cloudFolderUrl?: string;
  additionalAssetUrl?: string;
};

export type CampaignAssetsFormValues = {
  pressPhotoUrl: string;
  electronicPressKitUrl: string;
  musicVideoUrl: string;
  lyricVideoUrl: string;
  visualizerUrl: string;
  shortFormContentUrl: string;
  cloudFolderUrl: string;
  additionalAssetUrl: string;
};

export const EMPTY_CAMPAIGN_ASSETS_FORM: CampaignAssetsFormValues = {
  pressPhotoUrl: "",
  electronicPressKitUrl: "",
  musicVideoUrl: "",
  lyricVideoUrl: "",
  visualizerUrl: "",
  shortFormContentUrl: "",
  cloudFolderUrl: "",
  additionalAssetUrl: "",
};

/* --------------------------------------------------------------------- */
/* Campaign-Specific Instructions                                        */
/* --------------------------------------------------------------------- */

/**
 * Optional instructions attached to one selected campaign SKU.
 *
 * This allows a multi-service order to use different links or notes for
 * different platforms when necessary.
 */
export type CampaignItemIntake = {
  sku: string;

  /**
   * Platform-specific link used for this campaign.
   */
  campaignUrl?: string;

  /**
   * Notes that apply only to this selected campaign.
   */
  instructions?: string;
};

/**
 * Editable campaign-item intake.
 */
export type CampaignItemIntakeFormValue = {
  sku: string;
  campaignUrl: string;
  instructions: string;
};

/* --------------------------------------------------------------------- */
/* Agreements                                                             */
/* --------------------------------------------------------------------- */

/**
 * Required checkout and campaign acknowledgements.
 */
export type OrderAgreements = {
  /**
   * Customer confirms supplied materials and links are accurate.
   */
  informationAccurate: boolean;

  /**
   * Customer confirms ownership or authorization to promote the release.
   */
  rightsAuthorized: boolean;

  /**
   * Customer accepts campaign targets as estimates rather than guarantees.
   */
  campaignTargetsAcknowledged: boolean;

  /**
   * Customer accepts the service terms.
   */
  termsAccepted: boolean;

  /**
   * Customer accepts the privacy policy.
   */
  privacyAccepted: boolean;

  /**
   * Optional agreement to receive promotional communications.
   */
  marketingConsent: boolean;
};

export const EMPTY_ORDER_AGREEMENTS: OrderAgreements = {
  informationAccurate: false,
  rightsAuthorized: false,
  campaignTargetsAcknowledged: false,
  termsAccepted: false,
  privacyAccepted: false,
  marketingConsent: false,
};

/* --------------------------------------------------------------------- */
/* Complete Campaign Intake                                               */
/* --------------------------------------------------------------------- */

/**
 * Complete intake package collected before Stripe checkout.
 */
export type CampaignIntake = {
  customer: OrderCustomer;
  artist: ArtistProfile;
  release: ReleaseDetails;
  preferences: CampaignPreferences;
  assets: CampaignAssets;
  campaignItems: CampaignItemIntake[];
  agreements: OrderAgreements;
};

/**
 * Editable campaign-intake state used by CampaignIntakeForm.
 */
export type CampaignIntakeFormValues = {
  customer: OrderCustomerFormValues;
  artist: ArtistProfileFormValues;
  release: ReleaseDetailsFormValues;
  preferences: CampaignPreferencesFormValues;
  assets: CampaignAssetsFormValues;
  campaignItems: CampaignItemIntakeFormValue[];
  agreements: OrderAgreements;
};

/**
 * Creates an empty campaign-intake form.
 *
 * A function is used instead of one shared object so arrays cannot be
 * accidentally reused and mutated between form instances.
 */
export function createEmptyCampaignIntakeForm(): CampaignIntakeFormValues {
  return {
    customer: {
      ...EMPTY_ORDER_CUSTOMER_FORM,
    },

    artist: {
      ...EMPTY_ARTIST_PROFILE_FORM,
    },

    release: {
      ...EMPTY_RELEASE_DETAILS_FORM,
    },

    preferences: {
      ...EMPTY_CAMPAIGN_PREFERENCES_FORM,
    },

    assets: {
      ...EMPTY_CAMPAIGN_ASSETS_FORM,
    },

    campaignItems: [],

    agreements: {
      ...EMPTY_ORDER_AGREEMENTS,
    },
  };
}

/* --------------------------------------------------------------------- */
/* Intake Form Sections                                                   */
/* --------------------------------------------------------------------- */

export const CAMPAIGN_INTAKE_SECTIONS = [
  "contact",
  "artist",
  "release",
  "campaign",
  "assets",
  "review",
] as const;

export type CampaignIntakeSection =
  (typeof CAMPAIGN_INTAKE_SECTIONS)[number];

export const CAMPAIGN_INTAKE_SECTION_LABELS: Record<
  CampaignIntakeSection,
  string
> = {
  contact: "Contact",
  artist: "Artist",
  release: "Release",
  campaign: "Campaign",
  assets: "Assets",
  review: "Review",
};

/* --------------------------------------------------------------------- */
/* Form Fields and Validation Errors                                      */
/* --------------------------------------------------------------------- */

/**
 * Supported validation-field paths.
 */
export type CampaignIntakeField =
  | `customer.${keyof OrderCustomerFormValues}`
  | `artist.${keyof ArtistProfileFormValues}`
  | `release.${keyof ReleaseDetailsFormValues}`
  | `preferences.${keyof CampaignPreferencesFormValues}`
  | `assets.${keyof CampaignAssetsFormValues}`
  | `agreements.${keyof OrderAgreements}`
  | `campaignItems.${number}.campaignUrl`
  | `campaignItems.${number}.instructions`
  | "campaignItems";

/**
 * Field-level validation messages.
 */
export type CampaignIntakeErrors = Partial<
  Record<CampaignIntakeField, string>
>;

/**
 * Result returned by campaign-intake validation.
 */
export type CampaignIntakeValidationResult = {
  valid: boolean;
  errors: CampaignIntakeErrors;

  /**
   * First section containing a validation error.
   */
  firstInvalidSection?: CampaignIntakeSection;
};

/* --------------------------------------------------------------------- */
/* Safe Checkout Request                                                  */
/* --------------------------------------------------------------------- */

/**
 * Request sent from the checkout page to the server.
 *
 * Cart products are represented only by trusted SKUs. Product names,
 * prices, availability, and Stripe Price IDs must be resolved again by the
 * server.
 */
export type CreateCheckoutOrderRequest = {
  schemaVersion: OrderSchemaVersion;
  cart: CheckoutCartPayload;
  intake: CampaignIntake;

  /**
   * Relative or absolute URL used after successful payment.
   *
   * The API should validate redirects and should not trust arbitrary hosts.
   */
  successPath?: string;

  /**
   * Relative or absolute URL used when Stripe Checkout is cancelled.
   */
  cancelPath?: string;
};

/* --------------------------------------------------------------------- */
/* Trusted Server-Resolved Order Item                                     */
/* --------------------------------------------------------------------- */

/**
 * Product snapshot created by the checkout API from the trusted campaign
 * catalog.
 */
export type OrderLineItem = {
  id: string;
  sku: string;

  campaignId: string;
  campaignSlug: string;
  campaignHref: string;
  campaignName: string;
  campaignShortName: string;
  campaignTargetLabel: string;

  platformSlug: string;
  platformName: string;
  platformShortName: string;

  unitAmountCents: number;
  quantity: 1;
  totalAmountCents: number;
  currency: OrderCurrency;

  /**
   * Stripe Price ID selected by the server.
   */
  stripePriceId?: string;

  /**
   * Snapshot of the campaign-specific information submitted by the artist.
   */
  intake?: CampaignItemIntake;
};

/* --------------------------------------------------------------------- */
/* Order Totals                                                           */
/* --------------------------------------------------------------------- */

export type OrderTotals = {
  itemCount: number;
  subtotalCents: number;
  discountCents: number;
  taxCents: number;
  processingFeeCents: number;
  totalCents: number;
  currency: OrderCurrency;
};

export const EMPTY_ORDER_TOTALS: OrderTotals = {
  itemCount: 0,
  subtotalCents: 0,
  discountCents: 0,
  taxCents: 0,
  processingFeeCents: 0,
  totalCents: 0,
  currency: DEFAULT_ORDER_CURRENCY,
};

/* --------------------------------------------------------------------- */
/* Order Record                                                           */
/* --------------------------------------------------------------------- */

/**
 * Complete Money Records order stored after server-side validation.
 */
export type OrderRecord = {
  id: string;

  /**
   * Customer-facing order number.
   *
   * Example:
   * MR-2026-000184
   */
  orderNumber: string;

  schemaVersion: OrderSchemaVersion;

  status: OrderStatus;
  paymentStatus: PaymentStatus;
  intakeStatus: IntakeStatus;
  fulfillmentStatus: FulfillmentStatus;

  customer: OrderCustomer;
  artist: ArtistProfile;
  release: ReleaseDetails;
  preferences: CampaignPreferences;
  assets: CampaignAssets;
  agreements: OrderAgreements;

  items: OrderLineItem[];
  totals: OrderTotals;

  /**
   * Stripe identifiers assigned during checkout.
   */
  stripeCheckoutSessionId?: string;
  stripePaymentIntentId?: string;
  stripeCustomerId?: string;

  /**
   * Stripe receipt or hosted invoice URL where available.
   */
  receiptUrl?: string;

  /**
   * Internal operational notes.
   *
   * This should not be displayed publicly.
   */
  internalNotes?: string;

  /**
   * Customer-visible status or fulfillment message.
   */
  customerMessage?: string;

  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  approvedAt?: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  refundedAt?: string;
};

/* --------------------------------------------------------------------- */
/* Checkout API Responses                                                 */
/* --------------------------------------------------------------------- */

export type CreateCheckoutSessionSuccess = {
  ok: true;
  orderId: string;
  orderNumber: string;
  checkoutSessionId: string;
  checkoutUrl: string;
};

export type CreateCheckoutSessionErrorCode =
  | "invalid-request"
  | "empty-cart"
  | "invalid-campaign"
  | "campaign-unavailable"
  | "price-unavailable"
  | "invalid-intake"
  | "stripe-error"
  | "server-error";

export type CreateCheckoutSessionError = {
  ok: false;
  code: CreateCheckoutSessionErrorCode;
  message: string;
  fieldErrors?: CampaignIntakeErrors;
};

export type CreateCheckoutSessionResponse =
  | CreateCheckoutSessionSuccess
  | CreateCheckoutSessionError;

/* --------------------------------------------------------------------- */
/* Checkout Success Data                                                  */
/* --------------------------------------------------------------------- */

/**
 * Safe customer-facing data used by the checkout success page.
 */
export type CheckoutSuccessOrder = {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  intakeStatus: IntakeStatus;
  fulfillmentStatus: FulfillmentStatus;

  customerEmail: string;
  artistName: string;
  releaseTitle: string;

  items: Array<{
    sku: string;
    campaignName: string;
    platformShortName: string;
    campaignTargetLabel: string;
    totalAmountCents: number;
    currency: OrderCurrency;
  }>;

  totals: OrderTotals;
  receiptUrl?: string;
  createdAt: string;
  paidAt?: string;
};

/* --------------------------------------------------------------------- */
/* Stripe Webhook Order Events                                            */
/* --------------------------------------------------------------------- */

export const ORDER_EVENT_TYPES = [
  "checkout-created",
  "checkout-completed",
  "payment-processing",
  "payment-succeeded",
  "payment-failed",
  "checkout-expired",
  "order-refunded",
  "order-partially-refunded",
] as const;

export type OrderEventType =
  (typeof ORDER_EVENT_TYPES)[number];

export type OrderEvent = {
  id: string;
  orderId: string;
  orderNumber: string;
  type: OrderEventType;

  /**
   * Stripe event ID used for idempotency.
   */
  providerEventId?: string;

  /**
   * Safe event description.
   */
  message: string;

  createdAt: string;
};

/* --------------------------------------------------------------------- */
/* Order Lookup                                                           */
/* --------------------------------------------------------------------- */

export type OrderLookupInput = {
  orderNumber: string;
  email: string;
};

export type OrderLookupResult =
  | {
      ok: true;
      order: CheckoutSuccessOrder;
    }
  | {
      ok: false;
      code:
        | "not-found"
        | "invalid-request"
        | "server-error";
      message: string;
    };