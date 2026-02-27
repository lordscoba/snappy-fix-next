import CustomOptimizerTool from "@/components/tools/CustomOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";

const currentTool = tools.find((tool) => tool.slug === "optimize-custom")!;

export const metadata = {
  title:
    "Custom Image Optimizer Online | Compress to Target KB & Resize - Snappy Fix",
  description:
    "Optimize images with custom settings. Compress to target KB, adjust quality, and resize by percentage. Full control image optimization tool – fast, secure and free.",
  keywords: [
    "custom image optimizer",
    "compress image to target kb",
    "reduce image size to specific kb",
    "image compression with quality control",
    "resize image by percentage",
    "advanced image optimizer",
    "compress image without losing quality",
    "image size reducer online",
    "manual image compression tool",
    "optimize image custom settings",
  ],
};

export default function CustomOptimizerPage() {
  return (
    <main className="bg-white">
      <section className="w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Custom Image Optimizer
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Fine-tune your image optimization. Set a target file size in KB,
            adjust quality levels, and resize by percentage for full control
            over output results.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <CustomOptimizerTool />

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Advanced Image Compression Controls
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Unlike automatic optimizers, our custom tool gives you precise
            control. Reduce image size to exact requirements for exams,
            government portals, websites, or email attachments.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Set exact target KB</li>
            <li>Adjust compression quality</li>
            <li>Resize by percentage</li>
            <li>No watermark</li>
            <li>Secure processing</li>
          </ul>
        </section>

        <OtherToolsSection currentSlug="optimize-custom" />
      </section>
    </main>
  );
}
