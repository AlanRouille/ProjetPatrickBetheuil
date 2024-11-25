import { useRouter } from "next/router";
import { useEffect } from "react";

const CancelPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Vous pouvez éventuellement rediriger après quelques secondes
    const timer = setTimeout(() => {
      router.push("/"); // Redirige vers la page d'accueil ou une autre page
    }, 5000); // 5 secondes

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Paiement annulé</h1>
      <p className="mt-4">
        Votre paiement n&apos; a pas été traité. Si vous avez payé avec une
        autre méthode de paiement, veuillez contacter le support. Si vous avez
        payé avec une autre méthode de paiement, veuillez contacter le support.
        veuillez contacter le support.
      </p>
      <p className="mt-2">
        Vous allez être redirigé vers la page d&apos;accueil dans quelques
      </p>
    </div>
  );
};

export default CancelPage;
