import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import WatermarkTools from "@/components/tools/WatermarkTools";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";

const currentTool = tools.find((tool) => tool.slug === "image-watermark")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function ImageWatermarkPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I add a watermark to an image?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Upload your image to the Snappy Fix Image Watermark Tool, add text or a logo watermark, adjust its position and transparency, and download the protected image.",
        },
      },
      {
        "@type": "Question",
        name: "Can I add a logo watermark to photos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can upload a logo image and apply it as a watermark to your photos to protect them and promote your brand.",
        },
      },
      {
        "@type": "Question",
        name: "Is the image watermark tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix Image Watermark Tool is completely free and allows unlimited watermarking of photos and images.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Add a Watermark to an Image",
    description:
      "Step-by-step guide to adding text or logo watermarks to images using the Snappy Fix Image Watermark Tool.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image or photo file",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Image Watermark Tool",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the photo or image you want to protect with a watermark.",
      },
      {
        "@type": "HowToStep",
        name: "Add watermark",
        text: "Insert a text watermark or upload a logo and adjust its size, position, and transparency.",
      },
      {
        "@type": "HowToStep",
        name: "Download watermarked image",
        text: "Download the final image with the watermark applied.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-watermark-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="image-watermark-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="image-watermark-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="image-watermark-howto"
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
            Image Watermark Tool
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Protect your photos and artwork by adding text or logo watermarks
            online. Our watermark generator lets you secure images with
            customizable transparent or visible watermarks in seconds — fast,
            free, and secure.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <WatermarkTools />

        {/* Rich SEO Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              What Is an Image Watermark?
            </h2>

            <p className="text-gray-600 leading-relaxed">
              An image watermark is a visible or semi-transparent text, logo, or
              graphic placed on a photo to indicate ownership. Watermarks help
              protect images from unauthorized use and ensure proper credit is
              given to the creator or brand.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              Why Add a Watermark to Your Images?
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside mt-4">
              <li>Protect photos from unauthorized reuse</li>
              <li>Show ownership and copyright</li>
              <li>Promote your brand or logo</li>
              <li>Prevent image theft online</li>
              <li>Add professional branding to photos</li>
              <li>Secure artwork shared on social media</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              Features of Our Online Watermark Generator
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
              <li>Add text watermarks to images</li>
              <li>Upload logos as image watermarks</li>
              <li>Adjust transparency and opacity</li>
              <li>Position watermark anywhere on the image</li>
              <li>Fast and secure processing</li>
              <li>Free and unlimited usage</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              How to Add a Watermark to an Image
            </h2>

            <ol className="text-gray-600 space-y-2 list-decimal list-inside">
              <li>Upload the image you want to protect.</li>
              <li>Add text or upload your logo watermark.</li>
              <li>Adjust size, transparency, and position.</li>
              <li>Download your watermarked image instantly.</li>
            </ol>

            <p className="text-gray-600 leading-relaxed mt-4">
              Our free watermark tool allows photographers, designers, and
              businesses to protect their images easily while maintaining high
              visual quality.
            </p>
          </div>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="image-watermark" />

        {/* Random tools */}
        <RandomToolsSection />

        {/* Categories */}
        <ToolCategoriesSection />
      </section>
    </main>
  );
}
