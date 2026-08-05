"use client";

import { Trash2, X } from "lucide-react";
import Image from "next/image";
import { artworkImageAlt } from "@/lib/seo";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePanier } from "../context/PanierContext";

const shippingCost = 5.9;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const totalFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const focusableSelector = [
  "button:not([disabled])",
  "input:not([disabled])",
  "a[href]",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function PanierModal() {
  const {
    showPanierSidebar,
    setShowPanierSidebar,
    artworks,
    removeArtwork,
  } = usePanier();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [checkoutPending, setCheckoutPending] = useState(false);

  const subtotal = useMemo(
    () => artworks.reduce((total, artwork) => total + artwork.price, 0),
    [artworks]
  );
  const appliedShippingCost = artworks.length > 0 ? shippingCost : 0;
  const total = subtotal + appliedShippingCost;

  useEffect(() => {
    if (!showPanierSidebar) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPanierSidebar(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      ).filter((element) => element.getClientRects().length > 0);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      const cartButton = document.querySelector<HTMLElement>(
        "[data-cart-button]"
      );
      (cartButton ?? previousFocus)?.focus();
    };
  }, [setShowPanierSidebar, showPanierSidebar]);

  const handlePayment = async () => {
    if (artworks.length === 0 || checkoutPending) return;

    if (!emailPattern.test(email.trim())) {
      setErrorMessage("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    setCheckoutPending(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artworkIds: artworks.map((artwork) => artwork.id),
          email: email.trim(),
        }),
      });
      const session: { url?: string; error?: string } = await response.json();

      if (!response.ok || !session.url) {
        throw new Error(
          session.error ??
            "Impossible de préparer l’acquisition. Merci de réessayer."
        );
      }

      window.location.assign(session.url);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Merci de réessayer."
      );
      setCheckoutPending(false);
    }
  };

  return (
    <div
      aria-hidden={!showPanierSidebar}
      className={`fixed inset-0 z-[160] flex justify-end bg-pb-black/50 transition-[opacity,visibility] duration-500 ${
        showPanierSidebar
          ? "visible opacity-100"
          : "invisible delay-500 opacity-0"
      }`}
      onClick={() => setShowPanierSidebar(false)}
    >
      <section
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="panier-title"
        onClick={(event) => event.stopPropagation()}
        className={`flex h-full w-full max-w-[430px] flex-col bg-[#FAFAF8] text-pb-black shadow-[-18px_0_50px_rgba(0,0,0,0.22)] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] sm:w-[430px] ${
          showPanierSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between px-7 pb-5 pt-[calc(env(safe-area-inset-top)+1.75rem)] sm:px-8 sm:pt-8">
          <h2
            id="panier-title"
            className="font-title text-[1.4rem] font-medium uppercase leading-none"
          >
            Mon panier
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setShowPanierSidebar(false)}
            aria-label="Fermer le panier"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-pb-black text-pb-white transition-transform duration-300 hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-pb-accent"
          >
            <X aria-hidden="true" size={19} strokeWidth={1.4} />
          </button>
        </header>

        <div className="mx-7 border-t border-pb-black/55 sm:mx-8" />

        <div className="min-h-0 flex-1 overflow-y-auto px-7 sm:px-8">
          {artworks.length > 0 ? (
            <ul aria-label="Œuvres dans le panier">
              {artworks.map((artwork) => (
                <li
                  key={artwork.id}
                  className="grid grid-cols-[64px_minmax(0,1fr)_36px] items-center gap-4 border-b border-pb-black/40 py-5"
                >
                  <div className="relative h-16 w-16 overflow-hidden bg-pb-black/5">
                    <Image
                      src={artwork.imageUrl}
                      alt={artworkImageAlt(artwork.title)}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate font-sans text-sm font-normal">
                      {artwork.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm font-medium text-pb-accent">
                      {priceFormatter.format(artwork.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeArtwork(artwork.id)}
                    aria-label={`Retirer ${artwork.title} du panier`}
                    className="flex h-9 w-9 items-center justify-center justify-self-end text-pb-black/75 transition-[color,transform] duration-300 hover:scale-110 hover:text-pb-accent active:scale-95 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-pb-accent"
                  >
                    <Trash2 aria-hidden="true" size={18} strokeWidth={1.35} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-full min-h-52 flex-col items-center justify-center text-center">
              <p className="font-title text-2xl">Votre panier est vide</p>
              <Link
                href="/projets"
                onClick={() => setShowPanierSidebar(false)}
                className="mt-4 font-sans text-sm underline decoration-pb-accent underline-offset-4"
              >
                Découvrir les œuvres
              </Link>
            </div>
          )}
        </div>

        <footer className="border-t border-pb-black/45 px-7 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-6 sm:px-8 sm:pb-7">
          <dl className="space-y-2 font-sans text-xs">
            <div className="flex items-center justify-between">
              <dt className="text-pb-black/65">Sous-total</dt>
              <dd>{priceFormatter.format(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-pb-black/65">Livraison</dt>
              <dd>{totalFormatter.format(appliedShippingCost)}</dd>
            </div>
          </dl>

          <div className="my-5 border-t border-pb-black/55" />

          <div className="flex items-center justify-between font-sans">
            <span className="text-sm font-semibold">Total</span>
            <strong className="text-base font-semibold">
              {totalFormatter.format(total)}
            </strong>
          </div>

          <label
            htmlFor="panier-email"
            className="mt-5 block font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-pb-black/65"
          >
            Adresse e-mail
          </label>
          <input
            id="panier-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="vous@exemple.fr"
            disabled={artworks.length === 0 || checkoutPending}
            className="mt-2 h-11 w-full border border-pb-black/45 bg-transparent px-4 font-sans text-sm outline-none transition-colors placeholder:text-pb-black/35 focus:border-pb-accent focus-visible:ring-1 focus-visible:ring-pb-accent disabled:opacity-45"
          />

          {errorMessage ? (
            <p className="mt-2 font-sans text-xs text-red-700" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="button"
            onClick={handlePayment}
            disabled={artworks.length === 0 || checkoutPending}
            className="group relative isolate mt-5 flex h-12 w-full items-center justify-center overflow-hidden rounded-full border border-pb-accent font-sans text-xs font-semibold uppercase tracking-[0.04em] transition-[color,transform,box-shadow] duration-700 ease-[cubic-bezier(0.9,0.1,0.1,0.9)] hover:scale-[1.015] hover:text-pb-white hover:shadow-[0_12px_28px_rgba(0,0,0,0.14)] active:scale-100 disabled:cursor-not-allowed disabled:border-pb-black/20 disabled:text-pb-black/35 disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 scale-0 rounded-full bg-pb-accent transition-transform duration-700 ease-[cubic-bezier(0.9,0.1,0.1,0.9)] group-hover:scale-100 group-focus-visible:scale-100 group-disabled:scale-0"
            />
            <span className="relative z-10">
              {checkoutPending ? "Préparation…" : "Commander"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowPanierSidebar(false)}
            className="mx-auto mt-5 block font-sans text-xs underline-offset-4 transition-colors hover:text-pb-accent hover:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[3px] focus-visible:outline-pb-accent"
          >
            Continuer mes achats
          </button>
        </footer>
      </section>
    </div>
  );
}
