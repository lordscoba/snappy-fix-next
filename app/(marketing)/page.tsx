"use client";

import { useState, useEffect, useMemo } from "react";
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
import { NavbarMenu } from "../../components/Layout";
import { SnowPics, SnowG, SnowC1, SnowC2 } from "../../images";
import Snow from "../../screens/Snow";

const backgrounds = [SnowPics, SnowG, SnowC1, SnowC2];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  const randomBg = useMemo(() => {
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
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
        style={{ backgroundImage: `url(${randomBg.src})` }}
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
      <ContactUs />
    </main>
  );
}
