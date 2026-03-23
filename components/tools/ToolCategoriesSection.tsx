"use client";

import Link from "next/link";
import { useMemo } from "react";
import { toolCategories } from "@/data/toolsCategoryData";

type Props = {
  title?: string;
  limit?: number;
};

export default function ToolCategoriesSection({
  title = "Browse Tool Categories",
  limit = 8,
}: Props) {
  const shuffleWithSeed = (array: typeof toolCategories, seed: number) => {
    const shuffled = [...array];

    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  const categories = useMemo(() => {
    const seed = new Date().getDate();
    return shuffleWithSeed(toolCategories, seed).slice(0, limit);
  }, [limit]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Section Header */}
      <div className="relative text-center space-y-4">
        <span className="inline-block px-4 py-1.5 mb-2 text-xs font-bold tracking-widest uppercase text-[#c3003a] bg-[#fb397d]/10 rounded-full">
          Utility Suite
        </span>

        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#5b32b4]">
          {title}
        </h2>

        <p className="text-gray-500 max-w-3xl mx-auto text-base md:text-lg font-medium leading-relaxed">
          Explore our powerful collection of online tools designed to help you
          convert, edit, optimize, and analyze your images and documents
          instantly — all directly in your browser.
        </p>

        <div className="h-1.5 w-24 bg-gradient-to-r from-[#5b32b4] to-[#fb397d] mx-auto rounded-full mt-6" />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            target="_blank"
            key={category.slug}
            href={category.href}
            className="group relative flex flex-col p-8 bg-white border border-gray-100 rounded-3xl shadow-[0_4px_20px_-4px_rgba(91,50,180,0.1)] hover:shadow-[0_20px_40px_-12px_rgba(91,50,180,0.15)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
          >
            {/* Animated Background Decor */}
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#5b32b4]/5 rounded-full blur-2xl group-hover:bg-[#fb397d]/10 transition-colors duration-500" />

            {/* Category Icon / Initial */}
            <div className="relative z-10 w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#5b32b4] to-[#7c4dff] text-white shadow-lg shadow-[#5b32b4]/30 mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <span className="text-2xl font-black uppercase italic">
                {category.name.charAt(0)}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-grow">
              <h3 className="text-xl font-bold text-[#2b1d3a] group-hover:text-[#5b32b4] transition-colors mb-3">
                {category.name}
              </h3>

              <p className="text-[15px] text-gray-500 leading-relaxed font-normal">
                {category.description}
              </p>
            </div>

            {/* Footer Link */}
            <div className="relative z-10 mt-8 flex items-center justify-between">
              <span className="text-sm font-bold text-[#c3003a] uppercase tracking-wider group-hover:mr-2 transition-all">
                Open Tools
              </span>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-[#5b32b4] group-hover:bg-[#fb397d] group-hover:text-white transition-all duration-300">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All CTA */}
      <div className="flex flex-col items-center space-y-4 pt-10">
        <Link
          href="/tools"
          className="group relative px-10 py-4 overflow-hidden rounded-full bg-[#5b32b4] text-white font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">Browse All Tool Categories</span>
          <div className="absolute inset-0 bg-[#fb397d] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </Link>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          No Account Required • 100% Free
        </p>
      </div>
    </section>
  );
}
