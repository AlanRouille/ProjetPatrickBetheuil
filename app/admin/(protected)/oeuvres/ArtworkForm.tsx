import { Artwork, ArtworkImage } from "@prisma/client";
import Link from "next/link";

const statusOptions = [
  { value: "AVAILABLE", label: "Disponible" },
  { value: "RESERVED", label: "Réservée" },
  { value: "SOLD", label: "Vendue" },
];

type ArtworkWithImages = Artwork & { images: ArtworkImage[] };

type ArtworkFormProps = {
  action: (formData: FormData) => void;
  artwork?: ArtworkWithImages;
  submitLabel: string;
};

const fieldClassName =
  "mt-2 w-full rounded-sm border border-white/15 bg-black/30 px-4 py-3 text-[#F0F0EE] outline-none transition focus:border-[#F49C1A]";

export function ArtworkForm({
  action,
  artwork,
  submitLabel,
}: ArtworkFormProps) {
  const primaryImage = artwork?.images[0]?.imageUrl ?? artwork?.imageUrl ?? "";
  const secondaryImages =
    artwork?.images
      .slice(1)
      .map((image) => image.imageUrl)
      .join("\n") ?? "";

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-[#F0F0EE]/75">Titre</span>
          <input
            name="title"
            required
            defaultValue={artwork?.title}
            className={fieldClassName}
          />
        </label>

        <label className="block">
          <span className="text-sm text-[#F0F0EE]/75">Slug</span>
          <input
            name="slug"
            defaultValue={artwork?.slug}
            className={fieldClassName}
            placeholder="la-vie"
          />
        </label>

        <label className="block">
          <span className="text-sm text-[#F0F0EE]/75">Prix</span>
          <input
            name="price"
            required
            inputMode="decimal"
            defaultValue={artwork?.price}
            className={fieldClassName}
          />
        </label>

        <label className="block">
          <span className="text-sm text-[#F0F0EE]/75">Statut</span>
          <select
            name="status"
            defaultValue={artwork?.status ?? "AVAILABLE"}
            className={fieldClassName}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm text-[#F0F0EE]/75">Format</span>
          <input
            name="dimensions"
            defaultValue={artwork?.dimensions ?? ""}
            className={fieldClassName}
            placeholder="40x50"
          />
        </label>

        <label className="block">
          <span className="text-sm text-[#F0F0EE]/75">Année</span>
          <input
            name="year"
            inputMode="numeric"
            defaultValue={artwork?.year ?? 2026}
            className={fieldClassName}
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm text-[#F0F0EE]/75">Technique</span>
        <textarea
          name="technique"
          rows={4}
          defaultValue={artwork?.technique ?? ""}
          className={fieldClassName}
        />
      </label>

      <label className="block">
        <span className="text-sm text-[#F0F0EE]/75">Description</span>
        <textarea
          name="description"
          rows={5}
          defaultValue={artwork?.description ?? ""}
          className={fieldClassName}
        />
      </label>

      <label className="block">
        <span className="text-sm text-[#F0F0EE]/75">URL image principale</span>
        <input
          name="imageUrl"
          defaultValue={primaryImage}
          className={fieldClassName}
          placeholder="https://... ou /images/..."
        />
      </label>

      <label className="block">
        <span className="text-sm text-[#F0F0EE]/75">
          URLs images secondaires
        </span>
        <textarea
          name="secondaryImages"
          rows={4}
          defaultValue={secondaryImages}
          className={fieldClassName}
          placeholder="Une URL par ligne"
        />
      </label>

      <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
        <button
          type="submit"
          className="rounded-sm bg-[#F49C1A] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#ffb347]"
        >
          {submitLabel}
        </button>
        <Link
          href="/admin/oeuvres"
          className="rounded-sm border border-white/15 px-5 py-3 text-center text-sm text-[#F0F0EE] transition hover:border-[#F49C1A]"
        >
          Retour aux œuvres
        </Link>
      </div>
    </form>
  );
}
