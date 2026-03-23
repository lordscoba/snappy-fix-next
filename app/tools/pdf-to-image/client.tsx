"use client";

import { useState } from "react";
import PDFToImageConverterTools from "@/components/tools/PDFToImageConverterTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  FileImage,
  Zap,
  ShieldCheck,
  Globe,
  FileText,
  ImageIcon,
  Layers,
  Share2,
} from "lucide-react";

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What is the difference between PNG and JPG output?",
    answer:
      "PNG is a lossless format — it preserves every pixel from the PDF page without any compression artefacts. PNG output is larger in file size but retains full sharpness, making it the right choice for text-heavy documents, diagrams, charts, and any PDF page where crisp detail matters. JPG uses lossy compression — the output file is smaller but fine details (especially sharp text edges) may show slight softness at high zoom. Choose JPG when file size matters more than pixel-perfect fidelity, such as for web thumbnails or sharing in messaging apps.",
  },
  {
    question: "How many pages can I convert at once?",
    answer:
      "The tool processes one PDF file per conversion. If your PDF has multiple pages, each page is extracted as a separate image and the download is a ZIP file containing all page images — one image file per page. For multi-page PDFs, all pages are processed in a single upload — you do not need to split the PDF first.",
  },
  {
    question: "Will the image quality match the original PDF?",
    answer:
      "Yes. The conversion renders PDF pages at 2× resolution (approximately 144 DPI) using PyMuPDF — producing clear, readable images for most documents regardless of the original PDF's embedded resolution. For PDFs generated from high-resolution sources — such as exported presentations, scanned documents at 300 DPI, or professionally typeset files — the resulting images will be high quality. For PDFs exported at low resolution or containing compressed embedded images, the output quality matches the source. The PNG option always preserves the maximum available quality without introducing additional compression.",
  },
  {
    question:
      "Why would I convert a PDF to an image instead of sharing the PDF directly?",
    answer:
      "Several practical reasons: images can be embedded directly in web pages, social media posts, and messaging apps without requiring a PDF viewer. Certificates, ID documents, and scanned records are often required in image format for online submissions. Images open instantly on any device without needing Adobe Reader or a PDF application. A single page extracted as an image is easier to attach to an email or upload to a form than a multi-page PDF. And images can be edited in standard photo tools without PDF editing software.",
  },
  {
    question: "Can I convert a scanned PDF to an image using this tool?",
    answer:
      "Yes. A scanned PDF is a PDF containing embedded image data — each page is effectively a photograph stored inside a PDF container. The tool extracts and renders the page image directly. For scanned documents, PNG output is generally preferable as it preserves the scan without introducing additional compression. If you also need the text to be searchable or copyable, use an OCR tool after extracting the image.",
  },
  {
    question:
      "Can I convert a PDF certificate or document to JPG for uploading to a portal?",
    answer:
      "Yes — and this is one of the most common uses of this tool. Many online portals, application forms, and HR systems require documents to be uploaded as images (JPG or PNG) rather than PDF. Upload your PDF certificate, result slip, ID scan, or any document PDF, select JPG or PNG output, and download the image version ready for portal upload. This is particularly useful for academic certificates, professional qualifications, and identity documents.",
  },
  {
    question: "What types of PDF files does this tool support?",
    answer:
      "The tool accepts any standard PDF file (.pdf extension). This includes text-based PDFs (created from Word, Excel, or design software), scanned document PDFs (photographs of physical documents stored as PDF), presentation PDFs (exported from PowerPoint or Google Slides), and hybrid PDFs (a mix of text and embedded images). Password-protected PDFs cannot be processed — remove the password first if applicable.",
  },
  {
    question: "Is the PDF to Image converter free and does it add a watermark?",
    answer:
      "Yes — completely free with no usage limits and no watermark on converted images. Convert as many PDFs as you need at no cost with no account required.",
  },
  {
    question: "Are my uploaded PDF files stored on your servers?",
    answer:
      "No. Your PDF is uploaded for conversion and the image result is returned to your browser. No copy of your original PDF or the generated image is retained on our servers after the conversion is complete.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <FileImage size={20} className="text-[#fb397d]" />,
    title: "PNG or JPG — your choice",
    description:
      "Toggle between lossless PNG for maximum quality and smaller JPG for file size efficiency. The right format for every use case.",
  },
  {
    icon: <Layers size={20} className="text-[#5b32b4]" />,
    title: "All pages extracted",
    description:
      "Multi-page PDFs are fully processed — every page is extracted as a separate image in a single upload.",
  },
  {
    icon: <Zap size={20} className="text-[#fb397d]" />,
    title: "Instant conversion",
    description:
      "Upload your PDF, click convert, and download image files in seconds — no queue, no email delivery.",
  },
  {
    icon: <Share2 size={20} className="text-[#5b32b4]" />,
    title: "Share anywhere images work",
    description:
      "Converted images embed in web pages, social posts, emails, and messaging apps instantly — without requiring a PDF viewer.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#fb397d]" />,
    title: "Private and secure",
    description:
      "Your PDF and the generated images are never permanently stored. Files are discarded after conversion is complete.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive — convert PDFs to images on desktop, laptop, tablet, or smartphone from any modern browser.",
  },
];

// ─── PNG vs JPG comparison ────────────────────────────────────────────────────
const formatComparison = [
  {
    aspect: "Compression",
    png: "Lossless — no quality loss",
    jpg: "Lossy — slight quality trade-off",
  },
  {
    aspect: "File size",
    png: "Larger",
    jpg: "Smaller (30–60% smaller than PNG)",
  },
  {
    aspect: "Text sharpness",
    png: "✓ Pixel-perfect at any zoom",
    jpg: "May show slight softness at edges",
  },
  {
    aspect: "Transparency support",
    png: "✓ Supports transparent backgrounds",
    jpg: "No transparency — white background",
  },
  {
    aspect: "Best for",
    png: "Documents, certificates, diagrams, charts",
    jpg: "Photos, web thumbnails, portal uploads",
  },
  { aspect: "Browser / app support", png: "Universal", jpg: "Universal" },
];

// ─── Use cases ────────────────────────────────────────────────────────────────
const useCases = [
  {
    icon: <FileText size={14} />,
    label:
      "Extract a certificate or qualification from a PDF for online submission",
    color: "#5b32b4",
  },
  {
    icon: <ImageIcon size={14} />,
    label:
      "Convert a scanned ID or passport page from PDF to JPG for portal upload",
    color: "#fb397d",
  },
  {
    icon: <Share2 size={14} />,
    label: "Share a specific page of a report or presentation on social media",
    color: "#5b32b4",
  },
  {
    icon: <FileImage size={14} />,
    label:
      "Extract a product spec sheet page to embed as an image on a website",
    color: "#fb397d",
  },
  {
    icon: <Layers size={14} />,
    label: "Convert a multi-page PDF brochure to individual page images",
    color: "#5b32b4",
  },
  {
    icon: <FileText size={14} />,
    label: "Turn a PDF invoice or receipt into a JPG for easy email attachment",
    color: "#fb397d",
  },
  {
    icon: <ImageIcon size={14} />,
    label: "Extract chart or diagram pages from a PDF for use in presentations",
    color: "#5b32b4",
  },
  {
    icon: <Share2 size={14} />,
    label: "Convert a PDF e-book cover page to a PNG for a website thumbnail",
    color: "#fb397d",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Choose your output format",
    description:
      "At the top of the tool, select PNG (lossless, best quality — purple button) or JPG (smaller file size, good for most web and portal uses — pink button). PNG is the default and best choice for text documents, certificates, and diagrams.",
  },
  {
    number: "02",
    title: "Upload your PDF",
    description:
      "Drag and drop your PDF file onto the upload zone or click to browse. Only PDF files are accepted — the tool validates the file type on upload. The filename is shown as confirmation.",
  },
  {
    number: "03",
    title: "Click Convert PDF to Image",
    description:
      "Hit the convert button and watch the progress bar. the tool uploads your PDF, renders each page at 2× resolution, packages all pages into a ZIP archive, and returns it for download. Most conversions complete in seconds.",
  },
  {
    number: "04",
    title: "Download your image ZIP",
    description:
      'Click Download Image to save the ZIP archive. Extract it to find one image file per page, named page_1.png, page_2.png, etc., click "Clear and start over".',
  },
];

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        open
          ? "border-[#5b32b4]/40 bg-gradient-to-br from-[#faf7ff] to-white shadow-md shadow-[#5b32b4]/10"
          : "border-[#e9e1ff] bg-white hover:border-[#d4c5f9]"
      }`}
    >
      <button
        type="button"
        aria-label="Expand"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <span
            className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
              open
                ? "bg-gradient-to-br from-[#5b32b4] to-[#fb397d] text-white"
                : "bg-[#f3ecff] text-[#5b32b4]"
            }`}
          >
            {index + 1}
          </span>
          <span className="font-bold text-[#2b1d3a] text-sm sm:text-base">
            {question}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#5b32b4] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed pl-[4.5rem]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PDFToImagePageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <FileImage size={14} />
          Free PDF Converter
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          PDF to Image Converter
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Convert PDF pages to PNG or JPG images instantly. Extract
          certificates, documents, and scanned pages as high-quality images —
          ready to share, upload, or embed anywhere. Free, no watermark, no
          signup.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "PNG or JPG Output",
            "All Pages Extracted",
            "No Watermark",
            "No Signup",
            "Lossless PNG Option",
          ].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5b32b4] bg-[#f3ecff] border border-[#e9e1ff] px-3 py-1.5 rounded-full"
            >
              <CheckCircle2 size={12} className="text-[#fb397d]" />
              {badge}
            </span>
          ))}
        </div>
      </header>

      {/* ── Tool ────────────────────────────────────────────── */}
      <PDFToImageConverterTools />

      {/* ── Direct Intent ───────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="intent-heading"
      >
        <h2
          id="intent-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Extract PDF Pages as Images — PNG or JPG
        </h2>
        <p className="text-gray-600 leading-relaxed">
          PDFs are the standard format for documents, but images are the
          standard for everything else — web pages, social media, messaging
          apps, email attachments, and online portal uploads. When you need a
          PDF page as an image, this tool bridges the gap: upload the PDF,
          choose PNG for lossless quality or JPG for compact file size, and
          download the extracted page images immediately. No PDF reader required
          on the recipient's side.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The format choice is the tool's standout feature. PNG preserves every
          pixel from the original PDF without any compression — the right choice
          for text documents, certificates, official records, and anything where
          sharpness at full zoom matters. JPG compresses the output to a smaller
          file — the right choice for photographic pages, portal uploads where
          file size is limited, and web embedding where bandwidth matters.
        </p>

        {/* PNG vs JPG table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            PNG vs JPG — choosing the right format
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  <th className="text-left px-5 py-3 font-bold text-[#5b32b4] text-xs uppercase tracking-wider">
                    Aspect
                  </th>
                  <th className="text-left px-5 py-3 font-bold text-[#5b32b4] text-xs uppercase tracking-wider">
                    PNG
                  </th>
                  <th className="text-left px-5 py-3 font-bold text-[#fb397d] text-xs uppercase tracking-wider">
                    JPG
                  </th>
                </tr>
              </thead>
              <tbody>
                {formatComparison.map((row, i) => (
                  <tr
                    key={row.aspect}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-bold text-[#2b1d3a] text-xs">
                      {row.aspect}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.png}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.jpg}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Use cases */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative">
            <p className="font-bold text-[#2b1d3a] text-sm mb-4">
              Common reasons to convert PDF to image:
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {useCases.map((u) => (
                <div
                  key={u.label}
                  className="flex items-start gap-2.5 text-sm text-gray-600"
                >
                  <span style={{ color: u.color }} className="shrink-0 mt-0.5">
                    {u.icon}
                  </span>
                  {u.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How to Use ──────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="howto-heading"
      >
        <div className="text-center space-y-3">
          <h2
            id="howto-heading"
            className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
          >
            How to Convert a PDF to Image
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Choose your format. Download in seconds.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-gradient-to-br from-white to-[#faf7ff] border border-[#e9e1ff] rounded-2xl p-6 overflow-hidden group hover:border-[#5b32b4]/40 hover:shadow-lg hover:shadow-[#5b32b4]/10 transition-all duration-300"
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#5b32b4]/5 group-hover:bg-[#5b32b4]/10 transition-all" />
              <span className="text-5xl font-black text-[#f3ecff] leading-none block mb-3 select-none">
                {step.number}
              </span>
              <h3 className="font-bold text-[#2b1d3a] mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Benefits ────────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="benefits-heading"
      >
        <div className="text-center space-y-3">
          <h2
            id="benefits-heading"
            className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
          >
            Why Use the Snappy-Fix PDF to Image Converter?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Lossless PNG or compact JPG — format choice, full quality, all
            pages, no software required.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white border border-[#e9e1ff] rounded-2xl p-5 hover:border-[#5b32b4]/40 hover:shadow-md hover:shadow-[#5b32b4]/10 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#f3ecff] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-[#2b1d3a] mb-1.5 text-sm">
                {benefit.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section
        className="max-w-3xl mx-auto space-y-6"
        aria-labelledby="faq-heading"
      >
        <div className="text-center space-y-3">
          <h2
            id="faq-heading"
            className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm">
            Everything you need to know about converting PDF pages to PNG and
            JPG images online.
          </p>
          <div className="h-1 w-12 bg-[#fb397d] mx-auto rounded" />
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              index={i}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </section>

      {/* ── Other Tools ─────────────────────────────────────── */}
      <OtherToolsSection currentSlug="pdf-to-image" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
