import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Mentions légales | Patrick Betheuil",
  description:
    "Mentions légales du site officiel de l'artiste peintre Patrick Betheuil.",
};

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-pb-white/15 py-9 first:border-t-0 first:pt-0 md:py-12">
      <div className="grid gap-5 md:grid-cols-[minmax(13rem,0.36fr)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(15rem,0.32fr)_minmax(0,1fr)] lg:gap-20">
        <h2 className="font-title text-3xl font-normal leading-tight tracking-[-0.02em] text-pb-white md:text-4xl">
          {title}
        </h2>
        <div className="space-y-5 font-sans text-[15px] font-normal leading-7 text-pb-white/75 sm:text-base sm:leading-8">
          {children}
        </div>
      </div>
    </section>
  );
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-pb-black text-pb-white">
      <Header />

      <article
        data-header-theme="light"
        className="mx-auto w-full max-w-[1440px] px-6 pb-24 pt-32 sm:px-10 sm:pt-40 md:px-16 md:pb-32 lg:px-24 lg:pt-48"
      >
        <header className="mb-16 max-w-5xl md:mb-24">
          <p className="mb-5 font-sans text-xs font-medium uppercase tracking-[0.32em] text-pb-accent sm:text-sm">
            Informations juridiques
          </p>
          <h1 className="font-title text-[clamp(3.4rem,9vw,8.5rem)] font-normal leading-[0.88] tracking-[-0.045em]">
            Mentions légales
          </h1>
          <p className="mt-8 font-sans text-sm text-pb-white/50 sm:text-base">
            Dernière mise à jour : 1 août 2026
          </p>
        </header>

        <div className="max-w-6xl">
          <LegalSection title="Éditeur du site">
            <p>Le présent site internet patrickbetheuil.com est édité par :</p>
            <address className="not-italic text-pb-white/90">
              <strong className="font-medium text-pb-white">Patrick Betheuil</strong>
              <br />
              Artiste peintre – Entrepreneur individuel (Micro-entreprise)
              <br />
              SIREN : 533 806 113
              <br />
              TVA non applicable, article 293 B du Code général des impôts.
              <br />
              E-mail :{" "}
              <a
                href="mailto:pbetheuil.art@gmail.com"
                className="text-pb-white underline decoration-pb-accent/70 underline-offset-4 transition-colors hover:text-pb-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent"
              >
                pbetheuil.art@gmail.com
              </a>
            </address>
            <p>Le directeur de la publication est Patrick Betheuil.</p>
          </LegalSection>

          <LegalSection title="Nom de domaine">
            <p>
              Le nom de domaine patrickbetheuil.com est enregistré et géré par :
            </p>
            <address className="not-italic text-pb-white/90">
              <strong className="font-medium text-pb-white">
                Hostinger International Limited
              </strong>
              <br />
              61 Lordou Vironos Street
              <br />
              6023 Larnaca
              <br />
              Chypre
            </address>
            <p>
              Site web :{" "}
              <a
                href="https://www.hostinger.fr"
                target="_blank"
                rel="noreferrer"
                className="text-pb-white underline decoration-pb-accent/70 underline-offset-4 transition-colors hover:text-pb-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent"
              >
                hostinger.fr
              </a>
            </p>
          </LegalSection>

          <LegalSection title="Hébergement et déploiement">
            <p>
              Le site internet et son application sont hébergés et déployés par :
            </p>
            <address className="not-italic text-pb-white/90">
              <strong className="font-medium text-pb-white">Vercel Inc.</strong>
              <br />
              440 N Barranca Avenue #4133
              <br />
              Covina, CA 91723
              <br />
              États-Unis
            </address>
            <p>
              Site web :{" "}
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noreferrer"
                className="text-pb-white underline decoration-pb-accent/70 underline-offset-4 transition-colors hover:text-pb-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent"
              >
                vercel.com
              </a>
            </p>
          </LegalSection>

          <LegalSection title="Conception et développement">
            <p>
              La conception graphique, l&apos;identité visuelle ainsi que le
              développement du site ont été réalisés par :
            </p>
            <p className="text-pb-white/90">
              <strong className="font-medium text-pb-white">Kode and Kom</strong>
              <br />
              Conception UX/UI • Développement web • Intégration e-commerce
            </p>
          </LegalSection>

          <LegalSection title="Objet du site">
            <p>
              Le site patrickbetheuil.com a pour objet de présenter
              l&apos;univers artistique de Patrick Betheuil ainsi que de permettre
              l&apos;achat en ligne de ses œuvres originales.
            </p>
            <p>
              Les informations présentes sur ce site sont fournies à titre
              informatif et peuvent être modifiées à tout moment, sans préavis.
            </p>
          </LegalSection>

          <LegalSection title="Propriété intellectuelle">
            <p>
              L&apos;ensemble des éléments présents sur ce site, notamment les
              œuvres, photographies, illustrations, textes, vidéos, logos,
              graphismes, animations, icônes, mises en page et éléments de design
              sont protégés par les dispositions du Code de la propriété
              intellectuelle.
            </p>
            <p>
              Sauf autorisation écrite préalable de Patrick Betheuil, toute
              reproduction, représentation, diffusion, modification, adaptation
              ou exploitation, totale ou partielle, quel qu&apos;en soit le procédé
              ou le support, est strictement interdite.
            </p>
            <p>
              L&apos;acquisition d&apos;une œuvre originale n&apos;emporte en aucun cas
              cession des droits de propriété intellectuelle attachés à celle-ci.
            </p>
            <p>
              Les droits de reproduction, de représentation et d&apos;exploitation
              demeurent la propriété exclusive de Patrick Betheuil.
            </p>
          </LegalSection>

          <LegalSection title="Responsabilité">
            <p>
              Patrick Betheuil met tout en œuvre afin d&apos;assurer l&apos;exactitude
              des informations diffusées sur ce site.
            </p>
            <div>
              <p>Toutefois, il ne saurait être tenu responsable :</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-pb-accent">
                <li>d&apos;une interruption temporaire du site ;</li>
                <li>d&apos;un dysfonctionnement technique indépendant de sa volonté ;</li>
                <li>d&apos;une erreur ou omission involontaire ;</li>
                <li>d&apos;un dommage résultant de l&apos;utilisation du site.</li>
              </ul>
            </div>
            <p>
              L&apos;utilisateur demeure seul responsable de l&apos;utilisation qu&apos;il
              fait des informations disponibles sur le site.
            </p>
          </LegalSection>

          <LegalSection title="Liens hypertextes">
            <p>
              Le site peut contenir des liens vers des sites internet de tiers.
            </p>
            <p>
              Patrick Betheuil ne peut être tenu responsable du contenu, des
              politiques ou du fonctionnement de ces sites externes.
            </p>
          </LegalSection>

          <LegalSection title="Données personnelles">
            <p>
              Les modalités de collecte et de traitement des données personnelles
              sont détaillées dans la{" "}
              <a
                href="/politique-confidentialite"
                className="text-pb-white underline decoration-pb-accent/70 underline-offset-4 transition-colors hover:text-pb-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent"
              >
                Politique de confidentialité
              </a>{" "}
              accessible depuis le site.
            </p>
          </LegalSection>

          <LegalSection title="Cookies">
            <p>
              Le site peut utiliser des cookies nécessaires à son bon
              fonctionnement ainsi que, le cas échéant, des cookies de mesure
              d&apos;audience.
            </p>
            <p>
              Les modalités d&apos;utilisation des cookies sont décrites dans la{" "}
              <a
                href="/politique-confidentialite"
                className="text-pb-white underline decoration-pb-accent/70 underline-offset-4 transition-colors hover:text-pb-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent"
              >
                Politique de confidentialité
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="Droit applicable">
            <p>Le présent site est soumis au droit français.</p>
            <p>
              Tout litige relatif à son utilisation relève des juridictions
              françaises compétentes, sous réserve des dispositions légales
              applicables.
            </p>
          </LegalSection>
        </div>
      </article>

      <Footer />
    </main>
  );
}
