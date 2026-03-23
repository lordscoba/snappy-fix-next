import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import HeicToJpgPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "heic-to-jpg")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function HeicToJpgPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is HEIC to JPG conversion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HEIC to JPG conversion changes Apple's HEIC image format into the widely supported JPG format so the image can be opened on most devices and websites.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert HEIC images to PNG as well?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix HEIC converter allows you to convert HEIC photos into either JPG or PNG formats.",
        },
      },
      {
        "@type": "Question",
        name: "Are my uploaded HEIC images stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Files are processed securely and are not permanently stored on our servers.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert HEIC to JPG or PNG",
    description:
      "Step-by-step guide to converting HEIC images into JPG or PNG format using the Snappy Fix HEIC converter.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "HEIC image file",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix HEIC to JPG / PNG Converter",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload the HEIC image",
        text: "Upload the HEIC image file from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Convert the image",
        text: "Click the convert button to transform the HEIC image into JPG or PNG format.",
      },
      {
        "@type": "HowToStep",
        name: "Download the converted image",
        text: "Preview and download the converted JPG or PNG image instantly.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="heic-to-jpg-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="heic-to-jpg-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="heic-to-jpg-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="heic-to-jpg-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <HeicToJpgPageClient />
    </main>
  );
}
