"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();

  if (!session) {
    throw new Error("Vous devez être connecté pour modifier une commande.");
  }
}

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function markOrderAsShippedAction(formData: FormData) {
  await requireAdmin();

  const orderId = readText(formData, "orderId");
  const trackingNumber = readText(formData, "trackingNumber");
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { status: true },
  });

  if (!order || !["PAID", "SHIPPED"].includes(order.status)) {
    throw new Error("Seule une commande payée peut être expédiée.");
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "SHIPPED",
      trackingNumber: trackingNumber || null,
      shippedAt: new Date(),
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/commandes");
}

export async function markOrderAsDeliveredAction(formData: FormData) {
  await requireAdmin();

  const orderId = readText(formData, "orderId");
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { status: true },
  });

  if (!order || !["SHIPPED", "DELIVERED"].includes(order.status)) {
    throw new Error("La commande doit être expédiée avant d’être livrée.");
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "DELIVERED",
      deliveredAt: new Date(),
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/commandes");
}
