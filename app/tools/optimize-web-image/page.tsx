import WebOptimizerTool from "@/components/tools/WebOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";

const currentTool = tools.find((tool) => tool.slug === "optimize-web-image")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function WebOptimizerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the Web Image Optimizer free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix Web Image Optimizer is completely free and does not add watermarks.",
        },
      },
      {
        "@type": "Question",
        name: "How much can image optimization reduce file size?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Image optimization can reduce file sizes by up to 80% depending on the image format and compression settings.",
        },
      },
      {
        "@type": "Question",
        name: "Will image optimization reduce image quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The tool compresses images intelligently to reduce file size while maintaining high visual quality.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Optimize Images for Websites",
    description:
      "Step-by-step guide to compressing and optimizing images for faster websites using the Snappy Fix Web Image Optimizer.",
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
        name: "Snappy Fix Web Image Optimizer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image you want to optimize for your website.",
      },
      {
        "@type": "HowToStep",
        name: "Optimize the image",
        text: "The tool compresses and optimizes the image to reduce file size while maintaining quality.",
      },
      {
        "@type": "HowToStep",
        name: "Download optimized image",
        text: "Download the optimized image ready for use on your website.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="web-image-optimizer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="web-image-optimizer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="web-image-optimizer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="web-image-optimizer-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Optimize Images for Websites
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Improve website performance and SEO rankings by reducing image size
            without sacrificing quality. Faster images mean faster page loads.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <WebOptimizerTool />

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Boost Website Speed with Optimized Images
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Large images slow down websites and hurt SEO. Our web optimizer
            compresses images efficiently to help improve Core Web Vitals and
            loading performance.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Smaller image sizes</li>
            <li>Improved page speed</li>
            <li>SEO-friendly compression</li>
            <li>Better user experience</li>
            <li>Free online tool</li>
          </ul>
        </section>

        <OtherToolsSection currentSlug="optimize-web-image" />
      </section>
    </main>
  );
}
