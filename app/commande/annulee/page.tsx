import Link from "next/link";

export default function AcquisitionCanceledPage() {
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
          Votre sélection n’a pas été confirmée. Vous pouvez revenir à la
          galerie et reprendre votre parcours d’acquisition.
        </p>
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
