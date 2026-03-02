import Base64ToImageTools from "@/components/tools/Base64ToImageTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";

const currentTool = tools.find((tool) => tool.slug === "base64-to-image")!;

export const metadata = {
  title:
    "Base64 to Image Converter Online | Decode Base64 to JPG, PNG, WEBP - Snappy Fix",
  description:
    "Convert Base64 strings back into image files instantly. Decode Base64 to JPG, PNG, WEBP and more. Free, fast, and secure Base64 to image converter online.",
  keywords: [
    "base64 to image",
    "decode base64 to jpg",
    "convert base64 to png",
    "base64 image decoder online",
    "base64 to webp converter",
    "decode base64 string to image",
    "base64 image converter free",
    "convert base64 to image file",
    "base64 to jpg online",
    "base64 decoder tool",
  ],
};

export default function Base64ToImagePage() {
  return (
    <main className="bg-white">
      <section className="w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Base64 to Image Converter
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Instantly decode Base64 strings into downloadable image files.
            Convert Base64 to JPG, PNG, WEBP, and other image formats securely
            and for free.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <Base64ToImageTools />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Decode Base64 Strings into Images Instantly
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Base64 encoding is commonly used to embed images in HTML, CSS, and
            JSON responses. Our Base64 to Image converter allows you to quickly
            decode those encoded strings back into usable image files without
            installing any software.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Convert Base64 to JPG, PNG, WEBP</li>
            <li>Instant decoding and download</li>
            <li>No watermark</li>
            <li>Secure browser-based processing</li>
            <li>Free and unlimited usage</li>
          </ul>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="base64-to-image" />
      </section>
    </main>
  );
}
