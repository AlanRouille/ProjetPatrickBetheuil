import { ImageReveal } from "@/components/animations/ImageReveal";
import { artworkImageAlt } from "@/lib/seo";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export interface ArtworkCardData {
  id: number;
  title: string;
  slug: string;
  imageUrl: string;
  price: number;
  status: string;
}

interface ArtworkCardProps {
  artwork: ArtworkCardData;
  className?: string;
  preload?: boolean;
  quality?: number;
  sizes?: string;
}

export function ArtworkCard({
  artwork,
  className,
  preload = false,
  quality = 70,
  sizes = "(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 90vw",
}: ArtworkCardProps) {
  const isUnavailable = artwork.status === "SOLD" || artwork.status === "RESERVED";

  return (
    <Link
      href={`/projets/${artwork.slug}`}
      className={cn(
        "group block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-pb-accent",
        className
      )}
    >
      <ImageReveal className="relative aspect-[4/5] bg-pb-black">
        <Image
          src={artwork.imageUrl}
          alt={artworkImageAlt(artwork.title)}
          fill
          sizes={sizes}
          className="object-cover transition duration-700 group-hover:scale-[1.025]"
          preload={preload}
          quality={quality}
        />
        {isUnavailable ? (
          <span className="absolute left-4 top-4 bg-pb-black px-3 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-pb-white">
            {artwork.status === "SOLD" ? "Vendue" : "Réservée"}
          </span>
        ) : null}
      </ImageReveal>
      <div className="mt-4 flex items-end justify-between gap-3 sm:mt-5 sm:gap-4 md:mt-6">
        <h3 className="min-w-0 whitespace-nowrap font-title text-[clamp(1.35rem,6.2vw,1.55rem)] font-normal leading-none text-pb-white sm:text-[1.65rem] md:text-3xl lg:text-4xl">
          {artwork.title}
        </h3>
        <p className="shrink-0 font-sans text-lg italic leading-none text-pb-accent sm:text-xl md:text-[1.375rem] lg:text-2xl">
          {artwork.price.toLocaleString("fr-FR")} €
        </p>
      </div>
    </Link>
  );
}
