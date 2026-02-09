export type Project = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  cover: string;
  link: string;
};

export const projects: any = [
  {
    slug: "aurora-shop",
    title: "Aurora Shop",
    category: "E‑commerce",
    excerpt:
      "A fast, conversion‑focused storefront with product search and smart filters.",
    cover: "/images/projects/aurora.jpg",
    link: "https://example.com/aurora",
  },
  {
    slug: "nova-invest",
    title: "Nova Invest",
    category: "Fintech",
    excerpt: "A secure investment dashboard with live performance tracking.",
    cover: "/images/projects/nova.jpg",
    link: "https://example.com/nova",
  },
  {
    slug: "pulse-health",
    title: "Pulse Health",
    category: "Healthcare",
    excerpt: "A modern clinic website with online booking and telehealth UX.",
    cover: "/images/projects/pulse.jpg",
    link: "https://example.com/pulse",
  },
  {
    slug: "bright-campus",
    title: "Bright Campus",
    category: "Education",
    excerpt:
      "A responsive learning platform with student portals and analytics.",
    cover: "/images/projects/campus.jpg",
    link: "https://example.com/campus",
  },
  {
    slug: "vertex-hub",
    title: "Vertex Hub",
    category: "SaaS",
    excerpt: "A modern SaaS dashboard with team management and billing.",
    cover: "/images/projects/vertex.jpg",
    link: "https://example.com/vertex",
  },
];
