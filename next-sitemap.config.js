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
    // additionalSitemaps: ["https://www.snappy-fix.com/sitemap.xml"],
  },

  transform: async (config, path) => {
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
      };
    }

    if (path === "/tools") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.9,
      };
    }

    if (path.startsWith("/tools/")) {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.8,
      };
    }

    return {
      loc: path,
      changefreq: "weekly",
      priority: 0.7,
    };
  },
};
