import { useState, useEffect } from "react";
import Image from "next/image";
import { SectionHeader } from "./Helpers";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Aigars Silkalns",
    role: "Client",
    image: "/images/bg-img/client-2.webp",
    stars: 5,
    text: "I have been using Snappy-fix for years. They deliver responsive websites with impressive functionality.",
  },
  {
    name: "Jeff Obuekwe",
    role: "Client",
    image: "/images/bg-img/customeer3.webp",
    stars: 5,
    text: "Snappy-fix has shown professionalism in delivering quality websites. They remain my number one.",
  },
  {
    name: "Simon",
    role: "Client",
    image: "/images/bg-img/customer2.webp",
    stars: 5,
    text: "Quality job with full functionality. Thumbs up.",
  },
  {
    name: "Helen",
    role: "Client",
    image: "/images/bg-img/customer1.webp",
    stars: 5,
    text: "Delivered all my requested functionality in full working shape. Thanks again.",
  },
];

const Testimonial = () => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Testimonial auto-advance
  useEffect(() => {
    const id = setInterval(
      () => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length),
      6000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="testimonial"
      className="py-20 bg-gradient-to-br from-[#faf7ff] to-white"
    >
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          label="Testimonials"
          title="What Our Clients Say"
          subtitle="Real feedback from real clients who've worked with Snappy-Fix Technologies."
        />
        <div className="mt-12 relative">
          <div className="bg-white rounded-3xl border border-[#e9e1ff] p-8 md:p-12 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#5b32b4]/20">
                  <Image
                    src={TESTIMONIALS[testimonialIdx].image}
                    alt={TESTIMONIALS[testimonialIdx].name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#fb397d] rounded-full flex items-center justify-center">
                  <Star size={10} className="text-white fill-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="flex justify-center md:justify-start gap-1">
                  {Array.from({
                    length: TESTIMONIALS[testimonialIdx].stars,
                  }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-[#f1b922] fill-[#f1b922]"
                    />
                  ))}
                </div>
                <p className="text-[#726a84] text-lg leading-relaxed italic">
                  "{TESTIMONIALS[testimonialIdx].text}"
                </p>
                <div>
                  <p className="font-bold text-[#2b1d3a]">
                    {TESTIMONIALS[testimonialIdx].name}
                  </p>
                  <p className="text-[#6b5d80] text-sm">
                    {TESTIMONIALS[testimonialIdx].role}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={() =>
                setTestimonialIdx(
                  (i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
                )
              }
              aria-label="Previous"
              className="w-9 h-9 rounded-full border border-[#e9e1ff] flex items-center justify-center text-[#5b32b4] hover:bg-[#5b32b4] hover:text-white hover:border-[#5b32b4] transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            {TESTIMONIALS.map((_, i) => (
              <button
                type="button"
                aria-label="Select testimonial"
                key={i}
                onClick={() => setTestimonialIdx(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === testimonialIdx ? "bg-[#fb397d] scale-125" : "bg-[#d6c7ef]"}`}
              />
            ))}
            <button
              type="button"
              onClick={() =>
                setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length)
              }
              aria-label="Next"
              className="w-9 h-9 rounded-full border border-[#e9e1ff] flex items-center justify-center text-[#5b32b4] hover:bg-[#5b32b4] hover:text-white hover:border-[#5b32b4] transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testimonial;
