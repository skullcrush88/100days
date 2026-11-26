"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ReactLenis } from "lenis/react";
import confetti from "canvas-confetti";
import BlueAtmosphereCanvas from "@/components/kept-in-blue/BlueAtmosphereCanvas";
import HydrangeaGarden from "@/components/kept-in-blue/HydrangeaGarden";
import FlowerMemoryGallery from "@/components/kept-in-blue/FlowerMemoryGallery";
import CursorTrail from "@/components/CursorTrail";
import { ArrowLeft, ArrowDown, Heart } from "lucide-react";

interface ExperienceKeptInBlueProps {
  onBack: () => void;
}

const GARDEN_MESSAGES = [
  "A flower for my favorite girl.",
  "Wish I could hug you right now.",
  "You're prettier than every flower here.",
  "Somewhere far away, I'm thinking of you.",
  "One day, we'll have a real garden together.",
  "I love you, Sidrat.",
  "Another little flower, another little piece of my heart.",
  "If I were there, I'd put this one in your hair.",
  "I wish I could see you smile right now.",
  "Until I can bring you real flowers myself.",
  "Even a whole garden wouldn't be as pretty as you.",
  "Forever growing, just like my love for you.",
];

const GARDEN_STORAGE_KEY = "keptInBlue_garden_flowers_v2";

export default function ExperienceKeptInBlue({ onBack }: ExperienceKeptInBlueProps) {
  // Garden state with LocalStorage persistence (starts from 0)
  const [gardenCount, setGardenCount] = useState<number>(0);
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(-1);
  const [newlyAddedIndex, setNewlyAddedIndex] = useState<number | null>(null);

  // Load persistence (guaranteed clean reset to 0)
  useEffect(() => {
    try {
      // Clear legacy dev test counts if present so garden starts completely fresh at 0
      localStorage.removeItem("keptInBlue_garden_flowers");
      localStorage.removeItem("keptInBlue_garden_flowers_v1");

      const savedCount = localStorage.getItem(GARDEN_STORAGE_KEY);
      if (savedCount !== null) {
        const parsed = parseInt(savedCount, 10);
        if (!isNaN(parsed) && parsed >= 0) {
          setGardenCount(parsed);
          if (parsed > 0) {
            setCurrentNoteIndex((parsed - 1) % GARDEN_MESSAGES.length);
          }
        }
      } else {
        setGardenCount(0);
        setCurrentNoteIndex(-1);
      }
    } catch {
      // LocalStorage access safe fallback
    }
  }, []);

  // Grow a flower in the garden
  const handleGrowFlower = () => {
    const nextCount = gardenCount + 1;
    setGardenCount(nextCount);
    try {
      localStorage.setItem(GARDEN_STORAGE_KEY, nextCount.toString());
    } catch {
      // Safe fallback
    }

    setCurrentNoteIndex((nextCount - 1) % GARDEN_MESSAGES.length);

    const targetFlowerIndex = nextCount <= 15 ? nextCount - 1 : (nextCount - 1) % 15;
    setNewlyAddedIndex(targetFlowerIndex);

    confetti({
      particleCount: 28,
      spread: 60,
      origin: { y: 0.72, x: 0.5 },
      colors: ["#8fa9d5", "#e0eafa", "#c4d4ec", "#f4edcb"],
    });

    setTimeout(() => {
      setNewlyAddedIndex(null);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#FBF7F0] text-[#3E2718] selection:bg-[#B8CDEB]/35 selection:text-[#251B17] overflow-x-hidden font-sans">
      {/* Background Soft Atmospheric Canvas & Cursor Trail */}
      <BlueAtmosphereCanvas />
      <CursorTrail />

      {/* Floating Back to Dashboard Button */}
      <div className="fixed top-6 left-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center space-x-2 py-2 px-4 bg-[#FBF7F0]/90 border border-[#CBB089]/70 backdrop-blur-md rounded-full text-xs font-sans text-[#4A3222] hover:text-[#20150E] hover:border-[#8FAED7] hover:bg-white shadow-[0_2px_10px_rgba(70,50,30,0.08)] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#8FAED7]" />
          <span className="tracking-wide">Back to our world</span>
        </motion.button>
      </div>

      <ReactLenis root>
        <div className="w-full relative z-20 pb-28">
          {/* Top spacing to comfortably clear fixed back button on mobile */}
          <div className="h-20 sm:h-24" />

          {/* ============================================================ */}
          {/* 1. LAYERED PHYSICAL COMPOSITION — THE ANTIQUE PARCHMENT LETTER */}
          {/* ============================================================ */}
          <section className="max-w-3xl mx-auto px-3 sm:px-4 pt-2 sm:pt-4 pb-12 select-text relative">
            <div className="relative flex items-center justify-center">
              {/* Layer 1: Antique Kraft Envelope behind the letter, slightly rotated */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
                animate={{ opacity: 0.85, scale: 1, rotate: -2.5 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute -top-6 -left-2 sm:-left-4 md:-left-6 w-64 sm:w-72 md:w-96 h-48 sm:h-56 md:h-72 pointer-events-none -z-10 drop-shadow-xl"
              >
                <Image
                  src="/images/kept-in-blue/vintage-envelope.png"
                  alt="Vintage antique envelope"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Layer 2: Main Antique Parchment Letter with slide-in animation */}
              <motion.div
                initial={{ opacity: 0, y: 35, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-2xl relative rounded-sm p-6 sm:p-10 md:p-16 select-text overflow-hidden"
                style={{
                  boxShadow:
                    "0 25px 60px rgba(50, 35, 20, 0.22), 0 8px 20px rgba(70, 45, 25, 0.12), inset 0 0 50px rgba(110, 75, 40, 0.22)",
                  filter: "drop-shadow(0 15px 35px rgba(60, 40, 20, 0.15))",
                }}
              >
                {/* Genuine high-resolution aged parchment background texture */}
                <div className="absolute inset-0 -z-10">
                  <Image
                    src="/images/kept-in-blue/parchment-texture.webp"
                    alt="Authentic antique parchment paper texture"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  {/* Subtle warm sepia tint overlay */}
                  <div className="absolute inset-0 bg-[#E8D4B4]/20 mix-blend-multiply pointer-events-none" />
                </div>

                {/* Subtle natural deckled irregular edges border */}
                <div className="absolute inset-2 border border-[#9E7A52]/30 pointer-events-none rounded-sm" />

                {/* Top Left: Faded powder-blue satin silk ribbon bow */}
                <div className="absolute -top-3 -left-2 sm:-top-4 sm:-left-3 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 pointer-events-none select-none drop-shadow-md z-20 rotate-[-15deg]">
                  <Image
                    src="/images/kept-in-blue/blue-ribbon.png"
                    alt="Powder-blue satin silk ribbon bow"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Top Right: Matching powder-blue satin silk ribbon bow */}
                <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-3 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 pointer-events-none select-none drop-shadow-md z-20 rotate-[15deg] scale-x-[-1]">
                  <Image
                    src="/images/kept-in-blue/blue-ribbon.png"
                    alt="Powder-blue satin silk ribbon bow"
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Magical details: Golden stars, crescent moon, and faint footprints */}
                <div className="flex justify-between items-center pb-4 pt-2 text-[#8A6A45] opacity-80 text-xs select-none px-6 md:px-8">
                  <span className="font-serif italic tracking-widest text-[#9C794C]">
                    ✦ ☾ ✦
                  </span>
                  <span className="text-[10px] tracking-widest uppercase font-serif text-[#782F3B] opacity-75">
                    🐾 🐾 🐾
                  </span>
                </div>

                {/* Letter Heading */}
                <div className="pb-5 pt-1 border-b border-[#9E7A52]/40 text-left">
                  <h1 className="font-handwritten text-3xl sm:text-4xl md:text-5xl text-[#2E1A0F] tracking-wide leading-tight">
                    For my pretty girl, Sidrat.
                  </h1>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-[#8A6A45] to-transparent rounded-full mt-2" />
                </div>

                {/* EXACT Letter Body in Dark Chocolate-Brown Ink */}
                <div className="font-handwritten text-xl sm:text-2xl text-[#3A2214] leading-relaxed space-y-5 my-6 text-left">
                  <p>My pretty girl,</p>

                  <p>
                    I know you were really sad seeing your flowers fade away, and
                    I wish I could've been there to hold you and tell you it's
                    okay. I wish flowers could stay just as beautiful forever,
                    especially when they're something I sent to you with so much
                    love.
                  </p>

                  <p>
                    But I want you to know that even though the flowers are no
                    longer the same, the memory of them will always be ours. I still
                    love the thought of you having a little piece of me there with
                    you, something you could look at and smile at, knowing that
                    somewhere far away, I was thinking of you and wanting to make
                    you happy.
                  </p>

                  <p>
                    And someday, my love, I won't have to send you flowers from
                    miles away. I'll get to bring them myself, hand them to you,
                    watch you smile, and hug you for as long as I want.
                  </p>

                  <p>
                    Until then, every flower I send you carries a little bit of my
                    heart.
                  </p>

                  <p className="font-semibold text-[#24130A]">
                    I love you, Sidrat. 🩵
                  </p>

                  {/* Personal Handwritten Signature with Hand-Drawn Heart */}
                  <div className="pt-3 flex items-center space-x-2">
                    <span className="font-handwritten text-2xl sm:text-3xl font-semibold text-[#24130A]">
                      — Armaan
                    </span>
                    <Heart className="w-4 h-4 text-[#782F3B] fill-[#782F3B]/30 inline-block" />
                  </div>
                </div>

                {/* Handwritten Postscript at the Bottom of Parchment */}
                <div className="pt-5 border-t border-[#9E7A52]/40 flex flex-col items-center justify-center text-center space-y-2">
                  <p className="font-handwritten text-lg sm:text-xl text-[#523A26] italic">
                    P.S. I made you a little garden downstairs. These flowers aren't going anywhere. ♡
                  </p>
                  <div className="text-[#8FAED7] animate-bounce pt-1">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 2. REAL FLOWER MEMORIES — SCRAPBOOK PHOTO GALLERY            */}
          {/* ============================================================ */}
          <FlowerMemoryGallery />

          {/* ============================================================ */}
          {/* 3. THE INTERACTIVE HYDRANGEA GARDEN                          */}
          {/* ============================================================ */}
          <section className="max-w-2xl mx-auto px-4 my-16 select-none">
            <div className="bg-[#FFFDFB] rounded-3xl p-6 md:p-8 border border-[#DCC29B]/55 shadow-[0_12px_40px_rgba(70,50,30,0.08)] text-center relative overflow-hidden">
              {/* Paper stitches */}
              <div className="absolute inset-3 rounded-2xl border border-dashed border-[#DCC29B]/40 pointer-events-none" />

              {/* Centered Heading & Subtitle */}
              <div className="max-w-lg mx-auto space-y-1.5 mb-3 relative z-10">
                <h2 className="font-serif text-3xl md:text-4xl text-[#3A2E2B]">
                  A little garden, just for you.
                </h2>
                <p className="font-serif italic text-sm md:text-base text-[#6B5A57]">
                  For the days you miss me a little extra.
                </p>
                <p className="font-handwritten text-base md:text-lg text-[#8FAED7]">
                  These ones won't fade, pretty. ♡
                </p>
              </div>

              {/* Preserved Procedural SVG Botanical Garden */}
              <div className="relative z-10 py-1">
                <HydrangeaGarden
                  flowerCount={gardenCount}
                  newlyAddedIndex={newlyAddedIndex}
                />
              </div>

              {/* Rotating Handwritten Love Note */}
              <div className="min-h-[2.5rem] flex items-center justify-center my-3 relative z-10 px-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentNoteIndex}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="font-handwritten text-xl md:text-2xl text-[#31486B]"
                  >
                    {currentNoteIndex >= 0
                      ? `"${GARDEN_MESSAGES[currentNoteIndex]}"`
                      : '"A little patch of grass waiting for our first flower..."'}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Grow Button */}
              <div className="relative z-10 pt-1 pb-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGrowFlower}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#8fa9d5] to-[#A5A8D9] text-white font-sans text-sm md:text-base font-medium shadow-[0_6px_20px_rgba(143,169,213,0.3)] hover:shadow-[0_8px_25px_rgba(143,169,213,0.4)] transition-all inline-flex items-center space-x-2 cursor-pointer"
                >
                  <span>Grow me a flower 🩵</span>
                </motion.button>
              </div>

              {/* Counter */}
              <p className="font-handwritten text-xl text-[#3A2E2B]/80 pt-1 relative z-10">
                Armaan's little garden for Sidrat —{" "}
                <span className="font-bold text-[#31486B]">
                  {gardenCount}
                </span>{" "}
                flowers and counting.
              </p>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 4. CLOSING SECTION — SINGLE MEANINGFUL SENTENCE ON PARCHMENT  */}
          {/* ============================================================ */}
          <section className="max-w-lg mx-auto px-4 my-20 text-center select-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative p-8 sm:p-10 rounded-sm shadow-[0_16px_40px_rgba(70,50,30,0.16)] border border-[#CBB089]/60 text-center overflow-hidden"
              style={{
                boxShadow:
                  "0 18px 45px rgba(60, 40, 25, 0.18), inset 0 0 35px rgba(120, 80, 45, 0.2)",
              }}
            >
              {/* Authentic Aged Brown Parchment Texture */}
              <div className="absolute inset-0 -z-10">
                <Image
                  src="/images/kept-in-blue/parchment-texture.webp"
                  alt="Aged parchment texture"
                  fill
                  className="object-cover object-bottom"
                />
                <div className="absolute inset-0 bg-[#EEDBC0]/25 mix-blend-multiply pointer-events-none" />
              </div>

              {/* Deckled Edge Inset Line */}
              <div className="absolute inset-2 border border-[#9E7A52]/35 pointer-events-none rounded-sm" />

              {/* Exact Single Sentence in Beautiful Handwritten Typography */}
              <p className="font-handwritten text-2xl sm:text-3xl text-[#3A2214] leading-relaxed pt-2">
                "I couldn't make your flowers last forever, so I made you a little garden that could."
              </p>

              {/* Tiny Pressed Blue Hydrangea Underneath */}
              <div className="flex justify-center items-center pt-5 pb-1">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 drop-shadow-sm"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="translate(12, 12)">
                    {[0, 90, 180, 270].map((angle) => (
                      <ellipse
                        key={angle}
                        cx="0"
                        cy="-4.8"
                        rx="3.8"
                        ry="5.2"
                        transform={`rotate(${angle})`}
                        fill="#8fa9d5"
                        stroke="#c4d4ec"
                        strokeWidth="0.6"
                      />
                    ))}
                    <circle r="1.6" fill="#f4edcb" />
                  </g>
                </svg>
              </div>

              {/* Subtle Return Link */}
              <div className="pt-6">
                <button
                  onClick={onBack}
                  className="font-handwritten text-base text-[#64472F] hover:text-[#24130A] transition-colors cursor-pointer underline decoration-[#8FAED7]/70 underline-offset-4"
                >
                  Back to our little world ♡
                </button>
              </div>
            </motion.div>
          </section>
        </div>
      </ReactLenis>
    </div>
  );
}
