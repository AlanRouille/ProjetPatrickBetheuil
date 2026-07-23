import nodemailer, { type Transporter } from "nodemailer";

interface OrderEmailItem {
  title: string;
  priceInCents: number;
}

export interface OrderEmailData {
  id: string;
  customerEmail: string;
  customerName: string | null;
  totalInCents: number;
  shippingAddress: string[];
  items: OrderEmailItem[];
}

interface TransactionalEmail {
  to: string;
  subject: string;
  text: string;
  html: string;
  idempotencyKey: string;
}

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

let mailTransporter: Transporter | null = null;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getMailTransporter() {
  if (mailTransporter) {
    return mailTransporter;
  }

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    return mailTransporter;
  }

  if (process.env.NODE_ENV !== "production") {
    mailTransporter = nodemailer.createTransport({
      streamTransport: true,
      buffer: true,
    });
    return mailTransporter;
  }

  throw new Error(
    "Aucun service e-mail configuré. Ajoutez RESEND_API_KEY ou EMAIL_USER/EMAIL_PASS."
  );
}

async function sendWithResend(email: TransactionalEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.EMAIL_FROM ??
    "Patrick Betheuil <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": email.idempotencyKey,
    },
    body: JSON.stringify({
      from,
      to: [email.to],
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Échec de l’envoi Resend (${response.status}) : ${details}`);
  }
}

async function sendTransactionalEmail(email: TransactionalEmail) {
  if (process.env.RESEND_API_KEY) {
    await sendWithResend(email);
    return;
  }

  const transporter = getMailTransporter();
  const from =
    process.env.EMAIL_FROM ??
    process.env.EMAIL_USER ??
    "Patrick Betheuil <no-reply@localhost>";
  const info = await transporter.sendMail({
    from,
    to: email.to,
    subject: email.subject,
    text: email.text,
    html: email.html,
    headers: {
      "X-Order-Idempotency-Key": email.idempotencyKey,
    },
  });

  if (process.env.NODE_ENV !== "production" && !process.env.EMAIL_PASS) {
    const localInfo = info as { message?: Buffer };
    console.log(
      `E-mail local ${email.idempotencyKey} :`,
      localInfo.message?.toString()
    );
  }
}

function renderItemsText(items: OrderEmailItem[]) {
  return items
    .map(
      (item) =>
        `- ${item.title} — ${currencyFormatter.format(item.priceInCents / 100)}`
    )
    .join("\n");
}

function renderItemsHtml(items: OrderEmailItem[]) {
  return items
    .map(
      (item) =>
        `<li style="margin-bottom:8px">${escapeHtml(item.title)} — <strong>${currencyFormatter.format(
          item.priceInCents / 100
        )}</strong></li>`
    )
    .join("");
}

function orderReference(orderId: string) {
  return orderId.slice(0, 8).toUpperCase();
}

export async function sendBuyerOrderConfirmation(order: OrderEmailData) {
  const reference = orderReference(order.id);
  const addressText =
    order.shippingAddress.length > 0
      ? order.shippingAddress.join("\n")
      : "Adresse transmise à Stripe";
  const addressHtml =
    order.shippingAddress.length > 0
      ? order.shippingAddress.map(escapeHtml).join("<br />")
      : "Adresse transmise à Stripe";

  await sendTransactionalEmail({
    to: order.customerEmail,
    subject: `Confirmation de votre acquisition — commande ${reference}`,
    idempotencyKey: `buyer-order-${order.id}`,
    text: `Bonjour${order.customerName ? ` ${order.customerName}` : ""},

Votre règlement a bien été confirmé. Merci pour votre confiance.

Commande ${reference}
${renderItemsText(order.items)}

Livraison : ${addressText}
Total : ${currencyFormatter.format(order.totalInCents / 100)}

Patrick Betheuil vous contactera lorsque votre commande sera prête à être expédiée.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#111;line-height:1.6">
        <p style="color:#f59d0a;text-transform:uppercase;letter-spacing:.18em">Patrick Betheuil</p>
        <h1 style="font-weight:400">Votre acquisition est confirmée</h1>
        <p>Bonjour${order.customerName ? ` ${escapeHtml(order.customerName)}` : ""},</p>
        <p>Votre règlement a bien été confirmé. Merci pour votre confiance.</p>
        <h2 style="font-size:18px">Commande ${reference}</h2>
        <ul style="padding-left:20px">${renderItemsHtml(order.items)}</ul>
        <p><strong>Livraison</strong><br />${addressHtml}</p>
        <p style="font-size:18px"><strong>Total : ${currencyFormatter.format(
          order.totalInCents / 100
        )}</strong></p>
        <p>Patrick Betheuil vous contactera lorsque votre commande sera prête à être expédiée.</p>
      </div>
    `,
  });
}

export async function sendAdminOrderNotification(order: OrderEmailData) {
  const recipient =
    process.env.ORDER_NOTIFICATION_EMAIL ??
    process.env.EMAIL_RECEIVER ??
    process.env.EMAIL_USER;

  if (!recipient) {
    throw new Error(
      "Ajoutez ORDER_NOTIFICATION_EMAIL ou EMAIL_RECEIVER pour recevoir les commandes."
    );
  }

  const reference = orderReference(order.id);
  const addressText =
    order.shippingAddress.length > 0
      ? order.shippingAddress.join("\n")
      : "Adresse transmise à Stripe";
  const addressHtml =
    order.shippingAddress.length > 0
      ? order.shippingAddress.map(escapeHtml).join("<br />")
      : "Adresse transmise à Stripe";

  await sendTransactionalEmail({
    to: recipient,
    subject: `Nouvelle commande payée ${reference}`,
    idempotencyKey: `admin-order-${order.id}`,
    text: `Une nouvelle commande vient d’être réglée.

Commande ${reference}
Client : ${order.customerName ?? "Non renseigné"}
E-mail : ${order.customerEmail}

${renderItemsText(order.items)}

Livraison : ${addressText}
Total : ${currencyFormatter.format(order.totalInCents / 100)}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#111;line-height:1.6">
        <p style="color:#f59d0a;text-transform:uppercase;letter-spacing:.18em">Nouvelle commande</p>
        <h1 style="font-weight:400">Commande ${reference}</h1>
        <p><strong>Client :</strong> ${escapeHtml(order.customerName ?? "Non renseigné")}<br />
        <strong>E-mail :</strong> ${escapeHtml(order.customerEmail)}</p>
        <ul style="padding-left:20px">${renderItemsHtml(order.items)}</ul>
        <p><strong>Livraison</strong><br />${addressHtml}</p>
        <p style="font-size:18px"><strong>Total : ${currencyFormatter.format(
          order.totalInCents / 100
        )}</strong></p>
      </div>
    `,
  });
}
