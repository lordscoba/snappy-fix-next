import { TfiUser, TfiPulse, TfiDashboard } from "react-icons/tfi";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Modern UI/UX Design",
    description:
      "We design visually appealing and user-friendly interfaces that improve engagement and conversion.",
    icon: <TfiUser size={38} className="text-[#fb397d]" />,
  },
  {
    title: "Fast Performance",
    description:
      "Our websites are optimized for speed, ensuring fast load times and better user experience.",
    icon: <TfiPulse size={38} className="text-[#fb397d]" />,
  },
  {
    title: "Clean & Maintainable Code",
    description:
      "We write scalable, clean, and maintainable code, making future updates easy and cost-effective.",
    icon: <TfiDashboard size={38} className="text-[#fb397d]" />,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <header className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-[#5b32b4]">
            Powerful Features We Integrate Into Your Website
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our web solutions are built with performance, usability, and
            scalability in mind, helping your business stand out online.
          </p>
          <div className="h-1 w-20 bg-[#fb397d] mx-auto rounded" />
        </header>

        <div className="flex flex-col md:flex-row gap-10">
          {features.map((feature, index) => (
            <article
              key={index}
              className="group flex-1 p-8 rounded-3xl border transition hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="group-hover:scale-110 transition">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold text-[#5b32b4]">
                  {feature.title}
                </h3>
              </div>

              <p className="mt-4 text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
