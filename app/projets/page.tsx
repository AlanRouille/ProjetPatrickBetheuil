import { PrismaClient } from "@prisma/client";
import { Header } from "../_components/Header";
import ProjetPageClient from "./ProjetPageClient";

const prisma = new PrismaClient();

async function getProjets() {
  const projets = await prisma.artwork.findMany({
    select: {
      id: true,
      title: true,
      imageUrl: true,
      status: true,
    },
  }); // Récupérer tous les projets dans la base de données

  return projets.map((projet) => ({
    id: projet.id,
    title: projet.title,
    imageUrl: projet.imageUrl,
    isSoldOut: projet.status === "SOLD" || projet.status === "RESERVED",
  }));
}

export default async function ProjetPage() {
  const projets = await getProjets();

  return (
    <div>
      <Header showLogo={true} />
      <ProjetPageClient projets={projets} />
    </div>
  );
}
