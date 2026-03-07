"use client";

import { useEffect, useState } from "react";

const WORDS = ["think", "learn", "adapt", "scale"];
const TYPE_SPEED   = 80;  // ms per character when typing
const DELETE_SPEED = 45;  // ms per character when deleting
const PAUSE_AFTER  = 1800; // ms to hold the completed word

type Phase = "typing" | "pausing" | "deleting";

export function useTypingAnimation() {
  const [displayed, setDisplayed] = useState("think");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase]         = useState<Phase>("pausing");

  useEffect(() => {
    const current = WORDS[wordIndex];

    /* ── PAUSING — hold the full word before deleting ── */
    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), PAUSE_AFTER);
      return () => clearTimeout(t);
    }

    /* ── DELETING — remove one character at a time ───── */
    if (phase === "deleting") {
      if (displayed.length === 0) {
        // Move to next word and start typing
        setWordIndex((i) => (i + 1) % WORDS.length);
        setPhase("typing");
        return;
      }
      const t = setTimeout(
        () => setDisplayed((d) => d.slice(0, -1)),
        DELETE_SPEED
      );
      return () => clearTimeout(t);
    }

    /* ── TYPING — add one character at a time ────────── */
    if (phase === "typing") {
      const nextWord = WORDS[wordIndex];
      if (displayed.length === nextWord.length) {
        setPhase("pausing");
        return;
      }
      const t = setTimeout(
        () => setDisplayed(nextWord.slice(0, displayed.length + 1)),
        TYPE_SPEED
      );
      return () => clearTimeout(t);
    }
  }, [displayed, wordIndex, phase]);

  return displayed;
}