"use client";

import Link from "next/link";
import { useState } from "react";
import AudioPlayer from "../_components/AudioPlayer";
import { Header } from "../_components/Header";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="relative h-screen">
      <Header showLogo={false} />
      <main className="flex flex-col items-center justify-center h-full">
        <ul className="flex flex-row space-x-40 font-light font-title text-7xl mb-32">
          <Link href="/about">
            <li
              className={`menu-item transform transition-transform duration-300 cursor-pointer text-center hover:scale-125  ${
                activeIndex === 0 ? "active" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
            >
              About
            </li>
          </Link>
          <Link href="/projets">
            <li
              className={`menu-item transform transition-transform duration-300 cursor-pointer text-center hover:scale-125  ${
                activeIndex === 1 ? "active" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
            >
              Oeuvres
            </li>
          </Link>
          <Link href="/contact">
            <li
              className={`menu-item transform transition-transform duration-300 cursor-pointer text-center hover:scale-125  ${
                activeIndex === 2 ? "active" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
            >
              Contact
            </li>
          </Link>
        </ul>
        <div className="fixed bottom-4 right-4 text-white">
          <AudioPlayer />
        </div>
      </main>
    </div>
  );
}
