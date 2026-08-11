"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Inquiry Form                                         ┃
   ┃ File   : src/components/InquiryForm.tsx                              ┃
   ┃ Role   : Premium business inquiry and marketing-service contact form ┃
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

type InquiryFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  artistName: string;
  inquiryType: string;
  service: string;
  budget: string;
  timeline: string;
  subject: string;
  message: string;
  consent: boolean;

  /**
   * Honeypot field.
   * Must remain empty.
   */
  website: string;
};

type InquiryFieldName =
  | keyof InquiryFormState
  | "form";

type InquiryFieldErrors =
  Partial<
    Record<
      InquiryFieldName,
      string
    >
  >;

type ApiSuccessResponse = {
  success?: boolean;
  ok?: boolean;
  message?: string;
  requestId?: string;
  inquiryId?: string;
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

type SubmissionStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

export type InquiryFormProps = {
  /**
   * Optional heading above the form.
   */
  title?: ReactNode;

  /**
   * Optional supporting text.
   */
  description?: ReactNode;

  /**
   * API endpoint used to submit the inquiry.
   *
   * @default "/api/inquiries"
   */
  endpoint?: string;

  /**
   * Label shown on the submit button.
   */
  submitLabel?: string;

  /**
   * Optional preselected inquiry type.
   */
  defaultInquiryType?: string;

  /**
   * Optional preselected service.
   */
  defaultService?: string;

  /**
   * Whether the form should display its own heading.
   *
   * @default true
   */
  showHeader?: boolean;

  className?: string;
};

/* --------------------------------------------------------------------- */
/* Form Configuration                                                     */
/* --------------------------------------------------------------------- */

const INITIAL_FORM_STATE:
  InquiryFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    artistName: "",
    inquiryType: "",
    service: "",
    budget: "",
    timeline: "",
    subject: "",
    message: "",
    consent: false,
    website: "",
  };

const INQUIRY_TYPE_OPTIONS = [
  {
    value: "general",
    label: "General Inquiry",
  },
  {
    value: "marketing-services",
    label: "Marketing Services",
  },
  {
    value: "distribution",
    label: "Music Distribution",
  },
  {
    value: "artist-development",
    label: "Artist Development",
  },
  {
    value: "press-pr",
    label: "Press & PR",
  },
  {
    value: "vevo",
    label: "VEVO",
  },
  {
    value: "radio",
    label: "Radio Promotion",
  },
  {
    value: "branding",
    label: "Artist Branding",
  },
  {
    value: "partnership",
    label: "Partnership / Business",
  },
  {
    value: "billing-support",
    label: "Billing / Customer Support",
  },
  {
    value: "other",
    label: "Other",
  },
] as const;

const SERVICE_OPTIONS = [
  {
    value: "spotify",
    label: "Spotify",
  },
  {
    value: "apple-music",
    label: "Apple Music",
  },
  {
    value: "instagram",
    label: "Instagram",
  },
  {
    value: "tiktok",
    label: "TikTok",
  },
  {
    value: "youtube",
    label: "YouTube",
  },
  {
    value: "vevo",
    label: "VEVO",
  },
  {
    value: "press-pr",
    label: "Press & PR",
  },
  {
    value: "radio",
    label: "Radio",
  },
  {
    value: "soundcloud",
    label: "SoundCloud",
  },
  {
    value: "artist-branding",
    label: "Artist Branding",
  },
  {
    value: "distribution",
    label: "Distribution",
  },
  {
    value: "artist-development",
    label: "Artist Development",
  },
  {
    value: "multiple-platforms",
    label: "Multiple Platforms",
  },
  {
    value: "not-sure",
    label: "Not Sure Yet",
  },
] as const;

const BUDGET_OPTIONS = [
  {
    value: "under-250",
    label: "Under $250",
  },
  {
    value: "250-499",
    label: "$250 – $499",
  },
  {
    value: "500-999",
    label: "$500 – $999",
  },
  {
    value: "1000-2499",
    label: "$1,000 – $2,499",
  },
  {
    value: "2500-4999",
    label: "$2,500 – $4,999",
  },
  {
    value: "5000-plus",
    label: "$5,000+",
  },
  {
    value: "not-sure",
    label: "Not Sure Yet",
  },
  {
    value: "prefer-not-to-say",
    label: "Prefer Not to Say",
  },
] as const;

const TIMELINE_OPTIONS = [
  {
    value: "immediately",
    label: "Immediately",
  },
  {
    value: "within-7-days",
    label: "Within 7 Days",
  },
  {
    value: "within-30-days",
    label: "Within 30 Days",
  },
  {
    value: "within-90-days",
    label: "Within 90 Days",
  },
  {
    value: "future-release",
    label: "Future Release",
  },
  {
    value: "not-sure",
    label: "Not Sure Yet",
  },
] as const;

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

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
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

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M5 8L12 13L19 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
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
/* Helpers                                                                */
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

function sanitizeInitialOption(
  value: string | undefined,
): string {
  return value?.trim() ?? "";
}

function getFieldError(
  errors: InquiryFieldErrors,
  field: InquiryFieldName,
): string | undefined {
  return errors[field];
}

function hasFieldError(
  errors: InquiryFieldErrors,
  field: InquiryFieldName,
): boolean {
  return Boolean(
    getFieldError(
      errors,
      field,
    ),
  );
}

function createApiFieldErrors(
  value:
    | Record<string, string>
    | undefined,
): InquiryFieldErrors {
  if (!value) {
    return {};
  }

  const output:
    InquiryFieldErrors = {};

  for (
    const [
      field,
      message,
    ] of Object.entries(value)
  ) {
    if (
      typeof message !==
        "string" ||
      !message.trim()
    ) {
      continue;
    }

    output[
      field as InquiryFieldName
    ] =
      message.trim();
  }

  return output;
}

function validateClientForm(
  form: InquiryFormState,
): InquiryFieldErrors {
  const errors:
    InquiryFieldErrors = {};

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
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      form.email.trim(),
    )
  ) {
    errors.email =
      "Enter a valid email address.";
  }

  if (!form.inquiryType) {
    errors.inquiryType =
      "Select an inquiry type.";
  }

  if (!form.subject.trim()) {
    errors.subject =
      "Enter an inquiry subject.";
  }

  const messageLength =
    form.message.trim().length;

  if (!messageLength) {
    errors.message =
      "Tell us how Money Records can help.";
  } else if (
    messageLength < 20
  ) {
    errors.message =
      "Please provide at least 20 characters.";
  }

  if (!form.consent) {
    errors.consent =
      "You must agree to be contacted about this inquiry.";
  }

  return errors;
}

function getFirstErrorField(
  errors: InquiryFieldErrors,
): InquiryFieldName | null {
  const fieldOrder:
    InquiryFieldName[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "companyName",
      "artistName",
      "inquiryType",
      "service",
      "budget",
      "timeline",
      "subject",
      "message",
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
    InquiryFieldName | null,
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
/* Shared Input Styles                                                    */
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
/* Form Label                                                             */
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
/* Text Input                                                             */
/* --------------------------------------------------------------------- */

function TextField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
  required = false,
  optional = false,
  inputMode,
  maxLength,
}: {
  id: string;
  name: keyof InquiryFormState;
  label: ReactNode;
  value: string;
  onChange: (
    event:
      ChangeEvent<HTMLInputElement>,
  ) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  optional?: boolean;
  inputMode?:
    | "text"
    | "email"
    | "tel"
    | "url"
    | "numeric";
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
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
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
  required = false,
  optional = false,
  placeholder = "Select an option",
}: {
  id: string;
  name: keyof InquiryFormState;
  label: ReactNode;
  value: string;
  onChange: (
    event:
      ChangeEvent<HTMLSelectElement>,
  ) => void;
  options:
    readonly {
      value: string;
      label: string;
    }[];
  error?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
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
                key={option.value}
                value={option.value}
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
/* Success State                                                          */
/* --------------------------------------------------------------------- */

function InquirySuccess({
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
      className="relative overflow-hidden rounded-[28px] border border-emerald-300/20 bg-[linear-gradient(145deg,rgba(16,185,129,0.055),rgba(255,255,255,0.018))] p-7 text-center sm:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-300/[0.07] blur-[100px]"
      />

      <div className="relative">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-[22px] border border-emerald-300/25 bg-emerald-300/[0.07] text-emerald-300">
          <CheckIcon />
        </span>

        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.19em] text-emerald-300">
          Inquiry Received
        </p>

        <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[var(--mr-text)] sm:text-3xl">
          Your Message Is With the Team.
        </h3>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/48">
          Money Records has received your inquiry. Our team can now review
          your information and contact you using the email address you
          submitted.
        </p>

        {requestId ? (
          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-white/[0.07] bg-black/25 px-4 py-3">
            <p className="m-0 text-[8px] font-black uppercase tracking-[0.15em] text-white/30">
              Reference ID
            </p>

            <p className="mt-1 break-all text-xs font-bold text-white/50">
              {requestId}
            </p>
          </div>
        ) : null}

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="/services"
            className={[
              "inline-flex min-h-12 items-center justify-center gap-2 rounded-full",
              "border border-[rgba(227,179,77,0.32)]",
              "bg-[linear-gradient(135deg,rgba(239,202,112,0.98),rgba(190,128,35,0.96))]",
              "px-6 text-[10px] font-black uppercase tracking-[0.14em] text-black",
              "transition hover:brightness-110",
            ].join(" ")}
          >
            Explore Services
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
            Send Another Inquiry
          </button>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Inquiry Form                                                           */
/* --------------------------------------------------------------------- */

export default function InquiryForm({
  title = (
    <>
      Tell Us What You&apos;re{" "}
      <span className="mr-text-gradient">
        Building.
      </span>
    </>
  ),

  description =
    "Send Money Records your project details, campaign goals, platform needs, and timeline. The more context you provide, the better our team can understand the request.",

  endpoint = "/api/inquiries",

  submitLabel =
    "Send Inquiry",

  defaultInquiryType,

  defaultService,

  showHeader = true,

  className,
}: InquiryFormProps) {
  const formRef =
    useRef<HTMLFormElement>(
      null,
    );

  const [
    form,
    setForm,
  ] =
    useState<InquiryFormState>(
      () => ({
        ...INITIAL_FORM_STATE,

        inquiryType:
          sanitizeInitialOption(
            defaultInquiryType,
          ),

        service:
          sanitizeInitialOption(
            defaultService,
          ),
      }),
    );

  const [
    fieldErrors,
    setFieldErrors,
  ] =
    useState<InquiryFieldErrors>(
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
  /* Form Completion                                                     */
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
          form.inquiryType,
        ),
        Boolean(
          form.subject.trim(),
        ),
        form.message
          .trim()
          .length >= 20,
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
  /* Field Updates                                                       */
  /* ------------------------------------------------------------------- */

  function clearFieldError(
    field: InquiryFieldName,
  ): void {
    setFieldErrors(
      (currentErrors) => {
        if (
          !currentErrors[field] &&
          !currentErrors.form
        ) {
          return currentErrors;
        }

        const nextErrors = {
          ...currentErrors,
        };

        delete nextErrors[field];
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
      name as keyof InquiryFormState;

    setForm(
      (currentForm) => ({
        ...currentForm,
        [field]: value,
      }),
    );

    clearFieldError(
      field,
    );
  }

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
      name as keyof InquiryFormState;

    setForm(
      (currentForm) => ({
        ...currentForm,
        [field]: value,
      }),
    );

    clearFieldError(
      field,
    );
  }

  function handleConsentChange(
    event:
      ChangeEvent<HTMLInputElement>,
  ): void {
    setForm(
      (currentForm) => ({
        ...currentForm,
        consent:
          event.target.checked,
      }),
    );

    clearFieldError(
      "consent",
    );
  }

  /* ------------------------------------------------------------------- */
  /* Form Reset                                                          */
  /* ------------------------------------------------------------------- */

  function resetForm(): void {
    setForm({
      ...INITIAL_FORM_STATE,

      inquiryType:
        sanitizeInitialOption(
          defaultInquiryType,
        ),

      service:
        sanitizeInitialOption(
          defaultService,
        ),
    });

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
  /* Submission                                                          */
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
        "Please review the highlighted fields before sending your inquiry.",
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

                companyName:
                  form.companyName,

                artistName:
                  form.artistName,

                inquiryType:
                  form.inquiryType,

                service:
                  form.service,

                budget:
                  form.budget,

                timeline:
                  form.timeline,

                subject:
                  form.subject,

                message:
                  form.message,

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
          responseData as ApiErrorResponse;

        const apiErrors =
          createApiFieldErrors(
            errorResponse.fieldErrors,
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
            "Your inquiry could not be sent. Please review the form and try again.",
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
        responseData as ApiSuccessResponse;

      setRequestId(
        successResponse.requestId ??
          successResponse.inquiryId,
      );

      setStatus(
        "success",
      );

      setFormMessage(
        successResponse.message ||
          "Your inquiry has been received.",
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
        "We could not connect to the Money Records inquiry service. Please try again.",
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
        <InquirySuccess
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
  /* Form                                                                */
  /* ------------------------------------------------------------------- */

  return (
    <div
      className={className}
    >
      {showHeader ? (
        <div className="mb-8">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-2xl border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] text-[var(--mr-gold-200)]">
              <MailIcon />
            </span>

            <div>
              <p className="m-0 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mr-gold-200)]">
                Money Records Inquiries
              </p>

              <h2 className="mt-2 text-2xl font-black leading-tight tracking-[-0.045em] text-[var(--mr-text)] sm:text-3xl">
                {title}
              </h2>
            </div>
          </div>

          {description ? (
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/48 sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="relative"
      >
        {/* ------------------------------------------------------------- */}
        {/* Honeypot                                                     */}
        {/* ------------------------------------------------------------- */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
        >
          <label htmlFor="inquiry-website">
            Website
          </label>

          <input
            id="inquiry-website"
            type="text"
            name="website"
            value={form.website}
            onChange={
              handleTextChange
            }
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Completion                                                    */}
        {/* ------------------------------------------------------------- */}

        <div className="mb-7 rounded-[22px] border border-white/[0.065] bg-white/[0.022] p-4">
          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="m-0 text-[8px] font-black uppercase tracking-[0.16em] text-white/30">
                Inquiry Completion
              </p>

              <p className="mt-1 text-xs font-bold text-white/48">
                Required fields only
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
        {/* General Error                                                 */}
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

        {/* ------------------------------------------------------------- */}
        {/* Contact Information                                           */}
        {/* ------------------------------------------------------------- */}

        <fieldset
          disabled={
            status ===
            "submitting"
          }
          className="m-0 min-w-0 border-0 p-0"
        >
          <div className="rounded-[26px] border border-white/[0.07] bg-white/[0.022] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="m-0 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                  Step 01
                </p>

                <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                  Contact Information
                </h3>

                <p className="mt-2 text-xs leading-6 text-white/40">
                  Tell us who we should contact about this inquiry.
                </p>
              </div>

              <span className="hidden h-9 min-w-9 place-items-center rounded-full border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.045)] text-[9px] font-black text-[var(--mr-gold-200)] sm:grid">
                01
              </span>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <TextField
                id="inquiry-first-name"
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
                id="inquiry-last-name"
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
                id="inquiry-email"
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
                id="inquiry-phone"
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

              <TextField
                id="inquiry-company-name"
                name="companyName"
                label="Company / Brand"
                value={
                  form.companyName
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "companyName",
                )}
                placeholder="Company or brand name"
                autoComplete="organization"
                optional
                maxLength={160}
              />

              <TextField
                id="inquiry-artist-name"
                name="artistName"
                label="Artist Name"
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
                placeholder="Artist or group name"
                optional
                maxLength={160}
              />
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Inquiry Details                                             */}
          {/* ----------------------------------------------------------- */}

          <div className="mt-5 rounded-[26px] border border-white/[0.07] bg-white/[0.022] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="m-0 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                  Step 02
                </p>

                <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                  Project & Service Details
                </h3>

                <p className="mt-2 text-xs leading-6 text-white/40">
                  Help us understand what you are looking to accomplish.
                </p>
              </div>

              <span className="hidden h-9 min-w-9 place-items-center rounded-full border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.045)] text-[9px] font-black text-[var(--mr-gold-200)] sm:grid">
                02
              </span>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <SelectField
                id="inquiry-type"
                name="inquiryType"
                label="Inquiry Type"
                value={
                  form.inquiryType
                }
                onChange={
                  handleSelectChange
                }
                options={
                  INQUIRY_TYPE_OPTIONS
                }
                error={getFieldError(
                  fieldErrors,
                  "inquiryType",
                )}
                required
                placeholder="What can we help with?"
              />

              <SelectField
                id="inquiry-service"
                name="service"
                label="Primary Service"
                value={
                  form.service
                }
                onChange={
                  handleSelectChange
                }
                options={
                  SERVICE_OPTIONS
                }
                error={getFieldError(
                  fieldErrors,
                  "service",
                )}
                optional
                placeholder="Select a service"
              />

              <SelectField
                id="inquiry-budget"
                name="budget"
                label="Estimated Budget"
                value={
                  form.budget
                }
                onChange={
                  handleSelectChange
                }
                options={
                  BUDGET_OPTIONS
                }
                error={getFieldError(
                  fieldErrors,
                  "budget",
                )}
                optional
                placeholder="Select a budget range"
              />

              <SelectField
                id="inquiry-timeline"
                name="timeline"
                label="Ideal Timeline"
                value={
                  form.timeline
                }
                onChange={
                  handleSelectChange
                }
                options={
                  TIMELINE_OPTIONS
                }
                error={getFieldError(
                  fieldErrors,
                  "timeline",
                )}
                optional
                placeholder="When do you want to start?"
              />
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Message                                                     */}
          {/* ----------------------------------------------------------- */}

          <div className="mt-5 rounded-[26px] border border-white/[0.07] bg-white/[0.022] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="m-0 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                  Step 03
                </p>

                <h3 className="mt-2 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                  Tell Us About the Project
                </h3>

                <p className="mt-2 text-xs leading-6 text-white/40">
                  Give the team enough detail to understand your goals.
                </p>
              </div>

              <span className="hidden h-9 min-w-9 place-items-center rounded-full border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.045)] text-[9px] font-black text-[var(--mr-gold-200)] sm:grid">
                03
              </span>
            </div>

            <div className="mt-6">
              <TextField
                id="inquiry-subject"
                name="subject"
                label="Subject"
                value={
                  form.subject
                }
                onChange={
                  handleTextChange
                }
                error={getFieldError(
                  fieldErrors,
                  "subject",
                )}
                placeholder="Example: Spotify campaign for upcoming single"
                required
                maxLength={180}
              />

              <div className="mt-5">
                <FieldLabel
                  htmlFor="inquiry-message"
                  required
                >
                  Project Details
                </FieldLabel>

                <textarea
                  id="inquiry-message"
                  name="message"
                  rows={8}
                  value={
                    form.message
                  }
                  onChange={
                    handleTextChange
                  }
                  placeholder="Tell us about the artist or brand, the release, your goals, current links, target platforms, campaign expectations, and anything else the team should know."
                  required
                  maxLength={5000}
                  aria-invalid={hasFieldError(
                    fieldErrors,
                    "message",
                  )}
                  aria-describedby={
                    hasFieldError(
                      fieldErrors,
                      "message",
                    )
                      ? "inquiry-message-error"
                      : "inquiry-message-count"
                  }
                  className={joinClasses(
                    BASE_FIELD_CLASS,
                    "min-h-[190px] resize-y py-4 leading-7",
                    hasFieldError(
                      fieldErrors,
                      "message",
                    )
                      ? ERROR_FIELD_CLASS
                      : NORMAL_FIELD_CLASS,
                  )}
                />

                <div className="mt-2 flex items-start justify-between gap-4">
                  <FieldError
                    id="inquiry-message-error"
                    message={getFieldError(
                      fieldErrors,
                      "message",
                    )}
                  />

                  <p
                    id="inquiry-message-count"
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
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Consent                                                     */}
          {/* ----------------------------------------------------------- */}

          <div className="mt-5 rounded-[26px] border border-[rgba(227,179,77,0.16)] bg-[rgba(211,154,46,0.025)] p-5 sm:p-6">
            <label
              htmlFor="inquiry-consent"
              className="group flex cursor-pointer items-start gap-4"
            >
              <span className="relative mt-0.5 flex h-6 w-6 flex-[0_0_24px] items-center justify-center">
                <input
                  id="inquiry-consent"
                  name="consent"
                  type="checkbox"
                  checked={
                    form.consent
                  }
                  onChange={
                    handleConsentChange
                  }
                  required
                  aria-invalid={hasFieldError(
                    fieldErrors,
                    "consent",
                  )}
                  aria-describedby={
                    hasFieldError(
                      fieldErrors,
                      "consent",
                    )
                      ? "inquiry-consent-error"
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
                  I agree that Money Records may contact me about this inquiry.
                  <span className="ml-1 text-[var(--mr-gold-200)]">
                    *
                  </span>
                </span>

                <span className="mt-1 block text-xs leading-6 text-white/34">
                  Submitting this form does not guarantee campaign acceptance,
                  artist representation, distribution, specific results,
                  placements, streams, views, press coverage, or radio play.
                </span>
              </span>
            </label>

            <FieldError
              id="inquiry-consent-error"
              message={getFieldError(
                fieldErrors,
                "consent",
              )}
            />
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Submit Area                                                 */}
          {/* ----------------------------------------------------------- */}

          <div className="mt-6 rounded-[26px] border border-white/[0.07] bg-black/25 p-5 sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex max-w-2xl items-start gap-3">
                <span className="mt-0.5 flex-[0_0_auto] text-[var(--mr-gold-200)]">
                  <ShieldIcon />
                </span>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.13em] text-white/50">
                    Secure Inquiry Submission
                  </p>

                  <p className="mt-1 text-xs leading-6 text-white/32">
                    Your inquiry is sent directly to the Money Records team for
                    review. Do not include passwords, banking credentials,
                    payment-card information, or other sensitive secrets.
                  </p>
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
                  "px-7 py-3.5 text-[10px] font-black uppercase tracking-[0.15em] text-black",
                  "shadow-[0_18px_50px_rgba(0,0,0,0.35)]",
                  "transition duration-200",
                  "hover:brightness-110",
                  "disabled:cursor-not-allowed disabled:opacity-55",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-[rgba(227,179,77,0.65)]",
                  "focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-black",
                  "lg:w-auto lg:min-w-[210px]",
                ].join(" ")}
              >
                {status ===
                "submitting" ? (
                  <>
                    <SpinnerIcon />
                    Sending Inquiry
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
          </div>
        </fieldset>
      </form>
    </div>
  );
}