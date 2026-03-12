import ImageToHeicTools from "@/components/tools/ImageToHeicTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";

const currentTool = tools.find((tool) => tool.slug === "image-to-heic")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function ImageToHeicPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Image to HEIC conversion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Image to HEIC conversion converts common image formats like JPG, PNG, or WebP into the HEIC format, which offers smaller file sizes while maintaining high visual quality.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I convert images to HEIC?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HEIC images use advanced compression technology that reduces file size while preserving image quality, making them ideal for storage and Apple devices.",
        },
      },
      {
        "@type": "Question",
        name: "Are my uploaded images stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Images uploaded to the Snappy Fix Image to HEIC Converter are processed securely and are not permanently stored on our servers.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert Image to HEIC",
    description:
      "Step-by-step guide to converting JPG, PNG, or WebP images into HEIC format using the Snappy Fix Image to HEIC Converter.",
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
        name: "Snappy Fix Image to HEIC Converter",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload the image",
        text: "Upload the image file you want to convert to HEIC format.",
      },
      {
        "@type": "HowToStep",
        name: "Convert the image",
        text: "Click the convert button to transform the image into the HEIC format.",
      },
      {
        "@type": "HowToStep",
        name: "Download the HEIC image",
        text: "Preview and download the converted HEIC image instantly.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-to-heic-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="image-to-heic-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="image-to-heic-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="image-to-heic-howto"
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
            Image to HEIC Converter
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Convert JPG, PNG, or WebP images into the efficient HEIC format.
            Reduce storage size while maintaining excellent visual quality,
            perfect for Apple devices and modern image storage.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <ImageToHeicTools />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Convert Images to HEIC Format Instantly
          </h2>

          <p className="text-gray-600 leading-relaxed">
            HEIC (High Efficiency Image Container) is a modern image format used
            by Apple devices to store high-quality images with smaller file
            sizes. Our Image to HEIC Converter allows you to convert JPG, PNG,
            and WebP images into HEIC format quickly and securely without
            installing any software.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Convert JPG, PNG, or WebP to HEIC</li>
            <li>Smaller file sizes with high image quality</li>
            <li>No watermark</li>
            <li>Secure browser-based processing</li>
            <li>Free and unlimited usage</li>
          </ul>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="image-to-heic" />
      </section>
    </main>
  );
}
