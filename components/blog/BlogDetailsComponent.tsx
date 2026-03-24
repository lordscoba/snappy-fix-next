"use client";

import "@/styles/tiptap-output.css";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  HiClock,
  HiUser,
  HiCalendar,
  HiTag,
  HiArrowPath,
  HiExclamationTriangle,
  HiStar,
  HiLockClosed,
} from "react-icons/hi2";
import { getBlogDetails, getBlogList } from "@/lib/api/services/blog.service";
import { getBlogCategories } from "@/lib/api/services/category.service";
import { News } from "@/types/blog-types";
import { Category } from "@/types/category-types";
import BlogShareBar from "@/components/blog/BlogShareBar";
import BlogDetailsSidebar from "@/components/blog/BlogDetailsSidebar";
import { getCachedBlogDetails } from "@/lib/api/cached";

// ─── Main component ───────────────────────────────────────────────────────────
export default function BlogDetailsComponent({ slug }: { slug: string }) {
  const [post, setPost] = useState<News | null>(null);
  const [related, setRelated] = useState<News[]>([]);
  const [latest, setLatest] = useState<News[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPost = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      const res = await getCachedBlogDetails(slug);
      const news = res.data.data.news;
      if (!news) {
        notFound();
        return;
      }
      setPost(news);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // ─── Fetch sidebar data (non-blocking) ───────────────────
  const fetchSidebarData = useCallback(async () => {
    try {
      const [relatedRes, latestRes, categoriesRes] = await Promise.allSettled([
        getBlogList(1, 3, "", "", "published", false, false),
        getBlogList(1, 5, "", "", "published", false, false),
        getBlogCategories(1, 100),
      ]);

      if (relatedRes.status === "fulfilled") {
        // Filter out current post from related
        const all = relatedRes.value.data.data.news || [];
        setRelated(all.filter((p) => p.slug !== slug).slice(0, 3));
      }
      if (latestRes.status === "fulfilled") {
        const all = latestRes.value.data.data.news || [];
        setLatest(all.filter((p) => p.slug !== slug).slice(0, 5));
      }
      if (categoriesRes.status === "fulfilled") {
        setCategories(categoriesRes.value.data.data.categories || []);
      }
    } catch {
      // sidebar failure is non-critical — fail silently
    }
  }, [slug]);

  useEffect(() => {
    fetchPost();
    fetchSidebarData();
  }, [fetchPost, fetchSidebarData]);

  // ── Loading ──────────────────────────────────────────────
  if (loading) return <BlogDetailsSkeleton />;

  // ── Error ────────────────────────────────────────────────
  if (error || !post) return <BlogDetailsError onRetry={fetchPost} />;

  const publishedDate = post.created_at
    ? formatDate(post.created_at)
    : formatDate(post.updated_at);

  const readingTime = estimateReadingTime(post.body);

  // Parse tags string → array
  const tags = post.tags
    ? post.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  // Sidebar shape converters
  const sidebarRelated = related.map((r) => ({
    slug: r.slug,
    title: r.title,
    cover: r.thumbnail_url || "/images/blog/minimalist.png",
    category: r.category?.name || "Uncategorized",
    readingTime: estimateReadingTime(r.body),
    date: r.created_at ? formatDate(r.created_at) : formatDate(r.updated_at),
  }));

  const sidebarLatest = latest.map((l) => ({
    slug: l.slug,
    title: l.title,
    cover: l.thumbnail_url || "/images/blog/minimalist.png",
    category: l.category?.name || "Uncategorized",
    readingTime: estimateReadingTime(l.body),
    date: l.created_at ? formatDate(l.created_at) : formatDate(l.updated_at),
    author: "Snappy‑Fix Team",
  }));

  const categoryNames = categories.map((c) => c.name);

  return (
    <>
      {/* ── Hero Banner ────────────────────────────────────── */}
      <section className="relative w-full h-[55vh] min-h-[420px] max-h-[600px] overflow-hidden mt-16 md:mt-20">
        <Image
          src={post.thumbnail_url || "/images/blog/minimalist.png"}
          alt={post.title}
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0716] via-[#0e0716]/60 to-[#0e0716]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0716]/80 via-transparent to-transparent" />
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 rounded-full bg-[#5b32b4]/20 blur-3xl pointer-events-none" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto left-0 right-0">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-[#9d86b8]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-[#6f5a88]">/</li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li className="text-[#6f5a88]">/</li>
              <li className="text-[#c3003a] truncate max-w-[200px] sm:max-w-sm">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 bg-[#fb397d] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {post.category?.name || "Uncategorized"}
            </span>
            {post.is_featured && (
              <span className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20">
                <HiStar size={10} className="text-yellow-400" />
                Featured
              </span>
            )}
            {post.is_exclusive && (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#5b32b4]/80 to-[#fb397d]/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                <HiLockClosed size={10} />
                Exclusive
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-4xl mb-4">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-[#9d86b8]">
            <span className="flex items-center gap-1.5">
              <HiUser className="text-[#c3003a]" size={14} />
              Snappy‑Fix Team
            </span>
            <span className="flex items-center gap-1.5">
              <HiCalendar className="text-[#c3003a]" size={14} />
              {publishedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <HiClock className="text-[#c3003a]" size={14} />
              {readingTime}
            </span>
          </div>
        </div>
      </section>

      {/* ── Body + Sidebar ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-12">
          {/* ── LEFT: Article ──────────────────────────────── */}
          <div className="min-w-0">
            {/* Share bar */}
            <BlogShareBar title={post.title} slug={post.slug} />

            {/* Article body — rendered from HTML */}
            <article
              className="space-y-7 text-[#c4b5d9] text-[17px] leading-[1.85]"
              itemScope
              itemType="https://schema.org/BlogPosting"
            >
              <meta itemProp="headline" content={post.title} />
              <meta
                itemProp="datePublished"
                content={post.created_at || post.updated_at}
              />
              <meta itemProp="dateModified" content={post.updated_at} />
              <meta itemProp="author" content="Snappy‑Fix Team" />

              <div
                className="tiptap-output prose prose-invert max-w-none
                  prose-headings:text-white prose-headings:font-black
                  prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                  prose-p:text-[#c4b5d9] prose-p:leading-[1.85]
                  prose-a:text-[#c3003a] prose-a:underline
                  prose-strong:text-white prose-strong:font-bold
                  prose-em:text-[#e0ccff]
                  prose-code:text-[#c3003a] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
                  prose-pre:bg-[#1a0f2e] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:p-5
                  prose-blockquote:border-l-[#fb397d] prose-blockquote:border-l-4 prose-blockquote:pl-5 prose-blockquote:text-[#9d86b8] prose-blockquote:italic
                  prose-ul:text-[#c4b5d9] prose-ol:text-[#c4b5d9]
                  prose-li:marker:text-[#c3003a]
                  prose-img:rounded-2xl prose-img:border prose-img:border-white/10
                  prose-hr:border-white/10
                  prose-table:border-0 prose-thead:border-0 prose-tr:border-0
                  prose-th:p-0 prose-td:p-0
                  [&>p:first-child]:text-xl [&>p:first-child]:text-[#e0ccff] [&>p:first-child]:font-medium [&>p:first-child]:leading-relaxed
                  [&>p:first-child::first-letter]:text-5xl [&>p:first-child::first-letter]:font-black [&>p:first-child::first-letter]:text-[#c3003a] [&>p:first-child::first-letter]:float-left [&>p:first-child::first-letter]:mr-3 [&>p:first-child::first-letter]:mt-1 [&>p:first-child::first-letter]:leading-none"
                dangerouslySetInnerHTML={{ __html: post.body }}
                itemProp="articleBody"
              />
            </article>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-white/[0.07]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs text-[#6f5a88] font-bold uppercase tracking-widest mr-2">
                    <HiTag size={13} />
                    Tags
                  </span>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/5 border border-white/10 hover:border-[#5b32b4] hover:bg-[#5b32b4]/20 text-[#c4b5d9] hover:text-white text-xs px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author card */}
            <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#1a0f2e] to-[#0e0716] border border-white/[0.07] p-6 flex gap-5">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-[#5b32b4] to-[#fb397d] flex items-center justify-center">
                <span className="text-white font-black text-xl">S</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#c3003a] uppercase tracking-widest mb-1">
                  Written by
                </p>
                <h3 className="text-white font-black text-lg">
                  Snappy‑Fix Team
                </h3>
                <p className="text-[#6f5a88] text-sm mt-1 leading-relaxed">
                  Part of the Snappy‑Fix team — building high‑performance
                  websites, tools, and digital products.
                </p>
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="mt-10 rounded-2xl bg-gradient-to-br from-[#5b32b4] via-[#3d1f8a] to-[#2b1d3a] p-8 border border-[#5b32b4]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#fb397d]/15 blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[10px] font-black text-[#c3003a] uppercase tracking-widest">
                  Newsletter
                </span>
                <h3 className="text-white text-2xl font-black mt-2 mb-2">
                  Want more insights like this?
                </h3>
                <p className="text-[#c4b5d9] text-sm mb-6 max-w-md leading-relaxed">
                  Get the latest articles, guides, and product updates from
                  Snappy‑Fix delivered straight to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#6f5a88] focus:outline-none focus:border-[#fb397d] transition-colors"
                  />
                  <button
                    aria-label="Subscribe"
                    className="bg-[#fb397d] hover:bg-[#e02d6d] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-[#fb397d]/30 whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <section className="mt-14" aria-labelledby="related-heading">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-6 bg-[#fb397d] rounded-full" />
                  <h2
                    id="related-heading"
                    className="text-white text-lg font-black"
                  >
                    Related Articles
                  </h2>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {related.map((r) => (
                    <RelatedCard key={r.id} post={r} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT: Sidebar ────────────────────────────── */}
          <BlogDetailsSidebar
            categories={categoryNames}
            related={sidebarRelated}
            latest={sidebarLatest}
          />
        </div>
      </div>
    </>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function BlogDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="w-full h-[55vh] min-h-[420px] bg-[#1a0f2e]" />

      {/* Body skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-12">
          <div className="space-y-6">
            {/* Share bar */}
            <div className="flex gap-3 mb-10">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-9 h-9 rounded-xl bg-white/5" />
              ))}
              <div className="w-px h-9 bg-white/5" />
              <div className="h-9 w-28 rounded-xl bg-white/5" />
            </div>
            {/* Article body */}
            <div className="space-y-4">
              <div className="h-6 w-full bg-white/5 rounded" />
              <div className="h-6 w-5/6 bg-white/5 rounded" />
              <div className="h-6 w-4/6 bg-white/5 rounded" />
              <div className="h-6 w-full bg-white/5 rounded mt-6" />
              <div className="h-6 w-3/4 bg-white/5 rounded" />
              <div className="h-6 w-5/6 bg-white/5 rounded" />
            </div>
            {/* Tags */}
            <div className="flex gap-2 mt-10 pt-8 border-t border-white/[0.07]">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-7 w-20 rounded-full bg-white/5" />
              ))}
            </div>
            {/* Author card */}
            <div className="mt-10 rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 flex gap-5">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/10" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 w-16 bg-white/5 rounded" />
                <div className="h-5 w-32 bg-white/10 rounded" />
                <div className="h-4 w-full bg-white/5 rounded" />
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="hidden xl:block space-y-5">
            {[180, 280, 320].map((h, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/[0.03] border border-white/[0.07]"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function estimateReadingTime(body = "") {
  const words = body
    .replace(/<[^>]*>/g, "")
    .trim()
    .split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

// ─── Error state ──────────────────────────────────────────────────────────────
function BlogDetailsError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <div className="w-16 h-16 rounded-full bg-[#fb397d]/10 border border-[#fb397d]/20 flex items-center justify-center mb-4">
        <HiExclamationTriangle className="text-[#c3003a] text-2xl" />
      </div>
      <h2 className="text-white font-black text-xl mb-2">
        Failed to load article
      </h2>
      <p className="text-[#6f5a88] text-sm mb-6 max-w-xs">
        Something went wrong. Please try again.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          aria-label="Retry"
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-[#5b32b4] hover:bg-[#fb397d] text-white text-sm font-bold rounded-full transition-all"
        >
          <HiArrowPath />
          Retry
        </button>
        <Link
          href="/blog"
          className="px-6 py-3 bg-white/5 border border-white/10 text-[#c4b5d9] text-sm font-bold rounded-full hover:bg-white/10 transition-all"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
}

// ─── Related post card ────────────────────────────────────────────────────────
function RelatedCard({ post }: { post: News }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#5b32b4]/60 hover:bg-[#1a0f2e] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5b32b4]/10">
        <figure className="relative h-36 overflow-hidden">
          <Image
            src={post.thumbnail_url || "/images/blog/minimalist.png"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0716]/70 to-transparent" />
        </figure>
        <div className="p-4 space-y-2">
          <span className="text-[10px] font-bold text-[#c3003a] uppercase tracking-widest">
            {post.category?.name || "Uncategorized"}
          </span>
          <h3 className="text-white text-sm font-bold leading-snug line-clamp-2 group-hover:text-[#e0ccff] transition-colors">
            {post.title}
          </h3>
          <p className="text-[11px] text-[#6f5a88]">
            {estimateReadingTime(post.body)}
          </p>
        </div>
      </article>
    </Link>
  );
}
