// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Root Layout                                          ┃
   ┃ File   : src/app/layout.tsx                                          ┃
   ┃ Role   : Metadata, fonts, structured data, providers, and site shell ┃
   ┃ Status : Production Ready                                            ┃
   ┃ License: Proprietary — Money Records LLC                             ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type {
  Metadata,
  Viewport,
} from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import type {
  ReactNode,
} from "react";

import NavBar from "@/components/NavBar";
import Providers from "@/app/providers";

import "./globals.css";

/* --------------------------------------------------------------------- */
/* Fonts                                                                  */
/* --------------------------------------------------------------------- */

const geistSans = Geist({
  variable:
    "--font-geist-sans",

  subsets: [
    "latin",
  ],

  display:
    "swap",

  preload:
    true,

  fallback: [
    "Inter",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "sans-serif",
  ],
});

const geistMono = Geist_Mono({
  variable:
    "--font-geist-mono",

  subsets: [
    "latin",
  ],

  display:
    "swap",

  preload:
    false,

  fallback: [
    "SFMono-Regular",
    "Consolas",
    "Liberation Mono",
    "monospace",
  ],
});

/* --------------------------------------------------------------------- */
/* Site Configuration                                                     */
/* --------------------------------------------------------------------- */

const SITE_NAME =
  "Money Records LLC";

const SITE_SHORT_NAME =
  "Money Records";

const SITE_TITLE =
  "Money Records | Record Label & Music Marketing";

const SITE_DESCRIPTION =
  "Money Records is an independent record label and premium music marketing company offering artist development, global distribution, Spotify campaigns, Apple Music promotion, social media marketing, public relations, VEVO support, and complete release rollouts.";

const SITE_EMAIL =
  "info@moneyrecords.io";

const DEFAULT_SITE_URL =
  "https://moneyrecords.io";

/**
 * Returns a safe absolute site URL without allowing a malformed environment
 * variable to break the production build.
 */
function getSiteUrl(): URL {
  const configuredUrl =
    process.env
      .NEXT_PUBLIC_SITE_URL
      ?.trim();

  if (!configuredUrl) {
    return new URL(
      DEFAULT_SITE_URL,
    );
  }

  try {
    const parsedUrl =
      new URL(
        configuredUrl,
      );

    if (
      parsedUrl.protocol !==
        "https:" &&
      parsedUrl.protocol !==
        "http:"
    ) {
      return new URL(
        DEFAULT_SITE_URL,
      );
    }

    return parsedUrl;
  } catch {
    return new URL(
      DEFAULT_SITE_URL,
    );
  }
}

const siteUrl =
  getSiteUrl();

const siteOrigin =
  siteUrl.origin;

/* --------------------------------------------------------------------- */
/* Global Metadata                                                        */
/* --------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase:
    siteUrl,

  applicationName:
    SITE_NAME,

  title: {
    default:
      SITE_TITLE,

    template:
      "%s | Money Records",
  },

  description:
    SITE_DESCRIPTION,

  keywords: [
    "Money Records",
    "Money Records LLC",
    "record label",
    "independent record label",
    "music marketing",
    "artist development",
    "music distribution",
    "Spotify marketing",
    "Apple Music marketing",
    "Instagram music marketing",
    "TikTok music promotion",
    "YouTube music marketing",
    "VEVO distribution",
    "music public relations",
    "release campaign",
    "independent artist marketing",
    "artist promotion",
    "music promotion services",
  ],

  authors: [
    {
      name:
        SITE_NAME,

      url:
        siteUrl,
    },
  ],

  creator:
    SITE_NAME,

  publisher:
    SITE_NAME,

  category:
    "Music",

  referrer:
    "origin-when-cross-origin",

  icons: {
    icon: [
      {
        url:
          "/favicon.ico",

        type:
          "image/x-icon",
      },
    ],

    shortcut:
      "/favicon.ico",

    apple:
      "/favicon.ico",
  },

  openGraph: {
    type:
      "website",

    locale:
      "en_US",

    siteName:
      SITE_NAME,

    title:
      SITE_TITLE,

    description:
      SITE_DESCRIPTION,
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      SITE_TITLE,

    description:
      SITE_DESCRIPTION,
  },

  robots: {
    index:
      true,

    follow:
      true,

    nocache:
      false,

    googleBot: {
      index:
        true,

      follow:
        true,

      noimageindex:
        false,

      "max-image-preview":
        "large",

      "max-snippet":
        -1,

      "max-video-preview":
        -1,
    },
  },

  formatDetection: {
    email:
      false,

    address:
      false,

    telephone:
      false,
  },
};

/* --------------------------------------------------------------------- */
/* Viewport                                                               */
/* --------------------------------------------------------------------- */

export const viewport: Viewport = {
  width:
    "device-width",

  initialScale:
    1,

  maximumScale:
    5,

  viewportFit:
    "cover",

  colorScheme:
    "dark",

  themeColor:
    "#050506",
};

/* --------------------------------------------------------------------- */
/* Structured Data                                                        */
/* --------------------------------------------------------------------- */

const organizationStructuredData = {
  "@context":
    "https://schema.org",

  "@type":
    "Organization",

  "@id":
    `${siteOrigin}/#organization`,

  name:
    SITE_NAME,

  legalName:
    SITE_NAME,

  alternateName:
    SITE_SHORT_NAME,

  url:
    siteOrigin,

  logo:
    `${siteOrigin}/brand/mr-crest.png`,

  image:
    `${siteOrigin}/brand/mr-crest.png`,

  description:
    SITE_DESCRIPTION,

  email:
    SITE_EMAIL,

  foundingDate:
    "2019",

  contactPoint: {
    "@type":
      "ContactPoint",

    email:
      SITE_EMAIL,

    contactType:
      "customer support",

    availableLanguage: [
      "English",
    ],
  },

  knowsAbout: [
    "Record Label Services",
    "Artist Development",
    "Music Distribution",
    "Music Marketing",
    "Spotify Promotion",
    "Apple Music Promotion",
    "Social Media Marketing",
    "Music Public Relations",
    "VEVO Distribution",
    "Release Campaigns",
  ],
};

const websiteStructuredData = {
  "@context":
    "https://schema.org",

  "@type":
    "WebSite",

  "@id":
    `${siteOrigin}/#website`,

  name:
    SITE_NAME,

  alternateName:
    SITE_SHORT_NAME,

  url:
    siteOrigin,

  description:
    SITE_DESCRIPTION,

  publisher: {
    "@id":
      `${siteOrigin}/#organization`,
  },

  inLanguage:
    "en-US",
};

/**
 * Serializes JSON-LD safely for insertion into an inline script.
 */
function serializeStructuredData(
  data: object,
): string {
  return JSON.stringify(data)
    .replaceAll(
      "<",
      "\\u003c",
    )
    .replaceAll(
      "\u2028",
      "\\u2028",
    )
    .replaceAll(
      "\u2029",
      "\\u2029",
    );
}

/* --------------------------------------------------------------------- */
/* Root Layout                                                            */
/* --------------------------------------------------------------------- */

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          "min-h-screen",
          "bg-[#050506]",
          "text-white",
          "antialiased",
        ].join(" ")}
      >
        <Providers>
          <div className="mr-site min-h-screen">
            {/* Accessibility skip link */}

            <a
              className="mr-skip-link"
              href="#main-content"
            >
              Skip to main content
            </a>

            {/* Global navigation and campaign-cart control */}

            <NavBar />

            {/*
             * A div is used instead of a second <main> because the cart,
             * checkout, success, and cancelled pages already contain their
             * own main landmarks.
             */}

            <div
              id="main-content"
              tabIndex={-1}
              className="outline-none"
            >
              {children}
            </div>
          </div>
        </Providers>

        {/* Organization structured data */}

        <script
          id="money-records-organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              serializeStructuredData(
                organizationStructuredData,
              ),
          }}
        />

        {/* Website structured data */}

        <script
          id="money-records-website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              serializeStructuredData(
                websiteStructuredData,
              ),
          }}
        />
      </body>
    </html>
  );
}