import { cn } from "@/lib/utils";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  DEFAULT_TITLE,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import type { Metadata } from "next";
import { Bodoni_Moda, Montserrat } from "next/font/google";
import Background from "./_components/AnimateBackground"; // Assurez-vous que le chemin est correct
import { AudioProvider } from "./context/AudioContext";
import { CartProvider } from "./context/CardContext";
import { ModalProvider } from "./context/ModalContext";
import { PanierProvider } from "./context/PanierContext";
import { ContactOverlay } from "@/components/layout/ContactOverlay";
import { SiteEntranceCurtain } from "@/components/layout/SiteEntranceCurtain";
import AudioPlayer from "./_components/AudioPlayer";
import { PanierModal } from "./_components/PanierModal";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  adjustFontFallback: false,
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "art",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: "La Vie, peinture intuitive originale de Patrick Betheuil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
        <SiteEntranceCurtain />
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
