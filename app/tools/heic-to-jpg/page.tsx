import HeicToImageTools from "@/components/tools/HeicToImageTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";

const currentTool = tools.find((tool) => tool.slug === "heic-to-jpg")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function HeicToJpgPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is HEIC to JPG conversion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HEIC to JPG conversion changes Apple's HEIC image format into the widely supported JPG format so the image can be opened on most devices and websites.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert HEIC images to PNG as well?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix HEIC converter allows you to convert HEIC photos into either JPG or PNG formats.",
        },
      },
      {
        "@type": "Question",
        name: "Are my uploaded HEIC images stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Files are processed securely and are not permanently stored on our servers.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert HEIC to JPG or PNG",
    description:
      "Step-by-step guide to converting HEIC images into JPG or PNG format using the Snappy Fix HEIC converter.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "HEIC image file",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix HEIC to JPG / PNG Converter",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload the HEIC image",
        text: "Upload the HEIC image file from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Convert the image",
        text: "Click the convert button to transform the HEIC image into JPG or PNG format.",
      },
      {
        "@type": "HowToStep",
        name: "Download the converted image",
        text: "Preview and download the converted JPG or PNG image instantly.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="heic-to-jpg-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="heic-to-jpg-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="heic-to-jpg-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="heic-to-jpg-howto"
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
            HEIC to JPG / PNG Converter
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Convert HEIC photos from iPhone into JPG or PNG images instantly.
            Make your iPhone images compatible with Android devices, Windows
            computers, and websites using our fast and secure HEIC converter.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <HeicToImageTools />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Convert HEIC Photos from iPhone to JPG or PNG
          </h2>

          <p className="text-gray-600 leading-relaxed">
            HEIC is the default photo format used by Apple devices like iPhones
            and iPads. However, many platforms and applications still do not
            support HEIC files. Our HEIC to JPG / PNG converter allows you to
            easily convert iPhone photos into widely supported formats without
            losing image quality.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Convert HEIC to JPG or PNG instantly</li>
            <li>Supports iPhone and iPad HEIC photos</li>
            <li>No watermark</li>
            <li>Secure browser-based processing</li>
            <li>Free and unlimited usage</li>
          </ul>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="heic-to-jpg" />

        {/* Random tools */}
        <RandomToolsSection />

        {/* Categories */}
        <ToolCategoriesSection />
      </section>
    </main>
  );
}
