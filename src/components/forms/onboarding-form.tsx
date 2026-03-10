"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ChevronLeft,
  ImagePlus,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";

import { getCurrentUser } from "@/lib/api/auth";
import { upsertArtistProfile } from "@/lib/api/artists";
import { createPortfolioImage } from "@/lib/api/portfolio";
import {
  artistDraftSchema,
  artistPublishSchema,
  portfolioImageSchema,
} from "@/lib/validators/forms";
import { artistSpecialties, priceRanges } from "@/lib/constants/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { StatusNotice } from "@/components/ui/status-notice";
import { Textarea } from "@/components/ui/textarea";
import type { ArtistProfile, AuthUser, PortfolioImage } from "~types/api";

type OnboardingStage = "profile" | "portfolio";

interface ProfileFormState {
  fullName: string;
  username: string;
  bio: string;
  location: string;
  specialty: string[];
  priceRange: string;
  instagramHandle: string;
  profileImageUrl: string;
}

interface PortfolioFormState {
  imageUrl: string;
  caption: string;
  sortOrder: string;
}

const initialProfileState: ProfileFormState = {
  fullName: "",
  username: "",
  bio: "",
  location: "",
  specialty: [],
  priceRange: "",
  instagramHandle: "",
  profileImageUrl: "",
};

const initialPortfolioState: PortfolioFormState = {
  imageUrl: "",
  caption: "",
  sortOrder: "0",
};

function normalizeOptional(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function getNextSortOrder(images: PortfolioImage[]) {
  if (images.length === 0) {
    return 0;
  }

  return Math.max(...images.map((image) => image.sortOrder)) + 1;
}

function normalizeFilename(value: string | undefined, fallback: string) {
  if (!value) {
    return fallback;
  }

  const cleaned = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (!cleaned) {
    return fallback;
  }

  return /\.[a-z0-9]+$/i.test(cleaned) ? cleaned : `${cleaned}.jpg`;
}

function buildStoragePath(artistId: string, imageUrl: string, sortOrder: number) {
  const fallback = `look-${sortOrder + 1}.jpg`;

  try {
    const parsedUrl = new URL(imageUrl);
    const filename = parsedUrl.pathname.split("/").filter(Boolean).pop();

    return `${artistId}/${normalizeFilename(filename, fallback)}`;
  } catch {
    return `${artistId}/${fallback}`;
  }
}

function sortPortfolioImages(images: PortfolioImage[]) {
  return [...images].sort((left, right) => {
    if (left.sortOrder !== right.sortOrder) {
      return left.sortOrder - right.sortOrder;
    }

    return left.createdAt.localeCompare(right.createdAt);
  });
}

export function OnboardingForm() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [resolved, setResolved] = useState(false);
  const [stage, setStage] = useState<OnboardingStage>("profile");
  const [form, setForm] = useState<ProfileFormState>(initialProfileState);
  const [portfolioForm, setPortfolioForm] = useState<PortfolioFormState>(
    initialPortfolioState,
  );
  const [savedProfile, setSavedProfile] = useState<ArtistProfile | null>(null);
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([]);
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

  const orderedPortfolioImages = useMemo(
    () => sortPortfolioImages(portfolioImages),
    [portfolioImages],
  );

  const canPublish = Boolean(savedProfile) && orderedPortfolioImages.length > 0;

  const previewProfile = useMemo(
    () => ({
      fullName: form.fullName.trim() || "Your name",
      username: form.username.trim().toLowerCase() || "username",
      location: form.location.trim() || "Location",
      bio:
        form.bio.trim() ||
        "A short, confident description of the finish, energy, and experience you create.",
      specialty:
        form.specialty.length > 0 ? form.specialty : ["Specialty", "Craft"],
      profileImageUrl:
        form.profileImageUrl.trim() ||
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    }),
    [form],
  );

  const stepItems = [
    {
      id: "profile",
      label: "Details",
      active: stage === "profile",
      complete: Boolean(savedProfile),
    },
    {
      id: "portfolio",
      label: "Portfolio",
      active: stage === "portfolio",
      complete: orderedPortfolioImages.length > 0,
    },
  ] as const;

  const updateField = <K extends keyof ProfileFormState>(
    key: K,
    value: ProfileFormState[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const updatePortfolioField = <K extends keyof PortfolioFormState>(
    key: K,
    value: PortfolioFormState[K],
  ) => {
    setPortfolioForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

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

  function onSaveDraft(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    const parsed = artistDraftSchema.safeParse({
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
          isPublished: false,
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
        setStage("portfolio");
        setPortfolioForm((current) => ({
          ...current,
          sortOrder: String(getNextSortOrder(orderedPortfolioImages)),
        }));
        setNotice({
          tone: "success",
          title: "Draft saved",
          description: "Add at least one image before you publish the page.",
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

  function onAddPortfolioImage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    if (!savedProfile) {
      setNotice({
        tone: "error",
        title: "Save the profile first",
        description: "Your profile needs an artist id before images can be attached.",
      });
      return;
    }

    const parsed = portfolioImageSchema.safeParse(portfolioForm);
    if (!parsed.success) {
      setNotice({
        tone: "error",
        title: "Image could not be added",
        description: parsed.error.issues[0]?.message,
      });
      return;
    }

    startTransition(async () => {
      try {
        const response = await createPortfolioImage({
          artistId: savedProfile.id,
          imageUrl: parsed.data.imageUrl.trim(),
          storagePath: buildStoragePath(
            savedProfile.id,
            parsed.data.imageUrl.trim(),
            parsed.data.sortOrder,
          ),
          caption: parsed.data.caption?.trim() || undefined,
          sortOrder: parsed.data.sortOrder,
        });

        if (!response.success) {
          setNotice({
            tone: "error",
            title: "Image could not be added",
            description: response.error.message,
          });
          return;
        }

        const nextImages = sortPortfolioImages([
          ...orderedPortfolioImages,
          response.data,
        ]);

        setPortfolioImages(nextImages);
        setPortfolioForm({
          imageUrl: "",
          caption: "",
          sortOrder: String(getNextSortOrder(nextImages)),
        });
        setNotice({
          tone: "success",
          title: "Image added",
          description: "The portfolio is now attached to your profile draft.",
        });
      } catch {
        setNotice({
          tone: "error",
          title: "Something went wrong",
          description: "We could not attach that image right now. Please try again.",
        });
      }
    });
  }

  function onPublish() {
    setNotice(null);

    if (!savedProfile || orderedPortfolioImages.length === 0) {
      setNotice({
        tone: "error",
        title: "At least one image is required",
        description: "Add a portfolio image before you publish the page.",
      });
      return;
    }

    const parsed = artistPublishSchema.safeParse({
      ...form,
      username: form.username.trim().toLowerCase(),
    });

    if (!parsed.success) {
      setNotice({
        tone: "error",
        title: "Profile could not be published",
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
          isPublished: true,
        });

        if (!response.success) {
          setNotice({
            tone: "error",
            title: "Profile could not be published",
            description: response.error.message,
          });
          return;
        }

        setSavedProfile(response.data);
        router.push(`/artist/${response.data.username}`);
        router.refresh();
      } catch {
        setNotice({
          tone: "error",
          title: "Something went wrong",
          description: "We could not publish the page right now. Please try again.",
        });
      }
    });
  }

  if (!resolved) {
    return (
      <Card className="stage-panel space-y-4">
        <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
        <div className="h-16 w-full animate-pulse rounded-[28px] bg-white/10" />
        <div className="h-48 w-full animate-pulse rounded-[28px] bg-white/10" />
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="stage-panel space-y-5">
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
    <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="space-y-5">
        <Card className="surface-transition flex flex-wrap items-center gap-3 p-4">
          {stepItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.id === "profile" || savedProfile) {
                  setStage(item.id);
                }
              }}
              className={`surface-transition inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm ${
                item.active
                  ? "border-[rgba(232,174,183,0.28)] bg-[rgba(232,174,183,0.12)] text-white"
                  : "border-white/10 bg-white/[0.03] text-[var(--text-muted)] hover:text-white"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-[0.72rem] ${
                  item.complete
                    ? "border-[rgba(232,174,183,0.28)] bg-[rgba(232,174,183,0.16)] text-white"
                    : "border-white/10 text-white/70"
                }`}
              >
                {item.complete ? <CheckCircle2 size={12} /> : item.label === "Details" ? "1" : "2"}
              </span>
              {item.label}
            </button>
          ))}
        </Card>

        {notice ? (
          <StatusNotice
            tone={notice.tone}
            title={notice.title}
            description={notice.description}
          />
        ) : null}

        {stage === "profile" ? (
          <Card key="profile-stage" className="stage-panel space-y-6">
            <div className="space-y-3">
              <p className="eyebrow-chip w-max">Step 1</p>
              <div className="space-y-2">
                <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-white">
                  Save the details first.
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                  Name, city, specialties, and one clear profile image are enough to
                  make the page feel professional. Save the draft, then attach the
                  portfolio images that carry the work.
                </p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={onSaveDraft}>
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
                    onChange={(event) =>
                      updateField("username", event.target.value.toLowerCase())
                    }
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
                  placeholder="Describe the finish, atmosphere, and client experience your work is known for."
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
                    onChange={(event) =>
                      updateField("instagramHandle", event.target.value)
                    }
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
                    onChange={(event) =>
                      updateField("profileImageUrl", event.target.value)
                    }
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
                        className={`surface-transition rounded-full border px-4 py-2 text-sm ${
                          selected
                            ? "border-[rgba(232,174,183,0.28)] bg-[rgba(232,174,183,0.12)] text-white"
                            : "border-white/10 bg-white/5 text-[var(--text-muted)] hover:text-white"
                        }`}
                      >
                        {specialty}
                      </button>
                    );
                  })}
                </div>
              </div>

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
                {isPending ? "Saving draft" : "Save details"}
              </Button>
            </form>
          </Card>
        ) : (
          <Card key="portfolio-stage" className="stage-panel space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <p className="eyebrow-chip w-max">Step 2</p>
                <div className="space-y-2">
                  <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-white">
                    Attach the portfolio, then publish.
                  </h2>
                  <p className="max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                    Keep the image selection tight. One strong image is enough to
                    publish. Add more only when each one deepens the page.
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                onClick={() => setStage("profile")}
                icon={<ChevronLeft size={16} />}
              >
                Edit details
              </Button>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
              <p className="text-sm font-semibold text-white">
                {savedProfile?.fullName ?? previewProfile.fullName}
              </p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                @{savedProfile?.username ?? previewProfile.username} /{" "}
                {savedProfile?.location ?? previewProfile.location}
              </p>
            </div>

            <form className="space-y-5" onSubmit={onAddPortfolioImage}>
              <div>
                <label htmlFor="portfolioImageUrl" className="field-label">
                  Portfolio image URL
                </label>
                <Input
                  id="portfolioImageUrl"
                  value={portfolioForm.imageUrl}
                  onChange={(event) =>
                    updatePortfolioField("imageUrl", event.target.value)
                  }
                  placeholder="https://..."
                />
              </div>

              <div className="grid gap-5 md:grid-cols-[1fr_180px]">
                <div>
                  <label htmlFor="portfolioCaption" className="field-label">
                    Caption
                  </label>
                  <Input
                    id="portfolioCaption"
                    value={portfolioForm.caption}
                    onChange={(event) =>
                      updatePortfolioField("caption", event.target.value)
                    }
                    placeholder="Editorial bridal look"
                  />
                </div>
                <div>
                  <label htmlFor="sortOrder" className="field-label">
                    Display order
                  </label>
                  <Input
                    id="sortOrder"
                    type="number"
                    min={0}
                    value={portfolioForm.sortOrder}
                    onChange={(event) =>
                      updatePortfolioField("sortOrder", event.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending || !savedProfile}
                  icon={
                    isPending ? (
                      <LoaderCircle className="animate-spin" size={16} />
                    ) : (
                      <ImagePlus size={16} />
                    )
                  }
                >
                  {isPending ? "Adding image" : "Add image"}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  disabled={isPending || !canPublish}
                  onClick={onPublish}
                  icon={<ShieldCheck size={16} />}
                >
                  Publish profile
                </Button>
              </div>
            </form>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-white">Portfolio attached</p>
                <p className="text-sm text-[var(--text-muted)]">
                  {orderedPortfolioImages.length} image
                  {orderedPortfolioImages.length === 1 ? "" : "s"}
                </p>
              </div>

              {orderedPortfolioImages.length === 0 ? (
                <div className="rounded-[26px] border border-dashed border-white/12 bg-white/[0.02] px-5 py-6 text-sm leading-7 text-[var(--text-muted)]">
                  Add the first image to unlock publish.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {orderedPortfolioImages.map((image, index) => (
                    <div
                      key={image.id}
                      className="gallery-enter overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]"
                      style={{ animationDelay: `${index * 60}ms` }}
                    >
                      <div className="relative aspect-[4/5]">
                        <Image
                          src={image.imageUrl}
                          alt={image.caption ?? `Portfolio image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 24vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-2 p-4">
                        <p className="text-sm font-medium text-white">
                          {image.caption ?? "Untitled image"}
                        </p>
                        <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          Order {image.sortOrder}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      <div className="grid gap-5">
        <Card className="surface-transition space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
            Signed in
          </p>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-white">{user.email}</p>
            <p className="text-sm leading-7 text-[var(--text-muted)]">
              Keep the page spare, visual, and easy to trust at a glance.
            </p>
          </div>
        </Card>

        <Card className="surface-transition space-y-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
              Draft preview
            </p>
            <p className="text-sm leading-7 text-[var(--text-muted)]">
              This is the tone the public page is moving toward.
            </p>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black/20">
            <div className="relative aspect-[5/4]">
              <Image
                src={previewProfile.profileImageUrl}
                alt={previewProfile.fullName}
                fill
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,15,0.92)] via-[rgba(11,11,15,0.18)] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 space-y-3 p-6">
                <p className="text-[0.72rem] uppercase tracking-[0.24em] text-white/60">
                  @{previewProfile.username}
                </p>
                <div className="space-y-2">
                  <p className="text-3xl font-semibold tracking-[-0.04em] text-white">
                    {previewProfile.fullName}
                  </p>
                  <p className="text-sm text-white/78">{previewProfile.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <div className="flex flex-wrap gap-2">
                {previewProfile.specialty.map((specialty) => (
                  <span
                    key={specialty}
                    className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/72"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              <p className="text-sm leading-7 text-[var(--text-muted)]">
                {previewProfile.bio}
              </p>
              {orderedPortfolioImages.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                  {orderedPortfolioImages.slice(0, 3).map((image, index) => (
                    <div
                      key={image.id}
                      className="gallery-enter relative aspect-[3/4] overflow-hidden rounded-[18px]"
                      style={{ animationDelay: `${index * 70}ms` }}
                    >
                      <Image
                        src={image.imageUrl}
                        alt={image.caption ?? `Portfolio preview ${index + 1}`}
                        fill
                        sizes="140px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
