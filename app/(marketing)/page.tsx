"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Hero,
  Why,
  What,
  Features,
  Video,
  Counter,
  Pricing,
  Testimonial,
  Join,
  Team,
  ContactUs,
} from "../../components/home";
import Blog from "../../components/home/Blog";
import { NavbarMenu } from "../../components/Layout";
import Snow from "../../packages/Snow";
import ProjectsDone from "@/components/projects/ProjectsDone";

// We pick the background once at the module level or use a static one for the first paint
const backgrounds = [
  "/images/snowC1.webp",
  "/images/snowC2.webp",
  "/images/snowg.webp",
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  // 1. Start with a stable image. Next.js will preload this.
  const [bgSrc, setBgSrc] = useState(backgrounds[2]);

  useEffect(() => {
    // 2. Randomize ONLY after mounting on the client.
    // This happens so fast the user won't see a flicker if the images
    // are cached or similar in tone.
    const randomImg =
      backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBgSrc(randomImg);

    const handleScroll = () => {
      requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative overflow-x-hidden scroll-smooth">
      <Snow aria-hidden="true" />
      {/* LCP OPTIMIZATION: 
            Since 'priority' is true, the browser preloads 'backgrounds[0]' 
            immediately based on the initial HTML.
        */}
      <header className="relative min-h-screen">
        <Image
          src={bgSrc}
          alt=""
          fill
          priority
          quality={90}
          className="object-cover object-center -z-10"
          sizes="100vw"
        />

        <NavbarMenu background={scrolled ? "bg-[#884bdf]" : "bg-transparent"} />
        <Hero />
      </header>
      <Why />
      <What />
      <Features />
      <Video />
      <Counter />
      <Pricing />
      <Testimonial />
      <Join />
      <Team />
      <ProjectsDone />
      <Blog /> <ContactUs />
    </main>
  );
}
