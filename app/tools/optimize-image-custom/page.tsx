import CustomOptimizerTool from "@/components/tools/CustomOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";

const currentTool = tools.find((tool) => tool.slug === "optimize-custom")!;

export const metadata = {
  title:
    "Custom Image Optimizer Online | Compress to Target KB & Resize - Snappy Fix",
  description:
    "Optimize images with custom settings. Compress to target KB, adjust quality, and resize by percentage. Full control image optimization tool – fast, secure and free.",
  keywords: [
    "custom image optimizer",
    "compress image to target kb",
    "reduce image size to specific kb",
    "image compression with quality control",
    "resize image by percentage",
    "advanced image optimizer",
    "compress image without losing quality",
    "image size reducer online",
    "manual image compression tool",
    "optimize image custom settings",
  ],
};

export default function CustomOptimizerPage() {
  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Professional Custom Image Optimizer",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Image Optimization Tool",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    inLanguage: "en",
    url: "https://www.snappy-fix.com/tools/optimize-image-custom",
    description:
      "Optimize images with full control over compression level, quality, dimensions, and target file size using the Snappy Fix Custom Image Optimizer.",
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
        name: "Professional Custom Image Optimizer",
        item: "https://www.snappy-fix.com/tools/optimize-image-custom",
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
          __html: JSON.stringify(toolStructuredData),
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
          __html: JSON.stringify(breadcrumbSchema),
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
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Custom Image Optimizer
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Fine-tune your image optimization. Set a target file size in KB,
            adjust quality levels, and resize by percentage for full control
            over output results.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <CustomOptimizerTool />

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Advanced Image Compression Controls
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Unlike automatic optimizers, our custom tool gives you precise
            control. Reduce image size to exact requirements for exams,
            government portals, websites, or email attachments.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Set exact target KB</li>
            <li>Adjust compression quality</li>
            <li>Resize by percentage</li>
            <li>No watermark</li>
            <li>Secure processing</li>
          </ul>
        </section>

        <OtherToolsSection currentSlug="optimize-custom" />
      </section>
    </main>
  );
}
