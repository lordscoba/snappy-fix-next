"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { NavbarMenu } from "@/components/Layout";
import AboutHero from "@/components/about/AboutHero";
const Counter = dynamic(() => import("@/components/home/Counter"), {
  ssr: false,
});
import AboutCTA from "@/components/about/AboutCTA";
import AboutTeamSection from "@/components/about/AboutTeamSection";
import AboutTimelineSection from "@/components/about/AboutTimelineSection";
import AboutValuesSection from "@/components/about/AboutValuesSection";
import AboutServicesSection from "@/components/about/AboutServiceSection";
import AboutStorySection from "@/components/about/AboutStorySection";
import dynamic from "next/dynamic";

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT US PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-white overflow-x-hidden">
      <NavbarMenu background={scrolled ? "bg-[#47238f]" : "bg-[#47238f]"} />
      <AboutHero />
      <Counter />
      <AboutStorySection />
      <AboutServicesSection />
      <AboutValuesSection />
      <AboutTimelineSection />
      <Suspense fallback={null}>
        <AboutTeamSection />
      </Suspense>
      <AboutCTA />
    </main>
  );
}
