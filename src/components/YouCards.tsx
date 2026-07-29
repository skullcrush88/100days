"use client";

import { MouseEvent, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface CardData {
  text: string;
  tag: string;
}

const cards: CardData[] = [
  { text: "You make every ordinary day feel exciting.", tag: "Excitement" },
  { text: "You make distance feel smaller.", tag: "Connection" },
  { text: "You somehow fix my mood without even trying.", tag: "Comfort" },
  { text: "You're the prettiest girl I've ever known.", tag: "Adoration" },
  { text: "Your sleepy voice is my favorite sound.", tag: "Intimacy" },
  { text: "You turned a screen into home.", tag: "Belonging" },
];

function FloatingCard({ card, index }: { card: CardData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth 3D tilt
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  // Spotlight hover effect position
  const spotlightX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Base rotation representing imperfect physical pasting
  const baseRotations = [-2.5, 1.8, -1.2, 2.2, -1.5, 2.8];
  const baseRotation = baseRotations[index % baseRotations.length];

  const floatDelay = index * 0.15;

  // Alternating tape style classes
  const tapeColors = ["washi-tape-pink", "washi-tape-lavender", "washi-tape-gold"];
  const tapeColorClass = tapeColors[index % tapeColors.length];
  const tapeRotation = baseRotation * -0.8; // tilt tape slightly in opposite direction of card

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-[1000px] w-full pt-4"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, rotateZ: baseRotation }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        className="glass-panel w-full h-full min-h-[190px] p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between group cursor-default transition-all duration-300 hover:border-pink-accent/40 hover:shadow-[0_12px_24px_rgba(232,93,117,0.06)]"
      >
        {/* Washi Tape Decor at Top */}
        <div className={`washi-tape ${tapeColorClass} w-24 h-5 -top-2.5 left-1/2 -translate-x-1/2 opacity-85`} style={{ transform: `translateX(-50%) rotate(${tapeRotation}deg)` }} />

        {/* Subtle texture grid background within each card */}
        <div className="absolute inset-0 bg-grain opacity-10 pointer-events-none" />

        {/* Soft highlight */}
        <motion.div
          className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 120px at ${spotlightX.get()} ${spotlightY.get()}, rgba(232, 93, 117, 0.05), transparent)`,
          }}
        />

        <span className="text-[10px] uppercase font-sans text-gold-accent font-semibold tracking-widest block">
          {card.tag}
        </span>

        <p className="font-handwritten text-2xl text-[#3A2E2B]/90 leading-relaxed my-3">
          {card.text}
        </p>

        <div className="flex justify-end items-center">
          <span className="text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500 text-pink-accent/80 font-serif">
            ♡
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function YouCards() {
  return (
    <section className="min-h-screen py-32 px-4 relative flex flex-col justify-center items-center bg-midnight overflow-hidden">
      {/* Background glowing elements */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-pink-accent/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-lavender-accent/[0.03] blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto flex flex-col space-y-16">
        <div className="text-center md:text-left">
          <span className="text-xs uppercase font-sans text-pink-accent tracking-widest block mb-3 font-semibold">
            What makes you, you
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-cream-accent tracking-wide">
            You.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {cards.map((card, idx) => (
            <FloatingCard key={idx} card={card} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
