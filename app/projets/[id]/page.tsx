import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { Header } from "../../_components/Header";
import ArtworkDetailsClient from "./ArtworkDetailsClient";

const prisma = new PrismaClient();

interface ArtworkDetailsProps {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  isSoldOut: boolean;
}

async function getArtwork(id: number): Promise<ArtworkDetailsProps | null> {
  const artwork = await prisma.artwork.findUnique({
    where: { id: id },
    select: {
      id: true,
      title: true,
      imageUrl: true,
      price: true,
      description: true,
      status: true,
    },
  });

  if (!artwork) {
    return null;
  }

  return {
    id: artwork.id,
    title: artwork.title,
    imageUrl: artwork.imageUrl,
    price: artwork.price,
    description: artwork.description ?? "",
    isSoldOut: artwork.status === "SOLD" || artwork.status === "RESERVED",
  };
}

export default async function ArtworkDetails({
  params,
}: {
  params: { id: string };
}) {
  const artwork = await getArtwork(Number(params.id));

  if (!artwork) {
    notFound(); // Rediriger vers une page 404 si l'œuvre n'est pas trouvée
  }

  return (
    <div className="min-h-screen overflow-hidden flex flex-col relative">
      <Header showLogo={true} />
      <ArtworkDetailsClient artwork={artwork!} />
    </div>
  );
}
