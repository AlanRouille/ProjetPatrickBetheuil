"use client";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/betheuilpatrick/",
    icon: "/images/social/InstagramLogo.png",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/betheuil.patrick",
    icon: "/images/social/FacebookLogo.png",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/?text=Bonjour%20Patrick%20B%C3%A9theuil",
    icon: "/images/social/WhatsappLogo.png",
  },
];

type FormStatus = "idle" | "sending" | "sent" | "error";

const focusableElementsSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function ContactOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const closeOverlay = useCallback(() => {
    if (window.location.hash === "#contact") {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`
      );
    }

    setOpen(false);
  }, []);

  useEffect(() => {
    const syncWithHash = () => setOpen(window.location.hash === "#contact");
    const openFromContactLink = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const contactLink = target.closest<HTMLAnchorElement>(
        'a[href="#contact"], a[href="/#contact"]'
      );

      if (!contactLink) return;

      event.preventDefault();
      openerRef.current = contactLink;
      setFormStatus("idle");
      setOpen(true);
    };

    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    window.addEventListener("popstate", syncWithHash);
    document.addEventListener("click", openFromContactLink, true);

    return () => {
      window.removeEventListener("hashchange", syncWithHash);
      window.removeEventListener("popstate", syncWithHash);
      document.removeEventListener("click", openFromContactLink, true);
    };
  }, []);

  useEffect(() => {
    if (open) setShouldRender(true);
  }, [open]);

  useEffect(() => {
    if (!shouldRender) return;

    const overlay = overlayRef.current;
    const modal = modalRef.current;
    if (!overlay || !modal) return;

    const leftPanel = modal.querySelector("[data-contact-left]");
    const rightPanel = modal.querySelector("[data-contact-right]");
    const title = modal.querySelector("[data-contact-title]");
    const formItems = modal.querySelectorAll("[data-contact-form-item]");
    const submitButton = modal.querySelector("[data-contact-submit]");
    const contactInfo = modal.querySelector("[data-contact-info]");
    const closeButton = modal.querySelector("[data-contact-close]");
    const crossLines = modal.querySelectorAll("[data-contact-cross]");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const mobileMotion = window.matchMedia("(max-width: 1023px)").matches;

    timelineRef.current?.kill();
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set([leftPanel, rightPanel], { autoAlpha: 1 });

    if (reducedMotion) {
      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set([leftPanel, rightPanel], { xPercent: 0, yPercent: 0 });
      gsap.set([title, formItems, submitButton, contactInfo], {
        autoAlpha: 1,
        y: 0,
      });
      gsap.set(closeButton, { autoAlpha: 1, scale: 1 });
      gsap.set(crossLines, { scaleX: 1 });
      timelineRef.current = null;
      return;
    }

    if (mobileMotion) {
      gsap.set([leftPanel, rightPanel], { xPercent: 100, yPercent: 0 });
    } else {
      gsap.set(leftPanel, { xPercent: 0, yPercent: 100 });
      gsap.set(rightPanel, { xPercent: 0, yPercent: -100 });
    }
    gsap.set([title, formItems, submitButton, contactInfo], {
      autoAlpha: 0,
      y: 24,
    });
    gsap.set(closeButton, {
      autoAlpha: 0,
      scale: 0,
      transformOrigin: "center center",
    });
    gsap.set(crossLines, {
      scaleX: 0,
      transformOrigin: "center center",
    });

    const timeline = gsap.timeline({
      paused: true,
      defaults: { overwrite: "auto" },
      onComplete: () => closeButtonRef.current?.focus(),
      onReverseComplete: () => setShouldRender(false),
    });

    timeline
      .to(overlay, {
        autoAlpha: 1,
        duration: 0.2,
        ease: "power2.out",
      })
      .to(
        [leftPanel, rightPanel],
        {
          xPercent: 0,
          yPercent: 0,
          duration: 1.35,
          ease: "power4.inOut",
        },
        0
      )
      .to(
        closeButton,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.38,
          ease: "power4.out",
        },
        1.48
      )
      .to(
        crossLines,
        {
          scaleX: 1,
          duration: 0.28,
          stagger: 0.04,
          ease: "power4.out",
        },
        1.52
      )
      .to(
        title,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        },
        0.62
      )
      .to(
        formItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          stagger: 0.055,
          ease: "power3.out",
        },
        0.72
      )
      .to(
        submitButton,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.32,
          ease: "power3.out",
        },
        1.02
      )
      .to(
        contactInfo,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.32,
          ease: "power3.out",
        },
        1.1
      );

    timelineRef.current = timeline;

    return () => {
      timeline.kill();
    };
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;

    if (open) {
      timelineRef.current?.timeScale(1).play();
      return;
    }

    if (timelineRef.current) {
      timelineRef.current.timeScale(0.9).reverse();
      return;
    }

    setShouldRender(false);
  }, [open, shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;

    const overlay = overlayRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeOverlay();
        return;
      }

      if (event.key !== "Tab" || !overlay) return;

      const focusableElements = Array.from(
        overlay.querySelectorAll<HTMLElement>(focusableElementsSelector)
      ).filter((element) => element.getClientRects().length > 0);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        event.preventDefault();
        return;
      }

      if (
        event.shiftKey &&
        (document.activeElement === firstElement ||
          !overlay.contains(document.activeElement))
      ) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (
        !event.shiftKey &&
        (document.activeElement === lastElement ||
          !overlay.contains(document.activeElement))
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      const fallbackMenuButton = document.querySelector<HTMLElement>(
        'button[aria-label="Ouvrir le menu"]'
      );
      const focusTarget = openerRef.current?.isConnected
        ? openerRef.current
        : previouslyFocused?.isConnected
          ? previouslyFocused
          : fallbackMenuButton;
      focusTarget?.focus();
      openerRef.current = null;
    };
  }, [closeOverlay, shouldRender]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sending");

    const [firstName, ...lastNameParts] = name.trim().split(/\s+/);
    const lastName = lastNameParts.join(" ") || "—";

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, message }),
      });

      if (!response.ok) throw new Error("L’envoi du message a échoué.");

      setName("");
      setEmail("");
      setMessage("");
      setFormStatus("sent");
    } catch (error) {
      console.error("Erreur lors de l’envoi du formulaire :", error);
      setFormStatus("error");
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-overlay-title"
      onClick={closeOverlay}
      className="fixed inset-0 z-[140] invisible flex items-center justify-center overflow-hidden bg-pb-black/45 p-[3vh_2.5vw] text-pb-white"
    >
      <div
        ref={modalRef}
        onClick={(event) => event.stopPropagation()}
        className="relative h-[94dvh] w-[95vw] overflow-hidden bg-transparent"
      >
        <button
          ref={closeButtonRef}
          data-contact-close
          type="button"
          onClick={closeOverlay}
          aria-label="Fermer le formulaire de contact"
          className="group absolute right-4 top-4 z-50 flex h-9 w-9 items-center justify-center text-pb-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent sm:right-7 sm:top-7 lg:h-14 lg:w-14"
        >
          <span
            className="relative flex h-full w-full items-center justify-center rounded-full bg-pb-white transition-[background-color,transform] duration-300 ease-out group-hover:scale-110 group-hover:bg-pb-accent group-active:scale-95"
          >
            <span
              data-contact-cross
              className="absolute h-px w-6 rotate-45 bg-pb-black lg:w-8"
            />
            <span
              data-contact-cross
              className="absolute h-px w-6 -rotate-45 bg-pb-black lg:w-8"
            />
          </span>
        </button>

        <div className="grid h-full overflow-y-auto lg:grid-cols-2 lg:overflow-hidden">
          <section
            data-contact-left
            className="flex items-start bg-[#0C0C0B] px-5 pb-20 pt-12 sm:min-h-[94dvh] sm:items-center sm:px-10 sm:py-24 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:px-[5vw] lg:py-16"
          >
            <div className="mx-auto w-full max-w-xl">
              <h2
                id="contact-overlay-title"
                data-contact-title
                className="mb-7 text-center leading-none sm:mb-12 sm:text-left"
              >
                <span className="block font-sans text-[2.55rem] font-light uppercase tracking-[-0.05em] sm:text-[clamp(2.9rem,5vw,5.5rem)]">
                  Entrée
                </span>
                <span className="block font-title text-[2.45rem] leading-[0.82] text-pb-accent sm:ml-[18%] sm:text-[clamp(2.7rem,4.7vw,5.2rem)] sm:leading-[0.78]">
                  en contact
                </span>
              </h2>

              <p
                data-contact-form-item
                className="mb-7 max-w-lg font-sans text-sm leading-relaxed text-pb-white/75 sm:mb-9 sm:text-base"
              >
                Une œuvre vous attire, vous imaginez un tableau contemporain dans
                votre intérieur ou vous souhaitez échanger autour d’une
                acquisition ? Écrivez-moi, je vous répondrai personnellement.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div data-contact-form-item>
                    <label className="sr-only" htmlFor="contact-name">
                      Votre nom
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Votre nom"
                      autoComplete="name"
                      required
                      className="h-14 w-full border border-pb-white/70 bg-transparent px-4 font-sans text-base text-pb-white outline-none transition-colors placeholder:text-pb-white/70 focus:border-pb-accent focus-visible:ring-1 focus-visible:ring-pb-accent"
                    />
                  </div>

                  <div data-contact-form-item>
                    <label className="sr-only" htmlFor="contact-email">
                      Votre adresse e-mail
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Votre adresse e-mail"
                      autoComplete="email"
                      required
                      className="h-14 w-full border border-pb-white/70 bg-transparent px-4 font-sans text-base text-pb-white outline-none transition-colors placeholder:text-pb-white/70 focus:border-pb-accent focus-visible:ring-1 focus-visible:ring-pb-accent"
                    />
                  </div>
                </div>

                <div data-contact-form-item>
                  <label className="sr-only" htmlFor="contact-message">
                    Votre message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                      placeholder="Dites-moi ce qui vous attire dans une œuvre ou votre projet…"
                    required
                    rows={7}
                    className="h-[180px] w-full resize-none border border-pb-white/70 bg-transparent p-4 font-sans text-base text-pb-white outline-none transition-colors placeholder:text-pb-white/70 focus:border-pb-accent focus-visible:ring-1 focus-visible:ring-pb-accent sm:h-auto"
                  />
                </div>

                <label
                  data-contact-form-item
                  className="flex min-h-11 cursor-pointer items-center gap-3 font-sans text-sm text-pb-white/90"
                >
                  <input
                    type="checkbox"
                    required
                    className="h-5 w-5 shrink-0 appearance-none rounded-full border border-pb-white/70 checked:border-pb-accent checked:bg-pb-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-pb-accent"
                  />
                  <span>
                    J’accepte la{` `}
                    <Link
                      href="/politique-confidentialite"
                      className="underline underline-offset-2 transition-colors hover:text-pb-white"
                    >
                      politique de confidentialité
                    </Link>
                    .*
                  </span>
                </label>

                <button
                  data-contact-submit
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="group relative isolate min-h-14 w-full overflow-hidden rounded-full border border-pb-white/70 px-7 py-3 font-sans text-sm font-normal uppercase tracking-[0.04em] text-pb-white transition-[border-color,color,transform,box-shadow] duration-700 ease-[cubic-bezier(0.9,0.1,0.1,0.9)] hover:scale-[1.025] hover:border-pb-accent hover:text-pb-black hover:shadow-[0_14px_30px_rgba(0,0,0,0.38)] active:scale-100 active:shadow-none focus-visible:border-pb-accent focus-visible:text-pb-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent disabled:cursor-wait disabled:opacity-50 disabled:hover:scale-100 disabled:hover:border-pb-white/70 disabled:hover:text-pb-white disabled:hover:shadow-none sm:min-h-12 sm:w-auto sm:min-w-[240px] sm:text-xs"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 scale-0 rounded-full bg-pb-accent transition-transform duration-700 ease-[cubic-bezier(0.9,0.1,0.1,0.9)] group-hover:scale-100 group-focus-visible:scale-100 group-disabled:scale-0"
                  />
                  <span className="relative z-10">
                    {formStatus === "sending" ? "Envoi…" : "Envoyer un message"}
                  </span>
                </button>

                <p
                  className={`min-h-6 font-sans text-sm ${
                    formStatus === "error" ? "text-red-300" : "text-pb-accent"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {formStatus === "sent"
                    ? "Merci, votre message a bien été envoyé."
                    : formStatus === "error"
                      ? "Le message n’a pas pu être envoyé. Veuillez réessayer."
                      : ""}
                </p>
              </form>
            </div>
          </section>

          <section
            data-contact-right
            className="relative min-h-[46dvh] overflow-hidden sm:min-h-[72dvh] lg:h-full lg:min-h-0"
          >
            <Image
              src="https://res.cloudinary.com/dugwzjef9/image/upload/v1779569787/La-legerete_xgn2uq.jpg"
              alt="La Légèreté, peinture intuitive originale de Patrick Betheuil"
              fill
              loading="eager"
              sizes="(max-width: 1023px) 95vw, 47.5vw"
              className="object-cover"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-pb-white/45 via-pb-white/10 to-transparent"
              aria-hidden="true"
            />

            <div
              data-contact-info
              className="absolute inset-x-0 bottom-6 z-10 mx-auto flex flex-col items-center gap-4 px-5 text-center sm:bottom-10 sm:gap-5 sm:px-6 lg:left-auto lg:right-10 lg:mx-0 lg:w-auto lg:items-end lg:px-0 lg:text-right"
            >
              <div className="flex items-center gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-pb-black transition-[background-color,transform] duration-300 ease-out hover:scale-110 hover:bg-pb-accent active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pb-black lg:h-14 lg:w-14"
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain brightness-0 invert lg:h-7 lg:w-7"
                    />
                  </a>
                ))}
              </div>
              <p className="font-sans text-sm font-medium leading-relaxed text-pb-black lg:text-base">
                Vous pouvez également me contacter à
                <br />
                <a
                  href="mailto:pbetheuil.art@gmail.com"
                  className="font-semibold underline decoration-2 underline-offset-4 transition-colors hover:text-pb-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pb-black"
                >
                  pbetheuil.art@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
