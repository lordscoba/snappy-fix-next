import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import ImageDPIChangerTools from "@/components/tools/ImageDPIChangerTools";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import ImageDPIChangerPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "image-dpi-changer")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function ImageDpiChangerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does an Image DPI Changer do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An Image DPI Changer modifies the DPI (dots per inch) metadata of an image so it meets requirements for printing, publishing, or design work.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert my image to 300 DPI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix Image DPI Changer allows you to set images to 72, 150, 300, or any custom DPI value instantly.",
        },
      },
      {
        "@type": "Question",
        name: "Does changing DPI affect image dimensions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Changing DPI only modifies the print resolution metadata and does not change the actual pixel dimensions of the image.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Change Image DPI",
    description:
      "Step-by-step guide to modifying image DPI settings using the Snappy Fix Image DPI Changer.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image file (JPG, PNG, or WebP)",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Image DPI Changer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image file whose DPI you want to change.",
      },
      {
        "@type": "HowToStep",
        name: "Choose the desired DPI",
        text: "Select or enter the DPI value such as 72, 150, 300, or a custom DPI.",
      },
      {
        "@type": "HowToStep",
        name: "Download the updated image",
        text: "Click convert and download the image with the updated DPI settings.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-dpi-changer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="image-dpi-changer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="image-dpi-changer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="image-dpi-changer-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <ImageDPIChangerPageClient />
    </main>
  );
}
