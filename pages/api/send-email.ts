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
    // Configurer le transporteur SMTP avec Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Vous pouvez utiliser un autre service SMTP
      auth: {
        user: process.env.EMAIL_USER, // Variable d'environnement pour protéger vos identifiants
        pass: process.env.EMAIL_PASS, // Variable d'environnement pour protéger vos identifiants
      },
    });

    // Définir les options de l'email
    const mailOptions = {
      from: `${firstName} ${lastName} <${email}>`,
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

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (error) {
    console.error("Erreur lors de l’envoi de l’email:", error);
    return res
      .status(500)
      .json({ message: "Erreur interne lors de l’envoi du message" });
  }
}
