"use client";

import Link from "next/link";
import { useMemo } from "react";
import { tools } from "@/data/toolsData";

type Props = {
  currentSlug: string;
  title?: string;
  limit?: number;
};

export default function OtherToolsSection({
  currentSlug,
  title = "Explore Other Free Tools",
  limit = 4,
}: Props) {
  // Seeded shuffle (stable per day)
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

  const otherTools = useMemo(() => {
    const currentTool = tools.find((tool) => tool.slug === currentSlug);

    if (!currentTool) return [];

    const sameCategoryTools = tools.filter(
      (tool) =>
        tool.category === currentTool.category && tool.slug !== currentSlug,
    );

    const seed = new Date().getDate(); // reshuffle daily

    return shuffleWithSeed(sameCategoryTools, seed).slice(0, limit);
  }, [currentSlug, limit]);

  return (
    <section className="space-y-10">
      <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

      <h2 className="text-2xl font-bold text-center text-[#5b32b4]">{title}</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {otherTools.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.href}
            className="rounded-3xl border p-6 bg-white shadow-sm hover:shadow-xl transition hover:-translate-y-1 space-y-3 group"
          >
            <h3 className="text-lg font-semibold text-[#2b1d3a]">
              {tool.name}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              {tool.description}
            </p>

            <span className="text-sm font-semibold text-[#fb397d] group-hover:underline">
              Try now →
            </span>
          </Link>
        ))}
      </div>

      {/* View All Tools */}
      <div className="flex justify-center pt-4">
        <Link
          href="/tools"
          className="px-6 py-3 rounded-full bg-[#5b32b4] text-white font-semibold shadow hover:opacity-90 transition"
        >
          View All Image Tools →
        </Link>
      </div>
    </section>
  );
}
