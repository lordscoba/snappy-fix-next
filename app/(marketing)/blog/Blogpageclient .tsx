"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { NavbarMenu } from "@/components/Layout";
import BlogHero from "@/components/blog/BlogHero";
import BlogFeatured from "@/components/blog/BlogFeatured";
import BlogLatest from "@/components/blog/BlogLatest";
import BlogExclusive from "@/components/blog/BlogExclusive";
import BlogCategories from "@/components/blog/BlogCategories";
import { getBlogList } from "@/lib/api/services/blog.service";
import { getBlogCategories } from "@/lib/api/services/category.service";
import { News } from "@/types/blog-types";
import { Category } from "@/types/category-types";
import { HiArrowPath, HiExclamationTriangle } from "react-icons/hi2";

// ─── Main Page ────────────────────────────────────────────────────────────────
const LATEST_PER_PAGE = 6;
const FEATURED_LIMIT = 3;
const EXCLUSIVE_LIMIT = 3;

export default function BlogPageClient() {
  // ── Data state ─────────────────────────────────────────────
  const [featuredPosts, setFeaturedPosts] = useState<News[]>([]);
  const [exclusivePosts, setExclusivePosts] = useState<News[]>([]);
  const [latestPosts, setLatestPosts] = useState<News[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // ── Pagination state for "Latest" ──────────────────────────
  const [latestPage, setLatestPage] = useState(1);
  const [latestTotalPages, setLatestTotalPages] = useState(1);
  const [latestTotal, setLatestTotal] = useState(0);

  // ── Filter state ──────────────────────────────────────────
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // ── Loading / error state ─────────────────────────────────
  const [loadingHero, setLoadingHero] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingExclusive, setLoadingExclusive] = useState(true);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorLatest, setErrorLatest] = useState(false);

  // ─── Fetch Categories ─────────────────────────────────────
  const fetchCategories = useCallback(async () => {
    try {
      setLoadingCategories(true);
      const res = await getBlogCategories(1, 100);
      setCategories(res.data.data.categories || []);
    } catch {
      // categories failing silently is acceptable
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  // ─── Fetch Featured ───────────────────────────────────────
  const fetchFeatured = useCallback(async () => {
    try {
      setLoadingFeatured(true);
      setLoadingHero(true);
      const res = await getBlogList(
        1,
        FEATURED_LIMIT,
        "",
        "",
        "published",
        true,
        false,
      );
      setFeaturedPosts(res.data.data.news || []);
    } catch {
      setFeaturedPosts([]);
    } finally {
      setLoadingFeatured(false);
      setLoadingHero(false);
    }
  }, []);

  // ─── Fetch Exclusive ──────────────────────────────────────
  const fetchExclusive = useCallback(async () => {
    try {
      setLoadingExclusive(true);
      const res = await getBlogList(
        1,
        EXCLUSIVE_LIMIT,
        "",
        "",
        "published",
        false,
        true,
      );
      setExclusivePosts(res.data.data.news || []);
    } catch {
      setExclusivePosts([]);
    } finally {
      setLoadingExclusive(false);
    }
  }, []);

  // ─── Fetch Latest (paginated + category filter) ────────────
  const fetchLatest = useCallback(async () => {
    try {
      setErrorLatest(false);
      setLoadingLatest(true);
      const res = await getBlogList(
        latestPage,
        LATEST_PER_PAGE,
        "",
        selectedCategory ?? "",
        "published",
        false,
        false,
      );
      setLatestPosts(res.data.data.news || []);

      const pagination = res.data.pagination;
      if (Array.isArray(pagination) && pagination[0]) {
        const meta = pagination[0];
        setLatestTotalPages(meta.total_pages_count || 1);
        setLatestTotal(
          typeof pagination[0].total_count === "number"
            ? pagination[0].total_count
            : meta.page_count,
        );
      }
    } catch {
      setErrorLatest(true);
    } finally {
      setLoadingLatest(false);
    }
  }, [latestPage, selectedCategory]);

  // ─── Initial load ─────────────────────────────────────────
  useEffect(() => {
    fetchCategories();
    fetchFeatured();
    fetchExclusive();
  }, [fetchCategories, fetchFeatured, fetchExclusive]);

  // ─── Re-fetch latest when page or category changes ────────
  useEffect(() => {
    fetchLatest();
  }, [fetchLatest]);

  const handleCategorySelect = useCallback(
    (cat: string | null) => {
      if (cat === null) {
        setSelectedCategory(null);
      } else {
        const found = categories.find((c) => c.name === cat);
        setSelectedCategory(found?.id ?? null);
      }
      setLatestPage(1);
    },
    [categories],
  );

  // ─── Derived hero items (use featured posts for the hero) ──
  const heroItems = useMemo(
    () => featuredPosts.slice(0, 3).map(toHeroItem),
    [featuredPosts],
  );

  // ─── Derived mapped lists ──────────────────────────────────
  const featuredCards = useMemo(
    () => featuredPosts.map(toCard),
    [featuredPosts],
  );
  const exclusiveCards = useMemo(
    () => exclusivePosts.map(toCard),
    [exclusivePosts],
  );
  const latestCards = useMemo(() => latestPosts.map(toCard), [latestPosts]);

  // ─── Category names for the filter strip ──────────────────
  const categoryNames = useMemo(
    () => categories.map((c) => c.name),
    [categories],
  );

  return (
    <main className="relative min-h-screen bg-[#0e0716] scroll-smooth">
      <NavbarMenu background="bg-[#47238f]" />

      {/* ── Hero Carousel ────────────────────────────────────── */}
      {loadingHero ? (
        <HeroSkeleton />
      ) : heroItems.length > 0 ? (
        <BlogHero items={heroItems} />
      ) : null}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-20 pt-16">
        {/* ── Category Filter ───────────────────────────────── */}
        {!loadingCategories && categoryNames.length > 0 && (
          <BlogCategories
            categories={categoryNames}
            onSelect={handleCategorySelect}
          />
        )}
        {loadingCategories && (
          <div className="flex gap-3 animate-pulse">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-10 rounded-full bg-white/5 border border-white/10"
                style={{ width: `${60 + i * 12}px` }}
              />
            ))}
          </div>
        )}

        {/* ── Latest + Exclusive side-by-side ──────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-12">
          {/* Latest Posts */}
          <section>
            {loadingLatest ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {Array.from({ length: LATEST_PER_PAGE }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : errorLatest ? (
              <ErrorBanner onRetry={fetchLatest} />
            ) : (
              <BlogLatest
                posts={latestCards}
                perPage={LATEST_PER_PAGE}
                // Controlled pagination — driven by API
                currentPage={latestPage}
                totalPages={latestTotalPages}
                totalCount={latestTotal}
                onPageChange={setLatestPage}
              />
            )}
          </section>

          {/* Exclusive Posts */}
          <section>
            {loadingExclusive ? (
              <ExclusiveSkeleton />
            ) : exclusiveCards.length > 0 ? (
              <BlogExclusive posts={exclusiveCards} />
            ) : null}
          </section>
        </div>

        {/* ── Featured ─────────────────────────────────────── */}
        <section>
          {/* <div className="flex items-center gap-3 mb-8">
            <span className="text-[#c3003a] text-xl">★</span>
            <h2 className="text-white text-sm font-black uppercase tracking-[0.2em]">
              Featured
            </h2>
            <div className="flex-1 h-px bg-white/10" />
          </div> */}
          {loadingFeatured ? (
            <FeaturedSkeleton />
          ) : featuredCards.length > 0 ? (
            <BlogFeatured posts={featuredCards} />
          ) : null}
        </section>
      </div>
    </main>
  );
}

// ─── Skeleton loaders ─────────────────────────────────────────────────────────

function HeroSkeleton() {
  return (
    <div className="relative w-full h-[92vh] min-h-[580px] max-h-[780px] bg-[#1a0f2e] animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0716] to-transparent" />
      <div className="absolute bottom-16 left-6 sm:left-12 lg:left-20 space-y-4 max-w-2xl">
        <div className="h-6 w-28 bg-white/10 rounded-full" />
        <div className="h-12 w-[480px] max-w-full bg-white/10 rounded-xl" />
        <div className="h-8 w-[340px] max-w-full bg-white/10 rounded-xl" />
        <div className="h-5 w-56 bg-white/10 rounded-lg" />
        <div className="h-11 w-36 bg-white/10 rounded-full mt-4" />
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden animate-pulse">
      <div className="h-44 bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-3/4 bg-white/10 rounded" />
        <div className="h-3 w-full bg-white/5 rounded" />
        <div className="h-3 w-2/3 bg-white/5 rounded" />
        <div className="flex justify-between pt-1">
          <div className="h-3 w-24 bg-white/5 rounded" />
          <div className="h-3 w-16 bg-white/5 rounded" />
        </div>
      </div>
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 animate-pulse">
      <div className="h-[420px] bg-white/[0.04] rounded-2xl border border-white/10" />
      <div className="flex flex-col gap-5">
        <div className="h-[197px] bg-white/[0.04] rounded-2xl border border-white/10" />
        <div className="h-[197px] bg-white/[0.04] rounded-2xl border border-white/10" />
      </div>
    </div>
  );
}

function ExclusiveSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-24 bg-white/[0.04] rounded-2xl border border-white/10" />
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex gap-4 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4"
        >
          <div className="w-20 h-20 shrink-0 rounded-xl bg-white/5" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-2 w-16 bg-white/5 rounded" />
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-3 w-2/3 bg-white/5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Error state ──────────────────────────────────────────────────────────────
function ErrorBanner({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-[#fb397d]/10 border border-[#fb397d]/20 flex items-center justify-center mb-4">
        <HiExclamationTriangle className="text-[#c3003a] text-2xl" />
      </div>
      <h3 className="text-white font-black text-lg mb-2">
        Failed to load articles
      </h3>
      <p className="text-[#6f5a88] text-sm mb-6 max-w-xs">
        Something went wrong while fetching posts. Please try again.
      </p>
      <button
        type="button"
        aria-label="Retry"
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-[#5b32b4] hover:bg-[#fb397d] text-white text-sm font-bold rounded-full transition-all duration-300"
      >
        <HiArrowPath />
        Retry
      </button>
    </div>
  );
}

// ─── Map News → component shape ───────────────────────────────────────────────
function toCard(post: News) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.meta_desc || post.body?.slice(0, 160) || "",
    date: post.created_at
      ? new Date(post.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : new Date(post.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    category: post.category?.name || "Uncategorized",
    cover: post.thumbnail_url || "/images/blog/minimalist.png",
    author: "Snappy‑Fix Team",
    readingTime: estimateReadingTime(post.body),
  };
}

function toHeroItem(post: News) {
  const card = toCard(post);
  return {
    ...card,
    category: post.category?.name || "Uncategorized",
  };
}

function estimateReadingTime(body: string = ""): string {
  const words = body.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}
