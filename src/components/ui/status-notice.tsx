import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type StatusTone = "info" | "success" | "error";

interface StatusNoticeProps {
  title: string;
  description?: string;
  tone?: StatusTone;
  action?: ReactNode;
}

const toneClasses: Record<StatusTone, string> = {
  info: "border-[var(--border-color)] bg-[rgba(255,255,255,0.03)] text-white",
  success:
    "border-[rgba(232,174,183,0.28)] bg-[rgba(232,174,183,0.08)] text-white",
  error: "border-[rgba(245,179,193,0.24)] bg-[rgba(245,179,193,0.06)] text-white",
};

export function StatusNotice({
  title,
  description,
  tone = "info",
  action,
}: StatusNoticeProps) {
  return (
    <div
      className={cn(
        "rounded-[24px] border p-4 shadow-[0_18px_48px_rgba(0,0,0,0.12)] backdrop-blur-[22px]",
        toneClasses[tone],
      )}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-semibold">{title}</p>
          {description ? (
            <p className="text-sm leading-6 text-white/70">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
    </div>
  );
}
