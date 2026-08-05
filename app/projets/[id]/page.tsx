import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { prisma } from "@/lib/prisma";
import {
  ARTIST_ID,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  artworkDescription,
  artworkImageAlt,
  createBreadcrumbSchema,
  createPageMetadata,
  schemaGraph,
} from "@/lib/seo";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { cache } from "react";
import {
  ArtworkDetailsClient,
  type ArtworkDetailsData,
  type NextArtworkData,
} from "./ArtworkDetailsClient";

export const revalidate = 3600;

const getArtwork = cache(async (identifier: string) => {
  const select = {
    id: true,
    title: true,
    slug: true,
    imageUrl: true,
    price: true,
    description: true,
    technique: true,
    dimensions: true,
    year: true,
    metaTitle: true,
    metaDescription: true,
    status: true,
    updatedAt: true,
    images: {
      orderBy: { position: "asc" as const },
      select: {
        imageUrl: true,
        alt: true,
      },
    },
  };

  if (/^\d+$/.test(identifier)) {
    return prisma.artwork.findUnique({
      where: { id: Number(identifier) },
      select,
    });
  }

  return prisma.artwork.findUnique({
    where: { slug: identifier },
    select,
  });
});

async function getNextArtwork(id: number): Promise<NextArtworkData | null> {
  const select = {
    id: true,
    title: true,
    slug: true,
    imageUrl: true,
  } as const;

  const nextArtwork = await prisma.artwork.findFirst({
    where: { id: { gt: id } },
    orderBy: { id: "asc" },
    select,
  });

  if (nextArtwork) return nextArtwork;

  return prisma.artwork.findFirst({
    where: { id: { not: id } },
    orderBy: { id: "asc" },
    select,
  });
}

function artworkMetadataTitle(title: string, metaTitle: string | null) {
  const customTitle = metaTitle
    ?.replace(/\s*[|—-]\s*Patrick Betheuil\s*$/i, "")
    .trim();

  if (customTitle && customTitle.toLocaleLowerCase("fr") !== title.toLocaleLowerCase("fr")) {
    return customTitle;
  }

  return `${title} — Peinture intuitive originale`;
}

function availability(status: string) {
  if (status === "SOLD") return "https://schema.org/SoldOut";
  if (status === "RESERVED") return "https://schema.org/LimitedAvailability";
  return "https://schema.org/InStock";
}

function dimensionsSchema(dimensions: string | null) {
  const match = dimensions?.match(/(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)/i);

  if (!match) return {};

  return {
    width: {
      "@type": "QuantitativeValue",
      value: Number(match[1].replace(",", ".")),
      unitCode: "CMT",
      unitText: "cm",
    },
    height: {
      "@type": "QuantitativeValue",
      value: Number(match[2].replace(",", ".")),
      unitCode: "CMT",
      unitText: "cm",
    },
  };
}

function artworkSurface(technique: string | null) {
  if (/papier/i.test(technique ?? "")) return "Papier 350 g/m²";
  if (/toile/i.test(technique ?? "")) return "Toile";
  if (/bois/i.test(technique ?? "")) return "Bois";
  return undefined;
}

interface ArtworkPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const artworks = await prisma.artwork.findMany({ select: { slug: true } });
  return artworks.map((artwork) => ({ id: artwork.slug }));
}

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const { id } = await params;
  const artwork = await getArtwork(id);

  if (!artwork) {
    return createPageMetadata({
      title: "Œuvre introuvable",
      description: "Cette œuvre n’est plus disponible dans la galerie de Patrick Betheuil.",
      canonical: "/projets",
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: artworkMetadataTitle(artwork.title, artwork.metaTitle),
    description: artworkDescription(
      artwork.title,
      artwork.metaDescription || artwork.description
    ),
    canonical: `/projets/${artwork.slug}`,
    image: artwork.imageUrl,
    imageAlt: artworkImageAlt(artwork.title),
  });
}

export default async function ArtworkDetails({ params }: ArtworkPageProps) {
  const { id: identifier } = await params;
  const artwork = await getArtwork(identifier);

  if (!artwork) notFound();

  if (/^\d+$/.test(identifier)) {
    permanentRedirect(`/projets/${artwork.slug}`);
  }

  const nextArtwork = await getNextArtwork(artwork.id);
  const normalizedArtwork: ArtworkDetailsData = {
    id: artwork.id,
    title: artwork.title,
    slug: artwork.slug,
    imageUrl: artwork.imageUrl,
    price: artwork.price,
    description: artwork.description ?? "",
    technique: artwork.technique,
    dimensions: artwork.dimensions,
    year: artwork.year,
    status: artwork.status,
    isSoldOut: artwork.status === "SOLD" || artwork.status === "RESERVED",
  };
  const pageUrl = absoluteUrl(`/projets/${artwork.slug}`);
  const description = artworkDescription(
    artwork.title,
    artwork.metaDescription || artwork.description
  );
  const images = artwork.images.length > 0 ? artwork.images : [{ imageUrl: artwork.imageUrl }];

  return (
    <>
      <JsonLd
        data={schemaGraph([
          createBreadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Œuvres", path: "/projets" },
            { name: artwork.title, path: `/projets/${artwork.slug}` },
          ]),
          {
            "@type": "Person",
            "@id": ARTIST_ID,
            name: SITE_NAME,
            url: SITE_URL,
          },
          {
            "@type": ["VisualArtwork", "Product"],
            "@id": `${pageUrl}#artwork`,
            name: artwork.title,
            url: pageUrl,
            mainEntityOfPage: pageUrl,
            description,
            image: images.map((image) => ({
              "@type": "ImageObject",
              contentUrl: image.imageUrl,
              url: image.imageUrl,
              caption: artworkImageAlt(artwork.title),
              representativeOfPage: image.imageUrl === artwork.imageUrl,
            })),
            thumbnailUrl: artwork.imageUrl,
            creator: { "@id": ARTIST_ID },
            artist: { "@id": ARTIST_ID },
            copyrightHolder: { "@id": ARTIST_ID },
            copyrightYear: artwork.year ?? undefined,
            dateCreated: artwork.year ? String(artwork.year) : undefined,
            dateModified: artwork.updatedAt.toISOString(),
            artform: "Peinture intuitive abstraite contemporaine",
            artMedium: artwork.technique ?? "Techniques mixtes",
            artworkSurface: artworkSurface(artwork.technique),
            genre: ["Peinture intuitive", "Art contemporain", "Peinture abstraite"],
            category: "Œuvre d’art originale",
            inLanguage: "fr-FR",
            identifier: artwork.slug,
            sku: artwork.slug,
            ...dimensionsSchema(artwork.dimensions),
            offers: {
              "@type": "Offer",
              url: pageUrl,
              price: artwork.price,
              priceCurrency: "EUR",
              availability: availability(artwork.status),
              itemCondition: "https://schema.org/NewCondition",
              seller: { "@id": ARTIST_ID },
            },
          },
        ])}
      />
      <main className="bg-pb-black text-pb-white">
        <Header />
        <ArtworkDetailsClient artwork={normalizedArtwork} nextArtwork={nextArtwork} />
        <Footer />
      </main>
    </>
  );
}
