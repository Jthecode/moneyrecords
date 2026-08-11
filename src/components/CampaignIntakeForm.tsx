"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Campaign Intake Form                                  ┃
   ┃ File   : src/components/CampaignIntakeForm.tsx                        ┃
   ┃ Role   : Multi-step artist, release, campaign, and checkout intake    ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { useCart } from "@/components/CartProvider";
import Divider from "@/components/Divider";

import { formatCartPrice } from "@/lib/cart";

import type { CartItem } from "@/types/cart";

import {
  CAMPAIGN_GOALS,
  CAMPAIGN_GOAL_LABELS,
  createEmptyCampaignIntakeForm,
  type ArtistProfile,
  type CampaignGoal,
  type CampaignIntake,
  type CampaignIntakeErrors,
  type CampaignIntakeField,
  type CampaignIntakeFormValues,
  type CampaignIntakeSection,
  type ReleaseStatus,
  type ReleaseType,
} from "@/types/order";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type CampaignIntakeFormProps = {
  /**
   * Optional prefilled form values.
   */
  initialValues?: CampaignIntakeFormValues;

  /**
   * Called after every section passes validation.
   *
   * The first argument contains normalized order-intake data.
   * The second argument contains the original editable form values.
   */
  onSubmit: (
    intake: CampaignIntake,
    formValues: CampaignIntakeFormValues,
  ) => void | Promise<void>;

  /**
   * Submit-button label.
   *
   * @default "Continue to Secure Checkout"
   */
  submitLabel?: string;

  /**
   * Prevents form editing and submission.
   */
  disabled?: boolean;

  /**
   * External checkout loading state.
   */
  isSubmitting?: boolean;

  /**
   * Displays the cart subtotal in the form header.
   *
   * @default true
   */
  showCartSummary?: boolean;

  className?: string;
};

type SectionDefinition = {
  id: CampaignIntakeSection;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
};

type InputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: "text" | "email" | "tel" | "url" | "date";
  placeholder?: string;
  helper?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
};

type TextareaProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  helper?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
};

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  error?: string;
  placeholder?: string;
  helper?: string;
  required?: boolean;
  disabled?: boolean;
};

type CheckboxProps = {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  error?: string;
  disabled?: boolean;
};

/* --------------------------------------------------------------------- */
/* Section Configuration                                                  */
/* --------------------------------------------------------------------- */

const SECTIONS: readonly SectionDefinition[] = [
  {
    id: "contact",
    number: "01",
    title: "Contact Information",
    shortTitle: "Contact",
    description:
      "Tell us who is purchasing the selected campaign services.",
  },
  {
    id: "artist",
    number: "02",
    title: "Artist Profile",
    shortTitle: "Artist",
    description:
      "Provide the artist identity, genre, market, and public profiles.",
  },
  {
    id: "release",
    number: "03",
    title: "Release Information",
    shortTitle: "Release",
    description:
      "Enter the song or project details connected to these campaigns.",
  },
  {
    id: "campaign",
    number: "04",
    title: "Campaign Direction",
    shortTitle: "Campaign",
    description:
      "Define your goals, target markets, campaign links, and instructions.",
  },
  {
    id: "assets",
    number: "05",
    title: "Creative Assets",
    shortTitle: "Assets",
    description:
      "Share optional content, press materials, and cloud folders.",
  },
  {
    id: "review",
    number: "06",
    title: "Review and Agreements",
    shortTitle: "Review",
    description:
      "Confirm your information and accept the campaign standards.",
  },
] as const;

/* --------------------------------------------------------------------- */
/* Select Options                                                         */
/* --------------------------------------------------------------------- */

const ARTIST_TYPE_OPTIONS: readonly SelectOption[] = [
  {
    value: "solo-artist",
    label: "Solo Artist",
  },
  {
    value: "group",
    label: "Group or Band",
  },
  {
    value: "producer",
    label: "Producer",
  },
  {
    value: "dj",
    label: "DJ",
  },
  {
    value: "label",
    label: "Record Label",
  },
  {
    value: "manager",
    label: "Manager or Management Company",
  },
  {
    value: "other",
    label: "Other",
  },
];

const RELEASE_TYPE_OPTIONS: readonly SelectOption[] = [
  {
    value: "single",
    label: "Single",
  },
  {
    value: "ep",
    label: "EP",
  },
  {
    value: "album",
    label: "Album",
  },
  {
    value: "mixtape",
    label: "Mixtape",
  },
  {
    value: "music-video",
    label: "Music Video",
  },
  {
    value: "catalog-release",
    label: "Catalog Release",
  },
  {
    value: "other",
    label: "Other",
  },
];

const RELEASE_STATUS_OPTIONS: readonly SelectOption[] = [
  {
    value: "already-released",
    label: "Already Released",
  },
  {
    value: "upcoming",
    label: "Upcoming Release",
  },
  {
    value: "private-link",
    label: "Private or Unreleased Link",
  },
  {
    value: "not-yet-delivered",
    label: "Not Yet Delivered",
  },
];

const CAMPAIGN_GOAL_OPTIONS: readonly SelectOption[] =
  CAMPAIGN_GOALS.map((goal) => ({
    value: goal,
    label: CAMPAIGN_GOAL_LABELS[goal],
  }));

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
    >
      <path
        d="M5 12H19M14 7L19 12L14 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
    >
      <path
        d="M19 12H5M10 7L5 12L10 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
    >
      <path
        d="M6 12.5L10 16.5L18 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M8 10V7.5C8 5.3 9.8 3.5 12 3.5C14.2 3.5 16 5.3 16 7.5V10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M12 4L21 20H3L12 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M12 9V14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <circle
        cx="12"
        cy="17.2"
        r="0.9"
        fill="currentColor"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M4 5H6L8.1 14.2H17.7L20 8H7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="9"
        cy="18.5"
        r="1.3"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="17"
        cy="18.5"
        r="1.3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/* Utilities                                                              */
/* --------------------------------------------------------------------- */

function joinClasses(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

function cloneFormValues(
  values: CampaignIntakeFormValues,
): CampaignIntakeFormValues {
  return {
    customer: {
      ...values.customer,
    },
    artist: {
      ...values.artist,
    },
    release: {
      ...values.release,
    },
    preferences: {
      ...values.preferences,
    },
    assets: {
      ...values.assets,
    },
    campaignItems: values.campaignItems.map((item) => ({
      ...item,
    })),
    agreements: {
      ...values.agreements,
    },
  };
}

function optionalString(value: string): string | undefined {
  const normalized = value.trim();

  return normalized.length > 0 ? normalized : undefined;
}

function splitList(value: string): string[] {
  return Array.from(
    new Set(
      value
        .split(/[\n,]+/)
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");

  return digits.length >= 7;
}

function isValidUrl(value: string): boolean {
  if (!value.trim()) {
    return false;
  }

  try {
    const url = new URL(value.trim());

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function getFieldError(
  errors: CampaignIntakeErrors,
  field: CampaignIntakeField,
): string | undefined {
  return errors[field];
}

function getSectionIndex(section: CampaignIntakeSection): number {
  return Math.max(
    0,
    SECTIONS.findIndex((item) => item.id === section),
  );
}

function getSuggestedCampaignUrl(
  item: CartItem,
  values: CampaignIntakeFormValues,
): string {
  switch (item.platformSlug) {
    case "spotify":
      return values.release.spotifyUrl || values.release.releaseUrl;

    case "apple-music":
      return values.release.appleMusicUrl || values.release.releaseUrl;

    case "youtube":
    case "vevo":
      return values.release.youtubeUrl || values.release.releaseUrl;

    case "soundcloud":
      return values.release.soundCloudUrl || values.release.releaseUrl;

    default:
      return values.release.releaseUrl;
  }
}

/* --------------------------------------------------------------------- */
/* Form Normalization                                                     */
/* --------------------------------------------------------------------- */

function normalizeCampaignIntake(
  values: CampaignIntakeFormValues,
): CampaignIntake {
  return {
    customer: {
      firstName: values.customer.firstName.trim(),
      lastName: values.customer.lastName.trim(),
      email: values.customer.email.trim().toLowerCase(),
      phone: values.customer.phone.trim(),
      country: values.customer.country.trim(),
      companyName: optionalString(values.customer.companyName),
      region: optionalString(values.customer.region),
    },

    artist: {
      artistName: values.artist.artistName.trim(),
      artistType: values.artist.artistType as ArtistProfile["artistType"],
      primaryGenre: values.artist.primaryGenre.trim(),
      secondaryGenre: optionalString(values.artist.secondaryGenre),
      artistCountry: values.artist.artistCountry.trim(),
      biography: optionalString(values.artist.biography),
      primarySocialUrl: optionalString(values.artist.primarySocialUrl),
      instagramUrl: optionalString(values.artist.instagramUrl),
      tiktokUrl: optionalString(values.artist.tiktokUrl),
      youtubeUrl: optionalString(values.artist.youtubeUrl),
      websiteUrl: optionalString(values.artist.websiteUrl),
    },

    release: {
      releaseTitle: values.release.releaseTitle.trim(),
      releaseType: values.release.releaseType as ReleaseType,
      releaseStatus: values.release.releaseStatus as ReleaseStatus,
      releaseDate: optionalString(values.release.releaseDate),
      releaseUrl: values.release.releaseUrl.trim(),
      spotifyUrl: optionalString(values.release.spotifyUrl),
      appleMusicUrl: optionalString(values.release.appleMusicUrl),
      youtubeUrl: optionalString(values.release.youtubeUrl),
      soundCloudUrl: optionalString(values.release.soundCloudUrl),
      artworkUrl: optionalString(values.release.artworkUrl),
      alternateVersionUrl: optionalString(
        values.release.alternateVersionUrl,
      ),
      isrc: optionalString(values.release.isrc),
      upc: optionalString(values.release.upc),
      distributorName: optionalString(values.release.distributorName),
      rightsConfirmed: values.release.rightsConfirmed,
    },

    preferences: {
      primaryGoal: values.preferences.primaryGoal as CampaignGoal,
      goalDescription: optionalString(values.preferences.goalDescription),
      targetMarkets: splitList(values.preferences.targetMarkets),
      targetAudience: optionalString(values.preferences.targetAudience),
      similarArtists: splitList(values.preferences.similarArtists),
      preferredStartDate: optionalString(
        values.preferences.preferredStartDate,
      ),
      deadlineDate: optionalString(values.preferences.deadlineDate),
      campaignNotes: optionalString(values.preferences.campaignNotes),
    },

    assets: {
      pressPhotoUrl: optionalString(values.assets.pressPhotoUrl),
      electronicPressKitUrl: optionalString(
        values.assets.electronicPressKitUrl,
      ),
      musicVideoUrl: optionalString(values.assets.musicVideoUrl),
      lyricVideoUrl: optionalString(values.assets.lyricVideoUrl),
      visualizerUrl: optionalString(values.assets.visualizerUrl),
      shortFormContentUrl: optionalString(
        values.assets.shortFormContentUrl,
      ),
      cloudFolderUrl: optionalString(values.assets.cloudFolderUrl),
      additionalAssetUrl: optionalString(values.assets.additionalAssetUrl),
    },

    campaignItems: values.campaignItems.map((item) => ({
      sku: item.sku,
      campaignUrl: optionalString(item.campaignUrl),
      instructions: optionalString(item.instructions),
    })),

    agreements: {
      ...values.agreements,
    },
  };
}

/* --------------------------------------------------------------------- */
/* Validation                                                             */
/* --------------------------------------------------------------------- */

function validateIntake(
  values: CampaignIntakeFormValues,
  sections: readonly CampaignIntakeSection[] = SECTIONS.map(
    (section) => section.id,
  ),
): {
  valid: boolean;
  errors: CampaignIntakeErrors;
  firstInvalidSection?: CampaignIntakeSection;
} {
  const enabledSections = new Set(sections);
  const errors: CampaignIntakeErrors = {};
  let firstInvalidSection: CampaignIntakeSection | undefined;

  function addError(
    section: CampaignIntakeSection,
    field: CampaignIntakeField,
    message: string,
  ): void {
    if (!enabledSections.has(section)) {
      return;
    }

    errors[field] = message;

    if (!firstInvalidSection) {
      firstInvalidSection = section;
    }
  }

  if (enabledSections.has("contact")) {
    if (!values.customer.firstName.trim()) {
      addError(
        "contact",
        "customer.firstName",
        "Enter the purchaser's first name.",
      );
    }

    if (!values.customer.lastName.trim()) {
      addError(
        "contact",
        "customer.lastName",
        "Enter the purchaser's last name.",
      );
    }

    if (!isValidEmail(values.customer.email)) {
      addError(
        "contact",
        "customer.email",
        "Enter a valid email address.",
      );
    }

    if (!isValidPhone(values.customer.phone)) {
      addError(
        "contact",
        "customer.phone",
        "Enter a valid phone number.",
      );
    }

    if (!values.customer.country.trim()) {
      addError(
        "contact",
        "customer.country",
        "Enter the purchaser's country.",
      );
    }
  }

  if (enabledSections.has("artist")) {
    if (!values.artist.artistName.trim()) {
      addError(
        "artist",
        "artist.artistName",
        "Enter the artist or brand name.",
      );
    }

    if (!values.artist.artistType) {
      addError(
        "artist",
        "artist.artistType",
        "Select an artist type.",
      );
    }

    if (!values.artist.primaryGenre.trim()) {
      addError(
        "artist",
        "artist.primaryGenre",
        "Enter the artist's primary genre.",
      );
    }

    if (!values.artist.artistCountry.trim()) {
      addError(
        "artist",
        "artist.artistCountry",
        "Enter the artist's primary country or market.",
      );
    }

    const artistUrls: Array<{
      field: CampaignIntakeField;
      value: string;
    }> = [
      {
        field: "artist.primarySocialUrl",
        value: values.artist.primarySocialUrl,
      },
      {
        field: "artist.instagramUrl",
        value: values.artist.instagramUrl,
      },
      {
        field: "artist.tiktokUrl",
        value: values.artist.tiktokUrl,
      },
      {
        field: "artist.youtubeUrl",
        value: values.artist.youtubeUrl,
      },
      {
        field: "artist.websiteUrl",
        value: values.artist.websiteUrl,
      },
    ];

    for (const item of artistUrls) {
      if (item.value.trim() && !isValidUrl(item.value)) {
        addError("artist", item.field, "Enter a complete http or https URL.");
      }
    }
  }

  if (enabledSections.has("release")) {
    if (!values.release.releaseTitle.trim()) {
      addError(
        "release",
        "release.releaseTitle",
        "Enter the release title.",
      );
    }

    if (!values.release.releaseType) {
      addError(
        "release",
        "release.releaseType",
        "Select a release type.",
      );
    }

    if (!values.release.releaseStatus) {
      addError(
        "release",
        "release.releaseStatus",
        "Select the release status.",
      );
    }

    if (
      values.release.releaseStatus === "upcoming" &&
      !values.release.releaseDate
    ) {
      addError(
        "release",
        "release.releaseDate",
        "Enter the upcoming release date.",
      );
    }

    if (!isValidUrl(values.release.releaseUrl)) {
      addError(
        "release",
        "release.releaseUrl",
        "Enter a valid public or private release URL.",
      );
    }

    const releaseUrls: Array<{
      field: CampaignIntakeField;
      value: string;
    }> = [
      {
        field: "release.spotifyUrl",
        value: values.release.spotifyUrl,
      },
      {
        field: "release.appleMusicUrl",
        value: values.release.appleMusicUrl,
      },
      {
        field: "release.youtubeUrl",
        value: values.release.youtubeUrl,
      },
      {
        field: "release.soundCloudUrl",
        value: values.release.soundCloudUrl,
      },
      {
        field: "release.artworkUrl",
        value: values.release.artworkUrl,
      },
      {
        field: "release.alternateVersionUrl",
        value: values.release.alternateVersionUrl,
      },
    ];

    for (const item of releaseUrls) {
      if (item.value.trim() && !isValidUrl(item.value)) {
        addError("release", item.field, "Enter a complete http or https URL.");
      }
    }

    if (!values.release.rightsConfirmed) {
      addError(
        "release",
        "release.rightsConfirmed",
        "Confirm that you own or are authorized to promote this release.",
      );
    }
  }

  if (enabledSections.has("campaign")) {
    if (!values.preferences.primaryGoal) {
      addError(
        "campaign",
        "preferences.primaryGoal",
        "Select the primary campaign goal.",
      );
    }

    if (splitList(values.preferences.targetMarkets).length === 0) {
      addError(
        "campaign",
        "preferences.targetMarkets",
        "Enter at least one target market.",
      );
    }

    if (values.campaignItems.length === 0) {
      addError(
        "campaign",
        "campaignItems",
        "Your cart must contain at least one campaign.",
      );
    }

    values.campaignItems.forEach((item, index) => {
      const field =
        `campaignItems.${index}.campaignUrl` as CampaignIntakeField;

      if (!isValidUrl(item.campaignUrl)) {
        addError(
          "campaign",
          field,
          "Enter the platform-specific song or project URL.",
        );
      }
    });
  }

  if (enabledSections.has("assets")) {
    const assetUrls: Array<{
      field: CampaignIntakeField;
      value: string;
    }> = [
      {
        field: "assets.pressPhotoUrl",
        value: values.assets.pressPhotoUrl,
      },
      {
        field: "assets.electronicPressKitUrl",
        value: values.assets.electronicPressKitUrl,
      },
      {
        field: "assets.musicVideoUrl",
        value: values.assets.musicVideoUrl,
      },
      {
        field: "assets.lyricVideoUrl",
        value: values.assets.lyricVideoUrl,
      },
      {
        field: "assets.visualizerUrl",
        value: values.assets.visualizerUrl,
      },
      {
        field: "assets.shortFormContentUrl",
        value: values.assets.shortFormContentUrl,
      },
      {
        field: "assets.cloudFolderUrl",
        value: values.assets.cloudFolderUrl,
      },
      {
        field: "assets.additionalAssetUrl",
        value: values.assets.additionalAssetUrl,
      },
    ];

    for (const item of assetUrls) {
      if (item.value.trim() && !isValidUrl(item.value)) {
        addError("assets", item.field, "Enter a complete http or https URL.");
      }
    }
  }

  if (enabledSections.has("review")) {
    if (!values.agreements.informationAccurate) {
      addError(
        "review",
        "agreements.informationAccurate",
        "Confirm that the submitted information is accurate.",
      );
    }

    if (!values.agreements.rightsAuthorized) {
      addError(
        "review",
        "agreements.rightsAuthorized",
        "Confirm that you are authorized to promote the supplied materials.",
      );
    }

    if (!values.agreements.campaignTargetsAcknowledged) {
      addError(
        "review",
        "agreements.campaignTargetsAcknowledged",
        "Acknowledge that campaign targets are estimates.",
      );
    }

    if (!values.agreements.termsAccepted) {
      addError(
        "review",
        "agreements.termsAccepted",
        "Accept the Money Records service terms.",
      );
    }

    if (!values.agreements.privacyAccepted) {
      addError(
        "review",
        "agreements.privacyAccepted",
        "Accept the privacy policy.",
      );
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    firstInvalidSection,
  };
}

/* --------------------------------------------------------------------- */
/* Shared Form Controls                                                   */
/* --------------------------------------------------------------------- */

function InputField({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  helper,
  autoComplete,
  required = false,
  disabled = false,
}: InputProps) {
  const inputId = `intake-${name.replaceAll(".", "-")}`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-[10px] font-black uppercase tracking-[0.15em] text-white/55"
      >
        {label}

        {required ? (
          <span className="ml-1 text-[var(--mr-gold-200)]">*</span>
        ) : null}
      </label>

      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${inputId}-error`
            : helper
              ? `${inputId}-helper`
              : undefined
        }
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        className={joinClasses(
          "mt-2 h-12 w-full rounded-2xl border bg-black/25 px-4",
          "text-sm text-[var(--mr-text)] outline-none transition",
          "placeholder:text-white/25",
          "focus:border-[rgba(227,179,77,0.45)]",
          "focus:ring-2 focus:ring-[rgba(227,179,77,0.12)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-400/45"
            : "border-white/[0.09]",
        )}
      />

      {error ? (
        <p
          id={`${inputId}-error`}
          className="mt-2 text-xs leading-5 text-red-300/85"
        >
          {error}
        </p>
      ) : helper ? (
        <p
          id={`${inputId}-helper`}
          className="mt-2 text-xs leading-5 text-white/35"
        >
          {helper}
        </p>
      ) : null}
    </div>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  helper,
  rows = 5,
  required = false,
  disabled = false,
}: TextareaProps) {
  const inputId = `intake-${name.replaceAll(".", "-")}`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-[10px] font-black uppercase tracking-[0.15em] text-white/55"
      >
        {label}

        {required ? (
          <span className="ml-1 text-[var(--mr-gold-200)]">*</span>
        ) : null}
      </label>

      <textarea
        id={inputId}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          onChange(event.target.value)
        }
        className={joinClasses(
          "mt-2 w-full resize-y rounded-2xl border bg-black/25 px-4 py-3",
          "text-sm leading-6 text-[var(--mr-text)] outline-none transition",
          "placeholder:text-white/25",
          "focus:border-[rgba(227,179,77,0.45)]",
          "focus:ring-2 focus:ring-[rgba(227,179,77,0.12)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-400/45"
            : "border-white/[0.09]",
        )}
      />

      {error ? (
        <p className="mt-2 text-xs leading-5 text-red-300/85">
          {error}
        </p>
      ) : helper ? (
        <p className="mt-2 text-xs leading-5 text-white/35">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  placeholder = "Select an option",
  helper,
  required = false,
  disabled = false,
}: SelectProps) {
  const inputId = `intake-${name.replaceAll(".", "-")}`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-[10px] font-black uppercase tracking-[0.15em] text-white/55"
      >
        {label}

        {required ? (
          <span className="ml-1 text-[var(--mr-gold-200)]">*</span>
        ) : null}
      </label>

      <select
        id={inputId}
        name={name}
        value={value}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onChange(event.target.value)
        }
        className={joinClasses(
          "mt-2 h-12 w-full rounded-2xl border bg-[#0b0b0c] px-4",
          "text-sm text-[var(--mr-text)] outline-none transition",
          "focus:border-[rgba(227,179,77,0.45)]",
          "focus:ring-2 focus:ring-[rgba(227,179,77,0.12)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-red-400/45"
            : "border-white/[0.09]",
        )}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error ? (
        <p className="mt-2 text-xs leading-5 text-red-300/85">
          {error}
        </p>
      ) : helper ? (
        <p className="mt-2 text-xs leading-5 text-white/35">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

function CheckboxField({
  name,
  checked,
  onChange,
  label,
  error,
  disabled = false,
}: CheckboxProps) {
  const inputId = `intake-${name.replaceAll(".", "-")}`;

  return (
    <div>
      <label
        htmlFor={inputId}
        className={joinClasses(
          "flex cursor-pointer items-start gap-3 rounded-2xl border p-4",
          "bg-white/[0.025] transition",
          checked
            ? "border-[rgba(227,179,77,0.3)]"
            : "border-white/[0.075]",
          error && "border-red-400/40",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <input
          id={inputId}
          name={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onChange(event.target.checked)
          }
          className="mt-0.5 h-4 w-4 rounded border-white/20 accent-[#d6b35a]"
        />

        <span className="text-xs leading-6 text-white/52">
          {label}
        </span>
      </label>

      {error ? (
        <p className="mt-2 text-xs leading-5 text-red-300/85">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Section Header                                                         */
/* --------------------------------------------------------------------- */

function FormSectionHeader({
  section,
}: {
  section: SectionDefinition;
}) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-xs font-black text-[var(--mr-gold-200)]">
          {section.number}
        </span>

        <div>
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
            Campaign Intake
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
            {section.title}
          </h2>
        </div>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/46">
        {section.description}
      </p>

      <Divider
        className="my-7"
        variant="soft"
      />
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Review Components                                                      */
/* --------------------------------------------------------------------- */

function ReviewBlock({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[22px] border border-white/[0.075] bg-white/[0.025] p-5 sm:p-6">
      <p className="m-0 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)]">
        {eyebrow}
      </p>

      <h3 className="mt-2 text-lg font-black tracking-[-0.025em] text-[var(--mr-text)]">
        {title}
      </h3>

      <div className="mt-5">
        {children}
      </div>
    </div>
  );
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value?.trim()) {
    return null;
  }

  return (
    <div className="flex items-start justify-between gap-5 border-b border-white/[0.055] py-3 first:pt-0 last:border-b-0 last:pb-0">
      <span className="text-[10px] font-black uppercase tracking-[0.12em] text-white/35">
        {label}
      </span>

      <span className="max-w-[65%] text-right text-sm leading-6 text-white/65">
        {value}
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Empty and Loading States                                               */
/* --------------------------------------------------------------------- */

function IntakeLoadingState() {
  return (
    <Card
      padding="lg"
      aria-busy="true"
    >
      <div className="animate-pulse">
        <div className="h-4 w-32 rounded-full bg-white/[0.07]" />
        <div className="mt-4 h-8 w-64 rounded-xl bg-white/[0.07]" />
        <div className="mt-3 h-4 w-full max-w-xl rounded-full bg-white/[0.045]" />

        <Divider
          className="my-8"
          variant="soft"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="h-20 rounded-2xl bg-white/[0.045]" />
          <div className="h-20 rounded-2xl bg-white/[0.045]" />
          <div className="h-20 rounded-2xl bg-white/[0.045]" />
          <div className="h-20 rounded-2xl bg-white/[0.045]" />
        </div>
      </div>
    </Card>
  );
}

function EmptyCartState() {
  return (
    <Card
      variant="featured"
      padding="lg"
      topLine
    >
      <div className="mx-auto max-w-xl py-8 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-[20px] border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
          <CartIcon />
        </span>

        <h2 className="mt-6 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
          Select a Campaign First
        </h2>

        <p className="mt-3 text-sm leading-7 text-white/46">
          Your checkout intake must be connected to at least one Money
          Records campaign service.
        </p>

        <Button
          href="/services"
          variant="primary"
          size="lg"
          rightIcon={<ArrowIcon />}
          className="mt-6"
        >
          Explore Marketing Services
        </Button>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Campaign Intake Form                                                   */
/* --------------------------------------------------------------------- */

export default function CampaignIntakeForm({
  initialValues,
  onSubmit,
  submitLabel = "Continue to Secure Checkout",
  disabled = false,
  isSubmitting = false,
  showCartSummary = true,
  className,
}: CampaignIntakeFormProps) {
  const {
    items,
    itemCount,
    subtotalCents,
    currency,
    isHydrated,
    isEmpty,
  } = useCart();

  const [values, setValues] = useState<CampaignIntakeFormValues>(() =>
    initialValues
      ? cloneFormValues(initialValues)
      : createEmptyCampaignIntakeForm(),
  );

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const [errors, setErrors] = useState<CampaignIntakeErrors>({});

  const [submitError, setSubmitError] = useState("");

  const [internalSubmitting, setInternalSubmitting] = useState(false);

  const busy = disabled || isSubmitting || internalSubmitting;

  const activeSection = SECTIONS[activeSectionIndex];

  const subtotalLabel = useMemo(
    () => formatCartPrice(subtotalCents, currency),
    [currency, subtotalCents],
  );

  /* ------------------------------------------------------------------- */
  /* Synchronize Campaign Items                                          */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    setValues((currentValues) => {
      const existingItems = new Map(
        currentValues.campaignItems.map((item) => [item.sku, item]),
      );

      const nextCampaignItems = items.map((item) => {
        const existing = existingItems.get(item.sku);

        if (existing) {
          return existing;
        }

        return {
          sku: item.sku,
          campaignUrl: "",
          instructions: "",
        };
      });

      const unchanged =
        nextCampaignItems.length === currentValues.campaignItems.length &&
        nextCampaignItems.every(
          (item, index) =>
            item.sku === currentValues.campaignItems[index]?.sku,
        );

      if (unchanged) {
        return currentValues;
      }

      return {
        ...currentValues,
        campaignItems: nextCampaignItems,
      };
    });
  }, [isHydrated, items]);

  /* ------------------------------------------------------------------- */
  /* Error Helpers                                                       */
  /* ------------------------------------------------------------------- */

  function clearError(field: CampaignIntakeField): void {
    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = {
        ...currentErrors,
      };

      delete nextErrors[field];

      return nextErrors;
    });

    setSubmitError("");
  }

  /* ------------------------------------------------------------------- */
  /* Value Updates                                                       */
  /* ------------------------------------------------------------------- */

  function updateCustomer(
    field: keyof CampaignIntakeFormValues["customer"],
    value: string,
  ): void {
    setValues((current) => ({
      ...current,
      customer: {
        ...current.customer,
        [field]: value,
      },
    }));

    clearError(`customer.${field}` as CampaignIntakeField);
  }

  function updateArtist(
    field: keyof CampaignIntakeFormValues["artist"],
    value: string,
  ): void {
    setValues((current) => ({
      ...current,
      artist: {
        ...current.artist,
        [field]: value,
      },
    }));

    clearError(`artist.${field}` as CampaignIntakeField);
  }

  function updateRelease(
    field: keyof CampaignIntakeFormValues["release"],
    value: string | boolean,
  ): void {
    setValues((current) => ({
      ...current,
      release: {
        ...current.release,
        [field]: value,
      },
    }));

    clearError(`release.${field}` as CampaignIntakeField);
  }

  function updatePreferences(
    field: keyof CampaignIntakeFormValues["preferences"],
    value: string,
  ): void {
    setValues((current) => ({
      ...current,
      preferences: {
        ...current.preferences,
        [field]: value,
      },
    }));

    clearError(`preferences.${field}` as CampaignIntakeField);
  }

  function updateAssets(
    field: keyof CampaignIntakeFormValues["assets"],
    value: string,
  ): void {
    setValues((current) => ({
      ...current,
      assets: {
        ...current.assets,
        [field]: value,
      },
    }));

    clearError(`assets.${field}` as CampaignIntakeField);
  }

  function updateAgreement(
    field: keyof CampaignIntakeFormValues["agreements"],
    checked: boolean,
  ): void {
    setValues((current) => ({
      ...current,
      agreements: {
        ...current.agreements,
        [field]: checked,
      },
    }));

    clearError(`agreements.${field}` as CampaignIntakeField);
  }

  function updateCampaignItem(
    index: number,
    field: "campaignUrl" | "instructions",
    value: string,
  ): void {
    setValues((current) => ({
      ...current,
      campaignItems: current.campaignItems.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));

    clearError(`campaignItems.${index}.${field}` as CampaignIntakeField);
  }

  /* ------------------------------------------------------------------- */
  /* Navigation                                                          */
  /* ------------------------------------------------------------------- */

  function goToSection(index: number): void {
    if (busy) {
      return;
    }

    const safeIndex = Math.min(Math.max(index, 0), SECTIONS.length - 1);

    setActiveSectionIndex(safeIndex);
    setSubmitError("");
  }

  function handleBack(): void {
    goToSection(activeSectionIndex - 1);
  }

  function handleNext(): void {
    const validation = validateIntake(values, [activeSection.id]);

    if (!validation.valid) {
      setErrors(validation.errors);
      setSubmitError("Review the highlighted fields before continuing.");
      return;
    }

    setErrors({});
    setSubmitError("");
    goToSection(activeSectionIndex + 1);
  }

  /* ------------------------------------------------------------------- */
  /* Submission                                                          */
  /* ------------------------------------------------------------------- */

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (busy || isEmpty) {
      return;
    }

    const validation = validateIntake(values);

    if (!validation.valid) {
      setErrors(validation.errors);
      setSubmitError(
        "Complete the required fields and agreements before checkout.",
      );

      if (validation.firstInvalidSection) {
        setActiveSectionIndex(
          getSectionIndex(validation.firstInvalidSection),
        );
      }

      return;
    }

    setErrors({});
    setSubmitError("");
    setInternalSubmitting(true);

    try {
      await onSubmit(normalizeCampaignIntake(values), cloneFormValues(values));
    } catch (error) {
      setSubmitError(
        error instanceof Error && error.message
          ? error.message
          : "Checkout could not be started. Please try again.",
      );
    } finally {
      setInternalSubmitting(false);
    }
  }

  /* ------------------------------------------------------------------- */
  /* Initial States                                                      */
  /* ------------------------------------------------------------------- */

  if (!isHydrated) {
    return <IntakeLoadingState />;
  }

  if (isEmpty) {
    return <EmptyCartState />;
  }

  /* ------------------------------------------------------------------- */
  /* Render                                                              */
  /* ------------------------------------------------------------------- */

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={joinClasses("grid gap-6", className)}
    >
      {/* --------------------------------------------------------------- */}
      {/* Progress                                                        */}
      {/* --------------------------------------------------------------- */}

      <Card
        padding="md"
        className="overflow-hidden"
      >
        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-6">
          {SECTIONS.map((section, index) => {
            const active = index === activeSectionIndex;
            const completed = index < activeSectionIndex;

            return (
              <button
                key={section.id}
                type="button"
                disabled={busy}
                onClick={() => goToSection(index)}
                className={joinClasses(
                  "rounded-2xl border p-4 text-left transition",
                  active
                    ? "border-[rgba(227,179,77,0.35)] bg-[rgba(211,154,46,0.075)]"
                    : "border-white/[0.065] bg-white/[0.02] hover:border-white/[0.12]",
                  busy && "cursor-not-allowed opacity-50",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={joinClasses(
                      "grid h-7 w-7 place-items-center rounded-full border",
                      "text-[9px] font-black",
                      active || completed
                        ? "border-[rgba(227,179,77,0.3)] bg-[rgba(211,154,46,0.08)] text-[var(--mr-gold-200)]"
                        : "border-white/10 text-white/35",
                    )}
                  >
                    {completed ? <CheckIcon /> : section.number}
                  </span>

                  {active ? (
                    <span className="text-[8px] font-black uppercase tracking-[0.13em] text-[var(--mr-gold-200)]">
                      Current
                    </span>
                  ) : null}
                </div>

                <p className="mt-3 text-xs font-black text-[var(--mr-text)]">
                  {section.shortTitle}
                </p>
              </button>
            );
          })}
        </div>
      </Card>

      {/* --------------------------------------------------------------- */}
      {/* Cart Summary Strip                                              */}
      {/* --------------------------------------------------------------- */}

      {showCartSummary ? (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.075] bg-white/[0.025] p-4">
            <p className="m-0 text-[9px] font-black uppercase tracking-[0.14em] text-white/35">
              Selected Services
            </p>

            <p className="mt-2 text-lg font-black text-[var(--mr-text)]">
              {itemCount}
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.075] bg-white/[0.025] p-4">
            <p className="m-0 text-[9px] font-black uppercase tracking-[0.14em] text-white/35">
              Campaign Intake
            </p>

            <p className="mt-2 text-lg font-black text-[var(--mr-text)]">
              Required
            </p>
          </div>

          <div className="rounded-2xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.055)] p-4">
            <p className="m-0 text-[9px] font-black uppercase tracking-[0.14em] text-white/35">
              Current Subtotal
            </p>

            <p className="mt-2 text-lg font-black text-[var(--mr-text)]">
              {subtotalLabel}
            </p>
          </div>
        </div>
      ) : null}

      {/* --------------------------------------------------------------- */}
      {/* Active Section                                                  */}
      {/* --------------------------------------------------------------- */}

      <Card
        variant="featured"
        padding="lg"
        topLine
        className="relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[rgba(211,154,46,0.1)] blur-[110px]"
        />

        <div className="relative">
          <FormSectionHeader section={activeSection} />

          {/* Contact */}

          {activeSection.id === "contact" ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                label="First Name"
                name="customer.firstName"
                value={values.customer.firstName}
                onChange={(value) => updateCustomer("firstName", value)}
                error={getFieldError(errors, "customer.firstName")}
                autoComplete="given-name"
                required
                disabled={busy}
              />

              <InputField
                label="Last Name"
                name="customer.lastName"
                value={values.customer.lastName}
                onChange={(value) => updateCustomer("lastName", value)}
                error={getFieldError(errors, "customer.lastName")}
                autoComplete="family-name"
                required
                disabled={busy}
              />

              <InputField
                label="Email Address"
                name="customer.email"
                type="email"
                value={values.customer.email}
                onChange={(value) => updateCustomer("email", value)}
                error={getFieldError(errors, "customer.email")}
                placeholder="artist@example.com"
                autoComplete="email"
                required
                disabled={busy}
              />

              <InputField
                label="Phone Number"
                name="customer.phone"
                type="tel"
                value={values.customer.phone}
                onChange={(value) => updateCustomer("phone", value)}
                error={getFieldError(errors, "customer.phone")}
                autoComplete="tel"
                required
                disabled={busy}
              />

              <InputField
                label="Company, Label, or Management"
                name="customer.companyName"
                value={values.customer.companyName}
                onChange={(value) => updateCustomer("companyName", value)}
                placeholder="Optional"
                autoComplete="organization"
                disabled={busy}
              />

              <InputField
                label="Country"
                name="customer.country"
                value={values.customer.country}
                onChange={(value) => updateCustomer("country", value)}
                error={getFieldError(errors, "customer.country")}
                autoComplete="country-name"
                required
                disabled={busy}
              />

              <div className="sm:col-span-2">
                <InputField
                  label="State, Province, or Region"
                  name="customer.region"
                  value={values.customer.region}
                  onChange={(value) => updateCustomer("region", value)}
                  placeholder="Optional"
                  autoComplete="address-level1"
                  disabled={busy}
                />
              </div>
            </div>
          ) : null}

          {/* Artist */}

          {activeSection.id === "artist" ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                label="Artist or Brand Name"
                name="artist.artistName"
                value={values.artist.artistName}
                onChange={(value) => updateArtist("artistName", value)}
                error={getFieldError(errors, "artist.artistName")}
                required
                disabled={busy}
              />

              <SelectField
                label="Artist Type"
                name="artist.artistType"
                value={values.artist.artistType}
                onChange={(value) => updateArtist("artistType", value)}
                options={ARTIST_TYPE_OPTIONS}
                error={getFieldError(errors, "artist.artistType")}
                required
                disabled={busy}
              />

              <InputField
                label="Primary Genre"
                name="artist.primaryGenre"
                value={values.artist.primaryGenre}
                onChange={(value) => updateArtist("primaryGenre", value)}
                error={getFieldError(errors, "artist.primaryGenre")}
                placeholder="Hip-Hop, Pop, R&B..."
                required
                disabled={busy}
              />

              <InputField
                label="Secondary Genre"
                name="artist.secondaryGenre"
                value={values.artist.secondaryGenre}
                onChange={(value) => updateArtist("secondaryGenre", value)}
                placeholder="Optional"
                disabled={busy}
              />

              <div className="sm:col-span-2">
                <InputField
                  label="Primary Country or Market"
                  name="artist.artistCountry"
                  value={values.artist.artistCountry}
                  onChange={(value) => updateArtist("artistCountry", value)}
                  error={getFieldError(errors, "artist.artistCountry")}
                  required
                  disabled={busy}
                />
              </div>

              <div className="sm:col-span-2">
                <TextareaField
                  label="Short Artist Biography"
                  name="artist.biography"
                  value={values.artist.biography}
                  onChange={(value) => updateArtist("biography", value)}
                  placeholder="Briefly describe the artist, sound, story, and current momentum."
                  rows={5}
                  disabled={busy}
                />
              </div>

              <InputField
                label="Primary Social Profile"
                name="artist.primarySocialUrl"
                type="url"
                value={values.artist.primarySocialUrl}
                onChange={(value) => updateArtist("primarySocialUrl", value)}
                error={getFieldError(errors, "artist.primarySocialUrl")}
                placeholder="https://..."
                disabled={busy}
              />

              <InputField
                label="Instagram URL"
                name="artist.instagramUrl"
                type="url"
                value={values.artist.instagramUrl}
                onChange={(value) => updateArtist("instagramUrl", value)}
                error={getFieldError(errors, "artist.instagramUrl")}
                placeholder="https://instagram.com/..."
                disabled={busy}
              />

              <InputField
                label="TikTok URL"
                name="artist.tiktokUrl"
                type="url"
                value={values.artist.tiktokUrl}
                onChange={(value) => updateArtist("tiktokUrl", value)}
                error={getFieldError(errors, "artist.tiktokUrl")}
                placeholder="https://tiktok.com/@..."
                disabled={busy}
              />

              <InputField
                label="YouTube URL"
                name="artist.youtubeUrl"
                type="url"
                value={values.artist.youtubeUrl}
                onChange={(value) => updateArtist("youtubeUrl", value)}
                error={getFieldError(errors, "artist.youtubeUrl")}
                placeholder="https://youtube.com/..."
                disabled={busy}
              />

              <div className="sm:col-span-2">
                <InputField
                  label="Official Website"
                  name="artist.websiteUrl"
                  type="url"
                  value={values.artist.websiteUrl}
                  onChange={(value) => updateArtist("websiteUrl", value)}
                  error={getFieldError(errors, "artist.websiteUrl")}
                  placeholder="https://..."
                  disabled={busy}
                />
              </div>
            </div>
          ) : null}

          {/* Release */}

          {activeSection.id === "release" ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                label="Release Title"
                name="release.releaseTitle"
                value={values.release.releaseTitle}
                onChange={(value) => updateRelease("releaseTitle", value)}
                error={getFieldError(errors, "release.releaseTitle")}
                required
                disabled={busy}
              />

              <SelectField
                label="Release Type"
                name="release.releaseType"
                value={values.release.releaseType}
                onChange={(value) => updateRelease("releaseType", value)}
                options={RELEASE_TYPE_OPTIONS}
                error={getFieldError(errors, "release.releaseType")}
                required
                disabled={busy}
              />

              <SelectField
                label="Release Status"
                name="release.releaseStatus"
                value={values.release.releaseStatus}
                onChange={(value) => updateRelease("releaseStatus", value)}
                options={RELEASE_STATUS_OPTIONS}
                error={getFieldError(errors, "release.releaseStatus")}
                required
                disabled={busy}
              />

              <InputField
                label="Release Date"
                name="release.releaseDate"
                type="date"
                value={values.release.releaseDate}
                onChange={(value) => updateRelease("releaseDate", value)}
                error={getFieldError(errors, "release.releaseDate")}
                required={values.release.releaseStatus === "upcoming"}
                disabled={busy}
              />

              <div className="sm:col-span-2">
                <InputField
                  label="Primary Release Link"
                  name="release.releaseUrl"
                  type="url"
                  value={values.release.releaseUrl}
                  onChange={(value) => updateRelease("releaseUrl", value)}
                  error={getFieldError(errors, "release.releaseUrl")}
                  placeholder="https://..."
                  helper="Use a public song link, private listening link, or release landing page."
                  required
                  disabled={busy}
                />
              </div>

              <InputField
                label="Spotify URL"
                name="release.spotifyUrl"
                type="url"
                value={values.release.spotifyUrl}
                onChange={(value) => updateRelease("spotifyUrl", value)}
                error={getFieldError(errors, "release.spotifyUrl")}
                placeholder="https://open.spotify.com/..."
                disabled={busy}
              />

              <InputField
                label="Apple Music URL"
                name="release.appleMusicUrl"
                type="url"
                value={values.release.appleMusicUrl}
                onChange={(value) => updateRelease("appleMusicUrl", value)}
                error={getFieldError(errors, "release.appleMusicUrl")}
                placeholder="https://music.apple.com/..."
                disabled={busy}
              />

              <InputField
                label="YouTube URL"
                name="release.youtubeUrl"
                type="url"
                value={values.release.youtubeUrl}
                onChange={(value) => updateRelease("youtubeUrl", value)}
                error={getFieldError(errors, "release.youtubeUrl")}
                placeholder="https://youtube.com/..."
                disabled={busy}
              />

              <InputField
                label="SoundCloud URL"
                name="release.soundCloudUrl"
                type="url"
                value={values.release.soundCloudUrl}
                onChange={(value) => updateRelease("soundCloudUrl", value)}
                error={getFieldError(errors, "release.soundCloudUrl")}
                placeholder="https://soundcloud.com/..."
                disabled={busy}
              />

              <InputField
                label="Artwork URL"
                name="release.artworkUrl"
                type="url"
                value={values.release.artworkUrl}
                onChange={(value) => updateRelease("artworkUrl", value)}
                error={getFieldError(errors, "release.artworkUrl")}
                placeholder="Google Drive, Dropbox, or hosted image"
                disabled={busy}
              />

              <InputField
                label="Alternate or Clean Version"
                name="release.alternateVersionUrl"
                type="url"
                value={values.release.alternateVersionUrl}
                onChange={(value) =>
                  updateRelease("alternateVersionUrl", value)
                }
                error={getFieldError(
                  errors,
                  "release.alternateVersionUrl",
                )}
                placeholder="Optional"
                disabled={busy}
              />

              <InputField
                label="ISRC"
                name="release.isrc"
                value={values.release.isrc}
                onChange={(value) => updateRelease("isrc", value)}
                placeholder="Optional"
                disabled={busy}
              />

              <InputField
                label="UPC or EAN"
                name="release.upc"
                value={values.release.upc}
                onChange={(value) => updateRelease("upc", value)}
                placeholder="Optional"
                disabled={busy}
              />

              <div className="sm:col-span-2">
                <InputField
                  label="Distributor or Current Label"
                  name="release.distributorName"
                  value={values.release.distributorName}
                  onChange={(value) =>
                    updateRelease("distributorName", value)
                  }
                  placeholder="Optional"
                  disabled={busy}
                />
              </div>

              <div className="sm:col-span-2">
                <CheckboxField
                  name="release.rightsConfirmed"
                  checked={values.release.rightsConfirmed}
                  onChange={(checked) =>
                    updateRelease("rightsConfirmed", checked)
                  }
                  error={getFieldError(errors, "release.rightsConfirmed")}
                  disabled={busy}
                  label={
                    <>
                      I confirm that I own this release or have authorization
                      to purchase promotional services for it.
                    </>
                  }
                />
              </div>
            </div>
          ) : null}

          {/* Campaign */}

          {activeSection.id === "campaign" ? (
            <div className="grid gap-7">
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  label="Primary Campaign Goal"
                  name="preferences.primaryGoal"
                  value={values.preferences.primaryGoal}
                  onChange={(value) =>
                    updatePreferences("primaryGoal", value)
                  }
                  options={CAMPAIGN_GOAL_OPTIONS}
                  error={getFieldError(
                    errors,
                    "preferences.primaryGoal",
                  )}
                  required
                  disabled={busy}
                />

                <InputField
                  label="Preferred Start Date"
                  name="preferences.preferredStartDate"
                  type="date"
                  value={values.preferences.preferredStartDate}
                  onChange={(value) =>
                    updatePreferences("preferredStartDate", value)
                  }
                  disabled={busy}
                />

                <div className="sm:col-span-2">
                  <TextareaField
                    label="Campaign Goal Description"
                    name="preferences.goalDescription"
                    value={values.preferences.goalDescription}
                    onChange={(value) =>
                      updatePreferences("goalDescription", value)
                    }
                    placeholder="Describe what a successful campaign would look like for this release."
                    rows={4}
                    disabled={busy}
                  />
                </div>

                <TextareaField
                  label="Target Markets"
                  name="preferences.targetMarkets"
                  value={values.preferences.targetMarkets}
                  onChange={(value) =>
                    updatePreferences("targetMarkets", value)
                  }
                  error={getFieldError(
                    errors,
                    "preferences.targetMarkets",
                  )}
                  placeholder="United States, Atlanta, Miami, United Kingdom..."
                  helper="Separate countries, cities, or regions with commas."
                  rows={4}
                  required
                  disabled={busy}
                />

                <TextareaField
                  label="Similar Artists"
                  name="preferences.similarArtists"
                  value={values.preferences.similarArtists}
                  onChange={(value) =>
                    updatePreferences("similarArtists", value)
                  }
                  placeholder="Artist One, Artist Two, Artist Three"
                  helper="Use artists with a relevant audience or sound."
                  rows={4}
                  disabled={busy}
                />

                <div className="sm:col-span-2">
                  <TextareaField
                    label="Target Audience"
                    name="preferences.targetAudience"
                    value={values.preferences.targetAudience}
                    onChange={(value) =>
                      updatePreferences("targetAudience", value)
                    }
                    placeholder="Describe the age range, interests, listener profile, or fan community."
                    rows={4}
                    disabled={busy}
                  />
                </div>

                <InputField
                  label="Campaign Deadline"
                  name="preferences.deadlineDate"
                  type="date"
                  value={values.preferences.deadlineDate}
                  onChange={(value) =>
                    updatePreferences("deadlineDate", value)
                  }
                  helper="Optional hard deadline or important event date."
                  disabled={busy}
                />

                <div className="sm:col-span-2">
                  <TextareaField
                    label="General Campaign Notes"
                    name="preferences.campaignNotes"
                    value={values.preferences.campaignNotes}
                    onChange={(value) =>
                      updatePreferences("campaignNotes", value)
                    }
                    placeholder="Share any important context, restrictions, priorities, or instructions."
                    rows={5}
                    disabled={busy}
                  />
                </div>
              </div>

              <Divider
                label="Selected Campaign Links"
                variant="soft"
                spacing="md"
              />

              <div className="grid gap-5">
                {items.map((item, index) => {
                  const campaignItem = values.campaignItems[index];

                  if (!campaignItem) {
                    return null;
                  }

                  const campaignUrlField =
                    `campaignItems.${index}.campaignUrl` as CampaignIntakeField;

                  const suggestedUrl = getSuggestedCampaignUrl(item, values);

                  return (
                    <div
                      key={item.sku}
                      className="rounded-[22px] border border-white/[0.075] bg-white/[0.025] p-5 sm:p-6"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <span
                            className="inline-flex rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.13em]"
                            style={{
                              color: item.accent,
                              borderColor: `color-mix(in srgb, ${item.accent} 30%, transparent)`,
                              background: item.accentSoft,
                            }}
                          >
                            {item.platformShortName}
                          </span>

                          <h3 className="mt-3 text-lg font-black tracking-[-0.03em] text-[var(--mr-text)]">
                            {item.campaignName}
                          </h3>

                          <p className="mt-2 text-xs leading-5 text-white/40">
                            Target: {item.campaignTargetLabel}
                          </p>
                        </div>

                        <span className="text-xl font-black tracking-[-0.04em] text-[var(--mr-text)]">
                          {formatCartPrice(item.priceCents, item.currency)}
                        </span>
                      </div>

                      <div className="mt-6 grid gap-5">
                        <div>
                          <InputField
                            label={`${item.platformShortName} Campaign Link`}
                            name={`campaignItems.${index}.campaignUrl`}
                            type="url"
                            value={campaignItem.campaignUrl}
                            onChange={(value) =>
                              updateCampaignItem(index, "campaignUrl", value)
                            }
                            error={getFieldError(
                              errors,
                              campaignUrlField,
                            )}
                            placeholder="https://..."
                            required
                            disabled={busy}
                          />

                          {suggestedUrl ? (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() =>
                                updateCampaignItem(
                                  index,
                                  "campaignUrl",
                                  suggestedUrl,
                                )
                              }
                              className="mt-3 text-[10px] font-black uppercase tracking-[0.13em] text-[var(--mr-gold-200)] hover:underline disabled:opacity-50"
                            >
                              Use the matching release link
                            </button>
                          ) : null}
                        </div>

                        <TextareaField
                          label="Campaign-Specific Instructions"
                          name={`campaignItems.${index}.instructions`}
                          value={campaignItem.instructions}
                          onChange={(value) =>
                            updateCampaignItem(index, "instructions", value)
                          }
                          placeholder={`Optional instructions for the ${item.platformShortName} campaign.`}
                          rows={4}
                          disabled={busy}
                        />
                      </div>
                    </div>
                  );
                })}

                {getFieldError(errors, "campaignItems") ? (
                  <p className="text-xs leading-5 text-red-300/85">
                    {getFieldError(errors, "campaignItems")}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* Assets */}

          {activeSection.id === "assets" ? (
            <div>
              <div className="mb-6 rounded-2xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.045)] p-4">
                <p className="m-0 text-xs leading-6 text-white/48">
                  These fields are optional, but strong creative assets can
                  help Money Records review and prepare your campaign.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  label="Press Photo URL"
                  name="assets.pressPhotoUrl"
                  type="url"
                  value={values.assets.pressPhotoUrl}
                  onChange={(value) =>
                    updateAssets("pressPhotoUrl", value)
                  }
                  error={getFieldError(errors, "assets.pressPhotoUrl")}
                  placeholder="https://..."
                  disabled={busy}
                />

                <InputField
                  label="Electronic Press Kit URL"
                  name="assets.electronicPressKitUrl"
                  type="url"
                  value={values.assets.electronicPressKitUrl}
                  onChange={(value) =>
                    updateAssets("electronicPressKitUrl", value)
                  }
                  error={getFieldError(
                    errors,
                    "assets.electronicPressKitUrl",
                  )}
                  placeholder="https://..."
                  disabled={busy}
                />

                <InputField
                  label="Music Video URL"
                  name="assets.musicVideoUrl"
                  type="url"
                  value={values.assets.musicVideoUrl}
                  onChange={(value) =>
                    updateAssets("musicVideoUrl", value)
                  }
                  error={getFieldError(errors, "assets.musicVideoUrl")}
                  placeholder="https://..."
                  disabled={busy}
                />

                <InputField
                  label="Lyric Video URL"
                  name="assets.lyricVideoUrl"
                  type="url"
                  value={values.assets.lyricVideoUrl}
                  onChange={(value) =>
                    updateAssets("lyricVideoUrl", value)
                  }
                  error={getFieldError(errors, "assets.lyricVideoUrl")}
                  placeholder="https://..."
                  disabled={busy}
                />

                <InputField
                  label="Visualizer URL"
                  name="assets.visualizerUrl"
                  type="url"
                  value={values.assets.visualizerUrl}
                  onChange={(value) =>
                    updateAssets("visualizerUrl", value)
                  }
                  error={getFieldError(errors, "assets.visualizerUrl")}
                  placeholder="https://..."
                  disabled={busy}
                />

                <InputField
                  label="Short-Form Content URL"
                  name="assets.shortFormContentUrl"
                  type="url"
                  value={values.assets.shortFormContentUrl}
                  onChange={(value) =>
                    updateAssets("shortFormContentUrl", value)
                  }
                  error={getFieldError(
                    errors,
                    "assets.shortFormContentUrl",
                  )}
                  placeholder="TikTok, Reels, Shorts, or folder"
                  disabled={busy}
                />

                <InputField
                  label="Cloud Folder URL"
                  name="assets.cloudFolderUrl"
                  type="url"
                  value={values.assets.cloudFolderUrl}
                  onChange={(value) =>
                    updateAssets("cloudFolderUrl", value)
                  }
                  error={getFieldError(errors, "assets.cloudFolderUrl")}
                  placeholder="Google Drive, Dropbox, or OneDrive"
                  disabled={busy}
                />

                <InputField
                  label="Additional Asset URL"
                  name="assets.additionalAssetUrl"
                  type="url"
                  value={values.assets.additionalAssetUrl}
                  onChange={(value) =>
                    updateAssets("additionalAssetUrl", value)
                  }
                  error={getFieldError(
                    errors,
                    "assets.additionalAssetUrl",
                  )}
                  placeholder="https://..."
                  disabled={busy}
                />
              </div>
            </div>
          ) : null}

          {/* Review */}

          {activeSection.id === "review" ? (
            <div className="grid gap-7">
              <div className="grid gap-5 lg:grid-cols-2">
                <ReviewBlock
                  eyebrow="Purchaser"
                  title="Contact Information"
                >
                  <ReviewRow
                    label="Name"
                    value={`${values.customer.firstName} ${values.customer.lastName}`}
                  />

                  <ReviewRow
                    label="Email"
                    value={values.customer.email}
                  />

                  <ReviewRow
                    label="Phone"
                    value={values.customer.phone}
                  />

                  <ReviewRow
                    label="Company"
                    value={values.customer.companyName}
                  />

                  <ReviewRow
                    label="Location"
                    value={[
                      values.customer.region,
                      values.customer.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  />
                </ReviewBlock>

                <ReviewBlock
                  eyebrow="Artist"
                  title="Artist Profile"
                >
                  <ReviewRow
                    label="Artist"
                    value={values.artist.artistName}
                  />

                  <ReviewRow
                    label="Genre"
                    value={[
                      values.artist.primaryGenre,
                      values.artist.secondaryGenre,
                    ]
                      .filter(Boolean)
                      .join(" / ")}
                  />

                  <ReviewRow
                    label="Market"
                    value={values.artist.artistCountry}
                  />
                </ReviewBlock>

                <ReviewBlock
                  eyebrow="Release"
                  title="Release Details"
                >
                  <ReviewRow
                    label="Title"
                    value={values.release.releaseTitle}
                  />

                  <ReviewRow
                    label="Type"
                    value={values.release.releaseType}
                  />

                  <ReviewRow
                    label="Status"
                    value={values.release.releaseStatus}
                  />

                  <ReviewRow
                    label="Release Date"
                    value={values.release.releaseDate}
                  />

                  <ReviewRow
                    label="Primary Link"
                    value={values.release.releaseUrl}
                  />
                </ReviewBlock>

                <ReviewBlock
                  eyebrow="Campaign"
                  title="Campaign Direction"
                >
                  <ReviewRow
                    label="Primary Goal"
                    value={
                      values.preferences.primaryGoal
                        ? CAMPAIGN_GOAL_LABELS[
                            values.preferences.primaryGoal
                          ]
                        : ""
                    }
                  />

                  <ReviewRow
                    label="Target Markets"
                    value={values.preferences.targetMarkets}
                  />

                  <ReviewRow
                    label="Start Date"
                    value={values.preferences.preferredStartDate}
                  />

                  <ReviewRow
                    label="Deadline"
                    value={values.preferences.deadlineDate}
                  />
                </ReviewBlock>
              </div>

              <ReviewBlock
                eyebrow="Selected Services"
                title={`${itemCount} Campaign Service${
                  itemCount === 1 ? "" : "s"
                }`}
              >
                <div className="grid gap-3">
                  {items.map((item) => (
                    <div
                      key={item.sku}
                      className="flex flex-col gap-3 rounded-2xl border border-white/[0.065] bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="m-0 text-xs font-black text-[var(--mr-text)]">
                          {item.campaignName}
                        </p>

                        <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/35">
                          {item.platformShortName} ·{" "}
                          {item.campaignTargetLabel}
                        </p>
                      </div>

                      <span className="text-lg font-black text-[var(--mr-text)]">
                        {formatCartPrice(item.priceCents, item.currency)}
                      </span>
                    </div>
                  ))}

                  <div className="mt-2 flex items-center justify-between rounded-2xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.055)] p-5">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--mr-gold-200)]">
                      Order Subtotal
                    </span>

                    <span className="text-2xl font-black tracking-[-0.045em] text-[var(--mr-text)]">
                      {subtotalLabel}
                    </span>
                  </div>
                </div>
              </ReviewBlock>

              <div>
                <p className="m-0 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                  Required Agreements
                </p>

                <div className="mt-4 grid gap-3">
                  <CheckboxField
                    name="agreements.informationAccurate"
                    checked={values.agreements.informationAccurate}
                    onChange={(checked) =>
                      updateAgreement("informationAccurate", checked)
                    }
                    error={getFieldError(
                      errors,
                      "agreements.informationAccurate",
                    )}
                    disabled={busy}
                    label="I confirm that the contact, artist, release, campaign, and asset information I submitted is accurate."
                  />

                  <CheckboxField
                    name="agreements.rightsAuthorized"
                    checked={values.agreements.rightsAuthorized}
                    onChange={(checked) =>
                      updateAgreement("rightsAuthorized", checked)
                    }
                    error={getFieldError(
                      errors,
                      "agreements.rightsAuthorized",
                    )}
                    disabled={busy}
                    label="I confirm that I own or am authorized to promote the music, artwork, videos, links, and other materials supplied."
                  />

                  <CheckboxField
                    name="agreements.campaignTargetsAcknowledged"
                    checked={
                      values.agreements.campaignTargetsAcknowledged
                    }
                    onChange={(checked) =>
                      updateAgreement(
                        "campaignTargetsAcknowledged",
                        checked,
                      )
                    }
                    error={getFieldError(
                      errors,
                      "agreements.campaignTargetsAcknowledged",
                    )}
                    disabled={busy}
                    label="I understand that campaign numbers represent estimated promotional targets and do not guarantee streams, followers, placements, revenue, chart positions, virality, or other results."
                  />

                  <CheckboxField
                    name="agreements.termsAccepted"
                    checked={values.agreements.termsAccepted}
                    onChange={(checked) =>
                      updateAgreement("termsAccepted", checked)
                    }
                    error={getFieldError(
                      errors,
                      "agreements.termsAccepted",
                    )}
                    disabled={busy}
                    label={
                      <>
                        I accept the Money Records service terms and campaign
                        fulfillment standards.
                      </>
                    }
                  />

                  <CheckboxField
                    name="agreements.privacyAccepted"
                    checked={values.agreements.privacyAccepted}
                    onChange={(checked) =>
                      updateAgreement("privacyAccepted", checked)
                    }
                    error={getFieldError(
                      errors,
                      "agreements.privacyAccepted",
                    )}
                    disabled={busy}
                    label="I accept the Money Records privacy policy and authorize the submitted information to be used for order processing and campaign fulfillment."
                  />

                  <CheckboxField
                    name="agreements.marketingConsent"
                    checked={values.agreements.marketingConsent}
                    onChange={(checked) =>
                      updateAgreement("marketingConsent", checked)
                    }
                    disabled={busy}
                    label="I would like to receive optional Money Records service, release, and marketing updates."
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.045)] p-5">
                <span className="mt-0.5 text-[var(--mr-gold-200)]">
                  <LockIcon />
                </span>

                <p className="m-0 text-xs leading-6 text-white/44">
                  Your campaign SKUs, availability, and prices will be
                  verified again by the server before the Stripe Checkout
                  session is created.
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </Card>

      {/* --------------------------------------------------------------- */}
      {/* Form Error                                                      */}
      {/* --------------------------------------------------------------- */}

      {submitError ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-400/25 bg-red-400/[0.055] p-4 text-red-200/85"
        >
          <span className="mt-0.5">
            <AlertIcon />
          </span>

          <p className="m-0 text-xs leading-6">
            {submitError}
          </p>
        </div>
      ) : null}

      {/* --------------------------------------------------------------- */}
      {/* Navigation                                                      */}
      {/* --------------------------------------------------------------- */}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {activeSectionIndex > 0 ? (
            <Button
              type="button"
              variant="secondary"
              size="lg"
              leftIcon={<BackIcon />}
              onClick={handleBack}
              disabled={busy}
              className="w-full sm:w-auto"
            >
              Previous Step
            </Button>
          ) : (
            <Button
              href="/cart"
              variant="secondary"
              size="lg"
              leftIcon={<BackIcon />}
              className="w-full sm:w-auto"
            >
              Return to Cart
            </Button>
          )}
        </div>

        {activeSection.id === "review" ? (
          <Button
            type="submit"
            variant="primary"
            size="lg"
            rightIcon={<LockIcon />}
            disabled={busy}
            aria-busy={busy}
            className="w-full sm:w-auto"
          >
            {busy ? "Preparing Checkout..." : submitLabel}
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            size="lg"
            rightIcon={<ArrowIcon />}
            onClick={handleNext}
            disabled={busy}
            className="w-full sm:w-auto"
          >
            Continue
          </Button>
        )}
      </div>
    </form>
  );
}