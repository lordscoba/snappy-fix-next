"use client";

import { useState } from "react";
import ImageToPDFConverterTools from "@/components/tools/ImageToPDFConverterTools";
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
  Printer,
  Mail,
  Share2,
  FolderOpen,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What image formats can I convert to PDF?",
    answer:
      "The tool accepts all standard web image formats including JPG, JPEG, PNG, WebP, BMP, GIF, and TIFF. Any valid image file you upload will be embedded into a high-quality PDF document ready to download, print, or share.",
  },
  {
    question:
      "Why would I convert an image to PDF instead of sharing the image directly?",
    answer:
      "PDF is the universally accepted format for documents in professional and business contexts. Converting your image to PDF makes it easier to print with correct page sizing, attach to emails as a formal document, submit to organisations that require PDF format (government portals, application forms, university submissions), combine with other documents in PDF editors, and protect with passwords or permissions if needed. PDF files also render identically on every device and operating system, while image display varies by viewer.",
  },
  {
    question: "Will the image quality be preserved in the PDF?",
    answer:
      "Yes. The conversion embeds your original image into the PDF document at its native resolution. The image is not re-compressed or downscaled during the conversion process — the visual quality of the image inside the PDF matches the quality of the original file you uploaded.",
  },
  {
    question: "What page size does the PDF use?",
    answer:
      "The PDF is generated to fit your image — the page dimensions are set to match the image's proportions so there is no white border or cropping. The resulting PDF contains your image displayed at full size within the document.",
  },
  {
    question: "Can I convert a screenshot to PDF using this tool?",
    answer:
      "Yes. Screenshots are standard image files (usually PNG) and convert perfectly using this tool. This is especially useful for preserving web pages, receipts, confirmations, chat logs, and other on-screen content as permanent PDF documents that can be filed, printed, or shared.",
  },
  {
    question:
      "Can I use this to submit images as PDF documents to official portals?",
    answer:
      "Yes. Many government portals, visa applications, university admissions systems, HR portals, and online forms require documents to be uploaded in PDF format — even when the content is a photograph or scan. This tool converts your image to a clean PDF that meets those requirements instantly, without needing Adobe Acrobat or any desktop software.",
  },
  {
    question: "Is there a file size limit for uploading images?",
    answer:
      "The tool handles standard web image files up to 20MB. Most photographs, scans, and screenshots fall well within this limit. For very large images (print-resolution scans above 20MB), consider resizing the image first using the Image Resizer tool before converting to PDF.",
  },
  {
    question: "Does the converted PDF have a watermark?",
    answer:
      "No — the converted PDF is completely clean with no watermarks, no Snappy-Fix branding, and no added text. The PDF contains only your image, exactly as uploaded.",
  },
  {
    question: "Are my uploaded images stored on your servers?",
    answer:
      "No. Your image is uploaded for conversion and the PDF result is returned directly to your browser. No copy of your original image or the generated PDF is retained on our servers after the conversion is complete.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Zap size={20} className="text-[#c3003a]" />,
    title: "Instant conversion",
    description:
      "Upload your image and get a downloadable PDF in seconds — no processing queue, no email delivery, no waiting.",
  },
  {
    icon: <Printer size={20} className="text-[#5b32b4]" />,
    title: "Print-ready PDF",
    description:
      "The PDF is sized to fit your image perfectly — no white borders, no cropping, ready to print on any printer or send to a print shop.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#c3003a]" />,
    title: "No watermark",
    description:
      "Download a completely clean PDF with no added branding, watermarks, or overlaid text. Your image, unmodified.",
  },
  {
    icon: <Mail size={20} className="text-[#5b32b4]" />,
    title: "Email and portal ready",
    description:
      "PDF is the accepted format for professional email attachments, government portals, visa applications, and online submissions.",
  },
  {
    icon: <Globe size={20} className="text-[#c3003a]" />,
    title: "Works on any device",
    description:
      "Fully responsive — convert images to PDF on desktop, laptop, tablet, or smartphone from any modern browser without installing software.",
  },
  {
    icon: <FolderOpen size={20} className="text-[#5b32b4]" />,
    title: "Original quality preserved",
    description:
      "The image is embedded at its native resolution — no re-compression, no downscaling. The PDF looks exactly like your original image.",
  },
];

// ─── Use cases ────────────────────────────────────────────────────────────────
const useCases = [
  {
    icon: <FileText size={15} />,
    label: "Convert scanned documents to PDF for filing",
    color: "#5b32b4",
  },
  {
    icon: <Printer size={15} />,
    label: "Prepare photos for printing on standard paper sizes",
    color: "#fb397d",
  },
  {
    icon: <Mail size={15} />,
    label: "Attach images as PDF to professional emails",
    color: "#5b32b4",
  },
  {
    icon: <Share2 size={15} />,
    label: "Submit photos to visa, passport, or government portals",
    color: "#fb397d",
  },
  {
    icon: <FolderOpen size={15} />,
    label: "Archive screenshots and receipts as permanent PDFs",
    color: "#5b32b4",
  },
  {
    icon: <Globe size={15} />,
    label: "Upload images to systems that only accept PDF format",
    color: "#fb397d",
  },
  {
    icon: <FileText size={15} />,
    label: "Convert WhatsApp photos to PDF for document submissions",
    color: "#5b32b4",
  },
  {
    icon: <Printer size={15} />,
    label: "Turn product images into printable PDF catalogues",
    color: "#fb397d",
  },
];

// ─── Image vs PDF comparison ──────────────────────────────────────────────────
const comparison = [
  {
    aspect: "Professional document submissions",
    image: "Often rejected",
    pdf: "✓ Universally accepted",
  },
  {
    aspect: "Print page sizing",
    image: "Varies by viewer",
    pdf: "✓ Consistent on all printers",
  },
  {
    aspect: "Email attachments",
    image: "Opens in image viewer",
    pdf: "✓ Opens as a document",
  },
  {
    aspect: "Government / visa portals",
    image: "Usually not accepted",
    pdf: "✓ Required format",
  },
  {
    aspect: "Cross-device rendering",
    image: "Varies by viewer app",
    pdf: "✓ Identical on all devices",
  },
  {
    aspect: "Archive and file management",
    image: "Mixed with media files",
    pdf: "✓ Filed as a document",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      "Drag and drop your image file onto the upload zone or click to browse. Supports JPG, PNG, WebP, and all other standard image formats. A preview loads immediately after upload.",
  },
  {
    number: "02",
    title: "Click Convert to PDF",
    description:
      "Hit the Convert to PDF button and watch the progress bar as your image is uploaded and processed. The conversion completes in seconds for most image sizes.",
  },
  {
    number: "03",
    title: "Download your PDF",
    description:
      'Click "Download PDF" to save the converted file to your device. The PDF contains your image at its original resolution, sized to fit the page perfectly with no borders or cropping.',
  },
  {
    number: "04",
    title: "Use it anywhere PDFs are accepted",
    description:
      "Your PDF is ready to print, email, attach to applications, upload to portals, or file as a document. It opens identically on Windows, Mac, iOS, Android, and every PDF viewer.",
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
export default function ImageToPDFPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <FileText size={14} />
          Free Document Tool
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Image to PDF Converter
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Convert any image to a high-quality PDF document instantly. Turn JPG,
          PNG, WebP, and other images into print-ready, shareable PDF files —
          free, no watermark, no software required.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "No Watermark",
            "Original Quality",
            "Print-Ready PDF",
            "No Signup",
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
      <ImageToPDFConverterTools />

      {/* ── Direct Intent ────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Why Convert an Image to PDF?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Images and PDFs serve different purposes in the digital world. While
          images are perfect for viewing and sharing media, PDF is the
          universally accepted format for documents — and many official systems,
          professional contexts, and submission portals simply do not accept
          images. Government portals require PDFs for visa applications. HR
          systems require PDFs for identity documents. University admissions
          require PDFs for transcripts and certificates. When you have an image
          and you need a document, this tool bridges that gap in seconds.
        </p>
        <p className="text-gray-600 leading-relaxed">
          PDF also ensures your image is displayed identically on every device
          and operating system. An image file opened on different phones,
          laptops, and operating systems can appear at different sizes,
          orientations, or qualities. A PDF renders the same way everywhere —
          making it the reliable choice for anything you want to print, file, or
          share professionally.
        </p>

        {/* Image vs PDF table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Image file vs PDF — when each is the right choice
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["Use case", "Image file", "PDF"].map((h) => (
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
                {comparison.map((row, i) => (
                  <tr
                    key={row.aspect}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-medium text-[#2b1d3a] text-sm">
                      {row.aspect}
                    </td>
                    <td className="px-5 py-3 text-xs text-red-400 font-medium">
                      {row.image}
                    </td>
                    <td className="px-5 py-3 text-xs font-bold text-[#5b32b4]">
                      {row.pdf}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Use cases grid */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative">
            <p className="font-bold text-[#2b1d3a] text-sm mb-4">
              Common reasons to convert image to PDF:
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {useCases.map((u) => (
                <div
                  key={u.label}
                  className="flex items-start gap-2.5 text-sm text-gray-600"
                >
                  <span style={{ color: u.color }} className="shrink-0 mt-0.5">
                    {u.icon}
                  </span>
                  {u.label}
                </div>
              ))}
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
            How to Convert an Image to PDF
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Three steps. Under 10 seconds. Ready to print, share, or submit.
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
            Why Use the Snappy-Fix Image to PDF Converter?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Fast, clean, and reliable — no Acrobat, no subscription, no
            watermark.
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
            Everything you need to know about converting images to PDF online.
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
      <OtherToolsSection currentSlug="image-to-pdf" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
