import { FadeReveal } from "@/components/animations/FadeReveal";
import { Container } from "@/components/ui/Container";
import Image from "next/image";

export function AboutPreview() {
  return (
    <section
      id="about"
      data-header-theme="dark"
      className="flex min-h-[100dvh] items-center overflow-hidden bg-pb-white py-20 text-pb-black md:h-[100dvh] md:min-h-[720px] md:py-24"
    >
      <Container>
        <div className="grid w-full items-center gap-12 md:grid-cols-[0.9fr_1fr] lg:gap-16">
          <FadeReveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[430px] md:max-w-[360px] lg:max-w-[430px]">
              <Image
                src="/images/l'artiste.jpg"
                alt="Patrick Betheuil, artiste peintre, dans son atelier à Chartres"
                fill
                sizes="(min-width: 1024px) 34vw, 80vw"
                className="object-cover"
              />
            </div>
          </FadeReveal>
          <FadeReveal delay={0.08} x={72} y={0}>
            <div className="max-w-xl">
              <h2 className="font-sans text-xl font-semibold leading-snug">
                Je crée des peintures intuitives nées de l’intuition et du vivant.
              </h2>
              <div className="mt-8 space-y-6 font-sans text-lg leading-relaxed text-pb-black/75">
                <p>
                  Ma peinture intuitive commence sans modèle imposé. Guidé par le
                  mouvement, la matière et l’émotion, je laisse les encres
                  aquarellables et les éléments naturels ouvrir un espace de
                  dialogue entre le geste, le hasard et le regard.
                </p>
                <p>
                  Je suis Patrick Betheuil, artiste peintre français installé à
                  Chartres, en Eure-et-Loir. Mon travail s’inscrit dans une
                  peinture contemporaine organique, entre art intuitif,
                  abstraction et contemplation.
                </p>
                <p>
                  Chaque œuvre originale est réalisée en un seul exemplaire.
                  Elle s’adresse à celles et ceux qui souhaitent faire entrer
                  dans leur intérieur une présence sensible, libre de toute
                  interprétation imposée.
                </p>
              </div>
            </div>
          </FadeReveal>
        </div>
      </Container>
    </section>
  );
}
