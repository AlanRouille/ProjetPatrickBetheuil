import { Header } from "@/components/layout/Header";
import type { ReactNode } from "react";

interface CheckoutStatusLayoutProps {
  eyebrow: string;
  title: string;
  accentTitle: string;
  description: ReactNode;
  reference?: string | null;
  children: ReactNode;
}

export function CheckoutStatusLayout({
  eyebrow,
  title,
  accentTitle,
  description,
  reference,
  children,
}: CheckoutStatusLayoutProps) {
  return (
    <main
      data-header-theme="light"
      className="relative min-h-[100dvh] overflow-hidden bg-pb-black text-pb-white"
    >
      <Header />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full border border-pb-white/[0.035] sm:-right-36 sm:h-[42rem] sm:w-[42rem] lg:-right-52 lg:h-[64rem] lg:w-[64rem]"
      />

      <section className="mx-auto flex min-h-[100dvh] w-full max-w-[1680px] items-center px-6 pb-16 pt-28 sm:px-10 md:px-16 md:pb-20 md:pt-36 lg:px-20 xl:px-24">
        <div className="grid w-full items-end gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)] lg:gap-20 xl:gap-28">
          <div className="min-w-0">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.34em] text-pb-accent sm:text-sm">
              {eyebrow}
            </p>

            <h1 className="mt-7">
              <span className="block max-w-[13ch] font-sans text-[clamp(2.45rem,10vw,4.3rem)] font-medium uppercase leading-[0.88] tracking-[-0.045em] lg:max-w-none lg:text-[clamp(4.5rem,6.8vw,7.8rem)]">
                {title}
              </span>
              <span className="ml-[12%] mt-4 block max-w-[12ch] font-title text-[clamp(3rem,12vw,5.4rem)] font-light leading-[0.86] tracking-[-0.04em] text-pb-white/95 sm:ml-[18%] lg:ml-[22%] lg:mt-7 lg:text-[clamp(5rem,7.5vw,8.8rem)]">
                {accentTitle}
              </span>
            </h1>

            <span
              aria-hidden="true"
              className="mt-10 block h-px w-28 bg-pb-accent sm:w-40 lg:mt-14 lg:w-56"
            />
          </div>

          <div className="relative border-l border-pb-white/20 pl-6 sm:pl-8 lg:mb-2 lg:pl-10">
            <div className="max-w-lg font-sans text-sm font-normal leading-7 text-pb-white/70 sm:text-base sm:leading-8">
              {description}
            </div>

            {reference ? (
              <p className="mt-5 font-sans text-xs uppercase tracking-[0.22em] text-pb-white/45 sm:text-sm">
                Commande {reference}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center lg:mt-10 lg:flex-col lg:items-start xl:flex-row xl:items-center">
              {children}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
