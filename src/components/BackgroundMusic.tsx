"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface BackgroundMusicProps {
  playTriggered: boolean;
}

export default function BackgroundMusic({ playTriggered }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Soft, romantic ambient lofi piano track
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"); // fallback test song, user can replace this easily
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25; // Keep it soft

    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (playTriggered && audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Autoplay prevented:", err));
    }
  }, [playTriggered]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!playTriggered) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center space-x-2 bg-white/80 border border-[#EBE3D5] backdrop-blur-md py-2 px-4 rounded-full shadow-lg">
      {/* Soundwave animation */}
      <div className="flex items-end space-x-0.5 h-3 w-4 mr-2">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`w-[2px] bg-pink-accent rounded-full ${
              isPlaying ? "animate-pulse" : "h-[2px]"
            }`}
            style={{
              height: isPlaying ? "100%" : "2px",
              animationDuration: `${0.5 + bar * 0.15}s`,
            }}
          />
        ))}
      </div>

      <button
        onClick={togglePlay}
        className="p-1.5 rounded-full hover:bg-black/5 text-[#3A2E2B] hover:text-pink-accent transition-colors"
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
      </button>

      <button
        onClick={toggleMute}
        className="p-1.5 rounded-full hover:bg-black/5 text-[#3A2E2B] hover:text-pink-accent transition-colors"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
