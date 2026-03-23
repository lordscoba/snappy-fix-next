"use client";

import { useState } from "react";
import CropImageTools from "@/components/tools/CropImageTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Crop,
  Zap,
  ShieldCheck,
  Download,
  Globe,
  Maximize,
  MonitorSmartphone,
  Layers,
  Move,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "How do I crop an image to an exact pixel size?",
    answer:
      "Upload your image and drag the crop handles to your desired area. The live pixel readout in the top-right corner of the crop editor shows the exact width × height of your selected region in real time as you drag. Once the readout matches your target dimensions, click Apply Crop — the server processes the crop at the original image resolution, not the preview size, so you get full-quality output at the exact pixel dimensions you selected.",
  },
  {
    question: "Does cropping reduce image quality?",
    answer:
      "No. Cropping only removes the pixels outside your selected area — the remaining portion of the image is preserved exactly as it was in the original file. The crop is performed server-side at the original image resolution using the natural pixel coordinates, not the compressed preview. The quality of the cropped region is identical to the same area in the original image.",
  },
  {
    question: "What is the difference between cropping and resizing?",
    answer:
      "Cropping removes areas of an image by selecting a rectangular region and discarding everything outside it — the remaining content is not scaled or stretched. Resizing scales the entire image to new dimensions — the content is compressed or expanded. Use cropping when you want to change the framing or composition of an image. Use resizing when you need to change the overall dimensions of an image while keeping all of its content. Both tools are available separately on Snappy-Fix.",
  },
  {
    question: "Can I crop images for specific social media platform sizes?",
    answer:
      "Yes. Use the live pixel readout to match the exact dimensions required by each platform: Instagram square posts (1080×1080), Instagram portrait (1080×1350), Twitter/X header (1500×500), Facebook cover (851×315), YouTube thumbnail (1280×720), LinkedIn cover (1584×396), WhatsApp profile picture (500×500). Drag the crop handles until the readout matches your target dimensions, then click Apply Crop.",
  },
  {
    question: "How does the crop selection work?",
    answer:
      "The tool uses an interactive drag-to-select crop area. When you upload an image, a default crop box appears centred over your image at 90% of the image width. Drag the corner and edge handles to resize the crop area. Drag inside the crop box to reposition it over your image. The pixel dimensions update live as you drag. When you are satisfied, click Apply Crop to send the selected region to the server for processing.",
  },
  {
    question: "Does the crop tool preserve the original image resolution?",
    answer:
      "Yes. The crop coordinates are scaled from the preview display size back to the original image's natural resolution before the crop is applied. If your original image is 4000×3000 pixels and you drag a crop box that appears to cover 50% of the preview width, the actual crop is calculated at 2000 pixels wide on the full-resolution original — not at the smaller preview dimensions. You always get full-resolution output.",
  },
  {
    question: "What image formats can I crop?",
    answer:
      "The tool accepts all standard web image formats: JPG, PNG, WebP, BMP, TIFF, GIF, and other common formats. The output format matches the format of your original upload. If you need to crop and convert to a different format in one workflow, crop first, then use the Image Converter to change the format.",
  },
  {
    question: "Is the image cropper free and does it add a watermark?",
    answer:
      "Yes — completely free with no usage limits and no watermark on cropped images. Crop as many images as you need at no cost with no registration required.",
  },
  {
    question: "Are my uploaded images stored on your servers?",
    answer:
      "No. Your image is uploaded for processing and the cropped result is returned to your browser. No copy of your original or cropped image is retained on our servers after the crop is complete.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Move size={20} className="text-[#fb397d]" />,
    title: "Interactive drag-to-crop",
    description:
      "Drag corner and edge handles to precisely frame your crop area. Drag inside the selection to reposition it over your image.",
  },
  {
    icon: <Maximize size={20} className="text-[#5b32b4]" />,
    title: "Live pixel readout",
    description:
      "The exact crop dimensions update in real time as you drag — so you always know precisely how many pixels you are selecting.",
  },
  {
    icon: <Layers size={20} className="text-[#fb397d]" />,
    title: "Full-resolution output",
    description:
      "Crop coordinates scale to your original image resolution, not the preview size. You get full-quality output at exact pixel dimensions.",
  },
  {
    icon: <Zap size={20} className="text-[#5b32b4]" />,
    title: "Server-side processing",
    description:
      "Cropping is handled server-side, not in the browser canvas — ensuring consistent, high-fidelity results across all image formats.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#fb397d]" />,
    title: "Private and secure",
    description:
      "Your image is processed securely and not permanently stored after cropping. Original and result files are never retained.",
  },
  {
    icon: <MonitorSmartphone size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive crop editor — works on desktop, tablet, and smartphone browsers with touch-compatible drag handles.",
  },
];

// ─── Social media size reference ──────────────────────────────────────────────
const socialSizes = [
  {
    platform: "Instagram Post (Square)",
    dimensions: "1080 × 1080 px",
    ratio: "1:1",
  },
  {
    platform: "Instagram Portrait",
    dimensions: "1080 × 1350 px",
    ratio: "4:5",
  },
  {
    platform: "Instagram Landscape",
    dimensions: "1080 × 566 px",
    ratio: "1.91:1",
  },
  { platform: "Twitter / X Post", dimensions: "1200 × 675 px", ratio: "16:9" },
  { platform: "Twitter / X Header", dimensions: "1500 × 500 px", ratio: "3:1" },
  { platform: "Facebook Cover", dimensions: "851 × 315 px", ratio: "2.7:1" },
  { platform: "YouTube Thumbnail", dimensions: "1280 × 720 px", ratio: "16:9" },
  { platform: "LinkedIn Cover", dimensions: "1584 × 396 px", ratio: "4:1" },
  { platform: "WhatsApp Profile", dimensions: "500 × 500 px", ratio: "1:1" },
  {
    platform: "Profile Picture (General)",
    dimensions: "400 × 400 px",
    ratio: "1:1",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      "Drag and drop your image onto the upload zone or click to browse. The interactive crop editor loads immediately with a default selection centred on your image. Supported formats: JPG, PNG, WebP, BMP, TIFF, GIF.",
  },
  {
    number: "02",
    title: "Drag to set your crop area",
    description:
      "Drag the corner or edge handles to resize the crop selection. Drag inside the selection box to move it over the area you want to keep. The live pixel readout shows your exact selection dimensions in real time.",
  },
  {
    number: "03",
    title: "Match your target dimensions",
    description:
      "Watch the pixel readout as you drag until it matches your required dimensions — for example 1080×1080 for an Instagram post, or 1280×720 for a YouTube thumbnail. The exact coordinates shown will be sent to the server.",
  },
  {
    number: "04",
    title: "Apply crop and download",
    description:
      'Click "Apply Crop" to send your selection to the server for processing. The crop is calculated at your original full image resolution. Click "Download Result" to save the cropped image to your device.',
  },
];

// ─── Use cases ────────────────────────────────────────────────────────────────
const useCases = [
  { label: "Crop profile pictures to a perfect square" },
  { label: "Frame YouTube thumbnails at 1280×720" },
  { label: "Prepare Instagram posts in square or portrait format" },
  { label: "Remove distracting backgrounds or borders from photos" },
  { label: "Cut a specific subject out of a larger image" },
  { label: "Trim whitespace from product photography" },
  { label: "Create banner crops from landscape photographs" },
  { label: "Isolate a face or object for use in presentations" },
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
export default function ImageCropperPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <Crop size={14} />
          Free Online Cropper
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Image Cropper
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Crop images to exact pixel dimensions with an interactive
          drag-to-select editor. Live pixel readout, full-resolution server-side
          processing, and support for all standard image formats — free, no
          watermark, no signup.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "Live Pixel Readout",
            "Full Resolution Output",
            "No Watermark",
            "No Signup",
            "Touch Friendly",
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
      <CropImageTools />

      {/* ── Direct Intent ────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Crop Images to Exact Dimensions — Interactively
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Cropping is the most fundamental image editing operation — removing
          unwanted areas to improve composition, match a required aspect ratio,
          or focus on a specific subject. Most online crop tools give you a
          basic selection box with no feedback on the actual pixel dimensions
          being selected. This tool shows you the exact pixel dimensions of your
          crop selection in real time as you drag, so you always know precisely
          what you are getting before you apply the crop.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Critically, the crop is processed server-side at your original image
          resolution — not at the browser preview size. This means a crop you
          set on a 200px-wide preview of a 4000px-wide image will correctly
          produce a 2000px-wide result, not a 100px result. You get full-quality
          output at the exact dimensions your crop selection represents on the
          original file.
        </p>

        {/* Use cases grid */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-2">
            {useCases.map((u) => (
              <div
                key={u.label}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <CheckCircle2
                  size={13}
                  className="text-[#5b32b4] mt-0.5 shrink-0"
                />
                {u.label}
              </div>
            ))}
          </div>
        </div>

        {/* Social media sizes table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Social media image crop size reference
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["Platform", "Dimensions", "Aspect Ratio"].map((h) => (
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
                {socialSizes.map((row, i) => (
                  <tr
                    key={row.platform}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 text-sm font-medium text-[#2b1d3a]">
                      {row.platform}
                    </td>
                    <td className="px-5 py-3 text-xs font-black text-[#fb397d] font-mono">
                      {row.dimensions}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-500 font-medium">
                      {row.ratio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Use the live pixel readout in the crop editor to match these exact
            dimensions before clicking Apply Crop.
          </p>
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
            How to Crop an Image Online
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Pixel-precise selection. Full-resolution output.
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
            Why Use the Snappy-Fix Image Cropper?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Not just a crop box — a precise, full-resolution cropping tool with
            live dimension feedback.
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
            Everything you need to know about cropping images online to exact
            dimensions.
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
      <OtherToolsSection currentSlug="image-cropper" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
