import { apiRequest } from "@/lib/api/client";
import type {
  ArtistProfileDetail,
  ArtistProfile,
  DiscoverArtistsQuery,
  UpsertArtistProfileRequest,
} from "~types/api";

function buildQuery(query?: DiscoverArtistsQuery) {
  if (!query) {
    return "";
  }

  const searchParams = new URLSearchParams();

  if (query.location) {
    searchParams.set("location", query.location);
  }

  if (query.specialty) {
    searchParams.set("specialty", query.specialty);
  }

  if (query.price_range) {
    searchParams.set("price_range", query.price_range);
  }

  const serialized = searchParams.toString();
  return serialized ? `?${serialized}` : "";
}

export function listArtists(query?: DiscoverArtistsQuery) {
  return apiRequest<ArtistProfile[]>(`/api/artists${buildQuery(query)}`);
}

export function getArtist(username: string) {
  return apiRequest<ArtistProfileDetail>(`/api/artists/${username}`);
}

export function upsertArtistProfile(payload: UpsertArtistProfileRequest) {
  return apiRequest<ArtistProfile>("/api/artists", {
    method: "POST",
    body: payload,
  });
}
