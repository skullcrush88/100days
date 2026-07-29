"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function LiveCounter() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target start date: April 21, 2026
    const startDate = new Date("2026-04-21T00:00:00").getTime();

    const updateCounter = () => {
      const now = new Date().getTime();
      const difference = now - startDate;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-xl mx-auto text-center"
    >
      <div className="glass-panel py-8 px-6 rounded-3xl shadow-xl relative overflow-hidden bg-white/40">
        {/* Shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-accent/20 to-transparent" />

        <div className="flex items-center justify-center space-x-2 mb-4">
          <Heart className="w-4 h-4 text-pink-accent fill-pink-accent/10 animate-pulse" />
          <span className="text-[10px] uppercase font-sans tracking-widest text-gold-accent font-semibold">
            Time Spent Loving You
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {timeBlocks.map((block, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="font-serif text-3xl md:text-5xl text-gradient font-bold tabular-nums">
                {String(block.value).padStart(2, "0")}
              </span>
              <span className="text-[9px] uppercase font-sans text-[#3A2E2B]/60 tracking-wider mt-1.5 font-semibold">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
