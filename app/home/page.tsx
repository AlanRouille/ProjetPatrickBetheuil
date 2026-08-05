import { createPageMetadata } from "@/lib/seo";
import { permanentRedirect } from "next/navigation";

export const metadata = createPageMetadata({
  title: "Accueil",
  description: "Site officiel de Patrick Betheuil, artiste peintre français.",
  canonical: "/",
  noIndex: true,
});

export default function LegacyHomePage() {
  permanentRedirect("/");
}
