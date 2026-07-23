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

export const dynamic = "force-dynamic";

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
    <main className="bg-pb-black">
      <Header />
      <HeroSection imageUrl={heroArtwork?.imageUrl ?? heroFallback} />
      <IntroStatement />
      <RecentWorks artworks={recentWorks} />
      <AboutPreview />
      <ProcessSection />
      <FeaturedWorks artworks={featuredWorks} />
      <FocusGallery artworks={focusWorks} />
      <Footer />
    </main>
  );
}
