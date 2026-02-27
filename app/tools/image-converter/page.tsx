import ImageConverterTool from "@/components/tools/ImageConverterTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";

const currentTool = tools.find((tool) => tool.slug === "image-converter")!;

export const metadata = {
  title:
    "Free Online Image Converter | Convert JPG, PNG, WEBP, SVG - Snappy Fix",
  description:
    "Convert images online for free. Instantly convert JPG to PNG, PNG to WEBP, WEBP to JPG and more. Fast, secure and high-quality image conversion tool by Snappy Fix.",
  keywords: [
    // Core
    "image converter",
    "free image converter",
    "online image converter",
    "image file converter",
    "photo converter online",
    "convert images online",

    // Popular format conversions
    "convert jpg to png",
    "convert png to jpg",
    "convert png to webp",
    "convert webp to png",
    "convert webp to jpg",
    "convert avif to jpg",
    "convert avif to png",
    "convert gif to png",
    "convert bmp to jpg",
    "convert tiff to jpg",
    "convert image to webp",
    "convert image to png",
    "convert image to jpg",

    // Web optimization intent
    "webp converter online",
    "image optimizer and converter",
    "convert image for website",
    "convert image for web",
    "reduce image size and convert",
    "compress and convert image",

    // Bulk & usability
    "batch image converter",
    "bulk image converter online",
    "multiple image converter",
    "drag and drop image converter",
    "fast image converter",
    "instant image converter",

    // Trust & free modifiers
    "free online image converter no watermark",
    "secure image converter",
    "private image converter",
    "no signup image converter",
    "unlimited image converter",

    // Device intent
    "image converter for mobile",
    "convert image on iphone",
    "convert image on android",
    "mac image converter online",
    "windows image converter online",

    // Modern format targeting (high value SEO)
    "best webp converter",
    "avif image converter",
    "modern image format converter",
  ],
};

export default function ImageConverterPage() {
  return (
    <main className="bg-white">
      <section className="w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            {currentTool.name}
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {currentTool.longDescription}
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool UI */}
        <ImageConverterTool />

        {/* SEO Description Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Convert Images to Any Format Instantly
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Our free online image converter helps developers, designers,
            marketers and businesses convert image formats instantly without
            losing quality. Whether you need JPG, PNG, WEBP or SVG conversion,
            Snappy Fix ensures fast processing and secure uploads.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Convert JPG to PNG</li>
            <li>Convert PNG to WEBP</li>
            <li>Convert WEBP to JPG</li>
            <li>No watermark</li>
            <li>Fast and secure processing</li>
            <li>Works on all devices</li>
          </ul>
        </section>

        {/* Reusable Other Tools Section */}
        <OtherToolsSection currentSlug="image-converter" />

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold">Is this image converter free?</h3>
              <p>Yes, Snappy Fix Image Converter is completely free to use.</p>
            </div>

            <div>
              <h3 className="font-semibold">Does it reduce image quality?</h3>
              <p>No. We preserve image quality during conversion.</p>
            </div>

            <div>
              <h3 className="font-semibold">Are my images stored?</h3>
              <p>
                No. Files are processed securely and not permanently stored.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
