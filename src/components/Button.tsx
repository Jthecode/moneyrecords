// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Button                                                ┃
   ┃ File   : src/components/Button.tsx                                    ┃
   ┃ Role   : Elite black+gold buttons (primary/secondary)                 ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import * as React from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
} & (
  | (Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
      href?: undefined;
    })
  | (Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
      href: string;
    })
);

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    className = "",
    children,
    ...rest
  } = props as ButtonProps;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-[0.18em] " +
    "transition-all duration-200 select-none " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(214,179,90,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  const styles: Record<ButtonVariant, string> = {
    primary:
      "text-black " +
      "bg-gradient-to-b from-[rgba(246,226,169,0.98)] via-[rgba(214,179,90,0.95)] to-[rgba(184,138,43,0.92)] " +
      "shadow-[0_18px_60px_rgba(0,0,0,0.55)] " +
      "border border-[rgba(255,255,255,0.10)] " +
      "hover:brightness-[1.06] hover:shadow-[0_22px_80px_rgba(0,0,0,0.65)] active:translate-y-[1px]",
    secondary:
      "text-[rgba(244,241,234,0.92)] " +
      "bg-[rgba(18,18,18,0.70)] " +
      "border border-[rgba(214,179,90,0.22)] " +
      "shadow-[0_18px_60px_rgba(0,0,0,0.55)] " +
      "hover:bg-[rgba(18,18,18,0.82)] hover:border-[rgba(214,179,90,0.32)] active:translate-y-[1px]",
  };

  const cls = [base, styles[variant], className].join(" ");

  // Anchor mode
  if ("href" in props && props.href) {
    const a = props as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };

    return (
      <a
        {...a}
        className={cls}
        rel={a.target === "_blank" ? a.rel ?? "noreferrer" : a.rel}
      >
        {children}
      </a>
    );
  }

  // Button mode
  const b = props as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button {...b} className={cls} type={b.type ?? "button"}>
      {children}
    </button>
  );
}