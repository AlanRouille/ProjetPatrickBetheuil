import Link from "next/link";
import { ReactNode } from "react";
import { AdminSignOutButton } from "./AdminSignOutButton";

const navigation = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/oeuvres", label: "Œuvres" },
  { href: "/admin/commandes", label: "Commandes" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-pb-black text-pb-white">
      <div className="border-b border-white/10 bg-pb-black/95">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-pb-accent">
              Administration
            </p>
            <h1 className="mt-2 text-2xl font-light">Patrick Bétheuil</h1>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <nav className="flex flex-wrap gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-sm px-3 py-2 text-sm text-pb-white/75 transition hover:bg-white/10 hover:text-pb-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <AdminSignOutButton />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
