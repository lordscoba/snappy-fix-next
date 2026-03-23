"use client";

import Link from "next/link";
import Image from "next/image";
import { tools } from "@/data/toolsData";
import { toolCategories } from "@/data/toolsCategoryData";
import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { splitTitle } from "@/lib/utils/title";
import { usePathname } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
type CategoryWithTools = (typeof toolCategories)[number] & {
  tools: typeof tools;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
// Deterministic daily shuffle — same order within each day, changes at midnight
function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  let s = seed;

  while (currentIndex !== 0) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const randomIndex = Math.abs(s) % currentIndex;
    currentIndex--;
    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }

  return shuffled;
}

// ─── Nav links used in Platform column ───────────────────────────────────────
const PLATFORM_LINKS = [
  { label: "Home", href: "/#hero" },
  { label: "Why us", href: "/#why" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Testimonials", href: "/#testimonial" },
  { label: "Team", href: "/#team" },
  { label: "Tools", href: "/tools" },
  { label: "Blog", href: "/blog" },
  { label: "About us", href: "/about" },
  { label: "Contact us", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const SOCIAL = [
  {
    icon: <FaFacebookF />,
    label: "Facebook",
    href: "https://web.facebook.com/p/Snappy-fix-Technologies-100064249260204/",
  },
  { icon: <FaTwitter />, label: "Twitter", href: "#" },
  { icon: <FaInstagram />, label: "Instagram", href: "#" },
];

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const [year, setYear] = useState<number | null>(null);
  const [categoryTools, setCategoryTools] = useState<CategoryWithTools[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    setYear(new Date().getFullYear());

    const seed = new Date().getDate(); // reshuffles daily

    const grouped: CategoryWithTools[] = toolCategories.map((cat) => ({
      ...cat,
      tools: shuffleWithSeed(
        tools.filter((t) => t.category === cat.name),
        seed,
      ).slice(0, 3),
    }));

    setCategoryTools(grouped);
  }, []);

  // Hide footer entirely on admin pages
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#47238f] text-white">
      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* ── Brand column ── */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label="Snappy-Fix Technologies home">
            <Image
              src="/images/logo/snappy-fix-logo.webp"
              alt="Snappy-Fix Technologies"
              width={120}
              height={40}
              className="h-10 w-auto object-contain mb-4"
              loading="lazy"
            />
          </Link>
          <h2 className="text-lg font-bold text-white mb-3">
            Snappy-Fix Technologies
          </h2>
          <p className="text-sm text-white/55 leading-relaxed max-w-xs">
            Free online image tools for creators, developers, and businesses.
            Convert, optimise, and analyse images instantly — plus custom
            websites built to perform.
          </p>

          {/* Social buttons */}
          <div className="flex gap-3 mt-6">
            {SOCIAL.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#fb397d] text-white transition-all duration-200 hover:scale-110"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Tool categories — 2 columns spanning 2 grid cols ── */}
        <div className="sm:col-span-2 grid grid-cols-2 gap-8 lg:gap-10">
          {categoryTools.slice(0, 4).map((category) => (
            <div key={category.slug}>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-4">
                {category.name}
              </h3>
              <ul className="space-y-2.5">
                {category.tools.map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={tool.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                    >
                      {splitTitle(tool.name, 1)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={category.href}
                    className="text-sm font-semibold text-[#c49ef8] hover:text-[#fb397d] transition-colors duration-150"
                  >
                    View all →
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* ── Platform + Legal ── */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-4">
            Platform
          </h3>
          <ul className="space-y-2.5">
            {PLATFORM_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/40 mt-9 mb-4">
            Legal
          </h3>
          <ul className="space-y-2.5">
            {LEGAL_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            © {year ?? new Date().getFullYear()} Snappy-Fix Technologies. All
            rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Built in 🇳🇬 Nigeria · Serving users worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
