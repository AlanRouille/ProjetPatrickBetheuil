"use client";

import { ArtworkCard, type ArtworkCardData } from "@/components/artworks/ArtworkCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface RecentWorksProps {
  artworks: ArtworkCardData[];
}

export function RecentWorks({ artworks }: RecentWorksProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState({ left: 0, width: 18 });

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;

    if (!section || !header) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = section.querySelectorAll("[data-recent-card]");

    const context = gsap.context(() => {
      gsap.set(header, { autoAlpha: 0, y: 22 });
      gsap.set(cards, { autoAlpha: 0, y: 42, scale: 0.98 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      timeline
        .to(header, {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        })
        .to(
          cards,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.22"
        );
    }, section);

    return () => context.revert();
  }, [artworks.length]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      const visibleRatio =
        scroller.scrollWidth > 0
          ? scroller.clientWidth / scroller.scrollWidth
          : 1;
      const width = Math.min(Math.max(visibleRatio * 100, 12), 100);
      const scrollRatio = maxScroll > 0 ? scroller.scrollLeft / maxScroll : 0;

      setProgress({
        left: scrollRatio * (100 - width),
        width,
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    scroller.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [artworks.length]);

  const scrollByCard = (direction: "previous" | "next") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const amount = Math.min(scroller.clientWidth * 0.85, 680);
    scroller.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen flex-col justify-center bg-pb-black py-16 text-pb-white md:py-20"
    >
      <div ref={headerRef} className="px-6 md:px-12 xl:px-20">
        <div className="mb-10 flex items-center justify-between gap-3 sm:gap-5 md:mb-12 lg:mb-14">
          <h2 className="font-sans text-xl font-light leading-tight sm:text-2xl md:text-[1.75rem] lg:text-3xl">
            Œuvres récentes
          </h2>
          <Link
            href="/projets"
            className="group flex items-center gap-2 font-sans text-lg font-light leading-tight text-pb-white transition hover:text-pb-accent sm:gap-3 sm:text-xl md:text-[1.375rem] lg:gap-4 lg:text-2xl"
          >
            Voir tout
            <span className="text-pb-accent transition group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x gap-[clamp(3.5rem,8vw,9rem)] overflow-x-auto px-8 pb-12 scroll-pl-8 scrollbar-none md:px-16 md:scroll-pl-16 xl:px-24 xl:scroll-pl-24"
      >
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            data-recent-card
            className="w-[72vw] max-w-[390px] shrink-0 snap-start sm:w-[48vw] md:w-[36vw] lg:w-[28vw] xl:w-[25vw]"
          >
            <ArtworkCard
              artwork={artwork}
              className="w-full"
              quality={66}
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 28vw, (min-width: 768px) 36vw, (min-width: 640px) 48vw, 72vw"
            />
          </div>
        ))}
      </div>

      <div className="mx-6 flex items-center justify-between px-4 py-6 sm:px-6 md:mx-12 md:px-8 md:py-7 xl:mx-20">
        <div className="relative h-px flex-1 overflow-hidden bg-pb-white/50">
          <div
            className="absolute left-0 top-0 h-px bg-pb-accent transition-[left,width] duration-300 ease-out"
            style={{
              left: `${progress.left}%`,
              width: `${progress.width}%`,
            }}
          />
        </div>
        <div className="ml-6 flex gap-6 md:ml-8 md:gap-8">
          <button
            type="button"
            onClick={() => scrollByCard("previous")}
            className="text-3xl text-pb-white transition hover:text-pb-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent md:text-4xl"
            aria-label="Œuvres précédentes"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCard("next")}
            className="text-3xl text-pb-white transition hover:text-pb-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent md:text-4xl"
            aria-label="Œuvres suivantes"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
