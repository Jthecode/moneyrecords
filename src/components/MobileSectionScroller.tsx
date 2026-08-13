"use client";

// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Mobile Section Scroller                              ┃
   ┃ File   : src/components/MobileSectionScroller.tsx                    ┃
   ┃ Role   : Mobile-first horizontal card scroller with swipe controls  ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Link from "next/link";

import {
  Children,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type MobileSectionScrollerProps = {
  /**
   * Content displayed above the main title.
   *
   * Example:
   * "Featured Artists"
   */
  eyebrow?: string;

  /**
   * Main section title.
   */
  title?: ReactNode;

  /**
   * Optional supporting copy under the title.
   */
  description?: ReactNode;

  /**
   * Optional route for the section-level CTA.
   *
   * Example:
   * "/artists"
   */
  actionHref?: string;

  /**
   * Optional CTA label.
   *
   * Example:
   * "View All Artists"
   */
  actionLabel?: string;

  /**
   * Cards/content placed inside the horizontal scroller.
   */
  children: ReactNode;

  /**
   * Optional HTML id for deep linking.
   */
  id?: string;

  /**
   * Optional accessible label for the scroll region.
   */
  ariaLabel?: string;

  /**
   * Optional outer wrapper classes.
   */
  className?: string;

  /**
   * Optional classes applied to the scrolling track.
   */
  trackClassName?: string;

  /**
   * Card width used on mobile.
   *
   * compact = smaller cards / more visible next-card preview
   * normal  = general purpose
   * wide    = campaign/package cards
   */
  itemSize?:
    | "compact"
    | "normal"
    | "wide";

  /**
   * Controls when the component returns to a regular non-scrolling layout.
   *
   * "md" = horizontal only below 768px
   * "lg" = horizontal only below 1024px
   * "xl" = horizontal only below 1280px
   * "never" = always horizontal
   */
  desktopBreakpoint?:
    | "md"
    | "lg"
    | "xl"
    | "never";

  /**
   * Enables the progress bar underneath the mobile scroller.
   */
  showProgress?: boolean;

  /**
   * Enables previous/next buttons.
   */
  showArrows?: boolean;
};

/* --------------------------------------------------------------------- */
/* Constants                                                              */
/* --------------------------------------------------------------------- */

const SCROLL_TOLERANCE =
  8;

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function ArrowRightIcon() {
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

function ChevronLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SwipeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
    >
      <path
        d="M4 8H16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M13 5L16 8L13 11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M20 16H8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M11 13L8 16L11 19"
        stroke="currentColor"
        strokeWidth="1.6"
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

function getItemWidthClass(
  itemSize: NonNullable<
    MobileSectionScrollerProps["itemSize"]
  >,
): string {
  switch (itemSize) {
    case "compact":
      return [
        "w-[76vw]",
        "max-w-[300px]",
        "sm:w-[42vw]",
      ].join(" ");

    case "wide":
      return [
        "w-[88vw]",
        "max-w-[390px]",
        "sm:w-[58vw]",
      ].join(" ");

    case "normal":
    default:
      return [
        "w-[82vw]",
        "max-w-[340px]",
        "sm:w-[48vw]",
      ].join(" ");
  }
}

function getTrackBreakpointClasses(
  breakpoint: NonNullable<
    MobileSectionScrollerProps["desktopBreakpoint"]
  >,
): string {
  switch (breakpoint) {
    case "md":
      return [
        "md:grid",
        "md:auto-cols-auto",
        "md:grid-flow-row",
        "md:grid-cols-2",
        "md:overflow-visible",
        "md:snap-none",
      ].join(" ");

    case "xl":
      return [
        "xl:grid",
        "xl:auto-cols-auto",
        "xl:grid-flow-row",
        "xl:grid-cols-3",
        "xl:overflow-visible",
        "xl:snap-none",
      ].join(" ");

    case "never":
      return "";

    case "lg":
    default:
      return [
        "lg:grid",
        "lg:auto-cols-auto",
        "lg:grid-flow-row",
        "lg:grid-cols-3",
        "lg:overflow-visible",
        "lg:snap-none",
      ].join(" ");
  }
}

function getItemBreakpointClasses(
  breakpoint: NonNullable<
    MobileSectionScrollerProps["desktopBreakpoint"]
  >,
): string {
  switch (breakpoint) {
    case "md":
      return "md:w-auto md:max-w-none";

    case "xl":
      return "xl:w-auto xl:max-w-none";

    case "never":
      return "";

    case "lg":
    default:
      return "lg:w-auto lg:max-w-none";
  }
}

function getMobileOnlyBreakpointClass(
  breakpoint: NonNullable<
    MobileSectionScrollerProps["desktopBreakpoint"]
  >,
): string {
  switch (breakpoint) {
    case "md":
      return "md:hidden";

    case "xl":
      return "xl:hidden";

    case "never":
      return "";

    case "lg":
    default:
      return "lg:hidden";
  }
}

/* --------------------------------------------------------------------- */
/* Scroll Button                                                          */
/* --------------------------------------------------------------------- */

function ScrollButton({
  direction,
  disabled,
  onClick,
}: {
  direction:
    | "previous"
    | "next";

  disabled:
    boolean;

  onClick:
    () => void;
}) {
  const previous =
    direction ===
    "previous";

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={
        previous
          ? "Scroll to previous items"
          : "Scroll to next items"
      }
      onClick={onClick}
      className={joinClasses(
        "grid h-10 w-10 place-items-center rounded-full",
        "border transition duration-200",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[rgba(227,179,77,0.48)]",

        disabled
          ? [
              "cursor-default",
              "border-white/[0.045]",
              "bg-white/[0.015]",
              "text-white/15",
            ].join(" ")
          : [
              "border-white/[0.08]",
              "bg-white/[0.03]",
              "text-white/58",
              "hover:border-[rgba(227,179,77,0.24)]",
              "hover:bg-[rgba(211,154,46,0.055)]",
              "hover:text-[var(--mr-gold-200)]",
            ].join(" "),
      )}
    >
      {previous
        ? <ChevronLeftIcon />
        : <ChevronRightIcon />}
    </button>
  );
}

/* --------------------------------------------------------------------- */
/* Component                                                              */
/* --------------------------------------------------------------------- */

export default function MobileSectionScroller({
  eyebrow,
  title,
  description,

  actionHref,
  actionLabel,

  children,

  id,
  ariaLabel,

  className,
  trackClassName,

  itemSize =
    "normal",

  desktopBreakpoint =
    "lg",

  showProgress =
    true,

  showArrows =
    true,
}: MobileSectionScrollerProps) {
  const reactId =
    useId();

  const trackId =
    `mr-section-scroller-${reactId.replace(
      /:/g,
      "",
    )}`;

  const trackRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const childArray =
    useMemo(
      () =>
        Children.toArray(
          children,
        ),
      [children],
    );

  const [
    canScrollPrevious,
    setCanScrollPrevious,
  ] =
    useState(false);

  const [
    canScrollNext,
    setCanScrollNext,
  ] =
    useState(false);

  const [
    progress,
    setProgress,
  ] =
    useState(0);

  const itemWidthClass =
    getItemWidthClass(
      itemSize,
    );

  const trackBreakpointClass =
    getTrackBreakpointClasses(
      desktopBreakpoint,
    );

  const itemBreakpointClass =
    getItemBreakpointClasses(
      desktopBreakpoint,
    );

  const mobileOnlyClass =
    getMobileOnlyBreakpointClass(
      desktopBreakpoint,
    );

  /* ------------------------------------------------------------------- */
  /* Scroll State                                                        */
  /* ------------------------------------------------------------------- */

  const updateScrollState =
    useCallback(() => {
      const element =
        trackRef.current;

      if (!element) {
        return;
      }

      const {
        scrollLeft,
        scrollWidth,
        clientWidth,
      } =
        element;

      const maxScroll =
        Math.max(
          0,
          scrollWidth -
            clientWidth,
        );

      setCanScrollPrevious(
        scrollLeft >
          SCROLL_TOLERANCE,
      );

      setCanScrollNext(
        scrollLeft <
          maxScroll -
            SCROLL_TOLERANCE,
      );

      if (
        maxScroll <= 0
      ) {
        setProgress(0);

        return;
      }

      setProgress(
        Math.min(
          100,
          Math.max(
            0,
            (
              scrollLeft /
              maxScroll
            ) *
              100,
          ),
        ),
      );
    }, []);

  /* ------------------------------------------------------------------- */
  /* Initial / Resize Measurements                                       */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    const element =
      trackRef.current;

    if (!element) {
      return;
    }

    updateScrollState();

    const frame =
      window.requestAnimationFrame(
        updateScrollState,
      );

    const resizeObserver =
      new ResizeObserver(() => {
        updateScrollState();
      });

    resizeObserver.observe(
      element,
    );

    if (
      element.firstElementChild instanceof
      HTMLElement
    ) {
      resizeObserver.observe(
        element.firstElementChild,
      );
    }

    return () => {
      window.cancelAnimationFrame(
        frame,
      );

      resizeObserver.disconnect();
    };
  }, [
    childArray.length,
    updateScrollState,
  ]);

  /* ------------------------------------------------------------------- */
  /* Scroll Listener                                                     */
  /* ------------------------------------------------------------------- */

  useEffect(() => {
    const element =
      trackRef.current;

    if (!element) {
      return;
    }

    let frame:
      number | null =
      null;

    function handleScroll(): void {
      if (
        frame !== null
      ) {
        return;
      }

      frame =
        window.requestAnimationFrame(
          () => {
            updateScrollState();
            frame = null;
          },
        );
    }

    element.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      element.removeEventListener(
        "scroll",
        handleScroll,
      );

      if (
        frame !== null
      ) {
        window.cancelAnimationFrame(
          frame,
        );
      }
    };
  }, [updateScrollState]);

  /* ------------------------------------------------------------------- */
  /* Scroll Distance                                                     */
  /* ------------------------------------------------------------------- */

  const getScrollDistance =
    useCallback((): number => {
      const element =
        trackRef.current;

      if (!element) {
        return 320;
      }

      const firstItem =
        element.firstElementChild;

      if (
        firstItem instanceof
        HTMLElement
      ) {
        const itemWidth =
          firstItem.getBoundingClientRect()
            .width;

        return Math.max(
          220,
          itemWidth + 16,
        );
      }

      return Math.max(
        220,
        element.clientWidth *
          0.82,
      );
    }, []);

  /* ------------------------------------------------------------------- */
  /* Previous                                                            */
  /* ------------------------------------------------------------------- */

  const scrollPrevious =
    useCallback(() => {
      const element =
        trackRef.current;

      if (!element) {
        return;
      }

      element.scrollBy({
        left:
          -getScrollDistance(),

        behavior:
          "smooth",
      });
    }, [getScrollDistance]);

  /* ------------------------------------------------------------------- */
  /* Next                                                                */
  /* ------------------------------------------------------------------- */

  const scrollNext =
    useCallback(() => {
      const element =
        trackRef.current;

      if (!element) {
        return;
      }

      element.scrollBy({
        left:
          getScrollDistance(),

        behavior:
          "smooth",
      });
    }, [getScrollDistance]);

  /* ------------------------------------------------------------------- */
  /* Empty State                                                         */
  /* ------------------------------------------------------------------- */

  if (
    childArray.length ===
    0
  ) {
    return null;
  }

  /* ------------------------------------------------------------------- */
  /* Render                                                              */
  /* ------------------------------------------------------------------- */

  return (
    <section
      id={id}
      aria-label={
        ariaLabel
      }
      className={joinClasses(
        "relative min-w-0",
        className,
      )}
    >
      {/* --------------------------------------------------------------- */}
      {/* Section Header                                                  */}
      {/* --------------------------------------------------------------- */}

      {eyebrow ||
      title ||
      description ||
      actionHref ||
      showArrows ? (
        <div className="mb-6 flex flex-col gap-5 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
          {/* ----------------------------------------------------------- */}
          {/* Copy                                                        */}
          {/* ----------------------------------------------------------- */}

          <div className="min-w-0 max-w-3xl">
            {eyebrow ? (
              <p className="m-0 text-[9px] font-black uppercase tracking-[0.19em] text-[var(--mr-gold-200)] sm:text-[10px]">
                {eyebrow}
              </p>
            ) : null}

            {title ? (
              <h2
                className={joinClasses(
                  eyebrow
                    ? "mt-3"
                    : "",

                  "text-2xl font-black leading-tight tracking-[-0.045em]",
                  "text-[var(--mr-text)]",
                  "sm:text-3xl",
                  "lg:text-4xl",
                )}
              >
                {title}
              </h2>
            ) : null}

            {description ? (
              <div
                className={joinClasses(
                  title
                    ? "mt-3"
                    : "",

                  "max-w-2xl text-sm leading-7 text-white/44",
                )}
              >
                {description}
              </div>
            ) : null}
          </div>

          {/* ----------------------------------------------------------- */}
          {/* Header Actions                                              */}
          {/* ----------------------------------------------------------- */}

          <div className="flex flex-wrap items-center gap-3">
            {/* Mobile swipe hint */}

            <span
              className={joinClasses(
                "inline-flex min-h-9 items-center gap-2 rounded-full",
                "border border-white/[0.065]",
                "bg-white/[0.022]",
                "px-3",
                "text-[8px] font-black uppercase tracking-[0.13em]",
                "text-white/30",

                mobileOnlyClass,
              )}
            >
              <SwipeIcon />

              Swipe
            </span>

            {/* Scroll controls */}

            {showArrows ? (
              <div
                className={joinClasses(
                  "flex items-center gap-2",
                  mobileOnlyClass,
                )}
              >
                <ScrollButton
                  direction="previous"
                  disabled={
                    !canScrollPrevious
                  }
                  onClick={
                    scrollPrevious
                  }
                />

                <ScrollButton
                  direction="next"
                  disabled={
                    !canScrollNext
                  }
                  onClick={
                    scrollNext
                  }
                />
              </div>
            ) : null}

            {/* View all */}

            {actionHref &&
            actionLabel ? (
              <Link
                href={
                  actionHref
                }
                className={[
                  "group inline-flex min-h-10 items-center gap-2",
                  "rounded-full border border-[rgba(227,179,77,0.18)]",
                  "bg-[rgba(211,154,46,0.04)]",
                  "px-4",
                  "text-[9px] font-black uppercase tracking-[0.13em]",
                  "text-[var(--mr-gold-200)]",
                  "transition duration-200",
                  "hover:border-[rgba(227,179,77,0.32)]",
                  "hover:bg-[rgba(211,154,46,0.075)]",
                  "hover:text-[var(--mr-gold-100)]",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-[rgba(227,179,77,0.45)]",
                ].join(" ")}
              >
                {actionLabel}

                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRightIcon />
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* --------------------------------------------------------------- */}
      {/* Scroller Wrapper                                                */}
      {/* --------------------------------------------------------------- */}

      <div className="relative">
        {/* ------------------------------------------------------------- */}
        {/* Left Fade                                                     */}
        {/* ------------------------------------------------------------- */}

        <div
          aria-hidden="true"
          className={joinClasses(
            "pointer-events-none absolute inset-y-0 left-0 z-10 w-8",
            "bg-[linear-gradient(90deg,var(--mr-bg,#050506),transparent)]",
            "transition-opacity duration-200",

            canScrollPrevious
              ? "opacity-100"
              : "opacity-0",

            mobileOnlyClass,
          )}
        />

        {/* ------------------------------------------------------------- */}
        {/* Right Fade                                                    */}
        {/* ------------------------------------------------------------- */}

        <div
          aria-hidden="true"
          className={joinClasses(
            "pointer-events-none absolute inset-y-0 right-0 z-10 w-10",
            "bg-[linear-gradient(270deg,var(--mr-bg,#050506),transparent)]",
            "transition-opacity duration-200",

            canScrollNext
              ? "opacity-100"
              : "opacity-0",

            mobileOnlyClass,
          )}
        />

        {/* ------------------------------------------------------------- */}
        {/* Track                                                         */}
        {/* ------------------------------------------------------------- */}

        <div
          id={trackId}
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-label={
            ariaLabel
              ? `${ariaLabel} items`
              : "Scrollable content"
          }
          className={joinClasses(
            /*
             * Mobile / tablet horizontal layout.
             */
            "grid auto-cols-max grid-flow-col",
            "gap-4",

            "overflow-x-auto overflow-y-visible",
            "overscroll-x-contain",
            "snap-x snap-mandatory",
            "scroll-smooth",

            /*
             * Gives the first/last card breathing room and prevents cards
             * from touching the viewport edges.
             */
            "-mx-4 px-4",
            "sm:-mx-5 sm:px-5",

            /*
             * Hide the native scrollbar while retaining full scrolling.
             */
            "[scrollbar-width:none]",
            "[-ms-overflow-style:none]",
            "[&::-webkit-scrollbar]:hidden",

            /*
             * Focus styling for keyboard users.
             */
            "focus-visible:outline-none",

            /*
             * Desktop conversion to a regular grid.
             */
            trackBreakpointClass,

            /*
             * Remove artificial negative margins after switching to desktop.
             */
            desktopBreakpoint ===
              "md" &&
              "md:mx-0 md:px-0",

            desktopBreakpoint ===
              "lg" &&
              "lg:mx-0 lg:px-0",

            desktopBreakpoint ===
              "xl" &&
              "xl:mx-0 xl:px-0",

            trackClassName,
          )}
        >
          {childArray.map(
            (
              child,
              index,
            ) => (
              <div
                key={
                  index
                }
                className={joinClasses(
                  "min-w-0 snap-start",

                  itemWidthClass,

                  itemBreakpointClass,
                )}
              >
                {child}
              </div>
            ),
          )}
        </div>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* Mobile Progress                                                 */}
      {/* --------------------------------------------------------------- */}

      {showProgress ? (
        <div
          className={joinClasses(
            "mt-5",
            mobileOnlyClass,
          )}
        >
          <div className="flex items-center gap-4">
            {/* Progress rail */}

            <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/[0.055]">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,var(--mr-gold-300),var(--mr-gold-100))] shadow-[0_0_12px_rgba(227,179,77,0.3)] transition-[width] duration-150"
                style={{
                  width:
                    canScrollPrevious ||
                    canScrollNext
                      ? `${Math.max(
                          8,
                          progress,
                        )}%`
                      : "100%",
                }}
              />
            </div>

            {/* Count */}

            <span className="flex-[0_0_auto] text-[8px] font-black uppercase tracking-[0.13em] text-white/24">
              {childArray.length}{" "}
              {childArray.length ===
              1
                ? "Item"
                : "Items"}
            </span>
          </div>
        </div>
      ) : null}
    </section>
  );
}