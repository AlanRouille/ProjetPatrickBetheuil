import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { CheckoutStatusLayout } from "@/components/checkout/CheckoutStatusLayout";
import { DesignButton } from "@/components/ui/DesignButton";
import { SuccessCheckoutClient } from "./SuccessCheckoutClient";
import { createPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Confirmation de l’acquisition",
  description: "Confirmation sécurisée de l’acquisition d’une œuvre originale.",
  canonical: "/commande/succes",
  noIndex: true,
});

interface AcquisitionSuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function AcquisitionSuccessPage(props: AcquisitionSuccessPageProps) {
  const searchParams = await props.searchParams;
  const sessionId = searchParams.session_id;
  let paymentConfirmed = false;
  let orderReference: string | null = null;
  let customerEmail: string | null = null;

  if (sessionId?.startsWith("cs_")) {
    try {
      const [session, order] = await Promise.all([
        getStripe().checkout.sessions.retrieve(sessionId),
        prisma.order.findUnique({
          where: { stripeSessionId: sessionId },
          include: { user: true },
        }),
      ]);

      paymentConfirmed = session.payment_status === "paid";
      orderReference = order?.id.slice(0, 8).toUpperCase() ?? null;
      customerEmail =
        session.customer_details?.email ?? order?.user.email ?? null;
    } catch (error) {
      console.error("Impossible de vérifier la session Stripe :", error);
    }
  }

  return (
    <CheckoutStatusLayout
      eyebrow="Acquisition"
      title={paymentConfirmed ? "Votre acquisition" : "Votre paiement"}
      accentTitle={
        paymentConfirmed ? "est confirmée" : "est en vérification"
      }
      description={
        paymentConfirmed ? (
          <p>
            Merci pour votre confiance. Un message de confirmation
            {customerEmail ? (
              <>
                {" "}
                vous sera envoyé à{" "}
                <span className="break-all text-pb-white">{customerEmail}</span>
              </>
            ) : null}
            .
          </p>
        ) : (
          <p>
            La confirmation peut prendre quelques instants. Vous recevrez un
            e-mail dès que le règlement sera validé.
          </p>
        )
      }
      reference={orderReference}
    >
      <SuccessCheckoutClient confirmed={paymentConfirmed} />
      <DesignButton
        href="/projets"
        className="min-w-[15rem] rounded-full px-8 py-4"
      >
        Retour aux œuvres
      </DesignButton>
    </CheckoutStatusLayout>
  );
}
