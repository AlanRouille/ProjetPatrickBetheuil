import { prisma } from "@/lib/prisma";
import { revalidatePublicArtworkPaths } from "@/lib/revalidate-artworks";
import {
  sendAdminOrderNotification,
  sendBuyerOrderConfirmation,
  type OrderEmailData,
} from "@/lib/order-emails";
import type Stripe from "stripe";

function getStripePaymentId(session: Stripe.Checkout.Session) {
  return typeof session.payment_intent === "string"
    ? session.payment_intent
    : session.payment_intent?.id;
}

function getShippingData(session: Stripe.Checkout.Session) {
  const shipping = session.shipping_details;
  const address = shipping?.address ?? session.customer_details?.address;

  return {
    name: shipping?.name ?? session.customer_details?.name ?? null,
    phone: session.customer_details?.phone ?? null,
    address1: address?.line1 ?? null,
    address2: address?.line2 ?? null,
    city: address?.city ?? null,
    postalCode: address?.postal_code ?? null,
    country: address?.country ?? null,
  };
}

function toOrderEmailData(
  order: Awaited<ReturnType<typeof getOrderForEmails>>
): OrderEmailData | null {
  if (!order) {
    return null;
  }

  return {
    id: order.id,
    customerEmail: order.user.email,
    customerName: order.shippingName,
    totalInCents: Math.round(order.totalPrice),
    shippingAddress: [
      order.shippingAddress1,
      order.shippingAddress2,
      [order.shippingPostal, order.shippingCity].filter(Boolean).join(" "),
      order.shippingCountry,
    ].filter((line): line is string => Boolean(line)),
    items: order.items.map((item) => ({
      title: item.artwork.title,
      priceInCents: Math.round(item.price * 100),
    })),
  };
}

function getOrderForEmails(orderId: string) {
  return prisma.order.findUnique({
    where: { id: orderId },
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
}

async function sendOutstandingOrderEmails(orderId: string) {
  let order = await getOrderForEmails(orderId);

  if (!order || order.status !== "PAID") {
    return;
  }

  const emailData = toOrderEmailData(order);
  if (!emailData) {
    return;
  }

  if (!order.buyerEmailSentAt) {
    await sendBuyerOrderConfirmation(emailData);
    await prisma.order.updateMany({
      where: { id: order.id, buyerEmailSentAt: null },
      data: { buyerEmailSentAt: new Date() },
    });
  }

  order = await getOrderForEmails(orderId);
  if (!order) {
    return;
  }

  if (!order.adminEmailSentAt) {
    await sendAdminOrderNotification(emailData);
    await prisma.order.updateMany({
      where: { id: order.id, adminEmailSentAt: null },
      data: { adminEmailSentAt: new Date() },
    });
  }
}

export async function fulfillCheckoutSession(
  session: Stripe.Checkout.Session
) {
  if (session.payment_status !== "paid") {
    return;
  }

  const order = await prisma.order.findFirst({
    where: {
      OR: [
        { stripeSessionId: session.id },
        ...(session.metadata?.orderId
          ? [{ id: session.metadata.orderId }]
          : []),
      ],
    },
    include: {
      items: {
        include: {
          artwork: { select: { slug: true } },
        },
      },
    },
  });

  if (!order) {
    throw new Error(`Commande introuvable pour la session ${session.id}.`);
  }

  if (order.status === "CANCELED") {
    throw new Error(
      `La commande ${order.id} est annulée alors que Stripe la considère payée.`
    );
  }

  const shipping = getShippingData(session);

  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: order.id },
      data: {
        status: "PAID",
        paidAt: order.paidAt ?? new Date(),
        stripeSessionId: session.id,
        stripePaymentId: getStripePaymentId(session),
        shippingName: shipping.name,
        shippingAddress1: shipping.address1,
        shippingAddress2: shipping.address2,
        shippingCity: shipping.city,
        shippingPostal: shipping.postalCode,
        shippingCountry: shipping.country,
      },
    });

    if (shipping.phone) {
      await tx.user.update({
        where: { id: order.userId },
        data: { phone: shipping.phone },
      });
    }

    await tx.artwork.updateMany({
      where: {
        id: { in: order.items.map((item) => item.artworkId) },
        status: { in: ["AVAILABLE", "RESERVED"] },
      },
      data: { status: "SOLD" },
    });
  });

  revalidatePublicArtworkPaths(
    order.items.map((item) => item.artwork.slug)
  );

  await sendOutstandingOrderEmails(order.id);
}

export async function cancelPendingOrderBySessionId(sessionId: string) {
  const order = await prisma.order.findUnique({
    where: { stripeSessionId: sessionId },
    include: {
      items: {
        include: {
          artwork: { select: { slug: true } },
        },
      },
    },
  });

  if (!order || order.status !== "PENDING") {
    return false;
  }

  const canceled = await prisma.$transaction(async (tx) => {
    const canceled = await tx.order.updateMany({
      where: { id: order.id, status: "PENDING" },
      data: { status: "CANCELED" },
    });

    if (canceled.count === 0) {
      return false;
    }

    await tx.artwork.updateMany({
      where: {
        id: { in: order.items.map((item) => item.artworkId) },
        status: "RESERVED",
      },
      data: { status: "AVAILABLE" },
    });

    return true;
  });

  if (canceled) {
    revalidatePublicArtworkPaths(
      order.items.map((item) => item.artwork.slug)
    );
  }

  return canceled;
}
