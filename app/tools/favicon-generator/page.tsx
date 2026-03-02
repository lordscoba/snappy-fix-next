import FaviconGeneratorTool from "@/components/tools/FaviconGenerator";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";

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
  return (
    <main className="bg-white min-h-screen">
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
