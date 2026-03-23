import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import ImageCropperPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "image-cropper")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function ImageCropperPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this image cropper free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix Image Cropper is completely free and allows unlimited cropping without watermarks.",
        },
      },
      {
        "@type": "Question",
        name: "Can I crop images to specific aspect ratios?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can crop images using custom dimensions or preset aspect ratios for platforms like Instagram, YouTube, and Twitter.",
        },
      },
      {
        "@type": "Question",
        name: "Does cropping reduce image quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cropping only removes unwanted areas of the image and does not reduce the original quality of the remaining portion.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Crop an Image Online",
    description:
      "Step-by-step guide to cropping images using the Snappy Fix Image Cropper tool.",
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
        name: "Snappy Fix Image Cropper",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image you want to crop from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Select crop area",
        text: "Drag the crop box or choose preset aspect ratios to frame the desired area.",
      },
      {
        "@type": "HowToStep",
        name: "Download the cropped image",
        text: "Apply the crop and download the final image instantly.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-cropper-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="image-cropper-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="image-cropper-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="image-cropper-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <ImageCropperPageClient />
    </main>
  );
}
