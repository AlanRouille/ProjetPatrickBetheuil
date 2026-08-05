import { revalidatePath } from "next/cache";

export function revalidatePublicArtworkPaths(slugs: Iterable<string> = []) {
  revalidatePath("/");
  revalidatePath("/projets");
  revalidatePath("/sitemap.xml");

  for (const slug of new Set(slugs)) {
    if (slug) revalidatePath(`/projets/${slug}`);
  }
}
