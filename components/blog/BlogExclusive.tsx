"use client";

import Image from "next/image";
import Link from "next/link";
import { HiLockClosed, HiClock } from "react-icons/hi2";

type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  cover: string;
  author: string;
  readingTime: string;
};

export default function BlogExclusive({ posts }: { posts: PostCard[] }) {
  if (!posts.length) return null;

  return (
    <aside className="flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <HiLockClosed className="text-[#fb397d] text-xl" />
        <h2 className="text-white text-sm font-black uppercase tracking-[0.2em]">
          Exclusive
        </h2>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Top banner card */}
      <div className="relative rounded-2xl overflow-hidden mb-5 border border-[#fb397d]/20 bg-gradient-to-br from-[#5b32b4]/20 to-[#fb397d]/10 p-5">
        <div className="absolute top-0 right-0 w-28 h-28 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#fb397d] to-[#5b32b4] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
            <HiLockClosed size={10} />
            Exclusive Access
          </span>
          <p className="text-[#c4b5d9] text-sm leading-relaxed">
            Premium insights and in-depth guides from the Snappy-Fix team —
            crafted for builders who want the edge.
          </p>
        </div>
      </div>

      {/* Exclusive post list */}
      <div className="flex flex-col gap-4">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="flex gap-4 bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 hover:bg-[#1a0f2e] hover:border-[#5b32b4]/50 transition-all duration-300">
              {/* Thumbnail */}
              <figure className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  sizes="80px"
                />
                <div className="absolute inset-0 bg-[#0e0716]/30" />
                {/* Index badge */}
                <span className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#fb397d] text-white text-[10px] font-black flex items-center justify-center">
                  {i + 1}
                </span>
              </figure>

              {/* Meta */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <span className="text-[10px] font-bold text-[#fb397d] uppercase tracking-widest">
                  {post.category}
                </span>
                <h3 className="text-white text-sm font-bold leading-snug line-clamp-2 group-hover:text-[#e0ccff] transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-[#6f5a88]">
                  <span className="flex items-center gap-1">
                    <HiClock size={10} className="text-[#fb397d]" />
                    {post.readingTime}
                  </span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Newsletter mini CTA */}
      <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#5b32b4] to-[#2b1d3a] p-5 border border-[#5b32b4]/40">
        <h3 className="text-white font-black text-base mb-1">
          Never miss a post
        </h3>
        <p className="text-[#c4b5d9] text-xs mb-4 leading-relaxed">
          Get the latest from Snappy‑Fix delivered to your inbox.
        </p>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#6f5a88] focus:outline-none focus:border-[#fb397d] transition-colors"
          />
          <button className="w-full bg-[#fb397d] hover:bg-[#e02d6d] text-white text-sm font-bold py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#fb397d]/30">
            Subscribe
          </button>
        </div>
      </div>
    </aside>
  );
}
