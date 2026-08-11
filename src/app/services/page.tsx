// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Marketing Services Page                               ┃
   ┃ File   : src/app/services/page.tsx                                    ┃
   ┃ Role   : Main platform-marketing storefront page                      ┃
   ┃ Status : Production Ready                                             ┃
   ┃ License: Proprietary — Money Records LLC                              ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";

import Container from "@/components/Container";

import ServicesCTA from "@/sections/ServicesCTA";
import ServicesFAQ from "@/sections/ServicesFAQ";
import ServicesHero from "@/sections/ServicesHero";
import ServicesHowItWorks from "@/sections/ServicesHowItWorks";
import ServicesPlatforms from "@/sections/ServicesPlatforms";

/* --------------------------------------------------------------------- */
/* Metadata                                                               */
/* --------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Music Marketing Services",
  description:
    "Explore individual Money Records marketing services for Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO, Press and PR, radio, SoundCloud, and artist branding.",

  alternates: {
    canonical: "/services",
  },

  openGraph: {
    type: "website",
    url: "/services",
    title: "Music Marketing Services | Money Records",
    description:
      "Choose a platform and explore individual campaign options, pricing, deliverables, timing, requirements, and campaign standards.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Music Marketing Services | Money Records",
    description:
      "Explore individual platform-marketing services and Spotify campaign options from Money Records.",
  },
};

/* --------------------------------------------------------------------- */
/* Services Page                                                          */
/* --------------------------------------------------------------------- */

export default function ServicesPage() {
  return (
    <div
      id="top"
      className="mr-page overflow-hidden"
    >
      {/* --------------------------------------------------------------- */}
      {/* Services Hero                                                   */}
      {/* --------------------------------------------------------------- */}

      <div className="scroll-mt-28 pt-2 md:pt-4">
        <Container size="wide">
          <ServicesHero
            eyebrow="Money Records Platform Marketing"
            title={
              <>
                Choose Your Platform.{" "}
                <span className="mr-text-gradient">
                  Select Your Campaign.
                </span>
              </>
            }
            subtitle="Explore individual marketing services for Spotify, Apple Music, Instagram, TikTok, YouTube, VEVO, Press and PR, radio, SoundCloud, and artist branding. Each platform has its own status, pricing, deliverables, requirements, and campaign details."
            primaryCtaHref="#platforms"
            primaryCtaLabel="Explore Platforms"
            secondaryCtaHref="#how-it-works"
            secondaryCtaLabel="How It Works"
          />
        </Container>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* Platform Storefront                                             */}
      {/* --------------------------------------------------------------- */}

      <ServicesPlatforms
        id="platforms"
        consultationHref="#contact"
        consultationLabel="Ask About a Platform"
        spotifyHref="/services/spotify"
        spotifyLabel="View Spotify Campaigns"
      />

      {/* --------------------------------------------------------------- */}
      {/* Storefront Process                                              */}
      {/* --------------------------------------------------------------- */}

      <ServicesHowItWorks
        id="how-it-works"
        primaryCtaHref="/services/spotify"
        primaryCtaLabel="Explore Spotify Campaigns"
        secondaryCtaHref="#contact"
        secondaryCtaLabel="Ask About a Service"
      />

      {/* --------------------------------------------------------------- */}
      {/* Frequently Asked Questions                                      */}
      {/* --------------------------------------------------------------- */}

      <ServicesFAQ
        id="faq"
        contactHref="#contact"
        contactLabel="Ask Money Records"
        platformsHref="#platforms"
        platformsLabel="Explore All Platforms"
        spotifyHref="/services/spotify"
        spotifyLabel="View Spotify Campaigns"
      />

      {/* --------------------------------------------------------------- */}
      {/* Final Conversion Section                                       */}
      {/* --------------------------------------------------------------- */}

      <ServicesCTA
        id="contact"
        primaryHref="/services/spotify"
        primaryLabel="Explore Spotify Campaigns"
        platformsHref="#platforms"
        platformsLabel="View All Platforms"
        email="info@moneyrecords.io"
        instagramHref="https://instagram.com/kingpharaohreal"
        instagramHandle="@kingpharaohreal"
        submissionHref="mailto:info@moneyrecords.io?subject=Money%20Records%20Artist%20Submission"
        submissionLabel="Submit Music to the Label"
      />
    </div>
  );
}