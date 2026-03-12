import { useEffect, useRef, useState } from "react";
import { ImArrowDown } from "react-icons/im";
import { RiEmotionHappyLine } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { AiOutlineStar } from "react-icons/ai";
import CountUp from "react-countup";
import Image from "next/image";

type Stat = {
  label: string;
  value: number;
  icon: React.ReactNode;
};

const stats: Stat[] = [
  {
    label: "Total Websites Built",
    value: 110,
    icon: <ImArrowDown size={38} color="#fff" />,
  },
  {
    label: "Happy Clients",
    value: 110,
    icon: <RiEmotionHappyLine size={38} color="#fff" />,
  },
  {
    label: "Active Clients",
    value: 20,
    icon: <IoPersonSharp size={38} color="#fff" />,
  },
  {
    label: "5-Star Reviews",
    value: 103,
    icon: <AiOutlineStar size={38} color="#fff" />,
  },
];

const Counter = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.4 },
    );

    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return (
    <section
      id="counter"
      ref={sectionRef}
      className="relative py-20 overflow-hidden" // Changed to relative and overflow-hidden
    >
      {/* The Background Image Layer */}
      <Image
        src="/images/bg-img/rt.webp"
        alt="Background pattern"
        fill
        priority={false} // Ensures lazy loading (default)
        className="object-cover object-center -z-10" // Puts it behind the content
        sizes="100vw" // Helps Next.js pick the right size for the screen
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-white">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-end gap-4">
            <span className="text-5xl font-bold min-w-[80px]">
              {visible ? (
                <CountUp
                  key={visible ? "start" : "reset"}
                  end={stat.value}
                  duration={2}
                />
              ) : (
                0
              )}
            </span>

            <div className="flex flex-col gap-2">
              {stat.icon}
              <p className="text-lg">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Counter;
