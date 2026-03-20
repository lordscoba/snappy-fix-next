"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Layers,
  SearchX,
  ArrowUpRight,
} from "lucide-react";
import {
  getAdminCategories,
  getAdminTopCategories,
} from "@/lib/api/services/admin.category.service";
import { Category } from "@/types/category-types";

export default function ListCategoryComponent() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<"all" | "top">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const service =
        viewType === "all" ? getAdminCategories : getAdminTopCategories;
      const response = await service(currentPage, limit);

      setCategories(response.data.data.categories || []);

      // FIX: Correctly mapping the Tuple [PaginationMeta, number]
      const pagination = response.data.pagination;
      if (Array.isArray(pagination) && pagination[0]) {
        const meta = pagination[0];
        setCurrentPage(meta.current_page);
        setTotalPages(meta.total_pages_count);
        // Using the second index of the tuple for the absolute total if available
        setTotalItemsCount(pagination[0].total_count || meta.page_count);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [viewType, currentPage, limit]);

  const filteredCategories = useMemo(() => {
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, categories]);

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      {/* --- TOOLBAR --- */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[280px] max-w-sm">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b08fd9]"
              size={18}
            />
            <input
              type="text"
              placeholder="Filter by name or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-[#e7ddf2] bg-white pl-11 pr-4 py-2.5 text-sm outline-none transition focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={viewType}
              onChange={(e) => {
                setViewType(e.target.value as "all" | "top");
                setCurrentPage(1);
              }}
              className="flex-1 sm:flex-none rounded-2xl border border-[#e7ddf2] bg-white px-4 py-2.5 text-sm font-bold text-[#6f5a88] outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="top">Top Categories</option>
            </select>

            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="flex-1 sm:flex-none rounded-2xl border border-[#e7ddf2] bg-white px-4 py-2.5 text-sm font-bold text-[#6f5a88] outline-none cursor-pointer"
            >
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
            </select>
          </div>
        </div>

        <Link
          href="/admin/category/create"
          className="w-full xl:w-auto rounded-2xl bg-[#2b1d3a] px-6 py-3 text-center text-sm font-bold text-white shadow-lg transition hover:bg-[#3e2a55] flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Create New
        </Link>
      </div>

      {/* --- TABLE SECTION --- */}
      <section className="rounded-[2rem] border border-[#e7ddf2] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left text-sm border-collapse min-w-[700px]">
            <thead className="bg-[#faf7ff] border-b border-[#eee4fb] text-[#b08fd9] uppercase text-[10px] tracking-[0.2em] font-black">
              <tr>
                <th className="px-6 py-5">Name & Path</th>
                <th className="px-6 py-5">Hierarchy</th>
                <th className="px-6 py-5">Relationship</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee4fb] text-[#2b1d3a]">
              {loading ? (
                <TableSkeleton rows={limit} />
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="group hover:bg-[#fcfaff] transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-base group-hover:text-[#5b32b4] transition-colors">
                          {cat.name}
                        </span>
                        <span className="text-[11px] text-[#b08fd9] font-mono tracking-tight lowercase">
                          /{cat.slug}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#f1e9ff] px-2.5 py-1 text-[10px] font-black text-[#b08fd9]">
                        <Layers size={12} />
                        LVL {cat.level}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs text-[#6f5a88]">
                      {cat.parent_id ? (
                        "Sub-category"
                      ) : (
                        <span className="font-bold text-[#b08fd9] uppercase tracking-tighter">
                          Root
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/category/details/${cat.slug}`}
                          className="p-2 rounded-xl hover:bg-[#f1e9ff] text-[#6f5a88] transition-colors"
                          title="View"
                        >
                          <ArrowUpRight size={18} />
                        </Link>
                        <Link
                          href={`/admin/category/update/${cat.slug}`}
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
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3 text-[#b08fd9]">
                      <SearchX size={48} strokeWidth={1} />
                      <p className="text-sm font-medium">
                        No categories found.
                      </p>
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
              Total Records:{" "}
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

function TableSkeleton({ rows }: { rows: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="animate-pulse">
          <td className="px-6 py-5">
            <div className="h-5 w-32 bg-gray-100 rounded-md" />
          </td>
          <td className="px-6 py-5">
            <div className="h-6 w-12 bg-gray-100 rounded-lg" />
          </td>
          <td className="px-6 py-5">
            <div className="h-4 w-20 bg-gray-50 rounded-md" />
          </td>
          <td className="px-6 py-5">
            <div className="h-4 w-12 bg-gray-100 rounded-md ml-auto" />
          </td>
        </tr>
      ))}
    </>
  );
}
