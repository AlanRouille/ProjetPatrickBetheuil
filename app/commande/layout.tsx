import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suivi de commande",
  description: "Confirmation et suivi sécurisé d’une acquisition.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
