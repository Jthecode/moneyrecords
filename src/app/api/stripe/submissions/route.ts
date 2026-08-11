// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Music Submission API                                 ┃
   ┃ File   : src/app/api/submissions/route.ts                            ┃
   ┃ Role   : Validate, protect, and deliver artist/music submissions     ┃
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
  sendMusicSubmissionEmails,
  type EmailSendFailure,
} from "@/lib/email";

import {
  createValidationResponse,
  isRecord,
  normalizeSingleLine,
  validateMusicSubmission,
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
 * Music submissions contain significantly more text and links than a
 * standard business inquiry.
 *
 * The client form currently allows:
 * - Up to 8,000 characters for the artist story
 * - Up to 5,000 characters for the additional message
 * - Multiple streaming/social URLs
 * - Genre and goal arrays
 *
 * 250 KB leaves generous room for the current JSON payload while still
 * protecting the endpoint from unexpectedly large requests.
 */
const MAX_REQUEST_BODY_BYTES =
  250_000;

/**
 * Public success response after the required Money Records notification
 * has been delivered.
 */
const SUCCESS_MESSAGE =
  "Your music submission has been received by Money Records.";

/**
 * Honeypot submissions intentionally receive a normal-looking response.
 *
 * This prevents automated spam systems from learning that they triggered
 * the anti-spam field.
 */
const HONEYPOT_SUCCESS_MESSAGE =
  "Your music submission has been received.";

/* --------------------------------------------------------------------- */
/* Response Types                                                         */
/* --------------------------------------------------------------------- */

type SubmissionSuccessResponse = {
  ok: true;
  success: true;
  message: string;
  requestId: string;

  /**
   * Compatibility alias used by MusicSubmissionForm.tsx.
   */
  submissionId: string;
};

type SubmissionErrorResponse = {
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
    SubmissionSuccessResponse = {
      ok: true,
      success: true,
      message,
      requestId,

      /*
       * MusicSubmissionForm.tsx accepts either requestId or submissionId.
       * Returning both keeps the public API explicit and compatible.
       */
      submissionId:
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
    SubmissionErrorResponse = {
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
  return `submission_${randomUUID()}`;
}

/**
 * The declared Content-Length provides an early size check.
 *
 * It is not trusted by itself because clients may omit it or provide an
 * incorrect value. The actual UTF-8 body size is checked again after the
 * request is read.
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
/* Safe Source URL                                                        */
/* --------------------------------------------------------------------- */

/**
 * The source page can be included with the internal Money Records email.
 *
 * Query parameters and fragments are removed so temporary tokens, tracking
 * values, or other URL data are not unnecessarily copied into email.
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
 * MusicSubmissionForm.tsx sends an invisible field named "website".
 *
 * Real users cannot see or interact with the field. Basic form-filling
 * bots commonly populate it automatically.
 *
 * The visible artist website field is named "websiteUrl", so it does not
 * conflict with this honeypot.
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
/* Email Failure Mapping                                                  */
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
      return "The music submission service took too long to respond. Please try again.";

    case "EMAIL_NETWORK_ERROR":
      return "The music submission service is temporarily unavailable. Please try again.";

    case "EMAIL_NOT_CONFIGURED":
      return "The music submission service is temporarily unavailable.";

    case "EMAIL_PROVIDER_ERROR":
      return "Your music submission could not be delivered right now. Please try again.";

    case "EMAIL_INVALID_MESSAGE":
    case "EMAIL_UNKNOWN_ERROR":
    default:
      return "Your music submission could not be delivered. Please try again.";
  }
}

/* --------------------------------------------------------------------- */
/* Safe Logging Helpers                                                   */
/* --------------------------------------------------------------------- */

/**
 * Only log non-sensitive operational metadata.
 *
 * Do not log:
 * - The music URL
 * - Artist story
 * - Phone number
 * - Email address
 * - Social links
 * - Streaming links
 * - Additional message
 */
function getSubmissionLogMetadata({
  requestId,
  artistName,
  releaseType,
  releaseStatus,
  primaryGenre,
  goalCount,
}: {
  requestId: string;
  artistName: string;
  releaseType: string;
  releaseStatus: string;
  primaryGenre: string;
  goalCount: number;
}) {
  return {
    requestId,

    artistName,

    releaseType,

    releaseStatus,

    primaryGenre,

    goalCount,
  };
}

/* --------------------------------------------------------------------- */
/* POST /api/submissions                                                  */
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
  /* Early Request Size Check                                            */
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
        "The music submission request is too large.",

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
      "[Money Records][Submission] Failed to read request body.",
      {
        requestId,
      },
    );

    return errorResponse({
      requestId,

      status:
        400,

      error:
        "The music submission request could not be read.",

      code:
        "INVALID_REQUEST_BODY",
    });
  }

  /* ------------------------------------------------------------------- */
  /* Actual Request Size Check                                           */
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
        "The music submission request is too large.",

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
        "The music submission request is empty.",

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
        "The music submission request contains invalid JSON.",

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
      "[Money Records][Submission] Honeypot submission ignored.",
      {
        requestId,
      },
    );

    /*
     * Return a normal success response so the bot does not learn that the
     * anti-spam field caused the submission to be discarded.
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
    validateMusicSubmission(
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

  const submission =
    validation.data;

  /* ------------------------------------------------------------------- */
  /* Submission Metadata                                                 */
  /* ------------------------------------------------------------------- */

  const logMetadata =
    getSubmissionLogMetadata({
      requestId,

      artistName:
        submission.artistName,

      releaseType:
        submission.releaseType,

      releaseStatus:
        submission.releaseStatus,

      primaryGenre:
        submission.primaryGenre,

      goalCount:
        submission.goals.length,
    });

  /* ------------------------------------------------------------------- */
  /* Email Delivery                                                      */
  /* ------------------------------------------------------------------- */

  let emailResult:
    Awaited<
      ReturnType<
        typeof sendMusicSubmissionEmails
      >
    >;

  try {
    emailResult =
      await sendMusicSubmissionEmails(
        submission,
        {
          requestId,

          submittedAt,

          sourceUrl:
            getSafeSourceUrl(
              request,
            ),
        },
      );
  } catch {
    /*
     * sendMusicSubmissionEmails() is designed to return structured errors
     * rather than throw, but this defensive boundary prevents an unexpected
     * runtime exception from crashing the route.
     */
    console.error(
      "[Money Records][Submission] Unexpected email workflow exception.",
      logMetadata,
    );

    return errorResponse({
      requestId,

      status:
        500,

      error:
        "Your music submission could not be completed. Please try again.",

      code:
        "SUBMISSION_DELIVERY_FAILED",
    });
  }

  /* ------------------------------------------------------------------- */
  /* Required Internal Notification Failed                               */
  /* ------------------------------------------------------------------- */

  if (
    !emailResult.ok
  ) {
    const failure =
      emailResult.notification;

    if (
      !failure.ok
    ) {
      /*
       * Provider-specific error details remain server-side.
       *
       * Do not expose:
       * - Resend response content
       * - API configuration
       * - Sender configuration
       * - Recipient configuration
       */
      console.error(
        "[Money Records][Submission] Internal notification failed.",
        {
          ...logMetadata,

          code:
            failure.code,

          status:
            failure.status,

          providerErrorName:
            failure.providerErrorName,
        },
      );

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
          "SUBMISSION_DELIVERY_FAILED",
      });
    }

    /*
     * Defensive fallback.
     *
     * EmailWorkflowResult should never contain:
     *
     * {
     *   ok: false,
     *   notification: { ok: true }
     * }
     *
     * but we still handle it safely.
     */
    console.error(
      "[Money Records][Submission] Invalid email workflow state.",
      logMetadata,
    );

    return errorResponse({
      requestId,

      status:
        500,

      error:
        "Your music submission could not be completed. Please try again.",

      code:
        "SUBMISSION_DELIVERY_FAILED",
    });
  }

  /* ------------------------------------------------------------------- */
  /* Confirmation Email Warning                                          */
  /* ------------------------------------------------------------------- */

  if (
    emailResult.confirmation &&
    !emailResult
      .confirmation
      .ok
  ) {
    /*
     * The required internal Money Records notification was already sent.
     *
     * Therefore the browser still receives a success response even if the
     * artist confirmation email fails.
     */
    console.warn(
      "[Money Records][Submission] Artist confirmation email failed.",
      {
        ...logMetadata,

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
    "[Money Records][Submission] Music submission delivered.",
    {
      ...logMetadata,

      secondaryGenreCount:
        submission
          .secondaryGenres
          .length,

      hasReleaseDate:
        Boolean(
          submission.releaseDate,
        ),

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