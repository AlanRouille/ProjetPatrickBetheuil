"use server";

import { auth } from "@/auth";
import { ArtworkStatus, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function requireAdmin() {
  const session = await auth();

  if (!session) {
    throw new Error("Vous devez être connecté pour modifier les œuvres.");
  }
}

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function readNumber(formData: FormData, key: string) {
  const rawValue = readText(formData, key).replace(",", ".");
  const value = Number(rawValue);

  if (Number.isNaN(value)) {
    throw new Error("Un champ numérique est invalide.");
  }

  return value;
}

function readOptionalNumber(formData: FormData, key: string) {
  const rawValue = readText(formData, key);

  if (!rawValue) {
    return null;
  }

  const value = Number(rawValue);

  if (Number.isNaN(value)) {
    throw new Error("L'année est invalide.");
  }

  return value;
}

function readImages(formData: FormData, slug: string) {
  const primaryImageUrl = readText(formData, "imageUrl");
  const secondaryImageUrls = readText(formData, "secondaryImages")
    .split(/\r?\n/)
    .map((url) => url.trim())
    .filter(Boolean);
  const imageUrls = [
    primaryImageUrl || `/images/background.png?artwork=${slug}`,
    ...secondaryImageUrls,
  ];

  return imageUrls.map((imageUrl, position) => ({
    imageUrl,
    alt: readText(formData, "title"),
    position,
  }));
}

function readArtworkPayload(formData: FormData) {
  const title = readText(formData, "title");
  const slug = readText(formData, "slug") || slugify(title);
  const images = readImages(formData, slug);

  if (!title) {
    throw new Error("Le titre est obligatoire.");
  }

  return {
    title,
    slug,
    price: readNumber(formData, "price"),
    dimensions: readText(formData, "dimensions") || null,
    technique: readText(formData, "technique") || null,
    year: readOptionalNumber(formData, "year"),
    status: readText(formData, "status") as ArtworkStatus,
    description: readText(formData, "description") || null,
    imageUrl: images[0].imageUrl,
    images,
  };
}

export async function createArtworkAction(formData: FormData) {
  await requireAdmin();

  const payload = readArtworkPayload(formData);

  await prisma.artwork.create({
    data: {
      title: payload.title,
      slug: payload.slug,
      price: payload.price,
      dimensions: payload.dimensions,
      technique: payload.technique,
      year: payload.year,
      status: payload.status,
      description: payload.description,
      imageUrl: payload.imageUrl,
      metaTitle: payload.title,
      metaDescription: payload.description,
      images: {
        create: payload.images,
      },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/oeuvres");
  revalidatePath("/projets");
  redirect("/admin/oeuvres");
}

export async function updateArtworkAction(id: number, formData: FormData) {
  await requireAdmin();

  const payload = readArtworkPayload(formData);

  await prisma.artwork.update({
    where: { id },
    data: {
      title: payload.title,
      slug: payload.slug,
      price: payload.price,
      dimensions: payload.dimensions,
      technique: payload.technique,
      year: payload.year,
      status: payload.status,
      description: payload.description,
      imageUrl: payload.imageUrl,
      metaTitle: payload.title,
      metaDescription: payload.description,
      images: {
        deleteMany: {},
        create: payload.images,
      },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/oeuvres");
  revalidatePath(`/projets/${id}`);
  revalidatePath("/projets");
  redirect("/admin/oeuvres");
}

export async function setArtworkStatusAction(formData: FormData) {
  await requireAdmin();

  const id = Number(readText(formData, "id"));
  const status = readText(formData, "status") as ArtworkStatus;

  await prisma.artwork.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/oeuvres");
  revalidatePath(`/projets/${id}`);
  revalidatePath("/projets");
}

export async function deleteArtworkAction(formData: FormData) {
  await requireAdmin();

  const id = Number(readText(formData, "id"));
  const linkedOrders = await prisma.orderItem.count({ where: { artworkId: id } });

  if (linkedOrders > 0) {
    throw new Error(
      "Cette œuvre est liée à une commande et ne peut pas être supprimée."
    );
  }

  await prisma.artwork.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/admin/oeuvres");
  revalidatePath("/projets");
}
