import Image from "next/image";
import Link from "next/link";
// import  useInView  from "./Helpers";
// import SectionHeader from "../SectionHeader";
import { Project, projects } from "@/data/ProjectData";
import { ExternalLink } from "lucide-react";
import { SectionHeader, UseInView } from "../home/Helpers";

export default function ProjectsSection() {
  const { ref, visible } = UseInView();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          label="Portfolio"
          title="Projects We've Delivered"
          subtitle="A look at high-impact websites and platforms built for our clients."
          action={
            <Link
              href="/projects"
              className="text-sm font-bold text-[#fb397d] hover:underline"
            >
              See all projects →
            </Link>
          }
        />
        <div
          className={`mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {projects.slice(0, 3).map((project: Project) => (
            <article
              key={project.slug}
              className="group rounded-3xl border border-[#e9e1ff] bg-white overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5b32b4]/10 transition-all duration-300"
            >
              <figure className="relative h-48 overflow-hidden bg-[#f4edff]">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </figure>
              <div className="p-6 space-y-3">
                <span className="text-xs font-bold text-[#5b32b4] bg-[#f4edff] px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <h3 className="font-bold text-[#2b1d3a] group-hover:text-[#5b32b4] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {project.excerpt}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#fb397d] hover:gap-2 transition-all"
                >
                  Visit site <ExternalLink size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
