import Image from "next/image";

const What = () => {
  return (
    <section
      id="what"
      className="relative p-6 md:p-16 min-h-[500px] [clip-path:inset(0)]"
    >
      {/* 1. Optimized Fixed Background Layer */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/bg-img/footer.webp"
          alt="" // Decorative background
          fill
          className="object-cover"
          quality={75}
          priority={false}
        />
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Image Container */}
        <figure className="w-full md:w-1/2">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/images/bg-img/cart-1.webp"
              alt="Snappy-Fix web development project preview"
              fill
              className="rounded-3xl object-cover hover:scale-105 transition duration-500 shadow-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </figure>

        {/* Text Content */}
        <article className="w-full md:w-1/2 space-y-6 md:px-10">
          <h2 className="font-bold text-3xl md:text-5xl text-[#5b32b4]">
            What Snappy-Fix Technologies Is Known For in Web Development
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
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
