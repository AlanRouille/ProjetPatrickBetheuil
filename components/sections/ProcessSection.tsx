"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

const steps = [
  {
    title: ["Entre", "matière"],
    accent: "et émotion",
  },
  {
    title: ["Au-delà"],
    accent: "du regard",
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const items = section.querySelectorAll("[data-process-step]");
    const progressBars = section.querySelectorAll("[data-process-progress]");
    const background = section.querySelector("[data-process-background]");
    const transitionCurtains = section.querySelectorAll(
      "[data-process-transition-curtain]"
    );
    const lines = section.querySelectorAll("[data-process-line]");
    const selection = section.querySelector("[data-process-selection]");
    const selectionLines = section.querySelectorAll(
      "[data-process-selection-line]"
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      gsap.set(items, { autoAlpha: 0 });
      gsap.set(selection, { autoAlpha: 1 });
      gsap.set(selectionLines, {
        autoAlpha: 1,
        y: 0,
      });
      gsap.set(transitionCurtains, { autoAlpha: 0, scaleX: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(items, { autoAlpha: 0 });
      gsap.set(lines, { autoAlpha: 0, y: 88 });
      if (selection) gsap.set(selection, { autoAlpha: 0 });
      gsap.set(selectionLines, {
        autoAlpha: 0,
        y: 16,
      });
      gsap.set(progressBars, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(transitionCurtains, {
        autoAlpha: 1,
        scaleX: 0,
        xPercent: 0,
        transformOrigin: "left center",
      });

      const firstItem = items[0];
      const firstItemLines = firstItem?.querySelectorAll(
        "[data-process-line]"
      );

      if (firstItem && firstItemLines) {
        gsap.set(firstItem, { autoAlpha: 1 });
        gsap.to(firstItemLines, {
          autoAlpha: 1,
          y: 0,
          ease: "none",
          stagger: 0.07,
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 20%",
            scrub: 0.9,
          },
        });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.1}`,
          scrub: 1.35,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(progressBars[0], { scaleY: 1, ease: "none", duration: 0.5 }, 0)
        .to(progressBars[1], { scaleY: 1, ease: "none", duration: 0.5 }, 0.5)
        .to(
          background,
          {
            scale: 1.06,
            yPercent: -2,
            ease: "none",
            duration: 1.15,
          },
          0
        );

      steps.forEach((_, index) => {
        const item = items[index];
        const itemLines = item.querySelectorAll("[data-process-line]");
        const start = 0.48;

        if (index > 0) {
          timeline
            .set(item, { autoAlpha: 1 }, start)
            .to(
              itemLines,
              {
                autoAlpha: 1,
                y: 0,
                ease: "power4.out",
                duration: 0.42,
                stagger: 0.065,
              },
              start + 0.02
            );
        }

        if (index < steps.length - 1) {
          timeline
            .to(
              itemLines,
              {
                autoAlpha: 0,
                y: -58,
                ease: "power3.inOut",
                duration: 0.3,
                stagger: {
                  each: 0.045,
                  from: "start",
                },
              },
              0.4
            )
            .set(item, { autoAlpha: 0 }, 0.66);
        }
      });

      if (selection) {
        timeline
          .to(
            lines,
            {
              autoAlpha: 0,
              y: -42,
              ease: "power3.inOut",
              duration: 0.3,
              stagger: {
                each: 0.035,
                from: "start",
              },
            },
            0.88
          )
          .to(
            transitionCurtains,
            {
              scaleX: 1,
              ease: "power4.inOut",
              duration: 0.9,
              stagger: {
                each: 0.024,
                from: "start",
              },
            },
            1
          )
          .to(
            selection,
            {
              autoAlpha: 1,
              duration: 0.22,
              ease: "power1.out",
            },
            2.22
          )
          .to(
            selectionLines,
            {
              autoAlpha: 1,
              y: 0,
              ease: "power3.out",
              duration: 0.62,
              stagger: 0.1,
            },
            1.74
          )
          .to(
            transitionCurtains,
            {
              autoAlpha: 0,
              duration: 0.46,
              ease: "power2.out",
              stagger: {
                each: 0.004,
                from: "start",
              },
            },
            2.4
          )
          .to(
            selection,
            {
              autoAlpha: 1,
              duration: 0.42,
              ease: "none",
            },
            2.72
          );
      }
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[310vh] bg-pb-black">
      <div className="sticky top-0 h-screen overflow-hidden bg-pb-black text-pb-white">
        <div className="absolute inset-0">
          <Image
            data-process-background
            src="/images/slider-about.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-100"
          />
        </div>
        <div className="absolute inset-0 bg-pb-black/18" />

        <div className="absolute left-[10vw] top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-7 md:flex">
          {steps.map((step) => (
            <div key={step.accent} className="relative h-24 w-px bg-pb-white/55">
              <div
                data-process-progress
                className="absolute left-0 top-0 h-full w-px bg-pb-accent"
              />
            </div>
          ))}
        </div>

        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <div className="relative h-[42vh] w-full max-w-[980px]">
            {steps.map((step) => (
              <div
                key={`${step.title[0]}-${step.accent}`}
                data-process-step
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <p
                  data-process-line
                  className="font-sans text-[clamp(3.4rem,8vw,8.7rem)] font-medium uppercase leading-[0.9]"
                >
                  {step.title[0]}
                  {step.title[1] ? (
                    <span className="block md:ml-[24vw]">{step.title[1]}</span>
                  ) : null}
                </p>
                <p
                  data-process-line
                  className={`mt-4 whitespace-nowrap font-title text-[clamp(3rem,6vw,7.2rem)] font-normal italic leading-none text-pb-accent ${
                    step.accent === "du regard" ? "md:ml-[28vw]" : ""
                  }`}
                >
                  {step.accent}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          data-process-selection
          data-header-theme="dark"
          className="absolute inset-0 z-20 bg-pb-white"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-[46] flex h-[60vh] items-center justify-center px-6 text-center text-pb-black">
          <div className="will-change-transform">
            <p
              data-process-selection-line
              className="font-title text-[clamp(3.5rem,7.5vw,8.2rem)] font-normal italic leading-[0.76] text-pb-black"
            >
              Sélection
            </p>
            <p
              data-process-selection-line
              className="ml-[8vw] font-sans text-[clamp(3.7rem,7.8vw,8.8rem)] font-medium uppercase leading-[0.84] tracking-[-0.025em] text-pb-accent md:ml-[11vw]"
            >
              ŒUVRES
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-[45] flex overflow-hidden">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              data-process-transition-curtain
              className="-ml-px block h-full flex-1 scale-x-0 bg-pb-white first:ml-0 will-change-transform"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
