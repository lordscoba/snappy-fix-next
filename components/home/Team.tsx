import Link from "next/link";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
// import { data } from "../portifolio/Data";
import { data } from "@/data/PortifolioData";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useInView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const Team = () => {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <h2
            id="team-heading"
            className="text-4xl md:text-5xl font-bold text-[#5b32b4]"
          >
            Meet Our Expert Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our talented developers, designers, and engineers build high-quality
            digital solutions for businesses worldwide.
          </p>
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {data.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

type CardProps = {
  member: (typeof data)[number];
};

const TeamCard = ({ member }: CardProps) => {
  const { ref, visible } = useInView();

  return (
    <article
      ref={ref}
      className={`
        group bg-white rounded-3xl overflow-hidden border shadow-sm
        transition-all duration-500
        hover:shadow-xl hover:-translate-y-2
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      {/* Image */}
      <figure className="relative overflow-hidden">
        <Image
          src={member.image}
          alt={`${member.name}, ${member.skills
            .map((s) => s.skill_main)
            .slice(0, 2)
            .join(" & ")} specialist`}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </figure>

      {/* Content */}
      <div className="p-6 space-y-3">
        {member.link_tree ? (
          <a href={member.link_tree} target="_blank" rel="noopener noreferrer">
            <h3 className="text-xl font-semibold text-[#5b32b4] hover:underline">
              {member.name}
            </h3>
          </a>
        ) : (
          <h3 className="text-xl font-semibold text-[#5b32b4]">
            {member.name}
          </h3>
        )}
        {/* <a href={member.link_tree} target="_blank" rel="noopener noreferrer">
          <h3 className="text-xl font-semibold text-[#5b32b4] hover:underline">
            {member.name}
          </h3>
        </a> */}

        <p className="text-sm text-[#b5aec4]">
          {member.skills.map((s) => s.skill_main).join(", ")}
        </p>

        <Link
          href={`/portifolio/${member.slug}`}
          className="inline-flex items-center gap-2 text-[#fb397d] font-medium
             transition-all duration-300 group-hover:gap-3"
        >
          View full portfolio
          <MdOutlineKeyboardDoubleArrowRight size={22} />
        </Link>
      </div>
    </article>
  );
};

export default Team;
