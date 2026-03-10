import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(135deg,#efbcc6,#dca0ac)] text-[var(--bg-color)] shadow-[0_12px_32px_rgba(232,174,183,0.14)] hover:brightness-[1.03] hover:shadow-[0_18px_40px_rgba(232,174,183,0.18)]",
  secondary:
    "border border-[rgba(232,174,183,0.18)] bg-[rgba(232,174,183,0.1)] text-white hover:bg-[rgba(232,174,183,0.14)] hover:shadow-[0_14px_28px_rgba(232,174,183,0.08)]",
  ghost:
    "border border-transparent bg-transparent text-[var(--text-muted)] hover:bg-white/[0.04] hover:text-white",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.92rem]",
  md: "h-10 px-5 text-[0.93rem]",
  lg: "h-11 px-6 text-[0.94rem]",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "surface-transition inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] hover:-translate-y-px active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-color)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:active:scale-100",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
