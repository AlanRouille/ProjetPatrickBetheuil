import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administration",
  description: "Espace privé d’administration du site Patrick Betheuil.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
