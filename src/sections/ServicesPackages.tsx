// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Services Packages Section                              ┃
   ┃ File   : src/sections/ServicesPackages.tsx                             ┃
   ┃ Role   : Platform marketing packages (YouTube + VEVO example)          ┃
   ┃ Status : Ready                                                        ┃
   ┃ License: Proprietary                                                  ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Container from "@/components/Container";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import Divider from "@/components/Divider";

type Package = {
  name: string;
  price: string;
  bestFor: string;
  includes: string[];
};

type ServicesPackagesProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;

  // You can add more platform groups later (Spotify, Apple, TikTok, etc.)
  platformTitle?: string;
  platformSubtitle?: string;

  packages?: Package[];

  primaryCtaHref?: string;
  primaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
};

const DEFAULT_PACKAGES: Package[] = [
  {
    name: "Starter Campaign",
    price: "Starting at $250",
    bestFor: "Clean setup + first push",
    includes: [
      "Metadata SEO setup (title/description/tags strategy)",
      "Channel/profile optimization checklist",
      "Launch-day routing plan (IG/TikTok → YouTube/VEVO)",
      "Basic campaign pacing + posting schedule",
    ],
  },
  {
    name: "Growth Campaign",
    price: "Starting at $500",
    bestFor: "Release week momentum",
    includes: [
      "Everything in Starter",
      "Thumbnail + hook direction (what to post & how)",
      "Audience targeting plan (regions + interests)",
      "Reporting snapshot + optimization adjustments",
    ],
  },
  {
    name: "Pro Campaign",
    price: "Starting at $1,000",
    bestFor: "Serious visibility",
    includes: [
      "Everything in Growth",
      "Advanced rollout sequencing (shorts + longform mapping)",
      "Cross-platform campaign strategy (content ladder)",
      "Weekly reporting + iteration plan",
    ],
  },
  {
    name: "Elite Campaign",
    price: "Custom Quote",
    bestFor: "Major releases + label execution",
    includes: [
      "Full rollout calendar (14–30 days)",
      "Press + brand positioning alignment (optional add-on)",
      "Priority management + deeper analytics",
      "Custom deliverables tailored to your release goals",
    ],
  },
];

export default function ServicesPackages({
  id = "packages",
  eyebrow = "Packages",
  title = "Platform Marketing Packages",
  subtitle =
    "Choose a campaign level and we execute the rollout across your selected platforms with a premium, label-grade strategy.",
  platformTitle = "YouTube + VEVO",
  platformSubtitle =
    "Distribution options (where eligible) + marketing strategy tailored to platform discovery systems.",
  packages = DEFAULT_PACKAGES,
  primaryCtaHref = "#contact",
  primaryCtaLabel = "Inquire Now",
  secondaryCtaHref = "#platforms",
  secondaryCtaLabel = "View Platforms",
}: ServicesPackagesProps) {
  return (
    <section id={id} className="mt-12">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <div className="mt-8">
          <Card className="p-7 md:p-9">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="mr-eyebrow">Featured Bundle</div>
                <div className="mt-2 text-xl md:text-2xl font-extrabold tracking-[0.10em] uppercase">
                  {platformTitle}
                </div>
                <p className="mt-2 text-sm md:text-base leading-7 text-[rgba(244,241,234,0.72)]">
                  {platformSubtitle}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="mr-badge">Marketing Included</span>
                  <span className="mr-badge">SEO / Metadata</span>
                  <span className="mr-badge">Rollout Strategy</span>
                  <span className="mr-badge">Reporting</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="primary" href={primaryCtaHref}>
                  {primaryCtaLabel}
                </Button>
                <Button variant="secondary" href={secondaryCtaHref}>
                  {secondaryCtaLabel}
                </Button>
              </div>
            </div>

            <Divider className="my-8" />

            {/* Package tiles (flyer-inspired layout, website-safe) */}
            <div className="grid gap-6 md:grid-cols-2">
              {packages.map((pkg) => (
                <Card
                  key={pkg.name}
                  className="p-6 border-[rgba(214,179,90,0.22)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.22em] text-[rgba(244,241,234,0.70)]">
                        {pkg.bestFor}
                      </div>
                      <div className="mt-2 text-lg font-extrabold tracking-[0.10em] uppercase">
                        {pkg.name}
                      </div>
                    </div>

                    <div className="rounded-full border border-[rgba(214,179,90,0.25)] bg-[rgba(214,179,90,0.08)] px-4 py-2 text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(246,226,169,0.92)]">
                      {pkg.price}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2">
                    {pkg.includes.map((line) => (
                      <div
                        key={line}
                        className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
                      >
                        <span className="mt-[2px] text-[rgba(214,179,90,0.95)]">
                          ✓
                        </span>
                        <div className="text-sm leading-6 text-[rgba(244,241,234,0.74)]">
                          {line}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pointer-events-none mt-6 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(214,179,90,0.45),transparent)]" />
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-[rgba(214,179,90,0.22)] bg-[rgba(214,179,90,0.06)] p-6">
              <div className="mr-eyebrow">Note</div>
              <div className="mt-2 text-sm md:text-base leading-7 text-[rgba(244,241,234,0.72)]">
                Packages are campaign-based and tailored to your goals. We focus
                on premium rollout execution, platform optimization, and
                strategy-driven visibility.
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}