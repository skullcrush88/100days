"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export default function Ending() {
  const [phase, setPhase] = useState(0); // 0: Heart, 1: Infinity, 2: Forever text, 3: Final message

  useEffect(() => {
    // Sequential cinematic stages
    const t1 = setTimeout(() => setPhase(1), 3000); // 3s of Heart, then Infinity
    const t2 = setTimeout(() => setPhase(2), 6000); // 100 Days -> Forever
    const t3 = setTimeout(() => setPhase(3), 9000); // See you soon, pretty.
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <section className="h-screen w-full relative flex items-center justify-center bg-midnight overflow-hidden select-none">
      {/* Dynamic atmospheric overlay */}
      <div className="absolute inset-0 bg-grain opacity-35 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink-accent/[0.015] blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-lavender-accent/[0.01] blur-3xl pointer-events-none" />

      <div className="text-center relative z-20 flex flex-col items-center justify-center space-y-12 px-6">
        
        {/* Symbol Morph Area */}
        <div className="h-32 flex items-center justify-center relative w-full">
          <AnimatePresence mode="wait">
            {phase === 0 && (
              <motion.div
                key="heart"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.12, 1], 
                  opacity: 1,
                  filter: "drop-shadow(0 0 15px rgba(255,183,197,0.6))"
                }}
                exit={{ scale: 0.5, opacity: 0, filter: "blur(5px)" }}
                transition={{ 
                  scale: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
                  opacity: { duration: 1 }
                }}
                className="text-pink-accent"
              >
                <Heart className="w-20 h-20 fill-pink-accent/20" />
              </motion.div>
            )}

            {phase >= 1 && (
              <motion.h1
                key="infinity"
                initial={{ opacity: 0, scale: 0.5, filter: "blur(5px)" }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  filter: "blur(0px)",
                  textShadow: "0 0 30px rgba(220, 208, 255, 0.4)"
                }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-8xl md:text-9xl text-lavender-accent font-light"
              >
                ∞
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* Text Loop: 100 Days -> Forever */}
        <div className="h-16 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {phase < 2 ? (
              <motion.h3
                key="100days"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 1 }}
                className="font-serif text-2xl md:text-3xl text-cream-accent/80 tracking-widest uppercase"
              >
                100 Days
              </motion.h3>
            ) : (
              <motion.h3
                key="lifetime"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="font-serif text-xl md:text-2xl text-gradient font-bold tracking-wider uppercase text-center"
              >
                A whole life to spend together...
              </motion.h3>
            )}
          </AnimatePresence>
        </div>

        {/* Final Statement Reveal */}
        <div className="h-12 flex items-center justify-center">
          <AnimatePresence>
            {phase >= 3 && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-xl md:text-2xl text-gold-gradient font-medium tracking-wider"
              >
                See you soon, pretty.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
