"use client";

import Logo from "@/app/_components/icons/Logo.svg";
import { usePanier } from "@/app/context/PanierContext";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FullscreenMenu } from "./FullscreenMenu";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/#about" },
  { label: "Galerie", href: "/projets" },
  { label: "Contact", href: "#contact" },
];

const cartIconData =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAAAP9JREFUeAGtVAsRwjAMTTkEDAdBAThgEsABDgAFgAI04AAH4ABQsKFgOCgvEG6l13Frt3f3rmuTvubTjqy1la2xpI4YgGPlEZxRX5DowCt1hHEEGYMILigdT+POpJ6ySGnIwJI8wWtqY7BvB54G3vodnFIaJuDNF7yBTGlg3V8DIedgQQnQezz1FzM1ZBQBDUQaSj8pG2OkwyXF15FJ0x0GjGI44MSY6yMBbJoEH+CIPk+xLfbI7hK09PUEXUHWPxBTX4DY2bZHAW7/ic3VKdfvSsvADtcBn1z2h5oiHbt8iwzHlYyYl86hWcCHmyLMnai2mhbH+vii705rLecxPi/cfyxYuV42UgAAAABJRU5ErkJggg==";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { artworks, setShowPanierSidebar } = usePanier();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [scrollNavHidden, setScrollNavHidden] = useState(false);
  const [isOnLightSection, setIsOnLightSection] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const openTimerRef = useRef<number | null>(null);
  const scrollAnimationFrameRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const keepNavVisibleUntilRef = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateHeaderTheme = () => {
      const probeX = Math.min(window.innerWidth - 120, window.innerWidth * 0.78);
      const probeY = window.innerWidth >= 1024 ? 52 : 40;
      const themeElement = document
        .elementsFromPoint(probeX, probeY)
        .find(
          (element) =>
            element instanceof HTMLElement &&
            element.closest("[data-header-theme]")
        );
      const theme =
        themeElement instanceof HTMLElement
          ? themeElement.closest<HTMLElement>("[data-header-theme]")?.dataset
              .headerTheme
          : undefined;

      setIsOnLightSection(theme === "dark");
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      if (currentScrollY < 320) {
        setShowBackTop(false);
      } else if (scrollDelta < -2) {
        setShowBackTop(true);
      } else if (scrollDelta > 4) {
        setShowBackTop(false);
      }
      updateHeaderTheme();

      const keepNavVisible = performance.now() < keepNavVisibleUntilRef.current;

      if (menuOpen || navHidden || currentScrollY < 80 || keepNavVisible) {
        setScrollNavHidden(false);
      } else if (scrollDelta > 8) {
        setScrollNavHidden(true);
      } else if (scrollDelta < -2) {
        setScrollNavHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHeaderTheme);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHeaderTheme);
    };
  }, [menuOpen, navHidden]);

  useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
      }
      if (scrollAnimationFrameRef.current) {
        window.cancelAnimationFrame(scrollAnimationFrameRef.current);
      }
    };
  }, []);

  const openMenu = () => {
    if (menuOpen || navHidden) return;

    setNavHidden(true);
    openTimerRef.current = window.setTimeout(() => setMenuOpen(true), 140);
  };

  const closeMenu = useCallback(() => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    setMenuOpen(false);
    if (!menuOpen) {
      setNavHidden(false);
    }
  }, [menuOpen]);

  const handleMenuClosed = useCallback(() => {
    setNavHidden(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  const scrollToTop = () => {
    const scrollingElement = document.scrollingElement ?? document.documentElement;
    const startY = window.scrollY || scrollingElement.scrollTop;

    setScrollNavHidden(false);
    setShowBackTop(false);

    if (scrollAnimationFrameRef.current) {
      window.cancelAnimationFrame(scrollAnimationFrameRef.current);
    }

    if (
      startY <= 4 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      window.scrollTo(0, 0);
      return;
    }

    const startedAt = performance.now();
    const duration = 1200;

    const animateScroll = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const easedProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, Math.round(startY * (1 - easedProgress)));

      if (progress < 1) {
        scrollAnimationFrameRef.current = window.requestAnimationFrame(animateScroll);
      } else {
        scrollAnimationFrameRef.current = null;
      }
    };

    scrollAnimationFrameRef.current = window.requestAnimationFrame(animateScroll);
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (pathname !== "/") {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
      return;
    }

    window.history.replaceState(null, "", "/");
    scrollToTop();
  };

  const handleNavLinkClick = (href: string) => {
    if (href !== "/#about") return;

    keepNavVisibleUntilRef.current = performance.now() + 1200;
    setScrollNavHidden(false);
  };

  return (
    <>
      <header
        className="fixed left-0 top-0 z-[90] w-full bg-transparent"
      >
        <div className="flex h-16 w-full items-center justify-between px-5 sm:px-8 md:h-24 md:px-20 xl:px-24">
          <Link
            href="/"
            onClick={handleLogoClick}
            aria-label="Patrick Bétheuil - Accueil"
            className={`group flex shrink-0 items-center font-sans text-sm font-normal transition-colors duration-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent md:text-[17px] ${
              isOnLightSection ? "text-pb-black" : "text-pb-white"
            }`}
          >
            <span
              className={`relative h-11 w-11 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:h-16 md:w-16 ${
                pathname === "/"
                  ? ""
                  : "group-hover:rotate-45 group-focus-visible:rotate-45"
              }`}
            >
              <Image
                src={Logo}
                alt=""
                fill
                loading="eager"
                sizes="(max-width: 767px) 44px, 64px"
              />
            </span>
            {pathname !== "/" ? (
              <span className="ml-2 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:max-w-24 group-hover:opacity-100 group-focus-visible:max-w-24 group-focus-visible:opacity-100">
                Retour
              </span>
            ) : null}
          </Link>

          <div className="flex items-center gap-4 md:gap-7">
            <div className="hidden items-center gap-8 lg:flex xl:gap-9">
              <nav
                aria-label="Navigation principale"
                className={`flex items-center gap-8 font-sans text-[17px] font-normal transition-[color,opacity,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] xl:gap-9 ${
                  isOnLightSection ? "text-pb-black" : "text-pb-white"
                } ${
                  navHidden || scrollNavHidden
                    ? "-translate-y-10 opacity-0"
                    : "translate-y-0 opacity-100"
                }`}
              >
                {navLinks.map((link) => (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    onClick={() => handleNavLinkClick(link.href)}
                    className="group relative inline-block overflow-hidden"
                  >
                    <HeaderNavLabel label={link.label} />
                  </Link>
                ))}
              </nav>
              <span
                className={`h-8 w-px origin-center transition-[background-color,opacity,transform] delay-75 duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  isOnLightSection ? "bg-pb-black/75" : "bg-pb-white/80"
                } ${
                  navHidden || scrollNavHidden
                    ? "scale-y-0 opacity-0"
                    : "scale-y-100 opacity-100"
                }`}
                aria-hidden="true"
              />
            </div>
            {artworks.length > 0 ? (
              <button
                data-cart-button
                type="button"
                onClick={() => setShowPanierSidebar(true)}
                aria-label={`Ouvrir le panier (${artworks.length} ${
                  artworks.length > 1 ? "œuvres" : "œuvre"
                })`}
                className="cart-icon-enter group relative flex h-9 w-9 shrink-0 origin-center items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 active:scale-95 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent"
              >
                <Image
                  src={cartIconData}
                  alt=""
                  width={20}
                  height={20}
                  unoptimized
                  className={`h-5 w-5 transition-[filter,transform] duration-500 ${
                    isOnLightSection ? "brightness-0" : "brightness-0 invert"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-pb-accent px-1 font-sans text-[10px] font-semibold leading-none text-pb-black shadow-sm"
                >
                  {artworks.length > 99 ? "99+" : artworks.length}
                </span>
              </button>
            ) : null}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={openMenu}
              className={`group relative flex h-8 w-20 origin-center flex-col justify-center gap-2 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.76,0,0.24,1)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent md:h-10 md:w-28 md:gap-2.5 ${
                navHidden ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
              }`}
              aria-label="Ouvrir le menu"
              aria-controls="fullscreen-menu"
              aria-expanded={menuOpen || navHidden}
              aria-hidden={navHidden}
              disabled={navHidden}
            >
              <span
                className={`block h-px w-full transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1 ${
                  isOnLightSection ? "bg-pb-black" : "bg-pb-white"
                }`}
              />
              <span
                className={`block h-px w-full transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-1 ${
                  isOnLightSection ? "bg-pb-black" : "bg-pb-white"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <FullscreenMenu
        open={menuOpen}
        onClose={closeMenu}
        onAfterClose={handleMenuClosed}
      />

      <button
        type="button"
        onClick={scrollToTop}
        className={`fixed bottom-[calc(env(safe-area-inset-bottom)+4.5rem)] right-3 z-[85] flex h-12 w-12 items-center justify-center rounded-full border border-pb-white/55 bg-pb-black/70 text-pb-white transition-[opacity,transform,border-color] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:border-pb-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent md:bottom-7 md:right-7 ${
          showBackTop
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-75 opacity-0"
        }`}
        aria-label="Remonter en haut de la page"
        aria-hidden={!showBackTop}
        disabled={!showBackTop}
      >
        <ArrowUp aria-hidden="true" size={20} strokeWidth={1.6} />
      </button>
    </>
  );
}

function HeaderNavLabel({ label }: { label: string }) {
  const letters = Array.from(label);

  return (
    <span className="block whitespace-nowrap" aria-label={label}>
      <span aria-hidden="true">
        {letters.map((letter, index) => {
          if (letter === " ") {
            return (
              <span key={`${label}-space-${index}`} className="inline-block w-[0.34em]">
                &nbsp;
              </span>
            );
          }

          return (
            <span
              key={`${label}-${letter}-${index}`}
              className="relative inline-block overflow-hidden align-bottom"
            >
              <span
                className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[115%]"
                style={{ transitionDelay: `${index * 24}ms` }}
              >
                {letter}
              </span>
              <span
                className="absolute left-0 top-0 block translate-y-[115%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                style={{ transitionDelay: `${index * 24}ms` }}
              >
                {letter}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
