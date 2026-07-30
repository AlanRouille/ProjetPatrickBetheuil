"use client";

import { usePanier } from "@/app/context/PanierContext";
import { useEffect, useState } from "react";

export function CancelCheckoutClient({
  sessionId,
}: {
  sessionId: string | null;
}) {
  const { artworks, setShowPanierSidebar } = usePanier();
  const [releaseFailed, setReleaseFailed] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    const controller = new AbortController();

    void fetch("/api/checkout/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
      signal: controller.signal,
    }).then((response) => {
      if (!response.ok && response.status !== 409) {
        setReleaseFailed(true);
      }
    }).catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setReleaseFailed(true);
    });

    return () => controller.abort();
  }, [sessionId]);

  return (
    <>
      {artworks.length > 0 ? (
        <button
          type="button"
          onClick={() => setShowPanierSidebar(true)}
          className="inline-flex min-w-[15rem] items-center justify-center rounded-full border border-pb-accent bg-pb-accent px-8 py-4 font-sans text-xs font-medium uppercase tracking-[0.22em] text-pb-black transition-[background-color,border-color,color,transform,box-shadow] duration-500 ease-out hover:scale-[1.03] hover:bg-transparent hover:text-pb-accent hover:shadow-[0_14px_30px_rgba(0,0,0,0.32)] active:scale-100 active:shadow-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent"
        >
          Reprendre mon panier
        </button>
      ) : null}
      {releaseFailed ? (
        <p className="basis-full font-sans text-xs leading-5 text-pb-white/55">
          La libération immédiate de votre sélection n’a pas pu être confirmée.
          Elle sera automatique à l’expiration de la session Stripe.
        </p>
      ) : null}
    </>
  );
}
