"use client";

import { useState } from "react";
import FaviconGeneratorTool from "@/components/tools/FaviconGenerator";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Zap,
  ShieldCheck,
  Download,
  Globe,
  Sliders,
  Monitor,
  Smartphone,
  Code2,
  FolderArchive,
  Palette,
} from "lucide-react";

const faqs = [
  {
    question: "What is a favicon and why does my website need one?",
    answer:
      "A favicon is the small icon that appears in browser tabs, bookmarks, browser history, and on mobile home screens when a user saves your website. Without a favicon, browsers show a generic grey globe icon. A well-designed favicon strengthens brand recognition, improves trust, and makes your site look professional — especially important when users have multiple tabs open.",
  },
  {
    question: "What image formats can I upload to generate a favicon?",
    answer:
      "You can upload any standard image format including PNG, JPG, JPEG, WebP, GIF, and BMP. For best results, use a square image with your logo or icon on a clean background. PNG files with transparency give the most flexible output, especially when choosing a transparent background for the favicon. Minimum recommended image size is 256×256 pixels — images smaller than this will be rejected to prevent blurry output at larger sizes.",
  },
  {
    question: "What favicon output formats does the tool support?",
    answer:
      "The tool generates favicons in three formats: ICO (the universal standard supported by all browsers), PNG (ideal for modern browsers and PWA manifests), and WebP (for modern web apps that need smaller file sizes). ICO is recommended for maximum cross-browser compatibility. Regardless of the format you choose, the download always includes a multi-resolution favicon.ico containing 16×16, 32×32, 48×48, and 64×64 layers embedded in a single file.",
  },
  {
    question: "What is included in the downloaded favicon package ZIP?",
    answer:
      "The download is a ZIP file named favicon-package.zip containing everything you need to deploy favicons on any website: all 7 favicon sizes as individual files (16×16 through 512×512), a multi-resolution favicon.ico with four embedded sizes, a dark mode variant (favicon-dark-32x32.png on a black background), a social preview image (social-preview-1200x630.png) for Open Graph and social sharing, an auto-generated site.webmanifest file with your brand colour automatically detected and embedded, and a favicon-html-code.txt file with ready-to-paste HTML link tags for your site.",
  },
  {
    question: "What is the dark mode favicon and when is it used?",
    answer:
      "The ZIP includes favicon-dark-32x32.png — a 32×32 version of your favicon rendered on a black background. Some browsers and operating systems display favicons differently in dark mode, and having a dark-background version ensures your icon remains visible against dark browser chrome and system interfaces. You can reference it in your HTML using a media query: <link rel='icon' href='/favicon-dark-32x32.png' media='(prefers-color-scheme: dark)'>.",
  },
  {
    question: "What is the social preview image in the package?",
    answer:
      "The package includes social-preview-1200x630.png — a 1200×630 pixel Open Graph image with your favicon centred on a background automatically filled with your detected brand colour. This is the image that appears when your website is shared on Twitter, Facebook, LinkedIn, WhatsApp, and other platforms that read Open Graph metadata. Reference it in your HTML: <meta property='og:image' content='/social-preview-1200x630.png'>. It is generated automatically — no extra steps required.",
  },
  {
    question: "What does the background option do?",
    answer:
      "The background option fills any transparent areas in your uploaded image before generating the favicon. Transparent keeps the original transparency of your logo (best for logos with transparent backgrounds). White or Black fills the canvas with a solid colour. Custom lets you enter any hex code or colour name — useful for matching your brand colour behind the icon.",
  },
  {
    question: "What does the padding setting control?",
    answer:
      "Padding adds whitespace around your logo inside the favicon canvas. A value of 0 fills the favicon edge-to-edge with your image. Increasing padding shrinks the logo and adds breathing room around it. Values between 10 and 30 work well for most logos. Higher values (50+) create a smaller icon centred in a larger background — useful for logos that look crowded at small sizes.",
  },
  {
    question: "How do I add the favicon to my website?",
    answer:
      "Extract the favicon-package.zip and upload all files to your website root directory. The package includes a favicon-html-code.txt file with ready-to-paste HTML link tags — open it and copy the code into your HTML <head> tag. The tags reference all sizes correctly including the standard ICO, Apple Touch icon, PWA manifest link, and Open Graph social preview.",
  },
  {
    question: "Is the favicon generator free?",
    answer:
      "Yes — the Snappy-Fix Favicon Generator is completely free with no usage limits, no watermarks, and no account required. Generate as many favicons as you need for any number of projects.",
  },
  {
    question: "Does this tool work for Next.js, WordPress, and Shopify sites?",
    answer:
      "Yes. The generated favicon files are standard web assets compatible with any platform — Next.js (place in the /public folder and reference in metadata), WordPress (use the Site Icon setting in Appearance > Customize), Shopify (upload under Online Store > Preferences), or any custom HTML website. The included favicon-html-code.txt removes any guesswork about which tags to use.",
  },
];

const benefits = [
  {
    icon: <FolderArchive size={20} className="text-[#c3003a]" />,
    title: "Complete package in one ZIP",
    description:
      "7 favicon sizes, multi-res ICO, dark mode variant, OG social preview, site.webmanifest, and ready-to-paste HTML — one download, nothing missing.",
  },
  {
    icon: <Palette size={20} className="text-[#5b32b4]" />,
    title: "Auto brand colour detection",
    description:
      "The tool analyses your logo and automatically detects your brand colour, using it in the generated site.webmanifest theme_color and the social preview background.",
  },
  {
    icon: <Sliders size={20} className="text-[#c3003a]" />,
    title: "Full configuration control",
    description:
      "Choose output format (ICO/PNG/WebP), set background colour or transparency, and control padding — all before generating.",
  },
  {
    icon: <Monitor size={20} className="text-[#5b32b4]" />,
    title: "Cross-browser compatible",
    description:
      "Multi-resolution favicon.ico embeds 16, 32, 48, and 64px layers — works in every browser including older IE, Edge, Chrome, Firefox, and Safari.",
  },
  {
    icon: <Smartphone size={20} className="text-[#c3003a]" />,
    title: "Mobile and PWA ready",
    description:
      "Includes Apple Touch icon (180×180), Android home screen sizes (192×192, 512×512), and a fully generated site.webmanifest for Progressive Web Apps.",
  },
  {
    icon: <Download size={20} className="text-[#5b32b4]" />,
    title: "No watermark, no limits",
    description:
      "Download clean favicon files with no added branding. Generate for unlimited projects at zero cost.",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload your logo or image",
    description:
      "Drag and drop your image file onto the upload zone or click to browse. PNG with a transparent background works best for logos. Minimum size is 256×256 pixels — square images produce the sharpest favicons at small sizes.",
  },
  {
    number: "02",
    title: "Configure your favicon options",
    description:
      "Choose your output format (ICO for universal support, PNG for modern browsers, WebP for smaller files). Set the background to transparent, white, black, or a custom hex colour. Adjust padding if you want breathing room around your logo.",
  },
  {
    number: "03",
    title: "Click Generate Favicon",
    description:
      "Hit Generate Favicon and watch the progress bar. The tool builds all 7 sizes, the multi-res ICO, a dark mode variant, a social preview image, an auto-generated manifest with your brand colour, and the HTML code file — packaged into a single ZIP.",
  },
  {
    number: "04",
    title: "Download, extract, and deploy",
    description:
      "Download favicon-package.zip, extract all files to your website root, and open favicon-html-code.txt for the ready-to-paste HTML link tags. Copy them into your <head> and you are done.",
  },
];

const faviconSizes = [
  { size: "16×16", use: "Browser tab icon", platform: "All browsers" },
  { size: "32×32", use: "Standard desktop shortcut", platform: "All browsers" },
  { size: "48×48", use: "Windows taskbar shortcut", platform: "Windows" },
  { size: "64×64", use: "High-DPI desktop shortcut", platform: "All browsers" },
  { size: "180×180", use: "Apple Touch icon", platform: "iOS / macOS" },
  { size: "192×192", use: "Android home screen", platform: "Android / Chrome" },
  { size: "512×512", use: "PWA splash screen", platform: "PWA / Manifest" },
];

const zipContents = [
  {
    file: "favicon-16x16 → 512x512",
    detail: "7 individual sized files in your chosen format",
  },
  {
    file: "favicon.ico",
    detail: "Multi-resolution ICO with 16, 32, 48, and 64px layers",
  },
  {
    file: "favicon-dark-32x32.png",
    detail: "Dark mode variant on black background",
  },
  {
    file: "social-preview-1200x630.png",
    detail: "Open Graph image with auto-detected brand colour",
  },
  {
    file: "site.webmanifest",
    detail: "PWA manifest with brand colour and icons pre-configured",
  },
  {
    file: "favicon-html-code.txt",
    detail: "Ready-to-paste HTML link tags for your <head>",
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

export default function FaviconGeneratorPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <Sparkles size={14} />
          Free SEO Tool
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Favicon Generator
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Create professional favicon files from any image instantly. Generate a
          complete favicon package — all sizes, ICO, PNG, or WebP, dark mode
          variant, social preview, auto-generated manifest, and HTML code —
          downloaded as a single ZIP. Free, secure, no watermark.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "ICO · PNG · WebP",
            "Complete ZIP Package",
            "Dark Mode Variant",
            "OG Social Preview",
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

      <FaviconGeneratorTool />

      {/* ZIP contents — set expectation immediately below tool */}
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] to-white border-2 border-[#5b32b4]/20 p-6 overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#5b32b4]/8 blur-2xl pointer-events-none" />
          <div className="relative">
            <p className="font-black text-[#5b32b4] text-sm mb-1 flex items-center gap-2">
              <FolderArchive size={16} />
              What you download: favicon-package.zip
            </p>
            <p className="text-xs text-gray-500 mb-4">
              One ZIP containing everything needed — extract and upload all
              files to your website root.
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {zipContents.map((item) => (
                <div key={item.file} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={13}
                    className="text-[#c3003a] mt-0.5 shrink-0"
                  />
                  <div>
                    <span className="font-mono font-bold text-[#5b32b4] text-xs">
                      {item.file}
                    </span>
                    <span className="text-xs text-gray-500">
                      {" "}
                      — {item.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section
        className="max-w-4xl mx-auto space-y-6"
        aria-labelledby="what-is-heading"
      >
        <h2
          id="what-is-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          What is a Favicon and Why Does Your Website Need One?
        </h2>
        <p className="text-gray-600 leading-relaxed">
          A favicon (short for "favourite icon") is the tiny image that appears
          in your browser tab, bookmarks bar, browser history, and on a mobile
          device's home screen when a user saves your website as a shortcut.
          Without one, browsers display a generic grey globe — a missed
          opportunity to reinforce your brand identity at every touchpoint.
        </p>
        <p className="text-gray-600 leading-relaxed">
          A well-designed favicon signals professionalism, improves brand
          recognition when users switch between tabs, and is a technical
          requirement for Progressive Web Apps (PWA). This tool generates a
          complete favicon package — all required sizes, your choice of format,
          custom background and padding, an auto-generated PWA manifest with
          your detected brand colour, a dark mode variant, and an Open Graph
          social preview image — all from a single upload.
        </p>

        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Favicon sizes generated by this tool
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  {["Size", "Used For", "Platform"].map((h) => (
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
                {faviconSizes.map((row, i) => (
                  <tr
                    key={row.size}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-black text-[#5b32b4]">
                      {row.size}
                    </td>
                    <td className="px-5 py-3 text-gray-600">{row.use}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs font-medium">
                      {row.platform}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            The multi-resolution favicon.ico additionally embeds 16, 32, 48, and
            64px layers in a single file.
          </p>
        </div>

        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-3 gap-5">
            {[
              {
                label: "Output Format",
                color: "#5b32b4",
                options: [
                  "ICO — universal browser support",
                  "PNG — modern browsers & PWA",
                  "WebP — smallest file size",
                ],
              },
              {
                label: "Background",
                color: "#fb397d",
                options: [
                  "Transparent — for logos with alpha",
                  "White or Black — solid fill",
                  "Custom — any hex colour code",
                ],
              },
              {
                label: "Padding",
                color: "#5b32b4",
                options: [
                  "0 — edge-to-edge fill",
                  "10–30 — comfortable breathing room",
                  "50+ — small centred icon",
                ],
              },
            ].map((section) => (
              <div key={section.label}>
                <p
                  className="font-black text-sm mb-2"
                  style={{ color: section.color }}
                >
                  {section.label}
                </p>
                <ul className="space-y-1.5">
                  {section.options.map((opt) => (
                    <li
                      key={opt}
                      className="flex items-start gap-2 text-xs text-gray-600"
                    >
                      <CheckCircle2
                        size={12}
                        className="mt-0.5 shrink-0"
                        style={{ color: section.color }}
                      />
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
            How to Generate a Favicon
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Under 30 seconds. Works for any website or framework.
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

        {/* Code snippet — matches _generate_html() output exactly */}
        <div className="rounded-2xl border border-[#e9e1ff] overflow-hidden">
          <div className="bg-[#f3ecff] px-5 py-3 flex items-center gap-2">
            <Code2 size={16} className="text-[#5b32b4]" />
            <span className="text-xs font-bold text-[#5b32b4] uppercase tracking-wider">
              HTML from favicon-html-code.txt — copy into your &lt;head&gt;
            </span>
          </div>
          <div className="bg-[#2b1d3a] px-5 py-4 overflow-x-auto">
            <pre className="text-xs text-[#c4b5d9] leading-relaxed font-mono whitespace-pre">{`<!-- Standard favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png">

<!-- PWA Manifest (auto-generated with your brand colour) -->
<link rel="manifest" href="/site.webmanifest">

<!-- Open Graph social preview -->
<meta property="og:image" content="/social-preview-1200x630.png">`}</pre>
          </div>
          <div className="bg-[#f3ecff]/50 px-5 py-2 border-t border-[#e9e1ff]">
            <p className="text-xs text-gray-500">
              This exact code is included in{" "}
              <span className="font-mono font-bold text-[#5b32b4]">
                favicon-html-code.txt
              </span>{" "}
              inside your downloaded ZIP — no need to write it manually.
            </p>
          </div>
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
            Why Use the Snappy-Fix Favicon Generator?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Not just favicon sizes — a complete deployment package including
            manifest, dark mode, social preview, and HTML code.
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
            Everything you need to know about creating and implementing
            favicons.
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

      <OtherToolsSection currentSlug="favicon-generator" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
