import Link from "next/link";
import { ArrowRight, Compass, Images } from "lucide-react";

import { DashboardSessionPanel } from "@/components/dashboard/dashboard-session-panel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const studioNotes = [
  {
    title: "Public profile",
    body: "Keep your page current so clients get a crisp first impression the moment they land on it.",
  },
  {
    title: "Portfolio gallery",
    body: "A fuller image-led gallery is opening soon. For now, your profile carries the tone.",
  },
  {
    title: "Booking requests",
    body: "Structured inquiries are next. The current experience focuses on presence and discovery.",
  },
];

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
            Elura keeps the artist side calm. Update the page, share it with confidence,
            and let the rest of the product open in stages.
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
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(232,174,183,0.16)] text-[var(--accent-color)]">
              <Images size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">What opens next</p>
              <p className="text-sm text-[var(--text-muted)]">
                The next layers of the product are already taking shape.
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

          <p className="text-sm leading-7 text-[var(--text-muted)]">
            Portfolio galleries and booking tools are coming next. For now, the profile
            is the center of gravity.
          </p>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {studioNotes.map((item) => (
          <Card key={item.title} className="space-y-3">
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="text-sm leading-7 text-[var(--text-muted)]">{item.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
