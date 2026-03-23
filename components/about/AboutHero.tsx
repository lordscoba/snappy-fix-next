import { ArrowRight, ImageIcon } from "lucide-react";
import Link from "next/link";

export default function AboutHero() {
  return (
    <header className="relative min-h-[60vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#3e1f7a] to-[#5b32b4]" />
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#fb397d]/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#9572e8]/20 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center space-y-6">
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#fb397d] bg-[#fb397d]/15 border border-[#fb397d]/30 px-4 py-1.5 rounded-full">
          About Snappy-Fix Technologies
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto">
          Nigerian Software Company.{" "}
          <span className="bg-gradient-to-r from-[#fb397d] to-[#f1b922] bg-clip-text text-transparent">
            Global Digital Impact.
          </span>
        </h1>
        <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
          We build high-performance websites, web applications, and free online
          tools — designed for developers, designers, and businesses worldwide.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            href="#services"
            className="inline-flex items-center gap-2 bg-[#fb397d] hover:bg-[#e02d6e] text-white font-bold px-7 py-3.5 rounded-full transition-all active:scale-95 text-sm"
          >
            Our Services <ArrowRight size={15} />
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold px-7 py-3.5 rounded-full transition-all backdrop-blur-sm text-sm"
          >
            <ImageIcon size={15} /> Free Tools
          </Link>
        </div>
      </div>
    </header>
  );
}
