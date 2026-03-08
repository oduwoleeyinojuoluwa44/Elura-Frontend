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
  info: "border-white/10 bg-white/5 text-white",
  success:
    "border-[rgba(232,174,183,0.35)] bg-[rgba(232,174,183,0.1)] text-white",
  error: "border-[rgba(245,179,193,0.32)] bg-[rgba(245,179,193,0.08)] text-white",
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
        "rounded-[22px] border p-4 backdrop-blur-sm",
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

