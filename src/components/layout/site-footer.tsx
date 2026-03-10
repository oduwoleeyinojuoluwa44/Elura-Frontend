"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/" || pathname.startsWith("/signup")) {
    return null;
  }

  return (
    <footer className="border-t border-white/8 bg-[rgba(11,11,15,0.42)] backdrop-blur-[18px]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-10 text-sm text-[var(--text-muted)] md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="brand-wordmark text-[2.1rem]">Elura.</p>
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
            Profile studio
          </Link>
        </div>
      </div>
    </footer>
  );
}
