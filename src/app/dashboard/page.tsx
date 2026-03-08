import Link from "next/link";
import { ArrowRight, Compass, Images } from "lucide-react";

import { BackendHealthPanel } from "@/components/dashboard/backend-health-panel";
import { DashboardSessionPanel } from "@/components/dashboard/dashboard-session-panel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const dashboardPanels = [
  {
    title: "Public profile flow",
    body: "The live path today is straightforward: sign in, save or publish through `POST /api/artists`, then verify the result on the public artist route.",
  },
  {
    title: "Portfolio uploads",
    body: "The portfolio route is still reserved, so the dashboard keeps this as a visible placeholder instead of pretending uploads already work.",
  },
  {
    title: "Booking requests",
    body: "Client request intake remains reserved too. The current MVP stops at discovery and the public artist profile.",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-16 md:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="eyebrow-chip w-max">Artist dashboard</p>
          <h1 className="font-display text-5xl text-white">
            A clean control center for the endpoints that are actually live.
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
            This dashboard is anchored to session truth, backend health, and the
            published profile flow instead of reserved features.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/onboarding">
            <Button icon={<ArrowRight size={16} />}>Edit public profile</Button>
          </Link>
          <Link href="/discover">
            <Button variant="secondary" icon={<Compass size={16} />}>
              Open discovery
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <DashboardSessionPanel />
        <BackendHealthPanel />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <Images className="text-[var(--accent-color)]" />
            <div>
              <p className="text-sm font-semibold text-white">Reserved feature staging area</p>
              <p className="text-sm text-[var(--text-muted)]">
                The dashboard still keeps room for future routes without pretending
                those routes already exist.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="aspect-square rounded-[24px] border border-dashed border-white/12 bg-white/[0.025]"
              />
            ))}
          </div>
          <div className="flex items-center justify-between rounded-[24px] border border-white/10 bg-black/20 px-5 py-4">
            <p className="text-sm text-[var(--text-muted)]">
              Portfolio uploads and booking requests stay visibly parked here until the
              backend moves them out of reserved status.
            </p>
            <Button variant="secondary" disabled>
              Reserved
            </Button>
          </div>
        </Card>

        <div className="grid gap-5">
          {dashboardPanels.map((panel) => (
            <Card key={panel.title} className="space-y-3">
              <p className="text-sm font-semibold text-white">{panel.title}</p>
              <p className="text-sm leading-7 text-[var(--text-muted)]">{panel.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
