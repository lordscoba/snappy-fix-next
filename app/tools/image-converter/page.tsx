import ImageConverterTool from "@/components/tools/ImageConverterTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import { splitTitle } from "@/lib/utils/title";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";

const currentTool = tools.find((tool) => tool.slug === "image-converter")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function ImageConverterPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What formats can I convert images to?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Snappy Fix Image Converter supports multiple formats including JPG, PNG, WEBP, and SVG.",
        },
      },
      {
        "@type": "Question",
        name: "Is the image converter free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix Image Converter is completely free and allows unlimited conversions.",
        },
      },
      {
        "@type": "Question",
        name: "Will converting images reduce quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our converter preserves the best possible image quality during conversion between formats.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert an Image Online",
    description:
      "Step-by-step guide to converting images between formats using the Snappy Fix Image Converter.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image file (JPG, PNG, WEBP, SVG)",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Online Image Converter",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image file you want to convert.",
      },
      {
        "@type": "HowToStep",
        name: "Choose output format",
        text: "Select the format you want to convert the image into such as JPG, PNG, or WEBP.",
      },
      {
        "@type": "HowToStep",
        name: "Download the converted image",
        text: "Click convert and download the new image instantly.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-converter-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="image-converter-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="image-converter-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="image-converter-howto"
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
            {splitTitle(currentTool.name)}
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {currentTool.longDescription}
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool UI */}
        <ImageConverterTool />

        {/* SEO Description Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Convert Images to Any Format Instantly
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Our free online image converter helps developers, designers,
            marketers and businesses convert image formats instantly without
            losing quality. Whether you need JPG, PNG, WEBP or SVG conversion,
            Snappy Fix ensures fast processing and secure uploads.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Convert JPG to PNG</li>
            <li>Convert PNG to WEBP</li>
            <li>Convert WEBP to JPG</li>
            <li>No watermark</li>
            <li>Fast and secure processing</li>
            <li>Works on all devices</li>
          </ul>
        </section>

        {/* Reusable Other Tools Section */}
        <OtherToolsSection currentSlug="image-converter" />

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold">Is this image converter free?</h3>
              <p>Yes, Snappy Fix Image Converter is completely free to use.</p>
            </div>

            <div>
              <h3 className="font-semibold">Does it reduce image quality?</h3>
              <p>No. We preserve image quality during conversion.</p>
            </div>

            <div>
              <h3 className="font-semibold">Are my images stored?</h3>
              <p>
                No. Files are processed securely and not permanently stored.
              </p>
            </div>
          </div>
        </section>

        {/* Random tools */}
        <RandomToolsSection />

        {/* Categories */}
        <ToolCategoriesSection />
      </section>
    </main>
  );
}
