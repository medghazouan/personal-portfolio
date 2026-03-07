"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SOCIAL_LINKS = [
  { href: "https://github.com/medghazouan",                                        label: "GITHUB"   },
  { href: "https://linkedin.com/in/mohamed-ghazouan",                              label: "LINKEDIN" },
  { href: "https://mail.google.com/mail/?view=cm&to=ghazouanmohamed02@gmail.com",  label: "GMAIL"    },
];

export default function Footer() {
  const [latency, setLatency] = useState<number | null>(null);

  useEffect(() => {
    const run = async () => {
      const t0 = performance.now();
      try {
        await fetch("/api/health", {
          next: { revalidate: 60 },
        } as RequestInit);
        setLatency(Math.round(performance.now() - t0));
      } catch {
        setLatency(null);
      }
    };
    run();
  }, []);

  return (
    <footer className="w-full border-t border-border bg-bg py-4 px-6">
      <div
        className="mx-auto flex max-w-7xl flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-500"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          <span>© {new Date().getFullYear()} DEV_SYSTEM</span>
          <span className="hidden md:inline text-slate-700">|</span>
          {latency !== null ? (
            <span className="hidden md:inline text-emerald-500">
              LATENCY: {latency}ms
            </span>
          ) : (
            <span className="hidden md:inline text-slate-600">
              LATENCY: —
            </span>
          )}
        </div>

        {/* Right — social links */}
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-(--color-primary) transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
