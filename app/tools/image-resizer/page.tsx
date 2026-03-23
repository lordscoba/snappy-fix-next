import { tools } from "@/data/toolsData";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import ImageResizerPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "image-resizer")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function ImageResizerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this image resizer free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix Image Resizer is completely free with no watermark.",
        },
      },
      {
        "@type": "Question",
        name: "Does resizing reduce image quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Resizing changes dimensions but does not reduce quality unless compression is applied.",
        },
      },
    ],
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Resize an Image Online",
    description:
      "Step-by-step guide to resizing images online using the Snappy Fix Image Resizer tool.",
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
        name: "Snappy Fix Image Resizer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image you want to resize from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Set width and height",
        text: "Enter the desired width and height in pixels or resize by percentage.",
      },
      {
        "@type": "HowToStep",
        name: "Download the resized image",
        text: "Click resize and download the optimized image instantly.",
      },
    ],
  };

  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-resizer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="image-resizer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="image-resizer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="image-resizer-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <ImageResizerPageClient />
    </main>
  );
}
