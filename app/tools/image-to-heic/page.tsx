import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import ImageToHeicPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "image-to-heic")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function ImageToHeicPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Image to HEIC conversion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Image to HEIC conversion converts common image formats like JPG, PNG, or WebP into the HEIC format, which offers smaller file sizes while maintaining high visual quality.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I convert images to HEIC?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HEIC images use advanced compression technology that reduces file size while preserving image quality, making them ideal for storage and Apple devices.",
        },
      },
      {
        "@type": "Question",
        name: "Are my uploaded images stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Images uploaded to the Snappy Fix Image to HEIC Converter are processed securely and are not permanently stored on our servers.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert Image to HEIC",
    description:
      "Step-by-step guide to converting JPG, PNG, or WebP images into HEIC format using the Snappy Fix Image to HEIC Converter.",
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
        name: "Snappy Fix Image to HEIC Converter",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload the image",
        text: "Upload the image file you want to convert to HEIC format.",
      },
      {
        "@type": "HowToStep",
        name: "Convert the image",
        text: "Click the convert button to transform the image into the HEIC format.",
      },
      {
        "@type": "HowToStep",
        name: "Download the HEIC image",
        text: "Preview and download the converted HEIC image instantly.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-to-heic-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="image-to-heic-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="image-to-heic-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="image-to-heic-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <ImageToHeicPageClient />
    </main>
  );
}
