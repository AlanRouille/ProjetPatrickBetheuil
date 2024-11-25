"use client"; // Indique que ce composant est un composant client

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AudioPlayer from "../_components/AudioPlayer";

// Déclarez un type pour les projets
interface Projet {
  id: number;
  title: string;
  imageUrl: string;
  isSoldOut: boolean;
}

export default function ProjetPageClient({ projets }: { projets: Projet[] }) {
  const [showCards, setShowCards] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Définir un délai pour déclencher l'apparition des cartes après le chargement de la page
    setTimeout(() => {
      setShowCards(true);
    }, 200);
  }, []);

  // Fonction pour scroller vers le haut
  const scrollUp = () => {
    window.scrollBy({ top: -450, behavior: "smooth" });
  };

  // Fonction pour scroller vers le bas
  const scrollDown = () => {
    window.scrollBy({ top: 450, behavior: "smooth" });
  };

  // Fonction pour gérer l'effet 3D sur le mouvement de la souris
  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      const { left, top, width, height } = card.getBoundingClientRect();
      const xRotation = ((e.clientY - top) / height - 0.5) * 25;
      const yRotation = ((e.clientX - left) / width - 0.5) * -25;
      card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    }
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
      card.style.transition = "transform 0.8s ease-out";
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Flèche haut (défilement vers le haut) */}
      <button
        onClick={scrollUp}
        className="fixed left-3 top-72 transform translate-y-1/2 z-10 p-4 ml-24 bg-opacity-50 hover:bg-opacity-80 transition-transform duration-300 hover:scale-125 hover:-translate-y-3"
      >
        <Image
          src="/images/Arrow-gauche.svg"
          alt="Flèche haut"
          width={16}
          height={16}
        />
      </button>

      {/* Grille de projets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-14 gap-y-14 px-4 scroll-smooth mb-12 mt-20 ">
        {projets.map((projet, index) => (
          <div
            key={projet.id}
            className={`group relative text-center transition-all duration-700 ease-in-out ${
              showCards
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Link href={`/projets/${projet.id}`}>
              <div
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="cursor-pointer shadow-lg card relative w-full h-[200px] md:w-[400px] md:h-[300px] lg:w-[518px] lg:h-[306px] mx-auto overflow-hidden transition-transform duration-500 ease-in-out transform group-hover:scale-90 "
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <Image
                  src={projet.imageUrl}
                  alt={projet.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 ease-in-out"
                />
                {projet.isSoldOut && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold">
                    Sold Out
                  </div>
                )}
              </div>
            </Link>

            <h2 className="text-2xl font-sans font-thin text-shadow-sm text-white mt-8 transition-all duration-500 ease-in-out">
              {projet.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Flèche bas (défilement vers le bas) */}
      <button
        onClick={scrollDown}
        className="fixed right-3 top-72 transform -translate-y-1/2 z-10 p-4 mt-24 mr-24 bg-opacity-50 hover:bg-opacity-80 transition-transform duration-300 hover:scale-125 hover:translate-y-1"
      >
        <Image
          src="/images/Arrow-droite.svg"
          alt="Flèche bas"
          width={16}
          height={16}
        />
      </button>
      <div className="fixed bottom-4 right-4 text-white">
        <AudioPlayer />
      </div>
    </div>
  );
}
