"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HiHashtag,
  HiBookOpen,
  HiBolt,
  HiClock,
  HiCalendar,
} from "react-icons/hi2";

type SidebarPost = {
  slug: string;
  title: string;
  cover: string;
  category: string;
  readingTime: string;
  date: string;
  author?: string;
};

type BlogDetailsSidebarProps = {
  categories: string[];
  related: SidebarPost[];
  latest: SidebarPost[];
};

export default function BlogDetailsSidebar({
  categories,
  related,
  latest,
}: BlogDetailsSidebarProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <aside className="hidden xl:flex flex-col gap-8">
      <div className="sticky top-24 flex flex-col gap-8">
        {/* ── Categories ──────────────────────────────────── */}
        {categories.length > 0 && (
          <SidebarSection icon={<HiHashtag />} title="Categories">
            <div className="flex flex-wrap gap-2 mt-1">
              {["All", ...categories].map((cat) => {
                const isActive =
                  cat === "All"
                    ? activeCategory === null
                    : activeCategory === cat;
                return (
                  <button
                    type="button"
                    aria-label="Select category"
                    key={cat}
                    onClick={() =>
                      setActiveCategory(cat === "All" ? null : cat)
                    }
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                      isActive
                        ? "bg-[#fb397d] border-[#fb397d] text-white shadow-md shadow-[#fb397d]/25 scale-105"
                        : "bg-white/5 border-white/10 text-[#c4b5d9] hover:bg-[#5b32b4]/30 hover:border-[#5b32b4]/60 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </SidebarSection>
        )}

        {/* ── Related Articles ────────────────────────────── */}
        {related.length > 0 && (
          <SidebarSection icon={<HiBookOpen />} title="Related Articles">
            <div className="flex flex-col gap-3">
              {related.map((post, i) => (
                <SidebarPostCard
                  key={post.slug}
                  post={post}
                  index={i}
                  accent="#5b32b4"
                />
              ))}
            </div>
          </SidebarSection>
        )}

        {/* ── Latest Posts ────────────────────────────────── */}
        {latest.length > 0 && (
          <SidebarSection icon={<HiBolt />} title="Latest Posts">
            <div className="flex flex-col gap-3">
              {latest.map((post, i) => (
                <SidebarPostCard
                  key={post.slug}
                  post={post}
                  index={i}
                  accent="#fb397d"
                  showDate
                />
              ))}
            </div>
          </SidebarSection>
        )}

        {/* ── Browse All CTA ──────────────────────────────── */}
        <Link
          href="/blog"
          className="group flex items-center justify-between bg-gradient-to-r from-[#5b32b4] to-[#884bdf] text-white px-5 py-4 rounded-2xl border border-[#5b32b4]/30 hover:shadow-lg hover:shadow-[#5b32b4]/25 transition-all duration-300"
        >
          <span className="text-sm font-bold">Explore all articles</span>
          <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>
    </aside>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function SidebarSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#c3003a] text-base">{icon}</span>
        <h3 className="text-white text-xs font-black uppercase tracking-[0.2em]">
          {title}
        </h3>
        <div className="flex-1 h-px bg-white/10" />
      </div>
      {children}
    </div>
  );
}

// ─── Post card ────────────────────────────────────────────────────────────────
function SidebarPostCard({
  post,
  index,
  accent,
  showDate = false,
}: {
  post: SidebarPost;
  index: number;
  accent: string;
  showDate?: boolean;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="flex gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200">
        <figure className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            sizes="64px"
          />
          <div className="absolute inset-0 bg-[#0e0716]/20" />
          <span
            className="absolute top-1 left-1 w-4 h-4 rounded-full text-white text-[9px] font-black flex items-center justify-center"
            style={{ backgroundColor: accent }}
          >
            {index + 1}
          </span>
        </figure>

        <div className="flex-1 min-w-0 space-y-1">
          <span
            className="text-[9px] font-black uppercase tracking-widest"
            style={{ color: accent }}
          >
            {post.category}
          </span>
          <h4 className="text-white text-xs font-bold leading-snug line-clamp-2 group-hover:text-[#e0ccff] transition-colors">
            {post.title}
          </h4>
          <div className="flex items-center gap-2 text-[10px] text-[#6f5a88]">
            <span className="flex items-center gap-1">
              <HiClock size={9} />
              {post.readingTime}
            </span>
            {showDate && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <HiCalendar size={9} />
                  {post.date}
                </span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
