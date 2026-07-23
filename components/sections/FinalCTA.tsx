import { FadeReveal } from "@/components/animations/FadeReveal";
import { DesignButton } from "@/components/ui/DesignButton";
import { Container } from "@/components/ui/Container";

export function FinalCTA() {
  return (
    <section className="bg-pb-black py-24 text-pb-white md:py-36">
      <Container>
        <FadeReveal>
          <div className="grid gap-12 lg:grid-cols-[0.35fr_1fr] lg:items-center">
            <DesignButton href="/projets" variant="circle">
              Voir
            </DesignButton>
            <div>
              <p className="font-sans text-5xl font-normal uppercase leading-none sm:text-6xl md:text-8xl lg:text-9xl">
                Poursuivez
              </p>
              <p className="mt-8 font-title text-5xl font-normal leading-[0.95] sm:text-6xl md:text-8xl lg:text-9xl">
                le voyage
              </p>
              <p className="mt-5 font-sans text-4xl font-normal uppercase leading-none sm:text-5xl md:text-7xl lg:text-8xl">
                à travers mes œuvres
              </p>
            </div>
          </div>
        </FadeReveal>
      </Container>
    </section>
  );
}
