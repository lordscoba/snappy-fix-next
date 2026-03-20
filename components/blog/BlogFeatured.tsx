"use client";

import Image from "next/image";
import Link from "next/link";
import { HiStar, HiClock } from "react-icons/hi2";

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

export default function BlogFeatured({ posts }: { posts: PostCard[] }) {
  if (!posts.length) return null;

  const [main, ...rest] = posts;

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <HiStar className="text-[#fb397d] text-xl" />
        <h2 className="text-white text-sm font-black uppercase tracking-[0.2em]">
          Featured
        </h2>
        <div className="flex-1 h-px bg-white/10" />
        <Link
          href="/blog/list"
          className="text-xs text-[#9d86b8] hover:text-[#fb397d] transition-colors font-medium"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5">
        {/* Main featured card */}
        <Link href={`/blog/${main.slug}`} className="group block">
          <article className="relative h-[420px] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src={main.cover}
              alt={main.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0716] via-[#0e0716]/50 to-transparent" />

            {/* Featured badge */}
            <div className="absolute top-5 left-5">
              <span className="inline-flex items-center gap-1.5 bg-[#fb397d]/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                <HiStar size={10} />
                Featured
              </span>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-[10px] font-bold text-[#fb397d] uppercase tracking-widest">
                {main.category}
              </span>
              <h3 className="text-2xl font-black text-white mt-2 mb-3 leading-tight group-hover:text-[#e0ccff] transition-colors">
                {main.title}
              </h3>
              <p className="text-[#9d86b8] text-sm line-clamp-2 mb-4">
                {main.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-[#6f5a88]">
                <span>{main.author}</span>
                <span className="flex items-center gap-1">
                  <HiClock size={11} />
                  {main.readingTime}
                </span>
                <span>{main.date}</span>
              </div>
            </div>
          </article>
        </Link>

        {/* Side cards stack */}
        <div className="flex flex-col gap-5">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block flex-1"
            >
              <article className="relative h-[197px] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0716]/95 via-[#0e0716]/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[10px] font-bold text-[#fb397d] uppercase tracking-widest">
                    {post.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1 leading-snug group-hover:text-[#e0ccff] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] text-[#6f5a88] mt-2">
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1">
                      <HiClock size={10} />
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
