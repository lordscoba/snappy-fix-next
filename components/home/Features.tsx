import { Code2, Cpu, Globe, ImageIcon, Star } from "lucide-react";
import { UseInView } from "./Helpers";
import Image from "next/image";

export default function FeaturesSection() {
  const { ref, visible } = UseInView();
  return (
    <section
      id="features"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 bg-[#faf7ff] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="space-y-6">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#fb397d] bg-[#fb397d]/10 px-4 py-1.5 rounded-full">
              What We Build
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#2b1d3a] leading-tight">
              Websites, Apps & Online Tools — All in One Place
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Snappy-Fix Technologies is a modern web development company and
              creator of powerful free online tools. We build business websites,
              scalable web applications, SaaS platforms, and image utilities
              used by developers and marketers worldwide.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Code2 size={18} />,
                  title: "Web & App Development",
                  text: "Custom websites, SaaS, and mobile apps.",
                },
                {
                  icon: <ImageIcon size={18} />,
                  title: "Image Tools",
                  text: "All free tools for processing images.",
                },
                {
                  icon: <Cpu size={18} />,
                  title: "Performance Focused",
                  text: "PageSpeed and Core Web Vitals optimised.",
                },
                {
                  icon: <Globe size={18} />,
                  title: "SEO Ready",
                  text: "Built with search visibility in mind.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white rounded-2xl border border-[#e9e1ff] p-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#f4edff] text-[#5b32b4] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-[#2b1d3a] text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/bg-img/cart-1.webp"
                alt="Snappy-Fix web development project"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white border border-[#e9e1ff] rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#5b32b4] flex items-center justify-center">
                <Star size={14} className="text-white fill-white" />
              </div>
              <div>
                <p className="text-xs font-black text-[#2b1d3a]">
                  5-Star Rated
                </p>
                <p className="text-[10px] text-gray-400">103+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
