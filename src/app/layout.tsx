// ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
/* ┃ Money Records — Root Layout                                           ┃
   ┃ File   : src/app/layout.tsx                                           ┃
   ┃ Role   : Global metadata + fonts + base layout shell                  ┃
   ┃ Status : Ready                                                       ┃
   ┃ License: Proprietary                                                 ┃ */
// ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Money Records LLC",
    template: "%s | Money Records LLC",
  },
  description:
    "Money Records LLC — Record Label | Global Distribution | PR • Marketing • VEVO • Rollouts. Ranked Top 2% of labels worldwide.",
  metadataBase: new URL("https://moneyrecords.io"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Money Records LLC",
    description:
      "Record Label | Global Distribution | PR • Marketing • VEVO • Rollouts. Ranked Top 2% of labels worldwide.",
    url: "https://moneyrecords.io",
    siteName: "Money Records LLC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Money Records LLC",
    description:
      "Record Label | Global Distribution | PR • Marketing • VEVO • Rollouts. Ranked Top 2% of labels worldwide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Simple shell so every page is centered like the mockup */}
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}