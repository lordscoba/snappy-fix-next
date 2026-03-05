import SeoResponsiveOptimizerTool from "@/components/tools/SEOResponsiveOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import Script from "next/script";

const currentTool = tools.find(
  (tool) => tool.slug === "optimize-seo-responsive",
)!;

export const metadata = {
  title:
    "SEO Responsive Image Optimizer | Optimize Images for Search Engines - Snappy Fix",
  description:
    "Optimize images for SEO and responsive design. Reduce file size, improve mobile performance and enhance search engine rankings with our SEO responsive image optimizer.",
  keywords: [
    "seo image optimizer",
    "responsive image optimizer",
    "optimize images for seo",
    "compress images for mobile",
    "responsive web images",
    "image optimization for search engines",
    "reduce image size for seo",
    "mobile friendly image optimizer",
    "seo image compression tool",
    "optimize images for core web vitals",
  ],
};

export default function SeoResponsiveOptimizerPage() {
  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SEO & Responsive Image Generator",
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "SEO Optimization Tool",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    inLanguage: "en",
    url: "https://www.snappy-fix.com/tools/optimize-seo-responsive-image",
    description:
      "Generate responsive images and srcset attributes for better SEO and Core Web Vitals performance.",
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
        name: "SEO & Responsive Image Generator",
        item: "https://www.snappy-fix.com/tools/optimize-seo-responsive-image",
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
          __html: JSON.stringify(toolStructuredData),
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
          __html: JSON.stringify(breadcrumbSchema),
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
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            SEO Responsive Image Optimizer
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Prepare your images for responsive websites and search engines.
            Reduce file sizes and improve loading speeds across all devices.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <SeoResponsiveOptimizerTool />

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Why SEO Image Optimization Matters
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Optimized images improve mobile performance, reduce bounce rates,
            and contribute to better search engine rankings. Make your website
            faster and more competitive.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Improved Core Web Vitals</li>
            <li>Faster mobile loading</li>
            <li>Reduced bandwidth usage</li>
            <li>Higher SEO ranking potential</li>
            <li>Secure and private processing</li>
          </ul>
        </section>

        <OtherToolsSection currentSlug="optimize-seo-responsive" />
      </section>
    </main>
  );
}
