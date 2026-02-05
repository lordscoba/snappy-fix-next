import { Footer, Cart1 } from "../../images/bg-img";
import Image from "next/image";

const What = () => {
  return (
    <section
      id="what"
      className="bg-no-repeat bg-cover bg-center p-6 md:p-16"
      style={{ backgroundImage: `url(${Footer.src})` }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <figure className="w-full md:w-1/2">
          <Image
            src={Cart1}
            alt="Snappy-Fix web development project preview"
            width={600}
            height={450}
            className="rounded-3xl object-cover w-full hover:scale-105 transition"
          />
        </figure>

        {/* Text */}
        <article className="w-full md:w-1/2 space-y-6 md:px-10">
          <h2 className="font-bold text-3xl md:text-5xl text-[#5b32b4]">
            What Snappy-Fix Technologies Is Known For in Web Development
          </h2>

          <p className="text-gray-700 leading-relaxed">
            Snappy-Fix Technologies is a professional web development company
            specializing in building business websites, web applications,
            landing pages, and custom digital platforms. We combine clean
            design, strong functionality, and scalable architecture to deliver
            high-quality digital products that drive real business growth.
          </p>
        </article>
      </div>
    </section>
  );
};

export default What;
