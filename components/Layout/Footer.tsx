"use client";

import Link from "next/link";
import Image from "next/image";
import { tools } from "@/data/toolsData";
import { toolCategories } from "@/data/toolsCategoryData";
import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { splitTitle } from "@/lib/utils/title";

const links = [
  "hero",
  "why",
  "features",
  "pricing",
  "testimonial",
  "team",
  "contact",
  "tools",
  "blog",
];

const shuffleWithSeed = (array: any[], seed: number) => {
  const shuffled = [...array];

  let currentIndex = shuffled.length;
  let randomIndex;

  const random = () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  while (currentIndex !== 0) {
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex--;

    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }

  return shuffled;
};

const Footer = () => {
  const [year, setYear] = useState<number | string>("");
  const [categoryTools, setCategoryTools] = useState<any[]>([]);

  useEffect(() => {
    setYear(new Date().getFullYear());

    const todaySeed = new Date().getDate(); // reshuffle daily

    const grouped = toolCategories.map((cat) => {
      const filtered = tools.filter((t) => t.category === cat.name);

      const shuffled = shuffleWithSeed(filtered, todaySeed);

      return {
        ...cat,
        tools: shuffled.slice(0, 3),
      };
    });

    setCategoryTools(grouped);
  }, []);

  const companyLinks = links.filter(
    (item) => !["tools", "blog"].includes(item),
  );

  return (
    <footer className="relative [clip-path:inset(0)] text-white">
      {/* 1. Optimized Fixed Background Layer */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/bg-img/footer.webp"
          alt="Snow Background"
          fill
          className="object-cover"
          quality={75}
          priority={false}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 lg:grid-cols-4 gap-14">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-[#9b69e4]">Snappy-fix Tech</h2>

          <p className="mt-4 text-sm text-black/50 leading-relaxed">
            Powerful online image tools for creators, developers and businesses.
            Convert, optimize and analyze images instantly.
          </p>

          <div className="flex gap-4 mt-6">
            <SocialButton icon={<FaFacebookF />} />
            <SocialButton icon={<FaTwitter />} />
            <SocialButton icon={<FaInstagram />} />
          </div>
        </div>

        {/* Tool Categories */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-10">
          {categoryTools.slice(0, 4).map((category) => (
            <div key={category.slug}>
              <h3 className="text-lg font-semibold mb-5 text-black/60">
                {category.name}
              </h3>

              <ul className="space-y-3 text-sm text-black/50">
                {category.tools.map((tool: any) => (
                  <li key={tool.slug}>
                    <Link
                      href={tool.href}
                      className="hover:text-white transition"
                    >
                      {splitTitle(tool.name, 1)}
                    </Link>
                  </li>
                ))}

                <li>
                  <Link
                    href={category.href}
                    className="text-[#9b69e4] hover:text-[#fb397d] font-medium"
                  >
                    View all →
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* Platform + Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-5 text-black/60">Platform</h3>

          <ul className="space-y-3 text-sm text-black/50">
            {companyLinks.map((item) => (
              <li key={item}>
                <a href={`#${item}`} className="hover:text-white transition">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              </li>
            ))}

            <li>
              <Link href="/blog" className="hover:text-white transition">
                Blog
              </Link>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-10 mb-5 text-black/60">
            Legal
          </h3>

          <ul className="space-y-3 text-sm text-black/50">
            <li>
              <Link href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link href="/terms" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10 text-center py-6 text-sm text-white/50">
        © {year || "2026"} Snappy-fix Technologies. All rights reserved.
      </div>
    </footer>
  );
};

const SocialButton = ({ icon }: { icon: React.ReactNode }) => (
  <button
    className="w-10 h-10 flex items-center justify-center rounded-full
               bg-[#9b69e4] text-white
               transition-all duration-300
               hover:bg-[#fb397d] hover:scale-110 hover:shadow-lg"
    aria-label="social link"
  >
    {icon}
  </button>
);

export default Footer;
