import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import ImageDPIChangerTools from "@/components/tools/ImageDPIChangerTools";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";

const currentTool = tools.find((tool) => tool.slug === "image-dpi-changer")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function ImageDpiChangerPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does an Image DPI Changer do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An Image DPI Changer modifies the DPI (dots per inch) metadata of an image so it meets requirements for printing, publishing, or design work.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert my image to 300 DPI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Snappy Fix Image DPI Changer allows you to set images to 72, 150, 300, or any custom DPI value instantly.",
        },
      },
      {
        "@type": "Question",
        name: "Does changing DPI affect image dimensions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Changing DPI only modifies the print resolution metadata and does not change the actual pixel dimensions of the image.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Change Image DPI",
    description:
      "Step-by-step guide to modifying image DPI settings using the Snappy Fix Image DPI Changer.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Image file (JPG, PNG, or WebP)",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix Image DPI Changer",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your image",
        text: "Upload the image file whose DPI you want to change.",
      },
      {
        "@type": "HowToStep",
        name: "Choose the desired DPI",
        text: "Select or enter the DPI value such as 72, 150, 300, or a custom DPI.",
      },
      {
        "@type": "HowToStep",
        name: "Download the updated image",
        text: "Click convert and download the image with the updated DPI settings.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="image-dpi-changer-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="image-dpi-changer-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="image-dpi-changer-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="image-dpi-changer-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />
      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-3 py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Image DPI Changer
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Change the DPI (dots per inch) of your images instantly without
            altering their dimensions. Perfect for preparing images for
            printing, publishing, and professional design.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <ImageDPIChangerTools />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Change Image DPI Online Instantly
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Our free <strong>Image DPI Changer</strong> helps you quickly change
            the DPI of an image online without reducing quality or altering the
            pixel dimensions. Whether you need to
            <strong>increase image DPI for printing</strong>, reduce DPI for web
            use, or convert the DPI of JPEG and PNG images, this tool allows you
            to do it instantly in your browser.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Many professional printing services require images to have a
            specific DPI value, commonly{" "}
            <strong>300 DPI for high-quality printing</strong>. If your photo or
            graphic has the wrong DPI setting, it may appear blurry or fail
            print requirements. With this
            <strong>photo DPI changer</strong>, you can easily adjust the DPI
            metadata of your image in seconds.
          </p>

          <h3 className="text-xl font-semibold text-[#5b32b4]">
            What Is DPI in an Image?
          </h3>

          <p className="text-gray-600 leading-relaxed">
            DPI stands for <strong>Dots Per Inch</strong> and represents how
            many printed dots fit within one inch of an image when it is
            printed. A higher DPI produces sharper printed images, while lower
            DPI values are typically used for screens or web images.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>72 DPI – Standard for web images</li>
            <li>150 DPI – Medium quality printing</li>
            <li>300 DPI – Professional printing quality</li>
            <li>600 DPI – High resolution publishing</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#5b32b4]">
            How to Change DPI of an Image
          </h3>

          <p className="text-gray-600 leading-relaxed">
            If you're wondering{" "}
            <strong>how to change the DPI of an image</strong>, the process is
            simple using our online tool. Follow these steps to change the DPI
            of your photo or graphic:
          </p>

          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Upload your image (JPEG, PNG, or other supported formats).</li>
            <li>Select the DPI value you want (72, 150, 300, or custom).</li>
            <li>Click the convert button to adjust the DPI.</li>
            <li>Download the updated image with the new DPI setting.</li>
          </ol>

          <h3 className="text-xl font-semibold text-[#5b32b4]">
            Change DPI of JPEG, PNG, and Photos
          </h3>

          <p className="text-gray-600 leading-relaxed">
            Our <strong>DPI converter</strong> supports common image formats
            including JPEG, JPG, and PNG. Whether you need a{" "}
            <strong>JPEG DPI converter</strong>, want to change the DPI of a PNG
            image, or simply adjust the DPI of a photo for printing, this tool
            makes the process quick and easy.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Change DPI of JPEG images</li>
            <li>Change DPI of PNG files</li>
            <li>Increase image DPI online</li>
            <li>Reduce DPI for web optimization</li>
            <li>Resize image DPI metadata without changing dimensions</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#5b32b4]">
            Why Use This Image DPI Converter?
          </h3>

          <p className="text-gray-600 leading-relaxed">
            Unlike many online tools, our <strong>image DPI converter</strong>{" "}
            works directly in your browser. This means your files remain private
            and are never uploaded to a server. It is a fast, secure, and
            completely free solution for anyone who needs to
            <strong>change photo DPI online</strong>.
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
            <li>Free DPI changer with unlimited usage</li>
            <li>No watermark on exported images</li>
            <li>Works on mobile, tablet, and desktop</li>
            <li>Fast browser-based image processing</li>
            <li>No registration required</li>
          </ul>

          <h3 className="text-xl font-semibold text-[#5b32b4]">
            Frequently Asked Questions
          </h3>

          <p className="text-gray-600 leading-relaxed">
            <strong>Can you change the DPI of an image?</strong>
            Yes. You can easily change the DPI of an image using our online DPI
            adjuster without affecting the pixel size of the image.
          </p>

          <p className="text-gray-600 leading-relaxed">
            <strong>Does changing DPI affect image quality?</strong>
            Changing DPI modifies the print density information stored in the
            image file. It does not reduce image quality unless the image is
            resized or compressed.
          </p>

          <p className="text-gray-600 leading-relaxed">
            <strong>What DPI should images be for printing?</strong>
            Most professional printers recommend <strong>300 DPI</strong> for
            high-quality prints. Lower values such as 72 DPI are typically used
            for digital screens.
          </p>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="image-dpi-changer" />

        {/* Random tools */}
        <RandomToolsSection />

        {/* Categories */}
        <ToolCategoriesSection />
      </section>
    </main>
  );
}
