import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import ImageColorEffectsPageClient from "./client";

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
      <ImageColorEffectsPageClient />
    </main>
  );
}
