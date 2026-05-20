import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    const session = event.data.object;

    const order = await prisma.order.update({
      where: { stripeSessionId: session.id },
      data: {
        status: "PAID",
        stripePaymentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id,
      },
      include: { items: true },
    });

    await prisma.artwork.updateMany({
      where: { id: { in: order.items.map((item) => item.artworkId) } },
      data: { status: "SOLD" },
    });
  } else if (event.type === "checkout.session.async_payment_failed") {
    const session = event.data.object;

    const order = await prisma.order.update({
      where: { stripeSessionId: session.id },
      data: { status: "CANCELED" },
      include: { items: true },
    });

    await prisma.artwork.updateMany({
      where: { id: { in: order.items.map((item) => item.artworkId) } },
      data: { status: "AVAILABLE" },
    });
  } else if (event.type === "checkout.session.expired") {
    const session = event.data.object;

    const order = await prisma.order.update({
      where: { stripeSessionId: session.id },
      data: { status: "CANCELED" },
      include: { items: true },
    });

    await prisma.artwork.updateMany({
      where: { id: { in: order.items.map((item) => item.artworkId) } },
      data: { status: "AVAILABLE" },
    });
  }

  res.json({ received: true });
}
