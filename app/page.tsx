import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeaturedWorks } from "@/components/sections/FeaturedWorks";
import { FocusGallery } from "@/components/sections/FocusGallery";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroStatement } from "@/components/sections/IntroStatement";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { RecentWorks } from "@/components/sections/RecentWorks";
import { prisma } from "@/lib/prisma";
import type { ArtworkCardData } from "@/components/artworks/ArtworkCard";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  ARTIST_ID,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  schemaGraph,
} from "@/lib/seo";

export const revalidate = 3600;

const heroFallback =
  "https://res.cloudinary.com/dugwzjef9/image/upload/v1779434851/la-vie.jpg";

function bySlug(
  artworks: ArtworkCardData[],
  slugs: string[],
  fallbackCount: number
) {
  const selected = slugs
    .map((slug) => artworks.find((artwork) => artwork.slug === slug))
    .filter((artwork): artwork is ArtworkCardData => Boolean(artwork));

  return selected.length > 0 ? selected : artworks.slice(0, fallbackCount);
}

export default async function HomePage() {
  const artworks = await prisma.artwork.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      imageUrl: true,
      price: true,
      status: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  const normalizedArtworks = artworks.map((artwork) => ({
    ...artwork,
    status: artwork.status,
  }));

  const heroArtwork =
    normalizedArtworks.find((artwork) => artwork.slug === "la-vie") ??
    normalizedArtworks[0];

  const recentWorks =
    bySlug(normalizedArtworks, [
      "la-resilience",
      "lintrospection",
      "la-legerete",
      "le-voyage",
      "la-vie",
      "lesperance",
      "la-mutation",
      "lintemporalite",
      "la-complicite",
      "les-quartz",
    ], 8);

  const focusWorks =
    bySlug(normalizedArtworks, [
      "la-resilience",
      "la-vie",
      "le-voyage",
      "les-quartz",
      "lintrospection",
    ], 5);

  const featuredWorks =
    bySlug(normalizedArtworks, [
      "lintemporalite",
      "lesperance",
      "la-complicite",
    ], 3);

  return (
    <>
      <JsonLd
        data={schemaGraph([
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: SITE_NAME,
            alternateName: "Patrick Betheuil Artiste Peintre",
            description: DEFAULT_DESCRIPTION,
            inLanguage: "fr-FR",
            publisher: { "@id": ARTIST_ID },
          },
          {
            "@type": "Person",
            "@id": ARTIST_ID,
            name: SITE_NAME,
            url: SITE_URL,
            image: absoluteUrl("/images/l'artiste.jpg"),
            jobTitle: "Artiste peintre français",
            description:
              "Artiste peintre français spécialisé dans la peinture intuitive, la peinture abstraite et l’art contemporain.",
            nationality: {
              "@type": "Country",
              name: "France",
            },
            homeLocation: {
              "@type": "Place",
              name: "Chartres, Eure-et-Loir, Centre-Val de Loire",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chartres",
                addressRegion: "Centre-Val de Loire",
                addressCountry: "FR",
              },
            },
            sameAs: [
              "https://www.instagram.com/betheuilpatrick/",
              "https://www.facebook.com/betheuil.patrick",
            ],
            knowsAbout: [
              "Peinture intuitive",
              "Peinture abstraite intuitive",
              "Art intuitif",
              "Art contemporain",
              "Peinture expressive",
              "Peinture émotionnelle",
            ],
            mainEntityOfPage: SITE_URL,
          },
        ])}
      />
      <main className="bg-pb-black">
        <Header />
        <HeroSection
          imageUrl={heroArtwork?.imageUrl ?? heroFallback}
          imageTitle={heroArtwork?.title ?? "La Vie"}
        />
        <IntroStatement />
        <RecentWorks artworks={recentWorks} />
        <AboutPreview />
        <ProcessSection />
        <FeaturedWorks artworks={featuredWorks} />
        <FocusGallery artworks={focusWorks} />
        <Footer />
      </main>
    </>
  );
}
