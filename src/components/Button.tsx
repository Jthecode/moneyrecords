"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Button                                                ┃
   ┃ File   : src/components/Button.tsx                                    ┃
   ┃ Role   : Reusable buttons and links across the Money Records website  ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  MouseEvent,
  ReactNode,
} from "react";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "dark"
  | "platform";

export type ButtonSize = "sm" | "md" | "lg";

type ButtonCommonProps = {
  /**
   * Visual style of the button.
   *
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * Controls the button height and spacing.
   *
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Makes the button fill its available width.
   *
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Creates a square icon button.
   *
   * Always provide an aria-label when using this option.
   *
   * @default false
   */
  square?: boolean;

  /**
   * Displays a loading spinner and disables interaction.
   *
   * @default false
   */
  loading?: boolean;

  /**
   * Accessible label displayed during loading.
   *
   * @default "Loading"
   */
  loadingLabel?: string;

  /**
   * Disables button interaction.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Opens a link in a new tab with secure rel attributes.
   *
   * @default false
   */
  external?: boolean;

  /**
   * Optional icon displayed before the label.
   */
  leftIcon?: ReactNode;

  /**
   * Optional icon displayed after the label.
   */
  rightIcon?: ReactNode;

  /**
   * Accent color used by the platform variant.
   *
   * Example: "#1ed760"
   */
  platformAccent?: string;

  className?: string;
  children: ReactNode;
};

type AnchorButtonProps = ButtonCommonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof ButtonCommonProps | "href"
  > & {
    href: string;
  };

type NativeButtonProps = ButtonCommonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonCommonProps
  > & {
    href?: never;
  };

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

type CSSVariableStyle = CSSProperties & {
  "--platform-accent"?: string;
};

/* --------------------------------------------------------------------- */
/* Class Configuration                                                    */
/* --------------------------------------------------------------------- */

const variantClasses: Record<ButtonVariant, string> = {
  primary: "mr-btn-primary",
  secondary: "mr-btn-secondary",
  ghost: "mr-btn-ghost",
  dark: "mr-btn-dark",
  platform: "mr-btn-platform",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "mr-btn-sm",
  md: "",
  lg: "mr-btn-lg",
};

/* --------------------------------------------------------------------- */
/* Helpers                                                                */
/* --------------------------------------------------------------------- */

function joinClasses(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

function isInternalRoute(href: string): boolean {
  return href.startsWith("/");
}

/* --------------------------------------------------------------------- */
/* Loading Spinner                                                        */
/* --------------------------------------------------------------------- */

function LoadingSpinner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      className="shrink-0 animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.25"
      />

      <path
        d="M21 12A9 9 0 0 0 12 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/* Button Content                                                         */
/* --------------------------------------------------------------------- */

type ButtonContentProps = {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading: boolean;
  loadingLabel: string;
};

function ButtonContent({
  children,
  leftIcon,
  rightIcon,
  loading,
  loadingLabel,
}: ButtonContentProps) {
  return (
    <>
      {loading ? (
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center justify-center"
        >
          <LoadingSpinner />
        </span>
      ) : leftIcon ? (
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center justify-center"
        >
          {leftIcon}
        </span>
      ) : null}

      <span className="inline-flex min-w-0 items-center justify-center">
        {loading ? loadingLabel : children}
      </span>

      {!loading && rightIcon ? (
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center justify-center"
        >
          {rightIcon}
        </span>
      ) : null}
    </>
  );
}

/* --------------------------------------------------------------------- */
/* Component                                                              */
/* --------------------------------------------------------------------- */

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    square = false,
    loading = false,
    loadingLabel = "Loading",
    disabled = false,
    external = false,
    leftIcon,
    rightIcon,
    platformAccent,
    className,
    children,
    style,
    ...rest
  } = props;

  const isDisabled = disabled || loading;

  const buttonClassName = joinClasses(
    "mr-btn",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "mr-btn-full",
    square && "mr-btn-square",
    isDisabled &&
      "pointer-events-none cursor-not-allowed opacity-50",
    className,
  );

  const buttonStyle: CSSVariableStyle = {
    ...(style as CSSProperties | undefined),

    ...(variant === "platform" && platformAccent
      ? {
          "--platform-accent": platformAccent,
        }
      : {}),
  };

  const content = (
    <ButtonContent
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      loading={loading}
      loadingLabel={loadingLabel}
    >
      {children}
    </ButtonContent>
  );

  /* ------------------------------------------------------------------- */
  /* Link Mode                                                           */
  /* ------------------------------------------------------------------- */

  if ("href" in props && typeof props.href === "string") {
    const href = props.href;

    const {
      target,
      rel,
      onClick,
      download,
      tabIndex,
      ...anchorProps
    } = rest as Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      keyof ButtonCommonProps | "href" | "className" | "style"
    >;

    const resolvedTarget = external ? "_blank" : target;

    const resolvedRel =
      resolvedTarget === "_blank"
        ? rel ?? "noopener noreferrer"
        : rel;

    const handleLinkClick = (
      event: MouseEvent<HTMLAnchorElement>,
    ) => {
      if (isDisabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      onClick?.(event);
    };

    const sharedLinkProps = {
      ...anchorProps,
      className: buttonClassName,
      style: buttonStyle,
      target: resolvedTarget,
      rel: resolvedRel,
      download,
      onClick: handleLinkClick,
      "aria-disabled": isDisabled || undefined,
      "aria-busy": loading || undefined,
      tabIndex: isDisabled ? -1 : tabIndex,
    };

    const shouldUseNextLink =
      isInternalRoute(href) &&
      !external &&
      !download &&
      resolvedTarget !== "_blank";

    if (shouldUseNextLink) {
      return (
        <Link href={href} {...sharedLinkProps}>
          {content}
        </Link>
      );
    }

    return (
      <a href={href} {...sharedLinkProps}>
        {content}
      </a>
    );
  }

  /* ------------------------------------------------------------------- */
  /* Native Button Mode                                                  */
  /* ------------------------------------------------------------------- */

  const {
    type = "button",
    ...buttonProps
  } = rest as Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonCommonProps | "className" | "style"
  >;

  return (
    <button
      {...buttonProps}
      type={type}
      className={buttonClassName}
      style={buttonStyle}
      disabled={isDisabled}
      aria-busy={loading || undefined}
    >
      {content}
    </button>
  );
}