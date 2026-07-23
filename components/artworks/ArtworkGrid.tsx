import { ArtworkCard, type ArtworkCardData } from "./ArtworkCard";

interface ArtworkGridProps {
  artworks: ArtworkCardData[];
}

export function ArtworkGrid({ artworks }: ArtworkGridProps) {
  return (
    <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
      {artworks.map((artwork, index) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          priority={index < 2}
        />
      ))}
    </div>
  );
}
