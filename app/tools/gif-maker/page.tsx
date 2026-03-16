import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import GifConverterTools from "@/components/tools/GIFConverterTools";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";

const currentTool = tools.find((tool) => tool.slug === "gif-maker")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function GifMakerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a GIF maker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A GIF maker is a tool that allows you to create animated GIF images from videos or multiple photos. GIFs are widely used for memes, reactions, and short animations.",
        },
      },
      {
        "@type": "Question",
        name: "Can I create a GIF from images?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix GIF Maker allows you to upload multiple images and combine them into a smooth animated GIF.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert a video to a GIF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can upload a short video clip and convert it into an animated GIF that can be shared on social media or messaging apps.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create an Animated GIF",
    description:
      "Step-by-step guide to creating animated GIFs from videos or images using the Snappy Fix GIF Maker.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Video clip or image files",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix GIF Maker",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload media",
        text: "Upload a video clip or multiple images that you want to convert into a GIF.",
      },
      {
        "@type": "HowToStep",
        name: "Generate the GIF",
        text: "Click generate to convert the uploaded media into an animated GIF.",
      },
      {
        "@type": "HowToStep",
        name: "Download the GIF",
        text: "Download your animated GIF and share it on social media or messaging apps.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="gif-maker-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="gif-maker-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="gif-maker-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="gif-maker-howto"
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
            GIF Maker
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create animated GIFs from videos or multiple images instantly. Our
            free GIF maker lets you convert video clips into GIF animations or
            combine images to produce smooth animated GIFs perfect for social
            media, messaging apps, and memes.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <GifConverterTools />

        {/* Rich SEO Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              What Is a GIF?
            </h2>

            <p className="text-gray-600 leading-relaxed">
              A GIF (Graphics Interchange Format) is a short animated image
              format widely used on the web. GIFs are perfect for creating
              looping animations, reaction memes, short motion graphics, and
              social media content. Because GIF files are lightweight and
              supported on almost every platform, they are commonly used in
              messaging apps, websites, and online communities.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              Create GIFs from Videos or Images
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Our online GIF maker allows you to convert short video clips or
              images into high-quality animated GIFs in seconds. You can trim
              videos, adjust animation smoothness using FPS controls, resize the
              GIF width, select quality presets, and even reverse the animation
              to create unique looping effects.
            </p>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside mt-4">
              <li>Convert video clips into animated GIFs</li>
              <li>Create GIF animations from images</li>
              <li>Trim video segments before generating GIFs</li>
              <li>Control animation speed using FPS settings</li>
              <li>Resize GIF width for optimized file sizes</li>
              <li>Reverse video animations for creative effects</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              Why Use Our Online GIF Maker?
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
              <li>Convert videos to GIFs instantly</li>
              <li>Create GIF animations from images</li>
              <li>Trim videos before GIF creation</li>
              <li>Adjust animation smoothness (FPS control)</li>
              <li>Choose quality presets for optimized GIFs</li>
              <li>Resize GIF width for smaller file sizes</li>
              <li>No watermark on generated GIFs</li>
              <li>Fast and secure cloud processing</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              How to Create a GIF Online
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Creating animated GIFs with our tool is simple and fast. Follow
              these steps to generate your GIF in seconds:
            </p>

            <ol className="text-gray-600 list-decimal list-inside mt-4 space-y-2">
              <li>Upload a video file or image.</li>
              <li>If using a video, trim the segment you want to convert.</li>
              <li>Adjust animation settings like FPS, width, or quality.</li>
              <li>Generate the animated GIF instantly.</li>
              <li>Download and share your GIF anywhere.</li>
            </ol>
          </div>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="gif-maker" />

        {/* Random tools */}
        <RandomToolsSection />

        {/* Categories */}
        <ToolCategoriesSection />
      </section>
    </main>
  );
}
