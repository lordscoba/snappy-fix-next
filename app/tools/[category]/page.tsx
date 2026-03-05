import Link from "next/link";
import { tools } from "@/data/toolsData";
import { toolCategories } from "@/data/toolsCategoryData";
import { NavbarMenu } from "@/components/Layout";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Define the type to match your folder name [category]
type Params = Promise<{ category: string }>;

// This ensures Next.js knows which paths exist at build time
export async function generateStaticParams() {
  return toolCategories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category: slug } = await params; // Fix: destructure 'category'
  const category = toolCategories.find((c) => c.slug === slug);

  if (!category) return {};

  return {
    title: `${category.name} | Free Online ${category.name} - Snappy Fix`,

    description: `Use Snappy Fix ${category.name.toLowerCase()} to convert, optimize, analyze and enhance images online. Fast, secure and completely free image tools built for developers, designers and marketers.`,

    keywords: [
      `${category.name.toLowerCase()}`,
      `${category.name.toLowerCase()} online`,
      `free ${category.name.toLowerCase()}`,
      "online image tools",
      "free image tools",
      "image optimization tools",
      "image conversion tools",
      "image editing tools",
      "snappy fix tools",
    ],
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category: slug } = await params; // Fix: match the folder name [category]

  const category = toolCategories.find((c) => c.slug === slug);

  if (!category) return notFound();

  const categoryTools = tools.filter((tool) => tool.category === category.name);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-white via-[#faf7ff] to-white">
      <NavbarMenu background="bg-[#884bdf]" />

      <section className="w-full max-w-7xl mx-auto px-6 pt-48 pb-20 space-y-20">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#5b32b4] to-[#fb397d] bg-clip-text text-transparent">
            {category.name}
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Explore powerful {category.name.toLowerCase()} designed to help you
            convert, optimize and enhance images quickly and securely.
          </p>

          <div className="h-1.5 w-24 bg-gradient-to-r from-[#5b32b4] to-[#fb397d] mx-auto rounded-full" />
        </header>

        {/* Tools Grid */}
        <section className="space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2b1d3a] border-l-4 border-[#fb397d] pl-4">
            Available Tools
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="group relative rounded-[2rem] border border-[#e9e1ff] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(91,50,180,0.15)]"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#2b1d3a] group-hover:text-[#5b32b4] transition-colors">
                    {tool.name}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {tool.description}
                  </p>

                  <span className="inline-flex items-center text-sm font-semibold text-[#fb397d] group-hover:gap-3 gap-1 transition-all">
                    Use Tool →
                  </span>
                </div>

                {/* Glow Hover */}
                <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-br from-[#5b32b4]/5 to-[#fb397d]/5" />
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Section */}
        <section className="max-w-4xl mx-auto text-center space-y-6 pt-10">
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#5b32b4] to-[#fb397d] mx-auto rounded-full" />

          <h2 className="text-3xl font-bold text-[#2b1d3a]">
            Why Use Snappy Fix {category.name}?
          </h2>

          <p className="text-gray-600 leading-relaxed text-lg">
            Snappy Fix provides professional-grade image tools designed for
            developers, designers, marketers and businesses. Our tools are
            optimized for speed, security and high-quality results.
          </p>
        </section>
      </section>
    </main>
  );
}
