"use client";

import { Copy } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Facebook2 from "../_components/icons/Facebook2.svg";
import Instagram2 from "../_components/icons/Instagram2.svg";
import Pinterest from "../_components/icons/Pinterest.svg";
import Twitter from "../_components/icons/Twitter.png";
import Whatsapp from "../_components/icons/Whatsapp.svg";

interface ShareModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ showModal, setShowModal }) => {
  const [copied, setCopied] = useState(false);
  const urlToShare = "http://www.patrickbetheuil.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(urlToShare);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white p-6 shadow-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="flex justify-center font-title font-normal text-xl mb-4">
          Partager
        </h2>
        <div className="relative mb-8">
          <input
            type="text"
            value={urlToShare}
            readOnly
            className="border border-gray-300 rounded p-2 w-full pl-10"
          />
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 bg-gray-200 rounded"
            onClick={handleCopy}
          >
            <Copy className="w-4 h-4" />
          </button>
          {copied && (
            <div className="absolute top-full transform -translate-y-1 mt-2 text-white bg-primary-black rounded p-1 text-xs">
              COPIER
            </div>
          )}
        </div>

        <div className="flex justify-around mb-4">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              urlToShare
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Facebook2} alt="Facebook" width={45} height={45} />
          </a>
          <a
            href={`https://x.com/intent/post?url=${encodeURIComponent(
              urlToShare
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Twitter} alt="Twitter" width={45} height={45} />
          </a>
          <a
            href={`https://www.instagram.com/?url=${encodeURIComponent(
              urlToShare
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Instagram2} alt="Instagram" width={45} height={45} />
          </a>
          <a
            href={`https://fr.pinterest.com/pin/create/button/?url=${encodeURIComponent(
              urlToShare
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Pinterest} alt="Pinterest" width={45} height={45} />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              urlToShare
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={Whatsapp} alt="WhatsApp" width={45} height={45} />
          </a>
        </div>
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 shadow-lg bg-primary-orange hover:bg-orange-600 text-white rounded-sm transform transition-all duration-200 ease-in-out hover:scale-95 hover:shadow-md p-2 w-full"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
