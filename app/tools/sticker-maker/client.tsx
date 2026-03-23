"use client";

import { useState } from "react";
import StickerGeneratorTools from "@/components/tools/StickerGeneratorTools";
import OtherToolsSection from "@/components/tools/OtherToolsSection";
import RandomToolsSection from "@/components/tools/RandomToolsSection";
import ToolCategoriesSection from "@/components/tools/ToolCategoriesSection";
import {
  CheckCircle2,
  ChevronDown,
  Zap,
  ShieldCheck,
  Globe,
  ImageIcon,
  Layers,
  RefreshCw,
  Share2,
} from "lucide-react";

const faqs = [
  {
    question:
      "What is the difference between an image sticker and an animated sticker?",
    answer:
      "An image sticker is a static WebP file created from a photo — displayed as a fixed image in messaging apps at 512×512 pixels on a transparent background. An animated sticker is created from a video clip and saved as an animated WebP — it plays as a looping animation in WhatsApp and Telegram. The tool automatically detects whether you uploaded an image or video and applies the appropriate pipeline.",
  },
  {
    question: "What video length and format works best for animated stickers?",
    answer:
      "The tool clips videos to a maximum of 6 seconds. For best results, use a short clip of 2–4 seconds — stickers loop most naturally at this length. MP4 and WEBM are the most reliable formats. The FPS slider (1–20) controls animation smoothness: 10–12 FPS produces smooth-looking stickers at smaller file sizes. The adaptive encoder automatically tries multiple FPS and quality combinations to keep the output under WhatsApp's 512KB sticker limit.",
  },
  {
    question: "What does the Reverse toggle do?",
    answer:
      "The Reverse toggle applies FFmpeg's reverse filter before converting to sticker — the animation plays backwards. This creates a boomerang-style effect where the action plays in one direction and then loops back. It works particularly well for reaction stickers — a hand clap, jump, or any quick motion looks natural both forwards and reversed.",
  },
  {
    question: "What are the quality presets and which should I choose?",
    answer:
      "Ultra HD (HD) targets 15 FPS at 512px scale — maximum quality, largest file. High targets 12 FPS at 512px scale — near-full quality. Balanced (Medium, the default) targets 10 FPS at 480px scale — best size-to-quality ratio for most stickers. Small (Low) targets 8 FPS at 420px scale — smallest output. For all presets, the tool automatically falls back to lower settings if the output exceeds WhatsApp's 512KB limit.",
  },
  {
    question: "What size does the tool output and why 512×512?",
    answer:
      "The tool outputs stickers at 512×512 pixels — the exact size required by WhatsApp and recommended by Telegram for sticker packs. For images, the original is thumbnailed to fit within 512×512 and centred on a transparent canvas. For videos, FFmpeg scales and pads to fit within 512×512 with transparent padding. This ensures the sticker displays correctly in all messaging apps without cropping or distortion.",
  },
  {
    question: "Can I share the sticker directly to WhatsApp from the tool?",
    answer:
      "Yes — on mobile browsers that support the Web Share API. After generating a sticker, the 'Share to WhatsApp' button triggers the native share sheet on your device. The 'Send to App' button opens the general share sheet for other apps. On desktop browsers, use the Download button and add the sticker to WhatsApp via Sticker Studio or your device's file manager.",
  },
  {
    question: "What format does the sticker download in?",
    answer:
      "All stickers download as WebP files — the format natively supported by WhatsApp and Telegram. Image stickers: WebP at quality 80 with transparent background. Animated stickers: animated WebP with loop=0 (infinite loop), encoded to stay under the 512KB WhatsApp sticker limit.",
  },
  {
    question: "Is the Sticker Maker free and does it add a watermark?",
    answer:
      "Yes — completely free with no usage limits and no watermark on generated stickers. Create as many image and animated stickers as you need at no cost with no account required.",
  },
];

const benefits = [
  {
    icon: <ImageIcon size={20} className="text-[#c3003a]" />,
    title: "Image and video — both supported",
    description:
      "Upload a photo for a static transparent sticker, or a video clip for an animated looping WebP sticker. One tool, two fully-optimised conversion pipelines.",
  },
  {
    icon: <Layers size={20} className="text-[#5b32b4]" />,
    title: "Adaptive quality encoding",
    description:
      "For videos, the encoder automatically tries multiple FPS and quality combinations to produce the best-looking sticker under WhatsApp's 512KB limit.",
  },
  {
    icon: <RefreshCw size={20} className="text-[#c3003a]" />,
    title: "Reverse animation",
    description:
      "Toggle reverse to flip the video animation backwards — creates a boomerang-style sticker from any short clip. Great for reactions and quick motions.",
  },
  {
    icon: <Zap size={20} className="text-[#5b32b4]" />,
    title: "512×512 transparent output",
    description:
      "All stickers output at the exact 512×512 pixel size required by WhatsApp and Telegram, centred on a transparent background.",
  },
  {
    icon: <Share2 size={20} className="text-[#c3003a]" />,
    title: "Direct WhatsApp share",
    description:
      "On mobile, use the native share buttons to send the sticker directly to WhatsApp or any messaging app via the Web Share API — no download needed.",
  },
  {
    icon: <Globe size={20} className="text-[#5b32b4]" />,
    title: "Works on any device",
    description:
      "Fully responsive Studio interface — create stickers from desktop, laptop, tablet, or smartphone from any modern browser.",
  },
];

const pipelines = [
  {
    aspect: "Input",
    image: "JPG, PNG, WebP, any image",
    video: "MP4, WEBM, any video format",
  },
  {
    aspect: "Output format",
    image: "Static WebP (transparent bg)",
    video: "Animated WebP (looping, transparent)",
  },
  {
    aspect: "Size",
    image: "512×512 px, centred on canvas",
    video: "512×512 px max, padded transparently",
  },
  {
    aspect: "Controls",
    image: "None — Smart Engine auto mode",
    video: "FPS, start/end time, quality, reverse",
  },
  {
    aspect: "Max duration",
    image: "N/A",
    video: "6 seconds (clips trimmed beyond this)",
  },
  {
    aspect: "File size target",
    image: "Quality 80 WebP — ~20–80KB",
    video: "Adaptive — targets under 512KB",
  },
  { aspect: "WhatsApp compatible", image: "✓ Yes", video: "✓ Yes" },
];

const qualityPresets = [
  {
    preset: "Ultra HD",
    fps: "15 FPS",
    scale: "512px",
    use: "Maximum quality — use when file size is not a concern",
    color: "#5b32b4",
  },
  {
    preset: "High",
    fps: "12 FPS",
    scale: "512px",
    use: "Near-full quality — good for most stickers",
    color: "#fb397d",
  },
  {
    preset: "Balanced (default)",
    fps: "10 FPS",
    scale: "480px",
    use: "Best quality-to-size ratio for WhatsApp",
    color: "#5b32b4",
  },
  {
    preset: "Small",
    fps: "8 FPS",
    scale: "420px",
    use: "Smallest output — use for long or complex clips",
    color: "#fb397d",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload your image or video",
    description:
      "Drag and drop onto the left panel or click to browse. The tool auto-detects image or video and configures the Studio panel accordingly. For videos, keep clips to 2–4 seconds for best looping stickers.",
  },
  {
    number: "02",
    title: "Configure Studio settings (video only)",
    description:
      "Set Start Time and End Time to trim your clip. Adjust FPS for animation smoothness and choose a quality preset. Toggle Reverse for a boomerang effect. Image stickers use Smart Engine automatically — no settings needed.",
  },
  {
    number: "03",
    title: "Click Generate Sticker",
    description:
      "Hit Generate Sticker and watch the progress bar fill. Video stickers may take a few seconds as the adaptive encoder tries multiple quality settings to meet the 512KB WhatsApp limit.",
  },
  {
    number: "04",
    title: "Download or share directly",
    description:
      "The result panel shows a WhatsApp-style preview. Download the WebP file, use Send to App for the Web Share API, or tap Share to WhatsApp for a direct send on mobile.",
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

export default function StickerMakerPageClient() {
  return (
    <section className="pt-32 md:pt-36 pb-16 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
      <header className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#f3ecff] border border-[#e9e1ff] text-[#5b32b4] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
          <Zap size={14} />
          Sticker Studio
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Sticker Maker
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
          Create custom WhatsApp and Telegram stickers from images or video
          clips. Static transparent stickers from photos, or animated looping
          WebP stickers from video — with FPS control, quality presets, reverse
          animation, and direct sharing. Free, no watermark, no signup.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            "100% Free",
            "Image & Video",
            "WhatsApp Compatible",
            "Animated WebP",
            "No Watermark",
            "Direct Share",
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

      <StickerGeneratorTools />

      <section
        className="max-w-4xl mx-auto space-y-8"
        aria-labelledby="intent-heading"
      >
        <h2
          id="intent-heading"
          className="text-2xl md:text-3xl font-bold text-[#5b32b4]"
        >
          Two Pipelines — Images and Videos, Both Fully Supported
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Most sticker makers only handle static images. This tool processes
          both — with two separate, fully-optimised conversion pipelines. Upload
          a photo and it becomes a transparent 512×512 WebP sticker centred on a
          clean canvas, exactly sized to WhatsApp's requirements. Upload a video
          clip and the Studio panel activates with controls for trimming, FPS,
          quality preset, and reverse animation — then the adaptive encoder runs
          multiple passes to produce the best animated WebP under WhatsApp's
          512KB sticker limit.
        </p>

        {/* Pipeline table */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Image sticker vs animated sticker — pipeline comparison
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-[#e9e1ff]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f3ecff]">
                  <th className="text-left px-5 py-3 font-bold text-[#5b32b4] text-xs uppercase tracking-wider">
                    Property
                  </th>
                  <th className="text-left px-5 py-3 font-bold text-[#5b32b4] text-xs uppercase tracking-wider">
                    Image sticker
                  </th>
                  <th className="text-left px-5 py-3 font-bold text-[#c3003a] text-xs uppercase tracking-wider">
                    Animated sticker (video)
                  </th>
                </tr>
              </thead>
              <tbody>
                {pipelines.map((row, i) => (
                  <tr
                    key={row.aspect}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#faf7ff]"}
                  >
                    <td className="px-5 py-3 font-bold text-[#2b1d3a] text-xs">
                      {row.aspect}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.image}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-600">
                      {row.video}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quality presets */}
        <div>
          <h3 className="font-bold text-[#2b1d3a] mb-4 text-base">
            Video quality presets — what each targets
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {qualityPresets.map((p) => (
              <div
                key={p.preset}
                className="rounded-2xl border p-5 bg-gradient-to-br from-white to-[#faf7ff]"
                style={{ borderColor: `${p.color}30` }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p className="font-black text-sm" style={{ color: p.color }}>
                    {p.preset}
                  </p>
                  <span className="text-[10px] font-mono font-black text-gray-400">
                    {p.fps} · {p.scale}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{p.use}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Value intent */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#faf7ff] via-white to-[#fff5f9] border border-[#e9e1ff] p-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#fb397d]/10 blur-2xl pointer-events-none" />
          <div className="relative grid sm:grid-cols-2 gap-6">
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                Who creates custom stickers:
              </p>
              <ul className="space-y-2">
                {[
                  "Friends creating personalised sticker packs for group chats",
                  "Content creators building branded reaction stickers",
                  "Meme makers turning viral moments into shareable stickers",
                  "Businesses adding branded stickers to customer conversations",
                  "Communities creating sticker packs for shared interests",
                  "Anyone wanting a reaction no existing sticker captures",
                ].map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={13}
                      className={`mt-0.5 shrink-0 ${idx % 2 === 0 ? "text-[#5b32b4]" : "text-[#c3003a]"}`}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-[#2b1d3a] text-sm mb-3">
                Best content for animated stickers:
              </p>
              <ul className="space-y-2">
                {[
                  "Short reaction clips — thumbs up, laugh, or facepalm",
                  "Looping animations — content that looks natural on repeat",
                  "Boomerang moments — works great with the Reverse toggle",
                  "Pet clips — animals make popular animated stickers",
                  "Simple motion — waving, nodding, or a quick gesture",
                  "Meme clips trimmed to the key 2–3 second moment",
                ].map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle2
                      size={13}
                      className={`mt-0.5 shrink-0 ${idx % 2 === 0 ? "text-[#c3003a]" : "text-[#5b32b4]"}`}
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
            How to Make a Custom Sticker Online
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Four steps. Image or video. WhatsApp-ready in seconds.
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
            Why Use the Snappy-Fix Sticker Maker?
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Images and video · adaptive quality · 512×512 transparent output ·
            direct WhatsApp share.
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
            Everything about creating WhatsApp stickers, animated stickers, and
            Studio controls.
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

      <OtherToolsSection currentSlug="sticker-maker" />
      <RandomToolsSection />
      <ToolCategoriesSection />
    </section>
  );
}
