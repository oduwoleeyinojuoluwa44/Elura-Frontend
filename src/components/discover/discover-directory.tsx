"use client";

import { LoaderCircle, Search, SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";

import { listArtists } from "@/lib/api/artists";
import { artistSpecialties, priceRanges } from "@/lib/constants/site";
import { ArtistCard } from "@/components/cards/artist-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { StatusNotice } from "@/components/ui/status-notice";
import type { ArtistProfile, DiscoverArtistsQuery } from "~types/api";

const initialFilters = {
  location: "",
  specialty: "",
  price_range: "",
};

export function DiscoverDirectory() {
  const [filters, setFilters] = useState(initialFilters);
  const [artists, setArtists] = useState<ArtistProfile[]>([]);
  const [notice, setNotice] = useState<{
    tone: "info" | "success" | "error";
    title: string;
    description?: string;
  } | null>(null);
  const [resolved, setResolved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const fetchArtists = useCallback((query?: DiscoverArtistsQuery) => {
    startTransition(async () => {
      try {
        const response = await listArtists(query);
        if (!response.success) {
          setArtists([]);
          setNotice({
            tone: "error",
            title: "Could not load artists",
            description: response.error.message,
          });
          setResolved(true);
          return;
        }

        setArtists(response.data);
        setResolved(true);
        setNotice(
          response.data.length === 0
            ? {
                tone: "info",
                title: "No artists matched that search",
                description:
                  "Try broadening the city, specialty, or price range to see more artists.",
              }
            : null,
        );
      } catch {
        setArtists([]);
        setNotice({
          tone: "error",
          title: "Could not load artists",
          description: "Please try again in a moment.",
        });
        setResolved(true);
      }
    });
  }, [startTransition]);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists]);

  return (
    <div className="space-y-8">
      <Card className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto_auto]">
        <div>
          <label htmlFor="location" className="field-label">
            Location
          </label>
          <Input
            id="location"
            value={filters.location}
            onChange={(event) =>
              setFilters((current) => ({ ...current, location: event.target.value }))
            }
            placeholder="Lagos"
          />
        </div>
        <div>
          <label htmlFor="specialty" className="field-label">
            Specialty
          </label>
          <Select
            id="specialty"
            value={filters.specialty}
            onChange={(event) =>
              setFilters((current) => ({ ...current, specialty: event.target.value }))
            }
          >
            <option value="">All specialties</option>
            {artistSpecialties.map((specialty) => (
              <option key={specialty} value={specialty.toLowerCase()}>
                {specialty}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="priceRange" className="field-label">
            Price range
          </label>
          <Select
            id="priceRange"
            value={filters.price_range}
            onChange={(event) =>
              setFilters((current) => ({ ...current, price_range: event.target.value }))
            }
          >
            <option value="">All price ranges</option>
            {priceRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex items-end">
          <Button
            variant="secondary"
            onClick={() =>
              fetchArtists({
                location: filters.location.trim() || undefined,
                specialty: filters.specialty || undefined,
                price_range: filters.price_range || undefined,
              })
            }
            disabled={isPending}
            icon={
              isPending ? (
                <LoaderCircle className="animate-spin" size={16} />
              ) : (
                <Search size={16} />
              )
            }
          >
            {isPending ? "Applying" : "Apply filters"}
          </Button>
        </div>
        <div className="flex items-end">
          <Button
            variant="ghost"
            onClick={() => {
              setFilters(initialFilters);
              fetchArtists();
            }}
            icon={<SlidersHorizontal size={16} />}
          >
            Clear
          </Button>
        </div>
      </Card>

      {notice ? (
        <StatusNotice
          tone={notice.tone}
          title={notice.title}
          description={notice.description}
        />
      ) : null}

      {!resolved ? (
        <div className="grid gap-5 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="h-[420px] animate-pulse bg-white/[0.025]" />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-3">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
}
