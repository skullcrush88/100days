"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface KeptInBluePasswordGateProps {
  onSuccess: () => void;
  onBack: () => void;
}

interface IceCreamOption {
  id: string;
  name: string;
  emoji: string;
}

const ICE_CREAM_OPTIONS: IceCreamOption[] = [
  { id: "chocolate", name: "Chocolate", emoji: "🍫" },
  { id: "vanilla", name: "Vanilla", emoji: "🍦" },
  { id: "strawberry", name: "Strawberry", emoji: "🍓" },
  { id: "butterscotch", name: "Butterscotch", emoji: "🍨" },
];

export default function KeptInBluePasswordGate({
  onSuccess,
  onBack,
}: KeptInBluePasswordGateProps) {
  const [selectedFlavour, setSelectedFlavour] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isUnsealing, setIsUnsealing] = useState(false);

  const handleSelectFlavour = (flavourId: string) => {
    setSelectedFlavour(flavourId);
    setError("");
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!selectedFlavour) {
      setError("Pick your favourite flavour first, pretty girl! 🍦");
      return;
    }

    if (selectedFlavour === "chocolate") {
      setIsUnsealing(true);
      setSuccessMsg("Of course you'd know, my love. 🍫♡");

      // Confetti burst of blue, powder, gold and wax burgundy petals
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#8fa9d5", "#e0eafa", "#c4d4ec", "#f4edcb", "#782F3B"],
      });

      setTimeout(() => {
        onSuccess();
      }, 1600);
    } else {
      setError("Hmm, that's not your favorite, silly! Try again ♡");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF6F0] p-4 min-h-[100dvh] overflow-y-auto overflow-x-hidden select-none">
      {/* Background warm grain & subtle blue motes */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-[#FAF6F0] to-[#F5EFE6] -z-10" />
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#B8CDEB]/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#EAD8B8]/30 blur-3xl pointer-events-none -z-10" />

      {/* Floating Back Button */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-6 z-55">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center space-x-1.5 py-1.5 px-3.5 sm:py-2 sm:px-4 bg-white/85 border border-[#DCC29B]/60 backdrop-blur-md rounded-full text-xs font-sans text-[#4A3222] hover:text-[#20150E] hover:border-[#8FAED7] shadow-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#8FAED7]" />
          <span>Dashboard</span>
        </motion.button>
      </div>

      {/* Main Envelope Composition Container */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto my-auto flex flex-col items-center text-center py-6 px-2">
        {/* Header Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center space-x-2 text-[11px] sm:text-xs uppercase font-serif tracking-widest text-[#782F3B] mb-3 sm:mb-5 font-semibold"
        >
          <span>♡</span>
          <span>ARMAAN & SIDRAT</span>
          <span>♡</span>
        </motion.div>

        {/* The Enchanted Envelope with Hydrangeas Peeking Out */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-64 sm:w-72 h-44 sm:h-48 my-1 flex items-center justify-center"
        >
          {/* 3 Blue Hydrangea Flower Heads Peeking Out from behind envelope */}
          <div className="absolute -top-10 inset-x-0 flex justify-center items-end space-x-3 pointer-events-none z-0">
            {/* Left Hydrangea Head */}
            <motion.div
              animate={isUnsealing ? { y: -25, opacity: 0 } : { y: [0, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 sm:w-18 sm:h-18 relative -rotate-6"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                <defs>
                  <radialGradient id="gate_petal1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#e0eafa" />
                    <stop offset="100%" stopColor="#8fa9d5" />
                  </radialGradient>
                </defs>
                {/* Leaves */}
                <path d="M40 70 Q20 85 30 95 Q50 90 45 70" fill="#a1b79a" stroke="#839c7c" strokeWidth="0.8" />
                {/* Stem */}
                <path d="M48 60 Q45 80 48 95" stroke="#859e7e" strokeWidth="2.5" fill="none" />
                {/* Florets */}
                {Array.from({ length: 16 }).map((_, j) => (
                  <g
                    key={j}
                    transform={`translate(${50 + Math.cos(j * 2.4) * Math.sqrt(j) * 8}, ${40 + Math.sin(j * 2.4) * Math.sqrt(j) * 7
                      }) rotate(${j * 28})`}
                  >
                    {[0, 90, 180, 270].map((angle) => (
                      <ellipse
                        key={angle}
                        cx="0"
                        cy="-4.5"
                        rx="4.2"
                        ry="5.8"
                        transform={`rotate(${angle})`}
                        fill="url(#gate_petal1)"
                        stroke="#c4d4ec"
                        strokeWidth="0.5"
                      />
                    ))}
                    <circle r="1.4" fill="#f4edcb" />
                  </g>
                ))}
              </svg>
            </motion.div>

            {/* Center Hydrangea Head (Taller) */}
            <motion.div
              animate={isUnsealing ? { y: -30, opacity: 0 } : { y: [-2, 2, -2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="w-20 h-20 sm:w-22 sm:h-22 relative -top-3 z-10"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                {/* Leaves */}
                <path d="M35 75 Q15 65 25 88 Q45 80 40 75 M55 75 Q75 65 65 88 Q45 80 50 75" fill="#a1b79a" stroke="#839c7c" strokeWidth="0.8" />
                <path d="M46 65 Q45 85 46 95" stroke="#859e7e" strokeWidth="2.5" fill="none" />
                {Array.from({ length: 20 }).map((_, j) => (
                  <g
                    key={j}
                    transform={`translate(${50 + Math.cos(j * 2.4) * Math.sqrt(j) * 8.5}, ${42 + Math.sin(j * 2.4) * Math.sqrt(j) * 7.5
                      }) rotate(${j * 28})`}
                  >
                    {[0, 90, 180, 270].map((angle) => (
                      <ellipse
                        key={angle}
                        cx="0"
                        cy="-4.8"
                        rx="4.5"
                        ry="6.2"
                        transform={`rotate(${angle})`}
                        fill="url(#gate_petal1)"
                        stroke="#c4d4ec"
                        strokeWidth="0.5"
                      />
                    ))}
                    <circle r="1.5" fill="#f4edcb" />
                  </g>
                ))}
              </svg>
            </motion.div>

            {/* Right Hydrangea Head */}
            <motion.div
              animate={isUnsealing ? { y: -25, opacity: 0 } : { y: [0, -3, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="w-16 h-16 sm:w-18 sm:h-18 relative rotate-6"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                <path d="M50 70 Q70 85 60 95 Q40 90 45 70" fill="#a1b79a" stroke="#839c7c" strokeWidth="0.8" />
                <path d="M44 60 Q45 80 44 95" stroke="#859e7e" strokeWidth="2.5" fill="none" />
                {Array.from({ length: 16 }).map((_, j) => (
                  <g
                    key={j}
                    transform={`translate(${50 + Math.cos(j * 2.4) * Math.sqrt(j) * 8}, ${40 + Math.sin(j * 2.4) * Math.sqrt(j) * 7
                      }) rotate(${j * 28})`}
                  >
                    {[0, 90, 180, 270].map((angle) => (
                      <ellipse
                        key={angle}
                        cx="0"
                        cy="-4.5"
                        rx="4.2"
                        ry="5.8"
                        transform={`rotate(${angle})`}
                        fill="url(#gate_petal1)"
                        stroke="#c4d4ec"
                        strokeWidth="0.5"
                      />
                    ))}
                    <circle r="1.4" fill="#f4edcb" />
                  </g>
                ))}
              </svg>
            </motion.div>
          </div>

          {/* Golden Sparkles Around Envelope */}
          <div className="absolute -top-4 -left-4 text-[#C79B24] pointer-events-none animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="absolute top-2 -right-4 text-[#C79B24] pointer-events-none animate-pulse delay-700">
            <Sparkles className="w-4 h-4" />
          </div>

          {/* Envelope Body (SVG Kraft Envelope) */}
          <div className="relative w-full h-full z-10 drop-shadow-md">
            <svg viewBox="0 0 280 180" className="w-full h-full">
              {/* Envelope base back */}
              <rect x="10" y="15" width="260" height="155" rx="4" fill="#E6CCA8" stroke="#D3B58E" strokeWidth="1.5" />

              {/* Lower folded flaps */}
              <polygon points="10,170 140,85 270,170" fill="#DEC19B" stroke="#CAA880" strokeWidth="1.2" />
              <polygon points="10,15 140,95 10,170" fill="#E2C7A2" stroke="#CAA880" strokeWidth="1" />
              <polygon points="270,15 140,95 270,170" fill="#DFBE97" stroke="#CAA880" strokeWidth="1" />

              {/* Top Triangular Flap (animates open when unsealing) */}
              <motion.polygon
                points="10,15 140,115 270,15"
                fill="#EAD2B0"
                stroke="#CAA880"
                strokeWidth="1.2"
                animate={isUnsealing ? { scaleY: -0.7 } : { scaleY: 1 }}
                style={{ transformOrigin: "140px 15px" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </svg>

            {/* Embossed Burgundy Wax Seal in Center (A ♡ S) */}
            <motion.div
              animate={isUnsealing ? { scale: 0, opacity: 0 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#782F3B] border-2 border-[#541C25] shadow-md flex items-center justify-center cursor-default z-20"
              style={{
                boxShadow: "0 3px 10px rgba(80, 20, 30, 0.35), inset 0 0 8px rgba(255, 255, 255, 0.15)",
              }}
            >
              <span className="font-serif text-[11px] sm:text-xs font-bold text-[#F4EDCB] tracking-tight flex items-center">
                A<Heart className="w-2.5 h-2.5 mx-0.5 fill-[#F4EDCB] inline" />S
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Title & Subtitles below envelope */}
        <div className="space-y-1 mt-2 mb-3">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#3A2E2B] font-bold tracking-tight">
            Kept in Blue.
          </h1>
          <p className="font-handwritten text-xl sm:text-2xl text-[#8FAED7]">
            A little something for my pretty girl.
          </p>
        </div>

        {/* Password Form with Ice Cream Flavour Options */}
        <form onSubmit={handleVerify} className="w-full max-w-xs sm:max-w-sm space-y-3 mt-1">
          <p className="font-sans text-xs text-[#523A26] font-medium">
            Only my favorite girl can open this.
          </p>

          {/* Ice Cream Flavour Choices */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full my-2">
            {ICE_CREAM_OPTIONS.map((option) => {
              const isSelected = selectedFlavour === option.id;
              return (
                <motion.button
                  key={option.id}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSelectFlavour(option.id)}
                  disabled={isUnsealing}
                  className={`flex items-center justify-center space-x-2 py-2.5 sm:py-3 px-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#F7EFE6] border-[#782F3B] shadow-[0_4px_14px_rgba(120,47,59,0.18)] ring-2 ring-[#782F3B]/20 text-[#3A2214]"
                      : "bg-white/90 border-[#DCC29B]/70 hover:border-[#8FAED7] hover:bg-white text-[#4A3222] shadow-sm"
                  }`}
                >
                  <span className="text-xl">{option.emoji}</span>
                  <span className="font-serif text-sm sm:text-base font-medium tracking-wide">
                    {option.name}
                  </span>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[#782F3B] text-xs font-bold"
                    >
                      ♡
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Error / Success Feedback */}
          <div className="min-h-[1.5rem] flex items-center justify-center">
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-handwritten text-base text-[#E85D75] font-semibold"
              >
                {error}
              </motion.p>
            )}
            {successMsg && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-handwritten text-lg text-[#31486B] font-semibold"
              >
                {successMsg}
              </motion.p>
            )}
          </div>

          {/* Hint */}
          <p className="font-serif italic text-xs text-[#6B5A57]/90">
            Hint: "Your favourite ice cream flavour"
          </p>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isUnsealing}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#8fa9d5] to-[#A5A8D9] text-white font-sans text-sm font-medium shadow-[0_4px_16px_rgba(143,169,213,0.35)] hover:shadow-[0_6px_20px_rgba(143,169,213,0.45)] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
          >
            <span>{isUnsealing ? "Unfolding for you..." : "Unseal my letter ♡"}</span>
          </motion.button>
        </form>

        {/* Small Footer */}
        <p className="font-handwritten text-sm text-[#6B5A57]/70 pt-4 sm:pt-6">
          Made with love, by Armaan.
        </p>
      </div>
    </div>
  );
}
