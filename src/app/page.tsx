"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AtmosphereCanvas from "@/components/AtmosphereCanvas";
import CursorTrail from "@/components/CursorTrail";
import ScrapbookPasswordGate from "@/components/ScrapbookPasswordGate";
import KeptInBluePasswordGate from "@/components/kept-in-blue/KeptInBluePasswordGate";
import Experience100Days from "@/components/Experience100Days";
import ExperienceGirlfriendsDay from "@/components/ExperienceGirlfriendsDay";
import ExperienceKeptInBlue from "@/components/ExperienceKeptInBlue";
import { Sparkles, Heart } from "lucide-react";

type ActiveExperience = "100days" | "girlfriendsday" | "keptinblue" | null;

export default function Home() {
  const [activeExp, setActiveExp] = useState<ActiveExperience>(null);
  const [activeGate, setActiveGate] = useState<ActiveExperience>(null);

  // Unlocked states initialized with sessionStorage persistence so session remains unlocked
  const [unlockedExperiences, setUnlockedExperiences] = useState<{
    "100days": boolean;
    "girlfriendsday": boolean;
    "keptinblue": boolean;
  }>({
    "100days": false,
    "girlfriendsday": false,
    "keptinblue": false,
  });

  useEffect(() => {
    try {
      const s100 = sessionStorage.getItem("unlocked_100days") === "true";
      const sgd = sessionStorage.getItem("unlocked_girlfriendsday") === "true";
      const skb = sessionStorage.getItem("unlocked_keptinblue") === "true";
      setUnlockedExperiences({
        "100days": s100,
        "girlfriendsday": sgd,
        "keptinblue": skb,
      });
    } catch {
      // Safe fallback
    }
  }, []);

  const handleSelectExperience = (exp: "100days" | "girlfriendsday" | "keptinblue") => {
    if (unlockedExperiences[exp]) {
      setActiveExp(exp);
    } else {
      setActiveGate(exp);
    }
  };

  const handleUnlockSuccess = (exp: "100days" | "girlfriendsday" | "keptinblue") => {
    setUnlockedExperiences((prev) => ({ ...prev, [exp]: true }));
    try {
      sessionStorage.setItem(`unlocked_${exp}`, "true");
    } catch {
      // Safe fallback
    }
    setActiveGate(null);
    setActiveExp(exp);
  };

  const handleBackToDashboard = () => {
    setActiveExp(null);
  };

  const dashboardPages = [
    {
      id: "100days" as const,
      eyebrow: "21 APRIL 2026",
      title: "100 Days",
      desc: "Celebrating a hundred days of warmth, sleepy calls, and falling in love.",
      status: "Unlocked",
      action: "Open Journal",
      accent: "from-pink-accent/20 to-lavender-accent/5",
      isBlue: false,
    },
    {
      id: "girlfriendsday" as const,
      eyebrow: "01 AUGUST 2026",
      title: "Girlfriend's Day",
      desc: "A dedicated scrapbook of letters, footprints, and my favorite thing in the world.",
      status: "Unlocked",
      action: "Open Journal",
      accent: "from-gold-accent/20 to-pink-accent/5",
      isBlue: false,
    },
    {
      id: "keptinblue" as const,
      eyebrow: "A MEMORY IN BLUE",
      title: "Kept in Blue",
      desc: "For the flowers that found their way to you, and the little memory we'll keep forever.",
      status: "FOREVER OURS",
      action: "Open Journal",
      accent: "from-[#8FAED7]/25 via-[#B8CDEB]/15 to-transparent",
      isBlue: true,
    },
    {
      id: "comingsoon" as const,
      eyebrow: "TO LIVE TOGETHER",
      title: "A lot more memories...",
      desc: "More special milestones, celebrations, and letters will be written here as our story grows.",
      status: "Locked",
      action: "Soon",
      accent: "from-white/5 to-transparent",
      isBlue: false,
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

            {/* Scrapbook Pages Dashboard Grid (Responsive 4-card grid) */}
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-16 px-4">
              {dashboardPages.map((page, index) => {
                const isComingSoon = page.id === "comingsoon";
                const isBlue = page.isBlue;

                return (
                  <motion.div
                    key={page.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 + index * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={!isComingSoon ? { y: -8 } : {}}
                    onClick={() => {
                      if (!isComingSoon) {
                        handleSelectExperience(page.id);
                      }
                    }}
                    className={`glass-panel p-6 rounded-3xl border relative overflow-hidden flex flex-col justify-between group transition-all duration-500 min-h-[340px] select-none ${
                      isComingSoon
                        ? "opacity-50 cursor-not-allowed border-white/5"
                        : isBlue
                        ? "cursor-pointer border-[#B8CDEB]/30 hover:border-[#8FAED7] hover:shadow-[0_0_35px_rgba(143,174,215,0.18)]"
                        : "cursor-pointer border-white/5 hover:border-pink-accent/25 hover:shadow-[0_0_30px_rgba(255,183,197,0.04)]"
                    }`}
                  >
                    {/* Double stitched borders inside card */}
                    <div
                      className={`absolute inset-3 rounded-2xl border pointer-events-none ${
                        isBlue ? "border-[#B8CDEB]/20" : "border-white/[0.02]"
                      }`}
                    />

                    {/* Soft background glow */}
                    <div
                      className={`absolute -inset-10 bg-gradient-to-tr ${page.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl -z-10`}
                    />

                    {/* Floating Illustrated Blue Hydrangea Flowers (always on mobile, on-hover on desktop) */}
                    {isBlue && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 z-10">
                        {[0, 1, 2, 3].map((pIdx) => (
                          <motion.div
                            key={pIdx}
                            initial={{ y: 220, opacity: 0, x: 25 + pIdx * 45, rotate: pIdx * 25 }}
                            animate={{
                              y: [160, -30],
                              opacity: [0, 0.9, 0],
                              x: [
                                25 + pIdx * 45,
                                30 + pIdx * 40 + (pIdx % 2 === 0 ? 18 : -18),
                              ],
                              rotate: [pIdx * 25, pIdx * 25 + 120],
                            }}
                            transition={{
                              duration: 2.6 + pIdx * 0.4,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: pIdx * 0.3,
                            }}
                            className="absolute w-5 h-5 drop-shadow-sm"
                          >
                            {/* Delicate 4-petal Blue Hydrangea Flower Shape */}
                            <svg
                              viewBox="0 0 24 24"
                              className="w-full h-full"
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
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Magic Sparkle particles on hover */}
                    {!isComingSoon && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles
                            className={`w-4 h-4 ${
                              isBlue ? "text-[#8FAED7]" : "text-gold-accent"
                            }`}
                          />
                        </motion.div>
                      </div>
                    )}

                    {/* Wax Seal / Botanical Logo */}
                    <div className="flex justify-between items-start pt-2">
                      <span
                        className={`text-[10px] uppercase font-sans tracking-widest block font-medium ${
                          isBlue ? "text-[#8FAED7]" : "text-gold-accent/70"
                        }`}
                      >
                        {page.eyebrow}
                      </span>
                      {!isComingSoon && (
                        <div
                          className={`w-8 h-8 rounded-full border flex items-center justify-center shadow-inner relative transition-colors ${
                            isBlue
                              ? "bg-[#B8CDEB]/15 border-[#8FAED7]/30 group-hover:bg-[#B8CDEB]/25"
                              : "bg-pink-accent/10 border-pink-accent/20 group-hover:bg-pink-accent/20"
                          }`}
                        >
                          {isBlue ? (
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4 drop-shadow-sm"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g transform="translate(12, 12)">
                                {[0, 90, 180, 270].map((angle) => (
                                  <ellipse
                                    key={angle}
                                    cx="0"
                                    cy="-4.4"
                                    rx="3.4"
                                    ry="4.6"
                                    transform={`rotate(${angle})`}
                                    fill="#8fa9d5"
                                    stroke="#c4d4ec"
                                    strokeWidth="0.5"
                                  />
                                ))}
                                <circle r="1.4" fill="#f4edcb" />
                              </g>
                            </svg>
                          ) : (
                            <Heart className="w-3.5 h-3.5 text-pink-accent fill-pink-accent/10" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Title and descriptions */}
                    <div className="space-y-3 my-6">
                      <h3
                        className={`font-serif text-2xl md:text-3xl text-cream-accent leading-tight tracking-wide transition-colors ${
                          isBlue
                            ? "group-hover:text-[#31486B]"
                            : "group-hover:text-pink-accent"
                        }`}
                      >
                        {page.title}
                      </h3>
                      <p className="font-sans text-xs md:text-sm text-cream-accent/60 leading-relaxed">
                        {page.desc}
                      </p>
                    </div>

                    {/* Label/Status Page Bottom */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <span className="font-handwritten text-lg text-cream-accent/50 group-hover:text-cream-accent/90 transition-colors">
                        {page.action}
                      </span>
                      <span
                        className={`text-[10px] uppercase tracking-widest font-sans px-2.5 py-0.5 rounded-full border ${
                          isComingSoon
                            ? "border-white/10 text-white/40"
                            : isBlue
                            ? "border-[#8FAED7]/30 text-[#31486B] bg-[#B8CDEB]/15 font-semibold"
                            : "border-pink-accent/20 text-pink-accent/80 bg-pink-accent/5"
                        }`}
                      >
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
            hint="The day everything began (DD/MM/YYYY)"
            expectedPasswords={[
              "21042026",
              "21 April 2026",
              "21/04/2026",
              "21-04-2026",
              "21.04.2026",
              "21st April 2026",
              "21 April",
              "April 21",
              "April 21 2026",
              "2104",
              "210426",
            ]}
            onSuccess={() => handleUnlockSuccess("100days")}
            onBack={() => setActiveGate(null)}
          />
        )}

        {activeGate === "girlfriendsday" && (
          <ScrapbookPasswordGate
            key="gate-girlfriendsday"
            title="Girlfriend's Day"
            hint="When my world started ♡"
            expectedPasswords={[
              // Sidrat's birthday ("When my world started")
              "19032006",
              "19 March 2006",
              "19/03/2006",
              "19-03-2006",
              "19.03.2006",
              "19th March 2006",
              "19 March",
              "March 19",
              "March 19 2006",
              "1903",
              "190306",
              // Girlfriend's Day date (from the card: 01 AUGUST 2026)
              "01082026",
              "1082026",
              "01/08/2026",
              "1/08/2026",
              "01-08-2026",
              "1-08-2026",
              "01.08.2026",
              "1.08.2026",
              "01 August 2026",
              "1 August 2026",
              "1st August 2026",
              "August 1 2026",
              "01 August",
              "1 August",
              "August 1",
              "0108",
              "108",
            ]}
            onSuccess={() => handleUnlockSuccess("girlfriendsday")}
            onBack={() => setActiveGate(null)}
          />
        )}

        {activeGate === "keptinblue" && (
          <KeptInBluePasswordGate
            key="gate-keptinblue"
            onSuccess={() => handleUnlockSuccess("keptinblue")}
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

        {activeExp === "keptinblue" && (
          <ExperienceKeptInBlue key="exp-keptinblue" onBack={handleBackToDashboard} />
        )}
      </AnimatePresence>
    </main>
  );
}
