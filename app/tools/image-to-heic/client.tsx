"use client";

import { useState } from "react";
import ImageToHeicTools from "@/components/tools/ImageToHeicTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  HardDrive,
  Zap,
  ShieldCheck,
  Download,
  Globe,
  Sliders,
  Smartphone,
  FileImage,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What is HEIC and why would I want to convert to it?",
    answer:
      "HEIC (High Efficiency Image Container) is Apple's modern image format that uses the HEVC compression algorithm to store images at roughly half the file size of JPEG while maintaining equivalent or better visual quality. If you have images stored as JPG or PNG that you want to save to an iPhone or iPad, archive on Apple hardware, or simply reduce in storage size without noticeable quality loss, converting to HEIC achieves all of these goals — producing significantly smaller files that integrate natively with Apple's ecosystem.",
  },
  {
    question: "What does the quality slider control?",
    answer:
      "The quality slider sets the HEIC compression level on a scale of 10 to 100. A value of 100 applies minimal compression — the output file is larger but preserves maximum detail. A value of 10 applies maximum compression — the file is smallest but some visual detail is lost. The default is 80, which is the standard used by iPhones when shooting in HEIC mode — it strikes the optimal balance between file size reduction and image quality that Apple's own engineers chose for daily photography.",
  },
  {
    question: "How much smaller will my file be after converting to HEIC?",
    answer:
      "At the default quality of 80, HEIC typically produces files that are 40–50% smaller than an equivalent JPEG at the same visual quality. A 4MB JPEG photograph commonly becomes a 1.5–2MB HEIC file. At quality 60, reductions of 60–70% are common. The exact result depends on the content of the image — photographs with complex colour gradients benefit more from HEIC compression than simple flat-colour graphics.",
  },
  {
    question: "Can I open HEIC files on Windows or Android after converting?",
    answer:
      "HEIC has limited support on non-Apple platforms. Windows 10 and 11 require a paid codec extension from the Microsoft Store to open HEIC files natively. Android does not support HEIC natively. Most Windows apps (Photoshop, Lightroom) support HEIC. If you need the converted file to work on Windows or Android without additional software, convert to JPG or PNG instead. If you are archiving for Apple devices or iCloud, HEIC is the right choice.",
  },
  {
    question: "What image formats can I convert to HEIC?",
    answer:
      "The tool accepts all standard web image formats: JPG, JPEG, PNG, WebP, BMP, GIF, and TIFF. Any image you upload is converted to HEIC at your chosen quality level regardless of the source format.",
  },
  {
    question: "Will converting a JPEG to HEIC improve quality?",
    answer:
      "No. Converting from JPEG to HEIC does not recover quality that JPEG compression already discarded. The HEIC output will be lossless relative to the JPEG source — but the quality ceiling is the JPEG you start with, not the original uncompressed image. The benefit of converting JPEG to HEIC is purely file size: you get a smaller file at equivalent visual quality to the JPEG. If you want to improve quality, you need to start from a higher-resolution or less-compressed source.",
  },
  {
    question: "What quality setting should I use?",
    answer:
      "For general photography storage and sharing: use 80 (the default — matches iPhone's own HEIC quality). For archival where quality is paramount: use 90–100. For maximum storage savings where minor quality reduction is acceptable: use 60–70. For web thumbnails or previews where file size matters most: use 40–60. Avoid values below 30 unless you specifically need the smallest possible file — compression artefacts become noticeable below this threshold for most photographs.",
  },
  {
    question:
      "Is the Image to HEIC converter free and does it add a watermark?",
    answer:
      "Yes — completely free with no usage limits and no watermark on converted images. Convert as many images as you need at no cost with no account required.",
  },
  {
    question: "Are my uploaded images stored on your servers?",
    answer:
      "No. Your image is uploaded for conversion and the HEIC result is returned to your browser. No copy of your original or converted image is retained on our servers after the conversion is complete.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <HardDrive size={20} className="text-[#fb397d]" />,
    title: "40–50% smaller files",
    description:
      "HEIC typically produces files 40–50% smaller than JPEG at equivalent quality — freeing storage on iCloud, devices, and backup drives.",
  },
  {
    icon: <Sliders size={20} className="text-[#5b32b4]" />,
    title: "Adjustable quality slider",
    description:
      "Set compression from 10 to 100. The default of 80 matches iPhone's native HEIC quality — or go higher for archival, lower for maximum savings.",
  },
  {
    icon: <FileImage size={20} className="text-[#fb397d]" />,
    title: "Any format to HEIC",
    description:
      "Converts JPG, PNG, WebP, BMP, TIFF, and GIF to HEIC — not just JPEG. Bring any image into Apple's efficient storage format.",
  },
  {
    icon: <Zap size={20} className="text-[#5b32b4]" />,
    title: "Instant conversion",
    description:
      "Upload and convert in seconds. No processing queue, no waiting — your HEIC file is ready to download immediately.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#fb397d]" />,
    title: "Private and secure",
    description:
      "Your images are processed securely and never permanently stored. Original and converted files are discarded after the session ends.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive — convert images to HEIC on desktop, laptop, tablet, or smartphone from any modern browser.",
  },
];

// ─── Quality guide ────────────────────────────────────────────────────────────
const qualityGuide = [
  {
    range: "90–100",
    label: "Maximum quality",
    use: "Archival, professional photography",
    size: "Largest",
  },
  {
    range: "80",
    label: "iPhone default ★",
    use: "Daily photography, general use",
    size: "50% smaller than JPEG",
  },
  {
    range: "60–70",
    label: "High efficiency",
    use: "Storage-conscious sharing",
    size: "60% smaller than JPEG",
  },
  {
    range: "40–60",
    label: "Web / previews",
    use: "Thumbnails, low-bandwidth use",
    size: "Smallest practical",
  },
  {
    range: "10–30",
    label: "Maximum compression",
    use: "Only where size is critical",
    size: "Very small, visible artefacts",
  },
];

// ─── Format comparison ────────────────────────────────────────────────────────
const formatComparison = [
  {
    format: "JPG (source)",
    size: "4.0 MB",
    quality: "Baseline",
    support: "Universal",
  },
  {
    format: "HEIC quality 100",
    size: "~2.8 MB",
    quality: "Lossless vs JPG",
    support: "Apple native",
  },
  {
    format: "HEIC quality 80",
    size: "~1.8 MB",
    quality: "Equivalent to JPG",
    support: "Apple native",
  },
  {
    format: "HEIC quality 60",
    size: "~1.2 MB",
    quality: "Minor reduction",
    support: "Apple native",
  },
  {
    format: "PNG (lossless)",
    size: "~9.0 MB",
    quality: "Lossless",
    support: "Universal",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Set your quality level",
    description:
      "Before uploading, adjust the HEIC Quality slider at the top of the tool. The default of 80 matches iPhone's own HEIC compression — the sweet spot between file size and visual quality used by Apple's engineers.",
  },
  {
    number: "02",
    title: "Upload your image",
    description:
      "Drag and drop your image onto the upload zone or click to browse. A live preview loads immediately. Supported formats: JPG, PNG, WebP, BMP, TIFF, and GIF.",
  },
  {
    number: "03",
    title: "Click Convert to HEIC",
    description:
      "Hit the button and watch the progress bar as your image is uploaded and converted. The conversion processes server-side and completes in seconds.",
  },
  {
    number: "04",
    title: "Download your HEIC file",
    description:
      'Click "Download HEIC Image" to save the converted file to your device. The HEIC file is ready to use on iPhone, iPad, Mac, or iCloud immediately.',
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
export default function ImageToHeicPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <HardDrive size={14} />
          Apple Format Converter
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Image to HEIC Converter
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Convert JPG, PNG, WebP, and other images to HEIC format with
          adjustable quality control. Reduce file size by up to 50% while
          maintaining excellent visual quality — free, no watermark, no signup.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "Quality Slider (10–100)",
            "40–50% Size Reduction",
            "No Watermark",
            "No Signup",
            "Apple Compatible",
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
      <ImageToHeicTools />

      {/* ── Direct Intent ────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Why Convert Images to HEIC Format?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          HEIC (High Efficiency Image Container) is the image format Apple
          introduced with iOS 11 — and for good reason. Using the HEVC
          compression algorithm, HEIC stores images at roughly half the file
          size of JPEG while maintaining equivalent or better visual quality.
          iPhones shoot in HEIC by default because it lets them store twice as
          many photos in the same storage space without any perceptible drop in
          image quality.
        </p>
        <p className="text-gray-600 leading-relaxed">
          If you have a library of JPG or PNG images you want to archive more
          efficiently, store on an iPhone, sync to iCloud, or simply reduce the
          storage footprint of — converting to HEIC is the most effective format
          choice. This tool adds a quality slider so you can precisely control
          the compression level: higher quality for archival use, lower quality
          for maximum space savings.
        </p>

        {/* Quality guide table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Quality setting guide
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {[
                    "Quality range",
                    "Level",
                    "Best for",
                    "Approx. file size",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-3 font-bold text-[#5b32b4] text-xs uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {qualityGuide.map((row, i) => (
                  <tr
                    key={row.range}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-black text-[#5b32b4] text-xs font-mono">
                      {row.range}
                    </td>
                    <td className="px-5 py-3 text-xs font-bold text-[#2b1d3a]">
                      {row.label}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.use}
                    </td>
                    <td className="px-5 py-3 text-xs font-bold text-[#fb397d]">
                      {row.size}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* File size comparison table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            File size comparison — 4MB JPEG source
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {[
                    "Format",
                    "Approx. size",
                    "Quality impact",
                    "Platform support",
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
                {formatComparison.map((row, i) => (
                  <tr
                    key={row.format}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-bold text-[#2b1d3a] text-xs">
                      {row.format}
                    </td>
                    <td className="px-5 py-3 font-black text-[#fb397d] text-xs">
                      {row.size}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.quality}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-500">
                      {row.support}
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
                Who converts to HEIC:
              </p>
              <ul className="space-y-2">
                {[
                  "Apple users archiving existing JPG libraries to save storage",
                  "Photographers moving images from Windows cameras to iPhone",
                  "iCloud users reducing their storage footprint",
                  "Developers preparing images for iOS app assets",
                  "Content creators building Apple-native image libraries",
                  "Families backing up photos to Apple-native formats",
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
                When HEIC is the right choice:
              </p>
              <ul className="space-y-2">
                {[
                  "Storing images on iPhone, iPad, or Mac natively",
                  "Uploading to iCloud where HEIC is the preferred format",
                  "Archiving large photo libraries with reduced storage cost",
                  "Reducing the size of image exports from non-Apple cameras",
                  "Building iOS apps where HEIC assets load efficiently",
                  "When you specifically need Apple-ecosystem compatibility",
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
            How to Convert an Image to HEIC
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Quality control. Apple-ready output.
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
            Why Use the Snappy-Fix Image to HEIC Converter?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Quality control, broad format support, and genuine file size
            reduction — not just a format rename.
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
            Everything you need to know about converting images to HEIC format
            and choosing the right quality setting.
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
      <OtherToolsSection currentSlug="image-to-heic" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
