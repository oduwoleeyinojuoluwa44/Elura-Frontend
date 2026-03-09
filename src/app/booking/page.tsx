import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { eventTypes } from "@/lib/constants/site";

export default function BookingPage() {
  return (
    <div className="app-page space-y-8">
      <div className="app-intro">
        <p className="eyebrow-chip w-max">Structured inquiry</p>
        <h1 className="app-title">
          A booking form that feels fast, clear, and serious.
        </h1>
        <p className="app-copy">
          This part of Elura is still opening up. The shape is here so the future
          request flow can feel clean from day one.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="clientName" className="field-label">
                Client name
              </label>
              <Input id="clientName" placeholder="Client Name" />
            </div>
            <div>
              <label htmlFor="clientEmail" className="field-label">
                Email
              </label>
              <Input id="clientEmail" type="email" placeholder="client@example.com" />
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="clientPhone" className="field-label">
                Phone
              </label>
              <Input id="clientPhone" type="tel" placeholder="+2348000000000" />
            </div>
            <div>
              <label htmlFor="eventType" className="field-label">
                Event type
              </label>
              <Select id="eventType" defaultValue="">
                <option value="" disabled>
                  Select an event type
                </option>
                {eventTypes.map((eventType) => (
                  <option key={eventType} value={eventType.toLowerCase()}>
                    {eventType}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <label htmlFor="eventDate" className="field-label">
              Event date
            </label>
            <Input id="eventDate" type="date" />
          </div>
          <div>
            <label htmlFor="message" className="field-label">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Share the event context, preferred finish, venue timing, and anything the artist should prepare for."
            />
          </div>
          <Button size="lg" disabled>
            Send booking request
          </Button>
        </Card>

        <Card className="space-y-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
            Coming soon
          </p>
          <div className="space-y-4 text-sm leading-7 text-[var(--text-muted)]">
            <p>
              Soon, clients will be able to send clear event details without the usual
              back-and-forth in DMs.
            </p>
            <p>
              The goal is simple: one thoughtful request, one calm response, and a much
              better first interaction for both sides.
            </p>
            <p>
              Until then, this page stays as a preview of the direction rather than a
              live submission flow.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
