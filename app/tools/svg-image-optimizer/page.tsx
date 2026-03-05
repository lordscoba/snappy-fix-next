import SVGImageOptimization from "@/components/tools/SVGImageOptimization";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import Script from "next/script";

const currentTool = tools.find((tool) => tool.slug === "svg-image-optimizer")!;

export const metadata = {
  title:
    "Free SVG Optimizer Online | Reduce SVG File Size Without Losing Quality - Snappy Fix",
  description:
    "Optimize SVG files instantly. Reduce SVG file size, remove unnecessary code, and improve website performance. Fast, secure and free SVG image optimizer.",
  keywords: [
    "svg optimizer",
    "optimize svg online",
    "reduce svg file size",
    "compress svg file",
    "svg file size reducer",
    "svg minifier online",
    "optimize svg for web",
    "svg cleaner tool",
    "remove unnecessary svg data",
    "svg compression tool",
    "optimize svg without quality loss",
    "secure svg optimizer",
    "free svg optimizer online",
  ],
};

export default function SVGImageOptimizerPage() {
  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SVG Vector Optimizer (SVGO)",
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "SVG Optimization Tool",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    inLanguage: "en",
    url: "https://www.snappy-fix.com/tools/svg-image-optimizer",
    description:
      "Reduce SVG file size instantly by removing unnecessary code, metadata, and hidden elements using the Snappy Fix SVG Vector Optimizer.",
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
        name: "Is the SVG optimizer free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Snappy Fix SVG Vector Optimizer is completely free and works directly in your browser.",
        },
      },
      {
        "@type": "Question",
        name: "What does SVG optimization do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SVG optimization removes unnecessary metadata, comments, and hidden elements from the SVG code to reduce file size and improve loading speed.",
        },
      },
      {
        "@type": "Question",
        name: "Will optimizing SVG affect the design?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The optimizer removes redundant code while keeping the visual appearance of the SVG unchanged.",
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
        name: "SVG Vector Optimizer (SVGO)",
        item: "https://www.snappy-fix.com/tools/svg-image-optimizer",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Optimize an SVG File",
    description:
      "Step-by-step guide to compressing and optimizing SVG files using the Snappy Fix SVG Vector Optimizer.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "SVG file",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix SVG Vector Optimizer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your SVG file",
        text: "Upload the SVG file you want to optimize.",
      },
      {
        "@type": "HowToStep",
        name: "Optimize the SVG",
        text: "The tool removes unnecessary metadata, comments, and hidden elements from the SVG code.",
      },
      {
        "@type": "HowToStep",
        name: "Download the optimized SVG",
        text: "Download the cleaned and optimized SVG file ready for web use.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="svg-optimizer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolStructuredData),
        }}
      />

      <Script
        id="svg-optimizer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="svg-optimizer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="svg-optimizer-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            {currentTool.name}
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {currentTool.longDescription}
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <SVGImageOptimization />

        <section className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Reduce SVG File Size Without Losing Quality
            </h2>

            <p className="text-gray-600 leading-relaxed">
              SVG files often contain unnecessary metadata, comments, and hidden
              attributes that increase file size. Our SVG Optimizer removes
              redundant code while preserving visual quality.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Why Optimize SVG for Web?
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
              <li>Improve website loading speed</li>
              <li>Reduce bandwidth usage</li>
              <li>Improve SEO performance</li>
              <li>Enhance Core Web Vitals</li>
              <li>Clean unnecessary metadata</li>
              <li>Maintain scalable vector quality</li>
            </ul>
          </div>
        </section>

        <OtherToolsSection currentSlug="svg-image-optimizer" />

        <section className="max-w-4xl mx-auto space-y-6">
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold">
                Does SVG optimization reduce quality?
              </h3>
              <p>
                No. Our tool removes unnecessary code while preserving the
                original vector graphics.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Is this SVG optimizer free?</h3>
              <p>
                Yes. You can optimize SVG files without watermark or signup.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
