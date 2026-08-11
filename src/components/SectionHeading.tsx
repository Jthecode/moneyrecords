// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Section Heading                                       ┃
   ┃ File   : src/components/SectionHeading.tsx                            ┃
   ┃ Role   : Eyebrows, titles, descriptions, dividers, and section CTAs   ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  ElementType,
  HTMLAttributes,
  ReactNode,
} from "react";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type SectionHeadingAlignment =
  | "left"
  | "center";

export type SectionHeadingSize =
  | "sm"
  | "md"
  | "lg";

export type SectionHeadingWidth =
  | "compact"
  | "default"
  | "wide"
  | "full";

export type SectionHeadingProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "title"
> & {
  /**
   * Optional small uppercase text displayed above the title.
   */
  eyebrow?: ReactNode;

  /**
   * Main section heading.
   *
   * ReactNode support allows highlighted title fragments:
   *
   * title={
   *   <>
   *     Choose Your <span className="mr-text-gradient">Campaign</span>
   *   </>
   * }
   */
  title: ReactNode;

  /**
   * Supporting description shown beneath the title.
   */
  subtitle?: ReactNode;

  /**
   * Optional action displayed beside the heading.
   *
   * Usually a Button, Link, filter, or navigation control.
   */
  right?: ReactNode;

  /**
   * Heading element rendered for semantic page structure.
   *
   * @default "h2"
   */
  headingAs?: Extract<
    ElementType,
    "h1" | "h2" | "h3" | "h4"
  >;

  /**
   * Heading size.
   *
   * @default "md"
   */
  size?: SectionHeadingSize;

  /**
   * Text alignment.
   *
   * @default "left"
   */
  align?: SectionHeadingAlignment;

  /**
   * Maximum width of the heading content.
   *
   * @default "default"
   */
  width?: SectionHeadingWidth;

  /**
   * Optional ID applied directly to the heading element.
   *
   * Use this with aria-labelledby on the surrounding section.
   */
  headingId?: string;

  /**
   * Displays a decorative gold divider below the content.
   *
   * @default false
   */
  divider?: boolean;

  /**
   * Makes the right-side action move beneath the title on desktop.
   *
   * This is useful for centered headings.
   *
   * @default false
   */
  stackAction?: boolean;
};

/* --------------------------------------------------------------------- */
/* Class Configuration                                                    */
/* --------------------------------------------------------------------- */

const headingSizeClasses: Record<SectionHeadingSize, string> = {
  sm: [
    "text-[clamp(1.85rem,4vw,3rem)]",
    "font-black",
    "leading-[1.04]",
    "tracking-[-0.04em]",
  ].join(" "),

  md: "mr-section-title",

  lg: [
    "text-[clamp(2.6rem,6vw,5.6rem)]",
    "font-black",
    "leading-[0.98]",
    "tracking-[-0.052em]",
  ].join(" "),
};

const contentWidthClasses: Record<SectionHeadingWidth, string> = {
  compact: "max-w-2xl",
  default: "max-w-3xl",
  wide: "max-w-5xl",
  full: "max-w-none",
};

/* --------------------------------------------------------------------- */
/* Helpers                                                                */
/* --------------------------------------------------------------------- */

function joinClasses(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/* --------------------------------------------------------------------- */
/* Component                                                              */
/* --------------------------------------------------------------------- */

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  right,
  headingAs = "h2",
  size = "md",
  align = "left",
  width = "default",
  headingId,
  divider = false,
  stackAction = false,
  className,
  id,
  ...rest
}: SectionHeadingProps) {
  const Heading = headingAs;
  const isCentered = align === "center";

  const shouldPlaceActionBesideHeading =
    Boolean(right) && !stackAction && !isCentered;

  return (
    <div
      id={id}
      className={joinClasses(
        "relative",
        "flex",
        "flex-col",
        "gap-6",
        shouldPlaceActionBesideHeading &&
          "md:flex-row md:items-end md:justify-between md:gap-10",
        isCentered && "items-center text-center",
        className,
      )}
      {...rest}
    >
      <div
        className={joinClasses(
          "min-w-0",
          contentWidthClasses[width],
          isCentered && "mx-auto",
        )}
      >
        {eyebrow ? (
          <div
            className={joinClasses(
              "mr-eyebrow",
              isCentered && "mr-eyebrow-centered",
            )}
          >
            {eyebrow}
          </div>
        ) : null}

        <Heading
          id={headingId}
          className={joinClasses(
            headingSizeClasses[size],
            eyebrow ? "mt-4" : "",
            isCentered && "mx-auto text-center",
          )}
        >
          {title}
        </Heading>

        {subtitle ? (
          <div
            className={joinClasses(
              "mr-subtitle",
              "mt-5",
              isCentered && "mx-auto text-center",
            )}
          >
            {subtitle}
          </div>
        ) : null}

        {divider ? (
          <div
            aria-hidden="true"
            className={joinClasses(
              "mr-gold-line",
              "mt-7",
              isCentered && "mx-auto",
            )}
          />
        ) : null}
      </div>

      {right ? (
        <div
          className={joinClasses(
            "flex",
            "shrink-0",
            "flex-wrap",
            "items-center",
            "gap-3",
            isCentered && "justify-center",
            (stackAction || isCentered) && "mt-1",
          )}
        >
          {right}
        </div>
      ) : null}
    </div>
  );
}