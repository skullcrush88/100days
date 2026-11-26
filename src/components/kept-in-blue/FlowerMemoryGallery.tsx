"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";

export interface FlowerMemory {
  src: string;
  caption?: string;
  alt: string;
}

// The 4 real bouquet photographs extracted from Armaan's WhatsApp delivery
export const REAL_FLOWER_MEMORIES: FlowerMemory[] = [
  {
    src: "/images/kept-in-blue/memories/real-hydrangeas-1.webp",
    caption: "a little piece of me, with you",
    alt: "The soft blue hydrangeas Armaan sent to Sidrat",
  },
  {
    src: "/images/kept-in-blue/memories/real-hydrangeas-2.webp",
    caption: "your pretty flowers ♡",
    alt: "Sidrat's beautiful blue hydrangeas",
  },
  {
    src: "/images/kept-in-blue/memories/real-hydrangeas-3.webp",
    caption: "our little blue memory",
    alt: "Holding the blue hydrangeas",
  },
  {
    src: "/images/kept-in-blue/memories/real-hydrangeas-4.webp",
    caption: "kept here, forever",
    alt: "The precious blue hydrangeas",
  },
];

interface FlowerMemoryGalleryProps {
  memories?: FlowerMemory[];
}

export default function FlowerMemoryGallery({
  memories = REAL_FLOWER_MEMORIES,
}: FlowerMemoryGalleryProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev - 1 + memories.length) % memories.length : null
        );
      } else if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev + 1) % memories.length : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, memories.length]);

  // If no actual photographs have been added yet, hide empty polaroid slots gracefully
  if (!memories || memories.length === 0) {
    return null;
  }

  const rotations = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

  return (
    <section className="max-w-4xl mx-auto px-4 my-16 text-center select-none">
      {/* Gallery Header */}
      <div className="space-y-2 mb-8">
        <h3 className="font-serif text-3xl md:text-4xl text-[#3A2E2B]">
          For the flowers you wanted to keep.
        </h3>
        <p className="font-serif italic text-sm md:text-base text-[#6B5A57]">
          Now they have a little home of their own. ♡
        </p>
      </div>

      {/* Polaroid Layout: 2 columns on mobile, 4 columns on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-2 pb-6 max-w-4xl mx-auto">
        {memories.map((photo, index) => {
          const rotClass = rotations[index % rotations.length];

          return (
            <motion.div
              key={index}
              whileHover={{ y: -6, scale: 1.03, rotate: 0 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePhotoIndex(index)}
              className={`bg-white p-2.5 sm:p-3.5 pb-5 sm:pb-6 rounded-xl shadow-[0_8px_24px_rgba(70,50,30,0.1)] border border-[#DCC29B]/50 cursor-pointer transition-all duration-300 relative w-full ${rotClass}`}
            >
              {/* Muted Blue / Cream Washi Tape */}
              <div className="washi-tape washi-tape-lavender -top-2.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 opacity-80" />

              {/* Polaroid Photo Frame */}
              <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-[#FBF9F5] mb-2.5 sm:mb-3">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Handwritten Caption */}
              {photo.caption && (
                <div className="flex items-center justify-center space-x-1 pt-1 text-center">
                  <p className="font-handwritten text-base sm:text-lg text-[#493322]">
                    {photo.caption}
                  </p>
                  <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#91AED6] fill-[#91AED6]/30 inline shrink-0" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Under-gallery personal note */}
      <p className="font-handwritten text-xl text-[#6B5A57] pt-2">
        "I'm keeping these here for us, pretty."
      </p>

      {/* Full-Screen Lightbox */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#251B17]/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Button */}
            {memories.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex(
                    (activePhotoIndex - 1 + memories.length) % memories.length
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
                title="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Right Button */}
            {memories.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex((activePhotoIndex + 1) % memories.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
                title="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-xl w-full bg-white p-4 pb-8 rounded-2xl shadow-2xl relative"
            >
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#FAF8F5] mb-4">
                <Image
                  src={memories[activePhotoIndex].src}
                  alt={memories[activePhotoIndex].alt}
                  fill
                  className="object-contain"
                />
              </div>

              {memories[activePhotoIndex].caption && (
                <p className="font-handwritten text-2xl text-center text-[#493322]">
                  {memories[activePhotoIndex].caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
