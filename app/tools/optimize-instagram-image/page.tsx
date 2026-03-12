import InstagramOptimizerTool from "@/components/tools/InstagramOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";

const currentTool = tools.find(
  (tool) => tool.slug === "optimize-instagram-image",
)!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function InstagramOptimizerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What size should images be for Instagram?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common Instagram sizes include 1:1 (1080x1080) for posts, 4:5 (1080x1350) for portrait posts, and 9:16 (1080x1920) for stories and reels.",
        },
      },
      {
        "@type": "Question",
        name: "Does this tool crop images for Instagram automatically?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix Instagram Image Resizer automatically adjusts images to Instagram’s recommended aspect ratios.",
        },
      },
      {
        "@type": "Question",
        name: "Is the Instagram image resizer free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the tool is completely free and allows unlimited Instagram image resizing.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Resize an Image for Instagram",
    description:
      "Step-by-step guide to resizing images for Instagram posts, stories, and reels using the Snappy Fix Instagram Image Resizer.",
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
        name: "Snappy Fix Instagram Image Resizer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image you want to resize for Instagram.",
      },
      {
        "@type": "HowToStep",
        name: "Choose Instagram format",
        text: "Select the format such as square post (1:1), portrait post (4:5), or story/reel (9:16).",
      },
      {
        "@type": "HowToStep",
        name: "Download the optimized image",
        text: "Resize the image and download the Instagram-ready version instantly.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="optimize-instagram-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="optimize-instagram-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="optimize-instagram-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="optimize-instagram-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Optimize Images for Instagram
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Resize and compress your photos for Instagram posts, stories, and
            reels. Ensure your content displays perfectly without unwanted
            cropping or quality loss.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <InstagramOptimizerTool />

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Why Optimize for Instagram?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Instagram automatically compresses oversized images. Our tool
            prepares your photos using ideal aspect ratios and file sizes to
            preserve clarity and maximize engagement.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Correct aspect ratios</li>
            <li>Reduced compression artifacts</li>
            <li>Optimized for feed & stories</li>
            <li>Improved loading speed</li>
            <li>No watermark</li>
          </ul>
        </section>

        <OtherToolsSection currentSlug="optimize-instagram-image" />
      </section>
    </main>
  );
}
