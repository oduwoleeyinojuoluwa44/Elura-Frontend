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
    description: "A public Elura artist profile.",
  };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { username } = await params;

  return (
    <div className="app-page">
      <ArtistProfileClient username={username} />
    </div>
  );
}
