import type { Metadata } from "next";
import HeroSection  from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";

export const metadata: Metadata = {
  title:       "Home",
  description: "Full-Stack AI Developer engineering the bridge between human intent and machine intelligence.",
};

export default function HomePage() {
  return (
    /*
     * No gap/padding here — the sticky hero needs the About section
     * to follow it directly in the DOM so the overlap scroll works.
     */
    <div>
      {/* Hero — sticky, stays pinned while About scrolls on top */}
      <HeroSection />

      {/* About — relative z-10 + solid bg so it covers the hero */}
      <AboutSection />
    </div>
  );
}