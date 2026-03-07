"use client";

import { useEffect, useRef, useState } from "react";

const SEQUENCE = [
  { text: "INITIALIZING_SECURE_KERNEL...",     delay: 0 },
  { text: "SPOOFING_NODE_ID... [OK]",          delay: 500 },
  { text: "DECRYPTING_ARCHIVE_0x71A... [REDACTED]", delay: 1100 },
  { text: "BYPASSING_FIREWALL_LAYER_4...",     delay: 1700 },
  { text: "UPLINK_ESTABLISHED... [GHAZOUAN_OS]", delay: 2300 },
  { text: "ACCESS_GRANTED // WELCOME.",        delay: 2900 },
];

export default function PageLoader() {
  const [visible, setVisible] = useState<number[]>([0]);
  const [subLogs, setSubLogs] = useState<string[]>([]);
  const [barWidth, setBarWidth] = useState(0);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // 1. Main Sequence Logic
    const timers: ReturnType<typeof setTimeout>[] = [];
    SEQUENCE.slice(1).forEach((_, idx) => {
      const i = idx + 1;
      const t = setTimeout(() => {
        setVisible((prev) => [...prev, i]);
        setBarWidth(Math.round(((i + 1) / SEQUENCE.length) * 100));

        if (i === SEQUENCE.length - 1) {
          const t2 = setTimeout(() => {
            setFading(true);
            const t3 = setTimeout(() => setGone(true), 800);
            timers.push(t3);
          }, 1000);
          timers.push(t2);
        }
      }, SEQUENCE[i].delay);
      timers.push(t);
    });

    // 2. Curiosity Logic: Rapid background sub-logs
    const logInterval = setInterval(() => {
      if (fading) return;
      const hex = Math.random().toString(16).toUpperCase().substring(2, 8);
      const actions = ["SYNC", "LOAD", "FETCH", "AUTH", "PUSH"];
      const newLog = `> ${actions[Math.floor(Math.random() * actions.length)]} :: 0x${hex}`;
      setSubLogs(prev => [newLog, ...prev].slice(0, 3));
    }, 120);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(logInterval);
    };
  }, [fading]);

  if (gone) return null;

  return (
    <div
      aria-live="polite"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 0.8s ease",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      {/* Background Polish (Keeping your exact setup) */}
      <div className="absolute inset-0 pointer-events-none" style={{
        opacity: 0.03,
        backgroundImage: "linear-gradient(#00C9A7 1px, transparent 1px), linear-gradient(90deg, #00C9A7 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(0,201,167,0.08) 0%, transparent 70%)" }}
        />
      </div>

      {/* The Cadre (Your original Terminal Frame) */}
      <div
        className="relative z-10 w-full mx-4 border border-[#1F2937] rounded-lg overflow-hidden"
        style={{ maxWidth: 460, boxShadow: "0 25px 50px rgba(0,0,0,0.6)" }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1F2937] bg-[#111827]">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[10px] text-slate-600 uppercase tracking-widest font-mono">
            {"ghazouan_os // boot.sh"}
          </span>
          <div className="w-14" />
        </div>

        {/* Body */}
        <div className="bg-[#0d1117] px-6 py-5 flex flex-col gap-2.5" style={{ minHeight: 220 }}>
          {SEQUENCE.map((item, i) => {
            const isLast = i === SEQUENCE.length - 1;
            const shown = visible.includes(i);
            const isRedacted = item.text.includes("[REDACTED]");

            return (
              <div
                key={i}
                className="flex items-start gap-3 text-xs font-mono"
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(5px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                <span className="text-slate-700 shrink-0 w-5 text-right">0{i + 1}.</span>
                <span style={{ color: isLast ? "#00C9A7" : "#9CA3AF" }}>
                  {isRedacted ? (
                    <>
                      {item.text.replace("[REDACTED]", "")}
                      <span className="bg-[#00C9A7]/10 text-[#00C9A7] px-1 rounded animate-pulse">
                        [REDACTED]
                      </span>
                    </>
                  ) : item.text}
                </span>
              </div>
            );
          })}

          {/* New: Live Curiosity Sub-logs (Inside the body) */}
          <div className="mt-auto pt-4 border-t border-[#1F2937]/30">
            {subLogs.map((log, index) => (
              <div key={index} className="text-[9px] font-mono text-slate-600 opacity-50">
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#0a0a0a] border-t border-[#1F2937]">
          <div className="flex-grow h-[2px] bg-[#1F2937] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${barWidth}%`, background: "#00C9A7", boxShadow: "0 0 8px rgba(0,201,167,0.6)" }}
            />
          </div>
          <span className="text-[10px] text-[#00C9A7] font-mono w-8 text-right">
            {barWidth}%
          </span>
        </div>
      </div>

      {/* Operator tag */}
      <p className="mt-5 text-[10px] text-slate-700 uppercase tracking-[0.2em] font-mono">
        OPERATOR: GHAZOUAN // CLEARANCE_LEVEL: 5
      </p>
    </div>
  );
}