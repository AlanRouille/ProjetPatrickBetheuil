"use client";

import React, { createContext, useContext, useState } from "react";

interface Artwork {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
}

interface PanierContextType {
  artworks: Artwork[];
  selectedArtwork: Artwork | null;
  showPanierSidebar: boolean;
  setShowPanierSidebar: (show: boolean) => void;
  addArtwork: (artwork: Artwork) => void;
  removeArtwork: (id: number) => void;
  selectArtwork: (artwork: Artwork) => void;
}

const PanierContext = createContext<PanierContextType | undefined>(undefined);

export const PanierProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showPanierSidebar, setShowPanierSidebar] = useState(false);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const addArtwork = (artwork: Artwork) => {
    const exists = artworks.some((item) => item.id === artwork.id);
    if (!exists) {
      setArtworks((prev) => [...prev, artwork]); // Ajoute l'œuvre au panier si elle n'est pas déjà présente
      setSelectedArtwork(artwork); // Sélectionnez l'œuvre ajoutée
    } else {
      console.log(`L'œuvre ${artwork.title} est déjà dans le panier.`);
    }
  };

  const removeArtwork = (id: number) => {
    setArtworks((prev) => prev.filter((artwork) => artwork.id !== id));
    setSelectedArtwork(null); // Réinitialisez l'œuvre sélectionnée si elle est retirée
  };

  const selectArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork); // Sélectionnez un artwork spécifique
  };

  return (
    <PanierContext.Provider
      value={{
        showPanierSidebar,
        setShowPanierSidebar,
        artworks,
        selectedArtwork,
        addArtwork,
        removeArtwork,
        selectArtwork,
      }}
    >
      {children}
    </PanierContext.Provider>
  );
};

export const usePanier = () => {
  const context = useContext(PanierContext);
  if (!context) {
    throw new Error("usePanier must be used within a PanierProvider");
  }
  return context;
};
