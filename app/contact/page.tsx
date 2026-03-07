import type { Metadata } from "next";
import TerminalForm from "@/components/contact/TerminalForm";

export const metadata: Metadata = {
  title:       "Contact",
  description: "Reach out via the secure uplink terminal.",
};

export default function ContactPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 md:px-6 py-16 overflow-hidden">

      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[var(--color-primary)]/8 to-transparent blur-[100px]" />
      </div>

      {/* Background dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center gap-10">

        {/* Page label */}
        <div
          className="flex items-center gap-2 text-xs text-slate-500"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span className="text-[var(--color-primary)]">SYSTEM_UPLINK</span>
          <span>//</span>
          <span>V4.2</span>
        </div>

        {/* Terminal form */}
        <TerminalForm />

        {/* Footer note */}
        <p
          className="text-[10px] text-slate-600 uppercase tracking-widest"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          System Architecture by AI_DEV // End of Line
        </p>

      </div>
    </div>
  );
}