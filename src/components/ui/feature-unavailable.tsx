import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FeatureUnavailableProps {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
}

export function FeatureUnavailable({
  eyebrow,
  title,
  description,
  href,
  actionLabel,
}: FeatureUnavailableProps) {
  return (
    <div className="app-page">
      <Card className="stage-panel mx-auto max-w-3xl space-y-6 text-center">
        <div className="space-y-3">
          <p className="eyebrow-chip w-max mx-auto">{eyebrow}</p>
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-[-0.05em] text-white">
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
            {description}
          </p>
        </div>

        <div className="flex justify-center">
          <Link href={href}>
            <Button variant="secondary">{actionLabel}</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
