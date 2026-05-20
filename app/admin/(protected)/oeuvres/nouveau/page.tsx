import { ArtworkForm } from "../ArtworkForm";
import { createArtworkAction } from "../actions";

export default function NewArtworkPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-[#F49C1A]">
          Nouvelle œuvre
        </p>
        <h2 className="mt-2 text-3xl font-light">Ajouter une œuvre</h2>
        <p className="mt-2 text-sm text-[#F0F0EE]/65">
          Renseignez les informations principales avant de publier l’œuvre dans
          le catalogue.
        </p>
      </div>

      <section className="rounded-sm border border-white/10 bg-[#211E1B] p-5 md:p-7">
        <ArtworkForm
          action={createArtworkAction}
          submitLabel="Créer l’œuvre"
        />
      </section>
    </div>
  );
}
