"use client";

import { FaSnowflake } from "react-icons/fa";
import { useEffect, useState } from "react";

const COUNT = 120;

type Flake = {
  size: number;
  left: number;
  duration: number;
  delay: number;
  top: number;
};

const Snow = () => {
  const [mounted, setMounted] = useState(false);
  const [flakes, setFlakes] = useState<Flake[]>([]);

  useEffect(() => {
    setMounted(true); // Signal that we are now on the client
    const generated = Array.from({ length: COUNT }).map(() => ({
      size: Math.random() * 10 + 4,
      left: Math.random() * 100,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 4,
      top: Math.random() * -100,
    }));
    setFlakes(generated);
  }, []);

  // Return null during Server Side Rendering
  if (!mounted) return null;

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

// const Snow = () => {
//   const [flakes, setFlakes] = useState<Flake[]>([]);

//   useEffect(() => {
//     const generated = Array.from({ length: COUNT }).map(() => ({
//       size: Math.random() * 10 + 4,
//       left: Math.random() * 100,
//       duration: Math.random() * 6 + 4,
//       delay: Math.random() * 4,
//       top: Math.random() * -100,
//     }));

//     setFlakes(generated);
//   }, []);

//   if (flakes.length === 0) return null;

//   return (
//     <div className="snow-layer pointer-events-none fixed inset-0 z-0">
//       {flakes.map((flake, i) => (
//         <div
//           key={i}
//           className="snowflake absolute text-white/60 animate-snow"
//           style={{
//             top: `${flake.top}vh`,
//             left: `${flake.left}vw`,
//             fontSize: flake.size,
//             animationDuration: `${flake.duration}s`,
//             animationDelay: `${flake.delay}s`,
//           }}
//         >
//           <FaSnowflake />
//         </div>
//       ))}
//     </div>
//   );
// };

export default Snow;
