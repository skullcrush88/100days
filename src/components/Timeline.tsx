"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Heart, Sparkles, MessageCircle, Moon, Calendar } from "lucide-react";

interface Milestone {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth out scroll progress using spring physics
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const milestones: Milestone[] = [
    {
      date: "21 April 2026",
      title: "The First Hello",
      description: "A simple message that quietly rewrote our entire universe. The day everything began.",
      icon: <Calendar className="w-5 h-5 text-pink-accent" />,
    },
    {
      date: "May 2026",
      title: "Late-night Conversations",
      description: "Hours melted away into seconds. We fell in love with each other's minds before anything else.",
      icon: <MessageCircle className="w-5 h-5 text-lavender-accent" />,
    },
    {
      date: "June 2026",
      title: "Missing Each Other",
      description: "The painful yet beautiful realization that even across miles, your presence was my only home.",
      icon: <Moon className="w-5 h-5 text-gold-accent" />,
    },
    {
      date: "July 2026",
      title: "Falling in Love",
      description: "No doubts, no hesitation. Just two hearts choosing each other, day after day, in spite of distance.",
      icon: <Heart className="w-5 h-5 text-pink-accent fill-pink-accent/20" />,
    },
    {
      date: "Today",
      title: "100 Days Together",
      description: "100 days of holding your hand in my thoughts, hearing your laugh, and knowing you're my safest place. Forever to go.",
      icon: <Sparkles className="w-5 h-5 text-gold-accent" />,
    },
  ];

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen py-32 px-4 relative bg-midnight select-none"
    >
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-pink-accent/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-lavender-accent/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center mb-24">
        <span className="text-xs uppercase font-sans text-pink-accent tracking-widest block mb-3 font-semibold">
          Our Journey
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-cream-accent">
          How We Got Here
        </h2>
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Soft Sepia Timeline Connector Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-pink-accent/15 -translate-x-1/2" />

        {/* Scroll-Linked Active Glowing Path */}
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-pink-accent via-lavender-accent to-gold-accent -translate-x-1/2 shadow-[0_0_10px_rgba(232,93,117,0.3)] z-20"
        />

        {/* Milestones list */}
        <div className="space-y-16 md:space-y-24">
          {milestones.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row relative items-start md:items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Node Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-30">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.1 }}
                    className="w-10 h-10 rounded-full bg-background border border-pink-accent/30 flex items-center justify-center shadow-md relative group-hover:border-pink-accent/50 transition-colors"
                  >
                    {item.icon}
                    {/* Glowing outer ring */}
                    <div className="absolute -inset-1 rounded-full bg-pink-accent/10 blur-xs -z-10 animate-pulse" />
                  </motion.div>
                </div>

                {/* Milestone Content Card */}
                <div className="w-full md:w-[45%] pl-16 md:pl-0">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-panel glass-panel-hover p-6 md:p-8 rounded-2xl relative border transition-all duration-500"
                  >
                    {/* Tiny connector pointer (desktop only) */}
                    <div 
                      className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-[#FFF]/70 border-t border-l border-pink-accent/15 ${
                        isEven 
                          ? "-left-1.5 border-r border-b border-t-0 border-l-0" 
                          : "-right-1.5 border-t border-l border-r-0 border-b-0"
                      }`} 
                    />

                    <span className="text-xs font-sans font-semibold text-gold-accent tracking-widest uppercase">
                      {item.date}
                    </span>
                    <h3 className="font-serif text-xl text-[#3A2E2B] mt-2 tracking-wide font-bold">
                      {item.title}
                    </h3>
                    <p className="font-handwritten text-2xl text-[#3A2E2B]/85 leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer for structure alignment (desktop only) */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
