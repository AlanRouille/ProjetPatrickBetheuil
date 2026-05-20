import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultTechnique =
  "Support papier 350g, encre de chine aquarellable, saupoudrage de cendre d'encens, café, collage d'éléments naturels (feuilles, bois, sable, graines...), outils : pinceaux, calames.";

const officialArtworks = [
  {
    id: 1,
    title: "La Vie",
    slug: "la-vie",
    dimensions: "40x50",
    price: 150,
  },
  {
    id: 2,
    title: "L'intemporalité",
    slug: "lintemporalite",
    dimensions: "40x50",
    price: 150,
  },
  {
    id: 3,
    title: "Les Quartz",
    slug: "les-quartz",
    dimensions: "40x50",
    price: 100,
  },
  {
    id: 4,
    title: "La Résilience",
    slug: "la-resilience",
    dimensions: "40x50",
    price: 150,
  },
  {
    id: 5,
    title: "L'Espérance",
    slug: "lesperance",
    dimensions: "40x50",
    price: 150,
  },
  {
    id: 6,
    title: "La Mutation",
    slug: "la-mutation",
    dimensions: "40x50",
    price: 150,
  },
  {
    id: 7,
    title: "Le Voyage",
    slug: "le-voyage",
    dimensions: "40x50",
    price: 100,
  },
  {
    id: 8,
    title: "La Légèreté",
    slug: "la-legerete",
    dimensions: "40x50",
    price: 100,
  },
  {
    id: 9,
    title: "L'Introspection",
    slug: "lintrospection",
    dimensions: "40x50",
    price: 150,
  },
  {
    id: 10,
    title: "La Complicité",
    slug: "la-complicite",
    dimensions: "50x70",
    price: 200,
  },
];

function placeholderImageUrl(slug) {
  return `/images/background.png?artwork=${slug}`;
}

async function main() {
  const linkedArtworks = await prisma.orderItem.count();

  if (linkedArtworks > 0) {
    throw new Error(
      "Le seed ne peut pas supprimer le catalogue : des œuvres sont liées à des commandes."
    );
  }

  await prisma.artworkImage.deleteMany();
  await prisma.artwork.deleteMany();

  for (const artwork of officialArtworks) {
    const imageUrl = placeholderImageUrl(artwork.slug);

    await prisma.artwork.upsert({
      where: { id: artwork.id },
      update: {
        title: artwork.title,
        slug: artwork.slug,
        imageUrl,
        price: artwork.price,
        dimensions: artwork.dimensions,
        technique: defaultTechnique,
        year: 2026,
        status: "AVAILABLE",
        description:
          "Description à compléter depuis les informations client et les visuels officiels.",
        metaTitle: artwork.title,
        metaDescription: `${artwork.title}, œuvre originale de Patrick Bétheuil.`,
        images: {
          deleteMany: {},
          create: {
            imageUrl,
            alt: artwork.title,
            position: 0,
          },
        },
      },
      create: {
        id: artwork.id,
        title: artwork.title,
        slug: artwork.slug,
        imageUrl,
        price: artwork.price,
        dimensions: artwork.dimensions,
        technique: defaultTechnique,
        year: 2026,
        status: "AVAILABLE",
        description:
          "Description à compléter depuis les informations client et les visuels officiels.",
        metaTitle: artwork.title,
        metaDescription: `${artwork.title}, œuvre originale de Patrick Bétheuil.`,
        images: {
          create: {
            imageUrl,
            alt: artwork.title,
            position: 0,
          },
        },
      },
    });
  }

  await prisma.$executeRawUnsafe(
    'SELECT setval(pg_get_serial_sequence(\'"Artwork"\', \'id\'), (SELECT MAX("id") FROM "Artwork"))'
  );

  console.log("Official artworks seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
