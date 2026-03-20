import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import BlogSearchPageClient from "./BlogListClientl";
// import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Search & Discover Articles | Find Guides by Topic & Category",
  description:
    "Search and filter all Snappy-Fix blog articles by category, topic, or keyword. Find guides on web development, UI/UX design, SEO, performance, design systems, and more.",
  keywords: [
    "search blog articles",
    "find web development guides",
    "filter blog by category",
    "featured blog posts",
    "exclusive content",
    "web development articles",
    "design articles",
    "SEO guides Nigeria",
    "Snappy-Fix articles",
    "engineering blog search",
  ],
  authors: [{ name: "Snappy-Fix Technologies" }],
  alternates: {
    canonical: "https://www.snappy-fix.com/blog/list",
    types: {
      "application/rss+xml": "https://www.snappy-fix.com/feed.xml",
    },
  },
  openGraph: {
    title: "Search & Discover Articles | Snappy-Fix Blog",
    description:
      "Search and filter all Snappy-Fix articles by category, featured, exclusive, or keyword. Find the perfect guide instantly.",
    url: "https://www.snappy-fix.com/blog/list",
    siteName: "Snappy-Fix Technologies",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "https://www.snappy-fix.com/images/snappy-fix-logo.png",
        width: 1200,
        height: 630,
        alt: "Snappy-Fix Blog Search",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Search & Discover Articles | Snappy-Fix Blog",
    description:
      "Search and filter all Snappy-Fix articles by category, featured, exclusive, or keyword.",
    creator: "@snappyfix",
    site: "@snappyfix",
    images: [
      {
        url: "https://www.snappy-fix.com/images/snappy-fix-logo.png",
        alt: "Snappy-Fix Blog Search",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ── JSON-LD ───────────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // SearchResultsPage entity — tells Google this is a search/filter page
    {
      "@type": "SearchResultsPage",
      "@id": "https://www.snappy-fix.com/blog/list",
      name: "Search Snappy-Fix Blog Articles",
      description:
        "Search and filter all Snappy-Fix blog articles by category, topic, featured status, or keyword.",
      url: "https://www.snappy-fix.com/blog/list",
      inLanguage: "en-NG",
      isPartOf: {
        "@type": "Blog",
        "@id": "https://www.snappy-fix.com/blog",
        name: "Snappy-Fix Blog & Insights",
        url: "https://www.snappy-fix.com/blog",
      },
      publisher: {
        "@type": "Organization",
        name: "Snappy-Fix Technologies",
        url: "https://www.snappy-fix.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.snappy-fix.com/images/snappy-fix-logo.png",
          width: 1200,
          height: 630,
        },
      },
    },
    // Breadcrumb
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.snappy-fix.com/blog/list#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.snappy-fix.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog & Insights",
          item: "https://www.snappy-fix.com/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Search Articles",
          item: "https://www.snappy-fix.com/blog/list",
        },
      ],
    },
    // WebPage entity
    {
      "@type": "WebPage",
      "@id": "https://www.snappy-fix.com/blog/list#webpage",
      url: "https://www.snappy-fix.com/blog/list",
      name: "Search & Discover Articles | Snappy-Fix Blog",
      description:
        "Search and filter all Snappy-Fix blog articles by category, topic, or keyword.",
      inLanguage: "en-NG",
      isPartOf: {
        "@id": "https://www.snappy-fix.com",
      },
      breadcrumb: {
        "@id": "https://www.snappy-fix.com/blog/list#breadcrumb",
      },
      publisher: {
        "@type": "Organization",
        name: "Snappy-Fix Technologies",
        url: "https://www.snappy-fix.com",
      },
    },
  ],
};

export default function BlogListPage() {
  return (
    <>
      <Script
        id="blog-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <BlogSearchPageClient />
      </Suspense>
    </>
  );
}
