"use client";

import { useMemo } from "react";
import { SKILLS, type SkillCategory } from "@/data/skills";
import SkillCard from "./SkillCard";

const CATEGORY_LABELS: Record<string, string> = {
  frontend: "FRONTEND_MODULES",
  backend:  "BACKEND_INFRA",
  ai:       "AI_NEURAL_NETS",
  devops:   "DEVOPS_PIPELINE",
};

interface SkillGridProps {
  activeCategory: SkillCategory | "all";
}

export default function SkillGrid({ activeCategory }: SkillGridProps) {
  const grouped = useMemo(() => {
    const filtered =
      activeCategory === "all"
        ? SKILLS
        : SKILLS.filter((s) => s.category === activeCategory);
    return filtered.reduce<Record<string, typeof SKILLS>>((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});
  }, [activeCategory]);

  const ORDER: SkillCategory[] = ["frontend", "backend", "ai", "devops"];
  const visible = ORDER.filter((c) => grouped[c]?.length);

  return (
    <div className="flex flex-col gap-12">
      {visible.map((category) => (
        <section key={category}>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-4 w-4 rounded-sm bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/40 flex items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
            </span>
            <h2
              className="text-sm font-bold uppercase tracking-widest text-white"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {CATEGORY_LABELS[category]}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {grouped[category].map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} delay={i * 80} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}