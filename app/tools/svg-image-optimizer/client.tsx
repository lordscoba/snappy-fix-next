"use client";

import { useState } from "react";
import SVGImageOptimization from "@/components/tools/SVGImageOptimization";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Zap,
  ShieldCheck,
  Globe,
  Code2,
  Minimize2,
  FileCode,
  BarChart3,
  Layers,
  Cpu,
} from "lucide-react";

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What is SVG optimisation and what does it remove?",
    answer:
      "SVG optimisation is the process of removing code from an SVG file that is not needed to render the visual correctly in a browser. The tool uses the scour library — the industry-standard SVG optimiser — to apply these specific operations: remove embedded metadata (author, creation date, application name), strip XML and editor comments, remove the XML prolog declaration, strip all whitespace and newlines from the code, shorten long element IDs to minimal characters, enable viewboxing for scalable display, and round path coordinate values to 3 decimal places. The visual output of the SVG is identical after optimisation — only the invisible code overhead is reduced.",
  },
  {
    question: "Will SVG optimisation change how my SVG looks?",
    answer:
      "No. SVG optimisation is lossless in terms of visual output. The tool removes metadata, comments, and redundant code that browsers never render — the shapes, paths, colours, gradients, and all visible elements are fully preserved. Coordinate values are rounded to 3 decimal places, which for typical screen rendering is indistinguishable from values with 8 or more decimal places. The optimised SVG renders identically to the original in all modern browsers.",
  },
  {
    question: "How much smaller does an SVG file get after optimisation?",
    answer:
      "Size reduction varies by source. SVG files exported from Figma, Illustrator, or Inkscape typically include significant editor-specific metadata, lengthy comments, and verbose ID strings — these files often reduce by 20–60%. SVG files already exported with basic settings or hand-coded SVGs may reduce by 5–15%. The most significant savings come from removing editor metadata and stripping whitespace from large files. Files with complex path data also benefit from coordinate rounding, which reduces the character count of every path command.",
  },
  {
    question:
      "Why is my exported SVG from Figma, Illustrator, or Inkscape so large?",
    answer:
      "Design application SVG exports include significant overhead beyond the visual data: Figma adds application metadata and layer names. Illustrator adds its own proprietary XML namespaces and comments that can account for 30% or more of the file. Inkscape embeds its own namespace (sodipodi), creation metadata, and guides. All of these are completely ignored by web browsers when rendering the SVG — they are design tool data, not display data. The scour optimiser specifically removes all of this application-specific overhead.",
  },
  {
    question: "What is ID shortening and why does it matter?",
    answer:
      "Design tools generate long, descriptive IDs for SVG elements — names like `path-logo-main-stroke-left-12` or Figma's `clip-path-0123456789`. These IDs are only needed internally within the SVG file to reference elements from other elements (e.g. a clip-path referenced by its ID). The scour optimiser renames all internal IDs to minimal strings (a, b, c, aa, ab...) — any element that references another still references it correctly, just with a shorter name. This reduces file size proportionally to the number and length of IDs in the original file.",
  },
  {
    question: "Does SVG optimisation affect animation or interactivity?",
    answer:
      "Scour's optimisations are conservative with respect to SVG features. Metadata, comments, and whitespace removal do not affect animation or interactivity. ID shortening is handled carefully — internal references are rewritten consistently so that CSS selectors or JavaScript that reference IDs by name may need updating if you are accessing SVG elements externally. If your SVG is animated via CSS classes or inline SMIL animation, those are preserved. If you reference SVG element IDs from external JavaScript, test after optimisation.",
  },
  {
    question: "Should I use SVG instead of PNG or JPEG for logos and icons?",
    answer:
      "Yes — for logos, icons, and illustrations. SVG is resolution-independent: it renders sharply at any size from a 16px favicon to a 4K display, with zero quality loss at any scale. It is often significantly smaller than a raster equivalent — a logo that is 15KB as SVG might be 50KB as PNG to support retina displays. SVG files are also indexable by search engines, styleable with CSS, and animatable. Use PNG or JPEG for photographs and complex photographic content where raster is the right format.",
  },
  {
    question: "Is the SVG optimiser free and does it store my files?",
    answer:
      "Yes — completely free with no usage limits and no watermark. Your SVG file is processed and the optimised version is returned to your browser. No copy of your original or optimised SVG is retained on the server after processing.",
  },
];

// ─── What scour removes ────────────────────────────────────────────────────────
const scourOperations = [
  {
    operation: "Metadata removal",
    detail:
      "Author, title, creation date, application name embedded by design tools",
    savings: "High",
  },
  {
    operation: "XML prolog stripping",
    detail:
      '<?xml version="1.0" encoding="UTF-8"?> declaration — not needed by browsers',
    savings: "Low",
  },
  {
    operation: "Comment stripping",
    detail:
      "All <!-- --> comments including Illustrator/Inkscape application comments",
    savings: "Medium",
  },
  {
    operation: "Whitespace removal",
    detail: "All newlines, tabs, and indentation from the SVG code",
    savings: "Medium",
  },
  {
    operation: "ID shortening",
    detail: "Long IDs like 'clip-path-logo-main' become 'a', 'b', 'c'...",
    savings: "Medium",
  },
  {
    operation: "Viewbox enabling",
    detail: "Adds viewBox attribute for correct scaling if not already present",
    savings: "Feature",
  },
  {
    operation: "Coordinate rounding",
    detail: "Path values rounded to 3 decimal places instead of 8+",
    savings: "Medium",
  },
];

// ─── SVG vs raster comparison ─────────────────────────────────────────────────
const svgVsRaster = [
  {
    aspect: "Resolution",
    svg: "✓ Infinite — sharp at any size",
    raster: "Fixed — blurry when scaled up",
  },
  {
    aspect: "Retina display",
    svg: "✓ Crisp on all DPR — one file",
    raster: "Needs 2× and 3× versions",
  },
  {
    aspect: "File size (logos/icons)",
    svg: "✓ Often 5–30KB",
    raster: "50–200KB for PNG with retina",
  },
  {
    aspect: "CSS styling",
    svg: "✓ Colours, fills styleable via CSS",
    raster: "Not styleable without canvas",
  },
  {
    aspect: "Animation",
    svg: "✓ CSS and SMIL animation supported",
    raster: "Only via GIF (low quality)",
  },
  {
    aspect: "SEO indexing",
    svg: "✓ Text content indexable",
    raster: "Pixel content not indexable",
  },
  { aspect: "Photographs", svg: "Not suitable", raster: "✓ Correct format" },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Minimize2 size={20} className="text-[#fb397d]" />,
    title: "Industry-standard scour engine",
    description:
      "Powered by scour — the same library used by professional SVG pipelines — for thorough, conservative optimisation that preserves all visual output.",
  },
  {
    icon: <Code2 size={20} className="text-[#5b32b4]" />,
    title: "Lossless visual result",
    description:
      "All shapes, paths, colours, and gradients are preserved. Only code that browsers never render is removed — the output is visually identical.",
  },
  {
    icon: <BarChart3 size={20} className="text-[#fb397d]" />,
    title: "20–60% smaller from design exports",
    description:
      "SVGs from Figma, Illustrator, and Inkscape carry substantial editor overhead. Scour targets this specifically, often halving the file size.",
  },
  {
    icon: <Cpu size={20} className="text-[#5b32b4]" />,
    title: "Async server-side processing",
    description:
      "Optimisation runs server-side in a dedicated thread — heavy path processing does not block your browser or require waiting for large files.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#fb397d]" />,
    title: "Private and secure",
    description:
      "Your SVG file is processed and discarded — never permanently stored. Original and optimised files are not retained after delivery.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive — optimise SVG files on desktop, laptop, tablet, or smartphone from any modern browser.",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Export your SVG from your design tool",
    description:
      "Export your SVG from Figma, Illustrator, Inkscape, or any other tool using standard SVG export. No special export settings needed — the optimiser handles cleanup regardless of how verbose the original export is.",
  },
  {
    number: "02",
    title: "Upload the SVG file",
    description:
      "Drag and drop your SVG file onto the upload zone or click to browse. A preview renders immediately so you can confirm the correct file loaded. Only SVG files are accepted (image/svg+xml).",
  },
  {
    number: "03",
    title: "Click Optimize Image",
    description:
      "Hit the button and watch the progress bar. The tool sends your SVG to the server, runs scour with metadata removal, comment stripping, ID shortening, whitespace removal, and coordinate rounding, then returns the optimised SVG.",
  },
  {
    number: "04",
    title: "Download and deploy",
    description:
      'Click "Download Optimized Image" to save the clean SVG. Deploy it to your website, design system, or component library. The file renders identically in all browsers — just faster and lighter.',
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

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SVGImageOptimizerPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <FileCode size={14} />
          SVG Optimisation Tool
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          SVG Image Optimizer
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Compress and clean SVG files using the scour engine — removing
          metadata, comments, whitespace, and redundant IDs without changing how
          the SVG renders. Reduce Figma, Illustrator, and Inkscape exports by
          20–60%. Free, lossless, no signup.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "Powered by scour",
            "Lossless Visual Output",
            "20–60% Size Reduction",
            "No Signup",
            "SVG Only",
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

      {/* ── Tool ────────────────────────────────────────────── */}
      <SVGImageOptimization />

      {/* ── Direct Intent ───────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="intent-heading"
      >
        <h2
          id="intent-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Why Design Tool SVG Exports Are Larger Than They Need to Be
        </h2>
        <p className="text-gray-600 leading-relaxed">
          When you export an SVG from Figma, Illustrator, or Inkscape, the file
          contains far more than the shapes and paths that make up your design.
          Design tools embed their own metadata — application name, version,
          creation timestamp, author information, proprietary XML namespaces,
          editor comments, and layer names — none of which a web browser ever
          reads or needs to render the SVG. For a complex logo or icon set, this
          overhead can account for 30–50% of the total file size.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This tool runs your SVG through scour — the same engine used in
          professional SVG optimisation pipelines — with a carefully chosen set
          of optimisations: metadata removal, comment stripping, whitespace
          elimination, ID shortening, and coordinate precision reduction. The
          visual output is bit-for-bit identical in any browser. Only the
          invisible code overhead is removed.
        </p>

        {/* What scour removes table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            What the optimiser removes — and why
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {[
                    "Operation",
                    "What is removed or changed",
                    "Size savings",
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
                {scourOperations.map((row, i) => (
                  <tr
                    key={row.operation}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-bold text-[#5b32b4] text-xs">
                      {row.operation}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.detail}
                    </td>
                    <td
                      className={`px-5 py-3 text-xs font-black ${
                        row.savings === "High"
                          ? "text-[#fb397d]"
                          : row.savings === "Medium"
                            ? "text-[#5b32b4]"
                            : row.savings === "Low"
                              ? "text-gray-400"
                              : "text-amber-500"
                      }`}
                    >
                      {row.savings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            All operations are lossless — the SVG renders identically in
            browsers before and after optimisation.
          </p>
        </div>

        {/* SVG vs raster comparison */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            SVG vs raster (PNG / JPEG) — when to use each
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["Aspect", "SVG (vector)", "PNG / JPEG (raster)"].map(
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
                {svgVsRaster.map((row, i) => (
                  <tr
                    key={row.aspect}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-bold text-[#2b1d3a] text-xs">
                      {row.aspect}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.svg}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.raster}
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
                Who optimises SVG files:
              </p>
              <ul className="space-y-2">
                {[
                  "Developers adding SVG logos and icons to websites",
                  "Designers handing off optimised assets to developers",
                  "Front-end engineers reducing icon library bundle size",
                  "Performance-focused teams addressing PageSpeed image warnings",
                  "Anyone exporting SVGs from Figma, Illustrator, or Inkscape",
                  "UI teams embedding inline SVG in HTML or React components",
                ].map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={13}
                      className={`mt-0.5 shrink-0 ${
                        idx % 2 === 0 ? "text-[#5b32b4]" : "text-[#fb397d]"
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                When SVG optimisation matters most:
              </p>
              <ul className="space-y-2">
                {[
                  "Before deploying logos or hero illustrations to production",
                  "When SVG exports from design tools are unexpectedly large",
                  "Before adding SVG icons to a design system or component library",
                  "When addressing LCP or 'efficiently encode images' PageSpeed flags",
                  "Before committing SVG assets to a code repository",
                  "When delivering design assets to a client for web use",
                ].map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={13}
                      className={`mt-0.5 shrink-0 ${
                        idx % 2 === 0 ? "text-[#fb397d]" : "text-[#5b32b4]"
                      }`}
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
            How to Optimize an SVG File
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Scour engine. Lossless output ready to deploy.
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
            Why Use the Snappy-Fix SVG Optimizer?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Scour engine · lossless · 20–60% size reduction from design exports
            · deploy-ready in one click.
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
            Everything about SVG optimisation, the scour engine, and when to use
            SVG over raster formats.
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
      <OtherToolsSection currentSlug="svg-image-optimizer" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
