import type { Metadata } from "next";

import { ArtistProfileClient } from "@/components/artist/artist-profile-client";

interface ArtistPageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArtistPageProps): Promise<Metadata> {
  const { username } = await params;

  return {
    title: `@${username} | Elura artist`,
    description: "Public artist profile powered by the live Elura artist endpoint.",
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { username } = await params;

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <ArtistProfileClient username={username} />
    </div>
  );
}
