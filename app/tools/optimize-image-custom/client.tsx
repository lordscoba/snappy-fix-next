"use client";

import { useState } from "react";
import CustomOptimizerTool from "@/components/tools/CustomOptimizerTool";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Settings2,
  Zap,
  ShieldCheck,
  Globe,
  Target,
  Sliders,
  Percent,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What is Target KB and how does it work?",
    answer:
      "Target KB is the most powerful feature of this tool. Enter the maximum file size you need the output to be — for example 200 for 200KB — and the optimizer automatically finds the right compression level to bring your image as close to that size as possible without going over. This is essential for uploading to portals with strict file size limits, such as government application systems, university admissions, job portals, and online forms that enforce a maximum upload size.",
  },
  {
    question: "What does the Quality setting control?",
    answer:
      "Quality sets the compression level on a scale of 1 to 100. The default is 85, which produces a very good balance between file size reduction and visual quality — most people cannot distinguish a quality-85 image from the original at normal viewing sizes. Lower values (40–70) produce smaller files with more compression artefacts. Values above 90 produce near-lossless output with minimal size reduction. You can combine Quality with Target KB — the optimizer uses the quality as a starting point and adjusts compression to hit the target size.",
  },
  {
    question: "What does Resize % do?",
    answer:
      "Resize % scales the pixel dimensions of your image by a percentage of the original. A value of 50 reduces both width and height to 50% — a 2000×1500px image becomes 1000×750px. A value of 75 scales to 75%, and a value of 150 enlarges by 50%. This is separate from compression — reducing dimensions physically reduces the number of pixels, which significantly reduces file size even at high quality settings. Use this when you need both smaller dimensions and smaller file size simultaneously.",
  },
  {
    question: "Can I use Target KB, Quality, and Resize % together?",
    answer:
      "Yes. All three settings are optional and combinable. A common workflow: set Resize % to 80 to bring dimensions down slightly, set Quality to 85 (or leave at default), and set Target KB to your required limit — the optimizer compresses the resized image to hit your target. You can also use just one or two settings — for example Quality alone for general compression, or Target KB alone if you only care about the final file size.",
  },
  {
    question: "What KB limit should I use for common upload portals?",
    answer:
      "Common file size limits by platform: Government and visa application portals (typically 100–500 KB), university admissions systems (usually under 200 KB per document), job application portals and HR systems (100–500 KB), LinkedIn profile photo (300–800 KB is ideal), email attachments for reliable delivery (under 1 MB), website hero and product images for fast loading (under 200 KB), social media uploads (varies — under 5 MB for quality). Always check the specific portal's instructions for the exact limit, then enter that number in the Target KB field.",
  },
  {
    question:
      "What happens if the image cannot be compressed to the target KB?",
    answer:
      "The optimizer compresses the image as far as technically possible while maintaining some level of visual content. If the target KB is extremely low relative to the image's complexity and dimensions — for example targeting 10 KB for a 4000px wide photograph — the result will be heavily compressed. For very aggressive targets, combine Target KB with Resize % to first reduce the pixel dimensions, which gives the compressor much more room to hit your size target with better quality.",
  },
  {
    question: "Does the tool reduce image quality?",
    answer:
      "All lossy compression involves some quality trade-off. The default quality of 85 produces output that is visually near-identical to the original for most images at normal viewing sizes. Quality settings above 85 produce virtually no visible degradation. Settings below 60 will show compression artefacts on close inspection, particularly in smooth gradients and high-detail areas. The target KB mode applies the minimum compression needed to hit your size limit — so it automatically preserves as much quality as possible within your constraint.",
  },
  {
    question: "What image formats does this tool support?",
    answer:
      "The tool accepts JPG, JPEG, PNG, WebP, BMP, TIFF, and GIF. The output format matches your original upload format. If you need to change formats while optimizing, use the Image Converter tool first, then optimize with this tool.",
  },
  {
    question: "Is the Custom Image Optimizer free and does it add a watermark?",
    answer:
      "Yes — completely free with no usage limits and no watermark on the optimized output. Optimize as many images as you need at no cost with no account required.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Target size={20} className="text-[#c3003a]" />,
    title: "Target KB precision",
    description:
      "The only free online optimizer that compresses to an exact file size target. Enter the KB limit from any portal and get the correctly-sized image instantly.",
  },
  {
    icon: <Sliders size={20} className="text-[#5b32b4]" />,
    title: "Manual quality control",
    description:
      "Set compression quality from 1 to 100. Default 85 gives near-lossless output. Go lower for aggressive compression, higher for maximum fidelity.",
  },
  {
    icon: <Percent size={20} className="text-[#c3003a]" />,
    title: "Percentage resize",
    description:
      "Scale dimensions by percentage simultaneously with compression — reducing pixel count and file size in one step for maximum efficiency.",
  },
  {
    icon: <Zap size={20} className="text-[#5b32b4]" />,
    title: "Combine all three",
    description:
      "Target KB, Quality, and Resize % are all optional and combinable. Mix and match to meet any specific requirement from any upload system.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#c3003a]" />,
    title: "Private and secure",
    description:
      "Your images are processed securely and never permanently stored. Nothing is retained after your optimized file is delivered.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive — optimize images on desktop, laptop, tablet, or smartphone from any modern browser without software.",
  },
];

// ─── KB limit reference ───────────────────────────────────────────────────────
const kbLimits = [
  {
    portal: "Government / visa application portals",
    limit: "100–500 KB",
    quality: "Use limit – 20",
  },
  {
    portal: "University admissions documents",
    limit: "Under 200 KB",
    quality: "Use 180",
  },
  {
    portal: "Job application / HR systems",
    limit: "100–500 KB",
    quality: "Use limit – 20",
  },
  {
    portal: "Identity document uploads (ID / passport)",
    limit: "50–200 KB",
    quality: "Use 150",
  },
  {
    portal: "LinkedIn profile photo",
    limit: "300–800 KB ideal",
    quality: "Use 700",
  },
  {
    portal: "Email attachment (reliable delivery)",
    limit: "Under 1 MB",
    quality: "Use 900",
  },
  {
    portal: "Website hero / product image",
    limit: "Under 200 KB",
    quality: "Use 180",
  },
  {
    portal: "Social media upload",
    limit: "Under 5 MB",
    quality: "No target needed",
  },
  {
    portal: "eCommerce platform product photo",
    limit: "1–3 MB",
    quality: "Use 2000",
  },
  {
    portal: "Medical / healthcare record upload",
    limit: "100–500 KB",
    quality: "Check portal",
  },
];

// ─── Settings guide ───────────────────────────────────────────────────────────
const settingsGuide = [
  {
    setting: "Target KB only",
    when: "You have a strict upload size limit",
    example: "Visa portal: enter 200 in Target KB",
    color: "#5b32b4",
  },
  {
    setting: "Quality only",
    when: "General web / social media optimization",
    example: "Set Quality to 75–85 for web images",
    color: "#fb397d",
  },
  {
    setting: "Resize % only",
    when: "Image is too large in dimensions",
    example: "50% halves both width and height",
    color: "#5b32b4",
  },
  {
    setting: "All three combined",
    when: "Large image needs to hit a small KB limit",
    example: "Resize 70% + Quality 80 + Target KB 100",
    color: "#fb397d",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      "Drag and drop your image onto the upload zone or click to browse. A preview loads immediately. Supports JPG, PNG, WebP, BMP, TIFF, and GIF.",
  },
  {
    number: "02",
    title: "Set your optimization parameters",
    description:
      "Enter a Target KB if you have a specific size limit, adjust Quality (1–100, default 85), and optionally set a Resize % to scale dimensions. All three fields are optional — leave any blank to skip that control.",
  },
  {
    number: "03",
    title: "Click Optimize Custom",
    description:
      "Hit the button and watch the progress bar as your image is uploaded and processed. The optimizer applies your parameters and returns the result in seconds.",
  },
  {
    number: "04",
    title: "Download and verify",
    description:
      'Click "Download Optimized Image" to save the file. Check the file size in your file manager to confirm it meets your upload requirement. If it still exceeds the limit, try a lower Target KB or a smaller Resize %.',
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
export default function CustomImageOptimizerPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <Settings2 size={14} />
          Precision Image Optimizer
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Custom Image Optimizer
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Set a target file size in KB, adjust quality, and resize by percentage
          — full precision control over image compression. The only free tool
          that compresses to an exact KB limit. Free, no watermark, no signup.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "Target KB Mode",
            "Quality 1–100",
            "Resize %",
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

      {/* ── Tool Component ──────────────────────────────────── */}
      <CustomOptimizerTool />

      {/* ── Direct Intent ────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Compress Images to an Exact File Size — Precisely
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Standard image compressors give you a quality slider or a preset and
          hope for the best. This tool is different: enter the maximum file size
          you need in kilobytes and the optimizer automatically finds the
          compression level that gets your image as close to that target as
          possible. For anyone who has spent time repeatedly compressing and
          re-checking file sizes to meet an upload portal's limit — this
          eliminates that loop entirely.
        </p>
        <p className="text-gray-600 leading-relaxed">
          The three controls — Target KB, Quality, and Resize % — work
          independently or in combination. Use Target KB alone when you have a
          hard size limit from an upload system. Use Quality alone for general
          web optimization. Use Resize % to scale dimensions alongside
          compression. Combine all three for maximum control when a
          high-resolution image needs to hit a very specific file size.
        </p>

        {/* Settings guide cards */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Which setting to use — and when
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {settingsGuide.map((s) => (
              <div
                key={s.setting}
                className="rounded-2xl border p-5 bg-gradient-to-br from-white to-[#faf7ff]"
                style={{ borderColor: `${s.color}30` }}
              >
                <p
                  className="font-black text-sm mb-1"
                  style={{ color: s.color }}
                >
                  {s.setting}
                </p>
                <p className="text-xs text-gray-600 mb-2">{s.when}</p>
                <p
                  className="text-[10px] font-mono font-bold px-2 py-1 rounded-lg inline-block"
                  style={{ color: s.color, backgroundColor: `${s.color}12` }}
                >
                  {s.example}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* KB limits reference table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Target KB reference — common upload portals worldwide
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {[
                    "Portal / Use case",
                    "Typical size limit",
                    "Enter in Target KB",
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
                {kbLimits.map((row, i) => (
                  <tr
                    key={row.portal}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-medium text-[#2b1d3a] text-sm">
                      {row.portal}
                    </td>
                    <td className="px-5 py-3 text-xs font-black text-[#5b32b4] font-mono">
                      {row.limit}
                    </td>
                    <td className="px-5 py-3 text-xs font-bold text-[#c3003a]">
                      {row.quality}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Always check the specific portal's instructions for the exact
            current limit before uploading.
          </p>
        </div>

        {/* Value intent callout */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                Who uses the Target KB feature:
              </p>
              <ul className="space-y-2">
                {[
                  "Anyone rejected by a portal for 'file too large'",
                  "Applicants submitting documents to visa or government systems",
                  "Students uploading photos or transcripts to admissions portals",
                  "Job seekers uploading profile photos to HR and recruitment systems",
                  "Developers meeting API payload size constraints for image uploads",
                  "Professionals delivering images within strict email attachment limits",
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
                Who uses Quality + Resize % mode:
              </p>
              <ul className="space-y-2">
                {[
                  "Developers optimizing images for website performance",
                  "Bloggers and content creators reducing hero image load times",
                  "Social media managers compressing content for faster upload",
                  "Designers exporting preview assets at reduced resolution",
                  "E-commerce sellers optimizing product image pages",
                  "Marketing teams batch-processing images for CMS uploads",
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
            How to Optimize an Image with Custom Settings
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Precise control. Exact output.
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
            Why Use the Snappy-Fix Custom Optimizer?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Precise control that automatic optimizers cannot provide — exact KB
            targeting, manual quality, and percentage resize in one tool.
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
            Everything you need to know about custom image compression, Target
            KB, and how to meet any portal's upload requirements.
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
      <OtherToolsSection currentSlug="optimize-image-custom" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
