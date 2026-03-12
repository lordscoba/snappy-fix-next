import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import StickerGeneratorTools from "@/components/tools/StickerGeneratorTools";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";

const currentTool = tools.find((tool) => tool.slug === "sticker-maker")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function StickerMakerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a sticker maker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A sticker maker is a tool that allows you to create messaging stickers from images or videos. These stickers can be used in apps like WhatsApp and Telegram for chats and reactions.",
        },
      },
      {
        "@type": "Question",
        name: "Can I create WhatsApp stickers from images?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can upload photos and convert them into transparent WhatsApp stickers using the Snappy Fix Sticker Maker.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert videos into animated stickers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix Sticker Maker allows you to convert short videos into animated stickers optimized for messaging apps.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create Stickers from Images or Videos",
    description:
      "Step-by-step guide to creating custom stickers using the Snappy Fix Sticker Maker.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image or video file",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Sticker Maker",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your media",
        text: "Upload the image or short video you want to convert into a sticker.",
      },
      {
        "@type": "HowToStep",
        name: "Generate the sticker",
        text: "Convert the uploaded media into a transparent or animated sticker.",
      },
      {
        "@type": "HowToStep",
        name: "Download the sticker",
        text: "Download your sticker and use it in WhatsApp, Telegram, or other messaging apps.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="sticker-maker-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="sticker-maker-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="sticker-maker-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="sticker-maker-howto"
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
            Sticker Maker
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create custom stickers from images or videos instantly. Our free
            online sticker maker lets you generate transparent stickers for
            WhatsApp, Telegram, and other messaging apps — perfect for memes,
            reactions, and personalized sticker packs.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <StickerGeneratorTools />

        {/* Rich SEO Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              What Is an Online Sticker Maker?
            </h2>

            <p className="text-gray-600 leading-relaxed">
              An online sticker maker is a tool that allows you to create custom
              messaging stickers from images or short videos. Stickers are
              widely used in messaging platforms like WhatsApp and Telegram to
              express emotions, reactions, memes, and creative messages in
              chats. With a modern sticker generator, you can instantly convert
              photos, graphics, or video clips into shareable stickers optimized
              for messaging apps.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              Create Stickers from Images or Videos
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Our online sticker generator lets you create both static and
              animated stickers in seconds. Upload an image to create a
              high-quality sticker or convert a short video clip into an
              animated sticker optimized for messaging apps. You can trim video
              segments, adjust animation smoothness, control quality settings,
              and even reverse animations to create unique sticker effects.
            </p>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside mt-4">
              <li>Convert images into high-quality stickers</li>
              <li>Create animated stickers from short videos</li>
              <li>Trim video clips before generating stickers</li>
              <li>Control animation speed using FPS settings</li>
              <li>Reverse video animations for creative effects</li>
              <li>Generate stickers optimized for WhatsApp and Telegram</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              Why Use Our Sticker Generator?
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
              <li>Create stickers from images or videos</li>
              <li>Generate animated WhatsApp stickers</li>
              <li>Trim videos before sticker creation</li>
              <li>Adjust animation smoothness (FPS control)</li>
              <li>Choose quality presets for optimized stickers</li>
              <li>Fast and secure cloud processing</li>
              <li>No watermark added to your stickers</li>
              <li>Free and unlimited usage</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              How to Create a Sticker Online
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Creating custom stickers with our online tool is quick and simple.
              Follow these steps to generate your own sticker in seconds:
            </p>

            <ol className="text-gray-600 list-decimal list-inside mt-4 space-y-2">
              <li>Upload an image or short video.</li>
              <li>If using a video, trim the segment you want to convert.</li>
              <li>Adjust animation settings such as FPS or quality.</li>
              <li>Generate the sticker instantly.</li>
              <li>Download the sticker and use it in WhatsApp or Telegram.</li>
            </ol>
          </div>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="sticker-maker" />
      </section>
    </main>
  );
}
