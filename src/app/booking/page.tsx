import { FeatureUnavailable } from "@/components/ui/feature-unavailable";

export default function BookingPage() {
  return (
    <FeatureUnavailable
      eyebrow="Booking requests"
      title="Booking is not active yet."
      description="Artist discovery and public profiles are live. Booking requests stay offline until the submission flow is fully available."
      href="/discover"
      actionLabel="Browse artists"
    />
  );
}
