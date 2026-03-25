"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight } from "lucide-react";
import { data } from "@/data/PortifolioData";
import { AboutSectionLabel, UseInView } from "../home/Helpers";

export default function AboutTeamSection() {
  const { ref, visible } = UseInView();

  return (
    <section
      id="teams"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <AboutSectionLabel text="Our People" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#2b1d3a]">
            Meet the Team
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Talented developers, designers, and engineers building digital
            solutions that work.
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-[#5b32b4] to-[#fb397d] mx-auto rounded-full" />
        </div>

        {/* Grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {data.map((member) => (
            <article
              key={member.id}
              className="group bg-white rounded-3xl border border-[#e9e1ff] overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5b32b4]/10 transition-all duration-300"
            >
              {/* Image — clicking goes to portfolio page */}
              <Link
                href={`/portifolio/${member.slug}`}
                aria-label={`View ${member.name}'s portfolio`}
              >
                <figure className="relative h-52 sm:h-60 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </figure>
              </Link>

              {/* Info */}
              <div className="p-4 space-y-1">
                {/* Name → portfolio page */}
                <Link
                  href={`/portifolio/${member.slug}`}
                  className="block font-bold text-[#2b1d3a] text-sm leading-tight hover:text-[#5b32b4] transition-colors"
                >
                  {member.name}
                </Link>

                {/* Role tags */}
                <p className="text-[10px] text-[#6b5d80] leading-relaxed line-clamp-2">
                  {member.skills
                    .map((s) => s.skill_main)
                    .slice(0, 2)
                    .join(", ")}
                </p>

                {/* Links row */}
                <div className="flex items-center justify-between pt-1.5">
                  <Link
                    href={`/portifolio/${member.slug}`}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-[#5b32b4] hover:text-[#c3003a] transition-colors"
                  >
                    View profile <ArrowRight size={9} />
                  </Link>

                  {member.link_tree && (
                    <a
                      href={member.link_tree}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} external portfolio`}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-[#c3003a] hover:underline"
                    >
                      Portfolio <ExternalLink size={9} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
