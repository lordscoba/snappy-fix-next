import InstagramOptimizerTool from "@/components/tools/InstagramOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";

const currentTool = tools.find((tool) => tool.slug === "optimize-instagram")!;

export const metadata = {
  title:
    "Optimize Images for Instagram Free | Instagram Photo Resizer & Compressor - Snappy Fix",
  description:
    "Resize and compress images for Instagram posts, stories and reels. Get the perfect Instagram image dimensions instantly. Fast, secure and free online optimizer.",
  keywords: [
    "instagram image optimizer",
    "optimize image for instagram",
    "instagram photo resizer",
    "instagram image dimensions",
    "compress image for instagram",
    "instagram story size",
    "instagram post size",
    "best instagram image size",
    "resize image for instagram",
    "free instagram image optimizer",
  ],
};

export default function InstagramOptimizerPage() {
  return (
    <main className="bg-white">
      <section className="w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Optimize Images for Instagram
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Resize and compress your photos for Instagram posts, stories, and
            reels. Ensure your content displays perfectly without unwanted
            cropping or quality loss.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <InstagramOptimizerTool />

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Why Optimize for Instagram?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Instagram automatically compresses oversized images. Our tool
            prepares your photos using ideal aspect ratios and file sizes to
            preserve clarity and maximize engagement.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Correct aspect ratios</li>
            <li>Reduced compression artifacts</li>
            <li>Optimized for feed & stories</li>
            <li>Improved loading speed</li>
            <li>No watermark</li>
          </ul>
        </section>

        <OtherToolsSection currentSlug="optimize-instagram" />
      </section>
    </main>
  );
}
