"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { HiClock, HiUser } from "react-icons/hi2";

type HeroPost = {
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  slug: string;
  author: string;
  readingTime: string;
  date: string;
};

export default function BlogHero({ items }: { items: HeroPost[] }) {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setIndex(next);
        setAnimating(false);
      }, 300);
    },
    [animating],
  );

  const goPrev = () => goTo((index - 1 + items.length) % items.length);
  const goNext = useCallback(
    () => goTo((index + 1) % items.length),
    [index, items.length, goTo],
  );

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(goNext, 6000);
    return () => clearInterval(id);
  }, [goNext, items.length]);

  const active = items[index];

  return (
    <section className="relative w-full h-[92vh] min-h-[580px] max-h-[780px] overflow-hidden bg-[#0e0716]  mt-16 md:mt-20">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: animating ? 0 : 1 }}
      >
        <Image
          src={active.cover}
          alt={active.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0716]/95 via-[#0e0716]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0716] via-transparent to-[#0e0716]/30" />
        {/* Purple glow accent */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0e0716] to-transparent" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(12px)" : "translateY(0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {/* Category pill */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 bg-[#fb397d] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {active.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight max-w-3xl mb-4">
          {active.title}
        </h1>

        {/* Excerpt */}
        <p className="text-[#c4b5d9] text-base sm:text-lg max-w-xl leading-relaxed mb-6">
          {active.excerpt}
        </p>

        {/* Meta + CTA */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-4 text-sm text-[#9d86b8]">
            <span className="flex items-center gap-1.5">
              <HiUser className="text-[#fb397d]" />
              {active.author}
            </span>
            <span className="flex items-center gap-1.5">
              <HiClock className="text-[#fb397d]" />
              {active.readingTime}
            </span>
            <span>{active.date}</span>
          </div>

          <Link
            href={`/blog/${active.slug}`}
            className="group inline-flex items-center gap-2 bg-[#5b32b4] hover:bg-[#fb397d] text-white text-sm font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#fb397d]/30"
          >
            Read Article
            <MdChevronRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Nav arrows */}
      <button
        type="button"
        aria-label="Previous"
        onClick={goPrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#5b32b4] hover:border-[#5b32b4] transition-all duration-200"
      >
        <MdChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#5b32b4] hover:border-[#5b32b4] transition-all duration-200"
      >
        <MdChevronRight size={22} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 right-6 sm:right-12 lg:right-20 z-20 flex items-center gap-2">
        {items.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === index
                ? "w-8 h-2 bg-[#fb397d]"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-6 right-6 sm:right-12 lg:right-20 z-20 text-xs font-mono text-white/40">
        {String(index + 1).padStart(2, "0")} /{" "}
        {String(items.length).padStart(2, "0")}
      </div>
    </section>
  );
}
