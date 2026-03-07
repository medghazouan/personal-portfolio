import type { Metadata } from "next";
import { Terminal } from "lucide-react";
import CategoryFilter from "@/components/arsenal/CategoryFilter";

export const metadata: Metadata = {
  title:       "Arsenal",
  description: "Technical Arsenal — deployment-ready toolchain for intelligent systems.",
};

export default function ArsenalPage() {
  return (
    <div className="min-h-screen">

      {/* ── Page Header ───────────────────────────────── */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-3">

          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-xs text-slate-500"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Terminal size={12} className="text-[var(--color-primary)]" />
            <span className="text-[var(--color-primary)]">~/stack/arsenal/</span>
            <span className="animate-blink text-[var(--color-primary)]">|</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            TECHNICAL{" "}
            <span className="text-[var(--color-primary)]">ARSENAL</span>
          </h1>

          <p
            className="text-slate-400 text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Deployment-ready toolchain for intelligent systems.{" "}
            <span className="text-slate-600">{'// v4.2.0-stable'}</span>
          </p>
        </div>
      </div>

      {/* ── Skills Grid ───────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <CategoryFilter />
      </main>

      
    </div>
  );
}