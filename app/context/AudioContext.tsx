"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Définir un type pour le contexte audio
interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  loading: boolean; // État de chargement
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

let audioInstance: HTMLAudioElement | null = null; // Instance audio partagée

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(true); // Démarre avec isPlaying à true
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    // Créez l'objet Audio uniquement si ce n'est pas déjà fait
    if (!audioInstance) {
      audioInstance = new Audio("/audio/file2-inter.mp3"); // Assurez-vous que le chemin est correct
      audioInstance.loop = true; // Optionnel : boucle l'audio

      // Écoutez l'événement canplaythrough pour savoir quand l'audio est prêt
      audioInstance.addEventListener("canplaythrough", () => {
        if (isPlaying && audioInstance) {
          audioInstance.play().catch((error) => {
            console.error("Erreur lors de la lecture de l'audio :", error);
          });
        }
      });
    }

    // Simulez un chargement (remplacez cela par votre logique de chargement)
    const timer = setTimeout(() => {
      setLoading(false); // Fin du chargement
    }, 2000); // Remplacez 2000 par la durée de votre loader

    return () => {
      clearTimeout(timer); // Nettoyez le timer
      audioInstance?.removeEventListener("canplaythrough", () => {}); // Nettoyez l'écouteur
    };
  }, []); // Exécutez ce useEffect une seule fois lors du montage

  useEffect(() => {
    // Joue ou met en pause la musique en fonction de isPlaying
    if (audioInstance) {
      if (isPlaying) {
        audioInstance.play().catch((error) => {
          console.error("Erreur lors de la lecture de l'audio :", error);
        });
      } else {
        audioInstance.pause();
      }
    }
  }, [isPlaying]); // Ajoutez isPlaying ici

  const toggleAudio = () => {
    setIsPlaying((prev) => {
      const newState = !prev;
      // Enregistrez l'état audio dans localStorage
      localStorage.setItem("isPlaying", String(newState));
      return newState;
    });
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, loading }}>
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
