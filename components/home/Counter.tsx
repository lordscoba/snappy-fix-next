"use client";

import { useEffect, useRef, useState } from "react";
import {
  HiOutlineGlobeAlt,
  HiOutlineFaceSmile,
  HiOutlineStar,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import CountUp from "react-countup";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
type Stat = {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
};

// ─── Data — defined outside component so it is never recreated on re-render ──
const STATS: Stat[] = [
  {
    label: "Websites Built",
    value: 110,
    suffix: "+",
    icon: <HiOutlineGlobeAlt />,
  },
  {
    label: "Happy Clients",
    value: 110,
    suffix: "+",
    icon: <HiOutlineFaceSmile />,
  },
  { label: "5-Star Reviews", value: 103, suffix: "", icon: <HiOutlineStar /> },
  {
    label: "Online Tools",
    value: 29,
    suffix: "",
    icon: <HiOutlineWrenchScrewdriver />,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const Counter = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden isolate"
      aria-label="Company statistics"
    >
      {/* Background — image + overlay inside -z-10 wrapper.
          Content sits above at default z-0. No z-20 needed on content. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg-img/rt.webp"
          alt="Background image"
          fill
          className="object-cover object-center scale-105"
          quality={75}
          loading="lazy"
          sizes="(max-width: 640px) 640w, (max-width: 1024px) 1024w, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#5b32b4]/90 via-[#47238f]/85 to-[#2b1d3a]/90" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 sm:gap-8 text-center">
          {STATS.map(({ label, value, suffix, icon }, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="mb-4 p-3 rounded-2xl bg-white/10 border border-white/20 text-white text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20">
                {icon}
              </div>

              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                {visible ? (
                  <CountUp
                    start={0}
                    end={value}
                    duration={2.5}
                    suffix={suffix}
                    useEasing
                  />
                ) : (
                  <span>0{suffix}</span>
                )}
              </div>

              <p className="mt-2 text-white/70 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counter;
