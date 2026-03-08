import type { SelectHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-[var(--accent-color)] focus:bg-white/8 focus:ring-2 focus:ring-[var(--glow-color)]",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

