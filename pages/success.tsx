import { useRouter } from "next/router";
import { useEffect } from "react";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Vous pouvez éventuellement rediriger après quelques secondes
    const timer = setTimeout(() => {
      router.push("/"); // Redirige vers la page d'accueil ou une autre page
    }, 5000); // 5 secondes

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main>
      <div className="bg-primary-black flex flex-col items-center justify-center h-screen">
        <h1 className="text-9xl text-white font-title uppercase ">
          Paiement réussi !
        </h1>
        <p className="mt-4 text-white">
          Merci pour votre achat. Vous recevrez un e-mail de confirmation sous
          peu.
        </p>
        <p className="mt-2 text-white">
          Vous allez être redirigé vers la page d&apos;accueil
        </p>
      </div>
    </main>
  );
};

export default SuccessPage;
