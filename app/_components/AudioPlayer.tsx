// app/_components/AudioPlayer.tsx

"use client";

import { AudioLines, Minus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAudio } from "../context/AudioContext";
import { usePanier } from "../context/PanierContext";

const AUDIO_DISABLED_PATHS = [
  "/admin",
  "/mentions-legales",
  "/politique-confidentialite",
  "/cgv",
];

const AudioPlayer = () => {
  const pathname = usePathname();
  const { isPlaying, toggleAudio } = useAudio();
  const { showPanierSidebar } = usePanier();
  const [showAudioText, setShowAudioText] = useState(false);

  const handleClick = () => {
    setShowAudioText(false);
    toggleAudio();
  };

  const audioDisabled = AUDIO_DISABLED_PATHS.some(
    (path) => pathname === path || pathname?.startsWith(`${path}/`)
  );

  if (audioDisabled || showPanierSidebar) {
    return null;
  }

  return (
    <div
      className="fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-[80] flex items-center transition-opacity duration-500 md:bottom-[5.5rem] md:right-7"
    >
      <div
        className={`hidden overflow-hidden transition-all duration-500 ease-in-out sm:block ${
          showAudioText ? "w-[80px]" : "w-0"
        }`}
      >
        <span
          className={`font-sans text-white whitespace-nowrap transition-all duration-500 ease-in-out ${
            showAudioText
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          {isPlaying ? "Audio On" : "Audio Off"}
        </span>
      </div>
      <button
        data-audio-control
        type="button"
        aria-label={isPlaying ? "Couper la musique" : "Activer la musique"}
        aria-pressed={isPlaying}
        className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-pb-black/75 shadow-sm backdrop-blur-sm transition-all duration-300 focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent md:h-12 md:w-12"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") {
            setShowAudioText(true);
          }
        }}
        onPointerLeave={() => setShowAudioText(false)}
        onPointerDown={() => setShowAudioText(false)}
        onClick={handleClick}
      >
        {isPlaying ? (
          <AudioLines className="h-[18px] w-[18px] text-white md:h-6 md:w-6" />
        ) : (
          <Minus className="h-[18px] w-[18px] text-white md:h-6 md:w-6" />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
