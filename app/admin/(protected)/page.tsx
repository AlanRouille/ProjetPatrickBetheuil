import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-sm border border-white/10 bg-[#211E1B] p-5">
      <p className="text-sm text-[#F0F0EE]/65">{label}</p>
      <p className="mt-3 text-3xl font-light text-[#F0F0EE]">{value}</p>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const [availableCount, soldCount, recentOrders, paidTotal] =
    await Promise.all([
      prisma.artwork.count({ where: { status: "AVAILABLE" } }),
      prisma.artwork.count({ where: { status: "SOLD" } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: true },
      }),
      prisma.order.aggregate({
        where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] } },
        _sum: { totalPrice: true },
      }),
    ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#F49C1A]">
            Tableau de bord
          </p>
          <h2 className="mt-2 text-3xl font-light">
            Vue d’ensemble de la galerie
          </h2>
        </div>
        <Link
          href="/admin/oeuvres"
          className="w-fit rounded-sm bg-[#F49C1A] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#ffb347]"
        >
          Voir les œuvres
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Œuvres disponibles" value={availableCount} />
        <MetricCard label="Œuvres vendues" value={soldCount} />
        <MetricCard label="Commandes récentes" value={recentOrders.length} />
        <MetricCard
          label="Chiffre d’affaires total"
          value={currencyFormatter.format((paidTotal._sum.totalPrice ?? 0) / 100)}
        />
      </section>

      <section className="rounded-sm border border-white/10 bg-[#211E1B]">
        <div className="border-b border-white/10 px-5 py-4">
          <h3 className="text-xl font-light">Dernières commandes</h3>
        </div>
        <div className="divide-y divide-white/10">
          {recentOrders.length === 0 ? (
            <p className="px-5 py-8 text-sm text-[#F0F0EE]/65">
              Aucune commande pour le moment.
            </p>
          ) : (
            recentOrders.map((order) => (
              <div
                key={order.id}
                className="grid gap-3 px-5 py-4 md:grid-cols-[1.5fr_1fr_1fr_1fr]"
              >
                <p className="text-sm text-[#F0F0EE]">{order.user.email}</p>
                <p className="text-sm text-[#F0F0EE]/70">{order.status}</p>
                <p className="text-sm text-[#F0F0EE]/70">
                  {currencyFormatter.format(order.totalPrice / 100)}
                </p>
                <p className="text-sm text-[#F0F0EE]/70">
                  {dateFormatter.format(order.createdAt)}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
