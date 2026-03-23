import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import CompressPDFPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "compress-pdf")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function CompressPDFPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I compress a PDF file online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can compress a PDF by uploading it to the Snappy Fix PDF Compressor. The tool automatically reduces file size while maintaining document quality.",
        },
      },
      {
        "@type": "Question",
        name: "Does compressing a PDF reduce quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our PDF compressor optimizes images and document elements to reduce file size while preserving readability and visual quality.",
        },
      },
      {
        "@type": "Question",
        name: "Is the Snappy Fix PDF compressor free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix PDF Compressor is completely free and allows unlimited PDF compression for documents of different sizes.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Compress a PDF File Online",
    description:
      "Step-by-step guide to reducing PDF file size using the Snappy Fix PDF Compressor.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "PDF document",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix PDF Compressor",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your PDF",
        text: "Upload the PDF file you want to compress.",
      },
      {
        "@type": "HowToStep",
        name: "Start compression",
        text: "Click compress to reduce the PDF file size automatically.",
      },
      {
        "@type": "HowToStep",
        name: "Download compressed PDF",
        text: "Download the optimized PDF with reduced file size.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="compress-pdf-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="compress-pdf-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="compress-pdf-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="compress-pdf-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <CompressPDFPageClient />
    </main>
  );
}
