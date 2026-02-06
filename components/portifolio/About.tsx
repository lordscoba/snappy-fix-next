"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { FiAward } from "react-icons/fi";
import { AiOutlineFilePdf } from "react-icons/ai";
import { BiBriefcaseAlt2, BiSupport } from "react-icons/bi";
import { data } from "./Data";

const About = () => {
  const params = useParams();
  const locationId = Number(params?.id);

  const single = useMemo(() => {
    return data[locationId - 1];
  }, [locationId]);

  if (!single) {
    return (
      <section className="py-20 text-center">
        <p>User not found.</p>
      </section>
    );
  }

  return (
    <section id="about" className="bg-[#fafafa] py-12">
      <header className="text-center space-y-2">
        <h2 className="text-4xl font-bold">About Me</h2>
        <p className="text-gray-600">My introduction</p>
      </header>

      <div className="mt-10 flex flex-wrap justify-center gap-12 px-4">
        {/* Image */}
        <figure className="w-72 h-72 relative">
          <Image
            src={single.image}
            alt={`${single.name} portrait`}
            fill
            className="object-cover rounded-3xl border-4 border-black shadow-lg animate-zoom"
            sizes="288px"
          />
        </figure>

        {/* Content */}
        <article className="max-w-xl space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={<FiAward size={24} />}
              title="Experience"
              value={`${single.years_experience}+ Years`}
            />
            <StatCard
              icon={<BiBriefcaseAlt2 size={24} />}
              title="Projects"
              value={`${single.projects}+ Completed`}
            />
            <StatCard
              icon={<BiSupport size={24} />}
              title="Support"
              value="24/7 Online"
            />
          </div>

          <p className="text-gray-600 leading-relaxed">{single.about}</p>

          <Link
            href={single.image}
            target="_blank"
            download
            aria-label="Download CV"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            Download CV <AiOutlineFilePdf size={20} />
          </Link>
        </article>
      </div>
    </section>
  );
};

const StatCard = ({ icon, title, value }: any) => (
  <div className="bg-white border border-gray-300 p-5 rounded-2xl shadow hover:shadow-xl transition text-center space-y-1">
    <div className="flex justify-center">{icon}</div>
    <h3 className="font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{value}</p>
  </div>
);

export default memo(About);
