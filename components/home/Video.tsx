import { Footer, Snappy3 } from "../../images/bg-img";
import { BsPlayCircleFill } from "react-icons/bs";
import Image from "next/image";

const Video = () => {
  return (
    <section
      id="video"
      aria-labelledby="video-heading"
      className="bg-no-repeat bg-cover bg-center p-6 md:p-16"
      style={{ backgroundImage: `url(${Footer.src})` }}
    >
      <div className="max-w-5xl mx-auto relative">
        <header className="sr-only">
          <h2 id="video-heading">Introduction Video</h2>
        </header>

        <figure className="relative">
          <Image
            src={Snappy3}
            alt="Snappy-Fix Technologies web development showcase"
            className="rounded-3xl border-white border-[1rem] w-full"
          />

          <a
            href="https://www.youtube.com/watch?v=bmixiVwtDso"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch Snappy-Fix introduction video on YouTube"
            className="absolute inset-0 flex items-center justify-center group"
          >
            <span className="bg-white rounded-full p-3 transition group-hover:scale-110">
              <BsPlayCircleFill size={70} className="text-[#fb397d]" />
            </span>
          </a>
        </figure>
      </div>
    </section>
  );
};

export default Video;
