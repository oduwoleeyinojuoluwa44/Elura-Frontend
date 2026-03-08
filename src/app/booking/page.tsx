import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { eventTypes } from "@/lib/constants/site";

export default function BookingPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-5 py-16 md:px-8">
      <div className="space-y-3">
        <p className="eyebrow-chip w-max">Structured inquiry</p>
        <h1 className="font-display text-5xl text-white">
          A booking form that feels fast, clear, and serious.
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
          The request payload follows the documented `camelCase` contract and is
          ready to map to the reserved booking endpoint when the backend behavior
          becomes fully implemented.
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
          <Button size="lg">Send booking request</Button>
        </Card>

        <Card className="space-y-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
            Backend contract reminder
          </p>
          <div className="space-y-4 text-sm leading-7 text-[var(--text-muted)]">
            <p>
              `POST /api/booking-requests` is currently reserved, so the form
              should not promise successful submission in production yet.
            </p>
            <p>
              Frontend handling is still ready: user-fixable `400` errors,
              visible success state once implemented, and a clear feature-not-ready
              fallback for `501`.
            </p>
            <p>
              The contract supports optional `clientEmail`, `clientPhone`, and
              `eventDate`, while keeping the message required.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
