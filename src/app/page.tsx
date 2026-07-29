"use client";

import { useState } from "react";
import { ReactLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import AtmosphereCanvas from "@/components/AtmosphereCanvas";
import CursorTrail from "@/components/CursorTrail";
import EntryGate from "@/components/EntryGate";
import Intro from "@/components/Intro";
import LiveCounter from "@/components/LiveCounter";
import BabyPhotos from "@/components/BabyPhotos";
import Timeline from "@/components/Timeline";
import YouCards from "@/components/YouCards";
import InteractiveQuestion from "@/components/InteractiveQuestion";
import MemoryStars from "@/components/MemoryStars";
import CinematicText from "@/components/CinematicText";
import Envelopes from "@/components/Envelopes";
import LoveLetter from "@/components/LoveLetter";
import Ending from "@/components/Ending";
import BackgroundMusic from "@/components/BackgroundMusic";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(false);
  const [musicTriggered, setMusicTriggered] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setMusicTriggered(true);
  };

  return (
    <main className="relative min-h-screen bg-midnight text-foreground selection:bg-pink-accent/20 selection:text-pink-accent overflow-x-hidden">
      {/* Background Sound controls */}
      <BackgroundMusic playTriggered={musicTriggered} />

      <AnimatePresence mode="wait">
        {/* Stage 1: Password Lock Gate */}
        {!isUnlocked && (
          <EntryGate key="gate" onUnlock={handleUnlock} />
        )}

        {/* Stage 2: Cinematic Intro Sequence */}
        {isUnlocked && !introCompleted && (
          <Intro key="intro" onComplete={() => setIntroCompleted(true)} />
        )}

        {/* Stage 3: The Main Scrolling Experience */}
        {isUnlocked && introCompleted && (
          <motion.div
            key="main-experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full relative"
          >
            {/* Visual Atmosphere Layers */}
            <AtmosphereCanvas />
            <CursorTrail />

            <ReactLenis root>
              {/* 1. Hero / Header Page */}
              <section className="min-h-screen flex flex-col justify-between items-center py-16 px-4 relative text-center">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-pink-accent/5 blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-lavender-accent/5 blur-3xl pointer-events-none" />

                {/* Top spacer */}
                <div className="h-10" />

                {/* Main Heading & Live Count */}
                <div className="space-y-12 z-20">
                  <div className="space-y-4">
                    <motion.span 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 0.8, y: 0 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="text-xs uppercase font-sans text-pink-accent tracking-widest block font-medium"
                    >
                      A Private Gift from Armaan
                    </motion.span>
                    <motion.h1 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.2, delay: 0.4 }}
                      className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream-accent leading-tight tracking-wide"
                    >
                      100 Days of Us
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="font-sans text-xs uppercase tracking-widest text-cream-accent"
                    >
                      For Sidrat, with all my love.
                    </motion.p>
                  </div>

                  <LiveCounter />
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5, y: [0, 8, 0] }}
                  transition={{ 
                    opacity: { duration: 1, delay: 1.2 }, 
                    y: { repeat: Infinity, duration: 2, ease: "easeInOut" } 
                  }}
                  className="flex flex-col items-center space-y-2 z-20 cursor-pointer"
                >
                  <span className="text-[10px] uppercase font-sans tracking-widest text-cream-accent/60">
                    Scroll to begin our story
                  </span>
                  <ChevronDown className="w-4 h-4 text-pink-accent" />
                </motion.div>
              </section>

              {/* 2. Parallax Baby Photos */}
              <BabyPhotos />

              {/* 3. Interactive Glowing Timeline */}
              <Timeline />

              {/* 4. "You" Hover Tilt Cards Grid */}
              <YouCards />

              {/* 5. Interactive Question Selection */}
              <InteractiveQuestion />

              {/* 6. Star Constellation Personal Memories */}
              <MemoryStars />

              {/* 7. Cinematic Statement Blocks */}
              <CinematicText />

              {/* 8. Floating envelopes hidden letters */}
              <Envelopes />

              {/* 10. Handwritten Love Letter */}
              <LoveLetter />

              {/* 11. Final Loop Climax */}
              <Ending />

            </ReactLenis>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
