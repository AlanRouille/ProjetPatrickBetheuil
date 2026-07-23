"use client";

import { ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Facebook from "../_components/icons/Facebook.svg";
import Instagram from "../_components/icons/Instagram.svg";
import Logo from "../_components/icons/Logo.svg";
import MenuBurger from "../_components/icons/MenuBurger.svg";
import share from "../_components/icons/share.svg";
import { useModal } from "../context/ModalContext";
import { usePanier } from "../context/PanierContext";
import ShareModal from "./ShareModal";

interface HeaderProps {
  showLogo?: boolean;
}

export function Header({ showLogo = true }: HeaderProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showReturnText, setShowReturnText] = useState(false);
  const { showModal, setShowModal } = useModal();
  const { setShowPanierSidebar, artworks } = usePanier();

  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const handleCartClick = () => {
    setShowPanierSidebar(true);
  };

  return (
    <header
      className={`py-3 pt-4 ${hasMounted ? "opacity-100" : "opacity-0"}`}
      style={{ position: "relative", zIndex: 1000 }}
    >
      <div className="max-w-screen-7xl px-5 flex items-center">
        {(pathname !== "/" || showLogo) && (
          <div className="flex items-center group">
            <h1 className="transition-opacity duration-1000">
              <Link href="/">
                <Image
                  className={`cursor-pointer transition-transform duration-500 ease-in-out ${
                    showReturnText ? "filter brightness-0 invert" : ""
                  } hover:rotate-45`}
                  src={Logo}
                  alt="Logo"
                  width={42}
                  height={42}
                  onMouseEnter={() => setShowReturnText(true)}
                  onMouseLeave={() => setShowReturnText(false)}
                />
              </Link>
            </h1>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ml-2 ${
                showReturnText ? "max-w-[100px]" : "max-w-0"
              }`}
            >
              <Link href="/">
                <span
                  className={`cursor-pointer font-sans text-white pr-2 transition-opacity duration-500 ${
                    showReturnText ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Retour
                </span>
              </Link>
            </div>
          </div>
        )}

        <div className="flex-1" />

        <div className="flex items-center space-x-5">
          {/* Icônes sociales affichées en permanence */}
          <ul className="flex space-x-2 md:space-x-5">
            <Link href="https://www.facebook.com/betheuil.patrick">
              <Image
                className="cursor-pointer"
                src={Facebook}
                alt="Facebook"
                width={24}
                height={24}
              />
            </Link>
            <Link href="https://www.instagram.com/betheuilpatrick/">
              <Image
                className="cursor-pointer"
                src={Instagram}
                alt="Instagram"
                width={24}
                height={24}
              />
            </Link>
            <div className="cursor-pointer" onClick={() => setShowModal(true)}>
              <Image
                className="cursor-pointer"
                src={share}
                alt="Partager"
                width={24}
                height={24}
              />
            </div>
          </ul>

          <div className="relative cursor-pointer" onClick={handleCartClick}>
            {artworks.length > 0 && (
              <>
                <ShoppingCart className="text-white cursor-pointer" size={24} />
                <span className="absolute -top-2 -right-2 bg-primary-orange font-sans font-thin text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {artworks.length}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center">
            {pathname && pathname.startsWith("/projets/") && (
              <Link href="/projets">
                <div
                  className="flex items-center text-white cursor-pointer group mr-2 md:mr-4 ml-5"
                  onMouseEnter={() => setShowText(false)}
                >
                  <span className="text-base font-sans font-normal">
                    Fermer
                  </span>
                  <span className="mx-2 border-r h-6 border-gray-500"></span>

                  <div className="pointer-events-none fixed inset-0 items-center justify-center bg-black bg-opacity-80 z-40 transition-opacity duration-500 ease-in-out hidden group-hover:flex">
                    <X
                      size={300}
                      className="text-white opacity-90"
                      style={{ zIndex: 1100 }}
                    />
                  </div>
                </div>
              </Link>
            )}

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                showText ? "max-w-[100px]" : "max-w-0"
              }`}
            >
              <Link href="/home">
                <span
                  className={`cursor-pointer font-sans text-white pr-2 transition-opacity duration-500 ${
                    showText ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Découvrir
                </span>
              </Link>
            </div>

            <Link href="/home">
              <Image
                className="cursor-pointer ml-2"
                src={MenuBurger}
                alt="MenuBurger"
                width={16}
                height={16}
                onMouseEnter={() => setShowText(true)}
                onMouseLeave={() => setShowText(false)}
              />
            </Link>
          </div>
        </div>
      </div>
      <ShareModal showModal={showModal} setShowModal={setShowModal} />
    </header>
  );
}
