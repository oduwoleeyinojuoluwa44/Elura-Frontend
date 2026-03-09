"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Instagram, LoaderCircle, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { getArtist } from "@/lib/api/artists";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusNotice } from "@/components/ui/status-notice";
import type { ArtistProfile } from "~types/api";

interface ArtistProfileClientProps {
  username: string;
}

const fallbackImage =
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80";

export function ArtistProfileClient({ username }: ArtistProfileClientProps) {
  const [artist, setArtist] = useState<ArtistProfile | null>(null);
  const [resolved, setResolved] = useState(false);
  const [notice, setNotice] = useState<{
    tone: "info" | "success" | "error";
    title: string;
    description?: string;
  } | null>(null);

  useEffect(() => {
    let active = true;

    async function loadArtist() {
      try {
        const response = await getArtist(username);
        if (!active) {
          return;
        }

        if (!response.success) {
          setArtist(null);
          setNotice({
            tone: response.error.code === "NOT_FOUND" ? "info" : "error",
            title:
              response.error.code === "NOT_FOUND"
                ? "Artist not found"
                : "Could not load artist profile",
            description:
              response.error.code === "NOT_FOUND"
                ? "This page is either still private or not available yet."
                : response.error.message,
          });
          setResolved(true);
          return;
        }

        setArtist(response.data);
        setNotice(null);
        setResolved(true);
      } catch {
        if (!active) {
          return;
        }

        setArtist(null);
        setNotice({
          tone: "error",
          title: "Could not load this page",
          description: "Please try again in a moment.",
        });
        setResolved(true);
      }
    }

    void loadArtist();

    return () => {
      active = false;
    };
  }, [username]);

  const instagramUrl = useMemo(() => {
    if (!artist?.instagramHandle) {
      return null;
    }

    return `https://instagram.com/${artist.instagramHandle.replace(/^@/, "")}`;
  }, [artist]);

  if (!resolved) {
    return (
      <Card className="space-y-4">
        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
          <LoaderCircle className="animate-spin" size={16} />
          Loading artist profile
        </div>
        <div className="h-[420px] animate-pulse rounded-[28px] bg-white/10" />
      </Card>
    );
  }

  if (!artist) {
    return (
      <StatusNotice
        tone={notice?.tone ?? "info"}
        title={notice?.title ?? "Artist unavailable"}
        description={notice?.description}
      />
    );
  }

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[420px]">
            <Image
              src={artist.profileImageUrl ?? fallbackImage}
              alt={artist.fullName}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,15,0.82)] via-transparent to-transparent" />
          </div>
          <div className="space-y-6 p-8">
            <div className="space-y-3">
              <p className="eyebrow-chip w-max">Artist profile</p>
              <h1 className="font-display text-5xl text-white">{artist.fullName}</h1>
              <p className="max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                {artist.bio ?? "This artist has not added a public bio yet."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {artist.specialty.map((specialty) => (
                <span
                  key={specialty}
                  className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-white/85"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
                  Location
                </p>
                <p className="mt-3 flex items-center gap-2 text-sm text-white/90">
                  <MapPin size={16} />
                  {artist.location ?? "Location pending"}
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
                  Price range
                </p>
                <p className="mt-3 text-sm text-white/90">
                  {artist.priceRange ?? "Available on request"}
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
                  Instagram
                </p>
                <p className="mt-3 flex items-center gap-2 text-sm text-white/90">
                  <Instagram size={16} />
                  {artist.instagramHandle ?? "Not linked yet"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {instagramUrl ? (
                <Link href={instagramUrl} target="_blank" rel="noreferrer">
                  <Button variant="secondary" icon={<ExternalLink size={16} />}>
                    Open Instagram
                  </Button>
                </Link>
              ) : null}
              <Button disabled>Request booking soon</Button>
            </div>
          </div>
        </div>
      </Card>

      <Card className="space-y-4">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
          Portfolio
        </p>
        <p className="text-sm leading-7 text-[var(--text-muted)]">
          A fuller image-led gallery is opening soon. For now, this page focuses on the
          artist&apos;s profile, specialties, price range, and contact presence.
        </p>
      </Card>
    </div>
  );
}
