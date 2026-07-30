import { CheckoutStatusLayout } from "@/components/checkout/CheckoutStatusLayout";
import { DesignButton } from "@/components/ui/DesignButton";
import { CancelCheckoutClient } from "./CancelCheckoutClient";

interface AcquisitionCanceledPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function AcquisitionCanceledPage(props: AcquisitionCanceledPageProps) {
  const searchParams = await props.searchParams;
  const sessionId = searchParams.session_id?.startsWith("cs_")
    ? searchParams.session_id
    : null;

  return (
    <CheckoutStatusLayout
      eyebrow="Acquisition"
      title="Le règlement"
      accentTitle="n’est pas finalisé"
      description={
        <p>
          Aucun règlement n’a été effectué. Vos œuvres restent dans votre
          panier afin que vous puissiez reprendre votre acquisition.
        </p>
      }
    >
      <CancelCheckoutClient sessionId={sessionId} />
      <DesignButton
        href="/projets"
        variant="ghost"
        className="min-w-[15rem] rounded-full px-8 py-4"
      >
        Continuer dans la galerie
      </DesignButton>
    </CheckoutStatusLayout>
  );
}
