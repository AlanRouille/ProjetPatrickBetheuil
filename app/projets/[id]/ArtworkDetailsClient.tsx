"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AudioPlayer from "../../_components/AudioPlayer";
import PanierModal from "../../_components/PanierModal";
import ShareModal from "../../_components/ShareModal";
import { useModal } from "../../context/ModalContext";
import { usePanier } from "../../context/PanierContext";

interface ArtworkDetailsProps {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  isSoldOut: boolean;
}

export default function ArtworkDetailsClient({
  artwork,
}: {
  artwork: ArtworkDetailsProps;
}) {
  const { showModal, setShowModal } = useModal();
  const { addArtwork, setShowPanierSidebar } = usePanier();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleAddToPanier = () => {
    if (artwork.isSoldOut) {
      alert("Cette œuvre est déjà vendue.");
      return;
    }
    addArtwork({
      id: artwork.id,
      title: artwork.title,
      price: artwork.price,
      imageUrl: artwork.imageUrl,
    });
    setShowPanierSidebar(true);
    console.log(`Article ajouté: ${artwork.title}`);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-grow justify-center items-center z-10 pt-15">
      <div
        className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center text-white p-8 space-y-8 md:space-y-0 md:space-x-16 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        }`}
      >
        <div className="relative w-full max-w-[566px] h-auto">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            layout="responsive"
            width={566}
            height={516}
            objectFit="contain"
            className="shadow-lg"
          />
        </div>

        <div className="md:w-1/2 text-left">
          <h2 className="text-6xl font-title font-light text-shadow-sm">
            {artwork.title}{" "}
          </h2>
          <p className="text-3xl font-sans font-thin mt-5 text-white text-shadow-sm">
            {artwork.price.toFixed(2)}€
          </p>
          <button
            onClick={handleAddToPanier}
            className={`rounded-sm text-shadow-sm text-1xl uppercase text-white font-normal mt-5 transition transform duration-200 ease-in-out w-[247px] h-[32px] 
                      ${
                        artwork.isSoldOut
                          ? "bg-orange-700 cursor-not-allowed"
                          : "bg-primary-orange hover:bg-orange-600 hover:scale-95 hover:shadow-sm active:scale-90 active:shadow-none"
                      }`}
            disabled={artwork.isSoldOut}
          >
            {artwork.isSoldOut ? "Sold Out" : "Ajouter au panier"}
          </button>
          <p className="mt-8 font-sans font-normal leading-relaxed text-white text-shadow-sm">
            {artwork.description}
          </p>
        </div>
      </div>
      <ShareModal showModal={showModal} setShowModal={setShowModal} />
      <PanierModal />
      <div className=" fixed bottom-4 right-4 text-white z-50">
        <AudioPlayer />
      </div>
    </div>
  );
}
