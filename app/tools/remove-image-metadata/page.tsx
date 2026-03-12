import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import ExifScrubberTools from "@/components/tools/ExifScrubberTools";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";

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
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Image Metadata Remover (EXIF Scrubber)
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Remove hidden metadata from images to protect your privacy. Strip
            EXIF information such as GPS location, camera model, and timestamps
            before sharing photos online.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <ExifScrubberTools />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Remove Hidden EXIF Metadata from Images
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Digital photos often contain hidden EXIF metadata including GPS
            location, camera model, device details, timestamps, and other
            technical information. Our Image Metadata Remover allows you to
            quickly strip this hidden data to protect your privacy before
            uploading or sharing images online.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Remove EXIF metadata instantly</li>
            <li>Delete GPS location data from images</li>
            <li>No watermark</li>
            <li>Secure browser-based processing</li>
            <li>Free and unlimited usage</li>
          </ul>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="remove-image-metadata" />
      </section>
    </main>
  );
}
