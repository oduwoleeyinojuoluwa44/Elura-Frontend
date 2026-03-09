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
        "h-12 w-full rounded-[22px] border border-[var(--border-color)] bg-[rgba(255,255,255,0.035)] px-4 text-sm text-white outline-none transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus:border-[rgba(232,174,183,0.32)] focus:bg-[rgba(255,255,255,0.05)] focus:ring-2 focus:ring-[rgba(232,174,183,0.18)]",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
