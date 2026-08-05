"use client";

import Image from "next/image";
import Link from "next/link";
import { artworkImageAlt } from "@/lib/seo";
import { useEffect, useRef, useState } from "react";

interface Projet {
  id: number;
  title: string;
  slug: string;
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
    <section
      data-header-theme="light"
      className="relative flex min-h-screen flex-col items-center justify-center bg-pb-black pb-20 pt-36 text-pb-white md:pt-44"
    >
      <h1 className="sr-only">
        Peintures intuitives originales de Patrick Betheuil
      </h1>
      <p className="sr-only">
        Découvrez une collection de peintures contemporaines originales : des
        œuvres uniques, entre peinture abstraite, matière et émotion, à explorer
        pour choisir un tableau contemporain qui vous ressemble.
      </p>
      <div className="relative mx-auto flex w-full">
        <div className="mx-auto mb-12 grid w-full max-w-[1180px] grid-cols-1 gap-y-16 px-5 scroll-smooth sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 sm:px-8 md:gap-x-10 md:px-10 lg:gap-x-14 lg:px-0">
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
              <Link href={`/projets/${projet.slug}`}>
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="card relative mx-auto aspect-[5/4] w-full cursor-pointer overflow-hidden shadow-lg transition-transform duration-500 ease-in-out group-hover:scale-[0.98] lg:h-[400px] lg:w-[500px] lg:aspect-auto"
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <Image
                    src={projet.imageUrl}
                    alt={artworkImageAlt(projet.title)}
                    fill
                    loading={index < 4 ? "eager" : "lazy"}
                    sizes="(min-width: 1024px) 500px, (min-width: 640px) calc(50vw - 3rem), calc(100vw - 2.5rem)"
                    className="object-cover transition-transform duration-500 ease-in-out"
                  />
                  {projet.isSoldOut && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold">
                      Sold Out
                    </div>
                  )}
                </div>
              </Link>

              <h2 className="mt-5 font-sans text-xl font-thin text-white text-shadow-sm transition-all duration-500 ease-in-out sm:mt-6 sm:text-[1.35rem] md:text-2xl lg:mt-8">
                {projet.title}
              </h2>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjetPageClient;
