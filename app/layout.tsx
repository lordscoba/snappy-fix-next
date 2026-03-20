import "./globals.css";
import type { Metadata } from "next";
import Footer from "../components/Layout/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import ReduxProvider from "./providers";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.snappy-fix.com"),

  title: {
    default:
      "Snappy-Fix Technologies | Software Development Company & Free Online Image Tools",
    template: "%s | Snappy-Fix Technologies",
  },

  description:
    "Snappy-Fix Technologies is a Nigerian software development company building scalable websites, web applications, and mobile apps. We also provide powerful free online image tools including image converters, optimizers, analyzers, resizers, and SEO utilities used by developers, designers, and marketers worldwide.",

  keywords: [
    "software development company",
    "web development Nigeria",
    "mobile app development Nigeria",
    "web application development",
    "image tools online",
    "free image tools",
    "image converter",
    "image optimizer",
    "resize image online",
    "svg optimizer",
    "seo image tools",
    "frontend development",
    "backend development",
    "flutter development",
    "react development",
    "full stack developers",
    "tech company Nigeria",
    "software company Nigeria",
    "Uyo",
    "Port Harcourt",
    "Lagos",
    "Nigeria",
  ],

  authors: [{ name: "Snappy-Fix Technologies" }],
  creator: "Snappy-Fix Technologies",
  publisher: "Snappy-Fix Technologies",

  category: "Technology",

  applicationName: "Snappy-Fix Technologies",

  icons: {
    icon: "/images/snappy-fix-logo.png",
    shortcut: "/images/snappy-fix-logo.png",
    apple: "/images/snappy-fix-logo.png",
  },

  alternates: {
    canonical: "https://www.snappy-fix.com",
    types: {
      "application/rss+xml": "https://www.snappy-fix.com/feed.xml",
    },
  },

  openGraph: {
    title: {
      default:
        "Snappy-Fix Technologies | Software Development Company in Nigeria",
      template: "%s | Snappy-Fix Technologies",
    },
    description:
      "We design and build scalable web and mobile applications for Nigerian and global businesses.",
    url: "https://www.snappy-fix.com",
    siteName: "Snappy-Fix Technologies",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/snappy-fix-logo.png",
        width: 1200,
        height: 630,
        alt: "Snappy-Fix Technologies Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: {
      default:
        "Snappy-Fix Technologies | Software Development Company in Nigeria",
      template: "%s | Snappy-Fix Technologies",
    },
    description:
      "Snappy-Fix builds scalable web, mobile, and cloud applications for businesses worldwide.",
    creator: "@snappyfix",
    site: "@snappyfix",
    images: [
      {
        url: "/images/snappy-fix-logo.png",
        alt: "Snappy-Fix Technologies Logo",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // themeColor: "#0f172a",
  referrer: "origin-when-cross-origin",

  other: {
    "Content-Security-Policy": "upgrade-insecure-requests",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Snappy-Fix Technologies",
    url: "https://www.snappy-fix.com",
    logo: "https://www.snappy-fix.com/images/snappy-fix-logo.png",
    sameAs: [
      "https://web.facebook.com/p/Snappy-fix-Technologies-100064249260204/?_rdc=1&_rdr#",
    ],
    description:
      "Snappy-Fix Technologies builds scalable web applications, mobile apps, and developer tools for businesses across Nigeria and globally.",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Uyo",
        addressRegion: "Akwa Ibom",
        addressCountry: "Nigeria",
      },
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "snappyfix.tech@gmail.com",
      areaServed: "NG",
      availableLanguage: ["English"],
    },
  };
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <ReduxProvider>{children}</ReduxProvider>
        <Footer />
        <SpeedInsights />
        <Analytics />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </body>
      <GoogleAnalytics gaId="G-XLRF67HQ9E" />
    </html>
  );
}
