"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { FaBriefcase } from "react-icons/fa";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsMouse } from "react-icons/bs";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { data } from "./Data";

const Hero = () => {
  const params = useParams();
  const locationId = Number(params?.id);

  const single = useMemo(() => {
    return data[locationId - 1];
  }, [locationId]);

  if (!single) return <p className="text-center py-20">User not found.</p>;

  return (
    <header className="bg-[#fafafa] min-h-screen">
      <nav className="p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl hover:opacity-70 transition"
          aria-label="Go back to homepage"
        >
          <MdOutlineKeyboardDoubleArrowLeft size={36} />
          <span>Back</span>
        </Link>
      </nav>

      <main className="flex flex-wrap-reverse justify-center gap-10 py-16 px-4">
        <aside className="flex md:flex-col gap-6 items-center">
          <SocialIcon href={single.github_link} label="GitHub">
            <FiGithub />
          </SocialIcon>

          <SocialIcon href={single.linkdln_link} label="LinkedIn">
            <FiLinkedin />
          </SocialIcon>

          <SocialIcon href={single.twitter_link} label="Twitter">
            <FiTwitter />
          </SocialIcon>
        </aside>

        <section className="max-w-xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">{single.name} 👋</h1>

          <p className="text-xl text-gray-700">
            {single.skills.map((s, i) => (
              <span key={i}>
                {s.skill_main}
                {i !== single.skills.length - 1 && ", "}
              </span>
            ))}
          </p>

          <p className="text-gray-600 leading-relaxed">{single.text}</p>

          <a
            href="#skills"
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            View My Technical Skills <FaBriefcase />
          </a>

          <a
            href="#about"
            className="flex items-center gap-2 text-gray-700 hover:text-black"
          >
            <BsMouse className="animate-bounce" />
            <span>Scroll Down</span>
            <AiOutlineArrowDown className="animate-bounce" />
          </a>
        </section>

        <figure className="max-w-sm relative">
          <Image
            src={single.image}
            alt={single.name}
            width={400}
            height={400}
            className="rounded-2xl shadow-lg animate-zoom"
            priority
          />
        </figure>
      </main>
    </header>
  );
};

const SocialIcon = ({ href, label, children }: any) => (
  <a
    href={`https://${href}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-2xl hover:scale-110 transition"
  >
    {children}
  </a>
);

export default memo(Hero);
