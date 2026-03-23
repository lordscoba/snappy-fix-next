"use client";

import { useState } from "react";
import ImageColorEffectTools from "@/components/tools/ImageColorEffectTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Palette,
  Sliders,
  Sparkles,
  Filter,
  ShieldCheck,
  Download,
  Globe,
  Zap,
  Sun,
  Contrast,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What is the difference between a LUT filter and a mood preset?",
    answer:
      "LUT (Look-Up Table) filters are the industry-standard colour grading technique used in professional film and photography post-production — Clarendon, Lark, Gingham, Juno, and Teal & Orange are examples of LUT-based grades that remap colour values to produce a specific cinematic look. Mood presets (Vintage, Noir, Cyberpunk, Warm, Cool, Dramatic, Faded) are curated combinations of multiple adjustments — brightness, contrast, saturation, and temperature — tuned to produce a specific emotional atmosphere. Both can be combined with manual slider adjustments for full creative control.",
  },
  {
    question: "What do the manual adjustment sliders control?",
    answer:
      "The six manual sliders give you precise control over individual colour channels: Brightness adjusts the overall luminance of the image (0–2 range, default 1). Contrast controls the difference between light and dark areas (0–2). Saturation controls colour intensity — lower values move toward greyscale, higher values boost vividness (0–2). Hue rotates all colours around the colour wheel (-180° to +180°). Exposure adjusts the sensor-level light intensity (-2 to +2). Temperature shifts the overall colour tone warm (orange) or cool (blue) (-100 to +100).",
  },
  {
    question: "Can I combine a LUT filter with manual adjustments?",
    answer:
      "Yes. You can select a LUT filter or mood preset and then fine-tune the result with any of the six manual sliders — brightness, contrast, saturation, hue, exposure, and temperature. This mirrors professional colour grading workflows where a base LUT is applied and then refined to taste. Click Apply Grade to process the combined effect.",
  },
  {
    question: "What are the cinematic LUT filters available?",
    answer:
      "The tool includes 8 professional LUT filters: Clarendon (strong contrast, cool shadows), Lark (lifted shadows, cool and airy), Gingham (faded, desaturated vintage), Juno (warm tones, boosted greens), Reyes (washed-out vintage warmth), Teal & Orange (cinematic split-tone, the most popular Hollywood colour grade), Matrix (green-tinted digital aesthetic), and Film (natural film stock emulation).",
  },
  {
    question: "What mood presets are available?",
    answer:
      "There are 7 mood presets: Vintage (warm, faded, high contrast with lifted blacks), Cool (desaturated, blue-shifted tones), Warm (orange-golden warmth boost), Dramatic (high contrast, deep shadows), Noir (high contrast black and white tonal treatment), Cyberpunk (high saturation with cool-to-warm split tones), and Faded (lifted blacks, reduced contrast, muted palette).",
  },
  {
    question: "Does applying effects reduce my image quality?",
    answer:
      "Colour grading adjustments (brightness, contrast, saturation, hue, temperature, exposure) and LUT filters are applied to the pixel colour values and do not re-compress the image. The output quality depends on the format of your original upload. For best results, use high-resolution JPG or PNG source files and download the processed result promptly.",
  },
  {
    question:
      "Can I use this tool for product photography and content creation?",
    answer:
      "Yes — the tool is well-suited for product photography colour correction, social media content grading, blog imagery enhancement, and portfolio work. The Teal & Orange LUT and the Dramatic preset in particular are widely used in product and lifestyle photography. The manual sliders let you match a specific brand colour temperature or create a consistent visual style across a series of images.",
  },
  {
    question:
      "Is the Image Color Effects Editor free and does it add a watermark?",
    answer:
      "Yes — completely free with no usage limits and no watermark on the processed output. Download your colour-graded images at full quality with no added branding.",
  },
  {
    question: "What image formats can I upload for colour grading?",
    answer:
      "The tool accepts all standard web image formats: JPG, JPEG, PNG, WebP, GIF, and BMP. For professional colour grading results, JPG and PNG with high original quality produce the best output. The processed result is returned as a high-quality image blob which you can download directly from the workbench.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Filter size={20} className="text-[#c3003a]" />,
    title: "8 cinematic LUT filters",
    description:
      "Professional-grade LUT filters used in film and photography post-production — including Teal & Orange, Clarendon, Lark, and Film stock emulation.",
  },
  {
    icon: <Sparkles size={20} className="text-[#5b32b4]" />,
    title: "7 mood presets",
    description:
      "One-click creative presets: Vintage, Noir, Cyberpunk, Warm, Cool, Dramatic, and Faded — each tuned for a specific emotional atmosphere.",
  },
  {
    icon: <Sliders size={20} className="text-[#c3003a]" />,
    title: "6 manual adjustment sliders",
    description:
      "Fine-tune brightness, contrast, saturation, hue, exposure, and temperature independently for precise control over every colour channel.",
  },
  {
    icon: <Zap size={20} className="text-[#5b32b4]" />,
    title: "Combine presets and sliders",
    description:
      "Apply a LUT or preset as a base grade, then refine with manual sliders — the same workflow professional colourists use in post-production.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#c3003a]" />,
    title: "No watermark, no limits",
    description:
      "Download your colour-graded images at full quality with no watermark, no account required, and no daily usage limits.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive workbench — colour grade photos on desktop, laptop, tablet, or smartphone from any modern browser.",
  },
];

// ─── Presets and LUTs reference ───────────────────────────────────────────────
const presets = [
  { name: "Vintage", description: "Warm, faded, high contrast, lifted blacks" },
  { name: "Cool", description: "Desaturated, blue-shifted, airy tones" },
  { name: "Warm", description: "Golden-orange warmth, boosted vibrancy" },
  {
    name: "Dramatic",
    description: "High contrast, deep shadows, rich colours",
  },
  { name: "Noir", description: "High contrast monochrome tonal treatment" },
  {
    name: "Cyberpunk",
    description: "High saturation, cool-to-warm split tones",
  },
  {
    name: "Faded",
    description: "Lifted blacks, reduced contrast, muted palette",
  },
];

const luts = [
  {
    name: "Clarendon",
    description: "Strong contrast, cool shadows, rich colour",
  },
  { name: "Lark", description: "Lifted shadows, cool and airy feel" },
  { name: "Gingham", description: "Faded, desaturated vintage warmth" },
  { name: "Juno", description: "Warm tones with boosted greens" },
  { name: "Reyes", description: "Washed-out vintage warmth" },
  {
    name: "Teal & Orange",
    description: "The signature Hollywood cinematic grade",
  },
  { name: "Matrix", description: "Green-tinted digital dystopia aesthetic" },
  { name: "Film", description: "Natural analogue film stock emulation" },
];

// ─── Manual sliders reference ─────────────────────────────────────────────────
const sliders = [
  {
    name: "Brightness",
    range: "0 – 2",
    default: "1",
    icon: <Sun size={13} />,
    tip: "Increase to lighten the overall image, decrease to darken",
  },
  {
    name: "Contrast",
    range: "0 – 2",
    default: "1",
    icon: <Contrast size={13} />,
    tip: "Higher values separate lights and shadows more aggressively",
  },
  {
    name: "Saturation",
    range: "0 – 2",
    default: "1",
    icon: <Palette size={13} />,
    tip: "0 = greyscale, 1 = natural, 2 = vivid",
  },
  {
    name: "Hue",
    range: "-180° – +180°",
    default: "0",
    icon: <Filter size={13} />,
    tip: "Rotates all colours around the colour wheel",
  },
  {
    name: "Exposure",
    range: "-2 – +2",
    default: "0",
    icon: <Sparkles size={13} />,
    tip: "Simulates camera sensor exposure compensation",
  },
  {
    name: "Temperature",
    range: "-100 – +100",
    default: "0",
    icon: <Zap size={13} />,
    tip: "Negative = cooler blue tones, positive = warmer orange tones",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      'Drag and drop your photo onto the large workbench upload zone or click "Drop your masterpiece" to browse. The workbench loads your image immediately with a live preview.',
  },
  {
    number: "02",
    title: "Choose a LUT filter or mood preset",
    description:
      "Select a LUT filter from the library (Clarendon, Teal & Orange, Film, etc.) for a cinematic colour grade, or choose a mood preset (Vintage, Noir, Cyberpunk, etc.) for a one-click creative look. Only one can be active at a time.",
  },
  {
    number: "03",
    title: "Fine-tune with manual sliders",
    description:
      "Use the Adjustments panel on the right to refine brightness, contrast, saturation, hue, exposure, and temperature independently. These work alongside or instead of any preset or LUT you have selected.",
  },
  {
    number: "04",
    title: "Apply and download",
    description:
      'Click "Apply Grade" to process the effect. The workbench replaces the preview with your graded result. Click "Download Result" or the download icon overlay to save the colour-graded image to your device.',
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
export default function ImageColorEffectsPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <Palette size={14} />
          Professional Colour Grading
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Image Color Effects Editor
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Apply professional cinematic LUT filters, creative mood presets, and
          precise manual colour adjustments to any photo — instantly, in your
          browser. Free, no watermark, no software required.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "8 LUT Filters",
            "7 Mood Presets",
            "6 Manual Sliders",
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

      {/* ── Tool Component ──────────────────────────────────── */}
      <ImageColorEffectTools />

      {/* ── What is colour grading — Direct Intent ───────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Professional Colour Grading — In Your Browser
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Colour grading is the process of altering or enhancing the colour of
          images to convey a specific mood, match a visual style, or create a
          consistent aesthetic across a series of photos. It is the final step
          in every professional photography and film post-production workflow —
          and until now, it required expensive software like DaVinci Resolve,
          Adobe Lightroom, or Photoshop.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This tool brings the same techniques to your browser. LUT filters
          apply industry-standard colour remapping used in cinema and
          photography. Mood presets combine multiple adjustments for one-click
          creative looks. Six manual sliders let you control every major colour
          channel independently — and all three systems can be used together for
          fully custom results.
        </p>

        {/* LUTs + Presets side-by-side tables */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* LUT table */}
          <div className="rounded-2xl border border-[#e9e1ff] overflow-hidden">
            <div className="bg-[#f3ecff] px-5 py-3 flex items-center gap-2">
              <Filter size={14} className="text-[#5b32b4]" />
              <span className="text-xs font-black text-[#5b32b4] uppercase tracking-wider">
                LUT Cinematic Filters
              </span>
            </div>
            <div className="divide-y divide-[#f0ebff]">
              {luts.map((lut, i) => (
                <div
                  key={lut.name}
                  className={`flex justify-between px-5 py-3 ${i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}`}
                >
                  <span className="text-xs font-black text-[#5b32b4]">
                    {lut.name}
                  </span>
                  <span className="text-xs text-gray-500 text-right max-w-[55%]">
                    {lut.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Presets table */}
          <div className="rounded-2xl border border-[#e9e1ff] overflow-hidden">
            <div className="bg-[#fff5f9] px-5 py-3 flex items-center gap-2">
              <Sparkles size={14} className="text-[#c3003a]" />
              <span className="text-xs font-black text-[#c3003a] uppercase tracking-wider">
                Mood Presets
              </span>
            </div>
            <div className="divide-y divide-[#ffe8f3]">
              {presets.map((preset, i) => (
                <div
                  key={preset.name}
                  className={`flex justify-between px-5 py-3 ${i % 2 === 0 ? "bg-white" : "bg-[#fff9fb]"}`}
                >
                  <span className="text-xs font-black text-[#c3003a]">
                    {preset.name}
                  </span>
                  <span className="text-xs text-gray-500 text-right max-w-[55%]">
                    {preset.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Manual sliders table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base flex items-center gap-2">
            <Sliders size={16} className="text-[#5b32b4]" />
            Manual adjustment sliders reference
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["Slider", "Range", "Default", "What it does"].map((h) => (
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
                {sliders.map((s, i) => (
                  <tr
                    key={s.name}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-black text-[#5b32b4] text-xs flex items-center gap-1.5">
                      <span className="text-[#c3003a]">{s.icon}</span>
                      {s.name}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-500 font-mono">
                      {s.range}
                    </td>
                    <td className="px-5 py-3 text-xs font-bold text-[#c3003a]">
                      {s.default}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-500">{s.tip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  "Photographers grading portrait and product shots",
                  "Content creators building consistent Instagram aesthetics",
                  "Bloggers matching image tones to brand guidelines",
                  "Social media managers editing campaign visuals",
                  "Designers creating mood boards and style references",
                  "Developers previewing colour treatment before production",
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
                Most popular use cases:
              </p>
              <ul className="space-y-2">
                {[
                  "Teal & Orange LUT for product and lifestyle photography",
                  "Vintage preset for editorial and travel images",
                  "Noir preset for dramatic portrait shots",
                  "Film LUT for natural, analogue-quality results",
                  "Temperature slider to correct white balance issues",
                  "Cyberpunk preset for tech and gaming content",
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
            How to Colour Grade Your Image
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Full creative control. Professional results.
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
            Why Use the Snappy-Fix Color Effects Editor?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Professional-grade colour science in your browser — no software, no
            subscription, no limits.
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
            Everything you need to know about LUT filters, mood presets, and
            manual colour adjustments.
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
      <OtherToolsSection currentSlug="image-color-effects" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
