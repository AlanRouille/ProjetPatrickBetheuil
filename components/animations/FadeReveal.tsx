"use client";

import { gsap } from "gsap";
import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

interface FadeRevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
}

export function FadeReveal({
  children,
  className,
  delay = 0,
  x = 0,
  y = 24,
}: FadeRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      gsap.set(element, { autoAlpha: 1, x: 0, y: 0 });
      return;
    }

    gsap.set(element, { autoAlpha: 0, x, y });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(element, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
        });
        observer.disconnect();
      },
      { threshold: 0.18 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, x, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
