import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import PDFCompressorTools from "@/components/tools/PDFCompressorTools";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";

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

      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Free PDF Compressor
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Compress PDF files online and reduce file size instantly while
            preserving document quality. Perfect for email attachments, website
            uploads, document storage, and sharing large PDFs quickly and
            securely.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <PDFCompressorTools />

        {/* Rich SEO Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              What Does PDF Compression Do?
            </h2>

            <p className="text-gray-600 leading-relaxed">
              PDF compression reduces the file size of a document while keeping
              the content readable and visually clear. This process optimizes
              images, fonts, and metadata within the PDF so the file becomes
              smaller without significantly affecting quality.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              Why Compress a PDF File?
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
              <li>Send large PDFs via email easily</li>
              <li>Upload documents faster to websites</li>
              <li>Reduce document storage space</li>
              <li>Improve document sharing speed</li>
              <li>Optimize PDFs for web publishing</li>
              <li>Maintain readability while shrinking file size</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              Features of Our Online PDF Compressor
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
              <li>Reduce PDF size instantly</li>
              <li>Maintain high document quality</li>
              <li>Fast and secure cloud processing</li>
              <li>No watermark on compressed files</li>
              <li>Works on all devices and browsers</li>
              <li>Free and unlimited PDF compression</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              How to Compress a PDF Online
            </h2>

            <ol className="text-gray-600 space-y-2 list-decimal list-inside">
              <li>Upload your PDF file.</li>
              <li>Choose the compression level if available.</li>
              <li>Click the compress button.</li>
              <li>Download your smaller optimized PDF.</li>
            </ol>

            <p className="text-gray-600 leading-relaxed mt-4">
              Our free PDF compressor processes your document securely and
              reduces file size within seconds, making it easier to share and
              store large PDF files.
            </p>
          </div>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="compress-pdf" />

        {/* Random tools */}
        <RandomToolsSection />

        {/* Categories */}
        <ToolCategoriesSection />
      </section>
    </main>
  );
}
