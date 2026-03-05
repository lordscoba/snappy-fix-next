import ImageAnalyserTools from "@/components/tools/ImageAnalyserTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";

const currentTool = tools.find((tool) => tool.slug === "image-analyzer")!;

export const metadata = {
  title:
    "Image Analyzer Online | Check Image Size, Dimensions & Metadata - Snappy Fix",
  description:
    "Analyze image properties instantly. Check image size, dimensions, format, file type and metadata online for free. Fast, secure and accurate image analysis tool.",
  keywords: [
    // Core
    "image analyzer",
    "analyze image online",
    "image file analyzer",
    "image metadata viewer",
    "check image details",

    // Technical checks
    "check image size",
    "check image dimensions",
    "image resolution checker",
    "image format checker",
    "image file type checker",
    "inspect image properties",

    // Metadata intent
    "view image metadata",
    "extract image metadata",
    "exif data viewer",
    "check exif data online",
    "image information tool",

    // Web & SEO intent
    "analyze image for website",
    "check image size for web",
    "optimize image before upload",
    "inspect image before optimization",

    // Trust & modifiers
    "free image analyzer",
    "secure image analyzer",
    "online image inspection tool",
    "no signup image analyzer",
    "private image checker",
  ],
};

export default function ImageAnalyzerPage() {
  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Image Metadata & DPI Analyzer",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Image Analysis Tool",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    inLanguage: "en",
    url: "https://www.snappy-fix.com/tools/image-analyzer",
    description:
      "Analyze image metadata, DPI, dimensions, format, and EXIF information instantly using this free online image analyzer.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does the Image Analyzer tool do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Snappy Fix Image Analyzer scans your image and reveals detailed information such as format, dimensions, DPI, color profile, and EXIF metadata.",
        },
      },
      {
        "@type": "Question",
        name: "Can I view hidden metadata in my images?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The tool can extract embedded EXIF metadata including camera information, image size, DPI settings, and other hidden properties.",
        },
      },
      {
        "@type": "Question",
        name: "Is the image analyzer secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Images are processed securely and are not permanently stored on our servers.",
        },
      },
    ],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.snappy-fix.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://www.snappy-fix.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Image Metadata & DPI Analyzer",
        item: "https://www.snappy-fix.com/tools/image-analyzer",
      },
    ],
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Analyze Image Metadata and DPI",
    description:
      "Step-by-step guide to analyzing image properties and metadata using the Snappy Fix Image Analyzer tool.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image file (JPG, PNG, WebP, etc.)",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Image Metadata & DPI Analyzer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image file you want to analyze from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Analyze the image",
        text: "Click analyze to extract metadata including dimensions, format, DPI, and EXIF information.",
      },
      {
        "@type": "HowToStep",
        name: "View the image details",
        text: "Review the extracted metadata such as resolution, color profile, and hidden EXIF properties.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-analyzer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolStructuredData),
        }}
      />

      <Script
        id="image-analyzer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="image-analyzer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="image-analyzer-howto"
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
            {currentTool.name}
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {currentTool.longDescription}
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool UI */}
        <ImageAnalyserTools />

        {/* SEO Description Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Analyze Image Size, Dimensions & Format Instantly
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Before optimizing, resizing, or uploading images to your website,
              it's important to inspect their properties. Our Image Analyzer
              lets you instantly check file size, resolution, dimensions, format
              type, and metadata without installing any software.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              What Can You Check?
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
              <li>Image file size (KB / MB)</li>
              <li>Width and height in pixels</li>
              <li>Image format (JPG, PNG, WEBP, SVG, etc.)</li>
              <li>Resolution details</li>
              <li>Color profile information</li>
              <li>EXIF metadata (if available)</li>
              <li>File type validation</li>
              <li>Compression insights</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Why Analyze Images Before Optimization?
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Many website performance issues come from oversized or improperly
              formatted images. By analyzing your image first, you can:
            </p>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside mt-4">
              <li>Reduce page load time</li>
              <li>Improve Core Web Vitals</li>
              <li>Detect unnecessary metadata</li>
              <li>Choose the right compression settings</li>
              <li>Prepare images for SEO optimization</li>
              <li>Avoid upload rejections on platforms</li>
            </ul>
          </div>
        </section>

        {/* Other Tools Section */}
        <OtherToolsSection currentSlug="image-analyzer" />

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold">Is this image analyzer free?</h3>
              <p>
                Yes, the Snappy Fix Image Analyzer is completely free with no
                watermark or signup required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Does this tool modify my image?</h3>
              <p>
                No. The analyzer only inspects your image properties and does
                not change the file.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Are my images stored?</h3>
              <p>
                No. Files are processed securely and are not permanently stored
                on our servers.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
