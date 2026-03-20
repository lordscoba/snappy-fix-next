import type { Metadata } from "next";
import { NavbarMenu } from "@/components/Layout";
import BlogDetailsComponent from "@/components/blog/BlogDetailsComponent";
import {
  fetchAllPublishedPosts,
  getBlogDetails,
  getBlogList,
} from "@/lib/api/services/blog.service";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await getBlogDetails(slug);
    const post = res.data.data.news;

    if (!post) {
      return {
        title: "Post not found | Snappy‑Fix Blog",
        description: "The blog post you're looking for does not exist.",
      };
    }

    const ogImage =
      post.thumbnail_url || "https://www.snappy-fix.com/images/og-default.png";

    return {
      title: `${post.meta_title || post.title} | Snappy‑Fix Blog`,
      description: post.meta_desc || post.title,
      keywords: post.tags || "",
      authors: [{ name: "Snappy‑Fix Team" }],
      openGraph: {
        title: post.meta_title || post.title,
        description: post.meta_desc || post.title,
        type: "article",
        publishedTime: post.created_at || post.updated_at,
        modifiedTime: post.updated_at,
        authors: ["Snappy‑Fix Team"],
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.meta_title || post.title,
        description: post.meta_desc || post.title,
        images: [ogImage],
      },
      alternates: {
        canonical: `https://www.snappy-fix.com/blog/${post.slug}`,
      },
      robots: {
        index: post.status === "published",
        follow: true,
      },
    };
  } catch {
    return {
      title: "Blog | Snappy‑Fix",
      description: "Read the latest insights from the Snappy‑Fix team.",
    };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await fetchAllPublishedPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogDetailsPage({ params }: { params: Params }) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-[#0e0716]">
      <NavbarMenu background="bg-[#884bdf]" />
      <BlogDetailsComponent slug={slug} />
    </main>
  );
}
