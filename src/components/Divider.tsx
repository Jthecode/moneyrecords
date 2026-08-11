// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Divider                                               ┃
   ┃ File   : src/components/Divider.tsx                                   ┃
   ┃ Role   : Luxury section separators, labels, and decorative markers    ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  HTMLAttributes,
  ReactNode,
} from "react";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type DividerVariant =
  | "gold"
  | "soft"
  | "subtle"
  | "strong";

export type DividerSpacing =
  | "none"
  | "sm"
  | "md"
  | "lg";

export type DividerLabelPosition =
  | "left"
  | "center"
  | "right";

export type DividerProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  /**
   * Optional content displayed inside the divider.
   */
  label?: ReactNode;

  /**
   * Optional icon or crest displayed inside the center marker.
   */
  icon?: ReactNode;

  /**
   * Controls the divider appearance.
   *
   * @default "gold"
   */
  variant?: DividerVariant;

  /**
   * Controls vertical spacing around the divider.
   *
   * @default "none"
   */
  spacing?: DividerSpacing;

  /**
   * Controls the label or icon position.
   *
   * @default "center"
   */
  labelPosition?: DividerLabelPosition;

  /**
   * Makes the divider decorative and hidden from assistive technology.
   *
   * Use false when the divider represents a meaningful section break.
   *
   * @default true
   */
  decorative?: boolean;

  /**
   * Accessible label used when decorative is false.
   */
  ariaLabel?: string;

  className?: string;
};

/* --------------------------------------------------------------------- */
/* Class Configuration                                                    */
/* --------------------------------------------------------------------- */

const spacingClasses: Record<DividerSpacing, string> = {
  none: "",
  sm: "my-4",
  md: "my-7",
  lg: "my-10 md:my-12",
};

const lineClasses: Record<DividerVariant, string> = {
  gold: [
    "bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.30),rgba(248,223,160,0.72),rgba(227,179,77,0.30),transparent)]",
    "shadow-[0_0_18px_rgba(227,179,77,0.12)]",
  ].join(" "),

  soft: [
    "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),rgba(255,255,255,0.13),rgba(255,255,255,0.05),transparent)]",
  ].join(" "),

  subtle: [
    "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.045),transparent)]",
  ].join(" "),

  strong: [
    "bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.48),rgba(255,240,201,0.92),rgba(227,179,77,0.48),transparent)]",
    "shadow-[0_0_24px_rgba(227,179,77,0.22)]",
  ].join(" "),
};

const labelPositionClasses: Record<DividerLabelPosition, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

/* --------------------------------------------------------------------- */
/* Utilities                                                              */
/* --------------------------------------------------------------------- */

function joinClasses(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/* --------------------------------------------------------------------- */
/* Component                                                              */
/* --------------------------------------------------------------------- */

export default function Divider({
  label,
  icon,
  variant = "gold",
  spacing = "none",
  labelPosition = "center",
  decorative = true,
  ariaLabel,
  className,
  ...rest
}: DividerProps) {
  const hasMarker = Boolean(label || icon);

  return (
    <div
      {...rest}
      className={joinClasses(
        "relative flex w-full items-center",
        spacingClasses[spacing],
        className,
      )}
      role={decorative ? undefined : "separator"}
      aria-hidden={decorative ? true : undefined}
      aria-label={!decorative ? ariaLabel : undefined}
      aria-orientation={!decorative ? "horizontal" : undefined}
    >
      {hasMarker ? (
        <div
          className={joinClasses(
            "flex w-full items-center gap-4",
            labelPositionClasses[labelPosition],
          )}
        >
          {labelPosition !== "left" ? (
            <span
              aria-hidden="true"
              className={joinClasses(
                "h-px min-w-0 flex-1",
                lineClasses[variant],
              )}
            />
          ) : null}

          <span
            className={joinClasses(
              "relative inline-flex shrink-0 items-center justify-center",
              "gap-2 rounded-full px-4 py-2",
              "border border-[rgba(227,179,77,0.24)]",
              "bg-[rgba(8,8,9,0.92)]",
              "shadow-[0_10px_34px_rgba(0,0,0,0.38)]",
              "backdrop-blur-xl",
            )}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(248,223,160,0.72),transparent)]"
            />

            {icon ? (
              <span className="inline-flex shrink-0 items-center justify-center text-[var(--mr-gold-200)]">
                {icon}
              </span>
            ) : null}

            {label ? (
              <span className="text-[10px] font-black uppercase leading-none tracking-[0.22em] text-[var(--mr-gold-100)]">
                {label}
              </span>
            ) : null}
          </span>

          {labelPosition !== "right" ? (
            <span
              aria-hidden="true"
              className={joinClasses(
                "h-px min-w-0 flex-1",
                lineClasses[variant],
              )}
            />
          ) : null}
        </div>
      ) : (
        <span
          aria-hidden="true"
          className={joinClasses(
            "block h-px w-full",
            lineClasses[variant],
          )}
        />
      )}
    </div>
  );
}