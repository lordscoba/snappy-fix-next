import ImageAnalyserTools from "@/components/tools/ImageAnalyserTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";

const currentTool = tools.find((tool) => tool.slug === "image-analyzer")!;

export const metadata = {
  title:
    "Image Analyzer Online | Check Image Size, Dimensions & Metadata - Snappy Fix",
  description:
    "Analyze image properties instantly. Check image size, dimensions, format, file type and metadata online for free. Fast, secure and accurate image analysis tool.",
  keywords: [
    // Core
    "image analyzer",
    "analyze image online",
    "image file analyzer",
    "image metadata viewer",
    "check image details",

    // Technical checks
    "check image size",
    "check image dimensions",
    "image resolution checker",
    "image format checker",
    "image file type checker",
    "inspect image properties",

    // Metadata intent
    "view image metadata",
    "extract image metadata",
    "exif data viewer",
    "check exif data online",
    "image information tool",

    // Web & SEO intent
    "analyze image for website",
    "check image size for web",
    "optimize image before upload",
    "inspect image before optimization",

    // Trust & modifiers
    "free image analyzer",
    "secure image analyzer",
    "online image inspection tool",
    "no signup image analyzer",
    "private image checker",
  ],
};

export default function ImageAnalyzerPage() {
  return (
    <main className="bg-white min-h-screen">
      <ToolTopNav />
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
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
        <ImageAnalyserTools />

        {/* SEO Description Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Analyze Image Size, Dimensions & Format Instantly
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Before optimizing, resizing, or uploading images to your website,
              it's important to inspect their properties. Our Image Analyzer
              lets you instantly check file size, resolution, dimensions, format
              type, and metadata without installing any software.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              What Can You Check?
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
              <li>Image file size (KB / MB)</li>
              <li>Width and height in pixels</li>
              <li>Image format (JPG, PNG, WEBP, SVG, etc.)</li>
              <li>Resolution details</li>
              <li>Color profile information</li>
              <li>EXIF metadata (if available)</li>
              <li>File type validation</li>
              <li>Compression insights</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Why Analyze Images Before Optimization?
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Many website performance issues come from oversized or improperly
              formatted images. By analyzing your image first, you can:
            </p>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside mt-4">
              <li>Reduce page load time</li>
              <li>Improve Core Web Vitals</li>
              <li>Detect unnecessary metadata</li>
              <li>Choose the right compression settings</li>
              <li>Prepare images for SEO optimization</li>
              <li>Avoid upload rejections on platforms</li>
            </ul>
          </div>
        </section>

        {/* Other Tools Section */}
        <OtherToolsSection currentSlug="image-analyzer" />

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold">Is this image analyzer free?</h3>
              <p>
                Yes, the Snappy Fix Image Analyzer is completely free with no
                watermark or signup required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Does this tool modify my image?</h3>
              <p>
                No. The analyzer only inspects your image properties and does
                not change the file.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Are my images stored?</h3>
              <p>
                No. Files are processed securely and are not permanently stored
                on our servers.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
