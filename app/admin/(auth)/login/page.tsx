import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "./AdminLoginForm";

export default async function AdminLoginPage() {
  const session = await auth();

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-pb-black px-6 py-12 text-pb-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-md flex-col justify-center">
        <p className="text-sm uppercase tracking-[0.28em] text-pb-accent">
          Administration
        </p>
        <h1 className="mt-4 text-4xl font-light leading-tight">
          Espace Patrick Betheuil
        </h1>
        <p className="mt-4 text-sm leading-6 text-pb-white/70">
          Connectez-vous pour gérer les œuvres et suivre les commandes du site.
        </p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
