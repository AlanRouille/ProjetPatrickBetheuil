"use client";

import { usePanier } from "@/app/context/PanierContext";
import { useEffect } from "react";

export function SuccessCheckoutClient({ confirmed }: { confirmed: boolean }) {
  const { clearCart } = usePanier();

  useEffect(() => {
    if (confirmed) {
      clearCart();
    }
  }, [clearCart, confirmed]);

  return null;
}
