import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="space-y-5">
          <p className="eyebrow-chip w-max">Artist access</p>
          <h1 className="font-display text-5xl text-white">
            Start the professional version of your beauty business.
          </h1>
          <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">
            Signup stays intentionally light. The fuller profile, specialties,
            pricing, and portfolio all happen in onboarding.
          </p>
          <div className="grid gap-4 pt-3">
            <div>
              <label htmlFor="email" className="field-label">
                Email
              </label>
              <Input id="email" type="email" placeholder="artist@example.com" />
            </div>
            <div>
              <label htmlFor="password" className="field-label">
                Password
              </label>
              <Input id="password" type="password" placeholder="Minimum 8 characters" />
            </div>
            <Button size="lg" icon={<ArrowRight size={16} />}>
              Create account
            </Button>
          </div>
        </Card>

        <Card className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
              API setup notes
            </p>
            <h2 className="mt-2 font-display text-4xl text-white">
              Frontend already aligned to the auth contract.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
              <p className="text-sm font-semibold text-white">POST /api/auth/sign-up</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                Email and password request body, `201` success, `409` conflict for
                existing email.
              </p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
              <p className="text-sm font-semibold text-white">Email confirmation</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                Auth links should navigate to `/auth/confirm`, never be fetched
                from the client.
              </p>
            </div>
          </div>
          <p className="text-sm leading-7 text-[var(--text-muted)]">
            This page is ready for a client-side submission hook once the
            backend environment is connected.
          </p>
        </Card>
      </div>
    </div>
  );
}

