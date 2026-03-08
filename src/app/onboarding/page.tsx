import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { artistSpecialties, priceRanges } from "@/lib/constants/site";

export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-16 md:px-8">
      <div className="space-y-3">
        <p className="eyebrow-chip w-max">Profile setup</p>
        <h1 className="font-display text-5xl text-white">
          Build a profile that feels bookable before the first inquiry arrives.
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
          The onboarding form keeps the artist in a confidence-building flow:
          identity first, then specialties, then pricing and public details.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="field-label">
                Full name
              </label>
              <Input id="fullName" placeholder="Jane Artist" />
            </div>
            <div>
              <label htmlFor="username" className="field-label">
                Username
              </label>
              <Input id="username" placeholder="jane_artist" />
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="field-label">
              Bio
            </label>
            <Textarea
              id="bio"
              placeholder="Describe your style, signature finish, and who you usually work with."
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="location" className="field-label">
                Location
              </label>
              <Input id="location" placeholder="Lagos" />
            </div>
            <div>
              <label htmlFor="instagram" className="field-label">
                Instagram handle
              </label>
              <Input id="instagram" placeholder="@yourhandle" />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="specialty" className="field-label">
                Specialty
              </label>
              <Select id="specialty" defaultValue="">
                <option value="" disabled>
                  Select a primary specialty
                </option>
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
                <option value="" disabled>
                  Select range
                </option>
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <Button size="lg">Save profile setup</Button>
        </Card>

        <Card className="space-y-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
            Publish rules
          </p>
          <ul className="space-y-3 text-sm leading-7 text-[var(--text-muted)]">
            <li>Full name and username are required on every save.</li>
            <li>Published profiles must also include location and at least one specialty.</li>
            <li>Optional text fields can be cleared by sending `null` or an empty string.</li>
            <li>User identity comes from the session cookie, never from client-supplied IDs.</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
