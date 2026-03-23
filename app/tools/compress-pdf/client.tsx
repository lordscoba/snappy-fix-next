"use client";

import { useState } from "react";
import PDFCompressorTools from "@/components/tools/PDFCompressorTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  FileText,
  Zap,
  ShieldCheck,
  Download,
  Globe,
  Settings2,
  Mail,
  HardDrive,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "How can I compress a PDF file online for free?",
    answer:
      "Upload your PDF to the Snappy-Fix PDF Compressor, choose Standard or Pro mode, and click Compress PDF. The tool automatically reduces your file size within seconds and gives you a download link — no payment, no signup, no watermark.",
  },
  {
    question: "What is the difference between Standard and Pro compression?",
    answer:
      "Standard mode applies a preset compression level (low, medium, or high) that suits most everyday documents like reports, invoices, and presentations. Pro mode gives you manual control over image quality (0–100) and DPI resolution, making it ideal for design documents, portfolios, and files where precise output matters.",
  },
  {
    question: "Does compressing a PDF reduce its quality?",
    answer:
      "Standard compression at medium level reduces file size significantly while keeping text sharp and images readable. If you need higher fidelity, use Pro mode and set quality to 80–90 and DPI to 150–200. For text-only PDFs, compression has virtually no visible effect on quality.",
  },
  {
    question: "Is the Snappy-Fix PDF Compressor completely free?",
    answer:
      "Yes — both Standard and Pro compression modes are completely free with no usage limits, no watermarks on your output, and no account required. Upload your PDF and download the compressed version instantly.",
  },
  {
    question: "Are my uploaded PDF files stored on your servers?",
    answer:
      "No. Your PDF is processed securely and is not permanently retained after compression is complete. We do not store, read, or share the contents of your documents.",
  },
  {
    question: "What is the maximum PDF file size I can compress?",
    answer:
      "The tool supports PDF files up to 50MB. For most business documents, presentations, and scanned files, this limit is more than sufficient. If your file exceeds the limit, consider splitting it before compressing.",
  },
  {
    question: "Can I compress a PDF on my phone or tablet?",
    answer:
      "Yes. The Snappy-Fix PDF Compressor is fully responsive and works on all modern iOS and Android browsers. Upload from your device's file storage, compress, and download — all from your mobile browser without installing any app.",
  },
  {
    question: "Why is my compressed PDF still large?",
    answer:
      "If your PDF contains many high-resolution images or embedded fonts, compression may have limited effect at medium level. Switch to Pro mode, lower the quality setting to 60–70 and DPI to 96–120 for more aggressive reduction. Alternatively, if the PDF is mostly vector graphics or text, the file size was already optimised and compression gains will be modest.",
  },
  {
    question: "Does this tool work for scanned PDF documents?",
    answer:
      "Yes. Scanned PDFs are image-heavy by nature and benefit the most from compression. Pro mode with a DPI of 150 and quality of 70 typically reduces scanned document size by 40–70% while keeping the text readable.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Zap size={20} className="text-[#c3003a]" />,
    title: "Instant compression",
    description:
      "Upload and compress in seconds. No processing queue, no waiting — your smaller PDF is ready to download immediately.",
  },
  {
    icon: <Settings2 size={20} className="text-[#5b32b4]" />,
    title: "Standard and Pro modes",
    description:
      "Choose simple preset compression or take full manual control over quality and DPI in Pro mode for precise output.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#c3003a]" />,
    title: "Secure processing",
    description:
      "Your documents are processed securely and never permanently stored. What you upload stays private.",
  },
  {
    icon: <Download size={20} className="text-[#5b32b4]" />,
    title: "No watermark",
    description:
      "Download your compressed PDF exactly as it was — clean, unmodified, and free of any added branding or watermarks.",
  },
  {
    icon: <Globe size={20} className="text-[#c3003a]" />,
    title: "Works on any device",
    description:
      "Fully responsive. Compress PDFs from your desktop, laptop, tablet, or smartphone — any modern browser works.",
  },
  {
    icon: <HardDrive size={20} className="text-[#5b32b4]" />,
    title: "Preserve readability",
    description:
      "Smart compression optimises images and metadata inside your PDF without making text blurry or layouts distorted.",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your PDF",
    description:
      "Drag and drop your PDF onto the upload zone or click to browse your device. The tool accepts any valid PDF file up to 50MB.",
  },
  {
    number: "02",
    title: "Choose your compression mode",
    description:
      "Select Standard for quick automatic compression at low, medium, or high levels. Switch to Pro if you need to set a specific quality percentage and DPI for precise control over the output.",
  },
  {
    number: "03",
    title: "Click Compress PDF",
    description:
      "Hit the Compress PDF button and watch the progress bar as your document is processed. Standard compression takes under 10 seconds for most files.",
  },
  {
    number: "04",
    title: "Download your compressed file",
    description:
      "Once processing is complete, click Download Compressed PDF to save the optimised file to your device. Compare the before and after size to see the reduction.",
  },
];

// ─── Use cases ────────────────────────────────────────────────────────────────
const useCases = [
  {
    icon: <Mail size={16} />,
    label: "Email attachments that exceed size limits",
  },
  { icon: <Globe size={16} />, label: "Website and portal document uploads" },
  { icon: <HardDrive size={16} />, label: "Cloud storage and archiving" },
  {
    icon: <FileText size={16} />,
    label: "Scanned document file size reduction",
  },
  {
    icon: <Download size={16} />,
    label: "Faster document sharing and transfer",
  },
  { icon: <Settings2 size={16} />, label: "Print-ready PDF optimisation" },
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
export default function CompressPDFPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <FileText size={14} />
          Free PDF Tool
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Free PDF Compressor
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Compress PDF files online and reduce file size instantly while
          preserving document quality. Perfect for email attachments, website
          uploads, document storage, and sharing large PDFs quickly and securely
          — with Standard and Pro compression modes.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "Standard & Pro Modes",
            "No Watermark",
            "No Signup",
            "Secure Processing",
            "Works on Mobile",
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
      <PDFCompressorTools />

      {/* ── What is PDF Compression — Direct Intent ──────────── */}
      <section
        className="max-w-4xl mx-auto space-y-6"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          What Does PDF Compression Actually Do?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          PDF compression reduces the byte size of a document by optimising the
          internal components that contribute most to file weight — primarily
          embedded images, fonts, metadata, and redundant binary streams. The
          result is a smaller file that retains the same layout, text, and
          visual structure as the original.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Our tool offers two modes to match different needs. Standard mode
          applies automatic compression at your chosen level (low, medium, or
          high) and is ideal for everyday documents. Pro mode unlocks manual
          control over image quality percentage and output DPI, giving you
          precision when working with design-heavy files, print-ready documents,
          or scanned archives.
        </p>

        {/* Value intent — when and who */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-[#2b1d3a] mb-3 text-sm">
                When you need to compress a PDF:
              </p>
              <ul className="space-y-2">
                {useCases.map((u) => (
                  <li
                    key={u.label}
                    className="flex items-center gap-2.5 text-sm text-gray-600"
                  >
                    <span className="text-[#5b32b4] shrink-0">{u.icon}</span>
                    {u.label}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-[#2b1d3a] mb-3 text-sm">
                Which mode should I use?
              </p>
              <div className="space-y-3">
                <div className="bg-[#5b32b4]/5 border border-[#5b32b4]/20 rounded-xl p-4">
                  <p className="font-bold text-[#5b32b4] text-sm mb-1">
                    Standard Mode
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Best for reports, invoices, CVs, presentations, and everyday
                    documents. Choose low, medium, or high and let the tool
                    decide the details.
                  </p>
                </div>
                <div className="bg-[#fb397d]/5 border border-[#fb397d]/20 rounded-xl p-4">
                  <p className="font-bold text-[#c3003a] text-sm mb-1">
                    Pro Mode
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Best for design portfolios, scanned archives, and
                    print-ready files where you need to balance size reduction
                    against specific quality targets.
                  </p>
                </div>
              </div>
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
            How to Compress a PDF Online
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Under thirty seconds. No software installation needed.
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
            Why Use the Snappy-Fix PDF Compressor?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Built for speed, privacy, and real control over your output — not
            just a single-button black box.
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
            Everything you need to know about compressing PDF files online.
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
      <OtherToolsSection currentSlug="compress-pdf" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
