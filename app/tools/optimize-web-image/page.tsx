import { tools } from "@/data/toolsData";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import WebOptimizerPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "optimize-web-image")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function WebOptimizerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the Web Image Optimizer free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix Web Image Optimizer is completely free and does not add watermarks.",
        },
      },
      {
        "@type": "Question",
        name: "How much can image optimization reduce file size?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Image optimization can reduce file sizes by up to 80% depending on the image format and compression settings.",
        },
      },
      {
        "@type": "Question",
        name: "Will image optimization reduce image quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool compresses images intelligently to reduce file size while maintaining high visual quality.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Optimize Images for Websites",
    description:
      "Step-by-step guide to compressing and optimizing images for faster websites using the Snappy Fix Web Image Optimizer.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image file (JPG, PNG, WebP)",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Web Image Optimizer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image you want to optimize for your website.",
      },
      {
        "@type": "HowToStep",
        name: "Optimize the image",
        text: "The tool compresses and optimizes the image to reduce file size while maintaining quality.",
      },
      {
        "@type": "HowToStep",
        name: "Download optimized image",
        text: "Download the optimized image ready for use on your website.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="web-image-optimizer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="web-image-optimizer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="web-image-optimizer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="web-image-optimizer-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <WebOptimizerPageClient />
    </main>
  );
}
