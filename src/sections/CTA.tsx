// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — CTA Section                                           ┃
   ┃ File   : src/sections/CTA.tsx                                         ┃
   ┃ Role   : Primary conversion block (inquiry + Get Started)             ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Link from "next/link";

import Container from "@/components/Container";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import Divider from "@/components/Divider";

type Step = {
  k: string; // "01"
  title: string;
  desc: string;
};

type CTAProps = {
  id?: string;

  eyebrow?: string;
  title?: string;
  blurb?: string;

  badges?: string[];

  ceoHandle?: string;
  ceoHref?: string;

  primaryHref?: string;
  primaryLabel?: string;

  secondaryHref?: string;
  secondaryLabel?: string;

  email?: string;

  steps?: Step[];
};

const DEFAULT_STEPS: Step[] = [
  {
    k: "01",
    title: "Send your links",
    desc: "Spotify/Apple/YouTube + artwork + release date.",
  },
  {
    k: "02",
    title: "We build your rollout",
    desc: "Distribution + strategy + press/marketing options.",
  },
  {
    k: "03",
    title: "Launch worldwide",
    desc: "Global distribution + visibility momentum.",
  },
];

export default function CTA({
  id = "contact",
  eyebrow = "Inquiries",
  title = "Ready to launch globally?",
  blurb = `Get label-grade distribution + rollout support. Reach 240+ countries with premium positioning, VEVO options, and exclusive marketing deal access.`,
  badges = ["Top 2% Label Worldwide", "$500 One-Time (Distribution)", "Press • Marketing • VEVO"],
  ceoHandle = "@kingpharaohreal",
  ceoHref = "https://instagram.com/kingpharaohreal",
  primaryHref = "/contact",
  primaryLabel = "Start an Inquiry",
  secondaryHref = "https://instagram.com/kingpharaohreal",
  secondaryLabel = "DM on Instagram",
  email = "info@moneyrecords.io",
  steps = DEFAULT_STEPS,
}: CTAProps) {
  return (
    <section id={id} className="mt-12">
      <Container>
        <Card className="p-7 md:p-9">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <SectionHeading eyebrow={eyebrow} title={title} />

              <p className="mt-3 text-sm leading-6 text-[rgba(244,241,234,0.72)] md:text-base">
                {highlight240(blurb)}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {badges.map((b) => (
                  <span key={b} className="mr-badge">
                    {b}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-sm text-[rgba(244,241,234,0.70)]">
                CEO:{" "}
                <a
                  className="font-bold text-[rgba(242,208,122,0.95)] hover:underline"
                  href={ceoHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ceoHandle}
                </a>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-auto">
              <Button variant="primary" href={primaryHref} className="text-center">
                {primaryLabel}
              </Button>

              <Button
                variant="secondary"
                href={secondaryHref}
                className="text-center"
                target="_blank"
                rel="noreferrer"
              >
                {secondaryLabel}
              </Button>

              <div className="text-center text-xs text-[rgba(244,241,234,0.55)]">
                Or email:{" "}
                <a
                  className="text-[rgba(242,208,122,0.85)] hover:underline"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              </div>
            </div>
          </div>

          <Divider className="my-8" />

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.k}
                className="rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.04)] p-5 shadow-[0_0_0_1px_rgba(214,179,90,0.06),0_18px_70px_rgba(0,0,0,0.40)]"
              >
                <div className="text-xs uppercase tracking-[0.22em] text-[rgba(244,241,234,0.70)]">
                  {s.k}
                </div>
                <div className="mt-2 text-sm font-extrabold uppercase tracking-[0.10em]">
                  {s.title}
                </div>
                <div className="mt-1 text-sm leading-6 text-[rgba(244,241,234,0.70)]">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none mt-8 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(214,179,90,0.45),transparent)]" />
        </Card>
      </Container>
    </section>
  );
}

/**
 * Light helper: highlights "240+ countries" inside a plain string without forcing rich text input.
 */
function highlight240(text: string) {
  const needle = "240+ countries";
  const idx = text.toLowerCase().indexOf(needle);
  if (idx === -1) return text;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + needle.length);
  const after = text.slice(idx + needle.length);

  return (
    <>
      {before}
      <span className="font-bold text-[rgba(242,208,122,0.95)]">{match}</span>
      {after}
    </>
  );
}