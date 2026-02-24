// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Why Choose Section                                    ┃
   ┃ File   : src/sections/WhyChoose.tsx                                   ┃
   ┃ Role   : 3-card value props section (black+gold, mockup-matched)      ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import Container from "@/components/Container";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

type WhyChooseItem = {
  icon: string;
  title: string;
  description: string;
};

type WhyChooseProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  ctaHref?: string;
  ctaLabel?: string;
  items?: WhyChooseItem[];
};

const DEFAULT_ITEMS: WhyChooseItem[] = [
  {
    icon: "🌍",
    title: "Unmatched Distribution",
    description: "Reach over 240 countries and 1,000+ platforms worldwide.",
  },
  {
    icon: "📣",
    title: "Exclusive Marketing",
    description: "Custom campaigns engineered to maximize your global impact.",
  },
  {
    icon: "📈",
    title: "Advanced Services",
    description: "VEVO, PR, and rollout strategy tailored for artist & label success.",
  },
];

export default function WhyChoose({
  id = "services",
  eyebrow = "Why Choose Money Records?",
  title = "Premium Execution.\nGlobal Visibility.",
  ctaHref = "#contact",
  ctaLabel = "Talk to the Team",
  items = DEFAULT_ITEMS,
}: WhyChooseProps) {
  return (
    <section id={id} className="mt-12 pb-14 md:pb-16">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading eyebrow={eyebrow} title={title} />

          <div className="hidden md:block">
            <Button variant="secondary" href={ctaHref}>
              {ctaLabel}
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} className="p-7">
              <div className="mr-icon-ring">
                <span className="text-[rgba(214,179,90,0.95)] text-xl">
                  {item.icon}
                </span>
              </div>

              <div className="mt-5 font-extrabold tracking-[0.10em] uppercase">
                {item.title}
              </div>

              <p className="mt-2 text-sm leading-6 text-[rgba(244,241,234,0.72)]">
                {item.description}
              </p>

              {/* subtle bottom glint line (mockup vibe) */}
              <div className="mt-6 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(214,179,90,0.40),transparent)]" />
            </Card>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden">
          <Button variant="secondary" href={ctaHref} className="w-full justify-center">
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}