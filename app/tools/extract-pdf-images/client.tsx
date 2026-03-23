"use client";

import { useState } from "react";
import ExtractPDFImagesTools from "@/components/tools/ExtractPDFImagesTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  ImageIcon,
  Zap,
  ShieldCheck,
  Download,
  Globe,
  FileSearch,
  Layers,
  ScanLine,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What does the Extract Images from PDF tool do?",
    answer:
      "The tool scans your PDF document and pulls out every image embedded inside it — including photographs, diagrams, logos, charts, and illustrations. All extracted images are packaged and made available for download, preserving their original format and resolution from the PDF.",
  },
  {
    question: "Will the extracted images lose quality?",
    answer:
      "No. The extractor retrieves images directly from the internal structure of the PDF file rather than taking screenshots. This means you receive the original image as it was stored inside the document — at its original resolution and quality — not a downsampled screen capture.",
  },
  {
    question: "What image formats can be extracted from a PDF?",
    answer:
      "PDF documents commonly embed images as JPEG, PNG, and various vector or raster graphics formats. Our tool detects and extracts all standard embedded image types including photographs, illustrations, charts, diagrams, and logos.",
  },
  {
    question: "Is this tool completely free to use?",
    answer:
      "Yes. Extracting images from PDFs is completely free with no usage limits, no watermarks on the output images, and no account or registration required. Upload your PDF and download your images instantly.",
  },
  {
    question: "Are my uploaded PDF files stored on your servers?",
    answer:
      "No. Your PDF is processed securely and is not permanently retained after extraction is complete. We do not store, index, or share the contents of your documents.",
  },
  {
    question: "Can I extract images from a scanned PDF?",
    answer:
      "If a PDF was created by scanning physical pages, the entire page is typically stored as a single embedded image rather than as individual image objects. In this case, the tool extracts the page images as scanned. For PDFs created digitally — reports, presentations, design files — individual images are extracted separately.",
  },
  {
    question: "What is the maximum file size for PDF upload?",
    answer:
      "The tool supports PDF files up to 50MB. Most documents — research papers, presentations, brochures, and reports — fall well within this limit. For very large PDFs, consider splitting them into smaller files before uploading.",
  },
  {
    question: "Does the tool work on phones and tablets?",
    answer:
      "Yes. The Snappy-Fix PDF Image Extractor is fully responsive and works in any modern mobile browser on iOS or Android. Upload your PDF directly from your device, extract the images, and download them — no app installation needed.",
  },
  {
    question: "Why can I not find any images in my extracted result?",
    answer:
      "Some PDFs contain no embedded images — for example, text-only documents or PDFs where graphics were drawn using vector PDF instructions rather than imported image files. If the extraction result is empty, the document likely contains no raster image objects. Vector graphics and text-based charts are not extractable as image files.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <ScanLine size={20} className="text-[#c3003a]" />,
    title: "Full document scan",
    description:
      "Automatically scans every page of your PDF and locates all embedded image objects — no manual selection needed.",
  },
  {
    icon: <ImageIcon size={20} className="text-[#5b32b4]" />,
    title: "Original resolution preserved",
    description:
      "Images are extracted directly from the PDF structure, not screenshotted. You get the original quality every time.",
  },
  {
    icon: <Download size={20} className="text-[#c3003a]" />,
    title: "Bulk download",
    description:
      "All extracted images are packaged together for download in one click — no need to save each image individually.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#5b32b4]" />,
    title: "Private and secure",
    description:
      "Your PDF is processed securely and never permanently stored. Your document contents remain entirely private.",
  },
  {
    icon: <Globe size={20} className="text-[#c3003a]" />,
    title: "Works on any device",
    description:
      "Fully responsive — extract images from PDFs on desktop, laptop, tablet, or smartphone from any modern browser.",
  },
  {
    icon: <Layers size={20} className="text-[#5b32b4]" />,
    title: "Multi-format support",
    description:
      "Extracts JPEG, PNG, and other standard raster image formats embedded in PDF documents without format conversion.",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your PDF",
    description:
      "Drag and drop your PDF file onto the upload zone or click to browse your device. The tool accepts any valid PDF document up to 50MB.",
  },
  {
    number: "02",
    title: "Click Extract Images",
    description:
      'Hit the "Extract Images" button. The tool uploads your PDF, scans every page, and identifies all embedded image objects inside the document structure.',
  },
  {
    number: "03",
    title: "Wait for processing",
    description:
      "A progress bar tracks your upload and extraction in real time. For most documents this takes under 15 seconds. Larger PDFs with many images may take slightly longer.",
  },
  {
    number: "04",
    title: "Download your images",
    description:
      'Click "Download Extracted Images" to save all images found in the PDF to your device. Images are delivered at their original resolution and format.',
  },
];

// ─── Image types table data ───────────────────────────────────────────────────
const imageTypes = [
  { type: "JPEG / JPG", common: "Photographs, scanned pages", extracted: "✓" },
  { type: "PNG", common: "Screenshots, logos, diagrams", extracted: "✓" },
  {
    type: "Embedded raster graphics",
    common: "Charts, illustrations",
    extracted: "✓",
  },
  {
    type: "Scanned page images",
    common: "Scanned PDF documents",
    extracted: "✓",
  },
  {
    type: "Vector graphics (PDF draw ops)",
    common: "Native PDF vector art",
    extracted: "✗ (not raster images)",
  },
];

// ─── Use cases ────────────────────────────────────────────────────────────────
const useCases = [
  {
    icon: <FileSearch size={15} />,
    label: "Download photos from research papers",
  },
  {
    icon: <Layers size={15} />,
    label: "Extract charts from PDF presentations",
  },
  {
    icon: <ImageIcon size={15} />,
    label: "Reuse logos from marketing brochures",
  },
  {
    icon: <ScanLine size={15} />,
    label: "Recover images from archived documents",
  },
  {
    icon: <Download size={15} />,
    label: "Pull diagrams from technical manuals",
  },
  {
    icon: <Globe size={15} />,
    label: "Extract illustrations from design PDFs",
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

// ─── Main component ───────────────────────────────────────────────────────────
export default function ExtractPDFImagesPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <ImageIcon size={14} />
          Free PDF Tool
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Extract Images from PDF
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Instantly extract all embedded images from any PDF file — photos,
          diagrams, charts, logos, and illustrations — at their original
          resolution. Free, secure, no watermark, no signup required.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "Original Quality",
            "No Watermark",
            "No Signup",
            "Secure Processing",
            "Works on Mobile",
          ].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5b32b4] bg-[#f3ecff] border border-[#e9e1ff] px-3 py-1.5 rounded-full"
            >
              <CheckCircle2 size={12} className="text-[#c3003a]" />
              {badge}
            </span>
          ))}
        </div>
      </header>

      {/* ── Tool Component ──────────────────────────────────── */}
      <ExtractPDFImagesTools />

      {/* ── What is this — Direct Intent ────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-6"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          What Does the PDF Image Extractor Do?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          PDF documents frequently contain embedded images — photographs in
          research papers, product shots in brochures, diagrams in technical
          manuals, logos in marketing materials, and charts in business reports.
          Accessing these images normally means either taking low-quality
          screenshots or purchasing expensive desktop software.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This tool reads the internal structure of your PDF and extracts every
          raster image object stored within it — at its original resolution and
          format, without any screenshot degradation. Upload your PDF, click
          extract, and download all images in seconds.
        </p>

        {/* Value intent — when and who */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-[#2b1d3a] mb-3 text-sm">
                When to use this tool:
              </p>
              <ul className="space-y-2">
                {useCases.map((u) => (
                  <li
                    key={u.label}
                    className="flex items-center gap-2.5 text-sm text-gray-600"
                  >
                    <span className="text-[#5b32b4] shrink-0">{u.icon}</span>
                    {u.label}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-[#2b1d3a] mb-3 text-sm">
                Who uses this tool:
              </p>
              <ul className="space-y-2">
                {[
                  "Researchers downloading paper figures",
                  "Designers reusing brand assets",
                  "Students extracting textbook diagrams",
                  "Marketers pulling images from reports",
                  "Developers processing PDF content",
                  "Archivists recovering document images",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-[#c3003a] mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Supported formats table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Image types that can be extracted from PDFs
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  <th className="text-left px-5 py-3 font-bold text-[#5b32b4] text-xs uppercase tracking-wider">
                    Image Type
                  </th>
                  <th className="text-left px-5 py-3 font-bold text-[#5b32b4] text-xs uppercase tracking-wider">
                    Commonly Found In
                  </th>
                  <th className="text-left px-5 py-3 font-bold text-[#5b32b4] text-xs uppercase tracking-wider">
                    Extractable
                  </th>
                </tr>
              </thead>
              <tbody>
                {imageTypes.map((row, i) => (
                  <tr
                    key={row.type}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-medium text-[#2b1d3a]">
                      {row.type}
                    </td>
                    <td className="px-5 py-3 text-gray-500">{row.common}</td>
                    <td
                      className={`px-5 py-3 font-bold ${
                        row.extracted === "✓"
                          ? "text-[#5b32b4]"
                          : "text-gray-400"
                      }`}
                    >
                      {row.extracted}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            How to Extract Images from a PDF
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. No software needed. Under 30 seconds for most documents.
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
            Why Use the Snappy-Fix PDF Image Extractor?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Better than screenshotting. Faster than desktop software. Free and
            private by design.
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
            Everything you need to know about extracting images from PDF files.
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
      <OtherToolsSection currentSlug="extract-pdf-images" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
