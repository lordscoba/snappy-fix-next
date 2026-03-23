import { MetadataRoute } from "next";
import { tools } from "@/data/toolsData";
import { toolCategories } from "@/data/toolsCategoryData";
import { fetchAllPublishedPosts } from "@/lib/api/services/blog.service";
import { News } from "@/types/blog-types";
import { data as portfolios } from "@/data/PortifolioData";

export const revalidate = 86400;
const DEPLOY_DATE = process.env.NEXT_PUBLIC_BUILD_DATE
  ? new Date(process.env.NEXT_PUBLIC_BUILD_DATE)
  : new Date();

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
    lastModified: DEPLOY_DATE,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 2. Categories - Priority 0.9 / Daily
  // (In your config these start with /tools/, matching 0.9 logic)
  const categoryEntries = toolCategories.map((cat) => ({
    url: `${baseUrl}${cat.href}`,
    lastModified: DEPLOY_DATE,
    changeFrequency: "weekly" as const,
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

  const uniqueCategories = Array.from(
    new Map(
      allPosts
        .filter((p) => p.category?.id)
        .map((p) => [p.category.id, p.category]),
    ).values(),
  );

  const blogCategoryEntries = uniqueCategories.map((category) => {
    // Find the most recent post in this specific category
    const latestPostInCategory = allPosts
      .filter((p) => p.category?.id === category.id)
      .sort(
        (a, b) =>
          new Date(b.updated_at || b.created_at).getTime() -
          new Date(a.updated_at || a.created_at).getTime(),
      )[0];

    return {
      url: `${baseUrl}/blog/list?category=${category.id}`,
      lastModified: latestPostInCategory
        ? new Date(
            latestPostInCategory.updated_at || latestPostInCategory.created_at,
          )
        : DEPLOY_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  // 4. Portfolio Pages - Priority 0.6 / Monthly
  const portfolioEntries = portfolios.map((person) => ({
    url: `${baseUrl}/portfolio/${person.slug}`,
    lastModified: DEPLOY_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 4. Static Pages - Matching your custom transform logic
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog/list`,
      lastModified: DEPLOY_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: baseUrl,
      lastModified: DEPLOY_DATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: DEPLOY_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: DEPLOY_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: DEPLOY_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: DEPLOY_DATE,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: DEPLOY_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: DEPLOY_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: DEPLOY_DATE,
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
