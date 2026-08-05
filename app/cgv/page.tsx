import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  schemaGraph,
} from "@/lib/seo";
import type { ReactNode } from "react";

export const metadata = createPageMetadata({
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente applicables à l'achat des œuvres originales de Patrick Betheuil.",
  canonical: "/cgv",
});

function SalesSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-pb-white/15 py-9 first:border-t-0 first:pt-0 md:py-12">
      <div className="grid gap-5 md:grid-cols-[minmax(13rem,0.36fr)_minmax(0,1fr)] md:gap-12 lg:grid-cols-[minmax(15rem,0.32fr)_minmax(0,1fr)] lg:gap-20">
        <h2 className="font-title text-3xl font-normal leading-tight tracking-[-0.02em] text-pb-white md:text-4xl">
          <span className="mr-3 font-sans text-sm font-medium text-pb-accent md:text-base">
            {number}
          </span>
          {title}
        </h2>
        <div className="space-y-5 font-sans text-[15px] font-normal leading-7 text-pb-white/75 sm:text-base sm:leading-8">
          {children}
        </div>
      </div>
    </section>
  );
}

const listClasses = "mt-4 list-disc space-y-2 pl-5 marker:text-pb-accent";
const linkClasses =
  "text-pb-white underline decoration-pb-accent/70 underline-offset-4 transition-colors hover:text-pb-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent";

export default function ConditionsGeneralesVentePage() {
  return (
    <main className="min-h-screen bg-pb-black text-pb-white">
      <JsonLd
        data={schemaGraph([
          createBreadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Conditions générales de vente", path: "/cgv" },
          ]),
        ])}
      />
      <Header />

      <article
        data-header-theme="light"
        className="mx-auto w-full max-w-[1440px] px-6 pb-24 pt-32 sm:px-10 sm:pt-40 md:px-16 md:pb-32 lg:px-24 lg:pt-48"
      >
        <header className="mb-16 max-w-6xl md:mb-24">
          <p className="mb-5 font-sans text-xs font-medium uppercase tracking-[0.32em] text-pb-accent sm:text-sm">
            Vente des œuvres
          </p>
          <h1 className="font-title text-[clamp(3rem,8vw,8rem)] font-normal leading-[0.9] tracking-[-0.045em]">
            Conditions générales de vente
          </h1>
          <p className="mt-8 font-sans text-sm text-pb-white/50 sm:text-base">
            Dernière mise à jour : 1 août 2026
          </p>
        </header>

        <div className="mb-16 max-w-4xl space-y-5 font-sans text-base leading-8 text-pb-white/75 md:mb-24 md:text-lg">
          <p>
            Les présentes Conditions générales de vente (ci-après les « CGV »)
            régissent les ventes réalisées sur le site patrickbetheuil.com, édité
            par Patrick Betheuil.
          </p>
          <p>
            Toute commande effectuée sur le site implique l&apos;acceptation sans
            réserve des présentes Conditions générales de vente.
          </p>
        </div>

        <div className="max-w-6xl">
          <SalesSection number="01" title="Vendeur">
            <p>Les œuvres proposées sur le site sont vendues par :</p>
            <address className="not-italic text-pb-white/90">
              <strong className="font-medium text-pb-white">Patrick Betheuil</strong>
              <br />
              Artiste peintre – Entrepreneur individuel (Micro-entreprise)
              <br />
              SIREN : 533 806 113
              <br />
              TVA non applicable – article 293 B du Code général des impôts.
              <br />
              E-mail :{" "}
              <a href="mailto:pbetheuil.art@gmail.com" className={linkClasses}>
                pbetheuil.art@gmail.com
              </a>
            </address>
          </SalesSection>

          <SalesSection number="02" title="Objet">
            <p>
              Les présentes Conditions générales de vente définissent les
              modalités de vente des œuvres originales proposées sur le site
              patrickbetheuil.com, ainsi que les droits et obligations du vendeur
              et de l&apos;acheteur.
            </p>
          </SalesSection>

          <SalesSection number="03" title="Les œuvres">
            <p>
              Toutes les œuvres proposées sur le site sont des créations originales
              réalisées par Patrick Betheuil.
            </p>
            <div>
              <p>Chaque fiche œuvre précise notamment :</p>
              <ul className={listClasses}>
                <li>le titre de l&apos;œuvre ;</li>
                <li>ses dimensions ;</li>
                <li>la technique utilisée ;</li>
                <li>son prix ;</li>
                <li>les photographies de présentation.</li>
              </ul>
            </div>
            <p>
              Les photographies sont réalisées avec le plus grand soin afin de
              représenter fidèlement les œuvres. Toutefois, les couleurs peuvent
              légèrement varier selon les réglages de l&apos;écran de chaque utilisateur.
            </p>
          </SalesSection>

          <SalesSection number="04" title="Disponibilité">
            <p>
              Chaque œuvre étant unique, elle est proposée à la vente en un seul
              exemplaire.
            </p>
            <p>
              En cas d&apos;indisponibilité exceptionnelle après validation d&apos;une
              commande, le client sera informé dans les meilleurs délais et
              intégralement remboursé.
            </p>
          </SalesSection>

          <SalesSection number="05" title="Prix">
            <p>Les prix sont exprimés en euros (€).</p>
            <p>
              Conformément au régime de la micro-entreprise : TVA non applicable –
              article 293 B du Code général des impôts.
            </p>
            <p>
              Les frais de livraison sont indiqués avant la validation définitive
              de la commande.
            </p>
            <p>
              Patrick Betheuil se réserve le droit de modifier ses prix à tout
              moment. Toutefois, les œuvres sont facturées au tarif en vigueur au
              moment de la validation de la commande.
            </p>
          </SalesSection>

          <SalesSection number="06" title="Commande">
            <div>
              <p>La commande est considérée comme définitive lorsque :</p>
              <ul className={listClasses}>
                <li>le paiement est accepté ;</li>
                <li>un e-mail de confirmation est envoyé au client.</li>
              </ul>
            </div>
            <p>
              Patrick Betheuil se réserve le droit de refuser ou d&apos;annuler une
              commande en cas de fraude, de tentative de fraude ou de tout autre
              motif légitime.
            </p>
          </SalesSection>

          <SalesSection number="07" title="Paiement">
            <p>
              Les paiements sont entièrement sécurisés et réalisés via Stripe.
            </p>
            <p>
              Les moyens de paiement proposés sont ceux disponibles lors du
              processus de commande. Aucune donnée bancaire n&apos;est stockée par
              Patrick Betheuil.
            </p>
          </SalesSection>

          <SalesSection number="08" title="Livraison">
            <p>
              Les œuvres sont expédiées par Patrick Betheuil à l&apos;adresse indiquée
              par le client lors de la commande.
            </p>
            <p>
              Les expéditions sont réalisées principalement via Colissimo (La Poste)
              avec un numéro de suivi permettant de suivre l&apos;acheminement du colis.
            </p>
            <p>
              Chaque œuvre fait l&apos;objet d&apos;un emballage soigné et adapté afin
              d&apos;assurer une protection optimale pendant le transport.
            </p>
            <p>
              Les commandes sont généralement expédiées sous 3 à 10 jours ouvrés
              après validation du paiement, sauf indication contraire précisée sur
              la fiche de l&apos;œuvre.
            </p>
            <p>
              Les délais de livraison sont donnés à titre indicatif et peuvent
              varier selon la destination ou les délais du transporteur.
            </p>
          </SalesSection>

          <SalesSection number="09" title="Frais de livraison">
            <p>
              Les frais de livraison sont calculés avant la validation définitive
              de la commande.
            </p>
            <div>
              <p>Ils varient notamment en fonction :</p>
              <ul className={listClasses}>
                <li>des dimensions de l&apos;œuvre ;</li>
                <li>de son poids ;</li>
                <li>du pays de destination ;</li>
                <li>des tarifs en vigueur de Colissimo (La Poste).</li>
              </ul>
            </div>
            <p>
              Le montant total des frais de livraison est clairement indiqué avant
              la validation du paiement.
            </p>
          </SalesSection>

          <SalesSection number="10" title="Réception de l’œuvre">
            <p>
              Lors de la réception du colis, le client est invité à vérifier
              immédiatement son état.
            </p>
            <p>
              En cas de colis visiblement endommagé, le client est invité à émettre
              des réserves auprès du transporteur avant d&apos;accepter le colis lorsque
              cela est possible.
            </p>
            <div>
              <p>Il est également recommandé :</p>
              <ul className={listClasses}>
                <li>de prendre des photographies du colis et de l&apos;œuvre ;</li>
                <li>de conserver l&apos;emballage ;</li>
                <li>
                  de contacter Patrick Betheuil dans les meilleurs délais à
                  l&apos;adresse{" "}
                  <a href="mailto:pbetheuil.art@gmail.com" className={linkClasses}>
                    pbetheuil.art@gmail.com
                  </a>
                  .
                </li>
              </ul>
            </div>
          </SalesSection>

          <SalesSection number="11" title="Droit de rétractation">
            <p>
              Conformément aux articles L221-18 et suivants du Code de la
              consommation, le client consommateur dispose d&apos;un délai de 14 jours à
              compter de la réception de l&apos;œuvre pour exercer son droit de
              rétractation, sans avoir à justifier de motif.
            </p>
            <div>
              <p>L&apos;œuvre devra être retournée :</p>
              <ul className={listClasses}>
                <li>dans son état d&apos;origine ;</li>
                <li>complète ;</li>
                <li>soigneusement emballée.</li>
              </ul>
            </div>
            <p>
              Les frais de retour restent à la charge du client, sauf disposition
              légale contraire.
            </p>
            <p>
              Le remboursement interviendra dans un délai maximal de 14 jours
              suivant la réception et la vérification de l&apos;œuvre retournée.
            </p>
          </SalesSection>

          <SalesSection number="12" title="Œuvre endommagée">
            <p>
              Si une œuvre est livrée endommagée malgré les précautions prises, le
              client devra contacter Patrick Betheuil dans les meilleurs délais en
              joignant des photographies permettant de constater les dommages.
            </p>
            <p>
              Une solution adaptée sera proposée selon la situation : remboursement,
              remplacement si possible ou résolution amiable.
            </p>
          </SalesSection>

          <SalesSection number="13" title="Garanties légales">
            <div>
              <p>
                Les œuvres vendues bénéficient des garanties légales prévues par le
                droit français, notamment :
              </p>
              <ul className={listClasses}>
                <li>la garantie légale de conformité lorsqu&apos;elle est applicable ;</li>
                <li>la garantie contre les vices cachés.</li>
              </ul>
            </div>
          </SalesSection>

          <SalesSection number="14" title="Propriété intellectuelle">
            <p>
              L&apos;achat d&apos;une œuvre originale ne confère aucun droit de
              reproduction, de diffusion, d&apos;exploitation ou de représentation.
            </p>
            <p>
              L&apos;ensemble des droits d&apos;auteur demeure la propriété exclusive de
              Patrick Betheuil. Toute reproduction, même partielle, est interdite
              sans autorisation écrite préalable.
            </p>
          </SalesSection>

          <SalesSection number="15" title="Protection des données personnelles">
            <p>
              Les informations collectées lors des commandes sont traitées
              conformément à la{" "}
              <a href="/politique-confidentialite" className={linkClasses}>
                Politique de confidentialité
              </a>{" "}
              disponible sur le site.
            </p>
          </SalesSection>

          <SalesSection number="16" title="Force majeure">
            <p>
              Patrick Betheuil ne pourra être tenu responsable de tout retard ou de
              toute inexécution résultant d&apos;un cas de force majeure tel que défini
              par la législation française.
            </p>
          </SalesSection>

          <SalesSection number="17" title="Droit applicable">
            <p>
              Les présentes Conditions générales de vente sont régies par le droit
              français.
            </p>
            <p>
              Tout litige relatif à leur interprétation ou à leur exécution sera
              soumis aux juridictions françaises compétentes.
            </p>
          </SalesSection>

          <SalesSection number="18" title="Médiation de la consommation">
            <p>
              Conformément aux articles L611-1 et suivants du Code de la
              consommation, le client a la possibilité, en cas de litige non résolu,
              de recourir gratuitement à un médiateur de la consommation.
            </p>
            <p>
              Les coordonnées du médiateur compétent seront communiquées dès sa
              désignation conformément aux obligations légales.
            </p>
          </SalesSection>

          <SalesSection number="19" title="Contact">
            <p>
              Pour toute question concernant une commande ou les présentes
              Conditions générales de vente, vous pouvez contacter Patrick Betheuil
              à l&apos;adresse :{" "}
              <a href="mailto:pbetheuil.art@gmail.com" className={linkClasses}>
                pbetheuil.art@gmail.com
              </a>
              .
            </p>
          </SalesSection>
        </div>
      </article>

      <Footer />
    </main>
  );
}
