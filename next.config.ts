import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Add local API to the list if in development
const apiHosts = [
  "https://*.railway.app",
  isDev ? "http://127.0.0.1:8019" : "", // Add local dev API
  isDev ? "http://127.0.0.1:8000" : "", // Add local dev API
]
  .filter(Boolean)
  .join(" ");

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    qualities: [60, 70, 75, 85, 90],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      // Allow images from your production backend
      {
        protocol: "https",
        hostname: "*.railway.app",
        pathname: "/**",
      },
      // Allow images from local backend (Dev only)
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
  // Compress all responses — reduces CSS/JS transfer size
  compress: true,

  // Add HTTP headers for security (fixes Best Practices warnings) + performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Fixes: "Ensure proper origin isolation with COOP"
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          // Fixes: "Mitigate clickjacking with XFO or CSP"
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Fixes: "Use a strong HSTS policy"
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Fixes: "Ensure CSP is effective against XSS attacks" (basic CSP)
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://static.cloudflareinsights.com https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              `img-src 'self' data: blob: https://res.cloudinary.com ${apiHosts} https://www.google-analytics.com`,
              `connect-src 'self' ${apiHosts} ${isDev ? "ws://localhost:* ws://127.0.0.1:*" : ""} https://www.google-analytics.com https://vitals.vercel-insights.com https://www.googletagmanager.com`,
              // `connect-src 'self' ${apiHosts} https://www.google-analytics.com https://vitals.vercel-insights.com https://www.googletagmanager.com`,
              // "img-src 'self' data: blob: https://res.cloudinary.com https://*.railway.app https://www.google-analytics.com",
              // "connect-src 'self' https://*.railway.app https://www.google-analytics.com https://www.googletagmanager.com",
              "font-src 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
          // General security
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Long cache for static assets — Next.js immutable chunks
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: isDev
              ? "no-cache"
              : "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
