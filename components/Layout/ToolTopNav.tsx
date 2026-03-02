"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SnappyFixLogo } from "../../images/logo";
import { Menu, X, ArrowRight } from "lucide-react"; // Professional iconography

export default function ToolTopNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glassmorphism refinement
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Tools", href: "/tools" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b 
      ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl border-slate-200 py-2 shadow-sm"
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <Image
            src={SnappyFixLogo}
            alt="Snappy-Fix Logo"
            className="w-32 md:w-36 h-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200
                ${
                  isActive
                    ? "bg-white text-[#5b32b4] shadow-sm ring-1 ring-slate-200"
                    : "text-slate-600 hover:text-[#5b32b4]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-bold text-slate-600 hover:text-[#5b32b4] px-4 transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-5 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-bold ${pathname === link.href ? "text-[#5b32b4]" : "text-slate-600"}`}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-slate-100" />
          <Link
            href="/get-started"
            className="w-full bg-[#5b32b4] text-white py-4 rounded-2xl text-center font-bold"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
