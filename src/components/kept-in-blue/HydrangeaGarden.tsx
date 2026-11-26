"use client";

import { motion } from "framer-motion";

interface HydrangeaGardenProps {
  flowerCount: number;
  newlyAddedIndex: number | null;
}

export default function HydrangeaGarden({
  flowerCount,
  newlyAddedIndex,
}: HydrangeaGardenProps) {
  const visibleCount = Math.min(Math.max(0, flowerCount), 15);

  return (
    <div className="w-full max-w-[620px] mx-auto relative px-2 select-none">
      <svg
        viewBox="0 0 340 210"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
        role="img"
        aria-label="Sidrat's blue hydrangea garden"
        className="w-full h-auto drop-shadow-sm"
      >
        <defs>
          <radialGradient id="petalblue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0eafa" />
            <stop offset="100%" stopColor="#8fa9d5" />
          </radialGradient>

          <linearGradient id="grassblue" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#dce8d9" />
            <stop offset="1" stopColor="#f7f9fd" />
          </linearGradient>
        </defs>

        {/* Soft grass mound */}
        <ellipse
          cx="170"
          cy="185"
          rx="154"
          ry="22"
          fill="url(#grassblue)"
        />

        {/* Hydrangea Flowers */}
        {Array.from({ length: visibleCount }, (_, i) => {
          const x = i === 0 ? 170 : 36 + ((i * 71) % 270);
          const y = i === 0 ? 91 : 65 + ((i * 37) % 70);
          const scale = i === 0 ? 1 : 0.66 + (i % 3) * 0.09;
          const isNewlyAdded = newlyAddedIndex === i;

          // Unique sway parameters for organic natural movement
          const swayAngle = 0.9 + (i % 4) * 0.35;
          const swayDuration = 4.2 + (i % 5) * 0.6;
          const swayDelay = (i * 0.4) % 2.5;

          return (
            <g
              key={i}
              transform={`translate(${x},${y}) scale(${scale})`}
            >
              {/* Nested group for gentle wind sway (rotates around stem base at 0, 100) */}
              <motion.g
                animate={{
                  rotate: [-swayAngle, swayAngle, -swayAngle],
                }}
                transition={{
                  duration: swayDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: swayDelay,
                }}
                style={{
                  transformOrigin: "0px 100px",
                }}
              >
                {/* 1. Stem: animates upward when newly added */}
                <motion.path
                  d="M0 0 Q-9 50 0 100"
                  stroke="#859e7e"
                  strokeWidth="2.5"
                  fill="none"
                  initial={isNewlyAdded ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />

                {/* 2. Leaves: unfold gently */}
                <motion.path
                  d="M-3 64 Q-38 38 -36 65 Q-22 83 -3 64 M-1 83 Q31 49 34 74 Q20 93 -1 83"
                  fill="#a1b79a"
                  stroke="#839c7c"
                  strokeWidth="0.6"
                  initial={isNewlyAdded ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: isNewlyAdded ? 0.25 : 0, ease: "easeOut" }}
                  style={{ transformOrigin: "0px 73px" }}
                />

                {/* 3. Hydrangea Head / Florets: bloom outward */}
                <motion.g
                  initial={isNewlyAdded ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 14,
                    delay: isNewlyAdded ? 0.35 : 0,
                  }}
                  style={{ transformOrigin: "0px 0px" }}
                >
                  {Array.from({ length: 24 }, (_, j) => (
                    <g
                      key={j}
                      transform={`translate(${
                        Math.cos(j * 2.4) * Math.sqrt(j) * 6.7
                      },${
                        Math.sin(j * 2.4) * Math.sqrt(j) * 5.9
                      }) rotate(${j * 29})`}
                    >
                      {[0, 90, 180, 270].map((angle) => (
                        <ellipse
                          key={angle}
                          cx="0"
                          cy="-4.5"
                          rx="4.8"
                          ry="6.5"
                          transform={`rotate(${angle})`}
                          fill="url(#petalblue)"
                          stroke="#c4d4ec"
                          strokeWidth="0.5"
                        />
                      ))}

                      {/* Cream flower center */}
                      <circle r="1.7" fill="#f4edcb" />
                    </g>
                  ))}
                </motion.g>
              </motion.g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
