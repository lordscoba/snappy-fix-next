"use client";

import { useState } from "react";
import WatermarkTools from "@/components/tools/WatermarkTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Type,
  Image as ImageIcon,
  Sliders,
  Palette,
  RotateCw,
  Maximize2,
  Zap,
  Globe,
  Camera,
  Copyright,
} from "lucide-react";

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "What is a watermark and why should I add one to my images?",
    answer:
      "A watermark is a visible or semi-transparent text, logo, or graphic placed on a photo or image to indicate ownership and deter unauthorized copying. When you share images online — on social media, websites, portfolios, or marketplaces — they can be downloaded, cropped, and reused without credit. A watermark makes your ownership permanently visible on the image itself, discourages theft, and ensures your brand or name travels with your work even when it is shared beyond your control.",
  },
  {
    question:
      "What is the difference between a text watermark and a logo watermark?",
    answer:
      "A text watermark places a written string — your name, brand, website URL, or copyright notice like '© 2024 Your Name' — directly on the image at your chosen size, colour, position, and opacity. A logo watermark uses an uploaded image file (typically a transparent PNG of your brand logo) layered over the photo. Logo watermarks look more professional and are commonly used by photographers, agencies, and businesses who have established brand identity. Text watermarks are faster to apply and work well for copyright notices and personal branding.",
  },
  {
    question: "How do I control how visible the watermark is?",
    answer:
      "Use the Opacity slider (10–100%). At 100% opacity the watermark is fully opaque and clearly visible. At 30–50% it appears translucent and subtle — still protecting the image but less intrusive to viewers. The live transparency preview box next to the slider shows your exact colour at the chosen opacity level before you apply it. A common approach for professional photography is 40–60% opacity, which makes the watermark visible enough to deter theft but unobtrusive enough not to distract from the image.",
  },
  {
    question: "Can I rotate the watermark?",
    answer:
      "Yes. The Rotation slider ranges from -180° to +180°. The animated compass dial shows your current rotation angle visually as you drag. A diagonal watermark at 45° or -45° is commonly used to cover a larger area of the image, making it harder to crop out while remaining readable. The rotation is applied to the watermark element, not the base image.",
  },
  {
    question: "Where can I position the watermark on the image?",
    answer:
      "The 3×3 grid position selector lets you place the watermark at five positions: top-left, top-right, center, bottom-left, and bottom-right. Bottom-right is the most common choice for photography watermarks as it is visible but does not cover the focal subject of the image. Center placement at low opacity is often used as a full-coverage protection watermark on preview images displayed before purchase.",
  },
  {
    question: "What colour should I use for my watermark?",
    answer:
      "White (#FFFFFF) at 40–60% opacity is the most versatile choice — it is visible on dark and mid-tone backgrounds while remaining clean and unobtrusive. Black (#000000) works well on light or high-key images. Gold (#FFD700) is popular for luxury brand photography. The tool includes 20 quick colour swatches plus a full hex colour picker and a colour input field so you can match any brand colour exactly. Use the live opacity preview box to see exactly how your chosen colour looks at your chosen transparency level before applying.",
  },
  {
    question:
      "What format should my logo file be for the image watermark mode?",
    answer:
      "Upload a PNG file with a transparent background for best results. A transparent PNG logo means only the logo elements appear on your image — there is no white or coloured box behind the logo that would obscure the photo. Most graphic design tools (Figma, Illustrator, Photoshop, Canva) can export logos as transparent PNG. The logo scale slider (10%–200%) lets you resize the logo relative to the base image after uploading.",
  },
  {
    question: "What quality preset should I choose?",
    answer:
      "Low compression (Low preset) produces the largest file at highest quality — suitable for print-ready deliverables. Medium balances quality and size for most professional sharing. High compression (High preset) produces the smallest file — use for web previews, social media, and thumbnails where file size matters most.",
  },
  {
    question:
      "Is the Image Watermark Tool free and does it add its own watermark?",
    answer:
      "Yes — completely free with no usage limits. Crucially, the tool does not add any Snappy-Fix branding, text, or logo to your image. The only watermark applied is the one you design and configure. Your image remains yours.",
  },
  {
    question: "Are my uploaded images stored on your servers?",
    answer:
      "No. Both your base image and any logo file you upload are processed securely and not permanently retained after the watermarked result is generated. No copies of your images are stored on our servers.",
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────
const benefits = [
  {
    icon: <Type size={20} className="text-[#c3003a]" />,
    title: "Text and logo modes",
    description:
      "Choose text for quick copyright notices or upload a transparent PNG logo for professional brand watermarking — both in the same tool.",
  },
  {
    icon: <Palette size={20} className="text-[#5b32b4]" />,
    title: "Full colour control",
    description:
      "Hex colour picker, manual hex input, and 20 quick swatches — plus a live opacity preview box that shows exactly how your colour looks at your chosen transparency.",
  },
  {
    icon: <Sliders size={20} className="text-[#c3003a]" />,
    title: "Opacity and transparency",
    description:
      "Slide opacity from 10% to 100% with a live preview. Subtle and translucent or bold and visible — your choice for every image.",
  },
  {
    icon: <RotateCw size={20} className="text-[#5b32b4]" />,
    title: "Rotation with visual dial",
    description:
      "Rotate the watermark from -180° to +180° with an animated compass dial. Diagonal watermarks are harder to crop out while remaining readable.",
  },
  {
    icon: <Maximize2 size={20} className="text-[#c3003a]" />,
    title: "5-position grid placement",
    description:
      "Place your watermark at top-left, top-right, center, bottom-left, or bottom-right using the interactive grid selector — standard positions used by professional photographers worldwide.",
  },
  {
    icon: <Zap size={20} className="text-[#5b32b4]" />,
    title: "Three quality presets",
    description:
      "High compression for web and social media, Medium for professional sharing, Low compression for print-ready and client deliverables — three levels in one tool.",
  },
];

// ─── Watermark use cases ──────────────────────────────────────────────────────
const useCases = [
  {
    icon: <Camera size={14} />,
    label: "Photographers protecting portfolio shots",
    color: "#5b32b4",
  },
  {
    icon: <Copyright size={14} />,
    label: "Artists adding copyright notices to artwork",
    color: "#fb397d",
  },
  {
    icon: <Globe size={14} />,
    label: "Bloggers branding website images",
    color: "#5b32b4",
  },
  {
    icon: <ImageIcon size={14} />,
    label: "E-commerce product photography protection",
    color: "#fb397d",
  },
  {
    icon: <ShieldCheck size={14} />,
    label: "Selling preview images before purchase",
    color: "#5b32b4",
  },
  {
    icon: <Type size={14} />,
    label: "Adding URL watermarks to viral social media posts",
    color: "#fb397d",
  },
  {
    icon: <Camera size={14} />,
    label: "Event photographers delivering proofs",
    color: "#5b32b4",
  },
  {
    icon: <Copyright size={14} />,
    label: "Designers branding mockups and presentations",
    color: "#fb397d",
  },
];

// ─── Watermark mode comparison ────────────────────────────────────────────────
const modeComparison = [
  {
    feature: "What appears on image",
    text: "Written string (name, URL, copyright)",
    logo: "Your brand logo image",
  },
  {
    feature: "Best for",
    text: "Copyright notices, personal branding, URLs",
    logo: "Established brands with a logo identity",
  },
  {
    feature: "Setup required",
    text: "Type directly — no file needed",
    logo: "Transparent PNG logo file",
  },
  {
    feature: "Colour control",
    text: "Full — hex picker + 20 swatches",
    logo: "Opacity only (logo colours preserved)",
  },
  {
    feature: "Scale control",
    text: "Font size in pixels",
    logo: "Scale slider 10%–200%",
  },
  {
    feature: "Professional look",
    text: "Clean and minimal",
    logo: "Highest — matches brand identity exactly",
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Upload your base image",
    description:
      "Drag and drop your photo or image onto the left preview panel or click to browse. The image loads immediately with a 'Source Loaded' indicator. Supports JPG, PNG, WebP, and all standard image formats.",
  },
  {
    number: "02",
    title: "Choose Text or Logo mode",
    description:
      "In the Watermark Studio panel on the right, toggle between Text mode (type your watermark content, set font size, choose colour from the picker or swatches) and Logo mode (upload your transparent PNG logo and set its scale).",
  },
  {
    number: "03",
    title: "Configure position, opacity, and rotation",
    description:
      "Use the 3×3 position grid to place the watermark, the opacity slider to set transparency (40–60% is recommended for professional photography), and the rotation dial to angle the watermark if desired.",
  },
  {
    number: "04",
    title: "Select quality and apply",
    description:
      "Choose a quality preset — High for web and social media (smallest file), Medium for professional sharing, Low for maximum quality print deliverables.",
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
export default function ImageWatermarkPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      {/* ── Page Header ─────────────────────────────────────── */}
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <ShieldCheck size={14} />
          Image Protection Studio
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Image Watermark Tool
        </h1>

        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Add text or logo watermarks to photos and images with full creative
          control — colour, opacity, rotation, position, and quality. Protect
          your work, promote your brand, and deter image theft. Free, no added
          watermark, no signup.
        </p>

        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "Text & Logo Modes",
            "Opacity Control",
            "Rotation Dial",
            "No Added Watermark",
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
      <WatermarkTools />

      {/* ── Direct Intent ────────────────────────────────────── */}
      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Protect Your Images with Professional Watermarks
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Every time you share an image online — on Instagram, a photography
          portfolio, an e-commerce product listing, or a client delivery — that
          image can be downloaded, cropped, and used without permission or
          credit. A watermark is the most effective deterrent: it makes your
          ownership visible on the image itself, travels with the photo wherever
          it is shared, and signals to anyone viewing it that the work belongs
          to you.
        </p>
        <p className="text-gray-600 leading-relaxed">
          This tool goes beyond a simple text stamp. The full Watermark Studio
          gives you text mode for copyright notices and brand names, logo mode
          for transparent PNG brand logos, a precise opacity slider with live
          preview, rotation control with an animated visual dial, five
          positioning options, and three output quality levels — giving you
          professional watermarking capability without professional-grade
          software.
        </p>

        {/* Text vs Logo comparison table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Text watermark vs Logo watermark — which to use
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["Feature", "Text Mode", "Logo Mode"].map((h) => (
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
                {modeComparison.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-bold text-[#2b1d3a] text-xs">
                      {row.feature}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.text}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.logo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Use cases + who uses */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative">
            <p className="font-bold text-[#2b1d3a] text-sm mb-4">
              Who adds watermarks to their images:
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

        {/* Opacity guide callout */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] to-white border border-[#5b32b4]/20 p-5 overflow-hidden">
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#5b32b4]/8 blur-xl pointer-events-none" />
            <p className="font-black text-[#5b32b4] text-sm mb-3">
              Opacity guide
            </p>
            <ul className="space-y-2">
              {[
                { range: "10–30%", use: "Barely visible — subtle protection" },
                { range: "40–60%", use: "Professional photography standard" },
                { range: "70–85%", use: "Bold and clearly visible" },
                { range: "100%", use: "Fully opaque — maximum visibility" },
              ].map((o) => (
                <li
                  key={o.range}
                  className="flex items-start gap-2 text-xs text-gray-600"
                >
                  <span className="font-black text-[#5b32b4] shrink-0 w-16">
                    {o.range}
                  </span>
                  {o.use}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-2xl bg-gradient-to-br from-[#fff5f9] to-white border border-[#fb397d]/20 p-5 overflow-hidden">
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#fb397d]/8 blur-xl pointer-events-none" />
            <p className="font-black text-[#c3003a] text-sm mb-3">
              Rotation strategy
            </p>
            <ul className="space-y-2">
              {[
                { angle: "0°", use: "Horizontal — standard copyright stamp" },
                { angle: "45° / -45°", use: "Diagonal — harder to crop out" },
                { angle: "90°", use: "Vertical along image edge" },
                { angle: "Random", use: "Unpredictable — hardest to remove" },
              ].map((r) => (
                <li
                  key={r.angle}
                  className="flex items-start gap-2 text-xs text-gray-600"
                >
                  <span className="font-black text-[#c3003a] shrink-0 w-16">
                    {r.angle}
                  </span>
                  {r.use}
                </li>
              ))}
            </ul>
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
            How to Add a Watermark to an Image
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Full studio control. Professional watermarked output.
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
            Why Use the Snappy-Fix Watermark Tool?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Professional studio controls without professional-grade software —
            text, logo, colour, opacity, rotation, position, and quality in one
            tool.
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
            Everything you need to know about watermarking images online and
            protecting your creative work.
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
      <OtherToolsSection currentSlug="image-watermark" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
