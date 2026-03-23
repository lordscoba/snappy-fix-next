import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import ImageDPICheckerTools from "@/components/tools/ImageDPICheckerTools";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import ImageDPICheckerPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "image-dpi-checker")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function ImageDpiCheckerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an Image DPI Checker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An Image DPI Checker analyzes an image and shows its DPI, resolution, pixel dimensions, and estimated printable size.",
        },
      },
      {
        "@type": "Question",
        name: "Why is DPI important for images?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DPI (dots per inch) determines how detailed an image will appear when printed. Higher DPI values such as 300 DPI are commonly required for professional printing.",
        },
      },
      {
        "@type": "Question",
        name: "Are my uploaded images stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Images uploaded to the Snappy Fix Image DPI Checker are processed securely and are not permanently stored on our servers.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Check Image DPI",
    description:
      "Step-by-step guide to checking the DPI, resolution, and printable size of an image using the Snappy Fix Image DPI Checker.",
    totalTime: "PT20S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image file (JPG, PNG, or WebP)",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Image DPI Checker",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload the image",
        text: "Upload the image file you want to analyze.",
      },
      {
        "@type": "HowToStep",
        name: "Analyze the image",
        text: "The tool scans the image and calculates its DPI, pixel resolution, and dimensions.",
      },
      {
        "@type": "HowToStep",
        name: "View the image details",
        text: "Review the image DPI, resolution, and estimated printable size instantly.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-dpi-checker-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="image-dpi-checker-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="image-dpi-checker-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="image-dpi-checker-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <ImageDPICheckerPageClient />
    </main>
  );
}
