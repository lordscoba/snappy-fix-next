"use client";

import { useState, useEffect, useRef } from "react";
import { SnappyFixLogo } from "../../images/logo";
import Image from "next/image";

type NavProps = {
  background: string;
};

const links = [
  "hero",
  "why",
  "features",
  "pricing",
  "testimonial",
  "team",
  "contact",
];

const Nav = ({ background }: NavProps) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    if (open) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition ${background}`}>
      <div className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <a href="#hero" aria-label="Snappy-Fix homepage">
          <Image
            src={SnappyFixLogo}
            alt="Snappy-Fix Technologies logo"
            className="w-28 h-auto"
          />
        </a>

        <div className="hidden md:flex gap-6 text-white">
          {links.map((id) => (
            <a key={id} href={`#${id}`} className="hover:underline">
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>

        <button className="hidden md:block border-2 border-[#9572e8] px-8 py-2 rounded-full text-white hover:bg-[#fb397d] transition">
          Login
        </button>

        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden text-white text-3xl"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden">
          <div
            ref={menuRef}
            className="absolute top-0 right-0 w-72 h-full bg-[#9572e8] text-white flex flex-col p-6 gap-6 shadow-xl"
          >
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="self-end text-2xl"
            >
              ✕
            </button>

            {links.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="text-lg hover:underline"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}

            <button className="mt-6 border-2 border-white px-6 py-3 rounded-full hover:bg-[#fb397d] transition">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
