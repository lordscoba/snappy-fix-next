import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import ImageWatermarkPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "image-watermark")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function ImageWatermarkPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I add a watermark to an image?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Upload your image to the Snappy Fix Image Watermark Tool, add text or a logo watermark, adjust its position and transparency, and download the protected image.",
        },
      },
      {
        "@type": "Question",
        name: "Can I add a logo watermark to photos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can upload a logo image and apply it as a watermark to your photos to protect them and promote your brand.",
        },
      },
      {
        "@type": "Question",
        name: "Is the image watermark tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix Image Watermark Tool is completely free and allows unlimited watermarking of photos and images.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Add a Watermark to an Image",
    description:
      "Step-by-step guide to adding text or logo watermarks to images using the Snappy Fix Image Watermark Tool.",
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
        name: "Snappy Fix Image Watermark Tool",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the photo or image you want to protect with a watermark.",
      },
      {
        "@type": "HowToStep",
        name: "Add watermark",
        text: "Insert a text watermark or upload a logo and adjust its size, position, and transparency.",
      },
      {
        "@type": "HowToStep",
        name: "Download watermarked image",
        text: "Download the final image with the watermark applied.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-watermark-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="image-watermark-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="image-watermark-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="image-watermark-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <ImageWatermarkPageClient />
    </main>
  );
}
