// app/_components/Loader.tsx
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Logo from "../_components/icons/Logo.svg";

type LoaderProps = {
  onFinishLoading: () => void;
};

const Loader = ({ onFinishLoading }: LoaderProps) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const totalLoadingTime = 6000; // Temps total de chargement en ms
  const progressIntervalTime = 35; // Délai entre chaque incrément de progression

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      if (logoRef.current) {
        gsap.to(logoRef.current, { opacity: 1, duration: 1 }); // Animer l'opacité du logo
      }

      const progressBarTimer = setTimeout(() => {
        if (progressBarRef.current) {
          gsap.to(progressBarRef.current, { opacity: 1, duration: 1 }); // Animer l'opacité de la barre de progression
        }

        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev < 100) {
              return prev + 2;
            } else {
              clearInterval(progressInterval);
              return 100;
            }
          });
        }, progressIntervalTime);

        const endTimer = setTimeout(() => {
          setLoading(false);
          if (typeof onFinishLoading === "function") {
            onFinishLoading();
          }
        }, totalLoadingTime);

        return () => {
          clearTimeout(endTimer);
          clearInterval(progressInterval);
        };
      }, 500);

      return () => {
        clearTimeout(progressBarTimer);
      };
    }, 500);

    return () => {
      clearTimeout(logoTimer);
    };
  }, [onFinishLoading]);

  if (loading) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-custom-black"
        role="dialog"
        aria-labelledby="loading-logo"
        aria-live="polite"
      >
        <div
          id="loading-logo"
          ref={logoRef}
          className="text-white text-4xl font-bold opacity-0"
        >
          <Image src={Logo} alt="Logo" width={42} height={42} />
        </div>

        <div ref={progressBarRef} className="w-1/4 mt-6 opacity-0">
          <div className="relative h-0.5 bg-gray-700">
            <div
              className="absolute h-0.5 bg-white transition-all ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Loader;
