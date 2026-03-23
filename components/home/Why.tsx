import { Code2, Globe, Shield, Zap } from "lucide-react";
import { SectionHeader, UseInView } from "./Helpers";

// ─── Why features ─────────────────────────────────────────────────────────────
const WHY_FEATURES = [
  {
    icon: <Zap size={28} className="text-[#fb397d]" />,
    title: "Fast & Reliable",
    body: "Every tool and website we build is engineered for speed. Optimised images, clean code, and fast load times — always.",
  },
  {
    icon: <Shield size={28} className="text-[#fb397d]" />,
    title: "Private & Secure",
    body: "Your files are never stored. Image processing happens securely and files are discarded immediately after download.",
  },
  {
    icon: <Globe size={28} className="text-[#fb397d]" />,
    title: "Built for the Web",
    body: "From PageSpeed to Core Web Vitals, we design and build with real web performance standards — not just aesthetics.",
  },
  {
    icon: <Code2 size={28} className="text-[#fb397d]" />,
    title: "Clean Engineering",
    body: "Scalable, maintainable code written by specialists. No bloat, no shortcuts — just solid digital products.",
  },
];

export default function WhySection() {
  const { ref, visible } = UseInView();
  return (
    <section
      id="why"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Why Us"
          title="Why Choose Snappy-Fix Technologies"
          subtitle="We combine modern design, solid engineering, and real-world performance standards to build products that work."
        />
        <div
          className={`mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {WHY_FEATURES.map((f, i) => (
            <article
              key={i}
              className="group bg-white border border-[#e9e1ff] rounded-3xl p-7 hover:border-[#5b32b4]/40 hover:shadow-lg hover:shadow-[#5b32b4]/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#f4edff] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="font-bold text-[#2b1d3a] mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
