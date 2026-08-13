"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Global Navigation                                    ┃
   ┃ File   : src/components/NavBar.tsx                                   ┃
   ┃ Role   : Responsive navigation, cart access, brand, routes, and CTAs ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type {
  ReactNode,
} from "react";

import { useUI } from "@/app/providers";

import Button from "@/components/Button";
import { useCart } from "@/components/CartProvider";
import Container from "@/components/Container";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

type NavLinkMatch =
  | "exact"
  | "prefix"
  | "none";

type NavLinkIcon =
  | "home"
  | "artists"
  | "releases"
  | "distribution"
  | "marketing"
  | "about"
  | "contact";

export type NavLink = {
  label: string;
  href: string;
  match?: NavLinkMatch;
  icon?: NavLinkIcon;
};

export type NavBarProps = {
  links?: readonly NavLink[];

  ctaPrimaryHref?: string;
  ctaPrimaryLabel?: string;

  ctaSecondaryHref?: string;
  ctaSecondaryLabel?: string;
};

type CartButtonProps = {
  itemCount: number;
  isHydrated: boolean;
  isOpen: boolean;
  onClick: () => void;
  showLabel?: boolean;
  className?: string;
};

type MobileNavLinkProps = {
  link: NavLink;
  pathname: string;
  onNavigate: () => void;
};

/* --------------------------------------------------------------------- */
/* Navigation Configuration                                               */
/* --------------------------------------------------------------------- */

const DEFAULT_LINKS:
  readonly NavLink[] = [
    {
      label:
        "Home",

      href:
        "/",

      match:
        "exact",

      icon:
        "home",
    },

    {
      label:
        "Artists",

      href:
        "/artists",

      match:
        "prefix",

      icon:
        "artists",
    },

    {
      label:
        "Releases",

      href:
        "/releases",

      match:
        "prefix",

      icon:
        "releases",
    },

    {
      label:
        "Marketing",

      href:
        "/services",

      match:
        "prefix",

      icon:
        "marketing",
    },

    {
      label:
        "Distribution",

      href:
        "/distribution",

      match:
        "prefix",

      icon:
        "distribution",
    },

    {
      label:
        "About",

      href:
        "/about",

      match:
        "prefix",

      icon:
        "about",
    },

    {
      label:
        "Contact",

      href:
        "/contact",

      match:
        "prefix",

      icon:
        "contact",
    },
  ];

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function MenuIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M4 5H6L8.1 14.2H17.7L20 8H7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="9"
        cy="18.5"
        r="1.3"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="17"
        cy="18.5"
        r="1.3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

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

function HomeIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M4 11.5L12 4L20 11.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M6.5 10V19H17.5V10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M10 19V14H14V19"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArtistIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <circle
        cx="12"
        cy="8"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M5.5 20C6.2 16.8 8.6 15 12 15C15.4 15 17.8 16.8 18.5 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MusicIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M9 18V7L18 5V16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="6.5"
        cy="18"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <circle
        cx="15.5"
        cy="16"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function GlobeIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M3.8 12H20.2M12 3.5C14.3 5.9 15.5 8.7 15.5 12C15.5 15.3 14.3 18.1 12 20.5C9.7 18.1 8.5 15.3 8.5 12C8.5 8.7 9.7 5.9 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarketingIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M4 11V14C4 15.1 4.9 16 6 16H8L17 20V5L8 9H6C4.9 9 4 9.9 4 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M8 16L9.5 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <path
        d="M20 9V16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AboutIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M12 10.5V16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <circle
        cx="12"
        cy="7.5"
        r="1"
        fill="currentColor"
      />
    </svg>
  );
}

function ContactIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M5 8L12 13L19 8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
    >
      <path
        d="M12 3.5L19 6.2V11.4C19 15.6 16.4 18.8 12 20.5C7.6 18.8 5 15.6 5 11.4V6.2L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M8.8 12L11 14.2L15.5 9.7"
        stroke="currentColor"
        strokeWidth="1.7"
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

function normalizePathname(
  pathname: string,
): string {
  if (
    pathname.length > 1 &&
    pathname.endsWith("/")
  ) {
    return pathname.replace(
      /\/+$/,
      "",
    );
  }

  return pathname || "/";
}

function isLinkActive(
  pathname: string,
  link: NavLink,
): boolean {
  const normalizedPathname =
    normalizePathname(
      pathname,
    );

  const matchType =
    link.match ??
    "none";

  if (
    matchType ===
    "none"
  ) {
    return false;
  }

  const hrefWithoutHash =
    link.href.split("#")[0] ||
    "/";

  const route =
    normalizePathname(
      hrefWithoutHash,
    );

  if (
    matchType ===
    "exact"
  ) {
    return normalizedPathname ===
      route;
  }

  if (
    route === "/"
  ) {
    return normalizedPathname ===
      "/";
  }

  return (
    normalizedPathname ===
      route ||
    normalizedPathname.startsWith(
      `${route}/`,
    )
  );
}

function getVisibleCartCount(
  itemCount: number,
  isHydrated: boolean,
): number {
  if (
    !isHydrated ||
    !Number.isFinite(
      itemCount,
    ) ||
    itemCount <= 0
  ) {
    return 0;
  }

  return Math.floor(
    itemCount,
  );
}

function getCartCountLabel(
  itemCount: number,
): string {
  return itemCount > 99
    ? "99+"
    : String(
        itemCount,
      );
}

function getSelectedServiceLabel(
  count: number,
): string {
  return count === 1
    ? "service"
    : "services";
}

function getMobileLinkIcon(
  link: NavLink,
): ReactNode {
  switch (
    link.icon
  ) {
    case "home":
      return <HomeIcon />;

    case "artists":
      return <ArtistIcon />;

    case "releases":
      return <MusicIcon />;

    case "distribution":
      return <GlobeIcon />;

    case "marketing":
      return <MarketingIcon />;

    case "about":
      return <AboutIcon />;

    case "contact":
      return <ContactIcon />;

    default:
      return <ArrowIcon />;
  }
}

/* --------------------------------------------------------------------- */
/* Cart Button                                                            */
/* --------------------------------------------------------------------- */

function CartButton({
  itemCount,
  isHydrated,
  isOpen,
  onClick,
  showLabel =
    true,
  className,
}: CartButtonProps) {
  const visibleCount =
    getVisibleCartCount(
      itemCount,
      isHydrated,
    );

  const hasItems =
    visibleCount > 0;

  const countLabel =
    getCartCountLabel(
      visibleCount,
    );

  const accessibleLabel =
    isOpen
      ? "Close campaign cart"
      : !isHydrated
        ? "Open campaign cart"
        : hasItems
          ? `Open campaign cart. ${visibleCount} selected ${getSelectedServiceLabel(
              visibleCount,
            )}.`
          : "Open campaign cart. Your cart is empty.";

  return (
    <button
      type="button"
      aria-label={
        accessibleLabel
      }
      aria-expanded={
        isOpen
      }
      aria-haspopup="dialog"
      onClick={
        onClick
      }
      className={joinClasses(
        "group relative inline-flex h-11 items-center justify-center",
        "rounded-full border",
        "transition duration-200",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[rgba(227,179,77,0.52)]",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-black",

        isOpen
          ? [
              "border-[rgba(227,179,77,0.38)]",
              "bg-[rgba(211,154,46,0.11)]",
              "text-[var(--mr-gold-100)]",
            ].join(" ")
          : [
              "border-white/[0.09]",
              "bg-white/[0.035]",
              "text-white/72",
              "hover:border-[rgba(227,179,77,0.3)]",
              "hover:bg-[rgba(211,154,46,0.065)]",
              "hover:text-[var(--mr-gold-100)]",
            ].join(" "),

        showLabel
          ? "gap-2 px-4"
          : "w-11 px-0",

        className,
      )}
    >
      <span className="relative inline-flex">
        <CartIcon />

        {!showLabel &&
        hasItems ? (
          <span
            aria-hidden="true"
            className={[
              "absolute -right-2.5 -top-2.5",
              "grid min-h-5 min-w-5 place-items-center",
              "rounded-full",
              "border border-black/70",
              "bg-[var(--mr-gold-300)]",
              "px-1",
              "text-[8px] font-black leading-none text-black",
              "shadow-[0_5px_18px_rgba(0,0,0,0.45)]",
            ].join(" ")}
          >
            {countLabel}
          </span>
        ) : null}
      </span>

      {showLabel ? (
        <>
          <span className="text-[10px] font-black uppercase tracking-[0.14em]">
            Cart
          </span>

          <span
            aria-hidden="true"
            className={joinClasses(
              "grid min-h-6 min-w-6 place-items-center rounded-full px-1.5",
              "text-[9px] font-black leading-none",

              hasItems
                ? [
                    "bg-[var(--mr-gold-300)]",
                    "text-black",
                    "shadow-[0_5px_18px_rgba(0,0,0,0.38)]",
                  ].join(" ")
                : [
                    "border border-white/[0.09]",
                    "bg-white/[0.04]",
                    "text-white/40",
                  ].join(" "),
            )}
          >
            {isHydrated
              ? countLabel
              : "—"}
          </span>
        </>
      ) : null}
    </button>
  );
}

/* --------------------------------------------------------------------- */
/* Desktop Navigation Link                                                */
/* --------------------------------------------------------------------- */

function DesktopNavLink({
  link,
  pathname,
}: {
  link: NavLink;
  pathname: string;
}) {
  const active =
    isLinkActive(
      pathname,
      link,
    );

  return (
    <Link
      href={
        link.href
      }
      aria-current={
        active
          ? "page"
          : undefined
      }
      className={joinClasses(
        "mr-navlink",

        active &&
          "mr-navlink-active",
      )}
    >
      {link.label}
    </Link>
  );
}

/* --------------------------------------------------------------------- */
/* Mobile Navigation Link                                                 */
/* --------------------------------------------------------------------- */

function MobileNavLink({
  link,
  pathname,
  onNavigate,
}: MobileNavLinkProps) {
  const active =
    isLinkActive(
      pathname,
      link,
    );

  return (
    <Link
      href={
        link.href
      }
      onClick={
        onNavigate
      }
      aria-current={
        active
          ? "page"
          : undefined
      }
      className={joinClasses(
        "group relative flex min-h-14 items-center justify-between gap-4",
        "rounded-[18px] border px-3.5 py-2.5",
        "transition duration-200",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[rgba(227,179,77,0.48)]",

        active
          ? [
              "border-[rgba(227,179,77,0.2)]",
              "bg-[rgba(211,154,46,0.06)]",
              "text-[var(--mr-gold-100)]",
            ].join(" ")
          : [
              "border-transparent",
              "bg-transparent",
              "text-white/58",
              "hover:border-white/[0.06]",
              "hover:bg-white/[0.025]",
              "hover:text-[var(--mr-gold-200)]",
            ].join(" "),
      )}
    >
      {active ? (
        <span
          aria-hidden="true"
          className={[
            "absolute inset-y-3 left-0",
            "w-[2px]",
            "rounded-full",
            "bg-[var(--mr-gold-300)]",
            "shadow-[0_0_14px_rgba(227,179,77,0.45)]",
          ].join(" ")}
        />
      ) : null}

      <span className="flex min-w-0 items-center gap-3">
        <span
          className={joinClasses(
            "grid h-9 w-9 flex-[0_0_36px] place-items-center",
            "rounded-xl border",
            "transition duration-200",

            active
              ? [
                  "border-[rgba(227,179,77,0.28)]",
                  "bg-[rgba(211,154,46,0.08)]",
                  "text-[var(--mr-gold-200)]",
                ].join(" ")
              : [
                  "border-white/[0.07]",
                  "bg-white/[0.02]",
                  "text-white/38",
                  "group-hover:border-[rgba(227,179,77,0.2)]",
                  "group-hover:text-[var(--mr-gold-200)]",
                ].join(" "),
          )}
        >
          {getMobileLinkIcon(
            link,
          )}
        </span>

        <span className="truncate text-sm font-black tracking-[-0.01em]">
          {link.label}
        </span>
      </span>

      <span
        aria-hidden="true"
        className={joinClasses(
          "flex-[0_0_auto]",
          "transition duration-200",

          active
            ? "text-[var(--mr-gold-200)]"
            : [
                "text-white/20",
                "group-hover:translate-x-0.5",
                "group-hover:text-[var(--mr-gold-200)]",
              ].join(" "),
        )}
      >
        <ArrowIcon />
      </span>
    </Link>
  );
}

/* --------------------------------------------------------------------- */
/* Mobile Utility Link                                                    */
/* --------------------------------------------------------------------- */

function MobileUtilityLink({
  href,
  eyebrow,
  label,
  icon,
  onClick,
}: {
  href: string;
  eyebrow: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={
        href
      }
      onClick={
        onClick
      }
      className={[
        "group flex min-h-14 items-center justify-between gap-3",
        "rounded-[18px]",
        "border border-white/[0.06]",
        "bg-white/[0.02]",
        "px-4 py-3",
        "transition duration-200",
        "hover:border-[rgba(227,179,77,0.18)]",
        "hover:bg-[rgba(211,154,46,0.035)]",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[rgba(227,179,77,0.45)]",
      ].join(" ")}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="grid h-9 w-9 flex-[0_0_36px] place-items-center rounded-xl border border-[rgba(227,179,77,0.15)] bg-[rgba(211,154,46,0.035)] text-[var(--mr-gold-200)]">
          {icon}
        </span>

        <span className="min-w-0">
          <span className="block text-[8px] font-black uppercase tracking-[0.14em] text-white/25">
            {eyebrow}
          </span>

          <span className="mt-1 block truncate text-xs font-black text-white/62">
            {label}
          </span>
        </span>
      </span>

      <span
        aria-hidden="true"
        className="text-[var(--mr-gold-200)] transition-transform duration-200 group-hover:translate-x-0.5"
      >
        <ArrowIcon />
      </span>
    </Link>
  );
}

/* --------------------------------------------------------------------- */
/* Component                                                              */
/* --------------------------------------------------------------------- */

export default function NavBar({
  links =
    DEFAULT_LINKS,

  ctaPrimaryHref =
    "/services",

  ctaPrimaryLabel =
    "Start a Campaign",

  ctaSecondaryHref =
    "/submit-music",

  ctaSecondaryLabel =
    "Submit Music",
}: NavBarProps) {
  const pathname =
    usePathname();

  const {
    isMobileMenuOpen,
    isCartOpen,

    toggleMobileMenu,
    closeMobileMenu,

    toggleCart,
  } =
    useUI();

  const {
    itemCount,
    isHydrated,
  } =
    useCart();

  /* ------------------------------------------------------------------- */
  /* Render                                                              */
  /* ------------------------------------------------------------------- */

  return (
    <header className="mr-topbar">
      {/* --------------------------------------------------------------- */}
      {/* Main Navigation                                                 */}
      {/* --------------------------------------------------------------- */}

      <Container>
        <div className="mr-topbar-inner">
          {/* ----------------------------------------------------------- */}
          {/* Brand                                                       */}
          {/* ----------------------------------------------------------- */}

          <Link
            href="/"
            aria-label="Money Records homepage"
            onClick={
              closeMobileMenu
            }
            className="mr-brand group min-w-0"
          >
            <span className="mr-brand-mark relative flex-[0_0_auto] overflow-hidden">
              <Image
                src="/brand/mr-crest.png"
                alt=""
                width={54}
                height={54}
                priority
                sizes="54px"
                className={[
                  "h-full w-full object-contain p-1.5",
                  "transition-transform duration-500",
                  "group-hover:scale-105",
                ].join(" ")}
              />
            </span>

            <span className="mr-brand-copy min-w-0">
              <span className="mr-brand-name truncate">
                Money Records
              </span>

              <span className="mr-brand-label hidden truncate sm:block">
                Record Label · Global Marketing
              </span>
            </span>
          </Link>

          {/* ----------------------------------------------------------- */}
          {/* Desktop Navigation                                          */}
          {/* ----------------------------------------------------------- */}

          <nav
            aria-label="Primary navigation"
            className="mr-nav hidden 2xl:flex"
          >
            {links.map(
              (
                link,
              ) => (
                <DesktopNavLink
                  key={`${link.label}-${link.href}`}
                  link={
                    link
                  }
                  pathname={
                    pathname
                  }
                />
              ),
            )}
          </nav>

          {/* ----------------------------------------------------------- */}
          {/* Desktop Actions                                             */}
          {/* ----------------------------------------------------------- */}

          <div className="hidden items-center gap-2 2xl:flex">
            <CartButton
              itemCount={
                itemCount
              }
              isHydrated={
                isHydrated
              }
              isOpen={
                isCartOpen
              }
              onClick={
                toggleCart
              }
            />

            <Button
              variant="secondary"
              href={
                ctaSecondaryHref
              }
            >
              {ctaSecondaryLabel}
            </Button>

            <Button
              variant="primary"
              href={
                ctaPrimaryHref
              }
            >
              {ctaPrimaryLabel}
            </Button>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Laptop / Tablet Actions                                     */}
          {/* ----------------------------------------------------------- */}

          <div className="hidden items-center gap-2 md:flex 2xl:hidden">
            <CartButton
              itemCount={
                itemCount
              }
              isHydrated={
                isHydrated
              }
              isOpen={
                isCartOpen
              }
              onClick={
                toggleCart
              }
              showLabel={
                false
              }
            />

            <Button
              variant="primary"
              href={
                ctaPrimaryHref
              }
              className="hidden lg:inline-flex"
            >
              {ctaPrimaryLabel}
            </Button>

            <button
              type="button"
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={
                isMobileMenuOpen
              }
              aria-controls="money-records-mobile-menu"
              onClick={
                toggleMobileMenu
              }
              className={joinClasses(
                "mr-btn-dark mr-btn-square",

                isMobileMenuOpen &&
                  [
                    "border-[rgba(227,179,77,0.3)]",
                    "text-[var(--mr-gold-200)]",
                  ].join(" "),
              )}
            >
              {isMobileMenuOpen
                ? <CloseIcon />
                : <MenuIcon />}
            </button>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Mobile Actions                                              */}
          {/* ----------------------------------------------------------- */}

          <div className="flex items-center gap-2 md:hidden">
            <CartButton
              itemCount={
                itemCount
              }
              isHydrated={
                isHydrated
              }
              isOpen={
                isCartOpen
              }
              onClick={
                toggleCart
              }
              showLabel={
                false
              }
            />

            <button
              type="button"
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={
                isMobileMenuOpen
              }
              aria-controls="money-records-mobile-menu"
              onClick={
                toggleMobileMenu
              }
              className={joinClasses(
                "mr-btn-dark mr-btn-square",

                isMobileMenuOpen &&
                  [
                    "border-[rgba(227,179,77,0.3)]",
                    "text-[var(--mr-gold-200)]",
                  ].join(" "),
              )}
            >
              {isMobileMenuOpen
                ? <CloseIcon />
                : <MenuIcon />}
            </button>
          </div>
        </div>
      </Container>

      {/* --------------------------------------------------------------- */}
      {/* Mobile / Tablet Menu                                            */}
      {/* --------------------------------------------------------------- */}

      {isMobileMenuOpen ? (
        <>
          {/* ----------------------------------------------------------- */}
          {/* Backdrop                                                    */}
          {/* ----------------------------------------------------------- */}

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={
              closeMobileMenu
            }
            className={[
              "fixed inset-x-0 bottom-0",
              "top-[var(--mr-header-height)]",
              "z-[80]",
              "bg-black/78",
              "backdrop-blur-[8px]",
              "2xl:hidden",
            ].join(" ")}
          />

          {/* ----------------------------------------------------------- */}
          {/* Menu Panel                                                  */}
          {/* ----------------------------------------------------------- */}

          <div
            id="money-records-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Money Records navigation"
            className={[
              "mr-mobile-menu",
              "fixed inset-x-0",
              "top-[var(--mr-header-height)]",
              "z-[90]",
              "max-h-[calc(100dvh-var(--mr-header-height))]",
              "overflow-y-auto",
              "overscroll-contain",
              "border-t border-white/[0.055]",
              "shadow-[0_34px_90px_rgba(0,0,0,0.65)]",
              "2xl:hidden",
            ].join(" ")}
          >
            <Container>
              <div
                className={[
                  "py-4",
                  "pb-[max(18px,env(safe-area-inset-bottom))]",
                  "sm:py-5",
                ].join(" ")}
              >
                {/* ----------------------------------------------------- */}
                {/* Compact Header                                        */}
                {/* ----------------------------------------------------- */}

                <div className="flex items-center justify-between gap-4 border-b border-white/[0.065] pb-4">
                  <div className="min-w-0">
                    <p className="m-0 text-[8px] font-black uppercase tracking-[0.18em] text-[var(--mr-gold-200)]">
                      Money Records
                    </p>

                    <p className="mt-1 truncate text-sm font-black text-[var(--mr-text)]">
                      Explore the Label
                    </p>
                  </div>

                  <span
                    className={[
                      "inline-flex flex-[0_0_auto] items-center gap-2",
                      "rounded-full",
                      "border border-emerald-300/15",
                      "bg-emerald-300/[0.04]",
                      "px-3 py-2",
                      "text-[8px] font-black uppercase",
                      "tracking-[0.14em]",
                      "text-emerald-300/80",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.65)]"
                    />

                    Online
                  </span>
                </div>

                {/* ----------------------------------------------------- */}
                {/* Main Navigation                                       */}
                {/* ----------------------------------------------------- */}

                <nav
                  aria-label="Mobile navigation"
                  className="py-4"
                >
                  <div className="mb-2 px-1">
                    <p className="m-0 text-[8px] font-black uppercase tracking-[0.17em] text-white/24">
                      Navigation
                    </p>
                  </div>

                  <div className="grid gap-1 sm:grid-cols-2">
                    {links.map(
                      (
                        link,
                      ) => (
                        <MobileNavLink
                          key={`mobile-${link.label}-${link.href}`}
                          link={
                            link
                          }
                          pathname={
                            pathname
                          }
                          onNavigate={
                            closeMobileMenu
                          }
                        />
                      ),
                    )}
                  </div>
                </nav>

                {/* ----------------------------------------------------- */}
                {/* Primary Actions                                       */}
                {/* ----------------------------------------------------- */}

                <div className="border-t border-white/[0.065] py-4">
                  <div className="mb-3 px-1">
                    <p className="m-0 text-[8px] font-black uppercase tracking-[0.17em] text-white/24">
                      Artist Actions
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button
                      variant="primary"
                      href={
                        ctaPrimaryHref
                      }
                      onClick={
                        closeMobileMenu
                      }
                      className="w-full"
                    >
                      {ctaPrimaryLabel}
                    </Button>

                    <Button
                      variant="secondary"
                      href={
                        ctaSecondaryHref
                      }
                      onClick={
                        closeMobileMenu
                      }
                      className="w-full"
                    >
                      {ctaSecondaryLabel}
                    </Button>
                  </div>
                </div>

                {/* ----------------------------------------------------- */}
                {/* Quick Help                                            */}
                {/* ----------------------------------------------------- */}

                <div className="border-t border-white/[0.065] py-4">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <MobileUtilityLink
                      href="/contact"
                      eyebrow="Need Help?"
                      label="Contact the Team"
                      icon={
                        <ContactIcon />
                      }
                      onClick={
                        closeMobileMenu
                      }
                    />

                    <MobileUtilityLink
                      href="/distribution"
                      eyebrow="Release Support"
                      label="Music Distribution"
                      icon={
                        <GlobeIcon />
                      }
                      onClick={
                        closeMobileMenu
                      }
                    />
                  </div>
                </div>

                {/* ----------------------------------------------------- */}
                {/* Footer                                                */}
                {/* ----------------------------------------------------- */}

                <div className="flex flex-col gap-3 border-t border-white/[0.065] pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={[
                        "h-1.5 w-1.5",
                        "rounded-full",
                        "bg-[var(--mr-gold-300)]",
                        "shadow-[0_0_14px_rgba(239,202,112,0.55)]",
                      ].join(" ")}
                    />

                    <p className="m-0 text-[8px] font-bold uppercase tracking-[0.15em] text-white/32">
                      Independent Artists · Global Execution
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.13em] text-white/22">
                    <ShieldIcon />

                    Money Records LLC
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </>
      ) : null}
    </header>
  );
}