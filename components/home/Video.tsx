// import { Footer, Snappy3 } from "/images/bg-img";
import { BsPlayCircleFill } from "react-icons/bs";
import Image from "next/image";

const Video = () => {
  return (
    <section
      id="video"
      aria-labelledby="video-heading"
      className="relative px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-16 min-h-[300px] [clip-path:inset(0)]"
    >
      {/* 1. Optimized Fixed Background Layer */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/bg-img/footer.webp"
          alt="" // Background is decorative
          fill
          className="object-cover"
          quality={75}
          priority={false}
        />
      </div>

      {/* 2. Content Layer */}
      <div className="max-w-5xl mx-auto relative z-10">
        <header className="sr-only">
          <h2 id="video-heading">Introduction Video</h2>
        </header>

        <figure className="relative">
          <div className="relative aspect-video w-full">
            <Image
              src="/images/bg-img/snappy3.webp"
              alt="Snappy-Fix Technologies web development showcase"
              fill
              className="rounded-xl sm:rounded-2xl md:rounded-3xl border-4 sm:border-6 md:border-[1rem] border-white object-cover"
              sizes="(max-width: 640px) 100vw,
                 (max-width: 1024px) 90vw,
                 80vw"
            />
          </div>

          <a
            href="https://www.youtube.com/watch?v=bmixiVwtDso"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch Snappy-Fix introduction video on YouTube"
            className="absolute inset-0 flex items-center justify-center group z-20"
          >
            <span className="bg-white rounded-full p-2 sm:p-3 transition group-hover:scale-110 shadow-lg">
              <BsPlayCircleFill
                size={50}
                className="text-[#fb397d] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px]"
              />
            </span>
          </a>
        </figure>
      </div>
    </section>
  );
};

export default Video;
