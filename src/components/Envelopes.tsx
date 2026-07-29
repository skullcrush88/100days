"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen, X, Heart } from "lucide-react";

interface Note {
  id: number;
  message: string;
  sender: string;
  top: string;
  left: string;
  rotation: number;
}

export default function Envelopes() {
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  const notes: Note[] = [
    {
      id: 1,
      message: "You are my first thought in the morning and my last dream at night. Even across all these miles, you are my absolute favorite place to be. I love you.",
      sender: "Armaan",
      top: "22%",
      left: "20%",
      rotation: -10,
    },
    {
      id: 2,
      message: "Distance only shows us how strong our bond is. No matter the miles, our hearts beat in the exact same rhythm. I'm counting down the days until I can hold you for real.",
      sender: "Armaan",
      top: "45%",
      left: "78%",
      rotation: 8,
    },
    {
      id: 3,
      message: "100 days of laughing, yapping, sharing sleepy calls, and falling more in love with you. I promise to keep choosing you, every single day, forever.",
      sender: "Armaan",
      top: "72%",
      left: "25%",
      rotation: -5,
    },
  ];

  return (
    <section className="h-[90vh] py-24 px-4 relative flex flex-col justify-between items-center bg-midnight overflow-hidden select-none w-full">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-pink-accent/[0.03] blur-3xl pointer-events-none" />

      <div className="text-center z-20">
        <span className="text-xs uppercase font-sans text-pink-accent tracking-widest block mb-3 font-semibold">
          Secret Notes
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-cream-accent">
          Letters in the Wind
        </h2>
        <p className="font-sans text-xs text-[#3A2E2B]/60 mt-2 font-medium">
          Click on the floating envelopes to read hidden letters.
        </p>
      </div>

      {/* Floating Space Container styled like a scrapbook section */}
      <div className="relative w-full h-[60vh] max-w-4xl mx-auto border border-[#EBE3D5] bg-white/35 backdrop-blur-xs rounded-3xl overflow-hidden mt-8 shadow-inner">
        <div className="absolute inset-0 bg-grain opacity-15 pointer-events-none" />

        {notes.map((note) => {
          const isOpen = activeNote?.id === note.id;

          return (
            <div
              key={note.id}
              style={{ top: note.top, left: note.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <motion.button
                whileHover={{ scale: 1.15, rotate: note.rotation + (note.id % 2 === 0 ? 5 : -5) }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5 + (note.id % 2) * 1.5,
                  ease: "easeInOut",
                  delay: note.id * 0.3,
                }}
                onClick={() => setActiveNote(note)}
                className={`p-4 rounded-full border shadow-lg flex items-center justify-center relative cursor-pointer transition-all duration-300 ${
                  isOpen
                    ? "bg-pink-accent border-pink-accent text-white"
                    : "bg-white/80 border-[#EBE3D5] text-gold-accent hover:border-pink-accent hover:text-pink-accent"
                }`}
              >
                {isOpen ? <MailOpen className="w-6 h-6" /> : <Mail className="w-6 h-6" />}
                
                {/* Little heart badge */}
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-accent flex items-center justify-center border border-background">
                  <Heart className="w-2.5 h-2.5 text-white fill-white" />
                </div>
              </motion.button>
            </div>
          );
        })}

        {/* Modal Overlay / Paper Journal Note */}
        <AnimatePresence>
          {activeNote && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ rotate: "-1.5deg" }}
              className="absolute inset-x-6 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[400px] bg-[#FCF9F6] border border-pink-accent/25 rounded-3xl p-8 pt-10 z-30 shadow-2xl overflow-hidden"
            >
              {/* Washi Tape Header Decor */}
              <div className="washi-tape washi-tape-pink w-24 h-5 -top-2.5 left-1/2 -translate-x-1/2 -rotate-1 opacity-90" />

              {/* Close Button */}
              <button
                onClick={() => setActiveNote(null)}
                className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-black/5 text-[#3A2E2B]/50 hover:text-[#3A2E2B] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-pink-accent fill-pink-accent/10" />
                  <span className="text-[10px] uppercase font-sans tracking-widest text-[#C79B24] font-semibold">
                    Letter Note #{activeNote.id}
                  </span>
                </div>

                <p className="font-handwritten text-2xl text-[#3A2E2B] leading-relaxed">
                  "{activeNote.message}"
                </p>

                <div className="text-right">
                  <span className="font-handwritten text-2xl text-pink-accent font-semibold">
                    — {activeNote.sender} ❤️
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
