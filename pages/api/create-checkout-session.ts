import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

// Définir une interface pour les articles
interface Item {
  title: string;
  imageUrl: string;
  price: number;
  id: number;
}

const shippingCost = 1000; // 10,00 € en cents

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { items, email }: { items: Item[]; email: string } = req.body;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.title,
          images: [`${req.headers.origin}${item.imageUrl}`], // URL absolue
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));

    // Ajouter les frais d'expédition
    line_items.push({
      price_data: {
        currency: "eur",
        product_data: {
          name: "Frais d'expédition",
          images: [`${req.headers.origin}/images/shipping.webp`], // URL complète pour l'image des frais d'expédition
        },
        unit_amount: shippingCost,
      },
      quantity: 1,
    });

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        line_items,
        mode: "payment",
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      const totalPrice = session.amount_total ?? 0;

      const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: { email },
      });

      await prisma.order.create({
        data: {
          userId: user.id,
          stripeSessionId: session.id,
          status: "PENDING",
          totalPrice,
          items: {
            create: items.map((item) => ({
              artworkId: item.id,
              price: item.price,
            })),
          },
        },
      });

      await prisma.artwork.updateMany({
        where: { id: { in: items.map((item) => item.id) } },
        data: { status: "RESERVED" },
      });

      res.status(200).json({ id: session.id, url: session.url });
    } catch (error) {
      console.error(
        "Erreur lors de la création de la session de paiement:",
        error
      );
      const errorMessage = (error as Error).message || "Erreur inconnue";
      res.status(500).json({
        error: "Erreur lors de la création de la session de paiement.",
        details: errorMessage,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
