import Link from "next/link";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/constants/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-[rgba(11,11,15,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-[var(--accent-color)]">
            E
          </div>
          <div>
            <p className="font-display text-2xl leading-none text-white">Elura</p>
            <p className="text-xs uppercase tracking-[0.24em] text-white/35">
              beauty booking
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-muted)] transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/signup" className="hidden md:block">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/signup">
            <Button>Join as artist</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

