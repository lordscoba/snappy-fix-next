import type { Metadata } from "next";
import { NavbarMenu } from "@/components/Layout";
import BlogDetailsComponent from "@/components/blog/BlogDetailsComponent";
import { fetchAllPublishedPosts } from "@/lib/api/services/blog.service";
import Script from "next/script";
import { getCachedBlogDetails } from "@/lib/api/cached";

type Params = Promise<{ slug: string }>;

const SITE_URL = "https://www.snappy-fix.com";
const DEFAULT_OG = `${SITE_URL}/images/snappy-fix-logo.png`;

// ─── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await getCachedBlogDetails(slug);
    const post = res.data.data.news;

    if (!post) {
      return {
        title: "Post not found | Snappy‑Fix Blog",
        description: "The blog post you're looking for does not exist.",
        robots: { index: false, follow: false },
      };
    }

    const ogImage = post.thumbnail_url || DEFAULT_OG;
    const title = post.meta_title || post.title;
    const description = post.meta_desc || post.title;
    const canonical = `${SITE_URL}/blog/${post.slug}`;
    const publishedTime = post.created_at || post.updated_at;

    // Parse tags string into keywords array
    const keywords = post.tags
      ? post.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean)
      : [];

    return {
      title: `${title} | Snappy‑Fix Blog`,
      description,
      keywords,
      authors: [{ name: "Snappy‑Fix Team", url: SITE_URL }],
      creator: "Snappy‑Fix Technologies",
      publisher: "Snappy‑Fix Technologies",

      // Canonical + RSS
      alternates: {
        canonical,
        types: {
          "application/rss+xml": `${SITE_URL}/feed.xml`,
        },
      },

      // Open Graph — article type
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "Snappy‑Fix Technologies",
        locale: "en_NG",
        type: "article",
        publishedTime,
        modifiedTime: post.updated_at,
        authors: [`${SITE_URL}/blog`],
        section: post.category?.name || "Blog",
        tags: keywords,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },

      // Twitter / X
      twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: "@snappyfix",
        site: "@snappyfix",
        images: [
          {
            url: ogImage,
            alt: title,
          },
        ],
      },

      // Robots
      robots: {
        index: post.status === "published",
        follow: true,
        googleBot: {
          index: post.status === "published",
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
    };
  } catch {
    return {
      title: "Blog | Snappy‑Fix",
      description: "Read the latest insights from the Snappy‑Fix team.",
    };
  }
}

// ─── Static params ────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  try {
    const posts = await fetchAllPublishedPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

// ─── JSON-LD builder ──────────────────────────────────────────────────────────
async function buildJsonLd(slug: string) {
  try {
    const res = await getCachedBlogDetails(slug);
    const post = res.data.data.news;
    if (!post) return null;

    const canonical = `${SITE_URL}/blog/${post.slug}`;
    const ogImage = post.thumbnail_url || DEFAULT_OG;
    const publishedTime = post.created_at || post.updated_at;
    const keywords = post.tags
      ? post.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean)
          .join(", ")
      : "";

    return {
      "@context": "https://schema.org",
      "@graph": [
        // ── BlogPosting ──────────────────────────────────────
        {
          "@type": "BlogPosting",
          "@id": `${canonical}#article`,
          headline: post.meta_title || post.title,
          name: post.title,
          description: post.meta_desc || post.title,
          articleBody: post.body?.replace(/<[^>]*>/g, "") || "",
          url: canonical,
          inLanguage: "en-NG",
          datePublished: publishedTime,
          dateModified: post.updated_at,
          keywords,
          image: {
            "@type": "ImageObject",
            "@id": `${canonical}#primaryimage`,
            url: ogImage,
            width: 1200,
            height: 630,
            caption: post.title,
          },
          author: {
            "@type": "Organization",
            "@id": `${SITE_URL}#organization`,
            name: "Snappy‑Fix Technologies",
            url: SITE_URL,
          },
          publisher: {
            "@type": "Organization",
            "@id": `${SITE_URL}#organization`,
            name: "Snappy‑Fix Technologies",
            url: SITE_URL,
            logo: {
              "@type": "ImageObject",
              url: DEFAULT_OG,
              width: 1200,
              height: 630,
            },
          },
          isPartOf: {
            "@type": "Blog",
            "@id": `${SITE_URL}/blog#blog`,
            name: "Snappy‑Fix Blog & Insights",
            url: `${SITE_URL}/blog`,
          },
          mainEntityOfPage: {
            "@id": `${canonical}#webpage`,
          },
          // Article section from category
          articleSection: post.category?.name || "Blog",
          // Featured / exclusive signals
          ...(post.is_featured && { isFamilyFriendly: true }),
        },

        // ── Organization ─────────────────────────────────────
        {
          "@type": "Organization",
          "@id": `${SITE_URL}#organization`,
          name: "Snappy‑Fix Technologies",
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: DEFAULT_OG,
            width: 1200,
            height: 630,
          },
          sameAs: ["https://twitter.com/snappyfix"],
        },

        // ── WebPage ───────────────────────────────────────────
        {
          "@type": "WebPage",
          "@id": `${canonical}#webpage`,
          url: canonical,
          name: `${post.meta_title || post.title} | Snappy‑Fix Blog`,
          description: post.meta_desc || post.title,
          inLanguage: "en-NG",
          isPartOf: {
            "@id": `${SITE_URL}#website`,
          },
          primaryImageOfPage: {
            "@id": `${canonical}#primaryimage`,
          },
          breadcrumb: {
            "@id": `${canonical}#breadcrumb`,
          },
          datePublished: publishedTime,
          dateModified: post.updated_at,
        },

        // ── Website ───────────────────────────────────────────
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}#website`,
          url: SITE_URL,
          name: "Snappy‑Fix Technologies",
          description:
            "Nigerian software development company building scalable websites, web applications, and free online image tools.",
          publisher: {
            "@id": `${SITE_URL}#organization`,
          },
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_URL}/blog/list?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        },

        // ── BreadcrumbList ────────────────────────────────────
        {
          "@type": "BreadcrumbList",
          "@id": `${canonical}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog & Insights",
              item: `${SITE_URL}/blog`,
            },
            ...(post.category?.name
              ? [
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: post.category.name,
                    item: `${SITE_URL}/blog/list?category=${post.category?.id || ""}`,
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: post.title,
                    item: canonical,
                  },
                ]
              : [
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: post.title,
                    item: canonical,
                  },
                ]),
          ],
        },
      ],
    };
  } catch {
    return null;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogDetailsPage({ params }: { params: Params }) {
  const { slug } = await params;
  const jsonLd = await buildJsonLd(slug);

  return (
    <main className="min-h-screen bg-[#0e0716]">
      <NavbarMenu background="bg-[#47238f]" />

      {/* JSON-LD — rendered server-side in the HTML for crawlers */}
      {jsonLd && (
        <Script
          id="json-ld-script-blog"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogDetailsComponent slug={slug} />
    </main>
  );
}
