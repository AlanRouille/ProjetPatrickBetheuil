"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { usePanier } from "../context/PanierContext";

const stripePromise = loadStripe(
  "pk_test_51QCLr5EAABLLRF7E7kf9Zb0GyTOnZyAtGqU7MfOQ3YqTuWh5KFEigobiVsIQ87Apg2jdE06kB8FvY9h8hx38E8HD00W8NAgaHM"
);

const PanierModal: React.FC = () => {
  const { showPanierSidebar, setShowPanierSidebar, artworks, removeArtwork } =
    usePanier();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!showPanierSidebar) return null;

  const handlePayment = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pour valider l'email
    if (!email || !emailPattern.test(email)) {
      setErrorMessage("Veuillez entrer un email valide pour payer.");
      return;
    }

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: artworks, email }),
    });

    const session = await response.json();

    if (response.ok) {
      window.open(session.url, "_blank");
    } else {
      console.error("Erreur lors de la création de la session:", session.error);
    }

    setErrorMessage(null); // Réinitialiser le message d'erreur si l'email est valide
  };

  return (
    <div
      className={`fixed inset-0 flex justify-end z-50 transition-opacity duration-500 ${
        showPanierSidebar ? "opacity-100" : "opacity-0"
      }`}
      onClick={() => setShowPanierSidebar(false)}
    >
      <div
        className={`bg-white w-full h-full md:w-1/3 md:h-full shadow-lg relative flex flex-col transition-transform duration-500 transform ${
          showPanierSidebar ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 p-5">
          <h2 className="text-xl font-normal font-title">PANIER</h2>
          <button
            onClick={() => setShowPanierSidebar(false)}
            className="text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow">
          {artworks.length > 0 ? (
            artworks.map((artwork) => (
              <div key={artwork.id} className="mb-4">
                <div className="border-t border-b border-primary-orange pt-5 pb-5 flex items-center relative">
                  <div>
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-20 h-20 pl-5"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="ml-20 flex flex-col justify-center">
                    <h3 className="text-xl font-sans font-normal">
                      {artwork.title}
                    </h3>
                  </div>
                  <button
                    className="absolute top-2 right-2 text-primary-orange font-sans flex items-center"
                    onClick={() => removeArtwork(artwork.id)}
                  >
                    <Trash2 size={24} className="ml-2" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune œuvre sélectionnée.</p>
          )}
        </div>
        <div className="bg-primary-black pt-5 p-0 h-36">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-normal ml-5 ">TOTAL</h3>
            <p className="text-lg font-title text-white mr-5 ">
              {artworks
                .reduce((total, artwork) => total + artwork.price, 0)
                .toFixed(2)}{" "}
              €
            </p>
          </div>
          <p className="text-white mt-1 text-xs font-sans font-light ml-5 pb-4 ">
            Frais d&#39;expédition et taxes calculés au moment du paiement
          </p>
          <div className="flex items-center mt-2 ml-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-2/3 h-10 mr-4 mb-6 p-4 shadow-sm font-sans font-normal rounded-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary-orange"
            />
            <button
              className="bg-primary-orange rounded-sm hover:bg-orange-600 text-white font-normal shadow-lg transform transition-all duration-200 ease-in-out hover:scale-95 hover:shadow-md p-2 w-36 mb-6 mr-5"
              onClick={handlePayment}
              disabled={!email}
            >
              Payer
            </button>
          </div>
        </div>

        {/* Afficher le message d'erreur si nécessaire */}
        {errorMessage && (
          <div className="font-sans font-normal w-full bg-red-600 text-white p-2">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default PanierModal;
