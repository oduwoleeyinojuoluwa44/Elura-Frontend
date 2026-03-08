import { DiscoverDirectory } from "@/components/discover/discover-directory";
import { SectionHeading } from "@/components/sections/section-heading";

export default function DiscoverPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-16 md:px-8">
      <SectionHeading
        eyebrow="Client discovery"
        title="Browse artists with clarity instead of guessing through social noise."
        description="This screen now runs against the published artist directory endpoint with the exact filters supported by the current backend."
      />

      <DiscoverDirectory />
    </div>
  );
}
