"use client";

import { gsap } from "gsap"; // Importer GSAP
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Header } from "./_components/Header"; // Assurez-vous que le chemin est correct
import Logo from "./_components/icons/Logo.svg";
import Loader from "./_components/Loader"; // Assurez-vous que le chemin est correct

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false); // État pour contrôler la visibilité

  // Références pour les éléments à animer
  const logoRef = useRef<HTMLDivElement | null>(null);
  const invitationRef = useRef<HTMLSpanElement | null>(null);
  const projectsLinkRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      localStorage.setItem("hasVisited", "true");
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000); // Ajustez ce délai selon vos besoins

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      // Animer le logo avec rotation lente
      gsap.fromTo(
        logoRef.current,
        { rotation: 0 },
        { rotation: 360, duration: 60, repeat: -1, ease: "none" } // Durée augmentée à 10 secondes
      );

      // Animer le texte "Invitation à mon imaginaire"
      gsap.fromTo(
        invitationRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5 }
      );

      // Animer le lien "Voir tous les Projets"
      gsap.fromTo(
        projectsLinkRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 1 }
      );
    }
  }, [loading]);

  if (loading) {
    return <Loader onFinishLoading={() => setLoading(false)} />;
  }

  return (
    <main className="min-h-screen text-white">
      <Header showLogo={false} />

      <div className="flex flex-col items-center my-8 md:my-16 justify-center">
        <Link href="/projets" passHref>
          <span
            ref={projectsLinkRef}
            className="relative inline-block text-white mb-4 font-title font-light uppercase cursor-pointer text-sm md:text-lg lg:text-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Voir tous les Projets
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gray-500 opacity-40"></span>
            <span
              className={`absolute left-0 bottom-0 w-full h-[1px] bg-white transition-all duration-500 origin-left transform ${
                isHovered ? "scale-x-100 opacity-100" : "scale-x-0 opacity-100"
              }`}
            ></span>
          </span>
        </Link>

        <div
          className="mt-16 md:mt-32 opacity-100 flex justify-center"
          ref={logoRef}
        >
          <Image
            src={Logo}
            alt="Logo"
            width={300}
            height={260}
            className="w-40 md:w-72 lg:w-96"
          />
        </div>

        <span
          ref={invitationRef}
          className="absolute font-title font-thin text-center text-shadow-sm text-white text-3xl md:text-5xl lg:text-7xl pt-20 md:pt-32 lg:pt-40"
        >
          Invitation à mon imaginaire
        </span>
      </div>
    </main>
  );
}
