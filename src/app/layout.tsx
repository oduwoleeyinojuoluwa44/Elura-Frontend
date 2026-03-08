import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Elura",
    template: "%s | Elura",
  },
  description:
    "Premium discovery and booking platform for makeup artists, built around portfolios, trust, and structured booking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable}`}>
        <div className="page-shell">
          <div className="ambient-orb left-[-120px] top-14 h-80 w-80 bg-[var(--accent-color)]" />
          <div className="ambient-orb right-[-90px] top-72 h-72 w-72 bg-[#fce4ea]" />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
