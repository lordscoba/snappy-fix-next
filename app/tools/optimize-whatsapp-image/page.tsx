import { tools } from "@/data/toolsData";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import WhatsAppOptimizerPageClient from "./client";

const currentTool = tools.find(
  (tool) => tool.slug === "optimize-whatsapp-image",
)!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function WhatsAppOptimizerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this WhatsApp image optimizer free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix WhatsApp Image Optimizer is completely free and does not add watermarks.",
        },
      },
      {
        "@type": "Question",
        name: "Why does WhatsApp reduce image quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WhatsApp automatically compresses large images to reduce file size and save bandwidth. Optimizing images before uploading helps maintain better quality.",
        },
      },
      {
        "@type": "Question",
        name: "What image size works best for WhatsApp status?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The recommended WhatsApp status size is 1080 × 1920 pixels with a 9:16 aspect ratio for the best display on mobile devices.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Optimize Images for WhatsApp",
    description:
      "Step-by-step guide to resizing and compressing images for WhatsApp status and chats using the Snappy Fix WhatsApp Image Optimizer.",
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
        name: "Snappy Fix WhatsApp Image Optimizer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image you want to optimize for WhatsApp.",
      },
      {
        "@type": "HowToStep",
        name: "Optimize the image",
        text: "The tool automatically compresses and resizes the image to ideal WhatsApp dimensions.",
      },
      {
        "@type": "HowToStep",
        name: "Download the optimized image",
        text: "Download the optimized image ready to share on WhatsApp status or chats.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="whatsapp-image-optimizer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="whatsapp-image-optimizer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="whatsapp-image-optimizer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="whatsapp-image-optimizer-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ToolTopNav />
      <WhatsAppOptimizerPageClient />
    </main>
  );
}
