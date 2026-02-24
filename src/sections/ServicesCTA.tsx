// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Services CTA Section                                  ┃
   ┃ File   : src/sections/ServicesCTA.tsx                                 ┃
   ┃ Role   : Conversion block for Services page (platform + marketing)    ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Image from "next/image";

import Container from "@/components/Container";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Divider from "@/components/Divider";

type ServicesCTAProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  instagramHref?: string;
  email?: string;
};

export default function ServicesCTA({
  id = "contact",
  eyebrow = "Inquiries",
  title = "Ready to launch across platforms?",
  subtitle =
    "We combine platform-specific marketing + metadata optimization with label-grade rollout execution. Send your links and we’ll build the campaign plan.",
  primaryHref = "/contact",
  primaryLabel = "Start an Inquiry",
  secondaryHref = "https://instagram.com/kingpharaohreal",
  secondaryLabel = "DM on Instagram",
  instagramHref = "https://instagram.com/kingpharaohreal",
  email = "info@moneyrecords.io",
}: ServicesCTAProps) {
  return (
    <section id={id} className="mt-12 pb-20">
      <Container>
        <Card className="p-7 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <div className="mr-eyebrow">{eyebrow}</div>

              <h3 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-[0.06em] uppercase">
                {title}
              </h3>

              <p className="mt-4 text-sm md:text-base leading-7 text-[rgba(244,241,234,0.72)]">
                {subtitle}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="mr-badge">Marketing for each platform</span>
                <span className="mr-badge">Metadata + SEO Optimization</span>
                <span className="mr-badge">Rollout Strategy</span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Step
                  n="01"
                  title="Send your links"
                  body="YouTube/IG/TikTok/Spotify/Apple + your goal."
                />
                <Step
                  n="02"
                  title="We build the plan"
                  body="Platform-first rollout + metadata + creative direction."
                />
                <Step
                  n="03"
                  title="Launch + scale"
                  body="Execution + reporting + next-step amplification."
                />
              </div>

              <Divider className="my-7" />

              <div className="text-sm text-[rgba(244,241,234,0.70)]">
                CEO:{" "}
                <a
                  className="font-bold text-[rgba(242,208,122,0.95)] hover:underline"
                  href={instagramHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  @kingpharaohreal
                </a>{" "}
                • Email:{" "}
                <a
                  className="font-bold text-[rgba(242,208,122,0.95)] hover:underline"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
              </div>
            </div>

            {/* Right: Crest + actions */}
            <div className="w-full md:w-[360px]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/15 bg-white/5 shadow-[0_0_0_1px_rgba(214,179,90,0.18),0_0_28px_rgba(214,179,90,0.16)]">
                    <Image
                      src="/brand/mr-crest.png"
                      alt="Money Records Crest"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.22em] uppercase text-[rgba(244,241,234,0.70)]">
                      Money Records LLC
                    </div>
                    <div className="mt-1 text-sm font-extrabold tracking-[0.10em] uppercase">
                      Platform Marketing
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  <Button variant="primary" href={primaryHref} className="w-full text-center">
                    {primaryLabel}
                  </Button>

                  <Button
                    variant="secondary"
                    href={secondaryHref}
                    className="w-full text-center"
                    external
                  >
                    {secondaryLabel}
                  </Button>
                </div>

                <div className="mt-5 rounded-xl border border-[rgba(214,179,90,0.20)] bg-[rgba(214,179,90,0.06)] p-4">
                  <div className="text-xs tracking-[0.22em] uppercase text-[rgba(244,241,234,0.75)]">
                    What you get
                  </div>
                  <ul className="mt-3 grid gap-2 text-sm text-[rgba(244,241,234,0.72)]">
                    <li className="flex gap-2">
                      <span className="text-[rgba(242,208,122,0.95)]">✓</span>
                      Platform-specific marketing execution
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[rgba(242,208,122,0.95)]">✓</span>
                      Metadata + discovery optimization
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[rgba(242,208,122,0.95)]">✓</span>
                      Rollout calendar + positioning
                    </li>
                  </ul>
                </div>

                <div className="mt-4 text-xs tracking-[0.18em] uppercase text-[rgba(244,241,234,0.55)]">
                  Built for premium positioning
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs tracking-[0.22em] uppercase text-[rgba(244,241,234,0.70)]">
        {n}
      </div>
      <div className="mt-2 text-sm font-extrabold tracking-[0.10em] uppercase">
        {title}
      </div>
      <div className="mt-1 text-sm leading-6 text-[rgba(244,241,234,0.70)]">
        {body}
      </div>
    </div>
  );
}