"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Heart } from "lucide-react";

interface Memory {
  id: number;
  title: string;
  text: string;
  x: number; // percentage width
  y: number; // percentage height
}

export default function MemoryStars() {
  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);

  const memories: Memory[] = [
    { id: 1, title: "Your laugh", text: "The sweetest melody I've ever heard. It immediately turns my worst days into pure sunlight.", x: 15, y: 35 },
    { id: 2, title: "Your random yapping", text: "I could listen to you talk about the most random details for hours. Your excitement is contagious.", x: 38, y: 20 },
    { id: 3, title: "Every goodnight", text: "Ending my day with your warm 'goodnight' makes the distance feel like nothing but numbers.", x: 68, y: 15 },
    { id: 4, title: "Every sleepy call", text: "Your soft, raspy, half-asleep voice is my absolute favorite sound in the entire world.", x: 85, y: 40 },
    { id: 6, title: "Your smile", text: "Seeing you happy is my favorite sight. It's the reason I smile when looking at my screen.", x: 42, y: 80 },
    { id: 7, title: "Everything.", text: "Every single text, giggle, sleepy sigh, and quiet moment. I love every single piece of who you are.", x: 18, y: 65 },
  ];

  // Map coordinates to SVG path line points
  const points = memories.map(m => `${m.x}%,${m.y}%`).join(" ");

  return (
    <section className="min-h-screen py-32 px-4 relative flex flex-col justify-center items-center bg-midnight overflow-hidden select-none">
      {/* Aurora glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-pink-accent/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-lavender-accent/[0.02] blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto flex flex-col space-y-12 relative z-20">
        <div className="text-center">
          <span className="text-xs uppercase font-sans text-pink-accent tracking-widest block mb-3 font-semibold">
            Click on the shining stars
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-cream-accent">
            Our Memory Constellation
          </h2>
          <p className="font-sans text-xs text-[#3A2E2B]/60 mt-2 font-medium">
            Each star holds a memory close to my heart.
          </p>
        </div>

        {/* The Star Field Coordinate Area */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] border border-[#EBE3D5] bg-white/35 backdrop-blur-xs rounded-3xl overflow-hidden p-6 shadow-inner animate-fade-in">
          {/* Subtle noise grid */}
          <div className="absolute inset-0 bg-grain opacity-15 pointer-events-none" />

          {/* SVG Constellation Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.polygon
              points={points}
              fill="none"
              stroke="rgba(232, 93, 117, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            {/* Secondary golden line connectors */}
            <motion.line
              x1="15%" y1="35%"
              x2="42%" y2="80%"
              stroke="rgba(199, 155, 36, 0.22)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1 }}
            />

          </svg>

          {/* Render individual stars */}
          {memories.map((memory) => {
            const isSelected = activeMemory?.id === memory.id;

            return (
              <div
                key={memory.id}
                style={{ left: `${memory.x}%`, top: `${memory.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <motion.button
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveMemory(memory)}
                  className="relative group p-3 focus:outline-none"
                >
                  {/* Glowing star core */}
                  <motion.div
                    animate={{
                      scale: isSelected ? [1, 1.3, 1] : [1, 1.15, 1],
                      opacity: isSelected ? 1 : [0.7, 1, 0.7],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: isSelected ? 1.5 : 2 + (memory.id % 3),
                      ease: "easeInOut",
                    }}
                    className={`rounded-full p-1 border shadow-sm transition-colors ${
                      isSelected 
                        ? "bg-pink-accent/20 border-pink-accent text-pink-accent" 
                        : "bg-white border-[#EBE3D5] text-gold-accent hover:border-pink-accent/50 hover:text-pink-accent"
                    }`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </motion.div>

                  {/* Pulsing Aura */}
                  <span className="absolute inset-0 rounded-full bg-pink-accent/5 scale-150 blur-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Star Label */}
                  <span className="absolute left-1/2 -translate-x-1/2 top-10 whitespace-nowrap bg-[#FCF9F6] border border-pink-accent/20 text-[10px] uppercase tracking-widest text-[#3A2E2B]/80 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-semibold shadow-md">
                    {memory.title}
                  </span>
                </motion.button>
              </div>
            );
          })}

          {/* Interactive Modal/Overlay inside the coordinate area */}
          <AnimatePresence>
            {activeMemory && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-4 bottom-4 md:inset-x-auto md:right-6 md:bottom-6 md:w-80 glass-panel border rounded-2xl p-6 z-30 shadow-2xl overflow-hidden bg-white/95"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveMemory(null)}
                  className="absolute right-3 top-3 p-1.5 rounded-full hover:bg-black/5 text-[#3A2E2B]/50 hover:text-[#3A2E2B] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Shimmer Border */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-accent/30 to-transparent" />

                <div className="space-y-3 pr-3 text-left">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-pink-accent fill-pink-accent/25" />
                    <span className="text-[10px] font-sans font-semibold uppercase text-gold-accent tracking-widest">
                      Memory Star #{activeMemory.id}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-[#3A2E2B] tracking-wide font-bold">
                    {activeMemory.title}
                  </h3>

                  <p className="font-handwritten text-2xl text-[#3A2E2B]/90 leading-relaxed">
                    {activeMemory.text}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
