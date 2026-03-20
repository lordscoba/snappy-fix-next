"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MoveLeft,
  Calendar,
  HardDrive,
  FileCode,
  Trash2,
  ExternalLink,
  Info,
  AlertCircle,
  Hash,
  Download,
} from "lucide-react";
import {
  getAdminImageDetails,
  deleteImage,
} from "@/lib/api/services/admin.image.service";
import { ImageAsset } from "@/types/image-types";

export default function ImageDetailsComponent({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [asset, setAsset] = useState<ImageAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await getAdminImageDetails(params.id);
        setAsset(response.data.data.image);
      } catch (err) {
        setError("Could not load image details. It may have been removed.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [params.id]);

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this image? This will permanently remove it from Cloudinary and your database.",
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      await deleteImage(params.id);
      router.push("/admin/images");
    } catch (err) {
      alert("Failed to delete image. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <ImageDetailsSkeleton />;

  if (error || !asset) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-[2rem] border border-red-100 text-red-600">
        <AlertCircle className="mb-4" size={40} />
        <p className="font-semibold">{error || "Image asset not found"}</p>
        <Link href="/admin/images" className="mt-4 text-sm underline">
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Action Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/admin/images"
          className="inline-flex items-center gap-2 text-sm text-[#b08fd9] hover:text-[#2b1d3a] transition-colors"
        >
          <MoveLeft size={16} /> Back to Media Library
        </Link>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 rounded-2xl bg-red-50 px-5 py-2.5 text-xs font-bold text-red-600 hover:bg-red-100 transition-all disabled:opacity-50"
        >
          <Trash2 size={16} /> {deleting ? "Deleting..." : "Delete Asset"}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left: Visual Preview */}
        <section className="lg:col-span-3 space-y-6">
          <div className="rounded-[2.5rem] border border-[#e7ddf2] bg-white p-4 shadow-sm overflow-hidden">
            <div className="relative group rounded-[2rem] overflow-hidden bg-[#faf7ff] border border-[#eee4fb]">
              <img
                src={asset.url}
                alt={asset.file_name}
                className="w-full h-auto max-h-[600px] object-contain mx-auto"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </div>

          <div className="rounded-3xl border border-[#e7ddf2] bg-white p-8">
            <div className="flex items-center gap-2 mb-4 text-[#2b1d3a]">
              <Info size={18} className="text-[#b08fd9]" />
              <h3 className="text-lg font-bold">Description</h3>
            </div>
            <p className="text-[#6f5a88] text-sm leading-relaxed">
              {asset.description ||
                "No description was provided for this asset."}
            </p>
          </div>
        </section>

        {/* Right: Detailed Metadata */}
        <section className="lg:col-span-2 space-y-6">
          <div className="rounded-[2.5rem] border border-[#eee4fb] bg-[#faf7ff] p-8">
            <h3 className="text-xs font-black text-[#b08fd9] uppercase tracking-[0.2em] mb-8">
              Technical Specs
            </h3>

            <div className="space-y-6">
              <MetaItem
                icon={<FileCode size={16} />}
                label="Filename"
                value={asset.file_name}
              />
              <MetaItem
                icon={<Hash size={16} />}
                label="Public ID"
                value={asset.public_id || "N/A"}
              />
              <MetaItem
                icon={<HardDrive size={16} />}
                label="File Size"
                value={`${(asset.size / 1024).toFixed(2)} KB`}
              />
              <MetaItem
                icon={<Calendar size={16} />}
                label="Uploaded On"
                value={new Date(asset.created_at).toLocaleDateString(
                  undefined,
                  {
                    dateStyle: "long",
                  },
                )}
              />
              <MetaItem
                icon={<Info size={16} />}
                label="MIME Type"
                value={asset.image_type}
              />
            </div>

            <div className="mt-10 pt-8 border-t border-[#eee4fb] space-y-3">
              <a
                href={asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-2xl bg-white border border-[#e7ddf2] px-4 py-4 text-sm font-bold text-[#2b1d3a] hover:bg-[#f1e9ff] transition-all"
              >
                <ExternalLink size={16} /> Open Original
              </a>
              <button
                onClick={() => window.open(asset.url, "_blank")}
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-[#2b1d3a] px-4 py-4 text-sm font-bold text-white hover:bg-[#3e2a55] shadow-lg transition-all active:scale-95"
              >
                <Download size={16} /> Download Asset
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------- Sub-Components ---------------- */

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 shrink-0 rounded-2xl bg-white border border-[#eee4fb] flex items-center justify-center text-[#b08fd9] shadow-sm">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wider text-[#b08fd9] font-black mb-0.5">
          {label}
        </p>
        <p className="text-sm font-bold text-[#2b1d3a] break-all leading-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ---------------- Skeleton Loader ---------------- */

function ImageDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="flex justify-between">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-10 w-32 bg-gray-100 rounded-2xl" />
      </div>
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <div className="h-[400px] bg-gray-100 rounded-[2.5rem]" />
          <div className="h-32 bg-gray-100 rounded-3xl" />
        </div>
        <div className="lg:col-span-2 h-[550px] bg-gray-50 rounded-[2.5rem]" />
      </div>
    </div>
  );
}
