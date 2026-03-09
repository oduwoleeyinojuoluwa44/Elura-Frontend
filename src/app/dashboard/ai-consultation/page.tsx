import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { mockConsultationPack } from "@/lib/constants/mock-data";
import { aiFormOptions, eventTypes } from "@/lib/constants/site";

export default function AiConsultationPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-16 md:px-8">
      <div className="space-y-3">
        <p className="eyebrow-chip w-max">AI consultation pack</p>
        <h1 className="font-display text-5xl text-white">
          Utility-first prep for calmer appointments and sharper service.
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
          This workflow is still a preview. The structure is here so the eventual AI
          experience feels useful the moment it opens.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="space-y-5">
          <div>
            <label htmlFor="eventType" className="field-label">
              Event type
            </label>
            <Select id="eventType" defaultValue="">
              <option value="" disabled>
                Select event type
              </option>
              {eventTypes.map((eventType) => (
                <option key={eventType} value={eventType.toLowerCase()}>
                  {eventType}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label htmlFor="skinType" className="field-label">
              Skin type
            </label>
            <Select id="skinType" defaultValue="">
              <option value="" disabled>
                Select skin type
              </option>
              {aiFormOptions.skinTypes.map((skinType) => (
                <option key={skinType} value={skinType.toLowerCase()}>
                  {skinType}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label htmlFor="finish" className="field-label">
              Desired finish
            </label>
            <Select id="finish" defaultValue="">
              <option value="" disabled>
                Select finish
              </option>
              {aiFormOptions.finishes.map((finish) => (
                <option key={finish} value={finish.toLowerCase()}>
                  {finish}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label htmlFor="timeConstraint" className="field-label">
              Time constraint
            </label>
            <Input id="timeConstraint" placeholder="Ready by 8 AM" />
          </div>
          <div>
            <label htmlFor="notes" className="field-label">
              Notes
            </label>
            <Textarea id="notes" placeholder="Outdoor ceremony, humid venue, client prefers soft glow." />
          </div>
          <Button size="lg" disabled>
            Generate consultation pack
          </Button>
        </Card>

        <div className="grid gap-5 md:grid-cols-2">
          <Card className="space-y-4">
            <h2 className="font-display text-3xl text-white">Questionnaire</h2>
            <ul className="space-y-3 text-sm leading-7 text-[var(--text-muted)]">
              {mockConsultationPack.questionnaire.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </Card>
          <Card className="space-y-4">
            <h2 className="font-display text-3xl text-white">Prep message</h2>
            <p className="text-sm leading-7 text-[var(--text-muted)]">
              {mockConsultationPack.prepMessage}
            </p>
          </Card>
          <Card className="space-y-4">
            <h2 className="font-display text-3xl text-white">Kit checklist</h2>
            <ul className="space-y-3 text-sm leading-7 text-[var(--text-muted)]">
              {mockConsultationPack.kitChecklist.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </Card>
          <Card className="space-y-4">
            <h2 className="font-display text-3xl text-white">Timeline + tips</h2>
            <ul className="space-y-3 text-sm leading-7 text-[var(--text-muted)]">
              {mockConsultationPack.timeline.concat(mockConsultationPack.artistTips).map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
