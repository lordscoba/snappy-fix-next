import { posts } from "../../../../data/BlogData";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "The blog post you’re looking for does not exist.",
    };
  }

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      images: [{ url: post.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.ogImage],
    },
  };
}

export default async function BlogDetails({ params }: { params: Params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Blog post not found.</p>
      </main>
    );
  }

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#f8f5ff]">
        <div className="absolute -right-32 -top-40 h-80 w-80 rounded-full bg-[#e7dbff] blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-[24rem] w-[24rem] rounded-full bg-[#ffd6e7] blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 py-16 space-y-6">
          <Link href="/blog" className="text-sm text-[#fb397d] hover:underline">
            ← Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#6f5a88]">
            <span className="rounded-full bg-white px-3 py-1 shadow">
              {post.category}
            </span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-[#2b1d3a]">
            {post.title}
          </h1>

          <p className="text-base text-[#6f5a88] max-w-3xl">
            {post.metaDescription}
          </p>

          <div className="flex items-center gap-3 text-sm text-[#6f5a88]">
            <span className="h-10 w-10 rounded-2xl bg-white shadow" />
            <span>By {post.author}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <figure className="relative h-72 w-full overflow-hidden rounded-3xl shadow">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </figure>

        <article className="space-y-6 text-[#4d3b63] leading-relaxed text-lg">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2">
          {post.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-[#f4edff] px-3 py-1 text-xs text-[#5b32b4]"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-[#e7ddf2] bg-[#faf7ff] p-8">
          <h3 className="text-xl font-semibold text-[#2b1d3a]">
            Want more insights like this?
          </h3>
          <p className="mt-2 text-sm text-[#6f5a88]">
            Subscribe to get new articles and product updates from Snappy‑Fix.
          </p>
          <button className="mt-5 rounded-full bg-[#5b32b4] px-6 py-3 text-white text-sm font-semibold hover:bg-[#47238f]">
            Subscribe
          </button>
        </div>

        {/* Related posts */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#2b1d3a]">
            Related articles
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs text-[#b5aec4]">{r.category}</p>
                <h4 className="mt-2 font-semibold text-[#2b1d3a] group-hover:underline">
                  {r.title}
                </h4>
                <p className="mt-2 text-sm text-[#6f5a88]">{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
