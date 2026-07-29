"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function LoveLetter() {
  const paragraphs = [
    "My love,",
    "100 days may not sound like forever. But somehow these hundred days became some of the happiest moments of my life.",
    "Thank you for every sleepy call. Every random conversation. Every smile. Every laugh. Every little moment you gave me.",
    "You became my comfort without ever being beside me. Distance has never changed how much I love you. If anything... it only showed me how real this is.",
    "No matter how many miles separate us, my heart somehow always finds you.",
    "One day... we won't have countdowns anymore. We'll have mornings together. Movie nights together. Random drives together. Real hugs instead of virtual ones.",
    "Until then, I'll keep choosing you. Every single day.",
    "Happy 100 Days.",
    "I love you endlessly.",
    "Forever yours,",
    "Armaan ❤️"
  ];

  return (
    <section className="min-h-screen py-32 px-4 relative flex flex-col justify-center items-center bg-midnight overflow-hidden select-none w-full">
      {/* Soft auroral backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-pink-accent/[0.02] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-lavender-accent/[0.02] blur-3xl pointer-events-none" />

      <div className="w-full max-w-2xl mx-auto relative z-20">
        {/* Letter Card Frame (Lined Notepad Sheet) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backgroundImage: "linear-gradient(rgba(232, 93, 117, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 93, 117, 0.15) 1px, transparent 1px)",
            backgroundSize: "100% 3.2rem, 100% 100%",
            backgroundPosition: "0 0.5rem, 4.5rem 0",
            backgroundColor: "#FDFCF9"
          }}
          className="p-8 md:p-12 lg:p-16 pt-16 md:pt-20 rounded-2xl border border-[#EBE3D5] shadow-[0_20px_50px_rgba(60,40,40,0.08)] relative text-left pl-20 md:pl-24"
        >
          {/* Washi Tape Header Accent */}
          <div className="washi-tape washi-tape-gold w-32 h-6 -top-3 left-1/2 -translate-x-1/2 rotate-1 opacity-90" />

          {/* Letter Content */}
          <div className="space-y-2 relative" style={{ lineHeight: "3.2rem" }}>
            {paragraphs.map((para, idx) => {
              const isFirst = idx === 0;
              const isClosing = idx >= paragraphs.length - 4;
              const isTitle = para === "Happy 100 Days.";

              return (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 1.2, 
                    delay: idx * 0.15, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className={`font-handwritten text-[#3A2E2B]/90 tracking-wide ${
                    isFirst 
                      ? "text-3xl md:text-4xl text-gradient font-bold" 
                      : isTitle 
                      ? "text-3xl md:text-4xl text-pink-accent font-bold pt-4 pb-2" 
                      : isClosing 
                      ? "text-2xl md:text-3xl text-right text-pink-accent font-bold" 
                      : "text-2xl md:text-[25px]"
                  }`}
                  style={{ 
                    lineHeight: isTitle ? "4.5rem" : "3.2rem",
                    marginBottom: isFirst ? "1rem" : "0px"
                  }}
                >
                  {para}
                </motion.p>
              );
            })}
          </div>

          {/* Wax Seal Heart Decoration at Bottom */}
          <div className="mt-12 flex justify-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: 1 }}
              className="w-12 h-12 rounded-full bg-pink-accent/15 border border-pink-accent/30 flex items-center justify-center relative cursor-pointer group shadow-[0_4px_10px_rgba(232,93,117,0.1)]"
            >
              <Heart className="w-5 h-5 text-pink-accent fill-pink-accent/20 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full bg-pink-accent/5 animate-ping -z-10 opacity-70" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
