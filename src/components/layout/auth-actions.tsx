"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle, LogOut } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

import { signOut, getCurrentUser } from "@/lib/api/auth";
import { Button } from "@/components/ui/button";
import type { AuthUser } from "~types/api";

export function AuthActions() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [resolved, setResolved] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;

    async function loadSession() {
      try {
        const response = await getCurrentUser();
        if (!active) {
          return;
        }

        setUser(response.success ? response.data : null);
        setResolved(true);
      } catch {
        if (!active) {
          return;
        }

        setUser(null);
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
      <div className="flex items-center gap-3">
        <div className="h-10 w-24 animate-pulse rounded-full bg-white/8" />
        <div className="h-10 w-28 animate-pulse rounded-full bg-white/8" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/signup?mode=signin" className="hidden md:block">
          <Button variant="ghost">Sign in</Button>
        </Link>
        <Link href="/signup">
          <Button>Join as artist</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/75 md:block">
        {user.email ?? "Signed in"}
      </div>
      <Link href="/dashboard">
        <Button variant="secondary">Dashboard</Button>
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
  );
}
