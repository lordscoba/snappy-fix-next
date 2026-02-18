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
    slug: "bible-compass",
    title: "Bible Compass",
    category: "Faith-Based Platform",
    excerpt:
      "A Christian digital platform offering structured Bible study tools, devotionals, and scripture resources with a clean, mobile-friendly experience.",
    cover: "/images/projects/bible-compass_project.png",
    link: "https://www.bible-compass.com/",
  },
  {
    slug: "snappy-fix-technologies",
    title: "Snappy-fix Technologies",
    category: "Software Development",
    excerpt:
      "A full-service technology company delivering scalable web and mobile applications, UI/UX solutions, and post-launch support for businesses and startups.",
    cover: "/images/projects/snappy-fix_project.png",
    link: "https://www.snappy-fix.com/",
  },
  {
    slug: "house-link-up",
    title: "House Link Up",
    category: "Real Estate",
    excerpt:
      "A real estate platform connecting property owners, agents, and renters with listing management, user dashboards, and scalable backend architecture.",
    cover: "/images/projects/project_image.png",
    link: "#",
  },
  {
    slug: "ceeyit-solutions",
    title: "CeeyIT Solutions",
    category: "IT Solutions",
    excerpt:
      "A technology solutions company providing web development, IT consulting, business automation tools, and performance-optimized digital systems.",
    cover: "/images/projects/ceeyit_project.png",
    link: "https://ceeyitsolutions.com/",
  },
];
