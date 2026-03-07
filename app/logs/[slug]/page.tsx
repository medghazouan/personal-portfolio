import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import { Log } from "@/models/Log";

interface Props {
  params: Promise<{ slug: string }>;
}

interface LogDoc {
  _id:       string;
  title:     string;
  slug:      string;
  excerpt:   string;
  content:   string;
  tags:      string[];
  createdAt: string;
}

async function getLog(slug: string): Promise<LogDoc | null> {
  try {
    await connectDB();
    const doc = await Log.findOne({ slug, published: true }).lean();
    if (!doc) return null;
    return {
      _id:       doc._id.toString(),
      title:     doc.title as string,
      slug:      doc.slug as string,
      excerpt:   doc.excerpt as string,
      content:   doc.content as string,
      tags:      doc.tags as string[],
      createdAt: new Date(doc.createdAt).toISOString(),
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const log = await getLog(slug);
  if (!log) return { title: "Not Found" };
  return {
    title:       log.title,
    description: log.excerpt,
  };
}

export default async function LogEntryPage({ params }: Props) {
  const { slug } = await params;
  const log = await getLog(slug);
  if (!log) notFound();

  const date = new Date(log.createdAt);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="min-h-screen">

      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-3xl px-6 py-8 flex flex-col gap-4">

          {/* Back link */}
          <Link
            href="/logs"
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-[var(--color-primary)] transition-colors w-fit"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <ArrowLeft size={12} />
            BACK_TO_LOGS
          </Link>

          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-xs text-slate-600"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Terminal size={11} className="text-[var(--color-primary)]" />
            <span className="text-[var(--color-primary)]">~/dev/logs/</span>
            <span className="text-slate-400">{log.slug}</span>
          </div>

          {/* Date */}
          <span
            className="text-[11px] text-slate-600"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            [{date.toISOString().slice(0, 10)}] // {formatted}
          </span>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug">
            {log.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {log.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider border border-[var(--color-border)] text-slate-400 px-2 py-0.5 rounded"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* Excerpt callout */}
        <div className="border-l-2 border-[var(--color-primary)] pl-5 mb-10">
          <p className="text-slate-300 text-base leading-relaxed italic">
            {log.excerpt}
          </p>
        </div>

        {/* Body — rendered as preformatted for now; swap for MDX in V2 */}
        <div
          className="prose prose-invert prose-sm max-w-none
            prose-headings:font-bold prose-headings:text-white
            prose-p:text-slate-400 prose-p:leading-relaxed
            prose-code:text-[var(--color-primary)] prose-code:bg-[var(--color-surface)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
            prose-pre:bg-[var(--color-surface)] prose-pre:border prose-pre:border-[var(--color-border)] prose-pre:rounded-lg
            prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-blockquote:border-l-[var(--color-primary)] prose-blockquote:text-slate-400"
        >
          {log.content.split("\n\n").map((para: string, i: number) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
          <Link
            href="/logs"
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-[var(--color-primary)] transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <ArrowLeft size={12} />
            BACK_TO_ALL_LOGS
          </Link>
        </div>
      </main>
    </div>
  );
}
