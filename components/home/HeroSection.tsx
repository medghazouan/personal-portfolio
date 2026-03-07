"use client";

import { useTypingAnimation } from "./TypingAnimation";
import GlowButton from "@/components/ui/GlowButton";
import { Code2, ArrowRight } from "lucide-react";

const BOOT_LINES = [
  { time: "[10:42:01]", text: "LOCATING_OPERATOR...",          status: null      },
  { time: "[10:42:02]", text: "IDENTITY_CONFIRMED... ",        status: "SUCCESS" },
  { time: "[10:42:03]", text: "CLASSIFIED_WORK_DECRYPTING...", status: null      },
];

export default function HeroSection() {
  const typedWord = useTypingAnimation();

  return (
    /*
     * h-[calc(100vh-4rem)] accounts for the 4rem (h-16) sticky Navbar
     * so the hero fills exactly the remaining visible viewport.
     * sticky top-16 (not top-0) aligns it flush under the Navbar.
     */
    <section className="sticky top-16 h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center px-4 md:px-6 overflow-hidden bg-[#0a0a0a]">

      {/* Ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-[#00C9A7]/10 via-[#9d4edd]/5 to-transparent blur-[120px]" />
      </div>

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#00C9A7 1px, transparent 1px), linear-gradient(90deg, #00C9A7 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center gap-4 md:gap-5 pb-[10vh] md:pb-[14vh]">


        {/* Boot lines — desktop only */}
        <div className="hidden md:flex flex-col items-start gap-0.5 self-start animate-fade-up [animation-delay:0ms] [animation-fill-mode:both] font-mono text-[11px]">
          {BOOT_LINES.map((line) => (
            <p key={line.time} className="text-[#00C9A7]/40">
              <span className="text-slate-700 mr-3">{line.time}</span>
              {line.text}
              {line.status && <span className="text-emerald-400 font-bold">{line.status}</span>}
            </p>
          ))}
        </div>
        {/* Name */}
        <div className="flex flex-col items-center gap-1 animate-fade-up [animation-delay:250ms] [animation-fill-mode:both]">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-slate-600">
            {"// IDENTITY_CONFIRMED"}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none">
            Mohamed{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#00C9A7] to-[#00a892]">
              Ghazouan
            </span>
          </h1>
        </div>

        {/* Typing line */}
        <div className="animate-fade-up [animation-delay:380ms] [animation-fill-mode:both]">
          <p className="text-lg md:text-xl text-slate-300 font-light">
            I build systems that{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] to-[#00a892]">
              {typedWord}
            </span>
            <span className="inline-block w-[3px] h-[1em] align-middle ml-0.5 animate-blink rounded-sm bg-[#00C9A7] shadow-[0_0_10px_rgba(0,201,167,0.8)]" />
          </p>
        </div>

        {/* Mystery hook */}
        <p className="max-w-lg text-slate-500 text-sm leading-relaxed animate-fade-up [animation-delay:480ms] [animation-fill-mode:both]">
          Most of what I build is{" "}
          <span className="text-slate-300 line-through decoration-[#00C9A7]/60">classified</span>
          {" "}carefully engineered. The projects below are the ones I can show you —{" "}
          <span className="text-[#00C9A7]">they&apos;re worth seeing.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 animate-fade-up [animation-delay:580ms] [animation-fill-mode:both]">
          <GlowButton href="/projects" variant="primary" size="lg" icon={<Code2 size={18} />}>
            Decrypt My Work
          </GlowButton>
          <GlowButton href="/contact" variant="outline" size="lg" icon={<ArrowRight size={16} />}>
            Init Contact
          </GlowButton>
        </div>

        

      </div>

      
      

    </section>
  );
}