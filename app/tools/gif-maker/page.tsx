import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import GifMakerPageClient from "./client";

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
      <GifMakerPageClient />
    </main>
  );
}
