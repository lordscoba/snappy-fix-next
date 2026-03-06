/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.snappy-fix.com",
  generateRobotsTxt: true,
  sitemapSize: 2000,
  autoLastmod: true,

  exclude: [
    "/login",
    "/register",
    "/dashboard",
    "/admin",
    "/admin/*",
    "/api/*",
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/tools/",
      },
      {
        userAgent: "*",
        disallow: [
          "/login",
          "/register",
          "/dashboard",
          "/admin",
          "/api/",
          "/*?",
        ],
      },
    ],
  },

  transform: async (config, path) => {
    // Homepage
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
      };
    }

    // Tools landing page
    if (path === "/tools") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.9,
      };
    }

    // Individual tool pages
    if (path.startsWith("/tools/")) {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.8,
      };
    }

    // Legal pages
    if (path === "/privacy" || path === "/terms") {
      return {
        loc: path,
        changefreq: "yearly",
        priority: 0.3,
      };
    }

    // Default pages
    return {
      loc: path,
      changefreq: "weekly",
      priority: 0.7,
    };
  },
};
