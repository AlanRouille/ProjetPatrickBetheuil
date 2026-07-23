"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type Ref } from "react";

interface FocusGalleryImage {
  id: number;
  title: string;
  imageUrl: string;
}

interface FocusGalleryProps {
  artworks: FocusGalleryImage[];
}

export function FocusGallery({ artworks }: FocusGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const centerTileRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [first, second, third, fourth, fifth] = artworks;
  const top = first;
  const center = second ?? first;
  const right = third ?? second ?? first;
  const left = fourth ?? first;
  const bottom = fifth ?? fourth ?? first;

  useEffect(() => {
    const section = sectionRef.current;
    const centerTile = centerTileRef.current;
    const centerImage = centerImageRef.current;
    const text = textRef.current;

    if (!section || !centerTile || !centerImage || !text) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const textItems = text.querySelectorAll("[data-gallery-text]");
    const galleryLetters = text.querySelectorAll("[data-gallery-word]");
    const topTile = section.querySelector("[data-gallery-side='top']");
    const rightTile = section.querySelector("[data-gallery-side='right']");
    const leftTile = section.querySelector("[data-gallery-side='left']");
    const bottomTile = section.querySelector("[data-gallery-side='bottom']");
    const mobileFocus = section.querySelector("[data-gallery-focus]");
    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      gsap.set(centerTile, {
        zIndex: 12,
        transformOrigin: "center center",
      });
      gsap.set(centerImage, { scale: 1, yPercent: 0 });
      gsap.set(textItems, {
        autoAlpha: 0,
        transformOrigin: "50% 55%",
      });
      gsap.set(galleryLetters, { x: 90 });

      const timeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        })
        .to(
          topTile,
          {
            x: "-14vw",
            y: "-34vh",
            ease: "none",
            duration: 0.78,
          },
          0
        )
        .to(
          rightTile,
          {
            x: "42vw",
            ease: "none",
            duration: 0.78,
          },
          0
        )
        .to(
          leftTile,
          {
            x: "-38vw",
            ease: "none",
            duration: 0.78,
          },
          0
        )
        .to(
          bottomTile,
          {
            x: "20vw",
            y: "42vh",
            ease: "none",
            duration: 0.78,
          },
          0
        )
        .to(
          centerTile,
          {
            left: "0vw",
            top: "0vh",
            width: "100vw",
            height: "100vh",
            ease: "none",
            duration: 0.78,
          },
          0
        )
        .to(
          centerImage,
          {
            scale: 1.12,
            yPercent: 1.5,
            ease: "none",
            duration: 1,
          },
          0
        )
        .to(
          textItems,
          {
            autoAlpha: 1,
            ease: "power4.out",
            stagger: 0.08,
            duration: 0.8,
          },
          0.34
        )
        .to(
          galleryLetters,
          {
            x: 0,
            ease: "power4.out",
            stagger: 0.08,
            duration: 0.8,
          },
          0.34
        );

      return () => timeline.kill();
    });

    media.add("(max-width: 1023px)", () => {
      gsap.set(centerTile, {
        zIndex: 12,
        transformOrigin: "center center",
      });
      gsap.set(centerImage, { scale: 1, yPercent: 0 });
      gsap.set(mobileFocus, { autoAlpha: 0, scale: 0.82 });

      const timeline = gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        })
        .to(
          topTile,
          {
            x: "-42vw",
            y: "-30svh",
            autoAlpha: 0,
            ease: "none",
            duration: 0.72,
          },
          0
        )
        .to(
          rightTile,
          {
            x: "46vw",
            autoAlpha: 0,
            ease: "none",
            duration: 0.72,
          },
          0
        )
        .to(
          leftTile,
          {
            x: "-44vw",
            autoAlpha: 0,
            ease: "none",
            duration: 0.72,
          },
          0
        )
        .to(
          bottomTile,
          {
            x: "38vw",
            y: "38svh",
            autoAlpha: 0,
            ease: "none",
            duration: 0.72,
          },
          0
        )
        .to(
          centerTile,
          {
            left: "0vw",
            top: "0svh",
            width: "100vw",
            height: "100svh",
            ease: "none",
            duration: 0.8,
          },
          0
        )
        .to(
          centerImage,
          {
            scale: 1.06,
            yPercent: 0,
            ease: "none",
            duration: 1,
          },
          0
        )
        .to(
          mobileFocus,
          {
            autoAlpha: 1,
            scale: 1,
            ease: "power3.out",
            duration: 0.52,
          },
          0.46
        );

      return () => timeline.kill();
    });

    return () => media.revert();
  }, []);

  if (!center) return null;

  return (
    <section
      ref={sectionRef}
      className="relative h-[230svh] bg-pb-black lg:h-[220vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-pb-black">
        <div className="absolute inset-0">
          {top ? (
            <GalleryTile
              artwork={top}
              className="absolute left-[5vw] top-[6svh] h-[31svh] w-[68vw] lg:left-[1.9vw] lg:top-[7.2vh] lg:h-[26.4vh] lg:w-[62.8vw]"
              side="top"
              sizes="(min-width: 1024px) 66vw, 80vw"
            />
          ) : null}
          {right ? (
            <GalleryTile
              artwork={right}
              className="absolute right-0 top-[28svh] h-[29svh] w-[40vw] lg:top-[18.2vh] lg:h-[44.2vh] lg:w-[34.1vw]"
              side="right"
              sizes="(min-width: 1024px) 32vw, 40vw"
            />
          ) : null}
          {left ? (
            <GalleryTile
              artwork={left}
              className="absolute left-0 top-[74svh] h-[31svh] w-[42vw] lg:top-[35.3vh] lg:h-[44.2vh] lg:w-[33.1vw]"
              side="left"
              sizes="(min-width: 1024px) 34vw, 40vw"
            />
          ) : null}
          <GalleryTile
            artwork={center}
            className="absolute left-[26vw] top-[26.5svh] z-[5] h-[47svh] w-[48vw] lg:left-[34.4vw] lg:top-[35.3vh] lg:h-[27.5vh] lg:w-[30.3vw]"
            imageRef={centerImageRef}
            sizes="(min-width: 1024px) 70vw, 40vw"
            tileRef={centerTileRef}
          />
          {bottom ? (
            <GalleryTile
              artwork={bottom}
              className="absolute left-[29vw] top-[91svh] h-[36svh] w-[67vw] lg:left-[34.4vw] lg:top-[64.5vh] lg:h-[26.5vh] lg:w-[62.2vw]"
              side="bottom"
              sizes="(min-width: 1024px) 64vw, 70vw"
            />
          ) : null}
        </div>

        <div
          ref={textRef}
          className="pointer-events-none absolute inset-0 z-20 text-pb-white"
        >
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <Link
              data-gallery-focus
              href="/projets"
              className="pointer-events-auto flex h-40 w-40 items-center justify-center rounded-full border border-pb-white/90 bg-pb-black/40 font-sans text-[15px] font-medium uppercase leading-[1.4] tracking-[0.11em] text-pb-white opacity-0 shadow-[0_10px_36px_rgba(0,0,0,0.22)] backdrop-blur-[2px] transition-[background-color,border-color] duration-500 hover:border-pb-white hover:bg-pb-black/55 focus-visible:border-pb-white focus-visible:bg-pb-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pb-white sm:h-44 sm:w-44 sm:text-base"
            >
              <span className="text-center">
                Voir la
                <br />
                galerie
              </span>
            </Link>
          </div>

          <div
            aria-label="GALERIE"
            className="absolute left-[48vw] top-[50vh] hidden h-[64vh] w-[45vw] -translate-y-1/2 text-right font-title font-medium uppercase leading-[0.78] drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)] lg:block"
          >
            <span
              data-gallery-text
              data-gallery-word
              className="absolute right-[23vw] top-0 block text-[clamp(5.8rem,10vw,11.2rem)] md:right-[18vw] lg:right-[16.2vw]"
            >
              GA
            </span>
            <span
              data-gallery-text
              data-gallery-word
              className="absolute right-[7vw] top-[18vh] block text-[clamp(5.8rem,10vw,11.2rem)] md:right-[5vw] lg:right-[3.8vw] lg:top-[20vh]"
            >
              LER
            </span>
            <span
              data-gallery-text
              data-gallery-word
              className="absolute right-0 top-[34vh] block text-[clamp(5.8rem,10vw,11.2rem)] lg:top-[39vh]"
            >
              IE
            </span>
            <Link
              data-gallery-text
              href="/projets"
              className="group pointer-events-auto absolute right-[20vw] top-[41vh] inline-block font-title text-[clamp(2.4rem,3.8vw,4.1rem)] font-medium uppercase leading-none md:right-[15vw] lg:right-[14.6vw] lg:top-[46vh]"
            >
              <span className="relative inline-block">
                VOIR
                <span className="absolute -bottom-[0.08em] left-0 h-px w-full origin-right bg-current transition-transform duration-500 ease-out group-hover:scale-x-0" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryTile({
  artwork,
  className,
  imageRef,
  side,
  sizes,
  tileRef,
}: {
  artwork: FocusGalleryImage;
  className: string;
  imageRef?: Ref<HTMLDivElement>;
  side?: "top" | "right" | "left" | "bottom";
  sizes: string;
  tileRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={tileRef}
      data-gallery-side={side}
      className={`overflow-hidden bg-pb-black ${className}`}
    >
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <Image
          src={artwork.imageUrl}
          alt={artwork.title}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    </div>
  );
}
