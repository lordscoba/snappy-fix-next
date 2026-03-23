"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  SearchX,
  ArrowUpRight,
  Newspaper,
  Star,
  ShieldCheck,
} from "lucide-react";
import { getAdminBlogs } from "@/lib/api/services/admin.blog.service";
import { getAdminCategories } from "@/lib/api/services/admin.category.service";
import { News } from "@/types/blog-types";
import { Category } from "@/types/category-types";
import { toast } from "react-hot-toast";

export default function ListBlogs() {
  const [blogs, setBlogs] = useState<News[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtering States
  const [viewType, setViewType] = useState<"all" | "featured" | "exclusive">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  // Fetch Categories for the Filter Dropdown
  const fetchCategories = async () => {
    try {
      const res = await getAdminCategories(1, 100); // Get a large enough set for the filter
      setCategories(res.data.data.categories || []);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Map viewType to API params
      const isFeatured = viewType === "featured";
      const isExclusive = viewType === "exclusive";

      // We use getAdminBlogs as the primary driver since it supports search/filter params
      const response = await getAdminBlogs(
        currentPage,
        limit,
        searchQuery,
        selectedCategory,
        "", // status
        isFeatured,
        isExclusive,
      );

      setBlogs(response.data.data.news || []);

      // Mapping the Tuple [PaginationMeta, number]
      const pagination = response.data.pagination;
      if (Array.isArray(pagination) && pagination[0]) {
        const meta = pagination[0];
        setCurrentPage(meta.current_page);
        setTotalPages(meta.total_pages_count);
        setTotalItemsCount(
          typeof pagination[0]?.total_count === "number"
            ? pagination[0].total_count
            : meta.page_count,
        );
      }
    } catch (err: any) {
      console.error("Failed to fetch blogs:", err);
      toast.error(err?.message || "Error loading articles");
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, searchQuery, selectedCategory, viewType]);

  // Initial load of categories
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch data when filters or pagination change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 300); // 300ms debounce for search input

    return () => clearTimeout(delayDebounceFn);
  }, [fetchData]);

  // Reset to page 1 when filters change
  const handleFilterChange = (setter: any, value: any) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* --- TOOLBAR --- */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[280px] max-w-sm">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b08fd9]"
              size={18}
            />
            <input
              type="text"
              placeholder="Search server-side by title..."
              value={searchQuery}
              onChange={(e) =>
                handleFilterChange(setSearchQuery, e.target.value)
              }
              className="w-full rounded-2xl border border-[#e7ddf2] bg-white pl-11 pr-4 py-2.5 text-sm outline-none transition focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) =>
                handleFilterChange(setSelectedCategory, e.target.value)
              }
              className="rounded-2xl border border-[#e7ddf2] bg-white px-4 py-2.5 text-sm font-bold text-[#6f5a88] outline-none cursor-pointer min-w-[140px]"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* View Type Filter */}
            <select
              value={viewType}
              onChange={(e) =>
                handleFilterChange(setViewType, e.target.value as any)
              }
              className="rounded-2xl border border-[#e7ddf2] bg-white px-4 py-2.5 text-sm font-bold text-[#6f5a88] outline-none cursor-pointer"
            >
              <option value="all">Standard</option>
              <option value="featured">Featured Only</option>
              <option value="exclusive">Exclusive Only</option>
            </select>

            {/* Limit Selector */}
            <select
              value={limit}
              onChange={(e) =>
                handleFilterChange(setLimit, Number(e.target.value))
              }
              className="rounded-2xl border border-[#e7ddf2] bg-white px-4 py-2.5 text-sm font-bold text-[#6f5a88] outline-none cursor-pointer"
            >
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
            </select>
          </div>
        </div>

        <Link
          href="/admin/blog/create"
          className="w-full xl:w-auto rounded-2xl bg-[#2b1d3a] px-6 py-3 text-center text-sm font-bold text-white shadow-lg transition hover:bg-[#3e2a55] flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Write Post
        </Link>
      </div>

      {/* --- TABLE SECTION --- */}
      <section className="rounded-[2rem] border border-[#e7ddf2] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left text-sm border-collapse min-w-[850px]">
            <thead className="bg-[#faf7ff] border-b border-[#eee4fb] text-[#b08fd9] uppercase text-[10px] tracking-[0.2em] font-black">
              <tr>
                <th className="px-6 py-5">Article</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Attributes</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee4fb] text-[#2b1d3a]">
              {loading ? (
                <BlogTableSkeleton rows={limit} />
              ) : blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="group hover:bg-[#fcfaff] transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-[#f1e9ff] border border-[#eee4fb]">
                          {blog.thumbnail_url ? (
                            <Image
                              src={blog.thumbnail_url}
                              alt={blog.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <Newspaper size={16} className="text-[#b08fd9]" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col max-w-[200px]">
                          <span className="font-bold text-sm truncate group-hover:text-[#5b32b4] transition-colors">
                            {blog.title}
                          </span>
                          <span className="text-[10px] text-[#b08fd9] font-mono truncate lowercase">
                            /{blog.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-bold text-[#6f5a88]">
                        {blog.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${
                          blog.status === "published"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-amber-50 text-amber-600 border border-amber-100"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-1.5">
                        {blog.is_featured && (
                          <div
                            className="p-1.5 rounded-lg bg-[#2b1d3a] text-white"
                            title="Featured"
                          >
                            <Star size={12} fill="currentColor" />
                          </div>
                        )}
                        {blog.is_exclusive && (
                          <div
                            className="p-1.5 rounded-lg bg-[#fb397d]/10 text-[#c3003a] border border-[#fb397d]/20"
                            title="Exclusive"
                          >
                            <ShieldCheck size={12} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/blog/details/${blog.slug}`}
                          className="p-2 rounded-xl hover:bg-[#f1e9ff] text-[#6f5a88] transition-colors"
                        >
                          <ArrowUpRight size={18} />
                        </Link>
                        <Link
                          href={`/admin/blog/update/${blog.slug}`}
                          className="text-xs font-black text-[#b08fd9] hover:underline underline-offset-4"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-[#b08fd9]">
                      <SearchX size={48} strokeWidth={1} />
                      <p className="text-sm font-medium">
                        No articles found matching your criteria.
                      </p>
                      {(searchQuery || selectedCategory) && (
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("");
                          }}
                          className="text-xs font-bold underline"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION FOOTER --- */}
        {!loading && totalPages > 0 && (
          <div className="flex flex-col md:flex-row items-center justify-between border-t border-[#eee4fb] bg-[#faf7ff]/50 px-6 py-5 gap-4">
            <p className="text-xs font-medium text-[#6f5a88]">
              Total Articles:{" "}
              <span className="font-black text-[#2b1d3a]">
                {totalItemsCount}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-[#e7ddf2] bg-white text-[#6f5a88] disabled:opacity-30 transition hover:bg-[#f6f3fb]"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1 overflow-x-auto max-w-[150px] sm:max-w-none scrollbar-hide">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 w-9 shrink-0 rounded-xl text-xs font-black transition-all ${
                        page === currentPage
                          ? "bg-[#2b1d3a] text-white shadow-md"
                          : "text-[#6f5a88] hover:bg-[#f1e9ff]"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-[#e7ddf2] bg-white text-[#6f5a88] disabled:opacity-30 transition hover:bg-[#f6f3fb]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

// Skeleton and other sub-components remain the same...
function BlogTableSkeleton({ rows }: { rows: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td className="px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-16 bg-gray-100 rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-100 rounded-md" />
                <div className="h-3 w-20 bg-gray-50 rounded-md" />
              </div>
            </div>
          </td>
          <td className="px-6 py-5">
            <div className="h-4 w-20 bg-gray-100 rounded-lg" />
          </td>
          <td className="px-6 py-5">
            <div className="h-6 w-16 bg-gray-50 rounded-lg" />
          </td>
          <td className="px-6 py-5">
            <div className="flex gap-2">
              <div className="h-6 w-6 bg-gray-100 rounded-lg" />
              <div className="h-6 w-6 bg-gray-100 rounded-lg" />
            </div>
          </td>
          <td className="px-6 py-5">
            <div className="h-4 w-12 bg-gray-100 rounded-md ml-auto" />
          </td>
        </tr>
      ))}
    </>
  );
}
