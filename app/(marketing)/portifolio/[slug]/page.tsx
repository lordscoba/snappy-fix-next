import { Heroo, About, Skills } from "../../../../components/portifolio";
import { data } from "@/data/PortifolioData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import {
  getPortfolioBreadcrumb,
  getPortfolioPersonSchema,
} from "@/lib/utils/metadata";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  return data.map((item) => ({
    slug: item.slug, // The key must match the folder name [slug]
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = data.find((item) => item.slug === slug);

  const baseUrl = "https://www.snappy-fix.com";

  if (!portfolio) {
    return {
      title: "Portfolio Not Found | Snappy-fix Technologies",
      description: "The requested portfolio profile does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${portfolio.name} | Developer Portfolio`;
  const description = portfolio.text;
  const url = `${baseUrl}/portfolio/${portfolio.slug}`;
  const image = portfolio.image || "/images/snappy-fix-logo.png";

  // 1. Extract all unique skill types (e.g., "React.js", "PHP", "Figma")
  const rawSkills = portfolio.skills.flatMap((s) =>
    s.skill_level.map((l) => l.skill_type),
  );

  // 2. Generate the localized variations
  const localizedKeywords = rawSkills.flatMap((skill) => [
    skill, // "React.js"
    `${skill} in Uyo`, // "React.js in Uyo"
    `${skill} in Nigeria`, // "React.js in Nigeria"
  ]);

  // 3. Add personal branding keywords
  const brandKeywords = [
    portfolio.name,
    `${portfolio.name} portfolio`,
    "Snappy-fix Technologies",
  ];

  // 4. Combine and remove duplicates
  const keywords = [...new Set([...localizedKeywords, ...brandKeywords])];

  return {
    title: title,
    description: description,
    keywords: keywords,

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: title,
      description: description,
      url: url,
      type: "profile",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${portfolio.name} - Developer Portfolio`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [image],
    },
  };
}

/**
 * Portfolio Page
 */
export default async function PortfolioPage({ params }: { params: Params }) {
  const { slug } = await params;
  const portfolio = data.find((item) => item.slug === slug);
  const personSchema = getPortfolioPersonSchema(slug);
  const breadcrumb = getPortfolioBreadcrumb(slug);
  if (!portfolio) return notFound();

  return (
    <div>
      {breadcrumb && (
        <Script
          id="portfolio-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumb),
          }}
        />
      )}

      {personSchema && (
        <Script
          id="portfolio-person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
      )}

      <Heroo portfolio={portfolio} />
      <About portfolio={portfolio} />
      <Skills portfolio={portfolio} />
    </div>
  );
}
