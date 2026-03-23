"use client";

import { useState } from "react";
import ImageConverterTool from "@/components/tools/ImageConverterTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  ArrowLeftRight,
  Zap,
  ShieldCheck,
  Download,
  Globe,
  FileImage,
  Layers,
  MonitorSmartphone,
  Film,
} from "lucide-react";

const faqs = [
  {
    question: "What image formats can I convert to?",
    answer:
      "The tool supports 10 output formats: PNG (lossless, transparent backgrounds), JPEG/JPG (small file size, universal support), WebP (modern web format, smaller than JPEG at equal quality), AVIF (next-generation format, best compression), BMP (uncompressed, Windows native), TIFF/TIF (print and archival quality), GIF (animation-capable, limited colour palette), and ICO (favicon and Windows icon format). Choose the format that best matches your use case — WebP and AVIF for web performance, PNG for design work, TIFF for print.",
  },
  {
    question: "What is the difference between WebP and AVIF?",
    answer:
      "Both are modern image formats designed to replace JPEG and PNG on the web. WebP was created by Google and is supported by all modern browsers — it produces files 25–35% smaller than JPEG at equivalent quality. AVIF is newer, created by the Alliance for Open Media, and achieves even better compression — typically 50% smaller than JPEG. AVIF has slightly less browser support than WebP (no support in older Safari versions) but is the better choice for cutting-edge performance. For maximum compatibility, use WebP. For maximum compression on supported platforms, use AVIF.",
  },
  {
    question: "Will converting between formats reduce my image quality?",
    answer:
      "Converting between lossless formats (PNG → BMP, PNG → TIFF) involves no quality loss. Converting from a lossless to a lossy format (PNG → JPEG, PNG → WebP) applies compression at quality 90 — at this level, the difference from the original is virtually invisible. Converting from one lossy format to another (JPEG → WebP) involves a re-encoding step which may introduce very minor quality changes, but at quality 90 the result is visually indistinguishable. Converting from lossy back to lossless (JPEG → PNG) does not recover lost detail — the PNG will be lossless from that point forward but cannot restore data that JPEG compression already discarded.",
  },
  {
    question: "When should I use PNG versus JPEG?",
    answer:
      "Use PNG when your image has a transparent background, contains text or sharp graphics, is a logo or icon, or needs pixel-perfect quality for design use. PNG is lossless — every pixel is preserved exactly. Use JPEG for photographs, product shots, and any image where colour gradients matter more than sharp edges. JPEG applies lossy compression which reduces file size significantly — a 5MB PNG photograph can become a 400KB JPEG with no visible quality difference at screen resolution.",
  },
  {
    question: "What is ICO format and when do I need it?",
    answer:
      "ICO is the Windows icon format, most commonly used for website favicons (the small icon in the browser tab) and Windows application icons. If you need a favicon and do not want to use the dedicated Favicon Generator tool, converting your logo PNG to ICO via this converter gives you a multi-resolution ICO file. The converter embeds five resolution layers: 16×16, 32×32, 64×64, 128×128, and 256×256 pixels — all in a single .ico file. For the most complete favicon package including a dark mode variant, social preview, and PWA manifest, use the dedicated Favicon Generator tool.",
  },
  {
    question: "Can I convert an animated GIF?",
    answer:
      "Yes — animated GIFs are handled specially. When converting an animated GIF to GIF output, the tool preserves all frames and the animation timing, re-encoding each frame and maintaining the loop. When converting an animated GIF to a non-animated format (PNG, JPEG, WebP), only the first frame is used for the output. If you need to create a new animated GIF from a video clip, use the dedicated GIF Maker tool.",
  },
  {
    question: "What is the maximum file size I can upload?",
    answer:
      "The tool accepts image files up to 10MB. This covers the vast majority of web images, photos, and design assets. For very large print-resolution files (20MB+), consider resizing the image first before converting to ensure fast processing.",
  },
  {
    question: "Does converting an image change its dimensions?",
    answer:
      "No. Format conversion preserves the original pixel dimensions of your image. A 1920×1080 JPEG converted to WebP will still be 1920×1080 — only the file format and compression method change. If you need to resize as well as convert, use the image resizer tool before or after converting.",
  },
  {
    question: "Is the image converter free and does it add a watermark?",
    answer:
      "Yes — the Snappy-Fix Image Converter is completely free with no usage limits and no watermark on converted images. Convert as many images as you need across all supported formats at no cost.",
  },
  {
    question: "Which format should I use for website images?",
    answer:
      "For modern web performance, use WebP as your primary web image format — it is supported by all modern browsers and reduces page load times significantly. Use AVIF for platforms where you can control browser requirements and want the smallest possible file sizes. Use JPEG for photographs on older platforms or email. Use PNG only when you need transparency or lossless quality. Avoid BMP, TIFF, and GIF for web use — BMP and TIFF are uncompressed and too large, and GIF's 256-colour palette makes it unsuitable for photographs.",
  },
];

const benefits = [
  {
    icon: <Layers size={20} className="text-[#fb397d]" />,
    title: "10 output formats",
    description:
      "PNG, JPEG, WebP, AVIF, BMP, TIFF, GIF, ICO — the widest format coverage of any free online converter, including next-generation formats.",
  },
  {
    icon: <Film size={20} className="text-[#5b32b4]" />,
    title: "Animated GIF preserved",
    description:
      "Animated GIFs converted to GIF output retain all frames and animation timing — not just the first frame.",
  },
  {
    icon: <FileImage size={20} className="text-[#fb397d]" />,
    title: "Quality 90 for lossy formats",
    description:
      "JPEG, WebP, and AVIF conversions use quality 90 — visually indistinguishable from the source at normal viewing sizes.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#5b32b4]" />,
    title: "Secure processing",
    description:
      "Your image is uploaded securely and not permanently stored after conversion. Files are processed and returned to your browser only.",
  },
  {
    icon: <Zap size={20} className="text-[#fb397d]" />,
    title: "Instant conversion",
    description:
      "Upload, select format, convert, and download in seconds. No processing queue, no waiting, no email delivery.",
  },
  {
    icon: <MonitorSmartphone size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive — convert image formats on desktop, laptop, tablet, or smartphone from any modern browser without installing software.",
  },
];

const formats = [
  {
    format: "WebP",
    type: "Lossy / Lossless",
    bestFor: "Web images, social media",
    size: "★★★★★",
    support: "All modern browsers",
  },
  {
    format: "AVIF",
    type: "Lossy / Lossless",
    bestFor: "Next-gen web performance",
    size: "★★★★★+",
    support: "Chrome, Firefox, newer Safari",
  },
  {
    format: "JPEG",
    type: "Lossy",
    bestFor: "Photographs, email, wide compat.",
    size: "★★★★",
    support: "Universal",
  },
  {
    format: "PNG",
    type: "Lossless",
    bestFor: "Logos, transparency, design",
    size: "★★",
    support: "Universal",
  },
  {
    format: "GIF",
    type: "Lossless (256 colours)",
    bestFor: "Animations — frames preserved",
    size: "★★★",
    support: "Universal",
  },
  {
    format: "BMP",
    type: "Uncompressed",
    bestFor: "Windows native, archival",
    size: "★",
    support: "Windows / most apps",
  },
  {
    format: "TIFF",
    type: "Lossless",
    bestFor: "Print, professional photography",
    size: "★",
    support: "Desktop apps, print workflows",
  },
  {
    format: "ICO",
    type: "Lossless",
    bestFor: "Favicons (5-layer: 16–256px)",
    size: "★★★",
    support: "All browsers (favicon)",
  },
];

const conversions = [
  {
    from: "PNG",
    to: "WebP",
    why: "Reduce file size for web without losing transparency",
  },
  {
    from: "JPEG",
    to: "WebP",
    why: "Smaller files at same visual quality for faster pages",
  },
  {
    from: "PNG",
    to: "JPEG",
    why: "Dramatically reduce file size for photographs",
  },
  {
    from: "JPEG",
    to: "PNG",
    why: "Get a lossless copy for editing in design tools",
  },
  { from: "PNG", to: "AVIF", why: "Maximum compression for modern browsers" },
  {
    from: "PNG",
    to: "ICO",
    why: "Create a multi-resolution favicon from your logo",
  },
  { from: "JPEG", to: "TIFF", why: "Convert to print-ready format" },
  {
    from: "GIF",
    to: "GIF",
    why: "Re-encode animated GIF — all frames preserved",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      "Drag and drop any image file onto the upload zone or click to browse your device. Accepts PNG, JPG, WebP, BMP, TIFF, GIF (including animated), ICO, AVIF, and other standard image formats up to 10MB.",
  },
  {
    number: "02",
    title: "Select the output format",
    description:
      "Choose your target format from the dropdown — PNG, JPEG, WebP, AVIF, BMP, TIFF, GIF, or ICO. If you are unsure which to choose, see the format reference table below.",
  },
  {
    number: "03",
    title: "Click Convert Now",
    description:
      "Hit Convert Now and watch the progress bar as your image is uploaded and converted. Most conversions complete in under 5 seconds regardless of file size.",
  },
  {
    number: "04",
    title: "Download your converted file",
    description:
      'Click "Download Ready File" to save the converted image to your device. The output filename is "converted.[ext]" so it does not overwrite your original.',
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

export default function ImageConverterPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <ArrowLeftRight size={14} />
          Free Image Converter
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Online Image Converter
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Convert images between PNG, JPEG, WebP, AVIF, BMP, TIFF, GIF, and ICO
          instantly. Animated GIFs preserve all frames. ICO output embeds 5
          resolution layers. Free, no watermark, no signup — supports 10 formats
          including next-generation WebP and AVIF.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "10 Formats",
            "WebP & AVIF",
            "Animated GIF Preserved",
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

      <ImageConverterTool />

      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Convert Any Image Format — Instantly and Free
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Different platforms, applications, and workflows require different
          image formats. A PNG logo needs to become a WebP for faster web
          loading. A JPEG photograph needs to become a TIFF for print
          production. An image needs to become an ICO for a website favicon.
          This tool handles all of it — ten output formats, one upload, no
          software required.
        </p>
        <p className="text-gray-600 leading-relaxed">
          With WebP and AVIF support, this is also a direct tool for web
          performance optimisation. Converting your JPEG and PNG assets to WebP
          typically reduces image payload by 25–35%, improving Core Web Vitals
          scores and page load times. Converting to AVIF achieves even greater
          compression for supported browsers. Lossy formats (JPEG, WebP, AVIF)
          are all converted at quality 90 — visually indistinguishable from the
          source at normal screen sizes.
        </p>

        {/* Common conversions grid */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Most common conversions
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {conversions.map((c) => (
              <div
                key={`${c.from}-${c.to}`}
                className="flex items-start gap-3 bg-gradient-to-br from-white to-[#faf7ff] border border-[#e9e1ff] rounded-xl p-4"
              >
                <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                  <span className="text-xs font-black text-[#5b32b4] bg-[#f3ecff] px-2 py-1 rounded-lg">
                    {c.from}
                  </span>
                  <ArrowLeftRight size={12} className="text-[#fb397d]" />
                  <span className="text-xs font-black text-white bg-[#fb397d] px-2 py-1 rounded-lg">
                    {c.to}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{c.why}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Format reference table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Format reference — which format should I choose?
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {[
                    "Format",
                    "Type",
                    "Best for",
                    "Compression",
                    "Browser support",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 font-bold text-[#5b32b4] text-xs uppercase tracking-wider whitespace-nowrap"
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
                    <td className="px-4 py-3 font-black text-[#5b32b4] text-xs">
                      {row.format}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {row.type}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">
                      {row.bestFor}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#fb397d] font-bold">
                      {row.size}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {row.support}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            ★ = file size efficiency (more stars = better compression / smaller
            files)
          </p>
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
                  "Developers converting assets for web performance",
                  "Designers exporting to client-required formats",
                  "Marketers preparing images for different platforms",
                  "Bloggers optimising images for Core Web Vitals",
                  "Photographers converting RAW exports to web formats",
                  "Developers creating favicons from PNG logos",
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
                Web performance tip:
              </p>
              <div className="bg-[#5b32b4]/5 border border-[#5b32b4]/20 rounded-xl p-4 space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Converting your site's JPEG and PNG images to{" "}
                  <strong className="text-[#5b32b4]">WebP</strong> typically
                  reduces total image payload by{" "}
                  <strong className="text-[#fb397d]">25–35%</strong> with no
                  visible quality difference — directly improving Largest
                  Contentful Paint (LCP) and overall page speed scores.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  For maximum compression on modern browsers,{" "}
                  <strong className="text-[#5b32b4]">AVIF</strong> achieves up
                  to <strong className="text-[#fb397d]">50% smaller</strong>{" "}
                  files than JPEG at equivalent quality.
                </p>
              </div>
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
            How to Convert an Image Online
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Under 10 seconds. No software needed.
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
            Why Use the Snappy-Fix Image Converter?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            The widest format support of any free online image converter —
            animated GIF preservation, multi-layer ICO, and WebP/AVIF for modern
            web performance.
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
            Everything you need to know about image format conversion and which
            format to choose.
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

      <OtherToolsSection currentSlug="image-converter" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
