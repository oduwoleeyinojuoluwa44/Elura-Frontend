import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import type { ArtistProfile } from "~types/api";

interface ArtistCardProps {
  artist: ArtistProfile;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Card className="group overflow-hidden p-0">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={artist.profileImageUrl ?? "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"}
          alt={artist.fullName}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,15,0.9)] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="inline-flex rounded-full border border-white/12 bg-black/25 px-3 py-1 text-xs text-white/80 backdrop-blur">
            {artist.location ?? "Location pending"}
          </div>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-white">{artist.fullName}</h3>
          <p className="text-sm text-[var(--text-muted)]">
            {artist.specialty.join(" · ")}
          </p>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-[var(--text-muted)]">
          {artist.bio}
        </p>
        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
          <span className="text-sm text-white/90">
            {artist.priceRange ?? "Custom quote"}
          </span>
          <Link
            href={`/artist/${artist.username}`}
            className="text-sm font-medium text-[var(--accent-color)] transition hover:text-[#fce1e6]"
          >
            View profile
          </Link>
        </div>
      </div>
    </Card>
  );
}

