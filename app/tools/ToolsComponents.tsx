"use client";

import { useState } from "react";
import Link from "next/link";
import { tools } from "@/data/toolsData";
import { NavbarMenu } from "@/components/Layout";
import ToolCategories from "@/components/tools/ToolCategories";

export default function ToolsComponents() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tools based on search query
  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Get unique categories from the filtered results
  const categories = [...new Set(filteredTools.map((tool) => tool.category))];

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-white via-[#faf7ff] to-white">
      <NavbarMenu background="bg-[#884bdf]" />

      <section className="w-full max-w-7xl mx-auto px-6 pt-48 pb-20 space-y-20">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#5b32b4] to-[#fb397d] bg-clip-text text-transparent">
            Free Online Image Tools
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Convert, optimize, analyze, resize and enhance your images
            instantly. Fast, secure and built for performance.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search tools (e.g. 'converter', 'instagram')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border border-[#e9e1ff] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5b32b4] transition-all text-[#2b1d3a]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="h-1.5 w-24 bg-gradient-to-r from-[#5b32b4] to-[#fb397d] mx-auto rounded-full" />
        </header>

        {/* Categories Overview - Pass the searchQuery to filter categories inside this component */}
        <ToolCategories searchQuery={searchQuery} />

        {/* Tools by Category */}
        <div className="space-y-20">
          {categories.length > 0 ? (
            categories.map((category) => (
              <section key={category} className="space-y-10">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2b1d3a] border-l-4 border-[#fb397d] pl-4">
                  {category}
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredTools
                    .filter((tool) => tool.category === category)
                    .map((tool) => (
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
                        <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-br from-[#5b32b4]/5 to-[#fb397d]/5" />
                      </Link>
                    ))}
                </div>
              </section>
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">
                No tools found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        {/* SEO Block */}
        <section className="max-w-4xl mx-auto text-center space-y-6 pt-10">
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#5b32b4] to-[#fb397d] mx-auto rounded-full" />
          <h2 className="text-3xl font-bold text-[#2b1d3a]">
            Why Use Snappy Fix Image Tools?
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Snappy Fix provides professional-grade image processing tools
            designed for developers, marketers, designers and businesses.
          </p>
        </section>
      </section>
    </main>
  );
}
