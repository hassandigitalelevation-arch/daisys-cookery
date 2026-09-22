import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans, Dancing_Script } from "next/font/google";

import { MotionProvider } from "@/components/motion/motion-provider";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { DemoBanner } from "@/components/site/demo-banner";
import { FloatingCta } from "@/components/site/floating-cta";
import { site } from "@/data/site";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
  weight: "700",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Celebration Cakes in Chattogram`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    title: site.name,
    description: site.description,
    siteName: site.name,
    images: [
      {
        url: site.logo.src,
        width: 1500,
        height: 1500,
        alt: site.logo.alt,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#fffbf6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${fraunces.variable} ${dancingScript.variable}`}>
      <body className="min-h-screen">
        <MotionProvider>
          <DemoBanner />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <FloatingCta />
        </MotionProvider>
      </body>
    </html>
  );
}