"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

/*
 * Hard cut + chromatic aberration
 *
 * On route change:
 *   0ms       — instant cut (content hidden)
 *   0→80ms    — 3 RGB ghost layers slam in offset from each other
 *               red shifts left, blue shifts right, green stays center
 *               simulates a CRT beam mis-alignment / signal corruption
 *   80→180ms  — ghosts converge back to center and fade out
 *               new page snaps in underneath
 *   180ms     — clean, idle
 */

type Phase = "idle" | "cut" | "settle";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname              = usePathname();
  const [phase, setPhase]     = useState<Phase>("idle");
  const [display, setDisplay] = useState(children);
  const prevPath              = useRef(pathname);
  const timers                = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => timers.current.forEach(clearTimeout);

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;
    clear();

    const t: ReturnType<typeof setTimeout>[] = [];

    // Hard cut — swap content immediately, start aberration
    setDisplay(children);
    setPhase("cut");

    // Converge
    t.push(setTimeout(() => setPhase("settle"), 80));

    // Done
    t.push(setTimeout(() => setPhase("idle"), 220));

    timers.current = t;
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (phase === "idle") setDisplay(children);
  }, [children, phase]);

  const isActive = phase === "cut" || phase === "settle";
  const settling = phase === "settle";

  return (
    <div className="relative">

      {/* ── Chromatic aberration layers ── */}
      {isActive && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden">

          {/* Red channel — shifts left on cut, converges on settle */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:  "inherit",
              mixBlendMode:     "screen",
              backgroundColor:  "rgba(255,0,60,0.06)",
              transform:        settling ? "translateX(0)" : "translateX(-8px)",
              transition:       settling ? "transform 140ms cubic-bezier(0.2,0,0,1), opacity 140ms ease" : "none",
              opacity:          settling ? 0 : 1,
            }}
          />

          {/* Blue channel — shifts right */}
          <div
            className="absolute inset-0"
            style={{
              mixBlendMode:    "screen",
              backgroundColor: "rgba(0,100,255,0.06)",
              transform:       settling ? "translateX(0)" : "translateX(8px)",
              transition:      settling ? "transform 140ms cubic-bezier(0.2,0,0,1), opacity 140ms ease" : "none",
              opacity:         settling ? 0 : 1,
            }}
          />

          {/* Green channel — shifts up slightly */}
          <div
            className="absolute inset-0"
            style={{
              mixBlendMode:    "screen",
              backgroundColor: "rgba(0,201,167,0.04)",
              transform:       settling ? "translateY(0)" : "translateY(-4px)",
              transition:      settling ? "transform 140ms cubic-bezier(0.2,0,0,1), opacity 140ms ease" : "none",
              opacity:         settling ? 0 : 1,
            }}
          />

          {/* Scanline flash — single bright horizontal band that fades */}
          <div
            className="absolute inset-x-0"
            style={{
              top:             "50%",
              height:          settling ? "100vh" : "2px",
              transform:       "translateY(-50%)",
              background:      "linear-gradient(90deg, transparent, rgba(0,201,167,0.15), transparent)",
              opacity:         settling ? 0 : 0.8,
              transition:      settling ? "opacity 100ms ease, height 140ms ease" : "none",
            }}
          />

          {/* Noise vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
              opacity:    settling ? 0 : 1,
              transition: settling ? "opacity 120ms ease" : "none",
            }}
          />
        </div>
      )}

      {/* ── Page content ── */}
      <div
        style={{
          opacity:    phase === "cut" ? 0.6 : 1,
          transform:  phase === "cut" ? "scale(1.004)" : "scale(1)",
          transition: phase === "settle"
            ? "opacity 160ms ease, transform 160ms cubic-bezier(0.2,0,0,1)"
            : "none",
          filter:     phase === "cut" ? "brightness(1.3)" : "brightness(1)",
        }}
      >
        {display}
      </div>

    </div>
  );
}