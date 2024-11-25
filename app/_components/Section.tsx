import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const Section = (props: PropsWithChildren<{ className?: string }>) => {
  return (
    <section className={cn("max-w-screen-7xl px-5", props.className)}>
      {props.children}
    </section>
  );
};
