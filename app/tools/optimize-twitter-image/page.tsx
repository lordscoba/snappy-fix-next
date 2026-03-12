import TwitterOptimizerTool from "@/components/tools/TwitterOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";

const currentTool = tools.find(
  (tool) => tool.slug === "optimize-twitter-image",
)!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function TwitterOptimizerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this Twitter image optimizer free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix Twitter Image Optimizer is completely free to use with no watermark.",
        },
      },
      {
        "@type": "Question",
        name: "What image size works best for Twitter posts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The recommended Twitter post image size is 1200 × 675 pixels for the best display across devices.",
        },
      },
      {
        "@type": "Question",
        name: "Can I optimize Twitter header images with this tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the tool supports resizing and optimizing images for Twitter headers, posts, and profile pictures.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Optimize Images for Twitter",
    description:
      "Step-by-step guide to resizing and optimizing images for Twitter posts and headers using the Snappy Fix Twitter Image Optimizer.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image file (JPG, PNG, WebP)",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Twitter Image Optimizer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image you want to optimize for Twitter.",
      },
      {
        "@type": "HowToStep",
        name: "Choose Twitter format",
        text: "Select the correct Twitter format such as post image, header, or profile picture.",
      },
      {
        "@type": "HowToStep",
        name: "Download the optimized image",
        text: "Download the optimized image ready to upload to Twitter.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="twitter-image-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="twitter-image-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="twitter-image-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="twitter-image-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Optimize Images for Twitter
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Automatically resize and compress images to meet Twitter (X)
            recommended dimensions. Improve engagement and avoid cropping issues
            with perfectly optimized images.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <TwitterOptimizerTool />

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Why Optimize Images for Twitter?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Twitter compresses large images automatically, which can reduce
            clarity. Our optimizer ensures your images match Twitter’s ideal
            dimensions and file size for better performance and visibility.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Perfect Twitter dimensions</li>
            <li>Reduced file size</li>
            <li>No visible quality loss</li>
            <li>Faster uploads</li>
            <li>Free and secure</li>
          </ul>
        </section>

        <OtherToolsSection currentSlug="optimize-twitter-image" />
      </section>
    </main>
  );
}
