// import { Footer, Cart1 } from "/images/bg-img";
import Image from "next/image";

const What = () => {
  return (
    <section
      id="what"
      className="bg-no-repeat bg-cover bg-center p-6 md:p-16"
      style={{
        backgroundImage: `url("/images/bg-img/footer.avif")`,
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <figure className="w-full md:w-1/2">
          <Image
            src="/images/bg-img/cart-1.avif"
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
            Snappy-Fix Technologies is a modern web development company and
            creator of powerful online tools. We build business websites,
            scalable web applications, SaaS platforms, and free image tools such
            as converters, optimizers, analyzers, and social media image
            resizers. By combining clean design, strong engineering, and
            scalable architecture, we deliver digital products that help
            businesses and creators perform better online.
          </p>
        </article>
      </div>
    </section>
  );
};

export default What;
