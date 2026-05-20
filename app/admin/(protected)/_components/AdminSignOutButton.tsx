"use client";

import { signOut } from "next-auth/react";

export function AdminSignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="rounded-sm border border-[#F49C1A]/50 px-4 py-2 text-sm text-[#F0F0EE] transition hover:border-[#F49C1A] hover:bg-[#F49C1A] hover:text-black"
    >
      Déconnexion
    </button>
  );
}
