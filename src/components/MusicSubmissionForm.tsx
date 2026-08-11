"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Music Submission Form                                ┃
   ┃ File   : src/components/MusicSubmissionForm.tsx                      ┃
   ┃ Role   : Artist, music, release, links, goals, rights, and consent   ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type MusicSubmissionFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  artistName: string;
  location: string;

  primaryGenre: string;
  secondaryGenres: string[];

  releaseTitle: string;
  releaseType: string;
  releaseStatus: string;
  releaseDate: string;

  musicLink: string;

  spotifyUrl: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  soundcloudUrl: string;
  audiomackUrl: string;

  instagramUrl: string;
  tiktokUrl: string;
  websiteUrl: string;

  goals: string[];

  monthlyListeners: string;
  socialFollowing: string;

  artistStory: string;
  message: string;

  ownsRights: boolean;
  acceptsSubmissionTerms: boolean;
  consent: boolean;

  /**
   * Anti-spam honeypot.
   * This must remain empty.
   */
  website: string;
};

type MusicSubmissionFieldName =
  | keyof MusicSubmissionFormState
  | "form";

type MusicSubmissionFieldErrors =
  Partial<
    Record<
      MusicSubmissionFieldName,
      string
    >
  >;

type SubmissionStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

type ApiSuccessResponse = {
  success?: boolean;
  ok?: boolean;
  message?: string;
  requestId?: string;
  submissionId?: string;
};

type ApiErrorResponse = {
  success?: boolean;
  ok?: boolean;
  error?: string;
  message?: string;
  code?: string;

  fieldErrors?: Record<
    string,
    string
  >;
};

type SelectOption = {
  value: string;
  label: string;
};

type ToggleOption = {
  value: string;
  label: string;
  description?: string;
};

export type MusicSubmissionFormProps = {
  /**
   * API endpoint receiving the final JSON submission.
   *
   * @default "/api/submissions"
   */
  endpoint?: string;

  title?: ReactNode;

  description?: ReactNode;

  submitLabel?: string;

  /**
   * Optional preselected goal.
   */
  defaultGoal?: string;

  /**
   * Optional preselected genre.
   */
  defaultGenre?: string;

  showHeader?: boolean;

  className?: string;
};

/* --------------------------------------------------------------------- */
/* Initial State                                                          */
/* --------------------------------------------------------------------- */

const INITIAL_FORM_STATE:
  MusicSubmissionFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    artistName: "",
    location: "",

    primaryGenre: "",
    secondaryGenres: [],

    releaseTitle: "",
    releaseType: "",
    releaseStatus: "",
    releaseDate: "",

    musicLink: "",

    spotifyUrl: "",
    appleMusicUrl: "",
    youtubeUrl: "",
    soundcloudUrl: "",
    audiomackUrl: "",

    instagramUrl: "",
    tiktokUrl: "",
    websiteUrl: "",

    goals: [],

    monthlyListeners: "",
    socialFollowing: "",

    artistStory: "",
    message: "",

    ownsRights: false,
    acceptsSubmissionTerms: false,
    consent: false,

    website: "",
  };

/* --------------------------------------------------------------------- */
/* Form Options                                                           */
/* --------------------------------------------------------------------- */

const GENRE_OPTIONS:
  readonly SelectOption[] = [
    {
      value: "alternative",
      label: "Alternative",
    },
    {
      value: "blues",
      label: "Blues",
    },
    {
      value: "christian-gospel",
      label: "Christian / Gospel",
    },
    {
      value: "country",
      label: "Country",
    },
    {
      value: "dance",
      label: "Dance",
    },
    {
      value: "electronic",
      label: "Electronic",
    },
    {
      value: "folk",
      label: "Folk",
    },
    {
      value: "funk",
      label: "Funk",
    },
    {
      value: "hip-hop",
      label: "Hip-Hop",
    },
    {
      value: "house",
      label: "House",
    },
    {
      value: "indie",
      label: "Indie",
    },
    {
      value: "jazz",
      label: "Jazz",
    },
    {
      value: "latin",
      label: "Latin",
    },
    {
      value: "metal",
      label: "Metal",
    },
    {
      value: "pop",
      label: "Pop",
    },
    {
      value: "punk",
      label: "Punk",
    },
    {
      value: "r-and-b",
      label: "R&B",
    },
    {
      value: "rap",
      label: "Rap",
    },
    {
      value: "reggae",
      label: "Reggae",
    },
    {
      value: "rock",
      label: "Rock",
    },
    {
      value: "soul",
      label: "Soul",
    },
    {
      value: "world",
      label: "World",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

const RELEASE_TYPE_OPTIONS:
  readonly SelectOption[] = [
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
      value: "demo",
      label: "Demo",
    },
    {
      value: "unreleased-record",
      label: "Unreleased Record",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

const RELEASE_STATUS_OPTIONS:
  readonly SelectOption[] = [
    {
      value: "unreleased",
      label: "Unreleased",
    },
    {
      value: "released",
      label: "Already Released",
    },
    {
      value: "scheduled",
      label: "Scheduled for Release",
    },
    {
      value: "demo",
      label: "Demo / Work in Progress",
    },
  ];

const GOAL_OPTIONS:
  readonly ToggleOption[] = [
    {
      value:
        "record-label-consideration",

      label:
        "Record Label Consideration",

      description:
        "Introduce your music and artist brand to the Money Records team.",
    },
    {
      value:
        "artist-development",

      label:
        "Artist Development",

      description:
        "Build positioning, branding, rollout strategy, and long-term growth.",
    },
    {
      value:
        "distribution",

      label:
        "Distribution",

      description:
        "Explore release distribution and catalog support.",
    },
    {
      value:
        "marketing",

      label:
        "Music Marketing",

      description:
        "Build visibility around an existing or upcoming release.",
    },
    {
      value:
        "press-pr",

      label:
        "Press & PR",

      description:
        "Explore press, media, publication, and release-story opportunities.",
    },
    {
      value:
        "playlist-marketing",

      label:
        "Playlist Marketing",

      description:
        "Explore streaming-platform campaign support.",
    },
    {
      value:
        "social-media-growth",

      label:
        "Social Media Growth",

      description:
        "Build visibility across social and short-form platforms.",
    },
    {
      value:
        "vevo",

      label:
        "VEVO",

      description:
        "Explore VEVO eligibility, video distribution, and rollout support.",
    },
    {
      value:
        "radio",

      label:
        "Radio",

      description:
        "Explore radio-focused promotional opportunities.",
    },
    {
      value:
        "artist-branding",

      label:
        "Artist Branding",

      description:
        "Develop professional positioning, visuals, and presentation.",
    },
    {
      value:
        "release-strategy",

      label:
        "Release Strategy",

      description:
        "Build a coordinated plan around your next release.",
    },
    {
      value:
        "multiple-services",

      label:
        "Multiple Services",

      description:
        "Build a larger campaign across several Money Records services.",
    },
  ];

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
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

function SendIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
    >
      <path
        d="M20 4L10.2 13.8M20 4L14 20L10.2 13.8L4 10L20 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArtistIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <circle
        cx="12"
        cy="8"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M5.5 20C6.2 16.8 8.6 15 12 15C15.4 15 17.8 16.8 18.5 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
    >
      <path
        d="M9 18V7L18 5V16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="6.5"
        cy="18"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="15.5"
        cy="16"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M9.5 14.5L14.5 9.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M7.5 17H6.5C4.6 17 3 15.4 3 13.5C3 12.5 3.4 11.7 4 11L7 8C8.4 6.6 10.6 6.6 12 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M16.5 7H17.5C19.4 7 21 8.6 21 10.5C21 11.5 20.6 12.3 20 13L17 16C15.6 17.4 13.4 17.4 12 16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="12"
        cy="12"
        r="1.2"
        fill="currentColor"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
    >
      <path
        d="M12 3.5L19 6.2V11.4C19 15.6 16.4 18.8 12 20.5C7.6 18.8 5 15.6 5 11.4V6.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M8.8 12L11 14.2L15.5 9.7"
        stroke="currentColor"
        strokeWidth="1.7"
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
      width="15"
      height="15"
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

function AlertIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
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
        cy="17"
        r="0.9"
        fill="currentColor"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        className="opacity-20"
      />

      <path
        d="M21 12A9 9 0 0 0 12 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/* Utilities                                                              */
/* --------------------------------------------------------------------- */

function joinClasses(
  ...classes: Array<
    string |
    false |
    null |
    undefined
  >
): string {
  return classes
    .filter(Boolean)
    .join(" ");
}

function sanitizeOption(
  value:
    | string
    | undefined,
): string {
  return value?.trim() ?? "";
}

function createInitialFormState({
  defaultGoal,
  defaultGenre,
}: {
  defaultGoal?: string;
  defaultGenre?: string;
}): MusicSubmissionFormState {
  const goal =
    sanitizeOption(
      defaultGoal,
    );

  return {
    ...INITIAL_FORM_STATE,

    primaryGenre:
      sanitizeOption(
        defaultGenre,
      ),

    goals:
      goal
        ? [goal]
        : [],
  };
}

function getFieldError(
  errors:
    MusicSubmissionFieldErrors,

  field:
    MusicSubmissionFieldName,
): string | undefined {
  return errors[field];
}

function createApiFieldErrors(
  fieldErrors:
    | Record<string, string>
    | undefined,
): MusicSubmissionFieldErrors {
  if (!fieldErrors) {
    return {};
  }

  const output:
    MusicSubmissionFieldErrors =
      {};

  for (
    const [
      field,
      message,
    ] of Object.entries(
      fieldErrors,
    )
  ) {
    if (
      typeof message !==
        "string" ||
      !message.trim()
    ) {
      continue;
    }

    output[
      field as
        MusicSubmissionFieldName
    ] =
      message.trim();
  }

  return output;
}

function isValidEmail(
  value: string,
): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value.trim(),
  );
}

function isValidUrlValue(
  value: string,
): boolean {
  const trimmed =
    value.trim();

  if (!trimmed) {
    return false;
  }

  const candidate =
    /^[a-z][a-z\d+\-.]*:\/\//i.test(
      trimmed,
    )
      ? trimmed
      : `https://${trimmed}`;

  try {
    const url =
      new URL(candidate);

    return (
      url.protocol ===
        "http:" ||
      url.protocol ===
        "https:"
    );
  } catch {
    return false;
  }
}

function validateOptionalUrl(
  value: string,
): boolean {
  return (
    !value.trim() ||
    isValidUrlValue(
      value,
    )
  );
}

function validateClientForm(
  form:
    MusicSubmissionFormState,
): MusicSubmissionFieldErrors {
  const errors:
    MusicSubmissionFieldErrors =
      {};

  if (!form.firstName.trim()) {
    errors.firstName =
      "Enter your first name.";
  }

  if (!form.lastName.trim()) {
    errors.lastName =
      "Enter your last name.";
  }

  if (!form.email.trim()) {
    errors.email =
      "Enter your email address.";
  } else if (
    !isValidEmail(
      form.email,
    )
  ) {
    errors.email =
      "Enter a valid email address.";
  }

  if (!form.artistName.trim()) {
    errors.artistName =
      "Enter your artist or group name.";
  }

  if (!form.primaryGenre) {
    errors.primaryGenre =
      "Select your primary genre.";
  }

  if (
    form.secondaryGenres
      .length > 5
  ) {
    errors.secondaryGenres =
      "Select no more than 5 secondary genres.";
  }

  if (!form.releaseTitle.trim()) {
    errors.releaseTitle =
      "Enter your song or release title.";
  }

  if (!form.releaseType) {
    errors.releaseType =
      "Select a release type.";
  }

  if (!form.releaseStatus) {
    errors.releaseStatus =
      "Select a release status.";
  }

  if (
    form.releaseStatus ===
      "scheduled" &&
    !form.releaseDate
  ) {
    errors.releaseDate =
      "Enter the scheduled release date.";
  }

  if (!form.musicLink.trim()) {
    errors.musicLink =
      "Provide a private or public link to your music.";
  } else if (
    !isValidUrlValue(
      form.musicLink,
    )
  ) {
    errors.musicLink =
      "Enter a valid music link.";
  }

  const optionalUrls: Array<{
    field:
      keyof Pick<
        MusicSubmissionFormState,
        | "spotifyUrl"
        | "appleMusicUrl"
        | "youtubeUrl"
        | "soundcloudUrl"
        | "audiomackUrl"
        | "instagramUrl"
        | "tiktokUrl"
        | "websiteUrl"
      >;

    label: string;
  }> = [
    {
      field:
        "spotifyUrl",

      label:
        "Spotify",
    },
    {
      field:
        "appleMusicUrl",

      label:
        "Apple Music",
    },
    {
      field:
        "youtubeUrl",

      label:
        "YouTube",
    },
    {
      field:
        "soundcloudUrl",

      label:
        "SoundCloud",
    },
    {
      field:
        "audiomackUrl",

      label:
        "Audiomack",
    },
    {
      field:
        "instagramUrl",

      label:
        "Instagram",
    },
    {
      field:
        "tiktokUrl",

      label:
        "TikTok",
    },
    {
      field:
        "websiteUrl",

      label:
        "website",
    },
  ];

  for (
    const item of
    optionalUrls
  ) {
    if (
      !validateOptionalUrl(
        form[item.field],
      )
    ) {
      errors[
        item.field
      ] =
        `Enter a valid ${item.label} URL.`;
    }
  }

  if (
    form.goals.length ===
    0
  ) {
    errors.goals =
      "Select at least one goal.";
  } else if (
    form.goals.length > 8
  ) {
    errors.goals =
      "Select no more than 8 goals.";
  }

  if (
    form.monthlyListeners &&
    !/^\d+$/.test(
      form.monthlyListeners
        .replace(/[,\s]/g, ""),
    )
  ) {
    errors.monthlyListeners =
      "Enter a valid monthly listener count.";
  }

  if (
    form.socialFollowing &&
    !/^\d+$/.test(
      form.socialFollowing
        .replace(/[,\s]/g, ""),
    )
  ) {
    errors.socialFollowing =
      "Enter a valid social following count.";
  }

  const artistStoryLength =
    form.artistStory
      .trim()
      .length;

  if (!artistStoryLength) {
    errors.artistStory =
      "Tell us about your artist story and direction.";
  } else if (
    artistStoryLength < 50
  ) {
    errors.artistStory =
      "Please provide at least 50 characters about your artist story.";
  }

  if (!form.ownsRights) {
    errors.ownsRights =
      "Confirm that you own or control the rights needed to submit this music.";
  }

  if (
    !form.acceptsSubmissionTerms
  ) {
    errors.acceptsSubmissionTerms =
      "You must accept the music submission terms.";
  }

  if (!form.consent) {
    errors.consent =
      "You must agree to be contacted about your submission.";
  }

  return errors;
}

function getFirstErrorField(
  errors:
    MusicSubmissionFieldErrors,
): MusicSubmissionFieldName | null {
  const fieldOrder:
    MusicSubmissionFieldName[] =
      [
        "firstName",
        "lastName",
        "email",
        "phone",

        "artistName",
        "location",

        "primaryGenre",
        "secondaryGenres",

        "releaseTitle",
        "releaseType",
        "releaseStatus",
        "releaseDate",

        "musicLink",

        "spotifyUrl",
        "appleMusicUrl",
        "youtubeUrl",
        "soundcloudUrl",
        "audiomackUrl",

        "instagramUrl",
        "tiktokUrl",
        "websiteUrl",

        "goals",

        "monthlyListeners",
        "socialFollowing",

        "artistStory",
        "message",

        "ownsRights",
        "acceptsSubmissionTerms",
        "consent",

        "form",
      ];

  return (
    fieldOrder.find(
      (field) =>
        Boolean(
          errors[field],
        ),
    ) ??
    null
  );
}

function focusField(
  field:
    MusicSubmissionFieldName | null,
): void {
  if (
    !field ||
    field === "form"
  ) {
    return;
  }

  const element =
    document.querySelector<
      HTMLElement
    >(
      `[name="${field}"]`,
    );

  element?.focus();
}

/* --------------------------------------------------------------------- */
/* Shared Styles                                                          */
/* --------------------------------------------------------------------- */

const BASE_FIELD_CLASS = [
  "min-h-12 w-full rounded-2xl border",
  "bg-black/25 px-4 text-sm text-[var(--mr-text)]",
  "outline-none transition duration-200",
  "placeholder:text-white/24",
  "focus:border-[rgba(227,179,77,0.42)]",
  "focus:bg-[rgba(211,154,46,0.025)]",
  "focus:ring-2",
  "focus:ring-[rgba(227,179,77,0.10)]",
].join(" ");

const NORMAL_FIELD_CLASS =
  "border-white/[0.085]";

const ERROR_FIELD_CLASS = [
  "border-red-400/45",
  "bg-red-400/[0.025]",
  "focus:border-red-400/65",
  "focus:ring-red-400/10",
].join(" ");

/* --------------------------------------------------------------------- */
/* Field Label                                                            */
/* --------------------------------------------------------------------- */

function FieldLabel({
  htmlFor,
  children,
  required = false,
  optional = false,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center justify-between gap-3"
    >
      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/58">
        {children}

        {required ? (
          <span className="ml-1 text-[var(--mr-gold-200)]">
            *
          </span>
        ) : null}
      </span>

      {optional ? (
        <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/24">
          Optional
        </span>
      ) : null}
    </label>
  );
}

/* --------------------------------------------------------------------- */
/* Field Error                                                            */
/* --------------------------------------------------------------------- */

function FieldError({
  id,
  message,
}: {
  id: string;

  message:
    | string
    | undefined;
}) {
  if (!message) {
    return null;
  }

  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-start gap-2 text-xs leading-5 text-red-300"
    >
      <span className="mt-[1px] flex-[0_0_auto]">
        <AlertIcon />
      </span>

      <span>
        {message}
      </span>
    </p>
  );
}

/* --------------------------------------------------------------------- */
/* Text Field                                                             */
/* --------------------------------------------------------------------- */

function TextField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  inputMode,
  placeholder,
  autoComplete,
  required = false,
  optional = false,
  maxLength,
}: {
  id: string;

  name:
    keyof MusicSubmissionFormState;

  label: ReactNode;

  value: string;

  onChange: (
    event:
      ChangeEvent<HTMLInputElement>,
  ) => void;

  error?: string;

  type?: string;

  inputMode?:
    | "text"
    | "email"
    | "tel"
    | "url"
    | "numeric";

  placeholder?: string;

  autoComplete?: string;

  required?: boolean;

  optional?: boolean;

  maxLength?: number;
}) {
  const errorId =
    `${id}-error`;

  return (
    <div>
      <FieldLabel
        htmlFor={id}
        required={required}
        optional={optional}
      >
        {label}
      </FieldLabel>

      <input
        id={id}
        name={name}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        maxLength={maxLength}
        aria-invalid={
          Boolean(error)
        }
        aria-describedby={
          error
            ? errorId
            : undefined
        }
        className={joinClasses(
          BASE_FIELD_CLASS,

          error
            ? ERROR_FIELD_CLASS
            : NORMAL_FIELD_CLASS,
        )}
      />

      <FieldError
        id={errorId}
        message={error}
      />
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Select Field                                                           */
/* --------------------------------------------------------------------- */

function SelectField({
  id,
  name,
  label,
  value,
  onChange,
  options,
  error,
  placeholder,
  required = false,
  optional = false,
}: {
  id: string;

  name:
    keyof MusicSubmissionFormState;

  label: ReactNode;

  value: string;

  onChange: (
    event:
      ChangeEvent<HTMLSelectElement>,
  ) => void;

  options:
    readonly SelectOption[];

  error?: string;

  placeholder: string;

  required?: boolean;

  optional?: boolean;
}) {
  const errorId =
    `${id}-error`;

  return (
    <div>
      <FieldLabel
        htmlFor={id}
        required={required}
        optional={optional}
      >
        {label}
      </FieldLabel>

      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={
            Boolean(error)
          }
          aria-describedby={
            error
              ? errorId
              : undefined
          }
          className={joinClasses(
            BASE_FIELD_CLASS,

            "appearance-none pr-11",

            value
              ? "text-[var(--mr-text)]"
              : "text-white/35",

            error
              ? ERROR_FIELD_CLASS
              : NORMAL_FIELD_CLASS,
          )}
        >
          <option
            value=""
            className="bg-[#09090b] text-white"
          >
            {placeholder}
          </option>

          {options.map(
            (option) => (
              <option
                key={
                  option.value
                }
                value={
                  option.value
                }
                className="bg-[#09090b] text-white"
              >
                {option.label}
              </option>
            ),
          )}
        </select>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/35"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
          >
            <path
              d="M7 9L12 14L17 9"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <FieldError
        id={errorId}
        message={error}
      />
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Step Heading                                                           */
/* --------------------------------------------------------------------- */

function StepHeading({
  number,
  icon,
  eyebrow,
  title,
  description,
}: {
  number: string;

  icon: ReactNode;

  eyebrow: string;

  title: string;

  description: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5">
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 flex-[0_0_44px] place-items-center rounded-2xl border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)]">
          {icon}
        </span>

        <div>
          <p className="m-0 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
            {eyebrow}
          </p>

          <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
            {title}
          </h3>

          <p className="mt-2 max-w-2xl text-xs leading-6 text-white/40">
            {description}
          </p>
        </div>
      </div>

      <span className="hidden h-9 min-w-9 place-items-center rounded-full border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.045)] text-[9px] font-black text-[var(--mr-gold-200)] sm:grid">
        {number}
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Agreement Checkbox                                                     */
/* --------------------------------------------------------------------- */

function AgreementCheckbox({
  id,
  name,
  checked,
  onChange,
  title,
  description,
  error,
}: {
  id: string;

  name:
    | "ownsRights"
    | "acceptsSubmissionTerms"
    | "consent";

  checked: boolean;

  onChange: (
    event:
      ChangeEvent<HTMLInputElement>,
  ) => void;

  title: ReactNode;

  description: ReactNode;

  error?: string;
}) {
  const errorId =
    `${id}-error`;

  return (
    <div>
      <label
        htmlFor={id}
        className={joinClasses(
          "group flex cursor-pointer items-start gap-4 rounded-[22px] border p-4 transition",

          error
            ? "border-red-400/25 bg-red-400/[0.035]"
            : checked
              ? "border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.045)]"
              : "border-white/[0.065] bg-white/[0.02] hover:border-[rgba(227,179,77,0.2)]",
        )}
      >
        <span className="relative mt-0.5 flex h-6 w-6 flex-[0_0_24px] items-center justify-center">
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            aria-invalid={
              Boolean(error)
            }
            aria-describedby={
              error
                ? errorId
                : undefined
            }
            className="peer absolute h-6 w-6 cursor-pointer appearance-none rounded-md border border-white/15 bg-black/30 transition checked:border-[var(--mr-gold-300)] checked:bg-[var(--mr-gold-300)] focus:outline-none focus:ring-2 focus:ring-[rgba(227,179,77,0.2)]"
          />

          <span className="pointer-events-none relative z-[1] scale-0 text-black transition peer-checked:scale-100">
            <CheckIcon />
          </span>
        </span>

        <span>
          <span className="block text-sm font-bold leading-6 text-white/66">
            {title}
          </span>

          <span className="mt-1 block text-xs leading-6 text-white/34">
            {description}
          </span>
        </span>
      </label>

      <FieldError
        id={errorId}
        message={error}
      />
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Success State                                                          */
/* --------------------------------------------------------------------- */

function SubmissionSuccess({
  requestId,
  onReset,
}: {
  requestId?: string;

  onReset: () => void;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="relative overflow-hidden rounded-[30px] border border-emerald-300/20 bg-[linear-gradient(145deg,rgba(16,185,129,0.055),rgba(255,255,255,0.018))] p-7 text-center sm:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-300/[0.07] blur-[105px]"
      />

      <div className="relative">
        <span className="mx-auto grid h-18 w-18 place-items-center rounded-[24px] border border-emerald-300/25 bg-emerald-300/[0.07] text-emerald-300">
          <CheckIcon />
        </span>

        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.19em] text-emerald-300">
          Music Submission Received
        </p>

        <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl">
          Your Music Is With the Team.
        </h3>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/48">
          Money Records has received your submission. The team can review
          your music, release information, artist story, official links, and
          requested services.
        </p>

        {requestId ? (
          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-white/[0.07] bg-black/25 px-4 py-3">
            <p className="m-0 text-[8px] font-black uppercase tracking-[0.15em] text-white/30">
              Submission Reference
            </p>

            <p className="mt-1 break-all text-xs font-bold text-white/50">
              {requestId}
            </p>
          </div>
        ) : null}

        <div className="mx-auto mt-7 max-w-2xl rounded-[22px] border border-white/[0.065] bg-white/[0.022] p-5 text-left">
          <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)]">
            What Happens Next
          </p>

          <div className="mt-4 grid gap-3">
            {[
              "The Money Records team reviews the artist and release information.",
              "Your submitted music and official links are reviewed.",
              "If there is a relevant opportunity, the team may contact you using the information provided.",
            ].map(
              (
                item,
                index,
              ) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <span className="grid h-6 w-6 flex-[0_0_24px] place-items-center rounded-full border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[8px] font-black text-[var(--mr-gold-200)]">
                    {index + 1}
                  </span>

                  <p className="text-xs leading-6 text-white/45">
                    {item}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/artists"
            className={[
              "inline-flex min-h-12 items-center justify-center gap-2 rounded-full",
              "border border-[rgba(227,179,77,0.32)]",
              "bg-[linear-gradient(135deg,rgba(239,202,112,0.98),rgba(190,128,35,0.96))]",
              "px-6 text-[10px] font-black uppercase tracking-[0.14em] text-black",
              "transition hover:brightness-110",
            ].join(" ")}
          >
            Explore Artists
            <ArrowIcon />
          </a>

          <button
            type="button"
            onClick={onReset}
            className={[
              "inline-flex min-h-12 items-center justify-center rounded-full",
              "border border-white/[0.09] bg-white/[0.035]",
              "px-6 text-[10px] font-black uppercase tracking-[0.14em] text-white/65",
              "transition hover:border-[rgba(227,179,77,0.26)]",
              "hover:bg-[rgba(211,154,46,0.06)]",
              "hover:text-[var(--mr-gold-100)]",
            ].join(" ")}
          >
            Submit Another Track
          </button>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-[9px] font-bold uppercase leading-5 tracking-[0.11em] text-white/25">
          Submission does not guarantee signing, representation,
          distribution, campaign approval, placement, streams, views,
          press coverage, radio play, or a response within a specific time.
        </p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Main Component                                                         */
/* --------------------------------------------------------------------- */

export default function MusicSubmissionForm({
  endpoint = "/api/submissions",

  title = (
    <>
      Submit Your Music.{" "}
      <span className="mr-text-gradient">
        Show Us the Vision.
      </span>
    </>
  ),

  description =
    "Send Money Records your strongest music, artist information, release details, official links, campaign goals, and the story behind your brand.",

  submitLabel =
    "Submit Music",

  defaultGoal,

  defaultGenre,

  showHeader = true,

  className,
}: MusicSubmissionFormProps) {
  const formRef =
    useRef<HTMLFormElement>(
      null,
    );

  const [
    form,
    setForm,
  ] =
    useState<MusicSubmissionFormState>(
      () =>
        createInitialFormState({
          defaultGoal,
          defaultGenre,
        }),
    );

  const [
    fieldErrors,
    setFieldErrors,
  ] =
    useState<MusicSubmissionFieldErrors>(
      {},
    );

  const [
    status,
    setStatus,
  ] =
    useState<SubmissionStatus>(
      "idle",
    );

  const [
    formMessage,
    setFormMessage,
  ] =
    useState("");

  const [
    requestId,
    setRequestId,
  ] =
    useState<
      string | undefined
    >();

  /* ------------------------------------------------------------------- */
  /* Completion                                                          */
  /* ------------------------------------------------------------------- */

  const completionPercent =
    useMemo(() => {
      const requiredChecks = [
        Boolean(
          form.firstName.trim(),
        ),

        Boolean(
          form.lastName.trim(),
        ),

        Boolean(
          form.email.trim(),
        ),

        Boolean(
          form.artistName.trim(),
        ),

        Boolean(
          form.primaryGenre,
        ),

        Boolean(
          form.releaseTitle.trim(),
        ),

        Boolean(
          form.releaseType,
        ),

        Boolean(
          form.releaseStatus,
        ),

        Boolean(
          form.musicLink.trim(),
        ),

        form.goals.length > 0,

        form.artistStory
          .trim()
          .length >= 50,

        form.ownsRights,

        form.acceptsSubmissionTerms,

        form.consent,
      ];

      const completed =
        requiredChecks.filter(
          Boolean,
        ).length;

      return Math.round(
        (
          completed /
          requiredChecks.length
        ) *
          100,
      );
    }, [form]);

  /* ------------------------------------------------------------------- */
  /* Error Management                                                    */
  /* ------------------------------------------------------------------- */

  function clearFieldError(
    field:
      MusicSubmissionFieldName,
  ): void {
    setFieldErrors(
      (
        currentErrors,
      ) => {
        if (
          !currentErrors[
            field
          ] &&
          !currentErrors.form
        ) {
          return currentErrors;
        }

        const nextErrors = {
          ...currentErrors,
        };

        delete nextErrors[
          field
        ];

        delete nextErrors.form;

        return nextErrors;
      },
    );

    if (
      status === "error"
    ) {
      setStatus("idle");
      setFormMessage("");
    }
  }

  /* ------------------------------------------------------------------- */
  /* Text Changes                                                        */
  /* ------------------------------------------------------------------- */

  function handleTextChange(
    event:
      ChangeEvent<
        HTMLInputElement |
        HTMLTextAreaElement
      >,
  ): void {
    const {
      name,
      value,
    } =
      event.target;

    const field =
      name as
        keyof MusicSubmissionFormState;

    setForm(
      (currentForm) => ({
        ...currentForm,

        [field]:
          value,
      }),
    );

    clearFieldError(
      field,
    );
  }

  /* ------------------------------------------------------------------- */
  /* Select Changes                                                      */
  /* ------------------------------------------------------------------- */

  function handleSelectChange(
    event:
      ChangeEvent<HTMLSelectElement>,
  ): void {
    const {
      name,
      value,
    } =
      event.target;

    const field =
      name as
        keyof MusicSubmissionFormState;

    setForm(
      (currentForm) => ({
        ...currentForm,

        [field]:
          value,
      }),
    );

    clearFieldError(
      field,
    );
  }

  /* ------------------------------------------------------------------- */
  /* Agreement Changes                                                   */
  /* ------------------------------------------------------------------- */

  function handleAgreementChange(
    event:
      ChangeEvent<HTMLInputElement>,
  ): void {
    const {
      name,
      checked,
    } =
      event.target;

    const field =
      name as
        | "ownsRights"
        | "acceptsSubmissionTerms"
        | "consent";

    setForm(
      (currentForm) => ({
        ...currentForm,

        [field]:
          checked,
      }),
    );

    clearFieldError(
      field,
    );
  }

  /* ------------------------------------------------------------------- */
  /* Secondary Genres                                                    */
  /* ------------------------------------------------------------------- */

  function toggleSecondaryGenre(
    genre: string,
  ): void {
    setForm(
      (currentForm) => {
        const exists =
          currentForm
            .secondaryGenres
            .includes(
              genre,
            );

        const nextGenres =
          exists
            ? currentForm
                .secondaryGenres
                .filter(
                  (item) =>
                    item !==
                    genre,
                )
            : [
                ...currentForm
                  .secondaryGenres,

                genre,
              ];

        return {
          ...currentForm,

          secondaryGenres:
            nextGenres,
        };
      },
    );

    clearFieldError(
      "secondaryGenres",
    );
  }

  /* ------------------------------------------------------------------- */
  /* Goals                                                               */
  /* ------------------------------------------------------------------- */

  function toggleGoal(
    goal: string,
  ): void {
    setForm(
      (currentForm) => {
        const exists =
          currentForm.goals.includes(
            goal,
          );

        return {
          ...currentForm,

          goals:
            exists
              ? currentForm.goals.filter(
                  (item) =>
                    item !==
                    goal,
                )
              : [
                  ...currentForm.goals,

                  goal,
                ],
        };
      },
    );

    clearFieldError(
      "goals",
    );
  }

  /* ------------------------------------------------------------------- */
  /* Reset                                                               */
  /* ------------------------------------------------------------------- */

  function resetForm(): void {
    setForm(
      createInitialFormState({
        defaultGoal,
        defaultGenre,
      }),
    );

    setFieldErrors({});
    setFormMessage("");
    setRequestId(
      undefined,
    );
    setStatus("idle");

    window.setTimeout(
      () => {
        formRef.current
          ?.querySelector<
            HTMLInputElement
          >(
            '[name="firstName"]',
          )
          ?.focus();
      },
      0,
    );
  }

  /* ------------------------------------------------------------------- */
  /* Submit                                                              */
  /* ------------------------------------------------------------------- */

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (
      status ===
      "submitting"
    ) {
      return;
    }

    setFormMessage("");
    setRequestId(
      undefined,
    );

    const clientErrors =
      validateClientForm(
        form,
      );

    if (
      Object.keys(
        clientErrors,
      ).length > 0
    ) {
      setFieldErrors(
        clientErrors,
      );

      setStatus(
        "error",
      );

      setFormMessage(
        "Please review the highlighted fields before submitting your music.",
      );

      const firstErrorField =
        getFirstErrorField(
          clientErrors,
        );

      window.setTimeout(
        () => {
          focusField(
            firstErrorField,
          );
        },
        0,
      );

      return;
    }

    setFieldErrors({});
    setStatus(
      "submitting",
    );

    try {
      const response =
        await fetch(
          endpoint,
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body:
              JSON.stringify({
                firstName:
                  form.firstName,

                lastName:
                  form.lastName,

                email:
                  form.email,

                phone:
                  form.phone,

                artistName:
                  form.artistName,

                location:
                  form.location,

                primaryGenre:
                  form.primaryGenre,

                secondaryGenres:
                  form.secondaryGenres,

                releaseTitle:
                  form.releaseTitle,

                releaseType:
                  form.releaseType,

                releaseStatus:
                  form.releaseStatus,

                releaseDate:
                  form.releaseDate,

                musicLink:
                  form.musicLink,

                spotifyUrl:
                  form.spotifyUrl,

                appleMusicUrl:
                  form.appleMusicUrl,

                youtubeUrl:
                  form.youtubeUrl,

                soundcloudUrl:
                  form.soundcloudUrl,

                audiomackUrl:
                  form.audiomackUrl,

                instagramUrl:
                  form.instagramUrl,

                tiktokUrl:
                  form.tiktokUrl,

                websiteUrl:
                  form.websiteUrl,

                goals:
                  form.goals,

                monthlyListeners:
                  form.monthlyListeners,

                socialFollowing:
                  form.socialFollowing,

                artistStory:
                  form.artistStory,

                message:
                  form.message,

                ownsRights:
                  form.ownsRights,

                acceptsSubmissionTerms:
                  form
                    .acceptsSubmissionTerms,

                consent:
                  form.consent,

                website:
                  form.website,
              }),
          },
        );

      let responseData:
        | ApiSuccessResponse
        | ApiErrorResponse =
          {};

      try {
        responseData =
          await response.json();
      } catch {
        responseData = {};
      }

      if (!response.ok) {
        const errorResponse =
          responseData as
            ApiErrorResponse;

        const apiErrors =
          createApiFieldErrors(
            errorResponse
              .fieldErrors,
          );

        setFieldErrors(
          apiErrors,
        );

        setStatus(
          "error",
        );

        setFormMessage(
          errorResponse.error ||
            errorResponse.message ||
            "Your music submission could not be sent. Please review the form and try again.",
        );

        const firstErrorField =
          getFirstErrorField(
            apiErrors,
          );

        window.setTimeout(
          () => {
            focusField(
              firstErrorField,
            );
          },
          0,
        );

        return;
      }

      const successResponse =
        responseData as
          ApiSuccessResponse;

      setRequestId(
        successResponse
          .requestId ??
          successResponse
            .submissionId,
      );

      setFormMessage(
        successResponse
          .message ||
          "Your music submission has been received.",
      );

      setStatus(
        "success",
      );

      window.setTimeout(
        () => {
          formRef.current
            ?.scrollIntoView({
              behavior:
                "smooth",

              block:
                "start",
            });
        },
        0,
      );
    } catch {
      setStatus(
        "error",
      );

      setFormMessage(
        "We could not connect to the Money Records submission service. Please try again.",
      );
    }
  }

  /* ------------------------------------------------------------------- */
  /* Success View                                                        */
  /* ------------------------------------------------------------------- */

  if (
    status ===
    "success"
  ) {
    return (
      <div
        className={className}
      >
        <SubmissionSuccess
          requestId={
            requestId
          }
          onReset={
            resetForm
          }
        />
      </div>
    );
  }

  /* ------------------------------------------------------------------- */
  /* Render                                                              */
  /* ------------------------------------------------------------------- */

  return (
    <div
      className={className}
    >
      {/* --------------------------------------------------------------- */}
      {/* Header                                                          */}
      {/* --------------------------------------------------------------- */}

      {showHeader ? (
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
              <MusicIcon />
            </span>

            <div>
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Artist Submissions
              </p>

              <h2 className="mt-2 text-2xl font-black leading-tight tracking-[-0.045em] text-[var(--mr-text)] sm:text-3xl">
                {title}
              </h2>
            </div>
          </div>

          {description ? (
            <p className="mt-5 max-w-4xl text-sm leading-7 text-white/48 sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* --------------------------------------------------------------- */}
      {/* Form                                                            */}
      {/* --------------------------------------------------------------- */}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="relative"
      >
        {/* ------------------------------------------------------------- */}
        {/* Spam Honeypot                                                */}
        {/* ------------------------------------------------------------- */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
        >
          <label htmlFor="submission-website">
            Website
          </label>

          <input
            id="submission-website"
            type="text"
            name="website"
            value={
              form.website
            }
            onChange={
              handleTextChange
            }
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Progress                                                      */}
        {/* ------------------------------------------------------------- */}

        <div className="mb-7 rounded-[22px] border border-white/[0.065] bg-white/[0.022] p-4">
          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="m-0 text-[8px] font-black uppercase tracking-[0.16em] text-white/30">
                Submission Completion
              </p>

              <p className="mt-1 text-xs font-bold text-white/48">
                Required fields and confirmations
              </p>
            </div>

            <span className="text-sm font-black text-[var(--mr-gold-200)]">
              {completionPercent}%
            </span>
          </div>

          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.055]">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,#b9822d,#efd482)] transition-[width] duration-300"
              style={{
                width:
                  `${completionPercent}%`,
              }}
            />
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Form Error                                                    */}
        {/* ------------------------------------------------------------- */}

        {status ===
        "error" ? (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-7 flex items-start gap-3 rounded-[20px] border border-red-400/20 bg-red-400/[0.045] p-4"
          >
            <span className="mt-0.5 flex-[0_0_auto] text-red-300">
              <AlertIcon />
            </span>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-red-300">
                Review Required
              </p>

              <p className="mt-1 text-sm leading-6 text-red-100/70">
                {formMessage}
              </p>
            </div>
          </div>
        ) : null}

        <fieldset
          disabled={
            status ===
            "submitting"
          }
          className="m-0 min-w-0 border-0 p-0"
        >
          {/* ----------------------------------------------------------- */}
          {/* Step 01 — Contact                                          */}
          {/* ----------------------------------------------------------- */}

          <section className="rounded-[28px] border border-white/[0.07] bg-white/[0.022] p-5 sm:p-6">
            <StepHeading
              number="01"
              icon={
                <ArtistIcon />
              }
              eyebrow="Step 01"
              title="Your Information"
              description="Tell us who is submitting the music and how the Money Records team can contact you."
            />

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <TextField
                id="submission-first-name"
                name="firstName"
                label="First Name"
                value={
                  form.firstName
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "firstName",
                )}
                placeholder="First name"
                autoComplete="given-name"
                required
                maxLength={80}
              />

              <TextField
                id="submission-last-name"
                name="lastName"
                label="Last Name"
                value={
                  form.lastName
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "lastName",
                )}
                placeholder="Last name"
                autoComplete="family-name"
                required
                maxLength={80}
              />

              <TextField
                id="submission-email"
                name="email"
                label="Email Address"
                value={
                  form.email
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "email",
                )}
                type="email"
                inputMode="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                maxLength={254}
              />

              <TextField
                id="submission-phone"
                name="phone"
                label="Phone Number"
                value={
                  form.phone
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "phone",
                )}
                type="tel"
                inputMode="tel"
                placeholder="(555) 555-5555"
                autoComplete="tel"
                optional
                maxLength={40}
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Step 02 — Artist                                            */}
          {/* ----------------------------------------------------------- */}

          <section className="mt-5 rounded-[28px] border border-white/[0.07] bg-white/[0.022] p-5 sm:p-6">
            <StepHeading
              number="02"
              icon={
                <ArtistIcon />
              }
              eyebrow="Step 02"
              title="Artist Profile"
              description="Tell us who the artist is, where they are based, and how the music should be categorized."
            />

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <TextField
                id="submission-artist-name"
                name="artistName"
                label="Artist / Group Name"
                value={
                  form.artistName
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "artistName",
                )}
                placeholder="Your public artist name"
                required
                maxLength={160}
              />

              <TextField
                id="submission-location"
                name="location"
                label="City / Location"
                value={
                  form.location
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "location",
                )}
                placeholder="Miami, FL"
                optional
                maxLength={160}
              />

              <SelectField
                id="submission-primary-genre"
                name="primaryGenre"
                label="Primary Genre"
                value={
                  form.primaryGenre
                }
                onChange={
                  handleSelectChange
                }
                options={
                  GENRE_OPTIONS
                }
                error={getFieldError(
                  fieldErrors,
                  "primaryGenre",
                )}
                placeholder="Select primary genre"
                required
              />
            </div>

            {/* Secondary genres */}

            <div className="mt-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/58">
                    Secondary Genres
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/30">
                    Optional — select up to 5.
                  </p>
                </div>

                <span className="text-[9px] font-black uppercase tracking-[0.12em] text-[var(--mr-gold-200)]">
                  {
                    form
                      .secondaryGenres
                      .length
                  }
                  /5
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {GENRE_OPTIONS
                  .filter(
                    (option) =>
                      option.value !==
                      form.primaryGenre,
                  )
                  .map(
                    (option) => {
                      const selected =
                        form.secondaryGenres.includes(
                          option.value,
                        );

                      return (
                        <button
                          key={
                            option.value
                          }
                          type="button"
                          name="secondaryGenres"
                          aria-pressed={
                            selected
                          }
                          onClick={() =>
                            toggleSecondaryGenre(
                              option.value,
                            )
                          }
                          disabled={
                            !selected &&
                            form
                              .secondaryGenres
                              .length >= 5
                          }
                          className={joinClasses(
                            "inline-flex min-h-9 items-center gap-2 rounded-full border px-4",
                            "text-[9px] font-black uppercase tracking-[0.12em]",
                            "transition duration-200",
                            "disabled:cursor-not-allowed disabled:opacity-35",

                            selected
                              ? "border-[rgba(227,179,77,0.34)] bg-[rgba(211,154,46,0.09)] text-[var(--mr-gold-100)]"
                              : "border-white/[0.075] bg-white/[0.025] text-white/42 hover:border-[rgba(227,179,77,0.2)] hover:text-white/65",
                          )}
                        >
                          {selected ? (
                            <CheckIcon />
                          ) : null}

                          {
                            option.label
                          }
                        </button>
                      );
                    },
                  )}
              </div>

              <FieldError
                id="secondary-genres-error"
                message={getFieldError(
                  fieldErrors,
                  "secondaryGenres",
                )}
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Step 03 — Release                                           */}
          {/* ----------------------------------------------------------- */}

          <section className="mt-5 rounded-[28px] border border-white/[0.07] bg-white/[0.022] p-5 sm:p-6">
            <StepHeading
              number="03"
              icon={
                <MusicIcon />
              }
              eyebrow="Step 03"
              title="Release Information"
              description="Tell us which song or project you want the team to review."
            />

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <TextField
                id="submission-release-title"
                name="releaseTitle"
                label="Song / Release Title"
                value={
                  form.releaseTitle
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "releaseTitle",
                )}
                placeholder="Release title"
                required
                maxLength={200}
              />

              <SelectField
                id="submission-release-type"
                name="releaseType"
                label="Release Type"
                value={
                  form.releaseType
                }
                onChange={
                  handleSelectChange
                }
                options={
                  RELEASE_TYPE_OPTIONS
                }
                error={getFieldError(
                  fieldErrors,
                  "releaseType",
                )}
                placeholder="Select release type"
                required
              />

              <SelectField
                id="submission-release-status"
                name="releaseStatus"
                label="Release Status"
                value={
                  form.releaseStatus
                }
                onChange={
                  handleSelectChange
                }
                options={
                  RELEASE_STATUS_OPTIONS
                }
                error={getFieldError(
                  fieldErrors,
                  "releaseStatus",
                )}
                placeholder="Select release status"
                required
              />

              <TextField
                id="submission-release-date"
                name="releaseDate"
                label="Release Date"
                value={
                  form.releaseDate
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "releaseDate",
                )}
                type="date"
                required={
                  form.releaseStatus ===
                  "scheduled"
                }
                optional={
                  form.releaseStatus !==
                  "scheduled"
                }
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Step 04 — Music Link                                        */}
          {/* ----------------------------------------------------------- */}

          <section className="mt-5 rounded-[28px] border border-[rgba(227,179,77,0.16)] bg-[rgba(211,154,46,0.025)] p-5 sm:p-6">
            <StepHeading
              number="04"
              icon={
                <LinkIcon />
              }
              eyebrow="Step 04"
              title="Music & Streaming Links"
              description="Provide one required music link plus any official streaming destinations already available."
            />

            <div className="mt-7">
              <TextField
                id="submission-music-link"
                name="musicLink"
                label="Primary Music Link"
                value={
                  form.musicLink
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "musicLink",
                )}
                type="url"
                inputMode="url"
                placeholder="Private SoundCloud, Dropbox, Google Drive, YouTube, smart link, etc."
                required
                maxLength={2048}
              />

              <div className="mt-3 rounded-2xl border border-white/[0.06] bg-black/20 p-4">
                <p className="text-xs leading-6 text-white/38">
                  Make sure the Money Records team can access the link without
                  requesting permission. Private listening links are fine as
                  long as they are accessible.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <TextField
                id="submission-spotify"
                name="spotifyUrl"
                label="Spotify"
                value={
                  form.spotifyUrl
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "spotifyUrl",
                )}
                type="url"
                inputMode="url"
                placeholder="https://open.spotify.com/..."
                optional
                maxLength={2048}
              />

              <TextField
                id="submission-apple-music"
                name="appleMusicUrl"
                label="Apple Music"
                value={
                  form.appleMusicUrl
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "appleMusicUrl",
                )}
                type="url"
                inputMode="url"
                placeholder="https://music.apple.com/..."
                optional
                maxLength={2048}
              />

              <TextField
                id="submission-youtube"
                name="youtubeUrl"
                label="YouTube"
                value={
                  form.youtubeUrl
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "youtubeUrl",
                )}
                type="url"
                inputMode="url"
                placeholder="https://youtube.com/..."
                optional
                maxLength={2048}
              />

              <TextField
                id="submission-soundcloud"
                name="soundcloudUrl"
                label="SoundCloud"
                value={
                  form.soundcloudUrl
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "soundcloudUrl",
                )}
                type="url"
                inputMode="url"
                placeholder="https://soundcloud.com/..."
                optional
                maxLength={2048}
              />

              <TextField
                id="submission-audiomack"
                name="audiomackUrl"
                label="Audiomack"
                value={
                  form.audiomackUrl
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "audiomackUrl",
                )}
                type="url"
                inputMode="url"
                placeholder="https://audiomack.com/..."
                optional
                maxLength={2048}
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Step 05 — Social Links                                      */}
          {/* ----------------------------------------------------------- */}

          <section className="mt-5 rounded-[28px] border border-white/[0.07] bg-white/[0.022] p-5 sm:p-6">
            <StepHeading
              number="05"
              icon={
                <LinkIcon />
              }
              eyebrow="Step 05"
              title="Artist & Social Links"
              description="Share the profiles that best represent your current audience, branding, and online presence."
            />

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <TextField
                id="submission-instagram"
                name="instagramUrl"
                label="Instagram"
                value={
                  form.instagramUrl
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "instagramUrl",
                )}
                type="url"
                inputMode="url"
                placeholder="https://instagram.com/..."
                optional
                maxLength={2048}
              />

              <TextField
                id="submission-tiktok"
                name="tiktokUrl"
                label="TikTok"
                value={
                  form.tiktokUrl
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "tiktokUrl",
                )}
                type="url"
                inputMode="url"
                placeholder="https://tiktok.com/@..."
                optional
                maxLength={2048}
              />

              <TextField
                id="submission-artist-website"
                name="websiteUrl"
                label="Artist Website"
                value={
                  form.websiteUrl
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "websiteUrl",
                )}
                type="url"
                inputMode="url"
                placeholder="https://yourartistwebsite.com"
                optional
                maxLength={2048}
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Step 06 — Goals                                             */}
          {/* ----------------------------------------------------------- */}

          <section className="mt-5 rounded-[28px] border border-white/[0.07] bg-white/[0.022] p-5 sm:p-6">
            <StepHeading
              number="06"
              icon={
                <TargetIcon />
              }
              eyebrow="Step 06"
              title="What Are You Looking For?"
              description="Select the opportunities and services that best match your current goals."
            />

            <div className="mt-7 flex items-center justify-between gap-4">
              <p className="text-xs leading-6 text-white/38">
                Select at least one and no more than 8.
              </p>

              <span className="text-[9px] font-black uppercase tracking-[0.12em] text-[var(--mr-gold-200)]">
                {
                  form.goals
                    .length
                }
                /8
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {GOAL_OPTIONS.map(
                (option) => {
                  const selected =
                    form.goals.includes(
                      option.value,
                    );

                  return (
                    <button
                      key={
                        option.value
                      }
                      type="button"
                      name="goals"
                      aria-pressed={
                        selected
                      }
                      disabled={
                        !selected &&
                        form.goals
                          .length >= 8
                      }
                      onClick={() =>
                        toggleGoal(
                          option.value,
                        )
                      }
                      className={joinClasses(
                        "group relative min-h-[118px] rounded-[22px] border p-4 text-left",
                        "transition duration-200",
                        "disabled:cursor-not-allowed disabled:opacity-35",

                        selected
                          ? "border-[rgba(227,179,77,0.34)] bg-[rgba(211,154,46,0.08)]"
                          : "border-white/[0.065] bg-white/[0.02] hover:border-[rgba(227,179,77,0.2)] hover:bg-[rgba(211,154,46,0.035)]",
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={joinClasses(
                            "grid h-7 w-7 flex-[0_0_28px] place-items-center rounded-full border transition",

                            selected
                              ? "border-[rgba(227,179,77,0.3)] bg-[var(--mr-gold-300)] text-black"
                              : "border-white/10 bg-white/[0.025] text-white/25",
                          )}
                        >
                          {selected ? (
                            <CheckIcon />
                          ) : null}
                        </span>
                      </div>

                      <p
                        className={joinClasses(
                          "mt-4 text-sm font-black",

                          selected
                            ? "text-[var(--mr-gold-100)]"
                            : "text-white/65",
                        )}
                      >
                        {
                          option.label
                        }
                      </p>

                      {option.description ? (
                        <p className="mt-2 text-[11px] leading-5 text-white/34">
                          {
                            option.description
                          }
                        </p>
                      ) : null}
                    </button>
                  );
                },
              )}
            </div>

            <FieldError
              id="submission-goals-error"
              message={getFieldError(
                fieldErrors,
                "goals",
              )}
            />
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Step 07 — Audience                                          */}
          {/* ----------------------------------------------------------- */}

          <section className="mt-5 rounded-[28px] border border-white/[0.07] bg-white/[0.022] p-5 sm:p-6">
            <StepHeading
              number="07"
              icon={
                <TargetIcon />
              }
              eyebrow="Step 07"
              title="Current Audience"
              description="These numbers are optional, but they help the team understand your current stage."
            />

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <TextField
                id="submission-monthly-listeners"
                name="monthlyListeners"
                label="Monthly Listeners"
                value={
                  form.monthlyListeners
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "monthlyListeners",
                )}
                inputMode="numeric"
                placeholder="Example: 25000"
                optional
                maxLength={15}
              />

              <TextField
                id="submission-social-following"
                name="socialFollowing"
                label="Total Social Following"
                value={
                  form.socialFollowing
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "socialFollowing",
                )}
                inputMode="numeric"
                placeholder="Example: 50000"
                optional
                maxLength={15}
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Step 08 — Story                                             */}
          {/* ----------------------------------------------------------- */}

          <section className="mt-5 rounded-[28px] border border-white/[0.07] bg-white/[0.022] p-5 sm:p-6">
            <StepHeading
              number="08"
              icon={
                <ArtistIcon />
              }
              eyebrow="Step 08"
              title="Artist Story & Vision"
              description="Tell us who you are, what makes the music different, and where you are trying to take the artist brand."
            />

            <div className="mt-7">
              <FieldLabel
                htmlFor="submission-artist-story"
                required
              >
                Artist Story
              </FieldLabel>

              <textarea
                id="submission-artist-story"
                name="artistStory"
                rows={9}
                value={
                  form.artistStory
                }
                onChange={
                  handleTextChange
                }
                placeholder="Tell us about your background, sound, accomplishments, current momentum, creative direction, target audience, what makes the artist different, and what you want to build next."
                required
                maxLength={8000}
                aria-invalid={
                  Boolean(
                    getFieldError(
                      fieldErrors,
                      "artistStory",
                    ),
                  )
                }
                aria-describedby={
                  getFieldError(
                    fieldErrors,
                    "artistStory",
                  )
                    ? "submission-artist-story-error"
                    : "submission-artist-story-count"
                }
                className={joinClasses(
                  BASE_FIELD_CLASS,

                  "min-h-[220px] resize-y py-4 leading-7",

                  getFieldError(
                    fieldErrors,
                    "artistStory",
                  )
                    ? ERROR_FIELD_CLASS
                    : NORMAL_FIELD_CLASS,
                )}
              />

              <div className="mt-2 flex items-start justify-between gap-4">
                <FieldError
                  id="submission-artist-story-error"
                  message={getFieldError(
                    fieldErrors,
                    "artistStory",
                  )}
                />

                <p
                  id="submission-artist-story-count"
                  className="ml-auto flex-[0_0_auto] text-[9px] font-bold uppercase tracking-[0.1em] text-white/25"
                >
                  {
                    form
                      .artistStory
                      .length
                  }
                  /8000
                </p>
              </div>
            </div>

            <div className="mt-6">
              <FieldLabel
                htmlFor="submission-message"
                optional
              >
                Additional Message
              </FieldLabel>

              <textarea
                id="submission-message"
                name="message"
                rows={5}
                value={
                  form.message
                }
                onChange={
                  handleTextChange
                }
                placeholder="Anything else you want the Money Records team to know?"
                maxLength={5000}
                aria-invalid={
                  Boolean(
                    getFieldError(
                      fieldErrors,
                      "message",
                    ),
                  )
                }
                aria-describedby={
                  getFieldError(
                    fieldErrors,
                    "message",
                  )
                    ? "submission-message-error"
                    : "submission-message-count"
                }
                className={joinClasses(
                  BASE_FIELD_CLASS,

                  "min-h-[150px] resize-y py-4 leading-7",

                  getFieldError(
                    fieldErrors,
                    "message",
                  )
                    ? ERROR_FIELD_CLASS
                    : NORMAL_FIELD_CLASS,
                )}
              />

              <div className="mt-2 flex items-start justify-between gap-4">
                <FieldError
                  id="submission-message-error"
                  message={getFieldError(
                    fieldErrors,
                    "message",
                  )}
                />

                <p
                  id="submission-message-count"
                  className="ml-auto flex-[0_0_auto] text-[9px] font-bold uppercase tracking-[0.1em] text-white/25"
                >
                  {
                    form.message
                      .length
                  }
                  /5000
                </p>
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Step 09 — Rights                                            */}
          {/* ----------------------------------------------------------- */}

          <section className="mt-5 rounded-[28px] border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.025)] p-5 sm:p-6">
            <StepHeading
              number="09"
              icon={
                <ShieldIcon />
              }
              eyebrow="Step 09"
              title="Rights & Submission Agreements"
              description="Complete the required confirmations before your music can be submitted."
            />

            <div className="mt-7 grid gap-4">
              <AgreementCheckbox
                id="submission-rights"
                name="ownsRights"
                checked={
                  form.ownsRights
                }
                onChange={
                  handleAgreementChange
                }
                error={getFieldError(
                  fieldErrors,
                  "ownsRights",
                )}
                title={
                  <>
                    I own or control the rights necessary to submit this music.
                    <span className="ml-1 text-[var(--mr-gold-200)]">
                      *
                    </span>
                  </>
                }
                description="You confirm that you have the authority necessary to submit the music, recordings, artwork, and related information for review."
              />

              <AgreementCheckbox
                id="submission-terms"
                name="acceptsSubmissionTerms"
                checked={
                  form
                    .acceptsSubmissionTerms
                }
                onChange={
                  handleAgreementChange
                }
                error={getFieldError(
                  fieldErrors,
                  "acceptsSubmissionTerms",
                )}
                title={
                  <>
                    I understand that submitting music does not guarantee a deal or service.
                    <span className="ml-1 text-[var(--mr-gold-200)]">
                      *
                    </span>
                  </>
                }
                description="Submission does not guarantee signing, representation, distribution, marketing approval, playlist placement, views, streams, press coverage, radio play, or acceptance."
              />

              <AgreementCheckbox
                id="submission-consent"
                name="consent"
                checked={
                  form.consent
                }
                onChange={
                  handleAgreementChange
                }
                error={getFieldError(
                  fieldErrors,
                  "consent",
                )}
                title={
                  <>
                    I agree that Money Records may contact me regarding this submission.
                    <span className="ml-1 text-[var(--mr-gold-200)]">
                      *
                    </span>
                  </>
                }
                description="Money Records may use the contact information provided to follow up about the music, artist, label opportunities, or requested services."
              />
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* Submit                                                      */}
          {/* ----------------------------------------------------------- */}

          <section className="mt-6 rounded-[28px] border border-white/[0.07] bg-black/25 p-5 sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex-[0_0_auto] text-[var(--mr-gold-200)]">
                    <ShieldIcon />
                  </span>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.13em] text-white/50">
                      Ready for Review
                    </p>

                    <p className="mt-1 text-xs leading-6 text-white/32">
                      Review your links before submitting. Do not include
                      passwords, banking credentials, payment-card details,
                      Social Security numbers, or other sensitive secrets.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="mr-badge">
                    Music Review
                  </span>

                  <span className="mr-badge">
                    Artist Development
                  </span>

                  <span className="mr-badge">
                    Marketing
                  </span>

                  <span className="mr-badge">
                    Distribution
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={
                  status ===
                  "submitting"
                }
                className={[
                  "group inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-full",
                  "border border-[rgba(227,179,77,0.34)]",
                  "bg-[linear-gradient(135deg,rgba(239,202,112,0.98),rgba(190,128,35,0.96))]",
                  "px-8 py-3.5 text-[10px] font-black uppercase tracking-[0.15em] text-black",
                  "shadow-[0_18px_50px_rgba(0,0,0,0.35)]",
                  "transition duration-200",
                  "hover:brightness-110",
                  "disabled:cursor-not-allowed disabled:opacity-55",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-[rgba(227,179,77,0.65)]",
                  "focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-black",
                  "lg:w-auto lg:min-w-[230px]",
                ].join(" ")}
              >
                {status ===
                "submitting" ? (
                  <>
                    <SpinnerIcon />
                    Sending Submission
                  </>
                ) : (
                  <>
                    <SendIcon />

                    {submitLabel}

                    <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                      <ArrowIcon />
                    </span>
                  </>
                )}
              </button>
            </div>
          </section>
        </fieldset>
      </form>
    </div>
  );
}