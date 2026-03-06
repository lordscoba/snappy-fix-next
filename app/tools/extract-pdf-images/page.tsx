import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import ExtractPDFImagesTools from "@/components/tools/ExtractPDFImagesTools";

const currentTool = tools.find((tool) => tool.slug === "extract-pdf-images")!;

export const metadata = {
  title:
    "Extract Images from PDF Online | Download PDF Images Instantly - Snappy Fix",
  description:
    "Extract all images embedded inside PDF files instantly. Download images from any PDF document without losing quality. Free, fast, and secure PDF image extractor.",
  keywords: [
    "extract images from pdf",
    "pdf image extractor",
    "get images from pdf",
    "pdf image downloader",
    "download images from pdf online",
    "extract pictures from pdf",
    "pdf to images extractor",
    "pull images from pdf",
    "save images from pdf",
    "free pdf image extractor",
  ],
};

export default function ExtractPdfImagesPage() {
  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Extract Images from PDF",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "PDF Processing Tool",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    inLanguage: "en",
    url: "https://www.snappy-fix.com/tools/extract-pdf-images",
    description:
      "Extract and download embedded images from PDF documents instantly. This free PDF image extractor lets you pull images from PDF files without losing quality.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.snappy-fix.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://www.snappy-fix.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Extract Images from PDF",
        item: "https://www.snappy-fix.com/tools/extract-pdf-images",
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
          __html: JSON.stringify(toolStructuredData),
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
          __html: JSON.stringify(breadcrumbSchema),
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

      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Extract Images from PDF
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Instantly extract all embedded images from your PDF files. Download
            original images from any PDF document without quality loss using our
            fast and secure PDF image extractor.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <ExtractPDFImagesTools />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Extract Images Embedded in PDF Documents
          </h2>

          <p className="text-gray-600 leading-relaxed">
            PDF files often contain multiple embedded images such as photos,
            charts, diagrams, and graphics. Instead of manually screenshotting
            or recreating them, our Extract Images from PDF tool allows you to
            quickly pull out all images directly from the PDF in their original
            quality.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Extract all images from PDF instantly</li>
            <li>Download images in original quality</li>
            <li>No watermark</li>
            <li>Secure browser-based processing</li>
            <li>Free and unlimited usage</li>
          </ul>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="extract-pdf-images" />
      </section>
    </main>
  );
}
