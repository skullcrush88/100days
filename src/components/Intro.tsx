"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroProps {
  onComplete: () => void;
}

const sentences = [
  "Hi Sidrat.",
  "Happy 100 Days.",
  "Thank you for existing."
];

export default function Intro({ onComplete }: IntroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < sentences.length) {
      const delay = currentIndex === sentences.length - 1 ? 3500 : 2500;
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 500); // short delay for final exit
      return () => clearTimeout(timer);
    }
  }, [currentIndex, onComplete]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-midnight overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-pink-accent/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-lavender-accent/5 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="relative w-full max-w-2xl px-6 text-center select-none">
        <AnimatePresence mode="wait">
          {currentIndex < sentences.length && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(4px)" }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                filter: "blur(0px)",
                transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
              }}
              exit={{ 
                opacity: 0, 
                y: -10, 
                scale: 1.02, 
                filter: "blur(4px)",
                transition: { duration: 0.8, ease: "easeInOut" } 
              }}
              className="w-full"
            >
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream-accent leading-tight tracking-wide">
                {sentences[currentIndex]}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Skip button for development or repeat viewings */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        whileHover={{ opacity: 0.8 }}
        onClick={onComplete}
        className="absolute bottom-8 right-8 font-sans text-xs uppercase text-cream-accent tracking-widest px-3 py-1 border border-cream-accent/20 rounded-full transition-all"
      >
        Skip Intro
      </motion.button>
    </div>
  );
}
