"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AuthActions } from "@/components/layout/auth-actions";
import { navLinks } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith("/signup");
  const isLandingRoute = pathname === "/";

  if (isLandingRoute) {
    return (
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
        <div className="mx-auto max-w-[1200px] px-5 py-6 md:px-8 md:py-7">
          <Link href="/" className="pointer-events-auto inline-block">
            <span className="brand-wordmark text-[2.9rem] md:text-[4rem]">
              Elura.
            </span>
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 backdrop-blur-[24px]",
        isAuthRoute
          ? "bg-[rgba(11,11,15,0.18)]"
          : "border-b border-white/6 bg-[rgba(11,11,15,0.42)]",
      )}
    >
      <div
        className={cn(
          "mx-auto flex items-center gap-6 px-5 py-4 md:px-8",
          isAuthRoute ? "max-w-[1200px] justify-center sm:justify-start" : "max-w-[1200px] justify-between",
        )}
      >
        <Link href="/" className="inline-block">
          <span className="brand-wordmark text-[2.3rem] md:text-[2.85rem]">Elura.</span>
        </Link>

        {isAuthRoute ? null : (
          <>
            <nav className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--text-muted)] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <AuthActions />
          </>
        )}
      </div>
    </header>
  );
}
