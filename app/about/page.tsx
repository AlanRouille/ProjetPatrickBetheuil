"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import AudioPlayer from "../_components/AudioPlayer";
import { Header } from "../_components/Header";
import { Section } from "../_components/Section";

export default function AboutPage() {
  // États pour gérer l'animation d'apparition
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ajouter la classe no-scroll quand le composant est monté
    document.body.classList.add("no-scroll");

    // Démarrer l'animation après le montage du composant
    setIsLoaded(true);

    // Supprimer la classe no-scroll quand le composant est démonté
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <Section>
      <Header showLogo={false} />
      <main className="h-screen overflow-hidden flex items-center justify-center">
        <div
          className={`flex flex-col lg:flex-row items-center lg:items-start justify-between max-w-7xl mx-auto p-8 gap-8 transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image à gauche avec animation de fondu */}
          <div
            className={`flex-shrink-0 transform transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
          >
            <Image
              src="/images/l'artiste.jpg"
              alt="Photo de l'artiste"
              width={546}
              height={517}
              className="rounded-md"
            />
          </div>

          {/* Texte à droite avec animation de fondu */}
          <div
            className={`lg:w-1/2 text-left transform transition-all duration-1000 delay-200 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="font-title font-light text-white text-shadow-sm text-6xl mb-16">
              L&apos;artiste
            </h1>
            <p className="font-sans font-normal text-white mb-16 leading-relaxed">
              Patrick Bétheuil, né en 1959 à Neuilly-sur-Seine, a été fortement
              influencé par son grand-père, développant dès son enfance un goût
              pour le travail manuel, notamment à travers la fabrication
              d&apos;objets en bois et de maquettes. Autodidacte, il découvre à
              14 ans une passion pour le dessin abstrait inspiré des paysages
              d&apos;Auvergne. Après un parcours technique et de nombreux
              voyages, il revient au dessin en 2001, avec un style fluide
              rappelant la calligraphie arabe. En 2023, il réalise sa première
              exposition et explore de nouvelles techniques, intégrant des
              encres aquarellables et des matières naturelles sur de grands
              formats.
            </p>
            <div className="flex space-x-4">
              {/* Lien vers le PDF de la Biographie avec animation de fondu */}
              <a
                href="/documents/biographie.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-40 h-9 bg-primary-orange rounded-sm hover:bg-orange-600 text-white py-2 px-4 shadow-lg transform transition-all duration-200 ease-in-out hover:scale-95 hover:shadow-md">
                  Biographie
                </Button>
              </a>

              {/* Nouveau bouton pour un autre PDF avec animation de fondu */}
              <a
                href="/documents/Approche&Technique.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-45 h-9 bg-primary-orange rounded-sm hover:bg-orange-600 text-white py-2 px-4 shadow-lg transform transition-all duration-200 ease-in-out hover:scale-95 hover:shadow-md">
                  Approche et Techniques
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="fixed bottom-4 right-4 text-white z-50">
          <AudioPlayer />
        </div>
      </main>
    </Section>
  );
}
