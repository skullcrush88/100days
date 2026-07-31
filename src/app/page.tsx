"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AtmosphereCanvas from "@/components/AtmosphereCanvas";
import CursorTrail from "@/components/CursorTrail";
import ScrapbookPasswordGate from "@/components/ScrapbookPasswordGate";
import Experience100Days from "@/components/Experience100Days";
import ExperienceGirlfriendsDay from "@/components/ExperienceGirlfriendsDay";
import { Sparkles, Heart } from "lucide-react";

type ActiveExperience = "100days" | "girlfriendsday" | null;

export default function Home() {
  const [activeExp, setActiveExp] = useState<ActiveExperience>(null);
  const [activeGate, setActiveGate] = useState<ActiveExperience>(null);
  
  // Unlocked states
  const [unlockedExperiences, setUnlockedExperiences] = useState<{
    "100days": boolean;
    "girlfriendsday": boolean;
  }>({
    "100days": false,
    "girlfriendsday": false,
  });

  const handleSelectExperience = (exp: "100days" | "girlfriendsday") => {
    if (unlockedExperiences[exp]) {
      setActiveExp(exp);
    } else {
      setActiveGate(exp);
    }
  };

  const handleUnlockSuccess = (exp: "100days" | "girlfriendsday") => {
    setUnlockedExperiences((prev) => ({ ...prev, [exp]: true }));
    setActiveGate(null);
    setActiveExp(exp);
  };

  const handleBackToDashboard = () => {
    setActiveExp(null);
  };

  const dashboardPages = [
    {
      id: "100days" as const,
      title: "100 Days",
      date: "21 April 2026",
      desc: "Celebrating a hundred days of warmth, sleepy calls, and falling in love.",
      status: "Unlocked",
      accent: "from-pink-accent/20 to-lavender-accent/5",
    },
    {
      id: "girlfriendsday" as const,
      title: "Girlfriend's Day",
      date: "01 August 2026", // Girlfriend's Day is celebrated Aug 1st
      desc: "A dedicated scrapbook of letters, footprints, and my favorite thing in the world.",
      status: "Unlocked",
      accent: "from-gold-accent/20 to-pink-accent/5",
    },
    {
      id: "comingsoon" as const,
      title: "A lot more memories...",
      date: "To live together",
      desc: "More special milestones, celebrations, and letters will be written here as our story grows.",
      status: "Locked",
      accent: "from-white/5 to-transparent",
    },
  ];

  return (
    <main className="relative min-h-screen bg-midnight text-foreground selection:bg-pink-accent/20 selection:text-pink-accent overflow-x-hidden">
      {/* Background Atmosphere Layers */}
      <AtmosphereCanvas />
      <CursorTrail />

      <AnimatePresence mode="wait">
        {/* Stage 1: Landing / Relationship Dashboard */}
        {!activeExp && !activeGate && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 1 }}
            className="min-h-screen py-24 px-4 flex flex-col justify-between items-center relative z-20"
          >
            {/* Header / Intro Titles */}
            <div className="w-full max-w-3xl mx-auto text-center mt-12 space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-5xl md:text-7xl text-cream-accent tracking-wide"
              >
                Armaan & Sidrat
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-handwritten text-2xl md:text-3xl text-pink-accent tracking-wider"
              >
                Our little world.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="font-sans text-sm md:text-base text-cream-accent/70 max-w-lg mx-auto leading-relaxed"
              >
                A collection of every memory, every celebration, every letter, and every little piece of us.
              </motion.p>
            </div>

            {/* Scrapbook Pages Dashboard Grid */}
            <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 my-16 px-4">
              {dashboardPages.map((page, index) => {
                const isComingSoon = page.id === "comingsoon";
                
                return (
                  <motion.div
                    key={page.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={!isComingSoon ? { y: -8 } : {}}
                    onClick={() => {
                      if (!isComingSoon) {
                        handleSelectExperience(page.id);
                      }
                    }}
                    className={`glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col justify-between group transition-all duration-500 min-h-[300px] select-none ${
                      isComingSoon
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:border-pink-accent/25 hover:shadow-[0_0_30px_rgba(255,183,197,0.04)]"
                    }`}
                  >
                    {/* Double stitched borders inside card */}
                    <div className="absolute inset-3 rounded-2xl border border-white/[0.02] pointer-events-none" />
                    
                    {/* Soft background glow */}
                    <div className={`absolute -inset-10 bg-gradient-to-tr ${page.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10`} />

                    {/* Magic Sparkle particles on hover */}
                    {!isComingSoon && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-4 h-4 text-gold-accent" />
                        </motion.div>
                      </div>
                    )}

                    {/* Wax Seal / Logo */}
                    <div className="flex justify-between items-start pt-2">
                      <span className="text-[10px] uppercase font-sans text-gold-accent/70 tracking-widest block font-medium">
                        {page.date}
                      </span>
                      {!isComingSoon && (
                        <div className="w-8 h-8 rounded-full bg-pink-accent/10 border border-pink-accent/20 flex items-center justify-center shadow-inner relative group-hover:bg-pink-accent/20 transition-colors">
                          <Heart className="w-3.5 h-3.5 text-pink-accent fill-pink-accent/10" />
                        </div>
                      )}
                    </div>

                    {/* Title and descriptions */}
                    <div className="space-y-4 my-6">
                      <h3 className="font-serif text-2xl md:text-3xl text-cream-accent leading-tight tracking-wide group-hover:text-pink-accent transition-colors">
                        {page.title}
                      </h3>
                      <p className="font-sans text-xs md:text-sm text-cream-accent/60 leading-relaxed">
                        {page.desc}
                      </p>
                    </div>

                    {/* Label/Status Page Bottom */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <span className="font-handwritten text-lg text-cream-accent/50 group-hover:text-cream-accent/90 transition-colors">
                        {isComingSoon ? "Soon" : "Open Journal"}
                      </span>
                      <span className={`text-[10px] uppercase tracking-widest font-sans px-2.5 py-0.5 rounded-full border ${
                        isComingSoon
                          ? "border-white/10 text-white/40"
                          : "border-pink-accent/20 text-pink-accent/80 bg-pink-accent/5"
                      }`}>
                        {page.status}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="text-center pb-6">
              <p className="font-serif text-xs md:text-sm text-cream-accent/40 italic">
                "Every special day we celebrate together will live here forever."
              </p>
            </div>
          </motion.div>
        )}

        {/* Stage 2: Password Gates */}
        {activeGate === "100days" && (
          <ScrapbookPasswordGate
            key="gate-100days"
            title="100 Days"
            hint="The day everything began."
            expectedPasswords={["21042026", "21 April 2026", "21/04/2026", "21-04-2026"]}
            onSuccess={() => handleUnlockSuccess("100days")}
            onBack={() => setActiveGate(null)}
          />
        )}

        {activeGate === "girlfriendsday" && (
          <ScrapbookPasswordGate
            key="gate-girlfriendsday"
            title="Girlfriend's Day"
            hint="when my world started"
            expectedPasswords={["19032006", "19 March 2006", "19/03/2006", "19-03-2006"]}
            onSuccess={() => handleUnlockSuccess("girlfriendsday")}
            onBack={() => setActiveGate(null)}
          />
        )}

        {/* Stage 3: Experience Renders */}
        {activeExp === "100days" && (
          <Experience100Days key="exp-100days" onBack={handleBackToDashboard} />
        )}

        {activeExp === "girlfriendsday" && (
          <ExperienceGirlfriendsDay key="exp-girlfriendsday" onBack={handleBackToDashboard} />
        )}
      </AnimatePresence>
    </main>
  );
}
