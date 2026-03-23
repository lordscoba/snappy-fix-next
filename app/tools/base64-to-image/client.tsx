"use client";

import { useState } from "react";
import Base64ToImageTools from "@/components/tools/Base64ToImageTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  FileCode,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Zap,
  Download,
  Globe,
  Code2,
  Layers,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What is Base64 to Image conversion?",
    answer:
      "Base64 to Image conversion decodes a Base64-encoded string back into its original image file. Base64 is a text-based encoding format commonly used to embed images directly inside HTML, CSS, JSON, or API responses — eliminating the need for a separate image file request.",
  },
  {
    question: "Is this Base64 decoder completely free?",
    answer:
      "Yes — the Snappy-Fix Base64 to Image tool is 100% free with no usage limits, no watermarks added to your output, and no account or signup required. Paste your string and download your image instantly.",
  },
  {
    question: "Are my Base64 strings or images stored on your servers?",
    answer:
      "No. All decoding is handled securely and your data is not permanently stored. The converted image is returned directly to your browser and no copy is retained on our infrastructure after the session ends.",
  },
  {
    question: "What image formats can I get from this converter?",
    answer:
      "The output format depends on what was originally encoded. Our tool correctly decodes Base64 strings that represent JPG, PNG, WebP, GIF, and BMP images. The original format is preserved during decoding.",
  },
  {
    question: "Do I need to include the data URI prefix?",
    answer:
      "You can paste either a full data URI (e.g. data:image/png;base64,iVBOR...) or just the raw Base64 string without the prefix. The tool automatically strips the header if present before decoding.",
  },
  {
    question: "Why is my Base64 string not converting?",
    answer:
      "The most common causes are: the string is incomplete or was truncated when copying, the string contains line breaks or spaces that were added by another tool, or the original data was not actually an image. Try copying the full string again and ensure no characters are missing from the beginning or end.",
  },
  {
    question: "Can I use this tool on mobile devices?",
    answer:
      "Yes. The Snappy-Fix Base64 to Image converter is fully responsive and works on all modern smartphones and tablets. Paste your Base64 string, decode, preview, and download directly from your mobile browser.",
  },
  {
    question: "What is the maximum Base64 string length this tool handles?",
    answer:
      "The tool handles strings representing images up to 10MB in their decoded size. For most use cases — profile images, icons, thumbnails, and inline image assets — this limit is more than sufficient.",
  },
];

// ─── Benefits data ────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Zap size={20} className="text-[#fb397d]" />,
    title: "Instant decoding",
    description:
      "Paste your Base64 string and get a downloadable image in under a second. No processing queues, no waiting.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#5b32b4]" />,
    title: "Private and secure",
    description:
      "Your Base64 data is processed securely and never stored. What you paste stays between you and the result.",
  },
  {
    icon: <Download size={20} className="text-[#fb397d]" />,
    title: "No watermark",
    description:
      "Download your decoded image exactly as it was originally encoded — clean, unmodified, and watermark-free.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works in any browser",
    description:
      "No software to install. Open the tool in Chrome, Firefox, Safari, or Edge on desktop or mobile and decode instantly.",
  },
  {
    icon: <Code2 size={20} className="text-[#fb397d]" />,
    title: "Developer-friendly",
    description:
      "Accepts both raw Base64 strings and full data URIs with the data:image/ prefix. Handles the cleanup automatically.",
  },
  {
    icon: <Layers size={20} className="text-[#5b32b4]" />,
    title: "Multi-format support",
    description:
      "Correctly decodes Base64 strings originating from JPG, PNG, WebP, GIF, and BMP images without format loss.",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Copy your Base64 string",
    description:
      "Locate the Base64 encoded image string from your HTML, CSS, JSON response, API payload, or developer tool. Copy the full string including the data:image/ prefix if present.",
  },
  {
    number: "02",
    title: "Paste into the input field",
    description:
      "Click inside the text area and paste your Base64 string. The tool accepts both raw Base64 data and full data URIs — no need to strip the prefix manually.",
  },
  {
    number: "03",
    title: "Click Generate Image",
    description:
      'Press the "Generate Image" button. The tool decodes your Base64 string and renders a live preview of the resulting image within seconds.',
  },
  {
    number: "04",
    title: "Preview and download",
    description:
      "Review the decoded image in the preview panel. When satisfied, click Download Image to save the file to your device in its original format.",
  },
];

// ─── FAQ Item component ───────────────────────────────────────────────────────
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
          <p className="px-6 pb-5 pt-0 text-gray-600 text-sm leading-relaxed pl-[4.5rem]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Base64ToImagePageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-3 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <FileCode size={14} />
          Free Online Tool
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Base64 to Image Converter
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Instantly decode Base64 strings into downloadable image files. Convert
          Base64 to JPG, PNG, WebP, and more — securely, for free, with no
          watermark and no account required.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {[
            "100% Free",
            "No Watermark",
            "No Signup",
            "Secure Processing",
            "Works on Mobile",
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
      <Base64ToImageTools />

      {/* ── What is Base64 — Direct Intent ──────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-6"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          What is Base64 to Image Conversion?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Base64 is a text-based encoding scheme that converts binary data —
          like image files — into a string of ASCII characters. This is commonly
          used by developers to embed images directly inside HTML, CSS
          stylesheets, JSON API responses, and email templates without requiring
          a separate HTTP request for each asset.
        </p>
        <p className="text-gray-600 leading-relaxed">
          When you receive a Base64 encoded image string — whether from a REST
          API, a database field, or a developer tool — you need to decode it
          back into a real image file to view, download, or use it. That is
          exactly what this tool does: paste your Base64 string and get back a
          fully usable, downloadable image instantly.
        </p>

        {/* Value intent callout */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-bold text-[#2b1d3a] mb-1">
                Common sources of Base64 image strings:
              </p>
              <ul className="space-y-1">
                {[
                  "REST API and GraphQL responses",
                  "HTML src attributes (data URIs)",
                  "CSS background-image inline values",
                  "Email template image embedding",
                  "Database BLOB fields exported as text",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      size={14}
                      className="text-[#5b32b4] mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-[#2b1d3a] mb-1">
                Who uses this tool:
              </p>
              <ul className="space-y-1">
                {[
                  "Frontend and backend developers",
                  "UI/UX designers reviewing assets",
                  "QA engineers testing API responses",
                  "Data analysts working with exported records",
                  "No-code builders integrating APIs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      size={14}
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
            How to Convert Base64 to Image
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Under thirty seconds. No technical knowledge required.
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

      {/* ── Benefits / Why Use ───────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="benefits-heading"
      >
        <div className="text-center space-y-3">
          <h2
            id="benefits-heading"
            className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
          >
            Why Use Snappy-Fix Base64 Decoder?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Built for speed, privacy, and developer convenience — no
            compromises.
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
            Everything you need to know about Base64 to Image conversion.
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
      <OtherToolsSection currentSlug="base64-to-image" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
