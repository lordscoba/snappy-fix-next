import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import ImageConverterPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "image-converter")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function ImageConverterPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What formats can I convert images to?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Snappy Fix Image Converter supports multiple formats including JPG, PNG, WEBP, and SVG.",
        },
      },
      {
        "@type": "Question",
        name: "Is the image converter free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix Image Converter is completely free and allows unlimited conversions.",
        },
      },
      {
        "@type": "Question",
        name: "Will converting images reduce quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our converter preserves the best possible image quality during conversion between formats.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert an Image Online",
    description:
      "Step-by-step guide to converting images between formats using the Snappy Fix Image Converter.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image file (JPG, PNG, WEBP, SVG)",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Online Image Converter",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image file you want to convert.",
      },
      {
        "@type": "HowToStep",
        name: "Choose output format",
        text: "Select the format you want to convert the image into such as JPG, PNG, or WEBP.",
      },
      {
        "@type": "HowToStep",
        name: "Download the converted image",
        text: "Click convert and download the new image instantly.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-converter-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="image-converter-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="image-converter-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="image-converter-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <ImageConverterPageClient />
    </main>
  );
}
