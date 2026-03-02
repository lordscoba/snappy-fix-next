"use client";

import Link from "next/link";
import { tools } from "@/data/toolsData";
import { NavbarMenu } from "@/components/Layout";

export default function ToolsPageClient() {
  const categories = [...new Set(tools.map((tool) => tool.category))];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#faf7ff] to-white">
      {/* Sticky Navbar */}
      <div className="top-0 z-50 backdrop-blur-md bg-white/70 border-b border-[#f0e9ff]">
        <NavbarMenu background="bg-[#884bdf]" />
      </div>

      {/* Page Content */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-48 pb-20 space-y-20">
        {/* Header */}
        <header className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#5b32b4] to-[#fb397d] bg-clip-text text-transparent">
            Free Online Image Tools
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Convert, optimize, analyze, resize and enhance your images
            instantly. Fast, secure and built for performance.
          </p>

          <div className="h-1.5 w-24 bg-gradient-to-r from-[#5b32b4] to-[#fb397d] mx-auto rounded-full" />
        </header>

        {/* Category Sections */}
        {categories.map((category) => (
          <section key={category} className="space-y-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2b1d3a] border-l-4 border-[#fb397d] pl-4">
              {category}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools
                .filter((tool) => tool.category === category)
                .map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    className="group relative rounded-[2rem] border border-[#e9e1ff] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(91,50,180,0.15)]"
                  >
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#2b1d3a] group-hover:text-[#5b32b4] transition-colors">
                        {tool.name}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed">
                        {tool.description}
                      </p>

                      <span className="inline-flex items-center text-sm font-semibold text-[#fb397d] group-hover:gap-3 gap-1 transition-all">
                        Use Tool →
                      </span>
                    </div>

                    {/* Subtle Glow Hover */}
                    <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-br from-[#5b32b4]/5 to-[#fb397d]/5" />
                  </Link>
                ))}
            </div>
          </section>
        ))}

        {/* SEO Block */}
        <section className="max-w-4xl mx-auto text-center space-y-6 pt-10">
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#5b32b4] to-[#fb397d] mx-auto rounded-full" />

          <h2 className="text-3xl font-bold text-[#2b1d3a]">
            Why Use Snappy Fix Image Tools?
          </h2>

          <p className="text-gray-600 leading-relaxed text-lg">
            Snappy Fix provides professional-grade image processing tools
            designed for developers, marketers, designers and businesses.
            Improve performance, boost SEO and enhance visual quality
            effortlessly.
          </p>
        </section>
      </section>
    </main>
  );
}
// "use client";

// import Link from "next/link";
// import { tools } from "@/data/toolsData";
// import { NavbarMenu } from "@/components/Layout";
// import { useEffect, useState } from "react";
// import { SnowC1, SnowC2, SnowG } from "@/images";

// export default function ToolsPageClient() {
//   const categories = [...new Set(tools.map((tool) => tool.category))];

//   const [scrolled, setScrolled] = useState(false);
//   const [bgSrc, setBgSrc] = useState<string | null>(null);

//   const backgrounds = [SnowG, SnowC1, SnowC2];

//   useEffect(() => {
//     const handleScroll = () => {
//       requestAnimationFrame(() => {
//         setScrolled(window.scrollY > 40);
//       });
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const randomBg =
//       backgrounds[Math.floor(Math.random() * backgrounds.length)];
//     setBgSrc(randomBg.src);
//   }, []);

//   return (
//     <main className="bg-white">
//       <NavbarMenu background={scrolled ? "bg-[#884bdf]" : "bg-transparent"} />

//       <section className="w-full max-w-7xl mx-auto px-6 py-16 space-y-16">
//         <header className="text-center space-y-4">
//           <h1 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
//             Free Online Image Tools
//           </h1>
//           <p className="text-gray-600 max-w-3xl mx-auto">
//             Powerful, fast and secure image tools to convert, optimize, analyze,
//             resize and edit your images online.
//           </p>
//           <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
//         </header>

//         {categories.map((category) => (
//           <section key={category} className="space-y-8">
//             <h2 className="text-2xl font-bold text-[#5b32b4]">{category}</h2>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {tools
//                 .filter((tool) => tool.category === category)
//                 .map((tool) => (
//                   <Link
//                     key={tool.slug}
//                     href={tool.href}
//                     className="group rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl space-y-4"
//                   >
//                     <h3 className="text-xl font-semibold text-[#2b1d3a]">
//                       {tool.name}
//                     </h3>
//                     <p className="text-sm text-gray-600 leading-relaxed">
//                       {tool.description}
//                     </p>

//                     <span className="text-sm font-semibold text-[#fb397d]">
//                       Use Tool →
//                     </span>
//                   </Link>
//                 ))}
//             </div>
//           </section>
//         ))}

//         <section className="max-w-4xl mx-auto space-y-6">
//           <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
//           <h2 className="text-2xl font-bold text-[#5b32b4]">
//             Why Use Snappy Fix Image Tools?
//           </h2>
//           <p className="text-gray-600 leading-relaxed">
//             Snappy Fix provides professional-grade image processing tools
//             designed for developers, marketers, designers and businesses.
//           </p>
//         </section>
//       </section>
//     </main>
//   );
// }
