import { data } from "@/data/PortifolioData";
import { toolCategories } from "@/data/toolsCategoryData";
import { tools } from "@/data/toolsData";

export function getToolMetadata(slug: string) {
  // 1. Find the tool based on the URL slug
  const tool = tools.find((t) => t.slug === slug);

  // 2. Fallback if tool isn't found
  if (!tool) {
    return {
      title: "Tool Not Found | Snappy-fix",
    };
  }

  // 3. Define your dynamic values
  const title = `${tool.name}`;
  const description = tool.longDescription || tool.description;
  const url = `https://snappy-fix.com/tools/${tool.slug}`;
  const ogImage = "/images/snappy-fix-logo.png";

  return {
    title: title,
    description: description,
    keywords: tool.keywords || [],
    category: tool.category,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: title,
      description: description,
      url: url,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${tool.name} - Snappy-fix`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage],
    },
  };
}

export function getToolSchemas(slug: string) {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return null;

  const toolUrl = `https://snappy-fix.com/tools/${tool.slug}`;

  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: tool.category || "Online Tools",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    inLanguage: "en",
    url: toolUrl,
    description: tool.longDescription || tool.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://snappy-fix.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://snappy-fix.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.name,
        item: toolUrl,
      },
    ],
  };

  return { toolStructuredData, breadcrumbSchema };
}

export function getCategoryMetadata(slug: string) {
  // 1. Find the category based on the slug
  const category = toolCategories.find((c) => c.slug === slug);

  // 2. Fallback
  if (!category) {
    return {
      title: "Category Not Found | Snappy-fix",
    };
  }

  // 3. Define dynamic values
  const title = `${category.name}`;
  const description = category.longDescription || category.description;
  const url = `https://snappy-fix.com/tools/${category.slug}`;
  const ogImage = "/images/snappy-fix-logo.png";

  return {
    title: title,
    description: description,
    keywords: category.keywords || [],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: title,
      description: description,
      url: url,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${category.name} - Snappy-fix`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage],
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
        item: "https://snappy-fix.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://snappy-fix.com/tools",
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
        item: "https://snappy-fix.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://snappy-fix.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `https://snappy-fix.com/tools/${category.slug}`,
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
        item: "https://snappy-fix.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: "https://snappy-fix.com/portfolio",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: portfolio.name,
        item: `https://snappy-fix.com/portfolio/${portfolio.slug}`,
      },
    ],
  };
}

export function getPortfolioPersonSchema(slug: string) {
  const portfolio = data.find((p) => p.slug === slug);
  if (!portfolio) return null;

  const baseUrl = "https://snappy-fix.com";
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
      url: "https://snappy-fix.com",
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
