"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  loading: boolean;
  currentTrack: string;
  changeTrack: (track: string) => void;
  tracks: string[];
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const audioInstances: { [key: string]: HTMLAudioElement } = {};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  // Utilisation de useMemo pour éviter la redéfinition de tracks à chaque rendu
  const tracks: string[] = useMemo(
    () => ["Track13.mp3", "Track12.mp3", "Track15.mp3"],
    []
  );

  useEffect(() => {
    const currentTrack = tracks[currentTrackIndex];

    if (!audioInstances[currentTrack]) {
      audioInstances[currentTrack] = new Audio(`/audio/${currentTrack}`);
      audioInstances[currentTrack].loop = true; // Ne pas boucler ici

      audioInstances[currentTrack].addEventListener("ended", () => {
        // Passer à la piste suivante lorsque la piste actuelle se termine
        const nextTrackIndex = (currentTrackIndex + 1) % tracks.length; // Boucle à travers les pistes
        setCurrentTrackIndex(nextTrackIndex);
      });

      audioInstances[currentTrack].addEventListener("canplaythrough", () => {
        if (isPlaying && audioInstances[currentTrack]) {
          audioInstances[currentTrack].play().catch((error) => {
            console.error("Erreur lors de la lecture de l'audio :", error);
          });
        }
      });
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      audioInstances[currentTrack]?.removeEventListener("ended", () => {});
      audioInstances[currentTrack]?.removeEventListener(
        "canplaythrough",
        () => {}
      );
    };
  }, [isPlaying, currentTrackIndex, tracks]);

  useEffect(() => {
    Object.keys(audioInstances).forEach((track) => {
      if (audioInstances[track]) {
        if (track === tracks[currentTrackIndex] && isPlaying) {
          audioInstances[track].play().catch((error) => {
            console.error("Erreur lors de la lecture de l'audio :", error);
          });
        } else {
          audioInstances[track].pause();
        }
      }
    });
  }, [isPlaying, currentTrackIndex, tracks]);

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev);
  };

  const changeTrack = (track: string) => {
    const trackIndex = tracks.indexOf(track);
    if (trackIndex !== -1) {
      setCurrentTrackIndex(trackIndex);
      if (audioInstances[tracks[currentTrackIndex]]) {
        audioInstances[tracks[currentTrackIndex]].pause();
      }
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        toggleAudio,
        loading,
        currentTrack: tracks[currentTrackIndex],
        changeTrack,
        tracks,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
