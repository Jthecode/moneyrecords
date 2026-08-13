// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Shared Empty State                                   ┃
   ┃ File   : src/components/EmptyState.tsx                               ┃
   ┃ Role   : Reusable empty-result, empty-cart, and no-content states    ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  ReactNode,
} from "react";

import Button from "@/components/Button";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type EmptyStateAction = {
  /**
   * CTA text.
   *
   * Example:
   * "Explore Services"
   */
  label: string;

  /**
   * CTA destination.
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
   * Optional icon displayed after the CTA text.
   */
  rightIcon?: ReactNode;
};

export type EmptyStateProps = {
  /**
   * Optional DOM id.
   */
  id?: string;

  /**
   * Optional icon shown above the heading.
   */
  icon?: ReactNode;

  /**
   * Small gold label.
   *
   * Example:
   * "Campaign Cart"
   */
  eyebrow?: string;

  /**
   * Main empty-state heading.
   */
  title: ReactNode;

  /**
   * Supporting explanation.
   */
  description?: ReactNode;

  /**
   * Main action.
   */
  primaryAction?:
    EmptyStateAction;

  /**
   * Optional secondary action.
   */
  secondaryAction?:
    EmptyStateAction;

  /**
   * Optional custom content beneath the description.
   *
   * Useful for:
   * - Suggested search terms
   * - Platform filters
   * - Support information
   * - Additional guidance
   */
  children?: ReactNode;

  /**
   * Small = compact card/table empty state.
   * Medium = standard page section.
   * Large = full-page empty state.
   */
  size?:
    | "sm"
    | "md"
    | "lg";

  /**
   * Adds the Money Records bordered panel.
   */
  panel?: boolean;

  /**
   * Enables premium gold atmospheric glow.
   */
  glow?: boolean;

  /**
   * Optional wrapper class.
   */
  className?: string;

  /**
   * Optional title class.
   */
  titleClassName?: string;

  /**
   * Optional description class.
   */
  descriptionClassName?: string;
};

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

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
      EmptyStateProps["size"]
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
/* Action                                                                 */
/* --------------------------------------------------------------------- */

function EmptyStateActionButton({
  action,
  primary = false,
}: {
  action:
    EmptyStateAction;

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

export default function EmptyState({
  id,

  icon,

  eyebrow,

  title,

  description,

  primaryAction,

  secondaryAction,

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
}: EmptyStateProps) {
  const sizeClasses =
    getSizeClasses(
      size,
    );

  const hasActions =
    Boolean(
      primaryAction ||
      secondaryAction,
    );

  return (
    <section
      id={id}
      aria-live="polite"
      className={joinClasses(
        "relative isolate overflow-hidden text-center",

        panel
          ? [
              "rounded-[24px]",
              "border border-white/[0.07]",
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
        </>
      ) : null}

      {/* --------------------------------------------------------------- */}
      {/* Content                                                         */}
      {/* --------------------------------------------------------------- */}

      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        {/* ------------------------------------------------------------- */}
        {/* Icon                                                          */}
        {/* ------------------------------------------------------------- */}

        {icon ? (
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
            {icon}
          </span>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Eyebrow                                                       */}
        {/* ------------------------------------------------------------- */}

        {eyebrow ? (
          <p
            className={joinClasses(
              "m-0 text-[9px] font-black uppercase tracking-[0.18em]",
              "text-[var(--mr-gold-200)]",

              icon
                ? "mt-5"
                : "",
            )}
          >
            {eyebrow}
          </p>
        ) : null}

        {/* ------------------------------------------------------------- */}
        {/* Heading                                                       */}
        {/* ------------------------------------------------------------- */}

        <h2
          className={joinClasses(
            "font-black leading-tight tracking-[-0.045em]",
            "text-[var(--mr-text)]",

            icon ||
            eyebrow
              ? "mt-3"
              : "",

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
            {primaryAction ? (
              <EmptyStateActionButton
                action={
                  primaryAction
                }
                primary
              />
            ) : null}

            {secondaryAction ? (
              <EmptyStateActionButton
                action={
                  secondaryAction
                }
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}