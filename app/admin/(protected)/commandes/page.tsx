import { PrismaClient } from "@prisma/client";

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

const statusLabels = {
  PENDING: "En attente",
  PAID: "Payée",
  SHIPPED: "Expédiée",
  DELIVERED: "Livrée",
  CANCELED: "Annulée",
};

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      items: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-[#F49C1A]">
          Commandes
        </p>
        <h2 className="mt-2 text-3xl font-light">Suivi des commandes</h2>
      </div>

      <section className="overflow-hidden rounded-sm border border-white/10 bg-[#211E1B]">
        <div className="hidden border-b border-white/10 px-5 py-3 text-sm text-[#F0F0EE]/55 md:grid md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <span>Client</span>
          <span>Statut</span>
          <span>Total</span>
          <span>Œuvres</span>
          <span>Date</span>
        </div>

        <div className="divide-y divide-white/10">
          {orders.length === 0 ? (
            <p className="px-5 py-8 text-sm text-[#F0F0EE]/65">
              Aucune commande pour le moment.
            </p>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="grid gap-3 px-5 py-4 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] md:items-center"
              >
                <p className="text-sm text-[#F0F0EE]">{order.user.email}</p>
                <p className="text-sm text-[#F0F0EE]/75">
                  {statusLabels[order.status]}
                </p>
                <p className="text-sm text-[#F0F0EE]/75">
                  {currencyFormatter.format(order.totalPrice / 100)}
                </p>
                <p className="text-sm text-[#F0F0EE]/75">
                  {order.items.length}
                </p>
                <p className="text-sm text-[#F0F0EE]/75">
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
