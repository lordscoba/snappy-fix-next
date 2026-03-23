import { ImageIcon } from "lucide-react";
import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#5b32b4] to-[#884bdf] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-[#fb397d] blur-3xl" />
      </div>
      <div className="relative max-w-3xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          Let's Build Something Together
        </h2>
        <p className="text-white/75 text-lg">
          Whether you need a website, web application, or just want to use our
          free tools — we're here to help.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#fb397d] hover:bg-[#e02d6e] text-white font-bold px-8 py-4 rounded-full transition-all active:scale-95 shadow-lg"
          >
            Start a Project
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold px-8 py-4 rounded-full transition-all backdrop-blur-sm"
          >
            <ImageIcon size={16} /> Free Tools
          </Link>
        </div>
      </div>
    </section>
  );
}
