import { createPageMetadata } from "@/lib/seo";
import { permanentRedirect } from "next/navigation";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contactez Patrick Betheuil pour une œuvre originale, une peinture intuitive ou une demande autour de son travail artistique.",
  canonical: "/",
  noIndex: true,
});

export default function ContactPage() {
  permanentRedirect("/#contact");
}
