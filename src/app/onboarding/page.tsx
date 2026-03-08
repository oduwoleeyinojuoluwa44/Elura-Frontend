import { OnboardingForm } from "@/components/forms/onboarding-form";

export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-16 md:px-8">
      <div className="space-y-3">
        <p className="eyebrow-chip w-max">Profile setup</p>
        <h1 className="font-display text-5xl text-white">
          Build a profile that feels bookable before the first inquiry arrives.
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
          The live onboarding flow saves directly to the artist profile endpoint, so this
          screen now behaves like product instead of placeholder scaffolding.
        </p>
      </div>

      <OnboardingForm />
    </div>
  );
}
