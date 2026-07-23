import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { prisma } from "@/lib/prisma";
import ProjetPageClient from "./ProjetPageClient";

export const dynamic = "force-dynamic";

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
    <main className="bg-pb-black text-pb-white">
      <Header />
      <ProjetPageClient projets={projets} />
      <Footer />
    </main>
  );
}
