import ImageResizerTool from "@/components/tools/ResizeImageTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import Script from "next/script";

const currentTool = tools.find((tool) => tool.slug === "image-resizer")!;

export const metadata = {
  title:
    "Free Online Image Resizer | Resize Images to Exact Width & Height - Snappy Fix",
  description:
    "Resize images online instantly. Change image width and height in pixels, resize by percentage, or maintain aspect ratio. Free, fast and secure image resizing tool.",
  keywords: [
    // Core
    "image resizer",
    "resize image online",
    "free image resizer",
    "photo resizer online",
    "online image resize tool",

    // Dimension intent
    "resize image to exact size",
    "resize image to specific dimensions",
    "resize image width and height",
    "resize image in pixels",
    "custom image resizer",

    // Percentage & scaling
    "resize image by percentage",
    "scale image online",
    "increase image size",
    "reduce image dimensions",
    "shrink image size online",

    // Social media
    "resize image for instagram",
    "resize image for twitter",
    "resize image for whatsapp",
    "resize youtube thumbnail",
    "profile picture resizer",
    "Instagram Post: 1080 × 1080",
    "Instagram Story: 1080 × 1920",
    "Twitter Post: 1600 × 900",
    "YouTube Thumbnail: 1280 × 720",

    // Web & performance
    "resize image for website",
    "optimize image dimensions",
    "reduce image size for web",
    "prepare image for upload",

    // Trust modifiers
    "secure image resizer",
    "no watermark image resizer",
    "private image resize tool",
    "free unlimited image resizer",
  ],
  alternates: {
    canonical: "/tools/image-resizer",
  },
};

export default function ImageResizerPage() {
  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Image Resizer",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Image Processing Tool",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    inLanguage: "en",
    url: "https://www.snappy-fix.com/tools/image-resizer",
    description:
      "Free online image resizer to change image width and height instantly.",
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
        name: "Is this image resizer free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix Image Resizer is completely free with no watermark.",
        },
      },
      {
        "@type": "Question",
        name: "Does resizing reduce image quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Resizing changes dimensions but does not reduce quality unless compression is applied.",
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
        name: "Image Resizer",
        item: "https://www.snappy-fix.com/tools/image-resizer",
      },
    ],
  };
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Resize an Image Online",
    description:
      "Step-by-step guide to resizing images online using the Snappy Fix Image Resizer tool.",
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
        name: "Snappy Fix Image Resizer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image you want to resize from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Set width and height",
        text: "Enter the desired width and height in pixels or resize by percentage.",
      },
      {
        "@type": "HowToStep",
        name: "Download the resized image",
        text: "Click resize and download the optimized image instantly.",
      },
    ],
  };

  return (
    <main className="bg-white min-h-screen">
      {/* Tool Structured Data */}
      <Script
        id="image-resizer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolStructuredData),
        }}
      />
      <Script
        id="image-resizer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="image-resizer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Script
        id="image-resizer-howto"
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
        <ImageResizerTool />

        {/* SEO Description Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Resize Images to Exact Width and Height
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Our free online Image Resizer allows you to change image width and
              height in pixels instantly. Whether you need to shrink large
              images for websites or enlarge photos for presentations, Snappy
              Fix provides precise resizing control.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Maintain Aspect Ratio or Resize by Percentage
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Choose to maintain the original aspect ratio to prevent image
              distortion, or resize by percentage for proportional scaling.
              Perfect for developers, designers, students and marketers.
            </p>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside mt-4">
              <li>Resize by custom width & height</li>
              <li>Scale image by percentage</li>
              <li>Maintain original proportions</li>
              <li>Reduce large image dimensions</li>
              <li>Enlarge smaller images</li>
              <li>Prepare images for uploads</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Perfect for Social Media & Websites
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Different platforms require specific image sizes. Resize your
              images for Instagram posts, Twitter previews, WhatsApp status,
              YouTube thumbnails, and website banners in seconds.
            </p>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside mt-4">
              <li>Instagram feed & profile images</li>
              <li>Twitter post dimensions</li>
              <li>YouTube thumbnails</li>
              <li>Website hero banners</li>
              <li>Email attachments</li>
              <li>Online form submissions</li>
            </ul>
          </div>
        </section>

        {/* Other Tools Section */}
        <OtherToolsSection currentSlug="image-resizer" />

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold">Is this image resizer free?</h3>
              <p>
                Yes, the Snappy Fix Image Resizer is completely free with no
                watermark or signup required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Does resizing reduce image quality?
              </h3>
              <p>
                Resizing changes dimensions but does not reduce quality unless
                compression is applied separately.
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
