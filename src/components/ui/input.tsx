import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[var(--accent-color)] focus:bg-white/8 focus:ring-2 focus:ring-[var(--glow-color)]",
        className,
      )}
      {...props}
    />
  );
}

