"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { Sparkles } from "lucide-react";

export default function InteractiveQuestion() {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealStep, setRevealStep] = useState(0);

  const choices = [
    { label: "Your smile", val: "smile" },
    { label: "Your eyes", val: "eyes" },
    { label: "Your voice", val: "voice" },
    { label: "Everything", val: "everything" }
  ];

  const handleSelect = (val: string) => {
    setSelected(val);
    
    // Trigger sequential reveal text animations
    setTimeout(() => setRevealStep(1), 1000); // Fades in "Wrong."
    setTimeout(() => setRevealStep(2), 2600); // Fades in "My favorite thing..."
    setTimeout(() => setRevealStep(3), 4500); // Fades in "...is simply that you're you."
  };

  return (
    <section className="min-h-screen py-32 px-4 flex items-center justify-center relative bg-midnight overflow-hidden select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink-accent/[0.015] blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-lavender-accent/[0.01] blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl mx-auto text-center relative z-20">
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <span className="text-xs uppercase font-sans text-pink-accent tracking-widest block font-medium">
                  A Question For You
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-cream-accent leading-relaxed tracking-wide max-w-xl mx-auto">
                  What do you think is my favorite thing about you?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                {choices.map((c) => (
                  <MagneticButton
                    key={c.val}
                    onClick={() => handleSelect(c.val)}
                    className="w-full py-4 px-6 glass-panel glass-panel-hover rounded-2xl font-handwritten text-2xl text-[#3A2E2B] font-semibold hover:text-pink-accent hover:border-pink-accent transition-all duration-300 shadow-md text-center"
                  >
                    {c.label}
                  </MagneticButton>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="reveal-sequence"
              className="min-h-[250px] flex flex-col items-center justify-center space-y-8"
            >
              {/* Step 1: Wrong. */}
              {revealStep >= 1 && (
                <motion.p
                  initial={{ opacity: 0, y: 15, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-xl md:text-2xl text-pink-accent tracking-wider uppercase"
                >
                  {selected === "everything" ? "A beautiful guess, but..." : "Wrong ❤️"}
                </motion.p>
              )}

              {/* Step 2: My favorite thing... */}
              {revealStep >= 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 15, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif text-2xl md:text-4xl text-cream-accent/70 font-light"
                >
                  My favorite thing...
                </motion.p>
              )}

              {/* Step 3: is simply that you're you. */}
              {revealStep >= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <h3 className="font-serif text-4xl md:text-6xl text-gradient font-bold leading-tight tracking-wide px-4">
                    is simply that you're you.
                  </h3>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="inline-block mt-4"
                  >
                    <Sparkles className="w-6 h-6 text-gold-accent" />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
