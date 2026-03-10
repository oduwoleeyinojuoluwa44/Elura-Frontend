import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "surface-transition rounded-[26px] border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.16)] backdrop-blur-[28px]",
        className,
      )}
      {...props}
    />
  );
}
