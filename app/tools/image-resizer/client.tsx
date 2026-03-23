"use client";

import { useState } from "react";
import ImageResizerTool from "@/components/tools/ResizeImageTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Maximize,
  Zap,
  ShieldCheck,
  Download,
  Globe,
  Sliders,
  LayoutGrid,
  MonitorSmartphone,
  Lock,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "Does resizing reduce image quality?",
    answer:
      "Resizing changes the pixel dimensions of an image but does not apply additional compression on its own. Scaling down (making an image smaller) produces no visible quality loss — you are simply removing pixels. Scaling up (enlarging an image) can introduce softness or pixelation if you enlarge significantly beyond the original size, because the tool has to interpolate new pixel data. For best results when enlarging, avoid going more than 150% above the original dimensions. If you need to compress as well as resize, use the image compressor separately after resizing.",
  },
  {
    question: "What does the 'Maintain aspect ratio' option do?",
    answer:
      "When Maintain Aspect Ratio is checked, the tool preserves the original width-to-height ratio of your image. If you enter a new width, the height is automatically calculated to match the original proportions — preventing your image from appearing stretched or squashed. When it is unchecked, you can set any width and height independently, which is useful when you need to match an exact dimension regardless of the original proportions — for example resizing a portrait photo to a landscape social media banner.",
  },
  {
    question: "Can I resize an image to exact pixel dimensions?",
    answer:
      "Yes. Enter the exact pixel values in the Width and Height fields and uncheck Maintain Aspect Ratio to set both dimensions independently. The tool sends your exact width and height to the server via the width and height query parameters — so you always get precisely the output dimensions you specified.",
  },
  {
    question: "What preset sizes are available?",
    answer:
      "The tool includes over 20 named presets across 5 categories. Social Media Posts: Instagram Square (1080×1080), Instagram Portrait (1080×1350), Instagram/TikTok Stories (1080×1920), Twitter/X Post (1200×675), Facebook Post (1200×630), LinkedIn Post (1200×627). Video & Thumbnails: YouTube Thumbnail (1280×720), YouTube HD (1920×1080), Twitch Offline Banner (1920×1080). Banners & Headers: Twitter Header (1500×500), LinkedIn Banner (1584×396), Facebook Cover (820×312), YouTube Channel Art (2560×1440). Messaging: WhatsApp Status (1080×1920), Pinterest Pin (1000×1500), Snapchat (1080×1920). Web & Documents: Email Header (600×200), Presentation 16:9 (1920×1080), A4 (2480×3508), US Letter (2550×3300).",
  },
  {
    question: "What image information is shown after I upload?",
    answer:
      "After uploading, the tool displays a preview of your image along with three key data points: the original pixel dimensions (width × height in pixels), the original aspect ratio (expressed as a decimal ratio to 1), and the original file size in KB. This helps you understand your starting point before deciding on target dimensions.",
  },
  {
    question: "Can I resize images for printing as well as web?",
    answer:
      "Yes. The tool resizes by pixel dimensions, which applies to both digital and print use cases. For print, use the A4 preset (2480×3508 px at 300 DPI) or US Letter (2550×3300 px) from the Web & Documents group. For screen, use any of the social media or web presets. If you need to set a specific DPI as well as resize, check your current DPI first using the DPI Checker tool, then resize to the pixel dimensions that will produce your target print size at 300 DPI.",
  },
  {
    question: "What happens when I select a preset?",
    answer:
      "When you select a named preset from the dropdown, the Width and Height fields are automatically populated with the preset's values and Maintain Aspect Ratio is unchecked — because most platform-specific sizes require exact fixed dimensions regardless of your original image's proportions. You can manually re-enable Maintain Aspect Ratio after selecting a preset if you prefer proportional scaling from the preset dimensions.",
  },
  {
    question: "Is the image resizer free and does it add a watermark?",
    answer:
      "Yes — completely free with no usage limits, no watermark, and no account required. Resize as many images as you need at no cost.",
  },
  {
    question: "What image formats can I resize?",
    answer:
      "The tool accepts all standard web image formats: JPG, JPEG, PNG, WebP, BMP, GIF, and TIFF. The output format matches the format of your original upload. If you need to resize and convert formats at the same time, resize first and then use the Image Converter tool to change the format.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <LayoutGrid size={20} className="text-[#fb397d]" />,
    title: "20+ named presets",
    description:
      "Platform-specific presets across 5 categories — social media, video thumbnails, banners, messaging, and documents. One click sets exact dimensions.",
  },
  {
    icon: <Sliders size={20} className="text-[#5b32b4]" />,
    title: "Custom pixel dimensions",
    description:
      "Enter any width and height in pixels for precise control. View original dimensions and file size immediately after upload.",
  },
  {
    icon: <Lock size={20} className="text-[#fb397d]" />,
    title: "Aspect ratio lock",
    description:
      "Toggle Maintain Aspect Ratio to keep your image's original proportions and prevent distortion — or unlock it for exact fixed dimensions.",
  },
  {
    icon: <Zap size={20} className="text-[#5b32b4]" />,
    title: "Instant server-side resize",
    description:
      "Resizing is processed server-side for consistent, high-quality output across all formats. Most resizes complete in under 5 seconds.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#fb397d]" />,
    title: "Private and secure",
    description:
      "Your image is processed securely and not permanently stored. Original and resized files are never retained after the session.",
  },
  {
    icon: <MonitorSmartphone size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive — resize images on desktop, laptop, tablet, or smartphone from any modern browser without installing software.",
  },
];

// ─── Preset reference by category ────────────────────────────────────────────
const presetGroups = [
  {
    group: "Social Media Posts",
    color: "#5b32b4",
    bg: "from-[#faf7ff] to-white",
    border: "border-[#5b32b4]/20",
    presets: [
      { label: "Instagram Square", dims: "1080 × 1080 px" },
      { label: "Instagram Portrait", dims: "1080 × 1350 px" },
      { label: "Instagram / TikTok Stories", dims: "1080 × 1920 px" },
      { label: "Twitter / X Post", dims: "1200 × 675 px" },
      { label: "Facebook Post", dims: "1200 × 630 px" },
      { label: "LinkedIn Post", dims: "1200 × 627 px" },
    ],
  },
  {
    group: "Video & Thumbnails",
    color: "#fb397d",
    bg: "from-[#fff5f9] to-white",
    border: "border-[#fb397d]/20",
    presets: [
      { label: "YouTube Thumbnail", dims: "1280 × 720 px" },
      { label: "YouTube HD Thumbnail", dims: "1920 × 1080 px" },
      { label: "Twitch Offline Banner", dims: "1920 × 1080 px" },
    ],
  },
  {
    group: "Banners & Headers",
    color: "#5b32b4",
    bg: "from-[#faf7ff] to-white",
    border: "border-[#5b32b4]/20",
    presets: [
      { label: "Twitter / X Header", dims: "1500 × 500 px" },
      { label: "LinkedIn Banner", dims: "1584 × 396 px" },
      { label: "Facebook Cover", dims: "820 × 312 px" },
      { label: "YouTube Channel Art", dims: "2560 × 1440 px" },
    ],
  },
  {
    group: "Messaging & Engagement",
    color: "#fb397d",
    bg: "from-[#fff5f9] to-white",
    border: "border-[#fb397d]/20",
    presets: [
      { label: "WhatsApp Status", dims: "1080 × 1920 px" },
      { label: "Pinterest Pin", dims: "1000 × 1500 px" },
      { label: "Snapchat Snap", dims: "1080 × 1920 px" },
    ],
  },
  {
    group: "Web & Documents",
    color: "#5b32b4",
    bg: "from-[#faf7ff] to-white",
    border: "border-[#5b32b4]/20",
    presets: [
      { label: "Email Header", dims: "600 × 200 px" },
      { label: "Presentation 16:9", dims: "1920 × 1080 px" },
      { label: "A4 Document (300 DPI)", dims: "2480 × 3508 px" },
      { label: "US Letter (300 DPI)", dims: "2550 × 3300 px" },
    ],
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      "Drag and drop your image onto the upload zone or click to browse. After upload, the tool shows your original dimensions, aspect ratio, and file size — so you know your starting point before setting target dimensions.",
  },
  {
    number: "02",
    title: "Choose a preset or enter custom dimensions",
    description:
      "Select a named preset from the dropdown (Instagram Square, YouTube Thumbnail, A4, and 17 others) to auto-fill the width and height fields. Or enter any custom pixel values directly for precise control.",
  },
  {
    number: "03",
    title: "Set aspect ratio preference",
    description:
      "Check Maintain Aspect Ratio to scale proportionally and avoid distortion — the tool adjusts height automatically when you change width. Uncheck it to set both dimensions independently for exact fixed output.",
  },
  {
    number: "04",
    title: "Resize and download",
    description:
      'Click "Resize Image" and watch the progress bar. The resized file is ready in seconds. Click "Download Resized Image" to save it to your device.',
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
export default function ImageResizerPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <Maximize size={14} />
          Free Image Resizer
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Image Resizer
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Resize images to exact pixel dimensions instantly. Choose from 20+
          named platform presets or enter custom width and height — with
          optional aspect ratio lock. Free, no watermark, no signup required.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "20+ Presets",
            "Custom Dimensions",
            "Aspect Ratio Lock",
            "No Watermark",
            "No Signup",
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
      <ImageResizerTool />

      {/* ── Direct Intent ────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Resize Images to Any Dimension — Instantly
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Every platform, application, and workflow has its own required image
          dimensions. Instagram posts need to be square. YouTube thumbnails need
          to be 1280×720. A4 documents need to be 2480×3508 pixels at 300 DPI.
          Submitting the wrong dimensions means your image gets cropped,
          stretched, or rejected. This tool solves all of it — with over 20
          named presets covering every major platform, plus custom dimension
          input for any other requirement.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Unlike simple browser-side resizers, this tool processes your image
          server-side — producing consistent, high-quality output regardless of
          the format you upload. After uploading, the tool shows your original
          dimensions, aspect ratio, and file size, so you always know your
          starting point before choosing a target size.
        </p>

        {/* Preset groups grid */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-5 text-base">
            All available presets — 20+ named platform sizes
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {presetGroups.map((group) => (
              <div
                key={group.group}
                className={`rounded-2xl bg-gradient-to-br ${group.bg} border ${group.border} p-4 overflow-hidden`}
              >
                <p
                  className="font-black text-xs uppercase tracking-wider mb-3"
                  style={{ color: group.color }}
                >
                  {group.group}
                </p>
                <ul className="space-y-1.5">
                  {group.presets.map((preset) => (
                    <li
                      key={preset.label}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="text-xs text-gray-600 truncate">
                        {preset.label}
                      </span>
                      <span
                        className="text-[10px] font-black font-mono shrink-0"
                        style={{ color: group.color }}
                      >
                        {preset.dims}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Value intent callout */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                Who uses this tool:
              </p>
              <ul className="space-y-2">
                {[
                  "Social media managers preparing platform-specific posts",
                  "Content creators resizing thumbnails for YouTube and Twitch",
                  "Designers preparing assets for client deliverables",
                  "Developers reducing image dimensions before uploading",
                  "Marketers creating banners and email headers",
                  "Students resizing images for coursework submissions",
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
                When custom dimensions matter:
              </p>
              <ul className="space-y-2">
                {[
                  "Exact file size limits on upload portals",
                  "CMS image slot requirements (e.g. 800×400 hero)",
                  "Print production at specific DPI and physical size",
                  "Responsive web images at device breakpoint sizes",
                  "Email template image slots with fixed width constraints",
                  "App store screenshots with platform-mandated pixel counts",
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
            How to Resize an Image Online
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Preset or custom dimensions. Full quality output.
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
            Why Use the Snappy-Fix Image Resizer?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            The most complete preset library of any free online image resizer —
            plus full custom dimension control.
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
            Everything you need to know about resizing images online to exact
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
      <OtherToolsSection currentSlug="image-resizer" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
