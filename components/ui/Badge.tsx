interface BadgeProps {
  label:    string;
  variant?: "default" | "accent" | "locked";
}

const VARIANTS = {
  default: "border-[var(--color-border)] text-slate-400 bg-[var(--color-surface)]",
  accent:  "border-[var(--color-accent)]  text-[var(--color-accent)]  bg-[var(--color-surface)]",
  locked:  "border-slate-700              text-slate-600              bg-[var(--color-bg)]",
};

export default function Badge({ label, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] uppercase tracking-wider ${VARIANTS[variant]}`}
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {label}
    </span>
  );
}