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
          className="block text-sm font-medium text-[#F0F0EE]"
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
          className="mt-2 w-full rounded-sm border border-white/15 bg-black/35 px-4 py-3 text-[#F0F0EE] outline-none transition focus:border-[#F49C1A]"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[#F0F0EE]"
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
          className="mt-2 w-full rounded-sm border border-white/15 bg-black/35 px-4 py-3 text-[#F0F0EE] outline-none transition focus:border-[#F49C1A]"
        />
      </div>

      {error && (
        <p className="border-l-2 border-[#F49C1A] bg-[#F49C1A]/10 px-4 py-3 text-sm text-[#F0F0EE]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-sm bg-[#F49C1A] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-[#ffb347] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
