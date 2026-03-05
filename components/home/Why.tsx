import { MdOutlinePhoneAndroid } from "react-icons/md";
import { TfiRulerPencil } from "react-icons/tfi";
import { CiSettings } from "react-icons/ci";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Custom Website & Platform Development",
    description:
      "We design and build scalable websites, SaaS platforms, and web applications tailored to your brand and business goals.",
    icon: <MdOutlinePhoneAndroid size={42} className="text-[#fb397d]" />,
  },
  {
    title: "Modern UI & High-Performance Design",
    description:
      "Our interfaces are built with modern UI/UX principles to deliver fast, visually engaging and conversion-focused digital experiences.",
    icon: <TfiRulerPencil size={42} className="text-[#fb397d]" />,
  },
  {
    title: "Powerful Online Tools",
    description:
      "We build and maintain free online tools like image converters, optimizers, analyzers and other utilities designed for developers, designers and marketers.",
    icon: <CiSettings size={42} className="text-[#fb397d]" />,
  },
];

const Why = () => {
  return (
    <section id="why" className="px-6 py-16 md:px-24">
      <header className="text-center space-y-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#5b32b4]">
          Why Choose Snappy-Fix Technologies
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We combine design, technology, and engineering to build high-quality
          web platforms and powerful online tools. From custom websites to
          advanced image processing utilities, we create fast, reliable
          solutions that help businesses and creators succeed online.
        </p>
        <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
      </header>

      <div className="flex flex-wrap justify-center gap-8">
        {features.map((feature, index) => (
          <article
            key={index}
            className="group bg-white text-center border p-8 max-w-[22rem] rounded-3xl transition hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex justify-center mb-4 group-hover:scale-110 transition">
              {feature.icon}
            </div>

            <h3 className="text-lg font-semibold text-[#5b32b4]">
              {feature.title}
            </h3>

            <p className="mt-3 text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Why;
