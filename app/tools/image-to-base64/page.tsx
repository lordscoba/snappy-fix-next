import ImageToBase64Tools from "@/components/tools/ImageToBase64Tools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import { splitTitle } from "@/lib/utils/title";

const currentTool = tools.find((tool) => tool.slug === "image-to-base64")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function ImageToBase64Page() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Base64 image encoding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Base64 encoding converts image files into text strings that can be embedded directly into HTML, CSS, or JSON.",
        },
      },
      {
        "@type": "Question",
        name: "Why convert images to Base64?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Base64 images can reduce HTTP requests and allow small images to be embedded directly in code.",
        },
      },
      {
        "@type": "Question",
        name: "Is the Image to Base64 converter free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix Image to Base64 Converter is completely free and works instantly in your browser.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert an Image to Base64",
    description:
      "Step-by-step guide to converting images into Base64 strings using the Snappy Fix Image to Base64 Converter.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image file (JPG, PNG, WEBP)",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Image to Base64 Converter",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image file you want to convert into Base64.",
      },
      {
        "@type": "HowToStep",
        name: "Generate Base64 string",
        text: "The tool automatically encodes the image into a Base64 string.",
      },
      {
        "@type": "HowToStep",
        name: "Copy or download the encoded result",
        text: "Copy the Base64 string to embed it into your HTML, CSS, or code.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-to-base64-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="image-to-base64-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="image-to-base64-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="image-to-base64-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            {splitTitle(currentTool.name)}
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {currentTool.longDescription}
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <ImageToBase64Tools />

        <section className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Convert Images to Base64 Instantly
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Base64 encoding allows you to embed images directly inside HTML,
              CSS, JSON, and API responses. Convert your JPG, PNG, or WEBP
              images into Base64 strings instantly.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Why Use Base64 Encoding?
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
              <li>Embed images in HTML or CSS</li>
              <li>Send images through APIs</li>
              <li>Store images in JSON format</li>
              <li>Reduce external HTTP requests</li>
              <li>Inline small icons or logos</li>
              <li>Improve web performance in specific cases</li>
            </ul>
          </div>
        </section>

        <OtherToolsSection currentSlug="image-to-base64" />

        <section className="max-w-4xl mx-auto space-y-6">
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold">Is Base64 conversion secure?</h3>
              <p>
                Yes. Your image is encoded securely and not permanently stored.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Does Base64 reduce file size?</h3>
              <p>
                No. Base64 encoding increases file size slightly. It is mainly
                used for embedding and transport purposes.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
