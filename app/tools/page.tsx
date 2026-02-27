import Link from "next/link";
import { tools } from "@/data/toolsData";

export const metadata = {
  title:
    "Free Online Image Tools | Image Converter, Optimizer, Analyzer - Snappy Fix",
  description:
    "Explore free online image tools including image converter, optimizer, analyzer, cropper, SVG optimizer and more. Fast, secure and SEO-friendly tools by Snappy Fix.",
  keywords: [
    "free image tools",
    "image optimizer online",
    "image converter",
    "svg optimizer",
    "resize image online",
  ],
};

export default function ToolsPage() {
  const categories = [...new Set(tools.map((tool) => tool.category))];

  return (
    <main className="bg-white">
      <section className="w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Free Online Image Tools
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Powerful, fast and secure image tools to convert, optimize, analyze,
            resize and edit your images online.
          </p>
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Category Sections */}
        {categories.map((category) => (
          <section key={category} className="space-y-8">
            <h2 className="text-2xl font-bold text-[#5b32b4]">{category}</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools
                .filter((tool) => tool.category === category)
                .map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    className="group rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-[#2b1d3a]">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {tool.description}
                    </p>

                    <span className="text-sm font-semibold text-[#fb397d]">
                      Use Tool →
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        ))}

        {/* SEO Content Block */}
        <section className="max-w-4xl mx-auto space-y-6">
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Why Use Snappy Fix Image Tools?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Snappy Fix provides professional-grade image processing tools
            designed for developers, marketers, designers and businesses. Our
            tools help improve website performance, social media engagement, SEO
            rankings and user experience.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you need to convert images, optimize for Twitter, resize for
            Instagram, generate favicons or analyze metadata, Snappy Fix offers
            a complete suite of powerful image utilities.
          </p>
        </section>
      </section>
    </main>
  );
}
