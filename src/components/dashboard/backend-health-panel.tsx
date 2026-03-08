"use client";

import { Activity, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { getHealth } from "@/lib/api/health";
import { Card } from "@/components/ui/card";
import { StatusNotice } from "@/components/ui/status-notice";
import type { HealthResponse } from "~types/api";

export function BackendHealthPanel() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [resolved, setResolved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadHealth() {
      try {
        const response = await getHealth();
        if (!active) {
          return;
        }

        setHealth(response);
        setResolved(true);
      } catch {
        if (!active) {
          return;
        }

        setError("The backend health endpoint is not responding from this frontend.");
        setResolved(true);
      }
    }

    void loadHealth();

    return () => {
      active = false;
    };
  }, []);

  return (
    <Card className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(232,174,183,0.16)] text-[var(--accent-color)]">
          <Activity size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Backend status</p>
          <p className="text-sm text-[var(--text-muted)]">GET /api/health</p>
        </div>
      </div>

      {!resolved ? (
        <div className="flex items-center gap-3 rounded-[24px] border border-white/10 bg-black/20 p-5 text-sm text-[var(--text-muted)]">
          <LoaderCircle className="animate-spin" size={16} />
          Checking backend availability
        </div>
      ) : health ? (
        <StatusNotice
          tone="success"
          title="Backend reachable"
          description={`Service "${health.service}" reports status "${health.status}".`}
        />
      ) : (
        <StatusNotice tone="error" title="Backend unavailable" description={error ?? undefined} />
      )}

      <p className="text-sm leading-7 text-[var(--text-muted)]">
        This route is separate from the standard success envelope, so the UI reads it
        directly and keeps it isolated from the auth and artist API clients.
      </p>
    </Card>
  );
}
