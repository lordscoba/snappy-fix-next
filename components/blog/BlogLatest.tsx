"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiClock, HiBolt } from "react-icons/hi2";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  cover: string;
  author: string;
  readingTime: string;
};

type BlogLatestProps = {
  posts: PostCard[];
  perPage?: number;
  // ── Controlled (API-driven) pagination ──────────────────
  // If provided, the component defers pagination to the parent
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
};

export default function BlogLatest({
  posts,
  perPage = 6,
  // Controlled props
  currentPage: controlledPage,
  totalPages: controlledTotalPages,
  totalCount,
  onPageChange,
}: BlogLatestProps) {
  // ── Local pagination (used when no API props provided) ───
  const [localPage, setLocalPage] = useState(1);

  const isControlled =
    controlledPage !== undefined && onPageChange !== undefined;

  const page = isControlled ? controlledPage : localPage;
  const totalPages = isControlled
    ? (controlledTotalPages ?? 1)
    : Math.ceil(posts.length / perPage);

  const pagePosts = useMemo(() => {
    // In controlled mode the parent already passes the current page's posts
    if (isControlled) return posts;
    const start = (localPage - 1) * perPage;
    return posts.slice(start, start + perPage);
  }, [isControlled, localPage, perPage, posts]);

  const changePage = (next: number) => {
    if (isControlled) {
      onPageChange?.(next);
    } else {
      setLocalPage(next);
      document
        .getElementById("latest-section")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const displayCount = isControlled
    ? (totalCount ?? posts.length)
    : posts.length;

  return (
    <section id="latest-section">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <HiBolt className="text-[#c3003a] text-xl" />
        <h2 className="text-white text-sm font-black uppercase tracking-[0.2em]">
          Latest Posts
        </h2>
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-[#6f5a88]">
          {displayCount} {displayCount === 1 ? "article" : "articles"}
        </span>
      </div>

      {/* Empty state */}
      {pagePosts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <HiBolt className="text-[#6f5a88] text-2xl" />
          </div>
          <p className="text-[#6f5a88] text-sm">No posts found.</p>
        </div>
      )}

      {/* Grid */}
      {pagePosts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pagePosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#5b32b4]/60 hover:bg-[#1a0f2e] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5b32b4]/10">
                <figure className="relative h-44 overflow-hidden">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading={i < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0716]/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#5b32b4]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </figure>

                <div className="p-5 space-y-3">
                  <h3 className="text-white font-bold text-base leading-snug group-hover:text-[#e0ccff] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[#6f5a88] text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3 text-[11px] text-[#6f5a88]">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <HiClock size={11} className="text-[#c3003a]" />
                        {post.readingTime}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#6f5a88]">
                      {post.date}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => changePage(Math.max(page - 1, 1))}
            disabled={page === 1}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#9d86b8] hover:bg-[#5b32b4] hover:border-[#5b32b4] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <MdChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => changePage(i + 1)}
              aria-label={`Page ${i + 1}`}
              className={`w-9 h-9 rounded-full text-sm font-bold transition-all ${
                page === i + 1
                  ? "bg-[#fb397d] text-white border border-[#fb397d] shadow-lg shadow-[#fb397d]/30"
                  : "bg-white/5 border border-white/10 text-[#9d86b8] hover:bg-[#5b32b4]/40 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            type="button"
            aria-label="Next page"
            onClick={() => changePage(Math.min(page + 1, totalPages))}
            disabled={page === totalPages}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#9d86b8] hover:bg-[#5b32b4] hover:border-[#5b32b4] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <MdChevronRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}
