import Base64ToImageTools from "@/components/tools/Base64ToImageTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";

const currentTool = tools.find((tool) => tool.slug === "base64-to-image")!;
export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function Base64ToImagePage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Base64 to Image conversion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Base64 to Image conversion decodes Base64 encoded image data and restores it into a normal image file such as JPG, PNG, or WebP.",
        },
      },
      {
        "@type": "Question",
        name: "Is this Base64 decoder free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix Base64 to Image tool is completely free and does not add watermarks.",
        },
      },
      {
        "@type": "Question",
        name: "Are my Base64 data and images stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All decoding is processed securely and files are not permanently stored on our servers.",
        },
      },
    ],
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert Base64 to Image",
    description:
      "Step-by-step guide to decoding Base64 strings and converting them into image files using the Snappy Fix Base64 to Image tool.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Base64 encoded image string",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Base64 to Image Decoder",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Paste the Base64 string",
        text: "Copy and paste the Base64 encoded image string or data URI into the input field.",
      },
      {
        "@type": "HowToStep",
        name: "Decode the image",
        text: "Click the decode button to convert the Base64 data back into an image.",
      },
      {
        "@type": "HowToStep",
        name: "Download the image",
        text: "Preview and download the decoded image in JPG, PNG, or WebP format.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="base64-to-image-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="base64-to-image-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="base64-to-image-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="base64-to-image-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-3 py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Base64 to Image Converter
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Instantly decode Base64 strings into downloadable image files.
            Convert Base64 to JPG, PNG, WEBP, and other image formats securely
            and for free.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <Base64ToImageTools />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Decode Base64 Strings into Images Instantly
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Base64 encoding is commonly used to embed images in HTML, CSS, and
            JSON responses. Our Base64 to Image converter allows you to quickly
            decode those encoded strings back into usable image files without
            installing any software.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Convert Base64 to JPG, PNG, WEBP</li>
            <li>Instant decoding and download</li>
            <li>No watermark</li>
            <li>Secure browser-based processing</li>
            <li>Free and unlimited usage</li>
          </ul>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="base64-to-image" />

        {/* Random tools */}
        <RandomToolsSection />

        {/* Categories */}
        <ToolCategoriesSection />
      </section>
    </main>
  );
}
