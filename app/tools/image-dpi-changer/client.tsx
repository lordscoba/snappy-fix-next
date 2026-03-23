"use client";

import { useState } from "react";
import ImageDPIChangerTools from "@/components/tools/ImageDPIChangerTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Printer,
  Zap,
  ShieldCheck,
  Globe,
  ScanSearch,
  Sliders,
  FileImage,
  Ruler,
} from "lucide-react";

// ─── FAQ (interactive, replaces static FAQ section) ───────────────────────────
const faqs = [
  {
    question: "Can you change the DPI of an image online?",
    answer:
      "Yes — this is exactly what this tool does. Upload your image, enter any target DPI value (such as 72, 150, 300, or 600), and click Change DPI. The tool re-saves the image with the new DPI value embedded in its metadata at quality 95 — so the pixel content and visual quality are preserved. The output filename includes the DPI value (e.g. photo_300dpi.jpg) so you can easily identify it.",
  },
  {
    question: "Does changing DPI affect image quality or dimensions?",
    answer:
      "No — changing DPI modifies only the print resolution metadata stored in the image file header. The pixel dimensions (width × height in pixels) and the visual quality of the image remain exactly the same. The image still contains the same number of pixels — the DPI value simply tells a printer how many of those pixels to place within each inch of paper. The tool re-saves at quality 95 for JPEG and WebP, lossless for PNG, ensuring no additional compression is applied during the DPI change.",
  },
  {
    question: "What DPI should images be for printing?",
    answer:
      "Most professional printers and print labs require 300 DPI for high-quality output — this is the standard for magazines, brochures, photo prints, and business cards. Medium-quality printing such as leaflets and reports typically accepts 150 DPI. Large format printing (banners, posters) commonly uses 100–150 DPI because they are viewed from a distance. High-resolution publishing such as art books may require 600 DPI. Web and screen images are typically 72–96 DPI.",
  },
  {
    question: "What is the difference between Check DPI and Change DPI mode?",
    answer:
      "The tool has two modes selectable at the top. Check DPI (purple button) reads the DPI metadata already embedded in your image and displays the current DPI X, DPI Y, pixel dimensions (width × height), and file format — without modifying the file. Change DPI (pink button) re-saves your image with a new DPI value you specify in the Target DPI field. Use Check DPI first to see your current value, then switch to Change DPI to update it.",
  },
  {
    question: "How do I change the DPI of a JPEG or PNG image?",
    answer:
      "Upload your JPEG or PNG file using the upload zone. Select Change DPI mode using the pink button at the top. Enter your target DPI in the Target DPI field (e.g. 300 for print-ready quality). Click the Change DPI button. The tool processes the image server-side, embeds the new DPI value in the file metadata at quality 95, and returns the file for download with the DPI value appended to the filename.",
  },
  {
    question: "Why does my image show 72 DPI when I need 300 DPI for printing?",
    answer:
      "72 DPI is the standard resolution for digital screen display — it is perfectly correct for web images and social media. The problem arises only when you send a 72 DPI image to a printer that requires 300 DPI: the print will appear smaller than expected or blurry if the printer scales it up. Use this tool to change the DPI metadata to 300 — if your image has sufficient total pixel dimensions, the 300 DPI version will print at high quality. If the image has too few pixels for your target print size at 300 DPI, you will need a higher-resolution source image.",
  },
  {
    question: "What image formats does the DPI changer support?",
    answer:
      "The tool supports JPEG/JPG (re-saved at quality 95 progressive with the new DPI embedded), PNG (lossless re-save with DPI metadata), WebP (quality 95 method 6 — note: WebP format does not carry standard DPI metadata the same way JPEG and PNG do), and HEIC/HEIF (quality 90). For DPI metadata changes that are read reliably by printers and design software, JPEG and PNG are the most widely supported formats.",
  },
  {
    question: "Is the Image DPI Changer free and does it add a watermark?",
    answer:
      "Yes — completely free with no usage limits and no watermark on the output. The downloaded image contains only your original pixels with the updated DPI metadata — no Snappy-Fix branding is added.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <ScanSearch size={20} className="text-[#fb397d]" />,
    title: "Check DPI and Change DPI in one tool",
    description:
      "Two modes in a single upload: Check DPI reads your current DPI, dimensions, and format without changing the file. Change DPI re-saves with any target value you specify.",
  },
  {
    icon: <Sliders size={20} className="text-[#5b32b4]" />,
    title: "Any custom DPI value",
    description:
      "Enter any number — 72, 150, 300, 600, or any custom value. Not limited to presets, so you can meet any printer's exact requirement.",
  },
  {
    icon: <FileImage size={20} className="text-[#fb397d]" />,
    title: "Quality 95 — no pixel loss",
    description:
      "JPEG and WebP are re-saved at quality 95. PNG uses lossless optimisation. Pixel dimensions and visual quality are unchanged — only the DPI metadata is updated.",
  },
  {
    icon: <Printer size={20} className="text-[#5b32b4]" />,
    title: "Print-ready output",
    description:
      "Output filename includes the DPI value (e.g. photo_300dpi.jpg) so print labs and designers can immediately identify the correct version.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#fb397d]" />,
    title: "Private and secure",
    description:
      "Your image is processed server-side and never permanently stored. No copies are retained after the updated file is delivered to your browser.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive — change image DPI on desktop, laptop, tablet, or smartphone from any modern browser without software.",
  },
];

// ─── DPI reference (preserved from ranking page, reformatted as table) ────────
const dpiReference = [
  {
    dpi: "72 DPI",
    use: "Standard for web and screen images",
    quality: "Screen only",
  },
  { dpi: "96 DPI", use: "Windows screen standard", quality: "Screen only" },
  {
    dpi: "150 DPI",
    use: "Medium-quality printing, leaflets, reports",
    quality: "Acceptable",
  },
  {
    dpi: "300 DPI",
    use: "Professional printing — photos, magazines, brochures",
    quality: "✓ Print standard",
  },
  {
    dpi: "600 DPI",
    use: "High-resolution publishing, art books",
    quality: "High quality",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      "Upload your JPEG, PNG, WebP, or HEIC image using the drag-and-drop zone or click to browse. A preview loads immediately to confirm the correct file.",
  },
  {
    number: "02",
    title: "Check your current DPI (optional)",
    description:
      "Click the purple Check DPI button to see your image's current DPI, pixel dimensions, and format before changing anything. This helps confirm whether a DPI change is needed.",
  },
  {
    number: "03",
    title: "Select Change DPI and enter your target",
    description:
      "Click the pink Change DPI button to switch to changer mode. Enter your target DPI in the Target DPI field — for example 300 for professional printing. Any whole number is accepted.",
  },
  {
    number: "04",
    title: "Download your print-ready image",
    description:
      "Click the Change DPI button to process. Download the updated image — the filename includes the DPI value (e.g. photo_300dpi.jpg) so it is immediately identifiable for your print workflow.",
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
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-[#5b32b4]/40 bg-gradient-to-br from-[#faf7ff] to-white shadow-md shadow-[#5b32b4]/10" : "border-[#e9e1ff] bg-white hover:border-[#d4c5f9]"}`}
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
            className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${open ? "bg-gradient-to-br from-[#5b32b4] to-[#fb397d] text-white" : "bg-[#f3ecff] text-[#5b32b4]"}`}
          >
            {index + 1}
          </span>
          <span className="font-bold text-[#2b1d3a] text-sm sm:text-base">
            {question}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[#5b32b4] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
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
export default function ImageDPIChangerPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <Ruler size={14} />
          DPI Tool — Check &amp; Change
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Image DPI Changer
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Change the DPI of any image instantly without altering pixel
          dimensions or visual quality. Set images to 72, 150, 300, 600, or any
          custom DPI for printing, publishing, and professional design. Also
          includes a built-in DPI checker — free, no watermark, no signup.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "Check + Change DPI",
            "Any Custom DPI Value",
            "Quality 95 Output",
            "No Watermark",
            "JPEG · PNG · WebP · HEIC",
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
      <ImageDPIChangerTools />

      {/* ── Direct Intent — preserves existing ranking content, restructured ── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="intent-heading"
      >
        <h2
          id="intent-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Change Image DPI Online Instantly
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Our free <strong>Image DPI Changer</strong> helps you quickly change
          the DPI of an image online without reducing quality or altering the
          pixel dimensions. Whether you need to{" "}
          <strong>increase image DPI for printing</strong>, reduce DPI for web
          use, or convert the DPI of JPEG and PNG images, this tool allows you
          to do it instantly — with a built-in <strong>DPI checker</strong> so
          you can verify your image before and after the change.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Many professional printing services require images to have a specific
          DPI value, commonly <strong>300 DPI for high-quality printing</strong>
          . If your photo or graphic has the wrong DPI setting, it may appear
          blurry or fail print requirements. With this{" "}
          <strong>photo DPI changer</strong>, you can easily adjust the DPI
          metadata of your image in seconds — and verify the result using the
          built-in Check DPI mode.
        </p>

        {/* What is DPI — preserved from ranking page */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#5b32b4]">
            What Is DPI in an Image?
          </h3>
          <p className="text-gray-600 leading-relaxed">
            DPI stands for <strong>Dots Per Inch</strong> and represents how
            many printed dots fit within one inch of an image when it is
            printed. A higher DPI produces sharper printed images, while lower
            DPI values are typically used for screens or web images. Crucially,
            changing DPI does not change the number of pixels in the image — it
            only changes the print size instruction embedded in the file header.
          </p>

          {/* DPI reference table — restructured from existing bullet list */}
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["DPI value", "Common use", "Print quality"].map((h) => (
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
                    key={row.dpi}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-black text-[#5b32b4] text-xs font-mono">
                      {row.dpi}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.use}
                    </td>
                    <td
                      className={`px-5 py-3 text-xs font-bold ${row.quality.includes("✓") ? "text-[#5b32b4]" : "text-gray-400"}`}
                    >
                      {row.quality}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formats — preserved from ranking page */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#5b32b4]">
            Change DPI of JPEG, PNG, and Photos
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Our <strong>DPI converter</strong> supports common image formats
            including JPEG, JPG, PNG, WebP, and HEIC. Whether you need a{" "}
            <strong>JPEG DPI converter</strong>, want to change the DPI of a PNG
            image, or simply adjust the DPI of a photo for printing, this tool
            makes the process quick and easy. All formats are re-processed at
            high quality (JPEG/WebP at 95, PNG lossless) so no additional
            compression is introduced during the DPI change.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Change DPI of JPEG images",
              "Change DPI of PNG files",
              "Increase image DPI online for print",
              "Reduce DPI for web optimisation",
              "Resize image DPI metadata without changing dimensions",
              "Check current DPI before changing",
            ].map((item, idx) => (
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <CheckCircle2
                  size={13}
                  className={`mt-0.5 shrink-0 ${idx % 2 === 0 ? "text-[#5b32b4]" : "text-[#fb397d]"}`}
                />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Value intent */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                Who uses the DPI Changer:
              </p>
              <ul className="space-y-2">
                {[
                  "Photographers preparing images for professional print labs",
                  "Designers submitting files to commercial printers",
                  "Publishers verifying image DPI before layout",
                  "Students and professionals preparing print-ready assignments",
                  "E-commerce sellers preparing product images for print catalogues",
                  "Anyone whose image was rejected for 'insufficient DPI'",
                ].map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={13}
                      className={`mt-0.5 shrink-0 ${idx % 2 === 0 ? "text-[#5b32b4]" : "text-[#fb397d]"}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                Why this DPI converter is different:
              </p>
              <ul className="space-y-2">
                {[
                  "Two modes in one tool — check current DPI and change it",
                  "Any custom DPI value, not limited to presets",
                  "Quality 95 re-save — no pixel data lost during DPI change",
                  "Output filename includes DPI value for easy identification",
                  "Supports JPEG, PNG, WebP, and HEIC formats",
                  "Free and unlimited with no watermark",
                ].map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={13}
                      className={`mt-0.5 shrink-0 ${idx % 2 === 0 ? "text-[#fb397d]" : "text-[#5b32b4]"}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to Change DPI — restructured from existing H3 section ────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="howto-heading"
      >
        <div className="text-center space-y-3">
          <h2
            id="howto-heading"
            className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
          >
            How to Change the DPI of an Image
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps — check, set, convert, download print-ready.
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
            Why Use This Image DPI Converter?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Check DPI and change DPI — two tools in one. Any value. Quality 95.
            Free and unlimited.
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

      {/* ── FAQ — interactive accordion, replaces static text FAQs ──────────── */}
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
            Everything you need to know about changing image DPI for printing
            and professional use.
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
      <OtherToolsSection currentSlug="image-dpi-changer" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
