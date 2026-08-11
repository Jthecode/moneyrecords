// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Global Loading Screen                                 ┃
   ┃ File   : src/app/loading.tsx                                          ┃
   ┃ Role   : App Router loading state and premium page skeleton           ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Container from "@/components/Container";

/* --------------------------------------------------------------------- */
/* Skeleton Utilities                                                     */
/* --------------------------------------------------------------------- */

type SkeletonProps = {
  className?: string;
};

function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "mr-shimmer",
        "rounded-xl",
        "border border-white/[0.045]",
        "bg-white/[0.035]",
        className,
      ].join(" ")}
    />
  );
}

function LoadingMark() {
  return (
    <div
      aria-hidden="true"
      className="relative grid h-16 w-16 place-items-center"
    >
      <div className="absolute inset-0 rounded-full border border-[rgba(227,179,77,0.22)]" />

      <div className="absolute inset-[7px] animate-spin rounded-full border border-transparent border-t-[var(--mr-gold-200)] border-r-[rgba(227,179,77,0.35)]" />

      <div className="absolute inset-[17px] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(255,240,201,0.30),rgba(211,154,46,0.13)_45%,rgba(211,154,46,0.03))] shadow-[0_0_34px_rgba(211,154,46,0.18)]" />

      <span className="relative text-xs font-black uppercase tracking-[0.1em] text-[var(--mr-gold-100)]">
        MR
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Loading Page                                                           */
/* --------------------------------------------------------------------- */

export default function Loading() {
  return (
    <div
      className="mr-page relative overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Loading Money Records"
    >
      {/* Decorative background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-260px] -z-10 h-[680px] w-[980px] max-w-[120vw] -translate-x-1/2 rounded-full bg-[rgba(211,154,46,0.09)] blur-[160px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_8%,rgba(227,179,77,0.055),transparent_42%)]"
      />

      <Container
        size="wide"
        className="flex min-h-[calc(100vh-var(--mr-header-height))] flex-col justify-center py-12 sm:py-16 lg:py-20"
      >
        {/* Loading identity */}

        <div className="mb-10 flex flex-col items-center text-center">
          <LoadingMark />

          <p className="mr-eyebrow mr-eyebrow-centered mt-6">
            Money Records
          </p>

          <p className="mt-4 max-w-md text-sm leading-7 text-white/45">
            Preparing the next experience.
          </p>
        </div>

        {/* Main loading skeleton */}

        <div className="overflow-hidden rounded-[28px] border border-[rgba(227,179,77,0.14)] bg-[linear-gradient(155deg,rgba(255,255,255,0.04),rgba(8,8,9,0.92))] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.48)] sm:p-7 lg:p-9">
          <div className="mr-card-topline" />

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Hero copy skeleton */}

            <div className="py-3 sm:py-6">
              <Skeleton className="h-7 w-40 rounded-full" />

              <div className="mt-7 space-y-4">
                <Skeleton className="h-14 w-full max-w-2xl sm:h-16" />
                <Skeleton className="h-14 w-[88%] max-w-xl sm:h-16" />
                <Skeleton className="h-14 w-[64%] max-w-md sm:h-16" />
              </div>

              <div className="mt-8 space-y-3">
                <Skeleton className="h-4 w-full max-w-xl" />
                <Skeleton className="h-4 w-[92%] max-w-lg" />
                <Skeleton className="h-4 w-[70%] max-w-md" />
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Skeleton className="h-13 w-full rounded-full sm:w-52" />
                <Skeleton className="h-13 w-full rounded-full sm:w-44" />
              </div>
            </div>

            {/* Visual skeleton */}

            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-full bg-[rgba(211,154,46,0.08)] blur-[70px]" />

              <Skeleton className="aspect-[4/3] w-full rounded-[24px]" />

              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 sm:bottom-5 sm:left-5 sm:right-5 sm:gap-3">
                <Skeleton className="h-16 rounded-xl" />
                <Skeleton className="h-16 rounded-xl" />
                <Skeleton className="h-16 rounded-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Card loading skeletons */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              aria-hidden="true"
              className="mr-card p-5 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <Skeleton className="h-13 w-13 rounded-2xl" />
                <Skeleton className="h-7 w-20 rounded-full" />
              </div>

              <Skeleton className="mt-7 h-7 w-[68%]" />

              <div className="mt-5 space-y-3">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-[92%]" />
                <Skeleton className="h-3.5 w-[65%]" />
              </div>

              <Skeleton className="mt-8 h-11 w-full rounded-full" />
            </div>
          ))}
        </div>

        <span className="mr-sr-only">
          Money Records content is loading.
        </span>
      </Container>
    </div>
  );
}