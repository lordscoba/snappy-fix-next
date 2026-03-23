"use client";

import { useState } from "react";
import HeicToImageTools from "@/components/tools/HeicToImageTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Smartphone,
  Zap,
  ShieldCheck,
  Download,
  Globe,
  FileImage,
  Monitor,
  AlertTriangle,
  Sliders,
} from "lucide-react";

const faqs = [
  {
    question: "What is HEIC and why can't I open it on Windows or Android?",
    answer:
      "HEIC (High Efficiency Image Container) is Apple's proprietary photo format introduced with iOS 11. It produces smaller file sizes than JPEG at the same quality, which is why iPhones use it by default. However, Windows, Android devices, and most websites do not natively support HEIC — you need to convert it to JPG or PNG before sharing or uploading to non-Apple platforms.",
  },
  {
    question: "Should I convert HEIC to JPG or PNG?",
    answer:
      "Choose JPG if you want smaller file sizes — ideal for sharing via messaging apps, email, or uploading to social media. JPG uses lossy compression so file sizes are much smaller. Choose PNG if you need lossless quality with no compression artefacts — better for editing, design work, screenshots, or images with text and sharp edges. Both formats are universally supported across all devices and platforms.",
  },
  {
    question: "What do the compression presets (Low, Medium, High) do?",
    answer:
      "The tool offers three compression levels that control the trade-off between output file size and image quality. Low compression produces the largest file at the highest quality (JPEG quality 90, up to 4000px wide) — use this for archival copies, print use, or when you need maximum fidelity. Medium compression is a balanced setting (JPEG quality 75, up to 3000px wide) — suitable for most sharing and professional use. High compression produces the smallest file (JPEG quality 55, up to 2000px wide) — use this for social media, email, and messaging where file size matters most. All three presets strip metadata and normalise EXIF orientation automatically.",
  },
  {
    question: "Will converting HEIC to JPG reduce the image quality?",
    answer:
      "It depends on the compression preset chosen. At Low compression (quality 90), the visual difference from the original is virtually invisible. At Medium (quality 75), the result is appropriate for most sharing and web use with minimal visible artefacts. At High compression (quality 55), some artefacts may be visible on close inspection — this preset is best for contexts where file size matters more than pixel-perfect quality. Converting to PNG is always lossless regardless of preset.",
  },
  {
    question: "Does the tool resize my image?",
    answer:
      "The tool applies a maximum width limit based on the compression preset chosen: Low compression keeps images up to 4000px wide, Medium up to 3000px, and High up to 2000px. If your original HEIC photo is smaller than the limit for your chosen preset, no resizing is applied. Aspect ratio is always preserved — the image is never distorted. For a 12MP iPhone photo (4032×3024px), Low compression keeps the full resolution, Medium reduces it slightly, and High brings it to 2000px on the longest side.",
  },
  {
    question: "Does converting HEIC remove metadata from my photo?",
    answer:
      "Yes. The conversion process strips all EXIF metadata from the output image — including GPS location, device model, timestamps, and camera settings. EXIF orientation is read first (to correctly rotate the image) and then discarded along with all other metadata. The output image is also saved with 72 DPI (the standard web resolution). If you need to preserve metadata, note that this tool performs a full metadata strip as part of conversion.",
  },
  {
    question: "How do I get HEIC photos off my iPhone?",
    answer:
      "On iPhone, go to Settings > Photos and change the transfer format to 'Most Compatible' — this makes your iPhone send JPG files when you AirDrop or cable-transfer photos to non-Apple devices. Alternatively, upload your HEIC file directly to this converter from your iPhone using Safari and download the converted JPG or PNG to your device.",
  },
  {
    question: "Are my uploaded HEIC photos stored on your servers?",
    answer:
      "No. Your HEIC file is processed securely and not permanently retained after conversion is complete. We do not store, index, or share your photos. The converted image is returned directly to your browser.",
  },
  {
    question: "Can I convert HEIC photos taken on iPad as well?",
    answer:
      "Yes. HEIC is the default photo format for all modern Apple devices — iPhone, iPad, and Mac cameras all produce HEIC files. Upload any HEIC photo from any Apple device and convert it to JPG or PNG instantly.",
  },
  {
    question: "Does this HEIC converter work on my iPhone or Android phone?",
    answer:
      "Yes. The converter works in any modern mobile browser. On iPhone, open Safari, navigate to this page, tap the upload zone, choose your HEIC photo from your library, convert it, and download the JPG or PNG directly to your Camera Roll. On Android, you can open HEIC files sent to you by iPhone users and convert them to a format your device can use natively.",
  },
  {
    question: "Is this tool free and does it add a watermark?",
    answer:
      "Yes — completely free with no usage limits and no watermark on converted images. Convert as many HEIC photos as you need at no cost with no registration required.",
  },
];

const benefits = [
  {
    icon: <Sliders size={20} className="text-[#c3003a]" />,
    title: "Three compression presets",
    description:
      "Low (quality 90, up to 4000px), Medium (quality 75, up to 3000px), and High (quality 55, up to 2000px) — choose the right balance of quality and file size for your use case.",
  },
  {
    icon: <FileImage size={20} className="text-[#5b32b4]" />,
    title: "JPG and PNG output",
    description:
      "Choose JPG for smaller file sizes perfect for sharing, or PNG for lossless quality with no compression artefacts.",
  },
  {
    icon: <Zap size={20} className="text-[#c3003a]" />,
    title: "Metadata stripped automatically",
    description:
      "EXIF orientation is applied to correctly rotate your photo, then all metadata — GPS, device info, timestamps — is removed from the output.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Universal compatibility",
    description:
      "Converted JPG and PNG files open on Windows, Android, Linux, all web browsers, and every image editing app.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#c3003a]" />,
    title: "Private and secure",
    description:
      "Your photos are processed securely and never permanently stored. What you upload stays completely private.",
  },
  {
    icon: <Smartphone size={20} className="text-[#5b32b4]" />,
    title: "Works from iPhone",
    description:
      "Use this tool directly from your iPhone in Safari — upload, convert, and download back to your Camera Roll without a computer.",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload your HEIC file",
    description:
      "Drag and drop your HEIC photo onto the upload zone or click to browse your device. The tool accepts .heic files — the format used by iPhones and iPads.",
  },
  {
    number: "02",
    title: "Choose format and compression",
    description:
      "Select JPG (smaller, universally compatible) or PNG (lossless). Then choose your compression level — Low for maximum quality, Medium for balanced output, High for smallest file size.",
  },
  {
    number: "03",
    title: "Click Convert Image",
    description:
      "Hit the Convert Image button. A progress bar tracks your upload and conversion in real time. The tool corrects orientation, strips metadata, resizes if needed, and returns your converted file.",
  },
  {
    number: "04",
    title: "Download and use anywhere",
    description:
      "Click Download Converted Image to save the file — named with '_compressed' appended so it is easy to identify alongside the original. The output is now compatible with Windows, Android, all websites, and every image editor.",
  },
];

// Compression presets reference
const presets = [
  {
    preset: "Low compression",
    jpegQ: "90",
    maxWidth: "4000px",
    bestFor: "Archival, print, maximum fidelity",
    fileSize: "Largest",
  },
  {
    preset: "Medium compression",
    jpegQ: "75",
    maxWidth: "3000px",
    bestFor: "Professional sharing, balanced use",
    fileSize: "Medium",
  },
  {
    preset: "High compression",
    jpegQ: "55",
    maxWidth: "2000px",
    bestFor: "Social media, email, messaging",
    fileSize: "Smallest",
  },
];

const compatibility = [
  { platform: "Windows 10 / 11", heic: "Limited*", jpg: "✓", png: "✓" },
  { platform: "Android", heic: "✗", jpg: "✓", png: "✓" },
  { platform: "macOS", heic: "✓", jpg: "✓", png: "✓" },
  { platform: "iOS / iPadOS", heic: "✓", jpg: "✓", png: "✓" },
  { platform: "Chrome / Firefox", heic: "✗", jpg: "✓", png: "✓" },
  { platform: "Social media uploads", heic: "✗", jpg: "✓", png: "✓" },
  { platform: "Email attachments", heic: "✗", jpg: "✓", png: "✓" },
  {
    platform: "Photoshop / Figma",
    heic: "Plugin required",
    jpg: "✓",
    png: "✓",
  },
];

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

export default function HeicToJpgPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <Smartphone size={14} />
          iPhone Photo Converter
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          HEIC to JPG / PNG Converter
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Convert iPhone HEIC photos to JPG or PNG instantly. Three compression
          presets control quality and file size — Low for maximum fidelity, High
          for smallest output. Metadata stripped automatically. Free, secure, no
          watermark.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "JPG & PNG Output",
            "3 Compression Presets",
            "Metadata Stripped",
            "No Watermark",
            "Works on iPhone",
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

      <HeicToImageTools />

      <section
        className="max-w-4xl mx-auto space-y-6"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Why Can't I Open HEIC Photos on Windows or Android?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Since iOS 11, iPhones and iPads save photos in HEIC format by default.
          HEIC (High Efficiency Image Container) produces files that are roughly
          half the size of JPEG at equivalent quality — a genuine improvement
          for storage-conscious devices. The problem is that HEIC is an
          Apple-proprietary format that most of the world's devices and
          platforms simply do not support.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Windows requires a paid codec extension to open HEIC files. Android
          cannot open them at all natively. Most websites reject HEIC uploads.
          Email clients struggle to display them. Design tools like Figma and
          older versions of Photoshop require plugins. Converting your HEIC
          photos to JPG or PNG solves all of these problems instantly.
        </p>

        {/* Compression presets table — new, matches IMAGE_COMPRESSION_PRESETS */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Compression presets — quality vs file size
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {[
                    "Preset",
                    "JPEG quality",
                    "Max width",
                    "Best for",
                    "Output size",
                  ].map((h) => (
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
                {presets.map((row, i) => (
                  <tr
                    key={row.preset}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-bold text-[#5b32b4] text-xs">
                      {row.preset}
                    </td>
                    <td className="px-5 py-3 text-xs font-black text-[#c3003a] font-mono">
                      {row.jpegQ}
                    </td>
                    <td className="px-5 py-3 text-xs font-bold text-[#2b1d3a]">
                      {row.maxWidth}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.bestFor}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-500">
                      {row.fileSize}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            All presets strip EXIF metadata, correct orientation, and normalise
            DPI to 72. PNG output is always lossless regardless of preset.
          </p>
        </div>

        {/* Platform compatibility table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            HEIC vs JPG / PNG compatibility across platforms
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["Platform", "HEIC", "JPG", "PNG"].map((h) => (
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
                {compatibility.map((row, i) => (
                  <tr
                    key={row.platform}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-medium text-[#2b1d3a] text-sm">
                      {row.platform}
                    </td>
                    <td
                      className={`px-5 py-3 text-xs font-bold ${row.heic === "✓" ? "text-[#5b32b4]" : row.heic === "✗" ? "text-red-400" : "text-amber-500"}`}
                    >
                      {row.heic}
                    </td>
                    <td className="px-5 py-3 text-xs font-bold text-[#5b32b4]">
                      {row.jpg}
                    </td>
                    <td className="px-5 py-3 text-xs font-bold text-[#5b32b4]">
                      {row.png}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            * Windows 10/11 supports HEIC only with the HEVC Video Extensions
            codec (paid) from the Microsoft Store.
          </p>
        </div>

        {/* JPG vs PNG value intent callout */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-5">
            <div>
              <p className="font-black text-sm text-[#5b32b4] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#5b32b4] text-white text-xs font-black flex items-center justify-center">
                  J
                </span>
                Convert to JPG when:
              </p>
              <ul className="space-y-2">
                {[
                  "Sharing photos via messaging or email",
                  "Uploading to social media or websites",
                  "Saving storage space on your device",
                  "Sending to someone on Windows or Android",
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
              <p className="font-black text-sm text-[#c3003a] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#fb397d] text-white text-xs font-black flex items-center justify-center">
                  P
                </span>
                Convert to PNG when:
              </p>
              <ul className="space-y-2">
                {[
                  "Editing the photo in Photoshop or Figma",
                  "Preserving exact colours with no compression",
                  "The image contains text or sharp graphics",
                  "You need a lossless archival copy",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={13}
                      className="text-[#c3003a] mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* iPhone tip callout */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] to-white border border-[#5b32b4]/20 p-5 overflow-hidden flex gap-4">
          <div className="shrink-0 w-10 h-10 rounded-xl bg-[#f3ecff] flex items-center justify-center">
            <AlertTriangle size={18} className="text-[#5b32b4]" />
          </div>
          <div>
            <p className="font-bold text-[#5b32b4] text-sm mb-1">
              Prevent HEIC photos at the source
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              On your iPhone, go to{" "}
              <strong>Settings → Photos → Transfer to Mac or PC</strong> and
              select <strong>"Automatic"</strong>. This makes your iPhone send
              JPG files automatically when transferring to non-Apple devices —
              no conversion needed. To stop shooting HEIC entirely, go to{" "}
              <strong>Settings → Camera → Formats</strong> and select{" "}
              <strong>"Most Compatible"</strong>.
            </p>
          </div>
        </div>
      </section>

      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="howto-heading"
      >
        <div className="text-center space-y-3">
          <h2
            id="howto-heading"
            className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
          >
            How to Convert HEIC to JPG or PNG
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Under 15 seconds. Works directly from your iPhone.
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

      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="benefits-heading"
      >
        <div className="text-center space-y-3">
          <h2
            id="benefits-heading"
            className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
          >
            Why Use the Snappy-Fix HEIC Converter?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Three compression presets, automatic metadata removal, and direct
            iPhone support — fast and private.
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
            Everything you need to know about HEIC and converting iPhone photos.
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

      <OtherToolsSection currentSlug="heic-to-jpg" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
