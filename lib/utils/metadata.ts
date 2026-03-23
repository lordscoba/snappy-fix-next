import { data } from "@/data/PortifolioData";
import { toolCategories } from "@/data/toolsCategoryData";
import { tools } from "@/data/toolsData";

// ─── Meta description field decision ─────────────────────────────────────────
// Google's ideal meta description: 120–160 characters.
// tool.description: 100–184 chars (optimised for SERP display — use this).
// tool.longDescription: 280–460 chars (always truncated in SERPs — use for
//   page body content and JSON-LD only, not for meta description).

// ─── Tool metadata ────────────────────────────────────────────────────────────
export function getToolMetadata(slug: string) {
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: "Tool Not Found | Snappy-Fix",
      robots: { index: false, follow: false },
    };
  }

  // Use description for meta (120–160 chars) — longDescription is too long for SERPs.
  const metaDescription = tool.description;
  const url = `https://www.snappy-fix.com/tools/${tool.slug}`;
  // Tool-specific OG image: fall back to global logo if no tool image exists.
  const ogImage = `/images/tools/${tool.slug}-og.png`;
  const ogImageFallback = "/images/snappy-fix-logo.png";

  return {
    title: tool.name,
    description: metaDescription,
    keywords: tool.keywords || [],
    category: tool.category,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: tool.name,
      description: metaDescription,
      url,
      siteName: "Snappy-Fix Technologies",
      locale: "en_US",
      type: "website" as const,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${tool.name} — Snappy-Fix Free Tool`,
        },
        // Fallback
        {
          url: ogImageFallback,
          width: 1200,
          height: 630,
          alt: `${tool.name} — Snappy-Fix Technologies`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image" as const,
      title: tool.name,
      description: metaDescription,
      site: "@snappyfix",
      images: [ogImage],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large" as const,
      },
    },
  };
}

// ─── Tool JSON-LD schemas ─────────────────────────────────────────────────────
export function getToolSchemas(slug: string) {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return null;

  const toolUrl = `https://www.snappy-fix.com/tools/${tool.slug}`;
  const logoUrl = "https://www.snappy-fix.com/images/snappy-fix-logo.png";

  // SoftwareApplication — uses longDescription for full detail in structured data
  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    url: toolUrl,
    description: tool.longDescription || tool.description,
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: tool.category || "Online Tools",
    operatingSystem: "Web — works in any modern browser",
    browserRequirements:
      "Requires JavaScript. Supports Chrome, Firefox, Safari, Edge.",
    inLanguage: "en",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/OnlineOnly",
    },
    provider: {
      "@type": "Organization",
      name: "Snappy-Fix Technologies",
      url: "https://www.snappy-fix.com",
      logo: logoUrl,
    },
    image: logoUrl,
    keywords: (tool.keywords || []).slice(0, 10).join(", "),
  };

  // BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        name: "Free Online Tools",
        item: "https://www.snappy-fix.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: toolUrl,
      },
    ],
  };

  // WebPage — helps Google understand the page context
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: tool.name,
    url: toolUrl,
    description: tool.description,
    isPartOf: {
      "@type": "WebSite",
      name: "Snappy-Fix Technologies",
      url: "https://www.snappy-fix.com",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
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
          name: "Tools",
          item: "https://www.snappy-fix.com/tools",
        },
        { "@type": "ListItem", position: 3, name: tool.name, item: toolUrl },
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Snappy-Fix Technologies",
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
  };

  return { toolStructuredData, breadcrumbSchema, webPageSchema };
}

// ─── Category metadata ────────────────────────────────────────────────────────
export function getCategoryMetadata(slug: string) {
  const category = toolCategories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found | Snappy-Fix",
      robots: { index: false, follow: false },
    };
  }

  const metaDescription = category.description;
  const url = `https://www.snappy-fix.com/tools/${category.slug}`;
  const ogImage = "/images/snappy-fix-logo.png";

  return {
    title: category.name,
    description: metaDescription,
    keywords: category.keywords || [],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: category.name,
      description: metaDescription,
      url,
      siteName: "Snappy-Fix Technologies",
      locale: "en_US",
      type: "website" as const,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${category.name} — Snappy-Fix Technologies`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image" as const,
      title: category.name,
      description: metaDescription,
      site: "@snappyfix",
      images: [ogImage],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large" as const,
      },
    },
  };
}

/**
 * 1. Schema for the Main Tools Hub (/tools)
 */
export function getMainToolsBreadcrumb() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        name: "Tools",
        item: "https://www.snappy-fix.com/tools",
      },
    ],
  };
}

/**
 * 2. Schema for Category Pages (/tools/[category])
 */
export function getCategoryBreadcrumb(slug: string) {
  const category = toolCategories.find((c) => c.slug === slug);
  if (!category) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        name: "Tools",
        item: "https://www.snappy-fix.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `https://www.snappy-fix.com/tools/${category.slug}`,
      },
    ],
  };
}

export function getPortfolioBreadcrumb(slug: string) {
  const portfolio = data.find((p) => p.slug === slug);

  if (!portfolio) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        name: "Portfolio",
        item: "https://www.snappy-fix.com/portfolio",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: portfolio.name,
        item: `https://www.snappy-fix.com/portfolio/${portfolio.slug}`,
      },
    ],
  };
}

export function getPortfolioPersonSchema(slug: string) {
  const portfolio = data.find((p) => p.slug === slug);
  if (!portfolio) return null;

  const baseUrl = "https://www.snappy-fix.com";
  const profileUrl = `${baseUrl}/portfolio/${portfolio.slug}`;

  // Extract skills for knowsAbout
  const skills = portfolio.skills.flatMap((skill) => [
    skill.skill_main,
    ...skill.skill_level.map((lvl) => lvl.skill_type),
  ]);

  // Normalize social links
  const sameAs = [
    portfolio.github_link,
    portfolio.linkdln_link,
    portfolio.twitter_link,
    portfolio.fb_link,
    portfolio.instagram_link,
    portfolio.link_tree,
  ]
    .filter(Boolean)
    .map((url) => (url?.startsWith("http") ? url : `https://${url ?? ""}`));

  return {
    "@context": "https://schema.org",
    "@type": "Person",

    "@id": `${profileUrl}#person`,

    name: portfolio.name,
    url: profileUrl,
    image: portfolio.image,

    description: portfolio.about,

    jobTitle: "Software Developer",

    worksFor: {
      "@type": "Organization",
      name: "Snappy-fix Technologies",
      url: "https://www.snappy-fix.com",
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": profileUrl,
    },

    knowsAbout: skills,

    sameAs: sameAs,

    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Federal University of Technology Owerri",
    },

    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/Project",
        userInteractionCount: portfolio.projects,
      },
    ],

    experience: {
      "@type": "QuantitativeValue",
      value: portfolio.years_experience,
      unitText: "years",
    },
  };
}
