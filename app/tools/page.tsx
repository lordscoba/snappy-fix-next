import { Metadata } from "next/types";
import ToolsComponents from "./ToolsComponents";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Free Online Image Tools | Converter, Optimizer & Editor",
  description:
    "Browse our comprehensive library of free online image tools. From high-fidelity conversion and SVG optimization to professional-grade editing and SEO analysis, Snappy-fix provides fast, secure, browser-based solutions for every visual task.",
  keywords: [
    "free image tools",
    "online image converter",
    "image optimizer online",
    "svg optimizer",
    "image analysis tools",
    "bulk image resizer",
    "photo editing online",
    "web development tools",
    "snappy-fix tools",
  ],

  alternates: {
    canonical: "https://www.snappy-fix.com/tools",
  },

  openGraph: {
    title: "Free Online Image Tools | Snappy-fix",
    description:
      "Explore the Snappy-fix toolkit: fast, secure, and professional image tools for developers, designers, and creators. Convert, optimize, and edit images instantly in your browser.",
    url: "https://www.snappy-fix.com/tools",
    type: "website",
    images: [
      {
        url: "/images/snappy-fix-logo.png",
        width: 1200,
        height: 630,
        alt: "Snappy-fix - All Image Tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Online Image Tools | Snappy-fix",
    description:
      "The ultimate suite of free online image tools. Convert, optimize, and edit with Snappy-fix.",
    images: ["/images/snappy-fix-logo.png"],
  },
};

// Skeleton shown during static generation and while searchParams resolves
function ToolsPageSkeleton() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-[#faf7ff] to-white">
      <div className="w-full max-w-7xl mx-auto px-6 pt-48 pb-20 space-y-12 animate-pulse">
        <div className="text-center space-y-4">
          <div className="h-14 w-96 bg-[#f4edff] rounded-2xl mx-auto" />
          <div className="h-5 w-80 bg-[#f4edff] rounded mx-auto" />
          <div className="h-14 max-w-xl bg-[#f4edff] rounded-2xl mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 bg-[#f4edff] rounded-[2rem]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<ToolsPageSkeleton />}>
      <ToolsComponents />
    </Suspense>
  );
}
