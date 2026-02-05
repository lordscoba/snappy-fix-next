import { memo, useMemo } from "react";
import { FaBriefcase } from "react-icons/fa";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsMouse } from "react-icons/bs";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { data } from "./Data";
import { Link, useLocation } from "react-router-dom";

const Hero = () => {
  const location = useLocation().pathname;
  const locationId = Number(location.split("/")[2]);

  const single = useMemo(() => {
    return data[locationId - 1];
  }, [locationId]);

  if (!single) return <p className="text-center py-20">User not found.</p>;

  return (
    <header className="bg-[#fafafa] min-h-screen">
      {/* <Helmet>
        <title>{single.name} – Full Stack Developer Portfolio</title>
        <meta
          name="description"
          content={`Portfolio of ${single.name}. Skills: ${single.skills.map((s) => s.skill_main).join(", ")}.`}
        />
        <meta property="og:title" content={`${single.name} Portfolio`} />
        <meta property="og:description" content={single.text} />
        <meta property="og:image" content={single.image} />
      </Helmet> */}
      {/* Back Navigation */}
      <nav className="p-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl hover:opacity-70 transition"
          aria-label="Go back to homepage"
        >
          <MdOutlineKeyboardDoubleArrowLeft size={36} />
          <span>Back</span>
        </Link>
      </nav>

      <main className="flex flex-wrap-reverse justify-center gap-10 py-16 px-4">
        {/* Social Icons */}
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

        {/* Text Section */}
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

          {/* Scroll */}
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
        <figure className="max-w-sm">
          <img
            width="400"
            height="400"
            decoding="async"
            src={single.image}
            alt={single.name}
            className="rounded-2xl shadow-lg animate-zoom"
            loading="eager"
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
