"use client";

import { useState, useEffect } from "react";
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
import { SnowG, SnowC1, SnowC2 } from "../../images";
import Snow from "../../screens/Snow";

const backgrounds = [SnowG, SnowC1, SnowC2];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [bgSrc, setBgSrc] = useState<string | null>(null);

  useEffect(() => {
    const randomBg =
      backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBgSrc(randomBg.src);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative overflow-x-hidden scroll-smooth">
      <Snow aria-hidden="true" />

      <header
        className="bg-no-repeat bg-cover bg-center"
        style={bgSrc ? { backgroundImage: `url(${bgSrc})` } : undefined}
      >
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
      <Blog />
      <ContactUs />
    </main>
  );
}
