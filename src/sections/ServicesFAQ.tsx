// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Services FAQ                                          ┃
   ┃ File   : src/sections/ServicesFAQ.tsx                                 ┃
   ┃ Role   : Platform-service, campaign, checkout, and results FAQ        ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { ReactNode } from "react";

import Button from "@/components/Button";
import CampaignDisclaimer from "@/components/CampaignDisclaimer";
import Card from "@/components/Card";
import Container from "@/components/Container";
import Divider from "@/components/Divider";
import SectionHeading from "@/components/SectionHeading";

import {
  getPlatformCampaignSummary,
} from "@/data/campaigns";

import {
  getVisiblePlatforms,
  type MarketingPlatform,
} from "@/data/platforms";

/* --------------------------------------------------------------------- */
/* Types                                                                  */
/* --------------------------------------------------------------------- */

export type ServicesFAQItem = {
  /**
   * Stable FAQ identifier.
   */
  id: string;

  /**
   * Public FAQ question.
   */
  question: string;

  /**
   * Public FAQ answer.
   */
  answer: string;

  /**
   * Optional category displayed above the question.
   */
  category?: string;

  /**
   * Opens this question by default.
   *
   * Keep this false for most questions to avoid an overly long page.
   */
  defaultOpen?: boolean;
};

type ServicesFAQProps = {
  /**
   * Section anchor.
   *
   * @default "faq"
   */
  id?: string;

  /**
   * Small label above the section title.
   */
  eyebrow?: ReactNode;

  /**
   * Main section title.
   */
  title?: ReactNode;

  /**
   * Supporting section description.
   */
  subtitle?: ReactNode;

  /**
   * Optional FAQ-data override.
   */
  items?: readonly ServicesFAQItem[];

  /**
   * Contact destination.
   */
  contactHref?: string;

  /**
   * Contact-button label.
   */
  contactLabel?: string;

  /**
   * Platform-store destination.
   */
  platformsHref?: string;

  /**
   * Platform-store button label.
   */
  platformsLabel?: string;

  /**
   * Spotify-storefront destination.
   */
  spotifyHref?: string;

  /**
   * Spotify-storefront button label.
   */
  spotifyLabel?: string;
};

/* --------------------------------------------------------------------- */
/* Storefront Data                                                        */
/* --------------------------------------------------------------------- */

const visiblePlatforms = getVisiblePlatforms();

const livePlatforms = visiblePlatforms.filter(
  (platform) => platform.status === "live",
);

const customPlatforms = visiblePlatforms.filter(
  (platform) => platform.status === "custom",
);

const comingSoonPlatforms = visiblePlatforms.filter(
  (platform) => platform.status === "coming-soon",
);

const spotifySummary =
  getPlatformCampaignSummary("spotify");

/* --------------------------------------------------------------------- */
/* Helpers                                                                */
/* --------------------------------------------------------------------- */

function formatPlatformNames(
  platforms: readonly MarketingPlatform[],
): string {
  const names = platforms.map(
    (platform) => platform.shortName,
  );

  if (names.length === 0) {
    return "none";
  }

  if (names.length === 1) {
    return names[0];
  }

  if (names.length === 2) {
    return `${names[0]} and ${names[1]}`;
  }

  return `${names
    .slice(0, -1)
    .join(", ")}, and ${names[names.length - 1]}`;
}

function createFaqId(
  sectionId: string,
  itemId: string,
): string {
  return `${sectionId}-${itemId}`;
}

/* --------------------------------------------------------------------- */
/* Default FAQ Content                                                    */
/* --------------------------------------------------------------------- */

const DEFAULT_FAQ: readonly ServicesFAQItem[] = [
  {
    id: "platform-services",
    category: "Platform Storefront",
    question:
      "Which platforms and services does Money Records offer?",
    answer:
      `The storefront currently includes ${visiblePlatforms.length} service categories: ${formatPlatformNames(
        visiblePlatforms,
      )}. Each platform has its own page with its status, description, campaign options, pricing, deliverables, requirements, and campaign standards.`,
    defaultOpen: true,
  },
  {
    id: "available-now",
    category: "Availability",
    question:
      "Which platform campaigns are available to purchase now?",
    answer:
      `${formatPlatformNames(
        livePlatforms,
      )} is currently the first live fixed-price storefront. Spotify includes ${spotifySummary.campaignCount} individual campaign levels, with pricing starting at ${spotifySummary.lowestPriceLabel}. Additional services will become purchasable as their pricing, deliverables, and fulfillment process are finalized.`,
  },
  {
    id: "custom-services",
    category: "Custom Services",
    question:
      "What does “Custom Service” mean?",
    answer:
      `${formatPlatformNames(
        customPlatforms,
      )} currently require review or consultation before pricing and fulfillment are confirmed. Custom services may depend on release eligibility, project scope, supplied assets, timing, rights documentation, and the specific work requested.`,
  },
  {
    id: "coming-soon",
    category: "Coming Soon",
    question:
      "What does “Coming Soon” mean on a platform card?",
    answer:
      `${formatPlatformNames(
        comingSoonPlatforms,
      )} are visible so artists can understand the services being developed, but their fixed-price campaigns are not yet available for checkout. A platform will be marked live after its campaign levels, prices, deliverables, requirements, and fulfillment standards are finalized.`,
  },
  {
    id: "spotify-levels",
    category: "Spotify",
    question:
      "What Spotify campaign levels are available?",
    answer:
      "Spotify currently includes seven campaign levels: 10K Starter for $80, 25K Momentum for $179, 50K Growth for $329, 100K Breakout for $599, 250K Scale for $1,399, 500K Major for $2,599, and 1 Million Global for $4,799. Each campaign has its own detail page and one-time price.",
  },
  {
    id: "campaign-numbers",
    category: "Campaign Targets",
    question:
      "Do campaign numbers represent guaranteed streams?",
    answer:
      "No. Campaign numbers represent estimated promotional reach, exposure, impressions, or listener opportunities. They are campaign targets and are not guaranteed stream totals, follower totals, playlist placements, revenue, chart positions, or results.",
  },
  {
    id: "artificial-streaming",
    category: "Campaign Integrity",
    question:
      "Does Money Records use bots or artificial streaming?",
    answer:
      "No. Money Records does not use bots, artificial streaming, click farms, fraudulent engagement, or guaranteed playlist placements. Campaigns are structured around promotional activity, audience targeting, campaign management, and legitimate listener opportunities.",
  },
  {
    id: "included",
    category: "Deliverables",
    question:
      "What is included with an individual campaign?",
    answer:
      "The exact scope is displayed on each campaign page. Depending on the service, it may include release review, audience and market targeting, campaign setup, promotional execution, pacing, monitoring, optimization, and a completion summary. Always review the individual campaign page before purchasing.",
  },
  {
    id: "required-assets",
    category: "Campaign Intake",
    question:
      "What information do I need to provide?",
    answer:
      "You should be prepared to provide the artist name, release title, public song or project link, approved artwork, release date, genre, similar artists, target markets, campaign goals, contact information, and any available social-media or visual-content links.",
  },
  {
    id: "turnaround",
    category: "Timing",
    question:
      "How long does a campaign take?",
    answer:
      "Estimated timing is shown on each campaign page and varies by campaign size, platform, release readiness, audience availability, supplied assets, target markets, and campaign conditions. Timing begins after payment, required information, and release assets have been reviewed and confirmed.",
  },
  {
    id: "checkout",
    category: "Ordering",
    question:
      "How will purchasing a campaign work?",
    answer:
      "For a live fixed-price service, select the platform, compare its campaigns, open the campaign detail page, add the service to your cart, provide the required release information, and complete secure checkout. The website uses the trusted campaign SKU to verify the correct product and price on the server.",
  },
  {
    id: "multiple-services",
    category: "Multiple Platforms",
    question:
      "Can I purchase services for more than one platform?",
    answer:
      "Yes. Individual platform services can be selected separately as they become available. Each service remains its own product with its own price, scope, requirements, timing, and campaign standards. Money Records is not using the discontinued universal $5,000, $10,000, $25,000, or $100,000 package system.",
  },
  {
    id: "distribution",
    category: "Label Services",
    question:
      "Is music distribution included with every marketing campaign?",
    answer:
      "No. Marketing and distribution are separate unless a specific service page or written agreement states otherwise. Money Records can discuss distribution and broader label support separately, but purchasing a platform-marketing campaign does not automatically include distribution.",
  },
  {
    id: "vevo",
    category: "VEVO",
    question:
      "How do VEVO services work?",
    answer:
      "VEVO services require review because availability depends on the artist, video, metadata, rights documentation, delivery requirements, selected service, and release timeline. Approval, delivery, channel availability, pricing, and promotional outcomes are not guaranteed.",
  },
  {
    id: "results",
    category: "Expectations",
    question:
      "What affects campaign performance?",
    answer:
      "Performance can be affected by the quality of the music, artist profile, artwork, content, release timing, audience targeting, genre, market conditions, platform activity, listener response, campaign size, and the accuracy of the information supplied during intake.",
  },
] as const;

/* --------------------------------------------------------------------- */
/* Icons                                                                  */
/* --------------------------------------------------------------------- */

function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <path
        d="M12 5V19M5 12H19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
    >
      <path
        d="M5 12H19M14 7L19 12L14 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M9.6 9.2C9.8 7.8 10.7 7 12.1 7C13.6 7 14.5 7.9 14.5 9.1C14.5 10 14 10.6 13.1 11.2C12.3 11.7 12 12.2 12 13.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <circle
        cx="12"
        cy="16.8"
        r="0.9"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
    >
      <path
        d="M6 12.5L10 16.5L18 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* --------------------------------------------------------------------- */
/* FAQ Item                                                               */
/* --------------------------------------------------------------------- */

function FAQDisclosure({
  item,
  sectionId,
}: {
  item: ServicesFAQItem;
  sectionId: string;
}) {
  const questionId = createFaqId(
    sectionId,
    `${item.id}-question`,
  );

  const answerId = createFaqId(
    sectionId,
    `${item.id}-answer`,
  );

  return (
    <details
      className={[
        "group relative overflow-hidden rounded-2xl border",
        "border-white/[0.075] bg-white/[0.025]",
        "transition-all duration-300",
        "open:border-[rgba(227,179,77,0.28)]",
        "open:bg-[rgba(211,154,46,0.045)]",
      ].join(" ")}
      open={item.defaultOpen}
    >
      <summary
        aria-controls={answerId}
        className={[
          "cursor-pointer list-none p-5 sm:p-6",
          "focus-visible:outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-inset",
          "focus-visible:ring-[rgba(227,179,77,0.55)]",
          "[&::-webkit-details-marker]:hidden",
        ].join(" ")}
      >
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0">
            {item.category ? (
              <p className="m-0 text-[9px] font-black uppercase tracking-[0.17em] text-[var(--mr-gold-200)]">
                {item.category}
              </p>
            ) : null}

            <h3
              id={questionId}
              className="mt-2 text-left text-base font-black leading-6 tracking-[-0.02em] text-[var(--mr-text)] transition-colors duration-200 group-open:text-[var(--mr-gold-100)] sm:text-lg"
            >
              {item.question}
            </h3>
          </div>

          <span
            aria-hidden="true"
            className={[
              "grid h-10 w-10 flex-[0_0_40px] place-items-center",
              "rounded-full border",
              "border-[rgba(227,179,77,0.23)]",
              "bg-[rgba(211,154,46,0.065)]",
              "text-[var(--mr-gold-200)]",
              "transition-transform duration-300",
              "group-open:rotate-45",
            ].join(" ")}
          >
            <PlusIcon />
          </span>
        </div>

        <div className="pointer-events-none mt-5 h-px w-full bg-[linear-gradient(90deg,rgba(227,179,77,0.38),transparent)] opacity-0 transition-opacity duration-300 group-open:opacity-100" />
      </summary>

      <div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        className="px-5 pb-6 sm:px-6 sm:pb-7"
      >
        <p className="m-0 max-w-3xl text-sm leading-7 text-white/52">
          {item.answer}
        </p>
      </div>
    </details>
  );
}

/* --------------------------------------------------------------------- */
/* FAQ Schema                                                             */
/* --------------------------------------------------------------------- */

function FAQStructuredData({
  items,
}: {
  items: readonly ServicesFAQItem[];
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

/* --------------------------------------------------------------------- */
/* Section                                                                */
/* --------------------------------------------------------------------- */

export default function ServicesFAQ({
  id = "faq",
  eyebrow = "Frequently Asked Questions",
  title = (
    <>
      Clear Answers Before You{" "}
      <span className="mr-text-gradient">
        Choose a Campaign.
      </span>
    </>
  ),
  subtitle = "Review how individual platform services work, what campaign targets mean, what information is required, and what to expect before purchasing.",
  items = DEFAULT_FAQ,
  contactHref = "#contact",
  contactLabel = "Ask Money Records",
  platformsHref = "#platforms",
  platformsLabel = "Explore All Platforms",
  spotifyHref = "/services/spotify",
  spotifyLabel = "View Spotify Campaigns",
}: ServicesFAQProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      aria-labelledby="services-faq-heading"
      className="mr-section relative scroll-mt-28 overflow-hidden"
    >
      {/* FAQ search-engine schema */}

      <FAQStructuredData items={items} />

      {/* Decorative atmosphere */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-20 -z-10 h-[700px] w-[1100px] max-w-[115vw] -translate-x-1/2 rounded-full bg-[rgba(211,154,46,0.055)] blur-[155px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 opacity-20 [background-image:radial-gradient(rgba(227,179,77,0.12)_0.7px,transparent_0.7px)] [background-size:24px_24px]"
      />

      <Container size="wide">
        {/* ------------------------------------------------------------- */}
        {/* Heading                                                       */}
        {/* ------------------------------------------------------------- */}

        <SectionHeading
          headingId="services-faq-heading"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align="center"
          width="wide"
          divider
        />

        {/* ------------------------------------------------------------- */}
        {/* FAQ Grid                                                      */}
        {/* ------------------------------------------------------------- */}

        <div className="mt-12 grid items-start gap-4 lg:grid-cols-2">
          {items.map((item) => (
            <FAQDisclosure
              key={item.id}
              item={item}
              sectionId={id}
            />
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Platform Selection CTA                                        */}
        {/* ------------------------------------------------------------- */}

        <Card
          as="aside"
          variant="featured"
          padding="lg"
          topLine
          className="relative mt-8 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[rgba(211,154,46,0.12)] blur-[105px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[rgba(184,124,32,0.065)] blur-[100px]"
          />

          <div className="relative grid gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-3xl">
              <span className="mr-badge mr-badge-featured">
                Need Help Choosing?
              </span>

              <h3 className="mt-5 text-balance text-2xl font-black leading-[1.05] tracking-[-0.038em] text-[var(--mr-text)] sm:text-3xl">
                Send Your Release Details Before You Purchase.
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/52">
                Share your song link, artist name, release date, genre,
                current audience, target platform, campaign goal, and budget.
                Money Records can help you identify the most relevant
                available service.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Artist and release name",
                  "Public song or project link",
                  "Target platform and audience",
                  "Campaign goal and preferred budget",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/[0.065] bg-white/[0.025] p-4"
                  >
                    <span className="mt-0.5 grid h-6 w-6 flex-[0_0_24px] place-items-center rounded-full border border-[rgba(227,179,77,0.25)] bg-[rgba(211,154,46,0.07)] text-[var(--mr-gold-200)]">
                      <CheckIcon />
                    </span>

                    <span className="text-xs leading-5 text-white/52">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <Button
                href={spotifyHref}
                variant="platform"
                platformAccent="#1ed760"
                size="lg"
                rightIcon={<ArrowIcon />}
                fullWidth
              >
                {spotifyLabel}
              </Button>

              <Button
                href={platformsHref}
                variant="secondary"
                size="lg"
                rightIcon={<ArrowIcon />}
                fullWidth
              >
                {platformsLabel}
              </Button>

              <Button
                href={contactHref}
                variant="dark"
                size="lg"
                leftIcon={<HelpIcon />}
                fullWidth
              >
                {contactLabel}
              </Button>
            </div>
          </div>
        </Card>

        {/* ------------------------------------------------------------- */}
        {/* Campaign Standards                                            */}
        {/* ------------------------------------------------------------- */}

        <Divider
          label="Campaign Standards"
          variant="strong"
          spacing="lg"
        />

        <CampaignDisclaimer
          variant="gold"
          size="lg"
          includeIntegrityStatement
          points={[
            "Campaign targets are estimates and do not guarantee streams, followers, placements, revenue, or results.",
            "Fixed-price and custom services have separate scopes, requirements, and fulfillment processes.",
            "Review the individual platform and campaign page before completing a purchase.",
          ]}
        />
      </Container>
    </section>
  );
}