import { Suspense } from "react";
import type { Metadata } from "next";
import { Terminal } from "lucide-react";
import ProjectGrid from "@/components/projects/Projectgrid";

export const metadata: Metadata = {
  title:       "Projects",
  description: "Classified intel archive — full-stack and AI projects by DEV_SYSTEM.",
};

/* Skeleton grid shown while DB query resolves */
function ProjectsSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card p-4 flex flex-col gap-4 animate-pulse">
          <div className="h-3 w-24 rounded bg-slate-800" />
          <div className="aspect-video w-full rounded bg-slate-800" />
          <div className="h-4 w-3/4 rounded bg-slate-800" />
          <div className="h-3 w-full  rounded bg-slate-800" />
          <div className="h-3 w-2/3  rounded bg-slate-800" />
          <div className="h-9 w-full  rounded bg-slate-800 mt-auto" />
        </div>
      ))}
    </>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">

      {/* ── Page Header ───────────────────────────────── */}
      <div className="border-b border-border bg-bg">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col gap-3">

          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-xs text-slate-500"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Terminal size={12} className="text-(--color-primary)" />
            <span className="text-(--color-primary)">~/classified-intel/projects/</span>
            <span className="animate-blink text-(--color-primary)">▌</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
           {" "}
            <span className="text-(--color-primary)">ARCHIVE</span>
          </h1>

          <div
            className="flex items-center gap-4 text-xs text-slate-500"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              SYSTEM ACCESS LEVEL: 5
            </span>
            <span className="text-yellow-500/70">
              WARNING: AUTHORIZED PERSONNEL ONLY
            </span>
          </div>
        </div>
      </div>

      {/* ── Project Grid ──────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<ProjectsSkeleton />}>
            <ProjectGrid />
          </Suspense>
        </div>
      </main>

      
    </div>
  );
}