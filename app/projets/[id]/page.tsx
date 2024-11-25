import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { Header } from "../../_components/Header";
import ArtworkDetailsClient from "./ArtworkDetailsClient"; // Import du composant client

const prisma = new PrismaClient();

interface ArtworkDetailsProps {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
}

async function getArtwork(id: number): Promise<ArtworkDetailsProps | null> {
  const artwork = await prisma.artwork.findUnique({
    where: { id: id },
  });

  if (!artwork) {
    return null;
  }

  return artwork as ArtworkDetailsProps;
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
