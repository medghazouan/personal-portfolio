"use client";

import { useState } from "react";
import { SKILL_CATEGORIES, type SkillCategory } from "@/data/skills";
import SkillGrid from "./SkillGrid";

export default function CategoryFilter() {
  const [active, setActive] = useState<SkillCategory | "all">("all");

  return (
    <div className="flex flex-col gap-8">

      {/* ── Filter Tabs ───────────────────────────────── */}
      <div className="flex flex-wrap gap-2">
        {SKILL_CATEGORIES.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`px-4 py-2 rounded text-xs uppercase tracking-widest transition-all duration-200
                ${isActive
                  ? "bg-[var(--color-primary)] text-[var(--color-bg)] font-bold shadow-[var(--shadow-glow)]"
                  : "border border-[var(--color-border)] text-slate-400 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* ── Grid — re-renders on tab change ───────────── */}
      <SkillGrid activeCategory={active} />
    </div>
  );
}