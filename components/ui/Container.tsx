import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-12 xl:px-20", className)}>
      {children}
    </div>
  );
}
