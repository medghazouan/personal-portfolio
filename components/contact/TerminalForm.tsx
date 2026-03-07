"use client";

import { useState } from "react";
import { Code2 } from "lucide-react";
import StatusIndicator from "./StatusIndicator";

type Status = "idle" | "processing" | "success" | "error";

interface FormState {
  name:    string;
  email:   string;
  message: string;
}

interface FieldError {
  name?:    string;
  email?:   string;
  message?: string;
}

const BOOT_LINES = [
  { time: "[10:42:01]", text: "INITIATING_HANDSHAKE_PROTOCOL...",  extra: null           },
  { time: "[10:42:02]", text: "ESTABLISHING_SECURE_CONNECTION... ", extra: "SUCCESS"      },
  { time: "[10:42:03]", text: "LOADING_INTERFACE_MODULES... ",      extra: "DONE"         },
];

function validate(form: FormState): FieldError {
  const errors: FieldError = {};
  if (!form.name.trim())                                  errors.name    = "IDENTITY_REQUIRED";
  if (!form.email.trim())                                 errors.email   = "FREQUENCY_REQUIRED";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                                          errors.email   = "INVALID_FREQUENCY";
  if (!form.message.trim())                               errors.message = "PAYLOAD_EMPTY";
  else if (form.message.trim().length < 10)               errors.message = "PAYLOAD_TOO_SHORT";
  return errors;
}

export default function TerminalForm() {
  const [form,   setForm]   = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    // Clear field error on change
    if (errors[id as keyof FieldError]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  }

  async function handleSubmit() {
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("processing");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "UNKNOWN_ERROR");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "TRANSMISSION_FAILED");
    }
  }

  const isDisabled = status === "processing" || status === "success";

  return (
    /* Terminal window */
    <div className="w-full max-w-3xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-2xl overflow-hidden flex flex-col">

      {/* Terminal title bar */}
      <div className="bg-[#1a1d1d] border-b border-[var(--color-border)] px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span
          className="text-[10px] text-slate-500 uppercase tracking-widest"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          bash -- secure_shell -- 80x24
        </span>
        <div className="w-14" />
      </div>

      {/* Terminal body */}
      <div className="p-6 md:p-10 flex flex-col gap-8" style={{ fontFamily: "var(--font-mono)" }}>

        {/* Boot sequence */}
        <div className="space-y-1">
          {BOOT_LINES.map((line) => (
            <p key={line.time} className="text-xs text-[var(--color-primary)]/70">
              <span className="text-slate-600 mr-3">{line.time}</span>
              {line.text}
              {line.extra && (
                <span className={line.extra === "SUCCESS" ? "text-emerald-400 font-bold" : "text-[var(--color-primary)] font-bold"}>
                  {line.extra}
                </span>
              )}
            </p>
          ))}

          <div className="pt-2">
            <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight">
              &gt; WELCOME_USER
            </h1>
            <p className="text-slate-400 text-sm mt-1 leading-relaxed">
              {"// You have reached the uplink node for the developer."}<br />
              {"// Please authenticate and define your transmission payload below."}
            </p>
          </div>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-7">

          {/* Name */}
          <div className="group flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-xs text-[var(--color-primary)] opacity-90"
            >
              &gt; enter_identity_name:
            </label>
            <div className={`flex items-center border-b transition-all duration-300 bg-[#0f1111] hover:bg-[#151818] rounded-t-sm
              ${errors.name
                ? "border-red-500/60"
                : "border-[var(--color-border)] group-focus-within:border-[var(--color-accent)] group-focus-within:shadow-[0_1px_8px_rgba(157,78,221,0.3)]"
              }`}
            >
              <span className="pl-3 py-3 text-slate-500 select-none text-sm">$</span>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="_"
                autoComplete="off"
                aria-label="Your name"
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-700 py-3 px-2 text-sm outline-none disabled:opacity-50"
              />
              <span className="pr-3 text-[var(--color-accent)] animate-pulse opacity-0 group-focus-within:opacity-100">▉</span>
            </div>
            {errors.name && (
              <p className="text-[10px] text-red-400 uppercase tracking-wider pl-1">
                 {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="group flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-xs text-[var(--color-primary)] opacity-90"
            >
              &gt; enter_contact_frequency (email):
            </label>
            <div className={`flex items-center border-b transition-all duration-300 bg-[#0f1111] hover:bg-[#151818] rounded-t-sm
              ${errors.email
                ? "border-red-500/60"
                : "border-[var(--color-border)] group-focus-within:border-[var(--color-accent)] group-focus-within:shadow-[0_1px_8px_rgba(157,78,221,0.3)]"
              }`}
            >
              <span className="pl-3 py-3 text-slate-500 select-none text-sm">$</span>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="_"
                autoComplete="off"
                aria-label="Your email address"
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-700 py-3 px-2 text-sm outline-none disabled:opacity-50"
              />
              <span className="pr-3 text-[var(--color-accent)] animate-pulse opacity-0 group-focus-within:opacity-100">▉</span>
            </div>
            {errors.email && (
              <p className="text-[10px] text-red-400 uppercase tracking-wider pl-1">
                 {errors.email}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="group flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-xs text-[var(--color-primary)] opacity-90"
            >
              &gt; define_message_payload:
            </label>
            <div className={`flex items-start border-b transition-all duration-300 bg-[#0f1111] hover:bg-[#151818] rounded-t-sm
              ${errors.message
                ? "border-red-500/60"
                : "border-[var(--color-border)] group-focus-within:border-[var(--color-accent)] group-focus-within:shadow-[0_1px_8px_rgba(157,78,221,0.3)]"
              }`}
            >
              <span className="pl-3 py-3 text-slate-500 select-none text-sm">$</span>
              <textarea
                id="message"
                value={form.message}
                onChange={handleChange}
                disabled={isDisabled}
                placeholder="// Type your transmission here..."
                aria-label="Your message"
                rows={5}
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-700 py-3 px-2 text-sm outline-none resize-none disabled:opacity-50"
              />
              <span className="pr-3 py-3 text-[var(--color-accent)] animate-pulse opacity-0 group-focus-within:opacity-100">▉</span>
            </div>
            {errors.message && (
              <p className="text-[10px] text-red-400 uppercase tracking-wider pl-1">
                 {errors.message}
              </p>
            )}
          </div>

        </div>

        {/* Server error */}
        {serverError && (
          <p className="text-xs text-red-400 uppercase tracking-wider">
             {serverError}
          </p>
        )}

        {/* Success message */}
        {status === "success" && (
          <div className="border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 rounded p-4">
            <p className="text-sm text-[var(--color-primary)]">
              {"// SIGNAL_RECEIVED — Your transmission has been logged. I'll respond within 24–48 hours."}
            </p>
          </div>
        )}

        {/* Actions row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-2">

          {/* Submit button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className="glow-btn glow-btn-outline px-8 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Code2 size={16} />
            {status === "processing" ? "Transmitting..." : "Execute_Sequence"}
          </button>

          {/* Status indicator */}
          <StatusIndicator status={status} />

        </div>
      </div>

      {/* Terminal footer bar */}
      <div
        className="bg-[#151818] border-t border-[var(--color-border)] px-4 py-2 flex justify-between items-center text-[10px] text-slate-600 select-none"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span>User: guest@uplink</span>
        <span>Mem: 64k OK</span>
      </div>

    </div>
  );
}