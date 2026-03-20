"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  Upload,
  Search,
  Loader2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import {
  getAdminImages,
  createImage,
} from "@/lib/api/services/admin.image.service";
import { ImageAsset } from "@/types/image-types";

interface ImagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (items: { url: string; id: string }[]) => void;
}

export function ImagePickerModal({
  isOpen,
  onClose,
  onSelect,
}: ImagePickerModalProps) {
  const [tab, setTab] = useState<"library" | "upload">("library");
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [selectedImages, setSelectedImages] = useState<Map<string, string>>(
    new Map(),
  );

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLibrary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAdminImages(page, 12, search);
      setImages(res.data.data.images || []);
      const meta = res.data.pagination[0];
      if (meta) setTotalPages(meta.total_pages_count);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Could not sync with image library.",
      );
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    if (isOpen && tab === "library") fetchLibrary();
  }, [isOpen, tab, fetchLibrary]);

  // Inside the useEffect that resets on open:
  useEffect(() => {
    if (isOpen) {
      setSelectedImages(new Map()); // Reset Map
    }
  }, [isOpen]);

  // ✅ Capture urls as local const FIRST, then reset, then fire callbacks
  const commitInsert = (items: { url: string; id: string }[]) => {
    if (items.length === 0) return;
    const captured = [...items]; // snapshot before state reset
    setSelectedImages(new Map()); // reset the Map
    onSelect(captured); // fire callback with objects
    onClose();
  };

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const res = await createImage({ images: Array.from(files) });
      const newUrls = res.data.data.images.map((img) => ({
        url: img.url,
        id: img.public_id,
      }));
      commitInsert(newUrls); // ✅ only fires once, cleanly
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Upload failed. Check file size limits.",
      );
    } finally {
      setUploading(false);
    }
  };

  const toggleSelect = (url: string, id: string) => {
    const next = new Map(selectedImages);
    if (next.has(url)) {
      next.delete(url);
    } else {
      next.set(url, id); // Store URL -> ID pair
    }
    setSelectedImages(next);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* ── Header (fixed, never scrolls) ── */}
        <div className="flex-shrink-0 flex items-center justify-between p-6 border-b bg-white">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => {
                setTab("library");
                setError(null);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                tab === "library"
                  ? "bg-[#2b1d3a] text-white"
                  : "text-[#6f5a88] hover:bg-purple-50"
              }`}
            >
              Library
            </button>
            <button
              type="button"
              onClick={() => {
                setTab("upload");
                setError(null);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                tab === "upload"
                  ? "bg-[#2b1d3a] text-white"
                  : "text-[#6f5a88] hover:bg-purple-50"
              }`}
            >
              Upload
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Error banner (fixed below header) ── */}
        {error && (
          <div className="flex-shrink-0 mx-6 mt-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm flex items-center gap-3">
            <AlertCircle size={18} className="flex-shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* ── Scrollable body — flex-1 + overflow-y-auto ✅ ── */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#faf7ff]">
          {tab === "library" ? (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#e1d6f3] outline-none focus:ring-4 ring-purple-100 transition-all bg-white"
                  placeholder="Search your cloud assets..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="animate-spin text-purple-500" size={32} />
                  <p className="text-sm font-bold text-[#b08fd9]">
                    Fetching your media...
                  </p>
                </div>
              ) : images.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#b08fd9]">
                  <p className="text-sm font-bold">No images found</p>
                  {search && (
                    <p className="text-xs opacity-60">
                      Try a different search term
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img) => (
                      <div
                        key={img.public_id}
                        onClick={() => toggleSelect(img.url, img.public_id)} // ✅ Correctly passing ID
                        className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-4 transition-all ${
                          selectedImages.has(img.url) // ✅ Checking the Map
                            ? "border-[#b08fd9] scale-[0.98]"
                            : "border-transparent hover:border-purple-200"
                        }`}
                      >
                        <img
                          src={img.url}
                          className="w-full h-full object-cover"
                          alt={img.file_name}
                        />
                        {/* Overlay color */}
                        <div
                          className={`absolute inset-0 bg-purple-600/20 transition-opacity ${
                            selectedImages.has(img.url) // ✅ Checking the Map
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-40"
                          }`}
                        />
                        {/* Checkmark icon */}
                        {selectedImages.has(img.url) && ( // ✅ Checking the Map
                          <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg">
                            <CheckCircle2
                              className="text-[#2b1d3a]"
                              size={20}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-6 mt-8 py-4">
                      <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white font-bold text-sm disabled:opacity-30 hover:bg-gray-50 transition-colors"
                      >
                        <ChevronLeft size={18} /> Previous
                      </button>
                      <span className="text-sm font-bold text-[#6f5a88]">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white font-bold text-sm disabled:opacity-30 hover:bg-gray-50 transition-colors"
                      >
                        Next <ChevronRight size={18} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            // ── Upload tab ──
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleUpload(e.dataTransfer.files);
              }}
              className="border-2 border-dashed border-[#e7ddf2] rounded-[3rem] py-24 flex flex-col items-center justify-center bg-white hover:bg-[#f3ecff] hover:border-[#b08fd9] transition-all cursor-pointer group"
              onClick={() => document.getElementById("modal-file-up")?.click()}
            >
              <input
                type="file"
                id="modal-file-up"
                hidden
                multiple
                accept="image/*"
                onChange={(e) => handleUpload(e.target.files)}
              />
              <div className="mb-6 rounded-3xl bg-[#faf7ff] p-8 group-hover:scale-110 transition-transform">
                {uploading ? (
                  <Loader2 className="animate-spin text-[#b08fd9]" size={48} />
                ) : (
                  <Upload className="text-[#b08fd9]" size={48} />
                )}
              </div>
              <p className="text-xl font-bold text-[#2b1d3a]">
                Drop Images to Upload
              </p>
              <p className="text-[#b08fd9] mt-2 text-sm">
                You can select multiple files at once
              </p>
            </div>
          )}
        </div>

        {/* ── Footer (fixed, never scrolls) ── */}
        {/* ── Footer ── */}
        <div className="flex-shrink-0 p-6 border-t bg-white flex items-center justify-between gap-3">
          <p className="text-xs text-[#b08fd9] font-medium">
            {selectedImages.size > 0 // ✅ Use Map size
              ? `${selectedImages.size} image${selectedImages.size > 1 ? "s" : ""} selected`
              : "Click images to select"}
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-red-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={selectedImages.size === 0} // ✅ Use Map size
              onClick={() => {
                // ✅ Transform Map entries into the expected array of objects
                const items = Array.from(selectedImages.entries()).map(
                  ([url, id]) => ({ url, id }),
                );
                commitInsert(items);
              }}
              className="px-8 py-3 bg-[#2b1d3a] text-white rounded-2xl text-sm font-bold disabled:opacity-50 shadow-xl shadow-purple-100 hover:bg-[#3e2a55] transition-all"
            >
              Insert {selectedImages.size > 0 ? selectedImages.size : ""} Image
              {selectedImages.size > 1 ? "s" : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
