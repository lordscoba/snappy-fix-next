import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import StickerMakerPageClient from "./client";

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
      <StickerMakerPageClient />
    </main>
  );
}
