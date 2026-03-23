"use client";

import { useState, useEffect } from "react";
import { NavbarMenu } from "@/components/Layout";
import ContactHero from "@/components/contact/ContactHero";
import ContactMainContent from "@/components/contact/ContactMainContent";
import ContactFaq from "@/components/contact/ContactFaq";
import ContactBottomCTA from "@/components/contact/ContactBottomCTA";

export default function ContactPage() {
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
      <ContactHero />
      <ContactMainContent />
      <ContactFaq />
      <ContactBottomCTA />
    </main>
  );
}
