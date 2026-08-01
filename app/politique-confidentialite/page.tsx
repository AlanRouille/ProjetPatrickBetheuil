import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Patrick Betheuil",
  description:
    "Politique de confidentialité et informations relatives au traitement des données personnelles sur le site de Patrick Betheuil.",
};

function PrivacySection({
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

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-pb-black text-pb-white">
      <Header />

      <article
        data-header-theme="light"
        className="mx-auto w-full max-w-[1440px] px-6 pb-24 pt-32 sm:px-10 sm:pt-40 md:px-16 md:pb-32 lg:px-24 lg:pt-48"
      >
        <header className="mb-16 max-w-6xl md:mb-24">
          <p className="mb-5 font-sans text-xs font-medium uppercase tracking-[0.32em] text-pb-accent sm:text-sm">
            Protection des données
          </p>
          <h1 className="font-title text-[clamp(3rem,8vw,8rem)] font-normal leading-[0.9] tracking-[-0.045em]">
            Politique de confidentialité
          </h1>
          <p className="mt-8 font-sans text-sm text-pb-white/50 sm:text-base">
            Dernière mise à jour : 1 août 2026
          </p>
        </header>

        <div className="mb-16 max-w-4xl space-y-5 font-sans text-base leading-8 text-pb-white/75 md:mb-24 md:text-lg">
          <p>
            La présente politique de confidentialité décrit la manière dont
            Patrick Betheuil collecte, utilise et protège les données personnelles
            des utilisateurs du site patrickbetheuil.com.
          </p>
          <p>
            Le respect de votre vie privée est une priorité. Les données
            personnelles sont traitées conformément au Règlement général sur la
            protection des données (RGPD) et à la législation française en vigueur.
          </p>
        </div>

        <div className="max-w-6xl">
          <PrivacySection number="01" title="Responsable du traitement">
            <p>Le responsable du traitement des données est :</p>
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
              <a
                href="mailto:pbetheuil.art@gmail.com"
                className="text-pb-white underline decoration-pb-accent/70 underline-offset-4 transition-colors hover:text-pb-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent"
              >
                pbetheuil.art@gmail.com
              </a>
            </address>
          </PrivacySection>

          <PrivacySection number="02" title="Données personnelles collectées">
            <p>
              Selon votre utilisation du site, les données suivantes peuvent être
              collectées.
            </p>
            <div>
              <h3 className="font-medium text-pb-white">Lors d&apos;un achat</h3>
              <ul className={listClasses}>
                <li>Nom et prénom ;</li>
                <li>Adresse postale ;</li>
                <li>Adresse e-mail ;</li>
                <li>Numéro de téléphone, s&apos;il est communiqué ;</li>
                <li>Informations relatives à la commande.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-pb-white">Lors d&apos;un contact</h3>
              <ul className={listClasses}>
                <li>Nom ;</li>
                <li>Adresse e-mail ;</li>
                <li>Contenu du message.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-pb-white">Données techniques</h3>
              <p className="mt-4">
                Lors de votre navigation, certaines informations techniques peuvent
                être enregistrées automatiquement :
              </p>
              <ul className={listClasses}>
                <li>Adresse IP, partiellement anonymisée lorsque cela est possible ;</li>
                <li>Type de navigateur ;</li>
                <li>Système d&apos;exploitation ;</li>
                <li>Pages consultées ;</li>
                <li>Durée de visite ;</li>
                <li>Date et heure de connexion.</li>
              </ul>
            </div>
            <p>
              Ces informations servent uniquement au bon fonctionnement du site, à
              son amélioration et à sa sécurité.
            </p>
          </PrivacySection>

          <PrivacySection number="03" title="Finalités du traitement">
            <div>
              <p>Les données personnelles sont utilisées uniquement pour :</p>
              <ul className={listClasses}>
                <li>répondre aux demandes envoyées via le formulaire de contact ;</li>
                <li>gérer les commandes et leur suivi ;</li>
                <li>assurer le service après-vente ;</li>
                <li>communiquer avec le client concernant une commande ;</li>
                <li>respecter les obligations légales et comptables ;</li>
                <li>améliorer le fonctionnement et la sécurité du site.</li>
              </ul>
            </div>
            <p>Les données ne sont jamais revendues à des tiers.</p>
          </PrivacySection>

          <PrivacySection number="04" title="Base légale du traitement">
            <div>
              <p>Les traitements reposent sur :</p>
              <ul className={listClasses}>
                <li>l&apos;exécution d&apos;un contrat dans le cadre d&apos;une commande ;</li>
                <li>
                  le consentement de l&apos;utilisateur lorsqu&apos;il remplit un formulaire
                  de contact ;
                </li>
                <li>le respect des obligations légales ;</li>
                <li>
                  l&apos;intérêt légitime du responsable du traitement pour assurer la
                  sécurité et le bon fonctionnement du site.
                </li>
              </ul>
            </div>
          </PrivacySection>

          <PrivacySection number="05" title="Paiement sécurisé">
            <p>Les paiements sont effectués via Stripe.</p>
            <p>
              Les informations bancaires ne transitent jamais par le serveur de
              patrickbetheuil.com et ne sont ni stockées ni accessibles par Patrick
              Betheuil.
            </p>
            <p>
              Les données de paiement sont traitées directement par Stripe
              conformément à sa propre politique de confidentialité.
            </p>
          </PrivacySection>

          <PrivacySection number="06" title="Destinataires des données">
            <div>
              <p>
                Les données personnelles peuvent être communiquées uniquement aux
                prestataires nécessaires au fonctionnement du site, notamment :
              </p>
              <ul className={listClasses}>
                <li>Stripe, pour le paiement sécurisé ;</li>
                <li>Vercel, pour l&apos;hébergement du site ;</li>
                <li>
                  le transporteur chargé de la livraison des œuvres, uniquement pour
                  les informations indispensables.
                </li>
              </ul>
            </div>
            <p>Aucune donnée n&apos;est vendue, cédée ou louée à des tiers.</p>
          </PrivacySection>

          <PrivacySection number="07" title="Durée de conservation">
            <p>
              Les données sont conservées uniquement pendant la durée nécessaire aux
              finalités pour lesquelles elles ont été collectées.
            </p>
            <div>
              <p>À titre indicatif :</p>
              <ul className={listClasses}>
                <li>Demandes de contact : jusqu&apos;à 3 ans après le dernier échange ;</li>
                <li>
                  Données liées aux commandes : conformément aux obligations
                  comptables et fiscales applicables ;
                </li>
                <li>Données techniques : selon les durées prévues par les outils utilisés.</li>
              </ul>
            </div>
          </PrivacySection>

          <PrivacySection number="08" title="Sécurité des données">
            <p>
              Patrick Betheuil met en œuvre les mesures techniques et
              organisationnelles appropriées afin de protéger les données
              personnelles contre toute perte, accès non autorisé, divulgation ou
              modification.
            </p>
            <p>Le site utilise une connexion sécurisée via le protocole HTTPS.</p>
          </PrivacySection>

          <PrivacySection number="09" title="Cookies">
            <p>Le site utilise des cookies nécessaires à son bon fonctionnement.</p>
            <div>
              <p>Ces cookies permettent notamment :</p>
              <ul className={listClasses}>
                <li>le maintien de certaines fonctionnalités techniques ;</li>
                <li>la sécurisation des formulaires ;</li>
                <li>le bon déroulement du processus de commande.</li>
              </ul>
            </div>
            <p>
              Si des outils de mesure d&apos;audience sont utilisés ultérieurement, un
              bandeau de gestion du consentement permettra d&apos;accepter ou de refuser
              les cookies concernés, conformément à la réglementation en vigueur.
            </p>
            <p>
              Vous pouvez également configurer votre navigateur afin de bloquer ou
              supprimer les cookies. Le refus de certains cookies peut toutefois
              altérer le fonctionnement de certaines fonctionnalités du site.
            </p>
          </PrivacySection>

          <PrivacySection number="10" title="Vos droits">
            <div>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className={listClasses}>
                <li>Droit d&apos;accès ;</li>
                <li>Droit de rectification ;</li>
                <li>Droit à l&apos;effacement ;</li>
                <li>Droit à la limitation du traitement ;</li>
                <li>Droit d&apos;opposition ;</li>
                <li>Droit à la portabilité des données lorsque cela est applicable.</li>
              </ul>
            </div>
            <p>
              Vous pouvez exercer ces droits à tout moment en écrivant à :{" "}
              <a
                href="mailto:pbetheuil.art@gmail.com"
                className="text-pb-white underline decoration-pb-accent/70 underline-offset-4 transition-colors hover:text-pb-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent"
              >
                pbetheuil.art@gmail.com
              </a>
            </p>
            <p>
              Une réponse vous sera apportée dans les meilleurs délais et au plus
              tard dans un délai d&apos;un mois.
            </p>
          </PrivacySection>

          <PrivacySection number="11" title="Réclamation">
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez
              déposer une réclamation auprès de la Commission nationale de
              l&apos;informatique et des libertés (CNIL).
            </p>
            <p>
              Site web :{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noreferrer"
                className="text-pb-white underline decoration-pb-accent/70 underline-offset-4 transition-colors hover:text-pb-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent"
              >
                cnil.fr
              </a>
            </p>
          </PrivacySection>

          <PrivacySection number="12" title="Modification de la politique">
            <p>
              La présente politique de confidentialité peut être modifiée à tout
              moment afin de tenir compte d&apos;une évolution législative,
              réglementaire ou technique.
            </p>
            <p>
              La date de dernière mise à jour figure en tête du présent document.
            </p>
          </PrivacySection>
        </div>
      </article>

      <Footer />
    </main>
  );
}
