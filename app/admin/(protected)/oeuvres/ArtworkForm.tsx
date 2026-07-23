"use client";

import { Artwork, ArtworkImage } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

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
  "mt-2 w-full rounded-sm border border-white/15 bg-black/30 px-4 py-3 text-pb-white outline-none transition focus:border-pb-accent";

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
  const [previewUrl, setPreviewUrl] = useState(primaryImage);
  const [secondaryPreviewText, setSecondaryPreviewText] =
    useState(secondaryImages);
  const secondaryPreviewUrls = useMemo(
    () =>
      secondaryPreviewText
        .split(/\r?\n/)
        .map((url) => url.trim())
        .filter(Boolean),
    [secondaryPreviewText]
  );
  const canPreview = (url: string) =>
    url.startsWith("https://") || url.startsWith("/");
  const hasPrimaryPreview = canPreview(previewUrl.trim());

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="text-sm text-pb-white/75">Titre</span>
          <input
            name="title"
            required
            defaultValue={artwork?.title}
            className={fieldClassName}
          />
        </label>

        <label className="block">
          <span className="text-sm text-pb-white/75">Slug</span>
          <input
            name="slug"
            defaultValue={artwork?.slug}
            className={fieldClassName}
            placeholder="la-vie"
          />
        </label>

        <label className="block">
          <span className="text-sm text-pb-white/75">Prix</span>
          <input
            name="price"
            required
            inputMode="decimal"
            defaultValue={artwork?.price}
            className={fieldClassName}
          />
        </label>

        <label className="block">
          <span className="text-sm text-pb-white/75">Statut</span>
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
          <span className="text-sm text-pb-white/75">Format</span>
          <input
            name="dimensions"
            defaultValue={artwork?.dimensions ?? ""}
            className={fieldClassName}
            placeholder="40x50"
          />
        </label>

        <label className="block">
          <span className="text-sm text-pb-white/75">Année</span>
          <input
            name="year"
            inputMode="numeric"
            defaultValue={artwork?.year ?? 2026}
            className={fieldClassName}
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm text-pb-white/75">Technique</span>
        <textarea
          name="technique"
          rows={4}
          defaultValue={artwork?.technique ?? ""}
          className={fieldClassName}
        />
      </label>

      <label className="block">
        <span className="text-sm text-pb-white/75">Description</span>
        <textarea
          name="description"
          rows={5}
          defaultValue={artwork?.description ?? ""}
          className={fieldClassName}
        />
      </label>

      <label className="block">
        <span className="text-sm text-pb-white/75">
          URL Cloudinary image principale
        </span>
        <input
          name="imageUrl"
          defaultValue={primaryImage}
          onChange={(event) => setPreviewUrl(event.target.value)}
          className={fieldClassName}
          placeholder="https://res.cloudinary.com/..."
        />
      </label>

      <div className="rounded-sm border border-white/10 bg-black/20 p-4">
        <p className="text-sm text-pb-white/75">Aperçu image principale</p>
        {hasPrimaryPreview ? (
          <div className="relative mt-3 h-64 overflow-hidden rounded-sm bg-black/30">
            <Image
              src={previewUrl}
              alt="Aperçu de l'œuvre"
              fill
              sizes="(min-width: 768px) 720px, 90vw"
              className="object-contain"
            />
          </div>
        ) : (
          <p className="mt-3 border border-dashed border-pb-accent/40 px-4 py-6 text-sm text-pb-white/65">
            Aucune image principale renseignée.
          </p>
        )}
      </div>

      <label className="block">
        <span className="text-sm text-pb-white/75">
          URLs Cloudinary images secondaires
        </span>
        <textarea
          name="secondaryImages"
          rows={4}
          defaultValue={secondaryImages}
          onChange={(event) => setSecondaryPreviewText(event.target.value)}
          className={fieldClassName}
          placeholder="Une URL par ligne"
        />
        <span className="mt-2 block text-xs text-pb-white/50">
          L’ordre des lignes définit l’ordre d’affichage. Pour retirer une
          image, supprimez simplement sa ligne puis enregistrez.
        </span>
      </label>

      {secondaryPreviewUrls.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {secondaryPreviewUrls.filter(canPreview).map((imageUrl, index) => (
            <div
              key={`${imageUrl}-${index}`}
              className="rounded-sm border border-white/10 bg-black/20 p-3"
            >
              <p className="mb-2 text-xs text-pb-white/55">
                Image secondaire {index + 1}
              </p>
              <div className="relative h-36 overflow-hidden rounded-sm bg-black/30">
                <Image
                  src={imageUrl}
                  alt={`Aperçu image secondaire ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 280px, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
        <button
          type="submit"
          className="rounded-sm bg-pb-accent px-5 py-3 text-sm font-semibold text-pb-black transition hover:bg-pb-white"
        >
          {submitLabel}
        </button>
        <Link
          href="/admin/oeuvres"
          className="rounded-sm border border-white/15 px-5 py-3 text-center text-sm text-pb-white transition hover:border-pb-accent"
        >
          Retour aux œuvres
        </Link>
      </div>
    </form>
  );
}
