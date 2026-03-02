import SVGImageOptimization from "@/components/tools/SVGImageOptimization";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";
import ToolTopNav from "@/components/Layout/ToolTopNav";

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
  return (
    <main className="bg-white min-h-screen">
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
