import { TextReveal } from "@/components/animations/TextReveal";
import Image from "next/image";
import Link from "next/link";

interface HeroSectionProps {
  imageUrl: string;
}

export function HeroSection({ imageUrl }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-pb-black text-pb-white">
      <Image
        src={imageUrl}
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        quality={72}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-pb-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,15,14,0.38)_0%,rgba(15,15,14,0.16)_48%,rgba(15,15,14,0.04)_78%)]" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pt-20 text-center sm:px-8">
        <TextReveal className="w-full sm:px-8 md:px-12 xl:px-24">
          <h1 className="mx-auto max-w-[12ch] font-title text-[clamp(2.75rem,11vw,3.5rem)] font-normal leading-[0.98] drop-shadow-[0_4px_18px_rgba(0,0,0,0.78)] sm:text-[clamp(3.5rem,8vw,5rem)] lg:max-w-none lg:text-[clamp(5rem,7vw,7.5rem)] lg:leading-none">
            Invitation à mon imaginaire
          </h1>
        </TextReveal>
        <TextReveal className="w-full" delay={0.18}>
          <p className="mx-auto mt-5 max-w-[34rem] px-1 font-sans text-[15px] font-normal leading-[1.65] drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] sm:mt-6 sm:text-lg sm:leading-[1.7] md:text-xl lg:max-w-4xl lg:text-[1.375rem] lg:leading-[1.75]">
            Chaque peinture révèle une matière,
            <br className="hidden sm:block" />
            un mouvement et une émotion issus de l’atelier.
          </p>
        </TextReveal>
        <TextReveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/projets"
              className="group relative isolate inline-flex h-14 min-w-[260px] items-center justify-center overflow-hidden rounded-full border border-pb-accent bg-pb-accent px-10 font-sans text-base font-light text-pb-black transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.9,0.1,0.1,0.9)] hover:scale-[1.03] hover:shadow-[0_14px_30px_rgba(0,0,0,0.32)] active:scale-100 active:shadow-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-white md:h-16 md:min-w-[300px] md:text-lg"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 z-0 scale-0 rounded-full bg-pb-white transition-transform duration-700 ease-[cubic-bezier(0.9,0.1,0.1,0.9)] group-hover:scale-100 group-focus-visible:scale-100"
              />
              <span className="relative z-10">Découvrir mes œuvres</span>
            </Link>
          </div>
        </TextReveal>
      </div>
    </section>
  );
}
