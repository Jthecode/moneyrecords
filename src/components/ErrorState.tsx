"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Shared Error State                                   ┃
   ┃ File   : src/components/ErrorState.tsx                               ┃
   ┃ Role   : Reusable recoverable error, retry, and support UI           ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  useCallback,
  type ReactNode,
} from "react";

import Button from "@/components/Button";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type ErrorStateAction = {
  /**
   * Button label.
   *
   * Example:
   * "Return Home"
   */
  label: string;

  /**
   * Navigation destination.
   */
  href: string;

  /**
   * Money Records button style.
   */
  variant?:
    | "primary"
    | "secondary"
    | "ghost";

  /**
   * Optional icon after the button label.
   */
  rightIcon?: ReactNode;
};

export type ErrorStateProps = {
  /**
   * Optional HTML id.
   */
  id?: string;

  /**
   * Optional icon displayed above the heading.
   */
  icon?: ReactNode;

  /**
   * Small gold label.
   *
   * Example:
   * "Something Went Wrong"
   */
  eyebrow?: string;

  /**
   * Main error heading.
   */
  title?: ReactNode;

  /**
   * Supporting explanation.
   */
  description?: ReactNode;

  /**
   * Optional actual Error object.
   *
   * The error message is only displayed when showDetails is true.
   */
  error?: Error | null;

  /**
   * Enables a retry button.
   */
  onRetry?: () => void | Promise<void>;

  /**
   * Retry button label.
   */
  retryLabel?: string;

  /**
   * Optional navigation CTA.
   */
  primaryAction?: ErrorStateAction;

  /**
   * Optional secondary navigation CTA.
   */
  secondaryAction?: ErrorStateAction;

  /**
   * Optional support email.
   *
   * Example:
   * info@moneyrecords.io
   */
  supportEmail?: string;

  /**
   * Shows technical error details.
   *
   * Keep false for normal customers.
   */
  showDetails?: boolean;

  /**
   * Optional custom content below the description.
   */
  children?: ReactNode;

  /**
   * Small = card/section error.
   * Medium = general page error.
   * Large = full-page error experience.
   */
  size?:
    | "sm"
    | "md"
    | "lg";

  /**
   * Adds bordered Money Records panel styling.
   */
  panel?: boolean;

  /**
   * Enables ambient gold glow.
   */
  glow?: boolean;

  /**
   * Additional wrapper classes.
   */
  className?: string;

  /**
   * Additional title classes.
   */
  titleClassName?: string;

  /**
   * Additional description classes.
   */
  descriptionClassName?: string;
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function AlertIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
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

function RetryIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
    >
      <path
        d="M20 7V12H15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M18.1 15.5C16.9 18 14.6 19.5 12 19.5C7.9 19.5 4.5 16.1 4.5 12C4.5 7.9 7.9 4.5 12 4.5C15.1 4.5 17.8 6.4 18.9 9.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon(): ReactNode {
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

function MailIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
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

function getSizeClasses(
  size:
    NonNullable<
      ErrorStateProps["size"]
    >,
): {
  wrapper: string;
  icon: string;
  title: string;
  description: string;
} {
  switch (size) {
    case "sm":
      return {
        wrapper:
          "px-4 py-7 sm:px-6 sm:py-8",

        icon:
          "h-11 w-11 rounded-2xl",

        title:
          "text-lg sm:text-xl",

        description:
          "text-xs leading-6 sm:text-sm sm:leading-7",
      };

    case "lg":
      return {
        wrapper:
          "px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20",

        icon:
          "h-16 w-16 rounded-[22px]",

        title:
          "text-3xl sm:text-4xl",

        description:
          "text-sm leading-7 sm:text-base sm:leading-8",
      };

    case "md":
    default:
      return {
        wrapper:
          "px-5 py-9 sm:px-7 sm:py-12",

        icon:
          "h-14 w-14 rounded-[20px]",

        title:
          "text-2xl sm:text-3xl",

        description:
          "text-sm leading-7 sm:text-base",
      };
  }
}

/* --------------------------------------------------------------------- */
/* Action Button                                                          */
/* --------------------------------------------------------------------- */

function ErrorActionButton({
  action,
  primary = false,
}: {
  action:
    ErrorStateAction;

  primary?: boolean;
}) {
  return (
    <Button
      href={
        action.href
      }
      variant={
        action.variant ??
        (
          primary
            ? "primary"
            : "secondary"
        )
      }
      size="lg"
      rightIcon={
        action.rightIcon ??
        (
          primary
            ? <ArrowIcon />
            : undefined
        )
      }
      className="w-full sm:w-auto"
    >
      {action.label}
    </Button>
  );
}

/* --------------------------------------------------------------------- */
/* Component                                                              */
/* --------------------------------------------------------------------- */

export default function ErrorState({
  id,

  icon,

  eyebrow =
    "Something Went Wrong",

  title =
    "We Couldn’t Load This Right Now.",

  description =
    "The page or service ran into a problem. Try again, or return to another part of Money Records.",

  error,

  onRetry,

  retryLabel =
    "Try Again",

  primaryAction,

  secondaryAction,

  supportEmail,

  showDetails =
    false,

  children,

  size =
    "md",

  panel =
    true,

  glow =
    true,

  className,

  titleClassName,

  descriptionClassName,
}: ErrorStateProps) {
  const sizeClasses =
    getSizeClasses(
      size,
    );

  const handleRetry =
    useCallback(() => {
      if (!onRetry) {
        return;
      }

      void onRetry();
    }, [onRetry]);

  const hasNavigationActions =
    Boolean(
      primaryAction ||
      secondaryAction,
    );

  const hasActions =
    Boolean(
      onRetry ||
      hasNavigationActions,
    );

  const visibleIcon =
    icon ??
    <AlertIcon />;

  return (
    <section
      id={id}
      role="alert"
      aria-live="assertive"
      className={joinClasses(
        "relative isolate overflow-hidden text-center",

        panel
          ? [
              "rounded-[24px]",
              "border border-[rgba(227,179,77,0.12)]",
              "bg-[linear-gradient(145deg,rgba(255,255,255,0.025),rgba(255,255,255,0.012))]",
              "shadow-[0_20px_70px_rgba(0,0,0,0.28)]",
              "sm:rounded-[28px]",
            ].join(" ")
          : "",

        sizeClasses.wrapper,

        className,
      )}
    >
      {/* --------------------------------------------------------------- */}
      {/* Background Atmosphere                                           */}
      {/* --------------------------------------------------------------- */}

      {glow ? (
        <>
          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute left-1/2 top-0 -z-10",
              "h-56 w-72 -translate-x-1/2 -translate-y-1/2",
              "rounded-full",
              "bg-[rgba(227,179,77,0.075)]",
              "blur-[85px]",
            ].join(" ")}
          />

          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute inset-x-[18%] top-0 -z-10",
              "h-px",
              "bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.38),transparent)]",
            ].join(" ")}
          />

          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute -bottom-24 left-1/2 -z-10",
              "h-48 w-72 -translate-x-1/2",
              "rounded-full",
              "bg-[rgba(255,255,255,0.018)]",
              "blur-[70px]",
            ].join(" ")}
          />
        </>
      ) : null}

      {/* --------------------------------------------------------------- */}
      {/* Main Content                                                    */}
      {/* --------------------------------------------------------------- */}

      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        {/* ------------------------------------------------------------- */}
        {/* Icon                                                          */}
        {/* ------------------------------------------------------------- */}

        <span
          className={joinClasses(
            "grid place-items-center",
            "border border-[rgba(227,179,77,0.2)]",
            "bg-[rgba(211,154,46,0.055)]",
            "text-[var(--mr-gold-200)]",
            "shadow-[0_12px_40px_rgba(0,0,0,0.25)]",

            sizeClasses.icon,
          )}
        >
          {visibleIcon}
        </span>

        {/* ------------------------------------------------------------- */}
        {/* Eyebrow                                                       */}
        {/* ------------------------------------------------------------- */}

        {eyebrow ? (
          <p
            className={[
              "mt-5 text-[9px] font-black uppercase",
              "tracking-[0.18em]",
              "text-[var(--mr-gold-200)]",
            ].join(" ")}
          >
            {eyebrow}
          </p>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Heading                                                       */}
        {/* ------------------------------------------------------------- */}

        <h2
          className={joinClasses(
            "mt-3 font-black leading-tight",
            "tracking-[-0.045em]",
            "text-[var(--mr-text)]",

            sizeClasses.title,

            titleClassName,
          )}
        >
          {title}
        </h2>

        {/* ------------------------------------------------------------- */}
        {/* Description                                                   */}
        {/* ------------------------------------------------------------- */}

        {description ? (
          <div
            className={joinClasses(
              "mt-3 max-w-xl text-white/43",
              "sm:mt-4",

              sizeClasses.description,

              descriptionClassName,
            )}
          >
            {description}
          </div>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Optional Technical Details                                    */}
        {/* ------------------------------------------------------------- */}

        {showDetails &&
        error ? (
          <details
            className={[
              "mt-6 w-full max-w-xl overflow-hidden",
              "rounded-[18px]",
              "border border-white/[0.065]",
              "bg-black/20",
              "text-left",
            ].join(" ")}
          >
            <summary
              className={[
                "cursor-pointer px-4 py-3",
                "text-[9px] font-black uppercase",
                "tracking-[0.14em]",
                "text-white/35",
                "transition",
                "hover:text-[var(--mr-gold-200)]",
              ].join(" ")}
            >
              Technical Details
            </summary>

            <div className="border-t border-white/[0.055] p-4">
              <code className="block break-words whitespace-pre-wrap text-[11px] leading-6 text-white/35">
                {error.message ||
                  "Unknown error"}
              </code>
            </div>
          </details>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Custom Content                                                */}
        {/* ------------------------------------------------------------- */}

        {children ? (
          <div className="mt-6 w-full">
            {children}
          </div>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Actions                                                       */}
        {/* ------------------------------------------------------------- */}

        {hasActions ? (
          <div
            className={[
              "mt-7 flex w-full flex-col gap-3",
              "sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center",
            ].join(" ")}
          >
            {onRetry ? (
              <button
                type="button"
                onClick={
                  handleRetry
                }
                className={[
                  "inline-flex min-h-12 w-full items-center justify-center gap-2",
                  "rounded-full",
                  "border border-[rgba(227,179,77,0.26)]",
                  "bg-[linear-gradient(135deg,var(--mr-gold-300),var(--mr-gold-100))]",
                  "px-6",
                  "text-[10px] font-black uppercase tracking-[0.13em]",
                  "text-black",
                  "shadow-[0_10px_34px_rgba(211,154,46,0.18)]",
                  "transition duration-200",
                  "hover:-translate-y-0.5",
                  "hover:shadow-[0_14px_42px_rgba(211,154,46,0.25)]",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-[rgba(227,179,77,0.55)]",
                  "focus-visible:ring-offset-2",
                  "focus-visible:ring-offset-black",
                  "sm:w-auto",
                ].join(" ")}
              >
                <RetryIcon />

                {retryLabel}
              </button>
            ) : null}

            {primaryAction ? (
              <ErrorActionButton
                action={
                  primaryAction
                }
                primary={
                  !onRetry
                }
              />
            ) : null}

            {secondaryAction ? (
              <ErrorActionButton
                action={
                  secondaryAction
                }
              />
            ) : null}
          </div>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Support                                                       */}
        {/* ------------------------------------------------------------- */}

        {supportEmail ? (
          <a
            href={`mailto:${supportEmail}`}
            className={[
              "mt-7 inline-flex items-center gap-2",
              "text-xs font-bold text-white/35",
              "transition-colors duration-200",
              "hover:text-[var(--mr-gold-200)]",
              "focus-visible:outline-none",
              "focus-visible:text-[var(--mr-gold-200)]",
            ].join(" ")}
          >
            <MailIcon />

            Need help? {supportEmail}
          </a>
        ) : null}
      </div>
    </section>
  );
}