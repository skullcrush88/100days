"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  rotate: number;
}

export default function CursorTrail() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let heartId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      // Calculate distance from last position to throttle spawning
      const dist = Math.hypot(x - lastPos.x, y - lastPos.y);

      if (dist > 35) { // Spawn every 35px of movement
        setLastPos({ x, y });
        const size = Math.random() * 12 + 8; // 8px to 20px
        const rotate = (Math.random() - 0.5) * 40; // -20deg to 20deg
        
        const newHeart: Heart = {
          id: heartId++,
          x,
          y,
          size,
          rotate,
        };

        setHearts((prev) => [...prev.slice(-15), newHeart]); // Keep max 15 hearts in state
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const { clientX: x, clientY: y } = touch;
        setLastPos({ x, y });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const { clientX: x, clientY: y } = touch;
        const dist = Math.hypot(x - lastPos.x, y - lastPos.y);

        if (dist > 40) {
          setLastPos({ x, y });
          const size = Math.random() * 10 + 6;
          const rotate = (Math.random() - 0.5) * 45;

          const newHeart: Heart = {
            id: heartId++,
            x,
            y,
            size,
            rotate,
          };
          setHearts((prev) => [...prev.slice(-15), newHeart]);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [lastPos]);

  // Periodically clean up old hearts
  useEffect(() => {
    if (hearts.length === 0) return;
    const interval = setInterval(() => {
      setHearts((prev) => prev.slice(1));
    }, 800);
    return () => clearInterval(interval);
  }, [hearts]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0.6, scale: 0.2, x: heart.x - heart.size / 2, y: heart.y - heart.size / 2 }}
            animate={{ 
              opacity: 0, 
              scale: 1.2, 
              y: heart.y - heart.size / 2 - 60, // float up
              x: heart.x - heart.size / 2 + (Math.random() - 0.5) * 30 // drift slightly left/right
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute pointer-events-none text-pink-accent/40"
            style={{
              fontSize: heart.size,
              transform: `rotate(${heart.rotate}deg)`,
            }}
          >
            ♡
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
