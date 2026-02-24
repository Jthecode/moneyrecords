// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Button                                                ┃
   ┃ File   : src/components/Button.tsx                                    ┃
   ┃ Role   : Elite black+gold buttons (primary/secondary)                 ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import * as React from "react";

export type ButtonVariant = "primary" | "secondary";

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;

  /**
   * Convenience: if true and href is provided, opens in new tab safely.
   * - sets target="_blank"
   * - sets rel="noreferrer noopener" (unless you override rel)
   */
  external?: boolean;

  /**
   * Optional icon node (e.g. <Icon />) without changing layout.
   * Kept small and safe.
   */
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

type AnchorModeProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonModeProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = AnchorModeProps | ButtonModeProps;

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    className,
    children,
    external,
    leftIcon,
    rightIcon,
    ...rest
  } = props;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 " +
    "text-sm font-extrabold uppercase tracking-[0.18em] select-none " +
    "transition-all duration-200 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(214,179,90,0.55)] " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-black " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const styles: Record<ButtonVariant, string> = {
    primary:
      "text-black " +
      "bg-gradient-to-b from-[rgba(246,226,169,0.98)] via-[rgba(214,179,90,0.95)] to-[rgba(184,138,43,0.92)] " +
      "shadow-[0_18px_60px_rgba(0,0,0,0.55)] " +
      "border border-[rgba(255,255,255,0.10)] " +
      "hover:brightness-[1.06] hover:shadow-[0_22px_80px_rgba(0,0,0,0.65)] " +
      "active:translate-y-[1px]",
    secondary:
      "text-[rgba(244,241,234,0.92)] " +
      "bg-[rgba(18,18,18,0.70)] " +
      "border border-[rgba(214,179,90,0.22)] " +
      "shadow-[0_18px_60px_rgba(0,0,0,0.55)] " +
      "hover:bg-[rgba(18,18,18,0.82)] hover:border-[rgba(214,179,90,0.32)] " +
      "active:translate-y-[1px]",
  };

  const cls = cx(base, styles[variant], className);

  const content = (
    <>
      {leftIcon ? <span className="inline-flex items-center">{leftIcon}</span> : null}
      <span className="inline-flex items-center">{children}</span>
      {rightIcon ? <span className="inline-flex items-center">{rightIcon}</span> : null}
    </>
  );

  // Anchor mode
  if ("href" in props && props.href) {
    const a = rest as Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      "className" | "children"
    >;

    const target = external ? "_blank" : a.target;
    const rel =
      external && target === "_blank" ? a.rel ?? "noreferrer noopener" : a.rel;

    return (
      <a {...a} href={props.href} className={cls} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  // Button mode
  const b = rest as Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

  return (
    <button {...b} className={cls} type={b.type ?? "button"}>
      {content}
    </button>
  );
}