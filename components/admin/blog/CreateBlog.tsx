"use client";

import { useEffect, useState, useCallback } from "react";
import { EditorWrapper } from "@/lib/editor/EditorComponent";
import { ImagePickerModal } from "@/lib/editor/ImagePickerModal";
import { getAdminCategories } from "@/lib/api/services/admin.category.service";
import { createBlog } from "@/lib/api/services/admin.blog.service";
import { Category } from "@/types/category-types";
import {
  ImageIcon,
  X,
  Upload,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";

type NotifType = "success" | "error" | "info";
interface Notification {
  type: NotifType;
  title: string;
  message: string;
}

const notifStyles: Record<NotifType, string> = {
  success: "bg-emerald-50 border-emerald-400 text-emerald-800",
  error: "bg-red-50 border-red-400 text-red-800",
  info: "bg-blue-50 border-blue-400 text-blue-800",
};

const NotifIcon = ({ type }: { type: NotifType }) => {
  if (type === "success")
    return <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />;
  if (type === "error")
    return <AlertCircle className="text-red-500 shrink-0" size={20} />;
  return <Info className="text-blue-500 shrink-0" size={20} />;
};

export default function CreateBlogComponent() {
  // ── Form State ─────────────────────────────────────────────────────────────
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isExclusive, setIsExclusive] = useState(false);

  // ── SEO State ──────────────────────────────────────────────────────────────
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [tags, setTags] = useState("");
  const [isManualMetaTitle, setIsManualMetaTitle] = useState(false);
  const [isManualMetaDesc, setIsManualMetaDesc] = useState(false);

  // ── Thumbnail State ────────────────────────────────────────────────────────
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailData, setThumbnailData] = useState<{
    id: string;
    url: string;
  } | null>(null);
  const [isPickerOpen, setPickerOpen] = useState(false);

  // ── UI State ───────────────────────────────────────────────────────────────
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Validation errors (field-level) ───────────────────────────────────────
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // ── Top-level notification (success / backend error) ──────────────────────
  const [notification, setNotification] = useState<Notification | null>(null);

  // ── Auto-dismiss notification after 6s ────────────────────────────────────
  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(() => setNotification(null), 6000);
    return () => clearTimeout(t);
  }, [notification]);

  // ── 1. Fetch Categories ───────────────────────────────────────────────────
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await getAdminCategories(1, 100);
        setCategories(res.data.data.categories || []);
      } catch {
        setNotification({
          type: "error",
          title: "Failed to load categories",
          message: "Check your connection and refresh the page.",
        });
      } finally {
        setLoadingCats(false);
      }
    }
    loadCategories();
  }, []);

  // ── 2. SEO Sync: Title → Meta Title ──────────────────────────────────────
  useEffect(() => {
    if (!isManualMetaTitle) setMetaTitle(title);
  }, [title, isManualMetaTitle]);

  // ── 3. SEO Sync: Body → Meta Description ─────────────────────────────────
  useEffect(() => {
    const plain = body
      .replace(/<[^>]*>/g, " ") // 1. Replace all tags with a single space
      .replace(/\s+/g, " ") // 2. Collapse multiple spaces/newlines into one
      .trim(); // 3. Remove leading/trailing whitespace

    if (plain.length > 0 && !isManualMetaDesc) {
      // Take the first 160 characters
      setMetaDesc(plain.substring(0, 160) + (plain.length > 160 ? "…" : ""));
    }
  }, [body, isManualMetaDesc]);

  // ── Thumbnail from library picker ─────────────────────────────────────────
  // ── Thumbnail from library picker ─────────────────────────────────────────
  const handleThumbnailSelect = useCallback(
    (items: { url: string; id: string }[]) => {
      if (items.length === 0) return;

      const selected = items[0]; // Take the first one for the thumbnail

      setThumbnailData({
        id: selected.id, // Now using the actual ID from the library
        url: selected.url,
      });

      setThumbnailFile(null); // Clear local file
      setFieldErrors((prev) => ({ ...prev, thumbnail: "" }));
    },
    [],
  );

  // ── Validate and return field errors ─────────────────────────────────────
  const validate = (targetStatus: "draft" | "published") => {
    const errs: Record<string, string> = {};

    if (!title.trim()) errs.title = "Article title is required.";
    if (
      !body ||
      body === "<p></p>" ||
      body === "<p>Start writing your article…</p>"
    ) {
      errs.body = "Article body cannot be empty.";
    }

    if (targetStatus === "published" && !thumbnailFile && !thumbnailData) {
      errs.thumbnail = "A thumbnail is required to publish.";
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };
  // ── Extract backend error message ─────────────────────────────────────────
  const extractBackendError = (
    err: any,
  ): { title: string; message: string } => {
    const data = err?.response?.data;

    // Field-level validation errors from Go backend
    if (data?.errors && typeof data.errors === "object") {
      const fieldMsgs = Object.entries(data.errors as Record<string, string>)
        .map(([field, msg]) => `${field}: ${msg}`)
        .join(" · ");
      return {
        title: data?.message || "Validation Failed",
        message: fieldMsgs,
      };
    }

    // Single message from Go backend
    if (data?.message) {
      return {
        title: "Request Failed",
        message: data.message,
      };
    }

    // HTTP status fallback
    const status = err?.response?.status;
    if (status === 413)
      return {
        title: "File Too Large",
        message: "Reduce the image size and try again.",
      };
    if (status === 401)
      return {
        title: "Unauthorized",
        message: "Your session expired. Please log in again.",
      };
    if (status === 403)
      return {
        title: "Forbidden",
        message: "You don't have permission to perform this action.",
      };
    if (status === 422)
      return {
        title: "Unprocessable Content",
        message: "Check all required fields and try again.",
      };
    if (status >= 500)
      return {
        title: "Server Error",
        message: "Something went wrong on our end. Please try again shortly.",
      };

    return {
      title: "Unexpected Error",
      message: err?.message || "Something went wrong. Please try again.",
    };
  };

  const handleAction = async (targetStatus: "draft" | "published") => {
    setNotification(null);
    if (!validate(targetStatus)) return;

    setIsSubmitting(true);
    try {
      // 1. Prepare a clean payload object
      const payload = {
        title,
        body,
        category_id: categoryId,
        status: targetStatus,
        is_featured: isFeatured,
        is_exclusive: isExclusive,
        tags,
        meta_title: metaTitle,
        meta_desc: metaDesc,
        // Pass the file if it exists, otherwise pass the library data
        thumbnail: thumbnailFile || undefined,
        thumbnail_id: thumbnailData?.id,
        thumbnail_url: thumbnailData?.url,
      };

      // 2. Pass the OBJECT, not a FormData
      await createBlog(payload as any);

      setNotification({
        type: "success",
        title:
          targetStatus === "published"
            ? "🎉 Article Published!"
            : "✅ Draft Saved",
        message: "Your changes have been synced successfully.",
      });

      if (targetStatus === "published") {
        setTitle("");
        setBody("");
        setCategoryId("");
        setIsFeatured(false);
        setIsExclusive(false);
        setThumbnailFile(null);
        setThumbnailData(null);
        setMetaTitle("");
        setMetaDesc("");
        setTags("");
        setIsManualMetaTitle(false);
        setFieldErrors({});
        // ... reset logic ...
      }
    } catch (err: any) {
      const { title: errTitle, message: errMsg } = extractBackendError(err);
      setNotification({ type: "error", title: errTitle, message: errMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      {/* ── Global Notification Banner ──────────────────────────────────── */}
      {notification && (
        <div
          className={`flex items-start gap-3 rounded-2xl border-l-4 p-4 shadow-sm transition-all ${notifStyles[notification.type]}`}
        >
          <NotifIcon type={notification.type} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold">{notification.title}</p>
            <p className="text-xs mt-0.5 opacity-80 leading-relaxed">
              {notification.message}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="shrink-0 opacity-50 hover:opacity-100 transition"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* ── MAIN CONTENT COLUMN ─────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <section
            className={`rounded-3xl border bg-white p-6 shadow-sm transition-colors ${
              fieldErrors.title
                ? "border-red-300 bg-red-50/30"
                : "border-[#e7ddf2]"
            }`}
          >
            <label className="block space-y-2">
              <span className="text-xs font-bold text-[#b08fd9] uppercase tracking-widest">
                Article Title
              </span>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (fieldErrors.title)
                    setFieldErrors((p) => ({ ...p, title: "" }));
                }}
                className="w-full bg-transparent text-2xl font-bold placeholder:text-[#e1d6f3] outline-none text-[#2b1d3a]"
                placeholder="Enter a catchy title..."
              />
              {fieldErrors.title && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {fieldErrors.title}
                </p>
              )}
            </label>
          </section>

          {/* Body error shown above editor */}
          {fieldErrors.body && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
              <AlertCircle size={14} className="shrink-0" />
              {fieldErrors.body}
            </div>
          )}

          <EditorWrapper
            onChange={(html) => {
              setBody(html);
              if (fieldErrors.body) setFieldErrors((p) => ({ ...p, body: "" }));
            }}
            initialContent={body}
          />

          {/* Thumbnail */}
          <section
            className={`rounded-3xl border bg-white p-8 shadow-sm text-center transition-colors ${
              fieldErrors.thumbnail
                ? "border-red-300 bg-red-50/30"
                : "border-[#e7ddf2]"
            }`}
          >
            <h3 className="text-xs font-bold text-[#b08fd9] uppercase tracking-widest mb-4">
              Article Thumbnail
            </h3>

            {thumbnailFile || thumbnailData ? (
              <div className="relative group max-w-sm mx-auto">
                <img
                  src={
                    thumbnailFile
                      ? URL.createObjectURL(thumbnailFile)
                      : thumbnailData?.url
                  }
                  className="w-full h-48 object-cover rounded-2xl border border-[#eee4fb]"
                  alt="Thumbnail preview"
                />
                <button
                  type="button"
                  onClick={() => {
                    setThumbnailFile(null);
                    setThumbnailData(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#e7ddf2] rounded-2xl p-6 cursor-pointer hover:bg-[#faf7ff] hover:border-[#b08fd9] transition">
                    <Upload className="text-[#b08fd9] mb-2" size={24} />
                    <span className="text-xs font-bold text-[#6f5a88]">
                      Upload File
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        setThumbnailFile(e.target.files?.[0] || null);
                        if (fieldErrors.thumbnail)
                          setFieldErrors((p) => ({ ...p, thumbnail: "" }));
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setPickerOpen(true)}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-[#e7ddf2] rounded-2xl p-6 hover:bg-[#faf7ff] hover:border-[#b08fd9] transition"
                  >
                    <ImageIcon className="text-[#b08fd9] mb-2" size={24} />
                    <span className="text-xs font-bold text-[#6f5a88]">
                      From Library
                    </span>
                  </button>
                </div>
                {fieldErrors.thumbnail && (
                  <p className="text-xs text-red-500 flex items-center justify-center gap-1 mt-3">
                    <AlertCircle size={12} /> {fieldErrors.thumbnail}
                  </p>
                )}
              </>
            )}
          </section>
        </div>

        {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
        <aside className="space-y-6">
          {/* Publish Settings */}
          <section className="rounded-3xl border border-[#e7ddf2] bg-white p-6 shadow-sm space-y-6">
            <h3 className="text-xs font-bold text-[#b08fd9] uppercase tracking-widest">
              Publish Settings
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-2xl border border-[#eee4fb] bg-[#faf7ff] cursor-pointer hover:bg-[#f3ecff] transition">
                <div>
                  <span className="text-sm font-medium text-[#3e2a55]">
                    Featured Article
                  </span>
                  <p className="text-[10px] text-[#b08fd9]">
                    Shown in featured sections
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="accent-[#2b1d3a] h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-2xl border border-[#eee4fb] bg-[#faf7ff] cursor-pointer hover:bg-[#f3ecff] transition">
                <div>
                  <span className="text-sm font-medium text-[#3e2a55]">
                    Exclusive Content
                  </span>
                  <p className="text-[10px] text-[#b08fd9]">
                    Visible to premium members only
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={isExclusive}
                  onChange={(e) => setIsExclusive(e.target.checked)}
                  className="accent-[#fb397d] h-4 w-4"
                />
              </label>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#b08fd9] uppercase tracking-widest">
                Category
              </label>

              <select
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  // We clear the error because "" (None) is now a valid selection
                  if (fieldErrors.category)
                    setFieldErrors((p) => ({ ...p, category: "" }));
                }}
                disabled={loadingCats}
                className={`w-full rounded-xl border p-3 text-sm bg-white outline-none focus:ring-4 ring-purple-100 transition ${
                  fieldErrors.category
                    ? "border-red-300 bg-red-50/30"
                    : "border-[#e1d6f3]"
                }`}
              >
                <option value="">
                  {loadingCats ? "Loading categories..." : "None (No Category)"}
                </option>

                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {fieldErrors.category && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {fieldErrors.category}
                </p>
              )}
            </div>
            {/* Publish Button */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleAction("published")}
              className="w-full rounded-2xl bg-[#2b1d3a] py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#3e2a55] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Publishing…
                </>
              ) : (
                "Publish Article"
              )}
            </button>

            {/* Draft Button */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleAction("draft")}
              className="w-full py-2 text-xs font-bold text-[#6f5a88] hover:text-[#2b1d3a] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Saving…" : "Save as Draft"}
            </button>
          </section>

          {/* SEO Sidebar */}
          <section className="rounded-3xl border border-[#e7ddf2] bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#b08fd9] uppercase tracking-widest">
              SEO Metadata
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#b08fd9] font-bold uppercase">
                  Meta Title
                </span>
                <input
                  className="w-full rounded-xl border border-[#e1d6f3] p-3 text-xs outline-none focus:ring-4 ring-purple-100 transition"
                  placeholder="Defaults to article title"
                  value={metaTitle}
                  onChange={(e) => {
                    setMetaTitle(e.target.value);
                    setIsManualMetaTitle(true);
                  }}
                />
                <p className="text-[10px] text-[#c9b8e0]">
                  {metaTitle.length}/60 chars recommended
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-[#b08fd9] font-bold uppercase">
                  Meta Description
                </span>
                <textarea
                  className="w-full rounded-xl border border-[#e1d6f3] p-3 text-xs min-h-[80px] outline-none focus:ring-4 ring-purple-100 transition resize-none"
                  placeholder="Auto-generated from article body"
                  value={metaDesc}
                  onChange={(e) => {
                    setMetaDesc(e.target.value);
                    setIsManualMetaDesc(true);
                  }}
                />
                <p
                  className={`text-[10px] ${metaDesc.length > 160 ? "text-red-400" : "text-[#c9b8e0]"}`}
                >
                  {metaDesc.length}/160 chars recommended
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-[#b08fd9] font-bold uppercase">
                  Tags
                </span>
                <input
                  className="w-full rounded-xl border border-[#e1d6f3] p-3 text-xs outline-none focus:ring-4 ring-purple-100 transition"
                  placeholder="Technology, AI, Reviews"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <p className="text-[10px] text-[#c9b8e0]">
                  Comma-separated keywords
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <ImagePickerModal
        isOpen={isPickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleThumbnailSelect}
      />
    </form>
  );
}
