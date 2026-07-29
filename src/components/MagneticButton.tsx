"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current || disabled) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    
    // Middle of the button coordinates
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Distance between mouse and button center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Apply scaling factor for gentle pull (max 15px travel)
    const pullFactor = 0.35;
    setPosition({ x: distanceX * pullFactor, y: distanceY * pullFactor });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.button
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        {children}
      </motion.button>
    </div>
  );
}
