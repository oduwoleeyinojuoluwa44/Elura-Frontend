import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/10 bg-[var(--card-bg)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}

