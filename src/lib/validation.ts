// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Form Validation                                      ┃
   ┃ File   : src/lib/validation.ts                                      ┃
   ┃ Role   : Shared inquiry and artist-submission validation utilities  ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

/* --------------------------------------------------------------------- */
/* Supported Inquiry Values                                               */
/* --------------------------------------------------------------------- */

export const INQUIRY_TYPES = [
  "general",
  "marketing-services",
  "distribution",
  "artist-development",
  "press-pr",
  "vevo",
  "radio",
  "branding",
  "partnership",
  "billing-support",
  "other",
] as const;

export type InquiryType =
  (typeof INQUIRY_TYPES)[number];

export const INQUIRY_SERVICE_OPTIONS = [
  "spotify",
  "apple-music",
  "instagram",
  "tiktok",
  "youtube",
  "vevo",
  "press-pr",
  "radio",
  "soundcloud",
  "artist-branding",
  "distribution",
  "artist-development",
  "multiple-platforms",
  "not-sure",
] as const;

export type InquiryService =
  (typeof INQUIRY_SERVICE_OPTIONS)[number];

export const INQUIRY_BUDGET_OPTIONS = [
  "under-250",
  "250-499",
  "500-999",
  "1000-2499",
  "2500-4999",
  "5000-plus",
  "not-sure",
  "prefer-not-to-say",
] as const;

export type InquiryBudget =
  (typeof INQUIRY_BUDGET_OPTIONS)[number];

export const INQUIRY_TIMELINE_OPTIONS = [
  "immediately",
  "within-7-days",
  "within-30-days",
  "within-90-days",
  "future-release",
  "not-sure",
] as const;

export type InquiryTimeline =
  (typeof INQUIRY_TIMELINE_OPTIONS)[number];

/* --------------------------------------------------------------------- */
/* Supported Music-Submission Values                                     */
/* --------------------------------------------------------------------- */

export const SUBMISSION_RELEASE_TYPES = [
  "single",
  "ep",
  "album",
  "mixtape",
  "demo",
  "unreleased-record",
  "other",
] as const;

export type SubmissionReleaseType =
  (typeof SUBMISSION_RELEASE_TYPES)[number];

export const SUBMISSION_RELEASE_STATUSES = [
  "unreleased",
  "released",
  "scheduled",
  "demo",
] as const;

export type SubmissionReleaseStatus =
  (typeof SUBMISSION_RELEASE_STATUSES)[number];

export const SUBMISSION_GOALS = [
  "record-label-consideration",
  "artist-development",
  "distribution",
  "marketing",
  "press-pr",
  "playlist-marketing",
  "social-media-growth",
  "vevo",
  "radio",
  "artist-branding",
  "release-strategy",
  "multiple-services",
] as const;

export type SubmissionGoal =
  (typeof SUBMISSION_GOALS)[number];

export const MUSIC_GENRES = [
  "alternative",
  "blues",
  "christian-gospel",
  "country",
  "dance",
  "electronic",
  "folk",
  "funk",
  "hip-hop",
  "house",
  "indie",
  "jazz",
  "latin",
  "metal",
  "pop",
  "punk",
  "r-and-b",
  "rap",
  "reggae",
  "rock",
  "soul",
  "world",
  "other",
] as const;

export type MusicGenre =
  (typeof MUSIC_GENRES)[number];

/* --------------------------------------------------------------------- */
/* Validation Limits                                                     */
/* --------------------------------------------------------------------- */

export const VALIDATION_LIMITS = {
  firstName: 80,
  lastName: 80,
  fullName: 160,
  email: 254,
  phone: 40,
  companyName: 160,
  artistName: 160,
  location: 160,
  releaseTitle: 200,
  subject: 180,
  shortText: 500,
  message: 5_000,
  submissionStory: 8_000,
  url: 2_048,
  genres: 5,
  goals: 8,
} as const;

/* --------------------------------------------------------------------- */
/* Shared Validation Types                                               */
/* --------------------------------------------------------------------- */

export type ValidationFieldError = {
  field: string;
  message: string;
};

export type ValidationErrorMap = Record<
  string,
  string
>;

export type ValidationSuccess<T> = {
  ok: true;
  data: T;
};

export type ValidationFailure = {
  ok: false;
  errors: ValidationFieldError[];
  fieldErrors: ValidationErrorMap;
};

export type ValidationResult<T> =
  | ValidationSuccess<T>
  | ValidationFailure;

/* --------------------------------------------------------------------- */
/* Inquiry Types                                                         */
/* --------------------------------------------------------------------- */

export type InquiryInput = {
  firstName?: unknown;
  lastName?: unknown;
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  companyName?: unknown;
  artistName?: unknown;
  inquiryType?: unknown;
  service?: unknown;
  budget?: unknown;
  timeline?: unknown;
  subject?: unknown;
  message?: unknown;
  consent?: unknown;

  /**
   * Spam honeypot. This must remain empty.
   */
  website?: unknown;
};

export type ValidatedInquiry = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  artistName: string | null;
  inquiryType: InquiryType;
  service: InquiryService | null;
  budget: InquiryBudget | null;
  timeline: InquiryTimeline | null;
  subject: string;
  message: string;
  consent: true;
};

/* --------------------------------------------------------------------- */
/* Music Submission Types                                                */
/* --------------------------------------------------------------------- */

export type MusicSubmissionInput = {
  firstName?: unknown;
  lastName?: unknown;
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;

  artistName?: unknown;
  location?: unknown;
  primaryGenre?: unknown;
  secondaryGenres?: unknown;

  releaseTitle?: unknown;
  releaseType?: unknown;
  releaseStatus?: unknown;
  releaseDate?: unknown;

  musicLink?: unknown;
  spotifyUrl?: unknown;
  appleMusicUrl?: unknown;
  youtubeUrl?: unknown;
  soundcloudUrl?: unknown;
  audiomackUrl?: unknown;

  instagramUrl?: unknown;
  tiktokUrl?: unknown;
  websiteUrl?: unknown;

  goals?: unknown;
  monthlyListeners?: unknown;
  socialFollowing?: unknown;

  artistStory?: unknown;
  message?: unknown;

  ownsRights?: unknown;
  acceptsSubmissionTerms?: unknown;
  consent?: unknown;

  /**
   * Spam honeypot. This must remain empty.
   */
  website?: unknown;
};

export type ValidatedMusicSubmission = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string | null;

  artistName: string;
  location: string | null;

  primaryGenre: MusicGenre;
  secondaryGenres: MusicGenre[];

  releaseTitle: string;
  releaseType: SubmissionReleaseType;
  releaseStatus: SubmissionReleaseStatus;
  releaseDate: string | null;

  musicLink: string;

  streamingLinks: {
    spotify: string | null;
    appleMusic: string | null;
    youtube: string | null;
    soundcloud: string | null;
    audiomack: string | null;
  };

  socialLinks: {
    instagram: string | null;
    tiktok: string | null;
    website: string | null;
  };

  goals: SubmissionGoal[];

  monthlyListeners: number | null;
  socialFollowing: number | null;

  artistStory: string;
  message: string | null;

  ownsRights: true;
  acceptsSubmissionTerms: true;
  consent: true;
};

/* --------------------------------------------------------------------- */
/* Basic Type Guards                                                     */
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

export function isNonEmptyString(
  value: unknown,
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function isAllowedValue<
  T extends readonly string[],
>(
  value: string,
  allowedValues: T,
): value is T[number] {
  return (
    allowedValues as readonly string[]
  ).includes(value);
}

/* --------------------------------------------------------------------- */
/* String Normalization                                                  */
/* --------------------------------------------------------------------- */

export function normalizeSingleLine(
  value: unknown,
): string {
  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeMultiline(
  value: unknown,
): string {
  if (
    typeof value !== "string"
  ) {
    return "";
  }

  return value
    .replace(/\u0000/g, "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) =>
      line
        .replace(/[^\S\n]+/g, " ")
        .trim(),
    )
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function normalizeEmail(
  value: unknown,
): string {
  return normalizeSingleLine(value)
    .toLowerCase();
}

export function normalizePhone(
  value: unknown,
): string {
  const normalized =
    normalizeSingleLine(value);

  if (!normalized) {
    return "";
  }

  return normalized.replace(
    /[^\d+().\-\s]/g,
    "",
  );
}

export function normalizeSlugValue(
  value: unknown,
): string {
  return normalizeSingleLine(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* --------------------------------------------------------------------- */
/* Name Helpers                                                          */
/* --------------------------------------------------------------------- */

function splitFullName(
  fullName: string,
): {
  firstName: string;
  lastName: string;
} {
  const parts =
    fullName
      .split(/\s+/)
      .filter(Boolean);

  if (
    parts.length === 0
  ) {
    return {
      firstName: "",
      lastName: "",
    };
  }

  if (
    parts.length === 1
  ) {
    return {
      firstName: parts[0],
      lastName: "",
    };
  }

  return {
    firstName: parts[0],
    lastName: parts
      .slice(1)
      .join(" "),
  };
}

function resolveNameFields({
  firstName,
  lastName,
  fullName,
}: {
  firstName: unknown;
  lastName: unknown;
  fullName: unknown;
}): {
  firstName: string;
  lastName: string;
  fullName: string;
} {
  let normalizedFirstName =
    normalizeSingleLine(firstName);

  let normalizedLastName =
    normalizeSingleLine(lastName);

  const normalizedFullName =
    normalizeSingleLine(fullName);

  if (
    normalizedFullName &&
    (
      !normalizedFirstName ||
      !normalizedLastName
    )
  ) {
    const splitName =
      splitFullName(
        normalizedFullName,
      );

    normalizedFirstName ||=
      splitName.firstName;

    normalizedLastName ||=
      splitName.lastName;
  }

  return {
    firstName:
      normalizedFirstName,

    lastName:
      normalizedLastName,

    fullName:
      [
        normalizedFirstName,
        normalizedLastName,
      ]
        .filter(Boolean)
        .join(" "),
  };
}

/* --------------------------------------------------------------------- */
/* URL Validation                                                        */
/* --------------------------------------------------------------------- */

export function normalizeExternalUrl(
  value: unknown,
): string {
  const normalized =
    normalizeSingleLine(value);

  if (!normalized) {
    return "";
  }

  const candidate =
    /^[a-z][a-z\d+\-.]*:\/\//i.test(
      normalized,
    )
      ? normalized
      : `https://${normalized}`;

  try {
    const url =
      new URL(candidate);

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      return "";
    }

    url.username = "";
    url.password = "";
    url.hash = "";

    return url.toString();
  } catch {
    return "";
  }
}

export function isValidExternalUrl(
  value: string,
): boolean {
  if (
    !value ||
    value.length >
      VALIDATION_LIMITS.url
  ) {
    return false;
  }

  try {
    const url =
      new URL(value);

    return (
      (
        url.protocol === "https:" ||
        url.protocol === "http:"
      ) &&
      Boolean(url.hostname)
    );
  } catch {
    return false;
  }
}

/* --------------------------------------------------------------------- */
/* Email and Phone Validation                                            */
/* --------------------------------------------------------------------- */

export function isValidEmail(
  value: string,
): boolean {
  if (
    value.length < 3 ||
    value.length >
      VALIDATION_LIMITS.email
  ) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value,
  );
}

export function isValidPhone(
  value: string,
): boolean {
  if (!value) {
    return true;
  }

  const digits =
    value.replace(/\D/g, "");

  return (
    digits.length >= 7 &&
    digits.length <= 15
  );
}

/* --------------------------------------------------------------------- */
/* Date Validation                                                       */
/* --------------------------------------------------------------------- */

export function normalizeIsoDate(
  value: unknown,
): string {
  const normalized =
    normalizeSingleLine(value);

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(
      normalized,
    )
  ) {
    return "";
  }

  const timestamp =
    Date.parse(
      `${normalized}T00:00:00.000Z`,
    );

  if (
    Number.isNaN(timestamp)
  ) {
    return "";
  }

  const parsedDate =
    new Date(timestamp)
      .toISOString()
      .slice(0, 10);

  return parsedDate === normalized
    ? normalized
    : "";
}

/* --------------------------------------------------------------------- */
/* Number Validation                                                     */
/* --------------------------------------------------------------------- */

function normalizeOptionalInteger(
  value: unknown,
): number | null {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  if (
    typeof value === "number"
  ) {
    if (
      Number.isSafeInteger(value) &&
      value >= 0
    ) {
      return value;
    }

    return null;
  }

  const normalized =
    normalizeSingleLine(value)
      .replace(/[,\s]/g, "");

  if (
    !/^\d+$/.test(normalized)
  ) {
    return null;
  }

  const parsed =
    Number(normalized);

  return (
    Number.isSafeInteger(parsed) &&
    parsed >= 0
  )
    ? parsed
    : null;
}

/* --------------------------------------------------------------------- */
/* Boolean Validation                                                    */
/* --------------------------------------------------------------------- */

export function normalizeBoolean(
  value: unknown,
): boolean {
  if (
    value === true ||
    value === 1
  ) {
    return true;
  }

  if (
    typeof value !== "string"
  ) {
    return false;
  }

  return [
    "true",
    "1",
    "yes",
    "on",
    "accepted",
  ].includes(
    value
      .trim()
      .toLowerCase(),
  );
}

/* --------------------------------------------------------------------- */
/* Array Validation                                                      */
/* --------------------------------------------------------------------- */

function normalizeStringArray(
  value: unknown,
): string[] {
  if (
    Array.isArray(value)
  ) {
    return value
      .map(normalizeSingleLine)
      .filter(Boolean);
  }

  if (
    typeof value === "string"
  ) {
    return value
      .split(",")
      .map(normalizeSingleLine)
      .filter(Boolean);
  }

  return [];
}

function uniqueValues<T>(
  values: readonly T[],
): T[] {
  return Array.from(
    new Set(values),
  );
}

/* --------------------------------------------------------------------- */
/* Error Helpers                                                         */
/* --------------------------------------------------------------------- */

function addError(
  errors: ValidationFieldError[],
  field: string,
  message: string,
): void {
  if (
    errors.some(
      (error) =>
        error.field === field,
    )
  ) {
    return;
  }

  errors.push({
    field,
    message,
  });
}

export function createFieldErrorMap(
  errors:
    readonly ValidationFieldError[],
): ValidationErrorMap {
  return errors.reduce<ValidationErrorMap>(
    (
      fieldErrors,
      error,
    ) => {
      if (
        !fieldErrors[
          error.field
        ]
      ) {
        fieldErrors[
          error.field
        ] =
          error.message;
      }

      return fieldErrors;
    },
    {},
  );
}

function createFailure(
  errors: ValidationFieldError[],
): ValidationFailure {
  return {
    ok: false,
    errors,
    fieldErrors:
      createFieldErrorMap(
        errors,
      ),
  };
}

function createSuccess<T>(
  data: T,
): ValidationSuccess<T> {
  return {
    ok: true,
    data,
  };
}

/* --------------------------------------------------------------------- */
/* Spam Protection                                                       */
/* --------------------------------------------------------------------- */

function hasHoneypotValue(
  value: unknown,
): boolean {
  return (
    normalizeSingleLine(value)
      .length > 0
  );
}

/* --------------------------------------------------------------------- */
/* Optional Field Helpers                                                */
/* --------------------------------------------------------------------- */

function toNullableString(
  value: string,
): string | null {
  return value || null;
}

function validateOptionalUrl({
  rawValue,
  field,
  label,
  errors,
}: {
  rawValue: unknown;
  field: string;
  label: string;
  errors: ValidationFieldError[];
}): string | null {
  const originalValue =
    normalizeSingleLine(
      rawValue,
    );

  if (!originalValue) {
    return null;
  }

  const normalizedUrl =
    normalizeExternalUrl(
      originalValue,
    );

  if (
    !normalizedUrl ||
    !isValidExternalUrl(
      normalizedUrl,
    )
  ) {
    addError(
      errors,
      field,
      `Enter a valid ${label} URL.`,
    );

    return null;
  }

  return normalizedUrl;
}

/* --------------------------------------------------------------------- */
/* Inquiry Validation                                                    */
/* --------------------------------------------------------------------- */

export function validateInquiry(
  input: InquiryInput | unknown,
): ValidationResult<ValidatedInquiry> {
  if (!isRecord(input)) {
    return createFailure([
      {
        field: "form",
        message:
          "The inquiry request is invalid.",
      },
    ]);
  }

  const errors:
    ValidationFieldError[] =
      [];

  if (
    hasHoneypotValue(
      input.website,
    )
  ) {
    return createFailure([
      {
        field: "form",
        message:
          "The inquiry could not be submitted.",
      },
    ]);
  }

  const name =
    resolveNameFields({
      firstName:
        input.firstName,

      lastName:
        input.lastName,

      fullName:
        input.fullName,
    });

  const email =
    normalizeEmail(
      input.email,
    );

  const phone =
    normalizePhone(
      input.phone,
    );

  const companyName =
    normalizeSingleLine(
      input.companyName,
    );

  const artistName =
    normalizeSingleLine(
      input.artistName,
    );

  const inquiryTypeValue =
    normalizeSlugValue(
      input.inquiryType,
    );

  const serviceValue =
    normalizeSlugValue(
      input.service,
    );

  const budgetValue =
    normalizeSlugValue(
      input.budget,
    );

  const timelineValue =
    normalizeSlugValue(
      input.timeline,
    );

  const subject =
    normalizeSingleLine(
      input.subject,
    );

  const message =
    normalizeMultiline(
      input.message,
    );

  const consent =
    normalizeBoolean(
      input.consent,
    );

  /* ------------------------------------------------------------------- */
  /* Name Validation                                                     */
  /* ------------------------------------------------------------------- */

  if (!name.firstName) {
    addError(
      errors,
      "firstName",
      "Enter your first name.",
    );
  } else if (
    name.firstName.length >
    VALIDATION_LIMITS.firstName
  ) {
    addError(
      errors,
      "firstName",
      `First name cannot exceed ${VALIDATION_LIMITS.firstName} characters.`,
    );
  }

  if (!name.lastName) {
    addError(
      errors,
      "lastName",
      "Enter your last name.",
    );
  } else if (
    name.lastName.length >
    VALIDATION_LIMITS.lastName
  ) {
    addError(
      errors,
      "lastName",
      `Last name cannot exceed ${VALIDATION_LIMITS.lastName} characters.`,
    );
  }

  /* ------------------------------------------------------------------- */
  /* Contact Validation                                                  */
  /* ------------------------------------------------------------------- */

  if (!email) {
    addError(
      errors,
      "email",
      "Enter your email address.",
    );
  } else if (
    !isValidEmail(email)
  ) {
    addError(
      errors,
      "email",
      "Enter a valid email address.",
    );
  }

  if (
    phone &&
    !isValidPhone(phone)
  ) {
    addError(
      errors,
      "phone",
      "Enter a valid phone number.",
    );
  }

  if (
    companyName.length >
    VALIDATION_LIMITS.companyName
  ) {
    addError(
      errors,
      "companyName",
      `Company name cannot exceed ${VALIDATION_LIMITS.companyName} characters.`,
    );
  }

  if (
    artistName.length >
    VALIDATION_LIMITS.artistName
  ) {
    addError(
      errors,
      "artistName",
      `Artist name cannot exceed ${VALIDATION_LIMITS.artistName} characters.`,
    );
  }

  /* ------------------------------------------------------------------- */
  /* Inquiry Details                                                     */
  /* ------------------------------------------------------------------- */

  if (!inquiryTypeValue) {
    addError(
      errors,
      "inquiryType",
      "Select an inquiry type.",
    );
  } else if (
    !isAllowedValue(
      inquiryTypeValue,
      INQUIRY_TYPES,
    )
  ) {
    addError(
      errors,
      "inquiryType",
      "Select a valid inquiry type.",
    );
  }

  if (
    serviceValue &&
    !isAllowedValue(
      serviceValue,
      INQUIRY_SERVICE_OPTIONS,
    )
  ) {
    addError(
      errors,
      "service",
      "Select a valid Money Records service.",
    );
  }

  if (
    budgetValue &&
    !isAllowedValue(
      budgetValue,
      INQUIRY_BUDGET_OPTIONS,
    )
  ) {
    addError(
      errors,
      "budget",
      "Select a valid budget range.",
    );
  }

  if (
    timelineValue &&
    !isAllowedValue(
      timelineValue,
      INQUIRY_TIMELINE_OPTIONS,
    )
  ) {
    addError(
      errors,
      "timeline",
      "Select a valid campaign timeline.",
    );
  }

  if (!subject) {
    addError(
      errors,
      "subject",
      "Enter an inquiry subject.",
    );
  } else if (
    subject.length >
    VALIDATION_LIMITS.subject
  ) {
    addError(
      errors,
      "subject",
      `Subject cannot exceed ${VALIDATION_LIMITS.subject} characters.`,
    );
  }

  if (!message) {
    addError(
      errors,
      "message",
      "Tell us how Money Records can help.",
    );
  } else if (
    message.length < 20
  ) {
    addError(
      errors,
      "message",
      "Please provide at least 20 characters.",
    );
  } else if (
    message.length >
    VALIDATION_LIMITS.message
  ) {
    addError(
      errors,
      "message",
      `Message cannot exceed ${VALIDATION_LIMITS.message} characters.`,
    );
  }

  if (!consent) {
    addError(
      errors,
      "consent",
      "You must agree to be contacted about your inquiry.",
    );
  }

  if (
    errors.length > 0
  ) {
    return createFailure(
      errors,
    );
  }

  return createSuccess({
    firstName:
      name.firstName,

    lastName:
      name.lastName,

    fullName:
      name.fullName,

    email,

    phone:
      toNullableString(
        phone,
      ),

    companyName:
      toNullableString(
        companyName,
      ),

    artistName:
      toNullableString(
        artistName,
      ),

    inquiryType:
      inquiryTypeValue as InquiryType,

    service:
      serviceValue
        ? serviceValue as InquiryService
        : null,

    budget:
      budgetValue
        ? budgetValue as InquiryBudget
        : null,

    timeline:
      timelineValue
        ? timelineValue as InquiryTimeline
        : null,

    subject,

    message,

    consent: true,
  });
}

/* --------------------------------------------------------------------- */
/* Music Submission Validation                                           */
/* --------------------------------------------------------------------- */

export function validateMusicSubmission(
  input:
    | MusicSubmissionInput
    | unknown,
): ValidationResult<ValidatedMusicSubmission> {
  if (!isRecord(input)) {
    return createFailure([
      {
        field: "form",
        message:
          "The music submission request is invalid.",
      },
    ]);
  }

  const errors:
    ValidationFieldError[] =
      [];

  if (
    hasHoneypotValue(
      input.website,
    )
  ) {
    return createFailure([
      {
        field: "form",
        message:
          "The music submission could not be submitted.",
      },
    ]);
  }

  const name =
    resolveNameFields({
      firstName:
        input.firstName,

      lastName:
        input.lastName,

      fullName:
        input.fullName,
    });

  const email =
    normalizeEmail(
      input.email,
    );

  const phone =
    normalizePhone(
      input.phone,
    );

  const artistName =
    normalizeSingleLine(
      input.artistName,
    );

  const location =
    normalizeSingleLine(
      input.location,
    );

  const primaryGenreValue =
    normalizeSlugValue(
      input.primaryGenre,
    );

  const secondaryGenreValues =
    uniqueValues(
      normalizeStringArray(
        input.secondaryGenres,
      )
        .map(
          normalizeSlugValue,
        )
        .filter(Boolean),
    );

  const releaseTitle =
    normalizeSingleLine(
      input.releaseTitle,
    );

  const releaseTypeValue =
    normalizeSlugValue(
      input.releaseType,
    );

  const releaseStatusValue =
    normalizeSlugValue(
      input.releaseStatus,
    );

  const releaseDate =
    normalizeIsoDate(
      input.releaseDate,
    );

  const originalMusicLink =
    normalizeSingleLine(
      input.musicLink,
    );

  const musicLink =
    normalizeExternalUrl(
      originalMusicLink,
    );

  const spotifyUrl =
    validateOptionalUrl({
      rawValue:
        input.spotifyUrl,

      field:
        "spotifyUrl",

      label:
        "Spotify",

      errors,
    });

  const appleMusicUrl =
    validateOptionalUrl({
      rawValue:
        input.appleMusicUrl,

      field:
        "appleMusicUrl",

      label:
        "Apple Music",

      errors,
    });

  const youtubeUrl =
    validateOptionalUrl({
      rawValue:
        input.youtubeUrl,

      field:
        "youtubeUrl",

      label:
        "YouTube",

      errors,
    });

  const soundcloudUrl =
    validateOptionalUrl({
      rawValue:
        input.soundcloudUrl,

      field:
        "soundcloudUrl",

      label:
        "SoundCloud",

      errors,
    });

  const audiomackUrl =
    validateOptionalUrl({
      rawValue:
        input.audiomackUrl,

      field:
        "audiomackUrl",

      label:
        "Audiomack",

      errors,
    });

  const instagramUrl =
    validateOptionalUrl({
      rawValue:
        input.instagramUrl,

      field:
        "instagramUrl",

      label:
        "Instagram",

      errors,
    });

  const tiktokUrl =
    validateOptionalUrl({
      rawValue:
        input.tiktokUrl,

      field:
        "tiktokUrl",

      label:
        "TikTok",

      errors,
    });

  const websiteUrl =
    validateOptionalUrl({
      rawValue:
        input.websiteUrl,

      field:
        "websiteUrl",

      label:
        "artist website",

      errors,
    });

  const goalValues =
    uniqueValues(
      normalizeStringArray(
        input.goals,
      )
        .map(
          normalizeSlugValue,
        )
        .filter(Boolean),
    );

  const monthlyListeners =
    normalizeOptionalInteger(
      input.monthlyListeners,
    );

  const socialFollowing =
    normalizeOptionalInteger(
      input.socialFollowing,
    );

  const artistStory =
    normalizeMultiline(
      input.artistStory,
    );

  const message =
    normalizeMultiline(
      input.message,
    );

  const ownsRights =
    normalizeBoolean(
      input.ownsRights,
    );

  const acceptsSubmissionTerms =
    normalizeBoolean(
      input.acceptsSubmissionTerms,
    );

  const consent =
    normalizeBoolean(
      input.consent,
    );

  /* ------------------------------------------------------------------- */
  /* Contact Information                                                 */
  /* ------------------------------------------------------------------- */

  if (!name.firstName) {
    addError(
      errors,
      "firstName",
      "Enter your first name.",
    );
  } else if (
    name.firstName.length >
    VALIDATION_LIMITS.firstName
  ) {
    addError(
      errors,
      "firstName",
      `First name cannot exceed ${VALIDATION_LIMITS.firstName} characters.`,
    );
  }

  if (!name.lastName) {
    addError(
      errors,
      "lastName",
      "Enter your last name.",
    );
  } else if (
    name.lastName.length >
    VALIDATION_LIMITS.lastName
  ) {
    addError(
      errors,
      "lastName",
      `Last name cannot exceed ${VALIDATION_LIMITS.lastName} characters.`,
    );
  }

  if (!email) {
    addError(
      errors,
      "email",
      "Enter your email address.",
    );
  } else if (
    !isValidEmail(email)
  ) {
    addError(
      errors,
      "email",
      "Enter a valid email address.",
    );
  }

  if (
    phone &&
    !isValidPhone(phone)
  ) {
    addError(
      errors,
      "phone",
      "Enter a valid phone number.",
    );
  }

  /* ------------------------------------------------------------------- */
  /* Artist Information                                                  */
  /* ------------------------------------------------------------------- */

  if (!artistName) {
    addError(
      errors,
      "artistName",
      "Enter your artist or group name.",
    );
  } else if (
    artistName.length >
    VALIDATION_LIMITS.artistName
  ) {
    addError(
      errors,
      "artistName",
      `Artist name cannot exceed ${VALIDATION_LIMITS.artistName} characters.`,
    );
  }

  if (
    location.length >
    VALIDATION_LIMITS.location
  ) {
    addError(
      errors,
      "location",
      `Location cannot exceed ${VALIDATION_LIMITS.location} characters.`,
    );
  }

  if (!primaryGenreValue) {
    addError(
      errors,
      "primaryGenre",
      "Select your primary genre.",
    );
  } else if (
    !isAllowedValue(
      primaryGenreValue,
      MUSIC_GENRES,
    )
  ) {
    addError(
      errors,
      "primaryGenre",
      "Select a valid primary genre.",
    );
  }

  const validSecondaryGenres =
    secondaryGenreValues.filter(
      (
        genre,
      ): genre is MusicGenre =>
        isAllowedValue(
          genre,
          MUSIC_GENRES,
        ),
    );

  if (
    validSecondaryGenres.length !==
    secondaryGenreValues.length
  ) {
    addError(
      errors,
      "secondaryGenres",
      "One or more selected genres are invalid.",
    );
  }

  if (
    validSecondaryGenres.length >
    VALIDATION_LIMITS.genres
  ) {
    addError(
      errors,
      "secondaryGenres",
      `Select no more than ${VALIDATION_LIMITS.genres} secondary genres.`,
    );
  }

  /* ------------------------------------------------------------------- */
  /* Release Information                                                 */
  /* ------------------------------------------------------------------- */

  if (!releaseTitle) {
    addError(
      errors,
      "releaseTitle",
      "Enter the song or release title.",
    );
  } else if (
    releaseTitle.length >
    VALIDATION_LIMITS.releaseTitle
  ) {
    addError(
      errors,
      "releaseTitle",
      `Release title cannot exceed ${VALIDATION_LIMITS.releaseTitle} characters.`,
    );
  }

  if (!releaseTypeValue) {
    addError(
      errors,
      "releaseType",
      "Select a release type.",
    );
  } else if (
    !isAllowedValue(
      releaseTypeValue,
      SUBMISSION_RELEASE_TYPES,
    )
  ) {
    addError(
      errors,
      "releaseType",
      "Select a valid release type.",
    );
  }

  if (!releaseStatusValue) {
    addError(
      errors,
      "releaseStatus",
      "Select the release status.",
    );
  } else if (
    !isAllowedValue(
      releaseStatusValue,
      SUBMISSION_RELEASE_STATUSES,
    )
  ) {
    addError(
      errors,
      "releaseStatus",
      "Select a valid release status.",
    );
  }

  if (
    normalizeSingleLine(
      input.releaseDate,
    ) &&
    !releaseDate
  ) {
    addError(
      errors,
      "releaseDate",
      "Enter a valid release date.",
    );
  }

  if (
    releaseStatusValue ===
      "scheduled" &&
    !releaseDate
  ) {
    addError(
      errors,
      "releaseDate",
      "Enter the scheduled release date.",
    );
  }

  /* ------------------------------------------------------------------- */
  /* Music Link                                                          */
  /* ------------------------------------------------------------------- */

  if (!originalMusicLink) {
    addError(
      errors,
      "musicLink",
      "Provide a private or public link to your music.",
    );
  } else if (
    !musicLink ||
    !isValidExternalUrl(
      musicLink,
    )
  ) {
    addError(
      errors,
      "musicLink",
      "Enter a valid music link.",
    );
  }

  /* ------------------------------------------------------------------- */
  /* Goals and Audience                                                  */
  /* ------------------------------------------------------------------- */

  const validGoals =
    goalValues.filter(
      (
        goal,
      ): goal is SubmissionGoal =>
        isAllowedValue(
          goal,
          SUBMISSION_GOALS,
        ),
    );

  if (
    validGoals.length ===
    0
  ) {
    addError(
      errors,
      "goals",
      "Select at least one goal.",
    );
  }

  if (
    validGoals.length !==
    goalValues.length
  ) {
    addError(
      errors,
      "goals",
      "One or more selected goals are invalid.",
    );
  }

  if (
    validGoals.length >
    VALIDATION_LIMITS.goals
  ) {
    addError(
      errors,
      "goals",
      `Select no more than ${VALIDATION_LIMITS.goals} goals.`,
    );
  }

  if (
    input.monthlyListeners !==
      null &&
    input.monthlyListeners !==
      undefined &&
    input.monthlyListeners !==
      "" &&
    monthlyListeners === null
  ) {
    addError(
      errors,
      "monthlyListeners",
      "Enter a valid monthly-listener count.",
    );
  }

  if (
    input.socialFollowing !==
      null &&
    input.socialFollowing !==
      undefined &&
    input.socialFollowing !==
      "" &&
    socialFollowing === null
  ) {
    addError(
      errors,
      "socialFollowing",
      "Enter a valid social-following count.",
    );
  }

  /* ------------------------------------------------------------------- */
  /* Artist Story                                                        */
  /* ------------------------------------------------------------------- */

  if (!artistStory) {
    addError(
      errors,
      "artistStory",
      "Tell us about your music, background, and direction.",
    );
  } else if (
    artistStory.length < 50
  ) {
    addError(
      errors,
      "artistStory",
      "Please provide at least 50 characters about your artist story.",
    );
  } else if (
    artistStory.length >
    VALIDATION_LIMITS.submissionStory
  ) {
    addError(
      errors,
      "artistStory",
      `Artist story cannot exceed ${VALIDATION_LIMITS.submissionStory} characters.`,
    );
  }

  if (
    message.length >
    VALIDATION_LIMITS.message
  ) {
    addError(
      errors,
      "message",
      `Additional message cannot exceed ${VALIDATION_LIMITS.message} characters.`,
    );
  }

  /* ------------------------------------------------------------------- */
  /* Agreements                                                          */
  /* ------------------------------------------------------------------- */

  if (!ownsRights) {
    addError(
      errors,
      "ownsRights",
      "Confirm that you own or control the rights needed to submit this music.",
    );
  }

  if (
    !acceptsSubmissionTerms
  ) {
    addError(
      errors,
      "acceptsSubmissionTerms",
      "You must accept the music-submission terms.",
    );
  }

  if (!consent) {
    addError(
      errors,
      "consent",
      "You must agree to be contacted about your submission.",
    );
  }

  if (
    errors.length > 0
  ) {
    return createFailure(
      errors,
    );
  }

  return createSuccess({
    firstName:
      name.firstName,

    lastName:
      name.lastName,

    fullName:
      name.fullName,

    email,

    phone:
      toNullableString(
        phone,
      ),

    artistName,

    location:
      toNullableString(
        location,
      ),

    primaryGenre:
      primaryGenreValue as MusicGenre,

    secondaryGenres:
      validSecondaryGenres.filter(
        (genre) =>
          genre !==
          primaryGenreValue,
      ),

    releaseTitle,

    releaseType:
      releaseTypeValue as SubmissionReleaseType,

    releaseStatus:
      releaseStatusValue as SubmissionReleaseStatus,

    releaseDate:
      toNullableString(
        releaseDate,
      ),

    musicLink,

    streamingLinks: {
      spotify:
        spotifyUrl,

      appleMusic:
        appleMusicUrl,

      youtube:
        youtubeUrl,

      soundcloud:
        soundcloudUrl,

      audiomack:
        audiomackUrl,
    },

    socialLinks: {
      instagram:
        instagramUrl,

      tiktok:
        tiktokUrl,

      website:
        websiteUrl,
    },

    goals:
      validGoals,

    monthlyListeners,

    socialFollowing,

    artistStory,

    message:
      toNullableString(
        message,
      ),

    ownsRights: true,

    acceptsSubmissionTerms:
      true,

    consent: true,
  });
}

/* --------------------------------------------------------------------- */
/* Generic Request Parsing                                               */
/* --------------------------------------------------------------------- */

/**
 * Safely converts an unknown request body into a plain record.
 */
export function parseRequestRecord(
  value: unknown,
): Record<string, unknown> | null {
  return isRecord(value)
    ? value
    : null;
}

/**
 * Returns the first validation message for a field.
 */
export function getValidationMessage(
  result:
    ValidationResult<unknown>,
  field:
    string,
): string | undefined {
  if (result.ok) {
    return undefined;
  }

  return result.fieldErrors[
    field
  ];
}

/**
 * Returns a safe public error response for API routes.
 */
export function createValidationResponse(
  failure:
    ValidationFailure,
): {
  error: string;
  code: "VALIDATION_ERROR";
  fieldErrors: ValidationErrorMap;
} {
  return {
    error:
      "Please review the highlighted fields and try again.",

    code:
      "VALIDATION_ERROR",

    fieldErrors:
      failure.fieldErrors,
  };
}