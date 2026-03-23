"use client";

import { useState } from "react";
import SeoResponsiveOptimizerTool from "@/components/tools/SEOResponsiveOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Search,
  Zap,
  ShieldCheck,
  Globe,
  BarChart3,
  Smartphone,
  FolderArchive,
  FileImage,
} from "lucide-react";

// ─── Python backend truth:
// Generates 3 WebP sizes: image-480.webp, image-768.webp, image-1200.webp
// All at WebP quality 75, method 6
// Optional image.avif (quality 50) if pillow_avif is installed
// Returns: seo-images.zip (NOT a single image)

const faqs = [
  {
    question: "What does this tool return — and why is it a ZIP file?",
    answer:
      "The tool generates a ZIP archive containing three WebP files at responsive breakpoint sizes: image-480.webp (mobile), image-768.webp (tablet), and image-1200.webp (desktop), all at WebP quality 75 using method-6 compression. If AVIF encoding is available, it also includes image.avif at quality 50 for maximum compression. A ZIP is returned because responsive images require multiple files — one per breakpoint — which the browser selects based on device width using the HTML srcset attribute.",
  },
  {
    question: "What are the three breakpoints and why 480, 768, and 1200px?",
    answer:
      "The three sizes correspond to standard responsive web design breakpoints: 480px covers mobile portrait screens (the majority of global web traffic), 768px covers tablets and mobile landscape, and 1200px covers desktop and wide-screen displays. These are the widths where most CSS media queries break layout — making them the most efficient points to provide separate image files so no device downloads a significantly larger image than it needs.",
  },
  {
    question: "How do I use the ZIP contents in my website's HTML?",
    answer:
      "Extract the ZIP and upload the three WebP files to your web server or CDN. In your HTML, use a picture element with srcset to let the browser select the right size: `<picture><source srcset='image-480.webp 480w, image-768.webp 768w, image-1200.webp 1200w' type='image/webp' sizes='100vw'><img src='image-1200.webp' alt='...'></picture>`. The browser automatically downloads only the size it needs, saving bandwidth and improving load time. For the AVIF version, add it as the first source with type='image/avif'.",
  },
  {
    question: "What is AVIF and should I use it?",
    answer:
      "AVIF (AV1 Image File Format) is a next-generation image format that achieves even smaller file sizes than WebP — commonly 30–50% smaller at the same visual quality. The tool includes an AVIF version at quality 50 when supported. AVIF is now supported by Chrome, Firefox, and Safari on most modern devices. For maximum web performance, include the AVIF source first in your picture element, with WebP as fallback — the browser will use AVIF where supported and WebP elsewhere.",
  },
  {
    question: "How is this different from the Web Image Optimizer?",
    answer:
      "The Web Image Optimizer produces a single WebP file at 1920px — suitable for use as a direct image replacement. The SEO Responsive Image tool produces a set of three (or four with AVIF) files at specific responsive breakpoints, intended for use with HTML srcset to serve appropriately-sized images to different devices. Use the Web Optimizer for simple one-file replacement. Use this SEO Responsive tool when implementing proper responsive images in a website codebase to maximise performance across all devices.",
  },
  {
    question: "What is WebP quality 75 method 6?",
    answer:
      "WebP quality 75 is the standard web image quality level — visually indistinguishable from higher settings at normal viewing distances, while being significantly smaller in file size than quality 85 or 90. Method 6 is WebP's highest-effort compression algorithm, which takes longer to compute but produces the smallest possible file at quality 75. For images compressed once and served thousands of times, method 6 is always the right choice.",
  },
  {
    question: "Does serving responsive images improve my SEO ranking?",
    answer:
      "Responsive images improve the 'Properly size images' metric in Google PageSpeed Insights and reduce Largest Contentful Paint (LCP) time on mobile devices — both of which are Core Web Vitals that Google uses as ranking signals. Mobile users downloading a 480px image instead of a 1200px image load the page noticeably faster, improving LCP, reducing bounce rate, and signalling to Google that your page delivers a good mobile experience.",
  },
  {
    question: "Is the SEO Responsive Image tool free?",
    answer:
      "Yes — completely free with no usage limits, no watermark on any of the generated files, and no account required. Generate as many responsive image sets as you need for any website project.",
  },
];

const benefits = [
  {
    icon: <FolderArchive size={20} className="text-[#fb397d]" />,
    title: "3 breakpoint sizes in one ZIP",
    description:
      "480px, 768px, and 1200px WebP files in a single download — all files needed to implement responsive images in HTML using srcset.",
  },
  {
    icon: <FileImage size={20} className="text-[#5b32b4]" />,
    title: "AVIF included when available",
    description:
      "If AVIF encoding is available, image.avif (quality 50) is included in the ZIP for maximum compression on supporting browsers — 30–50% smaller than WebP.",
  },
  {
    icon: <BarChart3 size={20} className="text-[#fb397d]" />,
    title: "PageSpeed 'Properly size images'",
    description:
      "Using responsive images directly addresses Google's 'Properly size images' recommendation — one of the highest-impact PageSpeed Insights opportunities.",
  },
  {
    icon: <Smartphone size={20} className="text-[#5b32b4]" />,
    title: "Mobile performance optimised",
    description:
      "Mobile users download the 480px file instead of a 1200px file — reducing mobile LCP time and improving Core Web Vitals scores.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#fb397d]" />,
    title: "Private and secure",
    description:
      "Your image is processed securely and never permanently stored. Files are discarded after your ZIP is delivered.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive interface — generate your responsive image set from desktop, laptop, tablet, or smartphone.",
  },
];

// What's in the ZIP
const zipContents = [
  {
    file: "image-480.webp",
    size: "Mobile portrait",
    use: "Screens up to 480px wide",
    format: "WebP quality 75",
  },
  {
    file: "image-768.webp",
    size: "Tablet / mobile landscape",
    use: "Screens up to 768px wide",
    format: "WebP quality 75",
  },
  {
    file: "image-1200.webp",
    size: "Desktop",
    use: "Screens up to 1200px wide",
    format: "WebP quality 75",
  },
  {
    file: "image.avif",
    size: "All devices (next-gen)",
    use: "Where AVIF is browser-supported",
    format: "AVIF quality 50 (if available)",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload your source image",
    description:
      "Drag and drop your image onto the upload zone or click to browse. Use the highest-resolution version you have — the tool generates all three sizes from this source. JPG, PNG, and WebP are all accepted.",
  },
  {
    number: "02",
    title: "Click Optimize for SEO & Responsive",
    description:
      "Hit the single button. The tool generates image-480.webp, image-768.webp, image-1200.webp, and image.avif (if supported) — all at WebP quality 75 using method-6 compression.",
  },
  {
    number: "03",
    title: "Download seo-images.zip",
    description:
      'Click "Download Optimized Image" — the download is a ZIP file named seo-images.zip. Extract it to find all four files ready to upload to your server or CDN.',
  },
  {
    number: "04",
    title: "Implement srcset in your HTML",
    description:
      "Upload the WebP files to your server and use a <picture> element with srcset pointing to each size. Add the AVIF as the first source if included. The browser selects the appropriate file automatically based on device viewport width.",
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

export default function SeoResponsiveOptimizerPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <Search size={14} />
          Responsive Image Generator
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          SEO Responsive Image Optimizer
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Generate a complete set of responsive image files — 480px, 768px, and
          1200px WebP plus optional AVIF — in one ZIP download. Implement srcset
          in HTML, serve the right size to every device, and fix PageSpeed's
          'Properly size images' recommendation. Free, no watermark, no signup.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "3 Breakpoint Sizes",
            "WebP + AVIF",
            "ZIP Download",
            "srcset Ready",
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

      <SeoResponsiveOptimizerTool />

      {/* ZIP contents callout — critical to set correct expectation */}
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] to-white border-2 border-[#5b32b4]/20 p-6 overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#5b32b4]/8 blur-2xl pointer-events-none" />
          <div className="relative">
            <p className="font-black text-[#5b32b4] text-sm mb-1 flex items-center gap-2">
              <FolderArchive size={16} />
              What you download: seo-images.zip
            </p>
            <p className="text-xs text-gray-500 mb-4">
              The download is a ZIP archive — not a single image. Extract it to
              find these files:
            </p>
            <div className="overflow-x-auto rounded-xl border border-[#e9e1ff]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f3ecff]">
                    {["Filename", "Screen size", "Use with", "Format"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left px-4 py-2.5 font-bold text-[#5b32b4] text-xs uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {zipContents.map((row, i) => (
                    <tr
                      key={row.file}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                    >
                      <td className="px-4 py-2.5 font-mono font-black text-[#5b32b4] text-xs">
                        {row.file}
                      </td>
                      <td className="px-4 py-2.5 text-xs font-bold text-[#2b1d3a]">
                        {row.size}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-gray-600">
                        {row.use}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-gray-500">
                        {row.format}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="intent-heading"
      >
        <h2
          id="intent-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Why Responsive Images Matter for SEO and Performance
        </h2>
        <p className="text-gray-600 leading-relaxed">
          A responsive image is one that delivers different file sizes to
          different devices. Without responsive images, a mobile phone user
          loading a blog post downloads a 1200px-wide desktop image — three
          times the pixels their screen can display, downloaded over a slow
          mobile connection. Google measures this with the 'Properly size
          images' PageSpeed Insights audit, and it is one of the most common
          high-impact failures found in page performance reports.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This tool generates the full set of files needed for a proper srcset
          implementation in one step. Instead of manually creating three
          different-sized exports and converting each to WebP, upload once and
          receive all four files — ready to deploy. The 480/768/1200px
          breakpoints align with the most common CSS media query breakpoints,
          ensuring efficient delivery at every common screen width.
        </p>

        {/* srcset code example */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            How to use the generated files in HTML
          </h3>
          <div className="rounded-2xl border border-[#e9e1ff] bg-[#1a0f2e] p-5 overflow-x-auto">
            <pre className="text-xs text-[#c4b5d9] leading-relaxed font-mono whitespace-pre">
              {`<picture>
  <!-- AVIF: best compression, modern browsers -->
  <source
    srcset="image.avif"
    type="image/avif"
  />
  <!-- WebP: responsive sizes, all modern browsers -->
  <source
    srcset="image-480.webp 480w,
            image-768.webp 768w,
            image-1200.webp 1200w"
    sizes="(max-width: 480px) 480px,
           (max-width: 768px) 768px,
           1200px"
    type="image/webp"
  />
  <!-- Fallback img (required) -->
  <img
    src="image-1200.webp"
    alt="Your image description"
    loading="lazy"
    width="1200"
    height="800"
  />
</picture>`}
            </pre>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Replace width/height with your image's actual dimensions. Always set
            width and height on the img element to prevent Cumulative Layout
            Shift (CLS).
          </p>
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
                  "Developers implementing responsive images in a website codebase",
                  "SEO specialists fixing 'Properly size images' PageSpeed warnings",
                  "Agencies delivering responsive image sets with web projects",
                  "Frontend developers building performance-optimised pages",
                  "Bloggers implementing srcset for improved mobile performance",
                  "eCommerce developers optimising product image delivery",
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
                When to use this over the Web Optimizer:
              </p>
              <ul className="space-y-2">
                {[
                  "When you need srcset / responsive images for a website",
                  "When PageSpeed flags 'Properly size images' specifically",
                  "When mobile performance score is much lower than desktop",
                  "When images are used across multiple layout breakpoints",
                  "When implementing modern image delivery with picture element",
                  "When you need AVIF for maximum compression alongside WebP",
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
            How to Generate Responsive Images for SEO
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. One ZIP. Full responsive image set.
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
            Why Use the Snappy-Fix SEO Responsive Image Generator?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Three WebP sizes + AVIF. One ZIP. Everything needed for a responsive
            srcset implementation.
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
            Everything about responsive images, srcset, AVIF, and improving
            mobile web performance.
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

      <OtherToolsSection currentSlug="optimize-seo-responsive-image" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
