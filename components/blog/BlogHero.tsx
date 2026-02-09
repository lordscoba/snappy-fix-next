"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type HeroPost = {
  title: string;
  excerpt: string;
  cover: string;
  category: string;
};

type BlogHeroProps = {
  items: HeroPost[];
};

export default function BlogHero({ items }: BlogHeroProps) {
  const [index, setIndex] = useState(0);

  const active = useMemo(() => items[index], [items, index]);

  const goPrev = () =>
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  const goNext = () => setIndex((prev) => (prev + 1) % items.length);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section className="relative w-full overflow-hidden rounded-3xl border bg-[#f8f5ff]">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#e7dbff] blur-3xl" />
      <div className="absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-[#ffd6e7] blur-3xl" />

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
      >
        <MdChevronLeft size={28} className="text-[#5b32b4]" />
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
      >
        <MdChevronRight size={28} className="text-[#5b32b4]" />
      </button>

      <div className="relative grid gap-6 px-6 py-12 md:grid-cols-[1.1fr_1fr] md:px-12">
        <div className="space-y-5">
          <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs text-[#5b32b4] shadow">
            {active.category}
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#2b1d3a]">
            {active.title}
          </h2>
          <p className="text-sm md:text-base text-[#6f5a88] leading-relaxed">
            {active.excerpt}
          </p>

          <div className="flex items-center gap-2 text-xs text-[#6f5a88]">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === index ? "bg-[#fb397d]" : "bg-[#d6c7ef]"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="relative h-64 md:h-72 lg:h-80 w-full overflow-hidden rounded-2xl shadow">
          <Image
            src={active.cover}
            alt={active.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
