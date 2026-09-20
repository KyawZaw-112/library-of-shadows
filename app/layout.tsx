import type { Metadata } from "next";
import { Fraunces, Figtree } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import SiteShell from "@/components/SiteShell";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

const body = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Library of Shadows — Find your next story",
  description:
    "A modern, minimal bookshop for university students, young adults, and English learners in Bangkok.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body className="font-body font-light antialiased" suppressHydrationWarning>
        <div className="grain" aria-hidden />
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
