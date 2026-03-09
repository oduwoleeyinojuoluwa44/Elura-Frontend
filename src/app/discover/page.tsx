import { DiscoverDirectory } from "@/components/discover/discover-directory";
import { SectionHeading } from "@/components/sections/section-heading";

export default function DiscoverPage() {
  return (
    <div className="app-page space-y-8">
      <SectionHeading
        eyebrow="Client discovery"
        title="Browse artists with clarity instead of guessing through social noise."
        description="Filter by city, specialty, and price range to find artists with a clearer first impression."
      />

      <DiscoverDirectory />
    </div>
  );
}
