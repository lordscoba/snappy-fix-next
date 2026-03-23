import { tools } from "@/data/toolsData";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import SVGImageOptimizerPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "svg-image-optimizer")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function SVGImageOptimizerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the SVG optimizer free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix SVG Vector Optimizer is completely free and works directly in your browser.",
        },
      },
      {
        "@type": "Question",
        name: "What does SVG optimization do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SVG optimization removes unnecessary metadata, comments, and hidden elements from the SVG code to reduce file size and improve loading speed.",
        },
      },
      {
        "@type": "Question",
        name: "Will optimizing SVG affect the design?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The optimizer removes redundant code while keeping the visual appearance of the SVG unchanged.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Optimize an SVG File",
    description:
      "Step-by-step guide to compressing and optimizing SVG files using the Snappy Fix SVG Vector Optimizer.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "SVG file",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix SVG Vector Optimizer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your SVG file",
        text: "Upload the SVG file you want to optimize.",
      },
      {
        "@type": "HowToStep",
        name: "Optimize the SVG",
        text: "The tool removes unnecessary metadata, comments, and hidden elements from the SVG code.",
      },
      {
        "@type": "HowToStep",
        name: "Download the optimized SVG",
        text: "Download the cleaned and optimized SVG file ready for web use.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="svg-optimizer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="svg-optimizer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="svg-optimizer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="svg-optimizer-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <SVGImageOptimizerPageClient />
    </main>
  );
}
