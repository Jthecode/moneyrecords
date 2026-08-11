import "server-only";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Order Validation                                     ┃
   ┃ File   : src/lib/order-validation.ts                                 ┃
   ┃ Role   : Validate and normalize checkout carts and campaign intake   ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  CAMPAIGN_GOALS,
  ORDER_SCHEMA_VERSION,
  RELEASE_STATUSES,
  RELEASE_TYPES,
  type ArtistProfile,
  type CampaignAssets,
  type CampaignGoal,
  type CampaignIntake,
  type CampaignIntakeErrors,
  type CampaignIntakeField,
  type CampaignItemIntake,
  type CampaignPreferences,
  type CreateCheckoutOrderRequest,
  type CreateCheckoutSessionErrorCode,
  type OrderAgreements,
  type OrderCustomer,
  type ReleaseDetails,
  type ReleaseStatus,
  type ReleaseType,
} from "@/types/order";

/* --------------------------------------------------------------------- */
/* Validation Limits                                                      */
/* --------------------------------------------------------------------- */

export const ORDER_VALIDATION_LIMITS = {
  maximumCartItems: 50,

  maximumRedirectLength: 500,

  maximumFirstNameLength: 100,
  maximumLastNameLength: 100,
  maximumEmailLength: 254,
  maximumPhoneLength: 40,
  maximumCompanyNameLength: 160,
  maximumCountryLength: 120,
  maximumRegionLength: 120,

  maximumArtistNameLength: 160,
  maximumGenreLength: 120,
  maximumBiographyLength: 5_000,

  maximumReleaseTitleLength: 200,
  maximumIdentifierLength: 160,
  maximumDistributorNameLength: 200,

  maximumGoalDescriptionLength: 4_000,
  maximumTargetAudienceLength: 4_000,
  maximumCampaignNotesLength: 8_000,

  maximumListItems: 100,
  maximumListItemLength: 160,

  maximumCampaignInstructionsLength: 4_000,

  maximumUrlLength: 2_048,
} as const;

/* --------------------------------------------------------------------- */
/* Supported Values                                                       */
/* --------------------------------------------------------------------- */

export const ARTIST_TYPES = [
  "solo-artist",
  "group",
  "producer",
  "dj",
  "label",
  "manager",
  "other",
] as const;

export type ValidatedArtistType =
  (typeof ARTIST_TYPES)[number];

/* --------------------------------------------------------------------- */
/* Result Types                                                           */
/* --------------------------------------------------------------------- */

export type ValidatedCheckoutOrderRequest = {
  /**
   * Validated request using normalized campaign intake.
   */
  request: CreateCheckoutOrderRequest;

  /**
   * Trusted-looking normalized SKUs submitted by the browser.
   *
   * Campaign existence, availability, and pricing must still be checked
   * against the server catalog.
   */
  skus: string[];

  intake: CampaignIntake;

  customerEmail: string;
  customerName: string;
  artistName: string;
  releaseTitle: string;

  successPath?: string;
  cancelPath?: string;
};

export type CheckoutOrderValidationSuccess = {
  ok: true;
  data: ValidatedCheckoutOrderRequest;
};

export type CheckoutOrderValidationFailure = {
  ok: false;

  code: CreateCheckoutSessionErrorCode;
  status: number;
  message: string;

  fieldErrors?: CampaignIntakeErrors;
};

export type CheckoutOrderValidationResult =
  | CheckoutOrderValidationSuccess
  | CheckoutOrderValidationFailure;

/* --------------------------------------------------------------------- */
/* Internal Cart Validation Types                                         */
/* --------------------------------------------------------------------- */

type CartValidationSuccess = {
  ok: true;
  skus: string[];
};

type CartValidationResult =
  | CartValidationSuccess
  | CheckoutOrderValidationFailure;

export type CampaignIntakeValidationSuccess = {
  ok: true;
  intake: CampaignIntake;
};

export type CampaignIntakeValidationFailure = {
  ok: false;
  message: string;
  errors: CampaignIntakeErrors;
};

export type CampaignIntakeValidationResult =
  | CampaignIntakeValidationSuccess
  | CampaignIntakeValidationFailure;

/* --------------------------------------------------------------------- */
/* Validation Error                                                       */
/* --------------------------------------------------------------------- */

export class CheckoutOrderValidationError extends Error {
  readonly code: CreateCheckoutSessionErrorCode;
  readonly status: number;
  readonly fieldErrors?: CampaignIntakeErrors;

  constructor(
    result: CheckoutOrderValidationFailure,
  ) {
    super(result.message);

    this.name =
      "CheckoutOrderValidationError";

    this.code =
      result.code;

    this.status =
      result.status;

    this.fieldErrors =
      result.fieldErrors;
  }
}

/* --------------------------------------------------------------------- */
/* General Type Guards                                                    */
/* --------------------------------------------------------------------- */

export function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isBoolean(
  value: unknown,
): value is boolean {
  return typeof value === "boolean";
}

function isString(
  value: unknown,
): value is string {
  return typeof value === "string";
}

function isOneOf<
  T extends readonly string[],
>(
  value: unknown,
  values: T,
): value is T[number] {
  return (
    typeof value === "string" &&
    values.includes(
      value as T[number],
    )
  );
}

/* --------------------------------------------------------------------- */
/* String Utilities                                                       */
/* --------------------------------------------------------------------- */

function getTrimmedString(
  value: unknown,
): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function getOptionalString(
  value: unknown,
): string | undefined {
  const normalized =
    getTrimmedString(value);

  return normalized ||
    undefined;
}

function hasControlCharacters(
  value: string,
): boolean {
  return /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(
    value,
  );
}

function isRequiredStringWithinLength(
  value: unknown,
  maximumLength: number,
): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const normalized =
    value.trim();

  return (
    normalized.length > 0 &&
    normalized.length <= maximumLength &&
    !hasControlCharacters(normalized)
  );
}

function isOptionalStringWithinLength(
  value: unknown,
  maximumLength: number,
): boolean {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return true;
  }

  if (typeof value !== "string") {
    return false;
  }

  const normalized =
    value.trim();

  return (
    normalized.length <= maximumLength &&
    !hasControlCharacters(normalized)
  );
}

/* --------------------------------------------------------------------- */
/* Email and Phone Validation                                             */
/* --------------------------------------------------------------------- */

export function isValidOrderEmail(
  value: string,
): boolean {
  const normalized =
    value.trim();

  return (
    normalized.length > 0 &&
    normalized.length <=
      ORDER_VALIDATION_LIMITS.maximumEmailLength &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      normalized,
    )
  );
}

export function isValidOrderPhone(
  value: string,
): boolean {
  const normalized =
    value.trim();

  if (
    !normalized ||
    normalized.length >
      ORDER_VALIDATION_LIMITS.maximumPhoneLength
  ) {
    return false;
  }

  const digits =
    normalized.replace(/\D/g, "");

  return (
    digits.length >= 7 &&
    digits.length <= 20
  );
}

/* --------------------------------------------------------------------- */
/* URL Validation                                                         */
/* --------------------------------------------------------------------- */

export function isValidOrderUrl(
  value: string,
): boolean {
  const normalized =
    value.trim();

  if (
    !normalized ||
    normalized.length >
      ORDER_VALIDATION_LIMITS.maximumUrlLength
  ) {
    return false;
  }

  try {
    const url =
      new URL(normalized);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
}

function isValidOptionalOrderUrl(
  value: unknown,
): boolean {
  const normalized =
    getTrimmedString(value);

  return (
    !normalized ||
    isValidOrderUrl(normalized)
  );
}

/* --------------------------------------------------------------------- */
/* Date Validation                                                        */
/* --------------------------------------------------------------------- */

export function isValidOrderDate(
  value: string,
): boolean {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
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

  const date =
    new Date(timestamp);

  return (
    date.toISOString().slice(0, 10) ===
    value
  );
}

function isValidOptionalOrderDate(
  value: unknown,
): boolean {
  const normalized =
    getTrimmedString(value);

  return (
    !normalized ||
    isValidOrderDate(normalized)
  );
}

/* --------------------------------------------------------------------- */
/* SKU Utilities                                                          */
/* --------------------------------------------------------------------- */

export function normalizeOrderSku(
  value: string,
): string {
  return value
    .trim()
    .toUpperCase();
}

export function isValidOrderSku(
  value: string,
): boolean {
  const normalized =
    normalizeOrderSku(value);

  return (
    normalized.length >= 3 &&
    normalized.length <= 120 &&
    /^[A-Z0-9][A-Z0-9_-]*$/.test(
      normalized,
    )
  );
}

/* --------------------------------------------------------------------- */
/* Array Utilities                                                        */
/* --------------------------------------------------------------------- */

function normalizeStringArray(
  value: unknown,
  maximumItems =
    ORDER_VALIDATION_LIMITS.maximumListItems,
  maximumItemLength =
    ORDER_VALIDATION_LIMITS.maximumListItemLength,
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .filter(isString)
        .map((item) =>
          item.trim(),
        )
        .filter(
          (item) =>
            item.length > 0 &&
            item.length <= maximumItemLength &&
            !hasControlCharacters(item),
        ),
    ),
  ).slice(
    0,
    maximumItems,
  );
}

function isValidStringArray(
  value: unknown,
  options: {
    required?: boolean;
    maximumItems?: number;
    maximumItemLength?: number;
  } = {},
): boolean {
  const {
    required = false,

    maximumItems =
      ORDER_VALIDATION_LIMITS.maximumListItems,

    maximumItemLength =
      ORDER_VALIDATION_LIMITS.maximumListItemLength,
  } = options;

  if (!Array.isArray(value)) {
    return false;
  }

  if (
    required &&
    value.length === 0
  ) {
    return false;
  }

  if (
    value.length >
    maximumItems
  ) {
    return false;
  }

  return value.every(
    (item) =>
      typeof item === "string" &&
      item.trim().length > 0 &&
      item.trim().length <= maximumItemLength &&
      !hasControlCharacters(
        item.trim(),
      ),
  );
}

/* --------------------------------------------------------------------- */
/* Validation Failure Helpers                                             */
/* --------------------------------------------------------------------- */

function checkoutFailure(
  code: CreateCheckoutSessionErrorCode,
  status: number,
  message: string,
  fieldErrors?: CampaignIntakeErrors,
): CheckoutOrderValidationFailure {
  return {
    ok: false,
    code,
    status,
    message,

    ...(fieldErrors &&
    Object.keys(fieldErrors).length > 0
      ? {
          fieldErrors,
        }
      : {}),
  };
}

function intakeFailure(
  message: string,
  errors: CampaignIntakeErrors,
): CampaignIntakeValidationFailure {
  return {
    ok: false,
    message,
    errors,
  };
}

/* --------------------------------------------------------------------- */
/* Field Error Helper                                                     */
/* --------------------------------------------------------------------- */

function createFieldErrorWriter(
  errors: CampaignIntakeErrors,
) {
  return function addError(
    field: CampaignIntakeField,
    message: string,
  ): void {
    if (!errors[field]) {
      errors[field] =
        message;
    }
  };
}

/* --------------------------------------------------------------------- */
/* Customer Validation                                                    */
/* --------------------------------------------------------------------- */

function validateCustomer(
  value: unknown,
  errors: CampaignIntakeErrors,
): OrderCustomer | null {
  const addError =
    createFieldErrorWriter(errors);

  if (!isRecord(value)) {
    addError(
      "customer.firstName",
      "Customer information is required.",
    );

    return null;
  }

  const firstName =
    getTrimmedString(
      value.firstName,
    );

  const lastName =
    getTrimmedString(
      value.lastName,
    );

  const email =
    getTrimmedString(
      value.email,
    ).toLowerCase();

  const phone =
    getTrimmedString(
      value.phone,
    );

  const companyName =
    getOptionalString(
      value.companyName,
    );

  const country =
    getTrimmedString(
      value.country,
    );

  const region =
    getOptionalString(
      value.region,
    );

  if (
    !isRequiredStringWithinLength(
      value.firstName,
      ORDER_VALIDATION_LIMITS.maximumFirstNameLength,
    )
  ) {
    addError(
      "customer.firstName",
      "Enter a valid first name.",
    );
  }

  if (
    !isRequiredStringWithinLength(
      value.lastName,
      ORDER_VALIDATION_LIMITS.maximumLastNameLength,
    )
  ) {
    addError(
      "customer.lastName",
      "Enter a valid last name.",
    );
  }

  if (!isValidOrderEmail(email)) {
    addError(
      "customer.email",
      "Enter a valid email address.",
    );
  }

  if (!isValidOrderPhone(phone)) {
    addError(
      "customer.phone",
      "Enter a valid phone number.",
    );
  }

  if (
    !isOptionalStringWithinLength(
      value.companyName,
      ORDER_VALIDATION_LIMITS.maximumCompanyNameLength,
    )
  ) {
    addError(
      "customer.companyName",
      "The company or management name is too long.",
    );
  }

  if (
    !isRequiredStringWithinLength(
      value.country,
      ORDER_VALIDATION_LIMITS.maximumCountryLength,
    )
  ) {
    addError(
      "customer.country",
      "Enter a valid country.",
    );
  }

  if (
    !isOptionalStringWithinLength(
      value.region,
      ORDER_VALIDATION_LIMITS.maximumRegionLength,
    )
  ) {
    addError(
      "customer.region",
      "The state, province, or region is too long.",
    );
  }

  return {
    firstName,
    lastName,
    email,
    phone,
    country,

    ...(companyName
      ? {
          companyName,
        }
      : {}),

    ...(region
      ? {
          region,
        }
      : {}),
  };
}

/* --------------------------------------------------------------------- */
/* Artist Validation                                                      */
/* --------------------------------------------------------------------- */

function validateArtist(
  value: unknown,
  errors: CampaignIntakeErrors,
): ArtistProfile | null {
  const addError =
    createFieldErrorWriter(errors);

  if (!isRecord(value)) {
    addError(
      "artist.artistName",
      "Artist information is required.",
    );

    return null;
  }

  const artistName =
    getTrimmedString(
      value.artistName,
    );

  const primaryGenre =
    getTrimmedString(
      value.primaryGenre,
    );

  const secondaryGenre =
    getOptionalString(
      value.secondaryGenre,
    );

  const artistCountry =
    getTrimmedString(
      value.artistCountry,
    );

  const biography =
    getOptionalString(
      value.biography,
    );

  const primarySocialUrl =
    getOptionalString(
      value.primarySocialUrl,
    );

  const instagramUrl =
    getOptionalString(
      value.instagramUrl,
    );

  const tiktokUrl =
    getOptionalString(
      value.tiktokUrl,
    );

  const youtubeUrl =
    getOptionalString(
      value.youtubeUrl,
    );

  const websiteUrl =
    getOptionalString(
      value.websiteUrl,
    );

  if (
    !isRequiredStringWithinLength(
      value.artistName,
      ORDER_VALIDATION_LIMITS.maximumArtistNameLength,
    )
  ) {
    addError(
      "artist.artistName",
      "Enter a valid artist or brand name.",
    );
  }

  if (
    !isOneOf(
      value.artistType,
      ARTIST_TYPES,
    )
  ) {
    addError(
      "artist.artistType",
      "Select a valid artist type.",
    );
  }

  if (
    !isRequiredStringWithinLength(
      value.primaryGenre,
      ORDER_VALIDATION_LIMITS.maximumGenreLength,
    )
  ) {
    addError(
      "artist.primaryGenre",
      "Enter the artist's primary genre.",
    );
  }

  if (
    !isOptionalStringWithinLength(
      value.secondaryGenre,
      ORDER_VALIDATION_LIMITS.maximumGenreLength,
    )
  ) {
    addError(
      "artist.secondaryGenre",
      "The secondary genre is too long.",
    );
  }

  if (
    !isRequiredStringWithinLength(
      value.artistCountry,
      ORDER_VALIDATION_LIMITS.maximumCountryLength,
    )
  ) {
    addError(
      "artist.artistCountry",
      "Enter the artist's primary country or market.",
    );
  }

  if (
    !isOptionalStringWithinLength(
      value.biography,
      ORDER_VALIDATION_LIMITS.maximumBiographyLength,
    )
  ) {
    addError(
      "artist.biography",
      "The artist biography is too long.",
    );
  }

  const artistUrls: Array<{
    field: CampaignIntakeField;
    value: unknown;
  }> = [
    {
      field:
        "artist.primarySocialUrl",

      value:
        value.primarySocialUrl,
    },
    {
      field:
        "artist.instagramUrl",

      value:
        value.instagramUrl,
    },
    {
      field:
        "artist.tiktokUrl",

      value:
        value.tiktokUrl,
    },
    {
      field:
        "artist.youtubeUrl",

      value:
        value.youtubeUrl,
    },
    {
      field:
        "artist.websiteUrl",

      value:
        value.websiteUrl,
    },
  ];

  for (const item of artistUrls) {
    if (
      !isValidOptionalOrderUrl(
        item.value,
      )
    ) {
      addError(
        item.field,
        "Enter a complete http or https URL.",
      );
    }
  }

  const artistType =
    isOneOf(
      value.artistType,
      ARTIST_TYPES,
    )
      ? value.artistType
      : "other";

  return {
    artistName,
    artistType,
    primaryGenre,
    artistCountry,

    ...(secondaryGenre
      ? {
          secondaryGenre,
        }
      : {}),

    ...(biography
      ? {
          biography,
        }
      : {}),

    ...(primarySocialUrl
      ? {
          primarySocialUrl,
        }
      : {}),

    ...(instagramUrl
      ? {
          instagramUrl,
        }
      : {}),

    ...(tiktokUrl
      ? {
          tiktokUrl,
        }
      : {}),

    ...(youtubeUrl
      ? {
          youtubeUrl,
        }
      : {}),

    ...(websiteUrl
      ? {
          websiteUrl,
        }
      : {}),
  };
}

/* --------------------------------------------------------------------- */
/* Release Validation                                                     */
/* --------------------------------------------------------------------- */

function validateRelease(
  value: unknown,
  errors: CampaignIntakeErrors,
): ReleaseDetails | null {
  const addError =
    createFieldErrorWriter(errors);

  if (!isRecord(value)) {
    addError(
      "release.releaseTitle",
      "Release information is required.",
    );

    return null;
  }

  const releaseTitle =
    getTrimmedString(
      value.releaseTitle,
    );

  const releaseDate =
    getOptionalString(
      value.releaseDate,
    );

  const releaseUrl =
    getTrimmedString(
      value.releaseUrl,
    );

  const spotifyUrl =
    getOptionalString(
      value.spotifyUrl,
    );

  const appleMusicUrl =
    getOptionalString(
      value.appleMusicUrl,
    );

  const youtubeUrl =
    getOptionalString(
      value.youtubeUrl,
    );

  const soundCloudUrl =
    getOptionalString(
      value.soundCloudUrl,
    );

  const artworkUrl =
    getOptionalString(
      value.artworkUrl,
    );

  const alternateVersionUrl =
    getOptionalString(
      value.alternateVersionUrl,
    );

  const isrc =
    getOptionalString(
      value.isrc,
    );

  const upc =
    getOptionalString(
      value.upc,
    );

  const distributorName =
    getOptionalString(
      value.distributorName,
    );

  if (
    !isRequiredStringWithinLength(
      value.releaseTitle,
      ORDER_VALIDATION_LIMITS.maximumReleaseTitleLength,
    )
  ) {
    addError(
      "release.releaseTitle",
      "Enter a valid release title.",
    );
  }

  if (
    !isOneOf(
      value.releaseType,
      RELEASE_TYPES,
    )
  ) {
    addError(
      "release.releaseType",
      "Select a valid release type.",
    );
  }

  if (
    !isOneOf(
      value.releaseStatus,
      RELEASE_STATUSES,
    )
  ) {
    addError(
      "release.releaseStatus",
      "Select a valid release status.",
    );
  }

  if (
    value.releaseStatus ===
      "upcoming" &&
    (!releaseDate ||
      !isValidOrderDate(
        releaseDate,
      ))
  ) {
    addError(
      "release.releaseDate",
      "Enter a valid upcoming release date.",
    );
  } else if (
    !isValidOptionalOrderDate(
      value.releaseDate,
    )
  ) {
    addError(
      "release.releaseDate",
      "Enter a valid release date.",
    );
  }

  if (
    !isValidOrderUrl(
      releaseUrl,
    )
  ) {
    addError(
      "release.releaseUrl",
      "Enter a valid public or private release URL.",
    );
  }

  const releaseUrls: Array<{
    field: CampaignIntakeField;
    value: unknown;
  }> = [
    {
      field:
        "release.spotifyUrl",

      value:
        value.spotifyUrl,
    },
    {
      field:
        "release.appleMusicUrl",

      value:
        value.appleMusicUrl,
    },
    {
      field:
        "release.youtubeUrl",

      value:
        value.youtubeUrl,
    },
    {
      field:
        "release.soundCloudUrl",

      value:
        value.soundCloudUrl,
    },
    {
      field:
        "release.artworkUrl",

      value:
        value.artworkUrl,
    },
    {
      field:
        "release.alternateVersionUrl",

      value:
        value.alternateVersionUrl,
    },
  ];

  for (const item of releaseUrls) {
    if (
      !isValidOptionalOrderUrl(
        item.value,
      )
    ) {
      addError(
        item.field,
        "Enter a complete http or https URL.",
      );
    }
  }

  if (
    !isOptionalStringWithinLength(
      value.isrc,
      ORDER_VALIDATION_LIMITS.maximumIdentifierLength,
    )
  ) {
    addError(
      "release.isrc",
      "The ISRC value is too long.",
    );
  }

  if (
    !isOptionalStringWithinLength(
      value.upc,
      ORDER_VALIDATION_LIMITS.maximumIdentifierLength,
    )
  ) {
    addError(
      "release.upc",
      "The UPC or EAN value is too long.",
    );
  }

  if (
    !isOptionalStringWithinLength(
      value.distributorName,
      ORDER_VALIDATION_LIMITS.maximumDistributorNameLength,
    )
  ) {
    addError(
      "release.distributorName",
      "The distributor or label name is too long.",
    );
  }

  if (
    value.rightsConfirmed !==
    true
  ) {
    addError(
      "release.rightsConfirmed",
      "Confirm that you own or are authorized to promote this release.",
    );
  }

  const releaseType =
    isOneOf(
      value.releaseType,
      RELEASE_TYPES,
    )
      ? value.releaseType
      : "other";

  const releaseStatus =
    isOneOf(
      value.releaseStatus,
      RELEASE_STATUSES,
    )
      ? value.releaseStatus
      : "not-yet-delivered";

  return {
    releaseTitle,

    releaseType:
      releaseType as ReleaseType,

    releaseStatus:
      releaseStatus as ReleaseStatus,

    releaseUrl,

    rightsConfirmed:
      value.rightsConfirmed === true,

    ...(releaseDate
      ? {
          releaseDate,
        }
      : {}),

    ...(spotifyUrl
      ? {
          spotifyUrl,
        }
      : {}),

    ...(appleMusicUrl
      ? {
          appleMusicUrl,
        }
      : {}),

    ...(youtubeUrl
      ? {
          youtubeUrl,
        }
      : {}),

    ...(soundCloudUrl
      ? {
          soundCloudUrl,
        }
      : {}),

    ...(artworkUrl
      ? {
          artworkUrl,
        }
      : {}),

    ...(alternateVersionUrl
      ? {
          alternateVersionUrl,
        }
      : {}),

    ...(isrc
      ? {
          isrc,
        }
      : {}),

    ...(upc
      ? {
          upc,
        }
      : {}),

    ...(distributorName
      ? {
          distributorName,
        }
      : {}),
  };
}

/* --------------------------------------------------------------------- */
/* Campaign Preferences Validation                                        */
/* --------------------------------------------------------------------- */

function validatePreferences(
  value: unknown,
  errors: CampaignIntakeErrors,
): CampaignPreferences | null {
  const addError =
    createFieldErrorWriter(errors);

  if (!isRecord(value)) {
    addError(
      "preferences.primaryGoal",
      "Campaign preferences are required.",
    );

    return null;
  }

  const goalDescription =
    getOptionalString(
      value.goalDescription,
    );

  const targetMarkets =
    normalizeStringArray(
      value.targetMarkets,
    );

  const targetAudience =
    getOptionalString(
      value.targetAudience,
    );

  const similarArtists =
    normalizeStringArray(
      value.similarArtists,
    );

  const preferredStartDate =
    getOptionalString(
      value.preferredStartDate,
    );

  const deadlineDate =
    getOptionalString(
      value.deadlineDate,
    );

  const campaignNotes =
    getOptionalString(
      value.campaignNotes,
    );

  if (
    !isOneOf(
      value.primaryGoal,
      CAMPAIGN_GOALS,
    )
  ) {
    addError(
      "preferences.primaryGoal",
      "Select a valid campaign goal.",
    );
  }

  if (
    !isOptionalStringWithinLength(
      value.goalDescription,
      ORDER_VALIDATION_LIMITS.maximumGoalDescriptionLength,
    )
  ) {
    addError(
      "preferences.goalDescription",
      "The campaign goal description is too long.",
    );
  }

  if (
    !isValidStringArray(
      value.targetMarkets,
      {
        required:
          true,
      },
    )
  ) {
    addError(
      "preferences.targetMarkets",
      "Enter at least one valid target market.",
    );
  }

  if (
    !isOptionalStringWithinLength(
      value.targetAudience,
      ORDER_VALIDATION_LIMITS.maximumTargetAudienceLength,
    )
  ) {
    addError(
      "preferences.targetAudience",
      "The target-audience description is too long.",
    );
  }

  if (
    !isValidStringArray(
      value.similarArtists,
    )
  ) {
    addError(
      "preferences.similarArtists",
      "The similar-artists list contains an invalid value.",
    );
  }

  if (
    !isValidOptionalOrderDate(
      value.preferredStartDate,
    )
  ) {
    addError(
      "preferences.preferredStartDate",
      "Enter a valid preferred start date.",
    );
  }

  if (
    !isValidOptionalOrderDate(
      value.deadlineDate,
    )
  ) {
    addError(
      "preferences.deadlineDate",
      "Enter a valid campaign deadline.",
    );
  }

  if (
    preferredStartDate &&
    deadlineDate &&
    isValidOrderDate(
      preferredStartDate,
    ) &&
    isValidOrderDate(
      deadlineDate,
    ) &&
    deadlineDate <
      preferredStartDate
  ) {
    addError(
      "preferences.deadlineDate",
      "The campaign deadline cannot be before the preferred start date.",
    );
  }

  if (
    !isOptionalStringWithinLength(
      value.campaignNotes,
      ORDER_VALIDATION_LIMITS.maximumCampaignNotesLength,
    )
  ) {
    addError(
      "preferences.campaignNotes",
      "The campaign notes are too long.",
    );
  }

  const primaryGoal =
    isOneOf(
      value.primaryGoal,
      CAMPAIGN_GOALS,
    )
      ? value.primaryGoal
      : "other";

  return {
    primaryGoal:
      primaryGoal as CampaignGoal,

    targetMarkets,

    similarArtists,

    ...(goalDescription
      ? {
          goalDescription,
        }
      : {}),

    ...(targetAudience
      ? {
          targetAudience,
        }
      : {}),

    ...(preferredStartDate
      ? {
          preferredStartDate,
        }
      : {}),

    ...(deadlineDate
      ? {
          deadlineDate,
        }
      : {}),

    ...(campaignNotes
      ? {
          campaignNotes,
        }
      : {}),
  };
}

/* --------------------------------------------------------------------- */
/* Asset Validation                                                       */
/* --------------------------------------------------------------------- */

function validateAssets(
  value: unknown,
  errors: CampaignIntakeErrors,
): CampaignAssets | null {
  const addError =
    createFieldErrorWriter(errors);

  if (!isRecord(value)) {
    return {};
  }

  const assetDefinitions: Array<{
    key: keyof CampaignAssets;
    field: CampaignIntakeField;
  }> = [
    {
      key:
        "pressPhotoUrl",

      field:
        "assets.pressPhotoUrl",
    },
    {
      key:
        "electronicPressKitUrl",

      field:
        "assets.electronicPressKitUrl",
    },
    {
      key:
        "musicVideoUrl",

      field:
        "assets.musicVideoUrl",
    },
    {
      key:
        "lyricVideoUrl",

      field:
        "assets.lyricVideoUrl",
    },
    {
      key:
        "visualizerUrl",

      field:
        "assets.visualizerUrl",
    },
    {
      key:
        "shortFormContentUrl",

      field:
        "assets.shortFormContentUrl",
    },
    {
      key:
        "cloudFolderUrl",

      field:
        "assets.cloudFolderUrl",
    },
    {
      key:
        "additionalAssetUrl",

      field:
        "assets.additionalAssetUrl",
    },
  ];

  const assets:
    CampaignAssets = {};

  for (
    const definition
    of assetDefinitions
  ) {
    const rawValue =
      value[
        definition.key
      ];

    const normalizedValue =
      getOptionalString(
        rawValue,
      );

    if (
      !isValidOptionalOrderUrl(
        rawValue,
      )
    ) {
      addError(
        definition.field,
        "Enter a complete http or https URL.",
      );

      continue;
    }

    if (normalizedValue) {
      assets[
        definition.key
      ] =
        normalizedValue;
    }
  }

  return assets;
}

/* --------------------------------------------------------------------- */
/* Campaign Item Validation                                               */
/* --------------------------------------------------------------------- */

function validateCampaignItems(
  value: unknown,
  cartSkus: readonly string[],
  errors: CampaignIntakeErrors,
): CampaignItemIntake[] {
  const addError =
    createFieldErrorWriter(errors);

  if (
    !Array.isArray(value) ||
    value.length === 0
  ) {
    addError(
      "campaignItems",
      "Campaign-specific intake information is required.",
    );

    return [];
  }

  if (
    value.length !==
    cartSkus.length
  ) {
    addError(
      "campaignItems",
      "Campaign intake must match the selected cart services.",
    );
  }

  const cartSkuSet =
    new Set(
      cartSkus,
    );

  const seenSkus =
    new Set<string>();

  const campaignItems:
    CampaignItemIntake[] = [];

  value.forEach(
    (
      rawItem,
      index,
    ) => {
      if (!isRecord(rawItem)) {
        addError(
          "campaignItems",
          "One or more campaign intake entries are invalid.",
        );

        return;
      }

      const sku =
        normalizeOrderSku(
          getTrimmedString(
            rawItem.sku,
          ),
        );

      const campaignUrl =
        getOptionalString(
          rawItem.campaignUrl,
        );

      const instructions =
        getOptionalString(
          rawItem.instructions,
        );

      if (
        !isValidOrderSku(sku) ||
        !cartSkuSet.has(sku)
      ) {
        addError(
          "campaignItems",
          "Campaign intake contains a SKU that is not in the cart.",
        );
      }

      if (seenSkus.has(sku)) {
        addError(
          "campaignItems",
          "Campaign intake contains a duplicate SKU.",
        );
      }

      if (sku) {
        seenSkus.add(sku);
      }

      const campaignUrlField =
        `campaignItems.${index}.campaignUrl` as CampaignIntakeField;

      const instructionsField =
        `campaignItems.${index}.instructions` as CampaignIntakeField;

      if (
        !campaignUrl ||
        !isValidOrderUrl(
          campaignUrl,
        )
      ) {
        addError(
          campaignUrlField,
          "Enter a valid platform-specific campaign URL.",
        );
      }

      if (
        !isOptionalStringWithinLength(
          rawItem.instructions,
          ORDER_VALIDATION_LIMITS.maximumCampaignInstructionsLength,
        )
      ) {
        addError(
          instructionsField,
          `Campaign instructions must be ${ORDER_VALIDATION_LIMITS.maximumCampaignInstructionsLength.toLocaleString(
            "en-US",
          )} characters or fewer.`,
        );
      }

      campaignItems.push({
        sku,

        ...(campaignUrl
          ? {
              campaignUrl,
            }
          : {}),

        ...(instructions
          ? {
              instructions,
            }
          : {}),
      });
    },
  );

  for (const sku of cartSkus) {
    if (!seenSkus.has(sku)) {
      addError(
        "campaignItems",
        `Campaign intake is missing information for ${sku}.`,
      );
    }
  }

  return campaignItems;
}

/* --------------------------------------------------------------------- */
/* Agreement Validation                                                   */
/* --------------------------------------------------------------------- */

function validateAgreements(
  value: unknown,
  errors: CampaignIntakeErrors,
): OrderAgreements | null {
  const addError =
    createFieldErrorWriter(errors);

  if (!isRecord(value)) {
    addError(
      "agreements.termsAccepted",
      "Required checkout agreements are missing.",
    );

    return null;
  }

  if (
    value.informationAccurate !==
    true
  ) {
    addError(
      "agreements.informationAccurate",
      "Confirm that the submitted information is accurate.",
    );
  }

  if (
    value.rightsAuthorized !==
    true
  ) {
    addError(
      "agreements.rightsAuthorized",
      "Confirm that you are authorized to promote the supplied materials.",
    );
  }

  if (
    value.campaignTargetsAcknowledged !==
    true
  ) {
    addError(
      "agreements.campaignTargetsAcknowledged",
      "Acknowledge that campaign targets are estimates.",
    );
  }

  if (
    value.termsAccepted !==
    true
  ) {
    addError(
      "agreements.termsAccepted",
      "Accept the Money Records service terms.",
    );
  }

  if (
    value.privacyAccepted !==
    true
  ) {
    addError(
      "agreements.privacyAccepted",
      "Accept the Money Records privacy policy.",
    );
  }

  if (
    value.marketingConsent !==
      undefined &&
    !isBoolean(
      value.marketingConsent,
    )
  ) {
    addError(
      "agreements.marketingConsent",
      "The marketing-consent value is invalid.",
    );
  }

  return {
    informationAccurate:
      value.informationAccurate ===
      true,

    rightsAuthorized:
      value.rightsAuthorized ===
      true,

    campaignTargetsAcknowledged:
      value.campaignTargetsAcknowledged ===
      true,

    termsAccepted:
      value.termsAccepted ===
      true,

    privacyAccepted:
      value.privacyAccepted ===
      true,

    marketingConsent:
      value.marketingConsent ===
      true,
  };
}

/* --------------------------------------------------------------------- */
/* Complete Campaign Intake Validation                                    */
/* --------------------------------------------------------------------- */

export function validateCampaignIntake(
  value: unknown,
  cartSkus: readonly string[],
): CampaignIntakeValidationResult {
  const errors:
    CampaignIntakeErrors = {};

  if (!isRecord(value)) {
    return intakeFailure(
      "Campaign intake information is required.",
      {
        "customer.firstName":
          "Campaign intake information is required.",
      },
    );
  }

  const customer =
    validateCustomer(
      value.customer,
      errors,
    );

  const artist =
    validateArtist(
      value.artist,
      errors,
    );

  const release =
    validateRelease(
      value.release,
      errors,
    );

  const preferences =
    validatePreferences(
      value.preferences,
      errors,
    );

  const assets =
    validateAssets(
      value.assets,
      errors,
    );

  const campaignItems =
    validateCampaignItems(
      value.campaignItems,
      cartSkus,
      errors,
    );

  const agreements =
    validateAgreements(
      value.agreements,
      errors,
    );

  if (
    Object.keys(errors).length >
    0
  ) {
    return intakeFailure(
      "Review the highlighted campaign intake fields before continuing.",
      errors,
    );
  }

  if (
    !customer ||
    !artist ||
    !release ||
    !preferences ||
    !assets ||
    !agreements
  ) {
    return intakeFailure(
      "Campaign intake could not be validated.",
      errors,
    );
  }

  return {
    ok: true,

    intake: {
      customer,
      artist,
      release,
      preferences,
      assets,
      campaignItems,
      agreements,
    },
  };
}

/* --------------------------------------------------------------------- */
/* Cart Validation                                                        */
/* --------------------------------------------------------------------- */

function validateCart(
  value: unknown,
): CartValidationResult {
  if (!isRecord(value)) {
    return checkoutFailure(
      "empty-cart",
      400,
      "Your campaign cart is empty.",
    );
  }

  const items =
    value.items;

  if (!Array.isArray(items)) {
    return checkoutFailure(
      "empty-cart",
      400,
      "Your campaign cart is empty.",
    );
  }

  if (items.length === 0) {
    return checkoutFailure(
      "empty-cart",
      400,
      "Select at least one campaign before checkout.",
    );
  }

  if (
    items.length >
    ORDER_VALIDATION_LIMITS.maximumCartItems
  ) {
    return checkoutFailure(
      "invalid-request",
      400,
      `A checkout may contain no more than ${ORDER_VALIDATION_LIMITS.maximumCartItems} campaign services.`,
    );
  }

  const skus:
    string[] = [];

  const seenSkus =
    new Set<string>();

  for (const item of items) {
    if (!isRecord(item)) {
      return checkoutFailure(
        "invalid-campaign",
        400,
        "One or more cart items are invalid.",
      );
    }

    const sku =
      normalizeOrderSku(
        getTrimmedString(
          item.sku,
        ),
      );

    if (!isValidOrderSku(sku)) {
      return checkoutFailure(
        "invalid-campaign",
        400,
        "Every selected campaign must contain a valid SKU.",
      );
    }

    if (seenSkus.has(sku)) {
      return checkoutFailure(
        "invalid-campaign",
        400,
        `${sku} appears more than once in the cart.`,
      );
    }

    /**
     * Campaign quantities are fixed at one service per SKU.
     *
     * An omitted quantity is allowed for compact checkout payloads.
     */
    if (
      item.quantity !==
        undefined &&
      item.quantity !==
        1
    ) {
      return checkoutFailure(
        "invalid-campaign",
        400,
        `${sku} must use a quantity of one.`,
      );
    }

    seenSkus.add(sku);
    skus.push(sku);
  }

  return {
    ok: true,
    skus,
  };
}

/* --------------------------------------------------------------------- */
/* Redirect Validation                                                    */
/* --------------------------------------------------------------------- */

function validateRedirectPath(
  value: unknown,
  label: string,
): {
  ok: true;
  value?: string;
} | CheckoutOrderValidationFailure {
  if (
    value === undefined ||
    value === null
  ) {
    return {
      ok: true,
    };
  }

  if (typeof value !== "string") {
    return checkoutFailure(
      "invalid-request",
      400,
      `The checkout ${label} path is invalid.`,
    );
  }

  const normalized =
    value.trim();

  if (
    !normalized ||
    normalized.length >
      ORDER_VALIDATION_LIMITS.maximumRedirectLength ||
    hasControlCharacters(normalized)
  ) {
    return checkoutFailure(
      "invalid-request",
      400,
      `The checkout ${label} path is invalid.`,
    );
  }

  return {
    ok: true,
    value: normalized,
  };
}

/* --------------------------------------------------------------------- */
/* Complete Checkout Validation                                           */
/* --------------------------------------------------------------------- */

export function validateCheckoutOrderRequest(
  payload: unknown,
): CheckoutOrderValidationResult {
  if (!isRecord(payload)) {
    return checkoutFailure(
      "invalid-request",
      400,
      "The checkout request must contain a valid JSON object.",
    );
  }

  if (
    payload.schemaVersion !==
    ORDER_SCHEMA_VERSION
  ) {
    return checkoutFailure(
      "invalid-request",
      400,
      "The checkout form version is no longer supported. Refresh the page and try again.",
    );
  }

  const cartValidation =
    validateCart(
      payload.cart,
    );

  if (!cartValidation.ok) {
    return cartValidation;
  }

  const intakeValidation =
    validateCampaignIntake(
      payload.intake,
      cartValidation.skus,
    );

  if (!intakeValidation.ok) {
    return checkoutFailure(
      "invalid-intake",
      422,
      intakeValidation.message,
      intakeValidation.errors,
    );
  }

  const successPathValidation =
    validateRedirectPath(
      payload.successPath,
      "success",
    );

  if (!successPathValidation.ok) {
    return successPathValidation;
  }

  const cancelPathValidation =
    validateRedirectPath(
      payload.cancelPath,
      "cancellation",
    );

  if (!cancelPathValidation.ok) {
    return cancelPathValidation;
  }

  const intake =
    intakeValidation.intake;

  const request:
    CreateCheckoutOrderRequest = {
      schemaVersion:
        ORDER_SCHEMA_VERSION,

      cart:
        payload.cart as CreateCheckoutOrderRequest["cart"],

      intake,

      ...(successPathValidation.value
        ? {
            successPath:
              successPathValidation.value,
          }
        : {}),

      ...(cancelPathValidation.value
        ? {
            cancelPath:
              cancelPathValidation.value,
          }
        : {}),
    };

  return {
    ok: true,

    data: {
      request,

      skus:
        cartValidation.skus,

      intake,

      customerEmail:
        intake.customer.email,

      customerName:
        `${intake.customer.firstName} ${intake.customer.lastName}`.trim(),

      artistName:
        intake.artist.artistName,

      releaseTitle:
        intake.release.releaseTitle,

      successPath:
        successPathValidation.value,

      cancelPath:
        cancelPathValidation.value,
    },
  };
}

/* --------------------------------------------------------------------- */
/* Assertion Helper                                                       */
/* --------------------------------------------------------------------- */

/**
 * Validates a checkout payload and throws a typed error when invalid.
 *
 * Route handlers can use this when they prefer try/catch control flow.
 */
export function assertValidCheckoutOrderRequest(
  payload: unknown,
): ValidatedCheckoutOrderRequest {
  const result =
    validateCheckoutOrderRequest(
      payload,
    );

  if (!result.ok) {
    throw new CheckoutOrderValidationError(
      result,
    );
  }

  return result.data;
}

/* --------------------------------------------------------------------- */
/* Validation Error Type Guard                                            */
/* --------------------------------------------------------------------- */

export function isCheckoutOrderValidationError(
  error: unknown,
): error is CheckoutOrderValidationError {
  return (
    error instanceof
    CheckoutOrderValidationError
  );
}