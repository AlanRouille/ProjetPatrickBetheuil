import { cn } from "@/lib/utils";
import Link from "next/link";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

interface DesignButtonProps
  extends PropsWithChildren,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "primary" | "ghost" | "circle";
}

export function DesignButton({
  children,
  className,
  href,
  variant = "primary",
  ...props
}: DesignButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center font-sans text-xs font-medium uppercase tracking-[0.22em] transition-[background-color,border-color,color,transform,box-shadow] duration-500 ease-out hover:scale-[1.03] hover:shadow-[0_14px_30px_rgba(0,0,0,0.32)] active:scale-100 active:shadow-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-pb-accent",
        variant === "primary" &&
          "border border-pb-accent bg-pb-accent px-7 py-4 text-pb-black hover:bg-transparent hover:text-pb-accent",
        variant === "ghost" &&
          "border border-pb-white/30 px-7 py-4 text-pb-white hover:border-pb-accent hover:text-pb-accent",
        variant === "circle" &&
          "h-28 w-28 rounded-full border border-pb-accent text-pb-white hover:bg-pb-accent hover:text-pb-black md:h-36 md:w-36",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
