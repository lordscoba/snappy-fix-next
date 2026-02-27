import TwitterOptimizerTool from "@/components/tools/TwitterOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";

const currentTool = tools.find((tool) => tool.slug === "optimize-twitter")!;

export const metadata = {
  title:
    "Optimize Images for Twitter (X) Free Online | Best Twitter Image Optimizer - Snappy Fix",
  description:
    "Optimize images for Twitter (X) instantly. Resize and compress images for tweets, headers, and previews without losing quality. Fast, secure and free Twitter image optimizer.",
  keywords: [
    "twitter image optimizer",
    "optimize image for twitter",
    "twitter image size optimizer",
    "compress image for twitter",
    "twitter header size",
    "best twitter image dimensions",
    "optimize image for x",
    "twitter image compression tool",
    "free twitter image optimizer",
    "resize image for twitter post",
  ],
};

export default function TwitterOptimizerPage() {
  return (
    <main className="bg-white">
      <section className="w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Optimize Images for Twitter
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Automatically resize and compress images to meet Twitter (X)
            recommended dimensions. Improve engagement and avoid cropping issues
            with perfectly optimized images.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <TwitterOptimizerTool />

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Why Optimize Images for Twitter?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Twitter compresses large images automatically, which can reduce
            clarity. Our optimizer ensures your images match Twitter’s ideal
            dimensions and file size for better performance and visibility.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Perfect Twitter dimensions</li>
            <li>Reduced file size</li>
            <li>No visible quality loss</li>
            <li>Faster uploads</li>
            <li>Free and secure</li>
          </ul>
        </section>

        <OtherToolsSection currentSlug="optimize-twitter" />
      </section>
    </main>
  );
}
