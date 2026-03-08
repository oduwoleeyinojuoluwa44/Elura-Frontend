"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Chrome, LoaderCircle, LockKeyhole, MailCheck, Sparkles } from "lucide-react";
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
            description:
              "Your account is ready. Use the email confirmation link to activate the session, then continue to onboarding.",
          });
          return;
        }

        router.push(mode === "sign-up" ? "/onboarding" : "/dashboard");
        router.refresh();
      } catch {
        setNotice({
          tone: "error",
          title: "Network error",
          description:
            "We could not reach the backend. Confirm the API server is running and try again.",
        });
      }
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
      <Card className="space-y-6">
        <div className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1">
          {[
            { key: "sign-up", label: "Create account" },
            { key: "sign-in", label: "Sign in" },
          ].map((tab) => {
            const active = mode === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setMode(tab.key as AuthMode)}
                className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-[linear-gradient(135deg,var(--accent-color),#c88c96)] text-[var(--bg-color)]"
                    : "text-[var(--text-muted)] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          <p className="eyebrow-chip w-max">Artist access</p>
          <h1 className="font-display text-5xl text-white">
            {mode === "sign-up"
              ? "Start the professional version of your beauty business."
              : "Return to your artist workspace."}
          </h1>
          <p className="max-w-xl text-sm leading-7 text-[var(--text-muted)]">
            {mode === "sign-up"
              ? "Email auth is fully wired to the implemented backend. Signup stays intentionally light so profile quality can happen in onboarding."
              : "Session auth uses the documented cookie flow. Once signed in, the dashboard and profile setup use the same backend truth."}
          </p>
        </div>

        {notice ? (
          <StatusNotice
            tone={notice.tone}
            title={notice.title}
            description={notice.description}
          />
        ) : null}

        <form className="grid gap-4" onSubmit={onSubmit}>
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

        <div className="space-y-3 rounded-[26px] border border-dashed border-white/12 bg-black/15 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">Google sign-in</p>
              <p className="text-sm leading-6 text-[var(--text-muted)]">
                Placeholder only for now. Email auth is the active path.
              </p>
            </div>
            <span className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/65">
              Coming soon
            </span>
          </div>
          <Button variant="secondary" size="lg" disabled icon={<Chrome size={16} />}>
            Continue with Google
          </Button>
        </div>
      </Card>

      <Card className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
            Implemented auth endpoints
          </p>
          <h2 className="mt-2 font-display text-4xl text-white">
            The frontend now respects the real contract instead of pretending the flow exists.
          </h2>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-semibold text-white">POST /api/auth/sign-up</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
              Creates the account and tells the UI whether email confirmation is still required.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-semibold text-white">POST /api/auth/sign-in</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
              Establishes the cookie-backed session that powers onboarding and dashboard access.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-semibold text-white">GET /auth/confirm</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
              Browser navigation only. The UI now explains that this route should never be called with `fetch`.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <p className="text-sm font-semibold text-white">GET /api/auth/me</p>
            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
              Used in the header and dashboard so session state comes from the backend truth.
            </p>
          </div>
        </div>

        <div className="rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(232,174,183,0.16)] text-[var(--accent-color)]">
              <Sparkles size={20} />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-white">What happens next</p>
              <p className="text-sm leading-7 text-[var(--text-muted)]">
                After sign-in, artists move straight into profile setup where the implemented
                `POST /api/artists` endpoint becomes the working save action.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

