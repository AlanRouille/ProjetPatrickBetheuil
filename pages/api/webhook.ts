import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sig = req.headers["stripe-signature"];
  const body = req.body;

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

    // Mettre à jour le statut dans la base de données
    await prisma.paymentSession.update({
      where: { stripeSessionId: session.id },
      data: { status: "completed" },
    });
  } else if (event.type === "checkout.session.async_payment_failed") {
    const session = event.data.object;

    // Mettre à jour le statut dans la base de données
    await prisma.paymentSession.update({
      where: { stripeSessionId: session.id },
      data: { status: "failed" },
    });
  }

  res.json({ received: true });
}
