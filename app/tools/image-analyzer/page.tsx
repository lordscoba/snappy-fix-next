import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import ImageAnalyzerPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "image-analyzer")!;
export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function ImageAnalyzerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does the Image Analyzer tool do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Snappy Fix Image Analyzer scans your image and reveals detailed information such as format, dimensions, DPI, color profile, and EXIF metadata.",
        },
      },
      {
        "@type": "Question",
        name: "Can I view hidden metadata in my images?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The tool can extract embedded EXIF metadata including camera information, image size, DPI settings, and other hidden properties.",
        },
      },
      {
        "@type": "Question",
        name: "Is the image analyzer secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Images are processed securely and are not permanently stored on our servers.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Analyze Image Metadata and DPI",
    description:
      "Step-by-step guide to analyzing image properties and metadata using the Snappy Fix Image Analyzer tool.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image file (JPG, PNG, WebP, etc.)",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Image Metadata & DPI Analyzer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image file you want to analyze from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Analyze the image",
        text: "Click analyze to extract metadata including dimensions, format, DPI, and EXIF information.",
      },
      {
        "@type": "HowToStep",
        name: "View the image details",
        text: "Review the extracted metadata such as resolution, color profile, and hidden EXIF properties.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-analyzer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="image-analyzer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="image-analyzer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="image-analyzer-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <ImageAnalyzerPageClient />
    </main>
  );
}
