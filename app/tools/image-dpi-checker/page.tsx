import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import ImageDPICheckerTools from "@/components/tools/ImageDPICheckerTools";

const currentTool = tools.find((tool) => tool.slug === "image-dpi-checker")!;

export const metadata = {
  title: "Image DPI Checker Online | Check Image Resolution & DPI - Snappy Fix",
  description:
    "Check image DPI, resolution, and printable size instantly. Analyze photo DPI, dimensions, and quality online for printing, design, and publishing.",
  keywords: [
    "check image dpi",
    "image dpi analyzer",
    "image resolution checker",
    "photo dpi checker",
    "check image resolution online",
    "analyze image dpi",
    "image dpi inspector",
    "photo resolution checker",
    "check dpi of image",
    "image print size checker",
  ],
};

export default function ImageDpiCheckerPage() {
  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Image DPI Checker",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Image Analysis Tool",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    inLanguage: "en",
    url: "https://www.snappy-fix.com/tools/image-dpi-checker",
    description:
      "Check image DPI, resolution, pixel dimensions, and printable size instantly using this free online Image DPI Checker.",
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
        name: "What is an Image DPI Checker?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An Image DPI Checker analyzes an image and shows its DPI, resolution, pixel dimensions, and estimated printable size.",
        },
      },
      {
        "@type": "Question",
        name: "Why is DPI important for images?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DPI (dots per inch) determines how detailed an image will appear when printed. Higher DPI values such as 300 DPI are commonly required for professional printing.",
        },
      },
      {
        "@type": "Question",
        name: "Are my uploaded images stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Images uploaded to the Snappy Fix Image DPI Checker are processed securely and are not permanently stored on our servers.",
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
        name: "Image DPI Checker",
        item: "https://www.snappy-fix.com/tools/image-dpi-checker",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Check Image DPI",
    description:
      "Step-by-step guide to checking the DPI, resolution, and printable size of an image using the Snappy Fix Image DPI Checker.",
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
        name: "Snappy Fix Image DPI Checker",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload the image",
        text: "Upload the image file you want to analyze.",
      },
      {
        "@type": "HowToStep",
        name: "Analyze the image",
        text: "The tool scans the image and calculates its DPI, pixel resolution, and dimensions.",
      },
      {
        "@type": "HowToStep",
        name: "View the image details",
        text: "Review the image DPI, resolution, and estimated printable size instantly.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-dpi-checker-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolStructuredData),
        }}
      />

      <Script
        id="image-dpi-checker-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="image-dpi-checker-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="image-dpi-checker-howto"
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
            Image DPI Checker
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Instantly check the DPI, resolution, and dimensions of your images.
            Our Image DPI Checker helps photographers, designers, and print
            professionals analyze image quality before printing or publishing.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <ImageDPICheckerTools />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Analyze Image DPI, Resolution, and Print Size
          </h2>

          <p className="text-gray-600 leading-relaxed">
            DPI (Dots Per Inch) determines how detailed an image appears when
            printed. Our Image DPI Checker allows you to analyze important image
            properties such as DPI, pixel dimensions, resolution, and estimated
            print size. This helps ensure your images meet the required quality
            standards for printing, publishing, or digital use.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Check image DPI instantly</li>
            <li>Analyze resolution and pixel dimensions</li>
            <li>View estimated print size</li>
            <li>Secure browser-based processing</li>
            <li>Free and unlimited usage</li>
          </ul>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="image-dpi-checker" />
      </section>
    </main>
  );
}
