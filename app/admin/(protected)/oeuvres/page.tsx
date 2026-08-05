import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { ArtworkRowActions } from "./ArtworkRowActions";

export const dynamic = "force-dynamic";

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

const statusLabels = {
  AVAILABLE: "Disponible",
  RESERVED: "Réservée",
  SOLD: "Vendue",
};

export default async function AdminArtworksPage() {
  const artworks = await prisma.artwork.findMany({
    orderBy: { id: "asc" },
    include: {
      images: {
        orderBy: { position: "asc" },
        take: 1,
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-pb-accent">
            Œuvres
          </p>
          <h2 className="mt-2 text-3xl font-light">Catalogue de la galerie</h2>
          <p className="mt-2 text-sm text-pb-white/65">
            Ajoutez, modifiez et suivez les œuvres visibles sur le site.
          </p>
        </div>

        <Link
          href="/admin/oeuvres/nouveau"
          className="w-fit rounded-sm bg-pb-accent px-4 py-3 text-sm font-semibold text-pb-black transition hover:bg-pb-white"
        >
          Ajouter une œuvre
        </Link>
      </div>

      <section className="overflow-hidden rounded-sm border border-white/10 bg-pb-white/[0.04]">
        <div className="hidden border-b border-white/10 px-5 py-3 text-sm text-pb-white/55 xl:grid xl:grid-cols-[90px_1.3fr_0.8fr_0.7fr_0.6fr_1.7fr]">
          <span>Image</span>
          <span>Titre</span>
          <span>Statut</span>
          <span>Format</span>
          <span>Prix</span>
          <span>Actions</span>
        </div>

        <div className="divide-y divide-white/10">
          {artworks.length === 0 ? (
            <p className="px-5 py-8 text-sm text-pb-white/65">
              Aucune œuvre enregistrée pour le moment.
            </p>
          ) : (
            artworks.map((artwork) => {
              const imageUrl = artwork.images[0]?.imageUrl ?? artwork.imageUrl;
              const needsImage = !imageUrl.includes("res.cloudinary.com");

              return (
                <div
                  key={artwork.id}
                  className="grid gap-4 px-5 py-4 xl:grid-cols-[90px_1.3fr_0.8fr_0.7fr_0.6fr_1.7fr] xl:items-center"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-sm bg-black/30">
                    <Image
                      src={imageUrl}
                      alt={`Aperçu de l’œuvre ${artwork.title}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                    {needsImage && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/65 px-2 text-center text-[10px] uppercase tracking-wide text-pb-white">
                        Image à ajouter
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-base text-pb-white">{artwork.title}</p>
                    <p className="mt-1 text-xs text-pb-white/45">
                      {artwork.year ?? "Année à compléter"}
                    </p>
                  </div>

                  <p className="text-sm text-pb-white/75">
                    {statusLabels[artwork.status]}
                  </p>
                  <p className="text-sm text-pb-white/75">
                    {artwork.dimensions ?? "À compléter"}
                  </p>
                  <p className="text-sm text-pb-white/75">
                    {currencyFormatter.format(artwork.price)}
                  </p>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/admin/oeuvres/${artwork.id}/modifier`}
                      className="w-fit rounded-sm border border-pb-accent/45 px-3 py-2 text-xs text-pb-white transition hover:border-pb-accent hover:bg-pb-accent hover:text-pb-black"
                    >
                      Modifier
                    </Link>
                    <ArtworkRowActions
                      id={artwork.id}
                      status={artwork.status}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
