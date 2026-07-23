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
                alt="Patrick Bétheuil dans son atelier"
                fill
                sizes="(min-width: 1024px) 34vw, 80vw"
                className="object-cover"
              />
            </div>
          </FadeReveal>
          <FadeReveal delay={0.08} x={72} y={0}>
            <div className="max-w-xl">
              <h2 className="font-sans text-xl font-semibold leading-snug">
                Je crée des œuvres nées de l’intuition et du vivant.
              </h2>
              <div className="mt-8 space-y-6 font-sans text-lg leading-relaxed text-pb-black/75">
                <p>
                  Mon travail est guidé par le mouvement, la matière et
                  l’émotion. À travers les encres aquarellables et les matières
                  naturelles, je compose des univers organiques qui invitent à
                  la contemplation et à l’interprétation.
                </p>
                <p>
                  Chaque peinture est une porte ouverte vers un imaginaire
                  libre, où le regard est invité à voyager sans contrainte.
                </p>
              </div>
            </div>
          </FadeReveal>
        </div>
      </Container>
    </section>
  );
}
