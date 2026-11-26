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

interface BluePetal {
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
  color: string;
}

interface Firefly {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  phase: number;
  alpha: number;
}

export default function BlueAtmosphereCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars: Star[] = [];
    const petals: BluePetal[] = [];
    const fireflies: Firefly[] = [];

    const starColors = [
      "rgba(143, 174, 215, ", // Hydrangea blue
      "rgba(184, 205, 235, ", // Powder blue
      "rgba(199, 155, 36, ",  // Warm gold sparkle
      "rgba(165, 168, 217, ", // Periwinkle
    ];

    const petalColors = [
      "rgba(184, 205, 235, ", // Powder blue
      "rgba(143, 174, 215, ", // Hydrangea blue
      "rgba(165, 168, 217, ", // Soft dusty periwinkle
      "rgba(215, 230, 250, ", // Pale mist blue
    ];

    const starCount = Math.floor((width * height) / 12000);
    const petalCount = Math.min(18, Math.max(8, Math.floor(width / 90)));
    const fireflyCount = Math.min(15, Math.floor(width / 120));

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.6,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        phase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Initialize floating blue hydrangea petals
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 9 + 7,
        speedY: Math.random() * 0.5 + 0.35,
        speedX: Math.random() * 0.4 - 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.8,
        swingSpeed: Math.random() * 0.012 + 0.006,
        swingPhase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.35 + 0.25,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    // Initialize golden fireflies / warm motes
    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const drawPetal = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      opacity: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);

      ctx.beginPath();
      // Hydrangea floret petal shape: rounded floret petal
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.7, -size * 0.8, size * 0.8, size * 0.3, 0, size);
      ctx.bezierCurveTo(-size * 0.8, size * 0.3, -size * 0.7, -size * 0.8, 0, -size);

      ctx.fillStyle = `${color}${opacity})`;
      ctx.fill();

      // Delicate petal vein
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.6);
      ctx.lineTo(0, size * 0.6);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.35})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Stars / Soft Twinkles
      stars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const currentAlpha = 0.15 + (Math.sin(star.phase) + 1) * 0.25;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${currentAlpha})`;
        ctx.fill();
      });

      // Render Fireflies / Warm Motes
      fireflies.forEach((f) => {
        f.x += f.speedX;
        f.y += f.speedY;
        f.phase += 0.02;

        if (f.x < -10) f.x = width + 10;
        if (f.x > width + 10) f.x = -10;
        if (f.y < -10) f.y = height + 10;
        if (f.y > height + 10) f.y = -10;

        const currentAlpha = f.alpha * (0.5 + 0.5 * Math.sin(f.phase));

        const glow = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 3);
        glow.addColorStop(0, `rgba(199, 155, 36, ${currentAlpha * 0.8})`);
        glow.addColorStop(1, "rgba(199, 155, 36, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.swingPhase += p.swingSpeed;
        p.x += Math.sin(p.swingPhase) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        drawPetal(p.x, p.y, p.size, p.rotation, p.color, p.opacity);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}
