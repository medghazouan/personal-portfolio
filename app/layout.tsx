import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar         from "@/components/layout/Navbar";
import Footer         from "@/components/layout/Footer";
import ScanlineOverlay from "@/components/ui/ScanlineOverlay";
import PageLoader     from "@/components/ui/PageLoader";
import PageTransition from "@/components/ui/PageTransition";

/* ── Fonts ─────────────────────────────────────────────── */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

/* ── Metadata ───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "DEV_SYSTEM // Portfolio",
    template: "%s // DEV_SYSTEM",
  },
  description:
    "Full-Stack AI Developer engineering the bridge between human intent and machine intelligence.",
  keywords: ["Full Stack Developer", "AI Developer", "Next.js", "Portfolio"],
  authors: [{ name: "DEV_SYSTEM" }],
  openGraph: {
    type: "website",
    siteName: "DEV_SYSTEM",
    title: "DEV_SYSTEM // Portfolio",
    description:
      "Full-Stack AI Developer engineering the bridge between human intent and machine intelligence.",
  },
  robots: { index: true, follow: true },
};

/* ── Root Layout ────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="crt-flicker">

        {/* Boot loader overlay — shows on first visit */}
        <PageLoader />

        {/* CRT scanline effect */}
        <ScanlineOverlay />

        {/* Site shell */}
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="grow">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>

      </body>
    </html>
  );
}