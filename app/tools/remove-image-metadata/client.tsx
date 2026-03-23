"use client";

import { useState } from "react";
import ExifScrubberTools from "@/components/tools/ExifScrubberTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Zap,
  Globe,
  EyeOff,
  MapPin,
  Camera,
  FileImage,
  Lock,
  Cpu,
} from "lucide-react";

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What is EXIF metadata and what information does it contain?",
    answer:
      "EXIF (Exchangeable Image File Format) metadata is hidden data stored inside image files by cameras, smartphones, and editing software. It can include: GPS coordinates (precise latitude and longitude of where the photo was taken), device information (smartphone make, model, and serial number), camera settings (shutter speed, aperture, ISO, focal length), date and time the photo was taken, software used to edit the image, and sometimes even the owner's name or copyright notice. This data travels with the image file whenever it is shared, uploaded, or posted online — and is readable by anyone with the right tool.",
  },
  {
    question: "Does the tool remove all metadata or only GPS data?",
    answer:
      "The tool removes all metadata completely — not just GPS. It creates a brand new image from the raw pixel data only, discarding every metadata field: EXIF, IPTC, XMP, ICC colour profiles, image comments, and any other embedded data. The output image contains only the visual pixel information. This is a full scrub, not a selective removal. The image format, resolution, and visual quality are preserved — only the invisible metadata layer is gone.",
  },
  {
    question: "Does removing metadata reduce image quality?",
    answer:
      "No. The tool preserves visual quality at high settings: JPEG images are re-saved at quality 95 with progressive encoding, WebP at quality 95 using method-6 compression, PNG with lossless optimisation, and HEIC at quality 90. At quality 95, the re-encoding introduces no perceptible quality difference compared to the original. The output image is visually identical to the source — it simply no longer contains any hidden metadata.",
  },
  {
    question: "What image formats does the tool support?",
    answer:
      "The tool supports JPG/JPEG, PNG, WebP, and HEIC/HEIF. Each format is re-saved in its original format after metadata removal — a JPEG stays a JPEG, a PNG stays a PNG. The output filename is the original name with '_clean' appended before the extension, making it easy to identify the scrubbed version alongside the original.",
  },
  {
    question: "Can someone find my location from a photo I posted online?",
    answer:
      "Yes — if the image still contains GPS metadata. Many photo-sharing sites, social networks, and file-sharing platforms strip metadata automatically, but many do not. Direct file transfers (email attachments, WhatsApp document sends, Telegram, Google Drive shares, cloud storage links), personal websites, portfolio platforms, and developer assets typically preserve metadata exactly as uploaded. Anyone who downloads the file can read the GPS coordinates using free EXIF viewer tools and look up the location on a map.",
  },
  {
    question: "Which platforms strip metadata and which preserve it?",
    answer:
      "Platforms that typically strip EXIF: Instagram, Facebook, Twitter/X, TikTok, and most major social networks strip metadata on upload. Platforms and methods that typically preserve EXIF: direct email attachments, WhatsApp document transfers (not compressed image sends), Telegram file uploads, Google Drive, Dropbox, iCloud share links, personal website or portfolio uploads, GitHub, and any direct file transfer. When in doubt, scrub before sharing — the tool adds no visible change to the image.",
  },
  {
    question: "Why is my device model a privacy concern?",
    answer:
      "Device model information in EXIF metadata can be combined with other data points for device fingerprinting. More practically, knowing someone's specific phone model and the date a photo was taken — combined with other shared information — can help narrow down identity, especially for people who share photos pseudonymously. For journalists, activists, and anyone sharing sensitive content, removing device metadata is a standard privacy practice.",
  },
  {
    question: "Is the EXIF Scrubber free and does it store my images?",
    answer:
      "Yes — completely free with no usage limits and no watermark on the output. Your image is processed securely and never permanently stored. No copy of your original or scrubbed image is retained on the servers after the clean version is delivered to your browser.",
  },
];

// ─── What metadata contains ───────────────────────────────────────────────────
const metadataFields = [
  {
    field: "GPS coordinates",
    risk: "Exact location where photo was taken",
    icon: "📍",
    level: "High",
  },
  {
    field: "Device make & model",
    risk: "Smartphone or camera brand and model",
    icon: "📱",
    level: "Medium",
  },
  {
    field: "Date & time taken",
    risk: "Precise timestamp of when photo was shot",
    icon: "🕐",
    level: "Medium",
  },
  {
    field: "Device serial number",
    risk: "Unique hardware identifier",
    icon: "🔢",
    level: "Medium",
  },
  {
    field: "Software / app used",
    risk: "Editing app, OS version, or camera app name",
    icon: "💻",
    level: "Low",
  },
  {
    field: "Image dimensions",
    risk: "Original pixel width and height",
    icon: "📐",
    level: "Low",
  },
  {
    field: "Owner / copyright",
    risk: "Real name or copyright notice if set",
    icon: "©️",
    level: "Medium",
  },
  {
    field: "ICC colour profile",
    risk: "Colour space and display calibration data",
    icon: "🎨",
    level: "Low",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <EyeOff size={20} className="text-[#c3003a]" />,
    title: "Complete metadata removal",
    description:
      "Removes all metadata — EXIF, IPTC, XMP, GPS, device info, and ICC profiles — not just selected fields. A full scrub, not a partial clean.",
  },
  {
    icon: <MapPin size={20} className="text-[#5b32b4]" />,
    title: "GPS location stripped",
    description:
      "Precise GPS coordinates stored by smartphone cameras are permanently removed. No one can trace where a photo was taken from the file.",
  },
  {
    icon: <Camera size={20} className="text-[#c3003a]" />,
    title: "Quality 95 output",
    description:
      "JPEG and WebP re-saved at quality 95 — no perceptible quality loss. PNG uses lossless optimisation. Visual fidelity is preserved entirely.",
  },
  {
    icon: <FileImage size={20} className="text-[#5b32b4]" />,
    title: "Format preserved",
    description:
      "JPEG stays JPEG, PNG stays PNG, WebP stays WebP, HEIC stays HEIC. Output filename adds '_clean' so you always know which version is scrubbed.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#c3003a]" />,
    title: "Never stored",
    description:
      "Your original image and the scrubbed output are never permanently stored on the server. Processed and discarded — nothing retained.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive — remove image metadata on desktop, laptop, tablet, or smartphone from any modern browser without software.",
  },
];

// ─── Who should scrub ─────────────────────────────────────────────────────────
const whoShouldScrub = [
  {
    label: "Anyone sharing photos directly via email or file transfer",
    color: "#5b32b4",
  },
  {
    label:
      "Photographers uploading work to portfolio sites and personal websites",
    color: "#fb397d",
  },
  {
    label:
      "Journalists and activists sharing images where location must be hidden",
    color: "#5b32b4",
  },
  {
    label: "People selling items online with photos taken at home",
    color: "#fb397d",
  },
  {
    label: "Parents sharing children's photos outside of major social networks",
    color: "#5b32b4",
  },
  {
    label:
      "Developers uploading UI screenshots or design assets to public repos",
    color: "#fb397d",
  },
  {
    label:
      "Anyone sharing images via WhatsApp as documents or Telegram uploads",
    color: "#5b32b4",
  },
  {
    label:
      "Businesses sharing product photos where device or location is irrelevant",
    color: "#fb397d",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your image",
    description:
      "Drag and drop your image onto the upload zone or click to browse. A live preview loads immediately. Supports JPG, PNG, WebP, and HEIC — the formats most likely to contain embedded metadata from cameras and smartphones.",
  },
  {
    number: "02",
    title: "Click Remove EXIF Data",
    description:
      "Hit the button and watch the progress bar as your image is uploaded and processed. The tool creates a new image from pixel data only — every metadata field is discarded in the process.",
  },
  {
    number: "03",
    title: "Download your clean image",
    description:
      'Click "Download Clean Image" to save the scrubbed file. The filename has "_clean" appended before the extension so you can immediately distinguish it from the original.',
  },
  {
    number: "04",
    title: "Share with confidence",
    description:
      "The downloaded image contains only pixel data — no GPS, no device model, no timestamp, no colour profile, no owner information. Share it by email, upload it to a website, or transfer it directly without any privacy exposure.",
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
export default function RemoveImageMetadataPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <EyeOff size={14} />
          Privacy Protection Tool
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Image Metadata Remover
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Strip all hidden EXIF metadata from images before sharing — GPS
          location, device model, timestamps, and more. Complete metadata
          removal at quality 95. Free, no watermark, no signup.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "GPS Removed",
            "All Metadata Stripped",
            "Quality 95 Output",
            "No Signup",
            "JPG · PNG · WebP · HEIC",
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

      {/* ── Tool ────────────────────────────────────────────── */}
      <ExifScrubberTools />

      {/* ── Direct Intent ───────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="intent-heading"
      >
        <h2
          id="intent-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Your Photos Carry More Information Than You See
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Every photo taken on a smartphone or digital camera embeds a hidden
          data layer alongside the visible image — a record of where you were,
          what device you used, and exactly when the shot was taken. This data
          is invisible in normal viewing but is fully readable by anyone who
          downloads the file and opens it in an EXIF viewer — a freely available
          category of tool. When you share an unstripped image by email,
          transfer, or direct upload, you are sharing all of that information
          with it.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This tool removes it all. The scrubber creates a brand new image from
          pixel data only — discarding every metadata field including GPS,
          device model, timestamps, serial numbers, colour profiles, and image
          comments. The visual content of your photo is unchanged. Only the
          invisible data layer is gone.
        </p>

        {/* What metadata contains */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            What hidden metadata your images may contain
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["Metadata field", "What it reveals", "Privacy risk"].map(
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
                {metadataFields.map((row, i) => (
                  <tr
                    key={row.field}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-bold text-[#5b32b4] text-xs">
                      {row.icon} {row.field}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.risk}
                    </td>
                    <td
                      className={`px-5 py-3 text-xs font-black ${
                        row.level === "High"
                          ? "text-[#c3003a]"
                          : row.level === "Medium"
                            ? "text-amber-500"
                            : "text-gray-400"
                      }`}
                    >
                      {row.level}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            All of the above are removed by the scrubber. The output image
            contains only pixel data.
          </p>
        </div>

        {/* Who should scrub + when platforms preserve metadata */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                Who should scrub metadata before sharing:
              </p>
              <ul className="space-y-2">
                {whoShouldScrub.slice(0, 4).map((item) => (
                  <li
                    key={item.label}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={13}
                      style={{ color: item.color }}
                      className="mt-0.5 shrink-0"
                    />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                When metadata is preserved (not stripped by the platform):
              </p>
              <ul className="space-y-2">
                {[
                  "Email attachments",
                  "WhatsApp document sends (not compressed image mode)",
                  "Telegram file uploads",
                  "Google Drive and Dropbox share links",
                  "Personal website and portfolio uploads",
                  "GitHub file uploads and pull requests",
                ].map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={13}
                      className={`mt-0.5 shrink-0 ${
                        idx % 2 === 0 ? "text-[#c3003a]" : "text-[#5b32b4]"
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
            How to Remove Image Metadata
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Complete scrub. Privacy-safe in seconds.
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
            Why Use the Snappy-Fix EXIF Scrubber?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Complete metadata removal at quality 95 — GPS, device info,
            timestamps, and everything else, gone in one click.
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
            Everything you need to know about EXIF metadata, image privacy, and
            removing hidden data from photos.
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
      <OtherToolsSection currentSlug="remove-image-metadata" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
