"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";

// Variable globale pour suivre si le site a déjà été chargé
let hasLoaded = false;

export default function AppLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(!hasLoaded);

  useEffect(() => {
    if (!hasLoaded) {
      const timer = setTimeout(() => {
        setLoading(false);
        hasLoaded = true; // Marque que le loader a été affiché
      }, 3000); // Le loader reste 3 secondes

      return () => clearTimeout(timer);
    } else {
      setLoading(false); // Si déjà chargé, ne pas afficher le loader
    }
  }, []);

  if (loading) {
    return <Loader onFinishLoading={() => setLoading(false)} />;
  }

  return <>{children}</>;
}
