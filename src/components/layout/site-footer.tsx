import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-black/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-[var(--text-muted)] md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-2xl text-white">Elura</p>
          <p className="mt-2 max-w-md leading-6">
            Premium discovery and public profile infrastructure for makeup artists.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/discover" className="transition hover:text-white">
            Discover artists
          </Link>
          <Link href="/dashboard" className="transition hover:text-white">
            Dashboard
          </Link>
          <Link href="/onboarding" className="transition hover:text-white">
            Profile setup
          </Link>
        </div>
      </div>
    </footer>
  );
}
