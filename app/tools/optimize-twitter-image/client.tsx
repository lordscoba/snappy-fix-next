"use client";

import { useState } from "react";
import TwitterOptimizerTool from "@/components/tools/TwitterOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Twitter,
  Zap,
  ShieldCheck,
  Globe,
  ImageIcon,
  TrendingUp,
  Smartphone,
  LayoutGrid,
} from "lucide-react";

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "Why does Twitter / X compress my photos and reduce quality?",
    answer:
      "Twitter re-compresses every image uploaded to the platform to manage storage and bandwidth at scale. If your image exceeds Twitter's internal size thresholds — either in pixel dimensions or file size — their system applies aggressive compression that introduces blurriness, colour banding, and loss of detail. The tool pre-processes your image to 1600px longest side and compresses it to under 1MB using progressive JPEG encoding, which is exactly the specification Twitter accepts without triggering further re-compression.",
  },
  {
    question: "What does this tool actually do to my image?",
    answer:
      "The tool applies Twitter-specific optimisation: it resizes your image so the longest side is no greater than 1600 pixels (preserving aspect ratio), then compresses it to a target of 1000KB using a binary-search compression algorithm that finds the highest quality that still hits the size target. The output is a progressive JPEG — the format Twitter handles most efficiently — so your image loads quickly and displays sharply in the feed.",
  },
  {
    question: "What are the correct image sizes for Twitter / X posts?",
    answer:
      "Twitter's recommended image sizes: In-stream post image — 1200×675 px (16:9 ratio, shows without cropping in feed). In-stream tall image — 1200×1350 px (maximum tall ratio Twitter allows). Header banner — 1500×500 px (3:1 ratio). Profile photo — 400×400 px (displayed as circle). Twitter displays images up to 1600px wide and accepts files up to 5MB, but compresses anything above internal thresholds. This tool optimises to the 1600px / 1MB specification that triggers minimal re-compression.",
  },
  {
    question: "Does the tool change my image's aspect ratio?",
    answer:
      "No. The tool uses longest-side resizing — it scales your image proportionally so the longest dimension is 1600px, without changing the aspect ratio or cropping any content. If your image is already smaller than 1600px on its longest side, dimensions are left unchanged and only compression is applied.",
  },
  {
    question: "Why does progressive JPEG matter for Twitter?",
    answer:
      "A progressive JPEG loads in multiple passes — first a low-resolution version of the entire image, then progressively higher detail — rather than loading top-to-bottom like a standard JPEG. This means the image appears almost immediately in the feed while the full detail loads, which is better for engagement. Twitter's feed rendering pipeline also handles progressive JPEGs more efficiently, reducing the chance of additional re-compression.",
  },
  {
    question: "How is this different from just resizing my image to 1200×675?",
    answer:
      "Resizing to a specific dimension only addresses one factor. This tool also compresses to the correct file size target (under 1MB), uses progressive JPEG encoding, and converts transparency correctly before processing. An image resized to 1200×675 but still 4MB in file size will still be heavily re-compressed by Twitter — resulting in visible quality loss despite being the right dimensions.",
  },
  {
    question: "Does this tool work for Twitter header images?",
    answer:
      "Yes. Upload your header image (ideally 1500×500 px) and the tool will optimise it to Twitter's file size and encoding requirements. The longest-side resize preserves your header's wide aspect ratio — a 1500px-wide header is already within the 1600px threshold, so dimensions are preserved and only compression is applied.",
  },
  {
    question:
      "Is the Twitter image optimizer free and does it add a watermark?",
    answer:
      "Yes — completely free with no usage limits and no watermark on the optimised output. Download your Twitter-ready image with no added branding.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Zap size={20} className="text-[#fb397d]" />,
    title: "One-click optimisation",
    description:
      "No settings. Upload your image, click one button, download a Twitter-ready file. The tool handles dimensions, compression, and encoding automatically.",
  },
  {
    icon: <TrendingUp size={20} className="text-[#5b32b4]" />,
    title: "Sharper images in the feed",
    description:
      "Pre-optimising to 1600px / 1MB means Twitter's re-compression is minimal — your photo displays at the highest quality the platform allows.",
  },
  {
    icon: <ImageIcon size={20} className="text-[#fb397d]" />,
    title: "Progressive JPEG output",
    description:
      "Output uses progressive JPEG encoding — images appear almost instantly in the feed while full detail loads, improving perceived performance and engagement.",
  },
  {
    icon: <Smartphone size={20} className="text-[#5b32b4]" />,
    title: "Posts and headers",
    description:
      "Works for in-stream post images, tall posts, and header banners. Aspect ratio is always preserved — nothing is cropped.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#fb397d]" />,
    title: "Private and secure",
    description:
      "Your image is processed securely and never permanently stored. Files are discarded after your download is ready.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive — optimise images for Twitter on desktop, laptop, tablet, or smartphone from any modern browser.",
  },
];

// ─── Twitter format reference ─────────────────────────────────────────────────
const formats = [
  {
    format: "In-stream post (landscape)",
    dims: "1200 × 675 px",
    ratio: "16:9",
    use: "Standard posts — displays without cropping in feed",
  },
  {
    format: "In-stream post (tall)",
    dims: "1200 × 1350 px",
    ratio: "4:5",
    use: "Maximum tall ratio Twitter allows in feed",
  },
  {
    format: "In-stream post (square)",
    dims: "1080 × 1080 px",
    ratio: "1:1",
    use: "Square images — shows full without cropping",
  },
  {
    format: "Header / banner",
    dims: "1500 × 500 px",
    ratio: "3:1",
    use: "Profile header — above bio on profile page",
  },
  {
    format: "Profile photo",
    dims: "400 × 400 px",
    ratio: "1:1",
    use: "Displayed as circle — keep subject centred",
  },
  {
    format: "Tool output (optimised)",
    dims: "≤ 1600px longest side",
    ratio: "Preserved",
    use: "Minimal re-compression by Twitter's pipeline",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      "Drag and drop your photo onto the upload zone or click to browse. Works with images from phone cameras, DSLR exports, Canva designs, or screenshots. Supports JPG, PNG, and WebP.",
  },
  {
    number: "02",
    title: "Click Optimize for Twitter",
    description:
      "Hit the single button. No settings needed — the tool automatically resizes to 1600px longest side, compresses to under 1MB, and encodes as progressive JPEG.",
  },
  {
    number: "03",
    title: "Download your optimised image",
    description:
      'Click "Download Optimized Image" to save the Twitter-ready JPEG. The filename includes a timestamp so it does not overwrite your original.',
  },
  {
    number: "04",
    title: "Upload directly to Twitter / X",
    description:
      "Upload the downloaded file to Twitter. Because it already meets Twitter's specifications, re-compression is minimal — your photo appears in the feed sharper than an unoptimised upload.",
  },
];

// ─── Why Twitter degrades quality ────────────────────────────────────────────
const degradationReasons = [
  {
    reason: "File too large",
    detail:
      "Triggers aggressive re-compression above Twitter's 1MB internal threshold",
  },
  {
    reason: "Wrong dimensions",
    detail: "Twitter scales non-standard sizes, adding interpolation blur",
  },
  {
    reason: "Baseline JPEG",
    detail:
      "Baseline JPEGs load slower and compress less efficiently than progressive",
  },
  {
    reason: "Wrong colour profile",
    detail: "Non-sRGB colour spaces get converted and shift in tone",
  },
  {
    reason: "Transparency (PNG)",
    detail: "PNGs with alpha get converted with potential quality loss",
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
export default function TwitterOptimizerPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <ImageIcon size={14} />
          Twitter / X Image Tool
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Optimize Images for Twitter
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Stop Twitter from degrading your photos. One-click optimisation to
          1600px and under 1MB using progressive JPEG — the specification
          Twitter accepts with minimal re-compression. Free, no watermark, no
          signup.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "Progressive JPEG",
            "1600px / 1MB Target",
            "Aspect Ratio Preserved",
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

      <TwitterOptimizerTool />

      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="intent-heading"
      >
        <h2
          id="intent-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Why Twitter Degrades Your Photos — and How to Stop It
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Twitter re-compresses every image uploaded to the platform. When your
          image does not already meet Twitter's internal specifications — file
          size under 1MB, dimensions within 1600px, progressive JPEG encoding —
          their system applies its own compression, and the result is a
          blurrier, less saturated version of your original photo.
          Pre-optimising eliminates most of this degradation by giving Twitter
          an image it can use without any further processing.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The tool uses the same compression target Twitter's own upload system
          is calibrated around: longest side 1600px, file size under 1MB,
          progressive JPEG. Upload your image and the result is ready to post
          with maximum possible quality on the platform.
        </p>

        {/* Why Twitter degrades quality */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Five reasons Twitter degrades photo quality
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {degradationReasons.map((r, i) => (
              <div
                key={r.reason}
                className="rounded-2xl border border-[#e9e1ff] bg-gradient-to-br from-white to-[#faf7ff] p-4"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0"
                    style={{
                      background:
                        i % 2 === 0
                          ? "linear-gradient(135deg,#5b32b4,#884bdf)"
                          : "linear-gradient(135deg,#fb397d,#e02d6b)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <p className="font-bold text-[#2b1d3a] text-xs">{r.reason}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed pl-7">
                  {r.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Format table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Twitter / X image size reference
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["Format", "Dimensions", "Ratio", "Best for"].map((h) => (
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
                {formats.map((row, i) => (
                  <tr
                    key={row.format}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-bold text-[#5b32b4] text-xs">
                      {row.format}
                    </td>
                    <td className="px-5 py-3 text-xs font-black text-[#fb397d] font-mono">
                      {row.dims}
                    </td>
                    <td className="px-5 py-3 text-xs font-bold text-[#2b1d3a]">
                      {row.ratio}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.use}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Value intent */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                Who uses this tool:
              </p>
              <ul className="space-y-2">
                {[
                  "Content creators who notice blurry photos after posting",
                  "Brands and businesses sharing product images on Twitter",
                  "Social media managers preparing client content at scale",
                  "Journalists and bloggers attaching images to news posts",
                  "Photographers sharing portfolio work on the platform",
                  "Marketing teams posting campaign visuals",
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
                When to optimise before posting:
              </p>
              <ul className="space-y-2">
                {[
                  "Every time — all images benefit from pre-optimisation",
                  "When camera exports look blurry after uploading to Twitter",
                  "Before sharing high-detail product or event photography",
                  "When Canva or design exports appear degraded in the feed",
                  "Before posting text-based graphics where sharpness is critical",
                  "When posting on mobile where upload size varies",
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

      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="howto-heading"
      >
        <div className="text-center space-y-3">
          <h2
            id="howto-heading"
            className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
          >
            How to Optimize an Image for Twitter
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. One button. Twitter-ready in seconds.
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
            Why Use the Snappy-Fix Twitter Optimizer?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            One click. Progressive JPEG. Better quality in the feed every time.
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
            Everything about optimising images for Twitter and preventing
            quality loss on upload.
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

      <OtherToolsSection currentSlug="optimize-twitter-image" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
