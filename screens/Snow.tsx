import { FaSnowflake } from "react-icons/fa";
import { useMemo } from "react";

const COUNT = 120;

const Snow = () => {
  const flakes = useMemo(() => {
    return Array.from({ length: COUNT }).map(() => ({
      size: Math.random() * 10 + 4,
      left: Math.random() * 100,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 4,
      top: Math.random() * -100,
    }));
  }, []);

  return (
    <div className="snow-layer pointer-events-none fixed inset-0 z-0">
      {flakes.map((flake, i) => (
        <div
          key={i}
          className="snowflake absolute text-white/60 animate-snow"
          style={{
            top: `${flake.top}vh`,
            left: `${flake.left}vw`,
            fontSize: flake.size,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          <FaSnowflake />
        </div>
      ))}
    </div>
  );
};

export default Snow;
