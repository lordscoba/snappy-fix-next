import FaviconGeneratorTool from "@/components/tools/FaviconGenerator";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";

const currentTool = tools.find((tool) => tool.slug === "favicon-generator")!;

export const metadata = {
  title:
    "Favicon Generator Online | Create ICO & App Icons from PNG or JPG - Snappy Fix",
  description:
    "Generate favicon.ico files instantly from PNG, JPG or SVG images. Create website favicons, app icons, and multi-size favicon packages for all devices. Free and secure favicon generator.",
  keywords: [
    "favicon generator",
    "create favicon online",
    "png to ico converter",
    "generate favicon from image",
    "favicon creator free",
    "favicon ico generator",
    "website icon generator",
    "convert image to favicon",
    "create favicon for website",
    "favicon maker online",
    "generate app icons",
    "multi size favicon generator",
  ],
};

export default function FaviconGeneratorPage() {
  const toolStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Favicon & App Icon Generator",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Website Icon Generator",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript. Works in modern browsers.",
    inLanguage: "en",
    url: "https://www.snappy-fix.com/tools/favicon-generator",
    description:
      "Generate favicon icons and app icons for websites instantly. Convert any image into 16x16, 32x32, and Apple Touch icons using this free favicon generator.",
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
        name: "Favicon & App Icon Generator",
        item: "https://www.snappy-fix.com/tools/favicon-generator",
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
          __html: JSON.stringify(toolStructuredData),
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
          __html: JSON.stringify(breadcrumbSchema),
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
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Favicon Generator
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create professional favicon.ico files instantly from PNG, JPG, or
            SVG images. Generate multi-size favicons optimized for browsers,
            mobile devices, and web apps — fast, secure and free.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <FaviconGeneratorTool />

        {/* Rich SEO Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              What Is a Favicon?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              A favicon is the small icon displayed in browser tabs, bookmarks,
              search results, and mobile home screens. It represents your brand
              visually and improves recognition, trust, and user experience.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              Generate Multi-Size Favicon Files
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Modern websites require multiple favicon sizes for compatibility
              across browsers and devices. Our favicon generator automatically
              creates optimized icon sizes such as:
            </p>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside mt-4">
              <li>16×16 favicon (browser tabs)</li>
              <li>32×32 favicon</li>
              <li>48×48 Windows icons</li>
              <li>180×180 Apple touch icon</li>
              <li>192×192 Android icon</li>
              <li>512×512 PWA icon</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              Why Use Our Favicon Creator?
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
              <li>Convert PNG, JPG, or SVG to ICO</li>
              <li>Generate multi-resolution favicon package</li>
              <li>No watermark</li>
              <li>Optimized for all modern browsers</li>
              <li>Secure image processing</li>
              <li>Free and unlimited usage</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4] mb-4">
              How to Add Favicon to Your Website
            </h2>

            <p className="text-gray-600 leading-relaxed">
              After downloading your favicon file, upload it to your website
              root directory and add this code inside your HTML{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                &lt;head&gt;
              </code>{" "}
              section:
            </p>

            <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-700 mt-4 overflow-x-auto">
              {`<link rel="icon" type="image/x-icon" href="/favicon.ico">`}
            </div>
          </div>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="favicon-generator" />
      </section>
    </main>
  );
}
