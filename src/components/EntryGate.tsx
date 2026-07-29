"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Delete, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

interface EntryGateProps {
  onUnlock: () => void;
}

export default function EntryGate({ onUnlock }: EntryGateProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const keys = [
    { num: "1", letters: " " },
    { num: "2", letters: "A B C" },
    { num: "3", letters: "D E F" },
    { num: "4", letters: "G H I" },
    { num: "5", letters: "J K L" },
    { num: "6", letters: "M N O" },
    { num: "7", letters: "P Q R S" },
    { num: "8", letters: "T U V" },
    { num: "9", letters: "W X Y Z" },
  ];

  const handleKeyPress = (num: string) => {
    if (isSubmitting || isShaking || passcode.length >= 8) return;
    const newPasscode = passcode + num;
    setPasscode(newPasscode);

    if (newPasscode.length === 8) {
      verifyPasscode(newPasscode);
    }
  };

  const handleDelete = () => {
    if (isSubmitting || isShaking || passcode.length === 0) return;
    setPasscode(passcode.slice(0, -1));
  };

  const handleClear = () => {
    if (isSubmitting || isShaking) return;
    setPasscode("");
    setError("");
  };

  const verifyPasscode = (code: string) => {
    setIsSubmitting(true);
    setError("");

    // Verification check for the date 21/04/2026
    const isCorrect = code === "21042026";

    setTimeout(() => {
      if (isCorrect) {
        // Trigger romantic confetti (pink, lavender and gold hearts/particles)
        const duration = 2000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: NodeJS.Timeout = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 40 * (timeLeft / duration);
          
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ["#FFB7C5", "#DCD0FF", "#FDFBF7"],
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ["#FFB7C5", "#DCD0FF", "#FDFBF7"],
          });
        }, 250);

        setTimeout(() => {
          onUnlock();
        }, 1200); // Fade out delay
      } else {
        setIsShaking(true);
        setError("Hmm... that's not our day, silly ❤️");
        
        setTimeout(() => {
          setIsShaking(false);
          setPasscode("");
          setIsSubmitting(false);
        }, 1000); // Shaking animation duration + clear
      }
    }, 600); // Small processing lag to feel mechanical/thoughtful
  };

  // Support physical keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSubmitting || isShaking) return;

      if (e.key >= "0" && e.key <= "9") {
        handleKeyPress(e.key);
      } else if (e.key === "Backspace") {
        handleDelete();
      } else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [passcode, isSubmitting, isShaking]);

  // Framer motion variants for iOS-like shake
  const dotContainerVariants = {
    shake: {
      x: [0, -12, 12, -12, 12, -6, 6, 0],
      transition: { duration: 0.5, ease: "easeInOut" as const }
    },
    idle: { x: 0 }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/80 backdrop-blur-xl p-4 overflow-y-auto">
      <div className="absolute inset-0 -z-10 bg-grain" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-pink-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-lavender-accent/10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel w-full max-w-sm p-6 md:p-8 rounded-3xl border shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-pink-accent/30 to-transparent" />

        <div className="flex flex-col items-center text-center space-y-4">
          {/* Heart Icon Header */}
          <motion.div
            animate={{ 
              scale: [1, 1.08, 1],
              filter: ["drop-shadow(0 0 3px rgba(255,183,197,0.3))", "drop-shadow(0 0 10px rgba(255,183,197,0.5))", "drop-shadow(0 0 3px rgba(255,183,197,0.3))"]
            }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-12 h-12 rounded-full bg-pink-accent/10 flex items-center justify-center border border-pink-accent/25"
          >
            <Heart className="w-6 h-6 text-pink-accent fill-pink-accent/25" />
          </motion.div>

          <div className="space-y-1">
            <h1 className="font-serif text-2xl md:text-3xl text-[#3A2E2B] font-bold">
              For Sidrat
            </h1>
            <p className="text-[10px] font-sans text-pink-accent/70 tracking-widest uppercase font-semibold">
              Enter Anniversary Date
            </p>
          </div>

          {/* passcode indicator dots */}
          <motion.div
            variants={dotContainerVariants}
            animate={isShaking ? "shake" : "idle"}
            className="flex justify-center space-x-4 py-4"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 ${
                  i < passcode.length
                    ? "bg-pink-accent border-pink-accent scale-110 shadow-[0_0_8px_rgba(232,93,117,0.4)]"
                    : "bg-white/40 border-[#EBE3D5]"
                }`}
              />
            ))}
          </motion.div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 justify-items-center w-full max-w-[280px] mx-auto pt-2">
            {keys.map((k) => (
              <motion.button
                key={k.num}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleKeyPress(k.num)}
                disabled={isSubmitting || isShaking}
                className="w-16 h-16 rounded-full border border-[#EBE3D5] bg-white/60 hover:bg-white hover:border-pink-accent/30 text-[#3A2E2B] flex flex-col items-center justify-center transition-all duration-200 cursor-pointer shadow-xs disabled:opacity-60 disabled:pointer-events-none"
              >
                <span className="text-2xl font-bold font-serif leading-none mt-0.5">{k.num}</span>
                <span className="text-[8px] font-sans font-semibold text-gold-accent tracking-wider leading-none mt-1">
                  {k.letters}
                </span>
              </motion.button>
            ))}

            {/* Clear Button (Reset) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClear}
              disabled={isSubmitting || isShaking || passcode.length === 0}
              className="w-16 h-16 rounded-full border border-[#EBE3D5] bg-white/65 hover:bg-white hover:border-pink-accent/30 text-[#3A2E2B] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs disabled:opacity-40 disabled:pointer-events-none"
              title="Clear All"
            >
              <RotateCcw className="w-5 h-5 opacity-70" />
            </motion.button>

            {/* Zero Key */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleKeyPress("0")}
              disabled={isSubmitting || isShaking}
              className="w-16 h-16 rounded-full border border-[#EBE3D5] bg-white/60 hover:bg-white hover:border-pink-accent/30 text-[#3A2E2B] flex flex-col items-center justify-center transition-all duration-200 cursor-pointer shadow-xs disabled:opacity-60 disabled:pointer-events-none"
            >
              <span className="text-2xl font-bold font-serif leading-none mt-0.5">0</span>
              <span className="text-[8px] font-sans font-semibold text-gold-accent tracking-wider leading-none mt-1">
                +
              </span>
            </motion.button>

            {/* Delete Key */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              disabled={isSubmitting || isShaking || passcode.length === 0}
              className="w-16 h-16 rounded-full border border-[#EBE3D5] bg-white/65 hover:bg-white hover:border-pink-accent/30 text-[#3A2E2B] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs disabled:opacity-40 disabled:pointer-events-none"
              title="Delete Last Digit"
            >
              <Delete className="w-5 h-5 opacity-70" />
            </motion.button>
          </div>

          {/* Feedback/Hint Area */}
          <div className="w-full pt-4 min-h-[60px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {error ? (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="text-xs font-sans text-pink-accent font-semibold"
                >
                  {error}
                </motion.p>
              ) : (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  className="bg-white/45 border border-[#EBE3D5] rounded-2xl p-3 text-left w-full shadow-xs"
                >
                  <span className="text-[9px] uppercase font-sans text-gold-accent tracking-widest block mb-0.5 font-semibold">
                    Passcode Hint
                  </span>
                  <p className="text-xs font-sans text-[#3A2E2B]/80 leading-relaxed font-medium">
                    The 8-digit date when our journey began (DDMMYYYY).
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
