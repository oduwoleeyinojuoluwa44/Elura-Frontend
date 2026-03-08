import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Instagram, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { findMockArtist, mockPortfolio } from "@/lib/constants/mock-data";

interface ArtistPageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArtistPageProps): Promise<Metadata> {
  const { username } = await params;
  const artist = findMockArtist(username);

  return {
    title: artist ? artist.fullName : "Artist profile",
    description:
      artist?.bio ?? "Public artist profile scaffold for the Elura MVP frontend.",
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { username } = await params;
  const artist = findMockArtist(username) ?? findMockArtist("jadeglow");

  if (!artist) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-16 md:px-8">
      <Card className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[420px]">
            <Image
              src={artist.profileImageUrl ?? mockPortfolio[0].imageUrl}
              alt={artist.fullName}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,15,0.78)] via-transparent to-transparent" />
          </div>
          <div className="space-y-6 p-8">
            <div className="space-y-3">
              <p className="eyebrow-chip w-max">Public profile</p>
              <h1 className="font-display text-5xl text-white">{artist.fullName}</h1>
              <p className="max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                {artist.bio}
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
                  {artist.location}
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
                  Price range
                </p>
                <p className="mt-3 text-sm text-white/90">{artist.priceRange}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
                  Instagram
                </p>
                <p className="mt-3 flex items-center gap-2 text-sm text-white/90">
                  <Instagram size={16} />
                  {artist.instagramHandle}
                </p>
              </div>
            </div>

            <Link href="/booking">
              <Button size="lg">Request booking</Button>
            </Link>
          </div>
        </div>
      </Card>

      <Card className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
            Portfolio grid
          </p>
          <h2 className="mt-2 font-display text-4xl text-white">
            The portfolio remains the strongest trust signal.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {mockPortfolio.map((image) => (
            <div key={image.id} className="space-y-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[26px]">
                <Image
                  src={image.imageUrl}
                  alt={image.caption ?? artist.fullName}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="text-sm leading-6 text-[var(--text-muted)]">
                {image.caption}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
