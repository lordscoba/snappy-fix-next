"use client";

import "@/lib/editor/styles.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MoveLeft,
  Edit3,
  Calendar,
  Clock,
  Tag,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { getAdminBlogDetails } from "@/lib/api/services/admin.blog.service";
import { News } from "@/types/blog-types"; // Adjust path as needed

export default function BlogdetailsComponent({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        // Using slug as requested
        const response = await getAdminBlogDetails(slug);
        setBlog(response.data.data.news);
      } catch (err) {
        setError("Failed to load article details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return <BlogDetailsSkeleton />;

  if (error || !blog) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-red-50 rounded-3xl text-red-600 border border-red-100">
        <AlertCircle size={40} className="mb-4" />
        <p className="font-semibold">{error || "Article not found"}</p>
        <Link href="/admin/blog" className="mt-4 text-sm underline">
          Back to List
        </Link>
      </div>
    );
  }
  return (
    <div className="animate-in fade-in duration-500">
      {/* Back Button */}
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-2 text-sm text-[#b08fd9] hover:text-[#2b1d3a] mb-6 transition-colors"
      >
        <MoveLeft size={16} /> Back to Articles
      </Link>

      {/* Stats & Status */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <StatCard label="Total Views" value="--" trend="Metric pending" />
        <StatCard
          label="Category"
          value={blog.category?.name || "Uncategorized"}
        />
        <StatCard
          label="Type"
          value={blog.is_exclusive ? "Exclusive" : "Standard"}
        />

        <div className="rounded-3xl border border-[#e7ddf2] bg-white p-6 shadow-sm flex flex-col justify-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b08fd9] mb-2">
            Status
          </p>
          <div className="flex gap-2">
            <span
              className={`rounded-lg px-2 py-1 text-[10px] font-bold uppercase ${
                blog.status === "published"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {blog.status}
            </span>
            {blog.is_featured && (
              <span className="rounded-lg bg-[#2b1d3a] px-2 py-1 text-[10px] font-bold text-white uppercase">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* --- 1. Article Content Section --- */}
          <section className="rounded-3xl border border-[#e7ddf2] bg-white p-4 md:p-8 shadow">
            <div className="mb-6">
              <span className="text-xs font-bold text-[#b08fd9] uppercase tracking-widest">
                Article Body
              </span>
              <h2 className="mt-2 text-2xl font-bold text-[#2b1d3a]">
                {blog.title}
              </h2>
              <p className="text-sm text-[#6f5a88] mt-1 italic">/{blog.slug}</p>
            </div>

            {/* Render the Body HTML */}
            <div
              className="tiptap prose prose-purple max-w-none text-[#2b1d3a] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />

            {/* Dynamic Tags */}
            <div className="mt-8 pt-6 border-t border-[#eee4fb] flex flex-wrap gap-2">
              {blog.tags?.split(",").map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-[#f1e9ff] px-4 py-1.5 text-xs font-medium text-[#6f5a88]"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </section>

          {/* --- 2. Separate Thumbnail Section --- */}
          {blog.thumbnail_url && (
            <section className="rounded-3xl border border-[#e7ddf2] bg-white p-8 shadow">
              <div className="mb-4">
                <span className="text-xs font-bold text-[#b08fd9] uppercase tracking-widest">
                  Main Thumbnail
                </span>
              </div>

              <div className="aspect-video w-full rounded-2xl bg-[#f6f3fb] border border-[#eee4fb] overflow-hidden relative group">
                <img
                  src={blog.thumbnail_url}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-sm text-white text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  ID: {blog.thumbnail_id}
                </div>
              </div>
            </section>
          )}

          {/* --- 3. Gallery Section --- */}
          {blog.images && blog.images.length > 0 && (
            <section className="rounded-3xl border border-[#e7ddf2] bg-white p-8 shadow">
              <h3 className="text-sm font-bold text-[#b08fd9] uppercase tracking-widest mb-4">
                Associated Images
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {blog.images.map((img) => (
                  <div
                    key={img.id}
                    className="aspect-square rounded-xl bg-[#faf7ff] border border-[#eee4fb] overflow-hidden"
                  >
                    <img
                      src={img.url}
                      alt="Gallery"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Info */}
        <aside className="space-y-6">
          <section className="rounded-3xl border border-[#eee4fb] bg-[#faf7ff] p-8">
            <h3 className="text-sm font-bold text-[#b08fd9] uppercase tracking-widest mb-6">
              SEO Configuration
            </h3>
            <div className="space-y-6">
              <SEOItem
                label="Meta Title"
                value={blog.meta_title || blog.title}
              />
              <SEOItem
                label="Meta Description"
                value={blog.meta_desc || "No description set."}
              />

              <div className="pt-4">
                <div className="flex justify-between text-xs py-2 border-b border-[#e6dcf4]">
                  <span className="text-[#6f5a88]">Exclusive?</span>
                  <span
                    className={`font-bold ${blog.is_exclusive ? "text-pink-600" : "text-[#2b1d3a]"}`}
                  >
                    {blog.is_exclusive ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={`/admin/blog/update/${blog.slug}`}
              className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-[#2b1d3a] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#3e2a55]"
            >
              <Edit3 size={16} /> Edit Post
            </Link>
          </section>

          {/* Publishing Info */}
          <section className="rounded-3xl border border-[#e7ddf2] bg-white p-6 shadow-sm">
            <h3 className="text-xs font-bold text-[#b08fd9] uppercase tracking-widest mb-4">
              Timestamps
            </h3>
            <div className="space-y-4">
              <TimestampRow
                icon={<Calendar size={12} />}
                label="Published"
                value={
                  blog.created_at
                    ? new Date(blog.created_at).toLocaleDateString()
                    : "Not Published"
                }
              />
              <TimestampRow
                icon={<Clock size={12} />}
                label="Last Updated"
                value={new Date(blog.updated_at).toLocaleDateString()}
              />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

/* ---------------- Helper Components ---------------- */

function SEOItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-[#b08fd9] uppercase mb-1">
        {label}
      </p>
      <p className="text-sm font-semibold text-[#2b1d3a] line-clamp-3">
        {value}
      </p>
    </div>
  );
}

function TimestampRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 text-[#6f5a88]">
        {icon} <span>{label}</span>
      </div>
      <span className="font-medium text-[#2b1d3a]">{value}</span>
    </div>
  );
}

function BlogDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-32 bg-gray-200 rounded mb-8" />
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-3xl" />
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 h-96 bg-gray-100 rounded-3xl" />
        <div className="h-96 bg-gray-100 rounded-3xl" />
      </div>
    </div>
  );
}
