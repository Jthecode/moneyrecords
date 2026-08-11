// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Inquiry API                                          ┃
   ┃ File   : src/app/api/inquiries/route.ts                              ┃
   ┃ Role   : Validate, protect, and deliver Money Records inquiries      ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  randomUUID,
} from "node:crypto";

import {
  NextResponse,
  type NextRequest,
} from "next/server";

import {
  sendInquiryEmails,
  type EmailSendFailure,
} from "@/lib/email";

import {
  createValidationResponse,
  isRecord,
  normalizeSingleLine,
  validateInquiry,
} from "@/lib/validation";

/* --------------------------------------------------------------------- */
/* Route Configuration                                                    */
/* --------------------------------------------------------------------- */

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

/* --------------------------------------------------------------------- */
/* Constants                                                              */
/* --------------------------------------------------------------------- */

/**
 * The inquiry form is small JSON.
 *
 * This upper limit protects the API from unexpectedly large request bodies
 * while leaving plenty of room for legitimate inquiry submissions.
 */
const MAX_REQUEST_BODY_BYTES =
  100_000;

/**
 * Public success message returned after the internal Money Records
 * notification has been delivered successfully.
 */
const SUCCESS_MESSAGE =
  "Your inquiry has been received by Money Records.";

/**
 * Honeypot submissions receive a normal-looking response without actually
 * sending an email.
 *
 * This avoids telling automated spam systems that they triggered the trap.
 */
const HONEYPOT_SUCCESS_MESSAGE =
  "Your inquiry has been received.";

/* --------------------------------------------------------------------- */
/* Response Types                                                         */
/* --------------------------------------------------------------------- */

type InquirySuccessResponse = {
  ok: true;
  success: true;
  message: string;
  requestId: string;
};

type InquiryErrorResponse = {
  ok: false;
  success: false;
  error: string;
  message?: string;
  code: string;
  requestId: string;
  fieldErrors?: Record<
    string,
    string
  >;
};

/* --------------------------------------------------------------------- */
/* Response Helpers                                                       */
/* --------------------------------------------------------------------- */

function createResponseHeaders(
  requestId: string,
): HeadersInit {
  return {
    "Cache-Control":
      "no-store, max-age=0",

    "X-Request-Id":
      requestId,

    "X-Content-Type-Options":
      "nosniff",
  };
}

function successResponse({
  requestId,
  message = SUCCESS_MESSAGE,
}: {
  requestId: string;
  message?: string;
}) {
  const body:
    InquirySuccessResponse = {
      ok: true,
      success: true,
      message,
      requestId,
    };

  return NextResponse.json(
    body,
    {
      status: 200,

      headers:
        createResponseHeaders(
          requestId,
        ),
    },
  );
}

function errorResponse({
  requestId,
  status,
  error,
  message,
  code,
  fieldErrors,
}: {
  requestId: string;
  status: number;
  error: string;
  message?: string;
  code: string;
  fieldErrors?: Record<
    string,
    string
  >;
}) {
  const body:
    InquiryErrorResponse = {
      ok: false,
      success: false,
      error,
      code,
      requestId,

      ...(message
        ? {
            message,
          }
        : {}),

      ...(fieldErrors
        ? {
            fieldErrors,
          }
        : {}),
    };

  return NextResponse.json(
    body,
    {
      status,

      headers:
        createResponseHeaders(
          requestId,
        ),
    },
  );
}

/* --------------------------------------------------------------------- */
/* Request Helpers                                                        */
/* --------------------------------------------------------------------- */

function createRequestId(): string {
  return `inquiry_${randomUUID()}`;
}

/**
 * Content-Length is useful as an early rejection check, but it cannot be
 * trusted by itself because clients are not required to provide it.
 *
 * The actual body length is checked again after reading the request.
 */
function getDeclaredContentLength(
  request: NextRequest,
): number | null {
  const rawValue =
    request.headers.get(
      "content-length",
    );

  if (!rawValue) {
    return null;
  }

  const parsed =
    Number(rawValue);

  if (
    !Number.isSafeInteger(
      parsed,
    ) ||
    parsed < 0
  ) {
    return null;
  }

  return parsed;
}

function isJsonRequest(
  request: NextRequest,
): boolean {
  const contentType =
    request.headers
      .get("content-type")
      ?.toLowerCase()
      .trim();

  if (!contentType) {
    return false;
  }

  return (
    contentType ===
      "application/json" ||
    contentType.startsWith(
      "application/json;",
    )
  );
}

function getUtf8ByteLength(
  value: string,
): number {
  return Buffer.byteLength(
    value,
    "utf8",
  );
}

function parseJsonBody(
  value: string,
): unknown {
  return JSON.parse(
    value,
  ) as unknown;
}

/* --------------------------------------------------------------------- */
/* Source URL                                                             */
/* --------------------------------------------------------------------- */

/**
 * We only keep an HTTP(S) referer for internal notification context.
 *
 * Query strings and fragments are removed so URLs containing temporary or
 * sensitive values are not forwarded into email unnecessarily.
 */
function getSafeSourceUrl(
  request: NextRequest,
): string | undefined {
  const referer =
    request.headers.get(
      "referer",
    );

  if (!referer) {
    return undefined;
  }

  try {
    const url =
      new URL(referer);

    if (
      url.protocol !==
        "https:" &&
      url.protocol !==
        "http:"
    ) {
      return undefined;
    }

    url.search = "";
    url.hash = "";

    return url.toString();
  } catch {
    return undefined;
  }
}

/* --------------------------------------------------------------------- */
/* Honeypot                                                               */
/* --------------------------------------------------------------------- */

/**
 * The InquiryForm sends a field named "website" as an invisible honeypot.
 *
 * Real users never interact with it. Spam bots commonly populate every
 * available input.
 */
function isHoneypotSubmission(
  body: unknown,
): boolean {
  if (!isRecord(body)) {
    return false;
  }

  return (
    normalizeSingleLine(
      body.website,
    ).length > 0
  );
}

/* --------------------------------------------------------------------- */
/* Email Failure Helpers                                                  */
/* --------------------------------------------------------------------- */

function getEmailFailureStatus(
  failure: EmailSendFailure,
): number {
  switch (
    failure.code
  ) {
    case "EMAIL_NOT_CONFIGURED":
      return 503;

    case "EMAIL_REQUEST_TIMEOUT":
      return 504;

    case "EMAIL_NETWORK_ERROR":
      return 503;

    case "EMAIL_PROVIDER_ERROR":
      return 502;

    case "EMAIL_INVALID_MESSAGE":
      return 500;

    case "EMAIL_UNKNOWN_ERROR":
    default:
      return 500;
  }
}

function getEmailFailurePublicMessage(
  failure: EmailSendFailure,
): string {
  switch (
    failure.code
  ) {
    case "EMAIL_REQUEST_TIMEOUT":
      return "The inquiry service took too long to respond. Please try again.";

    case "EMAIL_NETWORK_ERROR":
      return "The inquiry service is temporarily unavailable. Please try again.";

    case "EMAIL_NOT_CONFIGURED":
      return "The inquiry service is temporarily unavailable.";

    case "EMAIL_PROVIDER_ERROR":
      return "The inquiry could not be delivered right now. Please try again.";

    case "EMAIL_INVALID_MESSAGE":
    case "EMAIL_UNKNOWN_ERROR":
    default:
      return "The inquiry could not be delivered. Please try again.";
  }
}

/* --------------------------------------------------------------------- */
/* POST /api/inquiries                                                    */
/* --------------------------------------------------------------------- */

export async function POST(
  request: NextRequest,
) {
  const requestId =
    createRequestId();

  const submittedAt =
    new Date()
      .toISOString();

  /* ------------------------------------------------------------------- */
  /* Content Type                                                        */
  /* ------------------------------------------------------------------- */

  if (
    !isJsonRequest(
      request,
    )
  ) {
    return errorResponse({
      requestId,

      status:
        415,

      error:
        "This endpoint accepts JSON requests only.",

      code:
        "UNSUPPORTED_MEDIA_TYPE",
    });
  }

  /* ------------------------------------------------------------------- */
  /* Early Size Check                                                    */
  /* ------------------------------------------------------------------- */

  const declaredLength =
    getDeclaredContentLength(
      request,
    );

  if (
    declaredLength !==
      null &&
    declaredLength >
      MAX_REQUEST_BODY_BYTES
  ) {
    return errorResponse({
      requestId,

      status:
        413,

      error:
        "The inquiry request is too large.",

      code:
        "REQUEST_TOO_LARGE",
    });
  }

  /* ------------------------------------------------------------------- */
  /* Read Request Body                                                   */
  /* ------------------------------------------------------------------- */

  let rawBody:
    string;

  try {
    rawBody =
      await request.text();
  } catch {
    console.error(
      "[Money Records][Inquiry] Failed to read request body.",
      {
        requestId,
      },
    );

    return errorResponse({
      requestId,

      status:
        400,

      error:
        "The inquiry request could not be read.",

      code:
        "INVALID_REQUEST_BODY",
    });
  }

  /* ------------------------------------------------------------------- */
  /* Actual Size Check                                                   */
  /* ------------------------------------------------------------------- */

  if (
    getUtf8ByteLength(
      rawBody,
    ) >
    MAX_REQUEST_BODY_BYTES
  ) {
    return errorResponse({
      requestId,

      status:
        413,

      error:
        "The inquiry request is too large.",

      code:
        "REQUEST_TOO_LARGE",
    });
  }

  if (
    !rawBody.trim()
  ) {
    return errorResponse({
      requestId,

      status:
        400,

      error:
        "The inquiry request is empty.",

      code:
        "EMPTY_REQUEST_BODY",
    });
  }

  /* ------------------------------------------------------------------- */
  /* Parse JSON                                                          */
  /* ------------------------------------------------------------------- */

  let body:
    unknown;

  try {
    body =
      parseJsonBody(
        rawBody,
      );
  } catch {
    return errorResponse({
      requestId,

      status:
        400,

      error:
        "The inquiry request contains invalid JSON.",

      code:
        "INVALID_JSON",
    });
  }

  /* ------------------------------------------------------------------- */
  /* Honeypot Protection                                                 */
  /* ------------------------------------------------------------------- */

  if (
    isHoneypotSubmission(
      body,
    )
  ) {
    console.warn(
      "[Money Records][Inquiry] Honeypot submission ignored.",
      {
        requestId,
      },
    );

    /*
     * Intentionally return success.
     *
     * Do not expose to automated systems that the anti-spam field caused
     * the submission to be rejected internally.
     */
    return successResponse({
      requestId,

      message:
        HONEYPOT_SUCCESS_MESSAGE,
    });
  }

  /* ------------------------------------------------------------------- */
  /* Server Validation                                                   */
  /* ------------------------------------------------------------------- */

  const validation =
    validateInquiry(
      body,
    );

  if (
    !validation.ok
  ) {
    const validationResponse =
      createValidationResponse(
        validation,
      );

    return errorResponse({
      requestId,

      status:
        422,

      error:
        validationResponse.error,

      code:
        validationResponse.code,

      fieldErrors:
        validationResponse
          .fieldErrors,
    });
  }

  const inquiry =
    validation.data;

  /* ------------------------------------------------------------------- */
  /* Email Delivery                                                      */
  /* ------------------------------------------------------------------- */

  const emailResult =
    await sendInquiryEmails(
      inquiry,
      {
        requestId,

        submittedAt,

        sourceUrl:
          getSafeSourceUrl(
            request,
          ),
      },
    );

  /* ------------------------------------------------------------------- */
  /* Required Internal Notification Failed                               */
  /* ------------------------------------------------------------------- */

  if (
    !emailResult.ok
  ) {
    const failure =
      emailResult.notification;

    /*
     * Keep provider details in server logs only.
     *
     * Never expose internal Resend configuration or provider error details
     * directly to the public browser response.
     */
    console.error(
      "[Money Records][Inquiry] Internal notification failed.",
      {
        requestId,

        code:
          failure.ok
            ? undefined
            : failure.code,

        status:
          failure.ok
            ? undefined
            : failure.status,

        providerErrorName:
          failure.ok
            ? undefined
            : failure
                .providerErrorName,
      },
    );

    if (
      !failure.ok
    ) {
      return errorResponse({
        requestId,

        status:
          getEmailFailureStatus(
            failure,
          ),

        error:
          getEmailFailurePublicMessage(
            failure,
          ),

        code:
          "INQUIRY_DELIVERY_FAILED",
      });
    }

    /*
     * Defensive fallback. The workflow should never report ok:false while
     * the required notification reports ok:true.
     */
    return errorResponse({
      requestId,

      status:
        500,

      error:
        "The inquiry could not be completed. Please try again.",

      code:
        "INQUIRY_DELIVERY_FAILED",
    });
  }

  /* ------------------------------------------------------------------- */
  /* Confirmation Warning                                                */
  /* ------------------------------------------------------------------- */

  if (
    emailResult.confirmation &&
    !emailResult
      .confirmation
      .ok
  ) {
    /*
     * The internal notification already reached Money Records, so the
     * inquiry itself remains successful even if the customer confirmation
     * email fails.
     */
    console.warn(
      "[Money Records][Inquiry] Customer confirmation email failed.",
      {
        requestId,

        code:
          emailResult
            .confirmation
            .code,

        status:
          emailResult
            .confirmation
            .status,

        providerErrorName:
          emailResult
            .confirmation
            .providerErrorName,
      },
    );
  }

  /* ------------------------------------------------------------------- */
  /* Success Logging                                                     */
  /* ------------------------------------------------------------------- */

  console.info(
    "[Money Records][Inquiry] Inquiry delivered.",
    {
      requestId,

      inquiryType:
        inquiry.inquiryType,

      service:
        inquiry.service,

      confirmationSent:
        emailResult
          .confirmation
          ?.ok ??
        false,
    },
  );

  /* ------------------------------------------------------------------- */
  /* Success                                                             */
  /* ------------------------------------------------------------------- */

  return successResponse({
    requestId,
  });
}