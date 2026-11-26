"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { ArrowLeft, Heart, Mail, Sparkles } from "lucide-react";

interface ExperienceGirlfriendsDayProps {
  onBack: () => void;
}

export default function ExperienceGirlfriendsDay({ onBack }: ExperienceGirlfriendsDayProps) {
  const [introDone, setIntroDone] = useState(false);
  const [introStep, setIntroStep] = useState(0);

  useEffect(() => {
    // Snappy intro text sequence timings (smooth & responsive)
    const t1 = setTimeout(() => setIntroStep(1), 1600); // Prettiest girl
    const t2 = setTimeout(() => setIntroStep(2), 3400); // Deeply loved
    const t3 = setTimeout(() => setIntroDone(true), 5200); // Reveal scrapbook
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-midnight text-foreground selection:bg-pink-accent/20 selection:text-pink-accent overflow-x-hidden">
      {/* Floating Back Button */}
      <div className="fixed top-6 left-6 z-55">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center space-x-2 py-2 px-4 sm:py-2.5 sm:px-5 bg-midnight/85 border border-white/10 backdrop-blur-md rounded-full text-xs font-sans text-cream-accent/80 hover:text-pink-accent hover:border-pink-accent/40 transition-colors shadow-lg cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Scrapbook</span>
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {!introDone ? (
          /* SECTION 1: MOONLIT ACCEPTANCE INTRO SCENE (Optimized GPU transforms) */
          <motion.div
            key="intro-scene"
            onClick={() => setIntroDone(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-40 bg-[#040508] flex items-center justify-center overflow-hidden cursor-pointer select-none"
          >
            {/* Subtle moon in background */}
            <div className="absolute top-16 right-16 w-32 h-32 rounded-full bg-cream-accent/15 blur-xl pointer-events-none" />

            {/* Hogwarts acceptance floating envelopes */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    left: `${15 + i * 25}%`,
                    animation: `floatUp ${10 + i * 2}s linear infinite`,
                    animationDelay: `${i * 1.5}s`,
                  }}
                  className="absolute bottom-[-10vh] text-cream-accent will-change-transform"
                >
                  <Mail className="w-6 h-6" />
                </div>
              ))}
            </div>

            {/* Flying Silhouette Owl carrying an envelope */}
            <motion.div
              initial={{ x: "115vw", y: "25vh", scale: 0.85 }}
              animate={{ x: "-20vw", y: "15vh", scale: 1.05 }}
              transition={{ duration: 6.5, ease: "easeInOut" }}
              className="absolute pointer-events-none z-10 text-white/35 will-change-transform"
            >
              <svg className="w-20 h-20 sm:w-24 sm:h-24 fill-current" viewBox="0 0 100 100">
                <path d="M 50,30 C 45,30 40,35 40,40 C 40,43 42,47 45,49 L 30,55 L 20,50 L 10,55 L 25,65 L 45,55 C 47,58 50,60 53,60 C 56,60 59,58 61,55 L 81,65 L 96,55 L 86,50 L 76,55 L 61,49 C 64,47 66,43 66,40 C 66,35 61,30 56,30 Z M 53,52 L 53,58 L 50,56 L 47,58 L 47,52" />
                <rect x="47" y="59" width="6" height="4" fill="currentColor" rx="1" />
              </svg>
            </motion.div>

            {/* Center Cinematic text sequences (Hardware-accelerated) */}
            <div className="w-full max-w-xl px-6 text-center z-20 space-y-6">
              <AnimatePresence mode="wait">
                {introStep === 0 && (
                  <motion.h2
                    key="step0"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.7 }}
                    className="font-serif text-3xl sm:text-4xl md:text-6xl text-cream-accent leading-tight tracking-wide"
                  >
                    Happy Girlfriend's Day
                  </motion.h2>
                )}

                {introStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.7 }}
                    className="space-y-4"
                  >
                    <p className="font-serif text-xl sm:text-2xl md:text-3xl text-cream-accent/60 italic font-light">
                      To the prettiest girl,
                    </p>
                    <h3 className="font-serif text-4xl sm:text-5xl md:text-7xl text-gradient font-bold tracking-wide">
                      Sidrat ❤️
                    </h3>
                  </motion.div>
                )}

                {introStep === 2 && (
                  <motion.h2
                    key="step2"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.8 }}
                    className="font-serif text-2xl sm:text-3xl md:text-5xl text-gold-gradient font-light leading-relaxed px-4"
                  >
                    "I hope you never forget how deeply loved you are."
                  </motion.h2>
                )}
              </AnimatePresence>
            </div>

            {/* Tap to skip hint */}
            <p className="absolute bottom-8 font-sans text-[10px] uppercase text-cream-accent/40 tracking-widest px-3 py-1 border border-white/10 rounded-full transition-all">
              Tap anywhere to open scrapbook
            </p>
          </motion.div>
        ) : (
          /* SECTION 2: MAGICAL ENCHANTED SCRAPBOOK PAGE CONTENT */
          <motion.div
            key="scrapbook-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full relative"
          >
            <ReactLenis root>
              {/* Header space */}
              <div className="h-20 sm:h-24" />

              {/* Scrapbook Container */}
              <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16 relative">
                
                {/* 1. VINTAGE SCRAPBOOK CONTAINER */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative rounded-3xl p-6 md:p-12 lg:p-16 overflow-hidden bg-[#0a0c12]/95 border border-white/15 shadow-2xl select-none min-h-[80vh] flex flex-col justify-between"
                  style={{
                    boxShadow: "0 0 50px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(255, 183, 197, 0.02)",
                  }}
                >
                  {/* Stitched borders inside scrapbook */}
                  <div className="absolute inset-4 rounded-2xl border border-dashed border-white/10 pointer-events-none" />
                  
                  {/* Soft ambient warm glows */}
                  <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-[#3d2a1a]/15 blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#3d2a1a]/10 blur-3xl pointer-events-none" />

                  {/* Stitched hearts / flower decorations */}
                  <div className="absolute top-8 left-8 text-pink-accent/15 pointer-events-none -rotate-12">
                    <Heart className="w-8 h-8 fill-current" />
                  </div>
                  
                  <div className="absolute top-12 right-12 text-gold-accent/15 pointer-events-none rotate-12">
                    <Sparkles className="w-6 h-6" />
                  </div>

                  {/* Golden Snitch (Optimized GPU animation) */}
                  <GoldenSnitch />

                  {/* Marauder Footprints walking down (Zero-re-render CSS animation) */}
                  <FootprintTrail />

                  {/* TITLE PAGE */}
                  <div className="space-y-8 sm:space-y-12 relative z-20">
                    {/* Main title */}
                    <div className="text-center md:text-left space-y-3 sm:space-y-4">
                      <span className="text-[10px] uppercase font-sans text-pink-accent tracking-widest block font-semibold">
                        Page One
                      </span>
                      <h2 className="font-serif text-3xl md:text-5xl text-cream-accent tracking-wide hover:text-pink-accent transition-colors duration-500 cursor-default">
                        For My Pretty Girl
                      </h2>
                    </div>

                    {/* Paragraph message */}
                    <div className="space-y-5 sm:space-y-6 max-w-2xl leading-relaxed">
                      <p className="font-handwritten text-2xl md:text-3xl text-cream-accent/80">
                        Happy Girlfriend's Day my love, Sidrat.
                      </p>
                      
                      <p className="font-handwritten text-2xl md:text-3xl text-pink-accent/90">
                        Actually, you're not even my girlfriend... you're my wife ❤️
                      </p>
                      
                      <p className="font-handwritten text-2xl md:text-3xl text-cream-accent/80">
                        Thank you for being my favorite person, my happiest place, and the best part of every single day.
                      </p>

                      <p className="font-handwritten text-2xl md:text-3xl text-cream-accent/80">
                        No matter how many miles separate us, you somehow make me feel closer to home than anyone ever could.
                      </p>

                      <p className="font-handwritten text-2xl md:text-3xl text-cream-accent/80">
                        I hope today reminds you how incredibly special you are, because to me, you'll always be the prettiest, kindest, most lovable girl in the world.
                      </p>
                    </div>
                  </div>

                  {/* Mini bottom decoration */}
                  <div className="mt-12 sm:mt-16 flex justify-between items-end border-t border-white/5 pt-6 z-20 relative">
                    <span className="font-handwritten text-base text-cream-accent/30">
                      Chapter 2 — Girlfriend's Day
                    </span>
                    <Heart className="w-4 h-4 text-pink-accent/40 fill-pink-accent/10" />
                  </div>
                </motion.div>

                {/* 2. THE FOLDOUT ENVELOPE LETTER */}
                <div className="py-16 sm:py-24 relative flex flex-col items-center">
                  <EnvelopeLetter />
                </div>

                {/* 3. INTERACTIVE NOTES */}
                <div className="py-12 sm:py-16">
                  <HiddenNotesSection />
                </div>

                {/* 4. VINTAGE SCROLL ENDING */}
                <div className="pt-16 sm:pt-24 pb-16 text-center space-y-8 sm:space-y-12 relative z-20">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-pink-accent/5 blur-3xl pointer-events-none" />

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <h3 className="font-handwritten text-3xl sm:text-4xl md:text-5xl text-cream-accent">
                      Thank you for being my girlfriend.
                    </h3>
                    <p className="font-handwritten text-2xl sm:text-3xl md:text-4xl text-gradient italic font-semibold leading-relaxed max-w-xl mx-auto">
                      "I'll keep falling in love with you, again and again."
                    </p>
                  </motion.div>

                  <div className="inline-block pt-6">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-gold-accent mb-2">
                      Forever Yours,
                    </p>
                    <p className="font-handwritten text-3xl text-pink-accent font-bold">
                      Armaan ❤️
                    </p>
                  </div>
                </div>
              </div>
            </ReactLenis>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          15% {
            opacity: 0.25;
          }
          85% {
            opacity: 0.25;
          }
          100% {
            transform: translateY(-110vh);
            opacity: 0;
          }
        }
        @keyframes wingFlap {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.25);
          }
        }
        @keyframes footprintFade {
          0%, 100% {
            opacity: 0;
          }
          20%, 45% {
            opacity: 0.75;
          }
          65% {
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}

/* SUB-COMPONENT: GOLDEN SNITCH (High-performance GPU flight & CSS wings) */
function GoldenSnitch() {
  return (
    <motion.div
      initial={{ x: "-5vw", y: "20vh", scale: 0.45 }}
      animate={{
        x: ["-5vw", "90vw", "40vw", "-5vw"],
        y: ["20vh", "12vh", "75vh", "20vh"],
      }}
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute pointer-events-none z-30 flex items-center justify-center will-change-transform"
    >
      {/* Golden core */}
      <div className="w-3.5 h-3.5 rounded-full bg-gold-accent shadow-[0_0_12px_#e6c15c] relative">
        {/* CSS-animated wings (off-main-thread GPU compositing) */}
        <div
          style={{ animation: "wingFlap 0.18s linear infinite" }}
          className="absolute -left-5 top-1/2 -translate-y-1/2 w-5 h-[2px] bg-white/50 origin-right rounded-full"
        />
        <div
          style={{ animation: "wingFlap 0.18s linear infinite" }}
          className="absolute -right-5 top-1/2 -translate-y-1/2 w-5 h-[2px] bg-white/50 origin-left rounded-full"
        />
      </div>
    </motion.div>
  );
}

/* SUB-COMPONENT: MARAUDER MAP FOOTPRINTS (Pure CSS Keyframe Animation, 0 React Re-renders) */
function FootprintTrail() {
  const footprintCoordinates = [
    { x: 30, y: 15, rotate: 10 },
    { x: 42, y: 22, rotate: 20 },
    { x: 55, y: 28, rotate: 15 },
    { x: 68, y: 35, rotate: 30 },
    { x: 74, y: 48, rotate: 45 },
    { x: 62, y: 56, rotate: -20 },
    { x: 48, y: 64, rotate: -35 },
    { x: 32, y: 72, rotate: -15 },
    { x: 26, y: 84, rotate: 5 },
    { x: 38, y: 90, rotate: 25 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none opacity-20 z-10">
      {footprintCoordinates.map((pt, i) => {
        const isLeft = i % 2 === 0;
        return (
          <div
            key={i}
            style={{
              left: `${pt.x}%`,
              top: `${pt.y}%`,
              transform: `rotate(${pt.rotate}deg)`,
              animation: "footprintFade 6s ease-in-out infinite",
              animationDelay: `${i * 0.6}s`,
            }}
            className="absolute text-gold-accent will-change-opacity"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              {isLeft ? (
                <path d="M9.5,4 C9,4 8,4.5 8,6 C8,7 8.5,8.5 8.5,9 C8.5,9.5 7.5,12.5 8.5,15 C9,16.5 10,18.5 10.5,19.5 C11,20.5 11.5,21 11,21.5 C10.5,22 10.5,22.5 11.5,22.5 C12.5,22.5 13,21.5 13,20 C13,18.5 12,16 12,14.5 C12,13 13,9.5 12.5,9 C12,8.5 11.5,8 11.5,7 C11.5,6 10,4 9.5,4 Z" />
              ) : (
                <path d="M14.5,4 C15,4 16,4.5 16,6 C16,7 15.5,8.5 15.5,9 C15.5,9.5 16.5,12.5 15.5,15 C15,16.5 14,18.5 13.5,19.5 C13,20.5 12.5,21 13,21.5 C13.5,22 13.5,22.5 12.5,22.5 C11.5,22.5 11,21.5 11,20 C11,18.5 12,16 12,14.5 C12,13 11,9.5 11.5,9 C12,8.5 12.5,8 12.5,7 C12.5,6 14,4 14.5,4 Z" />
              )}
            </svg>
          </div>
        );
      })}
    </div>
  );
}

/* SUB-COMPONENT: INTERACTIVE WAX-SEALED ENVELOPE (HINDI LETTER) */
function EnvelopeLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-sm flex flex-col items-center">
      <div className="text-center mb-8">
        <span className="text-[10px] uppercase font-sans text-pink-accent tracking-widest block font-medium mb-1">
          Handwritten Letter
        </span>
        <h3 className="font-serif text-2xl text-cream-accent">
          Open the folded envelope
        </h3>
      </div>

      {/* Envelope Outer box */}
      <motion.div
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-[280px] h-[190px] bg-[#121622] rounded-xl border border-white/10 shadow-2xl relative cursor-pointer overflow-hidden flex items-center justify-center group"
      >
        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
        
        {/* Envelope folds drawing via borders */}
        <div className="absolute inset-0 border-t-[95px] border-t-white/[0.01] border-b-[95px] border-b-white/[0.02] border-l-[140px] border-l-white/[0.02] border-r-[140px] border-r-white/[0.01] pointer-events-none" />
        
        {/* Glowing wax seal button in center */}
        <div className="w-12 h-12 rounded-full bg-pink-accent/15 border border-pink-accent/30 flex items-center justify-center shadow-lg hover:bg-pink-accent/35 transition-colors z-20 relative">
          <Heart className="w-5 h-5 text-pink-accent fill-pink-accent/20" />
        </div>
      </motion.div>

      {/* Full-screen paper unfold overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/90 backdrop-blur-md p-4"
          >
            {/* The unfolding parchment paper card */}
            <motion.div
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 30 }}
              transition={{ type: "spring", stiffness: 140, damping: 20 }}
              className="w-full max-w-md p-8 md:p-12 rounded-2xl relative shadow-2xl overflow-hidden bg-[#F4EFE2] border border-[#d3cbb3] select-none text-left"
              style={{
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(139, 90, 43, 0.05)",
              }}
            >
              <div className="absolute inset-3 rounded-xl border border-dashed border-[#d3cbb3]/60 pointer-events-none" />
              
              {/* Envelope close trigger */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 py-1 px-3 bg-black/5 border border-black/10 hover:border-pink-600/40 text-[10px] text-black/60 hover:text-pink-600 rounded-full transition-colors font-sans uppercase tracking-widest cursor-pointer"
              >
                Close
              </button>

              <div className="space-y-6 pt-6">
                <div className="flex items-center space-x-2 text-pink-600">
                  <Heart className="w-4 h-4 fill-current" />
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#8B5A2B]">
                    A Message of Heart
                  </span>
                </div>

                {/* The central folded Hindi quote in deep crimson/ink */}
                <p className="font-handwritten text-2xl sm:text-3xl md:text-4xl text-[#2D2821] leading-relaxed italic">
                  "Pyaar toh bohot log karte hai...
                </p>
                <p className="font-handwritten text-2xl sm:text-3xl md:text-4xl text-[#2D2821] leading-relaxed italic">
                  lekin mere jaisa pyaar koi nahi kar sakta...
                </p>
                <p className="font-handwritten text-2xl sm:text-3xl md:text-4xl text-[#B03A48] font-bold leading-relaxed italic">
                  kyunki kisi ke paas tum jo nahi ho."
                </p>

                {/* Signature */}
                <div className="text-right pt-6">
                  <span className="font-handwritten text-2xl text-[#B03A48] font-bold block">
                    — Armaan ❤️
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* SUB-COMPONENT: INTERACTIVE HIDDEN NOTES DECK */
function HiddenNotesSection() {
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const notes = [
    { id: "note1", icon: "⭐", text: "I still smile when I see your notification." },
    { id: "note2", icon: "🌸", text: "You make ordinary days unforgettable." },
    { id: "note3", icon: "🗝️", text: "You'll forever be my favorite hello." },
    { id: "note4", icon: "♡", text: "I'd choose you in every lifetime." },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="text-center mb-8">
        <span className="text-[10px] uppercase font-sans text-lavender-accent tracking-widest block font-medium mb-1">
          Enchanted Notes
        </span>
        <h3 className="font-serif text-2xl text-cream-accent">
          Hidden Scrapbook Messages
        </h3>
        <p className="font-sans text-[10px] text-cream-accent/40 mt-1">
          Click on the icons to read small messages.
        </p>
      </div>

      {/* Deck grid */}
      <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full max-w-md justify-center">
        {notes.map((n) => (
          <motion.button
            key={n.id}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveNote(n.text)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 border border-white/10 hover:border-pink-accent/35 flex items-center justify-center text-lg sm:text-xl text-gold-accent cursor-pointer shadow-lg transition-colors"
          >
            {n.icon}
          </motion.button>
        ))}
      </div>

      {/* Note modal */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-8 p-6 glass-panel border border-pink-accent/20 rounded-2xl max-w-sm text-center relative"
          >
            <button
              onClick={() => setActiveNote(null)}
              className="absolute right-3 top-3 text-[10px] text-cream-accent/40 hover:text-cream-accent uppercase tracking-widest font-sans cursor-pointer"
            >
              x
            </button>
            <p className="font-handwritten text-2xl text-cream-accent/90 leading-relaxed pr-2 pl-2 pt-2">
              "{activeNote}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
