"use client";

import { posts } from "@/data/BlogData";
import Image from "next/image";
import Link from "next/link";

const Blog = () => {
  return (
    <section id="blog" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <header className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Snappy‑Fix Insights
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read our latest ideas on design, development, and building
            high‑performing digital products.
          </p>
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
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
                    By {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold text-[#fb397d] hover:underline"
                  >
                    <span className="sr-only">
                      Read more about {post.title}
                    </span>
                    <span aria-hidden="true">Read more</span>{" "}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/blog"
            className="rounded-full bg-[#5b32b4] px-8 py-3 text-white font-medium hover:bg-[#47238f]"
          >
            View all articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
