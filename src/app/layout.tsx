import type { Metadata } from "next";
import { Allura } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

const allura = Allura({
  subsets: ["latin"],
  variable: "--font-allura",
  weight: "400",
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
      <body className={allura.variable}>
        <div className="page-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
