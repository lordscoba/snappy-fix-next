import { tools } from "@/data/toolsData";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import Script from "next/script";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import SeoResponsiveOptimizerPageClient from "./client";

const currentTool = tools.find(
  (tool) => tool.slug === "optimize-seo-responsive-image",
)!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}
export default function SeoResponsiveOptimizerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a responsive image?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Responsive images allow browsers to load the most appropriate image size depending on the device screen size and resolution.",
        },
      },
      {
        "@type": "Question",
        name: "How does responsive images improve SEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Responsive images improve page speed and Core Web Vitals, which are ranking factors for Google SEO.",
        },
      },
      {
        "@type": "Question",
        name: "Does this tool generate srcset automatically?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The tool generates optimized image sizes and srcset attributes you can directly use in your HTML.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Generate Responsive Images for SEO",
    description:
      "Step-by-step guide to generating responsive images and srcset attributes using the Snappy Fix SEO & Responsive Image Generator.",
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
        name: "Snappy Fix SEO & Responsive Image Generator",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image you want to optimize for SEO and responsive design.",
      },
      {
        "@type": "HowToStep",
        name: "Generate responsive sizes",
        text: "The tool automatically creates multiple image sizes suitable for mobile, tablet, and desktop screens.",
      },
      {
        "@type": "HowToStep",
        name: "Copy the srcset code",
        text: "Copy the generated srcset and sizes attributes to use in your HTML or website.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="seo-responsive-image-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />
      <Script
        id="seo-responsive-image-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="seo-responsive-image-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />
      <Script
        id="seo-responsive-image-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <SeoResponsiveOptimizerPageClient />
    </main>
  );
}
