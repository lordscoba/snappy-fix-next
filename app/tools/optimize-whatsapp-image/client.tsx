// ─── WhatsAppOptimizerPageClient.tsx ─────────────────────────────────────────
"use client";

import { useState } from "react";
import WhatsAppOptimizerTool from "@/components/tools/WhatsappOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Zap,
  ShieldCheck,
  Globe,
  ImageIcon,
  Smartphone,
  Share2,
  Download,
} from "lucide-react";

const faqs = [
  {
    question: "Why does WhatsApp reduce image quality when I send photos?",
    answer:
      "WhatsApp automatically compresses images before sending to reduce data usage and speed up delivery — particularly important because the app is primarily used on mobile data connections. Images above WhatsApp's internal size threshold are re-compressed, introducing blurriness and colour loss. The tool pre-processes your image to 1600px longest side and under 1MB, which is the specification WhatsApp handles with minimal further compression.",
  },
  {
    question: "What does this tool do to my image?",
    answer:
      "The tool applies WhatsApp-specific optimisation: it resizes your image so the longest side is no greater than 1600 pixels (preserving aspect ratio), then compresses to a target of 1000KB using a precision algorithm that finds the highest quality still under the size limit. The output is a progressive JPEG — the format that WhatsApp compresses least aggressively — so the image you send looks as close to the original as possible.",
  },
  {
    question: "What is the best image size for WhatsApp status?",
    answer:
      "WhatsApp Status displays images at a maximum of 1080×1920 px (9:16 vertical, full screen on most phones). For status images, the tool's 1600px optimisation ensures your image fits within WhatsApp's display resolution while staying under the compression threshold. For best results, crop to a 9:16 aspect ratio before optimising if you specifically want a full-screen status.",
  },
  {
    question: "Does the tool change my image's aspect ratio?",
    answer:
      "No. The tool uses longest-side resizing — it scales the image proportionally so the longest dimension does not exceed 1600px, without cropping or distorting the composition. If your image is already smaller than 1600px on the longest side, the dimensions are unchanged and only compression is applied.",
  },
  {
    question: "Does this work for WhatsApp Business image sharing?",
    answer:
      "Yes. WhatsApp Business uses the same image compression pipeline as standard WhatsApp. Optimising product images, catalogues, and promotional photos before sending ensures they reach customers at the highest quality the platform allows — which is important for businesses where image clarity directly affects purchase decisions.",
  },
  {
    question: "Will the optimised image look different from the original?",
    answer:
      "At the compression level this tool targets (under 1MB from a high-quality source), most images retain visually near-identical quality to the original at normal mobile viewing sizes. The benefit is that WhatsApp receives an already-compressed image and applies significantly less further processing — so the image the recipient sees is much closer to what you intended.",
  },
  {
    question:
      "Is it better to send images as documents on WhatsApp to preserve quality?",
    answer:
      "Sending as a document bypasses WhatsApp's image compression entirely and delivers the original file. However, recipients receive a file they must download separately rather than seeing an inline image preview. For professional or high-quality sharing where image detail matters, sending as a document is the highest-quality option. For everyday sharing where inline preview and convenience matter more, this tool optimises images to the best possible quality within WhatsApp's standard image pipeline.",
  },
  {
    question:
      "Is the WhatsApp image optimizer free and does it add a watermark?",
    answer:
      "Yes — completely free with no usage limits and no watermark on the output. Share your WhatsApp-ready image with no added branding.",
  },
];

const benefits = [
  {
    icon: <Zap size={20} className="text-[#c3003a]" />,
    title: "One-click optimisation",
    description:
      "No settings. Upload, click one button, download a WhatsApp-ready file — dimensions, compression, and encoding handled automatically.",
  },
  {
    icon: <Smartphone size={20} className="text-[#5b32b4]" />,
    title: "Clearer images on delivery",
    description:
      "Pre-optimising to 1600px / 1MB means WhatsApp applies far less further compression — the image recipients see is noticeably sharper.",
  },
  {
    icon: <Share2 size={20} className="text-[#c3003a]" />,
    title: "Chats, groups, and status",
    description:
      "Works for all WhatsApp sharing contexts — individual chats, group messages, WhatsApp Business catalogues, and Status updates.",
  },
  {
    icon: <ImageIcon size={20} className="text-[#5b32b4]" />,
    title: "Progressive JPEG output",
    description:
      "Progressive JPEG encoding loads visually faster and is handled more efficiently by WhatsApp's compression pipeline than standard JPEG.",
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
      "Fully responsive — optimise on desktop, laptop, tablet, or smartphone from any modern browser without software.",
  },
];

const formats = [
  {
    format: "Chat / group image",
    dims: "≤ 1600px longest side",
    use: "Inline image preview in conversation",
  },
  {
    format: "WhatsApp Status",
    dims: "1080 × 1920 px (9:16)",
    use: "Full-screen vertical display on recipient's phone",
  },
  {
    format: "Profile photo",
    dims: "500 × 500 px",
    use: "Displayed as circle in contact list and chat header",
  },
  {
    format: "Business catalogue",
    dims: "≤ 1600px longest side",
    use: "Product images in WhatsApp Business catalogue",
  },
  {
    format: "Tool output (optimised)",
    dims: "≤ 1600px / under 1MB",
    use: "Minimal re-compression by WhatsApp's pipeline",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      "Drag and drop your photo onto the upload zone or click to browse. Supports JPG, PNG, and WebP from any camera or design tool.",
  },
  {
    number: "02",
    title: "Click Optimize for WhatsApp",
    description:
      "Hit the single button. The tool resizes to 1600px longest side, compresses to under 1MB, and outputs progressive JPEG — no settings required.",
  },
  {
    number: "03",
    title: "Download your optimised image",
    description:
      'Click "Download Optimized Image" to save the WhatsApp-ready file. The filename includes a timestamp so it does not overwrite your original.',
  },
  {
    number: "04",
    title: "Send on WhatsApp",
    description:
      "Share the downloaded file on WhatsApp. Because it already meets WhatsApp's preferred specifications, minimal additional compression is applied — recipients see your photo at its best.",
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

export default function WhatsAppOptimizerPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <MessageCircle size={14} />
          WhatsApp Image Tool
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Optimize Images for WhatsApp
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Stop WhatsApp from degrading your photos. One-click optimisation to
          1600px and under 1MB using progressive JPEG — so recipients see your
          image at the best quality WhatsApp allows. Free, no watermark, no
          signup.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "Progressive JPEG",
            "1600px / 1MB Target",
            "Chats · Status · Business",
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

      <WhatsAppOptimizerTool />

      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="intent-heading"
      >
        <h2
          id="intent-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Why WhatsApp Makes Your Photos Look Blurry
        </h2>
        <p className="text-gray-600 leading-relaxed">
          WhatsApp compresses images automatically on every send to reduce data
          usage — especially important since the app is used heavily on mobile
          data. When your image is large in file size or pixel dimensions,
          WhatsApp's compression is more aggressive, and the image the recipient
          receives is noticeably lower quality than what you sent.
          Pre-optimising eliminates most of this degradation by sending WhatsApp
          an image that already meets its preferred specifications.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The tool targets 1600px longest side and under 1MB — exactly the
          window WhatsApp accepts without triggering heavy re-compression. The
          progressive JPEG output format loads faster on mobile and is handled
          more efficiently by WhatsApp's pipeline than standard JPEG files.
        </p>

        {/* Format table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            WhatsApp image size reference
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["Context", "Recommended size", "Notes"].map((h) => (
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
                    <td className="px-5 py-3 text-xs font-black text-[#c3003a] font-mono">
                      {row.dims}
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
                  "Anyone who notices blurry photos after sending on WhatsApp",
                  "Businesses sharing product images via WhatsApp Business",
                  "Photographers sending proofs to clients through WhatsApp",
                  "Content creators posting high-quality WhatsApp Status updates",
                  "Families sharing event and holiday photos in group chats",
                  "Marketers distributing promotional images via broadcast lists",
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
                When to optimise before sending:
              </p>
              <ul className="space-y-2">
                {[
                  "Every time — all images benefit from pre-optimisation",
                  "Before sending product photography to customers",
                  "Before posting to WhatsApp Status where quality is visible to all contacts",
                  "When camera photos look noticeably compressed after sending",
                  "Before sending images in group chats where quality matters",
                  "When sending images on slow or limited data connections",
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

      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="howto-heading"
      >
        <div className="text-center space-y-3">
          <h2
            id="howto-heading"
            className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
          >
            How to Optimize an Image for WhatsApp
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. One button. WhatsApp-ready in seconds.
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
            Why Use the Snappy-Fix WhatsApp Optimizer?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            One click. Better quality on delivery every time.
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
            Everything about optimising images for WhatsApp and preventing
            quality loss on send.
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

      <OtherToolsSection currentSlug="optimize-whatsapp-image" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
