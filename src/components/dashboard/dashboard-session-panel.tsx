"use client";

import Link from "next/link";
import { LoaderCircle, LogOut, ShieldCheck } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { getCurrentUser, signOut } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusNotice } from "@/components/ui/status-notice";
import type { AuthUser } from "~types/api";

export function DashboardSessionPanel() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [resolved, setResolved] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;

    async function loadSession() {
      try {
        const response = await getCurrentUser();
        if (!active) {
          return;
        }

        if (response.success) {
          setUser(response.data);
        } else {
          setNotice(response.error.message);
        }

        setResolved(true);
      } catch {
        if (!active) {
          return;
        }

        setNotice("We could not verify the current session.");
        setResolved(true);
      }
    }

    void loadSession();

    return () => {
      active = false;
    };
  }, []);

  if (!resolved) {
    return (
      <Card className="space-y-4">
        <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
        <div className="h-24 w-full animate-pulse rounded-[24px] bg-white/10" />
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="space-y-4">
        <StatusNotice
          tone="error"
          title="You are signed out"
          description={notice ?? "Sign in again to return to your studio."}
          action={
            <Link href="/signup?mode=signin">
              <Button variant="secondary">Go to sign in</Button>
            </Link>
          }
        />
      </Card>
    );
  }

  return (
    <Card className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(232,174,183,0.16)] text-[var(--accent-color)]">
          <ShieldCheck size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">You&apos;re inside Elura</p>
          <p className="text-sm text-[var(--text-muted)]">{user.email}</p>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
        <p className="text-sm leading-7 text-[var(--text-muted)]">
          Keep the public page current and send clients to one calm, focused destination
          that reflects the quality of your work.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/onboarding">
          <Button variant="secondary">Profile studio</Button>
        </Link>
        <Link href="/discover">
          <Button variant="ghost">View discovery</Button>
        </Link>
        <Button
          variant="ghost"
          onClick={() => {
            startTransition(async () => {
              const response = await signOut();
              if (response.success) {
                setUser(null);
                router.push("/signup?mode=signin");
                router.refresh();
              }
            });
          }}
          disabled={isPending}
          icon={
            isPending ? <LoaderCircle className="animate-spin" size={16} /> : <LogOut size={16} />
          }
        >
          {isPending ? "Signing out" : "Sign out"}
        </Button>
      </div>
    </Card>
  );
}
