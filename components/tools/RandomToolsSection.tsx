"use client";

import Link from "next/link";
import { useMemo } from "react";
import { tools } from "@/data/toolsData";
import { splitTitle } from "@/lib/utils/title";

type Props = {
  title?: string;
  limit?: number;
};

export default function RandomToolsSection({
  title = "Explore More Free Online Tools",
  limit = 10,
}: Props) {
  // seeded shuffle for daily rotation
  const shuffleWithSeed = (array: typeof tools, seed: number) => {
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

  const randomTools = useMemo(() => {
    const seed = new Date().getDate();
    return shuffleWithSeed(tools, seed).slice(0, limit);
  }, [limit]);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto space-y-12">
      {/* Header with Accent */}
      <div className="flex flex-col items-center space-y-3">
        <div className="flex items-center space-x-2">
          <span className="h-px w-8 bg-[#fb397d]"></span>
          <span className="text-[#c3003a] font-bold text-xs uppercase tracking-[0.2em]">
            Quick Access
          </span>
          <span className="h-px w-8 bg-[#fb397d]"></span>
        </div>
        <h2 className="text-3xl font-extrabold text-center text-[#5b32b4] sm:text-4xl">
          {title}
        </h2>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {randomTools.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.href}
            className="group relative overflow-hidden rounded-[2rem] border border-gray-100 p-7 bg-white hover:bg-gradient-to-br hover:from-white hover:to-[#5b32b4]/5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_25px_-5px_rgba(91,50,180,0.1)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Subtle Background Pattern (Optional CSS) */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#5b32b4 0.5px, transparent 0.5px)",
                backgroundSize: "10px 10px",
              }}
            ></div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-[#2b1d3a] leading-tight group-hover:text-[#5b32b4] transition-colors">
                  {splitTitle(tool.name)}
                </h3>
                <div className="text-[#5b32b4]/20 group-hover:text-[#c3003a] transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  </svg>
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                {tool.description}
              </p>
            </div>

            {/* Action Button */}
            <div className="relative z-10 pt-6">
              <span className="inline-flex items-center justify-center w-full py-2.5 rounded-xl bg-gray-50 text-[#c3003a] text-sm font-bold group-hover:bg-[#fb397d] group-hover:text-white transition-all duration-300 shadow-sm">
                Use Tool
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-center pt-4">
        <Link
          href="/tools"
          className="group flex items-center space-x-3 px-8 py-4 rounded-2xl bg-[#2b1d3a] text-white font-bold shadow-lg hover:bg-[#5b32b4] transition-all duration-300 transform hover:scale-105"
        >
          <span>Explore Full Library</span>
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
