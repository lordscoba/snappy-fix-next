"use client";

import {
  ArrowLeftRight,
  BookOpen,
  Code2,
  ImageIcon,
  Search,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { UseInView } from "./Helpers";
import { tools } from "@/data/toolsData";

// ─── Hero background images ───────────────────────────────────────────────────
const BG_IMAGES = [
  "/images/snowC1.webp",
  "/images/snowC2.webp",
  "/images/snowg.webp",
];

// ─── Stats ───────────────────────────────────────────────────────────────────

export const Hero = () => {
  // Start with a default image
  const [bgSrc, setBgSrc] = useState(BG_IMAGES[0]);
  // Randomize background on mount
  useEffect(() => {
    const randomBg = BG_IMAGES[Math.floor(Math.random() * BG_IMAGES.length)];
    setBgSrc(randomBg);
  }, []);

  return (
    <header
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden isolate"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          // src={bgSrc}
          src="/images/snowC2.webp"
          alt="Snow background"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/75 to-black/75 z-10" />

      <div className="relative z-20 flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 pt-36 pb-16 w-full">
        {/* ── Bold value proposition ── */}
        <div className="text-center space-y-6 max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
            <span className="bg-gradient-to-r from-[#fb397d] to-[#9572e8] bg-clip-text text-transparent">
              Online Free Tools &
            </span>{" "}
            Software Company
          </h1>
          {/* Bold tagline */}
          <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-snug max-w-3xl mx-auto">
            Online free tools — convert, compress, optimise. Plus websites and
            apps built to perform.
          </p>
          <p className="text-white/65 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Built by Snappy-Fix Technologies for developers, designers, and
            businesses worldwide.
          </p>
        </div>

        {/* ── Search bar → links to tools page ── */}
        <div className="max-w-lg mx-auto w-full mb-10">
          <form action="/tools" method="GET" className="relative" role="search">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
            />
            <input
              type="search"
              name="search"
              placeholder="Search image tools..."
              className="w-full pl-11 pr-32 py-4 rounded-2xl bg-white/12 backdrop-blur-md border border-white/20 text-white placeholder-white/45 focus:outline-none focus:ring-2 focus:ring-[#fb397d]/60 focus:bg-white/18 transition-all text-sm"
            />
            <button
              aria-label="Search tools"
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#fb397d] hover:bg-[#e02d6e] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all active:scale-95 whitespace-nowrap"
            >
              Search Tools
            </button>
          </form>
        </div>

        {/* ── 5 primary navigation buttons — 2 top, 3 bottom ── */}
        <div className="max-w-2xl mx-auto w-full space-y-3">
          {/* Row 1 — 2 wide primary actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/tools"
              className="group flex flex-col items-center justify-center gap-1.5 bg-[#fb397d] hover:bg-[#e02d6e] text-white font-bold py-4 px-4 rounded-2xl transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#fb397d]/30 text-center"
            >
              <ImageIcon size={20} />
              <span className="text-sm">All Image Tools</span>
              <span className="text-[10px] font-normal text-white/75">
                All free tools
              </span>
            </Link>

            <Link
              href="/contact"
              className="group flex flex-col items-center justify-center gap-1.5 bg-white/12 hover:bg-white/20 backdrop-blur-md border border-white/25 hover:border-white/40 text-white font-bold py-4 px-4 rounded-2xl transition-all duration-200 active:scale-[0.97] text-center"
            >
              <Code2 size={20} />
              <span className="text-sm">Build a Website</span>
              <span className="text-[10px] font-normal text-white/60">
                Get a quote
              </span>
            </Link>
          </div>

          {/* Row 2 — 3 compact category / page links */}
          <div className="grid grid-cols-3 gap-3">
            <Link
              href="/blog"
              className="group flex flex-col items-center justify-center gap-1.5 bg-white/10 hover:bg-white/18 backdrop-blur-md border border-white/15 hover:border-[#9572e8]/60 text-white py-3.5 px-3 rounded-xl transition-all duration-200 active:scale-[0.97] text-center"
            >
              <BookOpen size={17} />
              <span className="text-xs font-bold">Blog</span>
              <span className="text-[10px] text-white/55">Guides & tips</span>
            </Link>

            <Link
              href="/tools/image-editing-tools"
              className="group flex flex-col items-center justify-center gap-1.5 bg-white/10 hover:bg-white/18 backdrop-blur-md border border-white/15 hover:border-[#9572e8]/60 text-white py-3.5 px-3 rounded-xl transition-all duration-200 active:scale-[0.97] text-center"
            >
              <Zap size={17} />
              <span className="text-xs font-bold">Editing Tools</span>
              <span className="text-[10px] text-white/55">Web & social</span>
            </Link>

            <Link
              href="/tools/conversion-tools"
              className="group flex flex-col items-center justify-center gap-1.5 bg-white/10 hover:bg-white/18 backdrop-blur-md border border-white/15 hover:border-[#9572e8]/60 text-white py-3.5 px-3 rounded-xl transition-all duration-200 active:scale-[0.97] text-center"
            >
              <ArrowLeftRight size={17} />
              <span className="text-xs font-bold">Converters</span>
              <span className="text-[10px] text-white/55">Format & type</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-20 flex flex-col items-center gap-1 pb-6 animate-bounce text-white/35 mx-auto">
        <div className="w-px h-6 bg-white/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-white/35" />
      </div>
    </header>
  );
};
