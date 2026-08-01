"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  loading: boolean;
  currentTrack: string;
  changeTrack: (track: string) => void;
  tracks: string[];
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AUDIO_DISABLED_PATHS = [
  "/admin",
  "/mentions-legales",
  "/politique-confidentialite",
  "/cgv",
];

export function AudioProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const audioEnabled = !AUDIO_DISABLED_PATHS.some(
    (path) => pathname === path || pathname?.startsWith(`${path}/`)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wantsPlaybackRef = useRef(true);

  const tracks = useMemo(
    () => ["Track13.mp3", "Track12.mp3", "Track15.mp3"],
    []
  );

  const playCurrentTrack = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    wantsPlaybackRef.current = true;

    try {
      await audio.play();
      setAutoplayBlocked(false);
    } catch {
      setIsPlaying(false);
      setAutoplayBlocked(true);
    }
  }, []);

  useEffect(() => {
    if (!audioEnabled) {
      setIsPlaying(false);
      setLoading(false);
      return;
    }

    const audio = new Audio(`/audio/${tracks[0]}`);
    audio.preload = "auto";
    audio.volume = 0.45;
    audioRef.current = audio;

    const handlePlay = () => {
      setIsPlaying(true);
      setAutoplayBlocked(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleCanPlay = () => setLoading(false);
    const handleEnded = () => {
      setCurrentTrackIndex((index) => (index + 1) % tracks.length);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("ended", handleEnded);

    void playCurrentTrack();

    const loadingFallback = window.setTimeout(() => setLoading(false), 2000);

    return () => {
      window.clearTimeout(loadingFallback);
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
      audioRef.current = null;
    };
  }, [audioEnabled, playCurrentTrack, tracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const nextSource = `/audio/${tracks[currentTrackIndex]}`;
    const absoluteSource = new URL(nextSource, window.location.origin).href;

    if (audio.src !== absoluteSource) {
      audio.src = nextSource;
      audio.load();

      if (wantsPlaybackRef.current) {
        void playCurrentTrack();
      }
    }
  }, [currentTrackIndex, playCurrentTrack, tracks]);

  useEffect(() => {
    if (!audioEnabled || !autoplayBlocked) return;

    const unlockAudio = (event: Event) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest("[data-audio-control]")
      ) {
        return;
      }

      void playCurrentTrack();
    };

    document.addEventListener("pointerdown", unlockAudio, true);
    document.addEventListener("touchstart", unlockAudio, {
      capture: true,
      passive: true,
    });
    document.addEventListener("wheel", unlockAudio, {
      capture: true,
      passive: true,
    });
    document.addEventListener("keydown", unlockAudio, true);

    return () => {
      document.removeEventListener("pointerdown", unlockAudio, true);
      document.removeEventListener("touchstart", unlockAudio, true);
      document.removeEventListener("wheel", unlockAudio, true);
      document.removeEventListener("keydown", unlockAudio, true);
    };
  }, [audioEnabled, autoplayBlocked, playCurrentTrack]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      wantsPlaybackRef.current = false;
      setAutoplayBlocked(false);
      audio.pause();
      return;
    }

    void playCurrentTrack();
  };

  const changeTrack = (track: string) => {
    const trackIndex = tracks.indexOf(track);
    if (trackIndex !== -1) {
      setCurrentTrackIndex(trackIndex);
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
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
