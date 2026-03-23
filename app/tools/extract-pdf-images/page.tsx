import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import ExtractPDFImagesPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "extract-pdf-images")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function ExtractPdfImagesPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does the Extract Images from PDF tool do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Extract Images from PDF tool pulls all embedded images from a PDF file and allows you to download them individually without losing quality.",
        },
      },
      {
        "@type": "Question",
        name: "Can I extract images from any PDF file?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the tool works with most PDF documents and extracts images that are embedded inside the file.",
        },
      },
      {
        "@type": "Question",
        name: "Are my PDF files stored on your servers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Uploaded files are processed securely and are not permanently stored on our servers.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Extract Images from a PDF",
    description:
      "Step-by-step guide to extracting embedded images from PDF documents using the Snappy Fix PDF image extractor.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "PDF document containing images",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix PDF Image Extractor",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your PDF file",
        text: "Upload the PDF document that contains the images you want to extract.",
      },
      {
        "@type": "HowToStep",
        name: "Extract the images",
        text: "Click the extract button to scan the PDF and retrieve all embedded images.",
      },
      {
        "@type": "HowToStep",
        name: "Download the images",
        text: "Preview and download the extracted images individually or all at once.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="extract-pdf-images-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="extract-pdf-images-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="extract-pdf-images-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="extract-pdf-images-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <ExtractPDFImagesPageClient />
    </main>
  );
}
