import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: NodeJS.ReadableStream) {
  const chunks: Buffer[] = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

function getStripePaymentId(session: Stripe.Checkout.Session) {
  return typeof session.payment_intent === "string"
    ? session.payment_intent
    : session.payment_intent?.id;
}

async function markOrderAsPaid(session: Stripe.Checkout.Session) {
  const order = await prisma.order.findUnique({
    where: { stripeSessionId: session.id },
    include: { items: true },
  });

  if (!order || order.status === "PAID") {
    return;
  }

  await prisma.$transaction([
    prisma.order.update({
      where: { id: order.id },
      data: {
        status: "PAID",
        stripePaymentId: getStripePaymentId(session),
      },
    }),
    prisma.artwork.updateMany({
      where: { id: { in: order.items.map((item) => item.artworkId) } },
      data: { status: "SOLD" },
    }),
  ]);
}

async function cancelPendingOrder(session: Stripe.Checkout.Session) {
  const order = await prisma.order.findUnique({
    where: { stripeSessionId: session.id },
    include: { items: true },
  });

  if (!order || order.status !== "PENDING") {
    return;
  }

  await prisma.$transaction([
    prisma.order.update({
      where: { id: order.id },
      data: { status: "CANCELED" },
    }),
    prisma.artwork.updateMany({
      where: {
        id: { in: order.items.map((item) => item.artworkId) },
        status: "RESERVED",
      },
      data: { status: "AVAILABLE" },
    }),
  ]);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sig = req.headers["stripe-signature"];
  const body = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Webhook Error: ${error.message}`);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    } else {
      console.error("Webhook Error: Unknown error");
      return res.status(400).send("Webhook Error: Unknown error");
    }
  }

  // Gérer les événements de paiement
  if (event.type === "checkout.session.completed") {
    await markOrderAsPaid(event.data.object);
  } else if (event.type === "checkout.session.async_payment_failed") {
    await cancelPendingOrder(event.data.object);
  } else if (event.type === "checkout.session.expired") {
    await cancelPendingOrder(event.data.object);
  }

  res.json({ received: true });
}
