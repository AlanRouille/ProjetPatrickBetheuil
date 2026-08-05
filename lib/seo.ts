import type { Metadata } from "next";

export const SITE_NAME = "Patrick Betheuil";
export const SITE_URL = "https://patrickbetheuil.com";
export const ARTIST_ID = `${SITE_URL}/#patrick-betheuil`;

export const DEFAULT_TITLE =
  "Patrick Betheuil — Peinture intuitive & art contemporain";
export const DEFAULT_DESCRIPTION =
  "Découvrez les peintures intuitives et abstraites de Patrick Betheuil, artiste peintre français à Chartres : œuvres originales et art contemporain.";
export const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dugwzjef9/image/upload/c_fill,g_auto,w_1200,h_630,q_auto,f_auto/v1779434851/la-vie.jpg";

export const SEO_KEYWORDS = [
  "peinture intuitive",
  "peinture abstraite intuitive",
  "art intuitif",
  "art contemporain",
  "artiste peintre français",
  "artiste contemporain",
  "peinture contemporaine",
  "œuvre originale",
  "tableau original",
  "tableau contemporain",
  "peinture abstraite",
  "art moderne",
  "peinture expressive",
  "peinture émotionnelle",
  "peinture sur toile",
  "artiste peintre Chartres",
  "artiste peintre Eure-et-Loir",
  "artiste peintre Centre-Val de Loire",
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function artworkImageAlt(title: string) {
  return `${title}, peinture intuitive originale de Patrick Betheuil`;
}

export function toOpenGraphImage(imageUrl: string) {
  if (!imageUrl.includes("res.cloudinary.com") || !imageUrl.includes("/image/upload/")) {
    return imageUrl;
  }

  return imageUrl.replace(
    "/image/upload/",
    "/image/upload/c_fill,g_auto,w_1200,h_630,q_auto,f_auto/"
  );
}

export function conciseDescription(value: string, maximumLength = 158) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maximumLength) return normalized;

  const shortened = normalized.slice(0, maximumLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  const boundary = lastSpace >= maximumLength * 0.72 ? lastSpace : shortened.length;

  return `${shortened.slice(0, boundary).replace(/[\s,;:.!?-]+$/g, "")}…`;
}

export function artworkDescription(title: string, description?: string | null) {
  const lead = `${title}, peinture intuitive originale de Patrick Betheuil, artiste peintre français.`;
  return conciseDescription(description ? `${lead} ${description}` : lead);
}

interface PageMetadataOptions {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  imageAlt = "Peinture intuitive de Patrick Betheuil",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(canonical);
  const socialTitle = `${title} | ${SITE_NAME}`;
  const normalizedDescription = conciseDescription(description);
  const socialImage = toOpenGraphImage(image);

  return {
    title,
    description: normalizedDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: socialTitle,
      description: normalizedDescription,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: normalizedDescription,
      images: [socialImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          noarchive: true,
          nocache: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function schemaGraph(nodes: Array<Record<string, unknown>>) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
