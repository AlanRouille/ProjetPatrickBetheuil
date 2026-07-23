import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  accent?: string;
  className?: string;
  light?: boolean;
}

export function SectionTitle({
  eyebrow,
  title,
  accent,
  className,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "font-sans text-xs font-medium uppercase tracking-[0.24em]",
            light ? "text-pb-muted" : "text-pb-accent"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-title text-5xl font-normal leading-none md:text-7xl lg:text-8xl",
          light ? "text-pb-white" : "text-pb-black"
        )}
      >
        {title}
        {accent ? (
          <span className="block font-sans text-5xl font-medium uppercase tracking-normal text-pb-accent md:text-7xl lg:text-8xl">
            {accent}
          </span>
        ) : null}
      </h2>
    </div>
  );
}
