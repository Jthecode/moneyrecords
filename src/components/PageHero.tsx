// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Shared Page Hero                                     ┃
   ┃ File   : src/components/PageHero.tsx                                 ┃
   ┃ Role   : Reusable mobile-first premium hero for public site pages    ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  ReactNode,
} from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type PageHeroBadge = {
  /**
   * Visible badge text.
   *
   * Example:
   * "Established 2019"
   */
  label: string;

  /**
   * Optional icon displayed before the label.
   */
  icon?: ReactNode;

  /**
   * Gold badges are emphasized.
   * Neutral badges use the secondary dark treatment.
   */
  tone?:
    | "gold"
    | "neutral"
    | "success";
};

export type PageHeroAction = {
  /**
   * Button text.
   */
  label: string;

  /**
   * Internal or external href accepted by the shared Button component.
   */
  href: string;

  /**
   * Money Records button treatment.
   */
  variant?:
    | "primary"
    | "secondary"
    | "ghost";

  /**
   * Optional icon displayed after the label.
   */
  rightIcon?: ReactNode;
};

export type PageHeroProps = {
  /**
   * Optional DOM id.
   */
  id?: string;

  /**
   * Small gold heading above the page title.
   */
  eyebrow?: string;

  /**
   * Optional icon shown beside the eyebrow.
   */
  eyebrowIcon?: ReactNode;

  /**
   * Main page title.
   *
   * ReactNode allows:
   *
   * <>
   *   Music{" "}
   *   <span className="mr-text-gradient">
   *     Distribution.
   *   </span>
   * </>
   */
  title: ReactNode;

  /**
   * Main supporting statement.
   *
   * Usually larger and bolder than the normal description.
   */
  subtitle?: ReactNode;

  /**
   * Secondary explanatory copy.
   */
  description?: ReactNode;

  /**
   * Optional badges displayed above the heading.
   */
  badges?:
    readonly PageHeroBadge[];

  /**
   * Main conversion action.
   */
  primaryAction?:
    PageHeroAction;

  /**
   * Secondary action.
   */
  secondaryAction?:
    PageHeroAction;

  /**
   * Optional third action.
   */
  tertiaryAction?:
    PageHeroAction;

  /**
   * Optional right-side hero content.
   *
   * Common examples:
   * - Featured Card
   * - Artist artwork
   * - Service overview
   * - Distribution summary
   * - Legal notice
   */
  sideContent?: ReactNode;

  /**
   * Optional small content rendered below the CTA buttons.
   *
   * Useful for:
   * - Trust indicators
   * - Effective dates
   * - Campaign disclaimers
   * - Platform labels
   */
  footerContent?: ReactNode;

  /**
   * Centers the hero when there is no side panel.
   */
  centered?: boolean;

  /**
   * Uses tighter spacing for simpler pages.
   */
  compact?: boolean;

  /**
   * Enables the luxury gold line across the top.
   */
  showTopLine?: boolean;

  /**
   * Enables atmospheric hero glows.
   */
  showGlow?: boolean;

  /**
   * Optional custom aria-label.
   */
  ariaLabel?: string;

  /**
   * Additional classes applied to the main hero.
   */
  className?: string;

  /**
   * Additional classes applied to the left content.
   */
  contentClassName?: string;

  /**
   * Additional classes applied to the right content.
   */
  sideClassName?: string;

  /**
   * Additional classes applied to the title.
   */
  titleClassName?: string;
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

function CheckIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="12"
      height="12"
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

function getBadgeClasses(
  tone:
    NonNullable<
      PageHeroBadge["tone"]
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
        "border-white/[0.08]",
        "bg-white/[0.03]",
        "text-white/45",
      ].join(" ");

    case "gold":
    default:
      return [
        "border-[rgba(227,179,77,0.24)]",
        "bg-[rgba(211,154,46,0.065)]",
        "text-[var(--mr-gold-200)]",
      ].join(" ");
  }
}

/* --------------------------------------------------------------------- */
/* Badge                                                                  */
/* --------------------------------------------------------------------- */

function HeroBadge({
  badge,
}: {
  badge: PageHeroBadge;
}) {
  const tone =
    badge.tone ??
    "gold";

  return (
    <span
      className={joinClasses(
        "inline-flex min-h-8 items-center gap-2 rounded-full border px-3.5",
        "text-[8px] font-black uppercase tracking-[0.15em]",
        "sm:px-4",
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
          className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.75)]"
        />
      ) : null}

      {badge.icon ? (
        <span
          aria-hidden="true"
          className="grid h-4 w-4 place-items-center"
        >
          {badge.icon}
        </span>
      ) : null}

      {badge.label}
    </span>
  );
}

/* --------------------------------------------------------------------- */
/* Hero Action                                                            */
/* --------------------------------------------------------------------- */

function HeroAction({
  action,
  primary = false,
}: {
  action: PageHeroAction;
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
/* Default Side Card                                                      */
/* --------------------------------------------------------------------- */

/**
 * Optional helper exported for pages that want a simple premium hero-side
 * information card without having to rebuild the styling.
 */
export function PageHeroInfoCard({
  icon,
  eyebrow,
  title,
  description,
  items,
  footer,
}: {
  icon?: ReactNode;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  items?:
    readonly ReactNode[];
  footer?: ReactNode;
}) {
  return (
    <Card
      variant="featured"
      padding="lg"
      topLine
      className="relative h-full overflow-hidden"
    >
      {/* Background glow */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[rgba(227,179,77,0.09)] blur-[100px]"
      />

      <div className="relative">
        {/* Heading */}

        <div className="flex items-start gap-4">
          {icon ? (
            <span className="grid h-12 w-12 flex-[0_0_48px] place-items-center rounded-[17px] border border-[rgba(227,179,77,0.22)] bg-[rgba(211,154,46,0.055)] text-[var(--mr-gold-200)] sm:h-14 sm:w-14 sm:flex-basis-[56px] sm:rounded-[20px]">
              {icon}
            </span>
          ) : null}

          <div className="min-w-0">
            {eyebrow ? (
              <p className="m-0 text-[8px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)] sm:text-[9px]">
                {eyebrow}
              </p>
            ) : null}

            <h2
              className={joinClasses(
                eyebrow
                  ? "mt-1.5"
                  : "",

                "text-lg font-black leading-tight tracking-[-0.035em]",
                "text-[var(--mr-text)]",
                "sm:text-xl",
              )}
            >
              {title}
            </h2>
          </div>
        </div>

        {/* Description */}

        {description ? (
          <div className="mt-5 text-sm leading-7 text-white/44">
            {description}
          </div>
        ) : null}

        {/* Items */}

        {items &&
        items.length >
          0 ? (
          <>
            <div className="my-5 h-px bg-white/[0.06]" />

            <div className="grid gap-3">
              {items.map(
                (
                  item,
                  index,
                ) => (
                  <div
                    key={
                      index
                    }
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 grid h-5 w-5 flex-[0_0_20px] place-items-center rounded-full border border-[rgba(227,179,77,0.2)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]">
                      <CheckIcon />
                    </span>

                    <div className="min-w-0 text-xs leading-6 text-white/42">
                      {item}
                    </div>
                  </div>
                ),
              )}
            </div>
          </>
        ) : null}

        {/* Footer */}

        {footer ? (
          <div className="mt-6 rounded-[20px] border border-[rgba(227,179,77,0.14)] bg-[rgba(211,154,46,0.03)] p-4">
            {footer}
          </div>
        ) : null}
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------------- */
/* Page Hero                                                              */
/* --------------------------------------------------------------------- */

export default function PageHero({
  id,

  eyebrow,
  eyebrowIcon,

  title,
  subtitle,
  description,

  badges = [],

  primaryAction,
  secondaryAction,
  tertiaryAction,

  sideContent,
  footerContent,

  centered = false,
  compact = false,

  showTopLine = true,
  showGlow = true,

  ariaLabel,

  className,
  contentClassName,
  sideClassName,
  titleClassName,
}: PageHeroProps) {
  const hasActions =
    Boolean(
      primaryAction ||
      secondaryAction ||
      tertiaryAction,
    );

  const hasHeaderMeta =
    Boolean(
      eyebrow ||
      eyebrowIcon ||
      badges.length >
        0,
    );

  const hasSideContent =
    Boolean(
      sideContent,
    );

  const shouldCenter =
    centered &&
    !hasSideContent;

  return (
    <header
      id={id}
      aria-label={
        ariaLabel
      }
      className={joinClasses(
        "relative isolate overflow-hidden",

        /*
         * Shape.
         */
        "rounded-[26px]",
        "border border-[rgba(227,179,77,0.2)]",
        "sm:rounded-[30px]",
        "lg:rounded-[34px]",

        /*
         * Background.
         */
        "bg-[linear-gradient(145deg,rgba(18,17,15,0.985),rgba(6,6,7,0.995))]",

        /*
         * Shadow.
         */
        "shadow-[0_28px_90px_rgba(0,0,0,0.5)]",
        "lg:shadow-[0_36px_140px_rgba(0,0,0,0.6)]",

        /*
         * Mobile-first padding.
         */
        compact
          ? [
              "p-5",
              "sm:p-7",
              "lg:p-9",
            ].join(" ")
          : [
              "p-5",
              "sm:p-8",
              "lg:p-10",
              "xl:p-12",
            ].join(" "),

        className,
      )}
    >
      {/* --------------------------------------------------------------- */}
      {/* Top Gold Line                                                   */}
      {/* --------------------------------------------------------------- */}

      {showTopLine ? (
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute",
            "inset-x-8 top-0",
            "h-px",
            "sm:inset-x-12",
            "bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.78),transparent)]",
          ].join(" ")}
        />
      ) : null}

      {/* --------------------------------------------------------------- */}
      {/* Background Atmosphere                                           */}
      {/* --------------------------------------------------------------- */}

      {showGlow ? (
        <>
          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute",
              "-right-44 -top-52",
              "h-[520px] w-[520px]",
              "rounded-full",
              "bg-[rgba(227,179,77,0.13)]",
              "blur-[150px]",
              "sm:h-[620px] sm:w-[620px]",
            ].join(" ")}
          />

          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute",
              "-bottom-48 -left-36",
              "h-[380px] w-[380px]",
              "rounded-full",
              "bg-[rgba(227,179,77,0.04)]",
              "blur-[125px]",
            ].join(" ")}
          />

          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute inset-0",
              "opacity-[0.09]",
              "[background-image:radial-gradient(rgba(255,255,255,0.15)_0.6px,transparent_0.6px)]",
              "[background-size:26px_26px]",
            ].join(" ")}
          />
        </>
      ) : null}

      {/* --------------------------------------------------------------- */}
      {/* Main Layout                                                     */}
      {/* --------------------------------------------------------------- */}

      <div
        className={joinClasses(
          "relative",

          hasSideContent
            ? [
                "grid gap-8",
                "lg:grid-cols-[minmax(0,1.13fr)_minmax(340px,0.87fr)]",
                "lg:items-center",
                "lg:gap-10",
                "xl:grid-cols-[minmax(0,1.18fr)_minmax(380px,0.82fr)]",
                "xl:gap-12",
              ].join(" ")
            : "block",
        )}
      >
        {/* ------------------------------------------------------------- */}
        {/* Hero Copy                                                     */}
        {/* ------------------------------------------------------------- */}

        <div
          className={joinClasses(
            "min-w-0",

            shouldCenter
              ? [
                  "mx-auto",
                  "max-w-4xl",
                  "text-center",
                ].join(" ")
              : hasSideContent
                ? "max-w-4xl"
                : "max-w-5xl",

            contentClassName,
          )}
        >
          {/* ----------------------------------------------------------- */}
          {/* Eyebrow / Badges                                            */}
          {/* ----------------------------------------------------------- */}

          {hasHeaderMeta ? (
            <div
              className={joinClasses(
                "flex flex-wrap items-center gap-2.5",

                shouldCenter &&
                  "justify-center",
              )}
            >
              {eyebrow ? (
                <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-[rgba(227,179,77,0.24)] bg-[rgba(211,154,46,0.065)] px-3.5 text-[8px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)] sm:px-4">
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
                  <HeroBadge
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
          {/* Title                                                       */}
          {/* ----------------------------------------------------------- */}

          <h1
            className={joinClasses(
              hasHeaderMeta
                ? "mt-6 sm:mt-7"
                : "",

              /*
               * Mobile sizes are intentionally restrained.
               *
               * Previous page heroes commonly started around 5xl, which
               * could dominate small screens. This keeps the premium look
               * while reducing wrapping and vertical height.
               */
              compact
                ? [
                    "text-[2.35rem]",
                    "leading-[0.98]",
                    "sm:text-5xl",
                    "lg:text-6xl",
                  ].join(" ")
                : [
                    "text-[2.6rem]",
                    "leading-[0.94]",
                    "sm:text-5xl",
                    "md:text-6xl",
                    "xl:text-7xl",
                  ].join(" "),

              "text-balance font-black",
              "tracking-[-0.06em]",
              "text-[var(--mr-text)]",

              titleClassName,
            )}
          >
            {title}
          </h1>

          {/* ----------------------------------------------------------- */}
          {/* Subtitle                                                    */}
          {/* ----------------------------------------------------------- */}

          {subtitle ? (
            <div
              className={joinClasses(
                "mt-5",
                "max-w-3xl",
                "text-base font-black leading-7",
                "tracking-[-0.02em]",
                "text-white/72",
                "sm:mt-6 sm:text-lg sm:leading-8",
                "lg:text-xl",

                shouldCenter &&
                  "mx-auto",
              )}
            >
              {subtitle}
            </div>
          ) : null}

          {/* ----------------------------------------------------------- */}
          {/* Description                                                 */}
          {/* ----------------------------------------------------------- */}

          {description ? (
            <div
              className={joinClasses(
                "mt-4 max-w-3xl",
                "text-sm leading-7 text-white/46",
                "sm:mt-5 sm:text-base",

                shouldCenter &&
                  "mx-auto",
              )}
            >
              {description}
            </div>
          ) : null}

          {/* ----------------------------------------------------------- */}
          {/* Actions                                                     */}
          {/* ----------------------------------------------------------- */}

          {hasActions ? (
            <div
              className={joinClasses(
                "mt-7 flex flex-col gap-3",
                "sm:mt-8 sm:flex-row sm:flex-wrap",

                shouldCenter &&
                  "sm:justify-center",
              )}
            >
              {primaryAction ? (
                <HeroAction
                  action={
                    primaryAction
                  }
                  primary
                />
              ) : null}

              {secondaryAction ? (
                <HeroAction
                  action={
                    secondaryAction
                  }
                />
              ) : null}

              {tertiaryAction ? (
                <HeroAction
                  action={{
                    ...tertiaryAction,

                    variant:
                      tertiaryAction.variant ??
                      "ghost",
                  }}
                />
              ) : null}
            </div>
          ) : null}

          {/* ----------------------------------------------------------- */}
          {/* Footer Content                                              */}
          {/* ----------------------------------------------------------- */}

          {footerContent ? (
            <div
              className={joinClasses(
                "mt-6",

                shouldCenter &&
                  "flex justify-center",
              )}
            >
              {footerContent}
            </div>
          ) : null}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Side Content                                                  */}
        {/* ------------------------------------------------------------- */}

        {sideContent ? (
          <div
            className={joinClasses(
              "min-w-0",

              /*
               * On mobile the side card stays directly under the main
               * conversion copy. Desktop moves it into the right column.
               */
              "lg:self-stretch",

              sideClassName,
            )}
          >
            {sideContent}
          </div>
        ) : null}
      </div>
    </header>
  );
}