"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MoveLeft,
  Calendar,
  Clock,
  User,
  Edit3,
  AlertCircle,
} from "lucide-react";
import { getAdminCategoryDetails } from "@/lib/api/services/admin.category.service";
import { Category } from "@/types/category-types";
import StatCard from "../StatCard";

export default function CategoryDetailsComponent({
  params,
}: {
  params: { slug: string };
}) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await getAdminCategoryDetails(params.slug);
        setCategory(response.data.data.category);
      } catch (err) {
        setError("Could not load category details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [params.slug]);

  if (loading) return <CategoryDetailsSkeleton />;

  if (error || !category) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-3xl border border-red-100 text-red-600">
        <AlertCircle className="mb-4" size={40} />
        <p className="font-semibold">{error || "Category not found"}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-sm underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* Back Action */}
      <Link
        href="/admin/categories"
        className="inline-flex items-center gap-2 text-sm text-[#b08fd9] hover:text-[#2b1d3a] mb-6 transition-colors"
      >
        <MoveLeft size={16} /> Back to Categories
      </Link>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <StatCard label="Total Posts" value="124" trend="+12 this month" />
        <StatCard label="Level" value={category.level.toString()} />
        <StatCard label="Avg. Read Time" value="4.2m" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Info */}
        <section className="lg:col-span-2 rounded-3xl border border-[#e7ddf2] bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-[#2b1d3a]">
              General Information
            </h3>
            <span className="px-3 py-1 bg-[#f3ecff] text-[#5b32b4] text-[10px] font-bold uppercase rounded-full tracking-wider">
              {category.parent_id ? "Sub-Category" : "Root Category"}
            </span>
          </div>

          <div className="divide-y divide-[#f8f5ff]">
            <DetailRow label="Display Name" value={category.name} />
            <DetailRow label="URL Slug" value={category.slug} />
            <DetailRow
              label="Description"
              value={category.description || "No description provided."}
              isLong
            />
          </div>
        </section>

        {/* Sidebar Meta */}
        <section className="rounded-3xl border border-[#eee4fb] bg-[#faf7ff] p-8 flex flex-col">
          <h3 className="text-xs font-black text-[#b08fd9] uppercase tracking-[0.2em] mb-6">
            Metadata
          </h3>

          <div className="space-y-6 flex-1">
            <MetaItem
              icon={<Calendar size={14} />}
              label="Created"
              value={new Date(category.created_at).toLocaleDateString(
                undefined,
                { dateStyle: "medium" },
              )}
            />
            <MetaItem
              icon={<Clock size={14} />}
              label="Updated"
              value={new Date(category.updated_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            />
            <MetaItem
              icon={<User size={14} />}
              label="Author"
              value="Admin-Fix"
            />
          </div>

          <Link
            href={`/admin/category/update/${category.slug}`}
            className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-[#2b1d3a] px-4 py-4 text-sm font-bold text-white hover:bg-[#45325a] shadow-lg shadow-purple-100 transition-all active:scale-95"
          >
            <Edit3 size={16} /> Edit Category
          </Link>
        </section>
      </div>
    </div>
  );
}

/* ---------------- Sub-Components ---------------- */

function DetailRow({
  label,
  value,
  isLong,
}: {
  label: string;
  value: string;
  isLong?: boolean;
}) {
  return (
    <div className={`py-5 flex flex-col sm:flex-row sm:items-start gap-2`}>
      <span className="w-40 shrink-0 font-bold text-[#b08fd9] uppercase text-[10px] tracking-widest pt-1">
        {label}
      </span>
      <span
        className={`text-sm ${isLong ? "text-[#6f5a88] leading-relaxed" : "text-[#2b1d3a] font-medium"}`}
      >
        {value}
      </span>
    </div>
  );
}

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
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-white border border-[#eee4fb] flex items-center justify-center text-[#b08fd9]">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-tighter text-[#b08fd9] font-bold">
          {label}
        </p>
        <p className="text-sm font-semibold text-[#2b1d3a]">{value}</p>
      </div>
    </div>
  );
}

/* ---------------- Skeleton Loader ---------------- */

function CategoryDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-32 bg-gray-200 rounded mb-8" />
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-3xl" />
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 h-80 bg-gray-100 rounded-3xl" />
        <div className="h-80 bg-gray-100 rounded-3xl" />
      </div>
    </div>
  );
}
