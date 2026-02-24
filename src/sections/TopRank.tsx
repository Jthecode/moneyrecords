// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Top Rank Section                                      ┃
   ┃ File   : src/sections/TopRank.tsx                                     ┃
   ┃ Role   : Premium proof/credibility strip (Top 2% + 240+ countries)    ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Image from "next/image";

import Container from "@/components/Container";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import Divider from "@/components/Divider";

type TopRankProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subhead?: string;
  bullets?: string[];
  primaryCtaHref?: string;
  primaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
};

export default function TopRank({
  id = "rank",
  eyebrow = "Credibility",
  title = "Ranked Top 2% of Record Labels Worldwide",
  subhead = "Premium label execution built for scale — distribution, marketing, PR, and rollout strategy across 240+ countries.",
  bullets = [
    "240+ countries distribution reach",
    "Elite rollout strategy + positioning",
    "Exclusive marketing deal eligibility",
  ],
  primaryCtaHref = "#contact",
  primaryCtaLabel = "Inquire Now",
  secondaryCtaHref = "#services",
  secondaryCtaLabel = "Explore Services",
}: TopRankProps) {
  return (
    <section id={id} className="mt-12">
      <Container>
        <Card className="p-7 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            {/* Left */}
            <div className="max-w-2xl">
              <SectionHeading eyebrow={eyebrow} title={title} />

              <p className="mt-4 text-sm leading-7 text-[rgba(244,241,234,0.72)] md:text-base">
                {subhead}
              </p>

              <Divider className="my-7" />

              <div className="grid gap-3 sm:grid-cols-3">
                {bullets.map((b) => (
                  <div
                    key={b}
                    className="rounded-2xl border border-[rgba(214,179,90,0.22)] bg-[rgba(214,179,90,0.06)] p-4"
                  >
                    <div className="text-xs uppercase tracking-[0.22em] text-[rgba(244,241,234,0.75)]">
                      Proof
                    </div>
                    <div className="mt-2 text-sm font-extrabold uppercase tracking-[0.08em] text-[rgba(242,208,122,0.95)]">
                      {b}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button variant="primary" href={primaryCtaHref}>
                  {primaryCtaLabel}
                </Button>
                <Button variant="secondary" href={secondaryCtaHref}>
                  {secondaryCtaLabel}
                </Button>
              </div>
            </div>

            {/* Right: seal */}
            <div className="flex items-center justify-center">
              <div className="relative h-36 w-36 md:h-48 md:w-48">
                {/* outer glow */}
                <div
                  className="absolute -inset-10 rounded-full opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(214,179,90,0.22), transparent 60%)",
                  }}
                />
                {/* ring */}
                <div className="absolute inset-0 rounded-full border border-[rgba(214,179,90,0.30)] bg-[rgba(255,255,255,0.02)] shadow-[0_0_0_1px_rgba(214,179,90,0.10),0_18px_70px_rgba(0,0,0,0.60)]" />
                {/* crest */}
                <div className="relative h-full w-full overflow-hidden rounded-full border border-white/15 bg-white/5">
                  <Image
                    src="/brand/mr-crest.png"
                    alt="Money Records Crest"
                    fill
                    className="object-contain p-8"
                    priority
                  />
                </div>

                {/* subtle top glint */}
                <div className="pointer-events-none absolute left-8 right-8 top-6 h-px bg-[linear-gradient(90deg,transparent,rgba(214,179,90,0.55),transparent)]" />
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}