"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Legal Table of Contents                              ┃
   ┃ File   : src/components/LegalTableOfContents.tsx                     ┃
   ┃ Role   : Responsive legal-page navigation with active section state ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import Card from "@/components/Card";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type LegalTableOfContentsItem = {
  /**
   * Displayed section number.
   *
   * Example:
   * "01"
   */
  number: string;

  /**
   * Human-readable section label.
   *
   * Example:
   * "Information We Collect"
   */
  label: string;

  /**
   * Hash link to the section.
   *
   * Example:
   * "#privacy-section-01"
   */
  href: `#${string}`;
};

export type LegalTableOfContentsProps = {
  items:
    readonly LegalTableOfContentsItem[];

  /**
   * Small gold heading above the desktop title.
   */
  eyebrow?: string;

  /**
   * Desktop navigation title.
   */
  title?: string;

  /**
   * Mobile closed-state label.
   */
  mobileLabel?: string;

  /**
   * Optional helper text displayed under the title.
   */
  description?: string;

  /**
   * Optional additional wrapper classes.
   */
  className?: string;
};

/* --------------------------------------------------------------------- */
/* Constants                                                              */
/* --------------------------------------------------------------------- */

const DEFAULT_EYEBROW =
  "Policy Navigation";

const DEFAULT_TITLE =
  "Contents";

const DEFAULT_MOBILE_LABEL =
  "Jump to Section";

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function ChevronDownIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="15"
      height="15"
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

function ListIcon(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M9 7H20M9 12H20M9 17H20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <circle
        cx="5"
        cy="7"
        r="1"
        fill="currentColor"
      />

      <circle
        cx="5"
        cy="12"
        r="1"
        fill="currentColor"
      />

      <circle
        cx="5"
        cy="17"
        r="1"
        fill="currentColor"
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

function normalizeHash(
  value: string,
): string {
  if (!value) {
    return "";
  }

  return value.startsWith("#")
    ? value
    : `#${value}`;
}

function getElementIdFromHref(
  href: `#${string}`,
): string {
  return href.slice(1);
}

/* --------------------------------------------------------------------- */
/* Navigation Row                                                         */
/* --------------------------------------------------------------------- */

function NavigationItem({
  item,
  active,
  onNavigate,
  compact = false,
}: {
  item:
    LegalTableOfContentsItem;

  active:
    boolean;

  onNavigate:
    (
      item:
        LegalTableOfContentsItem,
    ) => void;

  compact?: boolean;
}) {
  return (
    <a
      href={item.href}
      aria-current={
        active
          ? "location"
          : undefined
      }
      onClick={() => {
        onNavigate(item);
      }}
      className={joinClasses(
        "group relative flex w-full items-center justify-between gap-4",
        "rounded-xl border text-left transition duration-200",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-[rgba(227,179,77,0.45)]",

        compact
          ? "min-h-12 px-3.5 py-2.5"
          : "min-h-11 px-3 py-2.5",

        active
          ? [
              "border-[rgba(227,179,77,0.22)]",
              "bg-[rgba(211,154,46,0.065)]",
              "text-[var(--mr-gold-100)]",
            ].join(" ")
          : [
              "border-transparent",
              "bg-transparent",
              "text-white/43",
              "hover:border-white/[0.055]",
              "hover:bg-white/[0.025]",
              "hover:text-[var(--mr-gold-200)]",
            ].join(" "),
      )}
    >
      {/* Active line */}

      {active ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-2 left-0 w-[2px] rounded-full bg-[var(--mr-gold-300)] shadow-[0_0_14px_rgba(227,179,77,0.55)]"
        />
      ) : null}

      <span className="flex min-w-0 items-center gap-3">
        <span
          className={joinClasses(
            "grid h-7 w-7 flex-[0_0_28px] place-items-center rounded-lg",
            "border text-[8px] font-black tracking-[0.05em]",
            "transition duration-200",

            active
              ? [
                  "border-[rgba(227,179,77,0.25)]",
                  "bg-[rgba(211,154,46,0.08)]",
                  "text-[var(--mr-gold-200)]",
                ].join(" ")
              : [
                  "border-white/[0.065]",
                  "bg-white/[0.025]",
                  "text-white/22",
                  "group-hover:border-[rgba(227,179,77,0.16)]",
                  "group-hover:text-[var(--mr-gold-200)]",
                ].join(" "),
          )}
        >
          {item.number}
        </span>

        <span
          className={joinClasses(
            "min-w-0 text-xs leading-5",

            active
              ? "font-black"
              : "font-semibold",
          )}
        >
          {item.label}
        </span>
      </span>

      <span
        aria-hidden="true"
        className={joinClasses(
          "flex-[0_0_auto] transition duration-200",

          active
            ? "text-[var(--mr-gold-200)]"
            : [
                "translate-x-[-2px]",
                "text-white/15",
                "opacity-0",
                "group-hover:translate-x-0",
                "group-hover:text-[var(--mr-gold-200)]",
                "group-hover:opacity-100",
              ].join(" "),
        )}
      >
        {active
          ? <CheckIcon />
          : <ArrowIcon />}
      </span>
    </a>
  );
}

/* --------------------------------------------------------------------- */
/* Component                                                              */
/* --------------------------------------------------------------------- */

export default function LegalTableOfContents({
  items,

  eyebrow =
    DEFAULT_EYEBROW,

  title =
    DEFAULT_TITLE,

  mobileLabel =
    DEFAULT_MOBILE_LABEL,

  description,

  className,
}: LegalTableOfContentsProps) {
  const reactId =
    useId();

  const mobilePanelId =
    `money-records-legal-toc-${reactId.replace(
      /:/g,
      "",
    )}`;

  const [
    isMobileOpen,
    setIsMobileOpen,
  ] =
    useState(false);

  const [
    activeHref,
    setActiveHref,
  ] =
    useState<string>(
      items[0]?.href ??
        "",
    );

  /* ------------------------------------------------------------------- */
  /* Valid Items                                                         */
  /* ------------------------------------------------------------------- */

  const validItems =
    useMemo(
      () =>
        items.filter(
          (item) =>
            item.number
              .trim()
              .length >
              0 &&
            item.label
              .trim()
              .length >
              0 &&
            item.href.startsWith(
              "#",
            ),
        ),
      [items],
    );

  /* ------------------------------------------------------------------- */
  /* Current Section Label                                               */
  /* ------------------------------------------------------------------- */

  const activeItem =
    useMemo(
      () =>
        validItems.find(
          (item) =>
            item.href ===
            activeHref,
        ) ??
        validItems[0],
      [
        activeHref,
        validItems,
      ],
    );

  /* ------------------------------------------------------------------- */
  /* Navigation                                                          */
  /* ------------------------------------------------------------------- */

  const handleNavigate =
    useCallback(
      (
        item:
          LegalTableOfContentsItem,
      ) => {
        setActiveHref(
          item.href,
        );

        setIsMobileOpen(
          false,
        );
      },
      [],
    );

  /* ------------------------------------------------------------------- */
  /* Initial Hash                                                        */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    const hash =
      normalizeHash(
        window.location.hash,
      );

    if (!hash) {
      return;
    }

    const exists =
      validItems.some(
        (item) =>
          item.href ===
          hash,
      );

    if (exists) {
      setActiveHref(
        hash,
      );
    }
  }, [validItems]);

  /* ------------------------------------------------------------------- */
  /* Browser Hash Changes                                                */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    function handleHashChange(): void {
      const hash =
        normalizeHash(
          window.location.hash,
        );

      if (!hash) {
        return;
      }

      const exists =
        validItems.some(
          (item) =>
            item.href ===
            hash,
        );

      if (exists) {
        setActiveHref(
          hash,
        );
      }
    }

    window.addEventListener(
      "hashchange",
      handleHashChange,
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        handleHashChange,
      );
    };
  }, [validItems]);

  /* ------------------------------------------------------------------- */
  /* Active Section Observer                                             */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    if (
      validItems.length ===
      0
    ) {
      return;
    }

    const elements =
      validItems
        .map((item) => {
          const elementId =
            getElementIdFromHref(
              item.href,
            );

          const element =
            document.getElementById(
              elementId,
            );

          if (!element) {
            return null;
          }

          return {
            item,
            element,
          };
        })
        .filter(
          (
            entry,
          ): entry is {
            item:
              LegalTableOfContentsItem;

            element:
              HTMLElement;
          } =>
            entry !==
            null,
        );

    if (
      elements.length ===
      0
    ) {
      return;
    }

    /*
     * The root margin places the active-section detection area around the
     * upper-middle portion of the viewport.
     *
     * This feels more natural than waiting for a section to reach the exact
     * top of the screen.
     */
    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleEntries =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting,
              )
              .sort(
                (
                  first,
                  second,
                ) =>
                  second
                    .intersectionRatio -
                  first
                    .intersectionRatio,
              );

          const topEntry =
            visibleEntries[0];

          if (
            !topEntry
          ) {
            return;
          }

          const matchingItem =
            elements.find(
              ({ element }) =>
                element ===
                topEntry.target,
            )?.item;

          if (
            matchingItem
          ) {
            setActiveHref(
              matchingItem.href,
            );
          }
        },
        {
          root:
            null,

          rootMargin:
            "-20% 0px -62% 0px",

          threshold: [
            0,
            0.05,
            0.15,
            0.3,
            0.5,
          ],
        },
      );

    elements.forEach(
      ({ element }) => {
        observer.observe(
          element,
        );
      },
    );

    return () => {
      observer.disconnect();
    };
  }, [validItems]);

  /* ------------------------------------------------------------------- */
  /* Escape Key                                                          */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    if (
      !isMobileOpen
    ) {
      return;
    }

    function handleKeyDown(
      event:
        KeyboardEvent,
    ): void {
      if (
        event.key !==
        "Escape"
      ) {
        return;
      }

      setIsMobileOpen(
        false,
      );
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isMobileOpen]);

  /* ------------------------------------------------------------------- */
  /* Empty State                                                         */
  /* ------------------------------------------------------------------- */

  if (
    validItems.length ===
    0
  ) {
    return null;
  }

  return (
    <aside
      aria-label="Page sections"
      className={joinClasses(
        "min-w-0",
        className,
      )}
    >
      {/* --------------------------------------------------------------- */}
      {/* Mobile / Tablet Navigation                                      */}
      {/* --------------------------------------------------------------- */}

      <div className="xl:hidden">
        <div
          className={[
            "sticky",
            "top-[calc(var(--mr-header-height,72px)+12px)]",
            "z-30",
          ].join(" ")}
        >
          <Card
            padding="sm"
            className={[
              "relative overflow-hidden",
              "border-[rgba(227,179,77,0.16)]",
              "bg-[rgba(7,7,8,0.94)]",
              "shadow-[0_20px_65px_rgba(0,0,0,0.42)]",
              "backdrop-blur-xl",
            ].join(" ")}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-[rgba(227,179,77,0.08)] blur-[75px]"
            />

            <div className="relative">
              {/* ------------------------------------------------------- */}
              {/* Mobile Trigger                                          */}
              {/* ------------------------------------------------------- */}

              <button
                type="button"
                aria-expanded={
                  isMobileOpen
                }
                aria-controls={
                  mobilePanelId
                }
                onClick={() => {
                  setIsMobileOpen(
                    (current) =>
                      !current,
                  );
                }}
                className={[
                  "group flex min-h-14 w-full items-center justify-between gap-4",
                  "rounded-[18px]",
                  "px-3 py-2",
                  "text-left",
                  "transition",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-[rgba(227,179,77,0.42)]",
                ].join(" ")}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 flex-[0_0_40px] place-items-center rounded-xl border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]">
                    <ListIcon />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[8px] font-black uppercase tracking-[0.16em] text-[var(--mr-gold-200)]">
                      {mobileLabel}
                    </span>

                    <span className="mt-1 block truncate text-xs font-black text-[var(--mr-text)]">
                      {activeItem
                        ? `${activeItem.number}. ${activeItem.label}`
                        : title}
                    </span>
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className={joinClasses(
                    "grid h-9 w-9 flex-[0_0_36px] place-items-center rounded-full",
                    "border border-white/[0.07]",
                    "bg-white/[0.025]",
                    "text-white/45",
                    "transition duration-200",
                    "group-hover:border-[rgba(227,179,77,0.18)]",
                    "group-hover:text-[var(--mr-gold-200)]",

                    isMobileOpen &&
                      "rotate-180 border-[rgba(227,179,77,0.22)] text-[var(--mr-gold-200)]",
                  )}
                >
                  <ChevronDownIcon />
                </span>
              </button>

              {/* ------------------------------------------------------- */}
              {/* Mobile Menu                                             */}
              {/* ------------------------------------------------------- */}

              {isMobileOpen ? (
                <div
                  id={
                    mobilePanelId
                  }
                  className="border-t border-white/[0.065] pt-3"
                >
                  <div
                    className={[
                      "max-h-[min(56dvh,520px)]",
                      "overflow-y-auto",
                      "overscroll-contain",
                      "pr-1",
                      "[scrollbar-width:thin]",
                    ].join(" ")}
                  >
                    <nav
                      aria-label="Jump to legal section"
                      className="grid gap-1"
                    >
                      {validItems.map(
                        (item) => (
                          <NavigationItem
                            key={
                              item.href
                            }
                            item={
                              item
                            }
                            active={
                              activeHref ===
                              item.href
                            }
                            compact
                            onNavigate={
                              handleNavigate
                            }
                          />
                        ),
                      )}
                    </nav>
                  </div>

                  <div className="mt-3 border-t border-white/[0.055] px-2 pt-3">
                    <p className="text-[9px] leading-5 text-white/27">
                      Select a section to jump directly to it.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </Card>
        </div>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* Desktop Navigation                                              */}
      {/* --------------------------------------------------------------- */}

      <div className="hidden xl:block">
        <div className="sticky top-28">
          <Card
            padding="lg"
            className="relative overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[rgba(227,179,77,0.06)] blur-[100px]"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.52),transparent)]"
            />

            <div className="relative">
              {/* ------------------------------------------------------- */}
              {/* Heading                                                 */}
              {/* ------------------------------------------------------- */}

              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 flex-[0_0_40px] place-items-center rounded-xl border border-[rgba(227,179,77,0.18)] bg-[rgba(211,154,46,0.05)] text-[var(--mr-gold-200)]">
                  <ListIcon />
                </span>

                <div className="min-w-0">
                  <p className="m-0 text-[8px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                    {eyebrow}
                  </p>

                  <h2 className="mt-1.5 text-xl font-black tracking-[-0.035em] text-[var(--mr-text)]">
                    {title}
                  </h2>
                </div>
              </div>

              {description ? (
                <p className="mt-4 text-[11px] leading-6 text-white/35">
                  {description}
                </p>
              ) : null}

              {/* ------------------------------------------------------- */}
              {/* Progress Indicator                                      */}
              {/* ------------------------------------------------------- */}

              <div className="my-5 h-px bg-white/[0.06]">
                <div
                  className="h-px bg-[linear-gradient(90deg,var(--mr-gold-300),rgba(227,179,77,0.15))] transition-[width] duration-300"
                  style={{
                    width: `${
                      activeItem
                        ? Math.max(
                            6,
                            (
                              (
                                validItems.findIndex(
                                  (item) =>
                                    item.href ===
                                    activeItem.href,
                                ) +
                                1
                              ) /
                              validItems.length
                            ) *
                              100,
                          )
                        : 0
                    }%`,
                  }}
                />
              </div>

              {/* ------------------------------------------------------- */}
              {/* Desktop Items                                           */}
              {/* ------------------------------------------------------- */}

              <nav
                aria-label="Legal document sections"
                className={[
                  "grid max-h-[calc(100dvh-260px)] gap-1",
                  "overflow-y-auto overscroll-contain pr-1",
                  "[scrollbar-width:thin]",
                ].join(" ")}
              >
                {validItems.map(
                  (item) => (
                    <NavigationItem
                      key={
                        item.href
                      }
                      item={
                        item
                      }
                      active={
                        activeHref ===
                        item.href
                      }
                      onNavigate={
                        handleNavigate
                      }
                    />
                  ),
                )}
              </nav>

              {/* ------------------------------------------------------- */}
              {/* Footer                                                  */}
              {/* ------------------------------------------------------- */}

              <div className="mt-5 border-t border-white/[0.06] pt-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[8px] font-black uppercase tracking-[0.13em] text-white/22">
                    {validItems.length} Sections
                  </p>

                  {activeItem ? (
                    <p className="text-[8px] font-black uppercase tracking-[0.13em] text-[var(--mr-gold-200)]">
                      Section{" "}
                      {activeItem.number}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </aside>
  );
}