import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BackgroundEffect } from "@/components/graphics/background-effect";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="relative isolate overflow-hidden">
      <BackgroundEffect />

      <section className="relative min-h-screen">
        <div className="mx-auto flex min-h-screen max-w-[1200px] items-center justify-center px-5 pb-20 pt-28 md:px-8 md:pt-32">
          <div className="home-reveal relative w-full max-w-[800px] text-center">
            <div className="relative">
              <h1 className="mx-auto max-w-[780px] text-[2.5rem] font-semibold leading-[0.92] tracking-[-0.06em] text-white md:text-[4.5rem]">
                Stop chasing clients.
                <span className="mt-2 block text-[var(--accent-color)]">
                  Start getting chosen.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-[600px] text-[1rem] leading-8 text-[var(--text-muted)] md:text-[1.2rem]">
                <span className="font-script text-[2rem] leading-none text-[var(--brand-wordmark-color)] md:text-[2.35rem]">
                  Elura
                </span>{" "}
                gives artists a premium presence and gives vendors a quieter way to
                discover beauty talent worth booking.
              </p>

              <div className="mt-9">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="h-[46px] px-[1.65rem] text-[0.94rem]"
                    icon={<ArrowRight size={16} />}
                  >
                    Join as an artist
                  </Button>
                </Link>
              </div>

              <p className="mt-4 text-sm text-white/52">
                Vendors and planners can explore talent through{" "}
                <Link
                  href="/discover"
                  className="text-white/72 transition hover:text-[var(--accent-color)]"
                >
                  discovery
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
