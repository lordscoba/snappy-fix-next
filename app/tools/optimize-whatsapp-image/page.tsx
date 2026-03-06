import WhatsAppOptimizerTool from "@/components/tools/WhatsappOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import Script from "next/script";

const currentTool = tools.find((tool) => tool.slug === "optimize-whatsapp")!;

export const metadata = {
  title:
    "Optimize Images for WhatsApp Free | Compress & Resize WhatsApp Images - Snappy Fix",
  description:
    "Optimize images for WhatsApp without losing quality. Compress and resize photos for faster sharing and reduced data usage. Free and secure WhatsApp image optimizer.",
  keywords: [
    "whatsapp image optimizer",
    "compress image for whatsapp",
    "whatsapp image size",
    "resize image for whatsapp",
    "whatsapp photo compressor",
    "optimize image for whatsapp status",
    "whatsapp image compression tool",
    "reduce whatsapp image size",
    "free whatsapp image optimizer",
    "whatsapp image resizer online",
  ],
};

export default function WhatsAppOptimizerPage() {
  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WhatsApp Image Optimizer",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Social Media Image Optimization Tool",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    inLanguage: "en",
    url: "https://www.snappy-fix.com/tools/optimize-whatsapp-image",
    description:
      "Resize and compress images for WhatsApp status updates and chat sharing without losing quality.",
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
        name: "Is this WhatsApp image optimizer free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix WhatsApp Image Optimizer is completely free and does not add watermarks.",
        },
      },
      {
        "@type": "Question",
        name: "Why does WhatsApp reduce image quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WhatsApp automatically compresses large images to reduce file size and save bandwidth. Optimizing images before uploading helps maintain better quality.",
        },
      },
      {
        "@type": "Question",
        name: "What image size works best for WhatsApp status?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The recommended WhatsApp status size is 1080 × 1920 pixels with a 9:16 aspect ratio for the best display on mobile devices.",
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
        name: "WhatsApp Image Optimizer",
        item: "https://www.snappy-fix.com/tools/optimize-whatsapp-image",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Optimize Images for WhatsApp",
    description:
      "Step-by-step guide to resizing and compressing images for WhatsApp status and chats using the Snappy Fix WhatsApp Image Optimizer.",
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
        name: "Snappy Fix WhatsApp Image Optimizer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image you want to optimize for WhatsApp.",
      },
      {
        "@type": "HowToStep",
        name: "Optimize the image",
        text: "The tool automatically compresses and resizes the image to ideal WhatsApp dimensions.",
      },
      {
        "@type": "HowToStep",
        name: "Download the optimized image",
        text: "Download the optimized image ready to share on WhatsApp status or chats.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="whatsapp-image-optimizer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolStructuredData),
        }}
      />

      <Script
        id="whatsapp-image-optimizer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="whatsapp-image-optimizer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="whatsapp-image-optimizer-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Optimize Images for WhatsApp
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Compress and resize images to share faster on WhatsApp. Reduce file
            size without visible quality loss and improve upload speed.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <WhatsAppOptimizerTool />

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Why Optimize for WhatsApp?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            WhatsApp automatically compresses large images, which can degrade
            quality. Optimizing before upload preserves clarity while reducing
            file size for quicker sharing.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Smaller file sizes</li>
            <li>Better image clarity</li>
            <li>Faster sharing</li>
            <li>Optimized for WhatsApp status</li>
            <li>Secure and private processing</li>
          </ul>
        </section>

        <OtherToolsSection currentSlug="optimize-whatsapp-image" />
      </section>
    </main>
  );
}
