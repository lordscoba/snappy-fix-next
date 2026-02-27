import SeoResponsiveOptimizerTool from "@/components/tools/SEOResponsiveOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";

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
  return (
    <main className="bg-white">
      <section className="w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
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
