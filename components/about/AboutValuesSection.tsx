"use client";
import { Target, Shield, Zap, Heart, Users, CheckCircle2 } from "lucide-react";
import { AboutSectionLabel, UseInView } from "../home/Helpers";

// ─── Values ───────────────────────────────────────────────────────────────────
const VALUES = [
  {
    icon: <Target size={20} />,
    title: "Purposeful",
    body: "Everything we build solves a real problem. No fluff, no unnecessary complexity.",
  },
  {
    icon: <Shield size={20} />,
    title: "Trustworthy",
    body: "Your data stays private. Your projects stay on schedule. We keep our word.",
  },
  {
    icon: <Zap size={20} />,
    title: "Performance-first",
    body: "Fast load times and great PageSpeed scores aren't optional — they're the standard.",
  },
  {
    icon: <Heart size={20} />,
    title: "User-centred",
    body: "We design and build for the people who will use your product, not just for aesthetics.",
  },
  {
    icon: <Users size={20} />,
    title: "Collaborative",
    body: "We work alongside you, not for you. Your input shapes everything we build.",
  },
  {
    icon: <CheckCircle2 size={20} />,
    title: "Quality over speed",
    body: "We take the time to build things right — clean code, solid architecture, tested output.",
  },
];

export default function ValuesSection() {
  const { ref, visible } = UseInView();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-12">
          <AboutSectionLabel text="Our Values" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#2b1d3a]">
            How We Work
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            The principles that guide every product we build and every client
            relationship we build.
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-[#5b32b4] to-[#fb397d] mx-auto rounded-full" />
        </div>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {VALUES.map((v, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white border border-[#e9e1ff] rounded-2xl p-6 hover:border-[#5b32b4]/30 hover:shadow-md transition-all"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5b32b4] to-[#fb397d] text-white flex items-center justify-center shrink-0">
                {v.icon}
              </div>
              <div>
                <h3 className="font-bold text-[#2b1d3a] mb-1">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {v.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
