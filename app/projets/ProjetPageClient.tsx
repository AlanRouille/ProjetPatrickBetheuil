"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AudioPlayer from "../_components/AudioPlayer";

interface Projet {
  id: number;
  title: string;
  imageUrl: string;
  isSoldOut: boolean;
}

export const ProjetPageClient = ({ projets }: { projets: Projet[] }) => {
  const [showCards, setShowCards] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setShowCards(true);
    }, 200);
  }, []);

  const scrollUp = () => {
    window.scrollBy({ top: -450, behavior: "smooth" });
  };

  const scrollDown = () => {
    window.scrollBy({ top: 450, behavior: "smooth" });
  };

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
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-20">
      <div className="flex w-full mx-auto relative">
        {/* Flèche haut */}
        <button
          onClick={scrollUp}
          className="hidden md:block fixed left-4 lg:left-28 top-1/2 transform -translate-y-1/2 transition-transform duration-300 hover:scale-125 z-10"
        >
          <Image
            src="/images/Arrow-gauche.svg"
            alt="Flèche gauche"
            width={16} // Taille ajustée pour écrans larges
            height={16}
          />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 lg:gap-x-14 md:gap-x-0 gap-y-14 px-6 lg:px-20 scroll-smooth mb-12 mx-auto">
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
                  className="cursor-pointer shadow-lg card relative w-full h-[150px] md:w-[300px] md:h-[200px] lg:w-[500px] lg:h-[400px] mx-auto overflow-hidden transition-transform duration-500 ease-in-out transform group-hover:scale-90"
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

        {/* Flèche bas */}
        <button
          onClick={scrollDown}
          className="hidden md:block fixed right-4 lg:right-28 top-1/2 transform -translate-y-1/2 transition-transform duration-300 hover:scale-125 z-10"
        >
          <Image
            src="/images/Arrow-droite.svg"
            alt="Flèche droite"
            width={16} // Taille ajustée pour écrans larges
            height={16}
          />
        </button>
      </div>

      <div className="fixed bottom-4 right-4 text-white">
        <AudioPlayer />
      </div>
    </div>
  );
};

export default ProjetPageClient;
