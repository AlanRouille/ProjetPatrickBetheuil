import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { ArtworkForm } from "../../ArtworkForm";
import { updateArtworkAction } from "../../actions";

const prisma = new PrismaClient();

export default async function EditArtworkPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  if (Number.isNaN(id)) {
    notFound();
  }

  const artwork = await prisma.artwork.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { position: "asc" },
      },
    },
  });

  if (!artwork) {
    notFound();
  }

  const action = updateArtworkAction.bind(null, artwork.id);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-[#F49C1A]">
          Modifier
        </p>
        <h2 className="mt-2 text-3xl font-light">{artwork.title}</h2>
        <p className="mt-2 text-sm text-[#F0F0EE]/65">
          Mettez à jour les informations visibles dans le catalogue.
        </p>
      </div>

      <section className="rounded-sm border border-white/10 bg-[#211E1B] p-5 md:p-7">
        <ArtworkForm
          action={action}
          artwork={artwork}
          submitLabel="Enregistrer les modifications"
        />
      </section>
    </div>
  );
}
