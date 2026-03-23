"use client";

import { useState } from "react";
import WebOptimizerTool from "@/components/tools/WebOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Globe,
  Zap,
  ShieldCheck,
  BarChart3,
  Monitor,
  Smartphone,
  FileImage,
  TrendingUp,
} from "lucide-react";

// ─── Python backend for Web:
// resize_longest_side(1920) → WebP quality 75, method=6, optimize=True
// Cache-Control: public, max-age=31536000
// Output: optimized_web.webp

const faqs = [
  {
    question: "What does the Web Image Optimizer actually do to my image?",
    answer:
      "The tool applies three web-specific optimisations: it resizes your image so the longest side does not exceed 1920 pixels (the maximum width of a full-screen desktop display), converts the output to WebP format at quality 75 using the highest-effort compression method (method 6), and adds a one-year Cache-Control header to the response. WebP at quality 75 typically produces files 25–35% smaller than equivalent JPEG quality at visually indistinguishable quality for web viewing.",
  },
  {
    question: "Why does the tool output WebP instead of JPEG?",
    answer:
      "WebP is currently the best format for web images. At equivalent visual quality, WebP produces files 25–35% smaller than JPEG for photographs and up to 50% smaller for graphics. All modern browsers — Chrome, Firefox, Safari, Edge — support WebP. Google also considers WebP as a best practice in PageSpeed Insights and rewards it with an 'Efficient format' check. The tool converts to WebP automatically so you immediately get the web performance benefit without any configuration.",
  },
  {
    question: "Why is 1920px the resize limit?",
    answer:
      "1920 pixels is the width of a full-screen 1080p desktop display — the most common desktop resolution in use. Images wider than 1920px contain more pixels than any standard screen can display, meaning the extra data is downloaded but never rendered. Resizing to 1920px longest side eliminates this wasted bandwidth without any visible quality loss at any standard display size.",
  },
  {
    question:
      "What is WebP quality 75 and will it look different from my original?",
    answer:
      "WebP quality 75 uses the maximum compression effort (method 6) at a quality level that is visually indistinguishable from higher settings at normal web viewing distances and screen sizes. Most users cannot distinguish quality 75 WebP from quality 90 JPEG on a web page. The tool uses method 6, which takes longer to compress but achieves the smallest possible file size at quality 75 — prioritising the best size/quality ratio for web delivery.",
  },
  {
    question: "Does this tool improve my PageSpeed Insights score?",
    answer:
      "Yes — specifically for the 'Serve images in next-gen formats' and 'Properly size images' recommendations. Converting to WebP directly addresses the 'next-gen formats' recommendation, which is one of the highest-impact PageSpeed Insights opportunities. Resizing to 1920px addresses 'properly size images' for most full-width web images. Together these changes can contribute significant improvements to the Performance score in Lighthouse and PageSpeed Insights.",
  },
  {
    question: "What is method 6 WebP compression?",
    answer:
      "WebP compression supports methods 0 through 6, where method 6 applies the most thorough compression algorithm — searching more extensively for the optimal way to represent the image data. This results in the smallest possible WebP file at a given quality level but takes longer to process. For web images that are compressed once and served many times, method 6 is always the right choice: the extra processing time is negligible compared to the cumulative bandwidth savings across all page loads.",
  },
  {
    question: "What is the Cache-Control header and why does it matter?",
    answer:
      "The tool's response includes a Cache-Control: public, max-age=31536000 header, which tells browsers to cache the image for one year. When a returning visitor loads a page, the browser serves the image from local cache rather than downloading it again — making subsequent page loads essentially instant for that image. This is a best practice for static web assets and contributes to improved repeat-visit performance scores.",
  },
  {
    question: "Is the Web Image Optimizer free and does it add a watermark?",
    answer:
      "Yes — completely free with no usage limits and no watermark on the output. Optimise as many images as you need for any website project at no cost.",
  },
];

const benefits = [
  {
    icon: <FileImage size={20} className="text-[#fb397d]" />,
    title: "WebP output — 25–35% smaller",
    description:
      "Converts to WebP at quality 75 using method 6 — the highest-effort compression. Files are 25–35% smaller than equivalent JPEG at visually identical quality.",
  },
  {
    icon: <Monitor size={20} className="text-[#5b32b4]" />,
    title: "1920px max — no wasted pixels",
    description:
      "Resizes to 1920px longest side — the width of a full-screen 1080p display. Eliminates pixels that screens never render, reducing download size without any visual change.",
  },
  {
    icon: <BarChart3 size={20} className="text-[#fb397d]" />,
    title: "PageSpeed Insights improvement",
    description:
      "Directly addresses 'Serve images in next-gen formats' and 'Properly size images' — two of the highest-impact PageSpeed Insights recommendations.",
  },
  {
    icon: <Zap size={20} className="text-[#5b32b4]" />,
    title: "One-click — no settings",
    description:
      "Upload and click one button. Format conversion, dimension optimisation, and compression level are all applied automatically.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#fb397d]" />,
    title: "Private and secure",
    description:
      "Your image is processed securely and never permanently stored. Files are discarded after your optimised download is ready.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive — optimise images for web on desktop, laptop, tablet, or smartphone from any modern browser.",
  },
];

const webImageTypes = [
  {
    type: "Hero / banner image",
    recommended: "Under 200 KB WebP",
    maxDim: "1920px wide",
    note: "Above the fold — most critical for LCP",
  },
  {
    type: "Blog post featured image",
    recommended: "Under 150 KB WebP",
    maxDim: "1200px wide",
    note: "Displayed in post header and social shares",
  },
  {
    type: "Product image (eCommerce)",
    recommended: "Under 200 KB WebP",
    maxDim: "1200px wide",
    note: "Multiple views per page — cumulative impact",
  },
  {
    type: "Gallery / portfolio image",
    recommended: "Under 300 KB WebP",
    maxDim: "1920px wide",
    note: "Lazy load with loading='lazy' attribute",
  },
  {
    type: "Background image",
    recommended: "Under 150 KB WebP",
    maxDim: "1920px wide",
    note: "Often the largest file on a page",
  },
  {
    type: "Thumbnail / card image",
    recommended: "Under 50 KB WebP",
    maxDim: "600px wide",
    note: "Many per page — use Resize % to reduce further",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      "Drag and drop your image onto the upload zone or click to browse. Works with JPG, PNG, WebP, and all standard formats. For JPG/PNG sources, the tool converts to WebP automatically.",
  },
  {
    number: "02",
    title: "Click Optimize for Web",
    description:
      "Hit the single button. The tool resizes to 1920px longest side, converts to WebP at quality 75 using method-6 compression, and returns the optimised file.",
  },
  {
    number: "03",
    title: "Download your WebP file",
    description:
      'Click "Download Optimized Image" to save the web-optimised WebP file. The filename includes a timestamp.',
  },
  {
    number: "04",
    title: "Deploy to your website",
    description:
      "Replace your original image files with the WebP output. Run Google PageSpeed Insights on the page to measure the performance improvement. WebP is supported by all modern browsers — no fallback required for new sites.",
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

export default function WebOptimizerPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <Globe size={14} />
          Web Performance Tool
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Optimize Images for Websites
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Convert images to WebP at quality 75, resize to 1920px max, and cut
          file sizes 25–35% — one click, no settings. Faster pages, better
          PageSpeed scores, and smaller bandwidth bills. Free, no watermark, no
          signup.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "WebP Output",
            "1920px Max",
            "25–35% Smaller",
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

      <WebOptimizerTool />

      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="intent-heading"
      >
        <h2
          id="intent-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          The Right Format and Size — Automatically
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Most web images are still served as JPEG or PNG — formats designed
          decades before modern web performance requirements. WebP delivers the
          same visual quality in a significantly smaller file. The difference is
          not subtle: converting a typical 500KB hero JPEG to WebP at quality 75
          commonly produces a 300–350KB file that looks identical on screen.
          Multiply that across every image on a page and the cumulative impact
          on load time, Core Web Vitals, and PageSpeed score is measurable.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The tool uses compression method 6 — the most thorough WebP encoding
          setting — combined with 1920px longest-side resizing. This combination
          targets the two most common PageSpeed Insights image recommendations:
          'Serve images in next-gen formats' and 'Properly size images'. Upload
          your image and deploy the output directly.
        </p>

        {/* Web image types reference */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Recommended web image sizes by type
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {[
                    "Image type",
                    "Target file size",
                    "Max dimensions",
                    "Notes",
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
                {webImageTypes.map((row, i) => (
                  <tr
                    key={row.type}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-bold text-[#5b32b4] text-xs">
                      {row.type}
                    </td>
                    <td className="px-5 py-3 text-xs font-black text-[#fb397d] font-mono">
                      {row.recommended}
                    </td>
                    <td className="px-5 py-3 text-xs font-bold text-[#2b1d3a]">
                      {row.maxDim}
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
            For thumbnails under 600px, use the Custom Optimizer's Resize %
            field first, then optimise for web.
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
                  "Developers optimising images before deploying to production",
                  "Bloggers reducing hero image file sizes for faster load",
                  "E-commerce teams cutting product image sizes without quality loss",
                  "SEO specialists addressing PageSpeed Insights image warnings",
                  "Agencies delivering web-optimised image assets to clients",
                  "Content managers uploading images to CMS platforms",
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
                Signs your web images need optimisation:
              </p>
              <ul className="space-y-2">
                {[
                  "PageSpeed Insights shows 'Serve images in next-gen formats'",
                  "Images are still JPEG or PNG on a modern website",
                  "Hero images are larger than 300KB",
                  "Google Lighthouse flags image-related performance issues",
                  "Page load time is above 3 seconds on mobile",
                  "Images are wider than the viewport they display in",
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
            How to Optimize an Image for Your Website
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. One button. WebP output ready to deploy.
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
            Why Use the Snappy-Fix Web Image Optimizer?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            WebP · 1920px · Method 6. The right format, size, and compression
            for the web — one click.
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
            Everything about WebP, web image optimisation, and improving website
            performance scores.
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

      <OtherToolsSection currentSlug="optimize-web-image" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
