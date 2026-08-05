import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { prisma } from "@/lib/prisma";
import {
  absoluteUrl,
  createBreadcrumbSchema,
  createPageMetadata,
  schemaGraph,
} from "@/lib/seo";
import ProjetPageClient from "./ProjetPageClient";

export const revalidate = 3600;

export const metadata = createPageMetadata({
  title: "Peintures intuitives originales",
  description:
    "Explorez les peintures intuitives, abstraites et contemporaines de Patrick Betheuil. Des œuvres d’art originales et uniques disponibles à l’acquisition.",
  canonical: "/projets",
  imageAlt: "Galerie de peintures intuitives originales de Patrick Betheuil",
});

async function getProjets() {
  const projets = await prisma.artwork.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      imageUrl: true,
      status: true,
    },
  }); // Récupérer tous les projets dans la base de données

  return projets.map((projet) => ({
    id: projet.id,
    title: projet.title,
    slug: projet.slug,
    imageUrl: projet.imageUrl,
    isSoldOut: projet.status === "SOLD" || projet.status === "RESERVED",
  }));
}

export default async function ProjetPage() {
  const projets = await getProjets();

  return (
    <>
      <JsonLd
        data={schemaGraph([
          createBreadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Œuvres", path: "/projets" },
          ]),
          {
            "@type": "CollectionPage",
            "@id": `${absoluteUrl("/projets")}#collection`,
            url: absoluteUrl("/projets"),
            name: "Peintures intuitives originales de Patrick Betheuil",
            description:
              "Galerie de peintures intuitives, abstraites et contemporaines originales de Patrick Betheuil.",
            inLanguage: "fr-FR",
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: projets.length,
              itemListElement: projets.map((projet, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: projet.title,
                url: absoluteUrl(`/projets/${projet.slug}`),
              })),
            },
          },
        ])}
      />
      <main className="bg-pb-black text-pb-white">
        <Header />
        <ProjetPageClient projets={projets} />
        <Footer />
      </main>
    </>
  );
}
