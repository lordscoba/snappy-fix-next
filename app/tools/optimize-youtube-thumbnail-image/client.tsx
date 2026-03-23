"use client";

import { useState } from "react";
import YouTubeOptimizerTool from "@/components/tools/YoutubeOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Play,
  Zap,
  ShieldCheck,
  Globe,
  Maximize,
  TrendingUp,
  Monitor,
  Crop,
} from "lucide-react";

// ─── Python backend for YouTube:
// ImageOps.fit(image, (1280, 720), Image.LANCZOS) → hard crop to 16:9
// JPEG quality 90, optimize=True, progressive=True
// Max file size YouTube allows: 2MB
// Output: youtube.jpg

const faqs = [
  {
    question: "What is the correct YouTube thumbnail size?",
    answer:
      "YouTube's official recommended thumbnail size is 1280×720 pixels with a 16:9 aspect ratio, in JPG, PNG, GIF, or WebP format, under 2MB file size. Thumbnails smaller than 1280×720 display at reduced quality across devices — particularly on large screens and Smart TVs where YouTube renders thumbnails at full resolution. This tool outputs exactly 1280×720 pixels at quality 90 JPEG, meeting all YouTube requirements.",
  },
  {
    question: "What does the tool actually do to my image?",
    answer:
      "The tool applies a precise crop-and-fit to 1280×720 pixels using YouTube's recommended 16:9 dimensions, then saves as a quality-90 progressive JPEG optimised to stay under YouTube's 2MB upload limit. Unlike simple resizing, the tool uses ImageOps.fit — which scales and centre-crops the image to fill the 1280×720 frame exactly, ensuring there are no black bars, no empty padding, and no white space around the thumbnail.",
  },
  {
    question: "Will the tool crop my image?",
    answer:
      "Yes — and this is intentional. YouTube thumbnails must be exactly 1280×720 pixels (16:9). If your source image has a different aspect ratio, the tool centre-crops it to fit the 16:9 frame rather than stretching or distorting it. If your subject is centred in the original image, it will be centred in the thumbnail. If you need precise control over which area is cropped, use the Image Cropper tool first to crop to a 16:9 composition manually, then optimise here.",
  },
  {
    question: "Why does YouTube compress thumbnails and how does this help?",
    answer:
      "YouTube re-encodes uploaded thumbnails to standardise display across millions of devices and connection speeds. If your thumbnail is above 2MB or not in a web-optimised format, YouTube's processing is more aggressive and may introduce visible artefacts. At quality 90 with progressive JPEG encoding, this tool's output stays well under 2MB while preserving maximum detail — so YouTube's re-encoding has little left to do.",
  },
  {
    question: "What makes a YouTube thumbnail effective?",
    answer:
      "Beyond technical optimisation, effective thumbnails share several traits: a clear focal subject that reads at small sizes (thumbnails display as small as 168×94 px in search results), high contrast between subject and background, limited text (if any) in a large, bold font, consistent colour palette that matches your channel brand, and an image that accurately represents the video content to reduce abandonment after clicking.",
  },
  {
    question: "Does thumbnail quality affect YouTube search ranking or views?",
    answer:
      "Directly, no — YouTube does not rank videos based on thumbnail image quality. Indirectly, yes — a sharp, compelling thumbnail improves click-through rate (CTR), and CTR is one of YouTube's strongest engagement signals. Videos with higher CTR are shown more frequently in recommendations and search results. A blurry or poorly compressed thumbnail reduces perceived quality and lowers CTR, which over time depresses recommendation visibility.",
  },
  {
    question: "Can I use this for YouTube Shorts thumbnails?",
    answer:
      "YouTube Shorts uses a vertical 9:16 aspect ratio (1080×1920 px) for the cover frame, not 16:9. This tool is optimised for standard YouTube video thumbnails at 1280×720. For Shorts covers, crop to 9:16 first using the Image Cropper, then compress using the Web Image Optimizer or Custom Optimizer to stay under 2MB.",
  },
  {
    question:
      "Is the YouTube thumbnail optimizer free and does it add a watermark?",
    answer:
      "Yes — completely free with no usage limits and no watermark on the optimised output. Download your YouTube-ready thumbnail with no added branding.",
  },
];

const benefits = [
  {
    icon: <Maximize size={20} className="text-[#c3003a]" />,
    title: "Exactly 1280×720 px",
    description:
      "Hard crops to YouTube's required 1280×720 resolution using centre-fit — no black bars, no padding, no distortion.",
  },
  {
    icon: <TrendingUp size={20} className="text-[#5b32b4]" />,
    title: "Quality 90 JPEG output",
    description:
      "Quality 90 progressive JPEG preserves maximum detail in text, faces, and high-contrast edges — critical for thumbnail readability at small sizes.",
  },
  {
    icon: <Zap size={20} className="text-[#c3003a]" />,
    title: "Under YouTube's 2MB limit",
    description:
      "Output stays well under YouTube's 2MB thumbnail size limit, minimising further re-encoding by YouTube's pipeline.",
  },
  {
    icon: <Monitor size={20} className="text-[#5b32b4]" />,
    title: "Sharp on all devices",
    description:
      "1280×720 at quality 90 displays sharply on phones, tablets, desktop browsers, and Smart TVs — across all YouTube surface areas.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#c3003a]" />,
    title: "Private and secure",
    description:
      "Your image is processed securely and never permanently stored. Files are discarded after download.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Optimise YouTube thumbnails on desktop, laptop, tablet, or smartphone from any modern browser.",
  },
];

const thumbnailSizes = [
  {
    surface: "YouTube search results",
    display: "168 × 94 px",
    note: "Smallest display — clarity at this size is critical",
  },
  {
    surface: "YouTube homepage feed",
    display: "246 × 138 px",
    note: "Primary recommendation surface",
  },
  {
    surface: "Watch page sidebar",
    display: "168 × 94 px",
    note: "Related video suggestions",
  },
  {
    surface: "Channel page grid",
    display: "210 × 118 px",
    note: "Channel homepage video grid",
  },
  {
    surface: "Smart TV / large screen",
    display: "Up to 1280 × 720 px",
    note: "Full resolution thumbnail display",
  },
  {
    surface: "YouTube upload requirement",
    display: "1280 × 720 px max",
    note: "Under 2MB, JPG/PNG/WebP, 16:9 ratio",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload your thumbnail image",
    description:
      "Drag and drop your image onto the upload zone or click to browse. Works with JPG, PNG, WebP, and screenshots. For best results, start with an image wider than 1280px so the crop preserves full resolution.",
  },
  {
    number: "02",
    title: "Click Optimize for YouTube Thumbnails",
    description:
      "Hit the single button. The tool centre-crops and resizes to exactly 1280×720 px, then saves as quality-90 progressive JPEG under YouTube's 2MB limit. No settings needed.",
  },
  {
    number: "03",
    title: "Download your thumbnail",
    description:
      'Click "Download Optimized Image" to save the YouTube-ready JPEG at exactly 1280×720 px.',
  },
  {
    number: "04",
    title: "Upload to YouTube Studio",
    description:
      "In YouTube Studio, navigate to your video, click Edit, then Custom Thumbnail, and upload the downloaded file. Your thumbnail now displays at full resolution across all YouTube surfaces.",
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

export default function YouTubeOptimizerPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <Play size={14} />
          YouTube Thumbnail Tool
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Optimize YouTube Thumbnails
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Resize and optimise images to YouTube's required 1280×720 px at
          quality 90 JPEG — the specification that displays sharply across all
          YouTube surfaces and stays under the 2MB upload limit. Free, no
          watermark, no signup.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "1280 × 720 px Output",
            "Quality 90 JPEG",
            "Under 2MB",
            "No Watermark",
            "No Signup",
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

      <YouTubeOptimizerTool />

      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="intent-heading"
      >
        <h2
          id="intent-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Why Thumbnail Quality Directly Affects Your View Count
        </h2>
        <p className="text-gray-600 leading-relaxed">
          A YouTube thumbnail is displayed at six different sizes across the
          platform — from a 168×94 pixel thumbnail in search results to a full
          1280×720 pixel display on Smart TVs. At any size below the required
          resolution, YouTube upscales the thumbnail, introducing blur and
          reducing text readability. At quality below YouTube's preference,
          their re-encoding introduces compression artefacts that are visible at
          all display sizes. A sharp, correctly-sized thumbnail is the first
          thing a potential viewer sees — and a blurry or pixelated one directly
          reduces click-through rate.
        </p>

        {/* Where thumbnails are displayed */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Where YouTube thumbnails are displayed — and at what size
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["YouTube surface", "Display size", "Notes"].map((h) => (
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
                {thumbnailSizes.map((row, i) => (
                  <tr
                    key={row.surface}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-bold text-[#5b32b4] text-xs">
                      {row.surface}
                    </td>
                    <td className="px-5 py-3 text-xs font-black text-[#c3003a] font-mono">
                      {row.display}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            The tool outputs exactly 1280×720 px — the maximum resolution
            YouTube displays — so your thumbnail is never upscaled.
          </p>
        </div>

        {/* CTR callout + who uses */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                Who uses this tool:
              </p>
              <ul className="space-y-2">
                {[
                  "YouTubers uploading videos and needing compliant thumbnails",
                  "Content teams producing thumbnails for multiple channels",
                  "Editors preparing video assets for upload in YouTube Studio",
                  "Marketers running YouTube ad campaigns",
                  "Educators publishing tutorial and course content on YouTube",
                  "Brands using YouTube for product videos and announcements",
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
                Signs your thumbnails need optimisation:
              </p>
              <ul className="space-y-2">
                {[
                  "Thumbnails look blurry in YouTube search results",
                  "YouTube rejects thumbnail upload due to file size over 2MB",
                  "Thumbnail text is hard to read at small sizes",
                  "Thumbnails display black bars or are not filling the 16:9 frame",
                  "Different devices show the thumbnail at different sizes or crops",
                  "Canva exports appear degraded after YouTube upload",
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
            How to Optimize a YouTube Thumbnail
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. One button. Upload-ready in seconds.
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
            Why Use the Snappy-Fix YouTube Thumbnail Optimizer?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Exact 1280×720. Quality 90. Under 2MB. One click.
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
            Everything about YouTube thumbnail sizes, quality, and click-through
            rate.
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

      <OtherToolsSection currentSlug="optimize-youtube-thumbnail-image" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
