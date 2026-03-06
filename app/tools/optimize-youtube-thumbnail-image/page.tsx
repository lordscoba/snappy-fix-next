import YouTubeOptimizerTool from "@/components/tools/YoutubeOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import Script from "next/script";

const currentTool = tools.find(
  (tool) => tool.slug === "optimize-youtube-thumbnail",
)!;

export const metadata = {
  title:
    "YouTube Thumbnail Optimizer Free | Resize & Compress YouTube Thumbnails - Snappy Fix",
  description:
    "Optimize YouTube thumbnails instantly. Resize to 1280x720, compress without quality loss, and meet YouTube thumbnail size requirements. Fast, secure and free online tool.",
  keywords: [
    "youtube thumbnail optimizer",
    "optimize youtube thumbnail",
    "youtube thumbnail size",
    "resize youtube thumbnail",
    "compress youtube thumbnail",
    "youtube thumbnail dimensions 1280x720",
    "best youtube thumbnail size",
    "youtube thumbnail compressor",
    "free youtube thumbnail resizer",
    "youtube image optimizer",
  ],
};

export default function YouTubeOptimizerPage() {
  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "YouTube Thumbnail Optimizer",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Social Media Image Optimization Tool",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    inLanguage: "en",
    url: "https://www.snappy-fix.com/tools/optimize-youtube-thumbnail-image",
    description:
      "Optimize and compress images to the perfect YouTube thumbnail size (1280x720) while staying under the 2MB limit.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this YouTube thumbnail optimizer free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix YouTube Thumbnail Optimizer is completely free and does not add watermarks.",
        },
      },
      {
        "@type": "Question",
        name: "What is the recommended YouTube thumbnail size?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The recommended YouTube thumbnail size is 1280 × 720 pixels with a 16:9 aspect ratio.",
        },
      },
      {
        "@type": "Question",
        name: "What is the maximum thumbnail file size for YouTube?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "YouTube thumbnails must be less than 2MB and can be in JPG, PNG, or WebP format.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.snappy-fix.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://www.snappy-fix.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "YouTube Thumbnail Optimizer",
        item: "https://www.snappy-fix.com/tools/optimize-youtube-thumbnail-image",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Optimize a YouTube Thumbnail",
    description:
      "Step-by-step guide to creating and optimizing YouTube thumbnails using the Snappy Fix YouTube Thumbnail Optimizer.",
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
        name: "Snappy Fix YouTube Thumbnail Optimizer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image you want to use as a YouTube thumbnail.",
      },
      {
        "@type": "HowToStep",
        name: "Optimize thumbnail size",
        text: "The tool automatically resizes and compresses the image to the recommended 1280x720 YouTube thumbnail size.",
      },
      {
        "@type": "HowToStep",
        name: "Download optimized thumbnail",
        text: "Download the optimized thumbnail ready to upload to your YouTube video.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="youtube-thumbnail-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolStructuredData),
        }}
      />

      <Script
        id="youtube-thumbnail-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="youtube-thumbnail-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="youtube-thumbnail-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Optimize YouTube Thumbnails
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Resize and compress thumbnails to YouTube’s recommended 1280x720
            resolution. Improve clarity, reduce file size, and maximize
            click-through rates.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <YouTubeOptimizerTool />

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Why Optimize YouTube Thumbnails?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            YouTube recommends 1280x720 thumbnails under 2MB. Oversized images
            may be compressed automatically, reducing sharpness. Our tool
            ensures the perfect size and format for maximum visibility.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>1280x720 resolution support</li>
            <li>Reduced file size</li>
            <li>High visual clarity</li>
            <li>Faster upload speed</li>
            <li>No watermark</li>
          </ul>
        </section>

        <OtherToolsSection currentSlug="optimize-youtube-thumbnail-image" />
      </section>
    </main>
  );
}
