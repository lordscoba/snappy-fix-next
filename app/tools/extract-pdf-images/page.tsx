import OtherToolsSection from "@/components/tools/OtherToolsSection";
import ToolTopNav from "@/components/Layout/ToolTopNav";
import { tools } from "@/data/toolsData";
import Script from "next/script";
import ExtractPDFImagesTools from "@/components/tools/ExtractPDFImagesTools";
import { getToolMetadata, getToolSchemas } from "@/lib/utils/metadata";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";

const currentTool = tools.find((tool) => tool.slug === "extract-pdf-images")!;

export async function generateMetadata() {
  return getToolMetadata(currentTool.slug);
}

export default function ExtractPdfImagesPage() {
  const schemas = getToolSchemas(currentTool.slug);
  if (!schemas) return null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does the Extract Images from PDF tool do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Extract Images from PDF tool pulls all embedded images from a PDF file and allows you to download them individually without losing quality.",
        },
      },
      {
        "@type": "Question",
        name: "Can I extract images from any PDF file?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the tool works with most PDF documents and extracts images that are embedded inside the file.",
        },
      },
      {
        "@type": "Question",
        name: "Are my PDF files stored on your servers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Uploaded files are processed securely and are not permanently stored on our servers.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Extract Images from a PDF",
    description:
      "Step-by-step guide to extracting embedded images from PDF documents using the Snappy Fix PDF image extractor.",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "PDF document containing images",
      },
    ],
    tool: [
      {
        "@type": "HowToTool",
        name: "Snappy Fix PDF Image Extractor",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Upload your PDF file",
        text: "Upload the PDF document that contains the images you want to extract.",
      },
      {
        "@type": "HowToStep",
        name: "Extract the images",
        text: "Click the extract button to scan the PDF and retrieve all embedded images.",
      },
      {
        "@type": "HowToStep",
        name: "Download the images",
        text: "Preview and download the extracted images individually or all at once.",
      },
    ],
  };
  return (
    <main className="bg-white min-h-screen">
      <Script
        id="extract-pdf-images-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.toolStructuredData),
        }}
      />

      <Script
        id="extract-pdf-images-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="extract-pdf-images-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Script
        id="extract-pdf-images-howto"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <ToolTopNav />

      <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Extract Images from PDF
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Extract images from PDF files instantly without losing quality. Our
            free online PDF image extractor lets you pull out all embedded
            images from any PDF document including photos, illustrations,
            charts, diagrams, and graphics. Simply upload your PDF and download
            every image contained in the file within seconds. This browser-based
            tool works on Windows, Mac, Linux, iPhone, and Android and does not
            require installation or registration. All image extraction happens
            securely and your files are never stored.
          </p>

          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Tool Component */}
        <ExtractPDFImagesTools />

        <section className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            When Should You Extract Images from a PDF?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Many documents contain valuable images embedded inside PDF files.
            Instead of manually cropping screenshots, extracting images directly
            from the PDF ensures you keep the original image quality.
          </p>

          <ul className="text-gray-600 list-disc list-inside space-y-2">
            <li>Download photos from research papers or reports</li>
            <li>Extract diagrams and charts from PDF presentations</li>
            <li>Reuse graphics from PDF design files</li>
            <li>Recover images from archived documents</li>
            <li>Extract logos or illustrations from marketing PDFs</li>
          </ul>

          <p className="text-gray-600 leading-relaxed">
            Our PDF image extractor helps designers, students, researchers, and
            professionals quickly access images stored inside documents.
          </p>
        </section>

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#5b32b4]">
              Extract Images Embedded in PDF Documents
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Many PDF files contain embedded images such as photographs,
              diagrams, logos, charts, and illustrations. Extracting those
              images manually can be difficult and often results in poor quality
              screenshots. Our
              <strong>Extract Images from PDF</strong> tool allows you to
              quickly pull out all images stored inside a PDF document while
              preserving their original resolution and quality.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Instead of copying screenshots or recreating graphics, simply
              upload your PDF and let our tool automatically detect and extract
              all images contained in the file. Within seconds you will be able
              to download every image individually for reuse in presentations,
              reports, websites, or design projects.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#5b32b4]">
              Key Features of Our PDF Image Extractor
            </h3>

            <ul className="grid md:grid-cols-2 gap-4 text-gray-600 list-disc list-inside">
              <li>Extract all images from PDF instantly</li>
              <li>Download images in original resolution</li>
              <li>No watermark or file limits</li>
              <li>Secure browser-based processing</li>
              <li>No software installation required</li>
              <li>Fast extraction powered by modern PDF processing</li>
              <li>Completely free to use</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#5b32b4]">
              How to Extract Images from a PDF
            </h3>

            <ol className="space-y-2 text-gray-600 list-decimal list-inside">
              <li>Upload or drag and drop your PDF file.</li>
              <li>Our tool scans the document and detects embedded images.</li>
              <li>Preview all extracted images from the PDF.</li>
              <li>Download the images individually or save them all.</li>
            </ol>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-[#5b32b4]">
              Why Extract Images from PDFs?
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Extracting images from PDF files can be useful for many tasks such
              as reusing graphics in presentations, downloading photos from
              reports, collecting illustrations from documents, or recovering
              images from design files. This tool helps professionals, students,
              designers, and researchers quickly access images stored inside
              PDFs without editing the original document.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Supported Image Types in PDF Files
          </h2>

          <p className="text-gray-600 leading-relaxed">
            PDF documents can contain different image formats depending on how
            the file was created. Our extractor detects and extracts the most
            common image types embedded in PDFs.
          </p>

          <ul className="text-gray-600 list-disc list-inside space-y-2">
            <li>JPEG images</li>
            <li>PNG images</li>
            <li>Embedded graphics and illustrations</li>
            <li>Charts and diagrams</li>
          </ul>

          <p className="text-gray-600 leading-relaxed">
            The extracted images maintain their original format and resolution
            whenever possible.
          </p>
        </section>

        <section className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Why Use an Online PDF Image Extractor?
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Traditional methods such as screenshots or manual copying often
            reduce image quality. An online PDF image extractor allows you to
            retrieve images directly from the document structure.
          </p>

          <ul className="text-gray-600 list-disc list-inside space-y-2">
            <li>No need to install PDF software</li>
            <li>Extract images without screenshotting</li>
            <li>Maintain original resolution and clarity</li>
            <li>Fast extraction in seconds</li>
            <li>Works on desktop and mobile devices</li>
          </ul>

          <p className="text-gray-600 leading-relaxed">
            This makes it one of the fastest ways to recover images from PDF
            documents online.
          </p>
        </section>

        <section className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-xl font-semibold text-[#5b32b4]">
            Related Searches
          </h2>

          <ul className="grid md:grid-cols-2 gap-2 text-gray-600">
            <li>Extract images from PDF online</li>
            <li>Download pictures from PDF</li>
            <li>Extract graphics from PDF file</li>
            <li>Free PDF image extractor</li>
            <li>Get images from PDF document</li>
            <li>PDF picture extraction tool</li>
            <li>Extract photos from PDF online</li>
            <li>How to extract images from a PDF</li>
          </ul>
        </section>

        {/* Other Tools */}
        <OtherToolsSection currentSlug="extract-pdf-images" />

        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-[#5b32b4]">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold">
                Can I extract images from a PDF without losing quality?
              </h3>
              <p>
                Yes. Our tool extracts images directly from the PDF file without
                compressing or modifying them, so you receive the original image
                quality stored inside the document.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Is the PDF image extractor free?
              </h3>
              <p>
                Yes. The tool is completely free to use with no registration
                required and no watermarks added to extracted images.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Are my files secure?</h3>
              <p>
                Yes. All processing happens securely and files are not stored
                permanently on our servers.
              </p>
            </div>
          </div>
        </section>

        {/* Random tools */}
        <RandomToolsSection />

        {/* Categories */}
        <ToolCategoriesSection />
      </section>
    </main>
  );
}
