"use client";

import Link from "next/link";
import { Footer as FooterBg } from "../../images/bg-img";
import { tools } from "@/data/toolsData"; // adjust path
import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

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

const Footer = () => {
  const [year, setYear] = useState<number | string>("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const companyLinks = links.filter(
    (item) => !["tools", "blog"].includes(item),
  );

  return (
    <footer
      className="relative bg-cover bg-center bg-fixed text-white"
      style={{ backgroundImage: `url(${FooterBg.src})` }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-4 gap-14">
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold text-[#9b69e4]">Snappy-fix Tech</h2>

          {/* 60% light text */}
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

        {/* Tools Section */}
        <div>
          <h3 className="text-lg font-semibold mb-5 text-black/60">
            Popular Tools
          </h3>

          <ul className="space-y-3 text-sm text-black/50 max-h-[320px] overflow-y-visible pr-2">
            {tools.slice(0, 10).map((tool) => (
              <li key={tool.slug}>
                <Link href={tool.href} className="hover:text-white transition">
                  {tool.name}
                </Link>
              </li>
            ))}

            <li>
              <Link
                href="/tools"
                className="text-[#9b69e4] hover:text-[#fb397d] font-medium"
              >
                View All Tools →
              </Link>
            </li>
          </ul>
        </div>

        {/* Platform */}
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
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-5 text-black/60">Legal</h3>

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

      {/* Bottom Bar */}
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
  >
    {icon}
  </button>
);

export default Footer;
// "use client";

// import { Footer as FooterBg } from "../../images/bg-img";
// import { useEffect, useState } from "react";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaGooglePlusG,
// } from "react-icons/fa";

// const Footer = () => {
//   // Use state for the year to prevent hydration mismatch
//   const [year, setYear] = useState<number | string>("");

//   useEffect(() => {
//     setYear(new Date().getFullYear());
//   }, []);

//   return (
//     <footer
//       className="bg-cover bg-center bg-fixed py-20"
//       style={{ backgroundImage: `url(${FooterBg.src})` }}
//     >
//       <div className="max-w-6xl mx-auto px-6 flex flex-col items-center space-y-10">
//         <h2 className="brand-fall text-[#5b32b4] text-4xl md:text-6xl font-bold tracking-tight">
//           Snappy-fix Tech
//         </h2>

//         <div className="flex gap-4">
//           <SocialButton icon={<FaFacebookF />} />
//           <SocialButton icon={<FaTwitter />} />
//           <SocialButton icon={<FaInstagram />} />
//           <SocialButton icon={<FaGooglePlusG />} />
//         </div>

//         <nav className="flex flex-wrap justify-center gap-6 text-[#726a84] text-sm">
//           <FooterLink label="About" />
//           <FooterLink label="Terms & Conditions" />
//           <FooterLink label="Privacy Policy" />
//           <FooterLink label="Contact" />
//         </nav>

//         <p className="text-xs text-[#b5aec4]">
//           {/* Default to 2026 or leave empty until hydrated */}©{" "}
//           {year || "2026"} Snappy-fix Technologies. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };

// const SocialButton = ({ icon }: { icon: React.ReactNode }) => (
//   <button
//     className="w-10 h-10 flex items-center justify-center rounded-full
//                bg-[#9b69e4] text-white
//                transition-all duration-300
//                hover:bg-[#fb397d] hover:scale-110 hover:shadow-lg"
//   >
//     {icon}
//   </button>
// );

// const FooterLink = ({ label }: { label: string }) => (
//   <button
//     className="relative text-[#726a84] transition hover:text-[#5b32b4]
//                after:absolute after:left-0 after:-bottom-1
//                after:h-[2px] after:w-0 after:bg-[#fb397d]
//                after:transition-all after:duration-300
//                hover:after:w-full"
//   >
//     {label}
//   </button>
// );

// export default Footer;
