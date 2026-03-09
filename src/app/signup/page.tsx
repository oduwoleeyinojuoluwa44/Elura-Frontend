import { Suspense } from "react";

import { AuthPanel } from "@/components/forms/auth-panel";
import { EluraEntryScene } from "@/components/graphics/elura-entry-scene";
import { Card } from "@/components/ui/card";

function AuthPanelFallback() {
  return (
    <Card className="relative z-10 w-full max-w-[34rem] space-y-5 border-white/12 bg-[rgba(9,9,13,0.74)] p-6 sm:p-7">
      <div className="h-12 w-full animate-pulse rounded-full bg-white/10" />
      <div className="h-20 w-3/4 animate-pulse rounded-[28px] bg-white/10" />
      <div className="h-12 w-full animate-pulse rounded-2xl bg-white/10" />
      <div className="h-12 w-full animate-pulse rounded-2xl bg-white/10" />
      <div className="h-14 w-full animate-pulse rounded-full bg-white/10" />
    </Card>
  );
}

export default function SignupPage() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <EluraEntryScene
          variant="background"
          showOverlay={false}
          className="min-h-[calc(100vh-4.75rem)] rounded-none border-0 bg-transparent opacity-90 shadow-none"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_26%),linear-gradient(180deg,rgba(7,7,10,0.28),rgba(7,7,10,0.76)_58%,rgba(7,7,10,0.96))]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4.75rem)] max-w-7xl items-center justify-center px-5 py-12 md:px-8">
        <Suspense fallback={<AuthPanelFallback />}>
          <AuthPanel />
        </Suspense>
      </div>
    </section>
  );
}
