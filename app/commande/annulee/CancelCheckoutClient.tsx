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
    <div className="mt-10 flex flex-col items-center gap-4">
      {artworks.length > 0 ? (
        <button
          type="button"
          onClick={() => setShowPanierSidebar(true)}
          className="inline-flex rounded-full border border-primary-orange px-7 py-3 font-sans text-sm font-medium uppercase tracking-[0.12em] text-white transition-[background-color,color,transform] duration-500 hover:scale-[1.02] hover:bg-primary-orange hover:text-primary-black"
        >
          Reprendre mon panier
        </button>
      ) : null}
      {releaseFailed ? (
        <p className="max-w-md font-sans text-xs leading-5 text-white/55">
          La libération immédiate de votre sélection n’a pas pu être confirmée.
          Elle sera automatique à l’expiration de la session Stripe.
        </p>
      ) : null}
    </div>
  );
}
