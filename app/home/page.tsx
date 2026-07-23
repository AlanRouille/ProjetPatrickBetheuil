"use client";

import Link from "next/link";
import { useState } from "react";
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
      <Header />
      <main className="flex flex-col items-center justify-center h-full">
        <ul className="flex flex-col lg:flex-row lg:space-x-40 font-light font-title text-3xl md:text-4xl lg:text-6xl mb-32 space-y-4 lg:space-y-0">
          <Link href="/#about">
            <li
              className={`menu-item transform transition-transform duration-300 cursor-pointer text-center hover:scale-125 sm:mb-7 ${
                activeIndex === 0 ? "active" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
            >
              À propos
            </li>
          </Link>
          <Link href="/projets">
            <li
              className={`menu-item transform transition-transform duration-300 cursor-pointer text-center hover:scale-125 sm:mb-7  ${
                activeIndex === 1 ? "active" : ""
              }`}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
            >
              Œuvres
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
      </main>
    </div>
  );
}
