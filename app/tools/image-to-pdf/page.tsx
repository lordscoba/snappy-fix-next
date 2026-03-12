import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import ImageToPDFConverterTools from "@/components/tools/ImageToPDFConverterTools";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";

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
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Image to PDF Converter
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Convert JPG, PNG, and WebP images into a single high-quality PDF
            document. Perfect for creating documents, printing images, and
            sharing files easily.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <ImageToPDFConverterTools />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Convert Images into High-Quality PDF Files
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Our Image to PDF Converter allows you to easily turn photos and
            images into professional PDF documents. Simply upload JPG, PNG, or
            WebP images and generate a downloadable PDF file in seconds without
            installing any software.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Convert JPG, PNG, and WebP to PDF</li>
            <li>Create high-quality PDF documents</li>
            <li>No watermark</li>
            <li>Secure browser-based processing</li>
            <li>Free and unlimited usage</li>
          </ul>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="image-to-pdf" />
      </section>
    </main>
  );
}
