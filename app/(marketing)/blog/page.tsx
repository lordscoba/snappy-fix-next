import type { Metadata } from "next";
import BlogPageClient from "./Blogpageclient ";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Blog & Insights | Web Development, Design & SEO Guides",
  description:
    "Read the latest articles from Snappy-Fix Technologies on web development, UI/UX design, SEO, performance optimization, design systems, and building digital products that scale.",
  keywords: [
    "web development blog",
    "UI UX design articles",
    "SEO guides",
    "Next.js tutorials",
    "design systems",
    "frontend engineering",
    "digital product development",
    "tech blog Nigeria",
    "Snappy-Fix blog",
    "web performance tips",
  ],
  authors: [{ name: "Snappy-Fix Technologies" }],
  alternates: {
    canonical: "https://www.snappy-fix.com/blog",
    types: {
      "application/rss+xml": "https://www.snappy-fix.com/feed.xml",
    },
  },
  openGraph: {
    title: "Blog & Insights | Snappy-Fix Technologies",
    description:
      "Practical guides on web development, design systems, SEO, and scaling digital products from the Snappy-Fix team.",
    url: "https://www.snappy-fix.com/blog",
    siteName: "Snappy-Fix Technologies",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "https://www.snappy-fix.com/images/snappy-fix-logo.png",
        width: 1200,
        height: 630,
        alt: "Snappy-Fix Technologies Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Insights | Snappy-Fix Technologies",
    description:
      "Practical guides on web development, design systems, SEO, and scaling digital products.",
    creator: "@snappyfix",
    site: "@snappyfix",
    images: [
      {
        url: "https://www.snappy-fix.com/images/snappy-fix-logo.png",
        alt: "Snappy-Fix Technologies Blog",
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
    // Blog page entity
    {
      "@type": "Blog",
      "@id": "https://www.snappy-fix.com/blog",
      name: "Snappy-Fix Blog & Insights",
      description:
        "Practical guides on web development, UI/UX design, SEO, performance optimization, and building digital products from the Snappy-Fix team.",
      url: "https://www.snappy-fix.com/blog",
      inLanguage: "en-NG",
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
      image: {
        "@type": "ImageObject",
        url: "https://www.snappy-fix.com/images/snappy-fix-logo.png",
        width: 1200,
        height: 630,
      },
    },
    // Breadcrumb
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.snappy-fix.com/blog#breadcrumb",
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
      ],
    },
    // WebPage entity
    {
      "@type": "WebPage",
      "@id": "https://www.snappy-fix.com/blog#webpage",
      url: "https://www.snappy-fix.com/blog",
      name: "Blog & Insights | Snappy-Fix Technologies",
      description:
        "Read the latest articles from Snappy-Fix Technologies on web development, UI/UX design, SEO, and digital product development.",
      inLanguage: "en-NG",
      isPartOf: {
        "@id": "https://www.snappy-fix.com",
      },
      breadcrumb: {
        "@id": "https://www.snappy-fix.com/blog#breadcrumb",
      },
      publisher: {
        "@type": "Organization",
        name: "Snappy-Fix Technologies",
        url: "https://www.snappy-fix.com",
      },
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  return (
    <>
      <Script
        id="blog-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPageClient />
    </>
  );
}
