"use client";

import { useEffect, useState } from "react";

const COUNT = 40; // Reduced count for better mobile performance

type Flake = {
  size: number;
  left: number;
  duration: number;
  delay: number;
};

const Snow = () => {
  const [mounted, setMounted] = useState(false);
  const [flakes, setFlakes] = useState<Flake[]>([]);

  useEffect(() => {
    // 1. We only generate data once the component is safely on the client
    const generated = Array.from({ length: COUNT }).map(() => ({
      size: Math.random() * 5 + 2, // Smaller flakes look more professional
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10, // Slower fall = less CPU stress
      delay: Math.random() * -20, // Negative delay prevents "starting" all at once
    }));
    setFlakes(generated);
    setMounted(true);
  }, []);

  // 2. Return a placeholder or null to ensure Server HTML matches Initial Client HTML
  if (!mounted) return <div className="hidden" aria-hidden="true" />;

  return (
    <div className="snow-layer pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {flakes.map((flake, i) => (
        <div
          key={i}
          className="snowflake absolute bg-white rounded-full opacity-60"
          style={{
            top: "-5vh",
            left: `${flake.left}vw`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            filter: "blur(1px)",
            animation: `snow-fall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
            willChange: "transform", // Optimizes GPU rendering
          }}
        />
      ))}
      <style jsx>{`
        @keyframes snow-fall {
          0% {
            transform: translateY(-10vh) translateX(0);
          }
          100% {
            transform: translateY(110vh) translateX(20px);
          }
        }
      `}</style>
    </div>
  );
};

export default Snow;
