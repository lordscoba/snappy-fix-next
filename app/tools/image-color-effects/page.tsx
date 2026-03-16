import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import ImageColorEffectTools from "@/components/tools/ImageColorEffectTools";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";

const currentTool = tools.find((tool) => tool.slug === "image-color-effects")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function ImageColorEffectsPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are image color effects?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Image color effects are visual filters that modify colors, tones, and contrast in photos. Popular effects include grayscale, sepia, vintage, and other artistic styles.",
        },
      },
      {
        "@type": "Question",
        name: "Can I apply photo filters online for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix Image Color Effects Editor allows you to apply professional photo filters and color effects online for free.",
        },
      },
      {
        "@type": "Question",
        name: "What color effects can I apply to images?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can apply effects like grayscale, sepia, vintage tones, cinematic filters, and other color transformations to enhance your photos.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Apply Color Effects to an Image",
    description:
      "Step-by-step guide to applying color filters and effects to photos using the Snappy Fix Image Color Effects Editor.",
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
        name: "Snappy Fix Image Color Effects Editor",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the photo or image you want to enhance with color effects.",
      },
      {
        "@type": "HowToStep",
        name: "Select a color effect",
        text: "Choose from available filters such as grayscale, sepia, vintage, or other visual effects.",
      },
      {
        "@type": "HowToStep",
        name: "Download the edited image",
        text: "Download your enhanced photo with the selected color effect applied.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-color-effects-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="image-color-effects-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="image-color-effects-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="image-color-effects-howto"
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
            Image Color Effects Editor
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Apply creative color effects and photo filters to your images
            instantly. Enhance photos with grayscale, sepia, vintage, and
            professional visual filters using our fast and secure online image
            effects editor.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <ImageColorEffectTools />

        {/* Rich SEO Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              What Are Image Color Effects?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Image color effects are visual filters applied to photos to change
              their appearance or mood. These effects modify color tones,
              brightness, contrast, and saturation to create artistic styles
              such as grayscale, sepia, vintage, or cinematic looks.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              Popular Photo Color Effects
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our image effects editor allows you to apply many creative photo
              filters instantly. Some of the most popular effects include:
            </p>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside mt-4">
              <li>Grayscale photo effect</li>
              <li>Sepia vintage filter</li>
              <li>Black and white conversion</li>
              <li>Warm cinematic color tone</li>
              <li>Cool blue filter</li>
              <li>Retro and vintage image styles</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              Why Use Our Image Effects Editor?
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
              <li>Apply professional color filters instantly</li>
              <li>Enhance photos with creative visual styles</li>
              <li>No watermark on processed images</li>
              <li>Fast and secure image processing</li>
              <li>Works on desktop and mobile browsers</li>
              <li>Free and unlimited usage</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              How to Apply Color Effects to an Image
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Using our online photo effects editor is simple:
            </p>

            <ol className="text-gray-600 list-decimal list-inside mt-4 space-y-2">
              <li>Upload the image you want to edit.</li>
              <li>Select your preferred color filter or visual effect.</li>
              <li>Preview the effect applied to your image.</li>
              <li>Download the enhanced image instantly.</li>
            </ol>
          </div>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="image-color-effects" />

        {/* Random tools */}
        <RandomToolsSection />

        {/* Categories */}
        <ToolCategoriesSection />
      </section>
    </main>
  );
}
