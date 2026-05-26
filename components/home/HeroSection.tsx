"use client";

import GlowButton from "@/components/ui/GlowButton";
import { Code2, ArrowRight } from "lucide-react";

const BOOT_LINES = [
  { time: "[10:42:01]", text: "LOCATING_OPERATOR...",          status: null      },
  { time: "[10:42:02]", text: "IDENTITY_CONFIRMED... ",        status: "SUCCESS" },
  { time: "[10:42:03]", text: "CLASSIFIED_WORK_DECRYPTING...", status: null      },
];

export default function HeroSection() {
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


        {/* Boot lines */}
        <div className="flex flex-col items-center md:items-start gap-0.5 self-center md:self-start animate-fade-up [animation-delay:0ms] [animation-fill-mode:both] font-mono text-[10px] sm:text-[11px] mb-4 md:mb-0 w-full max-w-[280px] md:max-w-none text-left">
          {BOOT_LINES.map((line) => (
            <p key={line.time} className="text-[#00C9A7]/40 w-full flex justify-between md:justify-start">
              <span className="text-slate-700 md:mr-3">{line.time}</span>
              <span className="flex-1 md:flex-none text-left ml-2 md:ml-0">{line.text}</span>
              {line.status && <span className="text-emerald-400 font-bold ml-2 md:ml-0">{line.status}</span>}
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

        {/* Tagline */}
        <div className="animate-fade-up [animation-delay:380ms] [animation-fill-mode:both]">
          <p className="text-lg md:text-xl text-slate-300 font-light">
            I turn ideas into{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00C9A7] to-[#00a892]">
              fast, intelligent web products
            </span>
          </p>
        </div>

        {/* Mystery hook */}
        <p className="max-w-lg text-slate-500 text-sm leading-relaxed animate-fade-up [animation-delay:480ms] [animation-fill-mode:both]">
          Most of what I build is{" "}
          <span className="text-slate-300 line-through decoration-[#00C9A7]/60">classified</span>
          . What you see below is the declassified version {" "}
          <span className="text-[#00C9A7]">and it&apos;s worth your time.</span>
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