import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://snappy-fix.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/tools/", "/blog/"],
        disallow: [
          "/login",
          "/register",
          "/dashboard",
          "/admin",
          "/api/",
          "/*?", // Prevents crawling of search/filter query strings
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
