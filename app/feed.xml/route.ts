import { tools } from "@/data/toolsData";
import { Feed } from "feed";
import { NextResponse } from "next/server";

export async function GET() {
  const site_url = "https://www.snappy-fix.com";

  const feed = new Feed({
    // Using your official Default Title from Metadata
    title:
      "Snappy-Fix Technologies | Software Development Company & Free Online Image Tools",

    // Using your official Description
    description:
      "Snappy-Fix Technologies is a Nigerian software development company building scalable websites, web applications, and mobile apps. We also provide powerful free online image tools including image converters, optimizers, analyzers, resizers, and SEO utilities.",

    id: site_url,
    link: site_url,
    language: "en-NG", // Matches your og:locale "en_NG"

    // Using your official Logo Path from Metadata icons
    image: `${site_url}/images/snappy-fix-logo.png`,
    favicon: `${site_url}/images/snappy-fix-logo.png`,

    copyright: `All rights reserved ${new Date().getFullYear()}, Snappy-Fix Technologies`,

    // Using "creator" from your Metadata
    author: {
      name: "Snappy-Fix Technologies",
      link: site_url,
    },

    generator: "Snappy-Fix Technologies Feed Generator",

    feedLinks: {
      rss2: `${site_url}/feed.xml`,
    },
  });

  // 1. Fetch your dynamic data (e.g., from a DB or CMS)
  // const posts = await getPosts();

  // Loop through your tools array
  tools.forEach((tool) => {
    feed.addItem({
      title: tool.name,
      id: `${site_url}${tool.href}`,
      link: `${site_url}${tool.href}`,
      description: tool.description,
      content: tool.longDescription,
      date: new Date(),
      category: [{ name: tool.category }],
      author: [{ name: "Snappy-Fix Technologies" }],
    });
  });

  // 3. Return the XML with the correct Content-Type header
  return new NextResponse(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate", // Optional: Cache for 1 hour
    },
  });
}
