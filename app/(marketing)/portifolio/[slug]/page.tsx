import { Heroo, About, Skills } from "../../../../components/portifolio";
import { data, Tester } from "@/data/PortifolioData";
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

/**
 * Helper to find portfolio by slug OR id
 */
const findPortfolio = (slug: string): Tester | undefined => {
  // Check if the slug is a numeric string (e.g., "4")
  const isNumeric = /^\d+$/.test(slug);

  if (isNumeric) {
    const id = parseInt(slug, 10);
    return data.find((item) => item.id === id);
  }

  return data.find((item) => item.slug === slug);
};

export async function generateStaticParams() {
  // We include both slugs and IDs to ensure both are statically generated
  const params = data.flatMap((item) => [
    { slug: item.slug },
    { slug: item.id.toString() },
  ]);
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = findPortfolio(slug); // Use helper

  const baseUrl = "https://www.snappy-fix.com";

  if (!portfolio) {
    return {
      title: "Portfolio Not Found | Snappy-fix Technologies",
      description: "The requested portfolio profile does not exist.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${portfolio.name} | Developer Portfolio`;
  const description = portfolio.text;
  const url = `${baseUrl}/portfolio/${portfolio.slug}`;
  const image = portfolio.image || "/images/snappy-fix-logo.png";

  const rawSkills = portfolio.skills.flatMap((s) =>
    s.skill_level.map((l) => l.skill_type),
  );

  const localizedKeywords = rawSkills.flatMap((skill) => [
    skill,
    `${skill} in Uyo`,
    `${skill} in Nigeria`,
  ]);

  const brandKeywords = [
    portfolio.name,
    `${portfolio.name} portfolio`,
    "Snappy-fix Technologies",
  ];

  const keywords = [...new Set([...localizedKeywords, ...brandKeywords])];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
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
      title,
      description,
      images: [image],
    },
  };
}

export default async function PortfolioPage({ params }: { params: Params }) {
  const { slug } = await params;
  const portfolio = findPortfolio(slug); // Use helper

  if (!portfolio) return notFound();

  // Note: Your schema/breadcrumb helpers likely use the string slug
  // So we pass portfolio.slug (the string) instead of the input 'slug'
  const personSchema = getPortfolioPersonSchema(portfolio.slug);
  const breadcrumb = getPortfolioBreadcrumb(portfolio.slug);

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
