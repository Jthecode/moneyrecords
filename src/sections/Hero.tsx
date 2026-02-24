// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Hero Section                                          ┃
   ┃ File   : src/sections/Hero.tsx                                        ┃
   ┃ Role   : Black+gold world-map hero (matches mockup)                   ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Card from "@/components/Card";

type HeroProps = {
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

export default function Hero({
  eyebrow = "International Reach • Label Execution",
  title = "Global Distribution\nBuilt for Serious Artists",
  subtitle = "Money Records delivers label-grade rollouts: distribution, VEVO, PR, and strategic marketing — engineered to get your release seen worldwide with premium positioning.",
  primaryCtaHref = "#services",
  primaryCtaLabel = "View Packages",
  secondaryCtaHref = "#services",
  secondaryCtaLabel = "Explore Services",
  backgroundImageSrc = "/brand/hero-world.jpg",
}: HeroProps) {
  return (
    <section
      id="home"
      className="mr-hero mt-8"
      style={{
        backgroundImage: `url(${backgroundImageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      aria-label="Money Records hero"
    >
      {/* Overlays: glow + vignette + top glint */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {/* gold halo */}
        <div className="absolute inset-0 bg-[radial-gradient(1100px_620px_at_50%_32%,rgba(214,179,90,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_55%,rgba(214,179,90,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_80%_55%,rgba(214,179,90,0.10),transparent_60%)]" />

        {/* cinematic dark wash */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.86))]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_50%_35%,transparent_35%,rgba(0,0,0,0.76)_90%)]" />

        {/* subtle top border glow */}
        <div className="absolute left-0 right-0 top-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(214,179,90,0.65),transparent)]" />
      </div>

      {/* Content */}
      <Container className="mr-hero-content relative z-[2] py-10 md:py-12">
        <div className="grid items-start gap-10 md:grid-cols-[1.12fr_0.88fr]">
          {/* Left */}
          <div className="relative">
            <div className="mr-eyebrow">{eyebrow}</div>

            <h1 className="mr-title mt-4 whitespace-pre-line text-4xl md:text-6xl">
              {title}
            </h1>

            <p className="mr-subtitle mt-5 max-w-xl text-base md:text-[17px]">
              {subtitle}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" href={primaryCtaHref}>
                {primaryCtaLabel}
              </Button>
              <Button variant="secondary" href={secondaryCtaHref}>
                {secondaryCtaLabel}
              </Button>
            </div>

            {/* Badges line */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="mr-badge">Top 2% Label Worldwide</span>
              <span className="mr-badge">240+ Countries Reached</span>
              <span className="mr-badge">Rollout Strategy</span>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            {/* tiny crest float (matches mockup “badge” vibe) */}
            <div className="absolute -right-2 -top-2 hidden md:block">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/15 bg-black/35 shadow-[0_0_0_1px_rgba(214,179,90,0.18),0_0_28px_rgba(214,179,90,0.16)]">
                <Image
                  src="/brand/mr-crest.png"
                  alt="Money Records Crest"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-[rgba(244,241,234,0.70)]">
                    Featured
                  </div>
                  <div className="mt-2 text-lg font-extrabold uppercase tracking-[0.10em]">
                    Distribution Suite
                  </div>
                </div>

                {/* Crest (mobile / also aligns with mockup) */}
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/15 bg-white/5 shadow-[0_0_0_1px_rgba(214,179,90,0.18),0_0_22px_rgba(214,179,90,0.14)] md:hidden">
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
                <Feature
                  title="Global Delivery"
                  description="Release distribution engineered for worldwide reach."
                />
                <Feature
                  title="VEVO + Marketing"
                  description="VEVO distribution options + rollout visibility strategies."
                />
                <Feature
                  title="Press + Positioning"
                  description="Brand-forward press support and premium presentation."
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
                  Distribution access + exclusive marketing deal eligibility.
                </div>
              </div>

              <div className="mt-5 text-xs uppercase tracking-[0.18em] text-[rgba(244,241,234,0.55)]">
                Built for premium positioning • global visibility
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
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
        aria-hidden="true"
      >
        <span className="font-extrabold text-[rgba(214,179,90,0.95)]">✓</span>
      </div>

      <div>
        <div className="text-sm font-bold uppercase tracking-[0.08em]">
          {title}
        </div>
        <div className="text-sm text-[rgba(244,241,234,0.70)]">
          {description}
        </div>
      </div>
    </div>
  );
}