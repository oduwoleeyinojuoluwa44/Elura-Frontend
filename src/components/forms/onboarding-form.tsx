"use client";

import Link from "next/link";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";

import { getCurrentUser } from "@/lib/api/auth";
import { upsertArtistProfile } from "@/lib/api/artists";
import { artistProfileSchema } from "@/lib/validators/forms";
import { artistSpecialties, priceRanges } from "@/lib/constants/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { StatusNotice } from "@/components/ui/status-notice";
import { Textarea } from "@/components/ui/textarea";
import type { ArtistProfile, AuthUser } from "~types/api";

interface ProfileFormState {
  fullName: string;
  username: string;
  bio: string;
  location: string;
  specialty: string[];
  priceRange: string;
  instagramHandle: string;
  profileImageUrl: string;
  isPublished: boolean;
}

const initialState: ProfileFormState = {
  fullName: "",
  username: "",
  bio: "",
  location: "",
  specialty: [],
  priceRange: "",
  instagramHandle: "",
  profileImageUrl: "",
  isPublished: false,
};

const profileGuidance = [
  "Use the name clients already know you by.",
  "Pick the specialties you want to be remembered for first.",
  "Publish only when the page feels complete and true to your work.",
];

function normalizeOptional(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function OnboardingForm() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [resolved, setResolved] = useState(false);
  const [form, setForm] = useState<ProfileFormState>(initialState);
  const [savedProfile, setSavedProfile] = useState<ArtistProfile | null>(null);
  const [notice, setNotice] = useState<{
    tone: "info" | "success" | "error";
    title: string;
    description?: string;
  } | null>(null);
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

  const publicProfileHref = useMemo(() => {
    return savedProfile?.isPublished ? `/artist/${savedProfile.username}` : null;
  }, [savedProfile]);

  const toggleSpecialty = (specialty: string) => {
    setForm((current) => {
      const exists = current.specialty.includes(specialty);

      return {
        ...current,
        specialty: exists
          ? current.specialty.filter((item) => item !== specialty)
          : [...current.specialty, specialty],
      };
    });
  };

  const updateField = <K extends keyof ProfileFormState>(
    key: K,
    value: ProfileFormState[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    const parsed = artistProfileSchema.safeParse({
      ...form,
      username: form.username.trim().toLowerCase(),
    });

    if (!parsed.success) {
      setNotice({
        tone: "error",
        title: "Profile could not be saved",
        description: parsed.error.issues[0]?.message,
      });
      return;
    }

    startTransition(async () => {
      try {
        const response = await upsertArtistProfile({
          fullName: parsed.data.fullName.trim(),
          username: parsed.data.username.trim().toLowerCase(),
          bio: normalizeOptional(parsed.data.bio ?? ""),
          location: normalizeOptional(parsed.data.location ?? ""),
          specialty: parsed.data.specialty,
          priceRange: normalizeOptional(parsed.data.priceRange ?? ""),
          instagramHandle: normalizeOptional(parsed.data.instagramHandle ?? ""),
          profileImageUrl: normalizeOptional(parsed.data.profileImageUrl ?? ""),
          isPublished: parsed.data.isPublished,
        });

        if (!response.success) {
          setNotice({
            tone: "error",
            title: "Profile save failed",
            description: response.error.message,
          });
          return;
        }

        setSavedProfile(response.data);
        setNotice({
          tone: "success",
          title: response.data.isPublished ? "Profile published" : "Draft saved",
          description: response.data.isPublished
            ? "Your public page is now live and ready to share."
            : "Your draft is safe. Publish whenever the page feels ready.",
        });
      } catch {
        setNotice({
          tone: "error",
          title: "Something went wrong",
          description: "We could not save that right now. Please try again.",
        });
      }
    });
  }

  if (!resolved) {
    return (
      <Card className="space-y-4">
        <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
        <div className="h-16 w-full animate-pulse rounded-[28px] bg-white/10" />
        <div className="h-48 w-full animate-pulse rounded-[28px] bg-white/10" />
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="space-y-5">
        <StatusNotice
          tone="error"
          title="Sign in to shape your profile"
          description="Your account needs to be active before you can start building the public page."
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
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <Card className="space-y-6">
        <div className="space-y-3">
          <p className="eyebrow-chip w-max">Profile editor</p>
          <p className="text-sm leading-7 text-[var(--text-muted)]">
            Signed in as <span className="text-white">{user.email}</span>. Keep the
            page clean, recognisable, and easy to trust at first glance.
          </p>
        </div>

        {notice ? (
          <StatusNotice
            tone={notice.tone}
            title={notice.title}
            description={notice.description}
          />
        ) : null}

        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="field-label">
                Full name
              </label>
              <Input
                id="fullName"
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                placeholder="Jane Artist"
              />
            </div>
            <div>
              <label htmlFor="username" className="field-label">
                Username
              </label>
              <Input
                id="username"
                value={form.username}
                onChange={(event) => updateField("username", event.target.value.toLowerCase())}
                placeholder="jane_artist"
              />
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="field-label">
              Bio
            </label>
            <Textarea
              id="bio"
              value={form.bio}
              onChange={(event) => updateField("bio", event.target.value)}
              placeholder="Describe your taste, signature finish, and the kind of client experience you create."
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="location" className="field-label">
                Location
              </label>
              <Input
                id="location"
                value={form.location}
                onChange={(event) => updateField("location", event.target.value)}
                placeholder="Lagos"
              />
            </div>
            <div>
              <label htmlFor="instagram" className="field-label">
                Instagram handle
              </label>
              <Input
                id="instagram"
                value={form.instagramHandle}
                onChange={(event) => updateField("instagramHandle", event.target.value)}
                placeholder="@yourhandle"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="priceRange" className="field-label">
                Price range
              </label>
              <Select
                id="priceRange"
                value={form.priceRange}
                onChange={(event) => updateField("priceRange", event.target.value)}
              >
                <option value="">Select range</option>
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label htmlFor="profileImageUrl" className="field-label">
                Profile image URL
              </label>
              <Input
                id="profileImageUrl"
                value={form.profileImageUrl}
                onChange={(event) => updateField("profileImageUrl", event.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="field-label mb-0">Specialties</label>
            <div className="flex flex-wrap gap-3">
              {artistSpecialties.map((specialty) => {
                const slug = specialty.toLowerCase();
                const selected = form.specialty.includes(slug);

                return (
                  <button
                    key={specialty}
                    type="button"
                    onClick={() => toggleSpecialty(slug)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      selected
                        ? "border-[var(--accent-color)] bg-[rgba(232,174,183,0.12)] text-white"
                        : "border-white/10 bg-white/5 text-[var(--text-muted)] hover:text-white"
                    }`}
                  >
                    {specialty}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/85">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(event) => updateField("isPublished", event.target.checked)}
              className="h-4 w-4 rounded border-white/15 bg-white/5 accent-[var(--accent-color)]"
            />
            Make this profile public after save
          </label>

          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            icon={
              isPending ? (
                <LoaderCircle className="animate-spin" size={16} />
              ) : (
                <ShieldCheck size={16} />
              )
            }
          >
            {isPending ? "Saving profile" : form.isPublished ? "Save and publish" : "Save draft"}
          </Button>
        </form>
      </Card>

      <div className="grid gap-5">
        <Card className="space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
            Profile guidance
          </p>
          <ul className="space-y-3 text-sm leading-7 text-[var(--text-muted)]">
            {profileGuidance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>

        <Card className="space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
            Live preview
          </p>
          {savedProfile ? (
            <div className="space-y-4">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <p className="text-lg font-semibold text-white">{savedProfile.fullName}</p>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  @{savedProfile.username} / {savedProfile.location ?? "Location pending"}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                  {savedProfile.bio ?? "No bio saved yet."}
                </p>
              </div>
              {publicProfileHref ? (
                <Link href={publicProfileHref}>
                  <Button variant="secondary">Open public profile</Button>
                </Link>
              ) : (
                <StatusNotice
                  title="Draft only"
                  description="This page is saved, but it is still private until publishing is turned on."
                />
              )}
            </div>
          ) : (
            <p className="text-sm leading-7 text-[var(--text-muted)]">
              Save once to preview the way your public page is starting to read.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
