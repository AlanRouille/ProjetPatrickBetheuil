import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  ArtworkDetailsClient,
  type ArtworkDetailsData,
  type NextArtworkData,
} from "./ArtworkDetailsClient";

async function getArtwork(id: number): Promise<ArtworkDetailsData | null> {
  const artwork = await prisma.artwork.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      price: true,
      description: true,
      technique: true,
      dimensions: true,
      year: true,
      status: true,
    },
  });

  if (!artwork) return null;

  return {
    ...artwork,
    description: artwork.description ?? "",
    status: artwork.status,
    isSoldOut: artwork.status === "SOLD" || artwork.status === "RESERVED",
  };
}

async function getNextArtwork(id: number): Promise<NextArtworkData | null> {
  const select = {
    id: true,
    title: true,
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

export default async function ArtworkDetails({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  if (!Number.isInteger(id)) notFound();

  const [artwork, nextArtwork] = await Promise.all([
    getArtwork(id),
    getNextArtwork(id),
  ]);

  if (!artwork) notFound();

  return (
    <main className="bg-pb-black text-pb-white">
      <Header />
      <ArtworkDetailsClient artwork={artwork} nextArtwork={nextArtwork} />
      <Footer />
    </main>
  );
}
