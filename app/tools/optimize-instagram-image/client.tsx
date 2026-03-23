"use client";

import { useState } from "react";
import InstagramOptimizerTool from "@/components/tools/InstagramOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Instagram,
  Zap,
  ShieldCheck,
  Download,
  Globe,
  ImageIcon,
  TrendingUp,
  Smartphone,
  LayoutGrid,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question:
      "Why does Instagram compress my photos and make them look blurry?",
    answer:
      "Instagram automatically re-compresses every image uploaded to the platform to reduce storage and bandwidth costs. If your image is not already optimised to Instagram's preferred specifications — correct dimensions, aspect ratio, file size, and compression level — Instagram's re-compression is more aggressive and produces visible quality loss: blurry edges, colour banding, and reduced sharpness. Optimising your image to Instagram's specifications before uploading means Instagram's re-compression is minimal and your photo retains its clarity.",
  },
  {
    question: "What does this tool actually do to my image?",
    answer:
      "The tool applies Instagram-specific optimisation to your image: it adjusts dimensions to align with Instagram's recommended pixel specifications, applies compression tuned to the quality level Instagram accepts without triggering heavy re-compression, and ensures the output file size and encoding match what Instagram expects. The result is an image that uploads to Instagram with the least possible quality degradation from the platform's processing pipeline.",
  },
  {
    question: "What are the correct image sizes for Instagram?",
    answer:
      "Instagram's recommended sizes are: Square post — 1080×1080 px (1:1 ratio). Portrait post — 1080×1350 px (4:5 ratio, shows largest in feed). Landscape post — 1080×566 px (1.91:1 ratio). Stories and Reels — 1080×1920 px (9:16 ratio). Profile photo — 320×320 px (displayed as circle). Instagram accepts images up to 8MB but compresses anything above its internal thresholds. The tool optimises to these specifications automatically.",
  },
  {
    question:
      "Do I need to know Instagram's size requirements to use this tool?",
    answer:
      "No — that is the point of this tool. You upload your image and click one button. The tool handles the aspect ratio, dimensions, compression, and file size automatically based on Instagram's current specifications. There are no settings to configure and no need to look up the correct pixel dimensions yourself.",
  },
  {
    question: "Will optimising the image change its aspect ratio?",
    answer:
      "The tool optimises your image to Instagram-compatible specifications. If your image's aspect ratio falls outside Instagram's accepted range (between 1.91:1 and 4:5), it may be adjusted to the nearest Instagram-compatible ratio. For images already within Instagram's accepted range, the original composition is preserved and only compression and quality settings are adjusted.",
  },
  {
    question:
      "Why does my image look different on Instagram versus my phone gallery?",
    answer:
      "Phone cameras capture images in their native sensor resolution and colour space — often 4000px+ wide in RAW or high-quality JPEG. Instagram displays images at a maximum of 1080px wide and converts colour profiles to sRGB for web display. The difference between your camera's output and Instagram's display format is where quality loss occurs. This tool bridges that gap by preparing your image specifically for Instagram's display and encoding requirements before it ever reaches the platform.",
  },
  {
    question: "Does this tool work for Instagram Reels thumbnails?",
    answer:
      "Yes. The tool optimises for Instagram's video and Reel cover image specifications as well as standard post and story formats. Upload your cover thumbnail image and the tool will prepare it for Instagram's requirements.",
  },
  {
    question:
      "Is the Instagram image optimiser free and does it add a watermark?",
    answer:
      "Yes — completely free with no usage limits and no watermark on the optimised output. Download your Instagram-ready image with no added branding.",
  },
  {
    question:
      "How is this different from just resizing the image to 1080px wide?",
    answer:
      "Simple resizing only changes pixel dimensions. This tool also applies Instagram-specific compression levels, optimises the encoding format, and targets the file size range that Instagram's systems accept with minimal re-compression. An image resized to 1080px but not otherwise optimised can still be heavily re-processed by Instagram — resulting in quality loss despite being the correct width.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Zap size={20} className="text-[#c3003a]" />,
    title: "One-click optimisation",
    description:
      "No settings to configure. Upload your image, click one button, and download an Instagram-ready file — the tool handles everything automatically.",
  },
  {
    icon: <TrendingUp size={20} className="text-[#5b32b4]" />,
    title: "Better quality on the feed",
    description:
      "Pre-optimising to Instagram's specs means less aggressive re-compression by the platform — resulting in sharper, clearer images in the feed.",
  },
  {
    icon: <LayoutGrid size={20} className="text-[#c3003a]" />,
    title: "Posts, Stories, and Reels",
    description:
      "Works for all Instagram content formats — feed posts, portrait posts, landscape posts, Stories, Reels, and cover thumbnails.",
  },
  {
    icon: <Smartphone size={20} className="text-[#5b32b4]" />,
    title: "Camera to Instagram ready",
    description:
      "Takes your phone camera's native resolution output — often 4000px+ wide — and processes it into the optimal Instagram upload format.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#c3003a]" />,
    title: "Private and secure",
    description:
      "Your image is processed securely and never permanently stored. Files are discarded after your download is ready.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Optimise images for Instagram on desktop, laptop, tablet, or smartphone from any modern browser without installing software.",
  },
];

// ─── Instagram format reference ───────────────────────────────────────────────
const formats = [
  {
    format: "Square Post",
    dims: "1080 × 1080 px",
    ratio: "1:1",
    use: "Standard feed posts, product shots",
  },
  {
    format: "Portrait Post",
    dims: "1080 × 1350 px",
    ratio: "4:5",
    use: "Shows largest in feed — best for engagement",
  },
  {
    format: "Landscape Post",
    dims: "1080 × 566 px",
    ratio: "1.91:1",
    use: "Wide photos, panoramas, banners",
  },
  {
    format: "Stories",
    dims: "1080 × 1920 px",
    ratio: "9:16",
    use: "Full-screen vertical stories",
  },
  {
    format: "Reels",
    dims: "1080 × 1920 px",
    ratio: "9:16",
    use: "Short-form video cover and thumbnails",
  },
  {
    format: "Profile Photo",
    dims: "320 × 320 px",
    ratio: "1:1",
    use: "Displayed as circle — keep subject centred",
  },
];

// ─── Why Instagram degrades quality ──────────────────────────────────────────
const degradationReasons = [
  {
    reason: "Wrong dimensions",
    detail: "Instagram scales non-standard sizes, adding blur",
  },
  {
    reason: "File too large",
    detail: "Forces heavy re-compression above internal limits",
  },
  {
    reason: "Wrong colour profile",
    detail: "Non-sRGB images get converted and shift in tone",
  },
  {
    reason: "Wrong aspect ratio",
    detail: "Instagram crops or adds padding, changing composition",
  },
  {
    reason: "Over-compressed source",
    detail: "Double-compression compounds artefacts",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      "Drag and drop your photo onto the upload zone or click to browse. Works with images from your phone camera, DSLR exports, Canva designs, or any other source. Supports JPG, PNG, and WebP.",
  },
  {
    number: "02",
    title: "Click Optimize for Instagram",
    description:
      "Hit the single button. There are no settings to configure — the tool automatically applies Instagram's recommended dimensions, compression level, and encoding for the best possible result.",
  },
  {
    number: "03",
    title: "Download your optimised image",
    description:
      'Click "Download Optimized Image" to save the Instagram-ready file. The filename includes a timestamp so it does not overwrite your original.',
  },
  {
    number: "04",
    title: "Upload directly to Instagram",
    description:
      "Upload the downloaded file directly to Instagram. Because it is already optimised, Instagram's re-compression is minimal — your photo appears in the feed at significantly better quality than an unoptimised upload.",
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
export default function InstagramOptimizerPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <ImageIcon size={14} />
          Instagram Image Tool
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Optimize Images for Instagram
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Stop Instagram from degrading your photos. Optimise images for
          Instagram posts, stories, and reels with one click — correct
          dimensions, compression, and encoding so your photos look sharp in the
          feed. Free, no watermark, no signup.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "One-Click Optimisation",
            "Posts · Stories · Reels",
            "No Watermark",
            "No Signup",
            "No Settings Needed",
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
      <InstagramOptimizerTool />

      {/* ── Direct Intent ────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Why Do Instagram Photos Look Blurry After Uploading?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Instagram re-compresses every image uploaded to the platform. When
          your image is not already optimised to Instagram's preferred
          specifications, their system applies more aggressive compression to
          reduce it to an acceptable size — and that compression introduces
          blurriness, colour banding, and loss of detail that was not in your
          original photo. The fix is simple: optimise the image to Instagram's
          specifications before you upload it, so Instagram's own compression
          has almost nothing left to do.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This tool does exactly that in one click. It adjusts your image to the
          dimensions, file size, compression level, and encoding that Instagram
          expects — so what you upload is already what Instagram wants, and your
          photo displays in the feed at the highest quality Instagram's platform
          allows.
        </p>

        {/* Why Instagram degrades quality */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Five reasons Instagram degrades photo quality
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
                          ? "linear-gradient(135deg, #5b32b4, #884bdf)"
                          : "linear-gradient(135deg, #fb397d, #e02d6b)",
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

        {/* Instagram format reference table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Instagram image size reference
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
                    <td className="px-5 py-3 font-bold text-[#5b32b4] text-sm">
                      {row.format}
                    </td>
                    <td className="px-5 py-3 text-xs font-black text-[#c3003a] font-mono">
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
                  "Content creators wanting sharper feed posts",
                  "Photographers sharing portfolio work on Instagram",
                  "Brands and businesses posting product images",
                  "Social media managers preparing client content",
                  "Influencers who notice blurry uploads after posting",
                  "Designers sharing creative work on the platform",
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
                  "When camera photos look blurry after uploading",
                  "When Canva or design exports look degraded on Instagram",
                  "Before posting high-detail product photography",
                  "Before sharing portrait shots where skin detail matters",
                  "Before posting text-based graphics where sharpness is critical",
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
            How to Optimize an Image for Instagram
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. One button. Instagram-ready in seconds.
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
            Why Use the Snappy-Fix Instagram Optimiser?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            One click. No settings. Better quality on the feed than unoptimised
            uploads every time.
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
            Everything you need to know about optimising images for Instagram
            and preventing quality loss on upload.
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
      <OtherToolsSection currentSlug="optimize-instagram-image" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
