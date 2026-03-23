"use client";

import { useState } from "react";
import ImageToBase64Tools from "@/components/tools/ImageToBase64Tools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Code2,
  Zap,
  ShieldCheck,
  Copy,
  Globe,
  FileCode,
  Layers,
  ArrowLeftRight,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What is Base64 image encoding?",
    answer:
      "Base64 encoding converts the binary data of an image file into a string of ASCII text characters. Instead of referencing an image file by URL, Base64 lets you embed the image's data directly inside your HTML, CSS, JSON, or any other text-based format as a long string that looks like `data:image/png;base64,iVBORw0KGgo...`. The browser or application decodes the string back into the original image at runtime.",
  },
  {
    question: "Why would I convert an image to Base64?",
    answer:
      "Base64 is useful in several specific scenarios: embedding small icons or logos directly in CSS to eliminate an HTTP request, sending image data through a REST or GraphQL API that accepts JSON (which cannot carry binary files), storing images as text in databases or configuration files, embedding images in emails without attachments, building offline-capable web apps where images must be bundled with the code, and generating data URIs for HTML `<img>` src attributes in dynamically generated HTML.",
  },
  {
    question: "Does Base64 reduce or increase file size?",
    answer:
      "Base64 encoding increases file size by approximately 33% — because it represents 3 bytes of binary data as 4 ASCII characters. A 100KB PNG image becomes approximately 133KB as a Base64 string. This is a worthwhile trade-off for small images (icons, logos, placeholders) where eliminating an HTTP request saves more than the size increase costs. For large photographs, Base64 is not recommended — the size overhead and parsing cost outweigh the benefit.",
  },
  {
    question: "What is a data URI and how does it relate to Base64?",
    answer:
      "A data URI is the full string you paste into an HTML `<img>` src or a CSS `background-image` property to embed an image directly without a file reference. It follows the format: `data:[media type];base64,[Base64 string]`. The tool returns the raw Base64 string and also shows the reconstructed `data:image/[format];base64,[string]` preview — so you can confirm the encoding is correct before using it.",
  },
  {
    question: "What image formats does the converter support?",
    answer:
      "The tool accepts all standard web image formats: PNG, JPG, JPEG, WebP, GIF, BMP, and TIFF. The response includes the detected format so you know the correct MIME type to use in your data URI or API payload. For example, a PNG file returns `format: png` which maps to the MIME type `image/png`.",
  },
  {
    question: "How do I use the Base64 string in HTML?",
    answer:
      'Copy the Base64 string from the result panel using the Copy String button. In your HTML, use it as the src attribute of an img tag: `<img src="data:image/png;base64,[paste your string here]" alt="...">`. Replace `png` with the actual format of your image (jpeg, webp, gif, etc.). For CSS background images: `background-image: url("data:image/png;base64,[paste your string here]")`.',
  },
  {
    question: "How do I send a Base64 image through a REST API?",
    answer:
      'Most REST APIs that accept image data via JSON expect the Base64 string either with or without the data URI prefix. Copy the string from the result panel and include it in your JSON payload: `{ "image": "[paste Base64 string]" }` or `{ "image": "data:image/png;base64,[paste string]" }` depending on what your API expects. Check your API documentation for the correct field name and whether the data URI prefix should be included.',
  },
  {
    question: "Is the Image to Base64 converter free?",
    answer:
      "Yes — completely free with no usage limits and no account required. Convert as many images as you need at no cost.",
  },
  {
    question: "Are my uploaded images stored on your servers?",
    answer:
      "No. Your image is uploaded for conversion and the Base64 result is returned to your browser. No copy of your image or the generated Base64 string is retained on our servers after the conversion is complete.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Copy size={20} className="text-[#fb397d]" />,
    title: "One-click copy",
    description:
      "The Base64 string is displayed in a readable textarea with a Copy String button — click once and the full encoded string is in your clipboard.",
  },
  {
    icon: <Zap size={20} className="text-[#5b32b4]" />,
    title: "Instant conversion",
    description:
      "Upload your image and get the Base64 string in seconds. The result panel shows a live preview rendered from the Base64 data so you can verify the output.",
  },
  {
    icon: <FileCode size={20} className="text-[#fb397d]" />,
    title: "Format detection",
    description:
      "The tool detects and returns the image format (PNG, JPG, WebP, etc.) so you always know the correct MIME type to use in your data URI or API payload.",
  },
  {
    icon: <ArrowLeftRight size={20} className="text-[#5b32b4]" />,
    title: "Paired with Base64 decoder",
    description:
      "A direct link to the Base64 to Image tool is built in — convert in both directions without navigating away from the workflow.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#fb397d]" />,
    title: "Private and secure",
    description:
      "Your image and the generated Base64 string are never stored on our servers. Processing happens securely and the session data is discarded.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive — convert images to Base64 on desktop, laptop, tablet, or smartphone from any modern browser.",
  },
];

// ─── Where Base64 is used ─────────────────────────────────────────────────────
const useCases = [
  {
    context: "HTML img tag",
    example: 'src="data:image/png;base64,[string]"',
    when: "Small icons and logos to eliminate HTTP requests",
  },
  {
    context: "CSS background-image",
    example: 'url("data:image/png;base64,[string]")',
    when: "Inline background images in stylesheets",
  },
  {
    context: "REST API JSON payload",
    example: '{ "image": "[base64 string]" }',
    when: "Sending image data through APIs that accept JSON",
  },
  {
    context: "HTML email",
    example: 'src="data:image/png;base64,[string]"',
    when: "Embedding images without attachments in email HTML",
  },
  {
    context: "Database / config file",
    example: "Store as VARCHAR / TEXT field",
    when: "Persisting small images alongside text data",
  },
  {
    context: "Offline web app",
    example: "Bundle image data directly in JS/HTML",
    when: "Apps that must work without network access",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      "Drag and drop any image file onto the upload zone or click to browse. Supports PNG, JPG, WebP, GIF, BMP, and TIFF. A preview of your image loads immediately after upload.",
  },
  {
    number: "02",
    title: "Click Convert Now",
    description:
      "Hit Convert Now and watch the progress bar as your image is uploaded and encoded. The conversion completes in seconds for most image sizes.",
  },
  {
    number: "03",
    title: "Verify the result",
    description:
      "The result panel shows two things: a live preview rendered from the Base64 data (so you can confirm it decoded correctly) and the full Base64 string in a scrollable textarea.",
  },
  {
    number: "04",
    title: "Copy and use",
    description:
      'Click "Copy String" to copy the full Base64 string to your clipboard with one click — the button briefly shows "Copied!" to confirm. Paste it directly into your HTML, CSS, JSON, or API request.',
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
export default function ImageToBase64PageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <Code2 size={14} />
          Developer Tool
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Image to Base64 Converter
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Convert any image to a Base64 encoded string instantly. Embed images
          directly in HTML, CSS, JSON, and REST APIs — with one-click copy, live
          preview, and format detection. Free, no signup, no storage.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "One-Click Copy",
            "Live Preview",
            "Format Detection",
            "No Signup",
            "No Storage",
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
      <ImageToBase64Tools />

      {/* ── Direct Intent ────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          What is Base64 and When Should You Use It?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Base64 encoding converts the binary data of an image into a plain text
          string — making it possible to embed image data directly inside
          text-based formats like HTML, CSS, JSON, XML, and SQL. Instead of
          linking to an image file at a URL, you paste the encoded string
          directly where the image needs to appear, and the browser or
          application reconstructs the original image from the string at
          runtime.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This is especially useful for developers building APIs that need to
          transport image data in JSON payloads, for small icons and logos that
          you want to inline in CSS to remove HTTP requests, and for HTML emails
          where external image links are often blocked by email clients. The
          tool returns the raw Base64 string, detects the image format so you
          know the correct MIME type, and renders a live preview from the
          encoded data so you can verify the result before copying.
        </p>

        {/* Where Base64 is used table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Where Base64 images are used — and how
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["Context", "Syntax", "When to use"].map((h) => (
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
                {useCases.map((row, i) => (
                  <tr
                    key={row.context}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-bold text-[#5b32b4] text-xs">
                      {row.context}
                    </td>
                    <td className="px-5 py-3 text-[10px] font-mono text-[#fb397d] break-all max-w-[200px]">
                      {row.example}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.when}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When NOT to use callout */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-[#5b32b4] text-sm mb-3 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#5b32b4]" />
                Use Base64 for:
              </p>
              <ul className="space-y-2">
                {[
                  "Small icons, logos, and placeholder images (under 10KB)",
                  "Images sent through REST or GraphQL APIs as JSON",
                  "HTML email images that bypass blocked external URLs",
                  "Offline web apps where files cannot be fetched",
                  "CSS inline background images to reduce request count",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={12}
                      className="text-[#5b32b4] mt-0.5 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-[#fb397d] text-sm mb-3 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#fb397d]" />
                Avoid Base64 for:
              </p>
              <ul className="space-y-2">
                {[
                  "Large photographs — 33% size increase is significant",
                  "Images used across multiple pages — no browser cache benefit",
                  "Images that change frequently — embedded strings need updating",
                  "Production web assets where CDN delivery is faster",
                  "Any image over 10–20KB where the trade-off becomes negative",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-[#fb397d] mt-0.5 shrink-0 text-xs font-black">
                      ✕
                    </span>
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
            How to Convert an Image to Base64
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Instant output. One-click copy.
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
            Why Use the Snappy-Fix Base64 Converter?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Built for developers — with live verification, one-click copy, and
            the reverse decoder built in.
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
            Everything you need to know about Base64 encoding and embedding
            images in code.
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
      <OtherToolsSection currentSlug="image-to-base64" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
