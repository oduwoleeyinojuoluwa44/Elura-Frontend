import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "surface-transition h-12 w-full rounded-[22px] border border-[var(--border-color)] bg-[rgba(255,255,255,0.035)] px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-[rgba(232,174,183,0.32)] focus:bg-[rgba(255,255,255,0.05)] focus:ring-2 focus:ring-[rgba(232,174,183,0.18)]",
        className,
      )}
      {...props}
    />
  );
}
