"use client";

import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

interface ImageRevealProps extends PropsWithChildren {
  className?: string;
}

export function ImageReveal({ children, className }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      gsap.set(element, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    gsap.set(element, { autoAlpha: 0, clipPath: "inset(12% 0% 12% 0%)" });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(element, {
          autoAlpha: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power3.out",
        });
        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
