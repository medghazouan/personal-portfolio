"use client";

import { useEffect, useRef, useState } from "react";
import {
  Atom, Wind, Code2, Triangle, Server, Database, Layers,
  GitMerge, Flame, Activity, Sparkles, Cpu, Box, Cloud,
  Infinity, Monitor,
} from "lucide-react";
import type { Skill } from "@/data/skills";

const ICON_MAP: Record<string, React.ElementType> = {
  "atom": Atom, "wind": Wind, "code-2": Code2, "triangle": Triangle,
  "server": Server, "database": Database, "layers": Layers,
  "git-merge": GitMerge, "flame": Flame, "activity": Activity,
  "sparkles": Sparkles, "cpu": Cpu, "box": Box, "cloud": Cloud,
  "infinity": Infinity, "monitor": Monitor,
};

interface SkillCardProps { skill: Skill; delay?: number; }

export default function SkillCard({ skill, delay = 0 }: SkillCardProps) {
  const [filled, setFilled] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFilled(true); },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const IconComponent = ICON_MAP[skill.icon] ?? Monitor;

  return (
    <div
      ref={cardRef}
      className="card group p-5 flex flex-col gap-3 animate-fade-up"
      style={{ animationDelay: delay + "ms", animationFillMode: "both" }}
    >
      <div className="flex items-start justify-between">
        <div className="p-2 rounded border border-[var(--color-border)] text-slate-400 group-hover:text-[var(--color-primary)] group-hover:border-[var(--color-primary)]/40 transition-colors duration-200">
          <IconComponent size={18} />
        </div>
        <span
          className="text-[10px] text-slate-600 border border-[var(--color-border)] px-1.5 py-0.5 rounded"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {skill.version}
        </span>
      </div>
      <div>
        <h3 className="font-bold text-white text-sm group-hover:text-[var(--color-primary)] transition-colors duration-200">
          {skill.name}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{skill.description}</p>
      </div>
      <div className="mt-auto">
        <div
          className="flex justify-between items-center mb-1.5 text-[10px] uppercase tracking-widest text-slate-600"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span>Proficiency</span>
          <span className="text-[var(--color-primary)]">{skill.proficiency}%</span>
        </div>
        <div className="h-[2px] w-full rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-1000 ease-out"
            style={{ width: filled ? skill.proficiency + "%" : "0%" }}
          />
        </div>
      </div>
    </div>
  );
}