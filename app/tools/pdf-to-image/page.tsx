import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import PDFToImagePageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "pdf-to-image")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function PdfToImagePage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is PDF to Image conversion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PDF to Image conversion extracts pages from a PDF document and converts them into image formats such as PNG or JPG.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert every page of a PDF into images?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix PDF to Image Converter extracts each page of your PDF file and converts it into a downloadable image.",
        },
      },
      {
        "@type": "Question",
        name: "Are my PDF files stored on your servers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Files uploaded to the Snappy Fix PDF to Image tool are processed securely and are not permanently stored on our servers.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert PDF to Image",
    description:
      "Step-by-step guide to converting PDF pages into PNG or JPG images using the Snappy Fix PDF to Image Converter.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "PDF file",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix PDF to Image Converter",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload the PDF file",
        text: "Upload the PDF document you want to convert into image files.",
      },
      {
        "@type": "HowToStep",
        name: "Convert the PDF pages",
        text: "Click the convert button to extract each page as a high-quality PNG or JPG image.",
      },
      {
        "@type": "HowToStep",
        name: "Download the images",
        text: "Download the converted image files instantly.",
      },
    ],
  };

  return (
    <main className="bg-white min-h-screen">
      <Script
        id="pdf-to-image-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="pdf-to-image-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="pdf-to-image-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="pdf-to-image-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <PDFToImagePageClient />
    </main>
  );
}
