"use client ";

import Image from "next/image";
import React from "react";
import { usePanier } from "../context/PanierContext";

const PanierSidebar: React.FC = () => {
  const { showPanierSidebar, setShowPanierSidebar, selectedArtwork } =
    usePanier();

  if (!showPanierSidebar) return null; // Si la sidebar n'est pas affichée, ne rien rendre

  return (
    <div className="fixed right-0 top-0 w-1/3 h-full bg-white shadow-lg p-5 z-50">
      <button
        onClick={() => setShowPanierSidebar(false)}
        className="absolute top-2 right-2"
      >
        &times; {/* Icône de fermeture */}
      </button>
      <h2 className="text-xl font-bold">Détails de l&apos;œuvre</h2>
      {selectedArtwork ? ( // Vérifiez si selectedArtwork est disponible
        <>
          <Image
            src={selectedArtwork.imageUrl}
            alt={selectedArtwork.title}
            className="w-full h-auto mt-2"
            width={50}
            height={50}
          />
          <h3 className="text-lg font-semibold mt-2">
            {selectedArtwork.title}
          </h3>
          <p className="text-lg mt-1">{selectedArtwork.price.toFixed(2)}€</p>
        </>
      ) : (
        <p>Aucune œuvre sélectionnée.</p> // Message si aucune œuvre n'est disponible
      )}
    </div>
  );
};

export default PanierSidebar;
