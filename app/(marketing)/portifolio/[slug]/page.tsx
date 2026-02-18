import { Heroo, About, Skills } from "../../../../components/portifolio";
import { data } from "@/data/PortifolioData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

/**
 * SEO Metadata for Portfolio Profile
 */
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = data.find((item) => item.slug === slug);

  if (!portfolio) {
    return {
      title: "Portfolio Not Found",
      description: "The requested portfolio profile does not exist.",
    };
  }

  return {
    title: `${portfolio.name} | Portfolio`,
    description: portfolio.text,
    keywords: portfolio.skills.map((skill) => skill.skill_main),
    openGraph: {
      title: `${portfolio.name} | Professional Portfolio`,
      description: portfolio.text,
      images: [portfolio.image],
    },
  };
}

/**
 * Portfolio Page
 */
export default async function PortfolioPage({ params }: { params: Params }) {
  const { slug } = await params;
  const portfolio = data.find((item) => item.slug === slug);
  if (!portfolio) return notFound();

  return (
    <div>
      <Heroo portfolio={portfolio} />
      <About portfolio={portfolio} />
      <Skills portfolio={portfolio} />
    </div>
  );
}
