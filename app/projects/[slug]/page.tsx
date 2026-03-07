import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MonitorPlay, Code2, Terminal, Lock } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import Badge from "@/components/ui/Badge";
import ImageGallery from "@/components/projects/ImageGallery";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  try {
    await connectDB();
    const doc = await Project.findOne({ slug }).lean();
    if (!doc) return null;
    return {
      _id:         doc._id.toString(),
      title:       doc.title,
      slug:        doc.slug,
      description: doc.description,
      longDesc:    doc.longDesc ?? null,
      thumbnail:   doc.thumbnail ?? null,
      images:      (doc.images ?? []) as string[],
      tags:        doc.tags,
      category:    doc.category,
      status:      doc.status,
      liveUrl:     doc.liveUrl ?? null,
      sourceUrl:   doc.sourceUrl ?? null,
      encryption:  doc.encryption ?? null,
      featured:    doc.featured,
      createdAt:   new Date(doc.createdAt).toISOString(),
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Not Found" };
  return {
    title:       project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const isLocked = project.status === "locked";
  const date = new Date(project.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "2-digit",
  });

  return (
    <div className="min-h-screen">

      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col gap-4">

          {/* Back link */}
          <Link
            href="/projects"
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-[var(--color-primary)] transition-colors w-fit"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <ArrowLeft size={12} />
            BACK_TO_ARCHIVE
          </Link>

          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-xs text-slate-600"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Terminal size={11} className="text-[var(--color-primary)]" />
            <span className="text-[var(--color-primary)]">~/classified-intel/projects/</span>
            <span className="text-slate-400">{project.slug}</span>
            <span className="animate-blink text-[var(--color-primary)]">▌</span>
          </div>

          {/* Title row */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                {isLocked
                  ? <Lock size={16} className="text-red-400" />
                  : <span className="h-2 w-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_rgba(0,201,167,0.6)]" />
                }
                <span
                  className="text-[10px] text-slate-600 uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {isLocked ? `ENCRYPTED // ${project.encryption ?? "CLASSIFIED"}` : "DECRYPTED // ACCESS GRANTED"}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white">
                <span
                  className="text-slate-500 mr-2 text-lg"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  PROJECT:{" "}
                </span>
                {project.title.toUpperCase()}
              </h1>
            </div>

            {/* Action buttons */}
            {!isLocked && (
              <div className="flex items-center gap-3 flex-wrap">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-btn glow-btn-primary px-5 py-2.5 text-sm flex items-center gap-2"
                  >
                    <MonitorPlay size={15} /> LIVE_DEMO
                  </a>
                )}
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-btn glow-btn-outline px-5 py-2.5 text-sm flex items-center gap-2"
                  >
                    <Code2 size={15} /> SOURCE
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Meta row */}
          <div
            className="flex items-center gap-4 text-[11px] text-slate-600"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span>CATEGORY: <span className="text-slate-400">{project.category.toUpperCase()}</span></span>
            <span>DATE: <span className="text-slate-400">{date}</span></span>
            {project.featured && (
              <span className="text-[var(--color-primary)]">★ FEATURED</span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <main className="mx-auto max-w-5xl px-6 py-12 flex flex-col gap-12">

        {/* Image gallery — uses images[] array, falls back to thumbnail */}
        {(project.images?.length > 0 || project.thumbnail) && (
          <ImageGallery
            images={project.images?.length > 0 ? project.images : [project.thumbnail!]}
            title={project.title}
            locked={isLocked}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left — description */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Description */}
            <section>
              <h2
                className="text-xs uppercase tracking-widest text-[var(--color-primary)] mb-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {"// OVERVIEW"}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                {project.description}
              </p>
            </section>

            {/* Problem parameters */}
            {project.longDesc && (
              <section>
                <h2
                  className="text-xs uppercase tracking-widest text-[var(--color-primary)] mb-3"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {"// PROBLEM_PARAMETERS"}
                </h2>
                <div className="border-l-2 border-[var(--color-primary)]/40 pl-5">
                  <p className="text-slate-400 leading-relaxed">
                    {project.longDesc}
                  </p>
                </div>
              </section>
            )}

            {/* Locked warning */}
            {isLocked && (
              <div className="card p-6 border-red-500/20 flex flex-col gap-2">
                <p
                  className="text-xs text-red-400 uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {"// ACCESS_DENIED"}
                </p>
                <p className="text-slate-400 text-sm">
                  This project is currently classified. Full details are available upon request.
                </p>
                <Link
                  href="/contact"
                  className="glow-btn glow-btn-outline px-5 py-2 text-xs mt-2 self-start"
                >
                  REQUEST_ACCESS →
                </Link>
              </div>
            )}
          </div>

          {/* Right — sidebar */}
          <aside className="flex flex-col gap-6">

            {/* Tech stack */}
            {project.tags.length > 0 && (
              <div className="card p-5 flex flex-col gap-3">
                <h3
                  className="text-[10px] uppercase tracking-widest text-slate-500"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  TECH_STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <Badge key={tag} label={tag} />
                  ))}
                </div>
              </div>
            )}

            {/* File metadata */}
            <div className="card p-5 flex flex-col gap-3">
              <h3
                className="text-[10px] uppercase tracking-widest text-slate-500"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                FILE_METADATA
              </h3>
              <div
                className="flex flex-col gap-2 text-xs"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <div className="flex justify-between">
                  <span className="text-slate-600">STATUS</span>
                  <span className={isLocked ? "text-red-400" : "text-emerald-400"}>
                    {isLocked ? "LOCKED" : "UNLOCKED"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">CATEGORY</span>
                  <span className="text-slate-300">{project.category.toUpperCase()}</span>
                </div>
                {project.encryption && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">ENCRYPTION</span>
                    <span className="text-slate-300">{project.encryption}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">DATE</span>
                  <span className="text-slate-300">{date}</span>
                </div>
              </div>
            </div>

            {/* Links */}
            {!isLocked && (project.liveUrl || project.sourceUrl) && (
              <div className="flex flex-col gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-btn glow-btn-primary w-full justify-center py-2.5 text-xs"
                  >
                    <MonitorPlay size={13} className="mr-1.5" /> LIVE_DEMO
                  </a>
                )}
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-btn glow-btn-outline w-full justify-center py-2.5 text-xs"
                  >
                    <Code2 size={13} className="mr-1.5" /> VIEW_SOURCE
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}