import WhatsAppOptimizerTool from "@/components/tools/WhatsappOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";

const currentTool = tools.find((tool) => tool.slug === "optimize-whatsapp")!;

export const metadata = {
  title:
    "Optimize Images for WhatsApp Free | Compress & Resize WhatsApp Images - Snappy Fix",
  description:
    "Optimize images for WhatsApp without losing quality. Compress and resize photos for faster sharing and reduced data usage. Free and secure WhatsApp image optimizer.",
  keywords: [
    "whatsapp image optimizer",
    "compress image for whatsapp",
    "whatsapp image size",
    "resize image for whatsapp",
    "whatsapp photo compressor",
    "optimize image for whatsapp status",
    "whatsapp image compression tool",
    "reduce whatsapp image size",
    "free whatsapp image optimizer",
    "whatsapp image resizer online",
  ],
};

export default function WhatsAppOptimizerPage() {
  return (
    <main className="bg-white">
      <section className="w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Optimize Images for WhatsApp
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Compress and resize images to share faster on WhatsApp. Reduce file
            size without visible quality loss and improve upload speed.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <WhatsAppOptimizerTool />

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Why Optimize for WhatsApp?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            WhatsApp automatically compresses large images, which can degrade
            quality. Optimizing before upload preserves clarity while reducing
            file size for quicker sharing.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Smaller file sizes</li>
            <li>Better image clarity</li>
            <li>Faster sharing</li>
            <li>Optimized for WhatsApp status</li>
            <li>Secure and private processing</li>
          </ul>
        </section>

        <OtherToolsSection currentSlug="optimize-whatsapp" />
      </section>
    </main>
  );
}
