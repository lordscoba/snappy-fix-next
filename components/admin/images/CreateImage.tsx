"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Upload,
  X,
  Image as ImageIcon,
  FileText,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { startLoading, stopLoading } from "@/store/slices/loadingSlices";
import { RootState } from "@/store";
import { createImage } from "@/lib/api/services/admin.image.service";

interface FilePreview extends File {
  preview: string;
}

export default function UploadImagesComponent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isGlobalLoading = useSelector(
    (state: RootState) => state.loading.globalLoading,
  );

  const [files, setFiles] = useState<FilePreview[]>([]);
  const [formData, setFormData] = useState({
    file_name: "",
    description: "",
    image_type: "news_media",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ) as FilePreview[];
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = async () => {
    if (files.length === 0)
      return setError("Please select at least one image.");

    try {
      setError(null);
      dispatch(startLoading());

      await createImage({
        ...formData,
        images: files,
      });

      setSuccess(`Successfully uploaded ${files.length} image(s)!`);
      setTimeout(() => router.push("/admin/images"), 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred during upload.",
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5 items-start">
      {/* --- FORM SECTION --- */}
      <section className="lg:col-span-2 space-y-6">
        <div className="rounded-[2rem] border border-[#e7ddf2] bg-white p-8 shadow-sm">
          <h3 className="text-lg font-bold text-[#2b1d3a] mb-6 flex items-center gap-2">
            <FileText size={20} className="text-[#b08fd9]" />
            Asset Metadata
          </h3>

          <div className="space-y-5">
            <label className="block space-y-2 text-sm font-bold text-[#6f5a88]">
              Custom Filename (Optional)
              <input
                type="text"
                value={formData.file_name}
                onChange={(e) =>
                  setFormData({ ...formData, file_name: e.target.value })
                }
                placeholder="Defaults to original filename"
                className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 outline-none focus:border-[#b08fd9] focus:ring-4 focus:ring-[#e9dbff] transition-all"
              />
            </label>

            <label className="block space-y-2 text-sm font-bold text-[#6f5a88]">
              Description
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Briefly describe these assets..."
                className="w-full rounded-2xl border border-[#e1d6f3] bg-white px-4 py-3 min-h-[120px] outline-none focus:border-[#b08fd9] transition-all"
              />
            </label>

            <div className="pt-4 space-y-3">
              <button
                onClick={handleSubmit}
                disabled={isGlobalLoading || files.length === 0}
                className="w-full rounded-2xl bg-[#2b1d3a] py-4 text-sm font-bold text-white shadow-xl shadow-purple-100 transition-all hover:bg-[#3e2a55] disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isGlobalLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Upload size={20} />
                )}
                Upload to Cloud
              </button>

              <button
                onClick={() => router.back()}
                className="w-full py-2 text-sm font-bold text-[#b08fd9] hover:text-[#2b1d3a] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl bg-red-50 border border-red-100 p-4 text-red-600 text-sm flex items-center gap-3 animate-shake">
            <AlertCircle size={20} />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="rounded-2xl bg-green-50 border border-green-100 p-4 text-green-600 text-sm flex items-center gap-3">
            <CheckCircle2 size={20} />
            <p className="font-bold">{success}</p>
          </div>
        )}
      </section>

      {/* --- DROPZONE SECTION --- */}
      <section className="lg:col-span-3 space-y-6">
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files) {
              const droppedFiles = Array.from(e.dataTransfer.files).map(
                (file) =>
                  Object.assign(file, { preview: URL.createObjectURL(file) }),
              ) as FilePreview[];
              setFiles((prev) => [...prev, ...droppedFiles]);
            }
          }}
          className="group relative flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-[#e7ddf2] bg-[#faf7ff] p-12 text-center transition-all hover:border-[#b08fd9] hover:bg-[#f3ecff] cursor-pointer"
        >
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <div className="mb-4 rounded-3xl bg-white p-6 shadow-sm group-hover:scale-110 transition-transform">
            <Upload size={32} className="text-[#b08fd9]" />
          </div>

          <h4 className="text-lg font-bold text-[#2b1d3a]">
            Click or Drop Images Here
          </h4>
          <p className="mt-1 text-sm text-[#b08fd9]">
            Supports PNG, JPG, GIF up to 5MB per file
          </p>
        </div>

        {/* --- PREVIEW LIST --- */}
        {files.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
            {files.map((file, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-3xl border border-[#e7ddf2] bg-white p-2 shadow-sm overflow-hidden"
              >
                <img
                  src={file.preview}
                  alt="preview"
                  className="h-full w-full rounded-2xl object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className="absolute right-3 top-3 rounded-xl bg-red-500 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
                >
                  <X size={14} />
                </button>
                <div className="absolute bottom-3 left-3 right-3 truncate rounded-lg bg-black/50 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                  {(file.size / 1024).toFixed(0)} KB
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
