"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  SearchX,
  ExternalLink,
  Copy,
  Calendar,
  HardDrive,
} from "lucide-react";
import Link from "next/link";
import { getAdminImages } from "@/lib/api/services/admin.image.service";
import { ImageAsset } from "@/types/image-types";

export default function ListImagesComponent() {
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAdminImages(currentPage, limit, searchQuery);

      setImages(response.data.data.images || []);

      const pagination = response.data.pagination;
      if (Array.isArray(pagination) && pagination[0]) {
        const meta = pagination[0];
        setCurrentPage(meta.current_page);
        setTotalPages(meta.total_pages_count);
        setTotalItemsCount(pagination[0].total_count || meta.page_count);
      }
    } catch (err) {
      console.error("Failed to fetch images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, currentPage, limit]);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  return (
    <div className="space-y-6 max-w-full">
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
              placeholder="Search by filename or description..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-2xl border border-[#e7ddf2] bg-white pl-11 pr-4 py-2.5 text-sm outline-none transition focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
            />
          </div>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-2xl border border-[#e7ddf2] bg-white px-4 py-2.5 text-sm font-bold text-[#6f5a88] outline-none cursor-pointer"
          >
            <option value={12}>12 / page</option>
            <option value={24}>24 / page</option>
            <option value={48}>48 / page</option>
          </select>
        </div>

        <Link
          href="/admin/images/create"
          className="rounded-2xl bg-[#2b1d3a] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#3e2a55] flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Upload Images
        </Link>
      </div>

      {/* --- GRID SECTION --- */}
      <section className="min-h-[400px]">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: limit }).map((_, i) => (
              <ImageCardSkeleton key={i} />
            ))}
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative flex flex-col rounded-[2rem] border border-[#e7ddf2] bg-white shadow-sm transition-all hover:shadow-md overflow-hidden"
              >
                {/* Image Preview */}
                <div className="relative aspect-video overflow-hidden bg-[#faf7ff]">
                  <img
                    src={img.url}
                    alt={img.file_name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-3">
                    <button
                      onClick={() => copyToClipboard(img.url)}
                      className="p-3 rounded-full bg-white text-[#2b1d3a] hover:bg-[#f1e9ff] transition-colors"
                      title="Copy URL"
                    >
                      <Copy size={20} />
                    </button>
                    <a
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white text-[#2b1d3a] hover:bg-[#f1e9ff] transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                  <div className="absolute top-4 right-4 rounded-lg bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-black text-[#b08fd9] uppercase">
                    {img.extension}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h3
                    className="font-bold text-[#2b1d3a] truncate mb-1"
                    title={img.file_name}
                  >
                    {img.file_name || "Untitled Image"}
                  </h3>
                  <p className="text-xs text-[#6f5a88] line-clamp-2 mb-4 flex-1">
                    {img.description || "No description provided."}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#eee4fb]">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-[#b08fd9]">
                      <span className="flex items-center gap-1">
                        <HardDrive size={12} />
                        {(img.size / 1024).toFixed(1)} KB
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(img.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <Link
                      href={`/admin/images/details/${img.id}`}
                      className="text-[10px] font-black text-[#5b32b4] uppercase hover:underline"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-[#e7ddf2]">
            <SearchX
              size={64}
              className="text-[#e7ddf2] mb-4"
              strokeWidth={1}
            />
            <h3 className="text-[#6f5a88] font-bold">No images found</h3>
            <p className="text-sm text-[#b08fd9]">
              Try adjusting your search filters.
            </p>
          </div>
        )}
      </section>

      {/* --- PAGINATION FOOTER --- */}
      {!loading && totalPages > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between rounded-[2rem] border border-[#eee4fb] bg-[#faf7ff]/50 px-6 py-5 gap-4">
          <p className="text-xs font-medium text-[#6f5a88]">
            Total Assets:{" "}
            <span className="font-black text-[#2b1d3a]">{totalItemsCount}</span>
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-[#e7ddf2] bg-white text-[#6f5a88] disabled:opacity-30 transition hover:bg-[#f6f3fb]"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-1">
              <span className="px-4 text-xs font-black text-[#2b1d3a]">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-[#e7ddf2] bg-white text-[#6f5a88] disabled:opacity-30 transition hover:bg-[#f6f3fb]"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- SKELETON COMPONENT ---------------- */

function ImageCardSkeleton() {
  return (
    <div className="flex flex-col rounded-[2rem] border border-[#eee4fb] bg-white overflow-hidden animate-pulse">
      {/* Aspect Video Shimmer */}
      <div className="aspect-video bg-gray-100" />

      <div className="p-5 space-y-3">
        {/* Title Shimmer */}
        <div className="h-5 w-3/4 bg-gray-100 rounded-lg" />

        {/* Description Shimmers */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-50 rounded-md" />
          <div className="h-3 w-5/6 bg-gray-50 rounded-md" />
        </div>

        {/* Footer Shimmer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#faf7ff]">
          <div className="flex gap-3">
            <div className="h-3 w-12 bg-gray-100 rounded-md" />
            <div className="h-3 w-12 bg-gray-100 rounded-md" />
          </div>
          <div className="h-3 w-10 bg-gray-100 rounded-md" />
        </div>
      </div>
    </div>
  );
}
