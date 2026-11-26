"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, ArrowRight, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";

interface ScrapbookPasswordGateProps {
  hint: string;
  expectedPasswords: string[];
  onSuccess: () => void;
  onBack: () => void;
  title: string;
}

export default function ScrapbookPasswordGate({
  hint,
  expectedPasswords,
  onSuccess,
  onBack,
  title,
}: ScrapbookPasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Normalizing helper: lowercase, trim, strip all non-alphanumeric chars
    const clean = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, "");
    const inputClean = clean(password);

    // Also support ordinal removal e.g. "21st" -> "21", "19th" -> "19", "1st" -> "1"
    const inputWithoutOrdinal = inputClean.replace(/(\d+)(st|nd|rd|th)/g, "$1");

    const isCorrect = expectedPasswords.some((pwd) => {
      const pwdClean = clean(pwd);
      const pwdWithoutOrdinal = pwdClean.replace(/(\d+)(st|nd|rd|th)/g, "$1");

      return (
        inputClean === pwdClean ||
        inputWithoutOrdinal === pwdClean ||
        inputClean === pwdWithoutOrdinal ||
        inputWithoutOrdinal === pwdWithoutOrdinal
      );
    });

    setTimeout(() => {
      if (isCorrect) {
        // Trigger romantic confetti (pink and white hearts/particles)
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
          onSuccess();
        }, 1200); // Wait for the fade out
      } else {
        setError("Hmm... that's not our day, silly ❤️");
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/85 backdrop-blur-xl p-4 overflow-hidden select-none">
      {/* Blurred background radial gradients */}
      <div className="absolute inset-0 -z-10 bg-grain opacity-30" />
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-pink-accent/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-lavender-accent/10 blur-3xl" />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-55">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center space-x-2 py-2 px-4 bg-white/5 border border-white/10 rounded-full text-xs font-sans text-cream-accent/80 hover:text-pink-accent hover:border-pink-accent/40 transition-colors shadow-lg cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel w-full max-w-md p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-accent/30 to-transparent" />

        <div className="flex flex-col items-center text-center space-y-6">
          {/* Animated Heart */}
          <motion.div
            animate={{ 
              scale: [1, 1.08, 1],
              filter: ["drop-shadow(0 0 4px rgba(255,183,197,0.3))", "drop-shadow(0 0 12px rgba(255,183,197,0.6))", "drop-shadow(0 0 4px rgba(255,183,197,0.3))"]
            }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-16 h-16 rounded-full bg-pink-accent/10 flex items-center justify-center border border-pink-accent/20"
          >
            <Heart className="w-8 h-8 text-pink-accent fill-pink-accent/20" />
          </motion.div>

          <div className="space-y-2">
            <h1 className="font-serif text-3xl text-cream-accent tracking-wide">
              {title}
            </h1>
            <p className="text-sm font-sans text-pink-accent/70 tracking-widest uppercase">
              Unlock the scrapbook page
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-5 pt-4">
            <div className="relative">
              <label 
                htmlFor="password" 
                className="block text-xs font-sans text-cream-accent/50 text-left mb-2 tracking-wider uppercase"
              >
                Enter Password
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                  placeholder="Password"
                  autoComplete="off"
                  className="w-full bg-white/5 border border-white/10 text-cream-accent rounded-xl py-3 px-4 pl-10 focus:outline-none focus:border-pink-accent/50 focus:ring-1 focus:ring-pink-accent/30 transition-all font-sans text-sm tracking-wide"
                />
                <Lock className="w-4 h-4 text-cream-accent/40 absolute left-3.5 top-3.5" />
                
                <button
                  type="submit"
                  disabled={isSubmitting || !password.trim()}
                  className="absolute right-2 top-1.5 p-2 bg-pink-accent/10 hover:bg-pink-accent/20 text-pink-accent border border-pink-accent/20 rounded-lg transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Error Message */}
            <div className="min-h-[1.5rem] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="text-xs font-sans text-pink-accent/90"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Password Hint */}
            {hint && (
              <div className="bg-white/5 border border-white/10 rounded-2xl py-2 px-4 text-center">
                <span className="text-[10px] uppercase font-sans text-gold-accent tracking-widest block font-semibold mb-0.5">
                  Hint
                </span>
                <p className="text-xs font-serif italic text-cream-accent/80">
                  "{hint}"
                </p>
              </div>
            )}


          </form>
        </div>
      </motion.div>
    </div>
  );
}
