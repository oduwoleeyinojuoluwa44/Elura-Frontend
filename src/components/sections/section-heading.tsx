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
          <p className="eyebrow-chip w-max">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="max-w-[780px] font-display text-[2.5rem] leading-[0.96] tracking-[-0.05em] text-white md:text-[4rem]">
          {title}
        </h2>
        {description ? (
          <p className="max-w-[600px] text-[1rem] leading-8 text-[var(--text-muted)] md:text-[1.08rem]">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
