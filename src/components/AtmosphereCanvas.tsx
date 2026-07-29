"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
}

interface Firefly {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  phase: number;
  amplitude: number;
  frequency: number;
  alpha: number;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  swingSpeed: number;
  swingPhase: number;
  opacity: number;
}

export default function AtmosphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize arrays
    const stars: Star[] = [];
    const fireflies: Firefly[] = [];
    const petals: Petal[] = [];

    // Densities
    const starCount = Math.floor((width * height) / 9000); // responsive star field density
    const fireflyCount = Math.floor((width * height) / 50000) + 12;
    const petalCount = Math.floor((width * height) / 100000) + 6;

    const starColors = [
      "rgba(232, 93, 117, ", // Soft rose pink
      "rgba(230, 193, 92, ", // Soft gold
      "rgba(154, 127, 184, " // Soft lavender
    ];

    // Populate Stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.6,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        phase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Populate Fireflies
    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -(Math.random() * 0.3 + 0.1), // Drift up
        phase: Math.random() * Math.PI * 2,
        amplitude: Math.random() * 0.8 + 0.2,
        frequency: Math.random() * 0.01 + 0.002,
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    // Populate Petals
    for (let i = 0; i < petalCount; i++) {
      petals.push(createPetal(width, height, true));
    }

    function createPetal(w: number, h: number, init = false): Petal {
      return {
        x: Math.random() * w,
        y: init ? Math.random() * h : -20,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.6 + 0.4, // Fall slow
        speedX: (Math.random() - 0.2) * 0.3, // Slight wind
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        swingSpeed: Math.random() * 0.015 + 0.005,
        swingPhase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.4 + 0.4,
      };
    }

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // Adjust star counts dynamically
      const targetStarCount = Math.floor((width * height) / 9000);
      if (stars.length < targetStarCount) {
        for (let i = stars.length; i < targetStarCount; i++) {
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.8 + 0.6,
            twinkleSpeed: Math.random() * 0.015 + 0.005,
            phase: Math.random() * Math.PI * 2,
            color: starColors[Math.floor(Math.random() * starColors.length)],
          });
        }
      } else if (stars.length > targetStarCount) {
        stars.splice(targetStarCount);
      }
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Twinkling Stars
      stars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const opacity = Math.abs(Math.sin(star.phase)) * 0.5 + 0.1;

        ctx.fillStyle = `${star.color}${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Fireflies
      fireflies.forEach((ff) => {
        ff.phase += ff.frequency;
        ff.x += ff.speedX + Math.sin(ff.phase) * ff.amplitude * 0.1;
        ff.y += ff.speedY;

        // Wrap edges
        if (ff.y < -10) ff.y = height + 10;
        if (ff.x < -10) ff.x = width + 10;
        if (ff.x > width + 10) ff.x = -10;

        // Pulse glow
        const glowOpacity = ff.alpha * (Math.abs(Math.sin(ff.phase)) * 0.5 + 0.5);

        // Radial glow gradient for fireflies
        const gradient = ctx.createRadialGradient(ff.x, ff.y, 0, ff.x, ff.y, ff.size * 6);
        gradient.addColorStop(0, `rgba(230, 193, 92, ${glowOpacity})`); // Gold core
        gradient.addColorStop(0.2, `rgba(255, 183, 197, ${glowOpacity * 0.4})`); // Rose boundary
        gradient.addColorStop(1, "rgba(255, 245, 246, 0)"); // Fades out to background-color-friendly transparent

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ff.x, ff.y, ff.size * 6, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Falling Petals
      petals.forEach((p, idx) => {
        p.y += p.speedY;
        p.swingPhase += p.swingSpeed;
        p.x += p.speedX + Math.sin(p.swingPhase) * 0.3;
        p.rotation += p.rotationSpeed;

        // Recycle if below screen
        if (p.y > height + 20 || p.x < -20 || p.x > width + 20) {
          petals[idx] = createPetal(width, height, false);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        // Draw elegant petal (cherry blossom/rose style shape)
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
        
        const gradient = ctx.createLinearGradient(-p.size, 0, p.size, 0);
        gradient.addColorStop(0, `rgba(255, 183, 197, ${p.opacity})`); // Blush pink
        gradient.addColorStop(1, `rgba(220, 208, 255, ${p.opacity * 0.6})`); // Lavender accent
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Delicate midrib crease line
        ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.25})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(-p.size, 0);
        ctx.lineTo(p.size, 0);
        ctx.stroke();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start loop
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
}
