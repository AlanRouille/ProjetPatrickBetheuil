"use client";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePanier } from "../../context/PanierContext";

export interface ArtworkDetailsData {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  technique: string | null;
  dimensions: string | null;
  year: number | null;
  status: string;
  isSoldOut: boolean;
}

export interface NextArtworkData {
  id: number;
  title: string;
  imageUrl: string;
}

interface ArtworkDetailsClientProps {
  artwork: ArtworkDetailsData;
  nextArtwork: NextArtworkData | null;
}

const statusLabels: Record<string, string> = {
  AVAILABLE: "Disponible",
  RESERVED: "Réservée",
  SOLD: "Vendue",
};

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 0,
});

export function ArtworkDetailsClient({
  artwork,
  nextArtwork,
}: ArtworkDetailsClientProps) {
  const { addArtwork, setShowPanierSidebar } = usePanier();
  const nextSectionRef = useRef<HTMLAnchorElement>(null);
  const nextCursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = nextSectionRef.current;
    const cursor = nextCursorRef.current;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    if (!section || !cursor || !finePointer.matches) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
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

    gsap.set(cursor, { autoAlpha: 0 });
    section.style.cursor = "none";
    window.addEventListener("pointermove", moveCursor, { passive: true });
    section.addEventListener("pointerenter", showCursor);
    section.addEventListener("pointerleave", hideCursor);

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      section.removeEventListener("pointerenter", showCursor);
      section.removeEventListener("pointerleave", hideCursor);
      section.style.removeProperty("cursor");
    };
  }, []);

  const handleAddToPanier = () => {
    if (artwork.isSoldOut) return;

    addArtwork({
      id: artwork.id,
      title: artwork.title,
      price: artwork.price,
      imageUrl: artwork.imageUrl,
    });
    setShowPanierSidebar(true);
  };

  return (
    <>
      <section
        data-header-theme="light"
        className="relative flex min-h-[100dvh] items-center overflow-hidden bg-pb-black px-6 pb-16 pt-28 text-pb-white md:px-12 md:pb-20 md:pt-32 xl:px-20"
      >
        <div className="mx-auto grid w-full max-w-[1440px] items-start gap-12 md:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)] md:gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-16 xl:gap-20">
          <div className="relative w-full md:h-[48vh] md:min-h-[360px] lg:h-[62vh] lg:min-h-[520px]">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              width={1600}
              height={1200}
              priority
              sizes="(min-width: 1024px) 54vw, 90vw"
              className="h-auto w-full object-contain object-top md:h-full"
            />
          </div>

          <div className="mx-auto w-full max-w-[620px] lg:mx-0">
            <h1 className="whitespace-nowrap font-title text-[clamp(2.5rem,4.7vw,6.2rem)] font-normal leading-[0.86]">
              {artwork.title}
            </h1>
            <p className="mt-4 font-sans text-3xl font-normal text-pb-accent md:text-4xl">
              {priceFormatter.format(artwork.price)} €
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-5 font-sans text-sm">
              <div>
                <dt className="text-pb-white/50">Statut</dt>
                <dd className="mt-1 text-pb-white">
                  {statusLabels[artwork.status] ?? artwork.status}
                </dd>
              </div>
              <div>
                <dt className="text-pb-white/50">Format</dt>
                <dd className="mt-1 text-pb-white">
                  {artwork.dimensions ?? "À compléter"}
                </dd>
              </div>
              <div>
                <dt className="text-pb-white/50">Année</dt>
                <dd className="mt-1 text-pb-white">
                  {artwork.year ?? "À compléter"}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={handleAddToPanier}
              disabled={artwork.isSoldOut}
              className="mt-7 inline-flex h-11 min-w-[210px] items-center justify-center bg-pb-accent px-7 font-sans text-sm font-medium text-pb-black transition-[background-color,transform,box-shadow] duration-500 ease-out hover:scale-[1.03] hover:bg-pb-white hover:shadow-[0_14px_30px_rgba(0,0,0,0.38)] active:scale-100 active:shadow-none disabled:cursor-not-allowed disabled:bg-pb-accent/40 disabled:text-pb-white/65 disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              {artwork.isSoldOut ? "Œuvre indisponible" : "Ajouter au panier"}
            </button>

            <div className="mt-8">
              <h2 className="font-sans text-lg font-medium">Description</h2>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-pb-white/70">
                {artwork.description ||
                  "Description de l’œuvre prochainement disponible."}
              </p>
            </div>

            {artwork.technique ? (
              <div className="mt-7 border-t border-pb-accent/70 pt-6">
                <h2 className="font-sans text-lg font-medium">Technique</h2>
                <p className="mt-4 font-sans text-[15px] leading-relaxed text-pb-white/70">
                  {artwork.technique}
                </p>
              </div>
            ) : null}
          </div>
        </div>

      </section>

      {nextArtwork ? (
        <Link
          ref={nextSectionRef}
          href={`/projets/${nextArtwork.id}`}
          data-header-theme="light"
          className="group relative block min-h-[100dvh] overflow-hidden bg-pb-black text-pb-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-pb-accent"
        >
          <span
            className="absolute inset-0"
          >
            <Image
              src={nextArtwork.imageUrl}
              alt={nextArtwork.title}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />
          </span>
          <span className="absolute inset-0 bg-pb-black/28 transition-colors duration-700 group-hover:bg-pb-black/20" />
          <span
            className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
          >
            <span className="font-sans text-xs uppercase tracking-[0.16em] text-pb-white/85 md:text-sm">
              Poursuivre le voyage vers
            </span>
            <span className="mt-2 block max-w-full break-words font-title text-[clamp(2.25rem,10.5vw,3rem)] font-normal leading-[0.92] md:text-[clamp(4rem,9vw,10rem)] md:leading-[0.85]">
              {nextArtwork.title}
            </span>
          </span>
          <span
            ref={nextCursorRef}
            data-next-artwork-cursor
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-[88px] w-[88px] items-center justify-center rounded-full bg-pb-white/10 font-title text-[22px] text-pb-white opacity-0 backdrop-blur-md will-change-transform md:flex"
          >
            Voir
          </span>
        </Link>
      ) : null}
    </>
  );
}
