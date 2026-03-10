import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { DashboardSessionPanel } from "@/components/dashboard/dashboard-session-panel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="app-page space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="app-intro">
          <p className="eyebrow-chip w-max">Artist dashboard</p>
          <h1 className="app-title">
            Your studio, pared back.
          </h1>
          <p className="app-copy">
            Keep the artist side calm. Edit the public page, refine the portfolio, and
            keep one clean destination ready to share.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/onboarding">
            <Button icon={<ArrowRight size={16} />}>Edit profile</Button>
          </Link>
          <Link href="/discover">
            <Button variant="secondary" icon={<Compass size={16} />}>
              Explore discovery
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
        <DashboardSessionPanel />

        <Card className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">Profile studio</p>
            <p className="text-sm leading-7 text-[var(--text-muted)]">
              The essentials stay in one place: profile details, portfolio images, and
              the public page clients actually see.
            </p>
          </div>

          <Link href="/onboarding">
            <Button variant="secondary" icon={<ArrowRight size={16} />}>
              Open profile studio
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
