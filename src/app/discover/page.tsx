import { ArtistCard } from "@/components/cards/artist-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { mockArtists } from "@/lib/constants/mock-data";
import { artistSpecialties, priceRanges } from "@/lib/constants/site";

export default function DiscoverPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-16 md:px-8">
      <SectionHeading
        eyebrow="Client discovery"
        title="Browse artists with clarity instead of guessing through social noise."
        description="The discovery page is designed for fast trust: clear filters, strong first-glance cards, and no marketplace clutter."
      />

      <Card className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto]">
        <div>
          <label htmlFor="location" className="field-label">
            Location
          </label>
          <Input id="location" placeholder="Lagos" />
        </div>
        <div>
          <label htmlFor="specialty" className="field-label">
            Specialty
          </label>
          <Select id="specialty" defaultValue="">
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
          <Select id="priceRange" defaultValue="">
            <option value="">All price ranges</option>
            {priceRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex items-end">
          <div className="rounded-full border border-white/12 bg-white/5 px-4 py-3 text-sm text-[var(--text-muted)]">
            GET /api/artists
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        {mockArtists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

