import { ImageIcon, Send } from "lucide-react";
import Link from "next/link";

const CTABanners = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#47238f] to-[#884bdf]" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#fb397d] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          Ready to Build Something Great?
        </h2>
        <p className="text-white/80 text-lg max-w-xl mx-auto">
          Whether you need a website built or a tool to speed up your workflow —
          Snappy-Fix Technologies has you covered.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact#contact"
            className="inline-flex items-center gap-2 bg-[#fb397d] hover:bg-[#e02d6e] text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg active:scale-95"
          >
            <Send size={16} />
            Contact Us
          </Link>
          <Link
            arial-label="Free Tools"
            href="/tools"
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold px-8 py-4 rounded-full transition-all backdrop-blur-sm"
          >
            <ImageIcon size={16} />
            Free Tools
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanners;
