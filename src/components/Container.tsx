// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Container                                             ┃
   ┃ File   : src/components/Container.tsx                                 ┃
   ┃ Role   : Responsive page-width and horizontal-spacing wrapper         ┃
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

export type ContainerSize =
  | "default"
  | "wide"
  | "narrow"
  | "full";

export type ContainerGutter =
  | "none"
  | "compact"
  | "default"
  | "comfortable";

type ContainerOwnProps<T extends ElementType> = {
  /**
   * HTML element or React component rendered by the container.
   *
   * @default "div"
   */
  as?: T;

  /**
   * Controls the maximum content width.
   *
   * default: 1180px
   * wide:    1360px
   * narrow:  820px
   * full:    no maximum width
   *
   * @default "default"
   */
  size?: ContainerSize;

  /**
   * Controls the container's responsive horizontal padding.
   *
   * @default "default"
   */
  gutter?: ContainerGutter;

  /**
   * Centers the container horizontally.
   *
   * @default true
   */
  centered?: boolean;

  className?: string;
  children?: ReactNode;
};

export type ContainerProps<T extends ElementType = "div"> =
  ContainerOwnProps<T> &
    Omit<
      ComponentPropsWithoutRef<T>,
      keyof ContainerOwnProps<T>
    >;

/* --------------------------------------------------------------------- */
/* Class Maps                                                             */
/* --------------------------------------------------------------------- */

const sizeClasses: Record<ContainerSize, string> = {
  default: "max-w-[var(--mr-container)]",
  wide: "max-w-[var(--mr-container-wide)]",
  narrow: "max-w-[var(--mr-container-narrow)]",
  full: "max-w-none",
};

const gutterClasses: Record<ContainerGutter, string> = {
  none: "px-0",
  compact: "px-3 sm:px-4 md:px-5",
  default: "px-[11px] min-[421px]:px-[14px] sm:px-[17px] md:px-6",
  comfortable: "px-4 sm:px-6 md:px-8 lg:px-10",
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

export default function Container<T extends ElementType = "div">({
  as,
  size = "default",
  gutter = "default",
  centered = true,
  className,
  children,
  ...rest
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={joinClasses(
        "relative w-full",
        centered && "mx-auto",
        sizeClasses[size],
        gutterClasses[gutter],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}