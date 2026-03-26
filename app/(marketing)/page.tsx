"use client";

import { Suspense, useEffect, useState } from "react";
import { NavbarMenu } from "@/components/Layout";
import Blog, { BlogCardSkeleton } from "@/components/home/Blog";
import WhySection from "@/components/home/Why";
import ToolsSection from "@/components/home/ToolsSection";
import FeaturesSection from "@/components/home/Features";
import PricingSection from "@/components/home/Pricing";
import CTABanners from "@/components/home/CTABanners";
import ProjectsSection from "@/components/projects/ProjectsDone";
import { Hero } from "@/components/home/Hero";
import dynamic from "next/dynamic";
import Testimonial from "@/components/home/Testimonial";
import { generateIndexNowUrls } from "@/lib/utils/indexnow";
const Counter = dynamic(() => import("@/components/home/Counter"), {
  ssr: false,
});
const Snow = dynamic(() => import("@/packages/Snow"), { ssr: false });

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  console.log("IndexNow URLs:", generateIndexNowUrls());
  return (
    <main className="relative overflow-x-hidden scroll-smooth bg-white">
      <Snow aria-hidden="true" />
      <NavbarMenu background={scrolled ? "bg-[#47238f]" : "bg-transparent"} />
      <Hero />
      <Suspense fallback={null}>
        <Counter />
      </Suspense>
      <WhySection />
      <ToolsSection />
      <FeaturesSection />
      <ProjectsSection />
      <PricingSection />
      <Suspense
        fallback={
          <div className="py-20 bg-gradient-to-br from-[#faf7ff] to-white">
            <div className="max-w-4xl mx-auto px-6">
              <div className="h-48 bg-[#f4edff] rounded-3xl animate-pulse" />
            </div>
          </div>
        }
      >
        <Testimonial />
      </Suspense>
      <Suspense fallback={<BlogCardSkeleton />}>
        <Blog />
      </Suspense>
      <CTABanners />
    </main>
  );
}
