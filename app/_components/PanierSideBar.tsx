"use client ";

import Image from "next/image";
import { artworkImageAlt } from "@/lib/seo";
import React from "react";
import { usePanier } from "../context/PanierContext";

const PanierSidebar: React.FC = () => {
  const { showPanierSidebar, setShowPanierSidebar, selectedArtwork } =
    usePanier();

  if (!showPanierSidebar) return null; // Si la sidebar n'est pas affichée, ne rien rendre

  return (
    <div className="fixed inset-0 bg-white z-50 p-5 w-full h-full md:w-1/3 md:h-full">
      <button
        onClick={() => setShowPanierSidebar(false)}
        className="absolute top-4 right-4 text-gray-600 text-2xl"
      >
        &times; {/* Icône de fermeture */}
      </button>
      <h2 className="text-xl font-bold mb-4">Détails de l&apos;œuvre</h2>
      {selectedArtwork ? ( // Vérifiez si selectedArtwork est disponible
        <>
          <Image
            src={selectedArtwork.imageUrl}
            alt={artworkImageAlt(selectedArtwork.title)}
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
