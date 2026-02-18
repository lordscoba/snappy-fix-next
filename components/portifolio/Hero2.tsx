"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

import { FaBriefcase } from "react-icons/fa";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsMouse } from "react-icons/bs";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

type HeroProps = {
  portfolio: any;
};

const Hero = ({ portfolio }: HeroProps) => {
  if (!portfolio)
    return <p className="text-center py-20">Portfolio not found.</p>;

  return (
    <header className="bg-[#fafafa] min-h-screen">
      <nav className="p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl hover:opacity-70 transition"
          aria-label="Go back to portfolio list"
        >
          <MdOutlineKeyboardDoubleArrowLeft size={36} />
          <span>Back</span>
        </Link>
      </nav>

      <main className="flex flex-wrap-reverse justify-center gap-10 py-16 px-4">
        {/* Social Links */}
        <aside className="flex md:flex-col gap-6 items-center">
          {portfolio.github_link && (
            <SocialIcon href={portfolio.github_link} label="GitHub">
              <FiGithub />
            </SocialIcon>
          )}

          {portfolio.linkdln_link && (
            <SocialIcon href={portfolio.linkdln_link} label="LinkedIn">
              <FiLinkedin />
            </SocialIcon>
          )}

          {portfolio.twitter_link && (
            <SocialIcon href={portfolio.twitter_link} label="Twitter">
              <FiTwitter />
            </SocialIcon>
          )}
        </aside>

        {/* Content */}
        <section className="max-w-xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            {portfolio.name} 👋
          </h1>

          <p className="text-xl text-gray-700">
            {portfolio.skills?.map((s: any, i: number) => (
              <span key={i}>
                {s.skill_main}
                {i !== portfolio.skills.length - 1 && ", "}
              </span>
            ))}
          </p>

          <p className="text-gray-600 leading-relaxed">{portfolio.text}</p>

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

        {/* Image */}
        <figure className="max-w-sm relative">
          <Image
            src={portfolio.image}
            alt={portfolio.name}
            width={400}
            height={400}
            className="rounded-2xl shadow-lg"
            priority
          />
        </figure>
      </main>
    </header>
  );
};

const SocialIcon = ({ href, label, children }: any) => (
  <a
    href={href.startsWith("http") ? href : `https://${href}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-2xl hover:scale-110 transition"
  >
    {children}
  </a>
);

export default memo(Hero);
