import { MetadataRoute } from "next";
import { tools } from "@/data/toolsData";
import { toolCategories } from "@/data/toolsCategoryData";
import { fetchAllPublishedPosts } from "@/lib/api/services/blog.service";
import { News } from "@/types/blog-types";
import { data as portfolios } from "@/data/PortifolioData";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.snappy-fix.com";

  // ── Fetch all published posts from API ─────────────────────
  let allPosts: News[] = [];
  try {
    allPosts = await fetchAllPublishedPosts();
  } catch {
    // sitemap still generates without blog entries
  }

  // 1. Individual Tools - Priority 0.8 / Daily
  const toolEntries = tools.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // 2. Categories - Priority 0.9 / Daily
  // (In your config these start with /tools/, matching 0.9 logic)
  const categoryEntries = toolCategories.map((cat) => ({
    url: `${baseUrl}${cat.href}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const blogEntries = allPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at
      ? new Date(post.updated_at)
      : new Date(post.created_at),
    changeFrequency: "weekly" as const,
    priority: post.is_featured ? 0.9 : 0.8, // featured posts rank higher
  }));

  // ── Blog category pages ────────────────────────────────────
  const blogCategoryEntries = Array.from(
    new Map(
      allPosts
        .filter((p) => p.category?.id && p.category?.name)
        .map((p) => [p.category.id, p.category]),
    ).values(),
  ).map((category) => ({
    url: `${baseUrl}/blog/list?category=${category.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 4. Portfolio Pages - Priority 0.6 / Monthly
  const portfolioEntries = portfolios.map((person) => ({
    url: `${baseUrl}/portfolio/${person.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 4. Static Pages - Matching your custom transform logic
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/list`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [
    ...staticPages,
    ...toolEntries,
    ...categoryEntries,
    ...blogCategoryEntries,
    ...blogEntries,
    ...portfolioEntries,
  ];
}
