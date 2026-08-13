// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Shared Section Header                                ┃
   ┃ File   : src/components/SectionHeader.tsx                            ┃
   ┃ Role   : Reusable section eyebrow, heading, copy, badges, and CTAs   ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  ReactNode,
} from "react";

import Button from "@/components/Button";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type SectionHeaderAction = {
  /**
   * Button label.
   *
   * Example:
   * "View All Artists"
   */
  label: string;

  /**
   * Internal or external destination.
   */
  href: string;

  /**
   * Shared Money Records button style.
   */
  variant?:
    | "primary"
    | "secondary"
    | "ghost";

  /**
   * Optional icon rendered after the text.
   */
  rightIcon?: ReactNode;
};

export type SectionHeaderBadge = {
  /**
   * Badge text.
   */
  label: string;

  /**
   * Optional icon.
   */
  icon?: ReactNode;

  /**
   * Badge appearance.
   */
  tone?:
    | "gold"
    | "neutral"
    | "success";
};

export type SectionHeaderProps = {
  /**
   * Optional HTML id.
   */
  id?: string;

  /**
   * Small Money Records label above the heading.
   */
  eyebrow?: string;

  /**
   * Optional icon beside the eyebrow.
   */
  eyebrowIcon?: ReactNode;

  /**
   * Main section heading.
   *
   * Example:
   *
   * <>
   *   Featured{" "}
   *   <span className="mr-text-gradient">
   *     Artists.
   *   </span>
   * </>
   */
  title: ReactNode;

  /**
   * Supporting copy beneath the title.
   */
  description?: ReactNode;

  /**
   * Optional badges beside or beneath the eyebrow.
   */
  badges?:
    readonly SectionHeaderBadge[];

  /**
   * Main CTA.
   */
  primaryAction?:
    SectionHeaderAction;

  /**
   * Secondary CTA.
   */
  secondaryAction?:
    SectionHeaderAction;

  /**
   * Optional custom controls.
   *
   * Useful for:
   * - Filter buttons
   * - Slider arrows
   * - Sort controls
   * - Tabs
   */
  actions?: ReactNode;

  /**
   * left:
   * Standard section title.
   *
   * center:
   * Centered marketing section.
   *
   * split:
   * Copy left and actions right on larger screens.
   */
  align?:
    | "left"
    | "center"
    | "split";

  /**
   * Controls maximum text width.
   */
  width?:
    | "sm"
    | "md"
    | "lg"
    | "full";

  /**
   * Uses smaller heading and spacing.
   */
  compact?: boolean;

  /**
   * Adds a divider beneath the section header.
   */
  divider?: boolean;

  /**
   * Adds the premium gold accent line above the heading.
   */
  accentLine?: boolean;

  /**
   * Optional wrapper class.
   */
  className?: string;

  /**
   * Optional heading class.
   */
  titleClassName?: string;

  /**
   * Optional description class.
   */
  descriptionClassName?: string;

  /**
   * Optional action-area class.
   */
  actionsClassName?: string;
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

function getContentWidthClass(
  width:
    NonNullable<
      SectionHeaderProps["width"]
    >,
): string {
  switch (width) {
    case "sm":
      return "max-w-xl";

    case "md":
      return "max-w-2xl";

    case "full":
      return "max-w-none";

    case "lg":
    default:
      return "max-w-3xl";
  }
}

function getBadgeClasses(
  tone:
    NonNullable<
      SectionHeaderBadge["tone"]
    >,
): string {
  switch (tone) {
    case "success":
      return [
        "border-emerald-300/15",
        "bg-emerald-300/[0.04]",
        "text-emerald-300/80",
      ].join(" ");

    case "neutral":
      return [
        "border-white/[0.075]",
        "bg-white/[0.025]",
        "text-white/42",
      ].join(" ");

    case "gold":
    default:
      return [
        "border-[rgba(227,179,77,0.2)]",
        "bg-[rgba(211,154,46,0.045)]",
        "text-[var(--mr-gold-200)]",
      ].join(" ");
  }
}

/* --------------------------------------------------------------------- */
/* Badge                                                                  */
/* --------------------------------------------------------------------- */

function SectionBadge({
  badge,
}: {
  badge:
    SectionHeaderBadge;
}) {
  const tone =
    badge.tone ??
    "gold";

  return (
    <span
      className={joinClasses(
        "inline-flex min-h-7 items-center gap-1.5 rounded-full border px-3",
        "text-[8px] font-black uppercase tracking-[0.13em]",
        getBadgeClasses(
          tone,
        ),
      )}
    >
      {tone ===
        "success" &&
      !badge.icon ? (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.7)]"
        />
      ) : null}

      {badge.icon ? (
        <span
          aria-hidden="true"
          className="grid h-3.5 w-3.5 place-items-center"
        >
          {badge.icon}
        </span>
      ) : null}

      {badge.label}
    </span>
  );
}

/* --------------------------------------------------------------------- */
/* Section Action                                                         */
/* --------------------------------------------------------------------- */

function SectionAction({
  action,
  primary = false,
}: {
  action:
    SectionHeaderAction;

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
      size="md"
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

export default function SectionHeader({
  id,

  eyebrow,
  eyebrowIcon,

  title,
  description,

  badges = [],

  primaryAction,
  secondaryAction,
  actions,

  align =
    "split",

  width =
    "lg",

  compact =
    false,

  divider =
    false,

  accentLine =
    false,

  className,
  titleClassName,
  descriptionClassName,
  actionsClassName,
}: SectionHeaderProps) {
  const hasActions =
    Boolean(
      primaryAction ||
      secondaryAction ||
      actions,
    );

  const hasMeta =
    Boolean(
      eyebrow ||
      badges.length >
        0,
    );

  const centered =
    align ===
    "center";

  const split =
    align ===
    "split";

  const contentWidthClass =
    getContentWidthClass(
      width,
    );

  return (
    <div
      id={id}
      className={joinClasses(
        "relative min-w-0",

        divider &&
          "border-b border-white/[0.065] pb-7 sm:pb-8",

        className,
      )}
    >
      {/* --------------------------------------------------------------- */}
      {/* Accent Line                                                     */}
      {/* --------------------------------------------------------------- */}

      {accentLine ? (
        <div
          aria-hidden="true"
          className={joinClasses(
            "mb-4 h-px w-14 rounded-full",
            "bg-[linear-gradient(90deg,var(--mr-gold-300),rgba(227,179,77,0.08))]",
            "shadow-[0_0_12px_rgba(227,179,77,0.18)]",

            centered &&
              "mx-auto",
          )}
        />
      ) : null}

      {/* --------------------------------------------------------------- */}
      {/* Main Layout                                                     */}
      {/* --------------------------------------------------------------- */}

      <div
        className={joinClasses(
          "min-w-0",

          split &&
          hasActions
            ? [
                "flex flex-col gap-6",
                "md:flex-row",
                "md:items-end",
                "md:justify-between",
              ].join(" ")
            : "",

          centered &&
            "text-center",
        )}
      >
        {/* ------------------------------------------------------------- */}
        {/* Copy                                                          */}
        {/* ------------------------------------------------------------- */}

        <div
          className={joinClasses(
            "min-w-0",

            contentWidthClass,

            centered &&
              "mx-auto",
          )}
        >
          {/* ----------------------------------------------------------- */}
          {/* Eyebrow + Badges                                            */}
          {/* ----------------------------------------------------------- */}

          {hasMeta ? (
            <div
              className={joinClasses(
                "flex flex-wrap items-center gap-2",

                centered &&
                  "justify-center",
              )}
            >
              {eyebrow ? (
                <span className="inline-flex min-h-7 items-center gap-2 text-[9px] font-black uppercase tracking-[0.19em] text-[var(--mr-gold-200)] sm:text-[10px]">
                  {eyebrowIcon ? (
                    <span
                      aria-hidden="true"
                      className="grid h-4 w-4 place-items-center"
                    >
                      {eyebrowIcon}
                    </span>
                  ) : null}

                  {eyebrow}
                </span>
              ) : null}

              {badges.map(
                (
                  badge,
                  index,
                ) => (
                  <SectionBadge
                    key={`${badge.label}-${index}`}
                    badge={
                      badge
                    }
                  />
                ),
              )}
            </div>
          ) : null}

          {/* ----------------------------------------------------------- */}
          {/* Heading                                                     */}
          {/* ----------------------------------------------------------- */}

          <h2
            className={joinClasses(
              hasMeta
                ? "mt-3"
                : "",

              /*
               * Deliberately more restrained on mobile than the
               * original page-specific headings.
               */
              compact
                ? [
                    "text-xl",
                    "sm:text-2xl",
                    "lg:text-3xl",
                  ].join(" ")
                : [
                    "text-[1.8rem]",
                    "sm:text-3xl",
                    "lg:text-4xl",
                    "xl:text-[2.7rem]",
                  ].join(" "),

              "font-black leading-[1.05]",
              "tracking-[-0.045em]",
              "text-[var(--mr-text)]",

              titleClassName,
            )}
          >
            {title}
          </h2>

          {/* ----------------------------------------------------------- */}
          {/* Description                                                 */}
          {/* ----------------------------------------------------------- */}

          {description ? (
            <div
              className={joinClasses(
                "mt-3",
                "text-sm leading-7 text-white/44",
                "sm:mt-4 sm:text-base",

                centered &&
                  "mx-auto",

                descriptionClassName,
              )}
            >
              {description}
            </div>
          ) : null}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Actions                                                       */}
        {/* ------------------------------------------------------------- */}

        {hasActions ? (
          <div
            className={joinClasses(
              /*
               * On mobile the actions use the full width, making them much
               * easier to tap.
               */
              "flex w-full flex-col gap-2.5",

              "sm:w-auto sm:flex-row sm:flex-wrap",

              centered &&
                "mt-6 justify-center",

              split &&
                "md:flex-[0_0_auto]",

              actionsClassName,
            )}
          >
            {primaryAction ? (
              <SectionAction
                action={
                  primaryAction
                }
                primary
              />
            ) : null}

            {secondaryAction ? (
              <SectionAction
                action={
                  secondaryAction
                }
              />
            ) : null}

            {actions}
          </div>
        ) : null}
      </div>
    </div>
  );
}