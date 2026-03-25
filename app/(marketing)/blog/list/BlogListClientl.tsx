"use client";

import {
  useEffect,
  useState,
  useCallback,
  useTransition,
  useMemo,
} from "react";
import { NavbarMenu } from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { getBlogList } from "@/lib/api/services/blog.service";
import { getBlogCategories } from "@/lib/api/services/category.service";
import { News } from "@/types/blog-types";
import { Category } from "@/types/category-types";
import {
  HiMagnifyingGlass,
  HiXMark,
  HiStar,
  HiLockClosed,
  HiClock,
  HiUser,
  HiAdjustmentsHorizontal,
  HiChevronDown,
  HiArrowPath,
  HiExclamationTriangle,
} from "react-icons/hi2";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

// ─── Constants ────────────────────────────────────────────────────────────────
const LIMIT = 9;

// ─── Types ────────────────────────────────────────────────────────────────────
type FilterState = {
  search: string;
  category_id: string; // category slug/id string — empty = all
  is_featured: boolean;
  is_exclusive: boolean;
  page: number;
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BlogSearchPageClient() {
  const searchParams = useSearchParams();
  // const router = useRouter();
  // ── API data ──────────────────────────────────────────────
  const [posts, setPosts] = useState<ReturnType<typeof toCard>[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ── Stats (for header) ────────────────────────────────────
  const [statsTotal, setStatsTotal] = useState<number | null>(null);
  const [statsFeatured, setStatsFeatured] = useState<number | null>(null);

  // ── Loading / error ───────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setFilters((prev) => ({ ...prev, category_id: categoryFromUrl }));
    }
  }, [searchParams]);

  // ── Filters ───────────────────────────────────────────────
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get("search") ?? "",
    category_id: searchParams.get("category") ?? "",
    is_featured: searchParams.get("featured") === "true",
    is_exclusive: searchParams.get("exclusive") === "true",
    page: Number(searchParams.get("page") ?? "1"),
  });

  const [showFilters, setShowFilters] = useState(false);
  const [, startTransition] = useTransition();

  // ── Debounced search value ────────────────────────────────
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(filters.search), 350);
    return () => clearTimeout(id);
  }, [filters.search]);

  // ─── Fetch categories ─────────────────────────────────────
  const fetchCategories = useCallback(async () => {
    try {
      setLoadingCategories(true);
      const res = await getBlogCategories(1, 100);
      setCategories(res.data.data.categories || []);
    } catch {
      // non-critical — fail silently
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  // ─── Fetch stats (total + featured count for header) ──────
  const fetchStats = useCallback(async () => {
    try {
      const [allRes, featuredRes] = await Promise.all([
        getBlogList(1, 1, "", "", "published", false, false),
        getBlogList(1, 1, "", "", "published", true, false),
      ]);
      const allPagination = allRes.data.pagination;
      const featuredPagination = featuredRes.data.pagination;
      if (Array.isArray(allPagination))
        setStatsTotal(
          typeof allPagination[0]?.total_count === "number"
            ? allPagination[0]?.total_count
            : null,
        );
      if (Array.isArray(featuredPagination))
        setStatsFeatured(
          typeof featuredPagination[0]?.total_count === "number"
            ? featuredPagination[0].total_count
            : null,
        );
    } catch {
      // non-critical
    }
  }, []);

  // ─── Fetch posts ──────────────────────────────────────────
  const fetchPosts = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      const res = await getBlogList(
        filters.page,
        LIMIT,
        debouncedSearch,
        filters.category_id,
        "published",
        filters.is_featured,
        filters.is_exclusive,
      );
      setPosts((res.data.data.news || []).map(toCard));
      const pagination = res.data.pagination;
      if (Array.isArray(pagination) && pagination[0]) {
        const meta = pagination[0];
        setTotalPages(meta.total_pages_count || 1);
        setTotalCount(
          typeof pagination[0]?.total_count === "number"
            ? pagination[0].total_count
            : meta.page_count,
        );
      }
    } catch {
      setError(true);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [
    filters.page,
    filters.category_id,
    filters.is_featured,
    filters.is_exclusive,
    debouncedSearch,
  ]);

  // ─── Effects ──────────────────────────────────────────────
  useEffect(() => {
    fetchCategories();
    fetchStats();
  }, [fetchCategories, fetchStats]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const router = useRouter(); // add this import: import { useRouter, useSearchParams } from "next/navigation";
  const update = useCallback(
    (patch: Partial<FilterState>) => {
      // 1. Calculate the next state immediately
      const nextFilters = { ...filters, ...patch, page: 1 };

      // 2. Update the React state
      setFilters(nextFilters);

      // 3. Sync the URL (Side Effect)
      const params = new URLSearchParams();
      if (nextFilters.category_id)
        params.set("category", nextFilters.category_id);
      if (nextFilters.search) params.set("search", nextFilters.search);
      if (nextFilters.is_featured) params.set("featured", "true");
      if (nextFilters.is_exclusive) params.set("exclusive", "true");

      const query = params.toString();
      router.replace(`?${query}`, { scroll: false });
    },
    [filters, router], // Dependencies must include 'filters' now
  );

  const clearAll = useCallback(() => {
    router.replace("?", { scroll: false });
    setFilters({
      search: "",
      category_id: "",
      is_featured: false,
      is_exclusive: false,
      page: 1,
    });
  }, [router]);

  const changePage = (next: number) => {
    const nextFilters = { ...filters, page: next };
    setFilters(nextFilters);

    const params = new URLSearchParams();
    if (nextFilters.category_id)
      params.set("category", nextFilters.category_id);
    if (nextFilters.search) params.set("search", nextFilters.search);
    if (nextFilters.is_featured) params.set("featured", "true");
    if (nextFilters.is_exclusive) params.set("exclusive", "true");
    if (next > 1) params.set("page", String(next));

    router.replace(`?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── Derived ──────────────────────────────────────────────
  const hasActiveFilters =
    filters.search ||
    filters.category_id ||
    filters.is_featured ||
    filters.is_exclusive;

  const activeCategoryName = useMemo(
    () => categories.find((c) => c.id === filters.category_id)?.name ?? null,
    [categories, filters.category_id],
  );

  // ─────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#0e0716]">
      <NavbarMenu background="bg-[#47238f]" />

      {/* ── Page Header ───────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden  mt-16 md:mt-20 w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#5b32b4]/20 blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-[#fb397d]/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-[#9d86b8] font-semibold uppercase tracking-widest">
            <HiMagnifyingGlass className="text-[#c3003a]" />
            Search & Discover
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
            Find the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fb397d] to-[#884bdf]">
              perfect article
            </span>
          </h1>

          <p className="text-[#9d86b8] text-lg max-w-xl mx-auto leading-relaxed">
            Search across all posts, filter by category, or explore featured and
            exclusive content from the Snappy‑Fix team.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 pt-2">
            {[
              { value: statsTotal, label: "Total Posts" },
              { value: categories.length || null, label: "Categories" },
              { value: statsFeatured, label: "Featured" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                {value === null ? (
                  <StatSkeleton />
                ) : (
                  <div className="text-2xl font-black text-white">{value}</div>
                )}
                <div className="text-xs text-[#6f5a88] uppercase tracking-wider mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky Search + Filter Bar ────────────────────────── */}
      <section className="sticky top-0 z-30 bg-[#0e0716]/95 backdrop-blur-xl border-b border-white/[0.07] py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f5a88] text-lg pointer-events-none" />
            <input
              type="search"
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  search: e.target.value,
                  page: 1,
                }))
              }
              placeholder="Search articles, topics, authors…"
              className="w-full bg-white/[0.06] border border-white/10 rounded-2xl pl-11 pr-10 py-3 text-sm text-white placeholder:text-[#6f5a88] focus:outline-none focus:border-[#5b32b4] focus:bg-white/[0.08] transition-all duration-200"
            />
            {filters.search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => update({ search: "" })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6f5a88] hover:text-white transition-colors"
              >
                <HiXMark size={18} />
              </button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <button
            aria-label="Toggle filters"
            onClick={() => setShowFilters((s) => !s)}
            className={`sm:hidden flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm font-semibold transition-all ${
              showFilters || hasActiveFilters
                ? "bg-[#5b32b4] border-[#5b32b4] text-white"
                : "bg-white/5 border-white/10 text-[#c4b5d9]"
            }`}
          >
            <HiAdjustmentsHorizontal size={18} />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#fb397d]" />
            )}
            <HiChevronDown
              size={14}
              className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </button>

          {/* Desktop filter pills */}
          <div className="hidden sm:flex items-center gap-2">
            <FilterToggle
              active={filters.is_featured}
              icon={<HiStar size={13} />}
              label="Featured"
              onClick={() => update({ is_featured: !filters.is_featured })}
              color="pink"
            />
            <FilterToggle
              active={filters.is_exclusive}
              icon={<HiLockClosed size={13} />}
              label="Exclusive"
              onClick={() => update({ is_exclusive: !filters.is_exclusive })}
              color="purple"
            />
            {hasActiveFilters && (
              <button
                type="button"
                aria-label="Clear all filters"
                onClick={clearAll}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-[#6f5a88] hover:text-[#c3003a] transition-colors border border-transparent hover:border-white/10"
              >
                <HiXMark size={14} />
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Mobile filter panel */}
        {showFilters && (
          <div className="sm:hidden max-w-7xl mx-auto mt-3 space-y-3 pb-1">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                aria-label="Clear category filter"
                onClick={() => update({ category_id: "" })}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  !filters.category_id
                    ? "bg-[#fb397d] border-[#fb397d] text-white"
                    : "bg-white/5 border-white/10 text-[#c4b5d9]"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  type="button"
                  aria-label={cat.name}
                  key={cat.id}
                  onClick={() =>
                    update({
                      category_id: filters.category_id === cat.id ? "" : cat.id,
                    })
                  }
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    filters.category_id === cat.id
                      ? "bg-[#fb397d] border-[#fb397d] text-white"
                      : "bg-white/5 border-white/10 text-[#c4b5d9]"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <FilterToggle
                active={filters.is_featured}
                icon={<HiStar size={13} />}
                label="Featured"
                onClick={() => update({ is_featured: !filters.is_featured })}
                color="pink"
              />
              <FilterToggle
                active={filters.is_exclusive}
                icon={<HiLockClosed size={13} />}
                label="Exclusive"
                onClick={() => update({ is_exclusive: !filters.is_exclusive })}
                color="purple"
              />
              {hasActiveFilters && (
                <button
                  type="button"
                  aria-label="Clear all filters"
                  onClick={clearAll}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-[#6f5a88] hover:text-[#c3003a] border border-transparent hover:border-white/10 transition-all"
                >
                  <HiXMark size={14} />
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-10">
        <div className="flex flex-col xl:flex-row gap-6 min-w-0">
          {/* ── Results ─────────────────────────────────────── */}
          <div className="min-w-0">
            {/* Category pills — desktop */}
            <div className="hidden sm:block mb-8">
              {loadingCategories ? (
                <CategoryPillSkeleton />
              ) : (
                // <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
                  <button
                    type="button"
                    aria-label="Clear category filter"
                    onClick={() => update({ category_id: "" })}
                    className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 ${
                      !filters.category_id
                        ? "bg-[#fb397d] border-[#fb397d] text-white shadow-md shadow-[#fb397d]/20"
                        : "bg-white/5 border-white/10 text-[#c4b5d9] hover:bg-[#5b32b4]/20 hover:border-[#5b32b4]/50 hover:text-white"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      type="button"
                      aria-label={cat.name}
                      key={cat.id}
                      onClick={() =>
                        update({
                          category_id:
                            filters.category_id === cat.id ? "" : cat.id,
                        })
                      }
                      className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 ${
                        filters.category_id === cat.id
                          ? "bg-[#fb397d] border-[#fb397d] text-white shadow-md shadow-[#fb397d]/20 scale-105"
                          : "bg-white/5 border-white/10 text-[#c4b5d9] hover:bg-[#5b32b4]/20 hover:border-[#5b32b4]/50 hover:text-white"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Result meta row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                {loading ? (
                  <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
                ) : (
                  <span className="text-[#9d86b8] text-sm">
                    <span className="text-white font-bold">{totalCount}</span>{" "}
                    {totalCount === 1 ? "article" : "articles"} found
                  </span>
                )}
                {activeCategoryName && (
                  <ActiveChip
                    label={activeCategoryName}
                    onRemove={() => update({ category_id: "" })}
                  />
                )}
                {filters.is_featured && (
                  <ActiveChip
                    label="Featured"
                    onRemove={() => update({ is_featured: false })}
                  />
                )}
                {filters.is_exclusive && (
                  <ActiveChip
                    label="Exclusive"
                    onRemove={() => update({ is_exclusive: false })}
                  />
                )}
              </div>
              {debouncedSearch && !loading && (
                <span className="text-xs text-[#6f5a88]">
                  Results for{" "}
                  <span className="text-[#c3003a] font-semibold">
                    "{debouncedSearch}"
                  </span>
                </span>
              )}
            </div>

            {/* ── Loading grid ──────────────────────────────── */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: LIMIT }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* ── Error state ───────────────────────────────── */}
            {!loading && error && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-[#fb397d]/10 border border-[#fb397d]/20 flex items-center justify-center mb-4">
                  <HiExclamationTriangle className="text-[#c3003a] text-2xl" />
                </div>
                <h3 className="text-white font-black text-lg mb-2">
                  Failed to load articles
                </h3>
                <p className="text-[#6f5a88] text-sm mb-6 max-w-xs">
                  Something went wrong. Please try again.
                </p>
                <button
                  type="button"
                  aria-label="Retry"
                  onClick={fetchPosts}
                  className="flex items-center gap-2 px-6 py-3 bg-[#5b32b4] hover:bg-[#fb397d] text-white text-sm font-bold rounded-full transition-all"
                >
                  <HiArrowPath />
                  Retry
                </button>
              </div>
            )}

            {/* ── Empty state ───────────────────────────────── */}
            {!loading && !error && posts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <HiMagnifyingGlass className="text-[#6f5a88] text-3xl" />
                </div>
                <h3 className="text-white font-black text-xl mb-2">
                  No articles found
                </h3>
                <p className="text-[#6f5a88] text-sm max-w-xs mb-6">
                  Try adjusting your search terms or removing some filters.
                </p>
                <button
                  type="button"
                  aria-label="Clear all filters"
                  onClick={clearAll}
                  className="px-6 py-3 bg-[#5b32b4] hover:bg-[#fb397d] text-white text-sm font-bold rounded-full transition-all duration-300"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* ── Results grid ──────────────────────────────── */}
            {!loading && !error && posts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((post, i) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <article className="h-full bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#5b32b4]/60 hover:bg-[#1a0f2e] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5b32b4]/10">
                      <figure className="relative h-48 overflow-hidden">
                        <Image
                          src={post.cover}
                          alt={post.title}
                          fill
                          fetchPriority="high"
                          quality={75}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          loading={i < 3 ? "eager" : "lazy"}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0716]/80 to-transparent" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                          <span className="bg-[#5b32b4]/80 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                            {post.category}
                          </span>
                          {post.is_featured && (
                            <span className="bg-[#fb397d]/80 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                              <HiStar size={8} />
                              Featured
                            </span>
                          )}
                          {post.is_exclusive && (
                            <span className="bg-gradient-to-r from-[#5b32b4]/80 to-[#fb397d]/80 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                              <HiLockClosed size={8} />
                              Exclusive
                            </span>
                          )}
                        </div>
                      </figure>

                      <div className="p-5 space-y-3">
                        <h2 className="text-white font-bold text-base leading-snug group-hover:text-[#e0ccff] transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-[#6f5a88] text-sm leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-3 text-[11px] text-[#6f5a88]">
                            <span className="flex items-center gap-1">
                              <HiUser size={10} className="text-[#c3003a]" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <HiClock size={10} className="text-[#c3003a]" />
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

            {/* ── Pagination ────────────────────────────────── */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  type="button"
                  aria-label="Previous page"
                  onClick={() => changePage(Math.max(filters.page - 1, 1))}
                  disabled={filters.page === 1}
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#9d86b8] hover:bg-[#5b32b4] hover:border-[#5b32b4] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <MdChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    type="button"
                    aria-label={`Go to page ${i + 1}`}
                    key={i}
                    onClick={() => changePage(i + 1)}
                    className={`w-9 h-9 rounded-full text-sm font-bold transition-all ${
                      filters.page === i + 1
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
                  onClick={() =>
                    changePage(Math.min(filters.page + 1, totalPages))
                  }
                  disabled={filters.page === totalPages}
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-[#9d86b8] hover:bg-[#5b32b4] hover:border-[#5b32b4] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <MdChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          {/* ── Sidebar ───────────────────────────────────────── */}
          {/* <aside className="hidden xl:block w-full"> */}
          <aside className="hidden xl:block w-[320px] shrink-0">
            <div
              className="sticky top-24 flex flex-col gap-6 
             min-w-0 w-full flex-1 min-w-0"
            >
              {/* Quick filters */}
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <HiAdjustmentsHorizontal className="text-[#c3003a]" />
                  <h3 className="text-white text-xs font-black uppercase tracking-[0.2em]">
                    Quick Filters
                  </h3>
                  <div className="flex-1 h-px bg-white/10" />
                </div>
                <div className="space-y-2">
                  <SidebarToggle
                    active={filters.is_featured}
                    icon={<HiStar className="text-[#c3003a]" size={14} />}
                    label="Featured Posts"
                    description="Editor's top picks"
                    onClick={() =>
                      update({ is_featured: !filters.is_featured })
                    }
                  />
                  <SidebarToggle
                    active={filters.is_exclusive}
                    icon={<HiLockClosed className="text-[#884bdf]" size={14} />}
                    label="Exclusive Content"
                    description="Premium insights only"
                    onClick={() =>
                      update({ is_exclusive: !filters.is_exclusive })
                    }
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 overflow-hidden max-w-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#c3003a] text-base">#</span>
                  <h3 className="text-white text-xs font-black uppercase tracking-[0.2em]">
                    Categories
                  </h3>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {loadingCategories ? (
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-9 rounded-xl bg-white/5 animate-pulse"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1 overflow-hidden max-w-full">
                    {[{ id: "", name: "All" }, ...categories].map((cat) => {
                      const isActive =
                        cat.id === ""
                          ? !filters.category_id
                          : filters.category_id === cat.id;
                      return (
                        <button
                          type="button"
                          aria-label={cat.name}
                          key={cat.id || "all"}
                          onClick={() =>
                            update({ category_id: cat.id === "" ? "" : cat.id })
                          }
                          className={`w-full min-w-0 flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 border box-border ${
                            isActive
                              ? "bg-[#fb397d]/15 border-[#fb397d]/30 text-[#c3003a]"
                              : "text-[#9d86b8] hover:bg-white/5 hover:text-white border-transparent"
                          }`}
                        >
                          <span className="font-medium truncate mr-2">
                            {cat.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Back to blog */}
              <div className="p-5">
                <Link
                  href="/blog"
                  className="group flex items-center gap-3 bg-gradient-to-r from-[#5b32b4] to-[#884bdf] text-white px-4 py-4 rounded-2xl border border-[#5b32b4]/30 hover:shadow-lg hover:shadow-[#5b32b4]/25 transition-all duration-300"
                >
                  <span className="text-sm font-bold">Back to Blog</span>
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterToggle({
  active,
  icon,
  label,
  onClick,
  color,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: "pink" | "purple";
}) {
  const activeStyle =
    color === "pink"
      ? "bg-[#fb397d] border-[#fb397d] text-white shadow-md shadow-[#fb397d]/25"
      : "bg-[#5b32b4] border-[#5b32b4] text-white shadow-md shadow-[#5b32b4]/25";
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all duration-200 ${
        active
          ? activeStyle
          : "bg-white/5 border-white/10 text-[#c4b5d9] hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ActiveChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-[#5b32b4]/20 border border-[#5b32b4]/40 text-[#c4b5d9] text-xs px-3 py-1 rounded-full">
      {label}
      <button
        type="button"
        aria-label="Remove"
        onClick={onRemove}
        className="hover:text-[#c3003a] transition-colors"
      >
        <HiXMark size={12} />
      </button>
    </span>
  );
}

function SidebarToggle({
  active,
  icon,
  label,
  description,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left ${
        active
          ? "bg-white/[0.08] border-[#5b32b4]/50"
          : "border-transparent hover:bg-white/5 hover:border-white/10"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${active ? "bg-[#5b32b4]/30" : "bg-white/5"}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white text-xs font-bold">{label}</div>
        <div className="text-[#6f5a88] text-[11px]">{description}</div>
      </div>
      <div
        className={`w-8 h-4 rounded-full border transition-all duration-300 relative shrink-0 ${active ? "bg-[#fb397d] border-[#fb397d]" : "bg-white/10 border-white/10"}`}
      >
        <span
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-300 ${active ? "left-4" : "left-0.5"}`}
        />
      </div>
    </button>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toCard(post: News) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.meta_desc || post.body?.slice(0, 160) || "",
    date: post.created_at
      ? new Date(post.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : new Date(post.updated_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    category: post.category?.name || "Uncategorized",
    cover: post.thumbnail_url || "/images/blog/minimalist.png",
    author: "Snappy‑Fix Team",
    readingTime: estimateReadingTime(post.body),
    is_featured: post.is_featured,
    is_exclusive: post.is_exclusive,
  };
}

function estimateReadingTime(body = ""): string {
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

// ─── Skeleton components ──────────────────────────────────────────────────────
function CardSkeleton() {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-white/5" />
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

function StatSkeleton() {
  return (
    <div className="h-8 w-16 bg-white/10 rounded-lg animate-pulse mx-auto" />
  );
}

function CategoryPillSkeleton() {
  return (
    <div className="flex gap-2 overflow-hidden">
      {[80, 100, 72, 90, 110, 75].map((w, i) => (
        <div
          key={i}
          className="h-9 rounded-full bg-white/5 animate-pulse shrink-0"
          style={{ width: `${w}px` }}
        />
      ))}
    </div>
  );
}
