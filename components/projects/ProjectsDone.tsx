"use client";

import { Project, projects } from "@/data/ProjectData";
import Image from "next/image";
import Link from "next/link";
export default function ProjectsDone() {
  return (
    <section id="projects" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <header className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
            Projects We’ve Delivered
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A quick look at high‑impact products we’ve built for clients.
          </p>
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: Project) => (
            <article
              key={project.slug}
              className="group rounded-3xl border bg-white overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <figure className="relative h-52 w-full overflow-hidden">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </figure>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs text-[#b5aec4]">
                  <span className="bg-[#f4edff] text-[#5b32b4] px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-[#2b1d3a]">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {project.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2">
                  {/* <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm font-semibold text-[#fb397d] hover:underline"
                  >
                    View case study
                  </Link> */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#5b32b4] hover:underline"
                  >
                    Visit site
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/projects"
            className="rounded-full bg-[#5b32b4] px-8 py-3 text-white font-medium hover:bg-[#47238f]"
          >
            See all projects
          </Link>
        </div>
      </div>
    </section>
  );
}
