"use client";

import { useState } from "react";
import ImageAnalyserTools from "@/components/tools/ImageAnalyserTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  ScanSearch,
  Zap,
  ShieldCheck,
  Palette,
  FileSearch,
  Maximize,
  BarChart3,
  Info,
  Globe,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What information does the Image Analyzer extract?",
    answer:
      "The tool extracts a comprehensive set of image properties in one scan: pixel dimensions (width × height), aspect ratio with a named label (16:9, 4:3, 1:1 etc.), file format, colour mode, file size in KB, brightness score (0–255 scale), contrast score, dominant colour as a hex code, a full extracted colour palette with hex codes you can copy, all available EXIF metadata (camera model, GPS, exposure settings, creation date), and AI-generated optimisation recommendations specific to your image.",
  },
  {
    question: "What is EXIF metadata and why does it matter?",
    answer:
      "EXIF (Exchangeable Image File Format) metadata is hidden data embedded inside JPEG and some other image files by the device that captured them — typically a camera or smartphone. It records information like the camera model, lens focal length, aperture, shutter speed, ISO, GPS coordinates of where the photo was taken, and the exact date and time. This data is useful for photographers verifying their camera settings, for developers validating image origins, and for privacy-conscious users who may want to strip it before sharing publicly.",
  },
  {
    question: "What is a brightness score and how is it measured?",
    answer:
      "The brightness score is measured on a 0–255 scale representing the average pixel luminance across the entire image. A score below 40 is classified as Very Dark, 40–90 as Dark, 90–170 as Balanced, and above 170 as Very Bright. This is useful for checking whether an image will render well on both light and dark website backgrounds, or whether it needs exposure adjustment before use.",
  },
  {
    question: "What does the contrast score tell me?",
    answer:
      "The contrast score measures the spread between the darkest and lightest pixel values in the image. A score below 20 indicates Low Contrast — the image looks flat or washed out. A score of 20–50 is Balanced Contrast. Above 50 is High Contrast — strong differentiation between light and dark areas. High contrast images typically convert better in marketing contexts. Low contrast images may need adjustment for accessibility compliance.",
  },
  {
    question: "How do I use the colour palette feature?",
    answer:
      "After analysis, the tool displays the dominant colour and a full extracted colour palette showing the most prominent colours in your image. Each colour swatch shows its hex code. Click any colour swatch to copy the hex code to your clipboard instantly — useful for matching brand colours, building colour schemes in design tools, or identifying the main tones in a photo.",
  },
  {
    question: "What are the AI optimisation recommendations?",
    answer:
      "After scanning your image, the tool generates specific recommendations based on what it finds — for example, flagging oversized file sizes, suggesting format conversions (e.g. convert to WebP for smaller size), noting very high or low brightness that may affect usability, or identifying unnecessarily large dimensions for the intended use. These are practical, actionable suggestions rather than generic advice.",
  },
  {
    question: "Does this tool modify or alter my image in any way?",
    answer:
      "No. The Image Analyzer is read-only — it inspects your image and returns analysis data but does not change, compress, resize, or save your file. The original image remains exactly as uploaded.",
  },
  {
    question: "What image formats does the analyzer support?",
    answer:
      "The tool accepts all standard web image formats including JPG, JPEG, PNG, WebP, GIF, BMP, TIFF, and SVG. EXIF metadata extraction applies primarily to JPG and TIFF files — other formats typically contain minimal embedded metadata.",
  },
  {
    question: "Are my images stored on your servers after analysis?",
    answer:
      "No. Your image is uploaded for analysis and the results are returned to your browser. No copy of your image is retained on our servers after the analysis is complete. This applies to all images including those containing GPS or personal EXIF data.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Maximize size={20} className="text-[#fb397d]" />,
    title: "Full dimensional analysis",
    description:
      "Get pixel dimensions, aspect ratio with named labels, and a resolution tier (HD, Full HD, 4K) — all in one scan.",
  },
  {
    icon: <Palette size={20} className="text-[#5b32b4]" />,
    title: "Colour palette extraction",
    description:
      "Extracts the dominant colour and full colour palette with one-click hex copy — useful for design matching and brand consistency.",
  },
  {
    icon: <BarChart3 size={20} className="text-[#fb397d]" />,
    title: "Brightness and contrast scores",
    description:
      "Measures luminance and contrast on standardised scales with named interpretations — Balanced, High Contrast, Very Dark, etc.",
  },
  {
    icon: <Info size={20} className="text-[#5b32b4]" />,
    title: "EXIF metadata viewer",
    description:
      "Surfaces all hidden metadata embedded in your image — camera model, GPS coordinates, exposure settings, and creation timestamps.",
  },
  {
    icon: <Zap size={20} className="text-[#fb397d]" />,
    title: "AI optimisation recommendations",
    description:
      "Generates specific, actionable suggestions based on your image's actual data — not generic tips, but file-specific insights.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#5b32b4]" />,
    title: "Read-only and private",
    description:
      "Analysis only — your image is never modified, stored, or shared. GPS and personal EXIF data stays completely private.",
  },
];

// ─── What the tool reveals ────────────────────────────────────────────────────
const dataPoints = [
  {
    category: "Dimensions",
    icon: <Maximize size={15} />,
    color: "#5b32b4",
    items: [
      "Width and height in pixels",
      "Aspect ratio (numeric + named label)",
      "Resolution tier (SD / HD / Full HD / 4K)",
    ],
  },
  {
    category: "File Properties",
    icon: <FileSearch size={15} />,
    color: "#fb397d",
    items: [
      "Image format (JPG, PNG, WebP, etc.)",
      "Colour mode (RGB, RGBA, Greyscale, CMYK)",
      "File size in KB with weight classification",
    ],
  },
  {
    category: "Visual Analysis",
    icon: <BarChart3 size={15} />,
    color: "#5b32b4",
    items: [
      "Brightness score (0–255 scale)",
      "Contrast score with interpretation",
      "Dominant colour as hex code",
      "Full extracted colour palette",
    ],
  },
  {
    category: "EXIF Metadata",
    icon: <Info size={15} />,
    color: "#fb397d",
    items: [
      "Camera make, model, and lens",
      "Aperture, shutter speed, ISO",
      "GPS coordinates (if embedded)",
      "Date and time of capture",
    ],
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      "Drag and drop any image file onto the upload zone or click to browse. The tool accepts JPG, PNG, WebP, GIF, BMP, TIFF, and SVG. A preview loads immediately so you can confirm the correct file before analysing.",
  },
  {
    number: "02",
    title: "Click Start Full Analysis",
    description:
      "Hit the button and watch the progress bar as the image is uploaded and scanned. Analysis returns dimension data, colour extraction, brightness and contrast scores, and all available EXIF metadata simultaneously.",
  },
  {
    number: "03",
    title: "Review your results",
    description:
      "Results are displayed across three panels: metric cards for dimensions and file properties, a Visual DNA panel with colour palette and brightness/contrast meters, and an Advanced Metadata table with all EXIF data found in the image.",
  },
  {
    number: "04",
    title: "Act on the insights",
    description:
      "Read the AI Insights panel for specific recommendations based on your image data. Copy colour hex codes with one click. Use the social preview to see how your image fits a 16:9 thumbnail frame. Click New Analysis to scan another image.",
  },
];

// ─── Use cases ────────────────────────────────────────────────────────────────
const useCases = [
  {
    icon: <Globe size={14} />,
    label: "Check image dimensions before uploading to a website or CMS",
  },
  {
    icon: <Palette size={14} />,
    label: "Extract hex codes from photos to match brand colours",
  },
  {
    icon: <Info size={14} />,
    label: "View EXIF data to verify camera settings or capture date",
  },
  {
    icon: <ShieldCheck size={14} />,
    label: "Check for embedded GPS data before sharing photos publicly",
  },
  {
    icon: <BarChart3 size={14} />,
    label:
      "Measure brightness and contrast before using in marketing materials",
  },
  {
    icon: <Zap size={14} />,
    label: "Get optimisation recommendations before compressing or converting",
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
export default function ImageAnalyzerPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <ScanSearch size={14} />
          Free Analysis Tool
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Image Analyzer & Metadata Inspector
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Deep-scan any image to reveal dimensions, colour palette, brightness
          and contrast scores, hidden EXIF metadata, and AI optimisation
          recommendations — all in one click. Free, read-only, and completely
          private.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "EXIF Viewer",
            "Colour Palette",
            "AI Recommendations",
            "Read-Only",
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

      {/* ── Tool Component ──────────────────────────────────── */}
      <ImageAnalyserTools />

      {/* ── What does it reveal — Direct Intent ─────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-6"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          What Does the Image Analyzer Reveal?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Most image tools tell you file size and dimensions. This tool goes
          significantly deeper — extracting the colour DNA of your image,
          scoring its visual properties on standardised scales, surfacing every
          piece of hidden EXIF metadata embedded by your camera or phone, and
          generating specific recommendations based on what it actually finds
          rather than generic advice.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Whether you are a developer checking images before uploading to a CMS,
          a designer extracting hex codes from a photo, a photographer reviewing
          EXIF data, or a content creator optimising images for web performance
          — this tool gives you the complete picture in a single scan.
        </p>

        {/* Four-category data points grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {dataPoints.map((section) => (
            <div
              key={section.category}
              className="relative bg-gradient-to-br from-white to-[#faf7ff] border border-[#e9e1ff] rounded-2xl p-5 overflow-hidden"
            >
              <div
                className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl pointer-events-none"
                style={{ backgroundColor: `${section.color}12` }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: section.color }}>{section.icon}</span>
                  <p
                    className="font-black text-sm"
                    style={{ color: section.color }}
                  >
                    {section.category}
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-gray-600"
                    >
                      <CheckCircle2
                        size={12}
                        className="mt-0.5 shrink-0"
                        style={{ color: section.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Value intent — use cases */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative">
            <p className="font-bold text-[#2b1d3a] mb-4 text-sm">
              When to use the Image Analyzer:
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {useCases.map((u) => (
                <div
                  key={u.label}
                  className="flex items-start gap-2.5 text-sm text-gray-600"
                >
                  <span className="text-[#5b32b4] mt-0.5 shrink-0">
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
            How to Analyse an Image
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. One scan. Complete data — dimensions, colours, metadata,
            and recommendations.
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
            Why Use the Snappy-Fix Image Analyzer?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            More than a file inspector — a complete visual intelligence tool for
            developers, designers, and content creators.
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
            Everything you need to know about analysing image metadata, colours,
            and visual properties.
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
      <OtherToolsSection currentSlug="image-analyzer" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
