"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

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

type BlogListProps = {
  posts: PostCard[];
  perPage?: number;
};

export default function BlogList({ posts, perPage = 5 }: BlogListProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(posts.length / perPage);

  const pagePosts = useMemo(() => {
    const start = (page - 1) * perPage;
    return posts.slice(start, start + perPage);
  }, [page, posts, perPage]);

  return (
    <section className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pagePosts.map((post) => (
          <article
            key={post.slug}
            className="group rounded-3xl border bg-white overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <figure className="relative h-52 w-full overflow-hidden">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </figure>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#b5aec4]">
                <span className="bg-[#f4edff] text-[#5b32b4] px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span>{post.date}</span>
              </div>

              <h3 className="text-xl font-semibold text-[#2b1d3a]">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#6f5a88]">
                  By {post.author} • {post.readingTime}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-semibold text-[#fb397d] hover:underline"
                >
                  Read more
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="rounded-full border px-4 py-2 text-sm text-[#5b32b4] hover:bg-[#f4edff]"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`h-9 w-9 rounded-full text-sm font-medium ${
              page === i + 1
                ? "bg-[#fb397d] text-white"
                : "bg-white text-[#5b32b4] border"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="rounded-full border px-4 py-2 text-sm text-[#5b32b4] hover:bg-[#f4edff]"
        >
          Next
        </button>
      </div>
    </section>
  );
}
