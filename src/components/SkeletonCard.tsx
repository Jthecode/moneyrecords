// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Shared Skeleton Card                                 ┃
   ┃ File   : src/components/SkeletonCard.tsx                             ┃
   ┃ Role   : Reusable loading states for cards, lists, and page content ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  CSSProperties,
  ReactNode,
} from "react";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type SkeletonCardVariant =
  | "default"
  | "artist"
  | "release"
  | "campaign"
  | "package"
  | "service"
  | "compact";

export type SkeletonCardProps = {
  /**
   * Determines the internal loading-card layout.
   */
  variant?: SkeletonCardVariant;

  /**
   * Makes the card fill the available parent height.
   */
  fullHeight?: boolean;

  /**
   * Displays the premium Money Records card shell.
   */
  panel?: boolean;

  /**
   * Enables the ambient gold highlight.
   */
  glow?: boolean;

  /**
   * Enables shimmer animation.
   */
  animated?: boolean;

  /**
   * Accessible loading description.
   */
  ariaLabel?: string;

  /**
   * Optional wrapper classes.
   */
  className?: string;
};

export type SkeletonGridProps = {
  /**
   * Number of skeleton cards.
   */
  count?: number;

  /**
   * Skeleton layout.
   */
  variant?: SkeletonCardVariant;

  /**
   * Maximum desktop grid columns.
   */
  columns?:
    | 1
    | 2
    | 3
    | 4;

  /**
   * Makes cards equal/full height.
   */
  fullHeight?: boolean;

  /**
   * Optional grid wrapper classes.
   */
  className?: string;
};

type SkeletonBlockProps = {
  width?: string;
  height?: string;
  radius?: string;
  animated?: boolean;
  className?: string;
  style?: CSSProperties;
};

type SkeletonVariantProps = {
  animated: boolean;
};

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

function getGridClasses(
  columns:
    NonNullable<
      SkeletonGridProps["columns"]
    >,
): string {
  switch (columns) {
    case 1:
      return "grid-cols-1";

    case 2:
      return [
        "grid-cols-1",
        "sm:grid-cols-2",
      ].join(" ");

    case 4:
      return [
        "grid-cols-1",
        "sm:grid-cols-2",
        "xl:grid-cols-4",
      ].join(" ");

    case 3:
    default:
      return [
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
      ].join(" ");
  }
}

function sanitizeCount(
  value: number,
): number {
  if (
    !Number.isFinite(
      value,
    )
  ) {
    return 0;
  }

  return Math.max(
    0,
    Math.floor(
      value,
    ),
  );
}

/* --------------------------------------------------------------------- */
/* Shared Skeleton Block                                                  */
/* --------------------------------------------------------------------- */

function SkeletonBlock({
  width,
  height,
  radius =
    "rounded-xl",
  animated =
    true,
  className,
  style,
}: SkeletonBlockProps) {
  return (
    <div
      aria-hidden="true"
      className={joinClasses(
        "relative overflow-hidden",
        "bg-white/[0.055]",
        radius,

        animated &&
          [
            "before:pointer-events-none",
            "before:absolute",
            "before:inset-0",
            "before:-translate-x-full",
            "before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.055),transparent)]",
            "before:animate-[mr-skeleton-shimmer_1.7s_ease-in-out_infinite]",
          ].join(" "),

        className,
      )}
      style={{
        width,
        height,
        ...style,
      }}
    />
  );
}

/* --------------------------------------------------------------------- */
/* Shared Skeleton Lines                                                  */
/* --------------------------------------------------------------------- */

function SkeletonLines({
  count =
    3,
  animated =
    true,
}: {
  count?: number;
  animated?: boolean;
}) {
  const safeCount =
    sanitizeCount(
      count,
    );

  const widths = [
    "100%",
    "92%",
    "76%",
    "86%",
    "68%",
  ] as const;

  if (
    safeCount ===
    0
  ) {
    return null;
  }

  return (
    <div className="grid gap-2.5">
      {Array.from({
        length:
          safeCount,
      }).map(
        (
          _,
          index,
        ) => (
          <SkeletonBlock
            key={
              index
            }
            width={
              widths[
                index %
                  widths.length
              ]
            }
            height="10px"
            radius="rounded-full"
            animated={
              animated
            }
          />
        ),
      )}
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Default Skeleton                                                       */
/* --------------------------------------------------------------------- */

function DefaultSkeleton({
  animated,
}: SkeletonVariantProps) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <SkeletonBlock
          width="48px"
          height="48px"
          radius="rounded-2xl"
          animated={
            animated
          }
        />

        <SkeletonBlock
          width="54px"
          height="18px"
          radius="rounded-full"
          animated={
            animated
          }
        />
      </div>

      <div className="mt-6">
        <SkeletonBlock
          width="68%"
          height="19px"
          radius="rounded-md"
          animated={
            animated
          }
        />

        <div className="mt-4">
          <SkeletonLines
            count={3}
            animated={
              animated
            }
          />
        </div>
      </div>

      <div className="mt-7 flex gap-2">
        <SkeletonBlock
          width="88px"
          height="32px"
          radius="rounded-full"
          animated={
            animated
          }
        />

        <SkeletonBlock
          width="68px"
          height="32px"
          radius="rounded-full"
          animated={
            animated
          }
        />
      </div>
    </>
  );
}

/* --------------------------------------------------------------------- */
/* Artist Skeleton                                                        */
/* --------------------------------------------------------------------- */

function ArtistSkeleton({
  animated,
}: SkeletonVariantProps) {
  return (
    <>
      <SkeletonBlock
        width="100%"
        height="240px"
        radius="rounded-[20px]"
        animated={
          animated
        }
        className="sm:h-[270px]"
      />

      <div className="mt-5">
        <SkeletonBlock
          width="72px"
          height="16px"
          radius="rounded-full"
          animated={
            animated
          }
        />

        <SkeletonBlock
          width="72%"
          height="22px"
          radius="rounded-md"
          animated={
            animated
          }
          className="mt-3"
        />

        <SkeletonBlock
          width="44%"
          height="12px"
          radius="rounded-full"
          animated={
            animated
          }
          className="mt-3"
        />
      </div>

      <div className="mt-5 flex gap-2">
        <SkeletonBlock
          width="78px"
          height="30px"
          radius="rounded-full"
          animated={
            animated
          }
        />

        <SkeletonBlock
          width="62px"
          height="30px"
          radius="rounded-full"
          animated={
            animated
          }
        />
      </div>
    </>
  );
}

/* --------------------------------------------------------------------- */
/* Release Skeleton                                                       */
/* --------------------------------------------------------------------- */

function ReleaseSkeleton({
  animated,
}: SkeletonVariantProps) {
  return (
    <>
      <SkeletonBlock
        width="100%"
        radius="rounded-[20px]"
        animated={
          animated
        }
        className="aspect-square"
      />

      <div className="mt-5">
        <SkeletonBlock
          width="62%"
          height="21px"
          radius="rounded-md"
          animated={
            animated
          }
        />

        <SkeletonBlock
          width="42%"
          height="12px"
          radius="rounded-full"
          animated={
            animated
          }
          className="mt-3"
        />

        <div className="mt-4 flex items-center gap-2">
          <SkeletonBlock
            width="74px"
            height="27px"
            radius="rounded-full"
            animated={
              animated
            }
          />

          <SkeletonBlock
            width="88px"
            height="27px"
            radius="rounded-full"
            animated={
              animated
            }
          />
        </div>
      </div>
    </>
  );
}

/* --------------------------------------------------------------------- */
/* Campaign Skeleton                                                      */
/* --------------------------------------------------------------------- */

function CampaignSkeleton({
  animated,
}: SkeletonVariantProps) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <SkeletonBlock
            width="44px"
            height="44px"
            radius="rounded-xl"
            animated={
              animated
            }
            className="flex-[0_0_44px]"
          />

          <div className="min-w-0">
            <SkeletonBlock
              width="78px"
              height="10px"
              radius="rounded-full"
              animated={
                animated
              }
            />

            <SkeletonBlock
              width="126px"
              height="18px"
              radius="rounded-md"
              animated={
                animated
              }
              className="mt-2 max-w-full"
            />
          </div>
        </div>

        <SkeletonBlock
          width="64px"
          height="24px"
          radius="rounded-full"
          animated={
            animated
          }
          className="flex-[0_0_64px]"
        />
      </div>

      <div className="mt-6">
        <SkeletonBlock
          width="58%"
          height="28px"
          radius="rounded-md"
          animated={
            animated
          }
        />

        <div className="mt-5">
          <SkeletonLines
            count={3}
            animated={
              animated
            }
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {Array.from({
          length: 3,
        }).map(
          (
            _,
            index,
          ) => (
            <div
              key={
                index
              }
              className="flex items-center gap-3"
            >
              <SkeletonBlock
                width="20px"
                height="20px"
                radius="rounded-full"
                animated={
                  animated
                }
                className="flex-[0_0_20px]"
              />

              <SkeletonBlock
                width={
                  index === 2
                    ? "58%"
                    : "74%"
                }
                height="11px"
                radius="rounded-full"
                animated={
                  animated
                }
              />
            </div>
          ),
        )}
      </div>

      <div className="mt-7">
        <SkeletonBlock
          width="100%"
          height="46px"
          radius="rounded-full"
          animated={
            animated
          }
        />
      </div>
    </>
  );
}

/* --------------------------------------------------------------------- */
/* Package Skeleton                                                       */
/* --------------------------------------------------------------------- */

function PackageSkeleton({
  animated,
}: SkeletonVariantProps) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <SkeletonBlock
          width="98px"
          height="27px"
          radius="rounded-full"
          animated={
            animated
          }
        />

        <SkeletonBlock
          width="54px"
          height="20px"
          radius="rounded-full"
          animated={
            animated
          }
        />
      </div>

      <div className="mt-6">
        <SkeletonBlock
          width="72%"
          height="24px"
          radius="rounded-md"
          animated={
            animated
          }
        />

        <SkeletonBlock
          width="44%"
          height="32px"
          radius="rounded-md"
          animated={
            animated
          }
          className="mt-4"
        />

        <div className="mt-5">
          <SkeletonLines
            count={2}
            animated={
              animated
            }
          />
        </div>
      </div>

      <div className="mt-7 grid gap-3">
        {Array.from({
          length: 4,
        }).map(
          (
            _,
            index,
          ) => (
            <div
              key={
                index
              }
              className="flex items-center gap-3"
            >
              <SkeletonBlock
                width="20px"
                height="20px"
                radius="rounded-full"
                animated={
                  animated
                }
                className="flex-[0_0_20px]"
              />

              <SkeletonBlock
                width={
                  `${78 - index * 7}%`
                }
                height="11px"
                radius="rounded-full"
                animated={
                  animated
                }
              />
            </div>
          ),
        )}
      </div>

      <div className="mt-7">
        <SkeletonBlock
          width="100%"
          height="46px"
          radius="rounded-full"
          animated={
            animated
          }
        />
      </div>
    </>
  );
}

/* --------------------------------------------------------------------- */
/* Service Skeleton                                                       */
/* --------------------------------------------------------------------- */

function ServiceSkeleton({
  animated,
}: SkeletonVariantProps) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <SkeletonBlock
          width="48px"
          height="48px"
          radius="rounded-2xl"
          animated={
            animated
          }
        />

        <SkeletonBlock
          width="68px"
          height="21px"
          radius="rounded-full"
          animated={
            animated
          }
        />
      </div>

      <SkeletonBlock
        width="68%"
        height="22px"
        radius="rounded-md"
        animated={
          animated
        }
        className="mt-6"
      />

      <div className="mt-4">
        <SkeletonLines
          count={3}
          animated={
            animated
          }
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <SkeletonBlock
          width="82px"
          height="28px"
          radius="rounded-full"
          animated={
            animated
          }
        />

        <SkeletonBlock
          width="66px"
          height="28px"
          radius="rounded-full"
          animated={
            animated
          }
        />

        <SkeletonBlock
          width="76px"
          height="28px"
          radius="rounded-full"
          animated={
            animated
          }
        />
      </div>
    </>
  );
}

/* --------------------------------------------------------------------- */
/* Compact Skeleton                                                       */
/* --------------------------------------------------------------------- */

function CompactSkeleton({
  animated,
}: SkeletonVariantProps) {
  return (
    <div className="flex items-center gap-4">
      <SkeletonBlock
        width="54px"
        height="54px"
        radius="rounded-2xl"
        animated={
          animated
        }
        className="flex-[0_0_54px]"
      />

      <div className="min-w-0 flex-1">
        <SkeletonBlock
          width="64%"
          height="16px"
          radius="rounded-md"
          animated={
            animated
          }
        />

        <SkeletonBlock
          width="84%"
          height="10px"
          radius="rounded-full"
          animated={
            animated
          }
          className="mt-3"
        />

        <SkeletonBlock
          width="48%"
          height="10px"
          radius="rounded-full"
          animated={
            animated
          }
          className="mt-2"
        />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Variant Renderer                                                       */
/* --------------------------------------------------------------------- */

function renderSkeletonVariant(
  variant:
    SkeletonCardVariant,
  animated:
    boolean,
): ReactNode {
  switch (variant) {
    case "artist":
      return (
        <ArtistSkeleton
          animated={
            animated
          }
        />
      );

    case "release":
      return (
        <ReleaseSkeleton
          animated={
            animated
          }
        />
      );

    case "campaign":
      return (
        <CampaignSkeleton
          animated={
            animated
          }
        />
      );

    case "package":
      return (
        <PackageSkeleton
          animated={
            animated
          }
        />
      );

    case "service":
      return (
        <ServiceSkeleton
          animated={
            animated
          }
        />
      );

    case "compact":
      return (
        <CompactSkeleton
          animated={
            animated
          }
        />
      );

    case "default":
    default:
      return (
        <DefaultSkeleton
          animated={
            animated
          }
        />
      );
  }
}

/* --------------------------------------------------------------------- */
/* Skeleton Card                                                          */
/* --------------------------------------------------------------------- */

export default function SkeletonCard({
  variant =
    "default",

  fullHeight =
    false,

  panel =
    true,

  glow =
    true,

  animated =
    true,

  ariaLabel =
    "Loading content",

  className,
}: SkeletonCardProps) {
  return (
    <div
      role="status"
      aria-label={
        ariaLabel
      }
      aria-busy="true"
      className={joinClasses(
        "relative isolate overflow-hidden",

        panel
          ? [
              "rounded-[22px]",
              "border border-white/[0.065]",
              "bg-[linear-gradient(145deg,rgba(255,255,255,0.024),rgba(255,255,255,0.012))]",
              "p-5",
              "shadow-[0_16px_55px_rgba(0,0,0,0.22)]",
              "sm:rounded-[24px]",
              "sm:p-6",
            ].join(" ")
          : "",

        fullHeight &&
          "h-full",

        className,
      )}
    >
      {/* --------------------------------------------------------------- */}
      {/* Ambient Glow                                                    */}
      {/* --------------------------------------------------------------- */}

      {glow ? (
        <>
          <div
            aria-hidden="true"
            className={[
              "pointer-events-none",
              "absolute",
              "-right-20",
              "-top-24",
              "-z-10",
              "h-56",
              "w-56",
              "rounded-full",
              "bg-[rgba(227,179,77,0.045)]",
              "blur-[85px]",
            ].join(" ")}
          />

          <div
            aria-hidden="true"
            className={[
              "pointer-events-none",
              "absolute",
              "inset-x-10",
              "top-0",
              "-z-10",
              "h-px",
              "bg-[linear-gradient(90deg,transparent,rgba(227,179,77,0.18),transparent)]",
            ].join(" ")}
          />
        </>
      ) : null}

      {/* --------------------------------------------------------------- */}
      {/* Skeleton Content                                                */}
      {/* --------------------------------------------------------------- */}

      <div className="relative">
        {renderSkeletonVariant(
          variant,
          animated,
        )}
      </div>

      {/* --------------------------------------------------------------- */}
      {/* Screen Reader Text                                              */}
      {/* --------------------------------------------------------------- */}

      <span className="sr-only">
        {ariaLabel}
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Skeleton Grid                                                          */
/* --------------------------------------------------------------------- */

/**
 * Convenience component for rendering multiple loading cards.
 *
 * Example:
 *
 * <SkeletonGrid
 *   count={6}
 *   variant="artist"
 *   columns={3}
 * />
 */
export function SkeletonGrid({
  count =
    6,

  variant =
    "default",

  columns =
    3,

  fullHeight =
    true,

  className,
}: SkeletonGridProps) {
  const safeCount =
    sanitizeCount(
      count,
    );

  if (
    safeCount ===
    0
  ) {
    return null;
  }

  return (
    <div
      role="status"
      aria-label="Loading content"
      aria-busy="true"
      className={joinClasses(
        "grid gap-4 sm:gap-5",
        getGridClasses(
          columns,
        ),
        className,
      )}
    >
      {Array.from({
        length:
          safeCount,
      }).map(
        (
          _,
          index,
        ) => (
          <SkeletonCard
            key={
              index
            }
            variant={
              variant
            }
            fullHeight={
              fullHeight
            }
            ariaLabel={`Loading item ${
              index + 1
            } of ${safeCount}`}
          />
        ),
      )}

      <span className="sr-only">
        Loading{" "}
        {safeCount}{" "}
        {safeCount === 1
          ? "item"
          : "items"}
      </span>
    </div>
  );
}