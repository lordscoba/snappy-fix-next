import WebOptimizerTool from "@/components/tools/WebOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";

const currentTool = tools.find((tool) => tool.slug === "optimize-web")!;

export const metadata = {
  title:
    "Optimize Images for Website Performance | Web Image Compressor - Snappy Fix",
  description:
    "Optimize images for websites and improve page speed. Reduce file size, enhance loading performance and boost SEO rankings with our free web image optimizer.",
  keywords: [
    "web image optimizer",
    "optimize image for website",
    "reduce image size for web",
    "website image compression tool",
    "improve page speed images",
    "image optimizer for seo",
    "compress images for website performance",
    "web performance image tool",
    "optimize images for faster loading",
    "website image resizer online",
  ],
};

export default function WebOptimizerPage() {
  return (
    <main className="bg-white">
      <section className="w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
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

        <OtherToolsSection currentSlug="optimize-web" />
      </section>
    </main>
  );
}
