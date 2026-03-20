"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle, Loader2, Save, Trash2, ChevronLeft } from "lucide-react";

import {
  getAdminCategoryDetails,
  getAdminCategories,
  updateCategory,
  deleteCategory,
} from "@/lib/api/services/admin.category.service";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import { Category } from "@/types/category-types";
import { RootState } from "@/store";

export default function UpdateCategoryComponent({ slug }: { slug: string }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isGlobalLoading = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    level: 0,
    parent_id: "" as string | null,
  });

  /* ---------------- Fetch Initial Data ---------------- */
  useEffect(() => {
    const initData = async () => {
      try {
        setFetching(true);
        const [detailsRes, listRes] = await Promise.all([
          getAdminCategoryDetails(slug),
          getAdminCategories(),
        ]);

        const cat = detailsRes.data.data.category;
        setFormData({
          id: cat.id,
          name: cat.name,
          description: cat.description,
          level: cat.level,
          parent_id: cat.parent_id || "",
        });
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to load category details.",
        );
      } finally {
        setFetching(false);
      }
    };

    initData();
  }, [slug]);

  /* ---------------- Handlers ---------------- */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      dispatch(startLoading());
      await updateCategory(formData.id, {
        ...formData,
        parent_id: formData.parent_id === "" ? null : formData.parent_id,
      });
      router.push(`/admin/category/details/${slug}`);
      router.refresh();
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred while updating.",
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this category? This action is permanent.",
    );
    if (!confirmDelete) return;

    try {
      dispatch(startLoading());
      await deleteCategory(formData.id);
      router.push("/admin/category");
    } catch (err: any) {
      setError("Failed to delete category. Ensure no sub-categories exist.");
    } finally {
      dispatch(stopLoading());
    }
  };

  if (fetching) return <UpdateSkeleton />;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-[#b08fd9] hover:text-[#2b1d3a] transition-colors"
      >
        <ChevronLeft size={16} /> Back
      </button>

      {error && (
        <div className="max-w-2xl bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm flex items-center gap-3">
          <AlertCircle size={18} />
          <p>{error}</p>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Form Section */}
        <section className="lg:col-span-2 rounded-[2.5rem] border border-[#e7ddf2] bg-white p-8 md:p-10 shadow-sm">
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid gap-6">
              <label className="space-y-2 text-sm font-bold text-[#3e2a55]">
                Category Name
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-2xl border border-[#e1d6f3] bg-[#faf9ff] px-5 py-4 outline-none focus:bg-white focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff] transition-all"
                  placeholder="e.g. Artificial Intelligence"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-bold text-[#3e2a55]">
                Description
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded-2xl border border-[#e1d6f3] bg-[#faf9ff] px-5 py-4 min-h-[140px] outline-none focus:bg-white focus:border-[#b08fd9] transition-all"
                  placeholder="What is this category about?"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="space-y-2 text-sm font-bold text-[#3e2a55]">
                  Hierarchy Level
                  <input
                    type="number"
                    value={formData.level}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        level: parseInt(e.target.value),
                      })
                    }
                    className="w-full rounded-2xl border border-[#e1d6f3] bg-[#faf9ff] px-5 py-4 outline-none focus:bg-white focus:border-[#b08fd9]"
                  />
                </label>
                <label className="space-y-2 text-sm font-bold text-[#3e2a55]">
                  Parent Category
                  <select
                    value={formData.parent_id || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, parent_id: e.target.value })
                    }
                    className="w-full rounded-2xl border border-[#e1d6f3] bg-[#faf9ff] px-5 py-4 outline-none focus:bg-white focus:border-[#b08fd9] appearance-none"
                  >
                    <option value="">None (Root Category)</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-[#f3ecff]">
              <button
                type="submit"
                disabled={isGlobalLoading}
                className="w-full sm:w-auto px-8 rounded-2xl bg-[#2b1d3a] py-4 text-sm font-bold text-white shadow-lg shadow-purple-100 hover:bg-[#45325a] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {isGlobalLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Save size={18} />
                )}
                Save Category Changes
              </button>
            </div>
          </form>
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
              Deleting this category will remove its associations from all
              existing blog posts. This action is irreversible.
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
      </div>
    </div>
  );
}

/* ---------------- Loading Skeleton ---------------- */
function UpdateSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-4 w-20 bg-gray-200 rounded" />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 h-[500px] bg-gray-100 rounded-[2.5rem]" />
        <div className="h-48 bg-gray-100 rounded-3xl" />
      </div>
    </div>
  );
}
