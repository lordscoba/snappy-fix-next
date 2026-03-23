import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import FaviconGeneratorPageClient from "./client";

const currentTool = tools.find((tool) => tool.slug === "favicon-generator")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function FaviconGeneratorPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a favicon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A favicon is a small icon displayed in browser tabs, bookmarks, and website shortcuts. It helps users identify a website quickly.",
        },
      },
      {
        "@type": "Question",
        name: "Can I generate multiple favicon sizes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix Favicon Generator creates multiple standard favicon sizes including 16x16, 32x32, and Apple Touch icons for modern browsers and devices.",
        },
      },
      {
        "@type": "Question",
        name: "Is the favicon generator free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix Favicon Generator is completely free and allows unlimited icon generation.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Generate a Favicon for Your Website",
    description:
      "Step-by-step guide to generating favicon icons from any image using the Snappy Fix Favicon Generator.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Logo or image file",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Favicon Generator",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your logo",
        text: "Upload the logo or image you want to convert into a favicon.",
      },
      {
        "@type": "HowToStep",
        name: "Generate favicon sizes",
        text: "Click generate to create standard favicon sizes such as 16x16 and 32x32.",
      },
      {
        "@type": "HowToStep",
        name: "Download favicon files",
        text: "Download the favicon package and add it to your website.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="favicon-generator-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="favicon-generator-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="favicon-generator-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="favicon-generator-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <FaviconGeneratorPageClient />
    </main>
  );
}
