"use client";

import { type ArtworkCardData } from "@/components/artworks/ArtworkCard";
import { artworkImageAlt } from "@/lib/seo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface FeaturedWorksProps {
  artworks: ArtworkCardData[];
}

const subtitles = ["Suspension", "Lumière", "Connexion"];

export function FeaturedWorks({ artworks }: FeaturedWorksProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const cards = section.querySelectorAll<HTMLElement>(
        "[data-featured-card]"
      );

      cards.forEach((card) => {
        const title = card.querySelector<HTMLElement>("[data-featured-title]");
        const subtitle = card.querySelector<HTMLElement>(
          "[data-featured-subtitle]"
        );

        if (title) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.05,
              },
            })
            .fromTo(
              title,
              { autoAlpha: 0, yPercent: 115 },
              {
                autoAlpha: 1,
                yPercent: 0,
                duration: 0.45,
                ease: "power3.out",
              }
            )
            .to(title, {
              yPercent: -55,
              duration: 0.55,
              ease: "none",
            });
        }

        if (subtitle) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.05,
              },
            })
            .fromTo(
              subtitle,
              { autoAlpha: 0, y: 36 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.38,
                ease: "power2.out",
              }
            )
            .to(subtitle, {
              y: -36,
              duration: 0.62,
              ease: "none",
            });
        }
      });
    }, section);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!section || !cursor || !finePointer.matches) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const cards = section.querySelectorAll<HTMLElement>(
      "[data-featured-card]"
    );
    gsap.set(cursor, {
      autoAlpha: 0,
    });

    const moveCursor = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    };
    const showCursor = (event: PointerEvent) => {
      moveCursor(event);
      gsap.to(cursor, {
        autoAlpha: 1,
        duration: reducedMotion ? 0 : 0.28,
        ease: "power3.out",
        overwrite: true,
      });
    };
    const hideCursor = () => {
      gsap.to(cursor, {
        autoAlpha: 0,
        duration: reducedMotion ? 0 : 0.2,
        ease: "power2.out",
        overwrite: true,
      });
    };

    window.addEventListener("pointermove", moveCursor, { passive: true });
    cards.forEach((card) => {
      card.style.cursor = "none";
      card.addEventListener("pointerenter", showCursor);
      card.addEventListener("pointerleave", hideCursor);
    });

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      cards.forEach((card) => {
        card.style.removeProperty("cursor");
        card.removeEventListener("pointerenter", showCursor);
        card.removeEventListener("pointerleave", hideCursor);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className="relative z-40 -mt-[140vh] bg-pb-black text-pb-white"
    >
      <div>
        {artworks.map((artwork, index) => (
          <Link
            key={artwork.id}
            data-featured-card
            href={`/projets/${artwork.slug}`}
            className="group relative block min-h-screen overflow-hidden text-pb-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-pb-accent"
          >
            <Image
              src={artwork.imageUrl}
              alt={artworkImageAlt(artwork.title)}
              fill
              sizes="100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-pb-black/28 transition group-hover:bg-pb-black/18" />
            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
              <div className="overflow-hidden px-4 py-8">
                <h3
                  data-featured-title
                  className="font-title text-5xl font-normal leading-none will-change-transform md:text-8xl"
                >
                  {artwork.title}
                </h3>
              </div>
              <p
                data-featured-subtitle
                className="absolute bottom-10 left-1/2 -translate-x-1/2 font-sans text-sm text-pb-white will-change-transform"
              >
                {subtitles[index % subtitles.length]}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div
        ref={cursorRef}
        data-featured-cursor
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[88px] w-[88px] items-center justify-center rounded-full bg-pb-white/10 font-title text-[22px] text-pb-white opacity-0 backdrop-blur-md will-change-transform md:flex"
      >
        Voir
      </div>
    </section>
  );
}
