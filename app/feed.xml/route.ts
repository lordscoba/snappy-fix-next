import { posts } from "@/data/BlogData";
import { toolCategories } from "@/data/toolsCategoryData";
import { tools } from "@/data/toolsData";
import { Feed } from "feed";
import { NextResponse } from "next/server";
import { data as portfolios } from "@/data/PortifolioData";
import { News } from "@/types/blog-types";
import { fetchAllPublishedPosts } from "@/lib/api/services/blog.service";

const DEPLOY_DATE = process.env.NEXT_PUBLIC_BUILD_DATE
  ? new Date(process.env.NEXT_PUBLIC_BUILD_DATE)
  : new Date();

export async function GET() {
  const site_url = "https://www.snappy-fix.com";

  // ── Fetch all published blog posts from your Go API ──────────
  let allPosts: News[] = [];
  try {
    allPosts = await fetchAllPublishedPosts();
  } catch (err) {
    console.error("RSS feed: failed to fetch blog posts", err);
  }

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
    date: DEPLOY_DATE,
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
    date: DEPLOY_DATE,
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
      date: DEPLOY_DATE,
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
      date: DEPLOY_DATE,
      category: [{ name: tool.category }],
      author: [{ name: "Snappy-Fix Technologies" }],
    });
  });

  // Blog index entry — dated to latest post
  feed.addItem({
    title: "Snappy-fix Engineering & Design Blog",
    id: `${site_url}/blog`,
    link: `${site_url}/blog`,
    description:
      "Insights on web development, UI/UX design, SEO strategies, and scaling digital products from the Snappy-fix team.",
    content:
      "Stay updated with the latest trends in high-performance web development, modern design systems, and technical SEO.",
    date: allPosts[0]?.created_at
      ? new Date(allPosts[0].created_at)
      : DEPLOY_DATE,
    category: [{ name: "Blog" }],
    author: [{ name: "Snappy-Fix Technologies" }],
  });

  // Individual blog posts
  allPosts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${site_url}/blog/${post.slug}`,
      link: `${site_url}/blog/${post.slug}`,
      description: post.meta_desc || post.body?.slice(0, 160) || post.title,
      content: `<p>${post.body || ""}</p>`, // body is already HTML from TipTap
      date: post.created_at
        ? new Date(post.created_at)
        : new Date(post.created_at),
      published: post.created_at
        ? new Date(post.created_at)
        : new Date(post.created_at),
      category: [{ name: post.category?.name || "Blog" }],
      author: [{ name: "Snappy-Fix Team" }],
      image: post.thumbnail_url
        ? post.thumbnail_url
        : `${site_url}/images/og-default.png`,
      extensions: [
        {
          name: "_meta",
          objects: {
            keywords: post.tags || "",
            meta_title: post.meta_title || post.title,
          },
        },
      ],
    });
  });

  feed.addItem({
    title: "Search Snappy-Fix Blog — Find Articles by Topic, Category & Filter",
    id: `${site_url}/blog/list`,
    link: `${site_url}/blog/list`,
    description:
      "Search and filter all Snappy-Fix blog articles by category, featured, exclusive, or keyword. Find guides on web development, design systems, SEO, performance, and more.",
    content:
      "The Snappy-Fix blog search page lets you discover articles by topic, category, or content type. Filter by featured posts, exclusive content, or search by keyword across our full library of engineering and design guides.",
    date: allPosts[0]?.created_at
      ? new Date(allPosts[0].created_at)
      : DEPLOY_DATE,
    category: [{ name: "Blog" }],
    author: [{ name: "Snappy-Fix Technologies" }],
  });

  feed.addItem({
    title: "About Snappy-Fix Technologies | Nigerian Software Company",
    id: `${site_url}/about`,
    link: `${site_url}/about`,
    description:
      "Learn about Snappy-Fix Technologies — a Nigerian software development company building scalable websites, web applications, and free online image tools for businesses worldwide.",
    content:
      "Snappy-Fix Technologies was founded in Uyo, Akwa Ibom State, Nigeria. We build custom websites, SaaS platforms, mobile apps, and a suite of 29+ free online image tools. Our team of developers, designers, and engineers has delivered 110+ projects for clients across Nigeria, the UK, the US, and beyond.",
    date: DEPLOY_DATE,
    category: [{ name: "Company" }],
    author: [{ name: "Snappy-Fix Technologies" }],
  });

  feed.addItem({
    title: "Contact Snappy-Fix Technologies | Get a Website Quote",
    id: `${site_url}/contact`,
    link: `${site_url}/contact`,
    description:
      "Get in touch with Snappy-Fix Technologies for website development, web applications, and digital solutions. Based in Uyo, Nigeria — serving clients worldwide.",
    content:
      "Reach the Snappy-Fix Technologies team for website development enquiries, tool feedback, partnerships, or general questions. We respond within 24 hours. Email: snappyfix.tech@gmail.com. Phone: +234 808 769 0994. Address: Uyo, Akwa Ibom State, Nigeria.",
    date: DEPLOY_DATE,
    category: [{ name: "Company" }],
    author: [{ name: "Snappy-Fix Technologies" }],
  });

  // ── Blog category pages ────────────────────────────────────────
  // Build unique category list from fetched posts
  const blogCategories = Array.from(
    new Map(
      allPosts
        .filter((p) => p.category?.slug && p.category?.name)
        .map((p) => [p.category.slug, p.category]),
    ).values(),
  );

  blogCategories.forEach((category) => {
    feed.addItem({
      title: `${category.name} Articles — Snappy-Fix Blog`,
      id: `${site_url}/blog?category=${category.id}`,
      link: `${site_url}/blog?category=${category.id}`,
      description: `Browse all Snappy-Fix articles in the ${category.name} category. Practical guides and insights on ${category.name.toLowerCase()} from the Snappy-Fix team.`,
      content: `Explore our full collection of ${category.name} articles covering practical techniques, best practices, and real-world insights from the Snappy-Fix engineering and design team.`,
      date: allPosts[0]?.created_at
        ? new Date(allPosts[0].created_at)
        : DEPLOY_DATE,
      category: [{ name: category.name }],
      author: [{ name: "Snappy-Fix Technologies" }],
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
      date: DEPLOY_DATE,
      category: [{ name: "Portfolio" }],
      author: [{ name: person.name }],
      image: `${site_url}${person.image}`,
    });
  });

  // 3. Return the XML with the correct Content-Type header
  return new NextResponse(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
