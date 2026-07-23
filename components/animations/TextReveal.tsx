"use client";

import { gsap } from "gsap";
import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

interface TextRevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
}

export function TextReveal({
  children,
  className,
  delay = 0,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      gsap.set(element, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      element,
      { autoAlpha: 0, y: 36 },
      { autoAlpha: 1, y: 0, duration: 0.9, delay, ease: "power3.out" }
    );
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
