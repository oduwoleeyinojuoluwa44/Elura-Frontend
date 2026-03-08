import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "mx-auto max-w-3xl text-center md:flex-col",
      )}
    >
      <div className="space-y-3">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-color)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl leading-tight text-white md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-[var(--text-muted)] md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

