"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import AudioPlayer from "../_components/AudioPlayer";
import { Header } from "../_components/Header";

export default function Contact() {
  // États pour gérer l'animation d'apparition et le formulaire
  const [isLoaded, setIsLoaded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [customMessage, setCustomMessage] = useState<string | null>(null);

  const images = [
    "/images/29-LesAras.webp",
    "/images/13-L'Illusion.webp",
    "/images/15-LeCrabe.webp",
    "/images/02-LaBiche.webp",
    "/images/26-LesDanseuses.webp",
    "/images/35-LaFragmentation.webp",
    "/images/37-L'Incertitude.webp",
    "/images/27-LesNeurones.webp",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Démarrer l'animation d'apparition lors du montage du composant
    setIsLoaded(true);

    // Changement d'image automatique toutes les 5 secondes avec effet de fondu
    const intervalId = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false);
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setCustomMessage(null); // Réinitialiser le message personnalisé

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, message }),
      });

      if (response.ok) {
        setFormStatus("sent");
        setCustomMessage(
          "Votre message a été envoyé avec succès. Merci beaucoup de m'avoir contacté !"
        );
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      } else {
        setFormStatus("error");
        setCustomMessage(
          "Désolé, nous n'avons pas pu envoyer votre message. Veuillez vérifier les informations fournies et réessayer."
        );
      }
    } catch (error) {
      console.error("Erreur lors de l’envoi de la requête:", error);
      setFormStatus("error");
      setCustomMessage(
        "Une erreur réseau est survenue. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <div className="text-white min-h-screen flex flex-col">
      <Header />

      <div
        className={`flex flex-col md:flex-row items-center justify-center flex-1 p-8 gap-8 md:gap-16 max-w-6xl mx-auto transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Section image à gauche avec changement automatique et effet de fondu */}
        <div
          className={`w-full md:w-1/2 flex justify-center transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
        >
          <div
            className={`transition-opacity duration-500 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src={images[currentImageIndex]}
              alt="Image de contact"
              width={500}
              height={600}
              className="object-cover rounded-sm"
            />
          </div>
        </div>

        {/* Section formulaire à droite avec animation de fondu */}
        <div
          className={`w-full md:w-1/2 flex flex-col space-y-6 transform transition-all duration-1000 delay-200 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-light font-title mb-3 text-shadow-sm">
            Entrer en contact
          </h2>
          <p className="font-sans font-thin mb-6 text-base text-shadow-sm">
            Veuillez utiliser le modèle ci-dessous pour envoyer un message à
            Patrick
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <input
                type="text"
                placeholder="Nom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="font-sans font-normal flex-1 p-4 rounded-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary-orange"
              />
              <input
                type="text"
                placeholder="Prénom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="shadow-sm font-sans font-normal flex-1 p-4 rounded-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary-orange"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow-sm font-sans font-normal w-full p-4 rounded-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary-orange"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="shadow-sm font-sans font-normal w-full p-4 rounded-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary-orange"
              rows={6}
            />
            <button
              type="submit"
              className={`w-full p-4 rounded-md text-1xl uppercase bg-primary-orange hover:bg-orange-600 text-white font-title mt-5 transition duration-200 ease-in-out ${
                formStatus === "sending"
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-95 hover:shadow-md"
              }`}
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>

          {/* Messages de succès ou d'erreur */}
          {customMessage && (
            <div
              className={`${
                formStatus === "sent" ? "bg-green-500" : "bg-red-500"
              } text-white p-4 rounded-sm mt-4 shadow-lg transition-all duration-300 ease-in-out`}
            >
              {customMessage}
            </div>
          )}
        </div>
      </div>
      <AudioPlayer />
    </div>
  );
}
