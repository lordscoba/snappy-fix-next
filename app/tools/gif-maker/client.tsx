"use client";

import { useState } from "react";
import GifConverterTools from "@/components/tools/GIFConverterTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Clapperboard,
  Zap,
  ShieldCheck,
  Share2,
  Globe,
  Sliders,
  ImageIcon,
  Repeat2,
  Timer,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What is a GIF and how is it different from a video?",
    answer:
      "A GIF (Graphics Interchange Format) is a looping animated image that plays automatically without requiring a media player, video controls, or autoplay permissions. Unlike videos, GIFs work natively in emails, chat apps, social media posts, and web pages without any player — making them the universal format for short animations, reactions, and memes.",
  },
  {
    question: "Can I convert a video to a GIF with this tool?",
    answer:
      "Yes. Upload any MP4, MOV, WebM, or other common video format, set your trim range (start and end time, up to 15 seconds maximum), then configure FPS, output width, quality preset, and whether to reverse the animation. The tool converts the selected clip into an animated GIF instantly.",
  },
  {
    question: "Can I create a GIF from a single image?",
    answer:
      "Yes. Upload any image file and set the frame duration (in milliseconds) to create an animated GIF from that single image. This is useful for creating subtle motion effects, flashing animations, or preparing images for platforms that display GIFs differently from static images. A duration of 500ms is a common starting point.",
  },
  {
    question: "What is FPS and how does it affect my GIF?",
    answer:
      "FPS (Frames Per Second) controls how many frames of the original video are captured per second in the output GIF. Higher FPS (up to 15) produces smoother, more fluid motion but creates larger file sizes. Lower FPS (5–10) creates a choppier, more meme-style animation with much smaller file sizes. For most social media GIFs, 8–12 FPS is the sweet spot.",
  },
  {
    question: "What does the Reverse GIF option do?",
    answer:
      "Enabling the Reverse option plays the GIF animation backwards. When combined with a looping GIF, this creates a boomerang-style back-and-forth effect — popular for social media content. It works by reversing the frame order of the video clip before encoding the GIF.",
  },
  {
    question: "What quality preset should I choose?",
    answer:
      "Quality presets control the colour depth and dithering of the output GIF. HD produces the sharpest colours and finest detail but the largest file size — best for professional use. High balances quality and size. Medium is the default and works well for social media. Low gives the smallest files, best for messaging apps with strict size limits.",
  },
  {
    question: "What is the maximum video clip length I can convert?",
    answer:
      "The video-to-GIF mode supports a maximum GIF duration of 15 seconds (set using the start and end time trim controls). GIFs longer than this become extremely large and load slowly, so 3–8 seconds is recommended for most use cases. For the image-to-GIF mode, the frame duration can range from 100ms to 30,000ms.",
  },
  {
    question: "Can I share my GIF directly from the tool?",
    answer:
      "Yes — after your GIF is generated, the Share button uses the Web Share API to share the GIF directly to your device's native sharing sheet (messaging apps, social media, email) without downloading first. This works on modern mobile browsers. Desktop browsers show a download fallback if Web Share is not supported.",
  },
  {
    question: "Is the GIF maker free and does it add a watermark?",
    answer:
      "Yes — the Snappy-Fix GIF Maker is completely free with no usage limits and no watermark on generated GIFs. Download and share your animations however you like with no added branding.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Clapperboard size={20} className="text-[#c3003a]" />,
    title: "Video and image modes",
    description:
      "Convert videos (MP4, MOV, WebM) or turn a single image into an animated GIF — two tools in one.",
  },
  {
    icon: <Sliders size={20} className="text-[#5b32b4]" />,
    title: "Full creative control",
    description:
      "Trim clips, set FPS, adjust width, choose quality, and enable reverse playback — all before generating.",
  },
  {
    icon: <Repeat2 size={20} className="text-[#c3003a]" />,
    title: "Reverse / boomerang mode",
    description:
      "Toggle Reverse to play your GIF backwards, creating a boomerang loop effect without any additional software.",
  },
  {
    icon: <Share2 size={20} className="text-[#5b32b4]" />,
    title: "One-tap sharing",
    description:
      "Share your GIF directly to messaging apps and social media from the tool using the native device share sheet.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#c3003a]" />,
    title: "No watermark, no limits",
    description:
      "Download clean GIFs with no added branding. Generate as many as you need for any project at zero cost.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive — create GIFs from videos or images on desktop, tablet, or smartphone in any modern browser.",
  },
];

// ─── Modes comparison ─────────────────────────────────────────────────────────
const modes = [
  {
    title: "Video to GIF",
    icon: <Clapperboard size={18} />,
    color: "#fb397d",
    bg: "from-[#fff5f9] to-white",
    border: "border-[#fb397d]/20",
    settings: [
      "Trim — set start and end time (max 15s)",
      "FPS — 1 to 30 frames per second",
      "Width — 100px to 1000px output",
      "Quality — HD / High / Medium / Low",
      "Reverse — backwards playback toggle",
    ],
    bestFor: "Memes, reactions, social clips, product demos",
  },
  {
    title: "Image to GIF",
    icon: <ImageIcon size={18} />,
    color: "#5b32b4",
    bg: "from-[#faf7ff] to-white",
    border: "border-[#5b32b4]/20",
    settings: [
      "Frame duration — 100ms to 30,000ms",
      "Upload any image format (PNG, JPG, WebP)",
      "Single frame GIF with custom loop timing",
    ],
    bestFor: "Flashing effects, animated thumbnails, loop animations",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const videoSteps = [
  {
    number: "01",
    title: "Upload your video",
    description:
      "Drag and drop or browse to upload your video file (MP4, MOV, WebM). A live preview loads so you can see the clip before configuring settings.",
  },
  {
    number: "02",
    title: "Trim your clip",
    description:
      "Use the Start Time and End Time sliders to select the exact segment you want to convert. Maximum GIF duration is 15 seconds — shorter clips (3–8 seconds) produce the best results.",
  },
  {
    number: "03",
    title: "Configure GIF settings",
    description:
      "Set FPS for animation smoothness (10–15 is recommended for most uses), choose output width, select a quality preset, and optionally enable Reverse for a boomerang effect.",
  },
  {
    number: "04",
    title: "Generate, download, and share",
    description:
      "Click Generate GIF and watch the progress bar. Once ready, preview your GIF, download it to your device, or tap Share to send it directly to a messaging app or social platform.",
  },
];

// ─── Settings reference ───────────────────────────────────────────────────────
const settingsRef = [
  {
    setting: "FPS",
    low: "5–10 — choppier, smaller file",
    recommended: "10–15",
    high: "20–30 — smooth, larger file",
  },
  {
    setting: "Width",
    low: "100–320px — messaging apps",
    recommended: "480px",
    high: "640–1000px — high-res display",
  },
  {
    setting: "Quality",
    low: "Low — smallest file",
    recommended: "Medium",
    high: "HD — sharpest colours",
  },
  {
    setting: "Duration (image)",
    low: "100–200ms — fast flash",
    recommended: "500ms",
    high: "1000ms+ — slow loop",
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
export default function GifMakerPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <Clapperboard size={14} />
          Free GIF Tool
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          GIF Maker
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Create animated GIFs from videos or images instantly. Trim clips, set
          FPS, control quality, reverse playback, and share — all from your
          browser. Free, no watermark, no signup required.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "Video to GIF",
            "Image to GIF",
            "Reverse Mode",
            "No Watermark",
            "Direct Share",
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
      <GifConverterTools />

      {/* ── What is a GIF — Direct Intent ────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-6"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Create Animated GIFs from Video or Images
        </h2>
        <p className="text-gray-600 leading-relaxed">
          GIFs are the web's universal animation format — they loop
          automatically, require no player, work natively in emails, chat apps,
          and social media posts, and are supported on every device and
          platform. Whether you're creating a reaction clip, a product
          demonstration, a meme, or an animated thumbnail, this tool handles it.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The tool operates in two modes. Video mode takes any short video clip,
          lets you trim to the exact segment you want, and converts it to an
          optimised animated GIF with full control over frame rate, output size,
          quality, and playback direction. Image mode creates a GIF from a
          single image with a configurable loop duration — useful for animated
          thumbnails and flashing effects.
        </p>

        {/* Two mode callout cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {modes.map((mode) => (
            <div
              key={mode.title}
              className={`relative rounded-2xl bg-gradient-to-br ${mode.bg} border ${mode.border} p-5 overflow-hidden`}
            >
              <div
                className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl pointer-events-none"
                style={{ backgroundColor: `${mode.color}15` }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: mode.color }}>{mode.icon}</span>
                  <p
                    className="font-black text-sm"
                    style={{ color: mode.color }}
                  >
                    {mode.title}
                  </p>
                </div>
                <ul className="space-y-1.5 mb-4">
                  {mode.settings.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 text-xs text-gray-600"
                    >
                      <CheckCircle2
                        size={12}
                        className="mt-0.5 shrink-0"
                        style={{ color: mode.color }}
                      />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Best for:{" "}
                  <span className="text-gray-600 normal-case font-normal tracking-normal">
                    {mode.bestFor}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Settings reference table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Settings reference guide
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["Setting", "Low value", "Recommended", "High value"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 font-bold text-[#5b32b4] text-xs uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {settingsRef.map((row, i) => (
                  <tr
                    key={row.setting}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-black text-[#5b32b4] text-xs uppercase tracking-wide">
                      {row.setting}
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">
                      {row.low}
                    </td>
                    <td className="px-5 py-3 font-bold text-[#c3003a] text-xs">
                      {row.recommended}
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">
                      {row.high}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── How to Use (video mode) ──────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="howto-heading"
      >
        <div className="text-center space-y-3">
          <h2
            id="howto-heading"
            className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
          >
            How to Create a GIF from a Video
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Full creative control. Under 30 seconds for most clips.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {videoSteps.map((step) => (
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

        {/* Image mode callout */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] to-white border border-[#5b32b4]/20 p-6 overflow-hidden">
          <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[#5b32b4]/8 blur-2xl pointer-events-none" />
          <div className="relative flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#f3ecff] flex items-center justify-center shrink-0">
              <Timer size={18} className="text-[#5b32b4]" />
            </div>
            <div>
              <p className="font-bold text-[#5b32b4] text-sm mb-1">
                Creating a GIF from an image
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Upload any image file. Set the Frame Duration (in milliseconds)
                — 500ms is a comfortable default. Click Generate GIF to create a
                single-frame looping GIF. This is ideal for animated thumbnails,
                flashing banners, or preparing images for platforms that treat
                GIFs differently from static images.
              </p>
            </div>
          </div>
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
            Why Use the Snappy-Fix GIF Maker?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            More control than a basic converter. Faster than desktop software.
            Free with no limits.
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
            Everything you need to know about creating and sharing animated
            GIFs.
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
      <OtherToolsSection currentSlug="gif-maker" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
