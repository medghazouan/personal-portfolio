"use client";

import { useEffect, useRef, useState, RefObject } from "react";

interface Options {
  threshold?: number;  // 0–1, how much of element must be visible
  once?:      boolean; // if true, never re-hides after reveal
}

interface ScrollRevealReturn<T extends HTMLElement = HTMLDivElement> {
  ref: RefObject<T>;
  visible: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
): ScrollRevealReturn<T> {
  const { threshold = 0.15, once = true } = options;
  const ref       = useRef<T>(null!);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, visible };
}