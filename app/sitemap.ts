import { absoluteUrl } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import type { MetadataRoute } from "next";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const artworks = await prisma.artwork.findMany({
    select: {
      slug: true,
      updatedAt: true,
      imageUrl: true,
      title: true,
    },
    orderBy: { id: "asc" },
  });

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/projets"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/mentions-legales"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/politique-confidentialite"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/cgv"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  return [
    ...staticPages,
    ...artworks.map((artwork) => ({
      url: absoluteUrl(`/projets/${artwork.slug}`),
      lastModified: artwork.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [artwork.imageUrl],
    })),
  ];
}
