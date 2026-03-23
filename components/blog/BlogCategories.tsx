"use client";

import { useState } from "react";
import { HiHashtag } from "react-icons/hi2";

type BlogCategoriesProps = {
  categories: string[];
  // Returns category name string or null for "All"
  onSelect?: (cat: string | null) => void;
  // Optional: receive external active value for controlled usage
  activeCategory?: string | null;
};

export default function BlogCategories({
  categories,
  onSelect,
  activeCategory,
}: BlogCategoriesProps) {
  // Support both controlled (activeCategory prop) and uncontrolled (local state)
  const [localActive, setLocalActive] = useState<string | null>(null);
  const active = activeCategory !== undefined ? activeCategory : localActive;

  const handleSelect = (cat: string | null) => {
    if (activeCategory === undefined) {
      // Uncontrolled — manage locally
      setLocalActive(cat);
    }
    onSelect?.(cat);
  };

  const all = ["All", ...categories];

  return (
    <section>
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <HiHashtag className="text-[#fb397d] text-xl" />
        <span className="text-[#9d86b8] text-xs font-bold uppercase tracking-[0.2em]">
          Browse by Category
        </span>
        <div className="flex-1 h-px bg-white/10" />
        {active && (
          <button
            type="button"
            aria-label="Clear"
            onClick={() => handleSelect(null)}
            className="text-xs text-[#6f5a88] hover:text-[#fb397d] transition-colors font-medium"
          >
            Clear ×
          </button>
        )}
      </div>

      {/* Scrollable pill strip */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
        {all.map((cat) => {
          const isActive = cat === "All" ? active === null : active === cat;
          return (
            <button
              type="button"
              aria-label="Select category"
              key={cat}
              onClick={() => handleSelect(cat === "All" ? null : cat)}
              className={`snap-start shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                isActive
                  ? "bg-[#fb397d] border-[#fb397d] text-white shadow-lg shadow-[#fb397d]/30 scale-105"
                  : "bg-white/5 border-white/10 text-[#c4b5d9] hover:bg-[#5b32b4]/30 hover:border-[#5b32b4] hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
}
