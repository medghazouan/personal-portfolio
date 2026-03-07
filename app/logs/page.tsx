import type { Metadata } from "next";
import Link from "next/link";
import { Terminal, ArrowRight } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import { Log } from "@/models/Log";

export const metadata: Metadata = {
  title:       "Logs",
  description: "Devlog — technical writing on AI, full-stack systems, and engineering decisions.",
};

interface LogEntry {
  _id:       string;
  title:     string;
  slug:      string;
  excerpt:   string;
  tags:      string[];
  createdAt: string;
}

async function getLogs(): Promise<LogEntry[]> {
  try {
    await connectDB();
    const docs = await Log.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();

    return docs.map((d) => ({
      _id:       d._id.toString(),
      title:     d.title,
      slug:      d.slug,
      excerpt:   d.excerpt,
      tags:      d.tags,
      createdAt: new Date(d.createdAt).toISOString(),
    }));
  } catch {
    return [];
  }
}

function LogCard({ log, index }: { log: LogEntry; index: number }) {
  const date = new Date(log.createdAt);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "2-digit",
  });
  const ts = `[${date.toISOString().slice(0, 10)}]`;

  return (
    <Link
      href={`/logs/${log.slug}`}
      className="group card flex flex-col gap-4 p-6 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
    >
      {/* Timestamp + tags */}
      <div className="flex items-center justify-between gap-4">
        <span
          className="text-[11px] text-slate-600 shrink-0"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {ts}
        </span>
        <div className="flex flex-wrap gap-1.5 justify-end">
          {log.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wider border border-[var(--color-border)] text-slate-500 px-1.5 py-0.5 rounded"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-base font-bold text-white group-hover:text-[var(--color-primary)] transition-colors duration-200 leading-snug">
        <span
          className="text-[var(--color-primary)]/50 mr-2 text-sm"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          &gt;
        </span>
        {log.title}
      </h2>

      {/* Excerpt */}
      <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
        {log.excerpt}
      </p>

      {/* Read more */}
      <div
        className="flex items-center gap-1.5 text-xs text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-auto"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span>READ_ENTRY</span>
        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </Link>
  );
}

export default async function LogsPage() {
  const logs = await getLogs();

  return (
    <div className="min-h-screen">

      {/* Page header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-4xl px-6 py-8 flex flex-col gap-3">
          <div
            className="flex items-center gap-2 text-xs text-slate-500"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Terminal size={12} className="text-[var(--color-primary)]" />
            <span className="text-[var(--color-primary)]">~/dev/logs/</span>
            <span className="animate-blink text-[var(--color-primary)]">▌</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white">
            DEV<span className="text-[var(--color-primary)]">_LOGS</span>
          </h1>

          <p
            className="text-slate-400 text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {"// Technical writing on AI systems, architecture decisions, and build notes."}
          </p>
        </div>
      </div>

      {/* Log entries */}
      <main className="mx-auto max-w-4xl px-6 py-12">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p
              className="text-xs uppercase tracking-widest text-slate-600 mb-2"
              style={{ fontFamily: "var(--font-mono)" }}
            >
                 {'//NO_ENTRIES_FOUND'}
            </p>
            <p className="text-slate-500 text-sm">
              No log entries yet. Run the seed script or add entries via MongoDB Compass.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {logs.map((log, i) => (
              <LogCard key={log._id} log={log} index={i} />
            ))}
          </div>
        )}
      </main>

      {/* Footer bar */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)] py-4 px-6">
        <div
          className="mx-auto max-w-4xl flex justify-between items-center text-[10px] text-slate-600"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
            {logs.length} ENTRIES INDEXED
          </span>
          <span>FEED: /logs/rss — COMING_SOON</span>
        </div>
      </footer>
    </div>
  );
}