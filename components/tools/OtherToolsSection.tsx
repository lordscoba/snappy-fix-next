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
  // Shuffle helper
  const shuffleArray = (array: typeof tools) => {
    const copied = [...array];
    for (let i = copied.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }
    return copied;
  };

  // Memoized so it doesn't reshuffle on every state update
  const otherTools = useMemo(() => {
    const filtered = tools.filter((tool) => tool.slug !== currentSlug);
    return shuffleArray(filtered).slice(0, limit);
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

      {/* View All Tools Button */}
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
