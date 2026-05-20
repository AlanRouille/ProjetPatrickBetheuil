import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const isLocalEmail =
      process.env.NODE_ENV !== "production" &&
      (!process.env.EMAIL_USER || !process.env.EMAIL_PASS);

    const transporter = isLocalEmail
      ? nodemailer.createTransport({
          streamTransport: true,
          buffer: true,
        })
      : nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

    // Définir les options de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER || `${firstName} ${lastName} <${email}>`,
      replyTo: `${firstName} ${lastName} <${email}>`,
      to: process.env.EMAIL_RECEIVER, // Email où vous souhaitez recevoir les messages
      subject: `Nouveau message de ${firstName} ${lastName}`,
      text: message,
      html: `
        <h3>Vous avez reçu un nouveau message de votre site web !</h3>
        <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    if (isLocalEmail) {
      const localInfo = info as { message?: Buffer };
      console.log("Email local capture:", localInfo.message?.toString());
    }

    return res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l’envoi de l’email:", error);
    return res
      .status(500)
      .json({ message: "Erreur interne lors de l’envoi du message" });
  }
}
