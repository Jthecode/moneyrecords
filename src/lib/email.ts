// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Transactional Email                                  ┃
   ┃ File   : src/lib/email.ts                                            ┃
   ┃ Role   : Inquiry and artist-submission email delivery through Resend ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  ValidatedInquiry,
  ValidatedMusicSubmission,
} from "@/lib/validation";

import {
  isValidEmail,
} from "@/lib/validation";

/* --------------------------------------------------------------------- */
/* Constants                                                              */
/* --------------------------------------------------------------------- */

const RESEND_EMAIL_ENDPOINT =
  "https://api.resend.com/emails";

const DEFAULT_SITE_URL =
  "https://moneyrecords.io";

const DEFAULT_CONTACT_EMAIL =
  "info@moneyrecords.io";

const DEFAULT_INSTAGRAM_URL =
  "https://instagram.com/kingpharaohreal";

const DEFAULT_INSTAGRAM_HANDLE =
  "@kingpharaohreal";

const EMAIL_REQUEST_TIMEOUT_MS =
  15_000;

const MAX_EMAIL_SUBJECT_LENGTH =
  200;

const MAX_IDEMPOTENCY_KEY_LENGTH =
  256;

/* --------------------------------------------------------------------- */
/* Public Types                                                           */
/* --------------------------------------------------------------------- */

export type EmailRecipient =
  | string
  | readonly string[];

export type EmailTag = {
  name: string;
  value: string;
};

export type EmailMessage = {
  from?: string;

  to: EmailRecipient;

  subject: string;

  html: string;

  text: string;

  replyTo?: EmailRecipient;

  cc?: EmailRecipient;

  bcc?: EmailRecipient;

  tags?: readonly EmailTag[];
};

export type EmailSendOptions = {
  /**
   * Prevents accidental duplicate sends when the same request is retried.
   *
   * Resend idempotency keys expire after the provider's configured period.
   */
  idempotencyKey?: string;

  /**
   * Overrides the default request timeout.
   */
  timeoutMs?: number;
};

export type EmailFailureCode =
  | "EMAIL_NOT_CONFIGURED"
  | "EMAIL_INVALID_MESSAGE"
  | "EMAIL_REQUEST_TIMEOUT"
  | "EMAIL_PROVIDER_ERROR"
  | "EMAIL_NETWORK_ERROR"
  | "EMAIL_UNKNOWN_ERROR";

export type EmailSendSuccess = {
  ok: true;

  id: string;

  provider: "resend";
};

export type EmailSendFailure = {
  ok: false;

  code: EmailFailureCode;

  error: string;

  provider: "resend";

  status?: number;

  providerErrorName?: string;
};

export type EmailSendResult =
  | EmailSendSuccess
  | EmailSendFailure;

export type EmailWorkflowResult = {
  /**
   * True when the required internal notification was delivered.
   *
   * A confirmation-email failure does not change this value to false.
   */
  ok: boolean;

  notification: EmailSendResult;

  confirmation: EmailSendResult | null;
};

export type EmailRequestContext = {
  /**
   * Stable request or database record ID.
   */
  requestId?: string;

  /**
   * ISO timestamp for when the form was submitted.
   */
  submittedAt?: string;

  /**
   * Optional public page where the form was submitted.
   */
  sourceUrl?: string;
};

/* --------------------------------------------------------------------- */
/* Internal Types                                                         */
/* --------------------------------------------------------------------- */

type EmailConfiguration = {
  apiKey: string;

  from: string;

  inquiryRecipients: string[];

  submissionRecipients: string[];

  contactEmail: string;

  replyToEmail: string;

  siteUrl: string;

  instagramUrl: string;

  instagramHandle: string;

  sendConfirmations: boolean;
};

type EmailConfigurationResult =
  | {
      ok: true;

      config: EmailConfiguration;
    }
  | {
      ok: false;

      error: string;
    };

type ResendSuccessResponse = {
  id?: unknown;
};

type ResendErrorResponse = {
  message?: unknown;

  name?: unknown;

  statusCode?: unknown;
};

type EmailTemplate = {
  subject: string;

  html: string;

  text: string;
};

type EmailDetailRow = {
  label: string;

  value: string | null | undefined;

  href?: string | null;
};

type EmailSection = {
  title: string;

  rows: readonly EmailDetailRow[];
};

type EmailLayoutOptions = {
  eyebrow: string;

  title: string;

  intro: string;

  sections: readonly EmailSection[];

  requestId?: string;

  submittedAt?: string;

  sourceUrl?: string;

  action?: {
    label: string;

    href: string;
  };

  footerNote?: string;
};

/* --------------------------------------------------------------------- */
/* Environment Helpers                                                    */
/* --------------------------------------------------------------------- */

function getFirstEnvironmentValue(
  ...names: readonly string[]
): string {
  for (const name of names) {
    const value =
      process.env[name]?.trim();

    if (value) {
      return value;
    }
  }

  return "";
}

function getBooleanEnvironmentValue(
  value: string,
  fallback: boolean,
): boolean {
  const normalized =
    value
      .trim()
      .toLowerCase();

  if (!normalized) {
    return fallback;
  }

  if (
    [
      "true",
      "1",
      "yes",
      "on",
      "enabled",
    ].includes(normalized)
  ) {
    return true;
  }

  if (
    [
      "false",
      "0",
      "no",
      "off",
      "disabled",
    ].includes(normalized)
  ) {
    return false;
  }

  return fallback;
}

function parseRecipientList(
  value: string,
  fallback: string,
): string[] {
  const source =
    value || fallback;

  const recipients =
    source
      .split(/[;,]/)
      .map((recipient) =>
        recipient.trim(),
      )
      .filter(Boolean)
      .filter((recipient) =>
        isValidEmail(
          extractEmailAddress(
            recipient,
          ),
        ),
      );

  return Array.from(
    new Set(recipients),
  );
}

function getEmailConfiguration():
  EmailConfigurationResult {
  const apiKey =
    getFirstEnvironmentValue(
      "RESEND_API_KEY",
      "EMAIL_API_KEY",
    );

  const from =
    getFirstEnvironmentValue(
      "EMAIL_FROM",
      "RESEND_FROM_EMAIL",
      "MONEY_RECORDS_FROM_EMAIL",
    );

  if (!apiKey) {
    return {
      ok: false,

      error:
        "RESEND_API_KEY is not configured.",
    };
  }

  if (!from) {
    return {
      ok: false,

      error:
        "EMAIL_FROM is not configured.",
    };
  }

  const fromAddress =
    extractEmailAddress(from);

  if (
    !isValidEmail(
      fromAddress,
    )
  ) {
    return {
      ok: false,

      error:
        "EMAIL_FROM must contain a valid email address.",
    };
  }

  const contactEmail =
    getFirstEnvironmentValue(
      "MONEY_RECORDS_CONTACT_EMAIL",
      "CONTACT_EMAIL",
    ) ||
    DEFAULT_CONTACT_EMAIL;

  const replyToEmail =
    getFirstEnvironmentValue(
      "EMAIL_REPLY_TO",
      "RESEND_REPLY_TO",
      "MONEY_RECORDS_REPLY_TO_EMAIL",
    ) ||
    contactEmail;

  const inquiryRecipients =
    parseRecipientList(
      getFirstEnvironmentValue(
        "INQUIRY_EMAIL_TO",
        "EMAIL_INQUIRIES_TO",
        "MONEY_RECORDS_INQUIRY_EMAIL",
      ),
      contactEmail,
    );

  const submissionRecipients =
    parseRecipientList(
      getFirstEnvironmentValue(
        "SUBMISSION_EMAIL_TO",
        "EMAIL_SUBMISSIONS_TO",
        "MONEY_RECORDS_SUBMISSION_EMAIL",
      ),
      contactEmail,
    );

  if (
    inquiryRecipients.length ===
    0
  ) {
    return {
      ok: false,

      error:
        "No valid inquiry-email recipient is configured.",
    };
  }

  if (
    submissionRecipients.length ===
    0
  ) {
    return {
      ok: false,

      error:
        "No valid submission-email recipient is configured.",
    };
  }

  const siteUrl =
    normalizeSiteUrl(
      getFirstEnvironmentValue(
        "NEXT_PUBLIC_SITE_URL",
        "SITE_URL",
      ) ||
      DEFAULT_SITE_URL,
    );

  const instagramUrl =
    normalizeHttpUrl(
      getFirstEnvironmentValue(
        "MONEY_RECORDS_INSTAGRAM_URL",
      ) ||
      DEFAULT_INSTAGRAM_URL,
    ) ||
    DEFAULT_INSTAGRAM_URL;

  const instagramHandle =
    sanitizeSingleLine(
      getFirstEnvironmentValue(
        "MONEY_RECORDS_INSTAGRAM_HANDLE",
      ) ||
      DEFAULT_INSTAGRAM_HANDLE,
    );

  const sendConfirmations =
    getBooleanEnvironmentValue(
      getFirstEnvironmentValue(
        "EMAIL_SEND_CONFIRMATIONS",
      ),
      true,
    );

  return {
    ok: true,

    config: {
      apiKey,

      from,

      inquiryRecipients,

      submissionRecipients,

      contactEmail,

      replyToEmail,

      siteUrl,

      instagramUrl,

      instagramHandle,

      sendConfirmations,
    },
  };
}

/* --------------------------------------------------------------------- */
/* General Utilities                                                      */
/* --------------------------------------------------------------------- */

function extractEmailAddress(
  value: string,
): string {
  const trimmed =
    value.trim();

  const addressMatch =
    trimmed.match(
      /<([^<>]+)>/,
    );

  return (
    addressMatch?.[1] ??
    trimmed
  )
    .trim()
    .toLowerCase();
}

function sanitizeSingleLine(
  value: string,
): string {
  return value
    .replace(/[\r\n\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeEmailSubject(
  value: string,
): string {
  return sanitizeSingleLine(
    value,
  ).slice(
    0,
    MAX_EMAIL_SUBJECT_LENGTH,
  );
}

function sanitizeIdempotencyKey(
  value: string,
): string {
  return sanitizeSingleLine(
    value,
  )
    .replace(
      /[^A-Za-z0-9._:-]/g,
      "-",
    )
    .slice(
      0,
      MAX_IDEMPOTENCY_KEY_LENGTH,
    );
}

function normalizeSiteUrl(
  value: string,
): string {
  const normalized =
    normalizeHttpUrl(value);

  if (!normalized) {
    return DEFAULT_SITE_URL;
  }

  try {
    return new URL(
      normalized,
    ).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

function normalizeHttpUrl(
  value: string,
): string | null {
  const trimmed =
    value.trim();

  if (!trimmed) {
    return null;
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

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      return null;
    }

    url.username = "";
    url.password = "";

    return url.toString();
  } catch {
    return null;
  }
}

function normalizeRecipientInput(
  recipients:
    | EmailRecipient
    | undefined,
): string[] {
  if (!recipients) {
    return [];
  }

  const values =
    typeof recipients ===
    "string"
      ? [recipients]
      : [...recipients];

  return Array.from(
    new Set(
      values
        .map((value) =>
          value.trim(),
        )
        .filter(Boolean)
        .filter((value) =>
          isValidEmail(
            extractEmailAddress(
              value,
            ),
          ),
        ),
    ),
  );
}

function formatSlugLabel(
  value:
    | string
    | null
    | undefined,
): string {
  if (!value) {
    return "Not provided";
  }

  const specialLabels:
    Record<string, string> =
      {
        "apple-music":
          "Apple Music",

        "artist-development":
          "Artist Development",

        "artist-branding":
          "Artist Branding",

        "billing-support":
          "Billing Support",

        "future-release":
          "Future Release",

        "marketing-services":
          "Marketing Services",

        "multiple-platforms":
          "Multiple Platforms",

        "multiple-services":
          "Multiple Services",

        "not-sure":
          "Not Sure",

        "playlist-marketing":
          "Playlist Marketing",

        "prefer-not-to-say":
          "Prefer Not to Say",

        "press-pr":
          "Press & PR",

        "r-and-b":
          "R&B",

        "record-label-consideration":
          "Record Label Consideration",

        "release-strategy":
          "Release Strategy",

        "social-media-growth":
          "Social Media Growth",

        "soundcloud":
          "SoundCloud",

        "spotify":
          "Spotify",

        "tiktok":
          "TikTok",

        "vevo":
          "VEVO",

        "youtube":
          "YouTube",
      };

  const normalized =
    value
      .trim()
      .toLowerCase();

  if (
    specialLabels[
      normalized
    ]
  ) {
    return specialLabels[
      normalized
    ];
  }

  return normalized
    .split("-")
    .filter(Boolean)
    .map((part) =>
      part.length <= 3
        ? part.toUpperCase()
        : `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`,
    )
    .join(" ");
}

function formatOptionalValue(
  value:
    | string
    | null
    | undefined,
): string {
  const normalized =
    value?.trim();

  return normalized ||
    "Not provided";
}

function formatNumber(
  value:
    | number
    | null
    | undefined,
): string {
  if (
    typeof value !==
      "number" ||
    !Number.isFinite(value)
  ) {
    return "Not provided";
  }

  return new Intl.NumberFormat(
    "en-US",
  ).format(value);
}

function formatDateTime(
  value:
    | string
    | null
    | undefined,
): string {
  if (!value) {
    return new Intl.DateTimeFormat(
      "en-US",
      {
        dateStyle:
          "medium",

        timeStyle:
          "short",

        timeZone:
          "America/New_York",
      },
    ).format(
      new Date(),
    );
  }

  const timestamp =
    Date.parse(value);

  if (
    Number.isNaN(timestamp)
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      dateStyle:
        "medium",

      timeStyle:
        "short",

      timeZone:
        "America/New_York",
    },
  ).format(
    new Date(timestamp),
  );
}

function createRequestId(
  prefix: string,
): string {
  const randomId =
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}`;

  return `${prefix}-${randomId}`;
}

/* --------------------------------------------------------------------- */
/* HTML Escaping                                                          */
/* --------------------------------------------------------------------- */

export function escapeEmailHtml(
  value:
    | string
    | number
    | boolean
    | null
    | undefined,
): string {
  return String(
    value ?? "",
  )
    .replace(
      /&/g,
      "&amp;",
    )
    .replace(
      /</g,
      "&lt;",
    )
    .replace(
      />/g,
      "&gt;",
    )
    .replace(
      /"/g,
      "&quot;",
    )
    .replace(
      /'/g,
      "&#039;",
    );
}

function renderMultilineHtml(
  value: string,
): string {
  return escapeEmailHtml(
    value,
  ).replace(
    /\n/g,
    "<br />",
  );
}

/* --------------------------------------------------------------------- */
/* Email Template Rendering                                               */
/* --------------------------------------------------------------------- */

function renderEmailRow({
  label,
  value,
  href,
}: EmailDetailRow): string {
  const safeLabel =
    escapeEmailHtml(label);

  const displayValue =
    formatOptionalValue(value);

  const safeHref =
    href
      ? normalizeHttpUrl(
          href,
        )
      : null;

  const renderedValue =
    safeHref
      ? `
        <a
          href="${escapeEmailHtml(
            safeHref,
          )}"
          style="
            color:#e8c978;
            font-weight:700;
            text-decoration:none;
            overflow-wrap:anywhere;
          "
        >
          ${escapeEmailHtml(
            displayValue,
          )}
        </a>
      `
      : renderMultilineHtml(
          displayValue,
        );

  return `
    <tr>
      <td
        style="
          width:34%;
          padding:13px 14px;
          border-bottom:1px solid rgba(255,255,255,0.07);
          color:#9d9a92;
          font-size:11px;
          font-weight:800;
          letter-spacing:0.09em;
          text-transform:uppercase;
          vertical-align:top;
        "
      >
        ${safeLabel}
      </td>

      <td
        style="
          padding:13px 14px;
          border-bottom:1px solid rgba(255,255,255,0.07);
          color:#f4f1ea;
          font-size:14px;
          font-weight:600;
          line-height:1.65;
          overflow-wrap:anywhere;
          vertical-align:top;
        "
      >
        ${renderedValue}
      </td>
    </tr>
  `;
}

function renderEmailSection({
  title,
  rows,
}: EmailSection): string {
  const visibleRows =
    rows.filter(
      (row) =>
        row.value !==
          undefined &&
        row.value !==
          null &&
        String(row.value).trim() !==
          "",
    );

  if (
    visibleRows.length ===
    0
  ) {
    return "";
  }

  return `
    <div
      style="
        margin-top:24px;
        overflow:hidden;
        border:1px solid rgba(232,201,120,0.18);
        border-radius:18px;
        background:#0d0d0f;
      "
    >
      <div
        style="
          padding:15px 18px;
          border-bottom:1px solid rgba(232,201,120,0.16);
          background:rgba(232,201,120,0.05);
          color:#e8c978;
          font-size:11px;
          font-weight:900;
          letter-spacing:0.14em;
          text-transform:uppercase;
        "
      >
        ${escapeEmailHtml(
          title,
        )}
      </div>

      <table
        role="presentation"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style="
          width:100%;
          border-collapse:collapse;
        "
      >
        ${visibleRows
          .map(
            renderEmailRow,
          )
          .join("")}
      </table>
    </div>
  `;
}

function renderEmailLayout({
  eyebrow,
  title,
  intro,
  sections,
  requestId,
  submittedAt,
  sourceUrl,
  action,
  footerNote,
}: EmailLayoutOptions): string {
  const safeActionUrl =
    action
      ? normalizeHttpUrl(
          action.href,
        )
      : null;

  const safeSourceUrl =
    sourceUrl
      ? normalizeHttpUrl(
          sourceUrl,
        )
      : null;

  const metadataRows:
    EmailDetailRow[] =
      [];

  if (requestId) {
    metadataRows.push({
      label:
        "Reference ID",

      value:
        requestId,
    });
  }

  if (submittedAt) {
    metadataRows.push({
      label:
        "Submitted",

      value:
        formatDateTime(
          submittedAt,
        ),
    });
  }

  if (safeSourceUrl) {
    metadataRows.push({
      label:
        "Source",

      value:
        safeSourceUrl,

      href:
        safeSourceUrl,
    });
  }

  const allSections =
    metadataRows.length > 0
      ? [
          ...sections,

          {
            title:
              "Submission Reference",

            rows:
              metadataRows,
          },
        ]
      : sections;

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <title>
          ${escapeEmailHtml(
            title,
          )}
        </title>
      </head>

      <body
        style="
          margin:0;
          padding:0;
          background:#050506;
          color:#f4f1ea;
          font-family:Arial,Helvetica,sans-serif;
        "
      >
        <div
          style="
            display:none;
            max-height:0;
            overflow:hidden;
            opacity:0;
          "
        >
          ${escapeEmailHtml(
            intro,
          )}
        </div>

        <table
          role="presentation"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          style="
            width:100%;
            border-collapse:collapse;
            background:#050506;
          "
        >
          <tr>
            <td
              align="center"
              style="
                padding:28px 12px;
              "
            >
              <table
                role="presentation"
                cellpadding="0"
                cellspacing="0"
                width="100%"
                style="
                  width:100%;
                  max-width:680px;
                  border-collapse:separate;
                  overflow:hidden;
                  border:1px solid rgba(232,201,120,0.24);
                  border-radius:26px;
                  background:#09090b;
                  box-shadow:0 24px 80px rgba(0,0,0,0.45);
                "
              >
                <tr>
                  <td
                    style="
                      height:3px;
                      background:linear-gradient(
                        90deg,
                        transparent,
                        #e8c978,
                        transparent
                      );
                    "
                  ></td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:30px 26px 18px;
                    "
                  >
                    <div
                      style="
                        display:inline-block;
                        padding:8px 12px;
                        border:1px solid rgba(232,201,120,0.24);
                        border-radius:999px;
                        background:rgba(232,201,120,0.06);
                        color:#e8c978;
                        font-size:10px;
                        font-weight:900;
                        letter-spacing:0.16em;
                        text-transform:uppercase;
                      "
                    >
                      ${escapeEmailHtml(
                        eyebrow,
                      )}
                    </div>

                    <h1
                      style="
                        margin:20px 0 0;
                        color:#f7f4ec;
                        font-size:32px;
                        line-height:1.08;
                        letter-spacing:-0.04em;
                      "
                    >
                      ${escapeEmailHtml(
                        title,
                      )}
                    </h1>

                    <p
                      style="
                        margin:16px 0 0;
                        color:#aaa69d;
                        font-size:15px;
                        line-height:1.75;
                      "
                    >
                      ${renderMultilineHtml(
                        intro,
                      )}
                    </p>

                    ${allSections
                      .map(
                        renderEmailSection,
                      )
                      .join("")}

                    ${
                      safeActionUrl &&
                      action
                        ? `
                          <div
                            style="
                              margin-top:28px;
                              text-align:center;
                            "
                          >
                            <a
                              href="${escapeEmailHtml(
                                safeActionUrl,
                              )}"
                              style="
                                display:inline-block;
                                padding:14px 24px;
                                border-radius:999px;
                                background:linear-gradient(
                                  135deg,
                                  #f0d489,
                                  #bd8129
                                );
                                color:#050506;
                                font-size:12px;
                                font-weight:900;
                                letter-spacing:0.1em;
                                text-decoration:none;
                                text-transform:uppercase;
                              "
                            >
                              ${escapeEmailHtml(
                                action.label,
                              )}
                            </a>
                          </div>
                        `
                        : ""
                    }

                    ${
                      footerNote
                        ? `
                          <p
                            style="
                              margin:24px 0 0;
                              padding:16px 18px;
                              border:1px solid rgba(255,255,255,0.07);
                              border-radius:16px;
                              background:rgba(255,255,255,0.025);
                              color:#8f8c85;
                              font-size:12px;
                              line-height:1.65;
                            "
                          >
                            ${renderMultilineHtml(
                              footerNote,
                            )}
                          </p>
                        `
                        : ""
                    }
                  </td>
                </tr>

                <tr>
                  <td
                    style="
                      padding:20px 26px 26px;
                    "
                  >
                    <div
                      style="
                        height:1px;
                        background:linear-gradient(
                          90deg,
                          transparent,
                          rgba(232,201,120,0.28),
                          transparent
                        );
                      "
                    ></div>

                    <p
                      style="
                        margin:20px 0 0;
                        color:#77746d;
                        font-size:11px;
                        line-height:1.7;
                        text-align:center;
                      "
                    >
                      Money Records LLC<br />
                      Independent Record Label · Global Music Marketing
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function renderPlainTextEmail({
  eyebrow,
  title,
  intro,
  sections,
  requestId,
  submittedAt,
  sourceUrl,
  action,
  footerNote,
}: EmailLayoutOptions): string {
  const output: string[] =
    [
      "MONEY RECORDS LLC",
      eyebrow.toUpperCase(),
      "",
      title,
      "",
      intro,
    ];

  for (const section of sections) {
    const visibleRows =
      section.rows.filter(
        (row) =>
          row.value !==
            undefined &&
          row.value !==
            null &&
          String(row.value).trim() !==
            "",
      );

    if (
      visibleRows.length ===
      0
    ) {
      continue;
    }

    output.push(
      "",
      section.title.toUpperCase(),
      "-".repeat(
        Math.min(
          section.title.length,
          40,
        ),
      ),
    );

    for (const row of visibleRows) {
      output.push(
        `${row.label}: ${formatOptionalValue(
          row.value,
        )}`,
      );
    }
  }

  if (
    requestId ||
    submittedAt ||
    sourceUrl
  ) {
    output.push(
      "",
      "SUBMISSION REFERENCE",
      "--------------------",
    );

    if (requestId) {
      output.push(
        `Reference ID: ${requestId}`,
      );
    }

    if (submittedAt) {
      output.push(
        `Submitted: ${formatDateTime(
          submittedAt,
        )}`,
      );
    }

    if (sourceUrl) {
      output.push(
        `Source: ${sourceUrl}`,
      );
    }
  }

  if (action) {
    output.push(
      "",
      `${action.label}: ${action.href}`,
    );
  }

  if (footerNote) {
    output.push(
      "",
      footerNote,
    );
  }

  output.push(
    "",
    "Money Records LLC",
    "Independent Record Label · Global Music Marketing",
  );

  return output.join(
    "\n",
  );
}

/* --------------------------------------------------------------------- */
/* Low-Level Resend Delivery                                              */
/* --------------------------------------------------------------------- */

function createConfigurationFailure(
  error: string,
): EmailSendFailure {
  return {
    ok: false,

    code:
      "EMAIL_NOT_CONFIGURED",

    error,

    provider:
      "resend",
  };
}

function validateEmailMessage(
  message: EmailMessage,
  defaultFrom: string,
):
  | {
      ok: true;

      from: string;

      to: string[];

      replyTo: string[];

      cc: string[];

      bcc: string[];

      subject: string;
    }
  | {
      ok: false;

      error: string;
    } {
  const from =
    message.from?.trim() ||
    defaultFrom;

  const fromAddress =
    extractEmailAddress(from);

  if (
    !isValidEmail(
      fromAddress,
    )
  ) {
    return {
      ok: false,

      error:
        "The sender email address is invalid.",
    };
  }

  const to =
    normalizeRecipientInput(
      message.to,
    );

  if (
    to.length ===
    0
  ) {
    return {
      ok: false,

      error:
        "At least one valid recipient is required.",
    };
  }

  const subject =
    sanitizeEmailSubject(
      message.subject,
    );

  if (!subject) {
    return {
      ok: false,

      error:
        "An email subject is required.",
    };
  }

  if (
    !message.html.trim() &&
    !message.text.trim()
  ) {
    return {
      ok: false,

      error:
        "Email HTML or plain text content is required.",
    };
  }

  return {
    ok: true,

    from,

    to,

    replyTo:
      normalizeRecipientInput(
        message.replyTo,
      ),

    cc:
      normalizeRecipientInput(
        message.cc,
      ),

    bcc:
      normalizeRecipientInput(
        message.bcc,
      ),

    subject,
  };
}

async function parseResponseJson(
  response: Response,
): Promise<
  ResendSuccessResponse &
  ResendErrorResponse
> {
  try {
    const payload:
      unknown =
        await response.json();

    if (
      typeof payload ===
        "object" &&
      payload !== null
    ) {
      return payload as
        ResendSuccessResponse &
        ResendErrorResponse;
    }

    return {};
  } catch {
    return {};
  }
}

/**
 * Sends one transactional email through Resend.
 *
 * Keep this function server-side. Never import this file into a component
 * marked with "use client".
 */
export async function sendEmail(
  message: EmailMessage,
  options: EmailSendOptions = {},
): Promise<EmailSendResult> {
  const configuration =
    getEmailConfiguration();

  if (!configuration.ok) {
    return createConfigurationFailure(
      configuration.error,
    );
  }

  const {
    config,
  } = configuration;

  const validated =
    validateEmailMessage(
      message,
      config.from,
    );

  if (!validated.ok) {
    return {
      ok: false,

      code:
        "EMAIL_INVALID_MESSAGE",

      error:
        validated.error,

      provider:
        "resend",
    };
  }

  const controller =
    new AbortController();

  const timeoutMs =
    typeof options.timeoutMs ===
      "number" &&
    Number.isFinite(
      options.timeoutMs,
    ) &&
    options.timeoutMs > 0
      ? Math.min(
          Math.floor(
            options.timeoutMs,
          ),
          60_000,
        )
      : EMAIL_REQUEST_TIMEOUT_MS;

  const timeout =
    setTimeout(
      () => {
        controller.abort();
      },
      timeoutMs,
    );

  const headers:
    Record<string, string> =
      {
        Authorization:
          `Bearer ${config.apiKey}`,

        "Content-Type":
          "application/json",
      };

  const idempotencyKey =
    options.idempotencyKey
      ? sanitizeIdempotencyKey(
          options.idempotencyKey,
        )
      : "";

  if (idempotencyKey) {
    headers[
      "Idempotency-Key"
    ] =
      idempotencyKey;
  }

  const payload:
    Record<string, unknown> =
      {
        from:
          validated.from,

        to:
          validated.to,

        subject:
          validated.subject,

        html:
          message.html,

        text:
          message.text,
      };

  if (
    validated.replyTo.length >
    0
  ) {
    payload.reply_to =
      validated.replyTo;
  }

  if (
    validated.cc.length >
    0
  ) {
    payload.cc =
      validated.cc;
  }

  if (
    validated.bcc.length >
    0
  ) {
    payload.bcc =
      validated.bcc;
  }

  if (
    message.tags &&
    message.tags.length > 0
  ) {
    payload.tags =
      message.tags
        .map((tag) => ({
          name:
            sanitizeSingleLine(
              tag.name,
            ).slice(
              0,
              256,
            ),

          value:
            sanitizeSingleLine(
              tag.value,
            ).slice(
              0,
              256,
            ),
        }))
        .filter(
          (tag) =>
            tag.name &&
            tag.value,
        );
  }

  try {
    const response =
      await fetch(
        RESEND_EMAIL_ENDPOINT,
        {
          method:
            "POST",

          headers,

          body:
            JSON.stringify(
              payload,
            ),

          cache:
            "no-store",

          signal:
            controller.signal,
        },
      );

    const responseData =
      await parseResponseJson(
        response,
      );

    if (!response.ok) {
      const providerMessage =
        typeof responseData.message ===
          "string"
          ? sanitizeSingleLine(
              responseData.message,
            )
          : "The email provider rejected the request.";

      const providerErrorName =
        typeof responseData.name ===
          "string"
          ? sanitizeSingleLine(
              responseData.name,
            )
          : undefined;

      return {
        ok: false,

        code:
          "EMAIL_PROVIDER_ERROR",

        error:
          providerMessage,

        provider:
          "resend",

        status:
          response.status,

        providerErrorName,
      };
    }

    if (
      typeof responseData.id !==
        "string" ||
      !responseData.id.trim()
    ) {
      return {
        ok: false,

        code:
          "EMAIL_PROVIDER_ERROR",

        error:
          "The email provider returned an invalid success response.",

        provider:
          "resend",

        status:
          response.status,
      };
    }

    return {
      ok: true,

      id:
        responseData.id,

      provider:
        "resend",
    };
  } catch (error) {
    if (
      error instanceof
        DOMException &&
      error.name ===
        "AbortError"
    ) {
      return {
        ok: false,

        code:
          "EMAIL_REQUEST_TIMEOUT",

        error:
          "The email request timed out.",

        provider:
          "resend",
      };
    }

    if (
      error instanceof
      TypeError
    ) {
      return {
        ok: false,

        code:
          "EMAIL_NETWORK_ERROR",

        error:
          "The email provider could not be reached.",

        provider:
          "resend",
      };
    }

    return {
      ok: false,

      code:
        "EMAIL_UNKNOWN_ERROR",

      error:
        "An unexpected email-delivery error occurred.",

      provider:
        "resend",
    };
  } finally {
    clearTimeout(
      timeout,
    );
  }
}

/* --------------------------------------------------------------------- */
/* Inquiry Email Templates                                                */
/* --------------------------------------------------------------------- */

export function buildInquiryNotificationEmail(
  inquiry: ValidatedInquiry,
  context: EmailRequestContext = {},
): EmailTemplate {
  const inquiryType =
    formatSlugLabel(
      inquiry.inquiryType,
    );

  const service =
    inquiry.service
      ? formatSlugLabel(
          inquiry.service,
        )
      : "Not selected";

  const budget =
    inquiry.budget
      ? formatSlugLabel(
          inquiry.budget,
        )
      : "Not provided";

  const timeline =
    inquiry.timeline
      ? formatSlugLabel(
          inquiry.timeline,
        )
      : "Not provided";

  const layout:
    EmailLayoutOptions =
      {
        eyebrow:
          "New Business Inquiry",

        title:
          `${inquiryType}: ${inquiry.subject}`,

        intro:
          "A new inquiry was submitted through the Money Records website. Reply directly to this email to contact the sender.",

        sections: [
          {
            title:
              "Contact Information",

            rows: [
              {
                label:
                  "Name",

                value:
                  inquiry.fullName,
              },
              {
                label:
                  "Email",

                value:
                  inquiry.email,

                href:
                  `mailto:${inquiry.email}`,
              },
              {
                label:
                  "Phone",

                value:
                  inquiry.phone,
              },
              {
                label:
                  "Company",

                value:
                  inquiry.companyName,
              },
              {
                label:
                  "Artist Name",

                value:
                  inquiry.artistName,
              },
            ],
          },
          {
            title:
              "Inquiry Details",

            rows: [
              {
                label:
                  "Inquiry Type",

                value:
                  inquiryType,
              },
              {
                label:
                  "Service",

                value:
                  service,
              },
              {
                label:
                  "Budget",

                value:
                  budget,
              },
              {
                label:
                  "Timeline",

                value:
                  timeline,
              },
              {
                label:
                  "Subject",

                value:
                  inquiry.subject,
              },
              {
                label:
                  "Message",

                value:
                  inquiry.message,
              },
            ],
          },
        ],

        requestId:
          context.requestId,

        submittedAt:
          context.submittedAt,

        sourceUrl:
          context.sourceUrl,

        action: {
          label:
            "Reply to Inquiry",

          href:
            `mailto:${inquiry.email}`,
        },

        footerNote:
          "Review the inquiry before making commitments, guarantees, pricing confirmations, or campaign claims.",
      };

  return {
    subject:
      sanitizeEmailSubject(
        `New Money Records Inquiry — ${inquiry.subject}`,
      ),

    html:
      renderEmailLayout(
        layout,
      ),

    text:
      renderPlainTextEmail(
        layout,
      ),
  };
}

export function buildInquiryConfirmationEmail(
  inquiry: ValidatedInquiry,
  context: EmailRequestContext = {},
): EmailTemplate {
  const configuration =
    getEmailConfiguration();

  const config =
    configuration.ok
      ? configuration.config
      : {
          contactEmail:
            DEFAULT_CONTACT_EMAIL,

          siteUrl:
            DEFAULT_SITE_URL,

          instagramUrl:
            DEFAULT_INSTAGRAM_URL,

          instagramHandle:
            DEFAULT_INSTAGRAM_HANDLE,
        };

  const layout:
    EmailLayoutOptions =
      {
        eyebrow:
          "Inquiry Received",

        title:
          `Thank You, ${inquiry.firstName}`,

        intro:
          "Money Records has received your inquiry. Our team will review the information you provided and contact you using the email address submitted with your request.",

        sections: [
          {
            title:
              "Inquiry Summary",

            rows: [
              {
                label:
                  "Inquiry Type",

                value:
                  formatSlugLabel(
                    inquiry.inquiryType,
                  ),
              },
              {
                label:
                  "Service",

                value:
                  inquiry.service
                    ? formatSlugLabel(
                        inquiry.service,
                      )
                    : "Not selected",
              },
              {
                label:
                  "Subject",

                value:
                  inquiry.subject,
              },
              {
                label:
                  "Contact Email",

                value:
                  inquiry.email,
              },
            ],
          },
          {
            title:
              "Money Records Contact",

            rows: [
              {
                label:
                  "Email",

                value:
                  config.contactEmail,

                href:
                  `mailto:${config.contactEmail}`,
              },
              {
                label:
                  "Instagram",

                value:
                  config.instagramHandle,

                href:
                  config.instagramUrl,
              },
            ],
          },
        ],

        requestId:
          context.requestId,

        submittedAt:
          context.submittedAt,

        action: {
          label:
            "Explore Money Records",

          href:
            config.siteUrl,
        },

        footerNote:
          "Submitting an inquiry does not guarantee service availability, campaign acceptance, specific performance, placements, streams, views, press coverage, or artist representation.",
      };

  return {
    subject:
      "Money Records Received Your Inquiry",

    html:
      renderEmailLayout(
        layout,
      ),

    text:
      renderPlainTextEmail(
        layout,
      ),
  };
}

/* --------------------------------------------------------------------- */
/* Music Submission Email Templates                                      */
/* --------------------------------------------------------------------- */

function getSubmissionStreamingRows(
  submission: ValidatedMusicSubmission,
): EmailDetailRow[] {
  return [
    {
      label:
        "Primary Music Link",

      value:
        submission.musicLink,

      href:
        submission.musicLink,
    },
    {
      label:
        "Spotify",

      value:
        submission.streamingLinks.spotify,

      href:
        submission.streamingLinks.spotify,
    },
    {
      label:
        "Apple Music",

      value:
        submission.streamingLinks.appleMusic,

      href:
        submission.streamingLinks.appleMusic,
    },
    {
      label:
        "YouTube",

      value:
        submission.streamingLinks.youtube,

      href:
        submission.streamingLinks.youtube,
    },
    {
      label:
        "SoundCloud",

      value:
        submission.streamingLinks.soundcloud,

      href:
        submission.streamingLinks.soundcloud,
    },
    {
      label:
        "Audiomack",

      value:
        submission.streamingLinks.audiomack,

      href:
        submission.streamingLinks.audiomack,
    },
  ];
}

function getSubmissionSocialRows(
  submission: ValidatedMusicSubmission,
): EmailDetailRow[] {
  return [
    {
      label:
        "Instagram",

      value:
        submission.socialLinks.instagram,

      href:
        submission.socialLinks.instagram,
    },
    {
      label:
        "TikTok",

      value:
        submission.socialLinks.tiktok,

      href:
        submission.socialLinks.tiktok,
    },
    {
      label:
        "Website",

      value:
        submission.socialLinks.website,

      href:
        submission.socialLinks.website,
    },
  ];
}

export function buildMusicSubmissionNotificationEmail(
  submission: ValidatedMusicSubmission,
  context: EmailRequestContext = {},
): EmailTemplate {
  const goals =
    submission.goals
      .map(
        formatSlugLabel,
      )
      .join(", ");

  const secondaryGenres =
    submission.secondaryGenres
      .map(
        formatSlugLabel,
      )
      .join(", ");

  const layout:
    EmailLayoutOptions =
      {
        eyebrow:
          "New Artist Submission",

        title:
          `${submission.artistName} — ${submission.releaseTitle}`,

        intro:
          "A new artist and music submission was received through the Money Records website. Review the music, artist information, goals, links, and rights confirmations below.",

        sections: [
          {
            title:
              "Contact Information",

            rows: [
              {
                label:
                  "Submitted By",

                value:
                  submission.fullName,
              },
              {
                label:
                  "Email",

                value:
                  submission.email,

                href:
                  `mailto:${submission.email}`,
              },
              {
                label:
                  "Phone",

                value:
                  submission.phone,
              },
            ],
          },
          {
            title:
              "Artist Information",

            rows: [
              {
                label:
                  "Artist Name",

                value:
                  submission.artistName,
              },
              {
                label:
                  "Location",

                value:
                  submission.location,
              },
              {
                label:
                  "Primary Genre",

                value:
                  formatSlugLabel(
                    submission.primaryGenre,
                  ),
              },
              {
                label:
                  "Secondary Genres",

                value:
                  secondaryGenres ||
                  "None selected",
              },
              {
                label:
                  "Monthly Listeners",

                value:
                  formatNumber(
                    submission.monthlyListeners,
                  ),
              },
              {
                label:
                  "Social Following",

                value:
                  formatNumber(
                    submission.socialFollowing,
                  ),
              },
            ],
          },
          {
            title:
              "Release Information",

            rows: [
              {
                label:
                  "Release Title",

                value:
                  submission.releaseTitle,
              },
              {
                label:
                  "Release Type",

                value:
                  formatSlugLabel(
                    submission.releaseType,
                  ),
              },
              {
                label:
                  "Release Status",

                value:
                  formatSlugLabel(
                    submission.releaseStatus,
                  ),
              },
              {
                label:
                  "Release Date",

                value:
                  submission.releaseDate,
              },
              {
                label:
                  "Goals",

                value:
                  goals,
              },
            ],
          },
          {
            title:
              "Music and Streaming Links",

            rows:
              getSubmissionStreamingRows(
                submission,
              ),
          },
          {
            title:
              "Social and Artist Links",

            rows:
              getSubmissionSocialRows(
                submission,
              ),
          },
          {
            title:
              "Artist Story and Message",

            rows: [
              {
                label:
                  "Artist Story",

                value:
                  submission.artistStory,
              },
              {
                label:
                  "Additional Message",

                value:
                  submission.message,
              },
            ],
          },
          {
            title:
              "Submission Confirmations",

            rows: [
              {
                label:
                  "Rights Confirmed",

                value:
                  submission.ownsRights
                    ? "Yes"
                    : "No",
              },
              {
                label:
                  "Terms Accepted",

                value:
                  submission.acceptsSubmissionTerms
                    ? "Yes"
                    : "No",
              },
              {
                label:
                  "Contact Consent",

                value:
                  submission.consent
                    ? "Yes"
                    : "No",
              },
            ],
          },
        ],

        requestId:
          context.requestId,

        submittedAt:
          context.submittedAt,

        sourceUrl:
          context.sourceUrl,

        action: {
          label:
            "Listen to Submission",

          href:
            submission.musicLink,
        },

        footerNote:
          "Verify ownership, identity, release status, and all submitted claims before offering distribution, marketing, representation, or label services.",
      };

  return {
    subject:
      sanitizeEmailSubject(
        `New Music Submission — ${submission.artistName} — ${submission.releaseTitle}`,
      ),

    html:
      renderEmailLayout(
        layout,
      ),

    text:
      renderPlainTextEmail(
        layout,
      ),
  };
}

export function buildMusicSubmissionConfirmationEmail(
  submission: ValidatedMusicSubmission,
  context: EmailRequestContext = {},
): EmailTemplate {
  const configuration =
    getEmailConfiguration();

  const config =
    configuration.ok
      ? configuration.config
      : {
          contactEmail:
            DEFAULT_CONTACT_EMAIL,

          siteUrl:
            DEFAULT_SITE_URL,

          instagramUrl:
            DEFAULT_INSTAGRAM_URL,

          instagramHandle:
            DEFAULT_INSTAGRAM_HANDLE,
        };

  const layout:
    EmailLayoutOptions =
      {
        eyebrow:
          "Music Submission Received",

        title:
          `Thank You, ${submission.artistName}`,

        intro:
          "Money Records has received your music submission. Our team will review the release information, artist details, links, and goals you provided.",

        sections: [
          {
            title:
              "Submission Summary",

            rows: [
              {
                label:
                  "Artist",

                value:
                  submission.artistName,
              },
              {
                label:
                  "Release",

                value:
                  submission.releaseTitle,
              },
              {
                label:
                  "Release Type",

                value:
                  formatSlugLabel(
                    submission.releaseType,
                  ),
              },
              {
                label:
                  "Primary Genre",

                value:
                  formatSlugLabel(
                    submission.primaryGenre,
                  ),
              },
              {
                label:
                  "Contact Email",

                value:
                  submission.email,
              },
              {
                label:
                  "Music Link",

                value:
                  submission.musicLink,

                href:
                  submission.musicLink,
              },
            ],
          },
          {
            title:
              "What Happens Next",

            rows: [
              {
                label:
                  "Step 1",

                value:
                  "The Money Records team reviews the submitted information and music.",
              },
              {
                label:
                  "Step 2",

                value:
                  "The team determines whether the submission matches current label or service opportunities.",
              },
              {
                label:
                  "Step 3",

                value:
                  "Money Records may contact you using the email or phone number included in the submission.",
              },
            ],
          },
          {
            title:
              "Money Records Contact",

            rows: [
              {
                label:
                  "Email",

                value:
                  config.contactEmail,

                href:
                  `mailto:${config.contactEmail}`,
              },
              {
                label:
                  "Instagram",

                value:
                  config.instagramHandle,

                href:
                  config.instagramUrl,
              },
            ],
          },
        ],

        requestId:
          context.requestId,

        submittedAt:
          context.submittedAt,

        action: {
          label:
            "Explore Money Records",

          href:
            config.siteUrl,
        },

        footerNote:
          "A submission does not guarantee signing, representation, distribution, marketing approval, playlist placement, streams, views, press coverage, radio play, or a response within a specific period.",
      };

  return {
    subject:
      sanitizeEmailSubject(
        `Money Records Received “${submission.releaseTitle}”`,
      ),

    html:
      renderEmailLayout(
        layout,
      ),

    text:
      renderPlainTextEmail(
        layout,
      ),
  };
}

/* --------------------------------------------------------------------- */
/* Inquiry Delivery                                                       */
/* --------------------------------------------------------------------- */

export async function sendInquiryNotificationEmail(
  inquiry: ValidatedInquiry,
  context: EmailRequestContext = {},
): Promise<EmailSendResult> {
  const configuration =
    getEmailConfiguration();

  if (!configuration.ok) {
    return createConfigurationFailure(
      configuration.error,
    );
  }

  const requestId =
    context.requestId ||
    createRequestId(
      "inquiry",
    );

  const submittedAt =
    context.submittedAt ||
    new Date().toISOString();

  const template =
    buildInquiryNotificationEmail(
      inquiry,
      {
        ...context,

        requestId,

        submittedAt,
      },
    );

  return sendEmail(
    {
      to:
        configuration
          .config
          .inquiryRecipients,

      replyTo:
        inquiry.email,

      subject:
        template.subject,

      html:
        template.html,

      text:
        template.text,

      tags: [
        {
          name:
            "category",

          value:
            "inquiry",
        },
        {
          name:
            "inquiry_type",

          value:
            inquiry.inquiryType,
        },
      ],
    },
    {
      idempotencyKey:
        `${requestId}:notification`,
    },
  );
}

export async function sendInquiryConfirmationEmail(
  inquiry: ValidatedInquiry,
  context: EmailRequestContext = {},
): Promise<EmailSendResult> {
  const configuration =
    getEmailConfiguration();

  if (!configuration.ok) {
    return createConfigurationFailure(
      configuration.error,
    );
  }

  const requestId =
    context.requestId ||
    createRequestId(
      "inquiry",
    );

  const submittedAt =
    context.submittedAt ||
    new Date().toISOString();

  const template =
    buildInquiryConfirmationEmail(
      inquiry,
      {
        ...context,

        requestId,

        submittedAt,
      },
    );

  return sendEmail(
    {
      to:
        inquiry.email,

      replyTo:
        configuration
          .config
          .replyToEmail,

      subject:
        template.subject,

      html:
        template.html,

      text:
        template.text,

      tags: [
        {
          name:
            "category",

          value:
            "inquiry_confirmation",
        },
      ],
    },
    {
      idempotencyKey:
        `${requestId}:confirmation`,
    },
  );
}

/**
 * Sends the internal inquiry notification followed by an optional customer
 * confirmation.
 *
 * The internal notification is considered the required delivery.
 */
export async function sendInquiryEmails(
  inquiry: ValidatedInquiry,
  context: EmailRequestContext = {},
): Promise<EmailWorkflowResult> {
  const configuration =
    getEmailConfiguration();

  if (!configuration.ok) {
    const failure =
      createConfigurationFailure(
        configuration.error,
      );

    return {
      ok: false,

      notification:
        failure,

      confirmation:
        null,
    };
  }

  const requestId =
    context.requestId ||
    createRequestId(
      "inquiry",
    );

  const submittedAt =
    context.submittedAt ||
    new Date().toISOString();

  const resolvedContext:
    EmailRequestContext =
      {
        ...context,

        requestId,

        submittedAt,
      };

  const notification =
    await sendInquiryNotificationEmail(
      inquiry,
      resolvedContext,
    );

  if (!notification.ok) {
    return {
      ok: false,

      notification,

      confirmation:
        null,
    };
  }

  const confirmation =
    configuration
      .config
      .sendConfirmations
      ? await sendInquiryConfirmationEmail(
          inquiry,
          resolvedContext,
        )
      : null;

  return {
    ok: true,

    notification,

    confirmation,
  };
}

/**
 * Compatibility alias for API routes that use the singular function name.
 */
export const sendInquiryEmail =
  sendInquiryEmails;

/* --------------------------------------------------------------------- */
/* Music Submission Delivery                                             */
/* --------------------------------------------------------------------- */

export async function sendMusicSubmissionNotificationEmail(
  submission: ValidatedMusicSubmission,
  context: EmailRequestContext = {},
): Promise<EmailSendResult> {
  const configuration =
    getEmailConfiguration();

  if (!configuration.ok) {
    return createConfigurationFailure(
      configuration.error,
    );
  }

  const requestId =
    context.requestId ||
    createRequestId(
      "submission",
    );

  const submittedAt =
    context.submittedAt ||
    new Date().toISOString();

  const template =
    buildMusicSubmissionNotificationEmail(
      submission,
      {
        ...context,

        requestId,

        submittedAt,
      },
    );

  return sendEmail(
    {
      to:
        configuration
          .config
          .submissionRecipients,

      replyTo:
        submission.email,

      subject:
        template.subject,

      html:
        template.html,

      text:
        template.text,

      tags: [
        {
          name:
            "category",

          value:
            "music_submission",
        },
        {
          name:
            "release_type",

          value:
            submission.releaseType,
        },
        {
          name:
            "primary_genre",

          value:
            submission.primaryGenre,
        },
      ],
    },
    {
      idempotencyKey:
        `${requestId}:notification`,
    },
  );
}

export async function sendMusicSubmissionConfirmationEmail(
  submission: ValidatedMusicSubmission,
  context: EmailRequestContext = {},
): Promise<EmailSendResult> {
  const configuration =
    getEmailConfiguration();

  if (!configuration.ok) {
    return createConfigurationFailure(
      configuration.error,
    );
  }

  const requestId =
    context.requestId ||
    createRequestId(
      "submission",
    );

  const submittedAt =
    context.submittedAt ||
    new Date().toISOString();

  const template =
    buildMusicSubmissionConfirmationEmail(
      submission,
      {
        ...context,

        requestId,

        submittedAt,
      },
    );

  return sendEmail(
    {
      to:
        submission.email,

      replyTo:
        configuration
          .config
          .replyToEmail,

      subject:
        template.subject,

      html:
        template.html,

      text:
        template.text,

      tags: [
        {
          name:
            "category",

          value:
            "submission_confirmation",
        },
      ],
    },
    {
      idempotencyKey:
        `${requestId}:confirmation`,
    },
  );
}

/**
 * Sends the internal artist-submission notification followed by an optional
 * artist confirmation email.
 */
export async function sendMusicSubmissionEmails(
  submission: ValidatedMusicSubmission,
  context: EmailRequestContext = {},
): Promise<EmailWorkflowResult> {
  const configuration =
    getEmailConfiguration();

  if (!configuration.ok) {
    const failure =
      createConfigurationFailure(
        configuration.error,
      );

    return {
      ok: false,

      notification:
        failure,

      confirmation:
        null,
    };
  }

  const requestId =
    context.requestId ||
    createRequestId(
      "submission",
    );

  const submittedAt =
    context.submittedAt ||
    new Date().toISOString();

  const resolvedContext:
    EmailRequestContext =
      {
        ...context,

        requestId,

        submittedAt,
      };

  const notification =
    await sendMusicSubmissionNotificationEmail(
      submission,
      resolvedContext,
    );

  if (!notification.ok) {
    return {
      ok: false,

      notification,

      confirmation:
        null,
    };
  }

  const confirmation =
    configuration
      .config
      .sendConfirmations
      ? await sendMusicSubmissionConfirmationEmail(
          submission,
          resolvedContext,
        )
      : null;

  return {
    ok: true,

    notification,

    confirmation,
  };
}

/**
 * Compatibility aliases for API routes using shorter function names.
 */
export const sendMusicSubmissionEmail =
  sendMusicSubmissionEmails;

export const sendSubmissionEmails =
  sendMusicSubmissionEmails;

export const sendSubmissionEmail =
  sendMusicSubmissionEmails;

/* --------------------------------------------------------------------- */
/* Configuration Status                                                  */
/* --------------------------------------------------------------------- */

/**
 * Allows server routes or health checks to verify email configuration
 * without exposing API keys or secret values.
 */
export function getEmailConfigurationStatus(): {
  configured: boolean;

  provider: "resend";

  confirmationsEnabled: boolean;

  error?: string;
} {
  const configuration =
    getEmailConfiguration();

  if (!configuration.ok) {
    return {
      configured:
        false,

      provider:
        "resend",

      confirmationsEnabled:
        false,

      error:
        configuration.error,
    };
  }

  return {
    configured:
      true,

    provider:
      "resend",

    confirmationsEnabled:
      configuration
        .config
        .sendConfirmations,
  };
}