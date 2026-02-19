import "./globals.css";
import "animate.css";

import type { Metadata } from "next";
import Footer from "../components/Layout/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.snappy-fix.com"),

  title: {
    default:
      "Snappy-Fix Technologies | Software Development Company in Nigeria",
    template: "%s | Snappy-Fix Technologies",
  },

  description:
    "Snappy-Fix Technologies is a Nigerian software development company based in Uyo, building scalable web and mobile applications for startups and enterprises across Nigeria and globally.",

  keywords: [
    "Software development company Nigeria",
    "Web development Nigeria",
    "Mobile app development Nigeria",
    "Flutter development Nigeria",
    "React development Nigeria",
    "Full-stack developers Nigeria",
    "Tech company in Uyo",
    "Software company in Lagos",
    "Software company in Abuja",
  ],

  authors: [{ name: "Snappy-Fix Technologies" }],
  creator: "Snappy-Fix Technologies",
  publisher: "Snappy-Fix Technologies",

  category: "Technology",

  icons: {
    icon: "/images/snappy-fix-logo.png",
    shortcut: "/images/snappy-fix-logo.png",
    apple: "/images/snappy-fix-logo.png",
  },

  openGraph: {
    title:
      "Snappy-Fix Technologies | Leading Software Development Company in Nigeria",
    description:
      "We design and build scalable web and mobile applications for Nigerian and global businesses.",
    url: "https://www.snappy-fix.com",
    siteName: "Snappy-Fix Technologies",
    locale: "en_NG", // 🇳🇬 Important
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
    title: "Snappy-Fix Technologies | Software Development Company in Nigeria",
    description: "Building scalable digital products across Nigeria.",
    images: ["/images/snappy-fix-logo.png"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Snappy-Fix Technologies",
    url: "https://www.snappy-fix.com",
    logo: "https://www.snappy-fix.com/logo.png",
    sameAs: [
      "https://www.linkedin.com/company/snappy-fix",
      "https://twitter.com/snappyfix",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Uyo, Akwa Ibom State",
      addressLocality: "Uyo",
      addressRegion: "Akwa Ibom",
      addressCountry: "Nigeria",
    },
  };
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <main className="flex-1">{children}</main>
        <Footer />
        <script
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
