"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CinematicText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll within this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll transforms for smooth parallax text scales and fades
  const yLine1 = useTransform(scrollYProgress, [0.1, 0.3, 0.45], [50, 0, -30]);
  const opacityLine1 = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [0, 1, 0]);

  const yLine2 = useTransform(scrollYProgress, [0.35, 0.55, 0.7], [50, 0, -30]);
  const opacityLine2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0]);

  const yLine3 = useTransform(scrollYProgress, [0.6, 0.8, 0.95], [50, 0, -30]);
  const opacityLine3 = useTransform(scrollYProgress, [0.6, 0.75, 0.9], [0, 1, 0]);

  return (
    <section 
      ref={sectionRef} 
      className="h-[250vh] bg-midnight relative select-none w-full"
    >
      {/* Sticky container to lock the view while statements transition */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background glowing atmospheres */}
        <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink-accent/[0.015] blur-3xl pointer-events-none" />
        
        <div className="w-full max-w-4xl px-6 text-center relative">
          
          {/* Statement 1 */}
          <motion.div
            style={{ y: yLine1, opacity: opacityLine1 }}
            className="absolute inset-x-0 mx-auto flex items-center justify-center min-h-[200px]"
          >
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream-accent/80 leading-snug tracking-wide">
              Long distance isn't easy.
            </h2>
          </motion.div>

          {/* Statement 2 */}
          <motion.div
            style={{ y: yLine2, opacity: opacityLine2 }}
            className="absolute inset-x-0 mx-auto flex items-center justify-center min-h-[200px]"
          >
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-gradient font-bold leading-snug tracking-wide">
              But loving you is.
            </h2>
          </motion.div>

          {/* Statement 3 */}
          <motion.div
            style={{ y: yLine3, opacity: opacityLine3 }}
            className="absolute inset-x-0 mx-auto flex flex-col items-center justify-center min-h-[200px] space-y-4"
          >
            <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-cream-accent/90 leading-relaxed tracking-wide">
              Every day apart...
            </p>
            <p className="font-serif text-4xl md:text-6xl lg:text-7xl text-gold-gradient font-semibold leading-relaxed tracking-wide">
              is one day closer
            </p>
            <p className="font-serif text-3xl md:text-5xl lg:text-6xl text-cream-accent/90 leading-relaxed tracking-wide">
              to never saying goodbye again.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
