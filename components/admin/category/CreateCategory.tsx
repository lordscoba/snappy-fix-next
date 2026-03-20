"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import { RootState } from "@/store";
import { AlertCircle, Loader2 } from "lucide-react";
import { createCategory } from "@/lib/api/services/admin.category.service";

export default function CreateCategoryComponent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isGlobalLoading = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    level: 0,
    parent_id: "" as string | null,
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!formData.name) return setError("Category name is required");

    try {
      setError(null);
      dispatch(startLoading());
      await createCategory({
        ...formData,
        parent_id: formData.parent_id === "" ? null : formData.parent_id,
      });
      setSuccessMessage("Category created! Redirecting to ...");
      setTimeout(() => {
        router.push("/admin/category");
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create category");
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <section className="max-w-2xl rounded-3xl border border-[#e7ddf2] bg-white p-8 shadow">
      <div className="grid gap-6">
        <label className="space-y-2 text-sm font-medium text-[#3e2a55]">
          Category Name
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 outline-none focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff]"
            placeholder="e.g. Artificial Intelligence"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-[#3e2a55]">
          Description
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 min-h-[100px] outline-none focus:border-[#b08fd9]"
            placeholder="Brief summary..."
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="space-y-2 text-sm font-medium text-[#3e2a55]">
            Hierarchy Level
            <input
              type="number"
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: parseInt(e.target.value) })
              }
              className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-[#3e2a55]">
            Parent Category
            <select
              value={formData.parent_id ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, parent_id: e.target.value })
              }
              className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 outline-none"
            >
              <option value="">None (Root)</option>
              <option value="tech-id">Technology</option>
            </select>
          </label>
        </div>

        <div className="pt-4 flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={isGlobalLoading}
            className="flex-1 rounded-2xl bg-[#2b1d3a] py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#45325a] disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isGlobalLoading && <Loader2 className="animate-spin" size={18} />}
            Create Category
          </button>
          <button
            onClick={() => router.back()}
            className="px-6 py-4 text-sm font-semibold text-[#6f5a88]"
          >
            Cancel
          </button>
        </div>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm flex items-center gap-3">
          <AlertCircle size={18} />
          <p>{error}</p>
        </div>
      )}
      {successMessage && (
        <div className="mt-6 bg-green-50 border border-green-100 text-green-600 p-4 rounded-xl text-sm font-medium animate-pulse">
          ✅ {successMessage}
        </div>
      )}
    </section>
  );
}
