import { OnboardingForm } from "@/components/forms/onboarding-form";

export default function OnboardingPage() {
  return (
    <div className="app-page space-y-8">
      <div className="app-intro">
        <p className="eyebrow-chip w-max">Profile setup</p>
        <h1 className="app-title">
          Build the page clients will choose from.
        </h1>
        <p className="app-copy">
          Save the draft first, add the portfolio images that prove the work, then
          publish once the page feels complete.
        </p>
      </div>

      <OnboardingForm />
    </div>
  );
}
