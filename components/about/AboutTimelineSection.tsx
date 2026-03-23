import { AboutSectionLabel, UseInView } from "../home/Helpers";

// ─── Timeline milestones ──────────────────────────────────────────────────────
const MILESTONES = [
  {
    year: "2019",
    title: "Founded",
    body: "Snappy-Fix Technologies was founded in Uyo, Akwa Ibom, with a focus on delivering quality web development to Nigerian businesses.",
  },
  {
    year: "2021",
    title: "100 Websites Delivered",
    body: "We crossed 100 completed websites across e-commerce, education, investment, and business platforms.",
  },
  {
    year: "2023",
    title: "Image Tools Launched",
    body: "We launched our free online image tools suite — starting with image conversion, compression, and optimisation tools.",
  },
  {
    year: "2024",
    title: "29 Free Tools",
    body: "Expanded to 29 free online tools covering image processing, PDF utilities, password generation, and SEO tools.",
  },
  {
    year: "2025",
    title: "Growing Globally",
    body: "Serving clients and tool users across Nigeria, the UK, the US, and growing internationally.",
  },
];

export default function AboutTimelineSection() {
  const { ref, visible } = UseInView();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 bg-gradient-to-br from-[#faf7ff] to-white"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-3 mb-14">
          <AboutSectionLabel text="Our Journey" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#2b1d3a]">
            How We Got Here
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-[#5b32b4] to-[#fb397d] mx-auto rounded-full" />
        </div>
        <div
          className={`relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[#e9e1ff] -translate-x-1/2" />
          <div className="space-y-10">
            {MILESTONES.map((m, i) => (
              <div
                key={i}
                className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-16 md:pl-0`}
                >
                  <div
                    className={`bg-white border border-[#e9e1ff] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#5b32b4]/30 transition-all ${i % 2 === 0 ? "md:ml-0" : ""}`}
                  >
                    <span className="text-xs font-black text-[#c3003a] bg-[#fb397d]/10 px-3 py-1 rounded-full">
                      {m.year}
                    </span>
                    <h3 className="font-bold text-[#2b1d3a] mt-2 mb-1">
                      {m.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {m.body}
                    </p>
                  </div>
                </div>
                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[#5b32b4] to-[#fb397d] border-2 border-white shadow-md top-5" />
                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
