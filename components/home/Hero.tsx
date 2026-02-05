import Image from "next/image";
import { useState } from "react";
import { WelcomeImg } from "../../images/bg-img";

const Hero = () => {
  const [email, setEmail] = useState("");

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-12">
        {/* Text */}
        <div className="max-w-xl space-y-6">
          <h1 className="text-white text-5xl md:text-7xl font-bold">
            Snappy-Fix Technologies
          </h1>

          <p className="text-white/90 text-lg leading-relaxed">
            We design and build high-performance websites, web applications, and
            digital products that help businesses grow online.
          </p>

          <form className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>

            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="p-4 rounded-full bg-[#9572e8] text-white placeholder-white/70 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className="bg-[#fb397d] px-10 py-4 rounded-full text-white hover:opacity-90 whitespace-nowrap
"
            >
              Get Updates
            </button>
          </form>
        </div>

        {/* Image */}
        <figure className="hidden md:block max-w-lg">
          <Image
            src={WelcomeImg}
            alt="Web development illustration showing digital innovation"
            width={640}
            height={480}
            className="animate-zoom"
          />
        </figure>
      </div>
    </section>
  );
};

export default Hero;
