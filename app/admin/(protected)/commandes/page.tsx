import { prisma } from "@/lib/prisma";
import {
  markOrderAsDeliveredAction,
  markOrderAsShippedAction,
} from "./actions";

export const dynamic = "force-dynamic";

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
      items: {
        include: {
          artwork: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-pb-accent">
          Commandes
        </p>
        <h2 className="mt-2 text-3xl font-light">Suivi des commandes</h2>
      </div>

      <section className="overflow-hidden rounded-sm border border-white/10 bg-pb-white/[0.04]">
        <div className="divide-y divide-white/10">
          {orders.length === 0 ? (
            <p className="px-5 py-8 text-sm text-pb-white/65">
              Aucune commande pour le moment.
            </p>
          ) : (
            orders.map((order) => (
              <article key={order.id} className="space-y-5 px-5 py-5">
                <div className="grid gap-4 md:grid-cols-[1.35fr_0.8fr_0.8fr_0.8fr] md:items-start">
                  <div>
                    <p className="text-sm font-medium text-pb-white">
                      {order.shippingName ?? order.user.email}
                    </p>
                    <p className="mt-1 text-xs text-pb-white/55">
                      {order.user.email}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.12em] text-pb-white/40">
                      Commande {order.id.slice(0, 8).toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-pb-white/45">Statut</p>
                    <p className="mt-1 text-sm text-pb-white/80">
                      {statusLabels[order.status]}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-pb-white/45">Total</p>
                    <p className="mt-1 text-sm text-pb-white/80">
                      {currencyFormatter.format(order.totalPrice / 100)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-pb-white/45">Date</p>
                    <p className="mt-1 text-sm text-pb-white/80">
                      {dateFormatter.format(order.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 border-t border-white/10 pt-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-pb-white/40">
                      Œuvres
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-pb-white/75">
                      {order.items.map((item) => (
                        <li key={item.id}>{item.artwork.title}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-pb-white/40">
                      Livraison
                    </p>
                    <address className="mt-2 not-italic text-sm leading-6 text-pb-white/75">
                      {order.shippingAddress1 ? (
                        <>
                          {order.shippingAddress1}
                          {order.shippingAddress2 ? (
                            <>
                              <br />
                              {order.shippingAddress2}
                            </>
                          ) : null}
                          <br />
                          {order.shippingPostal} {order.shippingCity}
                          <br />
                          {order.shippingCountry}
                        </>
                      ) : (
                        "Adresse en attente de confirmation Stripe"
                      )}
                    </address>
                  </div>
                </div>

                {order.status === "PAID" || order.status === "SHIPPED" ? (
                  <div className="flex flex-col gap-3 border-t border-white/10 pt-4 lg:flex-row lg:items-end">
                    <form
                      action={markOrderAsShippedAction}
                      className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-end"
                    >
                      <input type="hidden" name="orderId" value={order.id} />
                      <label className="flex-1 text-xs text-pb-white/55">
                        Numéro de suivi
                        <input
                          name="trackingNumber"
                          defaultValue={order.trackingNumber ?? ""}
                          className="mt-1 h-10 w-full border border-white/20 bg-transparent px-3 text-sm text-pb-white outline-none focus:border-pb-accent"
                        />
                      </label>
                      <button
                        type="submit"
                        className="h-10 bg-pb-accent px-4 text-xs font-semibold uppercase tracking-[0.08em] text-pb-black transition hover:bg-pb-white"
                      >
                        {order.status === "SHIPPED"
                          ? "Mettre à jour le suivi"
                          : "Marquer expédiée"}
                      </button>
                    </form>
                    {order.status === "SHIPPED" ? (
                      <form action={markOrderAsDeliveredAction}>
                        <input type="hidden" name="orderId" value={order.id} />
                        <button
                          type="submit"
                          className="h-10 border border-white/25 px-4 text-xs font-semibold uppercase tracking-[0.08em] text-pb-white transition hover:border-pb-accent hover:text-pb-accent"
                        >
                          Marquer livrée
                        </button>
                      </form>
                    ) : null}
                  </div>
                ) : null}
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
