"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, Unlock, MonitorPlay, Code2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import DecryptAnimation from "./DecryptAnimation";
import type { IProject } from "@/models/Project";

/* Serializable version of IProject (no Mongoose Document methods) */
export interface ProjectData {
  _id:         string;
  title:       string;
  slug:        string;
  description: string;
  longDesc?:   string;
  thumbnail?:  string;
  tags:        string[];
  category:    string;
  status:      "locked" | "unlocked";
  liveUrl?:    string;
  sourceUrl?:  string;
  encryption?: string;
  featured:    boolean;
  index:       number; // for SECURE_FILE_XX label
}

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isLocked = project.status === "locked";
  const [decrypting, setDecrypting] = useState(false);
  const [decrypted,  setDecrypted]  = useState(false);

  const fileLabel = `SECURE_FILE_${String(project.index).padStart(2, "0")}`;

  function handleDecrypt() {
    if (decrypted || decrypting) return;
    setDecrypting(true);
    // After scramble finishes, mark as decrypted
    setTimeout(() => {
      setDecrypting(false);
      setDecrypted(true);
    }, 900);
  }

  const showFull = !isLocked || decrypted;

  return (
    <article className="card group relative flex flex-col overflow-hidden">

      {/* Stretched link overlay — navigates to detail page when unlocked */}
      {showFull && (
        <Link
          href={`/projects/${project.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`View ${project.title} details`}
        />
      )}


      {/* ── File label + lock icon ───────────────────── */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <span
          className="text-[10px] uppercase tracking-widest text-slate-500"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {fileLabel}
        </span>
        {isLocked && !decrypted ? (
          <Lock size={14} className="text-slate-600" />
        ) : (
          <Unlock size={14} className="text-[var(--color-primary)]" />
        )}
      </div>

      {/* ── Thumbnail ───────────────────────────────── */}
      <div className="relative mx-4 overflow-hidden rounded" style={{ aspectRatio: "16/9" }}>
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          /* Placeholder when no thumbnail yet */
          <div className="absolute inset-0 bg-[var(--color-surface-2)] flex items-center justify-center">
            <span
              className="text-xs text-slate-600 uppercase tracking-widest"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {isLocked && !decrypted ? "// RESTRICTED" : "// NO_THUMBNAIL"}
            </span>
          </div>
        )}

        {/* Locked overlay */}
        {isLocked && !decrypted && (
          <div className="absolute inset-0 bg-[var(--color-bg)]/70 backdrop-blur-sm flex items-center justify-center">
            <span
              className="border border-red-500/40 text-red-400 text-xs px-3 py-1 rounded uppercase tracking-widest"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              RESTRICTED
            </span>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-2 right-2">
            <span
              className="bg-[var(--color-primary)] text-[var(--color-bg)] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              v2.4.0
            </span>
          </div>
        )}
      </div>

      {/* ── Body ────────────────────────────────────── */}
      <div className="flex flex-col gap-3 p-4 flex-grow">

        {/* Title — links to detail page */}
        <h3 className="text-base font-bold text-slate-300">
          <span className="text-slate-500 mr-1" style={{ fontFamily: "var(--font-mono)" }}>
            PROJECT:{" "}
          </span>
          <DecryptAnimation
            text={project.title.toUpperCase()}
            play={decrypting}
            className="text-white"
          />
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed">
          {project.description}
        </p>

        {/* Long description — only when unlocked */}
        {showFull && project.longDesc && (
          <div className="border-l-2 border-[var(--color-primary)]/40 pl-3">
            <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-1"
              style={{ fontFamily: "var(--font-mono)" }}>
              PROBLEM PARAMETERS
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">{project.longDesc}</p>
          </div>
        )}

        {/* Tags */}
        {showFull && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {project.tags.map((tag: string) => (
              <Badge key={tag} label={tag} />
            ))}
          </div>
        )}
      </div>

      {/* ── Footer / Actions ────────────────────────── */}
      <div className="px-4 pb-4 flex flex-col gap-2 mt-auto">

        {/* Unlocked — show action buttons */}
        {showFull ? (
          <div className="flex gap-2 flex-wrap">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 glow-btn glow-btn-outline px-4 py-2 text-xs flex items-center gap-1.5"
              >
                <MonitorPlay size={13} /> DEMO
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 glow-btn glow-btn-outline px-4 py-2 text-xs flex items-center gap-1.5"
              >
                <Code2 size={13} /> SOURCE
              </a>
            )}
          </div>
        ) : (
          /* Locked — show decrypt button */
          <button
            onClick={handleDecrypt}
            disabled={decrypting}
            className="relative z-20 glow-btn glow-btn-outline w-full justify-center py-2.5 text-xs disabled:opacity-60 disabled:cursor-wait"
          >
            <Lock size={13} className="mr-1.5" />
            {decrypting ? "DECRYPTING..." : "DECRYPT_DATA"}
          </button>
        )}

        {/* Encryption label for locked cards */}
        {isLocked && !decrypted && project.encryption && (
          <p
            className="text-[10px] text-center text-slate-600 uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ENCRYPTION: {project.encryption}{' // STATUS:'}{" "}
            <span className={decrypted ? "text-emerald-500" : "text-red-500/60"}>
              {decrypted ? "UNLOCKED" : "LOCKED"}
            </span>
          </p>
        )}
      </div>
    </article>
  );
}