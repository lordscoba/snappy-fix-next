import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import ImageToBase64PageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "image-to-base64")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function ImageToBase64Page() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Base64 image encoding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Base64 encoding converts image files into text strings that can be embedded directly into HTML, CSS, or JSON.",
        },
      },
      {
        "@type": "Question",
        name: "Why convert images to Base64?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Base64 images can reduce HTTP requests and allow small images to be embedded directly in code.",
        },
      },
      {
        "@type": "Question",
        name: "Is the Image to Base64 converter free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix Image to Base64 Converter is completely free and works instantly in your browser.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert an Image to Base64",
    description:
      "Step-by-step guide to converting images into Base64 strings using the Snappy Fix Image to Base64 Converter.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image file (JPG, PNG, WEBP)",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Image to Base64 Converter",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image file you want to convert into Base64.",
      },
      {
        "@type": "HowToStep",
        name: "Generate Base64 string",
        text: "The tool automatically encodes the image into a Base64 string.",
      },
      {
        "@type": "HowToStep",
        name: "Copy or download the encoded result",
        text: "Copy the Base64 string to embed it into your HTML, CSS, or code.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-to-base64-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="image-to-base64-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="image-to-base64-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="image-to-base64-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <ImageToBase64PageClient />
    </main>
  );
}
