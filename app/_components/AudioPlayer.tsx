// app/_components/AudioPlayer.tsx

"use client";

import { AudioLines, Minus } from "lucide-react";
import { useState } from "react";
import { useAudio } from "../context/AudioContext";

const AudioPlayer: React.FC = () => {
  const { isPlaying, toggleAudio } = useAudio();
  const [showAudioText, setShowAudioText] = useState(false);

  const handleClick = () => {
    toggleAudio();
  };

  return (
    <div
      className={`fixed bottom-4 right-1 flex items-center transition-opacity duration-500`}
    >
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
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
        className="w-12 h-12 p flex items-center justify-center rounded-full focus:outline-none transition-all duration-300 relative overflow-hidden"
        onMouseEnter={() => setShowAudioText(true)}
        onMouseLeave={() => setShowAudioText(false)}
        onClick={handleClick}
      >
        {isPlaying ? (
          <AudioLines className="text-white" size={24} />
        ) : (
          <Minus className="text-white" size={24} />
        )}
      </button>
    </div>
  );
};

export default AudioPlayer;
