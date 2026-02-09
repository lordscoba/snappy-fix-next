export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  cover: string;
  author: string;
  content: string[];
  metaDescription: string;
  keywords: string[];
  ogImage: string;
  readingTime: string;
};

export const posts: Post[] = [
  {
    slug: "building-high-performance-websites",
    title: "Building High‑Performance Websites in 2026",
    excerpt:
      "A practical guide to speed, accessibility, and modern UI patterns that drive conversions.",
    date: "Feb 6, 2026",
    category: "Web Development",
    cover: "/images/blog/minimalist.png",
    author: "Snappy‑Fix Team",
    content: [
      "Performance is no longer optional. Users expect pages to load instantly, with smooth motion and crisp visuals.",
      "Focus on image optimization, critical CSS, and accessible typography to keep users engaged.",
      "Measure, iterate, and keep your stack lean so every feature adds real value.",
    ],
    metaDescription:
      "Learn how to build high‑performance websites in 2026 with practical tips on speed, UX, and modern UI patterns.",
    keywords: ["web performance", "core web vitals", "modern UI", "SEO"],
    ogImage: "/images/blog/minimalist.png",
    readingTime: "6 min read",
  },
  {
    slug: "ui-ux-that-converts",
    title: "UI/UX That Converts: Design Principles That Work",
    excerpt:
      "Learn how hierarchy, motion, and typography combine to keep users engaged.",
    date: "Feb 1, 2026",
    category: "Design",
    cover: "/images/blog/ui_ux.png",
    author: "Nwocha Joseph",
    content: [
      "Great design is invisible — it guides users naturally to the next step.",
      "Use contrast and spacing to lead the eye, and keep motion purposeful.",
      "Pair strong headlines with clear CTAs for the best conversion lift.",
    ],
    metaDescription:
      "Discover the UI/UX principles that improve engagement and drive conversions in modern product design.",
    keywords: ["UI/UX", "conversion design", "product design", "UX"],
    ogImage: "/images/blog/ui_ux.png",
    readingTime: "5 min read",
  },
  {
    slug: "scaling-digital-products",
    title: "Scaling Digital Products Without Breaking Quality",
    excerpt:
      "A tactical breakdown of systems, components, and workflows that scale.",
    date: "Jan 24, 2026",
    category: "Product",
    cover: "/images/blog/scaling.png",
    author: "Osuji Uche",
    content: [
      "Scaling is a design problem as much as it is engineering.",
      "Build reusable systems early, then document everything for team alignment.",
      "Consistency beats complexity when teams move fast.",
    ],
    metaDescription:
      "Learn how to scale digital products with consistent systems, strong documentation, and quality‑first workflows.",
    keywords: ["product scaling", "design systems", "engineering", "workflow"],
    ogImage: "/images/blog/scaling.png",
    readingTime: "7 min read",
  },
  {
    slug: "seo-for-modern-websites",
    title: "SEO for Modern Websites: What Actually Works",
    excerpt:
      "A clear, up‑to‑date guide to technical SEO, content, and performance signals.",
    date: "Jan 18, 2026",
    category: "SEO",
    cover: "/images/blog/minimalist.png",
    author: "Snappy‑Fix Team",
    content: [
      "Modern SEO is performance, accessibility, and content quality combined.",
      "Search engines reward fast, structured, and trustworthy experiences.",
      "Focus on helpful content and clean technical fundamentals.",
    ],
    metaDescription:
      "A modern SEO guide covering performance, content quality, and technical best practices that drive rankings.",
    keywords: ["SEO", "technical SEO", "content strategy", "performance"],
    ogImage: "/images/blog/minimalist.png",
    readingTime: "6 min read",
  },
  {
    slug: "design-systems-that-scale",
    title: "Design Systems That Scale Teams Faster",
    excerpt:
      "How to build a design system that helps teams ship consistent UI quickly.",
    date: "Jan 10, 2026",
    category: "Design",
    cover: "/images/blog/minimalist.png",
    author: "Nwocha Joseph",
    content: [
      "A design system is a single source of truth for UI decisions.",
      "Start small and focus on tokens, components, and usage patterns.",
      "Documentation makes consistency easy at scale.",
    ],
    metaDescription:
      "Build design systems that help teams ship consistent, scalable UI faster with better documentation and tokens.",
    keywords: ["design system", "UI consistency", "components", "tokens"],
    ogImage: "/images/blog/minimalist.png",
    readingTime: "5 min read",
  },
  {
    slug: "nextjs-best-practices",
    title: "Next.js Best Practices for Fast Marketing Sites",
    excerpt:
      "A practical checklist for performance, SEO, and clean architecture.",
    date: "Jan 3, 2026",
    category: "Web Development",
    cover: "/images/blog/minimalist.png",
    author: "Snappy‑Fix Team",
    content: [
      "Use static rendering where possible and avoid unnecessary client JS.",
      "Leverage image optimization and metadata for SEO.",
      "Organize components and routes cleanly for long‑term maintainability.",
    ],
    metaDescription:
      "Speed up your marketing site with Next.js best practices for rendering, SEO, and clean architecture.",
    keywords: ["Next.js", "performance", "SEO", "frontend"],
    ogImage: "/images/blog/minimalist.png",
    readingTime: "6 min read",
  },
  {
    slug: "branding-that-feels-premium",
    title: "Branding That Feels Premium (Without the Big Budget)",
    excerpt: "How typography, spacing, and color choices elevate perception.",
    date: "Dec 28, 2025",
    category: "Branding",
    cover: "/images/blog/minimalist.png",
    author: "Osuji Uche",
    content: [
      "Premium branding is about consistency, not complexity.",
      "Pair strong typography with simple visual systems.",
      "Use contrast and whitespace to create luxury cues.",
    ],
    metaDescription:
      "Learn how to make branding feel premium with strategic typography, spacing, and clean color systems.",
    keywords: ["branding", "typography", "visual identity", "design"],
    ogImage: "/images/blog/minimalist.png",
    readingTime: "4 min read",
  },
  {
    slug: "conversion-rate-optimization",
    title: "CRO Playbook: Small Changes, Big Results",
    excerpt: "Optimize landing pages with tiny tweaks that lift conversions.",
    date: "Dec 21, 2025",
    category: "Growth",
    cover: "/images/blog/minimalist.png",
    author: "Snappy‑Fix Team",
    content: [
      "Conversion is clarity: remove friction and highlight value.",
      "Test headlines, CTAs, and social proof placement.",
      "Small changes can lead to large improvements.",
    ],
    metaDescription:
      "A CRO playbook of tested changes that improve landing page conversions and reduce drop‑offs.",
    keywords: ["CRO", "conversion rate", "landing pages", "growth"],
    ogImage: "/images/blog/minimalist.png",
    readingTime: "5 min read",
  },
  {
    slug: "accessibility-first-design",
    title: "Accessibility‑First Design for Real‑World Teams",
    excerpt:
      "Make your product inclusive while improving usability for everyone.",
    date: "Dec 14, 2025",
    category: "Accessibility",
    cover: "/images/blog/minimalist.png",
    author: "Nwocha Joseph",
    content: [
      "Accessibility improves usability for every user segment.",
      "Use contrast, semantic structure, and keyboard support.",
      "Inclusive design reduces churn and increases trust.",
    ],
    metaDescription:
      "Accessibility‑first design tips for teams who want inclusive products and better usability.",
    keywords: ["accessibility", "inclusive design", "usability", "UX"],
    ogImage: "/images/blog/minimalist.png",
    readingTime: "6 min read",
  },
  {
    slug: "shipping-faster-with-components",
    title: "Ship Faster with Component‑Driven Development",
    excerpt:
      "Build once, reuse everywhere—how component systems speed teams up.",
    date: "Dec 7, 2025",
    category: "Engineering",
    cover: "/images/blog/minimalist.png",
    author: "Snappy‑Fix Team",
    content: [
      "Components reduce duplication and improve consistency.",
      "Document and test UI parts independently.",
      "Reusable systems help teams ship faster without sacrificing quality.",
    ],
    metaDescription:
      "Component‑driven development helps teams ship faster with reusable UI and better consistency.",
    keywords: ["components", "frontend engineering", "design systems", "speed"],
    ogImage: "/images/blog/minimalist.png",
    readingTime: "5 min read",
  },
];
