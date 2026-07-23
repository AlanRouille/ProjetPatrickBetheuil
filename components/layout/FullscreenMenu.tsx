"use client";

import { gsap } from "gsap";
import Logo from "@/app/_components/icons/Logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/#about" },
  { label: "Galerie", href: "/projets" },
  { label: "Contact", href: "#contact" },
];

const email = "pbetheuil.art@gmail.com";

interface FullscreenMenuProps {
  open: boolean;
  onClose: () => void;
  onAfterClose?: () => void;
}

export function FullscreenMenu({
  open,
  onClose,
  onAfterClose,
}: FullscreenMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [shouldRender, setShouldRender] = useState(open);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
    }
  }, [open]);

  useEffect(() => {
    if (!shouldRender) return;

    const panel = panelRef.current;
    const content = contentRef.current;

    if (!panel || !content) return;

    document.body.classList.add("overflow-hidden");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const curtainLayers = panel.querySelectorAll("[data-curtain-layer]");
    const menuItems = panel.querySelectorAll("[data-menu-item]");
    const infoItems = panel.querySelectorAll("[data-menu-info]");
    const lineItems = panel.querySelectorAll("[data-menu-line]");
    const closeButton = panel.querySelector("[data-menu-close]");
    const crossLines = panel.querySelectorAll("[data-menu-cross]");
    const movingItems = [...Array.from(menuItems), ...Array.from(infoItems)];

    timelineRef.current?.kill();

    if (reducedMotion) {
      gsap.set(panel, {
        autoAlpha: 1,
      });
      gsap.set(curtainLayers, { autoAlpha: 1, scaleY: 1, xPercent: 0 });
      gsap.set(content, { autoAlpha: 1 });
      gsap.set(movingItems, { autoAlpha: 1, y: 0 });
      gsap.set(lineItems, { autoAlpha: 1, scaleX: 1, scaleY: 1 });
      gsap.set(closeButton, { autoAlpha: 1, scale: 1, y: 0 });
      gsap.set(crossLines, { scaleX: 1 });
      timelineRef.current = null;

      return () => {
        document.body.classList.remove("overflow-hidden");
      };
    }

    gsap.set(panel, {
      autoAlpha: 1,
    });
    gsap.set(curtainLayers, {
      autoAlpha: 1,
      scaleY: isMobile ? 1 : 0,
      xPercent: isMobile ? 100 : 0,
      transformOrigin: isMobile ? "right center" : "bottom",
    });
    gsap.set(content, { autoAlpha: 0 });
    gsap.set(menuItems, { autoAlpha: 0, y: 50 });
    gsap.set(infoItems, { autoAlpha: 0, y: 50 });
    gsap.set(lineItems, {
      autoAlpha: 0,
      scaleX: isMobile ? 0 : 1,
      scaleY: isMobile ? 1 : 0,
      transformOrigin: "center center",
    });
    gsap.set(crossLines, {
      scaleX: 0,
      transformOrigin: "center center",
    });
    gsap.set(closeButton, {
      autoAlpha: 0,
      scale: 0,
      y: 0,
      transformOrigin: "center center",
    });

    const timeline = gsap.timeline({
      paused: true,
      defaults: { overwrite: "auto" },
      onReverseComplete: () => {
        setShouldRender(false);
        document.body.classList.remove("overflow-hidden");
        onAfterClose?.();
      },
    });

    timeline
      .set(content, { autoAlpha: 1 })
      .to(curtainLayers, {
        scaleY: 1,
        xPercent: 0,
        duration: 1.05,
        stagger: 0.1,
        ease: "power4.inOut",
      })
      .to(
        closeButton,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.58,
          ease: "power4.out",
        },
        0.02
      )
      .to(
        crossLines,
        {
          scaleX: 1,
          duration: 0.42,
          stagger: 0.04,
          ease: "power4.out",
        },
        0.16
      )
      .to(
        menuItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power4.out",
        },
        "-=0.12"
      )
      .to(
        infoItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power4.out",
        },
        "<"
      )
      .to(
        lineItems,
        {
          autoAlpha: 1,
          scaleX: 1,
          scaleY: 1,
          duration: 0.7,
          ease: "power4.out",
        },
        "<"
      );

    timelineRef.current = timeline;

    return () => {
      timeline.kill();
      document.body.classList.remove("overflow-hidden");
    };
  }, [onAfterClose, shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;

    if (open) {
      document.body.classList.add("overflow-hidden");
      timelineRef.current?.timeScale(1).play();
      return;
    }

    document.body.classList.remove("overflow-hidden");

    if (timelineRef.current) {
      timelineRef.current.timeScale(1.15).reverse();
      return;
    }

    setShouldRender(false);
    document.body.classList.remove("overflow-hidden");
    onAfterClose?.();
  }, [onAfterClose, open, shouldRender]);

  useEffect(() => {
    if (!open && !shouldRender) {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open, shouldRender]);

  if (!shouldRender) return null;

  const closeMenu = () => {
    onClose();
  };

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[100] text-pb-white"
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
    >
      <div
        data-curtain-layer
        className="absolute inset-0 z-0 origin-bottom bg-pb-accent"
        aria-hidden="true"
      />
      <div
        data-curtain-layer
        className="absolute inset-0 z-[1] origin-bottom bg-[#F7F4EE]"
        aria-hidden="true"
      />
      <div
        data-curtain-layer
        className="absolute inset-0 z-[2] origin-bottom bg-pb-black"
        aria-hidden="true"
      />
      <div
        ref={contentRef}
        className="relative z-10 min-h-screen px-8 py-7 md:px-16 lg:px-20"
      >
        <div className="flex items-start justify-between">
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="Patrick Bétheuil - Accueil"
            className="absolute left-5 top-[10px] z-30 h-11 w-11 shrink-0 sm:left-8 md:left-20 md:top-4 md:h-16 md:w-16 xl:left-24"
          >
            <Image
              src={Logo}
              alt=""
              fill
              sizes="(max-width: 767px) 44px, 64px"
            />
          </Link>

          <button
            data-menu-close
            type="button"
            onClick={closeMenu}
            className="absolute right-[42px] top-[14px] z-30 flex h-9 w-9 items-center justify-center rounded-full bg-pb-white transition hover:bg-pb-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent sm:right-[54px] md:right-[118px] md:top-[30px] lg:right-[108px] lg:top-[18px] lg:h-14 lg:w-14 xl:right-[124px]"
            aria-label="Fermer le menu"
          >
            <span
              data-menu-cross
              className="absolute h-px w-6 rotate-45 bg-pb-black lg:w-8"
            />
            <span
              data-menu-cross
              className="absolute h-px w-6 -rotate-45 bg-pb-black lg:w-8"
            />
          </button>
        </div>

        <div className="relative min-h-[calc(100vh-112px)] lg:min-h-screen">
          <nav
            aria-label="Navigation principale"
            className="pt-[200px] lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[620px] lg:-translate-x-[680.5px] lg:-translate-y-1/2 lg:pt-0"
          >
            <ul className="flex flex-col items-end space-y-0 text-right lg:gap-8 lg:space-y-0 lg:text-right">
              {links.map((link) => (
                <li
                  key={`${link.href}-${link.label}`}
                  data-menu-item
                  className="lg:flex lg:w-full lg:justify-end"
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="group block whitespace-nowrap font-sans text-[clamp(3.8rem,15vw,5.2rem)] font-light italic leading-[1.08] tracking-[0.04em] text-pb-white transition duration-300 hover:text-pb-white lg:w-fit lg:text-right lg:text-[clamp(72px,5.8vw,104px)] lg:font-normal lg:leading-[0.95] lg:tracking-[0.055em]"
                  >
                    <MenuLinkLabel label={link.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            data-menu-line
            className="-mx-4 mt-44 h-px w-[calc(100%+2rem)] bg-pb-white/35 lg:absolute lg:left-1/2 lg:top-1/2 lg:mx-0 lg:mt-0 lg:block lg:h-[620px] lg:w-px lg:translate-x-[139.5px] lg:-translate-y-1/2 lg:bg-pb-white/80"
            aria-hidden="true"
          />

          <div
            data-menu-info
            className="-mx-4 mt-16 flex flex-col items-start gap-2 lg:absolute lg:left-1/2 lg:top-[70.5vh] lg:mx-0 lg:mt-0 lg:-translate-y-1/2 lg:translate-x-[340.5px] lg:items-center lg:gap-5"
          >
            <a
              href={`mailto:${email}`}
              className="font-sans text-sm font-normal text-pb-white/80 transition hover:text-pb-accent lg:text-center"
            >
              {email}
            </a>
            <div className="flex items-center gap-3">
              <SocialLink
                href="https://www.instagram.com/betheuilpatrick/"
                label="Instagram"
                icon="/images/social/InstagramLogo.png"
                external
              />
              <SocialLink
                href="https://www.facebook.com/betheuil.patrick"
                label="Facebook"
                icon="/images/social/FacebookLogo.png"
                external
              />
              <SocialLink
                href="#contact"
                label="WhatsApp"
                icon="/images/social/WhatsappLogo.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuLinkLabel({ label }: { label: string }) {
  const letters = Array.from(label);

  return (
    <span className="relative -mx-[0.45em] -my-[0.16em] block overflow-hidden px-[0.45em] py-[0.16em]">
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="block text-right uppercase">
        {letters.map((letter, index) => (
          <span
            key={`base-${label}-${index}`}
            className="inline-block transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] lg:group-hover:-translate-y-[145%] lg:group-hover:opacity-0"
            style={{ transitionDelay: `${index * 28}ms` }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
      <span
        aria-hidden="true"
        className="absolute right-[0.45em] top-[0.16em] block text-right font-title normal-case"
      >
        {letters.map((letter, index) => (
          <span
            key={`roll-${label}-${index}`}
            className="inline-block translate-y-[145%] opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
            style={{ transitionDelay: `${index * 28}ms` }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </span>
    </span>
  );
}

function SocialLink({
  href,
  label,
  icon,
  reveal = false,
  external = false,
}: {
  href: string;
  label: string;
  icon: string;
  reveal?: boolean;
  external?: boolean;
}) {
  return (
    <Link
      data-menu-footer={reveal ? true : undefined}
      href={href}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-pb-accent transition hover:bg-pb-white"
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <Image src={icon} alt="" width={17} height={17} />
    </Link>
  );
}
