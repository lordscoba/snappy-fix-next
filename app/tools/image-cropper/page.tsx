import CropImageTools from "@/components/tools/CropImageTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import { splitTitle } from "@/lib/utils/title";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";

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
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            {splitTitle(currentTool.name)}
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {currentTool.longDescription}
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <CropImageTools />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Crop Images to Exact Dimensions Instantly
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Our free online Image Cropper allows you to trim unwanted areas
              and focus on the most important parts of your image. Set custom
              width and height values or manually adjust the crop area for
              precise control.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Perfect for Social Media & Websites
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Different platforms require specific image sizes. Use our crop
              tool to prepare images for Instagram posts, Twitter previews,
              WhatsApp status updates, YouTube thumbnails, and more.
            </p>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside mt-4">
              <li>Square crop for Instagram</li>
              <li>Landscape crop for Twitter</li>
              <li>Thumbnail crop for YouTube</li>
              <li>Custom crop for websites</li>
              <li>Profile picture cropping</li>
              <li>Exact pixel dimension control</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Why Use Snappy Fix Image Cropper?
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
              <li>Precise manual crop selection</li>
              <li>Custom width and height settings</li>
              <li>No watermark</li>
              <li>Secure image processing</li>
              <li>Works on mobile and desktop</li>
              <li>Free and unlimited usage</li>
            </ul>
          </div>
        </section>

        {/* Other Tools Section */}
        <OtherToolsSection currentSlug="image-cropper" />

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold">Is this image cropper free?</h3>
              <p>
                Yes, our Image Cropper is completely free with no watermark or
                signup required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Does cropping reduce image quality?
              </h3>
              <p>
                Cropping only removes unwanted areas and does not reduce image
                quality unless you choose to compress the image afterward.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Are my images stored on your server?
              </h3>
              <p>
                No. Files are processed securely and are not permanently stored.
              </p>
            </div>
          </div>
        </section>

        {/* Random tools */}
        <RandomToolsSection />

        {/* Categories */}
        <ToolCategoriesSection />
      </section>
    </main>
  );
}
