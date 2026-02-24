// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Services Hero Section                                 ┃
   ┃ File   : src/sections/ServicesHero.tsx                                 ┃
   ┃ Role   : Services page hero (elite black+gold, world-map vibe)         ┃
   ┃ Status : Ready                                                        ┃
   ┃ License: Proprietary                                                  ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Image from "next/image";

type ServicesHeroProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;

  primaryCtaHref?: string;
  primaryCtaLabel?: string;

  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;

  /** Optional override (defaults to /brand/hero-world.jpg) */
  backgroundImageSrc?: string;
};

export default function ServicesHero({
  eyebrow = "Services • Distribution • Marketing",
  title = "Platform Coverage\nBuilt for Global Scale",
  subtitle = "Pick the services you need — distribution, VEVO options, PR, and premium rollout strategy — then we execute across the platforms that matter for your release.",
  primaryCtaHref = "#platforms",
  primaryCtaLabel = "View Platforms",
  secondaryCtaHref = "#packages",
  secondaryCtaLabel = "See Packages",
  backgroundImageSrc = "/brand/hero-world.jpg",
}: ServicesHeroProps) {
  return (
    <section
      className="mr-hero mt-8"
      style={{
        backgroundImage: `url(${backgroundImageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Cinematic overlay */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_35%,rgba(214,179,90,0.20),rgba(0,0,0,0.85)_60%,rgba(0,0,0,0.95)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.40),rgba(0,0,0,0.85))]" />
          <div className="absolute left-0 right-0 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(214,179,90,0.60),transparent)]" />
        </div>

        <div className="relative grid gap-10 p-8 md:grid-cols-2 md:p-12">
          {/* Left */}
          <div className="relative z-10">
            <div className="mr-eyebrow">{eyebrow}</div>

            <h1 className="mr-title mt-4 whitespace-pre-line text-3xl md:text-5xl">
              {title}
            </h1>

            <p className="mr-subtitle mt-5 max-w-xl">{subtitle}</p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a className="mr-btn-primary" href={primaryCtaHref}>
                {primaryCtaLabel}
              </a>
              <a className="mr-btn-secondary" href={secondaryCtaHref}>
                {secondaryCtaLabel}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="mr-badge">Distribution</span>
              <span className="mr-badge">PR + Press</span>
              <span className="mr-badge">Marketing</span>
              <span className="mr-badge">VEVO Options</span>
            </div>
          </div>

          {/* Right: quick highlights card */}
          <div className="relative z-10">
            <div className="mr-card p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-[rgba(244,241,234,0.70)]">
                    Included
                  </div>
                  <div className="mt-2 text-lg font-extrabold uppercase tracking-[0.10em]">
                    Services Stack
                  </div>
                </div>

                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/15 bg-white/5 shadow-[0_0_0_1px_rgba(214,179,90,0.18),0_0_28px_rgba(214,179,90,0.18)]">
                  <Image
                    src="/brand/mr-crest.png"
                    alt="Money Records Crest"
                    fill
                    className="object-contain p-2"
                    priority
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                <Row
                  title="Platform Coverage"
                  desc="Major DSPs + social/music discovery surfaces."
                />
                <Row
                  title="Rollout Strategy"
                  desc="Positioning + timing + visibility plan."
                />
                <Row
                  title="Marketing Add-Ons"
                  desc="Campaign boosts, placements, and momentum options."
                />
              </div>

              <div className="mt-6 rounded-xl border border-[rgba(214,179,90,0.25)] bg-[rgba(214,179,90,0.06)] p-4 shadow-[0_0_0_1px_rgba(214,179,90,0.10),0_10px_40px_rgba(0,0,0,0.35)]">
                <div className="text-xs uppercase tracking-[0.22em] text-[rgba(244,241,234,0.75)]">
                  Starting From
                </div>
                <div className="mt-1 text-2xl font-extrabold uppercase tracking-[0.10em] text-[rgba(242,208,122,0.95)]">
                  $500 One-Time
                </div>
                <div className="mt-1 text-sm text-[rgba(244,241,234,0.70)]">
                  Distribution access + deal eligibility.
                </div>
              </div>

              <div className="mt-5 text-xs tracking-[0.18em] text-[rgba(244,241,234,0.55)] uppercase">
                Built for premium positioning • global visibility
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="mr-icon-ring"
        style={{
          width: 44,
          height: 44,
          boxShadow:
            "0 0 0 1px rgba(214,179,90,0.18), 0 0 18px rgba(214,179,90,0.12)",
        }}
      >
        <span className="font-extrabold text-[rgba(214,179,90,0.95)]">✓</span>
      </div>
      <div>
        <div className="text-sm font-bold uppercase tracking-[0.08em]">
          {title}
        </div>
        <div className="text-sm text-[rgba(244,241,234,0.70)]">{desc}</div>
      </div>
    </div>
  );
}