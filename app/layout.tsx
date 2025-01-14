import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import Head from "next/head";
import Background from "./_components/AnimateBackground"; // Assurez-vous que le chemin est correct
import AppLoader from "./_components/AppLoader";
import { AudioProvider } from "./context/AudioContext";
import { CartProvider } from "./context/CardContext";
import { ModalProvider } from "./context/ModalContext";
import { PanierProvider } from "./context/PanierContext";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Patrick Betheuil",
  description: "Patrick Betheuil's personal artistic portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PanierProvider>
        <body className={cn(montserrat, openSans)}>
          <Background /> {/* Ajout du background animé */}
          <ModalProvider>
            <CartProvider>
              <AudioProvider>
                <AppLoader>
                  <div className="relative z-10">{children}</div>
                </AppLoader>
              </AudioProvider>
            </CartProvider>
          </ModalProvider>
        </body>
      </PanierProvider>
    </html>
  );
}
