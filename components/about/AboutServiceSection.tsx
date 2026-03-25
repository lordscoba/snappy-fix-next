"use client";

import { Code2, Globe, ImageIcon, Smartphone } from "lucide-react";
import { AboutSectionLabel, UseInView } from "../home/Helpers";

// ─── Core services ────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: <Code2 size={24} className="text-[#c3003a]" />,
    title: "Website & Web App Development",
    body: "We build custom websites, SaaS platforms, and web applications using modern frameworks — React, Next.js, Node.js, and more. Every project is built for performance, scalability, and real business results.",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL"],
  },
  {
    icon: <Smartphone size={24} className="text-[#c3003a]" />,
    title: "Mobile App Development",
    body: "Cross-platform mobile apps built with Flutter — one codebase, iOS and Android. From MVP prototypes to production-grade applications, we build mobile experiences that users love.",
    tags: ["Flutter", "iOS", "Android", "Firebase"],
  },
  {
    icon: <ImageIcon size={24} className="text-[#c3003a]" />,
    title: "Free Online Image Tools",
    body: "We build and maintain a suite of 29+ free online image tools — converters, optimisers, compressors, watermark tools, and more — used daily by developers, designers, and marketers worldwide.",
    tags: ["WebP", "AVIF", "PDF", "SVG", "HEIC"],
  },
  {
    icon: <Globe size={24} className="text-[#c3003a]" />,
    title: "SEO & Web Performance",
    body: "Every product we build is optimised for search engines and real web performance metrics. PageSpeed, Core Web Vitals, structured data, and technical SEO — baked in from the start.",
    tags: ["Core Web Vitals", "PageSpeed", "Schema.org", "SEO"],
  },
];

export default function AboutServicesSection() {
  const { ref, visible } = UseInView();
  return (
    <section
      id="services"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 bg-gradient-to-br from-[#faf7ff] to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-12">
          <AboutSectionLabel text="Services" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#2b1d3a]">
            What We Do
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Everything from full web platforms to free online tools — built with
            the same attention to quality and performance.
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-[#5b32b4] to-[#fb397d] mx-auto rounded-full" />
        </div>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {SERVICES.map((s, i) => (
            <article
              key={i}
              className="group bg-white border border-[#e9e1ff] rounded-3xl p-8 hover:border-[#5b32b4]/40 hover:shadow-lg hover:shadow-[#5b32b4]/10 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[#f4edff] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="font-bold text-[#2b1d3a] text-lg">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {s.body}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-bold text-[#5b32b4] bg-[#f4edff] px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
