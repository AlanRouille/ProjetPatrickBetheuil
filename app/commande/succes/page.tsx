import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import Link from "next/link";
import { SuccessCheckoutClient } from "./SuccessCheckoutClient";

export const dynamic = "force-dynamic";

interface AcquisitionSuccessPageProps {
  searchParams: {
    session_id?: string;
  };
}

export default async function AcquisitionSuccessPage({
  searchParams,
}: AcquisitionSuccessPageProps) {
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
    <main className="flex min-h-screen items-center justify-center bg-primary-black px-6 text-white">
      <section className="max-w-3xl text-center">
        <SuccessCheckoutClient confirmed={paymentConfirmed} />
        <p className="text-sm uppercase tracking-[0.28em] text-primary-orange">
          Acquisition
        </p>
        <h1 className="mt-5 font-title text-4xl font-light md:text-6xl">
          {paymentConfirmed
            ? "Votre acquisition est confirmée"
            : "Votre paiement est en cours de vérification"}
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-8 text-white/75">
          {paymentConfirmed
            ? `Merci pour votre confiance. Un message de confirmation${
                customerEmail ? ` vous sera envoyé à ${customerEmail}` : ""
              }.`
            : "La confirmation peut prendre quelques instants. Vous recevrez un e-mail dès que le règlement sera validé."}
        </p>
        {orderReference ? (
          <p className="mt-4 font-sans text-sm uppercase tracking-[0.18em] text-white/55">
            Commande {orderReference}
          </p>
        ) : null}
        <Link
          href="/projets"
          className="mt-10 inline-flex rounded-sm bg-primary-orange px-7 py-3 font-sans text-sm font-normal uppercase tracking-[0.18em] text-white transition-[background-color,transform,box-shadow] duration-500 ease-out hover:scale-[1.03] hover:bg-orange-600 hover:shadow-[0_14px_30px_rgba(0,0,0,0.32)] active:scale-100 active:shadow-none"
        >
          Retour aux œuvres
        </Link>
      </section>
    </main>
  );
}
