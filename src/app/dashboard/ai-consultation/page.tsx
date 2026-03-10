import { FeatureUnavailable } from "@/components/ui/feature-unavailable";

export default function AiConsultationPage() {
  return (
    <FeatureUnavailable
      eyebrow="AI consultation"
      title="The consultation tool is not active yet."
      description="The artist profile flow is live now. AI consultation stays offline until the generation contract is fully available."
      href="/dashboard"
      actionLabel="Back to dashboard"
    />
  );
}
