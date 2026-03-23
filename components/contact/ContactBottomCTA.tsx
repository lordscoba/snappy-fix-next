import { ImageIcon } from "lucide-react";
import Link from "next/link";

export default function ContactBottomCTA() {
  return (
    <section className="py-16 bg-[#2b1d3a]">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Need something right now?
          </h2>
          <p className="text-white/70 mt-1">
            Try our free online tools — no signup, no watermark, instant
            results.
          </p>
        </div>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 bg-[#fb397d] hover:bg-[#e02d6e] text-white font-bold px-8 py-4 rounded-full transition-all active:scale-95 whitespace-nowrap shadow-lg"
        >
          <ImageIcon size={16} />
          Browse Free Tools
        </Link>
      </div>
    </section>
  );
}
