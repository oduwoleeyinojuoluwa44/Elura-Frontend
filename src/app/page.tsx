import Link from "next/link";
import { ArrowUpRight, Sparkles, Stars, WandSparkles } from "lucide-react";

import { ArtistCard } from "@/components/cards/artist-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockArtists } from "@/lib/constants/mock-data";

const valueProps = [
  {
    title: "Portfolio-first identity",
    description:
      "Showcase artistry in a space built for trust, not algorithms or casual social posting.",
  },
  {
    title: "Professional discovery",
    description:
      "Clients can compare artists by location, specialty, and price range without DM friction.",
  },
  {
    title: "Structured booking",
    description:
      "Move inquiries out of chaotic chats into a format artists can respond to with confidence.",
  },
];

export default function HomePage() {
  return (
    <div className="pb-24">
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-16">
        <div className="space-y-8">
          <div className="eyebrow-chip">Premium beauty x minimal product</div>
          <div className="max-w-3xl space-y-5">
            <h1 className="font-display text-5xl leading-none text-white md:text-7xl">
              Where makeup artists finally look as professional as their work.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--text-muted)] md:text-lg">
              Elura replaces the Instagram workaround with a premium booking
              platform built around portfolio quality, structured discovery, and
              clean client requests.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" icon={<Sparkles size={16} />}>
                Join as an artist
              </Button>
            </Link>
            <Link href="/discover">
              <Button size="lg" variant="secondary" icon={<ArrowUpRight size={16} />}>
                Browse artists
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
                MVP traction
              </p>
              <p className="font-display text-4xl">50+</p>
              <p className="text-sm leading-6 text-[var(--text-muted)]">
                Artist profiles targeted for the first onboarding wave.
              </p>
            </Card>
            <Card className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
                Booking target
              </p>
              <p className="font-display text-4xl">20+</p>
              <p className="text-sm leading-6 text-[var(--text-muted)]">
                Structured requests submitted in the first MVP cycle.
              </p>
            </Card>
            <Card className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
                AI utility
              </p>
              <p className="font-display text-4xl">1</p>
              <p className="text-sm leading-6 text-[var(--text-muted)]">
                Consultation-pack workflow for premium appointment preparation.
              </p>
            </Card>
          </div>
        </div>

        <Card className="relative overflow-hidden border-white/12 p-0">
          <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5 border-b border-white/10 p-6 md:border-b-0 md:border-r">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
                Artist journey
              </p>
              <ol className="space-y-4 text-sm text-[var(--text-muted)]">
                <li>01. Sign up with email and secure session setup.</li>
                <li>02. Build a polished public profile with specialties and pricing.</li>
                <li>03. Upload portfolio work and turn the profile into a booking surface.</li>
                <li>04. Get discovered by clients browsing with confidence.</li>
              </ol>
              <Link href="/dashboard/ai-consultation" className="inline-flex">
                <Button variant="ghost" icon={<WandSparkles size={16} />}>
                  View AI workflow
                </Button>
              </Link>
            </div>
            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
                    Discovery preview
                  </p>
                  <h2 className="mt-2 font-display text-4xl text-white">
                    Trust starts with the work.
                  </h2>
                </div>
                <Stars className="text-[var(--accent-color)]" />
              </div>
              <div className="grid gap-4">
                {mockArtists.slice(0, 2).map((artist) => (
                  <div
                    key={artist.id}
                    className="rounded-[24px] border border-white/10 bg-black/25 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-white">
                          {artist.fullName}
                        </p>
                        <p className="text-sm text-[var(--text-muted)]">
                          {artist.location} · {artist.specialty.join(", ")}
                        </p>
                      </div>
                      <span className="rounded-full bg-white/6 px-3 py-1 text-xs text-white/80">
                        {artist.priceRange}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-5 py-16 md:px-8">
        <SectionHeading
          eyebrow="Why Elura"
          title="A disciplined MVP built around trust, bookings, and portfolio quality."
          description="The product avoids social-feed noise and generic marketplace clutter. Every screen points the artist toward professional identity and the client toward confident booking."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {valueProps.map((item) => (
            <Card key={item.title} className="space-y-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--accent-color)]">
                Core value
              </p>
              <h3 className="font-display text-3xl text-white">{item.title}</h3>
              <p className="text-sm leading-7 text-[var(--text-muted)]">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-5 py-16 md:px-8">
        <SectionHeading
          eyebrow="Artist preview"
          title="Discovery cards that prioritize the signals clients actually use."
          description="Location, specialty, price range, and portfolio confidence are built into the first glance."
          action={
            <Link href="/discover">
              <Button variant="secondary">Open discovery</Button>
            </Link>
          }
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {mockArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
}
