import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/betheuilpatrick/",
    icon: "/images/social/InstagramLogo.png",
    external: true,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/betheuil.patrick",
    icon: "/images/social/FacebookLogo.png",
    external: true,
  },
  {
    label: "WhatsApp",
    href: "#contact",
    icon: "/images/social/WhatsappLogo.png",
    external: false,
  },
];

const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  {
    label: "Politique de confidentialité",
    href: "/politique-confidentialite",
  },
  { label: "CGV", href: "/cgv" },
];

export function Footer() {
  return (
    <footer
      data-header-theme="light"
      className="relative min-h-[100dvh] overflow-hidden bg-pb-black text-pb-white"
    >
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[1680px] flex-col px-7 pb-7 pt-10 sm:px-10 md:pb-10 md:pt-24 lg:px-16 xl:px-20">
        <div className="flex flex-1 translate-y-14 flex-col justify-center py-12 lg:translate-x-[4vw] lg:translate-y-0 lg:py-8 xl:translate-x-[1.5vw] 2xl:translate-x-0">
          <p className="text-left font-sans text-[clamp(2.25rem,10vw,3.1rem)] font-medium uppercase leading-[0.88] tracking-[-0.04em] lg:ml-[6vw] lg:text-[clamp(3.4rem,7.8vw,8.75rem)] lg:leading-[0.84] lg:tracking-[-0.045em] xl:ml-[8vw] 2xl:ml-[9vw]">
            Poursuivez
          </p>

          <div className="mt-2 grid items-center gap-0 lg:mt-12 lg:translate-x-[1vw] lg:grid-cols-[minmax(17rem,0.42fr)_minmax(0,1fr)] lg:gap-10 xl:translate-x-[4vw] 2xl:translate-x-[5vw]">
            <Link
              href="#contact"
              className="group relative isolate order-2 ml-[4%] mt-7 flex h-[68px] w-full max-w-[16rem] items-center justify-center justify-self-start rounded-full border border-pb-accent px-5 text-center font-sans text-[15px] font-normal uppercase tracking-[0.01em] text-pb-white transition-[color,transform,box-shadow] duration-700 ease-[cubic-bezier(0.9,0.1,0.1,0.9)] hover:scale-[1.025] hover:text-pb-black hover:shadow-[0_14px_30px_rgba(0,0,0,0.38)] active:scale-100 active:shadow-none focus-visible:text-pb-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent sm:mt-9 sm:h-[76px] sm:max-w-[18rem] lg:order-1 lg:ml-0 lg:mt-0 lg:h-60 lg:w-60 lg:max-w-none lg:justify-self-center lg:border-0 lg:px-5 lg:text-[13px] lg:font-medium lg:tracking-normal xl:h-72 xl:w-72"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 scale-0 rounded-full bg-pb-accent transition-transform duration-700 ease-[cubic-bezier(0.9,0.1,0.1,0.9)] group-hover:delay-100 group-hover:scale-100 group-focus-visible:delay-100 group-focus-visible:scale-100"
              />
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="pointer-events-none absolute inset-0 hidden h-full w-full -rotate-90 overflow-visible lg:block"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="49"
                  strokeDasharray="308 308"
                  strokeDashoffset="0"
                  strokeWidth="0.6"
                  fill="none"
                  className="stroke-pb-accent transition-[stroke-dashoffset] delay-100 duration-700 ease-[cubic-bezier(0.9,0.1,0.1,0.9)] group-hover:[stroke-dashoffset:308] group-focus-visible:[stroke-dashoffset:308]"
                />
              </svg>
              <span className="relative z-10">Entrer en contact</span>
            </Link>

            <div className="order-1 min-w-0 text-left lg:order-2 lg:-translate-x-[1vw] lg:pt-1">
              <p className="ml-[32%] whitespace-nowrap font-title text-[clamp(2.55rem,11vw,3.6rem)] font-light leading-[0.8] tracking-[-0.03em] text-pb-white/90 lg:ml-0 lg:text-[clamp(4rem,7.4vw,8.4rem)] lg:leading-[0.76] lg:tracking-[-0.035em]">
                le voyage
              </p>
              <p className="ml-[24%] mt-3 font-sans text-[clamp(2.2rem,9.4vw,3rem)] font-medium uppercase leading-[0.9] tracking-[-0.04em] lg:ml-0 lg:mt-12 lg:text-[clamp(2.6rem,5.55vw,6.35rem)] lg:leading-[0.9] lg:tracking-[-0.045em]">
                À travers<span className="hidden lg:inline"> mes</span>
              </p>
              <p className="ml-auto mr-4 mt-2 w-fit whitespace-nowrap font-sans text-[clamp(2.2rem,9.4vw,3rem)] font-medium uppercase leading-[0.9] tracking-[-0.04em] lg:ml-[clamp(4rem,9vw,9rem)] lg:mr-0 lg:mt-3 lg:w-auto lg:text-[clamp(3rem,5.8vw,6.6rem)] lg:leading-[0.88] lg:tracking-[-0.045em]">
                <span className="lg:hidden">Mes </span>Œuvres
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 pt-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6 lg:pt-6">
          <span className="hidden lg:block" aria-hidden="true" />

          <div className="flex items-center justify-center gap-4">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-pb-accent transition-[background-color,transform,box-shadow] duration-300 hover:scale-110 hover:bg-pb-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.3)] active:scale-100 active:shadow-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent md:h-14 md:w-14"
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="h-5 w-5 object-contain brightness-0 md:h-6 md:w-6"
                />
              </Link>
            ))}
          </div>

          <nav
            aria-label="Navigation légale"
            className="grid w-full grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.45fr)_auto_minmax(0,0.55fr)] items-center border-t border-pb-white/55 pt-7 font-sans text-[13px] font-normal leading-[1.15] text-pb-white/75 sm:text-sm lg:flex lg:w-auto lg:flex-nowrap lg:justify-end lg:whitespace-nowrap lg:border-t-0 lg:pt-0 lg:text-[11px] xl:text-sm"
          >
            {legalLinks.map((item, index) => (
              <span key={item.href} className="contents">
                {index > 0 ? (
                  <span
                    className="mx-2.5 h-9 w-px bg-pb-white/65 sm:mx-4 lg:h-8"
                    aria-hidden="true"
                  />
                ) : null}
                <Link
                  href={item.href}
                  className="relative inline-block justify-self-center text-center after:absolute after:-bottom-1 after:left-0 after:hidden after:h-px after:w-full after:origin-right after:scale-x-100 after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.76,0,0.24,1)] after:content-[''] hover:after:scale-x-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-white focus-visible:after:scale-x-0 lg:after:block"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
