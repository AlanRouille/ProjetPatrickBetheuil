import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Bodoni_Moda, Montserrat } from "next/font/google";
import Background from "./_components/AnimateBackground"; // Assurez-vous que le chemin est correct
import { AudioProvider } from "./context/AudioContext";
import { CartProvider } from "./context/CardContext";
import { ModalProvider } from "./context/ModalContext";
import { PanierProvider } from "./context/PanierContext";
import { ContactOverlay } from "@/components/layout/ContactOverlay";
import AudioPlayer from "./_components/AudioPlayer";
import { PanierModal } from "./_components/PanierModal";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Patrick Betheuil",
  description: "Patrick Betheuil's personal artistic portfolio",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("h-full", montserrat.variable, bodoni.variable)}>
      <body className="min-h-full bg-pb-black font-sans text-pb-white">
        <PanierProvider>
          <Background /> {/* Ajout du background animé */}
          <ModalProvider>
            <CartProvider>
              <AudioProvider>
                <div className="relative z-10">{children}</div>
                <AudioPlayer />
                <PanierModal />
                <ContactOverlay />
              </AudioProvider>
            </CartProvider>
          </ModalProvider>
        </PanierProvider>
      </body>
    </html>
  );
}
