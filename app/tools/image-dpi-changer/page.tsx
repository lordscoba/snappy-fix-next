import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import ImageDPIChangerTools from "@/components/tools/ImageDPIChangerTools";

const currentTool = tools.find((tool) => tool.slug === "image-dpi-changer")!;

export const metadata = {
  title:
    "Image DPI Changer Online | Change Image DPI for Print & Design - Snappy Fix",
  description:
    "Change image DPI online without resizing the image. Adjust photos to 72, 150, 300, or custom DPI for printing, publishing, and professional design.",
  keywords: [
    "change image dpi",
    "image dpi converter",
    "adjust dpi image",
    "photo dpi changer",
    "change dpi of image online",
    "set image dpi to 300",
    "image dpi editor",
    "convert image to 300 dpi",
    "change photo resolution dpi",
    "dpi changer online",
  ],
};

export default function ImageDpiChangerPage() {
  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Image DPI Changer",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Image Editing Tool",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    inLanguage: "en",
    url: "https://www.snappy-fix.com/tools/image-dpi-changer",
    description:
      "Change image DPI online without resizing the image. Convert photos to 72, 150, 300, or custom DPI for printing, web use, or publishing.",
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
        name: "What does an Image DPI Changer do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An Image DPI Changer modifies the DPI (dots per inch) metadata of an image so it meets requirements for printing, publishing, or design work.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert my image to 300 DPI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix Image DPI Changer allows you to set images to 72, 150, 300, or any custom DPI value instantly.",
        },
      },
      {
        "@type": "Question",
        name: "Does changing DPI affect image dimensions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Changing DPI only modifies the print resolution metadata and does not change the actual pixel dimensions of the image.",
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
        name: "Image DPI Changer",
        item: "https://www.snappy-fix.com/tools/image-dpi-changer",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Change Image DPI",
    description:
      "Step-by-step guide to modifying image DPI settings using the Snappy Fix Image DPI Changer.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image file (JPG, PNG, or WebP)",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Image DPI Changer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image file whose DPI you want to change.",
      },
      {
        "@type": "HowToStep",
        name: "Choose the desired DPI",
        text: "Select or enter the DPI value such as 72, 150, 300, or a custom DPI.",
      },
      {
        "@type": "HowToStep",
        name: "Download the updated image",
        text: "Click convert and download the image with the updated DPI settings.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-dpi-changer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolStructuredData),
        }}
      />

      <Script
        id="image-dpi-changer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="image-dpi-changer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="image-dpi-changer-howto"
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
            Image DPI Changer
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Change the DPI (dots per inch) of your images instantly without
            altering their dimensions. Perfect for preparing images for
            printing, publishing, and professional design.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <ImageDPIChangerTools />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Adjust Image DPI for Print and Professional Use
          </h2>

          <p className="text-gray-600 leading-relaxed">
            DPI (Dots Per Inch) determines how detailed an image appears when
            printed. Many printers and publishers require images to have
            specific DPI settings such as 300 DPI for high-quality printing. Our
            Image DPI Changer allows you to quickly adjust the DPI of your
            images without affecting their pixel dimensions or quality.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Change image DPI instantly</li>
            <li>Supports 72, 150, 300, or custom DPI values</li>
            <li>No watermark</li>
            <li>Secure browser-based processing</li>
            <li>Free and unlimited usage</li>
          </ul>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="image-dpi-changer" />
      </section>
    </main>
  );
}
