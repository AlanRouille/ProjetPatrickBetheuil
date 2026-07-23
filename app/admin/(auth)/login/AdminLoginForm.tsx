"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (!result?.ok) {
      setError("Email ou mot de passe incorrect.");
      return;
    }

    const callbackUrl = searchParams?.get("callbackUrl");
    router.push(callbackUrl?.startsWith("/admin") ? callbackUrl : "/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-pb-white"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-sm border border-white/15 bg-black/35 px-4 py-3 text-pb-white outline-none transition focus:border-pb-accent"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-pb-white"
        >
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-sm border border-white/15 bg-black/35 px-4 py-3 text-pb-white outline-none transition focus:border-pb-accent"
        />
      </div>

      {error && (
        <p className="border-l-2 border-pb-accent bg-pb-accent/10 px-4 py-3 text-sm text-pb-white">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-sm bg-pb-accent px-5 py-3 text-sm font-semibold uppercase tracking-wide text-pb-black transition hover:bg-pb-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
