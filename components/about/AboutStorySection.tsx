import { Star } from "lucide-react";
import { AboutSectionLabel, UseInView } from "../home/Helpers";
import Image from "next/image";

export default function AboutStorySection() {
  const { ref, visible } = UseInView();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="space-y-5">
            <AboutSectionLabel text="Our Story" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2b1d3a] leading-tight">
              Built in Nigeria. Used Worldwide.
            </h2>
            <p className="text-gray-500 leading-relaxed">
              Snappy-Fix Technologies was founded in Uyo, Akwa Ibom State,
              Nigeria with a single mission: to build digital products that
              actually work — fast, reliable, and built to last.
            </p>
            <p className="text-gray-500 leading-relaxed">
              We started as a web development company, helping Nigerian
              businesses establish strong online presences. Over time, we
              expanded into free online tools — starting with image converters
              and growing into a suite of 29+ tools used by developers,
              designers, and marketers around the world.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Today, Snappy-Fix Technologies combines software development
              services with a growing library of free digital utilities — all
              built on the same foundation: clean engineering, real performance,
              and genuine usefulness.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {[
                  "/images/bg-img/client-2.webp",
                  "/images/bg-img/customeer3.webp",
                  "/images/bg-img/customer2.webp",
                ].map((img, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt="Client"
                      width={36}
                      height={36}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#726a84]">
                <strong className="text-[#5b32b4]">110+</strong> clients trust
                us worldwide
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/bg-img/cart-1.webp"
                alt="Snappy-Fix Technologies team at work"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Rating badge */}
            <div className="absolute -bottom-5 -right-5 bg-white border border-[#e9e1ff] rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f1b922]/15 flex items-center justify-center">
                <Star size={18} className="text-[#f1b922] fill-[#f1b922]" />
              </div>
              <div>
                <p className="text-xs font-black text-[#2b1d3a]">
                  Rated 5 Stars
                </p>
                <p className="text-[10px] text-gray-400">By 103+ clients</p>
              </div>
            </div>
            {/* Location badge */}
            <div className="absolute -top-4 -left-4 bg-white border border-[#e9e1ff] rounded-2xl px-4 py-2.5 shadow-lg text-xs font-bold text-[#5b32b4]">
              🇳🇬 Uyo, Nigeria
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
