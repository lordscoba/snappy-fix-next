"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { NavbarMenu } from "@/components/Layout";
import AboutHero from "@/components/about/AboutHero";
import AboutCTA from "@/components/about/AboutCTA";
import AboutTeamSection from "@/components/about/AboutTeamSection";
import AboutTimelineSection from "@/components/about/AboutTimelineSection";
import AboutValuesSection from "@/components/about/AboutValuesSection";
import AboutServicesSection from "@/components/about/AboutServiceSection";
import AboutStorySection from "@/components/about/AboutStorySection";

const Counter = dynamic(() => import("@/components/home/Counter"), {
  ssr: false,
  loading: () => (
    <div className="relative py-20 bg-[#47238f]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-3 animate-pulse"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10" />
            <div className="h-10 w-20 bg-white/10 rounded" />
            <div className="h-3 w-24 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    </div>
  ),
});

export default function AboutPageClient() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-white overflow-x-hidden">
      <NavbarMenu background="bg-[#47238f]" />
      <AboutHero />

      {/* Counter is always purple bg — skeleton matches to prevent layout shift */}
      <Counter />

      <AboutStorySection />
      <AboutServicesSection />
      <AboutValuesSection />
      <AboutTimelineSection />

      {/* Team grid is large (images + data) — Suspense prevents it blocking above content */}
      <Suspense
        fallback={
          <div id="teams" className="py-20 bg-white min-h-[400px]">
            Loading team...
          </div>
        }
      >
        <AboutTeamSection />
      </Suspense>
      <AboutCTA />
    </main>
  );
}
