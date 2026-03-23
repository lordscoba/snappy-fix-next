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
      "Snappy-Fix Technologies | Free Online Image Tools & Software Development",
    template: "%s | Snappy-Fix",
  },

  description:
    "Free online image tools built by Snappy-Fix Technologies — convert, compress, resize, crop, watermark, and optimise images for web, print, and social media. Also a Nigerian software development company building scalable web and mobile applications.",

  keywords: [
    "free online image tools",
    "image converter online",
    "image optimizer",
    "resize image online",
    "compress image online",
    "image tools for developers",
    "image tools for designers",
    "svg optimizer",
    "favicon generator",
    "webp converter",
    "pdf to image",
    "heic to jpg",
    "remove exif data",
    "seo image tools",
    "web image optimizer",
    "software development company Nigeria",
    "web development Nigeria",
    "mobile app development Nigeria",
    "full stack developers Nigeria",
    "tech company Nigeria",
    "Port Harcourt",
    "Uyo",
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
        "Snappy-Fix Technologies | Free Online Image Tools & Software Development",
      template: "%s | Snappy-Fix",
    },
    description:
      "Free online image tools — convert, compress, resize, crop, watermark, and optimise for web, print, and social media. Also a Nigerian software development company.",
    url: "https://www.snappy-fix.com",
    siteName: "Snappy-Fix Technologies",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/images/snappy-fix-logo.png",
        width: 1200,
        height: 630,
        alt: "Snappy-Fix Technologies — Free Image Tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: {
      default:
        "Snappy-Fix Technologies | Free Online Image Tools & Software Development",
      template: "%s | Snappy-Fix",
    },
    description:
      "Free online image tools — convert, compress, resize, crop, watermark, and optimise images for web, print, and social media.",
    creator: "@snappyfix",
    site: "@snappyfix",
    images: [
      {
        url: "/images/snappy-fix-logo.png",
        alt: "Snappy-Fix Technologies",
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
  // Organization schema — links the site to the company entity in Google's
  // Knowledge Graph. Emitted on every page via the root layout.
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Snappy-Fix Technologies",
    url: "https://www.snappy-fix.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.snappy-fix.com/images/snappy-fix-logo.png",
      width: 512,
      height: 512,
    },
    sameAs: [
      "https://web.facebook.com/p/Snappy-fix-Technologies-100064249260204/",
    ],
    description:
      "Snappy-Fix Technologies provides free online image tools — converters, optimisers, compressors, and utilities for developers, designers, and marketers — alongside software development services for Nigerian and global businesses.",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Uyo",
        addressRegion: "Akwa Ibom",
        addressCountry: "NG",
      },
    },
    areaServed: [
      { "@type": "Country", name: "Nigeria" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "India" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "snappyfix.tech@gmail.com",
      availableLanguage: ["English"],
    },
    knowsAbout: [
      "Image Optimisation",
      "Web Performance",
      "PDF Processing",
      "Software Development",
      "Web Application Development",
      "Mobile App Development",
    ],
  };

  // WebSite schema — enables the Google Sitelinks Search Box in organic
  // results when Google detects the SearchAction potentialAction.
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Snappy-Fix Technologies",
    url: "https://www.snappy-fix.com",
    description:
      "Free online image tools — convert, compress, optimise, and process images for web, print, social media, and SEO.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.snappy-fix.com/tools?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
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
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <GoogleAnalytics gaId="G-XLRF67HQ9E" />
      </body>
    </html>
  );
}
