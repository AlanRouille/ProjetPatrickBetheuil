import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const shippingCost = 590;
const allowedShippingCountries: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  ["FR", "BE", "LU", "DE", "ES", "IT", "NL", "CH"];

class CheckoutError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

function isValidEmail(value: unknown) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizeArtworkIds(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .map((id) => Number(id))
        .filter((id) => Number.isInteger(id) && id > 0)
    )
  );
}

export async function POST(request: Request) {
  try {
    const { artworkIds: rawArtworkIds, email } = await request.json();
    const artworkIds = normalizeArtworkIds(rawArtworkIds);

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Adresse e-mail invalide." },
        { status: 400 }
      );
    }

    if (artworkIds.length === 0) {
      return NextResponse.json(
        { error: "Aucune œuvre sélectionnée." },
        { status: 400 }
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
      new URL(request.url).origin;

    const { order, artworks } = await prisma.$transaction(async (tx) => {
      const artworks = await tx.artwork.findMany({
        where: { id: { in: artworkIds } },
        select: {
          id: true,
          title: true,
          imageUrl: true,
          price: true,
          status: true,
        },
      });

      if (artworks.length !== artworkIds.length) {
        throw new CheckoutError("Une œuvre sélectionnée est introuvable.", 400);
      }

      const unavailableArtwork = artworks.find(
        (artwork) => artwork.status !== "AVAILABLE"
      );

      if (unavailableArtwork) {
        throw new CheckoutError(
          `L'œuvre ${unavailableArtwork.title} n'est plus disponible.`,
          409
        );
      }

      const user = await tx.user.upsert({
        where: { email },
        update: {},
        create: { email },
      });

      const totalPrice =
        artworks.reduce(
          (total, artwork) => total + Math.round(artwork.price * 100),
          0
        ) + shippingCost;

      const order = await tx.order.create({
        data: {
          userId: user.id,
          status: "PENDING",
          totalPrice,
          items: {
            create: artworks.map((artwork) => ({
              artworkId: artwork.id,
              price: artwork.price,
            })),
          },
        },
      });

      const reserved = await tx.artwork.updateMany({
        where: {
          id: { in: artworkIds },
          status: "AVAILABLE",
        },
        data: { status: "RESERVED" },
      });

      if (reserved.count !== artworkIds.length) {
        throw new CheckoutError(
          "Une œuvre vient d'être réservée. Merci de vérifier la galerie.",
          409
        );
      }

      return { order, artworks };
    });

    let stripeSessionId: string | null = null;

    try {
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        artworks.map((artwork) => ({
          price_data: {
            currency: "eur",
            product_data: {
              name: artwork.title,
              images: artwork.imageUrl.startsWith("http")
                ? [artwork.imageUrl]
                : [],
            },
            unit_amount: Math.round(artwork.price * 100),
          },
          quantity: 1,
        }));

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Frais d'expédition",
            images: [],
          },
          unit_amount: shippingCost,
        },
        quantity: 1,
      });

      const stripe = getStripe();
      const session = await stripe.checkout.sessions.create(
        {
          payment_method_types: ["card"],
          customer_email: email,
          customer_creation: "always",
          client_reference_id: order.id,
          line_items: lineItems,
          mode: "payment",
          locale: "fr",
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: allowedShippingCountries,
          },
          phone_number_collection: {
            enabled: true,
          },
          invoice_creation: {
            enabled: true,
          },
          success_url: `${siteUrl}/commande/succes?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${siteUrl}/commande/annulee?session_id={CHECKOUT_SESSION_ID}`,
          expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
          metadata: {
            orderId: order.id,
            artworkIds: artworkIds.join(","),
          },
        },
        {
          idempotencyKey: `checkout-${order.id}`,
        }
      );

      stripeSessionId = session.id;

      await prisma.order.update({
        where: { id: order.id },
        data: { stripeSessionId: session.id },
      });

      return NextResponse.json({ id: session.id, url: session.url });
    } catch (error) {
      if (stripeSessionId) {
        try {
          await getStripe().checkout.sessions.expire(stripeSessionId);
        } catch (stripeError) {
          console.error(
            `Impossible d’expirer la session Stripe ${stripeSessionId} :`,
            stripeError
          );
        }
      }

      await prisma.$transaction([
        prisma.order.update({
          where: { id: order.id },
          data: { status: "CANCELED" },
        }),
        prisma.artwork.updateMany({
          where: { id: { in: artworkIds } },
          data: { status: "AVAILABLE" },
        }),
      ]);

      throw error;
    }
  } catch (error) {
    console.error("Erreur lors de la création de la session Stripe:", error);
    const checkoutError = error instanceof CheckoutError ? error : null;

    return NextResponse.json(
      {
        error:
          checkoutError?.message ??
          "Erreur lors de la préparation de l'acquisition.",
      },
      { status: checkoutError?.status ?? 500 }
    );
  }
}
