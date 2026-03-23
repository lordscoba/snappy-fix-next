import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import ImageToPDFPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "image-to-pdf")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function ImageToPdfPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Image to PDF conversion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Image to PDF conversion combines one or more images such as JPG, PNG, or WebP into a single PDF document that can be downloaded, shared, or printed.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert multiple images into one PDF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix Image to PDF Converter allows you to combine multiple images into a single PDF document.",
        },
      },
      {
        "@type": "Question",
        name: "Are my uploaded images stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Images uploaded to the Snappy Fix Image to PDF tool are processed securely and are not permanently stored on our servers.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert Image to PDF",
    description:
      "Step-by-step guide to converting JPG, PNG, or WebP images into a PDF document using the Snappy Fix Image to PDF Converter.",
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
        name: "Snappy Fix Image to PDF Converter",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload the image",
        text: "Upload one or more image files you want to convert into a PDF.",
      },
      {
        "@type": "HowToStep",
        name: "Generate the PDF",
        text: "Click the convert button to combine the images into a PDF document.",
      },
      {
        "@type": "HowToStep",
        name: "Download the PDF",
        text: "Download the generated PDF file instantly.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-to-pdf-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="image-to-pdf-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="image-to-pdf-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="image-to-pdf-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <ImageToPDFPageClient />
    </main>
  );
}
