// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Card                                                  ┃
   ┃ File   : src/components/Card.tsx                                      ┃
   ┃ Role   : Reusable luxury surfaces for campaigns, platforms, and media ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type CardVariant =
  | "default"
  | "featured"
  | "platform"
  | "campaign"
  | "glass";

export type CardPadding =
  | "none"
  | "sm"
  | "md"
  | "lg";

type CardOwnProps<T extends ElementType> = {
  /**
   * HTML element or React component rendered by the card.
   *
   * @default "div"
   */
  as?: T;

  /**
   * Controls the card's visual treatment.
   *
   * @default "default"
   */
  variant?: CardVariant;

  /**
   * Adds the premium hover lift, glow, and light sweep.
   *
   * @default false
   */
  hover?: boolean;

  /**
   * Controls the internal card spacing.
   *
   * @default "none"
   */
  padding?: CardPadding;

  /**
   * Displays a centered luxury-gold line at the top.
   *
   * @default false
   */
  topLine?: boolean;

  /**
   * Makes the card fill its parent's available height.
   *
   * Useful in equal-height card grids.
   *
   * @default false
   */
  fullHeight?: boolean;

  /**
   * Additional classes applied to the main card element.
   */
  className?: string;

  children?: ReactNode;
};

export type CardProps<T extends ElementType = "div"> =
  CardOwnProps<T> &
    Omit<
      ComponentPropsWithoutRef<T>,
      keyof CardOwnProps<T>
    >;

/* --------------------------------------------------------------------- */
/* Class Configuration                                                    */
/* --------------------------------------------------------------------- */

const variantClasses: Record<CardVariant, string> = {
  default: "",
  featured: "mr-card-featured",
  platform: "mr-platform-card",
  campaign: "mr-campaign-card",
  glass: "mr-glass",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm: "p-5",
  md: "mr-card-padding",
  lg: "mr-card-padding-lg",
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

export default function Card<T extends ElementType = "div">({
  as,
  variant = "default",
  hover = false,
  padding = "none",
  topLine = false,
  fullHeight = false,
  className,
  children,
  ...rest
}: CardProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={joinClasses(
        "mr-card",
        variantClasses[variant],
        paddingClasses[padding],
        hover && "mr-card-hover",
        fullHeight && "h-full",
        className,
      )}
      data-card-variant={variant}
      {...rest}
    >
      {topLine ? (
        <span
          aria-hidden="true"
          className="mr-card-topline"
        />
      ) : null}

      {children}
    </Component>
  );
}