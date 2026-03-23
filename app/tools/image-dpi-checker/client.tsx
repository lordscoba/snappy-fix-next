"use client";

import { useState } from "react";
import ImageDPICheckerTools from "@/components/tools/ImageDPICheckerTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  ScanSearch,
  Zap,
  ShieldCheck,
  Printer,
  Globe,
  Ruler,
  FileImage,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What is DPI and why does it matter for printing?",
    answer:
      "DPI stands for Dots Per Inch — it measures how many individual ink dots a printer places within one inch of paper. The higher the DPI, the more detail and sharpness the printed image has. A 72 DPI image that looks fine on screen will appear blurry and pixelated when printed, because screens render far fewer pixels per physical inch than printers require. The professional printing standard is 300 DPI — the minimum required by most print labs, publishers, magazines, and commercial printers for sharp, production-quality output.",
  },
  {
    question: "What does the tool check and what results does it show?",
    answer:
      "The tool reads the embedded metadata of your uploaded image and returns four key values: DPI X (horizontal dots per inch), DPI Y (vertical dots per inch), pixel dimensions (width × height in pixels), image format (JPG, PNG, TIFF, etc.), and the estimated print size in inches calculated by dividing the pixel dimensions by the DPI. It also shows an immediate quality verdict — green for print-ready (≥300 DPI) or amber for web-quality (below 300 DPI).",
  },
  {
    question: "My image shows 72 DPI — is it bad quality?",
    answer:
      "Not necessarily. 72 DPI is the standard resolution for digital screens and web images — it is perfectly suited for websites, social media, email, and digital display. The problem only arises when you try to print a 72 DPI image: it will appear blurry because there are not enough pixels to fill an inch of paper at print quality. If your image has sufficient total pixels (for example, 3000×2000 px), you can often set the DPI to 300 without changing the pixel count — the physical print size just becomes smaller.",
  },
  {
    question: "What DPI do I need for professional printing?",
    answer:
      "The standard requirements by print type are: magazines, brochures, and books (300 DPI minimum), photo prints and postcards (300–600 DPI), business cards (300–400 DPI), large format banners and posters (150–200 DPI — viewed from distance so lower DPI is acceptable), billboards (25–100 DPI — viewed from very far, low DPI is standard). For most everyday printing needs, 300 DPI is the universal benchmark to meet.",
  },
  {
    question: "Why does my image show N/A for DPI?",
    answer:
      "Some image files — especially PNG files exported from design tools or screenshots — do not embed DPI metadata in their file headers. The tool reads the metadata that exists in the file. If none is present, DPI shows as N/A. This does not mean the image is bad quality — it simply means the file was saved without DPI metadata. You can check if it is print-ready by dividing its pixel width by 300 to calculate the maximum print size at 300 DPI. For example, a 3000px wide image can print up to 10 inches wide at 300 DPI.",
  },
  {
    question: "How is the print size calculated?",
    answer:
      "The estimated print size is calculated by dividing the image pixel dimensions by the embedded DPI: Print width = pixel width ÷ DPI X. Print height = pixel height ÷ DPI Y. For example, an image that is 2400×3000 pixels at 300 DPI has an estimated print size of 8 × 10 inches. This is the maximum size at which the image can be printed at the stated DPI — printing larger than this will reduce the effective DPI and may cause visible pixelation.",
  },
  {
    question: "Does checking DPI modify or alter my image in any way?",
    answer:
      "No. The DPI Checker is read-only — it analyses the metadata embedded in your image file and returns the results without making any changes to your image. The original file remains exactly as uploaded.",
  },
  {
    question: "What image formats does the DPI checker support?",
    answer:
      "The tool supports JPG, PNG, TIFF, and PSD images. TIFF files commonly contain the most reliable DPI metadata because they are used in professional photography and print workflows. JPG files usually contain DPI metadata set by the camera or export application. PNG files may or may not contain DPI metadata depending on how they were created or exported.",
  },
  {
    question: "Is the Image DPI Checker free to use?",
    answer:
      "Yes — completely free with no usage limits and no registration required. Upload any image and check its DPI, resolution, and estimated print size instantly.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Ruler size={20} className="text-[#fb397d]" />,
    title: "DPI, resolution, and print size",
    description:
      "Returns DPI X, DPI Y, pixel dimensions, image format, and estimated physical print size — all in one scan.",
  },
  {
    icon: <Printer size={20} className="text-[#5b32b4]" />,
    title: "Instant print-ready verdict",
    description:
      "Green for print-ready (≥300 DPI) or amber for web-quality. Know immediately whether your image meets professional print standards.",
  },
  {
    icon: <Zap size={20} className="text-[#fb397d]" />,
    title: "Instant results",
    description:
      "Upload and get your full DPI analysis in seconds — no waiting, no processing queue, no email delivery.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#5b32b4]" />,
    title: "Read-only and private",
    description:
      "The checker reads your image metadata and returns results without modifying the file. No image data is permanently stored.",
  },
  {
    icon: <FileImage size={20} className="text-[#fb397d]" />,
    title: "Multi-format support",
    description:
      "Works with JPG, PNG, TIFF, and PSD — the formats most commonly used in photography and professional print workflows.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive — check image DPI on desktop, laptop, tablet, or smartphone from any modern browser.",
  },
];

// ─── DPI reference table ──────────────────────────────────────────────────────
const dpiReference = [
  {
    use: "Web / screen display",
    dpi: "72–96 DPI",
    verdict: "Web only",
    color: "text-blue-500",
  },
  {
    use: "Email and digital documents",
    dpi: "96–150 DPI",
    verdict: "Acceptable digitally",
    color: "text-blue-400",
  },
  {
    use: "Large format banners / posters",
    dpi: "150–200 DPI",
    verdict: "Acceptable (viewed from distance)",
    color: "text-amber-500",
  },
  {
    use: "Business cards",
    dpi: "300–400 DPI",
    verdict: "Print-ready ✓",
    color: "text-green-600",
  },
  {
    use: "Magazines, books, brochures",
    dpi: "300 DPI minimum",
    verdict: "Print-ready ✓",
    color: "text-green-600",
  },
  {
    use: "Photo prints and postcards",
    dpi: "300–600 DPI",
    verdict: "High quality print ✓",
    color: "text-green-700",
  },
  {
    use: "Billboards (large outdoor)",
    dpi: "25–100 DPI",
    verdict: "Normal (viewed from far)",
    color: "text-amber-400",
  },
];

// ─── How print size is calculated ─────────────────────────────────────────────
const printCalcExample = [
  {
    pixels: "1500 × 1000 px",
    dpi: "72 DPI",
    result: '20.8" × 13.9"',
    note: "Web image — too large for quality print",
  },
  {
    pixels: "1500 × 1000 px",
    dpi: "150 DPI",
    result: '10" × 6.7"',
    note: "Acceptable for large format",
  },
  {
    pixels: "1500 × 1000 px",
    dpi: "300 DPI",
    result: '5" × 3.3"',
    note: "Print-ready at this size",
  },
  {
    pixels: "3000 × 2000 px",
    dpi: "300 DPI",
    result: '10" × 6.7"',
    note: "Print-ready A4-ish size",
  },
  {
    pixels: "6000 × 4000 px",
    dpi: "300 DPI",
    result: '20" × 13.3"',
    note: "High-res — large format print",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      "Drag and drop your image onto the upload zone or click to browse. Supports JPG, PNG, TIFF, and PSD — the formats most commonly used in photography and professional print production.",
  },
  {
    number: "02",
    title: "Click Analyze DPI Quality",
    description:
      "Hit the button and watch the progress bar as the image is uploaded and its metadata is read. The analysis completes in seconds — even for large TIFF files.",
  },
  {
    number: "03",
    title: "Review your DPI results",
    description:
      "The results dashboard shows your current DPI, pixel resolution (width × height), and estimated print size in inches calculated at your image's native DPI. A quality indicator shows immediately whether your image is print-ready.",
  },
  {
    number: "04",
    title: "Act on the results",
    description:
      "If your image is print-ready (green — ≥300 DPI), you are good to go. If it shows web quality (amber — below 300 DPI), you may need to either use a higher-resolution source image or adjust the DPI using the separate DPI Changer tool.",
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
export default function ImageDPICheckerPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <ScanSearch size={14} />
          Free DPI Analysis Tool
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Image DPI Checker
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Instantly check the DPI, pixel resolution, and estimated print size of
          any image. Know whether your image is print-ready at 300 DPI or only
          suitable for web — free, read-only, and completely private.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "DPI + Resolution + Print Size",
            "Print-Ready Verdict",
            "Read-Only",
            "No Signup",
            "JPG · PNG · TIFF · PSD",
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

      {/* ── Tool Component ──────────────────────────────────── */}
      <ImageDPICheckerTools />

      {/* ── Direct Intent ────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Check Image DPI Before You Print
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Sending a low-DPI image to a printer is one of the most common and
          costly mistakes in design and photography workflows. An image that
          looks crisp on screen at 72 DPI will print blurry and pixelated —
          because screens and printers operate at very different resolutions.
          This tool reads the DPI metadata embedded in your image file and tells
          you instantly whether it meets professional print standards, what
          physical size it can print at, and how many total pixels it contains.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The 300 DPI threshold used by the quality indicator is the industry
          standard required by the majority of print labs, magazine publishers,
          book printers, and commercial offset presses. The tool also shows your
          estimated print size — so you know the maximum physical dimensions
          your image can be printed at its current DPI before quality degrades.
        </p>

        {/* DPI reference table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            DPI requirements by print type
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["Use case", "Required DPI", "Verdict"].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 font-bold text-[#5b32b4] text-xs uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dpiReference.map((row, i) => (
                  <tr
                    key={row.use}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 text-sm font-medium text-[#2b1d3a]">
                      {row.use}
                    </td>
                    <td className="px-5 py-3 text-xs font-black text-[#5b32b4] font-mono">
                      {row.dpi}
                    </td>
                    <td className={`px-5 py-3 text-xs font-bold ${row.color}`}>
                      {row.verdict}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Print size calculation table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            How pixel count and DPI determine print size
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["Pixel dimensions", "DPI", "Print size", "Notes"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 font-bold text-[#5b32b4] text-xs uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {printCalcExample.map((row, i) => (
                  <tr
                    key={`${row.pixels}-${row.dpi}`}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 text-xs font-mono font-bold text-[#5b32b4]">
                      {row.pixels}
                    </td>
                    <td className="px-5 py-3 text-xs font-black text-[#fb397d]">
                      {row.dpi}
                    </td>
                    <td className="px-5 py-3 text-xs font-bold text-[#2b1d3a]">
                      {row.result}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-500">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Formula: Print size = Pixel dimension ÷ DPI. The checker calculates
            this automatically from your image's embedded metadata.
          </p>
        </div>

        {/* Value intent callout */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                Who needs to check DPI:
              </p>
              <ul className="space-y-2">
                {[
                  "Photographers submitting work to print labs",
                  "Graphic designers preparing files for commercial printers",
                  "Publishers verifying author-submitted images",
                  "Marketing teams checking assets before print runs",
                  "Students submitting photo assignments for graded print work",
                  "E-commerce sellers preparing product images for print catalogues",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={13}
                      className="text-[#5b32b4] mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                When to check DPI:
              </p>
              <ul className="space-y-2">
                {[
                  "Before submitting files to a print lab or press",
                  "When a printer reports your file is too low resolution",
                  "Before ordering large format prints or banners",
                  "When a client asks if images are 300 DPI",
                  "Before including photos in a print publication",
                  "When resizing images and unsure about quality impact",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={13}
                      className="text-[#fb397d] mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
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
            How to Check Image DPI
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Instant results. Print-ready verdict in seconds.
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
            Why Use the Snappy-Fix DPI Checker?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            DPI, resolution, print size, and print-ready verdict — all in one
            instant scan.
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
            Everything you need to know about DPI, print resolution, and image
            quality for printing.
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
      <OtherToolsSection currentSlug="image-dpi-checker" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
