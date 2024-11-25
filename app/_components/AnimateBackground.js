// Background.js
"use client";

import { useEffect, useState } from "react";

export default function AnimateBackground() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth) * 2 - 1; // Valeur entre -1 et 1
      const y = (clientY / window.innerHeight) * 2 - 1; // Valeur entre -1 et 1
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${50 + position.x * 10}% ${
          50 + position.y * 7
        }%, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5))`,
        transition: "background 0.5s ease",
      }}
    />
  );
}
