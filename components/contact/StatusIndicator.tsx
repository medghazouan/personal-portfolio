"use client";

type Status = "idle" | "processing" | "success" | "error";

interface StatusIndicatorProps {
  status: Status;
}

const CONFIG: Record<Status, {
  dot: string; ping: string; value: string;
  valueColor: string; suffix: string;
}> = {
  idle: {
    dot:        "bg-emerald-500",
    ping:       "bg-emerald-400",
    value:      "READY",
    valueColor: "text-emerald-400",
    suffix:     "] awaiting_input...",
  },
  processing: {
    dot:        "bg-yellow-500",
    ping:       "bg-yellow-400",
    value:      "PROCESSING",
    valueColor: "text-yellow-400",
    suffix:     "] transmitting...",
  },
  success: {
    dot:        "bg-emerald-400",
    ping:       "bg-emerald-300",
    value:      "OK",
    valueColor: "text-[var(--color-primary)]",
    suffix:     "] Signal received.",
  },
  error: {
    dot:        "bg-red-500",
    ping:       "bg-red-400",
    value:      "ERROR",
    valueColor: "text-red-400",
    suffix:     "] transmission failed.",
  },
};

export default function StatusIndicator({ status }: StatusIndicatorProps) {
  const c = CONFIG[status];

  return (
    <div
      className="flex items-center gap-3 text-xs"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {/* Ping dot */}
      <div className="relative flex h-2 w-2 shrink-0">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${c.ping}`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${c.dot}`}
        />
      </div>

      {/* Label */}
      <span className="uppercase tracking-wide text-slate-400">
        {"[STATUS: "}
        <span className={`font-bold ${c.valueColor}`}>{c.value}</span>
        {c.suffix}
      </span>
    </div>
  );
}