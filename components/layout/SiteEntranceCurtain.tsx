"use client";

import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const entrancePaths = new Set(["/", "/home", "/projets"]);

function isEntrancePath(pathname: string | null) {
  if (!pathname) return false;

  return (
    entrancePaths.has(pathname) || /^\/projets\/[^/]+\/?$/.test(pathname)
  );
}

export function SiteEntranceCurtain() {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const shouldPlayEntrance = isEntrancePath(pathname);
  const [isVisible, setIsVisible] = useState(shouldPlayEntrance);

  useLayoutEffect(() => {
    if (shouldPlayEntrance) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);
  }, [pathname, shouldPlayEntrance]);

  useEffect(() => {
    if (!isVisible || !shouldPlayEntrance) return;

    const curtain = curtainRef.current;

    if (!curtain) return;

    const layers = Array.from(
      curtain.querySelectorAll<HTMLElement>("[data-site-curtain-layer]")
    ).reverse();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    if (reducedMotion) {
      document.body.style.overflow = previousOverflow;
      setIsVisible(false);
      return;
    }

    const animation = gsap.to(layers, {
      yPercent: -100,
      duration: isMobile ? 0.56 : 0.9,
      stagger: isMobile ? 0.045 : 0.075,
      ease: "power4.inOut",
      delay: isMobile ? 0.03 : 0.08,
      onComplete: () => {
        document.body.style.overflow = previousOverflow;
        setIsVisible(false);
      },
    });

    return () => {
      animation.kill();
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible, pathname, shouldPlayEntrance]);

  if (!isVisible) return null;

  return (
    <div
      ref={curtainRef}
      className="pointer-events-none fixed inset-0 z-[200]"
      aria-hidden="true"
    >
      <div
        data-site-curtain-layer
        className="absolute inset-0 z-0 bg-pb-accent"
      />
      <div
        data-site-curtain-layer
        className="absolute inset-0 z-[1] bg-[#F7F4EE]"
      />
      <div
        data-site-curtain-layer
        className="absolute inset-0 z-[2] bg-pb-black"
      />
    </div>
  );
}
