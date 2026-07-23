"use client";

import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface PanierArtwork {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
}

interface PanierContextType {
  artworks: PanierArtwork[];
  selectedArtwork: PanierArtwork | null;
  showPanierSidebar: boolean;
  setShowPanierSidebar: (show: boolean) => void;
  addArtwork: (artwork: PanierArtwork) => void;
  removeArtwork: (id: number) => void;
  selectArtwork: (artwork: PanierArtwork) => void;
}

const PanierContext = createContext<PanierContextType | undefined>(undefined);
const panierStorageKey = "patrick-betheuil-panier";

export function PanierProvider({ children }: PropsWithChildren) {
  const [showPanierSidebar, setShowPanierSidebar] = useState(false);
  const [artworks, setArtworks] = useState<PanierArtwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] =
    useState<PanierArtwork | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedPanier = window.localStorage.getItem(panierStorageKey);
      if (storedPanier) {
        const parsedPanier: unknown = JSON.parse(storedPanier);
        if (Array.isArray(parsedPanier)) {
          const validArtworks = parsedPanier.filter(
            (item): item is PanierArtwork =>
              typeof item === "object" &&
              item !== null &&
              typeof item.id === "number" &&
              typeof item.title === "string" &&
              typeof item.imageUrl === "string" &&
              typeof item.price === "number"
          );
          setArtworks(validArtworks);
        }
      }
    } catch (error) {
      console.error("Impossible de restaurer le panier :", error);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      window.localStorage.setItem(panierStorageKey, JSON.stringify(artworks));
    } catch (error) {
      console.error("Impossible d’enregistrer le panier :", error);
    }
  }, [artworks, hasHydrated]);

  const addArtwork = useCallback((artwork: PanierArtwork) => {
    setArtworks((currentArtworks) =>
      currentArtworks.some((item) => item.id === artwork.id)
        ? currentArtworks
        : [...currentArtworks, artwork]
    );
    setSelectedArtwork(artwork);
  }, []);

  const removeArtwork = useCallback((id: number) => {
    setArtworks((prev) => prev.filter((artwork) => artwork.id !== id));
    setSelectedArtwork((currentArtwork) =>
      currentArtwork?.id === id ? null : currentArtwork
    );
  }, []);

  const selectArtwork = useCallback((artwork: PanierArtwork) => {
    setSelectedArtwork(artwork);
  }, []);

  const value = useMemo(
    () => ({
      showPanierSidebar,
      setShowPanierSidebar,
      artworks,
      selectedArtwork,
      addArtwork,
      removeArtwork,
      selectArtwork,
    }),
    [
      addArtwork,
      artworks,
      removeArtwork,
      selectedArtwork,
      selectArtwork,
      showPanierSidebar,
    ]
  );

  return (
    <PanierContext.Provider value={value}>{children}</PanierContext.Provider>
  );
}

export function usePanier() {
  const context = useContext(PanierContext);
  if (!context) {
    throw new Error("usePanier must be used within a PanierProvider");
  }
  return context;
}
