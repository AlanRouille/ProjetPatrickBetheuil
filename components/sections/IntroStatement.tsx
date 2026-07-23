"use client";

import { useEffect, useRef } from "react";

export function IntroStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const oeuvresRef = useRef<HTMLSpanElement>(null);
  const bornRef = useRef<HTMLSpanElement>(null);
  const intuitionRef = useRef<HTMLSpanElement>(null);
  const livingRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const rawProgress = (viewport - rect.top) / (viewport + rect.height);
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      const motionProgress = 0.5 + (progress - 0.5) * 0.62;
      const centered = motionProgress - 0.5;
      const isMobile = window.innerWidth < 640;

      if (oeuvresRef.current) {
        oeuvresRef.current.style.transform = isMobile
          ? `translate3d(${centered * 28}px, 0, 0)`
          : `translate3d(${-130 + motionProgress * 104}px, 0, 0)`;
      }

      if (bornRef.current) {
        bornRef.current.style.transform = `translate3d(${
          centered * (isMobile ? 24 : 112)
        }px, 0, 0)`;
      }

      if (intuitionRef.current) {
        intuitionRef.current.style.transform = isMobile
          ? `translate3d(${centered * -28}px, 0, 0)`
          : `translate3d(${130 - motionProgress * 104}px, 0, 0)`;
      }

      if (livingRef.current) {
        livingRef.current.style.transform = `translate3d(${
          centered * (isMobile ? -24 : -108)
        }px, 0, 0)`;
      }

      if (barRef.current) {
        const lineProgress = Math.min(Math.max((progress - 0.08) / 0.82, 0), 1);
        barRef.current.style.transform = `scaleX(${lineProgress})`;
      }
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen overflow-hidden bg-pb-black px-6 py-24 text-pb-white md:px-16 xl:px-24"
    >
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-[1720px] items-center justify-center">
        <h2 className="relative w-full text-center font-sans font-normal uppercase leading-none tracking-[0.02em]">
          <span
            ref={oeuvresRef}
            className="block text-[clamp(3rem,14vw,3.6rem)] will-change-transform sm:text-[clamp(4rem,10vw,11rem)]"
          >
            Œuvres
          </span>
          <span
            ref={bornRef}
            className="relative z-10 -mt-[0.1em] block font-title text-[clamp(2.1rem,10vw,2.6rem)] font-normal italic normal-case leading-none text-pb-accent will-change-transform sm:text-[clamp(2.6rem,5.1vw,6rem)] md:pl-[12vw]"
          >
            Nées de l’
          </span>
          <span
            ref={intuitionRef}
            className="block text-[clamp(3rem,14vw,3.6rem)] will-change-transform sm:text-[clamp(4rem,9.4vw,10.8rem)]"
          >
            Intuition
          </span>
          <span
            ref={livingRef}
            className="-mt-[0.04em] block font-title text-[clamp(2.1rem,10vw,2.6rem)] font-normal italic normal-case leading-none text-pb-accent will-change-transform sm:text-[clamp(2.6rem,5.1vw,6rem)] md:pl-[30vw]"
          >
            Et du vivant
          </span>
        </h2>
      </div>

      <span
        ref={barRef}
        className="absolute bottom-[8vh] left-16 right-16 h-px origin-center scale-x-0 bg-pb-accent will-change-transform md:left-24 md:right-24"
        aria-hidden="true"
      />
    </section>
  );
}
