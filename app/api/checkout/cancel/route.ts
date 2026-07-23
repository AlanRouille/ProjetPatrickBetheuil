import { cancelPendingOrderBySessionId } from "@/lib/orders";
import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const sessionId =
      typeof body === "object" &&
      body !== null &&
      "sessionId" in body &&
      typeof body.sessionId === "string"
        ? body.sessionId
        : null;

    if (!sessionId?.startsWith("cs_")) {
      return NextResponse.json(
        { error: "Session Stripe invalide." },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.status === "complete") {
      return NextResponse.json(
        { error: "Cette commande a déjà été finalisée." },
        { status: 409 }
      );
    }

    if (session.status === "open") {
      await stripe.checkout.sessions.expire(sessionId);
    }

    await cancelPendingOrderBySessionId(sessionId);

    return NextResponse.json({ canceled: true });
  } catch (error) {
    console.error("Impossible d’annuler la session Stripe :", error);
    return NextResponse.json(
      { error: "Impossible de libérer la sélection immédiatement." },
      { status: 500 }
    );
  }
}
