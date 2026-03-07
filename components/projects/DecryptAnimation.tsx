"use client";

import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEF0123456789@#$%&*!?<>/\\|[]{}";
const SCRAMBLE_DURATION = 800; // ms total scramble time
const SCRAMBLE_INTERVAL = 40;  // ms between character swaps

interface DecryptAnimationProps {
  text:     string;
  play:     boolean;        // trigger the animation
  className?: string;
}

export default function DecryptAnimation({
  text,
  play,
  className = "",
}: DecryptAnimationProps) {
  const [displayed, setDisplayed] = useState(text);
  const frameRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef  = useRef<number | null>(null);

  // Handle animation loop
  useEffect(() => {
    if (!play) {
      return;
    }

    startRef.current = Date.now();

    frameRef.current = setInterval(() => {
      const elapsed  = Date.now() - (startRef.current ?? 0);
      const progress = Math.min(elapsed / SCRAMBLE_DURATION, 1);
      // Reveal left-to-right as progress increases
      const revealCount = Math.floor(progress * text.length);

      setDisplayed(
        text
          .split("")
          .map((char: string, i: number) => {
            if (char === " ") return " ";
            if (i < revealCount) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (progress >= 1) {
        clearInterval(frameRef.current!);
        setDisplayed(text);
      }
    }, SCRAMBLE_INTERVAL);

    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [play, text]);

  // Handle reset when animation stops
  useEffect(() => {
    if (!play) {
      setDisplayed(text);
      if (frameRef.current) {
        clearInterval(frameRef.current);
      }
    }
  }, [play, text]);

  return (
    <span
      className={className}
      style={{ fontFamily: "var(--font-mono)" }}
      aria-label={text}
    >
      {displayed}
    </span>
  );
}