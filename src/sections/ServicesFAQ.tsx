// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Services FAQ Section                                  ┃
   ┃ File   : src/sections/ServicesFAQ.tsx                                 ┃
   ┃ Role   : FAQ block (platform marketing + delivery expectations)       ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Container from "@/components/Container";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import Divider from "@/components/Divider";
import Button from "@/components/Button";

type FAQItem = {
  q: string;
  a: string;
};

type ServicesFAQProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  ctaHref?: string;
  ctaLabel?: string;
};

const DEFAULT_FAQ: FAQItem[] = [
  {
    q: "Do you offer marketing for each platform?",
    a: "Yes. Every platform we support includes marketing execution: metadata/SEO strategy, rollout sequencing, content planning, and visibility optimization tailored to that platform.",
  },
  {
    q: "Which platforms can you run this for?",
    a: "YouTube, VEVO, Instagram, TikTok, Spotify, Apple Music, SoundCloud, and more. If you have a specific platform, we’ll tailor the package to match it.",
  },
  {
    q: "What do you mean by “metadata tags” and optimization?",
    a: "We optimize the text and structure that drives discovery: titles, keywords, tags, descriptions, hashtags, category/topic mapping, and link routing to increase reach and improve how your content is found.",
  },
  {
    q: "How fast is turnaround?",
    a: "Most setups begin quickly after onboarding. Exact timing depends on the platform, your assets (links/artwork/date), and which tier you choose (Starter/Growth/Pro/Elite).",
  },
  {
    q: "Is VEVO included?",
    a: "VEVO support is available as an optional add-on (eligibility + rollout planning). If your release qualifies, we help you align the content and campaign for premium positioning.",
  },
  {
    q: "Do you do distribution too?",
    a: "Yes — distribution is available, and we can align marketing timelines with your release so everything launches clean and coordinated across platforms.",
  },
  {
    q: "What do you need from me to start?",
    a: "Your links (YouTube/IG/TikTok/Spotify/Apple), artwork/branding, release date (if applicable), and your goal (views, subs, brand awareness, chart push, etc.).",
  },
  {
    q: "Can you customize a package?",
    a: "Absolutely. We can combine platforms, add PR/press support, and build a full rollout calendar for a label-grade campaign.",
  },
];

export default function ServicesFAQ({
  id = "faq",
  eyebrow = "FAQ",
  title = "Questions Artists Ask",
  subtitle =
    "Clear expectations. Premium execution. Every platform includes marketing strategy and optimization.",
  items = DEFAULT_FAQ,
  ctaHref = "#contact",
  ctaLabel = "Start an Inquiry",
}: ServicesFAQProps) {
  return (
    <section id={id} className="mt-12">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <div className="mt-8">
          <Card className="p-7 md:p-9">
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-sm md:text-base font-extrabold tracking-[0.10em] uppercase">
                        {item.q}
                      </div>
                      <span className="mt-[2px] inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(214,179,90,0.22)] bg-[rgba(214,179,90,0.08)] text-[rgba(242,208,122,0.95)]">
                        +
                      </span>
                    </div>
                    <div className="pointer-events-none mt-4 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(214,179,90,0.35),transparent)] opacity-0 transition-opacity duration-200 group-open:opacity-100" />
                  </summary>

                  <div className="mt-4 text-sm leading-7 text-[rgba(244,241,234,0.72)]">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>

            <Divider className="my-8" />

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="mr-eyebrow">Next step</div>
                <div className="mt-2 text-base md:text-lg font-extrabold tracking-[0.10em] uppercase">
                  Send your links — we’ll map the rollout.
                </div>
                <div className="mt-2 text-sm text-[rgba(244,241,234,0.70)] leading-6">
                  YouTube/VEVO/IG/TikTok + artwork + goal (views/subs/awareness).
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="primary" href={ctaHref}>
                  {ctaLabel}
                </Button>
                <Button variant="secondary" href="#packages">
                  View Packages
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}