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
  const url = `https://www.snappy-fix.com/tools/${tool.slug}`;
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

  const toolUrl = `https://www.snappy-fix.com/tools/${tool.slug}`;

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
        name: tool.name,
        item: toolUrl,
      },
    ],
  };

  return { toolStructuredData, breadcrumbSchema };
}
