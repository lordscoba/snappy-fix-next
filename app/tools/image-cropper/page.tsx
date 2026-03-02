import CropImageTools from "@/components/tools/CropImageTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import { tools } from "@/data/toolsData";

const currentTool = tools.find((tool) => tool.slug === "image-cropper")!;

export const metadata = {
  title:
    "Free Online Image Cropper | Crop Images to Exact Dimensions - Snappy Fix",
  description:
    "Crop images online instantly. Cut images to exact width and height, square crop for social media, or custom crop area. Free, fast and secure image cropping tool.",
  keywords: [
    // Core
    "image cropper",
    "crop image online",
    "free image cropper",
    "online photo cropper",
    "crop photo online",

    // Dimension intent
    "crop image to exact size",
    "crop image to specific dimensions",
    "crop image to width and height",
    "custom image cropper",
    "manual image cropping tool",

    // Social media intent
    "crop image for instagram",
    "crop image for twitter",
    "crop image for whatsapp",
    "crop youtube thumbnail",
    "square image cropper",

    // Web intent
    "crop image for website",
    "resize and crop image",
    "optimize image by cropping",
    "reduce image dimensions online",

    // Trust modifiers
    "secure image cropper",
    "no watermark image cropper",
    "private image editor online",
    "free unlimited image crop tool",
  ],
};

export default function ImageCropperPage() {
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

        {/* Tool Component */}
        <CropImageTools />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Crop Images to Exact Dimensions Instantly
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Our free online Image Cropper allows you to trim unwanted areas
              and focus on the most important parts of your image. Set custom
              width and height values or manually adjust the crop area for
              precise control.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Perfect for Social Media & Websites
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Different platforms require specific image sizes. Use our crop
              tool to prepare images for Instagram posts, Twitter previews,
              WhatsApp status updates, YouTube thumbnails, and more.
            </p>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside mt-4">
              <li>Square crop for Instagram</li>
              <li>Landscape crop for Twitter</li>
              <li>Thumbnail crop for YouTube</li>
              <li>Custom crop for websites</li>
              <li>Profile picture cropping</li>
              <li>Exact pixel dimension control</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Why Use Snappy Fix Image Cropper?
            </h2>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
              <li>Precise manual crop selection</li>
              <li>Custom width and height settings</li>
              <li>No watermark</li>
              <li>Secure image processing</li>
              <li>Works on mobile and desktop</li>
              <li>Free and unlimited usage</li>
            </ul>
          </div>
        </section>

        {/* Other Tools Section */}
        <OtherToolsSection currentSlug="image-cropper" />

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold">Is this image cropper free?</h3>
              <p>
                Yes, our Image Cropper is completely free with no watermark or
                signup required.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Does cropping reduce image quality?
              </h3>
              <p>
                Cropping only removes unwanted areas and does not reduce image
                quality unless you choose to compress the image afterward.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Are my images stored on your server?
              </h3>
              <p>
                No. Files are processed securely and are not permanently stored.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
