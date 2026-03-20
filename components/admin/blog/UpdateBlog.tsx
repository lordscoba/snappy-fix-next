"use client";

import { useEffect, useState, useCallback } from "react";
import { EditorWrapper } from "@/lib/editor/EditorComponent";
import { ImagePickerModal } from "@/lib/editor/ImagePickerModal";
import { getAdminCategories } from "@/lib/api/services/admin.category.service";
import {
  deleteBlog,
  getAdminBlogDetails,
  updateBlog,
} from "@/lib/api/services/admin.blog.service";
import { Category } from "@/types/category-types";
import { News } from "@/types/blog-types";
import {
  ImageIcon,
  X,
  Upload,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Info,
  MoveLeft,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";

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

export default function UpdateBlogComponent({ slug }: { slug: string }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isGlobalLoading = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );
  // ── Form State ─────────────────────────────────────────────────────────────
  const [blogId, setBlogId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isExclusive, setIsExclusive] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [error, setError] = useState<string | null>(null);

  // ── SEO State ──────────────────────────────────────────────────────────────
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [tags, setTags] = useState("");
  const [isManualMetaTitle, setIsManualMetaTitle] = useState(false);

  // ── Thumbnail State ────────────────────────────────────────────────────────
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailData, setThumbnailData] = useState<{
    id: string;
    url: string;
  } | null>(null);
  const [isPickerOpen, setPickerOpen] = useState(false);

  // ── UI State ───────────────────────────────────────────────────────────────
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<Notification | null>(null);

  // ── Auto-dismiss notification ────────────────────────────────────────────
  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(() => setNotification(null), 6000);
    return () => clearTimeout(t);
  }, [notification]);

  // ── 1. Fetch Categories & Blog Details ────────────────────────────────────
  useEffect(() => {
    async function init() {
      try {
        setLoadingInitial(true);
        const [catRes, blogRes] = await Promise.all([
          getAdminCategories(1, 100),
          getAdminBlogDetails(slug),
        ]);

        const blogData: News = blogRes.data.data.news;
        setCategories(catRes.data.data.categories || []);

        // Prefill Form
        setBlogId(blogData.id);
        setTitle(blogData.title);
        setBody(blogData.body);
        setCategoryId(blogData.category_id || "");
        setIsFeatured(blogData.is_featured);
        setIsExclusive(blogData.is_exclusive);
        setStatus(blogData.status);
        setTags(blogData.tags || "");
        setMetaTitle(blogData.meta_title || "");
        setMetaDesc(blogData.meta_desc || "");

        if (blogData.thumbnail_url) {
          setThumbnailData({
            id: blogData.thumbnail_id,
            url: blogData.thumbnail_url,
          });
        }

        if (blogData.meta_title && blogData.meta_title !== blogData.title) {
          setIsManualMetaTitle(true);
        }
        setLoadingInitial(false);
      } catch (err) {
        setNotification({
          type: "error",
          title: "Failed to load data",
          message: "Could not retrieve blog post details. Please try again.",
        });
      } finally {
        setLoadingInitial(false);
      }
    }
    init();
  }, [slug]);

  // ── 2. SEO Sync ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (loadingInitial || isManualMetaTitle) return;
    setMetaTitle(title);
  }, [title, isManualMetaTitle, loadingInitial]);

  // ── 3. Handle Thumbnail Selection ──────────────────────────────────────────
  const handleThumbnailSelect = useCallback(
    (items: { url: string; id: string }[]) => {
      if (items.length === 0) return;
      const selected = items[0];
      setThumbnailData({ id: selected.id, url: selected.url });
      setThumbnailFile(null);
      setFieldErrors((prev) => ({ ...prev, thumbnail: "" }));
    },
    [],
  );

  // ── 4. Validation ──────────────────────────────────────────────────────────
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

  // ── 5. Error Parsing ───────────────────────────────────────────────────────
  const extractBackendError = (
    err: any,
  ): { title: string; message: string } => {
    const data = err?.response?.data;

    if (data?.errors && typeof data.errors === "object") {
      const fieldMsgs = Object.entries(data.errors as Record<string, string>)
        .map(([field, msg]) => `${field}: ${msg}`)
        .join(" · ");
      return {
        title: data?.message || "Validation Failed",
        message: fieldMsgs,
      };
    }

    if (data?.message) return { title: "Update Failed", message: data.message };

    const status = err?.response?.status;

    // ✅ Explicit guards, no implicit undefined comparison
    if (!status)
      return {
        title: "Network Error",
        message: "Could not reach the server. Check your connection.",
      };
    if (status === 401)
      return {
        title: "Unauthorized",
        message: "Your session expired. Please log in again.",
      };
    if (status === 403)
      return {
        title: "Forbidden",
        message: "You don't have permission to do this.",
      };
    if (status === 413)
      return {
        title: "File Too Large",
        message: "Reduce image size and try again.",
      };
    if (status === 422)
      return { title: "Unprocessable", message: "Check all required fields." };
    if (status >= 500)
      return {
        title: "Server Error",
        message: "Something went wrong on our end. Try again shortly.",
      };

    return {
      title: "Unexpected Error",
      message: err?.message || "Something went wrong.",
    };
  };
  // ── 6. Update Action ───────────────────────────────────────────────────────
  const handleUpdateAction = async (targetStatus: "draft" | "published") => {
    setNotification(null);
    if (!validate(targetStatus)) return;

    setIsSubmitting(true);
    try {
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
        thumbnail: thumbnailFile || undefined,
        thumbnail_id: thumbnailData?.id,
        thumbnail_url: thumbnailData?.url,
      };

      await updateBlog(blogId, payload as any);

      setNotification({
        type: "success",
        title: "✅ Changes Saved",
        message:
          targetStatus === "published"
            ? "Article is now live."
            : "Draft updated successfully.",
      });
      setStatus(targetStatus);
    } catch (err: any) {
      const { title: errTitle, message: errMsg } = extractBackendError(err);
      setNotification({ type: "error", title: errTitle, message: errMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this blog? This action is permanent.",
    );
    if (!confirmDelete) return;

    try {
      dispatch(startLoading());
      await deleteBlog(blogId);
      router.push("/admin/blog");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to delete . Ensure no sub-categories exist.",
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  if (loadingInitial) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="animate-spin text-[#b08fd9]" size={40} />
        <p className="text-sm font-medium text-[#6f5a88]">
          Loading post data...
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-6 animate-in fade-in duration-500"
    >
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-2 text-sm text-[#b08fd9] hover:text-[#2b1d3a] mb-2 transition-colors"
      >
        <MoveLeft size={16} /> Back to Articles
      </Link>

      {/* ── Global Notification ── */}
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
        {/* ── MAIN COLUMN ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title Section */}
          <section
            className={`rounded-3xl border bg-white p-6 shadow-sm transition-colors ${fieldErrors.title ? "border-red-300 bg-red-50/30" : "border-[#e7ddf2]"}`}
          >
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#b08fd9]">
                Article Title
              </label>
              <span className="text-[10px] text-[#6f5a88] bg-[#f6f3fb] px-2 py-0.5 rounded-md font-mono">
                ID: {blogId.slice(0, 8)}...
              </span>
            </div>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (fieldErrors.title)
                  setFieldErrors((p) => ({ ...p, title: "" }));
              }}
              className="w-full bg-transparent text-2xl font-bold text-[#2b1d3a] outline-none"
              placeholder="Enter title..."
            />
            {fieldErrors.title && (
              <p className="text-xs text-red-500 flex items-center gap-1 mt-2">
                <AlertCircle size={12} /> {fieldErrors.title}
              </p>
            )}
          </section>

          {/* Body Editor */}
          <div className="space-y-2">
            {fieldErrors.body && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                <AlertCircle size={14} className="shrink-0" />{" "}
                {fieldErrors.body}
              </div>
            )}
            <EditorWrapper
              onChange={(html) => {
                setBody(html);
                if (fieldErrors.body)
                  setFieldErrors((p) => ({ ...p, body: "" }));
              }}
              initialContent={body}
            />
          </div>

          {/* Media Section */}
          <section
            className={`rounded-3xl border bg-white p-8 shadow-sm transition-colors ${fieldErrors.thumbnail ? "border-red-300 bg-red-50/30" : "border-[#e7ddf2]"}`}
          >
            <h3 className="text-xs font-bold text-[#b08fd9] uppercase tracking-widest mb-4">
              Current Thumbnail
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
                  alt="Thumbnail"
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
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#e7ddf2] rounded-2xl p-6 cursor-pointer hover:bg-[#faf7ff] transition">
                  <Upload className="text-[#b08fd9] mb-2" size={24} />
                  <span className="text-xs font-bold text-[#6f5a88]">
                    Replace File
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) =>
                      setThumbnailFile(e.target.files?.[0] || null)
                    }
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setPickerOpen(true)}
                  className="flex flex-col items-center justify-center border-2 border-dashed border-[#e7ddf2] rounded-2xl p-6 hover:bg-[#faf7ff] transition"
                >
                  <ImageIcon className="text-[#b08fd9] mb-2" size={24} />
                  <span className="text-xs font-bold text-[#6f5a88]">
                    From Library
                  </span>
                </button>
              </div>
            )}
            {fieldErrors.thumbnail && (
              <p className="text-xs text-red-500 text-center mt-3">
                {fieldErrors.thumbnail}
              </p>
            )}
          </section>
        </div>

        {/* ── SIDEBAR ── */}
        <aside className="space-y-6">
          <section className="rounded-3xl border border-[#e7ddf2] bg-white p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-[#b08fd9] uppercase tracking-widest">
                Publish Status
              </h3>
              <span
                className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
              >
                {status}
              </span>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-2xl border border-[#eee4fb] bg-[#faf7ff] cursor-pointer hover:bg-[#f3ecff] transition">
                <div>
                  <span className="text-sm font-medium text-[#3e2a55]">
                    Featured Article
                  </span>
                  <p className="text-[10px] text-[#b08fd9]">
                    Pinned to homepage
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
                    Premium members only
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

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#b08fd9] uppercase tracking-widest">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-xl border border-[#e1d6f3] p-3 text-sm bg-white outline-none"
              >
                <option value="">None (No Category)</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleUpdateAction("published")}
              className="w-full rounded-2xl bg-[#2b1d3a] py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#3e2a55] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Saving...
                </>
              ) : (
                "Update Article"
              )}
            </button>

            {status === "published" ? (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleUpdateAction("draft")}
                className="w-full py-2 text-xs font-bold text-amber-600 hover:text-amber-700 transition"
              >
                Revert to Draft
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleUpdateAction("draft")}
                className="w-full py-2 text-xs font-bold text-[#6f5a88] hover:text-[#2b1d3a]"
              >
                Update Draft
              </button>
            )}
          </section>

          {/* SEO Metadata */}
          <section className="rounded-3xl border border-[#e7ddf2] bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#b08fd9] uppercase tracking-widest">
              SEO Configuration
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-[#b08fd9] font-bold uppercase">
                  Meta Title
                </span>
                <input
                  className="w-full rounded-xl border border-[#e1d6f3] p-3 text-xs outline-none focus:ring-4 ring-purple-100 transition"
                  value={metaTitle}
                  onChange={(e) => {
                    setMetaTitle(e.target.value);
                    setIsManualMetaTitle(true);
                  }}
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-[#b08fd9] font-bold uppercase">
                  Meta Description
                </span>
                <textarea
                  className="w-full rounded-xl border border-[#e1d6f3] p-3 text-xs min-h-[80px] outline-none resize-none"
                  value={metaDesc}
                  onChange={(e) => setMetaDesc(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-[#b08fd9] font-bold uppercase">
                  Tags
                </span>
                <input
                  className="w-full rounded-xl border border-[#e1d6f3] p-3 text-xs outline-none"
                  placeholder="Comma separated..."
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>
          </section>
          {/* Danger Zone Sidebar */}
          <aside className="space-y-6">
            <section className="rounded-3xl border border-red-100 bg-red-50/40 p-8 shadow-sm">
              <div className="flex items-center gap-2 text-red-600 mb-4">
                <Trash2 size={20} />
                <h4 className="text-xs font-black uppercase tracking-widest">
                  Danger Zone
                </h4>
              </div>
              <p className="text-xs text-[#6f5a88] leading-relaxed mb-6">
                Deleting this article is permanent and cannot be undone.
              </p>
              <button
                onClick={handleDelete}
                disabled={isGlobalLoading}
                className="w-full rounded-xl border-2 border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-95"
              >
                Delete Permanently
              </button>
            </section>
          </aside>
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
