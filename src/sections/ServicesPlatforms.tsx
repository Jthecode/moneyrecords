// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Services Platforms Section                            ┃
   ┃ File   : src/sections/ServicesPlatforms.tsx                            ┃
   ┃ Role   : Services page “platforms we support” (Distribution + Marketing)┃
   ┃ Status : Ready                                                        ┃
   ┃ License: Proprietary                                                  ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

type Pill = {
  label: string;
  tone?: "gold" | "neutral";
};

type Platform = {
  name: string;
  description: string;
  pills: Pill[];
  highlights: string[];
};

type ServicesPlatformsProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  platforms?: Platform[];
};

const DEFAULT_PLATFORMS: Platform[] = [
  {
    name: "Spotify",
    description: "Distribution + campaign support built for discovery.",
    pills: [
      { label: "Distribution", tone: "gold" },
      { label: "Marketing", tone: "gold" },
      { label: "Playlisting Strategy", tone: "neutral" },
    ],
    highlights: ["Pre-save setup", "Pitch positioning", "Release-week momentum"],
  },
  {
    name: "Apple Music",
    description: "Premium storefront presence + rollout positioning.",
    pills: [
      { label: "Distribution", tone: "gold" },
      { label: "Marketing", tone: "gold" },
      { label: "Brand Positioning", tone: "neutral" },
    ],
    highlights: ["Metadata polish", "Visual/brand alignment", "Launch timing strategy"],
  },
  {
    name: "YouTube + Content ID",
    description: "Monetization support + visibility strategy for video.",
    pills: [
      { label: "Distribution", tone: "gold" },
      { label: "Marketing", tone: "gold" },
      { label: "Rights / Monetization", tone: "neutral" },
    ],
    highlights: ["Content ID support", "Channel positioning", "Promo routing"],
  },
  {
    name: "TikTok",
    description: "Sound library delivery + viral rollout planning.",
    pills: [
      { label: "Distribution", tone: "gold" },
      { label: "Marketing", tone: "gold" },
      { label: "Trend Strategy", tone: "neutral" },
    ],
    highlights: ["Sound setup", "Hook-first strategy", "Creator targeting"],
  },
  {
    name: "Instagram / Reels",
    description: "Audio library + reels-forward rollout execution.",
    pills: [
      { label: "Distribution", tone: "gold" },
      { label: "Marketing", tone: "gold" },
      { label: "Reels Strategy", tone: "neutral" },
    ],
    highlights: ["Reels content plan", "Hashtag routing", "Launch visuals checklist"],
  },
  {
    name: "Amazon Music",
    description: "Streaming + storefront coverage with rollout support.",
    pills: [
      { label: "Distribution", tone: "gold" },
      { label: "Marketing", tone: "gold" },
      { label: "Storefront Presence", tone: "neutral" },
    ],
    highlights: ["Catalog consistency", "Release-day push", "Audience routing"],
  },
  {
    name: "TIDAL",
    description: "Availability + premium positioning and brand lift.",
    pills: [
      { label: "Distribution", tone: "gold" },
      { label: "Marketing", tone: "gold" },
      { label: "Premium Placement", tone: "neutral" },
    ],
    highlights: ["Press alignment", "Brand story framing", "Launch polish"],
  },
  {
    name: "Deezer",
    description: "International reach + discovery-forward marketing.",
    pills: [
      { label: "Distribution", tone: "gold" },
      { label: "Marketing", tone: "gold" },
      { label: "Global Reach", tone: "neutral" },
    ],
    highlights: ["Region targeting", "Release timing", "Momentum sequencing"],
  },
  {
    name: "Pandora",
    description: "Radio + streaming coverage with rollout support.",
    pills: [
      { label: "Distribution", tone: "gold" },
      { label: "Marketing", tone: "gold" },
      { label: "Radio Strategy", tone: "neutral" },
    ],
    highlights: ["Artist profile readiness", "Discovery planning", "Campaign pacing"],
  },
];

function PillUI({ label, tone = "neutral" }: Pill) {
  const gold =
    "border-[rgba(214,179,90,0.28)] bg-[rgba(214,179,90,0.10)] text-[rgba(246,226,169,0.92)]";
  const neutral =
    "border-white/10 bg-white/5 text-[rgba(244,241,234,0.78)]";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px]",
        "tracking-[0.22em] uppercase",
        tone === "gold" ? gold : neutral,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

export default function ServicesPlatforms({
  id = "platforms",
  eyebrow = "Platform Coverage",
  title = "Distribution + Marketing — Platform by Platform",
  subtitle = "Every rollout includes distribution plus marketing support tailored to each platform’s discovery system.",
  platforms = DEFAULT_PLATFORMS,
}: ServicesPlatformsProps) {
  return (
    <section id={id} className="mt-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="mr-eyebrow">{eyebrow}</div>
          <h2 className="mr-section-title mt-3 text-2xl md:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm md:text-base leading-7 text-[rgba(244,241,234,0.72)]">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-badge">Distribution Included</span>
          <span className="mr-badge">Marketing Included</span>
          <span className="mr-badge">Rollout Strategy</span>
        </div>
      </div>

      {/* Platform grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p) => (
          <div key={p.name} className="mr-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-extrabold tracking-[0.06em] uppercase">
                  {p.name}
                </div>
                <div className="mt-2 text-sm leading-6 text-[rgba(244,241,234,0.70)]">
                  {p.description}
                </div>
              </div>

              <div
                className="mr-icon-ring"
                style={{
                  width: 46,
                  height: 46,
                  boxShadow:
                    "0 0 0 1px rgba(214,179,90,0.18), 0 0 18px rgba(214,179,90,0.12)",
                }}
              >
                <span className="text-[rgba(214,179,90,0.95)] font-extrabold">
                  ✓
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.pills.map((pill) => (
                <PillUI key={`${p.name}-${pill.label}`} {...pill} />
              ))}
            </div>

            <div className="mt-5 grid gap-2">
              {p.highlights.map((h) => (
                <div
                  key={`${p.name}-${h}`}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
                >
                  <span className="mt-[2px] text-[rgba(214,179,90,0.95)]">•</span>
                  <div className="text-sm text-[rgba(244,241,234,0.74)] leading-6">
                    {h}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-[rgba(214,179,90,0.22)] bg-[rgba(214,179,90,0.06)] p-4">
              <div className="text-xs tracking-[0.22em] uppercase text-[rgba(244,241,234,0.72)]">
                Marketing Included
              </div>
              <div className="mt-2 text-sm font-extrabold tracking-[0.10em] uppercase text-[rgba(242,208,122,0.95)]">
                Platform-tailored rollout support
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom conversion strip */}
      <div className="mt-8 mr-card p-6 md:p-7">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="mr-eyebrow">Full Rollout Coverage</div>
            <div className="mt-2 text-lg md:text-xl font-extrabold tracking-[0.10em] uppercase">
              Distribution is only step one — we market it too.
            </div>
            <p className="mt-2 text-sm md:text-base leading-7 text-[rgba(244,241,234,0.72)]">
              We pair platform delivery with marketing strategy so your release is
              positioned for visibility, discovery, and premium presentation.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a className="mr-btn-primary" href="#contact">
              Inquire Now
            </a>
            <a className="mr-btn-secondary" href="#packages">
              View Packages
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}