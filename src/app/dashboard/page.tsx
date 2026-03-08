import Link from "next/link";
import { ArrowUpRight, Images, WandSparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const dashboardPanels = [
  {
    title: "Profile completion",
    body: "Keep location, specialty, pricing, and profile image filled so the public page can be published with confidence.",
  },
  {
    title: "Portfolio uploads",
    body: "The API route is documented but still reserved. The UI surface is scaffolded now so the upload flow can drop in cleanly.",
  },
  {
    title: "Booking preview",
    body: "Booking request rendering should be ready for the endpoint once backend success behavior moves from reserved to implemented.",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-16 md:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="eyebrow-chip w-max">Artist dashboard</p>
          <h1 className="font-display text-5xl text-white">
            A lightweight control center, not a bloated back office.
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
            The MVP dashboard keeps the focus on profile readiness, portfolio
            momentum, and one practical AI workflow.
          </p>
        </div>
        <Link href="/dashboard/ai-consultation">
          <Button icon={<WandSparkles size={16} />}>Open AI consultation</Button>
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <Images className="text-[var(--accent-color)]" />
            <div>
              <p className="text-sm font-semibold text-white">Portfolio upload foundation</p>
              <p className="text-sm text-[var(--text-muted)]">
                UI surface prepared for the reserved `/api/portfolio` route.
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
              Upload flow should compress images, preserve ordering, and map to
              `storagePath` plus `imageUrl`.
            </p>
            <Button variant="secondary">Upload UI soon</Button>
          </div>
        </Card>

        <div className="grid gap-5">
          {dashboardPanels.map((panel) => (
            <Card key={panel.title} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{panel.title}</p>
                <ArrowUpRight size={16} className="text-[var(--accent-color)]" />
              </div>
              <p className="text-sm leading-7 text-[var(--text-muted)]">
                {panel.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

