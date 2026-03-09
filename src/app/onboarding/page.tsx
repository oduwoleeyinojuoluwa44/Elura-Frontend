import { OnboardingForm } from "@/components/forms/onboarding-form";

export default function OnboardingPage() {
  return (
    <div className="app-page space-y-8">
      <div className="app-intro">
        <p className="eyebrow-chip w-max">Profile setup</p>
        <h1 className="app-title">
          Shape the page clients will decide from.
        </h1>
        <p className="app-copy">
          Keep it direct. Name, city, specialties, price range, and a short sense of
          your taste are enough to make the page feel complete.
        </p>
      </div>

      <OnboardingForm />
    </div>
  );
}
