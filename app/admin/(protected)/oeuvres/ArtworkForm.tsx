"use client";

import { Artwork, ArtworkImage } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { createCloudinaryUploadSignatureAction } from "./actions";

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

const acceptedImageTypes = new Set([
  "image/avif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const maximumFileSize = 10 * 1024 * 1024;

type UploadSignature = Awaited<
  ReturnType<typeof createCloudinaryUploadSignatureAction>
>;

type CloudinaryUploadResponse = {
  error?: { message?: string };
  secure_url?: string;
};

function validateImage(file: File) {
  if (!acceptedImageTypes.has(file.type)) {
    throw new Error(
      `${file.name} : utilisez une image JPG, PNG, WebP ou AVIF.`
    );
  }

  if (file.size > maximumFileSize) {
    throw new Error(`${file.name} dépasse la taille maximale de 10 Mo.`);
  }
}

async function uploadImage(file: File, uploadSignature: UploadSignature) {
  validateImage(file);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", uploadSignature.apiKey);
  formData.append("folder", uploadSignature.folder);
  formData.append("signature", uploadSignature.signature);
  formData.append("timestamp", String(uploadSignature.timestamp));

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${uploadSignature.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const result = (await response.json()) as CloudinaryUploadResponse;

  if (!response.ok || !result.secure_url) {
    throw new Error(
      result.error?.message ?? "Cloudinary n’a pas pu importer cette image."
    );
  }

  return result.secure_url;
}

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
  const [primaryUploadMessage, setPrimaryUploadMessage] = useState("");
  const [secondaryUploadMessage, setSecondaryUploadMessage] = useState("");
  const [isPrimaryUploading, setIsPrimaryUploading] = useState(false);
  const [isSecondaryUploading, setIsSecondaryUploading] = useState(false);
  const primaryFileInputRef = useRef<HTMLInputElement>(null);
  const secondaryFileInputRef = useRef<HTMLInputElement>(null);
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
  const isUploading = isPrimaryUploading || isSecondaryUploading;

  async function handlePrimaryUpload(file: File) {
    setIsPrimaryUploading(true);
    setPrimaryUploadMessage(`Import de ${file.name} en cours…`);

    try {
      const uploadSignature =
        await createCloudinaryUploadSignatureAction();
      const imageUrl = await uploadImage(file, uploadSignature);

      setPreviewUrl(imageUrl);
      setPrimaryUploadMessage("Image principale importée avec succès.");
    } catch (error) {
      setPrimaryUploadMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue pendant l’import."
      );
    } finally {
      setIsPrimaryUploading(false);
    }
  }

  async function handleSecondaryUpload(files: File[]) {
    setIsSecondaryUploading(true);
    setSecondaryUploadMessage(
      `Import de ${files.length} image${files.length > 1 ? "s" : ""} en cours…`
    );

    try {
      files.forEach(validateImage);

      const uploadSignature =
        await createCloudinaryUploadSignatureAction();
      const imageUrls = await Promise.all(
        files.map((file) => uploadImage(file, uploadSignature))
      );

      setSecondaryPreviewText((currentValue) =>
        [currentValue.trim(), ...imageUrls].filter(Boolean).join("\n")
      );
      setSecondaryUploadMessage(
        `${imageUrls.length} image${imageUrls.length > 1 ? "s" : ""} importée${
          imageUrls.length > 1 ? "s" : ""
        } avec succès.`
      );
    } catch (error) {
      setSecondaryUploadMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue pendant l’import."
      );
    } finally {
      setIsSecondaryUploading(false);
    }
  }

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

      <section className="rounded-sm border border-white/10 bg-black/20 p-4">
        <p className="text-sm font-medium text-pb-white">
          Image principale
        </p>
        <p className="mt-1 text-xs leading-relaxed text-pb-white/55">
          Formats acceptés : JPG, PNG, WebP et AVIF. Taille maximale : 10 Mo.
        </p>
        <input
          ref={primaryFileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          className="sr-only"
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";

            if (file) {
              void handlePrimaryUpload(file);
            }
          }}
        />
        <button
          type="button"
          disabled={isPrimaryUploading}
          onClick={() => primaryFileInputRef.current?.click()}
          className="mt-4 rounded-sm bg-pb-accent px-5 py-3 text-sm font-semibold text-pb-black transition hover:bg-pb-white disabled:cursor-wait disabled:opacity-60"
        >
          {isPrimaryUploading
            ? "Téléversement en cours…"
            : "Choisir une image"}
        </button>
        {primaryUploadMessage && (
          <p
            className="mt-3 text-sm text-pb-white/70"
            role="status"
            aria-live="polite"
          >
            {primaryUploadMessage}
          </p>
        )}
      </section>

      <label className="block">
        <span className="text-sm text-pb-white/75">
          URL de l’image principale
        </span>
        <input
          name="imageUrl"
          value={previewUrl}
          onChange={(event) => setPreviewUrl(event.target.value)}
          className={fieldClassName}
          placeholder="https://res.cloudinary.com/..."
        />
        <span className="mt-2 block text-xs text-pb-white/50">
          Cette URL est remplie automatiquement après l’import. Elle reste
          modifiable si vous souhaitez utiliser une image déjà hébergée.
        </span>
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

      <section className="rounded-sm border border-white/10 bg-black/20 p-4">
        <p className="text-sm font-medium text-pb-white">
          Images secondaires
        </p>
        <p className="mt-1 text-xs leading-relaxed text-pb-white/55">
          Vous pouvez sélectionner plusieurs fichiers en une seule fois.
        </p>
        <input
          ref={secondaryFileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          className="sr-only"
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []);
            event.target.value = "";

            if (files.length > 0) {
              void handleSecondaryUpload(files);
            }
          }}
        />
        <button
          type="button"
          disabled={isSecondaryUploading}
          onClick={() => secondaryFileInputRef.current?.click()}
          className="mt-4 rounded-sm border border-pb-accent px-5 py-3 text-sm font-semibold text-pb-white transition hover:bg-pb-accent hover:text-pb-black disabled:cursor-wait disabled:opacity-60"
        >
          {isSecondaryUploading
            ? "Téléversement en cours…"
            : "Ajouter des images"}
        </button>
        {secondaryUploadMessage && (
          <p
            className="mt-3 text-sm text-pb-white/70"
            role="status"
            aria-live="polite"
          >
            {secondaryUploadMessage}
          </p>
        )}
      </section>

      <label className="block">
        <span className="text-sm text-pb-white/75">
          URLs des images secondaires
        </span>
        <textarea
          name="secondaryImages"
          rows={4}
          value={secondaryPreviewText}
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
          disabled={isUploading}
          className="rounded-sm bg-pb-accent px-5 py-3 text-sm font-semibold text-pb-black transition hover:bg-pb-white disabled:cursor-wait disabled:opacity-60"
        >
          {isUploading ? "Import en cours…" : submitLabel}
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
