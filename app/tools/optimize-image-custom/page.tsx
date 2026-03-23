import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import CustomImageOptimizerPageClient from "./client";

const currentTool = tools.find(
  (tool) => tool.slug === "optimize-image-custom",
)!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function CustomOptimizerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does the Custom Image Optimizer do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Snappy Fix Custom Image Optimizer allows you to compress images, adjust quality levels, resize dimensions, and target specific file sizes for optimal performance.",
        },
      },
      {
        "@type": "Question",
        name: "Can I reduce image size to a specific KB?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can set a target file size in KB and the optimizer will compress the image accordingly.",
        },
      },
      {
        "@type": "Question",
        name: "Does image optimization reduce quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Compression may slightly reduce quality depending on the level selected, but the tool aims to maintain the best visual quality while reducing file size.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Optimize an Image with Custom Settings",
    description:
      "Step-by-step guide to compressing and optimizing images using the Snappy Fix Custom Image Optimizer.",
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
        name: "Snappy Fix Custom Image Optimizer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image you want to optimize from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Adjust optimization settings",
        text: "Set compression level, quality slider, target file size, or resize dimensions.",
      },
      {
        "@type": "HowToStep",
        name: "Download the optimized image",
        text: "Apply the optimization and download the compressed image instantly.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="optimize-image-custom-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="optimize-image-custom-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="optimize-image-custom-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="optimize-image-custom-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <CustomImageOptimizerPageClient />
    </main>
  );
}
