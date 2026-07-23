"use client";

import { signOut } from "next-auth/react";

export function AdminSignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="rounded-sm border border-pb-accent/50 px-4 py-2 text-sm text-pb-white transition hover:border-pb-accent hover:bg-pb-accent hover:text-pb-black"
    >
      Déconnexion
    </button>
  );
}
