import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { session_id } = req.query;

  if (typeof session_id === "string") {
    try {
      // Récupérer la session de paiement
      const session = await stripe.checkout.sessions.retrieve(session_id);

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

      res.status(200).json({ message: "Paiement réussi" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour du paiement." });
    }
  } else {
    res.status(400).json({ error: "ID de session invalide." });
  }
}
