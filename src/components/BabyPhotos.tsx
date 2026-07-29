"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function BabyPhotos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Tilt and Parallax Scroll Transforms
  const rotateLeft = useTransform(scrollYProgress, [0, 0.8], [-8, 4]);
  const rotateRight = useTransform(scrollYProgress, [0, 0.8], [8, -4]);
  
  const yLeft = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yRight = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Entrance slide from sides
  const xLeft = useTransform(scrollYProgress, [0, 0.4], [-100, 0]);
  const xRight = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

  const opacityLeft = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const opacityRight = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const textLines = [
    "We had absolutely no idea...",
    "that two tiny babies...",
    "would somehow grow up,",
    "find each other,",
    "and become each other's safest place."
  ];

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen py-24 px-4 flex flex-col justify-center items-center relative overflow-hidden bg-background select-none"
    >
      {/* Background gradients */}
      <div className="absolute top-1/2 left-10 w-80 h-80 rounded-full bg-pink-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-lavender-accent/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-6 items-center">
        {/* Baby Boy Photo (Left) */}
        <motion.div
          style={{ x: xLeft, y: yLeft, rotate: rotateLeft, opacity: opacityLeft }}
          className="flex flex-col items-center md:items-start justify-self-center md:justify-self-start"
        >
          <div className="p-4 pb-8 bg-white border border-[#EBE3D5] rounded-lg shadow-[0_12px_28px_rgba(60,40,40,0.12)] relative group max-w-[280px]">
            {/* Washi Tape Accent */}
            <div className="washi-tape washi-tape-pink w-24 h-6 -top-3 left-1/2 -translate-x-1/2 -rotate-3 opacity-90" />
            
            <div className="relative aspect-[3/4] w-[240px] overflow-hidden bg-[#FAF6F0] border border-black/5 rounded">
              <Image
                src="/images/babyboy.png"
                alt="Baby Armaan"
                fill
                sizes="240px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="pt-4 text-center">
              <p className="font-handwritten text-3xl text-[#3A2E2B] font-bold">Armaan</p>
            </div>
          </div>
        </motion.div>

        {/* Central Romantic Text (Middle) */}
        <div className="flex flex-col text-center space-y-4 md:space-y-6 px-4 z-20">
          {textLines.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1.2, 
                delay: idx * 0.25, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className={`leading-relaxed tracking-wide ${
                idx === textLines.length - 1 
                  ? "text-2xl md:text-3xl text-gradient font-bold pt-4 font-serif" 
                  : "text-lg md:text-xl font-handwritten text-[#3A2E2B]/85"
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Baby Girl Photo (Right) */}
        <motion.div
          style={{ x: xRight, y: yRight, rotate: rotateRight, opacity: opacityRight }}
          className="flex flex-col items-center md:items-end justify-self-center md:justify-self-end"
        >
          <div className="p-4 pb-8 bg-white border border-[#EBE3D5] rounded-lg shadow-[0_12px_28px_rgba(60,40,40,0.12)] relative group max-w-[280px]">
            {/* Washi Tape Accent */}
            <div className="washi-tape washi-tape-lavender w-24 h-6 -top-3 left-1/2 -translate-x-1/2 rotate-2 opacity-90" />
            
            <div className="relative aspect-[3/4] w-[240px] overflow-hidden bg-[#FAF6F0] border border-black/5 rounded">
              <Image
                src="/images/babygirl.png"
                alt="Baby Sidrat"
                fill
                sizes="240px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="pt-4 text-center">
              <p className="font-handwritten text-3xl text-[#3A2E2B] font-bold">Sidrat</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
