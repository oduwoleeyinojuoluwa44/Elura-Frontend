import { Suspense } from "react";

import { AuthPanel } from "@/components/forms/auth-panel";
import { Card } from "@/components/ui/card";

function AuthPanelFallback() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
      <Card className="space-y-4">
        <div className="h-10 w-48 animate-pulse rounded-full bg-white/10" />
        <div className="h-16 w-full animate-pulse rounded-[28px] bg-white/10" />
        <div className="h-48 w-full animate-pulse rounded-[28px] bg-white/10" />
      </Card>
      <Card className="space-y-4">
        <div className="h-6 w-36 animate-pulse rounded bg-white/10" />
        <div className="h-64 w-full animate-pulse rounded-[28px] bg-white/10" />
      </Card>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <Suspense fallback={<AuthPanelFallback />}>
        <AuthPanel />
      </Suspense>
    </div>
  );
}
