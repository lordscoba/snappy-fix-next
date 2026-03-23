import { tools } from "@/data/toolsData";
import { ArrowRight, Zap } from "lucide-react";
import { SectionHeader, UseInView } from "./Helpers";
import Link from "next/link";

export default function ToolsSection() {
  const { ref, visible } = UseInView();
  const showcase = tools.slice(0, 9);
  return (
    <section
      id="tools-preview"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 bg-gradient-to-br from-[#faf7ff] to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Free Tools"
          title="Free Online Image Tools"
          subtitle="Convert, compress, resize, crop, watermark, and optimise images for web, print, and social media — all free, no signup."
          action={
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#5b32b4] hover:underline"
            >
              Browse all tools <ArrowRight size={14} />
            </Link>
          }
        />
        <div
          className={`mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {showcase.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.href}
              className="group flex items-start gap-4 bg-white border border-[#e9e1ff] hover:border-[#5b32b4]/40 hover:shadow-md hover:shadow-[#5b32b4]/10 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5b32b4] to-[#fb397d] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Zap size={16} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[#2b1d3a] text-sm leading-tight line-clamp-1 group-hover:text-[#5b32b4] transition-colors">
                  {tool.name.split("|")[0].trim()}
                </p>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 bg-[#5b32b4] hover:bg-[#47238f] text-white font-bold px-8 py-3.5 rounded-full transition-all active:scale-95"
          >
            View All {tools.length} Tools
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
