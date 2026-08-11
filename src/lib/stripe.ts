import "server-only";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Stripe Server Utilities                              ┃
   ┃ File   : src/lib/stripe.ts                                           ┃
   ┃ Role   : Secure Stripe client, environment, URLs, metadata, errors   ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Stripe from "stripe";

/* --------------------------------------------------------------------- */
/* Environment Names                                                     */
/* --------------------------------------------------------------------- */

export const STRIPE_SECRET_KEY_ENV =
  "STRIPE_SECRET_KEY";

export const STRIPE_WEBHOOK_SECRET_ENV =
  "STRIPE_WEBHOOK_SECRET";

export const STRIPE_SITE_URL_ENV =
  "NEXT_PUBLIC_SITE_URL";

/* --------------------------------------------------------------------- */
/* Configuration                                                         */
/* --------------------------------------------------------------------- */

const STRIPE_APP_NAME =
  "Money Records";

const STRIPE_REQUEST_TIMEOUT_MS =
  20_000;

const STRIPE_MAX_NETWORK_RETRIES =
  2;

const CHECKOUT_SESSION_PLACEHOLDER =
  "{CHECKOUT_SESSION_ID}";

const CHECKOUT_SESSION_SENTINEL =
  "__MONEY_RECORDS_STRIPE_SESSION_ID__";

const DEFAULT_LOCAL_SITE_URL =
  "http://localhost:3000";

const DEFAULT_CHECKOUT_SUCCESS_PATH =
  "/checkout/success?session_id={CHECKOUT_SESSION_ID}";

const DEFAULT_CHECKOUT_CANCEL_PATH =
  "/checkout/cancelled";

/* --------------------------------------------------------------------- */
/* Types                                                                 */
/* --------------------------------------------------------------------- */

export type StripeEnvironment =
  | "test"
  | "live"
  | "unknown";

export type StripeMetadataInput =
  Record<string, unknown>;

export type StripeMetadata =
  Record<string, string>;

export type StripeErrorDetails = {
  message: string;
  type?: string;
  code?: string;
  declineCode?: string;
  requestId?: string;
  statusCode?: number;
};

export type StripeCheckoutRedirects = {
  successUrl: string;
  cancelUrl: string;
};

/* --------------------------------------------------------------------- */
/* Configuration Error                                                   */
/* --------------------------------------------------------------------- */

export class StripeConfigurationError extends Error {
  readonly code =
    "STRIPE_CONFIGURATION_ERROR";

  constructor(message: string) {
    super(message);

    this.name =
      "StripeConfigurationError";
  }
}

/* --------------------------------------------------------------------- */
/* Singleton Client                                                      */
/* --------------------------------------------------------------------- */

/**
 * Stripe is initialized lazily so Next.js builds do not fail merely from
 * importing a server module when environment variables are unavailable.
 */
let stripeClient: Stripe | null =
  null;

/* --------------------------------------------------------------------- */
/* General Utilities                                                     */
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

function readEnvironmentVariable(
  name: string,
): string | undefined {
  const value =
    process.env[name]?.trim();

  return value || undefined;
}

function removeTrailingSlashes(
  value: string,
): string {
  return value.replace(/\/+$/, "");
}

function normalizeHttpUrl(
  rawValue: string,
  variableName: string,
): string {
  try {
    const url =
      new URL(rawValue);

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      throw new Error(
        "Unsupported protocol.",
      );
    }

    return removeTrailingSlashes(
      url.toString(),
    );
  } catch {
    throw new StripeConfigurationError(
      `${variableName} must be a valid http or https URL.`,
    );
  }
}

function normalizeVercelUrl(
  rawValue: string,
): string {
  const value =
    rawValue.trim();

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return normalizeHttpUrl(
      value,
      "Vercel site URL",
    );
  }

  return normalizeHttpUrl(
    `https://${value}`,
    "Vercel site URL",
  );
}

/* --------------------------------------------------------------------- */
/* Stripe Secret Key                                                     */
/* --------------------------------------------------------------------- */

/**
 * Returns the server-only Stripe secret or restricted key.
 *
 * Never import this function into a Client Component.
 */
export function getStripeSecretKey(): string {
  const key =
    readEnvironmentVariable(
      STRIPE_SECRET_KEY_ENV,
    );

  if (!key) {
    throw new StripeConfigurationError(
      `${STRIPE_SECRET_KEY_ENV} is not configured.`,
    );
  }

  if (key.startsWith("pk_")) {
    throw new StripeConfigurationError(
      `${STRIPE_SECRET_KEY_ENV} contains a publishable key. A server-side secret key is required.`,
    );
  }

  const isSupportedSecretKey =
    /^(sk|rk)_(test|live)_/.test(
      key,
    );

  if (!isSupportedSecretKey) {
    throw new StripeConfigurationError(
      `${STRIPE_SECRET_KEY_ENV} does not appear to be a valid Stripe secret or restricted key.`,
    );
  }

  return key;
}

/**
 * Returns whether the configured Stripe key uses test or live mode.
 */
export function getStripeEnvironment(): StripeEnvironment {
  const key =
    getStripeSecretKey();

  if (
    key.startsWith("sk_test_") ||
    key.startsWith("rk_test_")
  ) {
    return "test";
  }

  if (
    key.startsWith("sk_live_") ||
    key.startsWith("rk_live_")
  ) {
    return "live";
  }

  return "unknown";
}

/**
 * Returns true when Stripe is configured in live mode.
 */
export function isStripeLiveMode(): boolean {
  return (
    getStripeEnvironment() ===
    "live"
  );
}

/* --------------------------------------------------------------------- */
/* Stripe Webhook Secret                                                 */
/* --------------------------------------------------------------------- */

/**
 * Returns the Stripe webhook signing secret.
 *
 * Step 53 will use this to verify incoming Stripe webhook signatures.
 */
export function getStripeWebhookSecret(): string {
  const secret =
    readEnvironmentVariable(
      STRIPE_WEBHOOK_SECRET_ENV,
    );

  if (!secret) {
    throw new StripeConfigurationError(
      `${STRIPE_WEBHOOK_SECRET_ENV} is not configured.`,
    );
  }

  if (
    !secret.startsWith("whsec_")
  ) {
    throw new StripeConfigurationError(
      `${STRIPE_WEBHOOK_SECRET_ENV} does not appear to be a valid Stripe webhook signing secret.`,
    );
  }

  return secret;
}

/* --------------------------------------------------------------------- */
/* Stripe Client                                                         */
/* --------------------------------------------------------------------- */

/**
 * Returns the shared server-side Stripe client.
 *
 * The API version is intentionally not hardcoded here. The installed
 * stripe-node version uses its supported default API version.
 */
export function getStripe(): Stripe {
  if (stripeClient) {
    return stripeClient;
  }

  const secretKey =
    getStripeSecretKey();

  stripeClient =
    new Stripe(secretKey, {
      maxNetworkRetries:
        STRIPE_MAX_NETWORK_RETRIES,

      timeout:
        STRIPE_REQUEST_TIMEOUT_MS,

      telemetry: true,

      appInfo: {
        name:
          STRIPE_APP_NAME,

        version:
          process.env
            .npm_package_version ??
          "1.0.0",

        url:
          "https://moneyrecords.io",
      },
    });

  return stripeClient;
}

/* --------------------------------------------------------------------- */
/* Application URL                                                       */
/* --------------------------------------------------------------------- */

/**
 * Returns the canonical site URL used for Stripe redirects.
 *
 * Resolution order:
 * 1. NEXT_PUBLIC_SITE_URL
 * 2. VERCEL_PROJECT_PRODUCTION_URL
 * 3. VERCEL_URL
 * 4. localhost during development
 */
export function getStripeSiteUrl(): string {
  const configuredSiteUrl =
    readEnvironmentVariable(
      STRIPE_SITE_URL_ENV,
    );

  if (configuredSiteUrl) {
    return normalizeHttpUrl(
      configuredSiteUrl,
      STRIPE_SITE_URL_ENV,
    );
  }

  const productionVercelUrl =
    readEnvironmentVariable(
      "VERCEL_PROJECT_PRODUCTION_URL",
    );

  if (productionVercelUrl) {
    return normalizeVercelUrl(
      productionVercelUrl,
    );
  }

  const deploymentVercelUrl =
    readEnvironmentVariable(
      "VERCEL_URL",
    );

  if (deploymentVercelUrl) {
    return normalizeVercelUrl(
      deploymentVercelUrl,
    );
  }

  if (
    process.env.NODE_ENV !==
    "production"
  ) {
    return DEFAULT_LOCAL_SITE_URL;
  }

  throw new StripeConfigurationError(
    `${STRIPE_SITE_URL_ENV} must be configured in production.`,
  );
}

/* --------------------------------------------------------------------- */
/* Secure Redirect Resolution                                            */
/* --------------------------------------------------------------------- */

/**
 * Converts a relative checkout path into a same-origin absolute URL.
 *
 * External success or cancellation URLs are rejected to prevent an open
 * redirect from being passed into Stripe Checkout.
 */
export function resolveStripeRedirectUrl(
  requestedPath: string | undefined,
  fallbackPath: string,
  siteUrl = getStripeSiteUrl(),
): string {
  const normalizedSiteUrl =
    normalizeHttpUrl(
      siteUrl,
      "Stripe site URL",
    );

  const baseUrl =
    new URL(
      `${normalizedSiteUrl}/`,
    );

  const safeFallback =
    fallbackPath.trim() ||
    "/";

  const requestedValue =
    requestedPath?.trim() ||
    safeFallback;

  /**
   * Temporarily protect Stripe's literal session placeholder so URL
   * normalization does not encode its curly brackets.
   */
  const protectedValue =
    requestedValue.replaceAll(
      CHECKOUT_SESSION_PLACEHOLDER,
      CHECKOUT_SESSION_SENTINEL,
    );

  const fallbackValue =
    safeFallback.replaceAll(
      CHECKOUT_SESSION_PLACEHOLDER,
      CHECKOUT_SESSION_SENTINEL,
    );

  let resolvedUrl: URL;

  try {
    resolvedUrl =
      new URL(
        protectedValue,
        baseUrl,
      );
  } catch {
    resolvedUrl =
      new URL(
        fallbackValue,
        baseUrl,
      );
  }

  if (
    resolvedUrl.origin !==
    baseUrl.origin
  ) {
    resolvedUrl =
      new URL(
        fallbackValue,
        baseUrl,
      );
  }

  return resolvedUrl
    .toString()
    .replaceAll(
      CHECKOUT_SESSION_SENTINEL,
      CHECKOUT_SESSION_PLACEHOLDER,
    );
}

/**
 * Creates secure same-origin Stripe Checkout success and cancellation
 * URLs.
 */
export function createStripeCheckoutRedirects(
  successPath?: string,
  cancelPath?: string,
  siteUrl = getStripeSiteUrl(),
): StripeCheckoutRedirects {
  return {
    successUrl:
      resolveStripeRedirectUrl(
        successPath,
        DEFAULT_CHECKOUT_SUCCESS_PATH,
        siteUrl,
      ),

    cancelUrl:
      resolveStripeRedirectUrl(
        cancelPath,
        DEFAULT_CHECKOUT_CANCEL_PATH,
        siteUrl,
      ),
  };
}

/* --------------------------------------------------------------------- */
/* Metadata                                                              */
/* --------------------------------------------------------------------- */

/**
 * Converts application values into Stripe-safe string metadata.
 *
 * Metadata should contain identifiers and operational references—not
 * secret values, full intake records, payment information, or large text.
 */
export function createStripeMetadata(
  input: StripeMetadataInput,
): StripeMetadata {
  const metadata:
    StripeMetadata = {};

  const entries =
    Object.entries(input);

  for (
    const [rawKey, rawValue]
    of entries
  ) {
    if (
      rawValue === undefined ||
      rawValue === null
    ) {
      continue;
    }

    const key =
      rawKey
        .trim()
        .replace(/[\[\]]/g, "_")
        .slice(0, 40);

    if (!key) {
      continue;
    }

    let value: string;

    if (
      typeof rawValue ===
        "string" ||
      typeof rawValue ===
        "number" ||
      typeof rawValue ===
        "boolean" ||
      typeof rawValue ===
        "bigint"
    ) {
      value =
        String(rawValue);
    } else if (
      rawValue instanceof Date
    ) {
      value =
        rawValue.toISOString();
    } else {
      try {
        value =
          JSON.stringify(
            rawValue,
          );
      } catch {
        continue;
      }
    }

    const normalizedValue =
      value.trim().slice(0, 500);

    if (!normalizedValue) {
      continue;
    }

    metadata[key] =
      normalizedValue;

    /**
     * Keep metadata intentionally small.
     */
    if (
      Object.keys(metadata)
        .length >= 40
    ) {
      break;
    }
  }

  return metadata;
}

/* --------------------------------------------------------------------- */
/* Idempotency Keys                                                      */
/* --------------------------------------------------------------------- */

/**
 * Creates a stable Stripe idempotency key.
 *
 * Use the same key when retrying creation of the same logical Stripe
 * resource. Do not reuse it for unrelated orders.
 */
export function createStripeIdempotencyKey(
  operation: string,
  identifier: string,
): string {
  const safeOperation =
    operation
      .trim()
      .toLowerCase()
      .replace(
        /[^a-z0-9_-]+/g,
        "-",
      )
      .replace(
        /^[-_]+|[-_]+$/g,
        "",
      ) ||
    "operation";

  const safeIdentifier =
    identifier
      .trim()
      .toLowerCase()
      .replace(
        /[^a-z0-9_-]+/g,
        "-",
      )
      .replace(
        /^[-_]+|[-_]+$/g,
        "",
      ) ||
    "unknown";

  return [
    "money-records",
    safeOperation,
    safeIdentifier,
  ]
    .join(":")
    .slice(0, 240);
}

/* --------------------------------------------------------------------- */
/* Checkout Session URL                                                  */
/* --------------------------------------------------------------------- */

/**
 * Returns a validated Stripe Checkout Session URL.
 */
export function getStripeCheckoutSessionUrl(
  session: Stripe.Checkout.Session,
): string {
  if (!session.url) {
    throw new Error(
      "Stripe created a Checkout Session without a hosted checkout URL.",
    );
  }

  try {
    const url =
      new URL(session.url);

    if (
      url.protocol !== "https:"
    ) {
      throw new Error(
        "Stripe Checkout URL must use HTTPS.",
      );
    }

    return url.toString();
  } catch {
    throw new Error(
      "Stripe returned an invalid Checkout Session URL.",
    );
  }
}

/* --------------------------------------------------------------------- */
/* Stripe Error Handling                                                 */
/* --------------------------------------------------------------------- */

function getUnknownString(
  record: Record<string, unknown>,
  key: string,
): string | undefined {
  const value =
    record[key];

  return typeof value ===
    "string"
    ? value
    : undefined;
}

function getUnknownNumber(
  record: Record<string, unknown>,
  key: string,
): number | undefined {
  const value =
    record[key];

  return typeof value ===
    "number"
    ? value
    : undefined;
}

/**
 * Converts an unknown Stripe or network error into safe operational
 * details.
 */
export function getStripeErrorDetails(
  error: unknown,
): StripeErrorDetails {
  if (
    error instanceof
    Stripe.errors.StripeError
  ) {
    return {
      message:
        error.message ||
        "Stripe could not process the request.",

      type:
        error.type,

      code:
        error.code,

      declineCode:
        error.decline_code,

      requestId:
        error.requestId,

      statusCode:
        error.statusCode,
    };
  }

  if (error instanceof Error) {
    return {
      message:
        error.message ||
        "Stripe could not process the request.",
    };
  }

  if (isRecord(error)) {
    return {
      message:
        getUnknownString(
          error,
          "message",
        ) ??
        "Stripe could not process the request.",

      type:
        getUnknownString(
          error,
          "type",
        ),

      code:
        getUnknownString(
          error,
          "code",
        ),

      declineCode:
        getUnknownString(
          error,
          "decline_code",
        ),

      requestId:
        getUnknownString(
          error,
          "requestId",
        ),

      statusCode:
        getUnknownNumber(
          error,
          "statusCode",
        ),
    };
  }

  return {
    message:
      "Stripe could not process the request.",
  };
}

/**
 * Returns a safe customer-facing Stripe error message.
 */
export function getStripeErrorMessage(
  error: unknown,
): string {
  const details =
    getStripeErrorDetails(error);

  switch (details.code) {
    case "card_declined":
      return "Your payment method was declined. Please use another payment method.";

    case "expired_card":
      return "Your payment card has expired. Please use another payment method.";

    case "incorrect_cvc":
      return "The card security code was incorrect. Please review it and try again.";

    case "incorrect_number":
      return "The card number was incorrect. Please review it and try again.";

    case "processing_error":
      return "The payment could not be processed. Please try again.";

    case "rate_limit":
      return "Checkout is temporarily busy. Please wait a moment and try again.";

    default:
      break;
  }

  if (
    details.statusCode ===
    401
  ) {
    return "Stripe authentication failed. Please contact Money Records support.";
  }

  if (
    details.statusCode ===
    429
  ) {
    return "Checkout is temporarily busy. Please wait a moment and try again.";
  }

  if (
    details.statusCode &&
    details.statusCode >= 500
  ) {
    return "Stripe is temporarily unavailable. Please try again shortly.";
  }

  return (
    details.message ||
    "Secure checkout could not be created. Please try again."
  );
}

/* --------------------------------------------------------------------- */
/* Webhook Verification                                                  */
/* --------------------------------------------------------------------- */

/**
 * Verifies and constructs a Stripe webhook event.
 *
 * The exact raw request body must be supplied. Do not parse the webhook
 * request as JSON before calling this function.
 */
export function constructStripeWebhookEvent(
  rawBody: string | Buffer,
  signature: string,
): Stripe.Event {
  if (!signature.trim()) {
    throw new Error(
      "The Stripe-Signature header is missing.",
    );
  }

  return getStripe().webhooks.constructEvent(
    rawBody,
    signature,
    getStripeWebhookSecret(),
  );
}

/* --------------------------------------------------------------------- */
/* Checkout Session Retrieval                                            */
/* --------------------------------------------------------------------- */

/**
 * Retrieves a Checkout Session for the success page or server-side order
 * verification.
 */
export async function retrieveStripeCheckoutSession(
  sessionId: string,
  expand: string[] = [
    "line_items",
    "payment_intent",
    "customer",
  ],
): Promise<Stripe.Checkout.Session> {
  const normalizedSessionId =
    sessionId.trim();

  if (
    !normalizedSessionId.startsWith(
      "cs_",
    )
  ) {
    throw new Error(
      "A valid Stripe Checkout Session ID is required.",
    );
  }

  return getStripe().checkout.sessions.retrieve(
    normalizedSessionId,
    {
      expand,
    },
  );
}