import YouTubeOptimizerTool from "@/components/tools/YoutubeOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";

const currentTool = tools.find(
  (tool) => tool.slug === "optimize-youtube-thumbnail",
)!;

export const metadata = {
  title:
    "YouTube Thumbnail Optimizer Free | Resize & Compress YouTube Thumbnails - Snappy Fix",
  description:
    "Optimize YouTube thumbnails instantly. Resize to 1280x720, compress without quality loss, and meet YouTube thumbnail size requirements. Fast, secure and free online tool.",
  keywords: [
    "youtube thumbnail optimizer",
    "optimize youtube thumbnail",
    "youtube thumbnail size",
    "resize youtube thumbnail",
    "compress youtube thumbnail",
    "youtube thumbnail dimensions 1280x720",
    "best youtube thumbnail size",
    "youtube thumbnail compressor",
    "free youtube thumbnail resizer",
    "youtube image optimizer",
  ],
};

export default function YouTubeOptimizerPage() {
  return (
    <main className="bg-white">
      <section className="w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Optimize YouTube Thumbnails
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Resize and compress thumbnails to YouTube’s recommended 1280x720
            resolution. Improve clarity, reduce file size, and maximize
            click-through rates.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <YouTubeOptimizerTool />

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Why Optimize YouTube Thumbnails?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            YouTube recommends 1280x720 thumbnails under 2MB. Oversized images
            may be compressed automatically, reducing sharpness. Our tool
            ensures the perfect size and format for maximum visibility.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>1280x720 resolution support</li>
            <li>Reduced file size</li>
            <li>High visual clarity</li>
            <li>Faster upload speed</li>
            <li>No watermark</li>
          </ul>
        </section>

        <OtherToolsSection currentSlug="optimize-youtube-thumbnail" />
      </section>
    </main>
  );
}
