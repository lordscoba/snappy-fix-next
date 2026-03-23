import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import RemoveImageMetadataPageClient from "./client";

const currentTool = tools.find(
  (tool) => tool.slug === "remove-image-metadata",
)!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function RemoveImageMetadataPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is image metadata?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Image metadata is hidden information stored inside photos such as GPS location, camera model, device details, and timestamps.",
        },
      },
      {
        "@type": "Question",
        name: "Why should I remove EXIF metadata from images?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Removing EXIF metadata helps protect your privacy by eliminating sensitive information like GPS location and device details before sharing images online.",
        },
      },
      {
        "@type": "Question",
        name: "Are my uploaded images stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Images uploaded to the Snappy Fix Image Metadata Remover are processed securely and are not permanently stored on our servers.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Remove Image Metadata",
    description:
      "Step-by-step guide to removing EXIF metadata such as GPS location and camera information from images using the Snappy Fix Image Metadata Remover.",
    totalTime: "PT20S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image file (JPG, PNG, or WebP)",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Image Metadata Remover",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload the image",
        text: "Upload the image file that contains metadata you want to remove.",
      },
      {
        "@type": "HowToStep",
        name: "Remove the metadata",
        text: "Click the remove metadata button to strip EXIF data from the image.",
      },
      {
        "@type": "HowToStep",
        name: "Download the cleaned image",
        text: "Download the processed image with all metadata removed.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="remove-image-metadata-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="remove-image-metadata-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="remove-image-metadata-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="remove-image-metadata-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <RemoveImageMetadataPageClient />
    </main>
  );
}
