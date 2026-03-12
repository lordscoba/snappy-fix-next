import { Metadata } from "next/types";
import ToolsComponents from "./ToolsComponents";

export const metadata: Metadata = {
  title: "Free Online Image Tools | Converter, Optimizer & Editor | Snappy-fix",
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

export default function Page() {
  // We return the Client Component here.
  // This allows the page to remain a Server Component for SEO (metadata)
  // while enabling interactivity inside ToolsComponents.
  return <ToolsComponents />;
}
