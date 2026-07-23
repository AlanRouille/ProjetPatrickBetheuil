import Link from "next/link";
import { CancelCheckoutClient } from "./CancelCheckoutClient";

interface AcquisitionCanceledPageProps {
  searchParams: {
    session_id?: string;
  };
}

export default function AcquisitionCanceledPage({
  searchParams,
}: AcquisitionCanceledPageProps) {
  const sessionId = searchParams.session_id?.startsWith("cs_")
    ? searchParams.session_id
    : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary-black px-6 text-white">
      <section className="max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-primary-orange">
          Acquisition
        </p>
        <h1 className="mt-5 font-title text-4xl font-light md:text-6xl">
          Le règlement n’a pas été finalisé
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-8 text-white/75">
          Aucun règlement n’a été effectué. Vos œuvres restent dans votre
          panier afin que vous puissiez reprendre votre acquisition.
        </p>
        <CancelCheckoutClient sessionId={sessionId} />
        <Link
          href="/projets"
          className="mt-4 inline-flex font-sans text-sm text-white/70 underline decoration-primary-orange underline-offset-4 transition-colors hover:text-white"
        >
          Continuer dans la galerie
        </Link>
      </section>
    </main>
  );
}
