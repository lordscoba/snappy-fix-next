"use client";

import { getBlogList } from "@/lib/api/services/blog.service";
import { News } from "@/types/blog-types";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { SectionHeader } from "./Helpers";
import { ArrowRight } from "lucide-react";

// ─── Static fallback — shown when API fails or returns empty ──────────────────
const BLOG_FALLBACK = [
  {
    slug: "web-performance-guide",
    title: "How to Improve Your Website's Core Web Vitals in 2025",
    excerpt:
      "A practical guide to LCP, CLS, and FID — the metrics Google uses to rank your site.",
    category: "Web Performance",
    date: "Mar 2025",
    cover: "/images/blog/minimalist.png",
    author: "Snappy-Fix Team",
  },
  {
    slug: "image-formats-guide",
    title: "WebP vs AVIF vs JPEG: Which Format Should You Use?",
    excerpt:
      "A clear comparison of modern image formats and when to use each one for the best results.",
    category: "Image Tools",
    date: "Feb 2025",
    cover: "/images/blog/minimalist.png",
    author: "Snappy-Fix Team",
  },
  {
    slug: "favicon-guide",
    title: "The Complete Favicon Guide for 2025",
    excerpt:
      "Everything you need — sizes, formats, dark mode variants, PWA manifests, and the HTML tags.",
    category: "Web Development",
    date: "Jan 2025",
    cover: "/images/blog/minimalist.png",
    author: "Snappy-Fix Team",
  },
];

// ─── Fetcher — isolated so react-query can call it directly ───────────────────
async function fetchHomepageBlogPosts(): Promise<News[]> {
  const res = await getBlogList(1, 3, "", "", "published", false, false);
  return res.data.data.news?.slice(0, 3) ?? [];
}

// ─── Shape mapper — API response → display card ───────────────────────────────
function toDisplayPost(p: News) {
  const formattedDate = p.created_at
    ? new Date(p.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Recent"; // Better than an empty string for UI consistency

  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.meta_desc || p.body?.slice(0, 120).replace(/<[^>]*>/g, "") || "", // Strip HTML if body contains tags
    category: p.category?.name || "General",
    date: formattedDate,
    cover: p.thumbnail_url || "/images/blog/minimalist.png",
    author: "Snappy-Fix Team",
  };
}

// ─── Blog section ─────────────────────────────────────────────────────────────
const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["homepage-blog-posts"],
    queryFn: fetchHomepageBlogPosts,

    // ── Caching strategy ──────────────────────────────────────────────────────
    // staleTime: data is considered fresh for 5 minutes.
    // Within that window, navigating away and back to the homepage will
    // render the cached posts instantly — zero network request.
    staleTime: 5 * 60 * 1000, // 5 minutes

    // gcTime (formerly cacheTime): keep the data in memory for 30 minutes
    // even after the component unmounts, so it's ready on the next visit.
    gcTime: 30 * 60 * 1000, // 30 minutes

    // Don't retry on failure — fall through to BLOG_FALLBACK immediately
    retry: false,
  });

  // Decide what to display: API data → fallback (on error or empty)
  const blogData =
    posts && posts.length > 0 ? posts.map(toDisplayPost) : BLOG_FALLBACK;

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Blog"
          title="Snappy-Fix Insights"
          subtitle="Ideas on design, performance, and building high-quality digital products."
          action={
            <Link
              arial-label="View all articles"
              href="/blog"
              className="text-sm font-bold text-[#c3003a] hover:underline"
            >
              View all articles →
            </Link>
          }
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))
            : blogData.map((post) => (
                <article
                  key={post.slug}
                  className="group rounded-3xl border border-[#e9e1ff] bg-white overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5b32b4]/10 transition-all duration-300"
                >
                  <figure className="relative h-48 overflow-hidden bg-[#f4edff]">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </figure>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#5b32b4] bg-[#f4edff] px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-[#6b5d80]">
                        {post.date}
                      </span>
                    </div>

                    <h3 className="font-bold text-[#2b1d3a] leading-snug line-clamp-2 group-hover:text-[#5b32b4] transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      aria-label={`Read article: ${post.title}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-[#c3003a] hover:gap-2 transition-all"
                    >
                      Read more <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
export function BlogCardSkeleton() {
  return (
    <div className="rounded-3xl border border-[#e9e1ff] overflow-hidden animate-pulse">
      <div className="h-48 bg-[#f4edff]" />
      <div className="p-6 space-y-3">
        <div className="h-4 w-24 bg-[#f4edff] rounded-full" />
        <div className="h-5 w-full bg-[#f4edff] rounded" />
        <div className="h-4 w-3/4 bg-[#f4edff] rounded" />
      </div>
    </div>
  );
}

export default Blog;
