import { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { AiTwotoneStar } from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Client2, Customer1, Customer2, Customer3 } from "../../images/bg-img";
import Image from "next/image";
import type { StaticImageData } from "next/image";

const testimonials = [
  {
    name: "Aigars Silkalns",
    user_type: "user",
    image: Customer1,
    star: 5,
    text: "I have been using Snappy-fix for years. They deliver responsive websites with impressive functionality.",
  },
  {
    name: "Jeff Obuekwe",
    user_type: "user",
    image: Customer2,
    star: 5,
    text: "Snappy-fix has shown professionalism in delivering quality websites. They remain my number one.",
  },
  {
    name: "Simon",
    user_type: "user",
    image: Customer3,
    star: 5,
    text: "Quality job with full functionality. Thumbs up.",
  },
  {
    name: "Helen",
    user_type: "user",
    image: Client2,
    star: 5,
    text: "Delivered all my requested functionality in full working shape. Thanks again.",
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const prev = () => {
    setDirection("left");
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection("right");
    setIndex((i) => (i + 1) % testimonials.length);
  };

  // smooth autoplay
  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, []);

  const getIndex = (offset: number) =>
    (index + offset + testimonials.length) % testimonials.length;

  const active = testimonials[index];
  const prevUser = testimonials[getIndex(-1)];
  const nextUser = testimonials[getIndex(1)];

  return (
    <section id="testimonial" className="py-12">
      <div className="flex flex-col space-y-8 px-4">
        {/* Content */}
        <div
          key={index}
          className={`flex flex-col space-y-6 text-center max-w-3xl mx-auto
    transition-all duration-500 ease-out
    ${
      direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left"
    }
  `}
        >
          <FaQuoteLeft className="text-4xl text-[#89adeb] mx-auto" />

          <p className="text-[#726a84] text-lg md:text-2xl">
            “ {active.text} ”
          </p>

          <div className="flex justify-center">
            {Array.from({ length: active.star }).map((_, i) => (
              <AiTwotoneStar key={i} className="text-[#f1b922]" />
            ))}
          </div>

          <h3 className="text-2xl md:text-3xl text-[#5b32b4]">{active.name}</h3>
          <p className="text-[#b5aec4]">{active.user_type}</p>
        </div>

        {/* Avatar row */}
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <button onClick={prev}>
            <IoIosArrowBack className="text-2xl text-[#b5aec4]" />
          </button>

          <Avatar image={prevUser.image} small />
          <Avatar image={active.image} />
          <Avatar image={nextUser.image} small />

          <button onClick={next}>
            <IoIosArrowForward className="text-2xl text-[#b5aec4]" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-[#fb397d] scale-125" : "bg-[#a49fba]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Avatar = ({
  image,
  small = false,
}: {
  image: string | StaticImageData;
  small?: boolean;
}) => (
  <div
    className={`rounded-full overflow-hidden border-4 border-white shadow-lg transition-all duration-500 ${
      small
        ? "w-14 h-14 md:w-20 md:h-20 opacity-70 scale-95"
        : "w-20 h-20 md:w-28 md:h-28 scale-105"
    }`}
  >
    <Image
      src={image}
      alt="testimonial"
      width={112}
      height={112}
      className="w-full h-full object-cover"
    />
  </div>
);
export default Testimonial;
