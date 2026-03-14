import { posts } from "@/data/BlogData";
import { toolCategories } from "@/data/toolsCategoryData";
import { tools } from "@/data/toolsData";
import { Feed } from "feed";
import { NextResponse } from "next/server";
import { data as portfolios } from "@/data/PortifolioData";

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

  feed.addItem({
    title: "Free Online Image Tools Library | Snappy-fix",
    id: `${site_url}/tools`,
    link: `${site_url}/tools`,
    description:
      "Explore our full suite of free online image tools. Convert, optimize, and edit images instantly in your browser with professional-grade speed.",
    content:
      "The Snappy-fix tools library offers a comprehensive collection of utilities for developers, designers, and SEO specialists. Our suite includes Base64 converters, image optimizers, metadata analyzers, and more, all built for performance and privacy.",
    date: new Date(),
    category: [{ name: "Resource Hub" }],
    author: [{ name: "Snappy-Fix Technologies" }],
  });

  feed.addItem({
    title: "Snappy-fix Projects Done",
    id: `${site_url}/projects`,
    link: `${site_url}/projects`,
    description:
      "Snappy-fix Projects Done is a collection of projects completed by the Snappy-fix team. These projects showcase our expertise in web development, UI/UX design, and digital product scaling.",
    content:
      "Snappy-fix Projects Done is a collection of projects completed by the Snappy-fix team. These projects showcase our expertise in web development, UI/UX design, and digital product scaling.",
    date: new Date(),
    category: [{ name: "Resource Hub" }],
    author: [{ name: "Snappy-Fix Technologies" }],
  });

  // 2. Add Category Pages
  toolCategories.forEach((cat) => {
    feed.addItem({
      title: `${cat.name} Library`,
      id: `${site_url}${cat.href}`,
      link: `${site_url}${cat.href}`,
      description: cat.description,
      content: cat.longDescription,
      date: new Date(),
      category: [{ name: "Tool Categories" }],
      author: [{ name: "Snappy-Fix Technologies" }],
    });
  });

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

  feed.addItem({
    title: "Snappy-fix Engineering & Design Blog",
    id: `${site_url}/blog`,
    link: `${site_url}/blog`,
    description:
      "Insights on web development, UI/UX design, SEO strategies, and scaling digital products from the Snappy-fix team.",
    content:
      "Stay updated with the latest trends in high-performance web development, modern design systems, and technical SEO. Our blog features tactical guides and industry insights for developers and digital creators.",
    date: new Date(), // Current date to keep it "fresh" in the feed
    category: [{ name: "Blog" }],
    author: [{ name: "Snappy-Fix Technologies" }],
  });

  // 3. Add Blog Posts
  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${site_url}/blog/${post.slug}`,
      link: `${site_url}/blog/${post.slug}`,
      description: post.excerpt,
      // Joining array of strings into a paragraph for RSS readers
      content: Array.isArray(post.content)
        ? post.content.join(" ")
        : post.content,
      date: new Date(post.date),
      category: [{ name: post.category }],
      author: [{ name: post.author }],
      image: `${site_url}${post.ogImage}`,
    });
  });

  // 4. Add Portfolio Pages
  portfolios.forEach((person) => {
    feed.addItem({
      title: `${person.name} – Professional Portfolio`,
      id: `${site_url}/portfolio/${person.slug}`,
      link: `${site_url}/portfolio/${person.slug}`,
      description: person.text,
      content: person.about,
      date: new Date(),
      category: [{ name: "Portfolio" }],
      author: [{ name: person.name }],
      image: `${site_url}${person.image}`,
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
