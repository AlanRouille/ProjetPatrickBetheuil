import {
  cancelPendingOrderBySessionId,
  fulfillCheckoutSession,
} from "@/lib/orders";
import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Configuration du webhook Stripe incomplète." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const rawBody = await request.text();
    event = getStripe().webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("Signature webhook Stripe invalide :", error);
    return NextResponse.json(
      { error: "Signature Stripe invalide." },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await fulfillCheckoutSession(event.data.object);
        break;
      case "checkout.session.async_payment_failed":
      case "checkout.session.expired":
        await cancelPendingOrderBySessionId(event.data.object.id);
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Échec du traitement Stripe ${event.id} :`, error);
    return NextResponse.json(
      { error: "Le traitement de la commande a échoué." },
      { status: 500 }
    );
  }
}
