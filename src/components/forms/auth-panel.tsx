"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Chrome, LoaderCircle, LockKeyhole, MailCheck } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

import { signIn, signUp } from "@/lib/api/auth";
import { authFormSchema } from "@/lib/validators/forms";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusNotice } from "@/components/ui/status-notice";

type AuthMode = "sign-up" | "sign-in";

interface AuthPanelProps {
  initialMode?: AuthMode;
}

export function AuthPanel({ initialMode = "sign-up" }: AuthPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState<{
    tone: "info" | "success" | "error";
    title: string;
    description?: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const modeFromQuery = searchParams.get("mode") === "signin" ? "sign-in" : "sign-up";
    setMode(modeFromQuery);
  }, [searchParams]);

  const submitLabel = mode === "sign-up" ? "Create account" : "Sign in";

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setNotice(null);
    router.replace(nextMode === "sign-in" ? "/signup?mode=signin" : "/signup", {
      scroll: false,
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    const parsed = authFormSchema.safeParse({ email, password });
    if (!parsed.success) {
      setNotice({
        tone: "error",
        title: "Check your details",
        description: parsed.error.issues[0]?.message,
      });
      return;
    }

    startTransition(async () => {
      try {
        const response =
          mode === "sign-up"
            ? await signUp(parsed.data.email, parsed.data.password)
            : await signIn(parsed.data.email, parsed.data.password);

        if (!response.success) {
          setNotice({
            tone: "error",
            title: mode === "sign-up" ? "Could not create account" : "Could not sign in",
            description: response.error.message,
          });
          return;
        }

        if (mode === "sign-up" && response.data.requiresEmailConfirmation) {
          setNotice({
            tone: "success",
            title: "Check your inbox",
            description: "Confirm your email, then continue into your profile setup.",
          });
          return;
        }

        router.push(mode === "sign-up" ? "/onboarding" : "/dashboard");
        router.refresh();
      } catch {
        setNotice({
          tone: "error",
          title: "Something went wrong",
          description: "We could not complete that right now. Please try again.",
        });
      }
    });
  }

  return (
    <Card className="relative z-10 w-full max-w-[29rem] border-white/12 bg-[rgba(9,9,13,0.74)] p-5 sm:p-6">
      <div className="relative grid grid-cols-2 rounded-full border border-white/10 bg-white/5 p-1">
        <span
          aria-hidden="true"
          className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[linear-gradient(135deg,var(--accent-color),#c88c96)] shadow-[0_14px_28px_rgba(232,174,183,0.16)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mode === "sign-in" ? "translate-x-full" : "translate-x-0"
          }`}
        />
        {[
          { key: "sign-up", label: "Create account" },
          { key: "sign-in", label: "Sign in" },
        ].map((tab) => {
          const active = mode === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => switchMode(tab.key as AuthMode)}
              className={`relative z-10 rounded-full px-4 py-3 text-sm font-medium transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                active
                  ? "text-[var(--bg-color)]"
                  : "text-[var(--text-muted)] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-2.5">
        <p className="eyebrow-chip w-max">Artist access</p>
        <h1 className="font-display text-[2.75rem] leading-[0.94] text-white sm:text-[3.5rem]">
          {mode === "sign-up" ? "Create your account." : "Welcome back."}
        </h1>
        <p className="max-w-md text-sm leading-6 text-[var(--text-muted)]">
          {mode === "sign-up"
            ? "Use email to enter Elura. Google sign-in stays as a placeholder for now."
            : "Sign in to continue into your profile and studio."}
        </p>
      </div>

      {notice ? (
        <div className="mt-5">
          <StatusNotice
            tone={notice.tone}
            title={notice.title}
            description={notice.description}
          />
        </div>
      ) : null}

      <form className="mt-6 grid gap-3.5" onSubmit={onSubmit}>
        <div>
          <label htmlFor="auth-email" className="field-label">
            Email
          </label>
          <Input
            id="auth-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="artist@example.com"
          />
        </div>
        <div>
          <label htmlFor="auth-password" className="field-label">
            Password
          </label>
          <Input
            id="auth-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimum 8 characters"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          icon={
            isPending ? (
              <LoaderCircle className="animate-spin" size={16} />
            ) : mode === "sign-up" ? (
              <MailCheck size={16} />
            ) : (
              <LockKeyhole size={16} />
            )
          }
        >
          {isPending ? "Please wait" : submitLabel}
        </Button>
      </form>

      <div className="mt-5 rounded-[22px] border border-dashed border-white/12 bg-black/20 p-3.5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">Google sign-in</p>
            <p className="mt-1 text-sm leading-5 text-[var(--text-muted)]">
              Placeholder only for now.
            </p>
          </div>
          <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/65">
            Soon
          </span>
        </div>
        <Button className="mt-4 w-full" variant="secondary" size="lg" disabled icon={<Chrome size={16} />}>
          Continue with Google
        </Button>
      </div>
    </Card>
  );
}
